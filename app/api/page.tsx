import type { Metadata } from "next";
import { TOOLS_BY_SLUG } from "@/lib/tools-config";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { buildToolMetadata } from "@/lib/seo";

const tool = TOOLS_BY_SLUG.api;
export const metadata: Metadata = buildToolMetadata(tool);

const ENDPOINTS = [
  {
    method: "POST",
    path: "/v1/jobs/transcribe",
    body: { file_url: "https://...", language: "auto" },
  },
  {
    method: "POST",
    path: "/v1/jobs/translate",
    body: { srt_url: "https://...", target_language: "es" },
  },
  {
    method: "POST",
    path: "/v1/jobs/burn-in",
    body: { video_url: "https://...", srt_url: "https://...", style: "default" },
  },
  {
    method: "GET",
    path: "/v1/jobs/{id}",
    body: null,
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
              Send an{" "}
              <code className="rounded bg-ink-100 px-1 py-0.5 text-sm">Authorization: Bearer YOUR_API_KEY</code>{" "}
              header with every request. Keys are issued on the Business plan.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-ink-900">Endpoints</h2>
            <ul className="mt-4 space-y-4">
              {ENDPOINTS.map((e) => (
                <li key={`${e.method}-${e.path}`} className="rounded border border-ink-100 bg-white p-4">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="rounded bg-brand-50 px-2 py-0.5 font-mono font-semibold text-brand-700">
                      {e.method}
                    </span>
                    <code className="font-mono text-ink-900">{e.path}</code>
                  </div>
                  {e.body && (
                    <pre className="mt-3 overflow-x-auto rounded bg-ink-900 p-3 text-xs text-ink-50">
                      {JSON.stringify(e.body, null, 2)}
                    </pre>
                  )}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-ink-900">Rate limits</h2>
            <p className="mt-2">
              60 requests/minute on Business. Need more? Get in touch and we&apos;ll bump you up.
            </p>
          </section>
        </article>

        <aside className="rounded-lg border border-ink-100 bg-white p-6 shadow-card">
          <h3 className="font-semibold text-ink-900">Get an API key</h3>
          <p className="mt-2 text-sm text-ink-500">
            API access is included with the Business plan (€49/month). Sign up and visit your
            dashboard to generate a key.
          </p>
        </aside>
      </div>
    </ToolPageShell>
  );
}
