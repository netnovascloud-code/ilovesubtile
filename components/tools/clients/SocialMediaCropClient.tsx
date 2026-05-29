"use client";

import { useEffect, useRef, useState } from "react";
import { Image as ImageIcon, Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatBytes } from "@/lib/utils";
import { MiniDrop } from "@/components/tools/MiniDrop";

type Preset = { label: string; w: number; h: number };
const PRESETS: Preset[] = [
  { label: "Instagram Square", w: 1, h: 1 },
  { label: "Instagram Portrait", w: 4, h: 5 },
  { label: "Story / Reel / TikTok", w: 9, h: 16 },
  { label: "X / Twitter", w: 16, h: 9 },
  { label: "Facebook", w: 1.91, h: 1 },
  { label: "YouTube Thumbnail", w: 16, h: 9 },
  { label: "LinkedIn Banner", w: 4, h: 1 },
  { label: "Pinterest Pin", w: 2, h: 3 },
];

export function SocialMediaCropClient() {
  const [file, setFile] = useState<File | null>(null);
  const [preset, setPreset] = useState<Preset>(PRESETS[0]);
  const [outUrl, setOutUrl] = useState<string | null>(null);
  const [outSize, setOutSize] = useState(0);
  const [dims, setDims] = useState<{ w: number; h: number } | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const cleanup = useRef<string | null>(null);

  useEffect(() => () => { if (cleanup.current) URL.revokeObjectURL(cleanup.current); }, []);

  // Re-crop whenever the file or preset changes.
  useEffect(() => {
    if (!file) return;
    let cancelled = false;
    (async () => {
      setBusy(true); setError(null);
      try {
        const bmp = await createImageBitmap(file);
        const dstRatio = preset.w / preset.h, srcRatio = bmp.width / bmp.height;
        let sw: number, sh: number;
        if (srcRatio > dstRatio) { sh = bmp.height; sw = sh * dstRatio; }
        else { sw = bmp.width; sh = sw / dstRatio; }
        const sx = (bmp.width - sw) / 2, sy = (bmp.height - sh) / 2;
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(sw); canvas.height = Math.round(sh);
        const ctx = canvas.getContext("2d")!;
        ctx.drawImage(bmp, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height);
        bmp.close?.();
        const isJpg = /jpe?g/i.test(file.type);
        const blob: Blob = await new Promise((res) =>
          canvas.toBlob((b) => res(b!), isJpg ? "image/jpeg" : "image/png", isJpg ? 0.92 : undefined));
        if (cancelled) return;
        if (cleanup.current) URL.revokeObjectURL(cleanup.current);
        const url = URL.createObjectURL(blob);
        cleanup.current = url;
        setOutUrl(url); setOutSize(blob.size); setDims({ w: canvas.width, h: canvas.height });
      } catch (e) {
        if (!cancelled) setError(`Could not crop the image: ${(e as Error).message}`);
      } finally {
        if (!cancelled) setBusy(false);
      }
    })();
    return () => { cancelled = true; };
  }, [file, preset]);

  const ext = file && /jpe?g/i.test(file.type) ? "jpg" : "png";
  const outName = file ? `${file.name.replace(/\.[^.]+$/, "")}-${preset.label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.${ext}` : "";

  return (
    <div className="space-y-5">
      <MiniDrop
        label="Image to crop"
        accept={{ "image/jpeg": [".jpg", ".jpeg"], "image/png": [".png"], "image/webp": [".webp"] }}
        icon={<ImageIcon className="h-5 w-5" />}
        onFile={(f) => { setFile(f); setOutUrl(null); }}
        current={file}
      />

      {file && (
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((p) => (
            <button key={p.label} onClick={() => setPreset(p)}
              className={`rounded-md border px-3 py-1.5 text-xs font-medium ${preset.label === p.label ? "border-brand-400 bg-brand-50 text-ink-900" : "border-ink-200 bg-white text-ink-600 hover:border-brand-300"}`}>
              {p.label} <span className="text-ink-400">{p.w}:{p.h}</span>
            </button>
          ))}
        </div>
      )}

      {error && <p className="rounded border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</p>}

      {busy && <div className="flex items-center gap-2 text-sm text-ink-500"><Loader2 className="h-4 w-4 animate-spin" /> Cropping…</div>}

      {outUrl && !busy && (
        <div className="space-y-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={outUrl} alt="Cropped preview" className="mx-auto max-h-80 rounded-lg border border-ink-100" />
          <div className="flex flex-wrap items-center gap-2">
            <a href={outUrl} download={outName}>
              <Button size="lg"><Download className="h-4 w-4" /> Download · {dims?.w}×{dims?.h} · {formatBytes(outSize)}</Button>
            </a>
          </div>
        </div>
      )}

      <p className="text-xs text-ink-400">Center-cropped to the exact ratio, at full resolution. Runs in your browser — your image is never uploaded.</p>
    </div>
  );
}
