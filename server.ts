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
        // Remove surrounding quotes and whitespace
        let processed = key.trim().replace(/^["']|["']$/g, "").trim();
        
        // Handle double quotes from being saved in env twice
        if ((processed.startsWith('"') && processed.endsWith('"')) || 
            (processed.startsWith("'") && processed.endsWith("'"))) {
          processed = processed.substring(1, processed.length - 1).trim();
        }

        // Handle escaped newlines (very common in env vars)
        processed = processed.replace(/\\n/g, '\n');
        
        // Extract the base64 part from between headers if they exist
        // This regex is very forgiving of internal whitespace
        const match = processed.match(/-----BEGIN (?:RSA )?PRIVATE KEY-----([\s\S]*)-----END (?:RSA )?PRIVATE KEY-----/);
        
        if (match) {
          // Normalize the body by removing ALL whitespace/newlines
          const base64Body = match[1].replace(/\s/g, '');
          // Re-wrap with standard headers and a single newline
          return `-----BEGIN PRIVATE KEY-----\n${base64Body}\n-----END PRIVATE KEY-----\n`;
        }
        
        // If no headers found, but it looks like a long base64 string, wrap it
        const simpleBase64 = processed.replace(/\s/g, '');
        if (simpleBase64.length > 500) {
          return `-----BEGIN PRIVATE KEY-----\n${simpleBase64}\n-----END PRIVATE KEY-----\n`;
        }
        
        return processed;
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
    
    // Explicitly use fromJSON which handles the credential object format
    const auth = google.auth.fromJSON(credentialsObj) as any;
    if (auth) {
      auth.scopes = ['https://www.googleapis.com/auth/calendar'];
    }
    
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

      res.json({ success: true });
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
