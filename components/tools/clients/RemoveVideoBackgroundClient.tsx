"use client";

import { useEffect, useRef, useState } from "react";
import { Upload, X, Download, Loader2, Lock } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { formatBytes } from "@/lib/utils";
import { useUser } from "@/hooks/useUser";

// ── @imgly background removal (loaded from CDN so onnxruntime never enters
// the webpack/SWC client chunk — same trick as the image tool) ─────────────
type BgModule = { removeBackground: (input: Blob | string, opts?: unknown) => Promise<Blob> };
let bgPromise: Promise<BgModule> | null = null;
async function getBg(): Promise<BgModule> {
  if (!bgPromise) {
    const url = "https://esm.sh/@imgly/background-removal@1.5.6?bundle";
    bgPromise = import(/* webpackIgnore: true */ url) as Promise<BgModule>;
  }
  return bgPromise;
}

// ── FFmpeg.wasm singleton ───────────────────────────────────────────────────
type FfmpegLike = {
  exec: (a: string[]) => Promise<number>;
  writeFile: (n: string, d: Uint8Array) => Promise<unknown>;
  readFile: (n: string) => Promise<Uint8Array>;
  deleteFile: (n: string) => Promise<unknown>;
};
let ffmpegPromise: Promise<FfmpegLike> | null = null;
async function getFfmpeg(): Promise<FfmpegLike> {
  if (!ffmpegPromise) {
    ffmpegPromise = (async () => {
      const { FFmpeg } = await import("@ffmpeg/ffmpeg");
      const { toBlobURL } = await import("@ffmpeg/util");
      const ff = new FFmpeg();
      const base = "https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd";
      await ff.load({ coreURL: await toBlobURL(`${base}/ffmpeg-core.js`, "text/javascript"), wasmURL: await toBlobURL(`${base}/ffmpeg-core.wasm`, "application/wasm") });
      return ff as unknown as FfmpegLike;
    })();
  }
  return ffmpegPromise;
}

type Bg = { id: string; label: string; swatch: string; color: string | null };
const BACKGROUNDS: Bg[] = [
  { id: "transparent", label: "Transparent", swatch: "repeating-conic-gradient(#d1d5db 0 25%, #fff 0 50%) 0/12px 12px", color: null },
  { id: "green", label: "Green screen", swatch: "#00b140", color: "#00b140" },
  { id: "white", label: "White", swatch: "#ffffff", color: "#ffffff" },
  { id: "black", label: "Black", swatch: "#000000", color: "#000000" },
];

const FPS = 12;
type PlanLimit = { label: string; seconds: number };
function limitFor(user: boolean, plan: string): PlanLimit {
  if (plan === "business") return { label: "Business", seconds: Infinity };
  if (plan === "pro") return { label: "Pro", seconds: 300 }; // 5 min — matches the pricing promise
  if (user) return { label: "Free", seconds: 30 };
  return { label: "anonymous", seconds: 15 };
}

const padNum = (n: number) => String(n).padStart(5, "0");

