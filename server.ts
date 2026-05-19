import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { google } from 'googleapis';
import { adminDb } from './src/lib/firebaseServer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json());

  // Helper to load and clean Google Calendar credentials
  const getGoogleCredentials = async () => {
    let privateKey = process.env.GOOGLE_PRIVATE_KEY;
    let clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    let calendarId = process.env.GOOGLE_CALENDAR_ID;
    const fullJson = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;

    let fallbackStatus = "NOT_USED";
    let fallbackError = null;
    let source = "ENV";

    // 1. Try to load from full JSON environment variable first (most reliable)
    if (fullJson && fullJson !== 'undefined' && fullJson !== 'null') {
      try {
        const credentials = JSON.parse(fullJson);
        privateKey = credentials.private_key;
        clientEmail = credentials.client_email;
        source = "JSON_ENV";
        fallbackStatus = "LOADED_FROM_JSON_ENV";
      } catch (e) {
        fallbackError = `JSON_ENV_PARSE_ERROR: ${e.message}`;
      }
    }

    // 2. Handle "undefined" or "null" strings from some environments
    if (privateKey === 'undefined' || privateKey === 'null' || !privateKey) privateKey = null;
    if (clientEmail === 'undefined' || clientEmail === 'null' || !clientEmail) clientEmail = null;
    if (calendarId === 'undefined' || calendarId === 'null' || !calendarId) calendarId = null;

    // 3. Service account emails MUST end in .gserviceaccount.com
    const isServiceAccountEmail = clientEmail && clientEmail.includes('.gserviceaccount.com');
    let credentialsObj: any = null;

    if (!privateKey || !isServiceAccountEmail || (privateKey && privateKey.length < 100)) {
      fallbackStatus = "FALLBACK_FILE_MISSING_OR_INVALID";
    }

    // 4. Clean the private key
    if (privateKey && typeof privateKey === 'string') {
      const cleanKey = (key: string) => {
        if (!key) return key;

        let processed = key.trim();
        while ((processed.startsWith('"') && processed.endsWith('"')) ||
               (processed.startsWith("'") && processed.endsWith("'"))) {
          processed = processed.substring(1, processed.length - 1).trim();
        }

        processed = processed.replace(/\\n/g, '\n');

        const headerPattern = /-----[\s]*BEGIN[\s]+(?:RSA[\s]+)?PRIVATE[\s]+KEY[\s]*-----/i;
        const footerPattern = /-----[\s]*END[\s]+(?:RSA[\s]+)?PRIVATE[\s]+KEY[\s]*-----/i;

        let body = processed;
        const headerMatch = processed.match(headerPattern);
        const footerMatch = processed.match(footerPattern);

        if (headerMatch && footerMatch) {
          const start = headerMatch.index! + headerMatch[0].length;
          const end = footerMatch.index!;
          body = processed.substring(start, end);
        }

        const cleanBody = body.replace(/[^A-Za-z0-9+/=]/g, '');
        return `-----BEGIN PRIVATE KEY-----\n${cleanBody}\n-----END PRIVATE KEY-----\n`;
      };

      privateKey = cleanKey(privateKey);
    }

    // 5. Clean Calendar ID and Email
    if (calendarId && typeof calendarId === 'string') {
      calendarId = calendarId.replace(/['"]/g, '').trim();
    }
    if (clientEmail && typeof clientEmail === 'string') {
      clientEmail = clientEmail.replace(/['"]/g, '').trim();
    }

    if (!credentialsObj && privateKey && clientEmail) {
      credentialsObj = {
        client_email: clientEmail,
        private_key: privateKey,
        type: 'service_account'
      };
    }

    return { privateKey, clientEmail, calendarId, fallbackStatus, fallbackError, source, credentialsObj };
  };

  // Robust auth client creator
  const getGoogleAuth = (credentialsObj: any) => {
    if (!credentialsObj || !credentialsObj.private_key || !credentialsObj.client_email) {
      return null;
    }

    const auth = new google.auth.JWT({
      email: credentialsObj.client_email,
      key: credentialsObj.private_key,
      scopes: ['https://www.googleapis.com/auth/calendar']
    });

    return auth;
  };

  // API route for health check and environment variable verification
  app.get('/api/health', async (req, res) => {
    const { privateKey, clientEmail, calendarId, fallbackStatus, fallbackError, source, credentialsObj } = await getGoogleCredentials();
    const geminiKey = process.env.GEMINI_API_KEY;

    let authTest = "NOT_STARTED";
    let authError = null;
    let keyPreview = "NONE";

    if (privateKey) {
      const head = privateKey.substring(0, 30);
      const tail = privateKey.substring(privateKey.length - 30);
      keyPreview = `HEAD: [${head}] ... TAIL: [${tail}] (Total Length: ${privateKey.length})`;
    }

    try {
      if (credentialsObj && calendarId) {
        const auth = getGoogleAuth(credentialsObj);
        if (!auth) throw new Error("Could not initialize auth client");

        const token = await auth.authorize();
        authTest = `SUCCESS: Token acquired! (Expires: ${new Date(token.expiry_date || 0).toLocaleTimeString()})`;

        const calendar = google.calendar({ version: 'v3', auth });
        const calendarInfo = await calendar.calendars.get({ calendarId });
        const events = await calendar.events.list({
          calendarId,
          maxResults: 1,
          timeMin: new Date().toISOString()
        });
        authTest = `SUCCESS: Connected to "${calendarInfo.data.summary}"! (Expires: ${new Date(token.expiry_date || 0).toLocaleTimeString()})`;
        authTest += ` | Found ${events.data.items?.length || 0} upcoming events.`;
      } else {
        const missing = [];
        if (!clientEmail) missing.push('clientEmail');
        if (!privateKey) missing.push('privateKey');
        if (!calendarId) missing.push('calendarId');
        authTest = `SKIPPED: Missing ${missing.join(', ')}`;
      }
    } catch (error) {
      authTest = "FAILED: Authentication or Permission error";
      authError = error.message;
      console.error('Health Check Auth Error:', error);
    }

    // Test Firebase Connection
    let firebaseStatus = "NOT_CONFIGURED";
    let firebaseError = null;
    try {
      if (adminDb) {
        const collections = await adminDb.listCollections();
        firebaseStatus = `CONNECTED: Found ${collections.length} collections`;
      } else {
        firebaseStatus = "SKIPPED: Firebase Admin not initialized";
      }
    } catch (e) {
      firebaseStatus = "ERROR: " + e.message;
      firebaseError = e.message;
    }

    res.json({
      status: 'ok',
      firebase: firebaseStatus,
      firebase_error: firebaseError,
      google_auth_test: authTest,
      google_auth_error: authError,
      fallback_status: fallbackStatus,
      fallback_error: fallbackError,
      auth_source: source,
      using_email: clientEmail,
      key_preview: keyPreview,
      env: {
        GOOGLE_CALENDAR_ID: calendarId ? `${calendarId.substring(0, 5)}...` : 'MISSING',
        GEMINI_API_KEY: geminiKey ? 'CONFIGURED' : 'MISSING',
        GOOGLE_PRIVATE_KEY: process.env.GOOGLE_PRIVATE_KEY ? (process.env.GOOGLE_PRIVATE_KEY === 'undefined' ? 'UNDEFINED_STRING' : 'CONFIGURED') : 'MISSING',
        GOOGLE_SERVICE_ACCOUNT_EMAIL: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL ? (process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL === 'undefined' ? 'UNDEFINED_STRING' : 'CONFIGURED') : 'MISSING',
        GOOGLE_SERVICE_ACCOUNT_JSON: process.env.GOOGLE_SERVICE_ACCOUNT_JSON ? 'CONFIGURED' : 'MISSING',
        CRM_OWNER_USER_ID: process.env.CRM_OWNER_USER_ID ? 'CONFIGURED' : 'MISSING',
        NODE_ENV: process.env.NODE_ENV || 'development'
      }
    });
  });

  // --- CRM Integration ---
  const CRM_CUSTOMER_COLLECTION = 'customers';
  const ENABLE_CRM_SYNC = true;

  /**
   * Generates a 9-character alphanumeric ID for new CRM customer records.
   */
  function generateCrmId() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 9; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  /**
   * Syncs a customer record to the CRM /customers Firestore collection.
   * - Deduplicates by email first, then phone.
   * - Creates a new record if no match found.
   * - Updates the existing record if a match is found.
   * - Throws on any failure so the caller can return a proper 500.
   */
  async function syncToCrm(customerData: any) {
    console.log(`[CRM] syncToCrm called for: ${customerData.email || 'no-email'}`);

    // ── Guard: Firebase not initialized ───────────────────────────────────────
    if (!adminDb) {
      const msg = '[CRM] FATAL: adminDb is null. Firebase Admin SDK did not initialize. Check GOOGLE_SERVICE_ACCOUNT_JSON in Hostinger.';
      console.error(msg);
      throw new Error(msg);
    }

    // ── Guard: Feature flag ────────────────────────────────────────────────────
    if (!ENABLE_CRM_SYNC) {
      console.log('[CRM] Sync skipped: ENABLE_CRM_SYNC is false.');
      return null;
    }

    // ── Guard: CRM owner UID required ─────────────────────────────────────────
    const ownerUserId = process.env.CRM_OWNER_USER_ID;
    if (!ownerUserId || ownerUserId === 'undefined' || ownerUserId === 'null' || ownerUserId.trim() === '') {
      const msg = '[CRM] FATAL: CRM_OWNER_USER_ID is missing or empty. Set it in Hostinger environment variables.';
      console.error(msg);
      throw new Error(msg);
    }

    console.log(`[CRM] Using Owner UID: ${ownerUserId}`);

    try {
      const { email, phone, firstName, lastName } = customerData;

      // ── Deduplication: email first, then phone ─────────────────────────────
      let existingDoc: FirebaseFirestore.QueryDocumentSnapshot | null = null;

      if (email) {
        console.log(`[CRM] Dedup check — searching by email: ${email}`);
        const emailQuery = await adminDb
          .collection(CRM_CUSTOMER_COLLECTION)
          .where('userId', '==', ownerUserId)
          .where('email', '==', email)
          .limit(1)
          .get();
        if (!emailQuery.empty) {
          existingDoc = emailQuery.docs[0];
          console.log(`[CRM] Dedup match found by email. Existing doc ID: ${existingDoc.id}`);
        }
      }

      if (!existingDoc && phone) {
        console.log(`[CRM] Dedup check — searching by phone: ${phone}`);
        const phoneQuery = await adminDb
          .collection(CRM_CUSTOMER_COLLECTION)
          .where('userId', '==', ownerUserId)
          .where('phone', '==', phone)
          .limit(1)
          .get();
        if (!phoneQuery.empty) {
          existingDoc = phoneQuery.docs[0];
          console.log(`[CRM] Dedup match found by phone. Existing doc ID: ${existingDoc.id}`);
        }
      }

      const now = new Date().toISOString();
      const fullName = `${firstName || ''} ${lastName || ''}`.trim();

      // ── Payload — matches exact CRM customer schema ────────────────────────
      const payload = {
        userId: ownerUserId,
        firstName: firstName || '',
        lastName: lastName || '',
        fullName: fullName,
        email: email || '',
        phone: phone || '',
        address: customerData.streetAddress || customerData.address || '',
        city: customerData.city || '',
        state: customerData.state || '',
        zip: customerData.zip || '',
        notes: customerData.notes || '',
        customerType: customerData.customerType || 'General Client',
        source: 'website',
        status: 'new',
        updatedAt: now,
        updatedBy: 'website-form',
      };

      if (existingDoc) {
        // ── Update existing record ───────────────────────────────────────────
        console.log(`[CRM] Updating existing customer: ${existingDoc.id}`);
        await existingDoc.ref.update(payload);
        console.log(`[CRM] Update successful for: ${existingDoc.id}`);
        return existingDoc.id;
      } else {
        // ── Create new record ────────────────────────────────────────────────
        const customId = generateCrmId();
        const newRecord = {
          ...payload,
          id: customId,
          createdAt: now,
          createdBy: 'website-form',
          tags: ['website-lead'],
        };
        console.log(`[CRM] Creating new customer record. ID: ${customId}`);
        await adminDb.collection(CRM_CUSTOMER_COLLECTION).doc(customId).set(newRecord);
        console.log(`[CRM] New customer created successfully. ID: ${customId}`);
        return customId;
      }
    } catch (error: any) {
      console.error('[CRM] Firestore write failed:', error.message);
      console.error('[CRM] Full error:', error);
      throw error;
    }
  }

  // API route to handle contact form submissions and CRM customer creation
  app.post('/api/contact', async (req, res) => {
    console.log('[API] Received POST /api/contact');
    console.log('[API] Request body:', JSON.stringify(req.body, null, 2));

    // ── Startup guards — catch missing config before doing any work ───────────
    if (!adminDb) {
      console.error('[API] /api/contact blocked: adminDb is null. Firebase did not initialize.');
      return res.status(500).json({
        error: 'Server configuration error: Firebase is not initialized. Contact the site administrator.'
      });
    }

    const ownerUserId = process.env.CRM_OWNER_USER_ID;
    if (!ownerUserId || ownerUserId === 'undefined' || ownerUserId.trim() === '') {
      console.error('[API] /api/contact blocked: CRM_OWNER_USER_ID is not set in environment variables.');
      return res.status(500).json({
        error: 'Server configuration error: CRM owner not configured. Contact the site administrator.'
      });
    }

    try {
      const { firstName, lastName, email, phone, message } = req.body;

      if (!firstName || !lastName || !email) {
        console.warn('[API] Validation failed: firstName, lastName, and email are required.');
        return res.status(400).json({ error: 'Missing required fields: firstName, lastName, email' });
      }

      // ── 1. Save raw message to /messages collection (non-fatal if it fails) ─
      console.log('[API] Saving to "messages" collection...');
      try {
        await adminDb.collection('messages').add({
          firstName,
          lastName,
          email,
          phone: phone || '',
          message: message || '',
          createdAt: new Date().toISOString(),
        });
        console.log('[API] Saved to "messages" successfully.');
      } catch (msgError: any) {
        console.error('[API] Failed to save to "messages" collection (non-fatal):', msgError.message);
      }

      // ── 2. Sync to CRM /customers collection ──────────────────────────────
      console.log('[API] Initiating CRM sync...');
      const customerId = await syncToCrm({
        firstName,
        lastName,
        email,
        phone: phone || '',
        notes: message || '',
        customerType: 'General Client',
      });

      if (!customerId) {
        // syncToCrm throws on failure, but guard the null case explicitly
        console.error('[API] syncToCrm returned null without throwing. Customer record was NOT created.');
        return res.status(500).json({
          error: 'CRM sync failed: customer record was not created. Check server logs for details.'
        });
      }

      console.log(`[API] CRM sync successful. Customer ID: ${customerId}`);
      return res.json({ success: true, customerId });

    } catch (error: any) {
      console.error('[API] /api/contact unhandled error:', error.message);
      console.error('[API] Full error:', error);
      return res.status(500).json({
        error: 'Internal server error',
        details: error.message
      });
    }
  });

  // API route to book calendar event
  app.post('/api/book', async (req, res) => {
    try {
      const { firstName, lastName, email, phone, address, notes, serviceName, startTime, endTime } = req.body;
      const { credentialsObj, calendarId } = await getGoogleCredentials();

      if (!credentialsObj || !calendarId) {
        return res.status(500).json({ error: 'Calendar credentials not configured' });
      }

      const auth = getGoogleAuth(credentialsObj);
      if (!auth) return res.status(500).json({ error: 'Failed to initialize calendar auth' });

      const calendar = google.calendar({ version: 'v3', auth });

      const event = {
        summary: `Notary Booking: ${firstName} ${lastName}`,
        location: address,
        description: `Service: ${serviceName}\nPhone: ${phone}\nEmail: ${email}\nAddress: ${address}\n\nNotes: ${notes}`,
        start: {
          dateTime: startTime,
          timeZone: 'America/New_York',
        },
        end: {
          dateTime: endTime,
          timeZone: 'America/New_York',
        },
      };

      await calendar.events.insert({
        calendarId: calendarId,
        requestBody: event,
      });

      // Save to Firebase bookings collection
      try {
        if (adminDb) {
          await adminDb.collection('bookings').add({
            first_name: firstName,
            last_name: lastName,
            email,
            phone: phone || '',
            address: address || '',
            notes: notes || '',
            service_name: serviceName,
            start_time: startTime,
            end_time: endTime,
            created_at: new Date().toISOString()
          });
          console.log('Booking saved to Firebase successfully');
        } else {
          console.warn('Firebase Admin not initialized, skipping DB save');
        }
      } catch (fbE) {
        console.error('Firebase Booking Error (Non-blocking):', fbE);
      }

      res.json({ success: true });

      // After responding, sync the customer to CRM (non-blocking)
      try {
        await syncToCrm({
          firstName,
          lastName,
          email,
          phone: phone || '',
          notes: notes || '',
          customerType: 'General Client',
          streetAddress: address || '',
          city: '',
          state: '',
          zip: ''
        });
      } catch (crmE) {
        console.error('[CRM] Non-blocking CRM sync error during booking:', crmE);
      }
    } catch (error) {
      console.error('Calendar API Error:', error);
      res.status(500).json({ error: 'Failed to create calendar event' });
    }
  });

  // API route to check calendar availability
  app.post('/api/availability', async (req, res) => {
    try {
      const { date } = req.body;
      console.log('Checking availability for date:', date);

      const { credentialsObj, calendarId } = await getGoogleCredentials();

      if (!credentialsObj || !calendarId) {
        return res.status(500).json({ error: 'Calendar credentials not configured' });
      }

      const auth = getGoogleAuth(credentialsObj);
      if (!auth) return res.status(500).json({ error: 'Failed to initialize calendar auth' });

      const calendar = google.calendar({ version: 'v3', auth });

      const baseDate = new Date(date);
      const timeMin = new Date(baseDate.getTime());
      timeMin.setUTCHours(0, 0, 0, 0);
      const queryMin = new Date(timeMin.getTime() - 12 * 60 * 60 * 1000);
      const queryMax = new Date(timeMin.getTime() + 36 * 60 * 60 * 1000);

      console.log('Querying FreeBusy range:', { min: queryMin.toISOString(), max: queryMax.toISOString() });

      const response = await calendar.freebusy.query({
        requestBody: {
          timeMin: queryMin.toISOString(),
          timeMax: queryMax.toISOString(),
          timeZone: 'America/New_York',
          items: [{ id: calendarId }]
        }
      });

      const calendarData = response.data.calendars[calendarId];
      const busySlots = calendarData ? (calendarData.busy || []) : [];
      console.log('Found busy slots:', busySlots.length);
      res.json({ busy: busySlots });
    } catch (error) {
      console.error('Availability API Error:', error);
      res.status(500).json({ error: 'Failed to fetch availability' });
    }
  });

  // API route to provide config to the frontend
  app.get('/api/config', (req, res) => {
    res.json({
      geminiKey: process.env.GEMINI_API_KEY || ''
    });
  });

  // API route to download the build
  app.get('/website-build.zip', (req, res) => {
    const zipPath = path.join(__dirname, '.tmp', 'website-build.zip');
    if (fs.existsSync(zipPath)) {
      res.setHeader('Content-Disposition', 'attachment; filename="website-build.zip"');
      res.setHeader('Content-Type', 'application/zip');
      res.sendFile(zipPath);
    } else {
      res.status(404).send('Build zip not found. Please wait for it to be generated.');
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');

    console.log('[Setup] Production mode detected');
    console.log('[Setup] Working directory:', process.cwd());
    console.log('[Setup] Serving static files from:', distPath);

    if (!fs.existsSync(distPath)) {
      console.error('[Error] dist directory not found at', distPath);
    }

    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      const indexPath = path.join(distPath, 'index.html');
      if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
      } else {
        console.error('[Error] index.html not found at', indexPath);
        res.status(404).send('index.html not found. Check server logs.');
      }
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

startServer().catch(err => {
  console.error('!!! FATAL SERVER ERROR ON STARTUP !!!');
  console.error(err);
  process.exit(1);
});
