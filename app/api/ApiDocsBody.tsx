import Link from "next/link";
import { SUPABASE_URL } from "@/lib/utils";
import { ApiTesterClient } from "@/components/billing/ApiTesterClient";
import { COST_TABLE, CREDIT_PACKS } from "@/lib/credits";
import { getApi } from "@/lib/i18n/page-api";
import { localePath, type Locale } from "@/lib/i18n/locales";

const BASE = `${SUPABASE_URL}/functions/v1/api-gateway`;

// Code samples (curl / js / response) are NEVER localised — only the `action`,
// `method`, `cost` and the localisable `desc` (looked up by action) live here.
type Endpoint = {
  method: "GET" | "POST";
  action:
    | "me"
    | "transcribe"
    | "translate"
    | "rephrase"
    | "summarize"
    | "humanize"
    | "convert_code"
    | "explain_code"
    | "job"
    | "validate_email"
    | "scan_url"
    | "password_check"
    | "ssl_check"
    | "analyze_phishing";
  cost: string;
  curl: string;
  js: string;
  response: string;
  status?: "rest" | "soon";
};

const ENDPOINTS: Endpoint[] = [
  {
    method: "GET", action: "me", cost: "0 credits",
    curl: `curl "${BASE}?action=me" \\
  -H "Authorization: Bearer knv_live_..."`,
    js: `const r = await fetch("${BASE}?action=me", {
  headers: { Authorization: "Bearer knv_live_..." }
});
const me = await r.json();`,
    response: `{
  "user_id": "6a16994b-...",
  "email": "you@example.com",
  "plan": "business",
  "credits": 2000,
  "max_file_mb": 5120
}`,
  },
  {
    method: "POST", action: "transcribe", cost: "10 credits / min",
    curl: `curl -X POST "${BASE}?action=transcribe" \\
  -H "Authorization: Bearer knv_live_..." \\
  -F "file=@episode.mp3"`,
    js: `const form = new FormData();
form.append("file", audioFile);
const r = await fetch("${BASE}?action=transcribe", {
  method: "POST",
  headers: { Authorization: "Bearer knv_live_..." },
  body: form,
});
const { url, job_id, cost, credits_remaining } = await r.json();`,
    response: `{
  "job_id": "f3a9...",
  "url": "https://.../result.srt",
  "credits_remaining": 1980,
  "cost": 20
}`,
  },
  {
    method: "POST", action: "translate", cost: "5 credits / 1k words",
    curl: `curl -X POST "${BASE}?action=translate" \\
  -H "Authorization: Bearer knv_live_..." \\
  -F "file=@subs.srt" \\
  -F "target_lang=ES"`,
    js: `const r = await fetch("${BASE}?action=translate", {
  method: "POST",
  headers: {
    Authorization: "Bearer knv_live_...",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ text: "Hello world", target_lang: "ES" }),
});`,
    response: `{
  "job_id": "9c1d...",
  "output": "Hola mundo",
  "credits_remaining": 1975,
  "cost": 5
}`,
  },
  {
    method: "POST", action: "rephrase", cost: "3–8 credits",
    curl: `curl -X POST "${BASE}?action=rephrase" \\
  -H "Authorization: Bearer knv_live_..." \\
  -H "Content-Type: application/json" \\
  -d '{"text":"Hey can u send file asap","style":"professional"}'`,
    js: `const r = await fetch("${BASE}?action=rephrase", {
  method: "POST",
  headers: {
    Authorization: "Bearer knv_live_...",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ text, style: "professional" }),
});
const { output } = await r.json();`,
    response: `{
  "job_id": "7c9a...",
  "output": "Could you please send the file at your earliest convenience?",
  "credits_remaining": 1972,
  "cost": 3
}`,
  },
  {
    method: "POST", action: "summarize", cost: "3–6 credits",
    curl: `curl -X POST "${BASE}?action=summarize" \\
  -H "Authorization: Bearer knv_live_..." \\
  -H "Content-Type: application/json" \\
  -d '{"text":"Long article…","format":"bullets"}'`,
    js: `const r = await fetch("${BASE}?action=summarize", {
  method: "POST",
  headers: {
    Authorization: "Bearer knv_live_...",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ text, format: "bullets" }),
});`,
    response: `{
  "job_id": "ab12...",
  "output": "- Key point one\\n- Key point two",
  "credits_remaining": 1969,
  "cost": 3
}`,
  },
  {
    method: "POST", action: "humanize", cost: "5–12 credits",
    curl: `curl -X POST "${BASE}?action=humanize" \\
  -H "Authorization: Bearer knv_live_..." \\
  -H "Content-Type: application/json" \\
  -d '{"text":"The aforementioned…","level":"medium"}'`,
    js: `const r = await fetch("${BASE}?action=humanize", {
  method: "POST",
  headers: {
    Authorization: "Bearer knv_live_...",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ text, level: "medium" }),
});`,
    response: `{
  "job_id": "c4d5...",
  "output": "Rewritten, natural-sounding text…",
  "credits_remaining": 1964,
  "cost": 5
}`,
  },
  {
    method: "POST", action: "convert_code", cost: "4 credits",
    curl: `curl -X POST "${BASE}?action=convert_code" \\
  -H "Authorization: Bearer knv_live_..." \\
  -H "Content-Type: application/json" \\
  -d '{"code":"print(1)","from_language":"python","to_language":"javascript"}'`,
    js: `const r = await fetch("${BASE}?action=convert_code", {
  method: "POST",
  headers: {
    Authorization: "Bearer knv_live_...",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ code, from_language: "python", to_language: "javascript" }),
});`,
    response: `{
  "job_id": "d5e6...",
  "output": "console.log(1);",
  "credits_remaining": 1960,
  "cost": 4
}`,
  },
  {
    method: "GET", action: "job", cost: "0 credits",
    curl: `curl "${BASE}?action=job&id=f3a9..." \\
  -H "Authorization: Bearer knv_live_..."`,
    js: `const r = await fetch("${BASE}?action=job&id=" + jobId, {
  headers: { Authorization: "Bearer knv_live_..." }
});
const { job } = await r.json();`,
    response: `{
  "job": {
    "id": "f3a9...",
    "tool": "api-transcribe",
    "status": "done",
    "output_file_url": "https://.../result.srt",
    "created_at": "...",
    "completed_at": "..."
  }
}`,
  },
  {
    method: "POST", action: "explain_code", cost: "3 credits",
    curl: `curl -X POST "${BASE}?action=explain_code" \\
  -H "Authorization: Bearer knv_live_..." \\
  -H "Content-Type: application/json" \\
  -d '{"code":"def add(a, b): return a + b"}'`,
    js: `const r = await fetch("${BASE}?action=explain_code", {
  method: "POST",
  headers: { Authorization: "Bearer knv_live_...", "Content-Type": "application/json" },
  body: JSON.stringify({ code }),
});`,
    response: `{
  "output": "This function returns the sum of its two arguments…",
  "credits_remaining": 1957,
  "cost": 3
}`,
  },
  {
    method: "POST", action: "validate_email", cost: "1 credit",
    curl: `curl -X POST "${BASE}?action=validate_email" \\
  -H "Authorization: Bearer knv_live_..." \\
  -H "Content-Type: application/json" \\
  -d '{"email":"you@example.com"}'`,
    js: `const r = await fetch("${BASE}?action=validate_email", {
  method: "POST",
  headers: { Authorization: "Bearer knv_live_...", "Content-Type": "application/json" },
  body: JSON.stringify({ email }),
});`,
    response: `{
  "result": { "verdict": "valid", "score": 100, "checks": { "mx": true, "disposable": false } },
  "credits_remaining": 1956,
  "cost": 1
}`,
  },
  {
    method: "POST", action: "scan_url", cost: "1 credit",
    curl: `curl -X POST "${BASE}?action=scan_url" \\
  -H "Authorization: Bearer knv_live_..." \\
  -H "Content-Type: application/json" \\
  -d '{"url":"https://example.com"}'`,
    js: `const r = await fetch("${BASE}?action=scan_url", {
  method: "POST",
  headers: { Authorization: "Bearer knv_live_...", "Content-Type": "application/json" },
  body: JSON.stringify({ url }),
});`,
    response: `{
  "result": { "verdict": "safe", "threats": [], "source": "Google Safe Browsing" },
  "credits_remaining": 1955,
  "cost": 1
}`,
  },
  {
    method: "POST", action: "password_check", cost: "1 credit",
    curl: `curl -X POST "${BASE}?action=password_check" \\
  -H "Authorization: Bearer knv_live_..." \\
  -H "Content-Type: application/json" \\
  -d '{"sha1":"5BAA61E4C9B93F3F0682250B6CF8331B7EE68FD8"}'`,
    js: `// Hash the password locally (SHA-1); only the hash is sent.
const r = await fetch("${BASE}?action=password_check", {
  method: "POST",
  headers: { Authorization: "Bearer knv_live_...", "Content-Type": "application/json" },
  body: JSON.stringify({ sha1 }),
});`,
    response: `{
  "result": { "compromised": true, "count": 3730471, "source": "HaveIBeenPwned" },
  "credits_remaining": 1954,
  "cost": 1
}`,
  },
  {
    method: "POST", action: "ssl_check", cost: "1 credit",
    curl: `curl -X POST "${BASE}?action=ssl_check" \\
  -H "Authorization: Bearer knv_live_..." \\
  -H "Content-Type: application/json" \\
  -d '{"url":"https://example.com"}'`,
    js: `const r = await fetch("${BASE}?action=ssl_check", {
  method: "POST",
  headers: { Authorization: "Bearer knv_live_...", "Content-Type": "application/json" },
  body: JSON.stringify({ url }),
});`,
    response: `{
  "result": { "valid": true, "daysRemaining": 67, "issuer": "Let's Encrypt", "keyStrength": "ECDSA P-256" },
  "credits_remaining": 1953,
  "cost": 1
}`,
  },
  {
    method: "POST", action: "analyze_phishing", cost: "3 credits",
    curl: `curl -X POST "${BASE}?action=analyze_phishing" \\
  -H "Authorization: Bearer knv_live_..." \\
  -H "Content-Type: application/json" \\
  -d '{"text":"Your account is suspended. Click here to verify…"}'`,
    js: `const r = await fetch("${BASE}?action=analyze_phishing", {
  method: "POST",
  headers: { Authorization: "Bearer knv_live_...", "Content-Type": "application/json" },
  body: JSON.stringify({ text }),
});`,
    response: `{
  "result": { "score": 88, "verdict": "dangerous", "signals": ["Urgency", "Credential request"] },
  "credits_remaining": 1950,
  "cost": 3
}`,
  },
];

