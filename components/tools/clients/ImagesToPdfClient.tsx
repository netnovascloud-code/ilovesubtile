"use client";

import { useRef, useState } from "react";
import { Upload, X, Download, Loader2, GripVertical } from "lucide-react";
import { PDFDocument } from "pdf-lib";
import { Button } from "@/components/ui/button";
import { formatBytes, cn } from "@/lib/utils";
import { TemplatesBar } from "@/components/tools/TemplatesBar";

type Entry = { id: string; file: File; previewUrl: string };

const PAGE_SIZES = [
  { id: "A4", label: "A4", width: 595.28, height: 841.89 },
  { id: "Letter", label: "Letter", width: 612, height: 792 },
  { id: "Fit", label: "Fit to image", width: 0, height: 0 },
] as const;

export function ImagesToPdfClient() {
  const [items, setItems] = useState<Entry[]>([]);
  const [pageSize, setPageSize] = useState<string>("A4");
  const [margin, setMargin] = useState<number>(20);
  const [busy, setBusy] = useState(false);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const dragIndex = useRef<number | null>(null);

  function add(files: FileList | null) {
    if (!files) return;
    const next: Entry[] = [];
    for (const f of Array.from(files)) {
      if (f.type === "image/jpeg" || f.type === "image/png") {
        next.push({ id: crypto.randomUUID(), file: f, previewUrl: URL.createObjectURL(f) });
      }
    }
    setItems((s) => [...s, ...next]);
    setResultUrl(null); setError(null);
  }
  function remove(id: string) {
    setItems((s) => { const found = s.find((e) => e.id === id); if (found) URL.revokeObjectURL(found.previewUrl); return s.filter((e) => e.id !== id); });
    setResultUrl(null);
  }
  function move(from: number, to: number) {
    setItems((s) => { const next = s.slice(); const [it] = next.splice(from, 1); next.splice(to, 0, it); return next; });
  }

  async function generate() {
    if (items.length === 0 || busy) return;
    setBusy(true); setError(null); setResultUrl(null);
    try {
      const doc = await PDFDocument.create();
      const size = PAGE_SIZES.find((p) => p.id === pageSize)!;
      for (const { file } of items) {
        const bytes = new Uint8Array(await file.arrayBuffer());
        const img = file.type === "image/png" ? await doc.embedPng(bytes) : await doc.embedJpg(bytes);
        let pageW: number, pageH: number;
        if (size.id === "Fit") { pageW = img.width; pageH = img.height; }
        else { pageW = size.width; pageH = size.height; }
        const page = doc.addPage([pageW, pageH]);
        if (size.id === "Fit") {
          page.drawImage(img, { x: 0, y: 0, width: pageW, height: pageH });
        } else {
          const m = margin;
          const aw = pageW - 2 * m, ah = pageH - 2 * m;
          const scale = Math.min(aw / img.width, ah / img.height);
          const w = img.width * scale, h = img.height * scale;
          page.drawImage(img, { x: (pageW - w) / 2, y: (pageH - h) / 2, width: w, height: h });
        }
      }
      const blob = new Blob([await doc.save() as BlobPart], { type: "application/pdf" });
      setResultUrl(URL.createObjectURL(blob));
    } catch (e) { setError(`Could not build PDF: ${(e as Error).message}`); }
    finally { setBusy(false); }
  }

  return (
    <div className="space-y-4">
      <TemplatesBar
        tool="images-to-pdf"
        settings={{ pageSize, margin }}
        onApply={(s) => {
          if (typeof s.pageSize === "string") setPageSize(s.pageSize);
          if (typeof s.margin === "number") setMargin(s.margin);
        }}
      />
      <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-blue-300 bg-blue-50/40 px-6 py-10 text-center transition-colors hover:brightness-95">
        <Upload className="h-7 w-7 text-blue-600" />
        <span className="mt-2 font-medium text-ink-900">Add JPG or PNG images</span>
        <span className="mt-0.5 text-xs text-ink-400">Drop here or click to choose · drag to reorder</span>
        <input type="file" accept="image/jpeg,image/png,.jpg,.jpeg,.png" multiple className="hidden" onChange={(e) => add(e.target.files)} />
      </label>

      {items.length > 0 && (
        <ul className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
          {items.map((e, i) => (
            <li
              key={e.id}
              draggable
              onDragStart={() => { dragIndex.current = i; }}
              onDragOver={(ev) => ev.preventDefault()}
              onDrop={() => { if (dragIndex.current !== null && dragIndex.current !== i) move(dragIndex.current, i); dragIndex.current = null; }}
              className="group relative rounded-lg border border-ink-100 bg-white p-2"
            >
              <div className="absolute right-1 top-1 z-10 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                <button onClick={() => remove(e.id)} className="rounded-md bg-white/90 p-1 text-ink-400 shadow hover:text-red-600"><X className="h-3 w-3" /></button>
              </div>
              <span className="absolute left-1 top-1 z-10 grid h-5 w-5 place-items-center rounded bg-blue-600 text-[10px] font-bold text-white">{i + 1}</span>
              <GripVertical className="absolute left-1 bottom-1 z-10 h-3.5 w-3.5 cursor-grab text-ink-300" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={e.previewUrl} alt="" className="aspect-square w-full rounded object-contain" />
              <p className="mt-1 truncate text-[11px] text-ink-500">{e.file.name} · {formatBytes(e.file.size)}</p>
            </li>
          ))}
        </ul>
      )}

      {items.length > 0 && (
        <div className="flex flex-wrap items-center gap-3">
          <div className="inline-flex rounded-lg border border-ink-200 bg-white p-1">
            {PAGE_SIZES.map((p) => (
              <button key={p.id} onClick={() => setPageSize(p.id)} className={cn("rounded-md px-3 py-1.5 text-sm font-medium transition-colors", pageSize === p.id ? "bg-brand-500 text-white" : "text-ink-600 hover:text-ink-900")}>
                {p.label}
              </button>
            ))}
          </div>
          {pageSize !== "Fit" && (
            <label className="flex items-center gap-2 text-sm text-ink-600">
              Margin
              <input type="number" min={0} max={120} value={margin} onChange={(e) => setMargin(Number(e.target.value))} className="w-20 rounded-md border border-ink-200 bg-white px-2 py-1 text-sm" />
              pt
            </label>
          )}
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        <Button onClick={generate} disabled={items.length === 0 || busy} size="lg">
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          {busy ? "Building PDF…" : "Generate PDF"}
        </Button>
        {resultUrl && (
          <a href={resultUrl} download="images.pdf">
            <Button variant="outline" size="lg"><Download className="h-4 w-4" /> Download PDF</Button>
          </a>
        )}
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}
      <p className="text-xs text-ink-400">Built 100% in your browser — your images are never uploaded.</p>
    </div>
  );
}
