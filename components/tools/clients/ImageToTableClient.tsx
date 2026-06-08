"use client";

import { useState } from "react";
import { Image as ImageIcon, Loader2, Download, Table2, FileJson, FileSpreadsheet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MiniDrop } from "@/components/tools/MiniDrop";
import { callTool } from "@/lib/tool-api";
import { fileToDataUrl } from "@/lib/vision-client";
import { QuotaReachedModal, type QuotaReason } from "@/components/billing/QuotaReachedModal";

type Table = { headers: string[]; rows: string[][] };

// RFC 4180 CSV escaping.
function csvCell(v: unknown): string {
  const s = v == null ? "" : String(v);
  return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}
function toCsv(t: Table): string {
  const rows = t.headers.length ? [t.headers, ...t.rows] : t.rows;
  return rows.map((r) => r.map(csvCell).join(",")).join("\r\n");
}
function toJson(t: Table): string {
  // With headers → array of objects; without → array of arrays.
  if (t.headers.length) {
    const objs = t.rows.map((r) => Object.fromEntries(t.headers.map((h, i) => [h || `col_${i + 1}`, r[i] ?? ""])));
    return JSON.stringify(objs, null, 2);
  }
  return JSON.stringify(t.rows, null, 2);
}

function download(blob: Blob, name: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = name;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}

export function ImageToTableClient() {
  const [file, setFile] = useState<File | null>(null);
  const [table, setTable] = useState<Table | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [quotaReason, setQuotaReason] = useState<QuotaReason | null>(null);

  const baseName = file ? file.name.replace(/\.[^.]+$/, "") : "table";

  async function run() {
    if (!file || busy) return;
    setBusy(true); setError(null); setTable(null);
    try {
      const image = await fileToDataUrl(file);
      const res = await callTool("image-to-table", { task: "image-to-table", image });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (data.error === "daily_limit" || data.error === "monthly_limit") {
          setQuotaReason({
            kind: data.error === "monthly_limit" ? "monthly" : "daily",
            limit: data.limit ?? 0, used: data.used ?? 0, resetAt: data.resetAt ?? null,
          });
          return;
        }
        setError(data.error === "image_too_large" ? "That image is too large — try a smaller one." : "Couldn't read a table from that image. Try a clearer photo.");
        return;
      }
      const t = data.data as Table | undefined;
      if (!t || !Array.isArray(t.rows)) { setError("No table was detected in that image."); return; }
      setTable({ headers: Array.isArray(t.headers) ? t.headers : [], rows: t.rows.filter((r) => Array.isArray(r)) });
    } catch {
      setError("Network error — please try again.");
    } finally {
      setBusy(false);
    }
  }

  async function exportXlsx() {
    if (!table) return;
    const XLSX = await import("xlsx");
    const aoa = table.headers.length ? [table.headers, ...table.rows] : table.rows;
    const ws = XLSX.utils.aoa_to_sheet(aoa);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Table");
    const out = XLSX.write(wb, { type: "array", bookType: "xlsx" }) as ArrayBuffer;
    download(new Blob([out], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" }), `${baseName}.xlsx`);
  }
  function exportCsv() {
    if (!table) return;
    download(new Blob([toCsv(table)], { type: "text/csv;charset=utf-8" }), `${baseName}.csv`);
  }
  function exportJson() {
    if (!table) return;
    download(new Blob([toJson(table)], { type: "application/json" }), `${baseName}.json`);
  }

  const colCount = table ? Math.max(table.headers.length, ...table.rows.map((r) => r.length), 1) : 0;

  return (
    <div className="space-y-4">
      <MiniDrop
        label={file ? file.name : "Upload a table image"}
        hint="JPG, PNG or WebP · a photo, scan or screenshot of a table"
        accept={{ "image/*": [".jpg", ".jpeg", ".png", ".webp"] }}
        onFile={(f) => { setFile(f); setTable(null); setError(null); }}
        current={file}
        icon={<ImageIcon className="h-5 w-5" />}
      />

      <Button onClick={run} disabled={!file || busy} size="lg">
        {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Table2 className="h-4 w-4" />}
        {busy ? "Reading the table…" : "Extract table"}
      </Button>

      {error && <p className="text-sm text-red-600">{error}</p>}

      {table && (
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            <Button size="sm" variant="outline" onClick={exportXlsx}><FileSpreadsheet className="h-3.5 w-3.5" /> Excel (.xlsx)</Button>
            <Button size="sm" variant="outline" onClick={exportCsv}><Download className="h-3.5 w-3.5" /> CSV</Button>
            <Button size="sm" variant="outline" onClick={exportJson}><FileJson className="h-3.5 w-3.5" /> JSON</Button>
          </div>
          <div className="overflow-auto rounded-lg border border-ink-100">
            <table className="w-full border-collapse text-left text-sm">
              {table.headers.length > 0 && (
                <thead className="bg-ink-50 text-ink-700">
                  <tr>
                    {table.headers.map((h, i) => (
                      <th key={i} className="border-b border-ink-100 px-3 py-2 font-semibold">{h || `Column ${i + 1}`}</th>
                    ))}
                  </tr>
                </thead>
              )}
              <tbody>
                {table.rows.map((r, ri) => (
                  <tr key={ri} className="odd:bg-white even:bg-ink-50/40">
                    {Array.from({ length: colCount }).map((_, ci) => (
                      <td key={ci} className="border-b border-ink-50 px-3 py-1.5 text-ink-800">{r[ci] ?? ""}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-ink-400">{table.rows.length} rows · {colCount} columns detected. Always double-check the numbers against the original.</p>
        </div>
      )}

      <p className="text-xs text-ink-400">Your image is sent securely for AI reading and never stored. Powered by AI vision.</p>
      <QuotaReachedModal reason={quotaReason} onClose={() => setQuotaReason(null)} />
    </div>
  );
}
