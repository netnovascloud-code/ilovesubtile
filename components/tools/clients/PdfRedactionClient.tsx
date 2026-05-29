"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { FileText, Download, Loader2, Undo2, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MiniDrop } from "@/components/tools/MiniDrop";

type PdfViewport = { width: number; height: number };
type PdfPage = {
  getViewport: (o: { scale: number }) => PdfViewport;
  render: (o: { canvasContext: CanvasRenderingContext2D; viewport: PdfViewport }) => { promise: Promise<void> };
};
type PdfDoc = { numPages: number; getPage: (n: number) => Promise<PdfPage> };
type PdfJs = {
  GlobalWorkerOptions: { workerSrc: string };
  getDocument: (src: { data: Uint8Array }) => { promise: Promise<PdfDoc> };
};

let pdfjsCache: PdfJs | null = null;
async function loadPdfjs(): Promise<PdfJs> {
  if (pdfjsCache) return pdfjsCache;
  const url = "https://esm.sh/pdfjs-dist@4.7.76/build/pdf.min.mjs";
  const lib = (await import(/* webpackIgnore: true */ url)) as unknown as PdfJs;
  lib.GlobalWorkerOptions.workerSrc = "https://esm.sh/pdfjs-dist@4.7.76/build/pdf.worker.min.mjs";
  pdfjsCache = lib;
  return lib;
}

/** Normalised rectangle (0..1) relative to its page, so it survives any scale. */
type Rect = { x: number; y: number; w: number; h: number };

const DISPLAY_W = 720;

