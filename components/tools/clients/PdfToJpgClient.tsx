"use client";

import { useState } from "react";
import { Upload, X, Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn, formatBytes } from "@/lib/utils";

type Page = { num: number; url: string; size: number };

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

const SCALES = [
  { id: "1.5", label: "Standard (1.5×)" },
  { id: "2", label: "High (2×)" },
  { id: "3", label: "Crisp (3×)" },
];

export function PdfToJpgClient() {
  const [file, setFile] = useState<File | null>(null);
  const [scale, setScale] = useState<string>("2");
  const [pages, setPages] = useState<Page[]>([]);
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  async function run(f: File) {
    setBusy(true); setError(null); setProgress(2);
    pages.forEach((p) => URL.revokeObjectURL(p.url));
    setPages([]);
    try {
      const pdfjs = await loadPdfjs();
      const buf = new Uint8Array(await f.arrayBuffer());
      const doc = await pdfjs.getDocument({ data: buf }).promise;
      const total = doc.numPages;
      const out: Page[] = [];
      const s = parseFloat(scale);
      for (let i = 1; i <= total; i++) {
        const page = await doc.getPage(i);
        const viewport = page.getViewport({ scale: s });
        const canvas = document.createElement("canvas");
        canvas.width = Math.floor(viewport.width);
        canvas.height = Math.floor(viewport.height);
        const ctx = canvas.getContext("2d");
        if (!ctx) throw new Error("Canvas not available.");
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        await page.render({ canvasContext: ctx, viewport }).promise;
        const blob: Blob = await new Promise((r, j) => canvas.toBlob((b) => (b ? r(b) : j(new Error("Encode failed"))), "image/jpeg", 0.92));
        out.push({ num: i, url: URL.createObjectURL(blob), size: blob.size });
        setProgress(Math.max(2, Math.min(99, Math.round((i / total) * 100))));
      }
      setPages(out);
      setProgress(100);
    } catch (e) { setError(`Could not render: ${(e as Error).message}`); }
    finally { setBusy(false); }
  }

  async function downloadAll() {
    if (pages.length === 0) return;
    const { default: JSZip } = await import("jszip");
    const zip = new JSZip();
    for (const p of pages) {
      const blob = await (await fetch(p.url)).blob();
      zip.file(`page-${String(p.num).padStart(3, "0")}.jpg`, blob);
    }
    const zipBlob = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(zipBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${file?.name.replace(/\.pdf$/i, "")}-jpg.zip`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  return (
    <div className="space-y-4">
      {!file ? (
        <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-blue-300 bg-blue-50/40 px-6 py-12 text-center transition-colors hover:brightness-95">
          <Upload className="h-7 w-7 text-blue-600" />
          <span className="mt-2 font-medium text-ink-900">Upload a PDF</span>
          <span className="mt-0.5 text-xs text-ink-400">Every page becomes a JPG, rendered in your browser</span>
          <input type="file" accept="application/pdf,.pdf" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) { setFile(f); run(f); } }} />
        </label>
      ) : (
        <div className="flex items-center justify-between rounded-lg border border-ink-100 bg-white px-4 py-2.5">
          <div className="min-w-0 truncate text-sm">
            <span className="font-medium text-ink-900">{file.name}</span>
            <span className="ml-2 text-ink-400">{formatBytes(file.size)}</span>
          </div>
          <button onClick={() => { setFile(null); setPages([]); setError(null); }} className="rounded p-1 text-xs text-ink-400 hover:bg-ink-50 hover:text-ink-700"><X className="h-3.5 w-3.5" /></button>
        </div>
      )}

      {file && (
        <div className="inline-flex rounded-lg border border-ink-200 bg-white p-1">
          {SCALES.map((s) => (
            <button key={s.id} onClick={() => { setScale(s.id); if (file) run(file); }} className={cn("rounded-md px-3 py-1.5 text-sm font-medium transition-colors", scale === s.id ? "bg-brand-500 text-white" : "text-ink-600 hover:text-ink-900")}>{s.label}</button>
          ))}
        </div>
      )}

      {busy && (
        <div className="flex items-center gap-3 rounded-lg border border-ink-100 bg-white px-4 py-3">
          <Loader2 className="h-4 w-4 animate-spin text-brand-500" />
          <div className="flex-1">
            <p className="text-sm font-medium text-ink-900">Rendering pages…</p>
            <p className="text-xs text-ink-400">{progress}%</p>
          </div>
        </div>
      )}

      {pages.length > 0 && (
        <>
          <div className="flex items-center justify-between">
            <p className="text-sm text-ink-700">{pages.length} page{pages.length > 1 ? "s" : ""} rendered</p>
            <Button size="sm" onClick={downloadAll}><Download className="h-3.5 w-3.5" /> Download all (ZIP)</Button>
          </div>
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {pages.map((p) => (
              <li key={p.num} className="rounded-lg border border-ink-100 bg-white p-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.url} alt={`Page ${p.num}`} className="w-full rounded object-contain" />
                <div className="mt-1.5 flex items-center justify-between text-xs">
                  <span className="text-ink-500">Page {p.num} · {formatBytes(p.size)}</span>
                  <a href={p.url} download={`page-${String(p.num).padStart(3, "0")}.jpg`} className="text-brand-600 hover:underline">Save</a>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}

      {error && <p className="text-sm text-red-600">{error}</p>}
      <p className="text-xs text-ink-400">Rendered 100% in your browser via pdfjs — your PDF is never uploaded.</p>
    </div>
  );
}
