"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Download, X, RotateCw, FlipHorizontal, FlipVertical, Image as ImageIcon, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MiniDrop } from "@/components/tools/MiniDrop";
import { formatBytes } from "@/lib/utils";

// Lightweight photo editor — filters + rotation/flip. Deliberately scoped
// like iLoveIMG's "photo editor": six sliders, three preset filters, one
// rotate-90 button, two flip buttons. Pure canvas, no deps.
type Filters = { brightness: number; contrast: number; saturate: number; hue: number; blur: number; grayscale: number };
const DEFAULTS: Filters = { brightness: 100, contrast: 100, saturate: 100, hue: 0, blur: 0, grayscale: 0 };

const PRESETS: { name: string; v: Filters }[] = [
  { name: "Original", v: DEFAULTS },
  { name: "Vivid", v: { ...DEFAULTS, brightness: 105, contrast: 115, saturate: 140 } },
  { name: "B&W", v: { ...DEFAULTS, contrast: 110, grayscale: 100 } },
  { name: "Vintage", v: { ...DEFAULTS, brightness: 102, contrast: 95, saturate: 70, hue: 18 } },
];

function buildFilter(f: Filters): string {
  return `brightness(${f.brightness}%) contrast(${f.contrast}%) saturate(${f.saturate}%) hue-rotate(${f.hue}deg) blur(${f.blur}px) grayscale(${f.grayscale}%)`;
}

export function PhotoEditorClient() {
  const [file, setFile] = useState<File | null>(null);
  const [img, setImg] = useState<HTMLImageElement | null>(null);
  const [f, setF] = useState<Filters>(DEFAULTS);
  const [angle, setAngle] = useState(0);                       // 0/90/180/270
  const [flipH, setFlipH] = useState(false);
  const [flipV, setFlipV] = useState(false);
  const [busy, setBusy] = useState(false);
  const [out, setOut] = useState<{ url: string; size: number } | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const onFile = useCallback((file: File) => {
    const url = URL.createObjectURL(file);
    const i = new Image();
    i.onload = () => { setFile(file); setImg(i); URL.revokeObjectURL(url); };
    i.src = url;
  }, []);

  useEffect(() => {
    if (!img || !canvasRef.current) return;
    const c = canvasRef.current;
    const maxSide = 720;
    const scale = Math.min(1, maxSide / Math.max(img.naturalWidth, img.naturalHeight));
    renderTo(c, img, scale, f, angle, flipH, flipV);
  }, [img, f, angle, flipH, flipV]);

  const exportImg = useCallback(async () => {
    if (!img || !file) return;
    setBusy(true);
    try {
      const c = document.createElement("canvas");
      renderTo(c, img, 1, f, angle, flipH, flipV);
      const mime = file.type === "image/png" ? "image/png" : "image/jpeg";
      const blob: Blob = await new Promise((res) => c.toBlob((b) => res(b!), mime, 0.94));
      if (out) URL.revokeObjectURL(out.url);
      setOut({ url: URL.createObjectURL(blob), size: blob.size });
    } finally {
      setBusy(false);
    }
  }, [img, file, f, angle, flipH, flipV, out]);

  const reset = () => {
    if (out) URL.revokeObjectURL(out.url);
    setFile(null); setImg(null); setOut(null);
    setF(DEFAULTS); setAngle(0); setFlipH(false); setFlipV(false);
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

      <div className="flex flex-wrap gap-2">
        {PRESETS.map((p) => (
          <button key={p.name} onClick={() => setF(p.v)} className="rounded-full border border-ink-200 bg-white px-3 py-1 text-xs font-medium text-ink-700 hover:border-brand-300 hover:bg-brand-50">
            {p.name}
          </button>
        ))}
        <button onClick={() => setAngle((angle + 90) % 360)} className="ml-auto inline-flex items-center gap-1 rounded-md border border-ink-200 bg-white px-3 py-1 text-xs font-medium text-ink-700 hover:border-brand-300">
          <RotateCw className="h-3.5 w-3.5" /> Rotate 90°
        </button>
        <button onClick={() => setFlipH((v) => !v)} className={`inline-flex items-center gap-1 rounded-md border px-3 py-1 text-xs font-medium hover:border-brand-300 ${flipH ? "border-brand-300 bg-brand-50 text-brand-700" : "border-ink-200 bg-white text-ink-700"}`}>
          <FlipHorizontal className="h-3.5 w-3.5" /> Flip H
        </button>
        <button onClick={() => setFlipV((v) => !v)} className={`inline-flex items-center gap-1 rounded-md border px-3 py-1 text-xs font-medium hover:border-brand-300 ${flipV ? "border-brand-300 bg-brand-50 text-brand-700" : "border-ink-200 bg-white text-ink-700"}`}>
          <FlipVertical className="h-3.5 w-3.5" /> Flip V
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Slider label={`Brightness ${f.brightness}%`} value={f.brightness} min={50} max={200} onChange={(v) => setF({ ...f, brightness: v })} />
        <Slider label={`Contrast ${f.contrast}%`} value={f.contrast} min={50} max={200} onChange={(v) => setF({ ...f, contrast: v })} />
        <Slider label={`Saturation ${f.saturate}%`} value={f.saturate} min={0} max={200} onChange={(v) => setF({ ...f, saturate: v })} />
        <Slider label={`Hue ${f.hue}°`} value={f.hue} min={0} max={360} onChange={(v) => setF({ ...f, hue: v })} />
        <Slider label={`Blur ${f.blur}px`} value={f.blur} min={0} max={20} onChange={(v) => setF({ ...f, blur: v })} />
        <Slider label={`Grayscale ${f.grayscale}%`} value={f.grayscale} min={0} max={100} onChange={(v) => setF({ ...f, grayscale: v })} />
      </div>

      <div className="flex flex-wrap gap-2">
        <Button onClick={exportImg} disabled={busy}>
          {busy ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Exporting…</> : "Export image"}
        </Button>
        {out && (
          <a href={out.url} download={`edited-${file.name}`}
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

function renderTo(c: HTMLCanvasElement, img: HTMLImageElement, scale: number, f: Filters, angle: number, flipH: boolean, flipV: boolean) {
  const sw = Math.round(img.naturalWidth * scale);
  const sh = Math.round(img.naturalHeight * scale);
  const rotated = angle === 90 || angle === 270;
  c.width = rotated ? sh : sw;
  c.height = rotated ? sw : sh;
  const ctx = c.getContext("2d")!;
  ctx.clearRect(0, 0, c.width, c.height);
  ctx.filter = buildFilter(f);
  ctx.save();
  ctx.translate(c.width / 2, c.height / 2);
  ctx.rotate((angle * Math.PI) / 180);
  ctx.scale(flipH ? -1 : 1, flipV ? -1 : 1);
  ctx.drawImage(img, -sw / 2, -sh / 2, sw, sh);
  ctx.restore();
}
