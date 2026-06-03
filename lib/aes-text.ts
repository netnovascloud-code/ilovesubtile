// Password-based AES-256-GCM container for arbitrary UTF-8 text.
//
// Wire format (all bytes are concatenated, then base64'd):
//   [0..15]   16-byte PBKDF2 salt
//   [16..27]  12-byte AES-GCM IV (nonce)
//   [28..]    ciphertext || 16-byte GCM authentication tag
//
// KDF: PBKDF2-HMAC-SHA256, 600 000 iterations — OWASP 2023 recommendation.
// Cipher: AES-256-GCM via WebCrypto. Both salt and IV are freshly random per
// encryption so re-encrypting the same plaintext with the same password
// never produces the same blob (preserving semantic security).

const SALT_LEN = 16;
const IV_LEN = 12;
const ITERATIONS = 600_000;

const enc = new TextEncoder();
const dec = new TextDecoder();

function bytesToB64(bytes: Uint8Array): string {
  let s = "";
  for (let i = 0; i < bytes.length; i++) s += String.fromCharCode(bytes[i]);
  return btoa(s);
}

function b64ToBytes(s: string): Uint8Array {
  // Tolerate whitespace from copy-paste.
  const clean = s.replace(/\s+/g, "");
  const bin = atob(clean);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

async function deriveKey(password: string, salt: Uint8Array): Promise<CryptoKey> {
  const base = await crypto.subtle.importKey(
    "raw",
    enc.encode(password),
    "PBKDF2",
    false,
    ["deriveKey"],
  );
  return crypto.subtle.deriveKey(
    // Cast to BufferSource — TS 5.x narrows new Uint8Array() to
    // Uint8Array<ArrayBufferLike>, which the lib.dom WebCrypto signatures
    // don't accept directly even though it's the canonical input. The
    // runtime works fine; this is purely a typing nit.
    { name: "PBKDF2", salt: salt as BufferSource, iterations: ITERATIONS, hash: "SHA-256" },
    base,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"],
  );
}

export async function encryptText(plaintext: string, password: string): Promise<string> {
  if (!password) throw new Error("Password is required.");
  if (!plaintext) throw new Error("Nothing to encrypt.");
  const salt = crypto.getRandomValues(new Uint8Array(SALT_LEN));
  const iv = crypto.getRandomValues(new Uint8Array(IV_LEN));
  const key = await deriveKey(password, salt);
  const cipher = new Uint8Array(
    await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, enc.encode(plaintext)),
  );
  const out = new Uint8Array(salt.length + iv.length + cipher.length);
  out.set(salt, 0);
  out.set(iv, salt.length);
  out.set(cipher, salt.length + iv.length);
  return bytesToB64(out);
}

export async function decryptText(blob: string, password: string): Promise<string> {
  if (!password) throw new Error("Password is required.");
  if (!blob) throw new Error("Nothing to decrypt.");
  let bytes: Uint8Array;
  try {
    bytes = b64ToBytes(blob.trim());
  } catch {
    throw new Error("The ciphertext is not valid base64.");
  }
  if (bytes.length < SALT_LEN + IV_LEN + 16) {
    throw new Error("The ciphertext is too short to be a valid encrypted blob.");
  }
  const salt = bytes.slice(0, SALT_LEN);
  const iv = bytes.slice(SALT_LEN, SALT_LEN + IV_LEN);
  const cipher = bytes.slice(SALT_LEN + IV_LEN);
  const key = await deriveKey(password, salt);
  try {
    const plain = await crypto.subtle.decrypt({ name: "AES-GCM", iv }, key, cipher);
    return dec.decode(plain);
  } catch {
    // GCM throws a single opaque OperationError for any tag/key failure —
    // surface the user-friendly cause (wrong password or tampered blob).
    throw new Error("Decryption failed — wrong password or the ciphertext was modified.");
  }
}
