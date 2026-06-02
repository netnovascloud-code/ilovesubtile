"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Download, X, Upload, Trash2, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatBytes } from "@/lib/utils";

// Composite N images onto a single canvas. Five preset layouts cover the
// 95% of "collage" search intent (grids + strips). Pure client-side via
// canvas — no upload, no encoder dep.
type Photo = { id: string; file: File; url: string; img?: HTMLImageElement };

type Layout = { id: string; name: string; cols: number; rows: number };
const LAYOUTS: Layout[] = [
  { id: "1x2-h", name: "Side by side", cols: 2, rows: 1 },
  { id: "2x1-v", name: "Top / bottom", cols: 1, rows: 2 },
  { id: "2x2", name: "2 × 2 grid", cols: 2, rows: 2 },
  { id: "3x3", name: "3 × 3 grid", cols: 3, rows: 3 },
  { id: "1x4-h", name: "Horizontal strip (4)", cols: 4, rows: 1 },
];

export function ImageCollageClient() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [layout, setLayout] = useState<Layout>(LAYOUTS[2]);
  const [gap, setGap] = useState(8);
  const [bg, setBg] = useState("#ffffff");
  const [side, setSide] = useState(1200);                  // longest side, px
  const [out, setOut] = useState<{ url: string; size: number } | null>(null);
  const dragIdx = useRef<number | null>(null);
  const previewRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => () => {
    photos.forEach((p) => URL.revokeObjectURL(p.url));
    if (out) URL.revokeObjectURL(out.url);
  }, [photos, out]);

  // Decode every newly added photo so the preview can draw it immediately.
  const onFiles = useCallback(async (files: FileList | null) => {
    if (!files) return;
    const next: Photo[] = [];
    for (const f of Array.from(files)) {
      if (!f.type.startsWith("image/")) continue;
      const url = URL.createObjectURL(f);
      const img = await new Promise<HTMLImageElement>((res) => {
        const i = new Image(); i.onload = () => res(i); i.src = url;
      });
      next.push({ id: crypto.randomUUID(), file: f, url, img });
    }
    setPhotos((p) => [...p, ...next]);
  }, []);

  // Live preview, scaled to ~720px on the long edge.
  useEffect(() => {
    if (!previewRef.current) return;
    const cap = layout.cols * layout.rows;
    const used = photos.slice(0, cap);
    const previewMax = 720;
    const scale = previewMax / side;
    drawCollage(previewRef.current, used, layout, gap * scale, bg, Math.round(side * scale));
  }, [photos, layout, gap, bg, side]);

  const move = (from: number, to: number) => {
    if (from === to) return;
    setPhotos((p) => { const c = p.slice(); const [it] = c.splice(from, 1); c.splice(to, 0, it); return c; });
  };
  const remove = (i: number) => setPhotos((p) => p.filter((_, idx) => idx !== i));

  const exportCollage = useCallback(async () => {
    if (!photos.length) return;
    const cap = layout.cols * layout.rows;
    const c = document.createElement("canvas");
    drawCollage(c, photos.slice(0, cap), layout, gap, bg, side);
    const blob: Blob = await new Promise((res) => c.toBlob((b) => res(b!), "image/png"));
    if (out) URL.revokeObjectURL(out.url);
    setOut({ url: URL.createObjectURL(blob), size: blob.size });
  }, [photos, layout, gap, bg, side, out]);

  const reset = () => {
    photos.forEach((p) => URL.revokeObjectURL(p.url));
    if (out) URL.revokeObjectURL(out.url);
    setPhotos([]); setOut(null);
  };

  if (!photos.length) {
    return (
      <label className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-ink-200 bg-ink-50/40 px-6 py-16 text-center transition hover:border-brand-400">
        <Upload className="h-8 w-8 text-ink-400" />
        <div className="text-base font-semibold text-ink-900">Drop your photos</div>
        <div className="text-sm text-ink-500">Pick a layout, drag to reorder — runs entirely in your browser.</div>
        <input type="file" accept="image/*" multiple className="sr-only" onChange={(e) => onFiles(e.target.files)} />
        <span className="mt-2 rounded-lg bg-brand-500 px-4 py-2 text-sm font-semibold text-white">Choose photos</span>
      </label>
    );
  }

  const cap = layout.cols * layout.rows;
  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="text-sm text-ink-700">
          {photos.length} photo{photos.length === 1 ? "" : "s"}
          {photos.length > cap && <span className="ml-2 text-amber-700">(only the first {cap} fit the {layout.name} layout)</span>}
        </div>
        <div className="flex items-center gap-2">
          <label className="inline-flex cursor-pointer items-center gap-1 rounded-md border border-ink-200 bg-white px-3 py-1.5 text-xs font-medium text-ink-700 hover:border-brand-300">
            <Upload className="h-3.5 w-3.5" /> Add more
            <input type="file" accept="image/*" multiple className="sr-only" onChange={(e) => onFiles(e.target.files)} />
          </label>
          <Button variant="ghost" size="sm" onClick={reset}><X className="h-4 w-4" /></Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {LAYOUTS.map((l) => (
          <button key={l.id} onClick={() => setLayout(l)}
            className={`rounded-full border px-3 py-1 text-xs font-medium ${layout.id === l.id ? "border-brand-300 bg-brand-50 text-brand-700" : "border-ink-200 bg-white text-ink-700"}`}>
            {l.name}
          </button>
        ))}
      </div>

      <ul className="grid grid-cols-3 gap-3 sm:grid-cols-5 md:grid-cols-6">
        {photos.map((p, i) => (
          <li key={p.id}
            draggable
            onDragStart={() => { dragIdx.current = i; }}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => { if (dragIdx.current !== null) move(dragIdx.current, i); dragIdx.current = null; }}
            className={`group relative cursor-move rounded-lg border bg-white p-1.5 shadow-sm hover:border-brand-300 ${i < cap ? "border-ink-200" : "border-amber-200 opacity-60"}`}>
            <button onClick={() => remove(i)} className="absolute right-1 top-1 z-10 grid h-6 w-6 place-items-center rounded bg-white/90 text-red-600 opacity-0 shadow ring-1 ring-ink-200 transition-opacity hover:bg-red-50 group-hover:opacity-100">
              <Trash2 className="h-3.5 w-3.5" />
            </button>
            <img src={p.url} alt={`photo ${i + 1}`} className="mx-auto block max-h-24 w-auto" />
            <div className="mt-1 flex items-center justify-between text-[10px] text-ink-500">
              <GripVertical className="h-3 w-3" />
              <span>#{i + 1}</span>
            </div>
          </li>
        ))}
      </ul>

      <div className="grid gap-4 sm:grid-cols-3">
        <label className="flex flex-col text-xs font-medium text-ink-600">
          Gap {gap}px
          <input type="range" min={0} max={48} value={gap} onChange={(e) => setGap(Number(e.target.value))} className="accent-brand-500" />
        </label>
        <label className="flex flex-col text-xs font-medium text-ink-600">
          Longest side {side}px
          <input type="range" min={400} max={4000} step={100} value={side} onChange={(e) => setSide(Number(e.target.value))} className="accent-brand-500" />
        </label>
        <label className="flex flex-col text-xs font-medium text-ink-600">
          Background
          <input type="color" value={bg} onChange={(e) => setBg(e.target.value)} className="mt-1 h-10 w-full cursor-pointer rounded-md border border-ink-200" />
        </label>
      </div>

      <div className="rounded-lg border border-ink-100 bg-ink-50/40 p-3">
        <canvas ref={previewRef} className="mx-auto block max-h-[440px] w-auto rounded" />
      </div>

      <div className="flex flex-wrap gap-2">
        <Button onClick={exportCollage}>Export collage</Button>
        {out && (
          <a href={out.url} download={`collage-${Date.now()}.png`}
            className="inline-flex items-center gap-2 rounded-lg border border-brand-200 bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700 hover:bg-brand-100">
            <Download className="h-4 w-4" /> Download ({formatBytes(out.size)})
          </a>
        )}
      </div>
    </div>
  );
}

