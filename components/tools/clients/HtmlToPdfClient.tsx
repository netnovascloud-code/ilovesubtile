"use client";

import { useState } from "react";
import { Upload, X, Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const SAMPLE = `<h1>Wyrlo</h1>
<p>Free online conversion tools — files, images, code, text and more.</p>
<ul>
  <li>PDF: Merge, Split, Rotate, Images→PDF</li>
  <li>Images: Compress, Resize, Crop, Background remover</li>
  <li>Audio &amp; Video via FFmpeg.wasm</li>
</ul>`;

export function HtmlToPdfClient() {
  const [mode, setMode] = useState<"paste" | "file">("paste");
  const [html, setHtml] = useState<string>(SAMPLE);
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [resultName, setResultName] = useState("page.pdf");

  async function convert() {
    if (busy) return;
    let source = html;
    if (mode === "file") {
      if (!file) return;
      source = await file.text();
      setResultName(`${file.name.replace(/\.html?$/i, "")}.pdf`);
    } else { setResultName("page.pdf"); }
    if (!source.trim()) { setError("Add some HTML first."); return; }
    setBusy(true); setError(null); setResultUrl(null);
    try {
      const host = document.createElement("div");
      host.style.cssText = "position:fixed;left:-10000px;top:0;width:780px;background:#fff;font-family:'Helvetica','Arial',sans-serif;color:#111;line-height:1.5;font-size:12pt;padding:24px;";
      host.innerHTML = source;
      document.body.appendChild(host);
      try {
        const { jsPDF } = await import("jspdf");
        const pdf = new jsPDF({ unit: "pt", format: "a4" });
        await new Promise<void>((resolve, reject) => {
          pdf.html(host, {
            autoPaging: "text",
            margin: [36, 36, 36, 36],
            html2canvas: { scale: 0.75, useCORS: true, backgroundColor: "#ffffff" },
            callback: () => resolve(),
          }).catch(reject);
        });
        const blob = pdf.output("blob");
        setResultUrl(URL.createObjectURL(blob));
      } finally { document.body.removeChild(host); }
    } catch (e) { setError(`Could not render: ${(e as Error).message}`); }
    finally { setBusy(false); }
  }

  return (
    <div className="space-y-4">
      <div className="inline-flex rounded-lg border border-ink-200 bg-white p-1">
        {(["paste", "file"] as const).map((m) => (
          <button key={m} onClick={() => setMode(m)} className={cn("rounded-md px-3 py-1.5 text-sm font-medium transition-colors", mode === m ? "bg-brand-500 text-white" : "text-ink-600 hover:text-ink-900")}>
            {m === "paste" ? "Paste HTML" : "Upload .html"}
          </button>
        ))}
      </div>

      {mode === "paste" ? (
        <textarea
          value={html}
          onChange={(e) => setHtml(e.target.value)}
          spellCheck={false}
          className="h-72 w-full resize-y rounded-lg border border-ink-200 bg-white p-3 font-mono text-[13px] text-ink-900 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100"
        />
      ) : !file ? (
        <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-blue-300 bg-blue-50/40 px-6 py-12 text-center transition-colors hover:brightness-95">
          <Upload className="h-7 w-7 text-blue-600" />
          <span className="mt-2 font-medium text-ink-900">Upload an HTML file</span>
          <input type="file" accept=".html,.htm,text/html" className="hidden" onChange={(e) => { setFile(e.target.files?.[0] ?? null); setResultUrl(null); }} />
        </label>
      ) : (
        <div className="flex items-center justify-between rounded-lg border border-ink-100 bg-white px-4 py-2.5">
          <span className="truncate text-sm font-medium text-ink-900">{file.name}</span>
          <button onClick={() => { setFile(null); setResultUrl(null); }} className="rounded p-1 text-xs text-ink-400 hover:bg-ink-50 hover:text-ink-700"><X className="h-3.5 w-3.5" /></button>
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        <Button onClick={convert} disabled={busy || (mode === "file" && !file)} size="lg">
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          {busy ? "Rendering…" : "Render to PDF"}
        </Button>
        {resultUrl && (
          <a href={resultUrl} download={resultName}>
            <Button size="lg" variant="outline"><Download className="h-4 w-4" /> Download PDF</Button>
          </a>
        )}
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}
      <p className="text-xs text-ink-400">Rendered 100% in your browser via jspdf. External stylesheets and JavaScript aren't executed; inline CSS works best.</p>
    </div>
  );
}
