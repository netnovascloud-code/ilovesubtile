// Password-based AES-256-GCM container for arbitrary binary files.
//
// File wire format (binary, ".enc"):
//   [0..3]    magic "KEC1" (Konver Encrypted Container v1)
//   [4..19]   16-byte PBKDF2 salt
//   [20..31]  12-byte AES-GCM IV
//   [32..]    AES-GCM ciphertext (+ 16-byte authentication tag appended)
//
// The plaintext that gets encrypted is:
//   uint16 BE: filename byte-length L
//   L bytes  : original filename, UTF-8
//   N bytes  : original file bytes
//
// Keeping the filename inside the encrypted blob means a casual observer of
// the .enc file can't tell what the original file was called. On decryption
// the filename is recovered automatically.
//
// KDF: PBKDF2-HMAC-SHA256, 600 000 iterations (OWASP 2023). All container
// bytes after the magic are authenticated by GCM; tampering with the salt,
// IV or ciphertext yields a single OperationError on decryption.

const MAGIC = new TextEncoder().encode("KEC1");
const SALT_LEN = 16;
const IV_LEN = 12;
const ITERATIONS = 600_000;

const enc = new TextEncoder();
const dec = new TextDecoder();

async function deriveKey(password: string, salt: Uint8Array): Promise<CryptoKey> {
  const base = await crypto.subtle.importKey(
    "raw",
    enc.encode(password),
    "PBKDF2",
    false,
    ["deriveKey"],
  );
  return crypto.subtle.deriveKey(
    { name: "PBKDF2", salt: salt as BufferSource, iterations: ITERATIONS, hash: "SHA-256" },
    base,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"],
  );
}

function concatU8(parts: Uint8Array[]): Uint8Array {
  const total = parts.reduce((n, p) => n + p.length, 0);
  const out = new Uint8Array(total);
  let off = 0;
  for (const p of parts) { out.set(p, off); off += p.length; }
  return out;
}

export type EncryptResult = { blob: Blob; suggestedName: string };

export async function encryptFile(file: File, password: string): Promise<EncryptResult> {
  if (!password) throw new Error("Password is required.");
  if (!file) throw new Error("Pick a file first.");
  const salt = crypto.getRandomValues(new Uint8Array(SALT_LEN));
  const iv = crypto.getRandomValues(new Uint8Array(IV_LEN));
  const key = await deriveKey(password, salt);

  const nameBytes = enc.encode(file.name);
  if (nameBytes.length > 0xffff) throw new Error("Filename is too long to embed.");
  const nameHeader = new Uint8Array(2);
  new DataView(nameHeader.buffer).setUint16(0, nameBytes.length, false);

  const fileBytes = new Uint8Array(await file.arrayBuffer());
  const plaintext = concatU8([nameHeader, nameBytes, fileBytes]);
  const cipher = new Uint8Array(
    await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, plaintext as BufferSource),
  );

  const blobBytes = concatU8([MAGIC, salt, iv, cipher]);
  return {
    blob: new Blob([blobBytes as BlobPart], { type: "application/octet-stream" }),
    suggestedName: `${file.name}.enc`,
  };
}

export type DecryptResult = { blob: Blob; suggestedName: string };

export async function decryptFile(file: File, password: string): Promise<DecryptResult> {
  if (!password) throw new Error("Password is required.");
  if (!file) throw new Error("Pick a .enc file first.");
  const bytes = new Uint8Array(await file.arrayBuffer());
  if (bytes.length < MAGIC.length + SALT_LEN + IV_LEN + 16) {
    throw new Error("This file is too short to be a Konver-encrypted container.");
  }
  for (let i = 0; i < MAGIC.length; i++) {
    if (bytes[i] !== MAGIC[i]) {
      throw new Error("This file doesn't look like a Konver-encrypted container (missing KEC1 header).");
    }
  }
  const salt = bytes.slice(MAGIC.length, MAGIC.length + SALT_LEN);
  const iv = bytes.slice(MAGIC.length + SALT_LEN, MAGIC.length + SALT_LEN + IV_LEN);
  const cipher = bytes.slice(MAGIC.length + SALT_LEN + IV_LEN);
  const key = await deriveKey(password, salt);

  let plaintext: Uint8Array;
  try {
    plaintext = new Uint8Array(
      await crypto.subtle.decrypt({ name: "AES-GCM", iv }, key, cipher),
    );
  } catch {
    throw new Error("Decryption failed — wrong password or the file was modified.");
  }

  if (plaintext.length < 2) throw new Error("Decrypted payload is malformed.");
  const nameLen = new DataView(plaintext.buffer, plaintext.byteOffset, 2).getUint16(0, false);
  if (plaintext.length < 2 + nameLen) throw new Error("Decrypted payload is malformed.");
  const name = dec.decode(plaintext.slice(2, 2 + nameLen));
  const body = plaintext.slice(2 + nameLen);

  return {
    blob: new Blob([body], { type: "application/octet-stream" }),
    suggestedName: name || "decrypted",
  };
}
