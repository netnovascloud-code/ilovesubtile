"use client";

import { useCallback, useEffect, useState } from "react";
import { Download, X, Loader2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatBytes } from "@/lib/utils";

// Edit the seven standard PDF info fields (title, author, subject, keywords,
// creator, producer, creation date). Reads the current values on upload so
// the form starts pre-populated.
type Meta = {
  title: string; author: string; subject: string; keywords: string;
  creator: string; producer: string;
};
const EMPTY: Meta = { title: "", author: "", subject: "", keywords: "", creator: "", producer: "" };

export function EditPdfMetadataClient() {
  const [file, setFile] = useState<File | null>(null);
  const [meta, setMeta] = useState<Meta>(EMPTY);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [out, setOut] = useState<{ url: string; size: number } | null>(null);

  const onFile = useCallback(async (f: File) => {
    setError(null); setOut(null); setFile(f);
    try {
      const { PDFDocument } = await import("pdf-lib");
      const doc = await PDFDocument.load(await f.arrayBuffer(), { ignoreEncryption: true });
      setMeta({
        title: doc.getTitle() ?? "",
        author: doc.getAuthor() ?? "",
        subject: doc.getSubject() ?? "",
        // pdf-lib returns Keywords as a string[] in newer versions; coerce.
        keywords: ([] as string[]).concat(doc.getKeywords() ?? []).join(", "),
        creator: doc.getCreator() ?? "",
        producer: doc.getProducer() ?? "",
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not read this PDF.");
    }
  }, []);

  const save = useCallback(async () => {
    if (!file) return;
    setBusy(true); setError(null);
    try {
      const { PDFDocument } = await import("pdf-lib");
      const doc = await PDFDocument.load(await file.arrayBuffer(), { ignoreEncryption: true });
      doc.setTitle(meta.title);
      doc.setAuthor(meta.author);
      doc.setSubject(meta.subject);
      doc.setKeywords(meta.keywords.split(",").map((s) => s.trim()).filter(Boolean));
      doc.setCreator(meta.creator);
      doc.setProducer(meta.producer);
      doc.setModificationDate(new Date());
      const bytes = await doc.save();
      const blob = new Blob([new Uint8Array(bytes)], { type: "application/pdf" });
      if (out) URL.revokeObjectURL(out.url);
      setOut({ url: URL.createObjectURL(blob), size: blob.size });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not save PDF.");
    } finally {
      setBusy(false);
    }
  }, [file, meta, out]);

  const reset = () => {
    if (out) URL.revokeObjectURL(out.url);
    setFile(null); setMeta(EMPTY); setOut(null); setError(null);
  };

  if (!file) {
    return (
      <label className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-ink-200 bg-ink-50/40 px-6 py-16 text-center transition hover:border-brand-400">
        <Upload className="h-8 w-8 text-ink-400" />
        <div className="text-base font-semibold text-ink-900">Drop your PDF</div>
        <div className="text-sm text-ink-500">Edit the document title, author, subject and keywords.</div>
        <input type="file" accept="application/pdf,.pdf" className="sr-only" onChange={(e) => e.target.files?.[0] && onFile(e.target.files[0])} />
        <span className="mt-2 rounded-lg bg-brand-500 px-4 py-2 text-sm font-semibold text-white">Choose PDF</span>
      </label>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0 truncate text-sm text-ink-700">{file.name}</div>
        <Button variant="ghost" size="sm" onClick={reset}><X className="h-4 w-4" /></Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {([
          ["title", "Title"], ["author", "Author"],
          ["subject", "Subject"], ["keywords", "Keywords (comma-separated)"],
          ["creator", "Creator (app that authored it)"], ["producer", "Producer (engine)"],
        ] as const).map(([k, label]) => (
          <label key={k} className="flex flex-col text-xs font-medium text-ink-600">
            {label}
            <input value={meta[k]} onChange={(e) => setMeta({ ...meta, [k]: e.target.value })}
              className="mt-1 rounded-md border border-ink-200 bg-white px-3 py-2 text-sm text-ink-900 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100" />
          </label>
        ))}
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex flex-wrap gap-2">
        <Button onClick={save} disabled={busy}>
          {busy ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Saving…</> : "Save updated PDF"}
        </Button>
        {out && (
          <a href={out.url} download={`metadata-${file.name}`}
            className="inline-flex items-center gap-2 rounded-lg border border-brand-200 bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700 hover:bg-brand-100">
            <Download className="h-4 w-4" /> Download ({formatBytes(out.size)})
          </a>
        )}
      </div>

      <p className="text-xs text-ink-400">Edit happens entirely in your browser via pdf-lib — the PDF is never uploaded.</p>
    </div>
  );
}
