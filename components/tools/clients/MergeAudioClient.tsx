"use client";

import { useEffect, useRef, useState } from "react";
import { Upload, X, Download, Loader2, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatBytes } from "@/lib/utils";
import { getFfmpeg } from "@/lib/ffmpeg-client";

type Entry = { id: string; file: File };

// FFmpeg.wasm is loaded via the shared self-hosted-worker loader
// (lib/ffmpeg-client). The previous inline UMD loader (no classWorkerURL) broke
// under Next/Webpack and never initialised.

export function MergeAudioClient() {
  const [items, setItems] = useState<Entry[]>([]);
  const [bitrate, setBitrate] = useState("192k");
  const [phase, setPhase] = useState<"idle" | "loading" | "running">("idle");
  const [error, setError] = useState<string | null>(null);
  const [outUrl, setOutUrl] = useState<string | null>(null);
  const [outSize, setOutSize] = useState(0);
  const dragIndex = useRef<number | null>(null);
  const cleanup = useRef<string | null>(null);

  useEffect(() => () => { if (cleanup.current) URL.revokeObjectURL(cleanup.current); }, []);

  function add(list: FileList | null) {
    if (!list) return;
    const next: Entry[] = [];
    for (const f of Array.from(list)) {
      if (f.type.startsWith("audio/") || /\.(mp3|wav|m4a|aac|flac|ogg|opus)$/i.test(f.name)) next.push({ id: crypto.randomUUID(), file: f });
    }
    setItems((s) => [...s, ...next]);
    setOutUrl(null); setError(null);
  }
  function remove(id: string) { setItems((s) => s.filter((e) => e.id !== id)); setOutUrl(null); }
  function move(from: number, to: number) { setItems((s) => { const n = s.slice(); const [it] = n.splice(from, 1); n.splice(to, 0, it); return n; }); }

  async function merge() {
    if (items.length < 2 || phase !== "idle") return;
    setError(null); setOutUrl(null); setPhase("loading");
    try {
      const { fetchFile } = await import("@ffmpeg/util");
      const ff = await getFfmpeg();
      setPhase("running");
      const names: string[] = [];
      for (let i = 0; i < items.length; i++) {
        const ext = (items[i].file.name.split(".").pop() || "mp3").toLowerCase();
        const n = `in${i}.${ext}`;
        await ff.writeFile(n, await fetchFile(items[i].file));
        names.push(n);
      }
      const inputs = names.flatMap((n) => ["-i", n]);
      const filter = `${names.map((_, i) => `[${i}:a]`).join("")}concat=n=${names.length}:v=0:a=1[out]`;
      const code = await ff.exec([...inputs, "-filter_complex", filter, "-map", "[out]", "-c:a", "libmp3lame", "-b:a", bitrate, "out.mp3"]);
      if (code !== 0) throw new Error("FFmpeg exit " + code);
      const data = await ff.readFile("out.mp3");
      const blob = new Blob([data as BlobPart], { type: "audio/mpeg" });
      if (cleanup.current) URL.revokeObjectURL(cleanup.current);
      const url = URL.createObjectURL(blob);
      cleanup.current = url;
      setOutUrl(url); setOutSize(blob.size);
      try { for (const n of names) await ff.deleteFile(n); await ff.deleteFile("out.mp3"); } catch {}
    } catch (e) { setError(`Merge failed: ${(e as Error).message}`); }
    finally { setPhase("idle"); }
  }

  const busy = phase !== "idle";

  return (
    <div className="space-y-4">
      <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-amber-300 bg-amber-50/40 px-6 py-10 text-center transition-colors hover:brightness-95">
        <Upload className="h-7 w-7 text-amber-600" />
        <span className="mt-2 font-medium text-ink-900">Add audio files</span>
        <span className="mt-0.5 text-xs text-ink-400">MP3 · WAV · M4A · FLAC · OGG — drag to set the order</span>
        <input type="file" accept="audio/*,.mp3,.wav,.m4a,.aac,.flac,.ogg,.opus" multiple className="hidden" onChange={(e) => add(e.target.files)} />
      </label>

      {items.length > 0 && (
        <ul className="space-y-2">
          {items.map((e, i) => (
            <li key={e.id} draggable onDragStart={() => { dragIndex.current = i; }} onDragOver={(ev) => ev.preventDefault()}
              onDrop={() => { if (dragIndex.current !== null && dragIndex.current !== i) move(dragIndex.current, i); dragIndex.current = null; }}
              className="flex items-center gap-3 rounded-lg border border-ink-100 bg-white px-3 py-2">
              <GripVertical className="h-4 w-4 cursor-grab text-ink-300" />
              <span className="grid h-6 w-6 place-items-center rounded bg-amber-50 text-xs font-bold text-amber-700">{i + 1}</span>
              <span className="flex-1 truncate text-sm text-ink-800">{e.file.name}</span>
              <span className="text-xs text-ink-400">{formatBytes(e.file.size)}</span>
              <button onClick={() => remove(e.id)} className="rounded p-1 text-ink-400 hover:bg-ink-50 hover:text-red-600"><X className="h-3.5 w-3.5" /></button>
            </li>
          ))}
        </ul>
      )}

      {items.length > 0 && (
        <label className="flex items-center gap-2 text-sm text-ink-600">Output bitrate
          <select value={bitrate} onChange={(e) => setBitrate(e.target.value)} className="rounded-md border border-ink-200 bg-white px-2 py-1 text-sm">
            {["128k", "192k", "256k", "320k"].map((b) => <option key={b} value={b}>{b}</option>)}
          </select>
        </label>
      )}

      {busy && (
        <div className="flex items-center gap-3 rounded-lg border border-ink-100 bg-white px-4 py-3">
          <Loader2 className="h-4 w-4 animate-spin text-brand-500" />
          <span className="text-sm text-ink-700">{phase === "loading" ? "Loading FFmpeg (~30 MB, first time only)…" : "Merging…"}</span>
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        <Button onClick={merge} disabled={items.length < 2 || busy} size="lg">
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          {busy ? "Merging…" : `Merge ${items.length || ""} files`}
        </Button>
        {outUrl && (
          <a href={outUrl} download="merged.mp3">
            <Button size="lg" variant="outline"><Download className="h-4 w-4" /> Download MP3 · {formatBytes(outSize)}</Button>
          </a>
        )}
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}
      <p className="text-xs text-ink-400">Merged 100% in your browser via FFmpeg.wasm — your files are never uploaded.</p>
    </div>
  );
}
