"use client";

import { useState } from "react";
import { Upload, X, Download, Loader2, RotateCw } from "lucide-react";
import { PDFDocument, degrees } from "pdf-lib";
import { Button } from "@/components/ui/button";
import { formatBytes, cn } from "@/lib/utils";

const ANGLES = [90, 180, 270] as const;

export function PdfRotateClient() {
  const [file, setFile] = useState<File | null>(null);
  const [angle, setAngle] = useState<number>(90);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);

  async function rotate() {
    if (!file || busy) return;
    setBusy(true); setError(null); setResultUrl(null);
    try {
      const doc = await PDFDocument.load(await file.arrayBuffer(), { ignoreEncryption: true });
      for (const page of doc.getPages()) {
        const cur = page.getRotation().angle;
        page.setRotation(degrees((cur + angle) % 360));
      }
      const blob = new Blob([await doc.save() as BlobPart], { type: "application/pdf" });
      setResultUrl(URL.createObjectURL(blob));
    } catch (e) { setError(`Could not rotate: ${(e as Error).message}`); }
    finally { setBusy(false); }
  }

  return (
    <div className="space-y-4">
      {!file ? (
        <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-blue-300 bg-blue-50/40 px-6 py-12 text-center transition-colors hover:brightness-95">
          <Upload className="h-7 w-7 text-blue-600" />
          <span className="mt-2 font-medium text-ink-900">Upload a PDF</span>
          <input type="file" accept="application/pdf,.pdf" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) { setFile(f); setResultUrl(null); } }} />
        </label>
      ) : (
        <div className="flex items-center justify-between rounded-lg border border-ink-100 bg-white px-4 py-2.5">
          <div className="min-w-0 truncate text-sm">
            <span className="font-medium text-ink-900">{file.name}</span>
            <span className="ml-2 text-ink-400">{formatBytes(file.size)}</span>
          </div>
          <button onClick={() => { setFile(null); setResultUrl(null); }} className="rounded p-1 text-xs text-ink-400 hover:bg-ink-50 hover:text-ink-700"><X className="h-3.5 w-3.5" /></button>
        </div>
      )}

      {file && (
        <div className="flex items-center gap-2">
          <span className="text-sm text-ink-500">Rotate every page by:</span>
          <div className="inline-flex rounded-lg border border-ink-200 bg-white p-1">
            {ANGLES.map((a) => (
              <button key={a} onClick={() => setAngle(a)} className={cn("rounded-md px-3 py-1.5 text-sm font-medium transition-colors", angle === a ? "bg-brand-500 text-white" : "text-ink-600 hover:text-ink-900")}>
                {a}°
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        <Button onClick={rotate} disabled={!file || busy} size="lg">
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <RotateCw className="h-4 w-4" />}
          {busy ? "Rotating…" : `Rotate by ${angle}°`}
        </Button>
        {resultUrl && (
          <a href={resultUrl} download="rotated.pdf">
            <Button variant="outline" size="lg"><Download className="h-4 w-4" /> Download rotated PDF</Button>
          </a>
        )}
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}
      <p className="text-xs text-ink-400">Processed 100% in your browser — your PDF is never uploaded.</p>
    </div>
  );
}
