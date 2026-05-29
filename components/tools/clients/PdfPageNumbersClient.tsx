"use client";

import { useEffect, useRef, useState } from "react";
import { Upload, X, Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatBytes } from "@/lib/utils";

type Pos = "bottom-center" | "bottom-right" | "bottom-left" | "top-center" | "top-right";
type Fmt = "n" | "n-of-total" | "page-n";

export function PdfPageNumbersClient() {
  const [file, setFile] = useState<File | null>(null);
  const [pos, setPos] = useState<Pos>("bottom-center");
  const [fmt, setFmt] = useState<Fmt>("n-of-total");
  const [size, setSize] = useState(11);
  const [start, setStart] = useState(1);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [outUrl, setOutUrl] = useState<string | null>(null);
  const [outName, setOutName] = useState("numbered.pdf");
  const cleanup = useRef<string | null>(null);

  useEffect(() => () => { if (cleanup.current) URL.revokeObjectURL(cleanup.current); }, []);

  function label(i: number, total: number) {
    const n = i + start;
    if (fmt === "n") return String(n);
    if (fmt === "page-n") return `Page ${n}`;
    return `${n} / ${total + start - 1}`;
  }

  async function run() {
    if (!file || busy) return;
    setBusy(true); setError(null); setOutUrl(null);
    try {
      const { PDFDocument, StandardFonts, rgb } = await import("pdf-lib");
      const doc = await PDFDocument.load(await file.arrayBuffer());
      const font = await doc.embedFont(StandardFonts.Helvetica);
      const pages = doc.getPages();
      const total = pages.length;
      const margin = 28;
      pages.forEach((page, i) => {
        const { width, height } = page.getSize();
        const txt = label(i, total);
        const tw = font.widthOfTextAtSize(txt, size);
        let x = width / 2 - tw / 2;
        let y = margin;
        if (pos.endsWith("right")) x = width - margin - tw;
        else if (pos.endsWith("left")) x = margin;
        if (pos.startsWith("top")) y = height - margin - size;
        page.drawText(txt, { x, y, size, font, color: rgb(0.3, 0.3, 0.3) });
      });
      const bytes = await doc.save();
      const blob = new Blob([bytes as BlobPart], { type: "application/pdf" });
      if (cleanup.current) URL.revokeObjectURL(cleanup.current);
      const url = URL.createObjectURL(blob);
      cleanup.current = url;
      setOutUrl(url);
      setOutName(file.name.replace(/\.pdf$/i, "") + "-numbered.pdf");
    } catch (e) {
      setError(`Could not add page numbers: ${(e as Error).message}`);
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
          <span className="mt-0.5 text-xs text-ink-400">Page numbers are added to every page, in your browser</span>
          <input type="file" accept="application/pdf,.pdf" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) { setFile(f); setOutUrl(null); } }} />
        </label>
      ) : (
        <div className="flex items-center justify-between rounded-lg border border-ink-100 bg-white px-4 py-2.5 text-sm">
          <div className="min-w-0 truncate"><span className="font-medium text-ink-900">{file.name}</span><span className="ml-2 text-ink-400">{formatBytes(file.size)}</span></div>
          <button onClick={() => { setFile(null); setOutUrl(null); }} className="rounded p-1 text-ink-400 hover:bg-ink-50 hover:text-ink-700"><X className="h-3.5 w-3.5" /></button>
        </div>
      )}

      {file && (
        <div className="grid gap-3 rounded-lg border border-ink-100 bg-white p-4 sm:grid-cols-2">
          <label className="flex flex-col text-xs font-medium text-ink-600">
            Position
            <select value={pos} onChange={(e) => setPos(e.target.value as Pos)} className="mt-1 rounded-md border border-ink-200 px-2 py-1.5 text-sm">
              <option value="bottom-center">Bottom centre</option>
              <option value="bottom-right">Bottom right</option>
              <option value="bottom-left">Bottom left</option>
              <option value="top-center">Top centre</option>
              <option value="top-right">Top right</option>
            </select>
          </label>
          <label className="flex flex-col text-xs font-medium text-ink-600">
            Format
            <select value={fmt} onChange={(e) => setFmt(e.target.value as Fmt)} className="mt-1 rounded-md border border-ink-200 px-2 py-1.5 text-sm">
              <option value="n-of-total">1 / 10</option>
              <option value="n">1</option>
              <option value="page-n">Page 1</option>
            </select>
          </label>
          <label className="flex flex-col text-xs font-medium text-ink-600">
            Start at
            <input type="number" min={0} value={start} onChange={(e) => setStart(Math.max(0, Number(e.target.value) || 1))} className="mt-1 w-24 rounded-md border border-ink-200 px-2 py-1.5 text-sm" />
          </label>
          <label className="flex flex-col text-xs font-medium text-ink-600">
            Font size: {size}pt
            <input type="range" min={8} max={24} value={size} onChange={(e) => setSize(Number(e.target.value))} className="mt-1" />
          </label>
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        {file && <Button size="lg" onClick={run} disabled={busy}>{busy ? <Loader2 className="h-4 w-4 animate-spin" /> : null}{busy ? "Numbering…" : "Add page numbers"}</Button>}
        {outUrl && <a href={outUrl} download={outName}><Button size="lg" variant="outline"><Download className="h-4 w-4" /> Download PDF</Button></a>}
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}
      <p className="text-xs text-ink-400">100% in your browser via pdf-lib — your PDF is never uploaded.</p>
    </div>
  );
}
