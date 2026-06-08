"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Download, X, Eraser, Undo2, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MiniDrop } from "@/components/tools/MiniDrop";
import { formatBytes } from "@/lib/utils";

// Brush-based privacy blur — click and drag rectangles over faces (or any
// region) and the underlying pixels get blurred. Avoiding face-detection
// models keeps the bundle tiny and the tool predictable: the user decides
// what's sensitive, nothing leaves their browser, and partial faces (side
// profile, masks, kids) work just as well as front-on portraits.
type Region = { x: number; y: number; w: number; h: number };

export function BlurFaceClient() {
  const [file, setFile] = useState<File | null>(null);
  const [img, setImg] = useState<HTMLImageElement | null>(null);
  const [scale, setScale] = useState(1);                       // display → source px
  const [regions, setRegions] = useState<Region[]>([]);
  const [strength, setStrength] = useState(20);                 // blur radius in px
  const [out, setOut] = useState<{ url: string; size: number; name: string } | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const drag = useRef<{ x: number; y: number } | null>(null);

  const onFile = useCallback((f: File) => {
    setRegions([]); setOut(null);
    const url = URL.createObjectURL(f);
    const i = new Image();
    i.onload = () => { setFile(f); setImg(i); URL.revokeObjectURL(url); };
    i.src = url;
  }, []);

  // Redraw whenever a region changes.
  useEffect(() => {
    if (!img || !canvasRef.current) return;
    const c = canvasRef.current;
    const maxSide = 720;
    const s = Math.min(1, maxSide / Math.max(img.naturalWidth, img.naturalHeight));
    setScale(s);
    c.width = Math.round(img.naturalWidth * s);
    c.height = Math.round(img.naturalHeight * s);
    const ctx = c.getContext("2d")!;
    ctx.drawImage(img, 0, 0, c.width, c.height);
    for (const r of regions) {
      const dx = r.x * s, dy = r.y * s, dw = r.w * s, dh = r.h * s;
      ctx.save();
      ctx.filter = `blur(${strength * s}px)`;
      ctx.drawImage(c, dx, dy, dw, dh, dx, dy, dw, dh);
      ctx.restore();
      ctx.strokeStyle = "rgba(45, 107, 228, 0.7)";
      ctx.lineWidth = 1.5;
      ctx.strokeRect(dx, dy, dw, dh);
    }
  }, [img, regions, strength]);

  // Mouse → source coordinates (drag on the scaled canvas, store at source res).
  const onDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    drag.current = { x: (e.clientX - r.left) / scale, y: (e.clientY - r.top) / scale };
  };
  const onUp = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!drag.current) return;
    const r = e.currentTarget.getBoundingClientRect();
    const x2 = (e.clientX - r.left) / scale, y2 = (e.clientY - r.top) / scale;
    const x = Math.min(drag.current.x, x2), y = Math.min(drag.current.y, y2);
    const w = Math.abs(x2 - drag.current.x), h = Math.abs(y2 - drag.current.y);
    drag.current = null;
    if (w < 8 || h < 8) return;
    setRegions((rs) => [...rs, { x, y, w, h }]);
  };

  const exportImg = useCallback(async () => {
    if (!img || !file) return;
    const c = document.createElement("canvas");
    c.width = img.naturalWidth; c.height = img.naturalHeight;
    const ctx = c.getContext("2d")!;
    ctx.drawImage(img, 0, 0);
    for (const r of regions) {
      ctx.save();
      ctx.filter = `blur(${strength}px)`;
      ctx.drawImage(c, r.x, r.y, r.w, r.h, r.x, r.y, r.w, r.h);
      ctx.restore();
    }
    const mime = file.type === "image/png" ? "image/png" : "image/jpeg";
    const blob: Blob = await new Promise((res) => c.toBlob((b) => res(b!), mime, 0.94));
    if (out) URL.revokeObjectURL(out.url);
    // Name the download with the actual output extension (a .webp input is
    // re-encoded to JPEG, so keeping the original name produced an unopenable
    // "blurred-x.webp" that was really JPEG bytes).
    const base = file.name.replace(/\.[^.]+$/, "") || "image";
    const ext = mime === "image/png" ? "png" : "jpg";
    setOut({ url: URL.createObjectURL(blob), size: blob.size, name: `blurred-${base}.${ext}` });
  }, [img, file, regions, strength, out]);

  const reset = () => {
    if (out) URL.revokeObjectURL(out.url);
    setFile(null); setImg(null); setRegions([]); setOut(null);
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

      <p className="text-sm text-ink-600">
        Click and drag a rectangle over each face (or any area) you want to anonymise.
      </p>

      <div className="rounded-lg border border-ink-100 bg-ink-50/40 p-3">
        <canvas ref={canvasRef} className="mx-auto block max-h-[440px] cursor-crosshair rounded" onMouseDown={onDown} onMouseUp={onUp} />
      </div>

      <div className="flex flex-wrap items-end gap-4">
        <label className="flex flex-col text-xs font-medium text-ink-600 sm:w-64">
          Blur strength {strength}px
          <input type="range" min={5} max={60} value={strength} onChange={(e) => setStrength(Number(e.target.value))} className="accent-brand-500" />
        </label>
        <button onClick={() => setRegions((r) => r.slice(0, -1))} disabled={!regions.length}
          className="inline-flex items-center gap-1 rounded-md border border-ink-200 bg-white px-3 py-1.5 text-xs font-medium text-ink-700 hover:border-brand-300 disabled:opacity-50">
          <Undo2 className="h-3.5 w-3.5" /> Undo
        </button>
        <button onClick={() => setRegions([])} disabled={!regions.length}
          className="inline-flex items-center gap-1 rounded-md border border-ink-200 bg-white px-3 py-1.5 text-xs font-medium text-ink-700 hover:border-brand-300 disabled:opacity-50">
          <Eraser className="h-3.5 w-3.5" /> Clear all
        </button>
        <span className="text-xs text-ink-400">{regions.length} region{regions.length === 1 ? "" : "s"}</span>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button onClick={exportImg} disabled={!regions.length}>Export blurred image</Button>
        {out && (
          <a href={out.url} download={out.name}
            className="inline-flex items-center gap-2 rounded-lg border border-brand-200 bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700 hover:bg-brand-100">
            <Download className="h-4 w-4" /> Download ({formatBytes(out.size)})
          </a>
        )}
      </div>
    </div>
  );
}