function drawCollage(
  c: HTMLCanvasElement, photos: Photo[], layout: Layout,
  gap: number, bg: string, side: number,
) {
  // Aspect of the whole collage = cols / rows (square cells). Fit `side` to
  // the long edge, then compute the canvas dims.
  const aspect = layout.cols / layout.rows;
  let W: number, H: number;
  if (aspect >= 1) { W = side; H = Math.round(side / aspect); }
  else { H = side; W = Math.round(side * aspect); }
  c.width = W; c.height = H;

  const ctx = c.getContext("2d")!;
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  const cellW = (W - gap * (layout.cols + 1)) / layout.cols;
  const cellH = (H - gap * (layout.rows + 1)) / layout.rows;

  for (let r = 0; r < layout.rows; r++) {
    for (let col = 0; col < layout.cols; col++) {
      const idx = r * layout.cols + col;
      const p = photos[idx];
      if (!p?.img) continue;
      const x = gap + col * (cellW + gap);
      const y = gap + r * (cellH + gap);
      // object-fit: cover within each cell.
      const ir = p.img.naturalWidth / p.img.naturalHeight;
      const cr = cellW / cellH;
      let sw: number, sh: number, sx: number, sy: number;
      if (ir > cr) { sh = p.img.naturalHeight; sw = sh * cr; sx = (p.img.naturalWidth - sw) / 2; sy = 0; }
      else { sw = p.img.naturalWidth; sh = sw / cr; sx = 0; sy = (p.img.naturalHeight - sh) / 2; }
      ctx.drawImage(p.img, sx, sy, sw, sh, x, y, cellW, cellH);
    }
  }
}
