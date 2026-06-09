"use client";

import { useState } from "react";
import { Upload, X, Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatBytes } from "@/lib/utils";
import { buildDocx } from "@/lib/docx-writer";

type PdfJs = {
  GlobalWorkerOptions: { workerSrc: string };
  getDocument: (src: { data: Uint8Array }) => { promise: Promise<{ numPages: number; getPage: (n: number) => Promise<{ getTextContent: () => Promise<{ items: { str: string; hasEOL?: boolean }[] }> }> }> };
};

async function loadPdfjs(): Promise<PdfJs> {
  const url = "https://esm.sh/pdfjs-dist@4.7.76/build/pdf.min.mjs";
  const lib = (await import(/* webpackIgnore: true */ url)) as unknown as PdfJs;
  lib.GlobalWorkerOptions.workerSrc = "https://esm.sh/pdfjs-dist@4.7.76/build/pdf.worker.min.mjs";
  return lib;
}

export function PdfToWordClient() {
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [resultName, setResultName] = useState("document.docx");

  async function convert(f: File) {
    setBusy(true); setError(null); setResultUrl(null); setProgress(2);
    try {
      const pdfjs = await loadPdfjs();
      const doc = await pdfjs.getDocument({ data: new Uint8Array(await f.arrayBuffer()) }).promise;

      // Collect each page's lines. We no longer inject a "Page N" heading — that
      // synthetic text was itself polluting the body the user reads.
      const pages: string[][] = [];
      for (let i = 1; i <= doc.numPages; i++) {
        const page = await doc.getPage(i);
        const content = await page.getTextContent();
        const pageLines: string[] = [];
        let cur = "";
        for (const it of content.items) {
          cur += it.str;
          if (it.hasEOL) { if (cur.trim()) pageLines.push(cur.trim()); cur = ""; } else cur += " ";
        }
        if (cur.trim()) pageLines.push(cur.trim());
        pages.push(pageLines);
        setProgress(Math.max(2, Math.min(99, Math.round((i / doc.numPages) * 100))));
      }

      // Strip running headers/footers + stray page numbers so they don't land in
      // the body: a first/last line that repeats across most pages is boilerplate,
      // and "Page 3", "3 / 10" or a lone number is a page marker.
      const PAGE_NUM = /^\s*(?:page\s+\d+(?:\s+(?:of|sur|\/)\s+\d+)?|\d+\s*\/\s*\d+|[-–—]?\s*\d{1,4}\s*[-–—]?)\s*$/i;
      const tally = (get: (p: string[]) => string | undefined) => {
        const m = new Map<string, number>();
        for (const p of pages) { const v = get(p); if (v) m.set(v, (m.get(v) ?? 0) + 1); }
        return m;
      };
      const firstC = tally((p) => p[0]);
      const lastC = tally((p) => p[p.length - 1]);
      const thr = Math.max(2, Math.ceil(doc.numPages * 0.5));
      const lines: string[] = [];
      pages.forEach((p, idx) => {
        if (idx > 0) lines.push("");
        p.forEach((line, j) => {
          if (PAGE_NUM.test(line)) return;
          if (j === 0 && (firstC.get(line) ?? 0) >= thr) return;
          if (j === p.length - 1 && (lastC.get(line) ?? 0) >= thr) return;
          lines.push(line);
        });
      });

      const blob = await buildDocx(lines, new Set<number>());
      setResultUrl(URL.createObjectURL(blob));
      setResultName(`${f.name.replace(/\.pdf$/i, "")}.docx`);
      setProgress(100);
    } catch (e) { setError(`Could not convert: ${(e as Error).message}`); }
    finally { setBusy(false); }
  }

  return (
    <div className="space-y-4">
      {!file ? (
        <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-blue-300 bg-blue-50/40 px-6 py-12 text-center transition-colors hover:brightness-95">
          <Upload className="h-7 w-7 text-blue-600" />
          <span className="mt-2 font-medium text-ink-900">Upload a PDF</span>
          <span className="mt-0.5 text-xs text-ink-400">Text is extracted in your browser into an editable .docx</span>
          <input type="file" accept="application/pdf,.pdf" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) { setFile(f); convert(f); } }} />
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

      {busy && (
        <div className="flex items-center gap-3 rounded-lg border border-ink-100 bg-white px-4 py-3">
          <Loader2 className="h-4 w-4 animate-spin text-brand-500" />
          <div className="flex-1">
            <p className="text-sm font-medium text-ink-900">Extracting text…</p>
            <p className="text-xs text-ink-400">{progress}% — first run downloads the PDF reader (~2 MB) from CDN</p>
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        {file && !busy && !resultUrl && (
          <Button onClick={() => convert(file)} size="lg">Convert to Word</Button>
        )}
        {resultUrl && (
          <a href={resultUrl} download={resultName}>
            <Button size="lg" variant="outline"><Download className="h-4 w-4" /> Download .docx</Button>
          </a>
        )}
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}
      <p className="text-xs text-ink-400">
        Converted 100% in your browser — your PDF is never uploaded. This extracts the text into an editable Word document;
        complex layouts, columns and images are not reproduced. For scanned PDFs (no text layer), use an OCR tool first.
      </p>
    </div>
  );
}
