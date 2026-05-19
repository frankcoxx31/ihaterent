import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import fs from 'fs';
import { google } from 'googleapis';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = process.env.PORT || 3000;

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
    let credentialsObj = null;
    
    if (!privateKey || !isServiceAccountEmail || (privateKey && privateKey.length < 100)) {
      fallbackStatus = "ATTEMPTING_FALLBACK_FILE";
      try {
        const secretPath = path.join(__dirname, 'calendar-secret.js');
        if (fs.existsSync(secretPath)) {
          const { ENCODED_CREDENTIALS } = await import('./calendar-secret.js');
          const cleanEncoded = ENCODED_CREDENTIALS.trim();
          const decoded = Buffer.from(cleanEncoded, 'base64').toString('utf8');
          credentialsObj = JSON.parse(decoded);
          
          // Force fallback if the current ones are broken or not service account
          privateKey = credentialsObj.private_key;
          clientEmail = credentialsObj.client_email;
          source = "FALLBACK_FILE";
          fallbackStatus = "FALLBACK_FILE_SUCCESS";
        } else {
          fallbackStatus = "FALLBACK_FILE_MISSING";
        }
      } catch (e) {
        fallbackStatus = "FALLBACK_FILE_FAILED";
        fallbackError = e.message;
      }
    }

    // 4. Clean the private key
    if (privateKey && typeof privateKey === 'string') {
      privateKey = privateKey.replace(/['"]/g, '').trim();
      if (!privateKey.includes('BEGIN PRIVATE KEY')) {
        privateKey = privateKey.replace(/\\n/g, '').replace(/\s/g, '');
        privateKey = `-----BEGIN PRIVATE KEY-----\n${privateKey}\n-----END PRIVATE KEY-----\n`;
      } else {
        privateKey = privateKey.replace(/\\n/g, '\n');
      }
    }

    // 5. Clean Calendar ID
    if (calendarId && typeof calendarId === 'string') {
      calendarId = calendarId.replace(/['"]/g, '').trim();
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

  // API route for health check and environment variable verification
  app.get('/api/health', async (req, res) => {
    const { privateKey, clientEmail, calendarId, fallbackStatus, fallbackError, source, credentialsObj } = await getGoogleCredentials();
    const geminiKey = process.env.GEMINI_API_KEY;

    let authTest = "NOT_STARTED";
    let authError = null;
    let keyPreview = "NONE";

    if (privateKey) {
      keyPreview = `${privateKey.substring(0, 20)}... (Length: ${privateKey.length})`;
    }

    try {
      if (credentialsObj && calendarId) {
        // Use fromJSON for maximum compatibility
        const auth = google.auth.fromJSON(credentialsObj);
        auth.scopes = ['https://www.googleapis.com/auth/calendar'];
        
        const token = await auth.authorize();
        authTest = `SUCCESS: Token acquired! (Expires: ${new Date(token.expiry_date).toLocaleTimeString()})`;
        
        const calendar = google.calendar({ version: 'v3', auth });
        const events = await calendar.events.list({ 
          calendarId, 
          maxResults: 1,
          timeMin: new Date().toISOString()
        });
        authTest += ` | Calendar is accessible. Found ${events.data.items?.length || 0} upcoming events.`;
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

    res.json({
      status: 'ok',
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

      const auth = google.auth.fromJSON(credentialsObj);
      auth.scopes = ['https://www.googleapis.com/auth/calendar'];

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
        resource: event,
      });

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

      const auth = google.auth.fromJSON(credentialsObj);
      auth.scopes = ['https://www.googleapis.com/auth/calendar'];

      const calendar = google.calendar({ version: 'v3', auth });

      // Set time range for the requested date (from midnight to midnight next day)
      const timeMin = new Date(date);
      timeMin.setHours(0, 0, 0, 0);
      
      const timeMax = new Date(date);
      timeMax.setHours(23, 59, 59, 999);

      console.log('Querying freebusy for:', { timeMin: timeMin.toISOString(), timeMax: timeMax.toISOString() });

      const response = await calendar.freebusy.query({
        requestBody: {
          timeMin: timeMin.toISOString(),
          timeMax: timeMax.toISOString(),
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
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

startServer();
