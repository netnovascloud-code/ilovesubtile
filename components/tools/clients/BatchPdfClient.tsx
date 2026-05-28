"use client";

import { useRef, useState } from "react";
import { Upload, X, Download, Loader2, Check, AlertCircle, Files } from "lucide-react";
import JSZip from "jszip";
import { PDFDocument } from "pdf-lib";
import { Button } from "@/components/ui/button";
import { cn, formatBytes } from "@/lib/utils";

type Job = { id: string; file: File; status: "queued" | "running" | "done" | "error"; blob?: Blob; outName?: string; error?: string };

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

const MAX_FILES = 50;

async function compressOne(file: File, scale: number, quality: number, pdfjs: PdfJs): Promise<Blob> {
  const src = await pdfjs.getDocument({ data: new Uint8Array(await file.arrayBuffer()) }).promise;
  const out = await PDFDocument.create();
  for (let i = 1; i <= src.numPages; i++) {
    const page = await src.getPage(i);
    const viewport = page.getViewport({ scale });
    const canvas = document.createElement("canvas");
    canvas.width = Math.floor(viewport.width);
    canvas.height = Math.floor(viewport.height);
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    await page.render({ canvasContext: ctx, viewport }).promise;
    const jpgBlob: Blob = await new Promise((res, rej) => canvas.toBlob((b) => (b ? res(b) : rej(new Error("encode"))), "image/jpeg", quality));
    const jpgBytes = new Uint8Array(await jpgBlob.arrayBuffer());
    const img = await out.embedJpg(jpgBytes);
    const p = out.addPage([canvas.width, canvas.height]);
    p.drawImage(img, { x: 0, y: 0, width: canvas.width, height: canvas.height });
  }
  return new Blob([await out.save() as BlobPart], { type: "application/pdf" });
}

