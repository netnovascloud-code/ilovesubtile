"use client";

import { useRef, useState } from "react";
import { Upload, X, Download, Loader2, Check, AlertCircle, Music } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn, formatBytes } from "@/lib/utils";
import { getFfmpeg } from "@/lib/ffmpeg-client";
import type { Locale } from "@/lib/i18n/locales";
import { getBatch } from "@/lib/i18n/page-batch";

type Job = { id: string; file: File; status: "queued" | "running" | "done" | "error"; blob?: Blob; outName?: string; error?: string };

// FFmpeg.wasm loads via the shared, resilient singleton in lib/ffmpeg-client
// (self-hosted worker + CDN fallback + load timeout). See its header for why a
// local FFmpeg.load() without classWorkerURL hangs under Next/Webpack.

const MAX_FILES = 50;
const BITRATES = [
  { id: "128k", labelKey: "bitrate128" },
  { id: "192k", labelKey: "bitrate192" },
  { id: "256k", labelKey: "bitrate256" },
  { id: "320k", labelKey: "bitrate320" },
] as const;

export function BatchAudioClient({ locale }: { locale: Locale }) {
  const t = getBatch(locale).audio;
  const common = getBatch(locale).common;
  const [jobs, setJobs] = useState<Job[]>([]);
  const [bitrate, setBitrate] = useState<string>("192k");
  const [busy, setBusy] = useState(false);
  const [phase, setPhase] = useState<"idle" | "loading" | "running">("idle");
  const [zipUrl, setZipUrl] = useState<string | null>(null);
  const [zipSize, setZipSize] = useState(0);
  const cleanup = useRef<string | null>(null);

  function add(list: FileList | null) {
    if (!list) return;
    const next: Job[] = [];
    for (const f of Array.from(list)) {
      if (!f.type.startsWith("audio/") && !/\.(mp3|wav|m4a|aac|flac|ogg|opus|wma)$/i.test(f.name)) continue;
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
    setBusy(true); setZipUrl(null); setPhase("loading");
    const { fetchFile } = await import("@ffmpeg/util");
    const ff = await getFfmpeg();
    setPhase("running");
    const queue = jobs.map((j) => ({ ...j, status: "queued" as const, blob: undefined, error: undefined }));
    setJobs(queue);
    for (const j of queue) {
      setJobs((s) => s.map((x) => x.id === j.id ? { ...x, status: "running" } : x));
      try {
        const inExt = (j.file.name.split(".").pop() || "audio").toLowerCase();
        const inName = `in.${inExt}`;
        const outName = `out.mp3`;
        await ff.writeFile(inName, await fetchFile(j.file));
        const code = await ff.exec(["-i", inName, "-c:a", "libmp3lame", "-b:a", bitrate, outName]);
        if (code !== 0) throw new Error("ffmpeg exit " + code);
        const data = await ff.readFile(outName);
        const blob = new Blob([data as BlobPart], { type: "audio/mpeg" });
        const finalName = `${j.file.name.replace(/\.[^.]+$/, "")}.mp3`;
        setJobs((s) => s.map((x) => x.id === j.id ? { ...x, status: "done", blob, outName: finalName } : x));
        try { await ff.deleteFile(inName); await ff.deleteFile(outName); } catch {}
      } catch (e) {
        setJobs((s) => s.map((x) => x.id === j.id ? { ...x, status: "error", error: (e as Error).message } : x));
      }
    }
    setBusy(false); setPhase("idle");

    const finished = await new Promise<Job[]>((res) => setJobs((s) => { res(s); return s; }));
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
        <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-amber-300 bg-amber-50/40 px-6 py-16 text-center transition-colors hover:brightness-95">
          <span className="grid h-12 w-12 place-items-center rounded-xl bg-amber-50 text-amber-600"><Music className="h-6 w-6" /></span>
          <span className="mt-3 font-semibold text-ink-900">{t.dropTitle(MAX_FILES)}</span>
          <span className="mt-0.5 text-xs text-ink-400">{t.dropHint}</span>
          <input type="file" multiple accept="audio/*,.mp3,.wav,.m4a,.aac,.flac,.ogg,.opus" className="hidden" onChange={(e) => add(e.target.files)} />
        </label>
      ) : (
        <div className="rounded-lg border border-ink-100 bg-white p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="text-sm font-medium text-ink-900">{t.queued(jobs.length)}</span>
            <div className="flex gap-2">
              <label className="inline-flex cursor-pointer items-center gap-1 rounded border border-ink-200 bg-white px-3 py-1.5 text-sm text-ink-700 hover:bg-ink-50">
                <Upload className="h-3.5 w-3.5" /> {common.addMore}
                <input type="file" multiple accept="audio/*,.mp3,.wav,.m4a,.aac,.flac,.ogg,.opus" className="hidden" onChange={(e) => add(e.target.files)} />
              </label>
              <Button size="sm" variant="outline" onClick={clear}><X className="h-3.5 w-3.5" /> {common.clear}</Button>
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
        <label className="mb-1 block text-xs font-medium text-ink-500">{t.bitrate}</label>
        <div className="inline-flex rounded-lg border border-ink-200 bg-white p-1">
          {BITRATES.map((b) => (
            <button key={b.id} onClick={() => setBitrate(b.id)} className={cn("rounded-md px-3 py-1.5 text-sm font-medium transition-colors", bitrate === b.id ? "bg-brand-500 text-white" : "text-ink-600 hover:text-ink-900")}>{t[b.labelKey]}</button>
          ))}
        </div>
      </div>

      {phase === "loading" && (
        <div className="flex items-center gap-3 rounded-lg border border-ink-100 bg-white px-4 py-3">
          <Loader2 className="h-4 w-4 animate-spin text-brand-500" />
          <span className="text-sm text-ink-700">{common.loadingFfmpeg}</span>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-3">
        <Button onClick={runAll} disabled={jobs.length === 0 || busy} size="lg">
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          {busy ? t.converting(done, total) : t.convert(String(jobs.length || ""))}
        </Button>
        {zipUrl && (
          <a href={zipUrl} download="konver-audio.zip">
            <Button size="lg" variant="outline"><Download className="h-4 w-4" /> {common.downloadZip} · {formatBytes(zipSize)}</Button>
          </a>
        )}
        {!busy && total > 0 && done > 0 && (
          <span className="text-sm text-ink-500">{common.done(done)}{errors > 0 ? ` · ${common.failed(errors)}` : ""}</span>
        )}
      </div>

      <p className="text-xs text-ink-400">{t.privacy}</p>
    </div>
  );
}