export function PdfRedactionClient() {
  const [file, setFile] = useState<File | null>(null);
  const [doc, setDoc] = useState<PdfDoc | null>(null);
  const [pageNum, setPageNum] = useState(1);
  const [rectsByPage, setRectsByPage] = useState<Record<number, Rect[]>>({});
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("");
  const [error, setError] = useState<string | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; y: number } | null>(null);
  const [preview, setPreview] = useState<Rect | null>(null);

  async function onFile(f: File) {
    setFile(f); setError(null); setRectsByPage({}); setPageNum(1); setBusy(true); setStatus("Loading PDF…");
    try {
      const pdfjs = await loadPdfjs();
      const d = await pdfjs.getDocument({ data: new Uint8Array(await f.arrayBuffer()) }).promise;
      setDoc(d);
    } catch (e) {
      setError(`Could not open the PDF: ${(e as Error).message}`);
    } finally { setBusy(false); setStatus(""); }
  }

  const renderPage = useCallback(async (d: PdfDoc, n: number) => {
    const page = await d.getPage(n);
    const base = page.getViewport({ scale: 1 });
    const scale = DISPLAY_W / base.width;
    const vp = page.getViewport({ scale });
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = vp.width; canvas.height = vp.height;
    await page.render({ canvasContext: canvas.getContext("2d")!, viewport: vp }).promise;
  }, []);

  useEffect(() => { if (doc) renderPage(doc, pageNum).catch(() => {}); }, [doc, pageNum, renderPage]);

  // ---- drawing redaction boxes (normalised coords) ----
  const pos = (e: React.PointerEvent) => {
    const r = wrapRef.current!.getBoundingClientRect();
    return { x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height };
  };
  const onDown = (e: React.PointerEvent) => { drag.current = pos(e); setPreview(null); (e.target as Element).setPointerCapture(e.pointerId); };
  const onMove = (e: React.PointerEvent) => {
    if (!drag.current) return;
    const p = pos(e), s = drag.current;
    setPreview({ x: Math.min(s.x, p.x), y: Math.min(s.y, p.y), w: Math.abs(p.x - s.x), h: Math.abs(p.y - s.y) });
  };
  const onUp = () => {
    if (drag.current && preview && preview.w > 0.005 && preview.h > 0.005) {
      setRectsByPage((m) => ({ ...m, [pageNum]: [...(m[pageNum] ?? []), preview] }));
    }
    drag.current = null; setPreview(null);
  };
  const undo = () => setRectsByPage((m) => ({ ...m, [pageNum]: (m[pageNum] ?? []).slice(0, -1) }));

  const totalBoxes = Object.values(rectsByPage).reduce((a, r) => a + r.length, 0);

  // ---- flatten & export: rasterise every page, paint boxes, rebuild PDF ----
  async function exportPdf() {
    if (!doc || !file) return;
    setBusy(true); setError(null);
    try {
      const pdfjs = await loadPdfjs();
      const { PDFDocument } = await import("pdf-lib");
      const out = await PDFDocument.create();
      for (let n = 1; n <= doc.numPages; n++) {
        setStatus(`Flattening page ${n}/${doc.numPages}…`);
        const page = await doc.getPage(n);
        const pt = page.getViewport({ scale: 1 }); // size in PDF points
        const vp = page.getViewport({ scale: 2 }); // 2× for crisp raster
        const canvas = document.createElement("canvas");
        canvas.width = vp.width; canvas.height = vp.height;
        const ctx = canvas.getContext("2d")!;
        await page.render({ canvasContext: ctx, viewport: vp }).promise;
        ctx.fillStyle = "#000";
        for (const r of rectsByPage[n] ?? []) {
          ctx.fillRect(r.x * canvas.width, r.y * canvas.height, r.w * canvas.width, r.h * canvas.height);
        }
        const pngUrl = canvas.toDataURL("image/png");
        const img = await out.embedPng(pngUrl);
        const p = out.addPage([pt.width, pt.height]);
        p.drawImage(img, { x: 0, y: 0, width: pt.width, height: pt.height });
      }
      setStatus("Saving…");
      const bytes = await out.save();
      const blob = new Blob([bytes as BlobPart], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url; a.download = `${file.name.replace(/\.pdf$/i, "")}-redacted.pdf`;
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 4000);
    } catch (e) {
      setError(`Could not export the redacted PDF: ${(e as Error).message}`);
    } finally { setBusy(false); setStatus(""); }
  }

  const pageRects = rectsByPage[pageNum] ?? [];

  return (
    <div className="space-y-5">
      <MiniDrop
        label="PDF to redact"
        accept={{ "application/pdf": [".pdf"] }}
        icon={<FileText className="h-5 w-5" />}
        onFile={onFile}
        current={file}
      />

      {error && <p className="rounded border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</p>}
      {busy && <div className="flex items-center gap-2 text-sm text-ink-500"><Loader2 className="h-4 w-4 animate-spin" /> {status || "Working…"}</div>}

      {doc && (
        <>
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <Button variant="outline" size="sm" disabled={pageNum <= 1} onClick={() => setPageNum((n) => n - 1)}>Prev</Button>
            <span className="text-ink-600">Page {pageNum} / {doc.numPages}</span>
            <Button variant="outline" size="sm" disabled={pageNum >= doc.numPages} onClick={() => setPageNum((n) => n + 1)}>Next</Button>
            <Button variant="outline" size="sm" disabled={pageRects.length === 0} onClick={undo}><Undo2 className="h-3.5 w-3.5" /> Undo box</Button>
            <span className="text-xs text-ink-400">Drag on the page to draw a black box. {totalBoxes} box{totalBoxes === 1 ? "" : "es"} total.</span>
          </div>

          <div
            ref={wrapRef}
            onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp}
            className="relative mx-auto w-fit cursor-crosshair touch-none select-none rounded border border-ink-200"
            style={{ maxWidth: "100%" }}
          >
            <canvas ref={canvasRef} className="block max-w-full" />
            {pageRects.map((r, i) => (
              <div key={i} className="absolute bg-black" style={{ left: `${r.x * 100}%`, top: `${r.y * 100}%`, width: `${r.w * 100}%`, height: `${r.h * 100}%` }} />
            ))}
            {preview && (
              <div className="absolute border-2 border-brand-500 bg-brand-500/40" style={{ left: `${preview.x * 100}%`, top: `${preview.y * 100}%`, width: `${preview.w * 100}%`, height: `${preview.h * 100}%` }} />
            )}
          </div>

          <Button onClick={exportPdf} disabled={busy || totalBoxes === 0} size="lg">
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
            Export redacted PDF
          </Button>
          <p className="flex items-center gap-1.5 text-xs text-ink-400">
            <ShieldCheck className="h-3.5 w-3.5" />
            Pages are flattened to images on export, so redacted text is permanently removed — not just covered. 100% in your browser.
          </p>
        </>
      )}
    </div>
  );
}
