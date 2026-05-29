"use client";

import { useEffect, useRef, useState } from "react";
import { Upload, X, Download, Loader2, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatBytes } from "@/lib/utils";

type Adj = { brightness: number; contrast: number; saturation: number; hue: number };
const DEFAULTS: Adj = { brightness: 100, contrast: 100, saturation: 100, hue: 0 };

export function AdjustImageClient() {
  const [file, setFile] = useState<File | null>(null);
  const [bmp, setBmp] = useState<ImageBitmap | null>(null);
  const [adj, setAdj] = useState<Adj>(DEFAULTS);
  const [busy, setBusy] = useState(false);
  const [outUrl, setOutUrl] = useState<string | null>(null);
  const [outSize, setOutSize] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const cleanup = useRef<string | null>(null);

  useEffect(() => () => {
    if (cleanup.current) URL.revokeObjectURL(cleanup.current);
    if (bmp) bmp.close();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function pick(f: File | null) {
    if (!f) return;
    setError(null);
    setFile(f);
    try {
      const b = await createImageBitmap(f);
      if (bmp) bmp.close();
      setBmp(b);
    } catch (e) {
      setError(`Could not read this image: ${(e as Error).message}`);
    }
  }

  // Re-render on adjustment change. Canvas filter handles all 4 in one pass.
  useEffect(() => {
    if (!bmp || !canvasRef.current) return;
    const canvas = canvasRef.current;
    canvas.width = bmp.width; canvas.height = bmp.height;
    const ctx = canvas.getContext("2d")!;
    ctx.filter = `brightness(${adj.brightness}%) contrast(${adj.contrast}%) saturate(${adj.saturation}%) hue-rotate(${adj.hue}deg)`;
    ctx.drawImage(bmp, 0, 0);
  }, [bmp, adj]);

  async function exportImage() {
    if (!canvasRef.current || !file) return;
    setBusy(true);
    try {
      const type = file.type === "image/jpeg" ? "image/jpeg" : "image/png";
      const blob: Blob = await new Promise((res, rej) =>
        canvasRef.current!.toBlob((b) => (b ? res(b) : rej(new Error("blob_failed"))), type, 0.95),
      );
      if (cleanup.current) URL.revokeObjectURL(cleanup.current);
      const url = URL.createObjectURL(blob);
      cleanup.current = url;
      setOutUrl(url); setOutSize(blob.size);
    } catch (e) {
      setError(`Could not export: ${(e as Error).message}`);
    } finally {
      setBusy(false);
    }
  }

  function reset() { setAdj(DEFAULTS); }
  const dirty = JSON.stringify(adj) !== JSON.stringify(DEFAULTS);

  const downloadName = file ? file.name.replace(/(\.[^.]+)?$/, "-adjusted$1") : "adjusted.png";

  return (
    <div className="space-y-5">
      {!file ? (
        <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-amber-300 bg-amber-50/40 px-6 py-12 text-center transition-colors hover:brightness-95">
          <Upload className="h-7 w-7 text-amber-600" />
          <span className="mt-2 font-medium text-ink-900">Upload an image</span>
          <span className="mt-0.5 text-xs text-ink-400">JPG, PNG or WebP — adjusted in your browser</span>
          <input type="file" accept="image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp" className="hidden" onChange={(e) => pick(e.target.files?.[0] ?? null)} />
        </label>
      ) : (
        <div className="flex items-center justify-between rounded-lg border border-ink-100 bg-white px-4 py-2.5 text-sm">
          <div className="min-w-0 truncate"><span className="font-medium text-ink-900">{file.name}</span><span className="ml-2 text-ink-400">{formatBytes(file.size)}</span></div>
          <button onClick={() => { setFile(null); setBmp(null); setOutUrl(null); }} className="rounded p-1 text-ink-400 hover:bg-ink-50 hover:text-ink-700"><X className="h-3.5 w-3.5" /></button>
        </div>
      )}

      {bmp && (
        <>
          <div className="rounded-lg border border-ink-100 bg-[repeating-conic-gradient(#f3f4f6_0_25%,#fff_0_50%)] bg-[length:16px_16px] p-3">
            <canvas ref={canvasRef} className="mx-auto block max-h-96 max-w-full object-contain" />
          </div>

          <div className="grid gap-3 rounded-lg border border-ink-100 bg-white p-4 sm:grid-cols-2">
            <Slider label={`Brightness: ${adj.brightness}%`} min={0} max={200} value={adj.brightness} onChange={(v) => setAdj((a) => ({ ...a, brightness: v }))} />
            <Slider label={`Contrast: ${adj.contrast}%`} min={0} max={200} value={adj.contrast} onChange={(v) => setAdj((a) => ({ ...a, contrast: v }))} />
            <Slider label={`Saturation: ${adj.saturation}%`} min={0} max={200} value={adj.saturation} onChange={(v) => setAdj((a) => ({ ...a, saturation: v }))} />
            <Slider label={`Hue: ${adj.hue}°`} min={-180} max={180} value={adj.hue} onChange={(v) => setAdj((a) => ({ ...a, hue: v }))} />
          </div>

          <div className="flex flex-wrap gap-2">
            <Button size="lg" onClick={exportImage} disabled={busy}>
              {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
              Export
            </Button>
            {dirty && (
              <Button size="lg" variant="outline" onClick={reset}>
                <RotateCcw className="h-4 w-4" /> Reset
              </Button>
            )}
            {outUrl && (
              <a href={outUrl} download={downloadName}>
                <Button size="lg" variant="outline"><Download className="h-4 w-4" /> Download · {formatBytes(outSize)}</Button>
              </a>
            )}
          </div>
        </>
      )}

      {error && <p className="text-sm text-red-600">{error}</p>}
      <p className="text-xs text-ink-400">100% in your browser via Canvas — your image is never uploaded.</p>
    </div>
  );
}

function Slider({ label, min, max, value, onChange }: { label: string; min: number; max: number; value: number; onChange: (v: number) => void }) {
  return (
    <label className="flex flex-col text-xs font-medium text-ink-600">
      {label}
      <input type="range" min={min} max={max} value={value} onChange={(e) => onChange(Number(e.target.value))} className="mt-1" />
    </label>
  );
}
