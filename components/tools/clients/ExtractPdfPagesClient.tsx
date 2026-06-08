"use client";

import { useCallback, useRef, useState } from "react";
import { Download, X, Loader2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatBytes } from "@/lib/utils";

// Extract a subset of pages from a PDF into a brand-new PDF. Accepts either
// individual page numbers (1, 3, 7) or ranges (4-9), mixed (1, 3-5, 9). Pure
// pdf-lib, no preview rendering — kept lean for huge PDFs where the OCR /
// organize tool's thumbnailing is overkill.
export function ExtractPdfPagesClient() {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [spec, setSpec] = useState("1-3");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [out, setOut] = useState<{ url: string; size: number } | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const onFile = useCallback(async (f: File) => {
    setError(null); setOut(null); setFile(f); setPageCount(0);
    try {
      const { PDFDocument } = await import("pdf-lib");
      const doc = await PDFDocument.load(await f.arrayBuffer(), { ignoreEncryption: true });
      setPageCount(doc.getPageCount());
      setSpec(`1-${Math.min(doc.getPageCount(), 3)}`);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not read this PDF.");
    }
  }, []);

  const parsedPages = parseSpec(spec, pageCount);
  const specError = pageCount > 0 && !parsedPages.length ? "No valid pages in your selection." : null;

  const extract = useCallback(async () => {
    if (!file || !parsedPages.length) return;
    setBusy(true); setError(null);
    try {
      const { PDFDocument } = await import("pdf-lib");
      const src = await PDFDocument.load(await file.arrayBuffer(), { ignoreEncryption: true });
      const dst = await PDFDocument.create();
      const copied = await dst.copyPages(src, parsedPages.map((p) => p - 1));
      for (const page of copied) dst.addPage(page);
      const bytes = await dst.save();
      const blob = new Blob([new Uint8Array(bytes)], { type: "application/pdf" });
      if (out) URL.revokeObjectURL(out.url);
      setOut({ url: URL.createObjectURL(blob), size: blob.size });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not extract pages.");
    } finally {
      setBusy(false);
    }
  }, [file, parsedPages, out]);

  const reset = () => {
    if (out) URL.revokeObjectURL(out.url);
    setFile(null); setOut(null); setError(null); setPageCount(0);
  };

  if (!file) {
    return (
      <label className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-ink-200 bg-ink-50/40 px-6 py-16 text-center transition hover:border-brand-400">
        <Upload className="h-8 w-8 text-ink-400" />
        <div className="text-base font-semibold text-ink-900">Drop your PDF</div>
        <div className="text-sm text-ink-500">Pull a subset of pages out into a new PDF.</div>
        <input ref={inputRef} type="file" accept="application/pdf,.pdf" className="sr-only" onChange={(e) => e.target.files?.[0] && onFile(e.target.files[0])} />
        <span className="mt-2 rounded-lg bg-brand-500 px-4 py-2 text-sm font-semibold text-white">Choose PDF</span>
      </label>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0 truncate text-sm text-ink-700">{file.name} <span className="text-ink-400">({pageCount} pages)</span></div>
        <Button variant="ghost" size="sm" onClick={reset}><X className="h-4 w-4" /></Button>
      </div>

      <label className="flex flex-col text-xs font-medium text-ink-600">
        Pages to keep
        <input value={spec} onChange={(e) => setSpec(e.target.value)} placeholder="e.g. 1, 3-5, 9"
          className="mt-1 rounded-md border border-ink-200 bg-white px-3 py-2 font-mono text-sm text-ink-900 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100" />
        <span className="mt-1 text-ink-400">{parsedPages.length} page{parsedPages.length === 1 ? "" : "s"} selected{parsedPages.length ? `: ${parsedPages.slice(0, 12).join(", ")}${parsedPages.length > 12 ? "…" : ""}` : ""}</span>
      </label>

      {(specError || error) && <p className="text-sm text-red-600">{specError ?? error}</p>}

      <div className="flex flex-wrap gap-2">
        <Button onClick={extract} disabled={busy || !parsedPages.length}>
          {busy ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Extracting…</> : `Extract ${parsedPages.length} page${parsedPages.length === 1 ? "" : "s"}`}
        </Button>
        {out && (
          <a href={out.url} download={`extracted-${file.name}`}
            className="inline-flex items-center gap-2 rounded-lg border border-brand-200 bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700 hover:bg-brand-100">
            <Download className="h-4 w-4" /> Download ({formatBytes(out.size)})
          </a>
        )}
      </div>
    </div>
  );
}

// Parse "1, 3-5, 9" → [1, 3, 4, 5, 9], clamped to [1, total] and deduped.
function parseSpec(spec: string, total: number): number[] {
  if (!total) return [];
  const out = new Set<number>();
  for (const raw of spec.split(",")) {
    const part = raw.trim();
    if (!part) continue;
    const range = part.match(/^(\d+)\s*-\s*(\d+)$/);
    if (range) {
      let a = Number(range[1]), b = Number(range[2]);
      if (a > b) [a, b] = [b, a];
      for (let i = Math.max(1, a); i <= Math.min(total, b); i++) out.add(i);
    } else if (/^\d+$/.test(part)) {
      const n = Number(part);
      if (n >= 1 && n <= total) out.add(n);
    }
  }
  return [...out].sort((a, b) => a - b);
}
