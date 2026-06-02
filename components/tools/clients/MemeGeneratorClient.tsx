"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Download, X, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MiniDrop } from "@/components/tools/MiniDrop";
import { formatBytes } from "@/lib/utils";

// Classic top/bottom-text meme maker. Live canvas preview, Impact-style
// white text with a black stroke, exports as PNG. No libs, no server.
export function MemeGeneratorClient() {
  const [file, setFile] = useState<File | null>(null);
  const [img, setImg] = useState<HTMLImageElement | null>(null);
  const [top, setTop] = useState("ONE DOES NOT SIMPLY");
  const [bottom, setBottom] = useState("WRITE A GREAT MEME");
  const [fontSize, setFontSize] = useState(60);
  const [out, setOut] = useState<{ url: string; size: number } | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const onFile = useCallback((f: File) => {
    const url = URL.createObjectURL(f);
    const i = new Image();
    i.onload = () => { setFile(f); setImg(i); URL.revokeObjectURL(url); };
    i.src = url;
  }, []);

  useEffect(() => {
    if (!img || !canvasRef.current) return;
    const c = canvasRef.current;
    const maxSide = 720;
    const scale = Math.min(1, maxSide / Math.max(img.naturalWidth, img.naturalHeight));
    c.width = Math.round(img.naturalWidth * scale);
    c.height = Math.round(img.naturalHeight * scale);
    drawMeme(c.getContext("2d")!, img, c.width, c.height, top, bottom, (fontSize * c.width) / 600);
  }, [img, top, bottom, fontSize]);

  const exportMeme = useCallback(async () => {
    if (!img) return;
    const c = document.createElement("canvas");
    c.width = img.naturalWidth; c.height = img.naturalHeight;
    drawMeme(c.getContext("2d")!, img, c.width, c.height, top, bottom, (fontSize * c.width) / 600);
    const blob: Blob = await new Promise((res) => c.toBlob((b) => res(b!), "image/png"));
    if (out) URL.revokeObjectURL(out.url);
    setOut({ url: URL.createObjectURL(blob), size: blob.size });
  }, [img, top, bottom, fontSize, out]);

  const reset = () => {
    if (out) URL.revokeObjectURL(out.url);
    setFile(null); setImg(null); setOut(null);
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
        <canvas ref={canvasRef} className="mx-auto max-h-[440px] w-auto rounded" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col text-xs font-medium text-ink-600">
          Top text
          <input value={top} onChange={(e) => setTop(e.target.value.toUpperCase())} maxLength={120}
            className="mt-1 rounded-md border border-ink-200 bg-white px-3 py-2 text-sm text-ink-900 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100" />
        </label>
        <label className="flex flex-col text-xs font-medium text-ink-600">
          Bottom text
          <input value={bottom} onChange={(e) => setBottom(e.target.value.toUpperCase())} maxLength={120}
            className="mt-1 rounded-md border border-ink-200 bg-white px-3 py-2 text-sm text-ink-900 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100" />
        </label>
      </div>

      <label className="flex flex-col gap-1 text-xs font-medium text-ink-600 sm:w-1/2">
        Text size {fontSize}px
        <input type="range" min={24} max={120} value={fontSize} onChange={(e) => setFontSize(Number(e.target.value))} className="accent-brand-500" />
      </label>

      <div className="flex flex-wrap gap-2">
        <Button onClick={exportMeme}>Generate meme</Button>
        {out && (
          <a href={out.url} download={`meme-${Date.now()}.png`}
            className="inline-flex items-center gap-2 rounded-lg border border-brand-200 bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700 hover:bg-brand-100">
            <Download className="h-4 w-4" /> Download ({formatBytes(out.size)})
          </a>
        )}
      </div>
    </div>
  );
}

function drawMeme(ctx: CanvasRenderingContext2D, img: HTMLImageElement, w: number, h: number, top: string, bottom: string, size: number) {
  ctx.drawImage(img, 0, 0, w, h);
  // Impact is the canonical meme font but isn't on every system; the fallback
  // chain mirrors what the legacy meme generators ship with.
  ctx.font = `bold ${size}px Impact, "Anton", "Oswald", "Arial Black", sans-serif`;
  ctx.textAlign = "center";
  ctx.lineJoin = "round";
  ctx.fillStyle = "white";
  ctx.strokeStyle = "black";
  ctx.lineWidth = Math.max(2, size / 12);
  const margin = size * 0.4;
  drawLine(ctx, top, w / 2, margin + size * 0.85, w - margin * 2, size);
  drawLine(ctx, bottom, w / 2, h - margin, w - margin * 2, size, true);
}

function drawLine(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, maxWidth: number, lineHeight: number, fromBottom = false) {
  // Word-wrap manually since fillText doesn't.
  const words = text.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let line = "";
  for (const w of words) {
    const test = line ? `${line} ${w}` : w;
    if (ctx.measureText(test).width > maxWidth && line) { lines.push(line); line = w; }
    else line = test;
  }
  if (line) lines.push(line);
  const yStart = fromBottom ? y - (lines.length - 1) * lineHeight : y;
  for (let i = 0; i < lines.length; i++) {
    ctx.strokeText(lines[i], x, yStart + i * lineHeight);
    ctx.fillText(lines[i], x, yStart + i * lineHeight);
  }
}
