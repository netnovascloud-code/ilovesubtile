"use client";

import { useEffect, useRef, useState } from "react";
import { Upload, X, Download, Loader2, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatBytes } from "@/lib/utils";

type Entry = { id: string; file: File; rows: string[][]; headers: string[] };

function parseCsv(text: string): string[][] {
  // Minimal RFC-4180 parser: quotes, escaped quotes, commas inside quotes, CRLF.
  const out: string[][] = [];
  let row: string[] = [];
  let cur = "";
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') { cur += '"'; i++; } else inQuotes = false;
      } else cur += c;
    } else {
      if (c === '"') inQuotes = true;
      else if (c === ",") { row.push(cur); cur = ""; }
      else if (c === "\n") { row.push(cur); out.push(row); row = []; cur = ""; }
      else if (c === "\r") { /* swallow */ }
      else cur += c;
    }
  }
  if (cur.length || row.length) { row.push(cur); out.push(row); }
  return out.filter((r) => r.some((c) => c.length));
}
function toCsv(rows: string[][]): string {
  return rows.map((r) => r.map((c) => /[,"\n]/.test(c) ? `"${c.replace(/"/g, '""')}"` : c).join(",")).join("\n") + "\n";
}

export function MergeCsvClient() {
  const [items, setItems] = useState<Entry[]>([]);
  const [mode, setMode] = useState<"by_name" | "stack">("by_name");
  const [out, setOut] = useState<string>("");
  const [outSize, setOutSize] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const dragIndex = useRef<number | null>(null);

  useEffect(() => { if (items.length) buildMerge(); else setOut(""); /* eslint-disable-next-line react-hooks/exhaustive-deps */ }, [items, mode]);

  async function add(files: FileList | null) {
    if (!files) return;
    setError(null); setBusy(true);
    try {
      const next: Entry[] = [];
      for (const f of Array.from(files)) {
        const text = await f.text();
        const rows = parseCsv(text);
        if (!rows.length) continue;
        next.push({ id: crypto.randomUUID(), file: f, rows: rows.slice(1), headers: rows[0] });
      }
      setItems((s) => [...s, ...next]);
    } catch (e) {
      setError(`Could not read CSV: ${(e as Error).message}`);
    } finally {
      setBusy(false);
    }
  }

  function remove(id: string) { setItems((s) => s.filter((e) => e.id !== id)); }
  function move(from: number, to: number) {
    setItems((s) => { const n = s.slice(); const [it] = n.splice(from, 1); n.splice(to, 0, it); return n; });
  }

  function buildMerge() {
    if (mode === "stack") {
      const merged = items.flatMap((e, i) => i === 0 ? [e.headers, ...e.rows] : e.rows);
      const text = toCsv(merged);
      setOut(text); setOutSize(new Blob([text]).size);
      return;
    }
    // by_name: take the union of headers (in order seen), align each row by header.
    const allHeaders: string[] = [];
    for (const e of items) for (const h of e.headers) if (!allHeaders.includes(h)) allHeaders.push(h);
    const rows: string[][] = [allHeaders];
    for (const e of items) {
      const idx = allHeaders.map((h) => e.headers.indexOf(h));
      for (const r of e.rows) rows.push(idx.map((i) => (i >= 0 ? (r[i] ?? "") : "")));
    }
    const text = toCsv(rows);
    setOut(text); setOutSize(new Blob([text]).size);
  }

  function downloadCsv() {
    const blob = new Blob([out], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "merged.csv";
    a.click();
    URL.revokeObjectURL(a.href);
  }

  return (
    <div className="space-y-4">
      <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-teal-300 bg-teal-50/40 px-6 py-10 text-center transition-colors hover:brightness-95">
        <Upload className="h-7 w-7 text-teal-600" />
        <span className="mt-2 font-medium text-ink-900">Add CSV files</span>
        <span className="mt-0.5 text-xs text-ink-400">Parsed and merged in your browser</span>
        <input type="file" accept=".csv,text/csv" multiple className="hidden" onChange={(e) => add(e.target.files)} />
      </label>

      {items.length > 0 && (
        <>
          <ul className="space-y-2">
            {items.map((e, i) => (
              <li key={e.id} draggable onDragStart={() => { dragIndex.current = i; }} onDragOver={(ev) => ev.preventDefault()}
                onDrop={() => { if (dragIndex.current !== null && dragIndex.current !== i) move(dragIndex.current, i); dragIndex.current = null; }}
                className="flex items-center gap-3 rounded-lg border border-ink-100 bg-white px-3 py-2 text-sm">
                <GripVertical className="h-4 w-4 cursor-grab text-ink-300" />
                <span className="grid h-6 w-6 place-items-center rounded bg-teal-50 text-xs font-bold text-teal-700">{i + 1}</span>
                <span className="min-w-0 flex-1 truncate">
                  <span className="font-medium text-ink-900">{e.file.name}</span>
                  <span className="ml-2 text-xs text-ink-400">{e.rows.length} rows · {e.headers.length} cols</span>
                </span>
                <button onClick={() => remove(e.id)} className="rounded p-1 text-ink-400 hover:bg-ink-50 hover:text-red-600"><X className="h-3.5 w-3.5" /></button>
              </li>
            ))}
          </ul>

          <label className="flex items-center gap-2 text-sm text-ink-600">Merge mode
            <select value={mode} onChange={(e) => setMode(e.target.value as typeof mode)} className="rounded-md border border-ink-200 bg-white px-2 py-1 text-sm">
              <option value="by_name">Align columns by header name (recommended)</option>
              <option value="stack">Just stack rows (keep first file's headers)</option>
            </select>
          </label>
        </>
      )}

      {busy && <p className="flex items-center gap-2 text-sm text-ink-500"><Loader2 className="h-4 w-4 animate-spin" /> Parsing…</p>}

      {out && (
        <>
          <div className="flex flex-wrap gap-2">
            <Button size="lg" onClick={downloadCsv}><Download className="h-4 w-4" /> Download merged.csv · {formatBytes(outSize)}</Button>
          </div>
          <pre className="max-h-72 overflow-auto rounded-lg border border-ink-100 bg-white p-3 font-mono text-xs leading-relaxed text-ink-700">{out.slice(0, 4000)}{out.length > 4000 && "\n…"}</pre>
        </>
      )}

      {error && <p className="text-sm text-red-600">{error}</p>}
      <p className="text-xs text-ink-400">100% in your browser — your CSVs are never uploaded.</p>
    </div>
  );
}
