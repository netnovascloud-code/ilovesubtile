"use client";

import { useEffect, useRef, useState } from "react";
import { Upload, Download, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn, formatBytes } from "@/lib/utils";
import { categoryTheme } from "@/lib/category-theme";
import { FFMPEG_TOOLS } from "@/lib/ffmpeg-tools";
import type { ToolCategory } from "@/lib/tools-config";

// Singleton FFmpeg instance — loaded once per session (~30MB WASM core).
let ffmpegPromise: Promise<unknown> | null = null;
async function getFfmpeg(onProgress?: (p: number) => void): Promise<{ exec: (args: string[]) => Promise<number>; writeFile: (n: string, d: Uint8Array) => Promise<void>; readFile: (n: string) => Promise<Uint8Array>; deleteFile: (n: string) => Promise<void>; on: (event: string, h: (e: { progress: number }) => void) => void }> {
  if (!ffmpegPromise) {
    ffmpegPromise = (async () => {
      const { FFmpeg } = await import("@ffmpeg/ffmpeg");
      const { toBlobURL } = await import("@ffmpeg/util");
      const ffmpeg = new FFmpeg();
      const base = "https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd";
      await ffmpeg.load({
        coreURL: await toBlobURL(`${base}/ffmpeg-core.js`, "text/javascript"),
        wasmURL: await toBlobURL(`${base}/ffmpeg-core.wasm`, "application/wasm"),
      });
      return ffmpeg;
    })();
  }
  const ff = (await ffmpegPromise) as Awaited<ReturnType<typeof getFfmpeg>>;
  if (onProgress) ff.on("progress", (e: { progress: number }) => onProgress(Math.max(1, Math.min(99, Math.round(e.progress * 100)))));
  return ff;
}

