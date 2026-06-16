"use client";

import { useEffect, useRef, useState } from "react";
import { Upload, Download, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn, formatBytes } from "@/lib/utils";
import { categoryTheme } from "@/lib/category-theme";
import { FFMPEG_TOOLS } from "@/lib/ffmpeg-tools";
import { getFfmpeg } from "@/lib/ffmpeg-client";
import type { ToolCategory } from "@/lib/tools-config";
import { useLocale } from "@/hooks/useLocale";
import { getCommonUi } from "@/lib/i18n/tool-ui";
import Link from "next/link";
import { useUser } from "@/hooks/useUser";
import { localePath } from "@/lib/i18n/locales";
import { checkVideoLimits, type VideoLimitCheck } from "@/lib/plan-limits";
import { getVideoLimits } from "@/lib/i18n/video-limits";
import type { Plan } from "@/lib/ai-quotas";

const fmtMb = (mb: number) => (mb >= 1024 ? `${mb / 1024} GB` : `${mb} MB`);
const fmtSec = (s: number) => (s >= 3600 ? `${s / 3600} h` : `${Math.round(s / 60)} min`);

/** Read a video's duration (seconds) in the browser via a throwaway <video>.
 *  Resolves null if the metadata can't be read — the caller then enforces the
 *  weight cap alone rather than blocking a valid file on an unreadable format. */
function readVideoDuration(file: File): Promise<number | null> {
  return new Promise((resolve) => {
    try {
      const url = URL.createObjectURL(file);
      const v = document.createElement("video");
      v.preload = "metadata";
      v.onloadedmetadata = () => { URL.revokeObjectURL(url); resolve(Number.isFinite(v.duration) ? v.duration : null); };
      v.onerror = () => { URL.revokeObjectURL(url); resolve(null); };
      v.src = url;
    } catch { resolve(null); }
  });
}

export function FfmpegToolClient({ slug, category }: { slug: string; category: ToolCategory }) {
  const tool = FFMPEG_TOOLS[slug];
  const locale = useLocale();
  const t = getCommonUi(locale);
  const { plan } = useUser();
  const th = categoryTheme(category);
  const isVideo = category === "video";
  const [file, setFile] = useState<File | null>(null);
  const [duration, setDuration] = useState<number | null>(null);
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

  // Video plan caps (weight + duration), enforced BEFORE the heavy FFmpeg.wasm
  // download begins. Audio-only ffmpeg tools (category !== "video") are
  // unaffected. Plan comes from the signed-in profile; anon falls back to free.
  const planTyped = (plan ?? "free") as Plan;
  const limit: VideoLimitCheck = isVideo && file ? checkVideoLimits(planTyped, file.size, duration) : { ok: true };
  const vl = getVideoLimits(locale);
  const blockMsg = limit.ok
    ? null
    : limit.kind === "weight"
      ? vl.tooHeavy.replace("{max}", fmtMb(limit.limitMb))
      : vl.tooLong.replace("{max}", fmtSec(limit.limitSec));

  async function pickFile(f: File | null) {
    setFile(f); setOutUrl(null); setError(null); setDuration(null); setPhase("idle");
    if (f && isVideo) setDuration(await readVideoDuration(f));
  }

  async function run() {
    if (!file || phase === "loading" || phase === "running") return;
    if (!limit.ok) return; // plan cap exceeded — UI shows the upgrade notice
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
      // Surface a useful message: FFmpeg sometimes rejects with a bare string
      // or a non-Error, so never render the raw `.message` (which can be
      // "undefined"). Log the original for diagnostics.
      console.error("FFmpeg conversion error:", e);
      const detail = e instanceof Error ? e.message : typeof e === "string" ? e : JSON.stringify(e);
      setError(`${t.conversionFailed}: ${detail || "the conversion engine could not start. Please retry."}`);
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
          <span className="mt-3 font-semibold text-ink-900">{t.clickToUpload} {tool.label}</span>
          <span className="mt-0.5 text-xs text-ink-400">{t.accepted}: {tool.accept}</span>
          <input type="file" accept={tool.accept} className="hidden" onChange={(e) => pickFile(e.target.files?.[0] ?? null)} />
        </label>
      ) : (
        <div className="flex items-center justify-between rounded-lg border border-ink-100 bg-white px-4 py-2.5">
          <div className="min-w-0 truncate text-sm">
            <span className="font-medium text-ink-900">{file.name}</span>
            <span className="ml-2 text-ink-400">{formatBytes(file.size)}</span>
          </div>
          <button onClick={() => { setFile(null); setDuration(null); setOutUrl(null); setPhase("idle"); }} className="rounded p-1 text-xs text-ink-400 hover:bg-ink-50 hover:text-ink-700"><X className="h-3.5 w-3.5" /></button>
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
            <p className="text-sm font-medium text-ink-900">{phase === "loading" ? t.loadingEngine : t.converting}</p>
            <p className="text-xs text-ink-400">{phase === "loading" ? t.firstLoad : `${progress}${t.percentComplete}`}</p>
          </div>
          <div className="h-1.5 w-32 overflow-hidden rounded-full bg-ink-100">
            <div className="h-full rounded-full bg-brand-500 transition-all" style={{ width: `${progress}%` }} />
          </div>
        </div>
      )}

      {!limit.ok && blockMsg && (
        <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          <p>{blockMsg}</p>
          <Link href={localePath(locale, "pricing")} className="mt-1 inline-block font-medium text-amber-900 underline hover:no-underline">
            {vl.upgrade} →
          </Link>
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        <Button onClick={run} disabled={!file || busy || !limit.ok} size="lg">
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          {phase === "done" ? t.convertAgain : busy ? (phase === "loading" ? t.loadingEngine : t.converting) : t.convert}
        </Button>
        {outUrl && (
          <a href={outUrl} download={outName}>
            <Button size="lg" variant="outline"><Download className="h-4 w-4" /> {t.download} · {formatBytes(outSize)}</Button>
          </a>
        )}
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}
      <p className="text-xs text-ink-400">{t.privacyFfmpeg}</p>
    </div>
  );
}
