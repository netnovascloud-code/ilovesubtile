"use client";

import { useMemo, useState } from "react";

function money(n: number): string {
  if (!Number.isFinite(n)) return "—";
  return n.toLocaleString("en-US", { maximumFractionDigits: 2, minimumFractionDigits: 2 });
}

export function LoanCalculatorClient() {
  const [amount, setAmount] = useState("20000");
  const [rate, setRate] = useState("5");
  const [years, setYears] = useState("5");

  const result = useMemo(() => {
    const p = Number(amount), annual = Number(rate), y = Number(years);
    if (!Number.isFinite(p) || !Number.isFinite(annual) || !Number.isFinite(y) || p <= 0 || y <= 0) return null;
    const n = Math.round(y * 12);
    const r = annual / 100 / 12;
    // Amortised monthly payment. r === 0 → straight-line (interest-free loan).
    const monthly = r === 0 ? p / n : (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const total = monthly * n;
    return { monthly, total, interest: total - p, n };
  }, [amount, rate, years]);

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-3">
        <label className="flex flex-col text-xs font-medium text-ink-600">
          Loan amount
          <input type="number" min={0} step={100} value={amount} onChange={(e) => setAmount(e.target.value)}
            className="mt-1 rounded-md border border-ink-200 bg-white px-3 py-2 text-base text-ink-900 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100" />
        </label>
        <label className="flex flex-col text-xs font-medium text-ink-600">
          Annual interest rate (%)
          <input type="number" min={0} step={0.01} value={rate} onChange={(e) => setRate(e.target.value)}
            className="mt-1 rounded-md border border-ink-200 bg-white px-3 py-2 text-base text-ink-900 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100" />
        </label>
        <label className="flex flex-col text-xs font-medium text-ink-600">
          Term (years)
          <input type="number" min={0} step={1} value={years} onChange={(e) => setYears(e.target.value)}
            className="mt-1 rounded-md border border-ink-200 bg-white px-3 py-2 text-base text-ink-900 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100" />
        </label>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-lg border border-brand-200 bg-brand-50/40 p-4">
          <div className="text-xs uppercase tracking-wide text-brand-700">Monthly payment</div>
          <div className="mt-1 text-2xl font-semibold text-ink-900">{result ? money(result.monthly) : "—"}</div>
        </div>
        <div className="rounded-lg border border-ink-100 bg-white p-4">
          <div className="text-xs uppercase tracking-wide text-ink-400">Total interest</div>
          <div className="mt-1 text-2xl font-semibold text-amber-700">{result ? money(result.interest) : "—"}</div>
        </div>
        <div className="rounded-lg border border-ink-100 bg-white p-4">
          <div className="text-xs uppercase tracking-wide text-ink-400">Total repaid</div>
          <div className="mt-1 text-2xl font-semibold text-ink-900">{result ? money(result.total) : "—"}</div>
        </div>
      </div>

      <p className="text-xs text-ink-400">
        Fixed-rate amortised estimate over {result ? result.n : 0} payments. For guidance only — your lender's terms (fees, compounding) may differ.
      </p>
    </div>
  );
}
