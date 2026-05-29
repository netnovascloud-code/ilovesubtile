"use client";

import { useState } from "react";
import { Upload, X, Copy, Check } from "lucide-react";
import { formatBytes } from "@/lib/utils";

type Swatch = { hex: string; rgb: string; hsl: string; count: number };

function rgbToHsl(r: number, g: number, b: number): string {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    h = max === r ? (g - b) / d + (g < b ? 6 : 0) : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
    h /= 6;
  }
  return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
}
const hex2 = (n: number) => n.toString(16).padStart(2, "0");

/** Frequency-quantised palette: bucket each pixel to a 32-level grid, count, take the top 5. */
function extractPalette(data: Uint8ClampedArray): Swatch[] {
  const buckets = new Map<string, { r: number; g: number; b: number; count: number }>();
  const step = 4 * 4; // sample every 4th pixel for speed
  for (let i = 0; i < data.length; i += step) {
    const a = data[i + 3];
    if (a < 128) continue; // skip transparent
    const r = data[i], g = data[i + 1], b = data[i + 2];
    const key = `${r >> 5}-${g >> 5}-${b >> 5}`;
    const cur = buckets.get(key);
    if (cur) { cur.r += r; cur.g += g; cur.b += b; cur.count++; }
    else buckets.set(key, { r, g, b, count: 1 });
  }
  return [...buckets.values()]
    .sort((x, y) => y.count - x.count)
    .slice(0, 5)
    .map((c) => {
      const r = Math.round(c.r / c.count), g = Math.round(c.g / c.count), b = Math.round(c.b / c.count);
      return { hex: `#${hex2(r)}${hex2(g)}${hex2(b)}`, rgb: `rgb(${r}, ${g}, ${b})`, hsl: rgbToHsl(r, g, b), count: c.count };
    });
}

export function ExtractColorsClient() {
  const [file, setFile] = useState<File | null>(null);
  const [srcUrl, setSrcUrl] = useState<string | null>(null);
  const [palette, setPalette] = useState<Swatch[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  async function pick(f: File | null) {
    if (!f) return;
    setError(null); setPalette(null);
    setFile(f);
    setSrcUrl(URL.createObjectURL(f));
    try {
      const bmp = await createImageBitmap(f);
      const max = 160;
      const scale = Math.min(1, max / Math.max(bmp.width, bmp.height));
      const canvas = document.createElement("canvas");
      canvas.width = Math.max(1, Math.round(bmp.width * scale));
      canvas.height = Math.max(1, Math.round(bmp.height * scale));
      const ctx = canvas.getContext("2d", { willReadFrequently: true })!;
      ctx.drawImage(bmp, 0, 0, canvas.width, canvas.height);
      bmp.close();
      const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height);
      setPalette(extractPalette(data));
    } catch (e) {
      setError(`Could not read the image: ${(e as Error).message}`);
    }
  }

  async function copy(v: string) {
    try { await navigator.clipboard.writeText(v); setCopied(v); setTimeout(() => setCopied((c) => (c === v ? null : c)), 1000); } catch {}
  }

  return (
    <div className="space-y-5">
      {!file ? (
        <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-amber-300 bg-amber-50/40 px-6 py-12 text-center transition-colors hover:brightness-95">
          <Upload className="h-7 w-7 text-amber-600" />
          <span className="mt-2 font-medium text-ink-900">Upload an image</span>
          <span className="mt-0.5 text-xs text-ink-400">We extract the 5 dominant colours — entirely in your browser</span>
          <input type="file" accept="image/*" className="hidden" onChange={(e) => pick(e.target.files?.[0] ?? null)} />
        </label>
      ) : (
        <div className="flex items-center justify-between rounded-lg border border-ink-100 bg-white px-4 py-2.5 text-sm">
          <div className="min-w-0 truncate"><span className="font-medium text-ink-900">{file.name}</span><span className="ml-2 text-ink-400">{formatBytes(file.size)}</span></div>
          <button onClick={() => { setFile(null); setSrcUrl(null); setPalette(null); }} className="rounded p-1 text-ink-400 hover:bg-ink-50 hover:text-ink-700"><X className="h-3.5 w-3.5" /></button>
        </div>
      )}

      {srcUrl && (
        <div className="overflow-hidden rounded-lg border border-ink-100 bg-white p-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={srcUrl} alt="Source" className="mx-auto max-h-64 rounded object-contain" />
        </div>
      )}

      {palette && (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {palette.map((s) => (
            <div key={s.hex} className="overflow-hidden rounded-lg border border-ink-100 bg-white">
              <div className="h-20" style={{ backgroundColor: s.hex }} />
              <div className="space-y-1 p-3 text-xs">
                {[s.hex, s.rgb, s.hsl].map((v) => (
                  <button key={v} onClick={() => copy(v)} className="flex w-full items-center justify-between gap-2 rounded px-1 py-0.5 font-mono text-ink-700 hover:bg-ink-50">
                    <span className="truncate">{v}</span>
                    {copied === v ? <Check className="h-3 w-3 shrink-0 text-emerald-600" /> : <Copy className="h-3 w-3 shrink-0 text-ink-300" />}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {error && <p className="text-sm text-red-600">{error}</p>}
      <p className="text-xs text-ink-400">100% in your browser via Canvas — your image is never uploaded.</p>
    </div>
  );
}
