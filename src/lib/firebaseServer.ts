import admin from 'firebase-admin';
import { getFirestore } from 'firebase-admin/firestore';

/**
 * Fixes a private key string that has had its newlines mangled.
 * Ensures the PEM key has real newline characters between base64 lines.
 */
const fixPrivateKey = (key: string): string => {
  if (!key) return key;

  // 1. Normalize escaped newlines to real newlines
  let fixed = key.replace(/\\n/g, '\n');

  // 2. Normalize headers (remove extra spaces if any)
  fixed = fixed
    .replace(/-----BEGIN PRIVATE KEY-----/g, '-----BEGIN PRIVATE KEY-----')
    .replace(/-----END PRIVATE KEY-----/g, '-----END PRIVATE KEY-----')
    .trim();

  // 3. If the key body has no newlines at all (one long base64 string),
  //    reformat it: split body into 64-char lines
  const headerToken = '-----BEGIN PRIVATE KEY-----';
  const footerToken = '-----END PRIVATE KEY-----';
  const headerIdx = fixed.indexOf(headerToken);
  const footerIdx = fixed.indexOf(footerToken);

  if (headerIdx !== -1 && footerIdx !== -1) {
    const body = fixed.substring(headerIdx + headerToken.length, footerIdx).replace(/\s/g, '');
    if (body.length > 0) {
      const lines = body.match(/.{1,64}/g) || [];
      fixed = `${headerToken}\n${lines.join('\n')}\n${footerToken}\n`;
    }
  }

  return fixed;
};

/**
 * Parses GOOGLE_SERVICE_ACCOUNT_JSON from Hostinger's mangled env var.
 * Hostinger escapes braces as \{ and \} throughout the JSON string.
 * Attempt 4 strips invalid escapes globally but also strips \n inside private_key.
 * So we: (1) fix braces only, (2) parse, (3) fix the private key separately.
 */
