"use client";

import { useRef, useState } from "react";
import { Upload, X, Download, Loader2, Check, AlertCircle, Files } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn, formatBytes } from "@/lib/utils";

type Job = {
  id: string;
  file: File;
  status: "queued" | "running" | "done" | "error";
  blob?: Blob;
  outName?: string;
  error?: string;
};

const FORMATS = [
  { id: "image/webp", label: "WebP (recommended)", ext: "webp" },
  { id: "image/jpeg", label: "JPG", ext: "jpg" },
  { id: "image/png", label: "PNG", ext: "png" },
] as const;

const MAX_FILES = 50;

async function convertOne(file: File, mime: string, quality: number, maxSide: number | null): Promise<Blob> {
  const url = URL.createObjectURL(file);
  try {
    const img = await new Promise<HTMLImageElement>((res, rej) => {
      const i = new Image();
      i.onload = () => res(i);
      i.onerror = () => rej(new Error("Could not decode image"));
      i.src = url;
    });
    let w = img.naturalWidth, h = img.naturalHeight;
    if (maxSide && Math.max(w, h) > maxSide) {
      const k = maxSide / Math.max(w, h);
      w = Math.round(w * k); h = Math.round(h * k);
    }
    const canvas = document.createElement("canvas");
    canvas.width = w; canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas unavailable");
    if (mime === "image/jpeg") { ctx.fillStyle = "#FFFFFF"; ctx.fillRect(0, 0, w, h); }
    ctx.drawImage(img, 0, 0, w, h);
    return await new Promise<Blob>((res, rej) =>
      canvas.toBlob((b) => (b ? res(b) : rej(new Error("Encoding failed"))), mime, quality),
    );
  } finally { URL.revokeObjectURL(url); }
}

export function BatchImageClient() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [format, setFormat] = useState<string>("image/webp");
  const [quality, setQuality] = useState(80);
  const [maxSide, setMaxSide] = useState(0);
  const [busy, setBusy] = useState(false);
  const [zipUrl, setZipUrl] = useState<string | null>(null);
  const [zipSize, setZipSize] = useState(0);
  const cleanup = useRef<string | null>(null);

  function add(list: FileList | null) {
    if (!list) return;
    const next: Job[] = [];
    for (const f of Array.from(list)) {
      if (!f.type.startsWith("image/")) continue;
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
    const fmt = FORMATS.find((f) => f.id === format)!;
    const q = (fmt.id === "image/png" ? 1 : quality / 100);
    const limit = 4;
    const queue = jobs.map((j) => ({ ...j, status: "queued" as const, blob: undefined, error: undefined }));
    setJobs(queue);
    let i = 0;
    async function worker() {
      while (i < queue.length) {
        const idx = i++;
        const j = queue[idx];
        setJobs((s) => s.map((x) => x.id === j.id ? { ...x, status: "running" } : x));
        try {
          const outName = `${j.file.name.replace(/\.[^.]+$/, "")}.${fmt.ext}`;
          const blob = await convertOne(j.file, fmt.id, q, maxSide || null);
          setJobs((s) => s.map((x) => x.id === j.id ? { ...x, status: "done", blob, outName } : x));
        } catch (e) {
          setJobs((s) => s.map((x) => x.id === j.id ? { ...x, status: "error", error: (e as Error).message } : x));
        }
      }
    }
    await Promise.all(Array.from({ length: Math.min(limit, queue.length) }, worker));
    setBusy(false);

    // Snapshot of finished jobs (state updates are batched).
    const finished = (await new Promise<Job[]>((res) => setJobs((s) => { res(s); return s; })));
    const ok = finished.filter((j) => j.blob && j.outName);
    if (ok.length > 0) {
      const { default: JSZip } = await import("jszip");
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
        <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-emerald-300 bg-emerald-50/40 px-6 py-16 text-center transition-colors hover:brightness-95">
          <span className="grid h-12 w-12 place-items-center rounded-xl bg-emerald-50 text-emerald-600"><Files className="h-6 w-6" /></span>
          <span className="mt-3 font-semibold text-ink-900">Drop up to {MAX_FILES} images</span>
          <span className="mt-0.5 text-xs text-ink-400">JPG · PNG · WebP · GIF · BMP — processed in your browser, packed in a ZIP</span>
          <input type="file" multiple accept="image/*" className="hidden" onChange={(e) => add(e.target.files)} />
        </label>
      ) : (
        <div className="rounded-lg border border-ink-100 bg-white p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="text-sm font-medium text-ink-900">{jobs.length} image{jobs.length > 1 ? "s" : ""} queued</span>
            <div className="flex gap-2">
              <label className="inline-flex cursor-pointer items-center gap-1 rounded border border-ink-200 bg-white px-3 py-1.5 text-sm text-ink-700 hover:bg-ink-50">
                <Upload className="h-3.5 w-3.5" /> Add more
                <input type="file" multiple accept="image/*" className="hidden" onChange={(e) => add(e.target.files)} />
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

      <div className="grid gap-4 rounded-lg border border-ink-100 bg-white p-4 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs font-medium text-ink-500">Target format</label>
          <div className="inline-flex rounded-lg border border-ink-200 p-1">
            {FORMATS.map((f) => (
              <button key={f.id} onClick={() => setFormat(f.id)} className={cn("rounded-md px-3 py-1.5 text-sm font-medium transition-colors", format === f.id ? "bg-brand-500 text-white" : "text-ink-600 hover:text-ink-900")}>{f.label}</button>
            ))}
          </div>
        </div>
        <div>
          {format !== "image/png" && (
            <div>
              <label className="mb-1 block text-xs font-medium text-ink-500">Quality · {quality}</label>
              <input type="range" min={20} max={100} value={quality} onChange={(e) => setQuality(Number(e.target.value))} className="w-full accent-brand-500" />
            </div>
          )}
          <div className="mt-3">
            <label className="mb-1 block text-xs font-medium text-ink-500">Max dimension (px) · 0 = keep</label>
            <input type="number" min={0} max={8192} value={maxSide} onChange={(e) => setMaxSide(Number(e.target.value))} className="w-32 rounded-md border border-ink-200 bg-white px-2 py-1 text-sm" />
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Button onClick={runAll} disabled={jobs.length === 0 || busy} size="lg">
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          {busy ? `Processing ${done}/${total}…` : `Process ${jobs.length || ""} images`}
        </Button>
        {zipUrl && (
          <a href={zipUrl} download="konver-batch.zip">
            <Button size="lg" variant="outline"><Download className="h-4 w-4" /> Download ZIP · {formatBytes(zipSize)}</Button>
          </a>
        )}
        {!busy && total > 0 && done > 0 && (
          <span className="text-sm text-ink-500">{done} done{errors > 0 ? ` · ${errors} failed` : ""}</span>
        )}
      </div>

      <p className="text-xs text-ink-400">Processed 100% in your browser — your images are never uploaded.</p>
    </div>
  );
}