export function BatchPdfClient() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [preset, setPreset] = useState<string>("med");
  const [busy, setBusy] = useState(false);
  const [zipUrl, setZipUrl] = useState<string | null>(null);
  const [zipSize, setZipSize] = useState(0);
  const cleanup = useRef<string | null>(null);

  function add(list: FileList | null) {
    if (!list) return;
    const next: Job[] = [];
    for (const f of Array.from(list)) {
      if (f.type !== "application/pdf" && !f.name.toLowerCase().endsWith(".pdf")) continue;
      next.push({ id: crypto.randomUUID(), file: f, status: "queued" });
      if (jobs.length + next.length >= MAX_FILES) break;
    }
    setJobs((s) => [...s, ...next].slice(0, MAX_FILES));
    setZipUrl(null);
  }
  function remove(id: string) { setJobs((s) => s.filter((j) => j.id !== id)); setZipUrl(null); }
  function clear() { setJobs([]); setZipUrl(null); if (cleanup.current) { URL.revokeObjectURL(cleanup.current); cleanup.current = null; } }

  async function runAll() {
    if (jobs.length === 0 || busy) return;
    setBusy(true); setZipUrl(null);
    const cfg = PRESETS.find((p) => p.id === preset)!;
    const pdfjs = await loadPdfjs();
    const queue = jobs.map((j) => ({ ...j, status: "queued" as const, blob: undefined, error: undefined }));
    setJobs(queue);
    // pdfjs uses workers; run serially to keep memory under control.
    for (const j of queue) {
      setJobs((s) => s.map((x) => x.id === j.id ? { ...x, status: "running" } : x));
      try {
        const outName = `${j.file.name.replace(/\.pdf$/i, "")}-compressed.pdf`;
        const blob = await compressOne(j.file, cfg.scale, cfg.quality, pdfjs);
        setJobs((s) => s.map((x) => x.id === j.id ? { ...x, status: "done", blob, outName } : x));
      } catch (e) {
        setJobs((s) => s.map((x) => x.id === j.id ? { ...x, status: "error", error: (e as Error).message } : x));
      }
    }
    setBusy(false);

    const finished = await new Promise<Job[]>((res) => setJobs((s) => { res(s); return s; }));
    const ok = finished.filter((j) => j.blob && j.outName);
    if (ok.length > 0) {
      const zip = new JSZip();
      ok.forEach((j) => zip.file(j.outName!, j.blob!));
      const zipBlob = await zip.generateAsync({ type: "blob" });
      if (cleanup.current) URL.revokeObjectURL(cleanup.current);
      const url = URL.createObjectURL(zipBlob);
      cleanup.current = url;
      setZipUrl(url); setZipSize(zipBlob.size);
    }
  }

  const done = jobs.filter((j) => j.status === "done").length;
  const total = jobs.length;
  const errors = jobs.filter((j) => j.status === "error").length;

  return (
    <div className="space-y-5">
      {jobs.length === 0 ? (
        <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-rose-300 bg-rose-50/40 px-6 py-16 text-center transition-colors hover:brightness-95">
          <span className="grid h-12 w-12 place-items-center rounded-xl bg-rose-50 text-rose-600"><Files className="h-6 w-6" /></span>
          <span className="mt-3 font-semibold text-ink-900">Drop up to {MAX_FILES} PDFs</span>
          <span className="mt-0.5 text-xs text-ink-400">Each is re-rendered to JPEG pages — biggest wins on image-heavy or scanned PDFs.</span>
          <input type="file" multiple accept="application/pdf,.pdf" className="hidden" onChange={(e) => add(e.target.files)} />
        </label>
      ) : (
        <div className="rounded-lg border border-ink-100 bg-white p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="text-sm font-medium text-ink-900">{jobs.length} PDF{jobs.length > 1 ? "s" : ""} queued</span>
            <div className="flex gap-2">
              <label className="inline-flex cursor-pointer items-center gap-1 rounded border border-ink-200 bg-white px-3 py-1.5 text-sm text-ink-700 hover:bg-ink-50">
                <Upload className="h-3.5 w-3.5" /> Add more
                <input type="file" multiple accept="application/pdf,.pdf" className="hidden" onChange={(e) => add(e.target.files)} />
              </label>
              <Button size="sm" variant="outline" onClick={clear}><X className="h-3.5 w-3.5" /> Clear</Button>
            </div>
          </div>
          <ul className="mt-3 max-h-72 space-y-1 overflow-y-auto text-sm">
            {jobs.map((j) => (
              <li key={j.id} className="flex items-center gap-2 rounded border border-ink-100 px-2 py-1.5">
                <span className="flex-1 truncate text-ink-800">{j.file.name}</span>
                <span className="text-xs text-ink-400">{formatBytes(j.file.size)}</span>
                {j.status === "running" && <Loader2 className="h-3.5 w-3.5 animate-spin text-brand-500" />}
                {j.status === "done" && <Check className="h-3.5 w-3.5 text-emerald-600" />}
                {j.status === "error" && <AlertCircle className="h-3.5 w-3.5 text-red-500" />}
                {j.status === "queued" && !busy && (
                  <button onClick={() => remove(j.id)} className="rounded p-1 text-ink-400 hover:text-red-600"><X className="h-3.5 w-3.5" /></button>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="rounded-lg border border-ink-100 bg-white p-4">
        <label className="mb-1 block text-xs font-medium text-ink-500">Compression preset</label>
        <div className="inline-flex rounded-lg border border-ink-200 bg-white p-1">
          {PRESETS.map((p) => (
            <button key={p.id} onClick={() => setPreset(p.id)} className={cn("rounded-md px-3 py-1.5 text-sm font-medium transition-colors", preset === p.id ? "bg-brand-500 text-white" : "text-ink-600 hover:text-ink-900")}>{p.label}</button>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Button onClick={runAll} disabled={jobs.length === 0 || busy} size="lg">
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          {busy ? `Compressing ${done}/${total}…` : `Compress ${jobs.length || ""} PDFs`}
        </Button>
        {zipUrl && (
          <a href={zipUrl} download="wyrlo-pdfs.zip">
            <Button size="lg" variant="outline"><Download className="h-4 w-4" /> Download ZIP · {formatBytes(zipSize)}</Button>
          </a>
        )}
        {!busy && total > 0 && done > 0 && (
          <span className="text-sm text-ink-500">{done} done{errors > 0 ? ` · ${errors} failed` : ""}</span>
        )}
      </div>

      <p className="text-xs text-ink-400">Processed 100% in your browser — your PDFs are never uploaded. The output is image-based (no selectable text).</p>
    </div>
  );
}
