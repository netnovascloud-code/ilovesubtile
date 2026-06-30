// Konvertools — security tools backend. Self-contained (no shared imports).
// POST JSON: { action, ... }
//   action=validate_email   { email }     → validity report (pure DNS, no key)
//   action=scan_url         { url }       → Google Safe Browsing v4 verdict
//   action=analyze_phishing { text }      → Mistral + Safe Browsing v4
//   action=password_check   { sha1 }      → HaveIBeenPwned k-anonymity count
//   action=ssl_check        { url }       → live TLS cert read (no paid API)
//
// VirusTotal removed: its free API forbids commercial use. Google Safe
// Browsing v4 (the current non-legacy API) is free and commercial-safe.
//
// Auth: optional user JWT. Signed-in FREE users are capped per day per bucket;
// anonymous traffic is gated client-side; Pro/Business pass through. Nothing
// is stored.
//
// Secrets: GOOGLE_SAFE_BROWSING_KEY, MISTRAL_API_KEY.
// Deploy: supabase functions deploy security-tools --no-verify-jwt
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.7";

const STATIC_ORIGINS = new Set<string>([
  "https://konvertools.com", "https://www.konvertools.com",
  "https://konver.app", "https://www.konver.app",
  "http://localhost:3000", "http://127.0.0.1:3000",
]);
function corsFor(req: Request): Record<string, string> {
  const o = req.headers.get("origin") ?? "";
  const allow = STATIC_ORIGINS.has(o) || /^https:\/\/[a-z0-9-]+\.vercel\.app$/.test(o) ? o : "https://konvertools.com";
  return {
    "Access-Control-Allow-Origin": allow,
    "Vary": "Origin",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };
}

// Per-bucket FREE daily caps (signed-in free accounts). Pro/Business unlimited
// within fair use. Anonymous users are gated client-side.
// KONVERTOOLS classification (Part 2): only tasks that genuinely USE AI to
// understand meaning consume the AI quota. Email/URL/SSL/password are pure
// code (DNS, Safe Browsing lookup, TLS handshake, hash lookup) — they're
// unmetered for everyone. Only the phishing detector (Mistral interprets the
// email's intent) is rate-limited.
const FREE_DAILY: Record<string, number> = { phishing: 3 };

// ── disposable-email blocklist (cached in module memory for the isolate) ──
let DISPOSABLE: Set<string> | null = null;
let disposableAt = 0;
async function disposableDomains(): Promise<Set<string>> {
  const FRESH = 12 * 3600 * 1000;
  if (DISPOSABLE && Date.now() - disposableAt < FRESH) return DISPOSABLE;
  try {
    const r = await fetch("https://raw.githubusercontent.com/disposable-email-domains/disposable-email-domains/master/disposable_email_blocklist.conf", { signal: AbortSignal.timeout(8000) });
    if (r.ok) {
      const text = await r.text();
      DISPOSABLE = new Set(text.split(/\r?\n/).map((l) => l.trim().toLowerCase()).filter(Boolean));
      disposableAt = Date.now();
    }
  } catch { /* keep stale / empty */ }
  return DISPOSABLE ?? new Set();
}

// ── rolling-24h per-bucket quota on profiles.usage_buckets ────────────────
async function enforceBucket(svc: ReturnType<typeof createClient>, userId: string | null, bucket: string): Promise<{ blocked: false } | { blocked: true; body: unknown }> {
  if (!userId) return { blocked: false };
  try {
    const { data: prof } = await svc.from("profiles").select("plan, usage_buckets").eq("id", userId).maybeSingle();
    const plan = (prof?.plan as string) ?? "free";
    if (plan !== "free") return { blocked: false };
    const limit = FREE_DAILY[bucket] ?? 5;
    const buckets = (prof?.usage_buckets as Record<string, { c: number; r: string }>) ?? {};
    const now = Date.now();
    const cur = buckets[bucket];
    const resetMs = cur?.r ? new Date(cur.r).getTime() : 0;
    const overdue = now - resetMs > 24 * 3600 * 1000;
    const used = overdue ? 0 : (cur?.c ?? 0);
    if (used >= limit) {
      return { blocked: true, body: { error: "daily_limit", plan, limit, used, remaining: 0, resetAt: new Date((overdue ? now : resetMs) + 24 * 3600 * 1000).toISOString() } };
    }
    buckets[bucket] = { c: used + 1, r: overdue ? new Date().toISOString() : (cur?.r ?? new Date().toISOString()) };
    await svc.from("profiles").update({ usage_buckets: buckets }).eq("id", userId);
  } catch { /* fail-open */ }
  return { blocked: false };
}