export function FfmpegToolClient({ slug, category }: { slug: string; category: ToolCategory }) {
  const tool = FFMPEG_TOOLS[slug];
  const th = categoryTheme(category);
  const [file, setFile] = useState<File | null>(null);
  const [outUrl, setOutUrl] = useState<string | null>(null);
  const [outName, setOutName] = useState<string>("output");
  const [outSize, setOutSize] = useState(0);
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"idle" | "loading" | "running" | "done">("idle");
  const [error, setError] = useState<string | null>(null);
  const [opt, setOpt] = useState<Record<string, string>>(() => Object.fromEntries((tool?.options ?? []).map((o) => [o.id, o.default])));
  const cleanup = useRef<string | null>(null);

  useEffect(() => () => { if (cleanup.current) URL.revokeObjectURL(cleanup.current); }, []);

  if (!tool) return <p className="text-sm text-red-600">Unknown tool.</p>;

  async function run() {
    if (!file || phase === "loading" || phase === "running") return;
    setError(null); setOutUrl(null); setProgress(0); setOutSize(0);
    setPhase("loading");
    try {
      const ff = await getFfmpeg((p) => setProgress(p));
      setPhase("running");
      const inExt = (file.name.split(".").pop() || tool.inputExt).toLowerCase();
      const inputName = `input.${inExt}`;
      const outputName = `output.${tool.outputExt}`;
      const { fetchFile } = await import("@ffmpeg/util");
      await ff.writeFile(inputName, await fetchFile(file));
      const args = tool.command(inputName, outputName, opt);
      const code = await ff.exec(args);
      if (code !== 0) throw new Error("FFmpeg exited with a non-zero status.");
      const data = await ff.readFile(outputName);
      const blob = new Blob([data as BlobPart], { type: tool.outputMime });
      if (cleanup.current) URL.revokeObjectURL(cleanup.current);
      const url = URL.createObjectURL(blob);
      cleanup.current = url;
      setOutUrl(url); setOutSize(blob.size); setOutName(`${file.name.replace(/\.[^.]+$/, "")}.${tool.outputExt}`);
      try { await ff.deleteFile(inputName); await ff.deleteFile(outputName); } catch {}
      setProgress(100); setPhase("done");
    } catch (e) {
      setError(`Conversion failed: ${(e as Error).message}`);
      setPhase("idle");
    }
  }

  const busy = phase === "loading" || phase === "running";

  return (
    <div className="space-y-4">
      {!file ? (
        <label className={cn("flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed px-6 py-14 text-center transition-colors hover:brightness-95", th.dropBorder, th.dropBg)}>
          <span className={cn("grid h-12 w-12 place-items-center rounded-xl", th.iconBg, th.iconText)}>
            <Upload className="h-6 w-6" />
          </span>
          <span className="mt-3 font-semibold text-ink-900">Click to upload {tool.label}</span>
          <span className="mt-0.5 text-xs text-ink-400">Accepted: {tool.accept}</span>
          <input type="file" accept={tool.accept} className="hidden" onChange={(e) => { setFile(e.target.files?.[0] ?? null); setOutUrl(null); setError(null); }} />
        </label>
      ) : (
        <div className="flex items-center justify-between rounded-lg border border-ink-100 bg-white px-4 py-2.5">
          <div className="min-w-0 truncate text-sm">
            <span className="font-medium text-ink-900">{file.name}</span>
            <span className="ml-2 text-ink-400">{formatBytes(file.size)}</span>
          </div>
          <button onClick={() => { setFile(null); setOutUrl(null); setPhase("idle"); }} className="rounded p-1 text-xs text-ink-400 hover:bg-ink-50 hover:text-ink-700"><X className="h-3.5 w-3.5" /></button>
        </div>
      )}

      {tool.options && tool.options.length > 0 && file && (
        <div className="flex flex-wrap items-center gap-4 rounded-lg border border-ink-100 bg-white p-3">
          {tool.options.map((o) => {
            const type = "type" in o ? o.type : "select";
            if (type === "number" || type === "range") {
              const num = o as Extract<typeof o, { type: "number" | "range" }>;
              return (
                <label key={o.id} className="flex items-center gap-2 text-sm text-ink-700">
                  <span className="font-medium">{o.label}</span>
                  <input
                    type={type === "range" ? "range" : "number"}
                    min={num.min}
                    max={num.max}
                    step={num.step ?? 1}
                    value={opt[o.id] ?? num.default}
                    onChange={(e) => setOpt((s) => ({ ...s, [o.id]: e.target.value }))}
                    className={type === "range"
                      ? "w-40 accent-brand-500"
                      : "w-24 rounded-md border border-ink-200 bg-white px-2 py-1 text-sm"}
                  />
                  {type === "range" && <span className="w-10 text-right font-mono text-xs text-ink-500">{opt[o.id] ?? num.default}{num.unit ? ` ${num.unit}` : ""}</span>}
                </label>
              );
            }
            const sel = o as Extract<typeof o, { type?: "select"; values: { id: string; label: string }[] }>;
            return (
              <label key={o.id} className="flex items-center gap-2 text-sm text-ink-700">
                <span className="font-medium">{o.label}</span>
                <select value={opt[o.id] ?? sel.default} onChange={(e) => setOpt((s) => ({ ...s, [o.id]: e.target.value }))} className="rounded-md border border-ink-200 bg-white px-2 py-1 text-sm">
                  {sel.values.map((v) => <option key={v.id} value={v.id}>{v.label}</option>)}
                </select>
              </label>
            );
          })}
        </div>
      )}

      {busy && (
        <div className="flex items-center gap-3 rounded-lg border border-ink-100 bg-white px-4 py-3">
          <Loader2 className="h-4 w-4 animate-spin text-brand-500" />
          <div className="flex-1">
            <p className="text-sm font-medium text-ink-900">{phase === "loading" ? "Loading FFmpeg…" : "Converting…"}</p>
            <p className="text-xs text-ink-400">{phase === "loading" ? "First load is ~30 MB; cached afterwards." : `${progress}% complete`}</p>
          </div>
          <div className="h-1.5 w-32 overflow-hidden rounded-full bg-ink-100">
            <div className="h-full rounded-full bg-brand-500 transition-all" style={{ width: `${progress}%` }} />
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        <Button onClick={run} disabled={!file || busy} size="lg">
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          {phase === "done" ? "Convert again" : busy ? (phase === "loading" ? "Loading…" : "Converting…") : "Convert"}
        </Button>
        {outUrl && (
          <a href={outUrl} download={outName}>
            <Button size="lg" variant="outline"><Download className="h-4 w-4" /> Download · {formatBytes(outSize)}</Button>
          </a>
        )}
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}
      <p className="text-xs text-ink-400">Processed 100% in your browser via FFmpeg WebAssembly — your file is never uploaded.</p>
    </div>
  );
}
