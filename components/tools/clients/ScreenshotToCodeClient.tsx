"use client";

import { useMemo, useState } from "react";
import { Image as ImageIcon, Loader2, Download, Copy, Check, Code } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MiniDrop } from "@/components/tools/MiniDrop";
import { callVisionText } from "@/lib/vision-client";

// Strip the assistant's occasional ```html ... ``` fences so the saved file
// is a real HTML document and the iframe srcDoc renders correctly.
function stripFences(s: string): string {
  return s.replace(/^```(?:html)?\s*/i, "").replace(/\s*```\s*$/i, "").trim();
}

export function ScreenshotToCodeClient() {
  const [file, setFile] = useState<File | null>(null);
  const [html, setHtml] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tab, setTab] = useState<"preview" | "code">("preview");
  const [copied, setCopied] = useState(false);

  const cleaned = useMemo(() => stripFences(html), [html]);

  async function run() {
    if (!file) return;
    setBusy(true); setError(null); setHtml("");
    try {
      setHtml(await callVisionText("screenshot-to-code", "screenshot-to-code", file));
    } catch (e) {
      setError((e as Error).message);
    } finally { setBusy(false); }
  }

  const copy = async () => { await navigator.clipboard.writeText(cleaned); setCopied(true); setTimeout(() => setCopied(false), 1400); };
  const download = () => {
    const blob = new Blob([cleaned], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url;
    a.download = `${(file?.name ?? "screenshot").replace(/\.[^.]+$/, "")}.html`;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 4000);
  };

  return (
    <div className="space-y-5">
      <MiniDrop
        label="UI screenshot"
        accept={{ "image/jpeg": [".jpg", ".jpeg"], "image/png": [".png"], "image/webp": [".webp"] }}
        icon={<ImageIcon className="h-5 w-5" />}
        onFile={(f) => { setFile(f); setHtml(""); }}
        current={file}
      />

      {file && (
        <Button onClick={run} disabled={busy} size="lg">
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Code className="h-4 w-4" />}
          {busy ? "Generating code…" : "Generate HTML/CSS"}
        </Button>
      )}

      {error && <p className="rounded border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</p>}

      {cleaned && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="inline-flex rounded-lg border border-ink-200 bg-white p-1">
              {(["preview", "code"] as const).map((t) => (
                <button key={t} onClick={() => setTab(t)} className={`rounded-md px-3 py-1 text-xs font-medium ${tab === t ? "bg-brand-500 text-white" : "text-ink-600"}`}>
                  {t === "preview" ? "Preview" : "Code"}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <button onClick={copy} className="inline-flex items-center gap-1.5 rounded-md border border-ink-200 bg-white px-2.5 py-1 text-xs font-medium text-ink-700 hover:border-brand-300">
                {copied ? <Check className="h-3 w-3 text-green-600" /> : <Copy className="h-3 w-3" />} Copy
              </button>
              <button onClick={download} className="inline-flex items-center gap-1.5 rounded-md border border-ink-200 bg-white px-2.5 py-1 text-xs font-medium text-ink-700 hover:border-brand-300">
                <Download className="h-3 w-3" /> .html
              </button>
            </div>
          </div>

          {tab === "preview" ? (
            // sandbox keeps any scripts in the generated page from touching
            // the parent — the Tailwind CDN <script> still works because it
            // doesn't need same-origin access.
            <iframe srcDoc={cleaned} sandbox="allow-scripts" className="h-[28rem] w-full rounded-lg border border-ink-200 bg-white" />
          ) : (
            <pre className="h-[28rem] w-full overflow-auto rounded-lg border border-ink-200 bg-ink-900 p-4 font-mono text-xs leading-relaxed text-ink-100">{cleaned}</pre>
          )}
        </div>
      )}

      <p className="text-xs text-ink-400">
        Generated as a single self-contained HTML5 document with Tailwind CSS classes. Powered by AI vision — best for clean, common UI patterns; expect to adjust the result.
      </p>
    </div>
  );
}
