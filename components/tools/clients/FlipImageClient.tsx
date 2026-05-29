"use client";

import { useEffect, useRef, useState } from "react";
import { Upload, X, Download, FlipHorizontal, FlipVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatBytes } from "@/lib/utils";

type Mode = "horizontal" | "vertical" | "both";

export function FlipImageClient() {
  const [file, setFile] = useState<File | null>(null);
  const [mode, setMode] = useState<Mode>("horizontal");
  const [outUrl, setOutUrl] = useState<string | null>(null);
  const [outSize, setOutSize] = useState(0);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const cleanup = useRef<string | null>(null);

  useEffect(() => () => { if (cleanup.current) URL.revokeObjectURL(cleanup.current); }, []);

  async function flip(f: File, m: Mode) {
    setError(null); setBusy(true); setOutUrl(null);
    try {
      const bmp = await createImageBitmap(f);
      const canvas = document.createElement("canvas");
      canvas.width = bmp.width; canvas.height = bmp.height;
      const ctx = canvas.getContext("2d")!;
      ctx.save();
      const sx = m === "horizontal" || m === "both" ? -1 : 1;
      const sy = m === "vertical" || m === "both" ? -1 : 1;
      ctx.scale(sx, sy);
      ctx.drawImage(bmp, sx === -1 ? -bmp.width : 0, sy === -1 ? -bmp.height : 0);
      ctx.restore();
      bmp.close();
      const out: Blob = await new Promise((res) => canvas.toBlob((b) => res(b!), f.type || "image/png", 0.95));
      if (cleanup.current) URL.revokeObjectURL(cleanup.current);
      const url = URL.createObjectURL(out);
      cleanup.current = url;
      setOutUrl(url); setOutSize(out.size);
    } catch (e) {
      setError(`Could not flip the image: ${(e as Error).message}`);
    } finally {
      setBusy(false);
    }
  }

  function pick(f: File | null) {
    if (!f) return;
    setFile(f);
    flip(f, mode);
  }
  function setModeAndRerun(m: Mode) {
    setMode(m);
    if (file) flip(file, m);
  }

  const downloadName = file ? file.name.replace(/(\.[^.]+)?$/, `-flipped$1`) : "flipped.png";

  return (
    <div className="space-y-5">
      {!file ? (
        <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-amber-300 bg-amber-50/40 px-6 py-12 text-center transition-colors hover:brightness-95">
          <Upload className="h-7 w-7 text-amber-600" />
          <span className="mt-2 font-medium text-ink-900">Upload an image</span>
          <span className="mt-0.5 text-xs text-ink-400">JPG, PNG or WebP — flipped in your browser</span>
          <input type="file" accept="image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp" className="hidden" onChange={(e) => pick(e.target.files?.[0] ?? null)} />
        </label>
      ) : (
        <div className="flex items-center justify-between rounded-lg border border-ink-100 bg-white px-4 py-2.5">
          <div className="min-w-0 truncate text-sm">
            <span className="font-medium text-ink-900">{file.name}</span>
            <span className="ml-2 text-ink-400">{formatBytes(file.size)}</span>
          </div>
          <button onClick={() => { setFile(null); setOutUrl(null); }} className="rounded p-1 text-xs text-ink-400 hover:bg-ink-50 hover:text-ink-700"><X className="h-3.5 w-3.5" /></button>
        </div>
      )}

      {file && (
        <div className="inline-flex rounded-lg border border-ink-200 bg-white p-1">
          {([
            ["horizontal", "Horizontal", FlipHorizontal],
            ["vertical", "Vertical", FlipVertical],
            ["both", "Both", FlipHorizontal],
          ] as const).map(([id, label, Icon]) => (
            <button key={id} onClick={() => setModeAndRerun(id)}
              className={`flex items-center gap-1 rounded-md px-3 py-1.5 text-xs font-medium ${mode === id ? "bg-amber-500 text-white" : "text-ink-600 hover:text-ink-900"}`}>
              <Icon className="h-3.5 w-3.5" /> {label}
            </button>
          ))}
        </div>
      )}

      {outUrl && (
        <div className="rounded-lg border border-ink-100 bg-white p-3">
          <p className="mb-2 text-sm font-medium text-ink-700">Result · {formatBytes(outSize)}</p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={outUrl} alt="Flipped" className="max-h-96 w-full rounded object-contain" />
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        {outUrl && (
          <a href={outUrl} download={downloadName}>
            <Button size="lg"><Download className="h-4 w-4" /> Download</Button>
          </a>
        )}
      </div>

      {busy && <p className="text-sm text-ink-500">Flipping…</p>}
      {error && <p className="text-sm text-red-600">{error}</p>}
      <p className="text-xs text-ink-400">100% in your browser via Canvas — your image is never uploaded.</p>
    </div>
  );
}
