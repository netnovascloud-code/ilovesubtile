"use client";

import { useEffect, useRef, useState } from "react";
import { Upload, X, Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatBytes } from "@/lib/utils";

type Pos = "center" | "bottom-right" | "bottom-left" | "top-right" | "top-left" | "tiled";

export function WatermarkImageClient() {
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState("© Konvertools");
  const [color, setColor] = useState("#ffffff");
  const [opacity, setOpacity] = useState(0.5);
  const [sizePct, setSizePct] = useState(6);
  const [pos, setPos] = useState<Pos>("bottom-right");
  const [outUrl, setOutUrl] = useState<string | null>(null);
  const [outSize, setOutSize] = useState(0);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const cleanup = useRef<string | null>(null);

  useEffect(() => () => { if (cleanup.current) URL.revokeObjectURL(cleanup.current); }, []);

  async function run(f: File) {
    setBusy(true); setError(null); setOutUrl(null);
    try {
      const bmp = await createImageBitmap(f);
      const canvas = document.createElement("canvas");
      canvas.width = bmp.width; canvas.height = bmp.height;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(bmp, 0, 0);
      bmp.close();

      const fontPx = Math.max(10, Math.round((sizePct / 100) * canvas.width));
      ctx.font = `bold ${fontPx}px sans-serif`;
      ctx.fillStyle = color;
      ctx.globalAlpha = opacity;
      ctx.textBaseline = "middle";
      const m = ctx.measureText(text);
      const pad = fontPx * 0.6;

      if (pos === "tiled") {
        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate(-Math.PI / 6);
        ctx.textAlign = "center";
        const stepX = m.width + fontPx * 3;
        const stepY = fontPx * 3;
        for (let y = -canvas.height; y < canvas.height; y += stepY) {
          for (let x = -canvas.width; x < canvas.width; x += stepX) {
            ctx.fillText(text, x, y);
          }
        }
        ctx.restore();
      } else {
        ctx.textAlign = "left";
        let x = pad, y = canvas.height - pad - fontPx / 2;
        if (pos === "center") { x = (canvas.width - m.width) / 2; y = canvas.height / 2; }
        else {
          if (pos.endsWith("right")) x = canvas.width - m.width - pad;
          if (pos.startsWith("top")) y = pad + fontPx / 2;
        }
        ctx.fillText(text, x, y);
      }
      ctx.globalAlpha = 1;

      const out: Blob = await new Promise((res) => canvas.toBlob((b) => res(b!), f.type === "image/jpeg" ? "image/jpeg" : "image/png", 0.95));
      if (cleanup.current) URL.revokeObjectURL(cleanup.current);
      const url = URL.createObjectURL(out);
      cleanup.current = url;
      setOutUrl(url); setOutSize(out.size);
    } catch (e) {
      setError(`Could not watermark the image: ${(e as Error).message}`);
    } finally {
      setBusy(false);
    }
  }

  function pick(f: File | null) { if (!f) return; setFile(f); run(f); }
  function rerun() { if (file) run(file); }

  return (
    <div className="space-y-4">
      {!file ? (
        <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-amber-300 bg-amber-50/40 px-6 py-12 text-center transition-colors hover:brightness-95">
          <Upload className="h-7 w-7 text-amber-600" />
          <span className="mt-2 font-medium text-ink-900">Upload an image</span>
          <span className="mt-0.5 text-xs text-ink-400">JPG, PNG or WebP — a text watermark is burned in, in your browser</span>
          <input type="file" accept="image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp" className="hidden" onChange={(e) => pick(e.target.files?.[0] ?? null)} />
        </label>
      ) : (
        <div className="flex items-center justify-between rounded-lg border border-ink-100 bg-white px-4 py-2.5 text-sm">
          <div className="min-w-0 truncate"><span className="font-medium text-ink-900">{file.name}</span><span className="ml-2 text-ink-400">{formatBytes(file.size)}</span></div>
          <button onClick={() => { setFile(null); setOutUrl(null); }} className="rounded p-1 text-ink-400 hover:bg-ink-50 hover:text-ink-700"><X className="h-3.5 w-3.5" /></button>
        </div>
      )}

      {file && (
        <div className="grid gap-3 rounded-lg border border-ink-100 bg-white p-4 sm:grid-cols-2">
          <label className="flex flex-col text-xs font-medium text-ink-600 sm:col-span-2">
            Watermark text
            <input value={text} onChange={(e) => setText(e.target.value)} onBlur={rerun} className="mt-1 rounded-md border border-ink-200 px-3 py-2 text-sm" />
          </label>
          <label className="flex flex-col text-xs font-medium text-ink-600">
            Position
            <select value={pos} onChange={(e) => { setPos(e.target.value as Pos); }} onBlur={rerun} className="mt-1 rounded-md border border-ink-200 px-2 py-1.5 text-sm">
              <option value="bottom-right">Bottom right</option><option value="bottom-left">Bottom left</option>
              <option value="top-right">Top right</option><option value="top-left">Top left</option>
              <option value="center">Center</option><option value="tiled">Tiled</option>
            </select>
          </label>
          <label className="flex items-center gap-2 text-xs font-medium text-ink-600">
            Colour <input type="color" value={color} onChange={(e) => setColor(e.target.value)} onBlur={rerun} className="h-7 w-10 cursor-pointer rounded border-0 bg-transparent p-0" />
          </label>
          <label className="flex flex-col text-xs font-medium text-ink-600">
            Opacity: {Math.round(opacity * 100)}%
            <input type="range" min={10} max={100} value={opacity * 100} onChange={(e) => setOpacity(Number(e.target.value) / 100)} onMouseUp={rerun} onTouchEnd={rerun} className="mt-1" />
          </label>
          <label className="flex flex-col text-xs font-medium text-ink-600">
            Size: {sizePct}% of width
            <input type="range" min={2} max={20} value={sizePct} onChange={(e) => setSizePct(Number(e.target.value))} onMouseUp={rerun} onTouchEnd={rerun} className="mt-1" />
          </label>
          <div className="sm:col-span-2">
            <Button size="sm" variant="outline" onClick={rerun}>Apply changes</Button>
          </div>
        </div>
      )}

      {busy && <p className="flex items-center gap-2 text-sm text-ink-500"><Loader2 className="h-4 w-4 animate-spin" /> Rendering…</p>}

      {outUrl && (
        <div className="rounded-lg border border-ink-100 bg-white p-3">
          <p className="mb-2 text-sm font-medium text-ink-700">Result · {formatBytes(outSize)}</p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={outUrl} alt="Watermarked" className="max-h-96 w-full rounded object-contain" />
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        {outUrl && <a href={outUrl} download={file ? file.name.replace(/(\.[^.]+)?$/, "-watermarked$1") : "watermarked.png"}><Button size="lg"><Download className="h-4 w-4" /> Download</Button></a>}
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}
      <p className="text-xs text-ink-400">100% in your browser via Canvas — your image is never uploaded.</p>
    </div>
  );
}
