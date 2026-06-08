"use client";

import { useEffect, useRef, useState } from "react";
import { Upload, X, Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn, formatBytes } from "@/lib/utils";
import { TemplatesBar } from "@/components/tools/TemplatesBar";
import { getFfmpeg } from "@/lib/ffmpeg-client";

// Overlay-filter coordinates (W,H = main video; w,h = the watermark overlay).
const POSITIONS = [
  { id: "BR", label: "Bottom right", x: "W-w-20", y: "H-h-20" },
  { id: "BL", label: "Bottom left", x: "20", y: "H-h-20" },
  { id: "TR", label: "Top right", x: "W-w-20", y: "20" },
  { id: "TL", label: "Top left", x: "20", y: "20" },
  { id: "C", label: "Centre", x: "(W-w)/2", y: "(H-h)/2" },
] as const;

// Render the watermark text to a transparent PNG with the Canvas API. The wasm
// core has no libfreetype, so FFmpeg's `drawtext` filter is unavailable — we
// composite this PNG with the `overlay` filter instead (and avoid the
// CSP-blocked jsdelivr font fetch the old drawtext path relied on).
function renderWatermarkPng(text: string, size: number, color: string, alpha: number): Uint8Array {
  const measure = document.createElement("canvas").getContext("2d")!;
  measure.font = `bold ${size}px sans-serif`;
  const tw = Math.ceil(measure.measureText(text).width);
  const pad = Math.round(size * 0.35);
  const canvas = document.createElement("canvas");
  canvas.width = tw + pad * 2;
  canvas.height = Math.ceil(size * 1.3) + pad * 2;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "rgba(0,0,0,0.2)"; // semi-transparent box, like the old boxcolor
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.font = `bold ${size}px sans-serif`;
  ctx.textBaseline = "middle";
  ctx.globalAlpha = alpha;
  ctx.fillStyle = color;
  ctx.fillText(text, pad, canvas.height / 2);
  const b64 = canvas.toDataURL("image/png").split(",")[1];
  const bin = atob(b64);
  const arr = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i);
  return arr;
}

