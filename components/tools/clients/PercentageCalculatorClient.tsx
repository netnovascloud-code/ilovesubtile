"use client";

import { useMemo, useState } from "react";

type Mode = "of" | "is_what" | "change";

function num(v: string): number {
  const n = Number(v);
  return Number.isFinite(n) ? n : NaN;
}
function show(n: number): string {
  if (!Number.isFinite(n)) return "—";
  return (Math.round(n * 1e6) / 1e6).toLocaleString("en-US", { maximumFractionDigits: 6 });
}

export function PercentageCalculatorClient() {
  const [mode, setMode] = useState<Mode>("of");
  const [a, setA] = useState("15");
  const [b, setB] = useState("200");

  const result = useMemo(() => {
    const x = num(a), y = num(b);
    if (!Number.isFinite(x) || !Number.isFinite(y)) return null;
    if (mode === "of") return { label: `${show(x)}% of ${show(y)}`, value: (x / 100) * y };
    if (mode === "is_what") return { label: `${show(x)} is this % of ${show(y)}`, value: y === 0 ? NaN : (x / y) * 100, suffix: "%" };
    return { label: `Change from ${show(x)} to ${show(y)}`, value: x === 0 ? NaN : ((y - x) / Math.abs(x)) * 100, suffix: "%" };
  }, [mode, a, b]);

  const labels: Record<Mode, { tab: string; a: string; b: string }> = {
    of: { tab: "% of a number", a: "Percentage (%)", b: "Of value" },
    is_what: { tab: "X is what % of Y", a: "Value X", b: "Of total Y" },
    change: { tab: "% increase / decrease", a: "From", b: "To" },
  };

  return (
    <div className="space-y-5">
      <div className="inline-flex flex-wrap rounded-lg border border-ink-200 bg-white p-1">
        {(["of", "is_what", "change"] as const).map((m) => (
          <button key={m} onClick={() => setMode(m)}
            className={`rounded-md px-3 py-1.5 text-xs font-medium ${mode === m ? "bg-brand-500 text-white" : "text-ink-600"}`}>
            {labels[m].tab}
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col text-xs font-medium text-ink-600">
          {labels[mode].a}
          <input type="number" value={a} onChange={(e) => setA(e.target.value)}
            className="mt-1 rounded-md border border-ink-200 bg-white px-3 py-2 text-base text-ink-900 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100" />
        </label>
        <label className="flex flex-col text-xs font-medium text-ink-600">
          {labels[mode].b}
          <input type="number" value={b} onChange={(e) => setB(e.target.value)}
            className="mt-1 rounded-md border border-ink-200 bg-white px-3 py-2 text-base text-ink-900 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100" />
        </label>
      </div>

      <div className="rounded-lg border border-brand-200 bg-brand-50/40 p-5">
        <div className="text-xs uppercase tracking-wide text-brand-700">{result?.label ?? "Result"}</div>
        <div className="mt-1 text-3xl font-semibold text-ink-900">
          {result ? `${show(result.value)}${result.suffix ?? ""}` : "—"}
        </div>
      </div>

      <p className="text-xs text-ink-400">Everything is computed live in your browser — nothing is sent anywhere.</p>
    </div>
  );
}
