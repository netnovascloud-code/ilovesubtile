"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Download, X, Loader2, GripVertical, Trash2, RotateCw, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatBytes } from "@/lib/utils";

// Combined "organize PDF" tool — what iLovePDF calls /organize_pdf. Loads
// every page as a thumbnail, lets the user drag to reorder, rotate each
// page 90deg, or delete individual pages, then saves a fresh PDF with
// only the surviving (re-ordered) pages.
//
// pdf-lib handles the PDF mutation; pdfjs-dist renders the previews.
type Page = { id: string; sourceIndex: number; rotation: number; thumb: string };

export function OrganizePdfClient() {
  const [file, setFile] = useState<File | null>(null);
  const [pages, setPages] = useState<Page[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [out, setOut] = useState<{ url: string; size: number } | null>(null);
  const dragIdx = useRef<number | null>(null);

  const onFile = useCallback(async (f: File) => {
    setError(null); setOut(null); setFile(f); setPages([]);
    setBusy(true);
    try {
      const url = "https://esm.sh/pdfjs-dist@4.7.76/build/pdf.mjs";
      const pdfjs = await import(/* webpackIgnore: true */ url) as typeof import("pdfjs-dist");
      // Workers are heavy and tend to break under bundlers — disable them and
      // run the small worker payload on the main thread (fine for thumbnails).
      pdfjs.GlobalWorkerOptions.workerSrc = "https://esm.sh/pdfjs-dist@4.7.76/build/pdf.worker.mjs";
      const data = new Uint8Array(await f.arrayBuffer());
      const doc = await pdfjs.getDocument({ data }).promise;
      const out: Page[] = [];
      for (let i = 0; i < doc.numPages; i++) {
        const page = await doc.getPage(i + 1);
        const vp = page.getViewport({ scale: 0.4 });
        const c = document.createElement("canvas");
        c.width = vp.width; c.height = vp.height;
        await page.render({ canvas: c, canvasContext: c.getContext("2d")!, viewport: vp }).promise;
        out.push({ id: crypto.randomUUID(), sourceIndex: i, rotation: 0, thumb: c.toDataURL("image/jpeg", 0.75) });
      }
      setPages(out);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not read this PDF.");
    } finally {
      setBusy(false);
    }
  }, []);

  const move = (from: number, to: number) => {
    if (from === to) return;
    setPages((p) => { const c = p.slice(); const [it] = c.splice(from, 1); c.splice(to, 0, it); return c; });
  };
  const remove = (i: number) => setPages((p) => p.filter((_, idx) => idx !== i));
  const rotate = (i: number) => setPages((p) => p.map((pg, idx) => idx === i ? { ...pg, rotation: (pg.rotation + 90) % 360 } : pg));

  const exportPdf = useCallback(async () => {
    if (!file || !pages.length) return;
    setBusy(true); setError(null);
    try {
      const { PDFDocument, degrees } = await import("pdf-lib");
      const src = await PDFDocument.load(await file.arrayBuffer());
      const dst = await PDFDocument.create();
      const copied = await dst.copyPages(src, pages.map((p) => p.sourceIndex));
      for (let i = 0; i < copied.length; i++) {
        const page = copied[i];
        const rot = pages[i].rotation;
        if (rot) page.setRotation(degrees(((page.getRotation().angle ?? 0) + rot) % 360));
        dst.addPage(page);
      }
      const bytes = await dst.save();
      const blob = new Blob([new Uint8Array(bytes)], { type: "application/pdf" });
      if (out) URL.revokeObjectURL(out.url);
      setOut({ url: URL.createObjectURL(blob), size: blob.size });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not export PDF.");
    } finally {
      setBusy(false);
    }
  }, [file, pages, out]);

  const reset = () => {
    if (out) URL.revokeObjectURL(out.url);
    setFile(null); setPages([]); setOut(null); setError(null);
  };

  if (!file) {
    return (
      <label className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-ink-200 bg-ink-50/40 px-6 py-16 text-center transition hover:border-brand-400">
        <Upload className="h-8 w-8 text-ink-400" />
        <div className="text-base font-semibold text-ink-900">Drop your PDF</div>
        <div className="text-sm text-ink-500">Reorder pages, rotate them, or delete what you don't need.</div>
        <input type="file" accept="application/pdf,.pdf" className="sr-only" onChange={(e) => e.target.files?.[0] && onFile(e.target.files[0])} />
        <span className="mt-2 rounded-lg bg-brand-500 px-4 py-2 text-sm font-semibold text-white">Choose PDF</span>
      </label>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0 truncate text-sm text-ink-700">{file.name} <span className="text-ink-400">({pages.length} pages)</span></div>
        <Button variant="ghost" size="sm" onClick={reset}><X className="h-4 w-4" /></Button>
      </div>

      {busy && !pages.length && (
        <div className="flex items-center justify-center gap-2 py-12 text-sm text-ink-500"><Loader2 className="h-4 w-4 animate-spin" />Rendering pages…</div>
      )}

      {pages.length > 0 && (
        <>
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {pages.map((p, i) => (
              <li key={p.id}
                draggable
                onDragStart={() => { dragIdx.current = i; }}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => { if (dragIdx.current !== null) move(dragIdx.current, i); dragIdx.current = null; }}
                className="group relative cursor-move rounded-lg border border-ink-200 bg-white p-2 shadow-sm hover:border-brand-300">
                <div className="absolute right-1 top-1 z-10 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                  <button onClick={() => rotate(i)} className="grid h-6 w-6 place-items-center rounded bg-white/90 text-ink-700 shadow ring-1 ring-ink-200 hover:bg-brand-50" title="Rotate 90°">
                    <RotateCw className="h-3.5 w-3.5" />
                  </button>
                  <button onClick={() => remove(i)} className="grid h-6 w-6 place-items-center rounded bg-white/90 text-red-600 shadow ring-1 ring-ink-200 hover:bg-red-50" title="Delete page">
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
                <img src={p.thumb} alt={`page ${i + 1}`} style={{ transform: `rotate(${p.rotation}deg)` }} className="mx-auto block max-h-44 w-auto transition-transform" />
                <div className="mt-1 flex items-center justify-between text-xs text-ink-500">
                  <GripVertical className="h-3 w-3" />
                  <span>Page {i + 1}</span>
                  <span className="font-mono text-ink-400">#{p.sourceIndex + 1}</span>
                </div>
              </li>
            ))}
          </ul>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <div className="flex flex-wrap gap-2">
            <Button onClick={exportPdf} disabled={busy || !pages.length}>
              {busy ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Exporting…</> : "Export reorganized PDF"}
            </Button>
            {out && (
              <a href={out.url} download={`organized-${file.name}`}
                className="inline-flex items-center gap-2 rounded-lg border border-brand-200 bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700 hover:bg-brand-100">
                <Download className="h-4 w-4" /> Download ({formatBytes(out.size)})
              </a>
            )}
          </div>
        </>
      )}

      <p className="text-xs text-ink-400">Drag a thumbnail to a new position to reorder. Everything runs in your browser — the PDF is never uploaded.</p>
    </div>
  );
}
