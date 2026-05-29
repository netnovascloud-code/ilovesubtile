/** Check a password against the HaveIBeenPwned database using k-anonymity.
 *  We send only the FIRST 5 chars of the SHA-1 hash; the server replies with
 *  all hashes that share that prefix and we match the remaining suffix locally.
 *  The full password (or its full hash) NEVER leaves the device.
 *  Returns true if the password is found in known breaches. */
export async function isPasswordPwned(password: string): Promise<boolean> {
  if (!password) return false;
  const hashBuf = await crypto.subtle.digest("SHA-1", new TextEncoder().encode(password));
  const hashHex = Array.from(new Uint8Array(hashBuf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
    .toUpperCase();
  const prefix = hashHex.slice(0, 5);
  const suffix = hashHex.slice(5);
  try {
    const res = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`, {
      // Add-Padding makes response sizes uniform so a network observer can't infer
      // which prefix you queried from the body length.
      headers: { "Add-Padding": "true" },
    });
    if (!res.ok) return false; // fail-open: never block signup on a network glitch
    const text = await res.text();
    return text.split("\n").some((line) => {
      const [hashSuffix] = line.trim().split(":");
      return hashSuffix === suffix;
    });
  } catch {
    return false;
  }
}
