"use client";

import { useState } from "react";
import { Upload, X, Copy, Check, Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatBytes } from "@/lib/utils";
import { safeReadWorkbook, loadXlsx, sanitizeParsed } from "@/lib/safe-xlsx";

type Mode = "rows" | "matrix";

export function ExcelToJsonClient() {
  const [file, setFile] = useState<File | null>(null);
  const [mode, setMode] = useState<Mode>("rows");
  const [pretty, setPretty] = useState(true);
  const [sheet, setSheet] = useState<string>("");
  const [sheets, setSheets] = useState<string[]>([]);
  const [output, setOutput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  async function pick(f: File | null) {
    if (!f) return;
    setFile(f); setError(null); setOutput(""); setBusy(true);
    try {
      const data = new Uint8Array(await f.arrayBuffer());
      const { wb } = await safeReadWorkbook(data);
      setSheets(wb.SheetNames);
      const first = wb.SheetNames[0];
      setSheet(first);
      convert(wb, first, mode, pretty);
    } catch (e) {
      setError(`Could not read the spreadsheet: ${(e as Error).message}`);
    } finally {
      setBusy(false);
    }
  }

  async function convert(wb: { Sheets: Record<string, unknown> }, sheetName: string, m: Mode, p: boolean) {
    try {
      const xlsx = await loadXlsx();
      const ws = wb.Sheets[sheetName];
      if (!ws) { setOutput(""); return; }
      let json: unknown;
      if (m === "matrix") {
        json = sanitizeParsed(xlsx.utils.sheet_to_json(ws as never, { header: 1, defval: null, blankrows: false }));
      } else {
        json = sanitizeParsed(xlsx.utils.sheet_to_json(ws as never, { defval: null, blankrows: false }));
      }
      setOutput(p ? JSON.stringify(json, null, 2) : JSON.stringify(json));
    } catch (e) {
      setError(`Could not convert: ${(e as Error).message}`);
    }
  }

  // Overrides are passed explicitly because the calling setState (setSheet/setMode/
  // setPretty) hasn't applied yet when this runs — reading component state here would
  // use the previous value and render the wrong sheet/format.
  async function reconvert(over?: { sheet?: string; mode?: Mode; pretty?: boolean }) {
    if (!file) return;
    setBusy(true); setError(null);
    try {
      const data = new Uint8Array(await file.arrayBuffer());
      const { wb } = await safeReadWorkbook(data);
      await convert(wb, over?.sheet ?? sheet, over?.mode ?? mode, over?.pretty ?? pretty);
    } finally {
      setBusy(false);
    }
  }

  async function copyAll() {
    try { await navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 1200); } catch {}
  }
  function downloadJson() {
    const blob = new Blob([output || "[]"], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = (file?.name.replace(/\.[^.]+$/, "") || "data") + ".json";
    a.click();
    URL.revokeObjectURL(a.href);
  }

  return (
    <div className="space-y-4">
      {!file ? (
        <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-teal-300 bg-teal-50/40 px-6 py-12 text-center transition-colors hover:brightness-95">
          <Upload className="h-7 w-7 text-teal-600" />
          <span className="mt-2 font-medium text-ink-900">Upload an .xlsx or .xls</span>
          <span className="mt-0.5 text-xs text-ink-400">Parsed in your browser via SheetJS</span>
          <input type="file" accept=".xlsx,.xls,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel" className="hidden" onChange={(e) => pick(e.target.files?.[0] ?? null)} />
        </label>
      ) : (
        <div className="flex items-center justify-between rounded-lg border border-ink-100 bg-white px-4 py-2.5 text-sm">
          <div className="min-w-0 truncate"><span className="font-medium text-ink-900">{file.name}</span><span className="ml-2 text-ink-400">{formatBytes(file.size)}</span></div>
          <button onClick={() => { setFile(null); setOutput(""); setSheets([]); }} className="rounded p-1 text-ink-400 hover:bg-ink-50 hover:text-ink-700"><X className="h-3.5 w-3.5" /></button>
        </div>
      )}

      {sheets.length > 0 && (
        <div className="grid gap-3 rounded-lg border border-ink-100 bg-white p-4 sm:grid-cols-3">
          <label className="flex flex-col text-xs font-medium text-ink-600">
            Sheet
            <select value={sheet} onChange={(e) => { setSheet(e.target.value); reconvert({ sheet: e.target.value }); }} className="mt-1 rounded-md border border-ink-200 px-2 py-1.5 text-sm">
              {sheets.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </label>
          <label className="flex flex-col text-xs font-medium text-ink-600">
            Format
            <select value={mode} onChange={(e) => { setMode(e.target.value as Mode); reconvert({ mode: e.target.value as Mode }); }} className="mt-1 rounded-md border border-ink-200 px-2 py-1.5 text-sm">
              <option value="rows">Array of objects (first row = headers)</option>
              <option value="matrix">Array of arrays (raw rows)</option>
            </select>
          </label>
          <label className="flex items-center gap-2 self-end text-sm text-ink-700">
            <input type="checkbox" checked={pretty} onChange={(e) => { setPretty(e.target.checked); reconvert({ pretty: e.target.checked }); }} className="h-4 w-4" />
            Pretty-print
          </label>
        </div>
      )}

      {busy && <p className="flex items-center gap-2 text-sm text-ink-500"><Loader2 className="h-4 w-4 animate-spin" /> Parsing…</p>}

      {output && (
        <>
          <div className="flex flex-wrap gap-2">
            <Button size="sm" variant="outline" onClick={copyAll}>
              {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              {copied ? "Copied" : "Copy"}
            </Button>
            <Button size="sm" onClick={downloadJson}><Download className="h-3.5 w-3.5" /> Download .json</Button>
            <span className="self-center text-xs text-ink-400">{output.length.toLocaleString()} chars</span>
          </div>
          <pre className="max-h-[28rem] overflow-auto rounded-lg border border-ink-100 bg-ink-900 p-4 font-mono text-xs leading-relaxed text-ink-50">{output}</pre>
        </>
      )}

      {error && <p className="text-sm text-red-600">{error}</p>}
      <p className="text-xs text-ink-400">100% in your browser via SheetJS — your spreadsheet is never uploaded.</p>
    </div>
  );
}
