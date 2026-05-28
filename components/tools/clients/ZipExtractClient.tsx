"use client";

import { useState } from "react";
import { Upload, Download, Loader2, X, FileText } from "lucide-react";
import JSZip from "jszip";
import { Button } from "@/components/ui/button";
import { formatBytes } from "@/lib/utils";

type Entry = { name: string; size: number; url: string };

export function ZipExtractClient() {
  const [file, setFile] = useState<File | null>(null);
  const [entries, setEntries] = useState<Entry[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function load(f: File) {
    setFile(f); setError(null); setEntries([]); setBusy(true);
    try {
      const zip = await JSZip.loadAsync(await f.arrayBuffer());
      const list: Entry[] = [];
      for (const path of Object.keys(zip.files)) {
        const entry = zip.files[path];
        if (entry.dir) continue;
        const blob = await entry.async("blob");
        list.push({ name: path, size: blob.size, url: URL.createObjectURL(blob) });
      }
      setEntries(list);
    } catch (e) { setError(`Could not open archive: ${(e as Error).message}`); }
    finally { setBusy(false); }
  }

  function clear() {
    entries.forEach((e) => URL.revokeObjectURL(e.url));
    setEntries([]); setFile(null);
  }

  return (
    <div className="space-y-4">
      {!file ? (
        <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-blue-300 bg-blue-50/40 px-6 py-12 text-center transition-colors hover:brightness-95">
          <Upload className="h-7 w-7 text-blue-600" />
          <span className="mt-2 font-medium text-ink-900">Upload a ZIP file</span>
          <input type="file" accept=".zip,application/zip,application/x-zip-compressed" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) load(f); }} />
        </label>
      ) : (
        <div className="flex items-center justify-between rounded-lg border border-ink-100 bg-white px-4 py-2.5">
          <div className="min-w-0 truncate text-sm">
            <span className="font-medium text-ink-900">{file.name}</span>
            <span className="ml-2 text-ink-400">{entries.length} file{entries.length === 1 ? "" : "s"} · {formatBytes(file.size)}</span>
          </div>
          <button onClick={clear} className="rounded p-1 text-xs text-ink-400 hover:bg-ink-50 hover:text-ink-700"><X className="h-3.5 w-3.5" /></button>
        </div>
      )}

      {busy && <p className="text-sm text-ink-500"><Loader2 className="inline h-3.5 w-3.5 animate-spin" /> Reading archive…</p>}
      {error && <p className="text-sm text-red-600">{error}</p>}

      {entries.length > 0 && (
        <ul className="divide-y divide-ink-100 rounded-lg border border-ink-100 bg-white">
          {entries.map((e) => (
            <li key={e.name} className="flex items-center gap-3 px-3 py-2">
              <FileText className="h-4 w-4 text-ink-400" />
              <span className="flex-1 truncate text-sm text-ink-800">{e.name}</span>
              <span className="text-xs text-ink-400">{formatBytes(e.size)}</span>
              <a href={e.url} download={e.name.split("/").pop() || e.name}>
                <Button size="sm" variant="outline"><Download className="h-3.5 w-3.5" /> Save</Button>
              </a>
            </li>
          ))}
        </ul>
      )}

      <p className="text-xs text-ink-400">Extracted 100% in your browser — your archive is never uploaded.</p>
    </div>
  );
}
