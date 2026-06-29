"use client";

import { useState } from "react";
import { Upload, X, Download, Loader2, Shrink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn, formatBytes } from "@/lib/utils";
import { useLocale } from "@/hooks/useLocale";

// 100% in-browser PDF compression: render each page with pdf.js, re-encode it as
// a JPEG at the chosen quality/scale, and rebuild a new PDF with pdf-lib. Best on
// scanned / image-heavy PDFs (text becomes an image in the output). Nothing is
// ever uploaded.

const T: Record<string, Record<string, string>> = {
  en: {
    uploadPdf: "Upload a PDF",
    uploadHint: "Compressed in your browser — your PDF is never uploaded",
    levelMax: "Maximum", levelBalanced: "Recommended", levelLight: "Light",
    compressing: "Compressing…",
    original: "Original", compressed: "Compressed", smaller: "smaller",
    alreadyOptimized: "This PDF is already well optimized — the result isn't smaller.",
    download: "Download compressed PDF",
    couldNotCompress: "Could not compress: ",
    note: "Scanned / image-heavy PDFs shrink the most. Text becomes an image in the output.",
    privacy: "100% in your browser via pdfjs — your PDF is never uploaded.",
  },
  fr: {
    uploadPdf: "Télécharger un PDF",
    uploadHint: "Compressé dans votre navigateur — votre PDF n'est jamais envoyé",
    levelMax: "Maximum", levelBalanced: "Recommandé", levelLight: "Légère",
    compressing: "Compression…",
    original: "Original", compressed: "Compressé", smaller: "plus léger",
    alreadyOptimized: "Ce PDF est déjà bien optimisé — le résultat n'est pas plus léger.",
    download: "Télécharger le PDF compressé",
    couldNotCompress: "Impossible de compresser : ",
    note: "Les PDF scannés / à base d'images se compressent le mieux. Le texte devient une image dans le résultat.",
    privacy: "100 % dans votre navigateur via pdfjs — votre PDF n'est jamais envoyé.",
  },
};

type Level = { id: string; label: string; scale: number; quality: number };

type PdfJs = {
  GlobalWorkerOptions: { workerSrc: string };
  getDocument: (src: { data: Uint8Array }) => { promise: Promise<{ numPages: number; getPage: (n: number) => Promise<{ getViewport: (o: { scale: number }) => { width: number; height: number }; render: (o: { canvasContext: CanvasRenderingContext2D; viewport: { width: number; height: number } }) => { promise: Promise<void> } }> }> };
};

async function loadPdfjs(): Promise<PdfJs> {
  const url = "https://esm.sh/pdfjs-dist@4.7.76/build/pdf.min.mjs";
  const lib = (await import(/* webpackIgnore: true */ url)) as unknown as PdfJs;
  lib.GlobalWorkerOptions.workerSrc = "https://esm.sh/pdfjs-dist@4.7.76/build/pdf.worker.min.mjs";
  return lib;
}