export function RemoveVideoBackgroundClient() {
  const { user, plan, loading } = useUser();
  const [file, setFile] = useState<File | null>(null);
  const [bgId, setBgId] = useState("transparent");
  const [custom, setCustom] = useState("#2563eb");
  const [useCustom, setUseCustom] = useState(false);
  const [duration, setDuration] = useState(0);
  const [phase, setPhase] = useState<"idle" | "loading" | "frames" | "matting" | "encoding">("idle");
  const [matted, setMatted] = useState(0);
  const [totalFrames, setTotalFrames] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [note, setNote] = useState<string | null>(null);
  const [outUrl, setOutUrl] = useState<string | null>(null);
  const [outSize, setOutSize] = useState(0);
  const [outExt, setOutExt] = useState<"webm" | "mp4">("webm");
  const cleanup = useRef<string | null>(null);

  useEffect(() => () => { if (cleanup.current) URL.revokeObjectURL(cleanup.current); }, []);

  const limit = limitFor(!!user, plan);
  const busy = phase !== "idle";
  const bgColor = useCustom ? custom : BACKGROUNDS.find((b) => b.id === bgId)?.color ?? null;
  const transparent = !useCustom && bgId === "transparent";

  function pick(f: File | null) {
    if (!f) return;
    setError(null); setOutUrl(null); setNote(null); setMatted(0); setTotalFrames(0);
    setFile(f);
    const v = document.createElement("video");
    v.preload = "metadata";
    v.onloadedmetadata = () => {
      setDuration(v.duration || 0);
      if (Number.isFinite(limit.seconds) && v.duration > limit.seconds) {
        setNote(`Your clip is ${Math.round(v.duration)}s — on the ${limit.label} tier we'll process the first ${limit.seconds}s. Upgrade for longer clips.`);
      }
      URL.revokeObjectURL(v.src);
    };
    v.src = URL.createObjectURL(f);
  }

  /** Composite one matted PNG (alpha) over the chosen background; return PNG bytes. */
  async function composite(alphaPng: Uint8Array): Promise<Uint8Array> {
    const bmp = await createImageBitmap(new Blob([alphaPng as BlobPart], { type: "image/png" }));
    const canvas = document.createElement("canvas");
    canvas.width = bmp.width; canvas.height = bmp.height;
    const ctx = canvas.getContext("2d")!;
    if (bgColor) { ctx.fillStyle = bgColor; ctx.fillRect(0, 0, canvas.width, canvas.height); }
    else ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(bmp, 0, 0);
    bmp.close();
    const blob: Blob = await new Promise((res) => canvas.toBlob((b) => res(b!), "image/png"));
    return new Uint8Array(await blob.arrayBuffer());
  }

  async function run() {
    if (!file || busy || loading) return;
    if (limit.seconds === 0) return;
    setError(null); setOutUrl(null); setMatted(0);
    const capSec = Number.isFinite(limit.seconds) ? Math.min(duration || limit.seconds, limit.seconds) : (duration || 600);

    try {
      setPhase("loading");
      const [ff, bg] = await Promise.all([getFfmpeg(), getBg()]);
      const inExt = (file.name.split(".").pop() || "mp4").toLowerCase();
      const inName = `in.${inExt}`;
      const { fetchFile } = await import("@ffmpeg/util");
      await ff.writeFile(inName, await fetchFile(file));

      // 1) Extract frames (capped, downscaled to ≤1280px wide for tractability).
      setPhase("frames");
      const extract = await ff.exec(["-i", inName, "-t", String(capSec), "-vf", `fps=${FPS},scale='min(1280,iw)':-2`, "frame%05d.png"]);
      if (extract !== 0) throw new Error("frame extraction failed");

      // 2) Try to keep the original audio (best-effort — clips may be silent).
      let hasAudio = false;
      try { hasAudio = (await ff.exec(["-i", inName, "-t", String(capSec), "-vn", "-c:a", "aac", "-b:a", "128k", "aud.m4a"])) === 0; } catch { hasAudio = false; }

      // 3) Count frames by reading sequentially until one is missing.
      const frames: number[] = [];
      for (let i = 1; ; i++) {
        try { await ff.readFile(`frame${padNum(i)}.png`); frames.push(i); } catch { break; }
      }
      if (!frames.length) throw new Error("no frames extracted");
      setTotalFrames(frames.length);

      // 4) Matte each frame, composite over the background, write back.
      setPhase("matting");
      for (const i of frames) {
        const raw = await ff.readFile(`frame${padNum(i)}.png`);
        const cut = await bg.removeBackground(new Blob([raw as BlobPart], { type: "image/png" }), { output: { format: "image/png", quality: 1 } });
        const composedPng = await composite(new Uint8Array(await cut.arrayBuffer()));
        await ff.writeFile(`out${padNum(i)}.png`, composedPng);
        await ff.deleteFile(`frame${padNum(i)}.png`);
        setMatted((m) => m + 1);
      }

      // 5) Re-encode. Transparent → VP9/alpha WebM; solid colour → H.264 MP4.
      setPhase("encoding");
      const ext: "webm" | "mp4" = transparent ? "webm" : "mp4";
      const out = `out.${ext}`;
      const audioIn = hasAudio ? ["-i", "aud.m4a"] : [];
      const args = transparent
        ? ["-framerate", String(FPS), "-i", "out%05d.png", ...audioIn, "-c:v", "libvpx-vp9", "-pix_fmt", "yuva420p", "-b:v", "1M", ...(hasAudio ? ["-c:a", "libopus", "-b:a", "96k", "-shortest"] : []), out]
        : ["-framerate", String(FPS), "-i", "out%05d.png", ...audioIn, "-c:v", "libx264", "-pix_fmt", "yuv420p", "-preset", "veryfast", "-crf", "23", ...(hasAudio ? ["-c:a", "aac", "-b:a", "128k", "-shortest"] : []), out];
      const code = await ff.exec(args);
      if (code !== 0) throw new Error("encoding failed (code " + code + ")");

      const data = await ff.readFile(out);
      const blob = new Blob([data as BlobPart], { type: transparent ? "video/webm" : "video/mp4" });
      if (cleanup.current) URL.revokeObjectURL(cleanup.current);
      const url = URL.createObjectURL(blob);
      cleanup.current = url;
      setOutUrl(url); setOutSize(blob.size); setOutExt(ext);

      // Tidy the FS.
      try {
        await ff.deleteFile(inName); await ff.deleteFile(out);
        if (hasAudio) await ff.deleteFile("aud.m4a");
        for (const i of frames) { try { await ff.deleteFile(`out${padNum(i)}.png`); } catch {} }
      } catch {}
    } catch (e) {
      setError(`Could not process the video: ${(e as Error).message}`);
    } finally {
      setPhase("idle");
    }
  }

  const phaseLabel = phase === "loading" ? "Loading engine (~70 MB, first run only)…"
    : phase === "frames" ? "Extracting frames…"
    : phase === "matting" ? `Removing background — frame ${matted}/${totalFrames || "…"}`
    : phase === "encoding" ? "Encoding the new video…" : "";
  const pct = phase === "matting" && totalFrames ? Math.round((matted / totalFrames) * 100) : phase === "encoding" ? 99 : phase === "frames" ? 5 : 0;

  return (
    <div className="space-y-4">
      {!file ? (
        <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-rose-300 bg-rose-50/40 px-6 py-12 text-center transition-colors hover:brightness-95">
          <Upload className="h-7 w-7 text-rose-600" />
          <span className="mt-2 font-medium text-ink-900">Upload a video</span>
          <span className="mt-0.5 text-xs text-ink-400">MP4 · MOV · WebM — processed 100% in your browser</span>
          <input type="file" accept="video/mp4,video/quicktime,video/webm,.mp4,.mov,.webm,.mkv" className="hidden" onChange={(e) => pick(e.target.files?.[0] ?? null)} />
        </label>
      ) : (
        <div className="flex items-center justify-between rounded-lg border border-ink-100 bg-white px-4 py-2.5">
          <div className="min-w-0 truncate text-sm">
            <span className="font-medium text-ink-900">{file.name}</span>
            <span className="ml-2 text-ink-400">{formatBytes(file.size)}{duration ? ` · ${Math.round(duration)}s` : ""}</span>
          </div>
          <button onClick={() => { setFile(null); setOutUrl(null); setError(null); setNote(null); }} className="rounded p-1 text-xs text-ink-400 hover:bg-ink-50 hover:text-ink-700"><X className="h-3.5 w-3.5" /></button>
        </div>
      )}

      {file && (
        <div>
          <p className="mb-2 text-sm font-medium text-ink-700">Replacement background</p>
          <div className="flex flex-wrap items-center gap-2">
            {BACKGROUNDS.map((b) => (
              <button key={b.id} onClick={() => { setUseCustom(false); setBgId(b.id); }}
                className={`flex items-center gap-2 rounded-lg border px-3 py-1.5 text-sm ${!useCustom && bgId === b.id ? "border-rose-400 ring-2 ring-rose-100" : "border-ink-200"}`}>
                <span className="h-4 w-4 rounded border border-ink-200" style={{ background: b.swatch }} />
                {b.label}
              </button>
            ))}
            <button onClick={() => setUseCustom(true)} className={`flex items-center gap-2 rounded-lg border px-3 py-1.5 text-sm ${useCustom ? "border-rose-400 ring-2 ring-rose-100" : "border-ink-200"}`}>
              <input type="color" value={custom} onChange={(e) => { setCustom(e.target.value); setUseCustom(true); }} className="h-4 w-4 cursor-pointer rounded border-0 bg-transparent p-0" />
              Custom
            </button>
          </div>
          <p className="mt-2 text-xs text-ink-400">
            Transparent exports a WebM with an alpha channel; a colour exports MP4. Output runs at {FPS} fps.
          </p>
        </div>
      )}

      {note && <p className="rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-700">{note}</p>}

      {busy && (
        <div className="flex items-center gap-3 rounded-lg border border-ink-100 bg-white px-4 py-3">
          <Loader2 className="h-4 w-4 animate-spin text-rose-500" />
          <div className="flex-1">
            <p className="text-sm font-medium text-ink-900">{phaseLabel}</p>
            <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-ink-100">
              <div className="h-full rounded-full bg-rose-500 transition-all" style={{ width: `${pct}%` }} />
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        <Button size="lg" onClick={run} disabled={!file || busy || loading}>
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          {busy ? "Working…" : "Remove video background"}
        </Button>
        {outUrl && (
          <a href={outUrl} download={`no-background.${outExt}`}>
            <Button size="lg" variant="outline"><Download className="h-4 w-4" /> Download {outExt.toUpperCase()} · {formatBytes(outSize)}</Button>
          </a>
        )}
      </div>

      {outUrl && (
        <div className="rounded-lg border border-ink-100 bg-white p-3">
          <div className="grid min-h-48 place-items-center rounded p-2" style={{ background: transparent ? "repeating-conic-gradient(#d1d5db 0 25%, #fff 0 50%) 0/16px 16px" : "#111827" }}>
            <video src={outUrl} controls loop className="max-h-80 max-w-full rounded" />
          </div>
        </div>
      )}

      <p className="flex items-center gap-1.5 text-xs text-ink-400">
        <Lock className="h-3 w-3" /> 100% in your browser via WebAssembly — your video is never uploaded.{" "}
        {Number.isFinite(limit.seconds) && (
          <span>On the {limit.label} tier, clips are capped at {limit.seconds}s — <Link href="/pricing" className="text-rose-600 hover:underline">upgrade</Link> for up to 5 min (Pro) or unlimited (Business).</span>
        )}
      </p>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
