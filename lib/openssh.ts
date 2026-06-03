// OpenSSH key encoders. Pure browser-side: produces the same wire format as
// `ssh-keygen` so the output drops into ~/.ssh/authorized_keys, GitHub or any
// SSH client. References: PROTOCOL.key in the openssh-portable source tree
// and draft-miller-ssh-agent-08.
//
// Public-key line format (one line, base64'd binary):
//   <type> <base64-blob> <comment>
// Private-key file format ("openssh-key-v1\\0…" magic, base64'd, wrapped in
// -----BEGIN OPENSSH PRIVATE KEY----- / -----END OPENSSH PRIVATE KEY-----).
//
// We emit unencrypted private keys (ciphername "none"). Users who want a
// passphrase can re-encrypt with `ssh-keygen -p -f <key>` after download.

const MAGIC = new TextEncoder().encode("openssh-key-v1\0");

/** Concatenate a list of Uint8Array chunks into one buffer. */
function cat(chunks: Uint8Array[]): Uint8Array {
  const total = chunks.reduce((n, c) => n + c.length, 0);
  const out = new Uint8Array(total);
  let off = 0;
  for (const c of chunks) { out.set(c, off); off += c.length; }
  return out;
}

/** SSH "string" / blob: 4-byte big-endian length prefix, then raw bytes. */
function sshString(bytes: Uint8Array): Uint8Array {
  const len = new Uint8Array(4);
  new DataView(len.buffer).setUint32(0, bytes.length, false);
  return cat([len, bytes]);
}

const enc = new TextEncoder();
function sshStr(s: string): Uint8Array { return sshString(enc.encode(s)); }

function sshUint32(n: number): Uint8Array {
  const b = new Uint8Array(4);
  new DataView(b.buffer).setUint32(0, n, false);
  return b;
}

/** SSH "mpint": same as sshString but if the high bit of the first byte is
 *  set we prepend a 0x00 so the number is unambiguously positive. Leading
 *  zero bytes are stripped (a 0 value collapses to an empty string). */
function sshMpint(bytes: Uint8Array): Uint8Array {
  let i = 0;
  while (i < bytes.length && bytes[i] === 0) i++;
  const trimmed = bytes.slice(i);
  if (trimmed.length === 0) return sshString(new Uint8Array(0));
  if (trimmed[0] & 0x80) {
    const padded = new Uint8Array(trimmed.length + 1);
    padded.set(trimmed, 1);
    return sshString(padded);
  }
  return sshString(trimmed);
}

