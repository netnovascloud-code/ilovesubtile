"use client";

import { useState } from "react";
import { Upload, X, Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatBytes } from "@/lib/utils";

function parseRanges(spec: string, max: number): number[][] {
  // "1-3, 5, 7-8" → [[1,3],[5,5],[7,8]], 1-based, clamped to [1,max].
  const out: number[][] = [];
  for (const part of spec.split(",")) {
    const p = part.trim();
    if (!p) continue;
    const m = p.match(/^(\d+)\s*(?:-\s*(\d+))?$/);
    if (!m) throw new Error(`Bad range: "${p}"`);
    const a = Math.max(1, Math.min(max, parseInt(m[1], 10)));
    const b = Math.max(1, Math.min(max, parseInt(m[2] ?? m[1], 10)));
    out.push([Math.min(a, b), Math.max(a, b)]);
  }
  if (!out.length) throw new Error("Enter at least one range.");
  return out;
}

export function PdfSplitClient() {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState<number>(0);
  const [ranges, setRanges] = useState("1");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [resultName, setResultName] = useState("split.zip");

  async function loadFile(f: File) {
    setError(null); setResultUrl(null);
    try {
      const { PDFDocument } = await import("pdf-lib");
      const src = await PDFDocument.load(await f.arrayBuffer(), { ignoreEncryption: true });
      setFile(f);
      setPageCount(src.getPageCount());
      setRanges(`1-${src.getPageCount()}`);
    } catch (e) { setError(`Could not read PDF: ${(e as Error).message}`); }
  }

  async function split() {
    if (!file || busy) return;
    setBusy(true); setError(null); setResultUrl(null);
    try {
      const [{ PDFDocument }, { default: JSZip }] = await Promise.all([import("pdf-lib"), import("jszip")]);
      const groups = parseRanges(ranges, pageCount);
      const src = await PDFDocument.load(await file.arrayBuffer(), { ignoreEncryption: true });
      const outs: { name: string; bytes: Uint8Array }[] = [];
      for (const [a, b] of groups) {
        const doc = await PDFDocument.create();
        const idx = Array.from({ length: b - a + 1 }, (_, i) => a - 1 + i);
        const pages = await doc.copyPages(src, idx);
        for (const p of pages) doc.addPage(p);
        outs.push({ name: a === b ? `page-${a}.pdf` : `pages-${a}-${b}.pdf`, bytes: await doc.save() });
      }
      if (outs.length === 1) {
        const blob = new Blob([outs[0].bytes as BlobPart], { type: "application/pdf" });
        setResultUrl(URL.createObjectURL(blob));
        setResultName(outs[0].name);
      } else {
        const zip = new JSZip();
        outs.forEach((o) => zip.file(o.name, o.bytes));
        const zipBlob = await zip.generateAsync({ type: "blob" });
        setResultUrl(URL.createObjectURL(zipBlob));
        setResultName("split.zip");
      }
    } catch (e) { setError((e as Error).message); }
    finally { setBusy(false); }
  }

  return (
    <div className="space-y-4">
      {!file ? (
        <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-blue-300 bg-blue-50/40 px-6 py-12 text-center transition-colors hover:brightness-95">
          <Upload className="h-7 w-7 text-blue-600" />
          <span className="mt-2 font-medium text-ink-900">Upload a PDF</span>
          <input type="file" accept="application/pdf,.pdf" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) loadFile(f); }} />
        </label>
      ) : (
        <div className="flex items-center justify-between rounded-lg border border-ink-100 bg-white px-4 py-2.5">
          <div className="min-w-0 truncate text-sm">
            <span className="font-medium text-ink-900">{file.name}</span>
            <span className="ml-2 text-ink-400">{pageCount} page{pageCount > 1 ? "s" : ""} · {formatBytes(file.size)}</span>
          </div>
          <button onClick={() => { setFile(null); setResultUrl(null); }} className="rounded p-1 text-xs text-ink-400 hover:bg-ink-50 hover:text-ink-700"><X className="h-3.5 w-3.5" /></button>
        </div>
      )}

      {file && (
        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink-700">Page ranges</label>
          <input
            value={ranges}
            onChange={(e) => setRanges(e.target.value)}
            placeholder="e.g. 1-3, 5, 7-8"
            className="w-full rounded-lg border border-ink-200 bg-white p-3 font-mono text-sm text-ink-900 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100"
          />
          <p className="mt-1 text-xs text-ink-400">Comma-separated ranges (1-based). Multiple ranges produce a ZIP.</p>
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        <Button onClick={split} disabled={!file || busy} size="lg">
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          {busy ? "Splitting…" : "Split PDF"}
        </Button>
        {resultUrl && (
          <a href={resultUrl} download={resultName}>
            <Button variant="outline" size="lg"><Download className="h-4 w-4" /> Download</Button>
          </a>
        )}
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}
      <p className="text-xs text-ink-400">Processed 100% in your browser — your PDF is never uploaded.</p>
    </div>
  );
}
