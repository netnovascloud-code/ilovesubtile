// API-key helpers shared by the api-gateway Edge Function (Deno) and the Node
// test suite (tests/api-key.test.ts). Web Crypto / pure logic only — runs in both.

/** SHA-256 hex of a raw key (api_keys stores key_hash, never the raw key). */
export async function sha256Hex(s: string): Promise<string> {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s));
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

/** Accept the current knv_ prefix and the legacy wyr_ / cf_ keys. */
export function isValidApiKeyFormat(raw: string): boolean {
  return /^(knv|wyr|cf)_/.test(raw);
}

/** A looked-up api_keys row is usable only if it exists and isn't revoked.
 *  (There is no expiry column — keys are valid until explicitly revoked.) */
export function isKeyUsable(keyRow: { revoked?: boolean | null } | null | undefined): boolean {
  return !!keyRow && !keyRow.revoked;
}