/** Decode a base64url JWK field (used by WebCrypto exports) into raw bytes. */
function b64uToBytes(s: string): Uint8Array {
  const pad = s.length % 4 === 2 ? "==" : s.length % 4 === 3 ? "=" : "";
  const b64 = s.replace(/-/g, "+").replace(/_/g, "/") + pad;
  const bin = atob(b64);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

function bytesToB64(bytes: Uint8Array): string {
  let s = "";
  for (let i = 0; i < bytes.length; i++) s += String.fromCharCode(bytes[i]);
  return btoa(s);
}

/** Wrap a base64 string at 70 chars per line, the OpenSSH convention. */
function wrap70(b64: string): string {
  return b64.match(/.{1,70}/g)!.join("\n");
}

// ── RSA (WebCrypto JWK → OpenSSH) ──────────────────────────────────────────

export type RsaKey = { openSshPublic: string; openSshPrivate: string };

export async function rsaToOpenSsh(
  publicKey: CryptoKey,
  privateKey: CryptoKey,
  comment: string,
): Promise<RsaKey> {
  const pubJwk = await crypto.subtle.exportKey("jwk", publicKey) as JsonWebKey & { n: string; e: string };
  const privJwk = await crypto.subtle.exportKey("jwk", privateKey) as JsonWebKey & {
    n: string; e: string; d: string; p: string; q: string; qi: string;
  };
  const n = b64uToBytes(pubJwk.n);
  const e = b64uToBytes(pubJwk.e);

  // ssh-rsa public blob: type, e, n.
  const pubBlob = cat([sshStr("ssh-rsa"), sshMpint(e), sshMpint(n)]);
  const publicLine = `ssh-rsa ${bytesToB64(pubBlob)}${comment ? " " + comment : ""}`;

  // OpenSSH private "magic" file. Single key, no cipher, no KDF.
  const d = b64uToBytes(privJwk.d);
  const p = b64uToBytes(privJwk.p);
  const q = b64uToBytes(privJwk.q);
  // JWK gives qi = q^-1 mod p, which IS exactly the OpenSSH "iqmp" field.
  const iqmp = b64uToBytes(privJwk.qi);

  // Same random checkint twice as an integrity marker inside the privkey blob.
  const check = crypto.getRandomValues(new Uint8Array(4));

  let privInner = cat([
    check, check,
    sshStr("ssh-rsa"),
    sshMpint(n), sshMpint(e), sshMpint(d), sshMpint(iqmp), sshMpint(p), sshMpint(q),
    sshStr(comment),
  ]);
  // Pad to a multiple of the cipher block size (8 for the "none" cipher).
  const padLen = (8 - (privInner.length % 8)) % 8;
  if (padLen > 0) {
    const pad = new Uint8Array(padLen);
    for (let i = 0; i < padLen; i++) pad[i] = i + 1;
    privInner = cat([privInner, pad]);
  }

  const body = cat([
    MAGIC,
    sshStr("none"),   // ciphername
    sshStr("none"),   // kdfname
    sshStr(""),       // kdfoptions
    sshUint32(1),     // number of keys
    sshString(pubBlob),
    sshString(privInner),
  ]);
  const openSshPrivate =
    `-----BEGIN OPENSSH PRIVATE KEY-----\n${wrap70(bytesToB64(body))}\n-----END OPENSSH PRIVATE KEY-----\n`;

  return { openSshPublic: publicLine, openSshPrivate };
}

// ── Ed25519 (raw seed + pubkey → OpenSSH) ─────────────────────────────────

export type Ed25519Material = { seed: Uint8Array; publicKey: Uint8Array };

export function ed25519ToOpenSsh(mat: Ed25519Material, comment: string): RsaKey {
  // The OpenSSH ed25519 private key field is the concatenation seed || pub.
  const pub = mat.publicKey;
  const sk = cat([mat.seed, pub]); // 64 bytes

  const pubBlob = cat([sshStr("ssh-ed25519"), sshString(pub)]);
  const publicLine = `ssh-ed25519 ${bytesToB64(pubBlob)}${comment ? " " + comment : ""}`;

  const check = crypto.getRandomValues(new Uint8Array(4));
  let privInner = cat([
    check, check,
    sshStr("ssh-ed25519"),
    sshString(pub),
    sshString(sk),
    sshStr(comment),
  ]);
  const padLen = (8 - (privInner.length % 8)) % 8;
  if (padLen > 0) {
    const pad = new Uint8Array(padLen);
    for (let i = 0; i < padLen; i++) pad[i] = i + 1;
    privInner = cat([privInner, pad]);
  }

  const body = cat([
    MAGIC,
    sshStr("none"), sshStr("none"), sshStr(""),
    sshUint32(1),
    sshString(pubBlob),
    sshString(privInner),
  ]);
  const openSshPrivate =
    `-----BEGIN OPENSSH PRIVATE KEY-----\n${wrap70(bytesToB64(body))}\n-----END OPENSSH PRIVATE KEY-----\n`;
  return { openSshPublic: publicLine, openSshPrivate };
}

// ── Public helpers used by the client component ────────────────────────────

export async function generateRsaSshKey(
  bits: 2048 | 3072 | 4096,
  comment: string,
): Promise<RsaKey> {
  const kp = await crypto.subtle.generateKey(
    {
      name: "RSASSA-PKCS1-v1_5",
      modulusLength: bits,
      publicExponent: new Uint8Array([1, 0, 1]),
      hash: "SHA-256",
    },
    true,
    ["sign", "verify"],
  );
  return rsaToOpenSsh(kp.publicKey, kp.privateKey, comment);
}

/** Loads @noble/curves Ed25519 from esm.sh at runtime — keeps the lib out of
 *  the main bundle for a tool most visitors never touch. Returns the
 *  OpenSSH-formatted pair. */
export async function generateEd25519SshKey(comment: string): Promise<RsaKey> {
  // dynamic ESM import; webpackIgnore so SWC/webpack don't try to bundle it.
  // URL passed via a variable (not a string literal) so TS doesn't try to
  // resolve it at compile time — matches the pattern used by other ESM-CDN
  // imports across the codebase (e.g. @imgly/background-removal).
  const url = "https://esm.sh/@noble/curves@1.6.0/ed25519";
  const mod = (await import(/* webpackIgnore: true */ url)) as {
    ed25519: { utils: { randomPrivateKey: () => Uint8Array }; getPublicKey: (s: Uint8Array) => Uint8Array };
  };
  const seed = mod.ed25519.utils.randomPrivateKey();
  const publicKey = mod.ed25519.getPublicKey(seed);
  return ed25519ToOpenSsh({ seed, publicKey }, comment);
}
