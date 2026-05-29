"use client";

import { useEffect, useRef, useState } from "react";
import { Upload, X, Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatBytes } from "@/lib/utils";

function hexToRgb01(hex: string): [number, number, number] {
  const m = hex.replace("#", "");
  const n = m.length === 3 ? m.split("").map((c) => c + c).join("") : m;
  const int = parseInt(n, 16);
  return [((int >> 16) & 255) / 255, ((int >> 8) & 255) / 255, (int & 255) / 255];
}

export function WatermarkPdfClient() {
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState("CONFIDENTIAL");
  const [color, setColor] = useState("#ff0000");
  const [opacity, setOpacity] = useState(0.2);
  const [size, setSize] = useState(48);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [outUrl, setOutUrl] = useState<string | null>(null);
  const [outName, setOutName] = useState("watermarked.pdf");
  const cleanup = useRef<string | null>(null);

  useEffect(() => () => { if (cleanup.current) URL.revokeObjectURL(cleanup.current); }, []);

  async function run() {
    if (!file || busy) return;
    setBusy(true); setError(null); setOutUrl(null);
    try {
      const { PDFDocument, StandardFonts, degrees, rgb } = await import("pdf-lib");
      const doc = await PDFDocument.load(await file.arrayBuffer());
      const font = await doc.embedFont(StandardFonts.HelveticaBold);
      const [r, g, b] = hexToRgb01(color);
      for (const page of doc.getPages()) {
        const { width, height } = page.getSize();
        const tw = font.widthOfTextAtSize(text, size);
        // Centre the diagonal watermark on the page.
        page.drawText(text, {
          x: width / 2 - (tw / 2) * Math.cos(Math.PI / 4),
          y: height / 2 - (tw / 2) * Math.sin(Math.PI / 4),
          size,
          font,
          color: rgb(r, g, b),
          opacity,
          rotate: degrees(45),
        });
      }
      const bytes = await doc.save();
      const blob = new Blob([bytes as BlobPart], { type: "application/pdf" });
      if (cleanup.current) URL.revokeObjectURL(cleanup.current);
      const url = URL.createObjectURL(blob);
      cleanup.current = url;
      setOutUrl(url);
      setOutName(file.name.replace(/\.pdf$/i, "") + "-watermarked.pdf");
    } catch (e) {
      setError(`Could not watermark the PDF: ${(e as Error).message}`);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-4">
      {!file ? (
        <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-blue-300 bg-blue-50/40 px-6 py-12 text-center transition-colors hover:brightness-95">
          <Upload className="h-7 w-7 text-blue-600" />
          <span className="mt-2 font-medium text-ink-900">Upload a PDF</span>
          <span className="mt-0.5 text-xs text-ink-400">A diagonal text watermark is added to every page, in your browser</span>
          <input type="file" accept="application/pdf,.pdf" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) { setFile(f); setOutUrl(null); } }} />
        </label>
      ) : (
        <div className="flex items-center justify-between rounded-lg border border-ink-100 bg-white px-4 py-2.5 text-sm">
          <div className="min-w-0 truncate"><span className="font-medium text-ink-900">{file.name}</span><span className="ml-2 text-ink-400">{formatBytes(file.size)}</span></div>
          <button onClick={() => { setFile(null); setOutUrl(null); }} className="rounded p-1 text-ink-400 hover:bg-ink-50 hover:text-ink-700"><X className="h-3.5 w-3.5" /></button>
        </div>
      )}

      {file && (
        <div className="grid gap-3 rounded-lg border border-ink-100 bg-white p-4 sm:grid-cols-2">
          <label className="flex flex-col text-xs font-medium text-ink-600 sm:col-span-2">
            Watermark text
            <input value={text} onChange={(e) => setText(e.target.value)} className="mt-1 rounded-md border border-ink-200 px-3 py-2 text-sm text-ink-900 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100" />
          </label>
          <label className="flex items-center gap-2 text-xs font-medium text-ink-600">
            Colour <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="h-7 w-10 cursor-pointer rounded border-0 bg-transparent p-0" />
          </label>
          <label className="flex flex-col text-xs font-medium text-ink-600">
            Opacity: {Math.round(opacity * 100)}%
            <input type="range" min={5} max={80} value={opacity * 100} onChange={(e) => setOpacity(Number(e.target.value) / 100)} className="mt-1" />
          </label>
          <label className="flex flex-col text-xs font-medium text-ink-600">
            Font size: {size}pt
            <input type="range" min={18} max={120} value={size} onChange={(e) => setSize(Number(e.target.value))} className="mt-1" />
          </label>
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        {file && <Button size="lg" onClick={run} disabled={busy}>{busy ? <Loader2 className="h-4 w-4 animate-spin" /> : null}{busy ? "Watermarking…" : "Add watermark"}</Button>}
        {outUrl && <a href={outUrl} download={outName}><Button size="lg" variant="outline"><Download className="h-4 w-4" /> Download PDF</Button></a>}
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}
      <p className="text-xs text-ink-400">100% in your browser via pdf-lib — your PDF is never uploaded.</p>
    </div>
  );
}
