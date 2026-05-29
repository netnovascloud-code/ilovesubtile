"use client";

import { useMemo, useState } from "react";

/** Standard VAT rates per country (commonly accurate as of 2024-2025; for guidance only). */
const RATES: { code: string; name: string; rate: number; cur: string }[] = [
  { code: "FR", name: "France", rate: 20, cur: "EUR" },
  { code: "DE", name: "Germany", rate: 19, cur: "EUR" },
  { code: "IT", name: "Italy", rate: 22, cur: "EUR" },
  { code: "ES", name: "Spain", rate: 21, cur: "EUR" },
  { code: "PT", name: "Portugal", rate: 23, cur: "EUR" },
  { code: "NL", name: "Netherlands", rate: 21, cur: "EUR" },
  { code: "BE", name: "Belgium", rate: 21, cur: "EUR" },
  { code: "LU", name: "Luxembourg", rate: 17, cur: "EUR" },
  { code: "AT", name: "Austria", rate: 20, cur: "EUR" },
  { code: "IE", name: "Ireland", rate: 23, cur: "EUR" },
  { code: "FI", name: "Finland", rate: 25.5, cur: "EUR" },
  { code: "GR", name: "Greece", rate: 24, cur: "EUR" },
  { code: "DK", name: "Denmark", rate: 25, cur: "DKK" },
  { code: "SE", name: "Sweden", rate: 25, cur: "SEK" },
  { code: "NO", name: "Norway", rate: 25, cur: "NOK" },
  { code: "PL", name: "Poland", rate: 23, cur: "PLN" },
  { code: "CZ", name: "Czechia", rate: 21, cur: "CZK" },
  { code: "RO", name: "Romania", rate: 19, cur: "RON" },
  { code: "HU", name: "Hungary", rate: 27, cur: "HUF" },
  { code: "BG", name: "Bulgaria", rate: 20, cur: "BGN" },
  { code: "HR", name: "Croatia", rate: 25, cur: "EUR" },
  { code: "EE", name: "Estonia", rate: 22, cur: "EUR" },
  { code: "LV", name: "Latvia", rate: 21, cur: "EUR" },
  { code: "LT", name: "Lithuania", rate: 21, cur: "EUR" },
  { code: "SK", name: "Slovakia", rate: 23, cur: "EUR" },
  { code: "SI", name: "Slovenia", rate: 22, cur: "EUR" },
  { code: "MT", name: "Malta", rate: 18, cur: "EUR" },
  { code: "CY", name: "Cyprus", rate: 19, cur: "EUR" },
  { code: "GB", name: "United Kingdom", rate: 20, cur: "GBP" },
  { code: "CH", name: "Switzerland", rate: 8.1, cur: "CHF" },
];

type Mode = "from_net" | "from_gross";

function fmt(value: number, cur: string): string {
  try {
    return new Intl.NumberFormat("en-GB", { style: "currency", currency: cur, maximumFractionDigits: 2 }).format(value);
  } catch {
    return value.toFixed(2) + " " + cur;
  }
}

export function VatCalculatorClient() {
  const [country, setCountry] = useState("FR");
  const [customRate, setCustomRate] = useState<string>("");
  const [mode, setMode] = useState<Mode>("from_net");
  const [amount, setAmount] = useState("100");

  const row = RATES.find((r) => r.code === country)!;
  // Use the override only when it's actually entered — `|| row.rate` would treat a
  // deliberate 0% (zero-rated) override as falsy and silently revert to the standard rate.
  const customNum = customRate.trim() === "" ? NaN : Number(customRate);
  const rate = Number.isFinite(customNum) && customNum >= 0 ? customNum : row.rate;

  const result = useMemo(() => {
    const a = Number(amount);
    if (!Number.isFinite(a) || a < 0) return null;
    if (mode === "from_net") {
      const vat = a * (rate / 100);
      return { net: a, vat, gross: a + vat };
    }
    const net = a / (1 + rate / 100);
    return { net, vat: a - net, gross: a };
  }, [amount, rate, mode]);

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-3">
        <label className="flex flex-col text-xs font-medium text-ink-600">
          Country
          <select value={country} onChange={(e) => { setCountry(e.target.value); setCustomRate(""); }}
            className="mt-1 rounded-md border border-ink-200 bg-white px-3 py-2 text-sm text-ink-900">
            {RATES.map((r) => <option key={r.code} value={r.code}>{r.name} ({r.rate}%)</option>)}
          </select>
        </label>
        <label className="flex flex-col text-xs font-medium text-ink-600">
          Override rate (%)
          <input type="number" min={0} max={100} step={0.1} value={customRate} placeholder={String(row.rate)}
            onChange={(e) => setCustomRate(e.target.value)}
            className="mt-1 rounded-md border border-ink-200 bg-white px-3 py-2 text-sm text-ink-900 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100" />
        </label>
        <div className="flex flex-col text-xs font-medium text-ink-600">
          Mode
          <div className="mt-1 inline-flex rounded-lg border border-ink-200 bg-white p-1">
            {(["from_net", "from_gross"] as const).map((m) => (
              <button key={m} onClick={() => setMode(m)} className={`flex-1 rounded-md px-2 py-1 text-xs font-medium ${mode === m ? "bg-brand-500 text-white" : "text-ink-600"}`}>
                {m === "from_net" ? "Net → Gross" : "Gross → Net"}
              </button>
            ))}
          </div>
        </div>
      </div>

      <label className="flex flex-col text-xs font-medium text-ink-600">
        {mode === "from_net" ? "Net amount" : "Gross amount"} ({row.cur})
        <input type="number" min={0} step={0.01} value={amount} onChange={(e) => setAmount(e.target.value)}
          className="mt-1 w-full rounded-md border border-ink-200 bg-white px-3 py-2 text-base text-ink-900 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100" />
      </label>

      <div className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-lg border border-ink-100 bg-white p-4">
          <div className="text-xs uppercase tracking-wide text-ink-400">Net</div>
          <div className="mt-1 text-xl font-semibold text-ink-900">{result ? fmt(result.net, row.cur) : "—"}</div>
        </div>
        <div className="rounded-lg border border-ink-100 bg-white p-4">
          <div className="text-xs uppercase tracking-wide text-ink-400">VAT ({rate}%)</div>
          <div className="mt-1 text-xl font-semibold text-amber-700">{result ? fmt(result.vat, row.cur) : "—"}</div>
        </div>
        <div className="rounded-lg border border-brand-200 bg-brand-50/40 p-4">
          <div className="text-xs uppercase tracking-wide text-brand-700">Gross (incl. VAT)</div>
          <div className="mt-1 text-xl font-semibold text-ink-900">{result ? fmt(result.gross, row.cur) : "—"}</div>
        </div>
      </div>

      <p className="text-xs text-ink-400">
        Standard rates only — many countries have reduced or zero rates on specific goods. For guidance only, not tax advice.
      </p>
    </div>
  );
}
