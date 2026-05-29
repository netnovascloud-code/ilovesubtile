"use client";

import { useEffect, useRef, useState } from "react";
import { Upload, X, Download, Loader2, Music, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatBytes } from "@/lib/utils";
import { getFfmpeg } from "@/lib/ffmpeg-client";

export function AudioToVideoClient() {
  const [audio, setAudio] = useState<File | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [phase, setPhase] = useState<"idle" | "loading" | "running">("idle");
  const [error, setError] = useState<string | null>(null);
  const [outUrl, setOutUrl] = useState<string | null>(null);
  const [outSize, setOutSize] = useState(0);
  const cleanup = useRef<string | null>(null);

  useEffect(() => () => { if (cleanup.current) URL.revokeObjectURL(cleanup.current); }, []);

  function pickAudio(f: File | null) { if (!f) return; setAudio(f); setOutUrl(null); setError(null); }
  function pickImage(f: File | null) { if (!f) return; setImage(f); setOutUrl(null); setError(null); }

  async function run() {
    if (!audio || !image || phase !== "idle") return;
    setError(null); setOutUrl(null); setPhase("loading");
    try {
      const { fetchFile } = await import("@ffmpeg/util");
      const ff = await getFfmpeg();
      setPhase("running");
      const audioExt = (audio.name.split(".").pop() || "mp3").toLowerCase();
      const imgExt = (image.name.split(".").pop() || "png").toLowerCase();
      const aName = `audio.${audioExt}`;
      const iName = `image.${imgExt}`;
      const out = "out.mp4";
      await ff.writeFile(iName, await fetchFile(image));
      await ff.writeFile(aName, await fetchFile(audio));
      // -loop 1 + -shortest = video plays the static image for the duration of the audio.
      // yuv420p + even-dimension scale = compatible with every player.
      const code = await ff.exec([
        "-loop", "1", "-i", iName,
        "-i", aName,
        "-c:v", "libx264", "-tune", "stillimage", "-pix_fmt", "yuv420p",
        "-vf", "scale=trunc(iw/2)*2:trunc(ih/2)*2",
        "-c:a", "aac", "-b:a", "192k",
        "-shortest", "-movflags", "+faststart",
        out,
      ]);
      if (code !== 0) throw new Error("FFmpeg exit " + code);
      const data = await ff.readFile(out);
      const blob = new Blob([data as BlobPart], { type: "video/mp4" });
      if (cleanup.current) URL.revokeObjectURL(cleanup.current);
      const url = URL.createObjectURL(blob);
      cleanup.current = url;
      setOutUrl(url); setOutSize(blob.size);
      try { await ff.deleteFile(aName); await ff.deleteFile(iName); await ff.deleteFile(out); } catch {}
    } catch (e) {
      setError(`Could not build the video: ${(e as Error).message}`);
    } finally {
      setPhase("idle");
    }
  }

  const busy = phase !== "idle";

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Drop label="Audio file" accept="audio/*,.mp3,.wav,.m4a,.flac,.aac,.ogg" icon="audio" file={audio} onPick={pickAudio} onClear={() => setAudio(null)} />
        <Drop label="Cover image" accept="image/*,.png,.jpg,.jpeg,.webp" icon="image" file={image} onPick={pickImage} onClear={() => setImage(null)} />
      </div>

      {busy && (
        <div className="flex items-center gap-3 rounded-lg border border-ink-100 bg-white px-4 py-3">
          <Loader2 className="h-4 w-4 animate-spin text-brand-500" />
          <span className="text-sm text-ink-700">
            {phase === "loading" ? "Loading FFmpeg (~30 MB, first time only)…" : "Rendering MP4…"}
          </span>
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        <Button size="lg" onClick={run} disabled={!audio || !image || busy}>
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          {busy ? "Rendering…" : "Create video"}
        </Button>
        {outUrl && (
          <a href={outUrl} download="audio-to-video.mp4">
            <Button size="lg" variant="outline"><Download className="h-4 w-4" /> Download MP4 · {formatBytes(outSize)}</Button>
          </a>
        )}
      </div>

      {outUrl && (
        <video src={outUrl} controls className="max-h-96 w-full rounded-lg border border-ink-100 bg-black" />
      )}

      {error && <p className="text-sm text-red-600">{error}</p>}
      <p className="text-xs text-ink-400">100% in your browser via FFmpeg.wasm — your files are never uploaded.</p>
    </div>
  );
}

function Drop({ label, accept, icon, file, onPick, onClear }: {
  label: string; accept: string; icon: "audio" | "image"; file: File | null;
  onPick: (f: File) => void; onClear: () => void;
}) {
  const Icon = icon === "audio" ? Music : ImageIcon;
  return file ? (
    <div className="flex items-center justify-between rounded-lg border border-ink-100 bg-white px-3 py-2 text-sm">
      <span className="min-w-0 truncate">
        <span className="font-medium text-ink-900">{file.name}</span>
        <span className="ml-2 text-ink-400">{formatBytes(file.size)}</span>
      </span>
      <button onClick={onClear} className="rounded p-1 text-ink-400 hover:bg-ink-50 hover:text-ink-700"><X className="h-3.5 w-3.5" /></button>
    </div>
  ) : (
    <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-rose-300 bg-rose-50/40 px-4 py-8 text-center transition-colors hover:brightness-95">
      <Icon className="h-7 w-7 text-rose-600" />
      <span className="mt-2 text-sm font-medium text-ink-900">{label}</span>
      <Upload className="mt-1 h-4 w-4 text-ink-300" />
      <input type="file" accept={accept} className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) onPick(f); }} />
    </label>
  );
}
