import type { Metadata } from "next";
import Link from "next/link";
import { TOOLS_BY_SLUG } from "@/lib/tools-config";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { buildToolMetadata } from "@/lib/seo";
import { SUPABASE_URL } from "@/lib/utils";
import { ApiTesterClient } from "@/components/billing/ApiTesterClient";
import { COST_TABLE, CREDIT_PACKS } from "@/lib/credits";

const tool = TOOLS_BY_SLUG.api;
export const metadata: Metadata = buildToolMetadata(tool);

const BASE = `${SUPABASE_URL}/functions/v1/api-gateway`;

type Endpoint = {
  method: "GET" | "POST";
  action: string;
  cost: string;
  desc: string;
  curl: string;
  js: string;
  response: string;
  status?: "rest" | "soon";
};

const ENDPOINTS: Endpoint[] = [
  {
    method: "GET", action: "me", cost: "0 credits",
    desc: "Account info: plan, credit balance, email, max file size.",
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
  "max_file_mb": 2048
}`,
  },
  {
    method: "POST", action: "transcribe", cost: "10 credits / min",
    desc: "Audio / video → timestamped SRT. Billed per started minute (61s = 2 min = 20). Multipart `file`, or JSON { file_url }.",
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
    desc: "Translate text or an SRT/VTT file (timestamps preserved). Billed per started 1000 words, minimum 5. Params: `target_lang`, `style`.",
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
    desc: "Rewrite text in a chosen style. 3 credits up to 500 words, 8 beyond. Params: `text`, `style` (professional/casual/academic/creative/simple/legal).",
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
    desc: "Summarise text. 3 credits up to 500 words, 6 beyond. Params: `text`, `format` (short/bullets/detailed).",
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
    desc: "Rewrite AI text so it reads naturally. 5 credits up to 500 words, 12 beyond. Params: `text`, `level` (light/medium/strong).",
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
    desc: "Convert source code between languages. Params: `code`, `from_language`, `to_language`.",
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
    desc: "Fetch a job by id. Pass &id=<uuid>.",
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
    method: "POST", action: "remove_background", cost: "2 credits", status: "soon",
    desc: "Cut out a transparent PNG. Runs in-browser today (free & unlimited); REST access is rolling out.",
    curl: `# In-browser today: https://konvertools.com/remove-background
# REST coming soon.`,
    js: `// In-browser today: https://konvertools.com/remove-background
// REST coming soon.`,
    response: `{
  "error": "not_implemented",
  "message": "remove_background runs in-browser today and isn't yet available over REST. You were not charged."
}`,
  },
  {
    method: "POST", action: "convert_pdf", cost: "1 credit", status: "soon",
    desc: "merge / split / compress / rotate / to_images / to_text. Runs in-browser today; REST access is rolling out.",
    curl: `# In-browser today: https://konvertools.com/merge-pdf (and friends)
# REST coming soon.`,
    js: `// In-browser today; REST coming soon.`,
    response: `{
  "error": "not_implemented",
  "message": "convert_pdf runs in-browser today and isn't yet available over REST. You were not charged."
}`,
  },
  {
    method: "POST", action: "convert_image", cost: "1 credit", status: "soon",
    desc: "Re-encode to a target format with quality/resize. Runs in-browser today; REST access is rolling out.",
    curl: `# In-browser today: https://konvertools.com/png-to-jpg (and friends)
# REST coming soon.`,
    js: `// In-browser today; REST coming soon.`,
    response: `{
  "error": "not_implemented",
  "message": "convert_image runs in-browser today and isn't yet available over REST. You were not charged."
}`,
  },
];

const ERROR_CODES: { code: string; name: string; desc: string }[] = [
  { code: "400", name: "bad_request", desc: "Missing or invalid parameter — the message says which." },
  { code: "401", name: "invalid_api_key", desc: "Key missing, not found, or revoked." },
  { code: "402", name: "insufficient_credits", desc: "Balance too low — response includes how many you need." },
  { code: "404", name: "job_not_found", desc: "That job id doesn't belong to your account." },
  { code: "413", name: "text_too_long", desc: "Keep text payloads under 40,000 characters." },
  { code: "429", name: "rate_limited", desc: "Too many requests — retry after the indicated delay." },
  { code: "500", name: "server_error", desc: "Something broke on our side — retry." },
  { code: "502", name: "processing_failed", desc: "Upstream model error — you are not charged." },
];

