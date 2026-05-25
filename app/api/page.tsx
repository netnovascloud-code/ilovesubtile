import type { Metadata } from "next";
import Link from "next/link";
import { TOOLS_BY_SLUG } from "@/lib/tools-config";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { buildToolMetadata } from "@/lib/seo";
import { SITE_URL } from "@/lib/utils";

const tool = TOOLS_BY_SLUG.api;
export const metadata: Metadata = buildToolMetadata(tool);

const ENDPOINTS = [
  {
    method: "POST",
    path: "/api/v1/transcribe",
    cost: "10 credits",
    desc: "Audio/video → SRT (AI). Multipart `file`, or JSON { file_url }.",
    curl: `curl -X POST ${SITE_URL}/api/v1/transcribe \\
  -H "Authorization: Bearer cf_live_..." \\
  -F "file=@episode.mp3"`,
  },
  {
    method: "POST",
    path: "/api/v1/translate",
    cost: "5 credits",
    desc: "Translate an SRT (AI). Multipart `file` + `target_lang`, or JSON { srt_url, target_lang }.",
    curl: `curl -X POST ${SITE_URL}/api/v1/translate \\
  -H "Authorization: Bearer cf_live_..." \\
  -F "file=@subs.srt" -F "target_lang=ES"`,
  },
];

const RESPONSE = `{
  "job_id": "f3a9…",
  "url": "https://…/result.srt",  // signed, valid 1h
  "credits_remaining": 190,
  "cost": 10
}`;

export default function ApiDocsPage() {
  return (
    <ToolPageShell tool={tool}>
      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        <article className="space-y-8 text-ink-700">
          <section>
            <h2 className="text-xl font-semibold text-ink-900">Authentication</h2>
            <p className="mt-2">
              Send{" "}
              <code className="rounded bg-ink-100 px-1 py-0.5 text-sm">Authorization: Bearer cf_live_…</code>{" "}
              with every request. Generate a key from your{" "}
              <Link href="/dashboard" className="text-brand-600 hover:underline">dashboard</Link>{" "}
              (Business plan). Each call spends credits from your balance.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-ink-900">Endpoints</h2>
            <ul className="mt-4 space-y-5">
              {ENDPOINTS.map((e) => (
                <li key={e.path} className="rounded-lg border border-ink-100 bg-white p-4 shadow-card">
                  <div className="flex flex-wrap items-center gap-2 text-sm">
                    <span className="rounded bg-brand-50 px-2 py-0.5 font-mono font-semibold text-brand-700">
                      {e.method}
                    </span>
                    <code className="font-mono text-ink-900">{e.path}</code>
                    <span className="ml-auto rounded bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-700">
                      {e.cost}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-ink-500">{e.desc}</p>
                  <pre className="mt-3 overflow-x-auto rounded bg-ink-900 p-3 text-xs text-ink-50">{e.curl}</pre>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-ink-900">Response</h2>
            <p className="mt-2">Every successful call returns JSON with a signed download URL:</p>
            <pre className="mt-3 overflow-x-auto rounded bg-ink-900 p-3 text-xs text-ink-50">{RESPONSE}</pre>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-ink-900">Errors</h2>
            <ul className="mt-2 space-y-1 text-sm">
              <li><code className="rounded bg-ink-100 px-1">401 invalid_api_key</code> — missing or revoked key.</li>
              <li><code className="rounded bg-ink-100 px-1">402 insufficient_credits</code> — top up in the dashboard.</li>
              <li><code className="rounded bg-ink-100 px-1">502 processing_failed</code> — upstream model error; not charged.</li>
            </ul>
          </section>
        </article>

        <aside className="space-y-4">
          <div className="rounded-lg border border-ink-100 bg-white p-6 shadow-card">
            <h3 className="font-semibold text-ink-900">Get an API key</h3>
            <p className="mt-2 text-sm text-ink-500">
              API access is included with the Business plan (€49/month). Generate and revoke keys
              from your dashboard.
            </p>
            <Link href="/dashboard" className="mt-4 inline-block text-sm font-medium text-brand-600 hover:underline">
              Open dashboard →
            </Link>
          </div>
          <div className="rounded-lg border border-ink-100 bg-white p-6 shadow-card">
            <h3 className="font-semibold text-ink-900">Credits</h3>
            <p className="mt-2 text-sm text-ink-500">
              Calls are billed in credits (transcribe 10, translate 5). Your balance and full
              ledger live in the dashboard.
            </p>
          </div>
        </aside>
      </div>
    </ToolPageShell>
  );
}
