"use client";

import { useRef, useState } from "react";
import { Upload, X, Download, Loader2, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatBytes } from "@/lib/utils";

type Entry = { id: string; file: File };

export function PdfMergeClient() {
  const [items, setItems] = useState<Entry[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const dragIndex = useRef<number | null>(null);

  function add(files: FileList | null) {
    if (!files) return;
    const next: Entry[] = [];
    for (const f of Array.from(files)) {
      if (f.type === "application/pdf" || f.name.toLowerCase().endsWith(".pdf")) {
        next.push({ id: crypto.randomUUID(), file: f });
      }
    }
    setItems((s) => [...s, ...next]);
    setResultUrl(null); setError(null);
  }

  function remove(id: string) {
    setItems((s) => s.filter((e) => e.id !== id));
    setResultUrl(null);
  }

  function move(from: number, to: number) {
    setItems((s) => {
      const next = s.slice();
      const [it] = next.splice(from, 1);
      next.splice(to, 0, it);
      return next;
    });
  }

  async function merge() {
    if (items.length < 2 || busy) return;
    setBusy(true); setError(null); setResultUrl(null);
    try {
      const { PDFDocument } = await import("pdf-lib");
      const out = await PDFDocument.create();
      for (const { file } of items) {
        const bytes = await file.arrayBuffer();
        const src = await PDFDocument.load(bytes, { ignoreEncryption: true });
        const pages = await out.copyPages(src, src.getPageIndices());
        for (const p of pages) out.addPage(p);
      }
      const blob = new Blob([await out.save() as BlobPart], { type: "application/pdf" });
      setResultUrl(URL.createObjectURL(blob));
    } catch (e) {
      setError(`Could not merge: ${(e as Error).message}`);
    } finally { setBusy(false); }
  }

  return (
    <div className="space-y-4">
      <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-blue-300 bg-blue-50/40 px-6 py-10 text-center transition-colors hover:brightness-95">
        <Upload className="h-7 w-7 text-blue-600" />
        <span className="mt-2 font-medium text-ink-900">Add PDF files</span>
        <span className="mt-0.5 text-xs text-ink-400">Drop files here or click to choose · drag to reorder</span>
        <input type="file" accept="application/pdf,.pdf" multiple className="hidden" onChange={(e) => add(e.target.files)} />
      </label>

      {items.length > 0 && (
        <ul className="space-y-2">
          {items.map((e, i) => (
            <li
              key={e.id}
              draggable
              onDragStart={() => { dragIndex.current = i; }}
              onDragOver={(ev) => ev.preventDefault()}
              onDrop={() => { if (dragIndex.current !== null && dragIndex.current !== i) move(dragIndex.current, i); dragIndex.current = null; }}
              className="flex items-center gap-3 rounded-lg border border-ink-100 bg-white px-3 py-2"
            >
              <GripVertical className="h-4 w-4 cursor-grab text-ink-300" />
              <span className="grid h-6 w-6 place-items-center rounded bg-blue-50 text-xs font-bold text-blue-600">{i + 1}</span>
              <span className="flex-1 truncate text-sm text-ink-800">{e.file.name}</span>
              <span className="text-xs text-ink-400">{formatBytes(e.file.size)}</span>
              <button onClick={() => remove(e.id)} className="rounded p-1 text-ink-400 hover:bg-ink-50 hover:text-red-600"><X className="h-3.5 w-3.5" /></button>
            </li>
          ))}
        </ul>
      )}

      <div className="flex flex-wrap gap-2">
        <Button onClick={merge} disabled={items.length < 2 || busy} size="lg">
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          {busy ? "Merging…" : `Merge ${items.length || ""} PDFs`}
        </Button>
        {resultUrl && (
          <a href={resultUrl} download="merged.pdf">
            <Button variant="outline" size="lg"><Download className="h-4 w-4" /> Download merged PDF</Button>
          </a>
        )}
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}
      <p className="text-xs text-ink-400">Merged 100% in your browser — your PDFs are never uploaded.</p>
    </div>
  );
}
