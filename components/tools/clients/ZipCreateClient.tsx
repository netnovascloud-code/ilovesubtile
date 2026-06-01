"use client";

import { useState } from "react";
import { Upload, X, Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatBytes } from "@/lib/utils";

export function ZipCreateClient() {
  const [files, setFiles] = useState<File[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [resultSize, setResultSize] = useState<number>(0);
  const total = files.reduce((a, f) => a + f.size, 0);

  function add(list: FileList | null) {
    if (!list) return;
    setFiles((s) => [...s, ...Array.from(list)]);
    setResultUrl(null);
  }
  function remove(i: number) { setFiles((s) => s.filter((_, idx) => idx !== i)); setResultUrl(null); }

  async function makeZip() {
    if (files.length === 0 || busy) return;
    setBusy(true); setError(null); setResultUrl(null);
    try {
      const { default: JSZip } = await import("jszip");
      const zip = new JSZip();
      const seen = new Map<string, number>();
      for (const f of files) {
        let name = f.name;
        if (seen.has(name)) { const n = (seen.get(name) ?? 0) + 1; seen.set(name, n); const dot = name.lastIndexOf("."); name = dot > 0 ? `${name.slice(0, dot)} (${n})${name.slice(dot)}` : `${name} (${n})`; }
        else seen.set(name, 1);
        zip.file(name, f);
      }
      const blob = await zip.generateAsync({ type: "blob", compression: "DEFLATE", compressionOptions: { level: 6 } });
      setResultUrl(URL.createObjectURL(blob));
      setResultSize(blob.size);
    } catch (e) { setError(`Could not create ZIP: ${(e as Error).message}`); }
    finally { setBusy(false); }
  }

  return (
    <div className="space-y-4">
      <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-blue-300 bg-blue-50/40 px-6 py-10 text-center transition-colors hover:brightness-95">
        <Upload className="h-7 w-7 text-blue-600" />
        <span className="mt-2 font-medium text-ink-900">Add any files</span>
        <span className="mt-0.5 text-xs text-ink-400">Drop or click to choose — bundled into a single ZIP</span>
        <input type="file" multiple className="hidden" onChange={(e) => add(e.target.files)} />
      </label>

      {files.length > 0 && (
        <ul className="space-y-1.5">
          {files.map((f, i) => (
            <li key={i} className="flex items-center gap-2 rounded-md border border-ink-100 bg-white px-3 py-1.5 text-sm">
              <span className="flex-1 truncate text-ink-800">{f.name}</span>
              <span className="text-xs text-ink-400">{formatBytes(f.size)}</span>
              <button onClick={() => remove(i)} className="rounded p-1 text-ink-400 hover:text-red-600"><X className="h-3.5 w-3.5" /></button>
            </li>
          ))}
          <li className="px-3 py-1 text-xs text-ink-400">{files.length} file(s) · total {formatBytes(total)}</li>
        </ul>
      )}

      <div className="flex flex-wrap gap-2">
        <Button onClick={makeZip} disabled={files.length === 0 || busy} size="lg">
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          {busy ? "Compressing…" : `Create ZIP from ${files.length || ""} file(s)`}
        </Button>
        {resultUrl && (
          <a href={resultUrl} download="archive.zip">
            <Button variant="outline" size="lg"><Download className="h-4 w-4" /> Download ZIP ({formatBytes(resultSize)})</Button>
          </a>
        )}
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}
      <p className="text-xs text-ink-400">Bundled 100% in your browser — your files are never uploaded.</p>
    </div>
  );
}
