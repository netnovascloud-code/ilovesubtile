"use client";

import { useCallback, useState } from "react";
import { Download, X, Loader2, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MiniDrop } from "@/components/tools/MiniDrop";
import { formatBytes } from "@/lib/utils";

// HEIC is the iPhone photo format and only Safari decodes it natively. We
// ship a converter for every other browser by loading heic2any (libheif
// compiled to wasm) from esm.sh at runtime — same pattern as the background
// removal tool, so webpack/SWC never sees the wasm bundle and the main
// chunk stays slim.
type Heic2Any = (opts: { blob: Blob; toType: string; quality?: number }) => Promise<Blob | Blob[]>;

async function loadHeic2Any(): Promise<Heic2Any> {
  const url = "https://esm.sh/heic2any@0.0.4?bundle";
  const mod = await import(/* webpackIgnore: true */ url) as { default: Heic2Any };
  return mod.default;
}

export function HeicConvertClient({ target }: { target: "jpeg" | "png" }) {
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [out, setOut] = useState<{ url: string; size: number; name: string } | null>(null);
  const [quality, setQuality] = useState(92);

  const targetMime = target === "jpeg" ? "image/jpeg" : "image/png";
  const targetExt = target === "jpeg" ? "jpg" : "png";

  const onFile = useCallback((f: File) => {
    if (out) URL.revokeObjectURL(out.url);
    setOut(null); setError(null); setFile(f);
  }, [out]);

  const convert = useCallback(async () => {
    if (!file) return;
    setBusy(true); setError(null);
    try {
      const heic2any = await loadHeic2Any();
      // Some iPhones save .heic that are actually JPEG containers — heic2any
      // throws "input is not HEIC". Fall back to passing the file straight
      // through a canvas re-encode in that case.
      let outBlob: Blob;
      try {
        const r = await heic2any({ blob: file, toType: targetMime, quality: quality / 100 });
        outBlob = Array.isArray(r) ? r[0] : r;
      } catch (heicErr) {
        const msg = heicErr instanceof Error ? heicErr.message : String(heicErr);
        if (/not HEIC|format is not/i.test(msg)) {
          const img = await loadImage(file);
          const c = document.createElement("canvas");
          c.width = img.naturalWidth; c.height = img.naturalHeight;
          const ctx = c.getContext("2d")!;
          if (targetMime === "image/jpeg") { ctx.fillStyle = "white"; ctx.fillRect(0, 0, c.width, c.height); }
          ctx.drawImage(img, 0, 0);
          outBlob = await new Promise<Blob>((res, rej) =>
            c.toBlob((b) => (b ? res(b) : rej(new Error("encoding failed"))), targetMime, quality / 100),
          );
        } else {
          throw heicErr;
        }
      }
      const name = file.name.replace(/\.(heic|heif)$/i, "") + "." + targetExt;
      setOut({ url: URL.createObjectURL(outBlob), size: outBlob.size, name });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not convert this file.");
    } finally {
      setBusy(false);
    }
  }, [file, targetMime, targetExt, quality]);

  const reset = () => {
    if (out) URL.revokeObjectURL(out.url);
    setFile(null); setOut(null); setError(null);
  };

  if (!file) {
    return (
      <MiniDrop
        label="Drop your HEIC / HEIF image"
        accept={{ "image/heic": [".heic", ".heif"], "image/heif": [".heif"] }}
        icon={<ImageIcon className="h-5 w-5" />}
        onFile={onFile}
        current={null}
        hint="Conversion runs in your browser via WebAssembly — your photo is never uploaded."
      />
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0 truncate text-sm text-ink-700">
          {file.name} <span className="text-ink-400">({formatBytes(file.size)})</span>
        </div>
        <Button variant="ghost" size="sm" onClick={reset}><X className="h-4 w-4" /></Button>
      </div>

      {target === "jpeg" && (
        <label className="flex flex-col text-xs font-medium text-ink-600 sm:w-64">
          JPG quality {quality}%
          <input type="range" min={50} max={100} value={quality} onChange={(e) => setQuality(Number(e.target.value))} className="accent-brand-500" />
        </label>
      )}

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex flex-wrap gap-2">
        <Button onClick={convert} disabled={busy}>
          {busy ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Converting…</> : `Convert to ${target.toUpperCase()}`}
        </Button>
        {out && (
          <a href={out.url} download={out.name}
            className="inline-flex items-center gap-2 rounded-lg border border-brand-200 bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700 hover:bg-brand-100">
            <Download className="h-4 w-4" /> Download ({formatBytes(out.size)})
          </a>
        )}
      </div>

      <p className="text-xs text-ink-400">
        First conversion fetches ~2 MB of WebAssembly from the browser CDN — subsequent ones are instant.
      </p>
    </div>
  );
}

function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((res, rej) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => { URL.revokeObjectURL(url); res(img); };
    img.onerror = () => { URL.revokeObjectURL(url); rej(new Error("Could not read image.")); };
    img.src = url;
  });
}
