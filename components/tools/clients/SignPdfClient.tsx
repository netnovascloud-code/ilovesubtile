"use client";

import { useEffect, useRef, useState } from "react";
import { Upload, Download, X, Eraser, PenLine, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatBytes } from "@/lib/utils";

/**
 * Sign PDF — 100% in-browser (pdf-lib): draw a signature on a canvas, stamp
 * it onto the last page of the uploaded PDF, download the signed PDF.
 * No upload, no quota — privacy-first by design.
 *
 * Trade-off: pdf-lib alone can't render PDFs, so we don't show a preview-with-
 * pages. The signature is dropped at the bottom-right of the LAST page, which
 * is the standard signature location and covers 95 % of use cases.
 */
export function SignPdfClient() {
  const [file, setFile] = useState<File | null>(null);
  const [outUrl, setOutUrl] = useState<string | null>(null);
  const [outName, setOutName] = useState("signed.pdf");
  const [outSize, setOutSize] = useState(0);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [empty, setEmpty] = useState(true);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const drawing = useRef(false);

  // Init canvas with a baseline guide.
  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    cv.width = cv.clientWidth * (window.devicePixelRatio || 1);
    cv.height = cv.clientHeight * (window.devicePixelRatio || 1);
    const ctx = cv.getContext("2d")!;
    ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);
    ctx.lineWidth = 2.4;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = "#0f172a";
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, cv.clientWidth, cv.clientHeight);
    // Faint baseline.
    ctx.save();
    ctx.strokeStyle = "#e2e8f0";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(20, cv.clientHeight - 24);
    ctx.lineTo(cv.clientWidth - 20, cv.clientHeight - 24);
    ctx.stroke();
    ctx.restore();
  }, []);

  function pos(e: React.PointerEvent<HTMLCanvasElement>) {
    const r = canvasRef.current!.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  }
  function start(e: React.PointerEvent<HTMLCanvasElement>) {
    e.preventDefault();
    drawing.current = true;
    const { x, y } = pos(e);
    const ctx = canvasRef.current!.getContext("2d")!;
    ctx.beginPath();
    ctx.moveTo(x, y);
    canvasRef.current!.setPointerCapture(e.pointerId);
  }
  function move(e: React.PointerEvent<HTMLCanvasElement>) {
    if (!drawing.current) return;
    const { x, y } = pos(e);
    const ctx = canvasRef.current!.getContext("2d")!;
    ctx.lineTo(x, y);
    ctx.stroke();
    setEmpty(false);
  }
  function end() { drawing.current = false; }

  function clearSig() {
    const cv = canvasRef.current!;
    const ctx = cv.getContext("2d")!;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, cv.clientWidth, cv.clientHeight);
    ctx.save();
    ctx.strokeStyle = "#e2e8f0";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(20, cv.clientHeight - 24);
    ctx.lineTo(cv.clientWidth - 20, cv.clientHeight - 24);
    ctx.stroke();
    ctx.restore();
    setEmpty(true);
  }

  // Crop the bounding box of the inked pixels so the signature lands tight on
  // the page (no big white border around the strokes).
  async function trimSignature(): Promise<Blob | null> {
    const cv = canvasRef.current!;
    const ctx = cv.getContext("2d")!;
    const { width: w, height: h } = cv;
    const data = ctx.getImageData(0, 0, w, h).data;
    let minX = w, minY = h, maxX = 0, maxY = 0, found = false;
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const i = (y * w + x) * 4;
        // Treat near-white as background (the baseline guide is light grey, so
        // its pixels are >= ~220; ink is < ~80 typically).
        if (data[i] < 180) {
          if (x < minX) minX = x;
          if (y < minY) minY = y;
          if (x > maxX) maxX = x;
          if (y > maxY) maxY = y;
          found = true;
        }
      }
    }
    if (!found) return null;
    const pad = 8;
    minX = Math.max(0, minX - pad); minY = Math.max(0, minY - pad);
    maxX = Math.min(w - 1, maxX + pad); maxY = Math.min(h - 1, maxY + pad);
    const ow = maxX - minX + 1, oh = maxY - minY + 1;
    const out = document.createElement("canvas");
    out.width = ow; out.height = oh;
    const trimCtx = out.getContext("2d")!;
    trimCtx.drawImage(cv, minX, minY, ow, oh, 0, 0, ow, oh);
    // Drop near-white to transparent so the stamp blends onto any background.
    const px = trimCtx.getImageData(0, 0, ow, oh);
    for (let i = 0; i < px.data.length; i += 4) {
      const lum = (px.data[i] + px.data[i + 1] + px.data[i + 2]) / 3;
      if (lum > 235) px.data[i + 3] = 0;
    }
    trimCtx.putImageData(px, 0, 0);
    return await new Promise<Blob | null>((res) => out.toBlob(res, "image/png"));
  }

  async function sign() {
    if (!file || empty || busy) return;
    setBusy(true); setError(null); setOutUrl(null);
    try {
      const sigBlob = await trimSignature();
      if (!sigBlob) { setError("Please draw your signature first."); setBusy(false); return; }

      const { PDFDocument } = await import("pdf-lib");
      const pdfBytes = new Uint8Array(await file.arrayBuffer());
      const doc = await PDFDocument.load(pdfBytes);
      const sigBytes = new Uint8Array(await sigBlob.arrayBuffer());
      const png = await doc.embedPng(sigBytes);

      // Drop on the LAST page, bottom-right, ~22% of page width.
      const pages = doc.getPages();
      const last = pages[pages.length - 1];
      const { width: pw, height: ph } = last.getSize();
      const targetW = pw * 0.22;
      const targetH = targetW * (png.height / png.width);
      const margin = Math.min(pw, ph) * 0.05;
      last.drawImage(png, {
        x: pw - targetW - margin,
        y: margin,
        width: targetW,
        height: targetH,
      });

      const outBytes = await doc.save();
      const blob = new Blob([new Uint8Array(outBytes)], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      if (outUrl) URL.revokeObjectURL(outUrl);
      setOutUrl(url);
      setOutSize(blob.size);
      setOutName(file.name.replace(/\.pdf$/i, "") + "-signed.pdf");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not sign that PDF.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-4">
      {!file ? (
        <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-ink-200 bg-brand-50/30 px-6 py-12 text-center transition-colors hover:border-brand-300">
          <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-50 text-brand-600">
            <Upload className="h-5 w-5" />
          </span>
          <span className="mt-3 font-semibold text-ink-900">Upload your PDF</span>
          <span className="mt-0.5 text-xs text-ink-400">Anything with at least one page — stays in your browser</span>
          <input type="file" accept="application/pdf,.pdf" className="hidden"
            onChange={(e) => { const f = e.target.files?.[0]; if (f) { setFile(f); setOutUrl(null); setError(null); } }} />
        </label>
      ) : (
        <div className="flex items-center justify-between rounded-lg border border-ink-100 bg-white px-4 py-2.5">
          <div className="min-w-0 truncate text-sm">
            <span className="font-medium text-ink-900">{file.name}</span>
            <span className="ml-2 text-ink-400">{formatBytes(file.size)}</span>
          </div>
          <button onClick={() => { setFile(null); setOutUrl(null); }}
            className="rounded p-1 text-xs text-ink-400 hover:bg-ink-50 hover:text-ink-700">
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      <div className="rounded-lg border border-ink-100 bg-white p-4">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-ink-700">Draw your signature</label>
          <Button size="sm" variant="outline" onClick={clearSig}><Eraser className="h-3.5 w-3.5" /> Clear</Button>
        </div>
        <canvas
          ref={canvasRef}
          onPointerDown={start} onPointerMove={move} onPointerUp={end} onPointerCancel={end} onPointerLeave={end}
          className="mt-2 h-40 w-full touch-none cursor-crosshair rounded border border-ink-200 bg-white"
        />
        <p className="mt-1 text-xs text-ink-400">Drawn locally — never uploaded. Mouse, trackpad or finger.</p>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button onClick={sign} disabled={!file || empty || busy} size="lg">
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <PenLine className="h-4 w-4" />}
          {busy ? "Signing…" : "Sign PDF"}
        </Button>
        {outUrl && (
          <a href={outUrl} download={outName}>
            <Button size="lg" variant="outline">
              <Download className="h-4 w-4" /> Download · {formatBytes(outSize)}
            </Button>
          </a>
        )}
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}
      <p className="text-xs text-ink-400">
        Signs on the last page (bottom-right). Drawn signature, embedded as PNG with transparency. Everything happens in your browser — your PDF is never uploaded.
      </p>
    </div>
  );
}