export function WatermarkVideoClient() {
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState("Konvertools.io");
  const [pos, setPos] = useState<string>("BR");
  const [size, setSize] = useState(48);
  const [color, setColor] = useState("white");
  const [opacity, setOpacity] = useState(85);
  const [phase, setPhase] = useState<"idle" | "loading" | "running" | "done">("idle");
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [outUrl, setOutUrl] = useState<string | null>(null);
  const [outName, setOutName] = useState("watermarked.mp4");
  const cleanup = useRef<string | null>(null);

  useEffect(() => () => { if (cleanup.current) URL.revokeObjectURL(cleanup.current); }, []);

  async function run() {
    if (!file || !text.trim() || phase === "loading" || phase === "running") return;
    setError(null); setOutUrl(null); setProgress(0);
    setPhase("loading");
    try {
      const ff = await getFfmpeg((pr) => setProgress(pr));
      setPhase("running");
      const { fetchFile } = await import("@ffmpeg/util");

      const ext = (file.name.split(".").pop() || "mp4").toLowerCase();
      const inName = `input.${ext}`;
      const outNameInternal = "output.mp4";
      await ff.writeFile(inName, await fetchFile(file));
      await ff.writeFile("wm.png", renderWatermarkPng(text, size, color, opacity / 100));

      const p = POSITIONS.find((q) => q.id === pos)!;
      const filter = `overlay=${p.x}:${p.y}`;
      const code = await ff.exec(["-i", inName, "-i", "wm.png", "-filter_complex", filter, "-c:v", "libx264", "-preset", "veryfast", "-crf", "23", "-c:a", "copy", outNameInternal]);
      if (code !== 0) throw new Error("FFmpeg exited with a non-zero status.");
      const data = await ff.readFile(outNameInternal);
      const blob = new Blob([data as BlobPart], { type: "video/mp4" });

      if (cleanup.current) URL.revokeObjectURL(cleanup.current);
      const url = URL.createObjectURL(blob);
      cleanup.current = url;
      setOutUrl(url);
      setOutName(`${file.name.replace(/\.[^.]+$/, "")}-watermarked.mp4`);
      try { await ff.deleteFile(inName); await ff.deleteFile("wm.png"); await ff.deleteFile(outNameInternal); } catch {}
      setProgress(100); setPhase("done");
    } catch (e) {
      setError(`Watermarking failed: ${(e as Error).message}`);
      setPhase("idle");
    }
  }

  const busy = phase === "loading" || phase === "running";

  return (
    <div className="space-y-4">
      {!file ? (
        <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-violet-300 bg-violet-50/40 px-6 py-14 text-center transition-colors hover:brightness-95">
          <span className="grid h-12 w-12 place-items-center rounded-xl bg-violet-50 text-violet-600"><Upload className="h-6 w-6" /></span>
          <span className="mt-3 font-semibold text-ink-900">Upload a video</span>
          <span className="mt-0.5 text-xs text-ink-400">MP4 · MOV · MKV · WebM — encoded in your browser</span>
          <input type="file" accept="video/*,.mp4,.mov,.mkv,.webm" className="hidden" onChange={(e) => { setFile(e.target.files?.[0] ?? null); setOutUrl(null); setError(null); }} />
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

      <TemplatesBar
        tool="add-watermark"
        settings={{ text, pos, size, color, opacity }}
        onApply={(s) => {
          if (typeof s.text === "string") setText(s.text);
          if (typeof s.pos === "string") setPos(s.pos);
          if (typeof s.size === "number") setSize(s.size);
          if (typeof s.color === "string") setColor(s.color);
          if (typeof s.opacity === "number") setOpacity(s.opacity);
        }}
      />

      <div className="grid gap-3 rounded-lg border border-ink-100 bg-white p-4 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs font-medium text-ink-500">Watermark text</label>
          <input value={text} onChange={(e) => setText(e.target.value)} className="w-full rounded-md border border-ink-200 bg-white px-3 py-2 text-sm text-ink-900" />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-ink-500">Position</label>
          <div className="flex flex-wrap gap-1">
            {POSITIONS.map((p) => (
              <button key={p.id} onClick={() => setPos(p.id)} className={cn("rounded-md border px-2.5 py-1 text-xs font-medium transition-colors", pos === p.id ? "border-brand-300 bg-brand-50 text-brand-700" : "border-ink-200 bg-white text-ink-600 hover:border-ink-300")}>{p.label}</button>
            ))}
          </div>
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-ink-500">Font size · {size}</label>
          <input type="range" min={16} max={120} value={size} onChange={(e) => setSize(Number(e.target.value))} className="w-full accent-brand-500" />
        </div>
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 text-xs font-medium text-ink-500">Colour
            <select value={color} onChange={(e) => setColor(e.target.value)} className="rounded-md border border-ink-200 bg-white px-2 py-1 text-sm">
              {["white", "black", "yellow", "red", "blue", "green"].map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </label>
          <label className="flex flex-1 items-center gap-2 text-xs font-medium text-ink-500">Opacity · {opacity}%
            <input type="range" min={20} max={100} value={opacity} onChange={(e) => setOpacity(Number(e.target.value))} className="flex-1 accent-brand-500" />
          </label>
        </div>
      </div>

      {busy && (
        <div className="flex items-center gap-3 rounded-lg border border-ink-100 bg-white px-4 py-3">
          <Loader2 className="h-4 w-4 animate-spin text-brand-500" />
          <div className="flex-1">
            <p className="text-sm font-medium text-ink-900">{phase === "loading" ? "Loading FFmpeg…" : "Burning watermark…"}</p>
            <p className="text-xs text-ink-400">{phase === "loading" ? "First load is ~30MB; cached afterwards." : `${progress}% complete`}</p>
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        <Button onClick={run} disabled={!file || !text.trim() || busy} size="lg">
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          {phase === "done" ? "Watermark again" : busy ? "Working…" : "Add watermark"}
        </Button>
        {outUrl && (
          <a href={outUrl} download={outName}>
            <Button size="lg" variant="outline"><Download className="h-4 w-4" /> Download MP4</Button>
          </a>
        )}
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}
      <p className="text-xs text-ink-400">Processed 100% in your browser via FFmpeg.wasm — your video is never uploaded.</p>
    </div>
  );
}
