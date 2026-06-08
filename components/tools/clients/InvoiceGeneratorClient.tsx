"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Download, Plus, Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

type Line = { id: string; desc: string; qty: number; unitPrice: number };

const CURRENCIES = ["EUR", "USD", "GBP", "CHF", "CAD", "AUD"];

function fmt(value: number, cur: string): string {
  try {
    return new Intl.NumberFormat("en-GB", { style: "currency", currency: cur, maximumFractionDigits: 2 }).format(value);
  } catch {
    return value.toFixed(2) + " " + cur;
  }
}

export function InvoiceGeneratorClient() {
  const [seller, setSeller] = useState("Your company\n123 Main Street\n75001 Paris\nFR12345678901");
  const [buyer, setBuyer] = useState("Customer Ltd.\n456 High Road\n10001 New York");
  const [invoiceNo, setInvoiceNo] = useState("INV-2025-001");
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [due, setDue] = useState(() => {
    const d = new Date(); d.setDate(d.getDate() + 30); return d.toISOString().slice(0, 10);
  });
  const [currency, setCurrency] = useState("EUR");
  const [taxRate, setTaxRate] = useState(20);
  const [notes, setNotes] = useState("Payment due within 30 days. Thank you for your business.");
  const [lines, setLines] = useState<Line[]>([
    { id: crypto.randomUUID(), desc: "Consulting services — November", qty: 10, unitPrice: 90 },
    { id: crypto.randomUUID(), desc: "Hosting & maintenance", qty: 1, unitPrice: 120 },
  ]);
  const [busy, setBusy] = useState(false);
  const [outUrl, setOutUrl] = useState<string | null>(null);
  const [warn, setWarn] = useState<string | null>(null);
  const cleanup = useRef<string | null>(null);

  useEffect(() => () => { if (cleanup.current) URL.revokeObjectURL(cleanup.current); }, []);

  const totals = useMemo(() => {
    const subtotal = lines.reduce((acc, l) => acc + (l.qty || 0) * (l.unitPrice || 0), 0);
    const tax = subtotal * (taxRate / 100);
    return { subtotal, tax, total: subtotal + tax };
  }, [lines, taxRate]);

  function update(i: number, patch: Partial<Line>) {
    setLines((s) => s.map((l, idx) => (idx === i ? { ...l, ...patch } : l)));
  }
  function add() { setLines((s) => [...s, { id: crypto.randomUUID(), desc: "", qty: 1, unitPrice: 0 }]); }
  function del(id: string) { setLines((s) => s.filter((l) => l.id !== id)); }

  // pdf-lib's StandardFont (Helvetica) is WinAnsi-only and THROWS on any glyph
  // outside CP1252 (CJK, ł, İ, the ₹/₩ currency symbols, emoji…). Fallback used
  // only when a raw render fails: decompose accents, drop the rest, so we still
  // produce a PDF instead of crashing with no feedback.
  function toWinAnsi(s: string): string {
    return s.normalize("NFKD").replace(/[̀-ͯ]/g, "").replace(/[^\x00-\xFF]/g, "?");
  }

  async function render(strip: boolean) {
    const T = strip ? toWinAnsi : (s: string) => s;
    const { PDFDocument, StandardFonts, rgb } = await import("pdf-lib");
    const doc = await PDFDocument.create();
    const page = doc.addPage([595, 842]); // A4
    const helv = await doc.embedFont(StandardFonts.Helvetica);
    const bold = await doc.embedFont(StandardFonts.HelveticaBold);
    const ink = rgb(0.1, 0.12, 0.16);
    const muted = rgb(0.45, 0.5, 0.58);

    page.drawText("INVOICE", { x: 40, y: 790, size: 26, font: bold, color: ink });
    page.drawText(T(invoiceNo), { x: 40, y: 768, size: 11, font: helv, color: muted });

    // From / To
    const fromY = 720;
    page.drawText("FROM", { x: 40, y: fromY, size: 9, font: bold, color: muted });
    page.drawText("BILL TO", { x: 320, y: fromY, size: 9, font: bold, color: muted });
    seller.split("\n").forEach((l, i) => page.drawText(T(l), { x: 40, y: fromY - 16 - i * 13, size: 10, font: helv, color: ink }));
    buyer.split("\n").forEach((l, i) => page.drawText(T(l), { x: 320, y: fromY - 16 - i * 13, size: 10, font: helv, color: ink }));

    // Meta
    const metaY = 620;
    page.drawText("INVOICE DATE", { x: 40, y: metaY, size: 9, font: bold, color: muted });
    page.drawText(T(date), { x: 40, y: metaY - 14, size: 11, font: helv, color: ink });
    page.drawText("DUE DATE", { x: 200, y: metaY, size: 9, font: bold, color: muted });
    page.drawText(T(due), { x: 200, y: metaY - 14, size: 11, font: helv, color: ink });

    // Table header
    const tableY = 560;
    page.drawRectangle({ x: 40, y: tableY - 6, width: 515, height: 22, color: rgb(0.94, 0.96, 0.99) });
    page.drawText("DESCRIPTION", { x: 48, y: tableY, size: 9, font: bold, color: muted });
    page.drawText("QTY", { x: 360, y: tableY, size: 9, font: bold, color: muted });
    page.drawText("UNIT", { x: 410, y: tableY, size: 9, font: bold, color: muted });
    page.drawText("AMOUNT", { x: 490, y: tableY, size: 9, font: bold, color: muted });

    let y = tableY - 28;
    for (const l of lines) {
      const amt = (l.qty || 0) * (l.unitPrice || 0);
      page.drawText(T(l.desc.slice(0, 60)), { x: 48, y, size: 10, font: helv, color: ink });
      page.drawText(String(l.qty || 0), { x: 360, y, size: 10, font: helv, color: ink });
      page.drawText(T(fmt(l.unitPrice || 0, currency)), { x: 410, y, size: 10, font: helv, color: ink });
      page.drawText(T(fmt(amt, currency)), { x: 490, y, size: 10, font: helv, color: ink });
      y -= 18;
    }

    // Totals box
    const totalsY = y - 12;
    page.drawLine({ start: { x: 350, y: totalsY + 12 }, end: { x: 555, y: totalsY + 12 }, color: rgb(0.85, 0.87, 0.9), thickness: 0.5 });
    page.drawText("Subtotal", { x: 360, y: totalsY - 4, size: 10, font: helv, color: muted });
    page.drawText(T(fmt(totals.subtotal, currency)), { x: 490, y: totalsY - 4, size: 10, font: helv, color: ink });
    page.drawText(`VAT (${taxRate}%)`, { x: 360, y: totalsY - 22, size: 10, font: helv, color: muted });
    page.drawText(T(fmt(totals.tax, currency)), { x: 490, y: totalsY - 22, size: 10, font: helv, color: ink });
    page.drawRectangle({ x: 350, y: totalsY - 50, width: 205, height: 22, color: rgb(0.1, 0.12, 0.16) });
    page.drawText("TOTAL", { x: 360, y: totalsY - 44, size: 11, font: bold, color: rgb(1, 1, 1) });
    page.drawText(T(fmt(totals.total, currency)), { x: 490, y: totalsY - 44, size: 11, font: bold, color: rgb(1, 1, 1) });

    // Notes
    if (notes.trim()) {
      page.drawText("NOTES", { x: 40, y: totalsY - 80, size: 9, font: bold, color: muted });
      notes.split("\n").forEach((l, i) => page.drawText(T(l), { x: 40, y: totalsY - 96 - i * 13, size: 10, font: helv, color: ink }));
    }

    const bytes = await doc.save();
    const blob = new Blob([bytes as BlobPart], { type: "application/pdf" });
    if (cleanup.current) URL.revokeObjectURL(cleanup.current);
    const url = URL.createObjectURL(blob);
    cleanup.current = url;
    setOutUrl(url);
  }

  async function build() {
    setBusy(true); setWarn(null);
    try {
      try {
        await render(false);
      } catch {
        // A glyph wasn't WinAnsi-encodable — retry with the sanitised text so
        // the user still gets a PDF, and tell them what happened.
        await render(true);
        setWarn("Some characters aren't supported by the built-in PDF font and were simplified. Use Latin characters (or a EUR/USD/GBP-style currency) for best results.");
      }
    } catch {
      setWarn("Could not generate the PDF. Please remove unusual characters and try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
      <div className="space-y-4">
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="flex flex-col text-xs font-medium text-ink-600">From (you)
            <textarea value={seller} onChange={(e) => setSeller(e.target.value)} className="mt-1 h-24 rounded-md border border-ink-200 p-2 text-sm" />
          </label>
          <label className="flex flex-col text-xs font-medium text-ink-600">Bill to (customer)
            <textarea value={buyer} onChange={(e) => setBuyer(e.target.value)} className="mt-1 h-24 rounded-md border border-ink-200 p-2 text-sm" />
          </label>
        </div>

        <div className="grid gap-3 sm:grid-cols-4">
          <label className="flex flex-col text-xs font-medium text-ink-600">Invoice #
            <input value={invoiceNo} onChange={(e) => setInvoiceNo(e.target.value)} className="mt-1 rounded-md border border-ink-200 px-2 py-1.5 text-sm" />
          </label>
          <label className="flex flex-col text-xs font-medium text-ink-600">Date
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="mt-1 rounded-md border border-ink-200 px-2 py-1.5 text-sm" />
          </label>
          <label className="flex flex-col text-xs font-medium text-ink-600">Due
            <input type="date" value={due} onChange={(e) => setDue(e.target.value)} className="mt-1 rounded-md border border-ink-200 px-2 py-1.5 text-sm" />
          </label>
          <label className="flex flex-col text-xs font-medium text-ink-600">Currency
            <select value={currency} onChange={(e) => setCurrency(e.target.value)} className="mt-1 rounded-md border border-ink-200 px-2 py-1.5 text-sm">
              {CURRENCIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </label>
        </div>

        <div className="rounded-lg border border-ink-100 bg-white p-4">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-ink-400">Line items</p>
          <ul className="space-y-2">
            {lines.map((l, i) => (
              <li key={l.id} className="grid grid-cols-12 items-center gap-2 text-sm">
                <input value={l.desc} onChange={(e) => update(i, { desc: e.target.value })} placeholder="Description" className="col-span-6 rounded-md border border-ink-200 px-2 py-1.5" />
                <input type="number" min={0} value={l.qty} onChange={(e) => update(i, { qty: Number(e.target.value) || 0 })} placeholder="Qty" className="col-span-2 rounded-md border border-ink-200 px-2 py-1.5 text-right" />
                <input type="number" min={0} step="0.01" value={l.unitPrice} onChange={(e) => update(i, { unitPrice: Number(e.target.value) || 0 })} placeholder="Unit" className="col-span-3 rounded-md border border-ink-200 px-2 py-1.5 text-right" />
                <button onClick={() => del(l.id)} className="col-span-1 rounded p-1 text-ink-400 hover:bg-ink-50 hover:text-red-600"><Trash2 className="mx-auto h-3.5 w-3.5" /></button>
              </li>
            ))}
          </ul>
          <Button size="sm" variant="outline" className="mt-3" onClick={add}><Plus className="h-3.5 w-3.5" /> Add line</Button>
        </div>

        <label className="flex flex-col text-xs font-medium text-ink-600">Notes / payment terms
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} className="mt-1 h-20 rounded-md border border-ink-200 p-2 text-sm" />
        </label>

        <label className="flex items-center gap-2 text-xs font-medium text-ink-600">VAT rate (%)
          <input type="number" min={0} max={100} step="0.1" value={taxRate} onChange={(e) => setTaxRate(Number(e.target.value) || 0)} className="w-24 rounded-md border border-ink-200 px-2 py-1.5 text-sm" />
        </label>
      </div>

      <aside className="space-y-4 lg:sticky lg:top-4">
        <div className="rounded-lg border border-ink-100 bg-white p-5">
          <p className="text-xs uppercase tracking-wide text-ink-400">Summary</p>
          <dl className="mt-3 space-y-1.5 text-sm">
            <div className="flex justify-between"><dt className="text-ink-500">Subtotal</dt><dd className="font-mono text-ink-900">{fmt(totals.subtotal, currency)}</dd></div>
            <div className="flex justify-between"><dt className="text-ink-500">VAT ({taxRate}%)</dt><dd className="font-mono text-amber-700">{fmt(totals.tax, currency)}</dd></div>
            <div className="mt-2 flex justify-between border-t border-ink-100 pt-2 text-base font-semibold"><dt>Total</dt><dd className="font-mono">{fmt(totals.total, currency)}</dd></div>
          </dl>
          <Button size="lg" className="mt-5 w-full" onClick={build} disabled={busy}>
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
            {busy ? "Building PDF…" : "Generate PDF"}
          </Button>
          {warn && <p className="mt-2 text-xs text-amber-700">{warn}</p>}
          {outUrl && (
            <a href={outUrl} download={`${invoiceNo || "invoice"}.pdf`} className="mt-2 block">
              <Button size="sm" variant="outline" className="w-full"><Download className="h-3.5 w-3.5" /> Download invoice</Button>
            </a>
          )}
        </div>
        <p className="text-xs text-ink-400">100% in your browser via pdf-lib — invoice data never leaves your device.</p>
      </aside>
    </div>
  );
}
