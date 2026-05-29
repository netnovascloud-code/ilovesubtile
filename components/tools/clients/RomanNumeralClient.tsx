"use client";

import { useState } from "react";

const MAP: [number, string][] = [
  [1000, "M"], [900, "CM"], [500, "D"], [400, "CD"], [100, "C"], [90, "XC"],
  [50, "L"], [40, "XL"], [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"],
];

function toRoman(n: number): string | null {
  if (!Number.isInteger(n) || n < 1 || n > 3999) return null;
  let out = "";
  for (const [v, s] of MAP) while (n >= v) { out += s; n -= v; }
  return out;
}

function fromRoman(raw: string): number | null {
  const s = raw.trim().toUpperCase();
  if (!s || !/^[MDCLXVI]+$/.test(s)) return null;
  const val: Record<string, number> = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
  let total = 0;
  for (let i = 0; i < s.length; i++) {
    const cur = val[s[i]], next = val[s[i + 1]] ?? 0;
    total += cur < next ? -cur : cur;
  }
  // Validate by round-tripping — rejects non-canonical forms like "IIII" or "IC".
  return toRoman(total) === s ? total : null;
}

export function RomanNumeralClient() {
  const [arabic, setArabic] = useState("2026");
  const [roman, setRoman] = useState("MMXXVI");

  const onArabic = (v: string) => {
    setArabic(v);
    const r = toRoman(Number(v));
    if (r !== null) setRoman(r);
  };
  const onRoman = (v: string) => {
    setRoman(v.toUpperCase());
    const n = fromRoman(v);
    if (n !== null) setArabic(String(n));
  };

  const arabicValid = toRoman(Number(arabic)) !== null;
  const romanValid = fromRoman(roman) !== null;

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col text-xs font-medium text-ink-600">
          Number (1–3999)
          <input value={arabic} inputMode="numeric" onChange={(e) => onArabic(e.target.value)}
            className={`mt-1 rounded-md border bg-white px-3 py-2 text-base text-ink-900 focus:outline-none focus:ring-2 focus:ring-brand-100 ${arabicValid ? "border-ink-200 focus:border-brand-400" : "border-red-300"}`} />
        </label>
        <label className="flex flex-col text-xs font-medium text-ink-600">
          Roman numeral
          <input value={roman} onChange={(e) => onRoman(e.target.value)}
            className={`mt-1 rounded-md border bg-white px-3 py-2 text-base font-mono uppercase tracking-wider text-ink-900 focus:outline-none focus:ring-2 focus:ring-brand-100 ${romanValid ? "border-ink-200 focus:border-brand-400" : "border-red-300"}`} />
        </label>
      </div>

      <div className="rounded-xl border border-brand-200 bg-brand-50/40 p-5 text-center">
        <div className="text-xs uppercase tracking-wide text-brand-700">Result</div>
        <div className="mt-1 text-3xl font-bold tracking-wider text-ink-900">
          {arabicValid ? `${Number(arabic)} = ${toRoman(Number(arabic))}` : "—"}
        </div>
      </div>

      {!arabicValid && arabic !== "" && (
        <p className="text-sm text-amber-700">Enter a whole number between 1 and 3999.</p>
      )}

      <p className="text-xs text-ink-400">
        Roman numerals only go up to 3999 (MMMCMXCIX) in standard notation. Computed in your browser.
      </p>
    </div>
  );
}