async function resolveUser(svc: ReturnType<typeof createClient>, req: Request, url: string, anon: string): Promise<string | null> {
  const authz = req.headers.get("Authorization");
  if (!authz || authz.endsWith(anon)) return null;
  try {
    const u = createClient(url, anon, { global: { headers: { Authorization: authz } } });
    const { data } = await u.auth.getUser();
    return data.user?.id ?? null;
  } catch { return null; }
}

// ── Safe Browsing v4 helpers ──────────────────────────────────────────────
function extractUrls(text: string): string[] {
  const re = /\bhttps?:\/\/[^\s<>"')]+/gi;
  const out = new Set<string>();
  for (const m of text.matchAll(re)) out.add(m[0].replace(/[.,;:)]+$/, ""));
  const bare = /\b([a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,}\b/gi;
  for (const m of text.matchAll(bare)) {
    const host = m[0].toLowerCase();
    if (!host.endsWith(".js") && !host.includes("@")) out.add("http://" + host);
  }
  return [...out].slice(0, 20);
}

// Google Safe Browsing API v4 (threatMatches:find) — the current, non-legacy
// Lookup API. Free and permitted for commercial use.
async function safeBrowsing(urls: string[], key: string): Promise<{ url: string; threat: string }[]> {
  if (!key || !urls.length) return [];
  const res = await fetch(`https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${key}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      client: { clientId: "konvertools", clientVersion: "1.0" },
      threatInfo: {
        threatTypes: ["MALWARE", "SOCIAL_ENGINEERING", "UNWANTED_SOFTWARE", "POTENTIALLY_HARMFUL_APPLICATION"],
        platformTypes: ["ANY_PLATFORM"],
        threatEntryTypes: ["URL"],
        threatEntries: urls.map((u) => ({ url: u })),
      },
    }),
    signal: AbortSignal.timeout(10_000),
  });
  if (!res.ok) return [];
  const data = await res.json() as { matches?: { threat: { url: string }; threatType: string }[] };
  return (data.matches ?? []).map((m) => ({ url: m.threat.url, threat: m.threatType }));
}

const THREAT_LABEL: Record<string, string> = {
  MALWARE: "Malware", SOCIAL_ENGINEERING: "Phishing / social engineering",
  UNWANTED_SOFTWARE: "Unwanted software", POTENTIALLY_HARMFUL_APPLICATION: "Potentially harmful app",
};

// ── SSL / TLS certificate reader (no paid API) ────────────────────────────
// We open a raw TCP socket, send a TLS 1.2 ClientHello (deliberately WITHOUT
// the supported_versions extension so the server keeps the handshake at TLS
// 1.2 and sends its Certificate message in PLAINTEXT), then parse the leaf
// X.509 certificate's DER for validity, issuer, subject, SANs and key size.
function isPrivateHost(host: string): boolean {
  const h = host.toLowerCase();
  if (["localhost", "ip6-localhost", "ip6-loopback", "metadata.google.internal"].includes(h)) return true;
  // Any IPv6 literal (bracketed "[::1]" or bare). The compressed / IPv4-mapped
  // forms bypass prefix checks, so block them all rather than range-matching.
  if (h.startsWith("[") || h.includes(":")) return true;
  const m4 = h.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);
  if (m4) {
    const [a, b] = [Number(m4[1]), Number(m4[2])];
    if (a === 0 || a === 10 || a === 127 || (a === 169 && b === 254) || (a === 172 && b >= 16 && b <= 31) || (a === 192 && b === 168) || a >= 224) return true;
  }
  if (h.endsWith(".local") || h.endsWith(".internal")) return true;
  return false;
}

function clientHello(host: string): Uint8Array {
  const enc = new TextEncoder();
  const sni = enc.encode(host);
  const ext: number[] = [];
  // server_name (0x0000)
  const sniList = [0x00, (sni.length >> 8) & 0xff, sni.length & 0xff, ...sni];
  const sniData = [(sniList.length >> 8) & 0xff, sniList.length & 0xff, ...sniList];
  ext.push(0x00, 0x00, (sniData.length >> 8) & 0xff, sniData.length & 0xff, ...sniData);
  // supported_groups (0x000a)
  const groups = [0x00, 0x1d, 0x00, 0x17, 0x00, 0x18, 0x00, 0x19];
  const groupsData = [(groups.length >> 8) & 0xff, groups.length & 0xff, ...groups];
  ext.push(0x00, 0x0a, (groupsData.length >> 8) & 0xff, groupsData.length & 0xff, ...groupsData);
  // ec_point_formats (0x000b)
  ext.push(0x00, 0x0b, 0x00, 0x02, 0x01, 0x00);
  // signature_algorithms (0x000d)
  const sigs = [0x04, 0x01, 0x04, 0x03, 0x05, 0x01, 0x05, 0x03, 0x06, 0x01, 0x06, 0x03, 0x08, 0x04, 0x08, 0x05, 0x08, 0x06, 0x02, 0x01];
  const sigData = [(sigs.length >> 8) & 0xff, sigs.length & 0xff, ...sigs];
  ext.push(0x00, 0x0d, (sigData.length >> 8) & 0xff, sigData.length & 0xff, ...sigData);

  const random = new Uint8Array(32);
  crypto.getRandomValues(random);
  const ciphers = [0xc0, 0x2f, 0xc0, 0x30, 0xc0, 0x2b, 0xc0, 0x2c, 0x00, 0x9c, 0x00, 0x9d, 0xc0, 0x13, 0xc0, 0x14, 0x00, 0x2f, 0x00, 0x35, 0x00, 0x0a];

  const body: number[] = [];
  body.push(0x03, 0x03);                       // client_version TLS 1.2
  body.push(...random);                        // random
  body.push(0x00);                             // session_id length 0
  body.push((ciphers.length >> 8) & 0xff, ciphers.length & 0xff, ...ciphers);
  body.push(0x01, 0x00);                       // compression: 1 method, null
  body.push((ext.length >> 8) & 0xff, ext.length & 0xff, ...ext);

  const hs: number[] = [0x01, (body.length >> 16) & 0xff, (body.length >> 8) & 0xff, body.length & 0xff, ...body];
  const rec: number[] = [0x16, 0x03, 0x01, (hs.length >> 8) & 0xff, hs.length & 0xff, ...hs];
  return new Uint8Array(rec);
}

/** Read the leaf certificate DER from a host via a TLS 1.2 plaintext handshake. */
async function fetchLeafCert(host: string, timeoutMs = 8000): Promise<Uint8Array> {
  const conn = await Deno.connect({ hostname: host, port: 443 });
  const timer = setTimeout(() => { try { conn.close(); } catch { /* */ } }, timeoutMs);
  try {
    await conn.write(clientHello(host));
    let buf = new Uint8Array(0);
    const tmp = new Uint8Array(16384);
    for (let i = 0; i < 24; i++) {
      const n = await conn.read(tmp);
      if (n === null) break;
      const merged = new Uint8Array(buf.length + n);
      merged.set(buf); merged.set(tmp.subarray(0, n), buf.length);
      buf = merged;
      const cert = tryExtractCert(buf);
      if (cert === "alert") throw new Error("tls_alert");
      if (cert) return cert;
      if (buf.length > 96 * 1024) break;
    }
    throw new Error("no_certificate");
  } finally {
    clearTimeout(timer);
    try { conn.close(); } catch { /* */ }
  }
}

/** Walk the TLS records, concatenate handshake payloads, and pull the first
 *  cert out of the Certificate (type 11) message. Returns null if not yet
 *  complete, "alert" if the server sent an alert. */
function tryExtractCert(buf: Uint8Array): Uint8Array | null | "alert" {
  let hs = new Uint8Array(0);
  let p = 0;
  while (p + 5 <= buf.length) {
    const type = buf[p];
    const len = (buf[p + 3] << 8) | buf[p + 4];
    if (p + 5 + len > buf.length) break;            // record not fully arrived
    const payload = buf.subarray(p + 5, p + 5 + len);
    if (type === 0x15) return "alert";              // alert record
    if (type === 0x16) {                            // handshake
      const m = new Uint8Array(hs.length + payload.length);
      m.set(hs); m.set(payload, hs.length); hs = m;
    }
    p += 5 + len;
  }
  // Parse handshake messages.
  let q = 0;
  while (q + 4 <= hs.length) {
    const mType = hs[q];
    const mLen = (hs[q + 1] << 16) | (hs[q + 2] << 8) | hs[q + 3];
    if (q + 4 + mLen > hs.length) break;            // message not complete yet
    if (mType === 11) {                              // Certificate
      const body = hs.subarray(q + 4, q + 4 + mLen);
      // body: 3-byte total list length, then [3-byte certLen + cert]...
      if (body.length < 3) return null;
      const firstLen = (body[3] << 16) | (body[4] << 8) | body[5];
      if (6 + firstLen > body.length) return null;
      return body.subarray(6, 6 + firstLen);
    }
    q += 4 + mLen;
  }
  return null;
}

// ── minimal DER / X.509 parser ────────────────────────────────────────────
type TLV = { tag: number; len: number; vs: number; ve: number; next: number };
function readTLV(b: Uint8Array, pos: number): TLV {
  const tag = b[pos];
  let i = pos + 1;
  let len = b[i++];
  if (len & 0x80) {
    const n = len & 0x7f;
    len = 0;
    for (let k = 0; k < n; k++) len = (len << 8) | b[i++];
  }
  return { tag, len, vs: i, ve: i + len, next: i + len };
}
function oidStr(b: Uint8Array, vs: number, ve: number): string {
  const out: number[] = [];
  let v = vs;
  const first = b[v++];
  out.push(Math.floor(first / 40), first % 40);
  let acc = 0;
  while (v < ve) {
    const byte = b[v++];
    acc = (acc << 7) | (byte & 0x7f);
    if (!(byte & 0x80)) { out.push(acc); acc = 0; }
  }
  return out.join(".");
}
function str(b: Uint8Array, vs: number, ve: number): string {
  return new TextDecoder().decode(b.subarray(vs, ve));
}
function parseTime(b: Uint8Array, t: TLV): string {
  const s = str(b, t.vs, t.ve);
  // UTCTime YYMMDDHHMMSSZ ; GeneralizedTime YYYYMMDDHHMMSSZ
  let y: number, rest: string;
  if (t.tag === 0x17) { const yy = Number(s.slice(0, 2)); y = yy < 50 ? 2000 + yy : 1900 + yy; rest = s.slice(2); }
  else { y = Number(s.slice(0, 4)); rest = s.slice(4); }
  const mo = rest.slice(0, 2), d = rest.slice(2, 4), h = rest.slice(4, 6), mi = rest.slice(6, 8), se = rest.slice(8, 10) || "00";
  return `${y}-${mo}-${d}T${h}:${mi}:${se}Z`;
}
// Extract CN (2.5.4.3) and O (2.5.4.10) from a Name (SEQUENCE OF RDN).
function parseName(b: Uint8Array, t: TLV): { cn: string; o: string } {
  let cn = "", o = "";
  let p = t.vs;
  while (p < t.ve) {
    const rdn = readTLV(b, p);                       // SET
    let q = rdn.vs;
    while (q < rdn.ve) {
      const atv = readTLV(b, q);                      // SEQUENCE { oid, value }
      const oidT = readTLV(b, atv.vs);
      const valT = readTLV(b, oidT.next);
      const oid = oidStr(b, oidT.vs, oidT.ve);
      const val = str(b, valT.vs, valT.ve);
      if (oid === "2.5.4.3" && !cn) cn = val;
      if (oid === "2.5.4.10" && !o) o = val;
      q = atv.next;
    }
    p = rdn.next;
  }
  return { cn, o };
}
const CURVE: Record<string, string> = {
  "1.2.840.10045.3.1.7": "P-256", "1.3.132.0.34": "P-384", "1.3.132.0.35": "P-521",
};
function parseLeaf(der: Uint8Array) {
  const cert = readTLV(der, 0);                       // Certificate SEQUENCE
  const tbs = readTLV(der, cert.vs);                  // tbsCertificate SEQUENCE
  let p = tbs.vs;
  let first = readTLV(der, p);
  if (first.tag === 0xa0) p = first.next;             // skip [0] version if present
  let cur = readTLV(der, p);                          // serialNumber
  cur = readTLV(der, cur.next);                       // signature AlgId
  const issuerT = readTLV(der, cur.next);             // issuer Name
  const issuer = parseName(der, issuerT);
  const validity = readTLV(der, issuerT.next);        // validity SEQUENCE
  const nbT = readTLV(der, validity.vs);
  const naT = readTLV(der, nbT.next);
  const notBefore = parseTime(der, nbT);
  const notAfter = parseTime(der, naT);
  const subjectT = readTLV(der, validity.next);       // subject Name
  const subject = parseName(der, subjectT);
  const spki = readTLV(der, subjectT.next);           // SubjectPublicKeyInfo
  // algorithm
  const algSeq = readTLV(der, spki.vs);
  const algOidT = readTLV(der, algSeq.vs);
  const algOid = oidStr(der, algOidT.vs, algOidT.ve);
  let keyStrength = "Unknown";
  if (algOid === "1.2.840.113549.1.1.1") {            // rsaEncryption
    const bitStr = readTLV(der, algSeq.next);         // BIT STRING
    const inner = readTLV(der, bitStr.vs + 1);        // skip unused-bits byte → SEQUENCE
    const modulus = readTLV(der, inner.vs);           // INTEGER modulus
    let mlen = modulus.len;
    if (der[modulus.vs] === 0x00) mlen -= 1;          // strip leading zero
    keyStrength = `RSA ${mlen * 8}-bit`;
  } else if (algOid === "1.2.840.10045.2.1") {        // ecPublicKey
    const curveT = readTLV(der, algOidT.next);
    const curveOid = oidStr(der, curveT.vs, curveT.ve);
    keyStrength = `ECDSA ${CURVE[curveOid] ?? curveOid}`;
  }
  // SANs — find extensions [3] then OID 2.5.29.17.
  const domains: string[] = [];
  let scan = spki.next;
  while (scan < tbs.ve) {
    const t = readTLV(der, scan);
    if (t.tag === 0xa3) {                              // [3] extensions
      const extSeq = readTLV(der, t.vs);
      let e = extSeq.vs;
      while (e < extSeq.ve) {
        const ext = readTLV(der, e);
        const eoid = readTLV(der, ext.vs);
        const oid = oidStr(der, eoid.vs, eoid.ve);
        if (oid === "2.5.29.17") {                     // subjectAltName
          let after = readTLV(der, eoid.next);
          if (after.tag === 0x01) after = readTLV(der, after.next); // skip critical BOOLEAN
          const octet = after;                         // OCTET STRING
          const gnSeq = readTLV(der, octet.vs);        // GeneralNames SEQUENCE
          let g = gnSeq.vs;
          while (g < gnSeq.ve) {
            const gn = readTLV(der, g);
            if (gn.tag === 0x82) domains.push(str(der, gn.vs, gn.ve)); // dNSName
            g = gn.next;
          }
        }
        e = ext.next;
      }
      break;
    }
    scan = t.next;
  }
  if (!domains.length && subject.cn) domains.push(subject.cn);
  return {
    notBefore, notAfter,
    issuer: issuer.cn || issuer.o || "Unknown",
    subject: subject.cn || domains[0] || "Unknown",
    domains, keyStrength,
  };
}

Deno.serve(async (req) => {
  const cors = corsFor(req);
  const json = (body: unknown, init: ResponseInit = {}) =>
    new Response(JSON.stringify(body), { ...init, headers: { ...cors, "Content-Type": "application/json", ...(init.headers ?? {}) } });

  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  if (req.method !== "POST") return json({ error: "method_not_allowed" }, { status: 405 });

  const supaUrl = Deno.env.get("SUPABASE_URL")!;
  const anon = Deno.env.get("SUPABASE_ANON_KEY")!;
  const svc = createClient(supaUrl, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);

  const body = (await req.json().catch(() => ({}))) as { action?: string; email?: string; url?: string; text?: string; sha1?: string };
  const action = body.action ?? "";
  const userId = await resolveUser(svc, req, supaUrl, anon);

  // ───────────────────────────── validate_email ──────────────────────────
  if (action === "validate_email") {
    const email = (body.email ?? "").trim().toLowerCase();
    if (!email) return json({ error: "bad_request", message: "Missing email." }, { status: 400 });

    const SYNTAX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const syntaxOk = SYNTAX.test(email);
    const domain = email.split("@")[1] ?? "";
    let domainExists = false, hasMx = false, disposable = false;
    const signals: string[] = [];
    if (syntaxOk) {
      disposable = (await disposableDomains()).has(domain);
      try { const mx = await Deno.resolveDns(domain, "MX"); hasMx = Array.isArray(mx) && mx.length > 0; domainExists = hasMx; } catch { /* no MX */ }
      if (!hasMx) { try { const a = await Deno.resolveDns(domain, "A"); domainExists = Array.isArray(a) && a.length > 0; } catch { /* no A */ } }
    }
    let score = 0;
    if (syntaxOk) score += 25;
    if (domainExists) score += 25;
    if (hasMx) score += 40;
    if (!disposable && syntaxOk) score += 10;
    let verdict: string;
    if (!syntaxOk) { verdict = "invalid"; signals.push("Invalid email syntax."); }
    else if (!domainExists) { verdict = "no_domain"; signals.push("The domain does not resolve (no DNS record)."); }
    else if (disposable) { verdict = "disposable"; signals.push("Disposable / throwaway email provider."); }
    else if (!hasMx) { verdict = "risky"; signals.push("Domain exists but has no mail (MX) records — likely cannot receive email."); }
    else { verdict = "valid"; signals.push("Valid syntax, domain resolves and accepts mail."); }
    return json({ email, verdict, score: Math.max(0, Math.min(100, score)), checks: { syntax: syntaxOk, domain: domainExists, mx: hasMx, disposable }, signals });
  }

  // ───────────────────────────── scan_url ────────────────────────────────
  if (action === "scan_url") {
    const raw = (body.url ?? "").trim();
    if (!raw) return json({ error: "bad_request", message: "Missing url." }, { status: 400 });
    let target = raw;
    if (!/^https?:\/\//i.test(target)) target = "http://" + target;
    try { new URL(target); } catch { return json({ error: "bad_request", message: "Invalid URL." }, { status: 400 }); }

    const sbKey = Deno.env.get("GOOGLE_SAFE_BROWSING_KEY");
    if (!sbKey) return json({ error: "service_unavailable", message: "URL scanning is temporarily unavailable." }, { status: 503 });
    const matches = await safeBrowsing([target], sbKey);
    const threats = matches.map((m) => THREAT_LABEL[m.threat] ?? m.threat);
    const verdict = threats.length ? "dangerous" : "safe";
    return json({ url: target, verdict, threats, source: "Google Safe Browsing" });
  }

  // ───────────────────────────── password_check (HIBP k-anonymity) ───────
  if (action === "password_check") {
    const sha1 = (body.sha1 ?? "").trim().toUpperCase();
    if (!/^[A-F0-9]{40}$/.test(sha1)) return json({ error: "bad_request", message: "Provide a full SHA-1 hash (40 hex chars). The password itself is never sent." }, { status: 400 });
    const prefix = sha1.slice(0, 5), suffix = sha1.slice(5);
    try {
      const r = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`, { headers: { "Add-Padding": "true" }, signal: AbortSignal.timeout(10_000) });
      if (!r.ok) return json({ error: "scan_failed", message: "Breach database unavailable." }, { status: 502 });
      const text = await r.text();
      let count = 0;
      for (const line of text.split("\n")) { const [s, c] = line.trim().split(":"); if (s === suffix) { count = Number(c) || 0; break; } }
      return json({ compromised: count > 0, count, source: "HaveIBeenPwned" });
    } catch {
      return json({ error: "scan_failed", message: "Breach database unavailable." }, { status: 502 });
    }
  }

  // ───────────────────────────── ssl_check ───────────────────────────────
  if (action === "ssl_check") {
    const raw = (body.url ?? "").trim();
    if (!raw) return json({ error: "bad_request", message: "Missing url." }, { status: 400 });
    let host = raw;
    try { host = new URL(/^https?:\/\//i.test(raw) ? raw : `https://${raw}`).hostname; } catch { return json({ error: "bad_request", message: "Invalid URL." }, { status: 400 }); }
    if (!host || isPrivateHost(host)) return json({ error: "bad_request", message: "Only public hostnames can be checked." }, { status: 400 });

    // 1) Validity via a real TLS handshake — works for TLS 1.2 AND 1.3 and
    //    validates the chain against the system trust store. Success means the
    //    certificate is present, current and trusted. (The old code only did a
    //    hand-rolled TLS 1.2 ClientHello, which TLS 1.3-only servers reject →
    //    every modern site 502'd.)
    let tlsValid = false;
    try {
      const c = await Deno.connectTls({ hostname: host, port: 443 });
      tlsValid = true;
      try { c.close(); } catch { /* */ }
    } catch { /* invalid / expired / untrusted / unreachable */ }

    // 2) Certificate details via a best-effort plaintext TLS 1.2 handshake.
    //    A TLS 1.3-only server won't expose the cert this way, so details can
    //    be unavailable even when the certificate is valid.
    let details: ReturnType<typeof parseLeaf> | null = null;
    try { details = parseLeaf(await fetchLeafCert(host)); } catch { /* no plaintext cert */ }

    if (details) {
      const now = Date.now();
      const naMs = new Date(details.notAfter).getTime();
      const nbMs = new Date(details.notBefore).getTime();
      const daysRemaining = Math.floor((naMs - now) / 86_400_000);
      const valid = tlsValid || (now >= nbMs && now <= naMs);
      return json({ host, valid, notBefore: details.notBefore, notAfter: details.notAfter, daysRemaining, issuer: details.issuer, subject: details.subject, domains: details.domains, keyStrength: details.keyStrength });
    }
    if (tlsValid) {
      // Trusted handshake, but the server didn't expose the cert in plaintext.
      return json({ host, valid: true, limited: true, notBefore: "", notAfter: "", daysRemaining: -1, issuer: "", subject: host, domains: [host], keyStrength: "" });
    }
    return json({ error: "ssl_failed", message: "Could not establish a trusted TLS connection (the host may be unreachable, or its certificate is invalid or expired)." }, { status: 502 });
  }

  // ───────────────────────────── analyze_phishing ────────────────────────
  if (action === "analyze_phishing") {
    const text = (body.text ?? "").trim();
    if (!text) return json({ error: "bad_request", message: "Paste the email content." }, { status: 400 });
    if (text.length > 40_000) return json({ error: "text_too_long" }, { status: 413 });
    // No anonymous AI: the phishing detector uses Mistral, so it requires login.
    if (!userId) return json({ error: "auth_required", message: "Sign in to use the phishing detector." }, { status: 401 });
    const gate = await enforceBucket(svc, userId, "phishing");
    if (gate.blocked) return json(gate.body, { status: 429 });

    const mistralKey = Deno.env.get("MISTRAL_API_KEY");
    if (!mistralKey) return json({ error: "service_unavailable" }, { status: 503 });

    const urls = extractUrls(text);
    const sbKey = Deno.env.get("GOOGLE_SAFE_BROWSING_KEY") ?? "";
    const sbPromise = safeBrowsing(urls, sbKey).catch(() => []);

    const system = `You are a phishing / scam email detector. Analyse the user's email content for fraud signals: urgency or threatening language, requests for personal/banking/login details, brand impersonation, unrealistic promises (lottery, inheritance), mismatched or suspicious links, generic greetings, and tell-tale grammar. Return ONLY a JSON object: {"score": <0-100 integer, higher = more likely a scam>, "verdict": "safe"|"suspicious"|"dangerous", "signals": [<short string>, ...3-8 items], "impersonates": <string brand/entity or null>}. Use "safe" for <30, "suspicious" for 30-64, "dangerous" for >=65.`;
    let llm: { score: number; verdict: string; signals: string[]; impersonates: string | null } | null = null;
    try {
      const res = await fetch("https://api.mistral.ai/v1/chat/completions", {
        method: "POST",
        headers: { Authorization: `Bearer ${mistralKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({ model: "mistral-small-latest", response_format: { type: "json_object" }, temperature: 0.2, messages: [{ role: "system", content: system }, { role: "user", content: text.slice(0, 12_000) }] }),
        signal: AbortSignal.timeout(30_000),
      });
      if (res.ok) {
        const d = await res.json() as { choices: { message: { content: string } }[] };
        llm = JSON.parse(d.choices?.[0]?.message?.content ?? "{}");
      }
    } catch { /* URL-only */ }

    const sbMatches = await sbPromise;
    const badUrls = sbMatches.map((m) => ({ url: m.url, threat: THREAT_LABEL[m.threat] ?? m.threat }));
    let score = llm && typeof llm.score === "number" ? Math.max(0, Math.min(100, Math.round(llm.score))) : 0;
    const signals = llm && Array.isArray(llm.signals) ? llm.signals.slice(0, 8) : [];
    if (badUrls.length) { score = Math.max(score, 85); signals.unshift(`Contains a link flagged as ${badUrls[0].threat} by Google Safe Browsing.`); }
    const verdict = score >= 65 ? "dangerous" : score >= 30 ? "suspicious" : "safe";
    return json({ score, verdict, signals, impersonates: llm?.impersonates ?? null, badUrls, urlsChecked: urls.length });
  }

  return json({ error: "unknown_action", message: `Unknown action: ${action || "(none)"}.` }, { status: 400 });
});
