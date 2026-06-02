"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Download, X, Loader2, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MiniDrop } from "@/components/tools/MiniDrop";
import { formatBytes } from "@/lib/utils";

// One-click image enhancement — brightness, contrast and saturation bumps
// plus a subtle sharpen, all via the native canvas filter pipeline. No
// dependencies, runs entirely in the browser.
export function EnhanceImageClient() {
  const [file, setFile] = useState<File | null>(null);
  const [src, setSrc] = useState<HTMLImageElement | null>(null);
  const [out, setOut] = useState<{ url: string; size: number } | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Defaults tuned for "looks better straight away" — matches the iLoveIMG
  // one-click feel. Users can still nudge each slider.
  const [brightness, setBrightness] = useState(105);
  const [contrast, setContrast] = useState(115);
  const [saturate, setSaturate] = useState(120);
  const [sharpen, setSharpen] = useState(true);

  const previewRef = useRef<HTMLCanvasElement | null>(null);

  const onFile = useCallback((f: File) => {
    setError(null); setOut(null);
    const url = URL.createObjectURL(f);
    const img = new Image();
    img.onload = () => { setFile(f); setSrc(img); URL.revokeObjectURL(url); };
    img.onerror = () => { setError("Could not read this image."); URL.revokeObjectURL(url); };
    img.src = url;
  }, []);

  // Live preview redraws whenever the sliders move.
  useEffect(() => {
    if (!src || !previewRef.current) return;
    const c = previewRef.current;
    const maxSide = 720;
    const scale = Math.min(1, maxSide / Math.max(src.naturalWidth, src.naturalHeight));
    c.width = Math.round(src.naturalWidth * scale);
    c.height = Math.round(src.naturalHeight * scale);
    const ctx = c.getContext("2d")!;
    ctx.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturate}%)`;
    ctx.drawImage(src, 0, 0, c.width, c.height);
    if (sharpen) applyUnsharpMask(ctx, c.width, c.height);
  }, [src, brightness, contrast, saturate, sharpen]);

  const run = useCallback(async () => {
    if (!src || !file) return;
    setBusy(true); setError(null);
    try {
      const c = document.createElement("canvas");
      c.width = src.naturalWidth;
      c.height = src.naturalHeight;
      const ctx = c.getContext("2d")!;
      ctx.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturate}%)`;
      ctx.drawImage(src, 0, 0);
      if (sharpen) applyUnsharpMask(ctx, c.width, c.height);
      const mime = file.type.startsWith("image/png") ? "image/png" : "image/jpeg";
      const blob: Blob = await new Promise((res, rej) =>
        c.toBlob((b) => (b ? res(b) : rej(new Error("encoding failed"))), mime, 0.94),
      );
      if (out) URL.revokeObjectURL(out.url);
      setOut({ url: URL.createObjectURL(blob), size: blob.size });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not enhance image.");
    } finally {
      setBusy(false);
    }
  }, [src, file, brightness, contrast, saturate, sharpen, out]);

  const reset = () => {
    if (out) URL.revokeObjectURL(out.url);
    setFile(null); setSrc(null); setOut(null); setError(null);
    setBrightness(105); setContrast(115); setSaturate(120); setSharpen(true);
  };

  if (!file) {
    return (
      <MiniDrop
        label="Drop your image (JPG, PNG, WebP)"
        accept={{ "image/jpeg": [".jpg", ".jpeg"], "image/png": [".png"], "image/webp": [".webp"] }}
        icon={<ImageIcon className="h-5 w-5" />}
        onFile={onFile}
        current={null}
        hint="Your image is processed entirely in your browser — never uploaded."
      />
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0 truncate text-sm text-ink-700">{file.name}</div>
        <Button variant="ghost" size="sm" onClick={reset}><X className="h-4 w-4" /></Button>
      </div>

      <div className="rounded-lg border border-ink-100 bg-ink-50/40 p-3">
        <canvas ref={previewRef} className="mx-auto max-h-[440px] w-auto rounded" />
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Slider label={`Brightness ${brightness}%`} value={brightness} min={50} max={200} onChange={setBrightness} />
        <Slider label={`Contrast ${contrast}%`} value={contrast} min={50} max={200} onChange={setContrast} />
        <Slider label={`Saturation ${saturate}%`} value={saturate} min={0} max={200} onChange={setSaturate} />
      </div>

      <label className="inline-flex items-center gap-2 text-sm text-ink-700">
        <input type="checkbox" checked={sharpen} onChange={(e) => setSharpen(e.target.checked)} className="h-4 w-4" />
        Apply subtle sharpen
      </label>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex flex-wrap gap-2">
        <Button onClick={run} disabled={busy}>
          {busy ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Enhancing…</> : "Enhance image"}
        </Button>
        {out && (
          <a href={out.url} download={`enhanced-${file.name}`}
            className="inline-flex items-center gap-2 rounded-lg border border-brand-200 bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700 hover:bg-brand-100">
            <Download className="h-4 w-4" /> Download ({formatBytes(out.size)})
          </a>
        )}
      </div>
    </div>
  );
}

function Slider({ label, value, min, max, onChange }: { label: string; value: number; min: number; max: number; onChange: (n: number) => void }) {
  return (
    <label className="flex flex-col gap-1 text-xs font-medium text-ink-600">
      {label}
      <input type="range" min={min} max={max} value={value} onChange={(e) => onChange(Number(e.target.value))} className="accent-brand-500" />
    </label>
  );
}

// Light unsharp mask via a 3x3 convolution kernel. Keeps natural skin tones
// while bringing out edge detail — much subtler than canvas' built-in blur
// trick (which over-sharpens).
function applyUnsharpMask(ctx: CanvasRenderingContext2D, w: number, h: number) {
  const src = ctx.getImageData(0, 0, w, h);
  const dst = ctx.createImageData(w, h);
  const d = src.data, o = dst.data;
  const kernel = [0, -0.25, 0, -0.25, 2, -0.25, 0, -0.25, 0];
  for (let y = 1; y < h - 1; y++) {
    for (let x = 1; x < w - 1; x++) {
      for (let c = 0; c < 3; c++) {
        let v = 0;
        for (let ky = -1; ky <= 1; ky++) {
          for (let kx = -1; kx <= 1; kx++) {
            v += d[((y + ky) * w + (x + kx)) * 4 + c] * kernel[(ky + 1) * 3 + (kx + 1)];
          }
        }
        o[(y * w + x) * 4 + c] = Math.max(0, Math.min(255, v));
      }
      o[(y * w + x) * 4 + 3] = 255;
    }
  }
  ctx.putImageData(dst, 0, 0);
}
