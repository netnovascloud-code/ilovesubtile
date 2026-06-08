"use client";

import { useState } from "react";
import { Upload, X, Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatBytes } from "@/lib/utils";
import { safeReadWorkbook } from "@/lib/safe-xlsx";

export function ExcelToPdfClient() {
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [resultName, setResultName] = useState("spreadsheet.pdf");

  async function convert() {
    if (!file || busy) return;
    setBusy(true); setError(null); setResultUrl(null);
    try {
      const data = new Uint8Array(await file.arrayBuffer());
      const { xlsx, wb } = await safeReadWorkbook(data);

      let html = `<style>
        body { font-family: 'Helvetica','Arial',sans-serif; color:#111; line-height:1.4; font-size: 11pt; }
        h2 { margin: 0 0 12px; font-size: 14pt; color:#0F2A5C; }
        table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
        th, td { border: 1px solid #cbd5e1; padding: 4px 8px; text-align: left; vertical-align: top; font-size: 10pt; }
        th { background:#eef2ff; font-weight: 600; }
      </style>`;
      for (const name of wb.SheetNames) {
        const sheet = wb.Sheets[name];
        const sheetHtml = xlsx.utils.sheet_to_html(sheet, { editable: false });
        // sheet_to_html wraps with <html><body><table>…</table></body></html> — keep just the table.
        const tableMatch = sheetHtml.match(/<table[\s\S]*?<\/table>/i);
        html += `<h2>${name}</h2>${tableMatch ? tableMatch[0] : sheetHtml}`;
      }

      const host = document.createElement("div");
      host.style.cssText = "position:fixed;left:-10000px;top:0;width:1100px;background:#fff;padding:24px;";
      host.innerHTML = html;
      document.body.appendChild(host);
      try {
        const { jsPDF } = await import("jspdf");
        const pdf = new jsPDF({ unit: "pt", format: "a4", orientation: "landscape" });
        await new Promise<void>((resolve, reject) => {
          pdf.html(host, {
            autoPaging: "text",
            margin: [28, 28, 28, 28],
            html2canvas: { scale: 0.6, useCORS: true, backgroundColor: "#ffffff" },
            callback: () => resolve(),
          }).catch(reject);
        });
        const blob = pdf.output("blob");
        setResultUrl(URL.createObjectURL(blob));
        setResultName(`${file.name.replace(/\.(xlsx?|xlsm|xlsb|ods)$/i, "")}.pdf`);
      } finally { document.body.removeChild(host); }
    } catch (e) { setError(`Could not convert: ${(e as Error).message}`); }
    finally { setBusy(false); }
  }

  return (
    <div className="space-y-4">
      {!file ? (
        <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-blue-300 bg-blue-50/40 px-6 py-12 text-center transition-colors hover:brightness-95">
          <Upload className="h-7 w-7 text-blue-600" />
          <span className="mt-2 font-medium text-ink-900">Upload a spreadsheet</span>
          <span className="mt-0.5 text-xs text-ink-400">.xlsx · .xls · .ods — every sheet on its own section</span>
          <input type="file" accept=".xlsx,.xls,.xlsm,.xlsb,.ods,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel" className="hidden" onChange={(e) => { setFile(e.target.files?.[0] ?? null); setResultUrl(null); setError(null); }} />
        </label>
      ) : (
        <div className="flex items-center justify-between rounded-lg border border-ink-100 bg-white px-4 py-2.5">
          <div className="min-w-0 truncate text-sm">
            <span className="font-medium text-ink-900">{file.name}</span>
            <span className="ml-2 text-ink-400">{formatBytes(file.size)}</span>
          </div>
          <button onClick={() => { setFile(null); setResultUrl(null); setError(null); }} className="rounded p-1 text-xs text-ink-400 hover:bg-ink-50 hover:text-ink-700"><X className="h-3.5 w-3.5" /></button>
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        <Button onClick={convert} disabled={!file || busy} size="lg">
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          {busy ? "Rendering…" : "Convert to PDF"}
        </Button>
        {resultUrl && (
          <a href={resultUrl} download={resultName}>
            <Button size="lg" variant="outline"><Download className="h-4 w-4" /> Download PDF</Button>
          </a>
        )}
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}
      <p className="text-xs text-ink-400">Converted 100% in your browser via SheetJS + jspdf. Landscape A4, one section per sheet.</p>
    </div>
  );
}
