
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
    const { privateKey, clientEmail, calendarId, fallbackStatus, fallbackError, source, credentialsObj } = getGoogleCredentials();
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
      const { credentialsObj, calendarId } = getGoogleCredentials();

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
      
      const { credentialsObj, calendarId } = getGoogleCredentials();

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

// --- APPOINTMENT REQUEST ---
  app.post('/api/appointment', async (req, res) => {
    const { full_name, email, phone, service_type, appointment_date, appointment_time, location, notes } = req.body;
    try {
      const { error } = await db.from('appointments').insert([
        { full_name, email, phone, service_type, appointment_date, appointment_time, location, notes }
      ]);
      if (error) throw error;
      res.json({ success: true, message: 'Appointment booked!' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  });

  // --- CLIENT INTAKE ---
  app.post('/api/intake', async (req, res) => {
    const { full_name, email, phone, id_type, id_number, document_type } = req.body;
    try {
      const { error } = await db.from('client_intake').insert([
        { full_name, email, phone, id_type, id_number, document_type }
      ]);
      if (error) throw error;
      res.json({ success: true, message: 'Intake form submitted!' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  });

  // --- CONTACT / QUOTE REQUEST ---
  app.post('/api/contact', async (req, res) => {
    const { full_name, email, phone, message, service_interest } = req.body;
    try {
      const { error } = await db.from('contact_requests').insert([
        { full_name, email, phone, message, service_interest }
      ]);
      if (error) throw error;
      res.json({ success: true, message: 'Message received!' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: 'Server error' });
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
