"use client";

import { useEffect, useRef, useState } from "react";
import { Upload, Download, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatBytes } from "@/lib/utils";

type BgModule = { removeBackground: (input: Blob | string, opts?: unknown) => Promise<Blob> };

// Load @imgly/background-removal from an ESM CDN at runtime so webpack/SWC
// never sees the lib's onnxruntime-web bundle (which uses dynamic require and
// breaks Next builds when included in the client chunk).
async function loadBgRemoval(): Promise<BgModule> {
  const url = "https://esm.sh/@imgly/background-removal@1.5.6?bundle";
  return (await import(/* webpackIgnore: true */ url)) as BgModule;
}

export function RemoveBackgroundClient() {
  const [file, setFile] = useState<File | null>(null);
  const [srcUrl, setSrcUrl] = useState<string | null>(null);
  const [outUrl, setOutUrl] = useState<string | null>(null);
  const [outSize, setOutSize] = useState(0);
  const [progress, setProgress] = useState(0);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const cleanup = useRef<string[]>([]);

  useEffect(() => () => { cleanup.current.forEach((u) => URL.revokeObjectURL(u)); }, []);

  function pick(f: File | null) {
    if (!f) return;
    setError(null); setOutUrl(null); setProgress(0); setOutSize(0);
    cleanup.current.forEach((u) => URL.revokeObjectURL(u));
    cleanup.current = [];
    const u = URL.createObjectURL(f);
    cleanup.current.push(u);
    setFile(f); setSrcUrl(u);
  }

  async function run() {
    if (!file || busy) return;
    setBusy(true); setError(null); setProgress(2); setOutUrl(null);
    try {
      const mod = await loadBgRemoval();
      const blob = await mod.removeBackground(file, {
        progress: (_key: string, current: number, total: number) => {
          if (total > 0) setProgress(Math.max(2, Math.min(99, Math.round((current / total) * 100))));
        },
        output: { format: "image/png", quality: 1 },
      });
      const url = URL.createObjectURL(blob);
      cleanup.current.push(url);
      setOutUrl(url); setOutSize(blob.size); setProgress(100);
    } catch (e) {
      setError(`Could not process the image: ${(e as Error).message}`);
    } finally { setBusy(false); }
  }

  return (
    <div className="space-y-5">
      {!file ? (
        <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-emerald-300 bg-emerald-50/40 px-6 py-16 text-center transition-colors hover:brightness-95">
          <span className="grid h-12 w-12 place-items-center rounded-xl bg-emerald-50 text-emerald-600">
            <Upload className="h-6 w-6" />
          </span>
          <span className="mt-3 font-semibold text-ink-900">Click to upload an image</span>
          <span className="mt-0.5 text-xs text-ink-400">JPG, PNG or WebP · processed privately in your browser</span>
          <input type="file" accept="image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp" className="hidden" onChange={(e) => pick(e.target.files?.[0] ?? null)} />
        </label>
      ) : (
        <div className="flex items-center justify-between rounded-lg border border-ink-100 bg-white px-4 py-2.5">
          <div className="min-w-0 truncate text-sm">
            <span className="font-medium text-ink-900">{file.name}</span>
            <span className="ml-2 text-ink-400">{formatBytes(file.size)}</span>
          </div>
          <button onClick={() => { setFile(null); setSrcUrl(null); setOutUrl(null); }} className="rounded p-1 text-xs text-ink-400 hover:bg-ink-50 hover:text-ink-700"><X className="h-3.5 w-3.5" /></button>
        </div>
      )}

      {file && (
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border border-ink-100 bg-white p-3">
            <p className="mb-2 text-sm font-medium text-ink-700">Original</p>
            <div className="grid min-h-56 place-items-center rounded bg-[repeating-conic-gradient(#f3f4f6_0_25%,#fff_0_50%)] bg-[length:16px_16px] p-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              {srcUrl && <img src={srcUrl} alt="Original" className="max-h-72 max-w-full object-contain" />}
            </div>
          </div>
          <div className="rounded-lg border border-ink-100 bg-white p-3">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-sm font-medium text-ink-700">Background removed</p>
              {outUrl && <span className="text-xs text-emerald-600">{formatBytes(outSize)}</span>}
            </div>
            <div className="grid min-h-56 place-items-center rounded bg-[repeating-conic-gradient(#f3f4f6_0_25%,#fff_0_50%)] bg-[length:16px_16px] p-2">
              {busy ? (
                <div className="flex flex-col items-center gap-2">
                  <Loader2 className="h-6 w-6 animate-spin text-emerald-500" />
                  <div className="h-1.5 w-40 overflow-hidden rounded-full bg-ink-100">
                    <div className="h-full rounded-full bg-emerald-500 transition-all" style={{ width: `${progress}%` }} />
                  </div>
                  <span className="text-xs text-ink-400">{progress}% · first run downloads the AI model (~40MB), then it's cached</span>
                </div>
              ) : outUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={outUrl} alt="Transparent" className="max-h-72 max-w-full object-contain" />
              ) : (
                <span className="text-sm text-ink-400">Result will appear here.</span>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        <Button size="lg" onClick={run} disabled={!file || busy}>
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          {busy ? "Removing background…" : "Remove background"}
        </Button>
        {outUrl && (
          <a href={outUrl} download="no-background.png">
            <Button size="lg" variant="outline"><Download className="h-4 w-4" /> Download PNG</Button>
          </a>
        )}
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}
      <p className="text-xs text-ink-400">100% in your browser via WebAssembly — your image is never uploaded.</p>
    </div>
  );
}