const parseServiceAccountJson = (raw: string): any | null => {
  // Helper: try parse, return null on failure
  const tryParse = (str: string): any | null => {
    try { return JSON.parse(str); } catch { return null; }
  };

  // ── Attempt 1: Direct parse (clean JSON) ──────────────────────────────────
  let result = tryParse(raw);
  if (result) {
    console.log('[Firebase] JSON parsed on attempt 1 (direct).');
    return result;
  }

  // ── Attempt 2: Fix Hostinger brace escaping \{ → { and \} → } ────────────
  // IMPORTANT: only replace \{ and \} — do NOT touch \n inside the private key
  const bracesFixed = raw.replace(/\\{/g, '{').replace(/\\}/g, '}');
  result = tryParse(bracesFixed);
  if (result) {
    console.log('[Firebase] JSON parsed on attempt 2 (brace-unescape only).');
    return result;
  }

  // ── Attempt 3: Fix braces + unescape quotes ───────────────────────────────
  const quotesFixed = bracesFixed.replace(/\\"/g, '"');
  result = tryParse(quotesFixed);
  if (result) {
    console.log('[Firebase] JSON parsed on attempt 3 (brace + quote unescape).');
    return result;
  }

  // ── Attempt 4: Strip ONLY backslashes before non-JSON-escape characters ───
  // Targets \{ \} \: etc. but deliberately preserves \" \n \r \t \\ \/ \uXXXX
  // This is safer than a global strip because it keeps \n intact in private_key
  const safeStripped = raw.replace(/\\([^"\\\/bfnrtu])/g, '$1');
  result = tryParse(safeStripped);
  if (result) {
    console.log('[Firebase] JSON parsed on attempt 4 (safe invalid-escape strip).');
    return result;
  }

  // ── Attempt 5: Double-encoded string ─────────────────────────────────────
  const inner = tryParse(raw);
  if (typeof inner === 'string') {
    result = tryParse(inner);
    if (result) {
      console.log('[Firebase] JSON parsed on attempt 5 (double-decode).');
      return result;
    }
  }

  console.error('[Firebase] FATAL: All JSON parse attempts failed.');
  console.error(`[Firebase] Raw first 50 chars: [${raw.substring(0, 50)}]`);
  console.error(`[Firebase] Raw last  50 chars: [${raw.substring(raw.length - 50)}]`);
  console.error(`[Firebase] Char codes at start: ${[...raw.substring(0, 10)].map(c => `${c}=${c.charCodeAt(0)}`).join(' ')}`);
  return null;
};

const initFirebase = (): admin.app.App | null => {
  if (admin.apps.length) {
    return admin.app();
  }

  // ── Path 1: Full service account JSON ────────────────────────────────────
  const fullJson = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;

  if (!fullJson || fullJson === 'undefined' || fullJson === 'null') {
    console.warn('[Firebase] GOOGLE_SERVICE_ACCOUNT_JSON is not set. Trying individual env vars.');
  } else {
    console.log(`[Firebase] GOOGLE_SERVICE_ACCOUNT_JSON is set. Raw prefix: [${fullJson.substring(0, 50)}]`);

    const credentials = parseServiceAccountJson(fullJson);

    if (!credentials) {
      return null; // errors already logged inside parseServiceAccountJson
    }

    // ── Validate required fields ────────────────────────────────────────────
    if (!credentials.project_id) {
      console.error('[Firebase] FATAL: Parsed JSON missing project_id.');
      return null;
    }
    if (!credentials.client_email) {
      console.error('[Firebase] FATAL: Parsed JSON missing client_email.');
      return null;
    }
    if (!credentials.private_key) {
      console.error('[Firebase] FATAL: Parsed JSON missing private_key.');
      return null;
    }

    // ── Fix private key AFTER parsing ───────────────────────────────────────
    // The JSON parse may have left \n as literal \n, or Hostinger's escaping
    // may have corrupted the PEM newlines. Fix them now before cert() call.
    credentials.private_key = fixPrivateKey(credentials.private_key);
    console.log(`[Firebase] Private key fixed. Length: ${credentials.private_key.length}`);
    console.log(`[Firebase] Key starts with: [${credentials.private_key.substring(0, 40)}]`);

    try {
      const app = admin.initializeApp({
        credential: admin.credential.cert(credentials),
        projectId: credentials.project_id,
      });
      console.log(`[Firebase] Admin SDK initialized via GOOGLE_SERVICE_ACCOUNT_JSON. Project: ${credentials.project_id}`);
      return app;
    } catch (e: any) {
      console.error('[Firebase] FATAL: admin.initializeApp failed:', e.message);
      console.error(`[Firebase] private_key first 80 chars after fix: [${credentials.private_key.substring(0, 80)}]`);
      return null;
    }
  }

  // ── Path 2: Individual env vars (local dev / fallback) ───────────────────
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.GOOGLE_CLIENT_EMAIL || process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const rawPrivateKey = process.env.GOOGLE_PRIVATE_KEY;

  if (!projectId) {
    console.error('[Firebase] FATAL: FIREBASE_PROJECT_ID not set and GOOGLE_SERVICE_ACCOUNT_JSON missing.');
    return null;
  }

  if (!clientEmail || !rawPrivateKey) {
    console.error('[Firebase] FATAL: client email or GOOGLE_PRIVATE_KEY is missing.');
    console.error(`[Firebase] GOOGLE_CLIENT_EMAIL:          ${process.env.GOOGLE_CLIENT_EMAIL ? 'SET' : 'MISSING'}`);
    console.error(`[Firebase] GOOGLE_SERVICE_ACCOUNT_EMAIL: ${process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL ? 'SET' : 'MISSING'}`);
    console.error(`[Firebase] GOOGLE_PRIVATE_KEY:           ${rawPrivateKey ? 'SET' : 'MISSING'}`);
    return null;
  }

  try {
    const privateKey = fixPrivateKey(rawPrivateKey);
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
  console.error('[Firebase] Check Hostinger logs for parse errors above.');
  console.error('══════════════════════════════════════════════════════');
  console.error('');
}

if (firebaseApp && !adminDb) {
  console.error('[Firebase] FATAL: adminDb is null even though app initialized. Check FIREBASE_DATABASE_ID.');
}
