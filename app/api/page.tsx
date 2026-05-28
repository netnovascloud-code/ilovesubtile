import type { Metadata } from "next";
import Link from "next/link";
import { TOOLS_BY_SLUG } from "@/lib/tools-config";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { buildToolMetadata } from "@/lib/seo";
import { SUPABASE_URL } from "@/lib/utils";
import { ApiTesterClient } from "@/components/billing/ApiTesterClient";

const tool = TOOLS_BY_SLUG.api;
export const metadata: Metadata = buildToolMetadata(tool);

const BASE = `${SUPABASE_URL}/functions/v1/api-gateway`;

type Endpoint = { method: "GET" | "POST"; action: string; cost: string; desc: string; curl: string; js: string; response: string };

const ENDPOINTS: Endpoint[] = [
  {
    method: "GET", action: "me", cost: "0 credits",
    desc: "Account info: plan, credit balance, email.",
    curl: `curl "${BASE}?action=me" \\
  -H "Authorization: Bearer cf_live_..."`,
    js: `const r = await fetch("${BASE}?action=me", {
  headers: { Authorization: "Bearer cf_live_..." }
});
const me = await r.json();
// { user_id, email, plan, credits }`,
    response: `{
  "user_id": "6a16994b-...",
  "email": "you@example.com",
  "plan": "business",
  "credits": 100000
}`,
  },
  {
    method: "POST", action: "transcribe", cost: "10 credits",
    desc: "Audio / video → SRT. Multipart `file`, or JSON { file_url }.",
    curl: `curl -X POST "${BASE}?action=transcribe" \\
  -H "Authorization: Bearer cf_live_..." \\
  -F "file=@episode.mp3"`,
    js: `const form = new FormData();
form.append("file", audioFile);
const r = await fetch("${BASE}?action=transcribe", {
  method: "POST",
  headers: { Authorization: "Bearer cf_live_..." },
  body: form,
});
const { url, job_id, credits_remaining } = await r.json();`,
    response: `{
  "job_id": "f3a9...",
  "url": "https://.../result.srt",
  "credits_remaining": 9990,
  "cost": 10
}`,
  },
  {
    method: "POST", action: "translate", cost: "5 credits",
    desc: "Translate an SRT. Multipart `file` + `target_lang`, or JSON.",
    curl: `curl -X POST "${BASE}?action=translate" \\
  -H "Authorization: Bearer cf_live_..." \\
  -F "file=@subs.srt" \\
  -F "target_lang=ES"`,
    js: `const r = await fetch("${BASE}?action=translate", {
  method: "POST",
  headers: {
    Authorization: "Bearer cf_live_...",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ file_url: srtUrl, target_lang: "ES" }),
});`,
    response: `{
  "job_id": "9c1d...",
  "url": "https://.../result.srt",
  "credits_remaining": 9985,
  "cost": 5
}`,
  },
  {
    method: "POST", action: "rephrase", cost: "3 credits",
    desc: "Rewrite text in a chosen style. JSON { text, style }.",
    curl: `curl -X POST "${BASE}?action=rephrase" \\
  -H "Authorization: Bearer cf_live_..." \\
  -H "Content-Type: application/json" \\
  -d '{"text":"Hey can u send file asap","style":"formal professional"}'`,
    js: `const r = await fetch("${BASE}?action=rephrase", {
  method: "POST",
  headers: {
    Authorization: "Bearer cf_live_...",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ text, style: "formal professional" }),
});
const { output } = await r.json();`,
    response: `{
  "job_id": "7c9a...",
  "output": "Could you please send the file at your earliest convenience?",
  "credits_remaining": 9982,
  "cost": 3
}`,
  },
  {
    method: "POST", action: "summarize", cost: "3 credits",
    desc: "Summarise text. JSON { text, format: \"sentence\" | \"bullets\" | \"detailed\" }.",
    curl: `curl -X POST "${BASE}?action=summarize" \\
  -H "Authorization: Bearer cf_live_..." \\
  -H "Content-Type: application/json" \\
  -d '{"text":"Long article…","format":"bullets"}'`,
    js: `const r = await fetch("${BASE}?action=summarize", {
  method: "POST",
  headers: {
    Authorization: "Bearer cf_live_...",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ text, format: "bullets" }),
});`,
    response: `{
  "job_id": "ab12...",
  "output": "- Key point one\\n- Key point two\\n- ...",
  "credits_remaining": 9979,
  "cost": 3
}`,
  },
  {
    method: "GET", action: "job", cost: "0 credits",
    desc: "Fetch a job by id. Pass &id=<uuid>.",
    curl: `curl "${BASE}?action=job&id=f3a9..." \\
  -H "Authorization: Bearer cf_live_..."`,
    js: `const r = await fetch("${BASE}?action=job&id=" + jobId, {
  headers: { Authorization: "Bearer cf_live_..." }
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
];

export default function ApiDocsPage() {
  return (
    <ToolPageShell tool={tool}>
      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        <article className="space-y-8 text-ink-700">
          <section>
            <h2 className="text-xl font-semibold text-ink-900">Authentication</h2>
            <p className="mt-2">
              Send <code className="rounded bg-ink-100 px-1 py-0.5 text-sm">Authorization: Bearer cf_live_…</code> with every request. Generate a key from your{" "}
              <Link href="/dashboard" className="text-brand-600 hover:underline">dashboard</Link> (Business plan).
              Each call spends credits from your balance.
            </p>
            <p className="mt-2 text-sm text-ink-500">
              Base URL: <code className="rounded bg-ink-100 px-1 py-0.5 text-xs">{BASE}</code>
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
            <ul className="mt-2 space-y-1 text-sm">
              <li><code className="rounded bg-ink-100 px-1">401 missing_api_key</code> — no Authorization header.</li>
              <li><code className="rounded bg-ink-100 px-1">401 invalid_api_key</code> — key not found or revoked.</li>
              <li><code className="rounded bg-ink-100 px-1">402 insufficient_credits</code> — top up in the dashboard.</li>
              <li><code className="rounded bg-ink-100 px-1">404 job_not_found</code> — the job id doesn't belong to your account.</li>
              <li><code className="rounded bg-ink-100 px-1">413 text_too_long</code> — keep payload under 40 000 characters.</li>
              <li><code className="rounded bg-ink-100 px-1">502 processing_failed</code> — upstream model error; <strong>not charged</strong>.</li>
            </ul>
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
              API access is included with the Business plan (€49/month). Generate and revoke keys from your dashboard.
            </p>
            <Link href="/dashboard" className="mt-4 inline-block text-sm font-medium text-brand-600 hover:underline">
              Open dashboard →
            </Link>
          </div>
          <div className="rounded-lg border border-ink-100 bg-white p-6 shadow-card">
            <h3 className="font-semibold text-ink-900">Cost table</h3>
            <table className="mt-3 w-full text-sm">
              <tbody className="divide-y divide-ink-100">
                <tr><td className="py-1.5 text-ink-700">transcribe</td><td className="py-1.5 text-right font-mono text-ink-900">10</td></tr>
                <tr><td className="py-1.5 text-ink-700">translate</td><td className="py-1.5 text-right font-mono text-ink-900">5</td></tr>
                <tr><td className="py-1.5 text-ink-700">rephrase</td><td className="py-1.5 text-right font-mono text-ink-900">3</td></tr>
                <tr><td className="py-1.5 text-ink-700">summarize</td><td className="py-1.5 text-right font-mono text-ink-900">3</td></tr>
                <tr><td className="py-1.5 text-ink-700">me · job</td><td className="py-1.5 text-right font-mono text-ink-900">0</td></tr>
              </tbody>
            </table>
          </div>
        </aside>
      </div>
    </ToolPageShell>
  );
}
