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

    // 3. Fallback to baked-in credentials if still missing or looks like a personal email
    // Service account emails MUST end in .gserviceaccount.com
    const isServiceAccountEmail = clientEmail && clientEmail.includes('.gserviceaccount.com');
    let credentialsObj: any = null;
    
    if (!privateKey || !isServiceAccountEmail || (privateKey && privateKey.length < 100)) {
      fallbackStatus = "FALLBACK_FILE_MISSING_OR_INVALID";
    }

    // 4. Clean the private key
    if (privateKey && typeof privateKey === 'string') {
      const cleanKey = (key: string) => {
        if (!key) return key;
        
        // 1. Basic trimming and quote removal (handling potential double-quoted env vars)
        let processed = key.trim();
        while ((processed.startsWith('"') && processed.endsWith('"')) || 
               (processed.startsWith("'") && processed.endsWith("'"))) {
          processed = processed.substring(1, processed.length - 1).trim();
        }

        // 2. Handle escaped newlines (very common in env vars)
        processed = processed.replace(/\\n/g, '\n');
        
        // 3. Normalize headers (case-insensitive and whitespace-tolerant)
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
        
        // 4. Clean the body: remove ALL whitespace, non-base64 characters
        // We only keep characters that are valid in base64: A-Z, a-z, 0-9, +, /, =
        const cleanBody = body.replace(/[^A-Za-z0-9+/=]/g, '');
        
        // 5. Reconstruct with standard format
        // Node's crypto (used by google-auth-library) is most compatible with exactly this format
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

    // If we don't have a credentials object yet (from fallback), create one for fromJSON
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
    
    // Explicitly use JWT constructor for maximum control over parameters
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
        NODE_ENV: process.env.NODE_ENV || 'development'
      }
    });
  });

  // --- CRM Integration ---
  const CRM_CUSTOMER_COLLECTION = 'customers';
  const ENABLE_CRM_SYNC = true;

  /**
   * Helper to generate a 9-character alphanumeric ID for CRM records
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
   * Helper to sync a customer record to the CRM Firestore collection.
   */
  async function syncToCrm(customerData: any) {
    const ownerUserId = process.env.CRM_OWNER_USER_ID;
    console.log(`[CRM] syncToCrm called for: ${customerData.email || 'no-email'}`);
    
    if (!adminDb) {
      console.error('[CRM] ERROR: Firestore Admin SDK (adminDb) is not initialized.');
      return null;
    }

    if (!ENABLE_CRM_SYNC) {
      console.log('[CRM] Sync skipped: ENABLE_CRM_SYNC is false.');
      return null;
    }

    if (!ownerUserId) {
      console.error('[CRM] CONFIG ERROR: CRM_OWNER_USER_ID is missing from environment variables. CRM sync failed.');
      return null;
    }

    console.log(`[CRM] Using Owner UID: ${ownerUserId}`);

    try {
      const { email, phone, firstName, lastName } = customerData;
      
      // 1. Deduplication logic: check by email first, then phone
      let existingDoc = null;

      if (email) {
        console.log(`[CRM] Searching for existing customer with email: ${email}`);
        const emailQuery = await adminDb.collection(CRM_CUSTOMER_COLLECTION)
          .where('userId', '==', ownerUserId)
          .where('email', '==', email)
          .limit(1)
          .get();
        if (!emailQuery.empty) {
          existingDoc = emailQuery.docs[0];
          console.log(`[CRM] Found match by email: ${existingDoc.id}`);
        }
      }

      if (!existingDoc && phone) {
        console.log(`[CRM] Searching for existing customer with phone: ${phone}`);
        const phoneQuery = await adminDb.collection(CRM_CUSTOMER_COLLECTION)
          .where('userId', '==', ownerUserId)
          .where('phone', '==', phone)
          .limit(1)
          .get();
        if (!phoneQuery.empty) {
          existingDoc = phoneQuery.docs[0];
          console.log(`[CRM] Found match by phone: ${existingDoc.id}`);
        }
      }

      const now = new Date().toISOString();
      const fullName = `${firstName || ''} ${lastName || ''}`.trim();
      
      // Target payload following CRM schema
      const payload = {
        userId: ownerUserId,
        firstName: firstName || '',
        lastName: lastName || '',
        fullName: fullName || '',
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
        updatedBy: 'website-form'
      };

      if (existingDoc) {
        console.log(`[CRM] Updating existing customer record: ${existingDoc.id}`);
        await existingDoc.ref.update(payload);
        return existingDoc.id;
      } else {
        const customId = generateCrmId();
        console.log(`[CRM] Creating NEW customer record with ID: ${customId}`);
        await adminDb.collection(CRM_CUSTOMER_COLLECTION).doc(customId).set({
          ...payload,
          id: customId,
          createdAt: now,
          createdBy: 'website-form',
          tags: ['website-lead']
        });
        console.log(`[CRM] Successfully created customer: ${customId}`);
        return customId;
      }
    } catch (error) {
      console.error('[CRM] Sync Error Exception:', error);
      throw error;
    }
  }

  // API route to handle contact form and CRM customer creation
  app.post('/api/contact', async (req, res) => {
    console.log('[API] Received POST /api/contact');
    console.log('[API] Request Body:', JSON.stringify(req.body, null, 2));

    try {
      const { firstName, lastName, email, phone, message } = req.body;
      
      if (!firstName || !lastName || !email) {
        console.warn('[API] Validation failed: Missing required fields');
        return res.status(400).json({ error: 'Missing required fields' });
      }

      // 1. Save to a general "messages" collection for this website specifically
      if (adminDb) {
        console.log('[API] Saving to "messages" collection...');
        await adminDb.collection('messages').add({
          firstName,
          lastName,
          email,
          phone: phone || "",
          message: message || "",
          createdAt: new Date().toISOString()
        });
        console.log('[API] Saved to "messages" successfully.');
      } else {
        console.warn('[API] adminDb not available for "messages" save.');
      }

      // 2. Sync to CRM as a customer record
      console.log('[API] Initiating CRM sync...');
      const customerId = await syncToCrm({
        firstName,
        lastName,
        email,
        phone: phone || "",
        notes: message || "",
        customerType: 'General Client'
      });
      console.log(`[API] CRM sync completed. CustomerID: ${customerId || 'NONE'}`);

      res.json({ success: true, customerId });
    } catch (error) {
      console.error('[API] Contact API Error Exception:', error);
      res.status(500).json({ error: 'Internal server error', details: error.message });
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

      const calendarEvent = await calendar.events.insert({
        calendarId: calendarId,
        requestBody: event,
      });
      const googleCalendarEventId = calendarEvent.data.id || '';
      console.log(`[API] Google Calendar event created. ID: ${googleCalendarEventId}`);

      // Save to Firebase
      try {
        if (adminDb) {
          await adminDb.collection('bookings').add({
            first_name: firstName,
            last_name: lastName,
            email,
            phone: phone || "",
            address: address || "",
            notes: notes || "",
            service_name: serviceName,
            start_time: startTime,
            end_time: endTime,
            created_at: new Date().toISOString() // Using ISO string for now to match rules isValidBooking check
          });
          console.log('Booking saved to Firebase successfully');
        } else {
          console.warn('Firebase Admin not initialized, skipping DB save');
        }
      } catch (fbE) {
        console.error('Firebase Booking Error (Non-blocking):', fbE);
      }

      // Write appointment to CRM /appointments collection
      try {
        if (adminDb) {
          const ownerUserId = process.env.CRM_OWNER_USER_ID;
          if (!ownerUserId) {
            console.error('[CRM] CRM_OWNER_USER_ID missing — skipping appointment write.');
          } else {
            const startDate = new Date(startTime);

            const dateStr = startDate.toLocaleDateString('en-CA', {
              timeZone: 'America/New_York'
            });

            const timeStr = startDate.toLocaleTimeString('en-US', {
              timeZone: 'America/New_York',
              hour: 'numeric',
              minute: '2-digit',
              hour12: true
            });

            const sortableDateTime = startDate.toISOString();
            const appointmentId = generateCrmId();
            const now = new Date().toISOString();

            const appointmentRecord = {
              id: appointmentId,
              userId: ownerUserId,
              firstName: firstName || '',
              lastName: lastName || '',
              customerName: `${firstName || ''} ${lastName || ''}`.trim(),
              email: email || '',
              phone: phone || '',
              address: address || '',
              city: '',
              state: '',
              zip: '',
              location: address || '',
              date: dateStr,
              time: timeStr,
              sortableDateTime: sortableDateTime,
              notes: notes || '',
              signingType: serviceName || 'General Notary',
              actType: '',
              docType: '',
              docs: [],
              status: 'Scheduled',
              fee: 0,
              agreedFee: 0,
              offeredFee: 0,
              amountCollected: 0,
              amountOutstanding: 0,
              estimatedProfit: 0,
              totalJobCost: 0,
              travelCost: 0,
              printingCost: 0,
              otherSigningCost: 0,
              parkingTollsCost: 0,
              milesDriven: 0,
              mileageRate: 0.725,
              roundTripMiles: true,
              profitMarginPercent: 0,
              paymentStatus: 'Not Sent',
              paymentMethod: '',
              paymentDueDate: '',
              invoiceNumber: '',
              invoiceSent: false,
              scanbackStatus: 'Not Required',
              companyId: '',
              companyName: '',
              signingCompany: '',
              signers: [
                {
                  id: generateCrmId(),
                  firstName: firstName || '',
                  lastName: lastName || '',
                  email: email || '',
                  phone: phone || '',
                  address: address || '',
                  city: '',
                  state: '',
                  zip: ''
                }
              ],
              googleCalendarEventId: googleCalendarEventId,
              source: 'website',
              createdBy: 'website-form',
              createdAt: now,
              updatedAt: now,
            };

            await adminDb.collection('appointments').doc(appointmentId).set(appointmentRecord);
            console.log(`[CRM] Appointment created successfully. ID: ${appointmentId}`);
          }
        }
      } catch (apptE: any) {
        console.error('[CRM] Appointment write error (non-blocking):', apptE.message);
      }

      res.json({ success: true });

      // After booking, also sync the customer to CRM
      try {
        await syncToCrm({
          firstName,
          lastName,
          email,
          phone: phone || "",
          notes: notes || "",
          customerType: 'General Client',
          streetAddress: address || "",
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
      const { date } = req.body; // e.g., "2023-10-25"
      console.log('Checking availability for date:', date);
      
      const { credentialsObj, calendarId } = await getGoogleCredentials();

      if (!credentialsObj || !calendarId) {
        return res.status(500).json({ error: 'Calendar credentials not configured' });
      }

      const auth = getGoogleAuth(credentialsObj);
      if (!auth) return res.status(500).json({ error: 'Failed to initialize calendar auth' });

      const calendar = google.calendar({ version: 'v3', auth });

      // Set time range for the requested date in America/New_York
      // The frontend sends selectedDate.toISOString() which is browser-local midnight in UTC.
      // We want to ensure we query the full 24h window for that calendar date.
      const baseDate = new Date(date);
      
      // Calculate midnight NY in UTC (roughly 4-5 hours offset)
      // A safe way is to just take the date part and create a UTC range that covers any possible NY window.
      // More precisely, we can just use the date sent as a baseline.
      const timeMin = new Date(baseDate.getTime());
      timeMin.setUTCHours(0, 0, 0, 0);
      // Extend the search range slightly to ensure we catch any overlapping events (e.g. 12h before and 12h after)
      // to be absolutely sure we don't miss UTC shifts.
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

  // API route to provide config to the frontend (e.g. Gemini key)
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
    // In production, the server file is at dist/server.mjs
    // Static files are in the same folder as siblings
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
