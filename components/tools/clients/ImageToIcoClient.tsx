"use client";

import { useEffect, useRef, useState } from "react";
import { Upload, X, Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatBytes } from "@/lib/utils";

const SIZES = [16, 32, 48, 64] as const;

async function pngBytesAt(bmp: ImageBitmap, size: number): Promise<Uint8Array> {
  const canvas = document.createElement("canvas");
  canvas.width = size; canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  ctx.imageSmoothingQuality = "high";
  // Letterbox to a square so non-square sources don't distort.
  const scale = Math.min(size / bmp.width, size / bmp.height);
  const w = bmp.width * scale, h = bmp.height * scale;
  ctx.drawImage(bmp, (size - w) / 2, (size - h) / 2, w, h);
  const blob: Blob = await new Promise((res) => canvas.toBlob((b) => res(b!), "image/png"));
  return new Uint8Array(await blob.arrayBuffer());
}

/** Assemble a multi-image ICO that embeds PNG frames (supported by all modern browsers/OSes). */
function buildIco(frames: { size: number; png: Uint8Array }[]): Uint8Array {
  const count = frames.length;
  const header = 6;
  const dirEntry = 16;
  let offset = header + dirEntry * count;
  const dir = new Uint8Array(header + dirEntry * count);
  const dv = new DataView(dir.buffer);
  dv.setUint16(0, 0, true);      // reserved
  dv.setUint16(2, 1, true);      // type 1 = icon
  dv.setUint16(4, count, true);  // image count
  frames.forEach((f, i) => {
    const base = header + dirEntry * i;
    dir[base + 0] = f.size >= 256 ? 0 : f.size; // width (0 = 256)
    dir[base + 1] = f.size >= 256 ? 0 : f.size; // height
    dir[base + 2] = 0;  // palette
    dir[base + 3] = 0;  // reserved
    dv.setUint16(base + 4, 1, true);   // colour planes
    dv.setUint16(base + 6, 32, true);  // bits per pixel
    dv.setUint32(base + 8, f.png.length, true);   // size of PNG data
    dv.setUint32(base + 12, offset, true);        // offset of PNG data
    offset += f.png.length;
  });
  const total = offset;
  const out = new Uint8Array(total);
  out.set(dir, 0);
  let p = header + dirEntry * count;
  for (const f of frames) { out.set(f.png, p); p += f.png.length; }
  return out;
}

export function ImageToIcoClient() {
  const [file, setFile] = useState<File | null>(null);
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
      const frames = await Promise.all(SIZES.map(async (size) => ({ size, png: await pngBytesAt(bmp, size) })));
      bmp.close();
      const ico = buildIco(frames);
      const blob = new Blob([ico as BlobPart], { type: "image/x-icon" });
      if (cleanup.current) URL.revokeObjectURL(cleanup.current);
      const url = URL.createObjectURL(blob);
      cleanup.current = url;
      setOutUrl(url); setOutSize(blob.size);
    } catch (e) {
      setError(`Could not generate the favicon: ${(e as Error).message}`);
    } finally {
      setBusy(false);
    }
  }

  function pick(f: File | null) { if (!f) return; setFile(f); run(f); }

  return (
    <div className="space-y-5">
      {!file ? (
        <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-amber-300 bg-amber-50/40 px-6 py-12 text-center transition-colors hover:brightness-95">
          <Upload className="h-7 w-7 text-amber-600" />
          <span className="mt-2 font-medium text-ink-900">Upload an image</span>
          <span className="mt-0.5 text-xs text-ink-400">PNG, JPG or WebP — we build a multi-size .ico (16, 32, 48, 64 px)</span>
          <input type="file" accept="image/png,image/jpeg,image/webp,.png,.jpg,.jpeg,.webp" className="hidden" onChange={(e) => pick(e.target.files?.[0] ?? null)} />
        </label>
      ) : (
        <div className="flex items-center justify-between rounded-lg border border-ink-100 bg-white px-4 py-2.5 text-sm">
          <div className="min-w-0 truncate"><span className="font-medium text-ink-900">{file.name}</span><span className="ml-2 text-ink-400">{formatBytes(file.size)}</span></div>
          <button onClick={() => { setFile(null); setOutUrl(null); }} className="rounded p-1 text-ink-400 hover:bg-ink-50 hover:text-ink-700"><X className="h-3.5 w-3.5" /></button>
        </div>
      )}

      {busy && <p className="flex items-center gap-2 text-sm text-ink-500"><Loader2 className="h-4 w-4 animate-spin" /> Building favicon…</p>}

      {outUrl && (
        <div className="rounded-lg border border-ink-100 bg-white p-4">
          <p className="text-sm font-medium text-ink-700">favicon.ico · {formatBytes(outSize)} · contains {SIZES.join(", ")} px</p>
          <a href={outUrl} download="favicon.ico" className="mt-3 inline-block">
            <Button size="lg"><Download className="h-4 w-4" /> Download favicon.ico</Button>
          </a>
        </div>
      )}

      {error && <p className="text-sm text-red-600">{error}</p>}
      <p className="text-xs text-ink-400">100% in your browser via Canvas — your image is never uploaded.</p>
    </div>
  );
}
