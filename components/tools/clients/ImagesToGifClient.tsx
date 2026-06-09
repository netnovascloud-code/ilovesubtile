"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Download, X, Loader2, Upload, Trash2, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatBytes } from "@/lib/utils";

// Build an animated GIF from a sequence of images. We use gif.js (loaded from
// esm.sh on first export) — it runs the LZW encoding in a Web Worker so the
// UI stays responsive even with 20+ frames. Output stays purely in the
// browser, never uploaded.
//
// gif.js types from the @types package would add a dep; we narrow what we
// actually call instead.
type GifEncoder = {
  addFrame(canvas: HTMLCanvasElement, opts?: { delay?: number; copy?: boolean }): void;
  on(event: "finished" | "progress", cb: (arg: Blob | number) => void): void;
  render(): void;
};

type Frame = { id: string; file: File; url: string };

const ROW = (cols: string[]) => cols.join(" ");

export function ImagesToGifClient() {
  const [frames, setFrames] = useState<Frame[]>([]);
  const [delayMs, setDelayMs] = useState(400);
  const [size, setSize] = useState(480);                  // longest side, px
  const [loop, setLoop] = useState(true);
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [out, setOut] = useState<{ url: string; size: number } | null>(null);
  const dragIdx = useRef<number | null>(null);

  // Revoke object URLs only on unmount. Keying this on [frames, out] previously
  // revoked every frame's URL on each add/remove/reorder, breaking the surviving
  // thumbnails. A ref holds the latest set so we revoke exactly once at the end.
  const cleanupRef = useRef({ frames, out });
  cleanupRef.current = { frames, out };
  useEffect(() => () => {
    cleanupRef.current.frames.forEach((f) => URL.revokeObjectURL(f.url));
    if (cleanupRef.current.out) URL.revokeObjectURL(cleanupRef.current.out.url);
  }, []);

  const onFiles = (files: FileList | null) => {
    if (!files) return;
    const incoming: Frame[] = [];
    for (const f of Array.from(files)) {
      if (!f.type.startsWith("image/")) continue;
      incoming.push({ id: crypto.randomUUID(), file: f, url: URL.createObjectURL(f) });
    }
    setFrames((prev) => [...prev, ...incoming]);
    setError(null);
  };

  const move = (from: number, to: number) => {
    if (from === to) return;
    setFrames((p) => { const c = p.slice(); const [it] = c.splice(from, 1); c.splice(to, 0, it); return c; });
  };
  const remove = (i: number) => setFrames((p) => p.filter((_, idx) => idx !== i));

  const buildGif = useCallback(async () => {
    if (frames.length < 2) { setError("Add at least 2 images."); return; }
    setBusy(true); setError(null); setProgress(0);
    try {
      // Pre-load every image so we know its dimensions before sizing the canvas.
      const imgs = await Promise.all(frames.map((f) => loadImage(f.url)));
      const targetW = size;
      // Scale every frame to fit `size` on the longest side, then center on
      // a canvas matching the FIRST frame's aspect — gif.js requires every
      // frame to have the same dimensions.
      const first = imgs[0];
      const ratio = first.naturalWidth / first.naturalHeight;
      const W = Math.round(ratio >= 1 ? targetW : targetW * ratio);
      const H = Math.round(ratio >= 1 ? targetW / ratio : targetW);

      const url = "https://esm.sh/gif.js@0.2.0";
      const workerUrl = "https://esm.sh/gif.js@0.2.0/dist/gif.worker.js";
      // gif.js does `new Worker(workerScript)`; the browser rejects a
      // cross-origin worker URL (esm.sh) with "cannot be accessed from origin".
      // Fetch the worker script and hand gif.js a same-origin blob: URL.
      const workerScript = URL.createObjectURL(await (await fetch(workerUrl)).blob());
      // gif.js publishes a CommonJS module; the .default carries the constructor.
      const mod = await import(/* webpackIgnore: true */ url) as { default: new (opts: object) => GifEncoder };
      const GIFCtor = mod.default;
      const gif = new GIFCtor({
        workers: 2, quality: 10, repeat: loop ? 0 : -1,
        width: W, height: H, workerScript,
      });

      for (const im of imgs) {
        const c = document.createElement("canvas");
        c.width = W; c.height = H;
        const ctx = c.getContext("2d")!;
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, W, H);
        // Fit (object-fit:contain) — never crop, fill the rest with white.
        const r2 = im.naturalWidth / im.naturalHeight;
        let dw = W, dh = H, dx = 0, dy = 0;
        if (r2 > W / H) { dh = W / r2; dy = (H - dh) / 2; }
        else { dw = H * r2; dx = (W - dw) / 2; }
        ctx.drawImage(im, dx, dy, dw, dh);
        gif.addFrame(c, { delay: delayMs, copy: true });
      }

      gif.on("progress", (p) => setProgress(typeof p === "number" ? p : 0));
      gif.on("finished", (blob) => {
        const b = blob as Blob;
        if (out) URL.revokeObjectURL(out.url);
        setOut({ url: URL.createObjectURL(b), size: b.size });
        URL.revokeObjectURL(workerScript);
        setBusy(false);
      });
      gif.render();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not build GIF.");
      setBusy(false);
    }
  }, [frames, delayMs, size, loop, out]);

  const reset = () => {
    frames.forEach((f) => URL.revokeObjectURL(f.url));
    if (out) URL.revokeObjectURL(out.url);
    setFrames([]); setOut(null); setError(null); setProgress(0);
  };

  if (!frames.length) {
    return (
      <label className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-ink-200 bg-ink-50/40 px-6 py-16 text-center transition hover:border-brand-400">
        <Upload className="h-8 w-8 text-ink-400" />
        <div className="text-base font-semibold text-ink-900">Drop 2 or more images</div>
        <div className="text-sm text-ink-500">JPG, PNG, WebP — every frame stays on your device.</div>
        <input type="file" accept="image/*" multiple className="sr-only" onChange={(e) => onFiles(e.target.files)} />
        <span className="mt-2 rounded-lg bg-brand-500 px-4 py-2 text-sm font-semibold text-white">Choose images</span>
      </label>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-3">
        <div className="text-sm text-ink-700">{frames.length} frame{frames.length === 1 ? "" : "s"}</div>
        <div className="flex items-center gap-2">
          <label className="inline-flex cursor-pointer items-center gap-1 rounded-md border border-ink-200 bg-white px-3 py-1.5 text-xs font-medium text-ink-700 hover:border-brand-300">
            <Upload className="h-3.5 w-3.5" /> Add more
            <input type="file" accept="image/*" multiple className="sr-only" onChange={(e) => onFiles(e.target.files)} />
          </label>
          <Button variant="ghost" size="sm" onClick={reset}><X className="h-4 w-4" /></Button>
        </div>
      </div>

      <ul className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
        {frames.map((f, i) => (
          <li key={f.id}
            draggable
            onDragStart={() => { dragIdx.current = i; }}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => { if (dragIdx.current !== null) move(dragIdx.current, i); dragIdx.current = null; }}
            className="group relative cursor-move rounded-lg border border-ink-200 bg-white p-1.5 shadow-sm hover:border-brand-300">
            <button onClick={() => remove(i)} className="absolute right-1 top-1 z-10 grid h-6 w-6 place-items-center rounded bg-white/90 text-red-600 opacity-0 shadow ring-1 ring-ink-200 transition-opacity hover:bg-red-50 group-hover:opacity-100" title="Remove">
              <Trash2 className="h-3.5 w-3.5" />
            </button>
            <img src={f.url} alt={`frame ${i + 1}`} className="mx-auto block max-h-28 w-auto" />
            <div className="mt-1 flex items-center justify-between text-[10px] text-ink-500">
              <GripVertical className="h-3 w-3" />
              <span>#{i + 1}</span>
            </div>
          </li>
        ))}
      </ul>

      <div className="grid gap-4 sm:grid-cols-3">
        <label className="flex flex-col text-xs font-medium text-ink-600">
          Frame delay {delayMs} ms
          <input type="range" min={50} max={2000} step={50} value={delayMs} onChange={(e) => setDelayMs(Number(e.target.value))} className="accent-brand-500" />
        </label>
        <label className="flex flex-col text-xs font-medium text-ink-600">
          Longest side {size}px
          <input type="range" min={120} max={1080} step={20} value={size} onChange={(e) => setSize(Number(e.target.value))} className="accent-brand-500" />
        </label>
        <label className="mt-5 inline-flex items-center gap-2 text-sm text-ink-700">
          <input type="checkbox" checked={loop} onChange={(e) => setLoop(e.target.checked)} className="h-4 w-4" />
          Loop forever
        </label>
      </div>

      {busy && (
        <div className="space-y-2 rounded-lg border border-ink-100 bg-ink-50/40 p-3 text-sm text-ink-600">
          <div className="flex items-center gap-2"><Loader2 className="h-4 w-4 animate-spin" />Encoding GIF…</div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-ink-200">
            <div className="h-full bg-brand-500 transition-all" style={{ width: `${Math.round(progress * 100)}%` }} />
          </div>
        </div>
      )}

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex flex-wrap gap-2">
        <Button onClick={buildGif} disabled={busy || frames.length < 2}>
          {busy ? "Encoding…" : `Build GIF (${frames.length} frames)`}
        </Button>
        {out && (
          <a href={out.url} download={`animation-${Date.now()}.gif`}
            className="inline-flex items-center gap-2 rounded-lg border border-brand-200 bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700 hover:bg-brand-100">
            <Download className="h-4 w-4" /> Download ({formatBytes(out.size)})
          </a>
        )}
      </div>

      {out && (
        <div className="rounded-lg border border-ink-100 bg-ink-50/40 p-3">
          <img src={out.url} alt="preview" className="mx-auto block max-h-64" />
        </div>
      )}

      <p className="text-xs text-ink-400">Drag a thumbnail to reorder frames. Encoding runs entirely in your browser — your images are never uploaded.</p>
    </div>
  );
}

function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((res, rej) => {
    const i = new Image();
    i.onload = () => res(i);
    i.onerror = () => rej(new Error("could not decode image"));
    i.src = url;
  });
}
