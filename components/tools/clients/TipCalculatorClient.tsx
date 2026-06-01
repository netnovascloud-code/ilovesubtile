"use client";

import { useMemo, useState } from "react";

function money(n: number): string {
  if (!Number.isFinite(n)) return "—";
  return n.toLocaleString("en-US", { maximumFractionDigits: 2, minimumFractionDigits: 2 });
}

export function TipCalculatorClient() {
  const [bill, setBill] = useState("60");
  const [tip, setTip] = useState("15");
  const [people, setPeople] = useState("2");

  const result = useMemo(() => {
    const b = Number(bill), t = Number(tip), p = Math.max(1, Math.floor(Number(people) || 1));
    if (!Number.isFinite(b) || !Number.isFinite(t) || b < 0) return null;
    const tipAmount = b * (t / 100);
    const total = b + tipAmount;
    return { tipAmount, total, perPerson: total / p, tipPerPerson: tipAmount / p, p };
  }, [bill, tip, people]);

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-3">
        <label className="flex flex-col text-xs font-medium text-ink-600">
          Bill amount
          <input type="number" min={0} step={0.01} value={bill} onChange={(e) => setBill(e.target.value)}
            className="mt-1 rounded-md border border-ink-200 bg-white px-3 py-2 text-base text-ink-900 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100" />
        </label>
        <label className="flex flex-col text-xs font-medium text-ink-600">
          Tip (%)
          <input type="number" min={0} step={1} value={tip} onChange={(e) => setTip(e.target.value)}
            className="mt-1 rounded-md border border-ink-200 bg-white px-3 py-2 text-base text-ink-900 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100" />
        </label>
        <label className="flex flex-col text-xs font-medium text-ink-600">
          Split between
          <input type="number" min={1} step={1} value={people} onChange={(e) => setPeople(e.target.value)}
            className="mt-1 rounded-md border border-ink-200 bg-white px-3 py-2 text-base text-ink-900 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100" />
        </label>
      </div>

      <div className="flex flex-wrap gap-2">
        {[10, 15, 18, 20, 25].map((q) => (
          <button key={q} onClick={() => setTip(String(q))}
            className={`rounded-full border px-3 py-1 text-xs font-medium ${Number(tip) === q ? "border-brand-300 bg-brand-50 text-brand-700" : "border-ink-200 bg-white text-ink-600"}`}>
            {q}%
          </button>
        ))}
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-lg border border-ink-100 bg-white p-4">
          <div className="text-xs uppercase tracking-wide text-ink-400">Tip</div>
          <div className="mt-1 text-2xl font-semibold text-amber-700">{result ? money(result.tipAmount) : "—"}</div>
        </div>
        <div className="rounded-lg border border-ink-100 bg-white p-4">
          <div className="text-xs uppercase tracking-wide text-ink-400">Total</div>
          <div className="mt-1 text-2xl font-semibold text-ink-900">{result ? money(result.total) : "—"}</div>
        </div>
        <div className="rounded-lg border border-brand-200 bg-brand-50/40 p-4">
          <div className="text-xs uppercase tracking-wide text-brand-700">Each pays ({result?.p ?? 1})</div>
          <div className="mt-1 text-2xl font-semibold text-ink-900">{result ? money(result.perPerson) : "—"}</div>
        </div>
      </div>

      <p className="text-xs text-ink-400">Calculated live in your browser — split a bill fairly in seconds.</p>
    </div>
  );
}
