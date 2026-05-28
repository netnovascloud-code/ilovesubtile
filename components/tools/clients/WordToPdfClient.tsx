"use client";

import { useState } from "react";
import { Upload, X, Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatBytes } from "@/lib/utils";

export function WordToPdfClient() {
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [resultName, setResultName] = useState("document.pdf");

  async function convert() {
    if (!file || busy) return;
    setBusy(true); setError(null); setResultUrl(null);
    try {
      const mammoth = await import("mammoth");
      const arrayBuffer = await file.arrayBuffer();
      const result = await mammoth.convertToHtml({ arrayBuffer });
      const html = `<div style="font-family: 'Helvetica', 'Arial', sans-serif; color:#111; max-width: 680px; padding: 24px; line-height: 1.55; font-size: 12pt;">${result.value}</div>`;

      // Render the HTML in a detached host so jspdf can lay it out.
      const host = document.createElement("div");
      host.style.cssText = "position:fixed;left:-10000px;top:0;width:780px;background:#fff;";
      host.innerHTML = html;
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
        setResultName(`${file.name.replace(/\.docx?$/i, "")}.pdf`);
      } finally { document.body.removeChild(host); }
    } catch (e) {
      setError(`Could not convert: ${(e as Error).message}`);
    } finally { setBusy(false); }
  }

  return (
    <div className="space-y-4">
      {!file ? (
        <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-blue-300 bg-blue-50/40 px-6 py-12 text-center transition-colors hover:brightness-95">
          <Upload className="h-7 w-7 text-blue-600" />
          <span className="mt-2 font-medium text-ink-900">Upload a Word document</span>
          <span className="mt-0.5 text-xs text-ink-400">.docx — converted in your browser</span>
          <input type="file" accept=".docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document" className="hidden" onChange={(e) => { setFile(e.target.files?.[0] ?? null); setResultUrl(null); setError(null); }} />
        </label>
      ) : (
        <div className="flex items-center justify-between rounded-lg border border-ink-100 bg-white px-4 py-2.5">
          <div className="min-w-0 truncate text-sm">
            <span className="font-medium text-ink-900">{file.name}</span>
            <span className="ml-2 text-ink-400">{formatBytes(file.size)}</span>
          </div>
          <button onClick={() => { setFile(null); setResultUrl(null); setError(null); }} className="rounded p-1 text-xs text-ink-400 hover:bg-ink-50 hover:text-ink-700"><X className="h-3.5 w-3.5" /></button>
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        <Button onClick={convert} disabled={!file || busy} size="lg">
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          {busy ? "Converting…" : "Convert to PDF"}
        </Button>
        {resultUrl && (
          <a href={resultUrl} download={resultName}>
            <Button size="lg" variant="outline"><Download className="h-4 w-4" /> Download PDF</Button>
          </a>
        )}
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}
      <p className="text-xs text-ink-400">Converted 100% in your browser via mammoth + jspdf — your file is never uploaded. Complex layouts (tables, embedded fonts) may render simplified.</p>
    </div>
  );
}