const ERROR_EXAMPLE = `{
  "error": "insufficient_credits",
  "message": "This operation costs 10 credits. Your balance: 7 credits.",
  "credits_required": 10,
  "credits_available": 7,
  "buy_credits_url": "https://konvertools.com/pricing"
}`;

export default function ApiDocsPage() {
  return (
    <ToolPageShell tool={tool}>
      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        <article className="space-y-8 text-ink-700">
          <section>
            <h2 className="text-xl font-semibold text-ink-900">Authentication</h2>
            <p className="mt-2">
              Send <code className="rounded bg-ink-100 px-1 py-0.5 text-sm">Authorization: Bearer knv_live_…</code> with every request. Generate a key from your{" "}
              <Link href="/dashboard" prefetch={false} className="text-brand-600 hover:underline">dashboard</Link> (Business plan).
              Each call spends credits from your balance — credits never expire.
            </p>
            <p className="mt-2 text-sm text-ink-500">
              Base URL: <code className="rounded bg-ink-100 px-1 py-0.5 text-xs">{BASE}</code>
            </p>
            <p className="mt-2 text-sm text-ink-500">
              Rate limit: <strong>60 requests/minute</strong> per key. Exceeding it returns <code className="rounded bg-ink-100 px-1">429</code> with a <code className="rounded bg-ink-100 px-1">Retry-After</code> header.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-ink-900">Endpoints</h2>
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
                  <p className="mt-2 text-sm text-ink-500">{e.desc}</p>
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
            <h2 className="text-xl font-semibold text-ink-900">Errors</h2>
            <p className="mt-2 text-sm">Every endpoint returns a consistent JSON envelope with an <code className="rounded bg-ink-100 px-1">error</code> code and a human-readable <code className="rounded bg-ink-100 px-1">message</code>.</p>
            <div className="mt-3 overflow-x-auto rounded-lg border border-ink-100">
              <table className="w-full text-sm">
                <thead className="bg-ink-50 text-left text-xs uppercase tracking-wide text-ink-400">
                  <tr><th className="px-3 py-2">HTTP</th><th className="px-3 py-2">error</th><th className="px-3 py-2">When</th></tr>
                </thead>
                <tbody className="divide-y divide-ink-100">
                  {ERROR_CODES.map((e) => (
                    <tr key={e.name}>
                      <td className="px-3 py-2 font-mono text-ink-900">{e.code}</td>
                      <td className="px-3 py-2 font-mono text-ink-700">{e.name}</td>
                      <td className="px-3 py-2 text-ink-500">{e.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mb-1 mt-4 text-xs font-semibold uppercase tracking-wide text-ink-400">402 example</p>
            <pre className="overflow-x-auto rounded bg-ink-900 p-3 text-[11px] leading-relaxed text-ink-50">{ERROR_EXAMPLE}</pre>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-ink-900">Privacy</h2>
            <p className="mt-2 text-sm">
              Result files in <code>results/</code> storage carry a 10-minute signed URL and are deleted
              within 30 minutes by a scheduled purge. Job rows are deleted after 2 hours.
              File content is never retained beyond that window.
            </p>
          </section>
        </article>

        <aside className="space-y-4">
          <ApiTesterClient />
          <div className="rounded-lg border border-ink-100 bg-white p-6 shadow-card">
            <h3 className="font-semibold text-ink-900">Get an API key</h3>
            <p className="mt-2 text-sm text-ink-500">
              The REST API is included with the Business plan (€39/month) — 300 credits every month, plus
              top-up packs that never expire.
            </p>
            <Link href="/pricing" className="mt-4 inline-block text-sm font-medium text-brand-600 hover:underline">
              See pricing →
            </Link>
          </div>
          <div className="rounded-lg border border-ink-100 bg-white p-6 shadow-card">
            <h3 className="font-semibold text-ink-900">Credit packs</h3>
            <p className="mt-1 text-xs text-ink-400">Top-ups never expire.</p>
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
            <h3 className="font-semibold text-ink-900">Cost table</h3>
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
    </ToolPageShell>
  );
}
