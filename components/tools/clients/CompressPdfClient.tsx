"use client";

import { useState } from "react";
import { Upload, X, Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn, formatBytes } from "@/lib/utils";
import { TemplatesBar } from "@/components/tools/TemplatesBar";

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

const PRESETS = [
  { id: "low", label: "Strong (smaller)", scale: 1.2, quality: 0.6 },
  { id: "med", label: "Balanced", scale: 1.5, quality: 0.75 },
  { id: "high", label: "High quality", scale: 2.0, quality: 0.88 },
] as const;

export function CompressPdfClient() {
  const [file, setFile] = useState<File | null>(null);
  const [preset, setPreset] = useState<string>("med");
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [resultSize, setResultSize] = useState(0);

  async function compress() {
    if (!file || busy) return;
    setBusy(true); setError(null); setResultUrl(null); setProgress(2);
    try {
      const cfg = PRESETS.find((p) => p.id === preset)!;
      const pdfjs = await loadPdfjs();
      const { PDFDocument } = await import("pdf-lib");
      const src = await pdfjs.getDocument({ data: new Uint8Array(await file.arrayBuffer()) }).promise;
      const out = await PDFDocument.create();
      for (let i = 1; i <= src.numPages; i++) {
        const page = await src.getPage(i);
        const viewport = page.getViewport({ scale: cfg.scale });
        const canvas = document.createElement("canvas");
        canvas.width = Math.floor(viewport.width);
        canvas.height = Math.floor(viewport.height);
        const ctx = canvas.getContext("2d");
        if (!ctx) throw new Error("Canvas unavailable.");
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        await page.render({ canvasContext: ctx, viewport }).promise;
        const jpgBlob: Blob = await new Promise((res, rej) => canvas.toBlob((b) => (b ? res(b) : rej(new Error("Encode"))), "image/jpeg", cfg.quality));
        const jpgBytes = new Uint8Array(await jpgBlob.arrayBuffer());
        const img = await out.embedJpg(jpgBytes);
        const p = out.addPage([canvas.width, canvas.height]);
        p.drawImage(img, { x: 0, y: 0, width: canvas.width, height: canvas.height });
        setProgress(Math.max(2, Math.min(99, Math.round((i / src.numPages) * 100))));
      }
      const data = await out.save();
      const blob = new Blob([data as BlobPart], { type: "application/pdf" });
      setResultUrl(URL.createObjectURL(blob));
      setResultSize(blob.size);
      setProgress(100);
    } catch (e) { setError(`Could not compress: ${(e as Error).message}`); }
    finally { setBusy(false); }
  }

  const ratio = file && resultSize ? Math.round((1 - resultSize / file.size) * 100) : 0;

  return (
    <div className="space-y-4">
      {!file ? (
        <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-blue-300 bg-blue-50/40 px-6 py-12 text-center transition-colors hover:brightness-95">
          <Upload className="h-7 w-7 text-blue-600" />
          <span className="mt-2 font-medium text-ink-900">Upload a PDF</span>
          <span className="mt-0.5 text-xs text-ink-400">Re-rendered to JPEG pages — biggest wins on image-heavy or scanned PDFs</span>
          <input type="file" accept="application/pdf,.pdf" className="hidden" onChange={(e) => { setFile(e.target.files?.[0] ?? null); setResultUrl(null); setError(null); }} />
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

      <TemplatesBar
        tool="compress-pdf"
        settings={{ preset }}
        onApply={(s) => { if (typeof s.preset === "string") setPreset(s.preset); }}
      />

      {file && (
        <div className="inline-flex rounded-lg border border-ink-200 bg-white p-1">
          {PRESETS.map((p) => (
            <button key={p.id} onClick={() => setPreset(p.id)} className={cn("rounded-md px-3 py-1.5 text-sm font-medium transition-colors", preset === p.id ? "bg-brand-500 text-white" : "text-ink-600 hover:text-ink-900")}>{p.label}</button>
          ))}
        </div>
      )}

      {busy && (
        <div className="flex items-center gap-3 rounded-lg border border-ink-100 bg-white px-4 py-3">
          <Loader2 className="h-4 w-4 animate-spin text-brand-500" />
          <div className="flex-1">
            <p className="text-sm font-medium text-ink-900">Compressing…</p>
            <p className="text-xs text-ink-400">{progress}% complete</p>
          </div>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-3">
        <Button onClick={compress} disabled={!file || busy} size="lg">
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          {busy ? "Compressing…" : "Compress PDF"}
        </Button>
        {resultUrl && (
          <>
            <a href={resultUrl} download={`${file?.name.replace(/\.pdf$/i, "")}-compressed.pdf`}>
              <Button size="lg" variant="outline"><Download className="h-4 w-4" /> Download · {formatBytes(resultSize)}</Button>
            </a>
            <span className={cn("text-sm font-medium", ratio > 0 ? "text-emerald-600" : "text-ink-500")}>
              {ratio > 0 ? `−${ratio}% smaller` : "Same size — try a stronger preset"}
            </span>
          </>
        )}
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}
      <p className="text-xs text-ink-400">Processed 100% in your browser. The output is an image-based PDF (no selectable text). Choose this for scans and image-heavy documents.</p>
    </div>
  );
}