// HTTP status + machine-readable error code stay literal; the "When" column is
// looked up by error name from the dict.
const ERROR_CODES: { code: string; name: keyof ReturnType<typeof getApi>["errors"] }[] = [
  { code: "400", name: "bad_request" },
  { code: "401", name: "invalid_api_key" },
  { code: "402", name: "insufficient_credits" },
  { code: "404", name: "job_not_found" },
  { code: "413", name: "text_too_long" },
  { code: "429", name: "rate_limited" },
  { code: "500", name: "server_error" },
  { code: "502", name: "processing_failed" },
];

const ERROR_EXAMPLE = `{
  "error": "insufficient_credits",
  "message": "This operation costs 10 credits. Your balance: 7 credits.",
  "credits_required": 10,
  "credits_available": 7,
  "buy_credits_url": "https://konvertools.com/pricing"
}`;

export function ApiDocsBody({ locale = "en" }: { locale?: Locale }) {
  const t = getApi(locale);
  // The security / explain_code endpoints may not be translated in every locale
  // yet — fall back to the English description so no row renders blank.
  const enEndpoints = getApi("en").endpoints;

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
      <article className="space-y-8 text-ink-700">
        <section>
          <h2 className="text-xl font-semibold text-ink-900">{t.sections.auth}</h2>
          <p className="mt-2">
            <code className="rounded bg-ink-100 px-1 py-0.5 text-sm">Authorization: Bearer knv_live_…</code>{" "}
            {t.auth.intro1}{" "}
            <Link href={localePath(locale, "dashboard")} prefetch={false} className="text-brand-600 hover:underline">{t.auth.dashboardLink}</Link>{" "}
            {t.auth.intro2}
          </p>
          <p className="mt-2 text-sm text-ink-500">
            {t.auth.baseUrlLabel}{" "}
            <code className="rounded bg-ink-100 px-1 py-0.5 text-xs">{BASE}</code>
          </p>
          <p className="mt-2 text-sm text-ink-500">
            {t.auth.rateLimit1} <strong>{t.auth.rateLimit2}</strong> {t.auth.rateLimit3}{" "}
            <code className="rounded bg-ink-100 px-1">429</code>{" "}
            <code className="rounded bg-ink-100 px-1">Retry-After</code>.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-ink-900">{t.sections.covers}</h2>
          <p className="mt-2 text-sm">
            {t.covers.p1a} <strong>server-to-server</strong>{" "}
            <strong>{t.covers.p1Transcription}</strong> {t.covers.p1b}{" "}
            <strong>{t.covers.p1TextAi}</strong> {t.covers.p1c}
          </p>
          <p className="mt-2 text-sm">
            {t.covers.p2a}{" "}
            <Link href={localePath(locale)} className="text-brand-600 hover:underline">{t.covers.browserToolsLink}</Link>{" "}
            {t.covers.p2b}
          </p>
          <p className="mt-2 text-sm text-ink-500">
            {coversP3Before(t.covers.p3)}
            <code className="rounded bg-ink-100 px-1">api_keys</code>
            {" → "}
            <code className="rounded bg-ink-100 px-1">jobs</code>
            {" → "}
            <code className="rounded bg-ink-100 px-1">credit_transactions</code>
            {coversP3After(t.covers.p3)}
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-ink-900">{t.sections.endpoints}</h2>
          <ul className="mt-4 space-y-6">
            {ENDPOINTS.map((e) => (
              <li key={e.action} className="rounded-lg border border-ink-100 bg-white p-5 shadow-card">
                <div className="flex flex-wrap items-center gap-2 text-sm">
                  <span className={`rounded px-2 py-0.5 font-mono font-semibold ${e.method === "GET" ? "bg-emerald-50 text-emerald-700" : "bg-brand-50 text-brand-700"}`}>{e.method}</span>
                  <code className="font-mono text-ink-900">?action={e.action}</code>
                  {e.status === "soon" && (
                    <span className="rounded bg-ink-100 px-2 py-0.5 text-[11px] font-medium text-ink-500">REST soon</span>
                  )}
                  <span className="ml-auto rounded bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-700">{e.cost}</span>
                </div>
                <p className="mt-2 text-sm text-ink-500">{t.endpoints[e.action] ?? enEndpoints[e.action]}</p>
                <div className="mt-3 grid gap-3 md:grid-cols-2">
                  <div>
                    <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-ink-400">cURL</p>
                    <pre className="overflow-x-auto rounded bg-ink-900 p-3 text-[11px] leading-relaxed text-ink-50">{e.curl}</pre>
                  </div>
                  <div>
                    <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-ink-400">JavaScript</p>
                    <pre className="overflow-x-auto rounded bg-ink-900 p-3 text-[11px] leading-relaxed text-ink-50">{e.js}</pre>
                  </div>
                </div>
                <div className="mt-3">
                  <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-ink-400">Example response</p>
                  <pre className="overflow-x-auto rounded bg-ink-50 p-3 text-[11px] leading-relaxed text-ink-800">{e.response}</pre>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-ink-900">{t.sections.errors}</h2>
          <p className="mt-2 text-sm">
            {t.errorsIntro1} <code className="rounded bg-ink-100 px-1">error</code> {t.errorsIntro2} <code className="rounded bg-ink-100 px-1">message</code>.
          </p>
          <div className="mt-3 overflow-x-auto rounded-lg border border-ink-100">
            <table className="w-full text-sm">
              <thead className="bg-ink-50 text-left text-xs uppercase tracking-wide text-ink-400">
                <tr><th className="px-3 py-2">{t.errorsTableHttp}</th><th className="px-3 py-2">{t.errorsTableError}</th><th className="px-3 py-2">{t.errorsTableWhen}</th></tr>
              </thead>
              <tbody className="divide-y divide-ink-100">
                {ERROR_CODES.map((e) => (
                  <tr key={e.name}>
                    <td className="px-3 py-2 font-mono text-ink-900">{e.code}</td>
                    <td className="px-3 py-2 font-mono text-ink-700">{e.name}</td>
                    <td className="px-3 py-2 text-ink-500">{t.errors[e.name]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mb-1 mt-4 text-xs font-semibold uppercase tracking-wide text-ink-400">{t.errorExampleLabel}</p>
          <pre className="overflow-x-auto rounded bg-ink-900 p-3 text-[11px] leading-relaxed text-ink-50">{ERROR_EXAMPLE}</pre>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-ink-900">{t.sections.privacy}</h2>
          <p className="mt-2 text-sm">{t.privacyBody}</p>
        </section>
      </article>

      <aside className="space-y-4">
        <ApiTesterClient locale={locale} />
        <div className="rounded-lg border border-ink-100 bg-white p-6 shadow-card">
          <h3 className="font-semibold text-ink-900">{t.sidebar.getKeyTitle}</h3>
          <p className="mt-2 text-sm text-ink-500">{t.sidebar.getKeyBody}</p>
          <Link href={localePath(locale, "pricing")} className="mt-4 inline-block text-sm font-medium text-brand-600 hover:underline">
            {t.sidebar.seePricing}
          </Link>
        </div>
        <div className="rounded-lg border border-ink-100 bg-white p-6 shadow-card">
          <h3 className="font-semibold text-ink-900">{t.sidebar.creditPacksTitle}</h3>
          <p className="mt-1 text-xs text-ink-400">{t.sidebar.creditPacksNote}</p>
          <table className="mt-3 w-full text-sm">
            <tbody className="divide-y divide-ink-100">
              {CREDIT_PACKS.map((p) => (
                <tr key={p.id}>
                  <td className="py-1.5 capitalize text-ink-700">{p.id}</td>
                  <td className="py-1.5 text-right font-mono text-ink-500">{p.credits.toLocaleString()} cr</td>
                  <td className="py-1.5 text-right font-mono text-ink-900">€{p.priceEur}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="rounded-lg border border-ink-100 bg-white p-6 shadow-card">
          <h3 className="font-semibold text-ink-900">{t.sidebar.costTableTitle}</h3>
          <table className="mt-3 w-full text-sm">
            <tbody className="divide-y divide-ink-100">
              {COST_TABLE.map((row) => (
                <tr key={row.op}>
                  <td className="py-1.5 text-ink-700">{row.op}</td>
                  <td className="py-1.5 text-right font-mono text-ink-900">{row.credits}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </aside>
    </div>
  );
}

// The third "covers" paragraph embeds three inline <code> table names. The dict
// stores the prose with literal {api_keys} → {jobs} → {credit_transactions}
// placeholders; here we split around that run so the codes render as <code>.
const P3_MARKER = "{api_keys} → {jobs} → {credit_transactions}";
function coversP3Before(p3: string): string {
  const i = p3.indexOf(P3_MARKER);
  return i === -1 ? p3 : p3.slice(0, i);
}
function coversP3After(p3: string): string {
  const i = p3.indexOf(P3_MARKER);
  return i === -1 ? "" : p3.slice(i + P3_MARKER.length);
}
