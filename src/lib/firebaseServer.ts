import admin from 'firebase-admin';
import { getFirestore } from 'firebase-admin/firestore';

/**
 * Initializes Firebase Admin SDK.
 * Primary:  GOOGLE_SERVICE_ACCOUNT_JSON (full JSON blob) — used on Hostinger
 * Fallback: FIREBASE_PROJECT_ID + GOOGLE_CLIENT_EMAIL / GOOGLE_SERVICE_ACCOUNT_EMAIL + GOOGLE_PRIVATE_KEY
 */
const initFirebase = (): admin.app.App | null => {
  if (admin.apps.length) {
    return admin.app();
  }

  // ── Path 1: Full service account JSON (Hostinger production) ──────────────
  const fullJson = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;

  if (!fullJson || fullJson === 'undefined' || fullJson === 'null') {
    console.warn('[Firebase] GOOGLE_SERVICE_ACCOUNT_JSON is not set. Trying individual env vars.');
  } else {
    console.log(`[Firebase] GOOGLE_SERVICE_ACCOUNT_JSON is set. Raw prefix: [${fullJson.substring(0, 50)}]`);

    let credentials: any = null;

    // ── Attempt 1: Parse directly ────────────────────────────────────────────
    try {
      credentials = JSON.parse(fullJson);
      console.log('[Firebase] JSON parsed successfully on first attempt.');
    } catch (e1: any) {
      console.warn('[Firebase] Direct parse failed:', e1.message);
      console.warn(`[Firebase] Raw value first 50 chars: [${fullJson.substring(0, 50)}]`);

      // ── Attempt 2: Strip leading backslash-brace (Hostinger escaping) ──────
      // Hostinger sometimes stores \{ instead of { at the start
      try {
        const stripped = fullJson.replace(/^\\+/, '').trim();
        credentials = JSON.parse(stripped);
        console.log('[Firebase] JSON parsed successfully after stripping leading backslashes.');
      } catch (e2: any) {
        console.warn('[Firebase] Strip-leading-backslash parse failed:', e2.message);

        // ── Attempt 3: Unescape all backslash-escaped characters ─────────────
        // Hostinger may double-escape the entire JSON string
        try {
          const unescaped = fullJson
            .replace(/\\"/g, '"')   // \" → "
            .replace(/\\n/g, '\n')  // \n → newline
            .replace(/\\r/g, '')    // \r → strip
            .replace(/\\t/g, '\t')  // \t → tab
            .replace(/\\\\/g, '\\') // \\ → \
            .trim();
          credentials = JSON.parse(unescaped);
          console.log('[Firebase] JSON parsed successfully after unescaping.');
        } catch (e3: any) {
          console.warn('[Firebase] Unescape parse failed:', e3.message);

          // ── Attempt 4: Treat as JSON string literal (double-encoded) ────────
          // Some hosts wrap the JSON in an outer string: "{\"type\":\"service_account\"...}"
          try {
            const inner = JSON.parse(fullJson); // parse outer string
            if (typeof inner === 'string') {
              credentials = JSON.parse(inner);   // parse inner JSON
              console.log('[Firebase] JSON parsed successfully after double-decode.');
            } else {
              credentials = inner;
              console.log('[Firebase] JSON parsed successfully as already-decoded object.');
            }
          } catch (e4: any) {
            console.error('[Firebase] FATAL: All JSON parse attempts failed.');
            console.error(`[Firebase] Attempt 1 (direct):         ${e1.message}`);
            console.error(`[Firebase] Attempt 2 (strip backslash): ${e2.message}`);
            console.error(`[Firebase] Attempt 3 (unescape):        ${e3.message}`);
            console.error(`[Firebase] Attempt 4 (double-decode):   ${e4.message}`);
            console.error(`[Firebase] Raw value first 50 chars:    [${fullJson.substring(0, 50)}]`);
            console.error(`[Firebase] Raw value last  50 chars:    [${fullJson.substring(fullJson.length - 50)}]`);
            return null;
          }
        }
      }
    }

    // ── Validate required fields ─────────────────────────────────────────────
    if (!credentials?.project_id) {
      console.error('[Firebase] FATAL: Parsed JSON is missing project_id.');
      return null;
    }
    if (!credentials?.client_email) {
      console.error('[Firebase] FATAL: Parsed JSON is missing client_email.');
      return null;
    }
    if (!credentials?.private_key) {
      console.error('[Firebase] FATAL: Parsed JSON is missing private_key.');
      return null;
    }

    try {
      const app = admin.initializeApp({
        credential: admin.credential.cert(credentials),
        projectId: credentials.project_id,
      });
      console.log(`[Firebase] Admin SDK initialized via GOOGLE_SERVICE_ACCOUNT_JSON. Project: ${credentials.project_id}`);
      return app;
    } catch (e: any) {
      console.error('[Firebase] FATAL: admin.initializeApp failed:', e.message);
      return null;
    }
  }

  // ── Path 2: Individual env vars (local dev / fallback) ────────────────────
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.GOOGLE_CLIENT_EMAIL || process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const rawPrivateKey = process.env.GOOGLE_PRIVATE_KEY;

  if (!projectId) {
    console.error('[Firebase] FATAL: FIREBASE_PROJECT_ID is not set and GOOGLE_SERVICE_ACCOUNT_JSON is missing. Firebase cannot initialize.');
    return null;
  }

  if (!clientEmail || !rawPrivateKey) {
    console.error('[Firebase] FATAL: client email or GOOGLE_PRIVATE_KEY is missing. Firebase cannot initialize.');
    console.error(`[Firebase] GOOGLE_CLIENT_EMAIL:        ${process.env.GOOGLE_CLIENT_EMAIL ? 'SET' : 'MISSING'}`);
    console.error(`[Firebase] GOOGLE_SERVICE_ACCOUNT_EMAIL: ${process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL ? 'SET' : 'MISSING'}`);
    console.error(`[Firebase] GOOGLE_PRIVATE_KEY:         ${process.env.GOOGLE_PRIVATE_KEY ? 'SET' : 'MISSING'}`);
    return null;
  }

  try {
    const privateKey = rawPrivateKey.replace(/\\n/g, '\n');
    const app = admin.initializeApp({
      credential: admin.credential.cert({ projectId, clientEmail, privateKey }),
      projectId,
    });
    console.log(`[Firebase] Admin SDK initialized via individual env vars. Project: ${projectId}`);
    return app;
  } catch (e: any) {
    console.error('[Firebase] FATAL: Failed to initialize with individual env vars:', e.message);
    return null;
  }
};

const firebaseApp = initFirebase();

// Always default to the (default) Firestore database unless explicitly set otherwise.
const rawDbId = process.env.FIREBASE_DATABASE_ID;
const useDefaultDb =
  !rawDbId ||
  rawDbId.trim() === '' ||
  rawDbId.trim() === '(default)' ||
  rawDbId.trim() === 'undefined' ||
  rawDbId.trim() === 'null';

export const adminDb = firebaseApp
  ? getFirestore(useDefaultDb ? undefined : rawDbId.trim())
  : null;

export const adminAuth = firebaseApp ? admin.auth() : null;

if (!firebaseApp) {
  console.error('');
  console.error('══════════════════════════════════════════════════════');
  console.error('[Firebase] FATAL: Admin SDK did NOT initialize.');
  console.error('[Firebase] All Firestore writes will be skipped.');
  console.error('[Firebase] Check Hostinger logs for the exact parse error above.');
  console.error('══════════════════════════════════════════════════════');
  console.error('');
}

if (firebaseApp && !adminDb) {
  console.error('[Firebase] FATAL: adminDb is null even though app initialized. Check FIREBASE_DATABASE_ID.');
}
