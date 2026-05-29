"use client";

import { useState } from "react";
import { Upload, X, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

type ZX = {
  BrowserMultiFormatReader: new () => {
    decodeFromImageUrl: (url: string) => Promise<{ getText(): string; getBarcodeFormat(): number } | undefined>;
  };
  BarcodeFormat?: Record<number, string>;
};

async function loadZxing(): Promise<ZX> {
  const url = "https://esm.sh/@zxing/library@0.21.3";
  return (await import(/* webpackIgnore: true */ url)) as ZX;
}

export function BarcodeReaderClient() {
  const [file, setFile] = useState<File | null>(null);
  const [srcUrl, setSrcUrl] = useState<string | null>(null);
  const [result, setResult] = useState<{ text: string; format: string } | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  async function pick(f: File | null) {
    if (!f) return;
    setError(null); setResult(null);
    setFile(f);
    const url = URL.createObjectURL(f);
    setSrcUrl(url);
    setBusy(true);
    try {
      const zx = await loadZxing();
      const reader = new zx.BrowserMultiFormatReader();
      const r = await reader.decodeFromImageUrl(url);
      if (!r) { setError("No barcode detected. Try a clearer photo or a tighter crop."); return; }
      const formatId = r.getBarcodeFormat();
      const formatName = zx.BarcodeFormat ? (zx.BarcodeFormat[formatId] ?? String(formatId)) : String(formatId);
      setResult({ text: r.getText(), format: String(formatName) });
    } catch (e) {
      setError(`Could not read the image: ${(e as Error).message}`);
    } finally {
      setBusy(false);
    }
  }

  async function copy() {
    if (!result) return;
    try { await navigator.clipboard.writeText(result.text); setCopied(true); setTimeout(() => setCopied(false), 1200); } catch {}
  }

  return (
    <div className="space-y-5">
      {!file ? (
        <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50/40 px-6 py-12 text-center transition-colors hover:brightness-95">
          <Upload className="h-7 w-7 text-slate-600" />
          <span className="mt-2 font-medium text-ink-900">Upload an image with a barcode</span>
          <span className="mt-0.5 text-xs text-ink-400">EAN, UPC, Code 128, QR — decoded in your browser</span>
          <input type="file" accept="image/*" className="hidden" onChange={(e) => pick(e.target.files?.[0] ?? null)} />
        </label>
      ) : (
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
          <p className="text-xs uppercase tracking-wide text-emerald-700">{result.format}</p>
          <p className="mt-2 break-all font-mono text-base text-ink-900">{result.text}</p>
          <Button size="sm" variant="outline" className="mt-3" onClick={copy}>
            {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}{copied ? "Copied" : "Copy"}
          </Button>
        </div>
      )}

      {error && <p className="text-sm text-red-600">{error}</p>}
      <p className="text-xs text-ink-400">100% in your browser via @zxing/library — your image is never uploaded.</p>
    </div>
  );
}