export function CompressPdfClient() {
  const s = T[useLocale()] ?? T.en;

  const LEVELS: Level[] = [
    { id: "max", label: s.levelMax, scale: 1.0, quality: 0.5 },
    { id: "balanced", label: s.levelBalanced, scale: 1.5, quality: 0.72 },
    { id: "light", label: s.levelLight, scale: 2.0, quality: 0.85 },
  ];

  const [file, setFile] = useState<File | null>(null);
  const [level, setLevel] = useState("balanced");
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<{ url: string; size: number; original: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function run(f: File, levelId: string) {
    const lv = LEVELS.find((l) => l.id === levelId) ?? LEVELS[1];
    setBusy(true); setError(null); setProgress(2);
    setResult((prev) => { if (prev) URL.revokeObjectURL(prev.url); return null; });
    try {
      const pdfjs = await loadPdfjs();
      const { PDFDocument } = await import("pdf-lib");
      const buf = new Uint8Array(await f.arrayBuffer());
      const doc = await pdfjs.getDocument({ data: buf }).promise;
      const total = doc.numPages;
      const out = await PDFDocument.create();

      for (let i = 1; i <= total; i++) {
        const page = await doc.getPage(i);
        const base = page.getViewport({ scale: 1 }); // page size in PDF points
        const vp = page.getViewport({ scale: lv.scale }); // render resolution
        const canvas = document.createElement("canvas");
        canvas.width = Math.max(1, Math.floor(vp.width));
        canvas.height = Math.max(1, Math.floor(vp.height));
        const ctx = canvas.getContext("2d");
        if (!ctx) throw new Error("Canvas not available.");
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        await page.render({ canvasContext: ctx, viewport: vp }).promise;
        const blob: Blob = await new Promise((res, rej) => canvas.toBlob((b) => (b ? res(b) : rej(new Error("Encode failed"))), "image/jpeg", lv.quality));
        const jpg = await out.embedJpg(new Uint8Array(await blob.arrayBuffer()));
        const p = out.addPage([base.width, base.height]);
        p.drawImage(jpg, { x: 0, y: 0, width: base.width, height: base.height });
        setProgress(Math.max(2, Math.min(99, Math.round((i / total) * 100))));
      }

      const bytes = await out.save();
      const blob = new Blob([bytes as BlobPart], { type: "application/pdf" });
      setResult({ url: URL.createObjectURL(blob), size: blob.size, original: f.size });
      setProgress(100);
    } catch (e) {
      setError(`${s.couldNotCompress}${(e as Error).message}`);
    } finally {
      setBusy(false);
    }
  }

  const pct = result ? Math.round((1 - result.size / result.original) * 100) : 0;

  return (
    <div className="space-y-4">
      {!file ? (
        <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-blue-300 bg-blue-50/40 px-6 py-12 text-center transition-colors hover:brightness-95">
          <Upload className="h-7 w-7 text-blue-600" />
          <span className="mt-2 font-medium text-ink-900">{s.uploadPdf}</span>
          <span className="mt-0.5 text-xs text-ink-400">{s.uploadHint}</span>
          <input type="file" accept="application/pdf,.pdf" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) { setFile(f); run(f, level); } }} />
        </label>
      ) : (
        <div className="flex items-center justify-between rounded-lg border border-ink-100 bg-white px-4 py-2.5">
          <div className="min-w-0 truncate text-sm">
            <span className="font-medium text-ink-900">{file.name}</span>
            <span className="ml-2 text-ink-400">{formatBytes(file.size)}</span>
          </div>
          <button onClick={() => { setFile(null); setResult((p) => { if (p) URL.revokeObjectURL(p.url); return null; }); setError(null); }} aria-label="Remove" className="rounded p-1 text-xs text-ink-400 hover:bg-ink-50 hover:text-ink-700"><X className="h-3.5 w-3.5" /></button>
        </div>
      )}

      {file && (
        <div className="inline-flex rounded-lg border border-ink-200 bg-white p-1">
          {LEVELS.map((lv) => (
            <button key={lv.id} onClick={() => { setLevel(lv.id); if (file) run(file, lv.id); }} disabled={busy}
              className={cn("rounded-md px-3 py-1.5 text-sm font-medium transition-colors disabled:opacity-50", level === lv.id ? "bg-brand-500 text-white" : "text-ink-600 hover:text-ink-900")}>
              {lv.label}
            </button>
          ))}
        </div>
      )}

      {busy && (
        <div className="flex items-center gap-3 rounded-lg border border-ink-100 bg-white px-4 py-3">
          <Loader2 className="h-4 w-4 animate-spin text-brand-500" />
          <div className="flex-1">
            <p className="text-sm font-medium text-ink-900">{s.compressing}</p>
            <p className="text-xs text-ink-400">{progress}%</p>
          </div>
        </div>
      )}

      {result && !busy && (
        <div className="rounded-lg border border-ink-100 bg-white p-4">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
            <span className="text-ink-500">{s.original}: <span className="font-medium text-ink-700">{formatBytes(result.original)}</span></span>
            <Shrink className="h-4 w-4 text-ink-300" />
            <span className="text-ink-500">{s.compressed}: <span className="font-semibold text-ink-900">{formatBytes(result.size)}</span></span>
            {pct > 0 ? (
              <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">−{pct}% {s.smaller}</span>
            ) : (
              <span className="text-xs text-ink-400">{s.alreadyOptimized}</span>
            )}
          </div>
          <div className="mt-3">
            <a href={result.url} download={`${file?.name.replace(/\.pdf$/i, "")}-compressed.pdf`}>
              <Button size="sm"><Download className="h-3.5 w-3.5" /> {s.download}</Button>
            </a>
          </div>
        </div>
      )}

      {error && <p className="text-sm text-red-600">{error}</p>}
      <p className="text-xs text-ink-400">{s.note}</p>
      <p className="text-xs text-ink-400">{s.privacy}</p>
    </div>
  );
}
