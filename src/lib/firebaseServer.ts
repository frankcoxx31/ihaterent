import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

function parseServiceAccountJson(): any {
  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (!raw) throw new Error('GOOGLE_SERVICE_ACCOUNT_JSON is not set');

  const attempts = [
    () => JSON.parse(raw),
    () => JSON.parse(raw.replace(/\\{/g, '{').replace(/\\}/g, '}')),
    () => JSON.parse(raw.replace(/\\{/g, '{').replace(/\\}/g, '}').replace(/\\"/g, '"')),
    () => JSON.parse(raw.replace(/\\([^"\\\/bfnrtu])/g, '$1')),
  ];

  for (let i = 0; i < attempts.length; i++) {
    try {
      const result = attempts[i]();
      console.log(`[Firebase] JSON parsed successfully on attempt ${i + 1}`);
      return result;
    } catch (e) {
      console.warn(`[Firebase] Parse attempt ${i + 1} failed`);
    }
  }
  throw new Error('All JSON parse attempts failed for GOOGLE_SERVICE_ACCOUNT_JSON');
}

function fixPrivateKey(key: string): string {
  if (!key) return key;
  key = key.replace(/\\n/g, '\n');
  if (
    key.includes('-----BEGIN RSA PRIVATE KEY-----') ||
    key.includes('-----BEGIN PRIVATE KEY-----')
  ) {
    const header = key.match(/-----BEGIN [^-]+-----/)?.[0] || '-----BEGIN PRIVATE KEY-----';
    const footer = key.match(/-----END [^-]+-----/)?.[0] || '-----END PRIVATE KEY-----';
    const body = key
      .replace(/-----BEGIN [^-]+-----/, '')
      .replace(/-----END [^-]+-----/, '')
      .replace(/\s+/g, '');
    const lines = body.match(/.{1,64}/g)?.join('\n') || body;
    return `${header}\n${lines}\n${footer}`;
  }
  return key;
}

let adminDb: FirebaseFirestore.Firestore | null = null;

try {
  const serviceAccount = parseServiceAccountJson();
  serviceAccount.private_key = fixPrivateKey(serviceAccount.private_key);

  if (!getApps().length) {
    initializeApp({ credential: cert(serviceAccount) });
  }

  const rawDbId = process.env.FIREBASE_DATABASE_ID || '';
  const useDefault =
    !rawDbId ||
    ['', '(default)', 'undefined', 'null'].includes(rawDbId.trim());

  adminDb = useDefault ? getFirestore() : getFirestore(rawDbId.trim());
  console.log(
    `[Firebase] Connected to Firestore: ${useDefault ? 'default' : rawDbId.trim()}`
  );
} catch (e: any) {
  console.error('[Firebase] Failed to initialize:', e?.message || e);
}

export { adminDb };
