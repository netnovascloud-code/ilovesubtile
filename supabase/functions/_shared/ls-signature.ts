// HMAC-SHA256 signature verification for Lemon Squeezy webhooks.
//
// Web Crypto only (no Deno- or Node-specific APIs), so this exact module is
// imported by BOTH the lemonsqueezy-webhook Edge Function (Deno) and the Node
// test suite (tests/ls-signature.test.ts) — we verify the real code, not a copy.

const enc = new TextEncoder();

/** Constant-time hex compare (avoids leaking the secret via timing). */
export function timingSafeEqualHex(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

/** Verify X-Signature = hex(HMAC-SHA256(rawBody, secret)). Empty signature fails. */
export async function verifySignature(rawBody: string, signature: string, secret: string): Promise<boolean> {
  if (!signature) return false;
  const keyData = await crypto.subtle.importKey(
    "raw", enc.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"],
  );
  const mac = await crypto.subtle.sign("HMAC", keyData, enc.encode(rawBody));
  const expected = [...new Uint8Array(mac)].map((b) => b.toString(16).padStart(2, "0")).join("");
  return timingSafeEqualHex(expected, signature.trim().toLowerCase());
}
