"use client";

import { useState } from "react";
import { Image as ImageIcon, Loader2, Download, ScanLine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MiniDrop } from "@/components/tools/MiniDrop";
import { callVisionJson } from "@/lib/vision-client";

type Item = { description: string; quantity: number | null; price: number | null };
type Receipt = {
  merchant: string | null; date: string | null; currency: string | null;
  total: number | null; subtotal: number | null; tax: number | null;
  items: Item[];
};

// RFC 4180 CSV escaping: wrap with quotes when needed, double internal quotes.
function csvCell(v: unknown): string {
  if (v == null) return "";
  const s = String(v);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

function toCsv(r: Receipt): string {
  const rows: string[][] = [
    ["Merchant", r.merchant ?? ""],
    ["Date", r.date ?? ""],
    ["Currency", r.currency ?? ""],
    ["Subtotal", r.subtotal != null ? String(r.subtotal) : ""],
    ["Tax", r.tax != null ? String(r.tax) : ""],
    ["Total", r.total != null ? String(r.total) : ""],
    [],
    ["Description", "Quantity", "Price"],
    ...r.items.map((i) => [i.description, i.quantity != null ? String(i.quantity) : "", i.price != null ? String(i.price) : ""]),
  ];
  return rows.map((row) => row.map(csvCell).join(",")).join("\n");
}

function fmt(v: number | null, cur: string | null): string {
  if (v == null) return "—";
  try { return new Intl.NumberFormat(undefined, { style: cur ? "currency" : "decimal", currency: cur || undefined, maximumFractionDigits: 2 }).format(v); }
  catch { return v.toFixed(2) + (cur ? " " + cur : ""); }
}

export function ReceiptScannerClient() {
  const [file, setFile] = useState<File | null>(null);
  const [r, setR] = useState<Receipt | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function run() {
    if (!file) return;
    setBusy(true); setError(null); setR(null);
    try {
      const data = await callVisionJson<Receipt>("receipt-scanner", "receipt", file);
      setR({ ...data, items: data.items ?? [] });
    } catch (e) {
      setError((e as Error).message);
    } finally { setBusy(false); }
  }

  const downloadCsv = () => {
    if (!r) return;
    const blob = new Blob([toCsv(r)], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url;
    a.download = `${(r.merchant ?? "receipt").replace(/\s+/g, "-").toLowerCase()}-${r.date ?? "scan"}.csv`;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 4000);
  };

  return (
    <div className="space-y-5">
      <MiniDrop
        label="Receipt photo"
        accept={{ "image/jpeg": [".jpg", ".jpeg"], "image/png": [".png"], "image/webp": [".webp"] }}
        icon={<ImageIcon className="h-5 w-5" />}
        onFile={(f) => { setFile(f); setR(null); }}
        current={file}
      />

      {file && (
        <Button onClick={run} disabled={busy} size="lg">
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <ScanLine className="h-4 w-4" />}
          {busy ? "Reading the receipt…" : "Extract receipt data"}
        </Button>
      )}

      {error && <p className="rounded border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</p>}

      {r && (
        <>
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-lg border border-ink-100 bg-white p-3">
              <div className="text-xs uppercase tracking-wide text-ink-400">Merchant</div>
              <div className="mt-1 text-base font-semibold text-ink-900">{r.merchant ?? "—"}</div>
            </div>
            <div className="rounded-lg border border-ink-100 bg-white p-3">
              <div className="text-xs uppercase tracking-wide text-ink-400">Date</div>
              <div className="mt-1 text-base font-semibold text-ink-900">{r.date ?? "—"}</div>
            </div>
            <div className="rounded-lg border border-brand-200 bg-brand-50/40 p-3">
              <div className="text-xs uppercase tracking-wide text-brand-700">Total</div>
              <div className="mt-1 text-base font-semibold text-ink-900">{fmt(r.total, r.currency)}</div>
            </div>
          </div>

          {r.items.length > 0 && (
            <div className="overflow-hidden rounded-lg border border-ink-100">
              <table className="w-full text-sm">
                <thead className="bg-ink-50/50 text-xs uppercase tracking-wide text-ink-500">
                  <tr><th className="px-3 py-2 text-left">Item</th><th className="px-3 py-2 text-right w-20">Qty</th><th className="px-3 py-2 text-right w-24">Price</th></tr>
                </thead>
                <tbody>
                  {r.items.map((it, i) => (
                    <tr key={i} className="border-t border-ink-100">
                      <td className="px-3 py-2 text-ink-900">{it.description}</td>
                      <td className="px-3 py-2 text-right text-ink-700">{it.quantity ?? "—"}</td>
                      <td className="px-3 py-2 text-right text-ink-900">{fmt(it.price, r.currency)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <Button onClick={downloadCsv} size="lg">
            <Download className="h-4 w-4" /> Download CSV
          </Button>
        </>
      )}

      <p className="text-xs text-ink-400">Powered by AI vision. Numbers are extracted raw (no currency symbol) for accounting tools.</p>
    </div>
  );
}
