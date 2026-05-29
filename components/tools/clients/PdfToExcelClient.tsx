"use client";

import { useState } from "react";
import { Upload, X, Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatBytes } from "@/lib/utils";

type Item = { str: string; x: number; y: number; w: number };
type PdfJs = {
  GlobalWorkerOptions: { workerSrc: string };
  getDocument: (src: { data: Uint8Array }) => { promise: Promise<{
    numPages: number;
    getPage: (n: number) => Promise<{
      getTextContent: () => Promise<{ items: { str: string; transform: number[]; width: number }[] }>;
    }>;
  }> };
};

async function loadPdfjs(): Promise<PdfJs> {
  const url = "https://esm.sh/pdfjs-dist@4.7.76/build/pdf.min.mjs";
  const lib = (await import(/* webpackIgnore: true */ url)) as unknown as PdfJs;
  lib.GlobalWorkerOptions.workerSrc = "https://esm.sh/pdfjs-dist@4.7.76/build/pdf.worker.min.mjs";
  return lib;
}

/** Group text items into rows by their y position, then split each row into
 *  columns using the union of column starts seen across the page. Heuristic,
 *  but handles most simple/tabular PDFs well. */
function itemsToRows(items: Item[]): string[][] {
  if (!items.length) return [];
  const yTol = 4;
  // Sort top-to-bottom, then left-to-right.
  items.sort((a, b) => (Math.abs(a.y - b.y) > yTol ? b.y - a.y : a.x - b.x));
  const rows: Item[][] = [];
  for (const it of items) {
    const last = rows[rows.length - 1];
    if (last && Math.abs(last[0].y - it.y) <= yTol) last.push(it);
    else rows.push([it]);
  }
  // Collect candidate column x-starts across the page (rounded), keep frequent ones.
  const xCounts = new Map<number, number>();
  for (const row of rows) for (const it of row) {
    const key = Math.round(it.x / 8) * 8;
    xCounts.set(key, (xCounts.get(key) ?? 0) + 1);
  }
  const cols = [...xCounts.entries()].filter(([, c]) => c >= 2).map(([x]) => x).sort((a, b) => a - b);
  const colFor = (x: number) => {
    let idx = 0;
    for (let i = 0; i < cols.length; i++) if (x >= cols[i] - 6) idx = i;
    return idx;
  };
  return rows.map((row) => {
    const cells: string[] = new Array(Math.max(1, cols.length)).fill("");
    for (const it of row) {
      const c = cols.length ? colFor(it.x) : 0;
      cells[c] = (cells[c] ? cells[c] + " " : "") + it.str;
    }
    return cells.map((s) => s.trim());
  }).filter((r) => r.some((c) => c.length));
}

export function PdfToExcelClient() {
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [outUrl, setOutUrl] = useState<string | null>(null);
  const [outName, setOutName] = useState("tables.xlsx");

  async function convert(f: File) {
    setBusy(true); setError(null); setOutUrl(null); setProgress(2);
    try {
      const [pdfjs, XLSX] = await Promise.all([loadPdfjs(), import("xlsx")]);
      const doc = await pdfjs.getDocument({ data: new Uint8Array(await f.arrayBuffer()) }).promise;
      const wb = XLSX.utils.book_new();
      for (let p = 1; p <= doc.numPages; p++) {
        const page = await doc.getPage(p);
        const content = await page.getTextContent();
        const items: Item[] = content.items
          .filter((it) => it.str.trim().length)
          .map((it) => ({ str: it.str, x: it.transform[4], y: it.transform[5], w: it.width }));
        const rows = itemsToRows(items);
        const ws = XLSX.utils.aoa_to_sheet(rows.length ? rows : [["(no text on this page)"]]);
        XLSX.utils.book_append_sheet(wb, ws, `Page ${p}`.slice(0, 31));
        setProgress(Math.max(2, Math.min(99, Math.round((p / doc.numPages) * 100))));
      }
      const out = XLSX.write(wb, { type: "array", bookType: "xlsx" }) as ArrayBuffer;
      const blob = new Blob([out], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
      setOutUrl(URL.createObjectURL(blob));
      setOutName(f.name.replace(/\.pdf$/i, "") + ".xlsx");
      setProgress(100);
    } catch (e) {
      setError(`Could not convert: ${(e as Error).message}`);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-4">
      {!file ? (
        <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-blue-300 bg-blue-50/40 px-6 py-12 text-center transition-colors hover:brightness-95">
          <Upload className="h-7 w-7 text-blue-600" />
          <span className="mt-2 font-medium text-ink-900">Upload a PDF</span>
          <span className="mt-0.5 text-xs text-ink-400">Tables are extracted to an .xlsx (one sheet per page), in your browser</span>
          <input type="file" accept="application/pdf,.pdf" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) { setFile(f); convert(f); } }} />
        </label>
      ) : (
        <div className="flex items-center justify-between rounded-lg border border-ink-100 bg-white px-4 py-2.5 text-sm">
          <div className="min-w-0 truncate"><span className="font-medium text-ink-900">{file.name}</span><span className="ml-2 text-ink-400">{formatBytes(file.size)}</span></div>
          <button onClick={() => { setFile(null); setOutUrl(null); setError(null); }} className="rounded p-1 text-ink-400 hover:bg-ink-50 hover:text-ink-700"><X className="h-3.5 w-3.5" /></button>
        </div>
      )}

      {busy && (
        <div className="flex items-center gap-3 rounded-lg border border-ink-100 bg-white px-4 py-3">
          <Loader2 className="h-4 w-4 animate-spin text-brand-500" />
          <div className="flex-1">
            <p className="text-sm font-medium text-ink-900">Extracting tables…</p>
            <p className="text-xs text-ink-400">{progress}% — first run downloads the PDF reader (~2 MB) from CDN</p>
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        {file && !busy && !outUrl && <Button onClick={() => convert(file)} size="lg">Convert to Excel</Button>}
        {outUrl && <a href={outUrl} download={outName}><Button size="lg" variant="outline"><Download className="h-4 w-4" /> Download .xlsx</Button></a>}
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}
      <p className="text-xs text-ink-400">
        Converted 100% in your browser — your PDF is never uploaded. Tables are reconstructed from the text layer
        using column detection; complex or scanned layouts may need manual cleanup. For scanned PDFs (no text layer), OCR first.
      </p>
    </div>
  );
}
