"use client";

import { useEffect, useRef, useState } from "react";
import { Upload, X, Copy, Check, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";

/** jsQR loaded from a CDN at runtime so webpack/SWC never see it.
 *  jsQR exports a default function that decodes a Uint8ClampedArray (RGBA). */
type JsQR = (data: Uint8ClampedArray, width: number, height: number) => null | { data: string; location: unknown };

async function loadJsQR(): Promise<JsQR> {
  const url = "https://esm.sh/jsqr@1.4.0";
  const mod = (await import(/* webpackIgnore: true */ url)) as { default: JsQR } | JsQR;
  return (typeof mod === "function" ? mod : (mod as { default: JsQR }).default);
}

function tryDetect(jsQR: JsQR, bmp: ImageBitmap): string | null {
  // Cap the work canvas so giant photos don't grind.
  const max = 1024;
  const scale = Math.min(1, max / Math.max(bmp.width, bmp.height));
  const w = Math.max(1, Math.round(bmp.width * scale));
  const h = Math.max(1, Math.round(bmp.height * scale));
  const canvas = document.createElement("canvas");
  canvas.width = w; canvas.height = h;
  const ctx = canvas.getContext("2d", { willReadFrequently: true })!;
  ctx.drawImage(bmp, 0, 0, w, h);
  const { data } = ctx.getImageData(0, 0, w, h);
  const r = jsQR(data, w, h);
  return r ? r.data : null;
}

export function QrCodeReaderClient() {
  const [file, setFile] = useState<File | null>(null);
  const [srcUrl, setSrcUrl] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState(false);
  const camRef = useRef<HTMLVideoElement | null>(null);
  const camStream = useRef<MediaStream | null>(null);
  const [scanning, setScanning] = useState(false);
  // The rAF loop must read a ref, not `scanning`: setScanning(true) hasn't applied
  // yet when startCam's closure is created, so the captured state would be false
  // and the loop would exit on its first tick (never decoding anything).
  const scanningRef = useRef(false);

  useEffect(() => () => { scanningRef.current = false; if (camStream.current) camStream.current.getTracks().forEach((t) => t.stop()); }, []);

  async function pick(f: File | null) {
    if (!f) return;
    setError(null); setResult(null);
    setFile(f); setSrcUrl(URL.createObjectURL(f));
    setBusy(true);
    try {
      const jsQR = await loadJsQR();
      const bmp = await createImageBitmap(f);
      const found = tryDetect(jsQR, bmp);
      bmp.close();
      if (found) setResult(found);
      else setError("No QR code detected in this image. Try a sharper photo or a closer crop.");
    } catch (e) {
      setError(`Could not read the image: ${(e as Error).message}`);
    } finally {
      setBusy(false);
    }
  }

  async function startCam() {
    try {
      setError(null); setResult(null); scanningRef.current = true; setScanning(true);
      const jsQR = await loadJsQR();
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
      camStream.current = stream;
      if (camRef.current) { camRef.current.srcObject = stream; await camRef.current.play(); }
      const tick = async () => {
        if (!scanningRef.current || !camRef.current || !camStream.current) return;
        const v = camRef.current;
        if (v.videoWidth && v.videoHeight) {
          const c = document.createElement("canvas");
          c.width = v.videoWidth; c.height = v.videoHeight;
          const ctx = c.getContext("2d", { willReadFrequently: true })!;
          ctx.drawImage(v, 0, 0);
          const { data } = ctx.getImageData(0, 0, c.width, c.height);
          const r = jsQR(data, c.width, c.height);
          if (r) { setResult(r.data); stopCam(); return; }
        }
        requestAnimationFrame(tick);
      };
      tick();
    } catch (e) {
      setError(`Camera access denied: ${(e as Error).message}`);
      scanningRef.current = false;
      setScanning(false);
    }
  }
  function stopCam() {
    scanningRef.current = false;
    setScanning(false);
    if (camStream.current) { camStream.current.getTracks().forEach((t) => t.stop()); camStream.current = null; }
  }

  async function copy() {
    if (!result) return;
    try { await navigator.clipboard.writeText(result); setCopied(true); setTimeout(() => setCopied(false), 1200); } catch {}
  }

  return (
    <div className="space-y-5">
      {!file && !scanning ? (
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50/40 px-6 py-10 text-center transition-colors hover:brightness-95">
            <Upload className="h-7 w-7 text-slate-600" />
            <span className="mt-2 font-medium text-ink-900">Upload an image</span>
            <span className="mt-0.5 text-xs text-ink-400">JPG, PNG or WebP — decoded in your browser</span>
            <input type="file" accept="image/*" className="hidden" onChange={(e) => pick(e.target.files?.[0] ?? null)} />
          </label>
          <button onClick={startCam} className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50/40 px-6 py-10 text-center transition-colors hover:brightness-95">
            <Camera className="h-7 w-7 text-slate-600" />
            <span className="mt-2 font-medium text-ink-900">Scan from camera</span>
            <span className="mt-0.5 text-xs text-ink-400">Live scan via your device camera</span>
          </button>
        </div>
      ) : null}

      {scanning && (
        <div className="rounded-lg border border-ink-100 bg-white p-3">
          <video ref={camRef} className="w-full max-w-md rounded" playsInline muted />
          <Button size="sm" variant="outline" className="mt-3" onClick={stopCam}>Stop</Button>
        </div>
      )}

      {file && (
        <div className="flex items-center justify-between rounded-lg border border-ink-100 bg-white px-4 py-2.5 text-sm">
          <div className="min-w-0 truncate"><span className="font-medium text-ink-900">{file.name}</span></div>
          <button onClick={() => { setFile(null); setSrcUrl(null); setResult(null); setError(null); }} className="rounded p-1 text-ink-400 hover:bg-ink-50 hover:text-ink-700"><X className="h-3.5 w-3.5" /></button>
        </div>
      )}

      {srcUrl && (
        <div className="rounded-lg border border-ink-100 bg-white p-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={srcUrl} alt="Source" className="mx-auto max-h-64 rounded object-contain" />
        </div>
      )}

      {busy && <p className="text-sm text-ink-500">Decoding…</p>}

      {result && (
        <div className="rounded-lg border border-emerald-200 bg-emerald-50/40 p-4">
          <p className="text-xs uppercase tracking-wide text-emerald-700">Decoded</p>
          <p className="mt-2 break-all font-mono text-sm text-ink-900">{result}</p>
          <div className="mt-3 flex gap-2">
            <Button size="sm" variant="outline" onClick={copy}>{copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}{copied ? "Copied" : "Copy"}</Button>
            {/^https?:\/\//i.test(result) && <a href={result} target="_blank" rel="noopener noreferrer"><Button size="sm">Open link</Button></a>}
          </div>
        </div>
      )}

      {error && <p className="text-sm text-red-600">{error}</p>}
      <p className="text-xs text-ink-400">100% in your browser via jsQR — your image is never uploaded.</p>
    </div>
  );
}
