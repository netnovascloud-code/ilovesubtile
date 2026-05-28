"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Upload, Download, RotateCw, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatBytes, cn } from "@/lib/utils";
import { IMAGE_TOOLS, resolveOutput, supportsQualityMime } from "@/lib/image-tools";
import { categoryTheme } from "@/lib/category-theme";
import { TemplatesBar } from "@/components/tools/TemplatesBar";

const TH = categoryTheme("images");

type Loaded = { file: File; img: HTMLImageElement; url: string; w: number; h: number };

export function ImageToolClient({ slug }: { slug: string }) {
  const cfg = IMAGE_TOOLS[slug];
  const [src, setSrc] = useState<Loaded | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  // controls
  const [quality, setQuality] = useState(cfg?.defaultQuality ?? 90);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [lockAspect, setLockAspect] = useState(true);
  const [angle, setAngle] = useState(0);
  const [crop, setCrop] = useState({ x: 0, y: 0, w: 0, h: 0 });

  const [result, setResult] = useState<{ url: string; size: number; ext: string } | null>(null);
  const resultRef = useRef<string | null>(null);

  const loadFile = useCallback((file: File) => {
    setError(null);
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      setSrc({ file, img, url, w: img.naturalWidth, h: img.naturalHeight });
      setWidth(img.naturalWidth);
      setHeight(img.naturalHeight);
      setAngle(0);
      setCrop({ x: 0, y: 0, w: img.naturalWidth, h: img.naturalHeight });
    };
    img.onerror = () => { setError("Could not read this image. Try a different file."); URL.revokeObjectURL(url); };
    img.src = url;
  }, []);

  const process = useCallback(async () => {
    if (!cfg || !src) return;
    setBusy(true);
    setError(null);
    try {
      const { mime, ext } = resolveOutput(cfg, src.file.type);

      // Determine the drawing source rectangle (crop) and base dimensions.
      const sx = cfg.controls.crop ? Math.max(0, Math.min(crop.x, src.w)) : 0;
      const sy = cfg.controls.crop ? Math.max(0, Math.min(crop.y, src.h)) : 0;
      const sw = cfg.controls.crop ? Math.max(1, Math.min(crop.w, src.w - sx)) : src.w;
      const sh = cfg.controls.crop ? Math.max(1, Math.min(crop.h, src.h - sy)) : src.h;

      // Output size (resize), defaulting to the source/crop size.
      let outW = cfg.controls.resize ? Math.max(1, Math.round(width)) : sw;
      let outH = cfg.controls.resize ? Math.max(1, Math.round(height)) : sh;

      const rot = ((angle % 360) + 360) % 360;
      const swap = rot === 90 || rot === 270;

      const canvas = document.createElement("canvas");
      canvas.width = swap ? outH : outW;
      canvas.height = swap ? outW : outH;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas is not available in this browser.");

      // JPEG has no alpha — paint a white background first.
      if (mime === "image/jpeg") { ctx.fillStyle = "#FFFFFF"; ctx.fillRect(0, 0, canvas.width, canvas.height); }
      if (cfg.forceGrayscale) ctx.filter = "grayscale(100%)";

      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      if (rot) ctx.rotate((rot * Math.PI) / 180);
      ctx.drawImage(src.img, sx, sy, sw, sh, -outW / 2, -outH / 2, outW, outH);
      ctx.restore();

      const q = supportsQualityMime(mime) && cfg.controls.quality ? quality / 100 : undefined;
      const blob: Blob = await new Promise((res, rej) =>
        canvas.toBlob((b) => (b ? res(b) : rej(new Error("Encoding failed."))), mime, q),
      );

      if (resultRef.current) URL.revokeObjectURL(resultRef.current);
      const outUrl = URL.createObjectURL(blob);
      resultRef.current = outUrl;
      setResult({ url: outUrl, size: blob.size, ext });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Processing failed.");
    } finally {
      setBusy(false);
    }
  }, [cfg, src, quality, width, height, angle, crop]);

  // Re-process whenever the source or any option changes.
  useEffect(() => { if (src) void process(); }, [src, quality, width, height, angle, crop, process]);

  // Cleanup object URLs on unmount.
  useEffect(() => () => {
    if (resultRef.current) URL.revokeObjectURL(resultRef.current);
    if (src) URL.revokeObjectURL(src.url);
  }, [src]);

  if (!cfg) return null;

  function onWidth(v: number) {
    setWidth(v);
    if (lockAspect && src) setHeight(Math.round((v / src.w) * src.h));
  }
  function onHeight(v: number) {
    setHeight(v);
    if (lockAspect && src) setWidth(Math.round((v / src.h) * src.w));
  }

  return (
    <div className="space-y-5">
      {!src ? (
        <label className={cn("flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed px-6 py-16 text-center transition-colors hover:brightness-[0.98]", TH.dropBorder, TH.dropBg)}>
          <span className={cn("grid h-12 w-12 place-items-center rounded-xl", TH.iconBg, TH.iconText)}>
            <Upload className="h-6 w-6" />
          </span>
          <span className="mt-3 font-semibold text-ink-900">Click to upload an image</span>
          <span className="mt-1 text-sm text-ink-400">or drag and drop · processed privately in your browser</span>
          <input
            type="file"
            accept={cfg.accept}
            className="hidden"
            onChange={(e) => { const f = e.target.files?.[0]; if (f) loadFile(f); }}
          />
        </label>
      ) : (
        <>
          <div className="flex items-center justify-between rounded-lg border border-ink-100 bg-white px-4 py-2.5">
            <div className="min-w-0 truncate text-sm text-ink-700">
              <span className="font-medium text-ink-900">{src.file.name}</span>
              <span className="ml-2 text-ink-400">{src.w}×{src.h} · {formatBytes(src.file.size)}</span>
            </div>
            <button
              onClick={() => { setSrc(null); setResult(null); }}
              className="inline-flex items-center gap-1 rounded p-1 text-xs text-ink-400 hover:bg-ink-50 hover:text-ink-700"
            >
              <X className="h-3.5 w-3.5" /> Change
            </button>
          </div>

          {/* User templates */}
          <TemplatesBar
            tool={slug}
            settings={{ quality, width, height, lockAspect, angle, crop }}
            onApply={(s) => {
              if (typeof s.quality === "number") setQuality(s.quality);
              if (typeof s.width === "number") setWidth(s.width);
              if (typeof s.height === "number") setHeight(s.height);
              if (typeof s.lockAspect === "boolean") setLockAspect(s.lockAspect);
              if (typeof s.angle === "number") setAngle(s.angle);
              if (s.crop && typeof s.crop === "object") setCrop(s.crop as { x: number; y: number; w: number; h: number });
            }}
          />

          {/* Controls */}
          <div className="flex flex-wrap items-end gap-4 rounded-lg border border-ink-100 bg-white p-4">
            {cfg.controls.resize && (
              <>
                <Field label="Width">
                  <input type="number" min={1} value={width} onChange={(e) => onWidth(Number(e.target.value))} className={numCls} />
                </Field>
                <Field label="Height">
                  <input type="number" min={1} value={height} onChange={(e) => onHeight(Number(e.target.value))} className={numCls} />
                </Field>
                <label className="flex items-center gap-2 pb-2 text-sm text-ink-600">
                  <input type="checkbox" checked={lockAspect} onChange={(e) => setLockAspect(e.target.checked)} />
                  Lock ratio
                </label>
              </>
            )}
            {cfg.controls.crop && (
              <>
                <Field label="X"><input type="number" min={0} value={crop.x} onChange={(e) => setCrop((c) => ({ ...c, x: Number(e.target.value) }))} className={numCls} /></Field>
                <Field label="Y"><input type="number" min={0} value={crop.y} onChange={(e) => setCrop((c) => ({ ...c, y: Number(e.target.value) }))} className={numCls} /></Field>
                <Field label="Width"><input type="number" min={1} value={crop.w} onChange={(e) => setCrop((c) => ({ ...c, w: Number(e.target.value) }))} className={numCls} /></Field>
                <Field label="Height"><input type="number" min={1} value={crop.h} onChange={(e) => setCrop((c) => ({ ...c, h: Number(e.target.value) }))} className={numCls} /></Field>
              </>
            )}
            {cfg.controls.rotate && (
              <Field label="Rotate">
                <Button size="sm" variant="outline" onClick={() => setAngle((a) => (a + 90) % 360)}>
                  <RotateCw className="h-3.5 w-3.5" /> {angle}°
                </Button>
              </Field>
            )}
            {cfg.controls.quality && (
              <Field label={`Quality · ${quality}`}>
                <input type="range" min={1} max={100} value={quality} onChange={(e) => setQuality(Number(e.target.value))} className="w-40 accent-brand-500" />
              </Field>
            )}
            {!cfg.controls.resize && !cfg.controls.crop && !cfg.controls.rotate && !cfg.controls.quality && (
              <p className="pb-2 text-sm text-ink-500">Ready — your converted file is on the right.</p>
            )}
          </div>

          {/* Preview + result */}
          <div className="grid gap-4 md:grid-cols-2">
            <Preview title="Original" url={src.url} />
            <div className="rounded-lg border border-ink-100 bg-white p-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium text-ink-700">Result</span>
                {result && (
                  <span className={cn("text-xs", result.size < src.file.size ? "text-emerald-600" : "text-ink-400")}>
                    {formatBytes(result.size)}
                    {result.size < src.file.size && ` · −${Math.round((1 - result.size / src.file.size) * 100)}%`}
                  </span>
                )}
              </div>
              <div className="grid min-h-40 place-items-center rounded bg-[repeating-conic-gradient(#f3f4f6_0_25%,#fff_0_50%)] bg-[length:16px_16px] p-2">
                {busy ? (
                  <span className="text-sm text-ink-400">Processing…</span>
                ) : result ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={result.url} alt="Result" className="max-h-72 max-w-full object-contain" />
                ) : (
                  <span className="text-sm text-ink-400">—</span>
                )}
              </div>
              {result && (
                <a href={result.url} download={`${slug}.${result.ext}`} className="mt-3 block">
                  <Button className="w-full"><Download className="h-4 w-4" /> Download .{result.ext}</Button>
                </a>
              )}
            </div>
          </div>
        </>
      )}

      {error && <p className="text-sm text-red-600">{error}</p>}
      <p className="text-xs text-ink-400">100% in your browser — your image is never uploaded. Free and unlimited.</p>
    </div>
  );
}

const numCls = "w-24 rounded-md border border-ink-200 bg-white px-2 py-1.5 text-sm text-ink-900 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1 block text-xs font-medium text-ink-500">{label}</label>
      {children}
    </div>
  );
}

function Preview({ title, url }: { title: string; url: string }) {
  return (
    <div className="rounded-lg border border-ink-100 bg-white p-4">
      <span className="mb-2 block text-sm font-medium text-ink-700">{title}</span>
      <div className="grid min-h-40 place-items-center rounded bg-[repeating-conic-gradient(#f3f4f6_0_25%,#fff_0_50%)] bg-[length:16px_16px] p-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={url} alt={title} className="max-h-72 max-w-full object-contain" />
      </div>
    </div>
  );
}
