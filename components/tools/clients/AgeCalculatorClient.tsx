"use client";

import { useMemo, useState } from "react";

/** Parse a YYYY-MM-DD value into a LOCAL date at midnight (no timezone drift). */
function parseLocalDate(v: string): Date | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(v);
  if (!m) return null;
  const d = new Date(+m[1], +m[2] - 1, +m[3]);
  // Reject impossible dates like 2026-02-31 (JS would roll them over).
  if (d.getFullYear() !== +m[1] || d.getMonth() !== +m[2] - 1 || d.getDate() !== +m[3]) return null;
  return d;
}

function todayValue(): string {
  const n = new Date();
  return `${n.getFullYear()}-${String(n.getMonth() + 1).padStart(2, "0")}-${String(n.getDate()).padStart(2, "0")}`;
}

const DAY_MS = 86_400_000;

export function AgeCalculatorClient() {
  const [dob, setDob] = useState("");
  const [asOf, setAsOf] = useState(todayValue());

  const result = useMemo(() => {
    const birth = parseLocalDate(dob);
    const ref = parseLocalDate(asOf);
    if (!birth || !ref) return null;
    if (birth.getTime() > ref.getTime()) return { error: "Date of birth is after the reference date." } as const;

    // Exact calendar age: years / months / days, borrowing correctly.
    let years = ref.getFullYear() - birth.getFullYear();
    let months = ref.getMonth() - birth.getMonth();
    let days = ref.getDate() - birth.getDate();
    if (days < 0) {
      months -= 1;
      // Days in the month preceding the reference month.
      const prevMonthLastDay = new Date(ref.getFullYear(), ref.getMonth(), 0).getDate();
      days += prevMonthLastDay;
    }
    if (months < 0) {
      months += 12;
      years -= 1;
    }

    const totalDays = Math.floor((ref.getTime() - birth.getTime()) / DAY_MS);
    const totalMonths = years * 12 + months;

    // Next birthday on or after the reference date.
    let nextBday = new Date(ref.getFullYear(), birth.getMonth(), birth.getDate());
    if (nextBday.getTime() < ref.getTime()) nextBday = new Date(ref.getFullYear() + 1, birth.getMonth(), birth.getDate());
    // ceil() so a date late in the day still reports "in N days" rather than
    // rounding down to N-1 when the next birthday is N*24h+23h away.
    const daysToNext = Math.ceil((nextBday.getTime() - ref.getTime()) / DAY_MS);

    const weekday = birth.toLocaleDateString(undefined, { weekday: "long" });

    return {
      error: null,
      years, months, days,
      totalMonths,
      totalWeeks: Math.floor(totalDays / 7),
      totalDays,
      totalHours: totalDays * 24,
      daysToNext,
      weekday,
    } as const;
  }, [dob, asOf]);

  const stat = (label: string, value: string) => (
    <div className="rounded-lg border border-ink-100 bg-white p-4">
      <div className="text-xs uppercase tracking-wide text-ink-400">{label}</div>
      <div className="mt-1 text-xl font-semibold text-ink-900">{value}</div>
    </div>
  );

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col text-xs font-medium text-ink-600">
          Date of birth
          <input type="date" value={dob} max={asOf} onChange={(e) => setDob(e.target.value)}
            className="mt-1 rounded-md border border-ink-200 bg-white px-3 py-2 text-base text-ink-900 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100" />
        </label>
        <label className="flex flex-col text-xs font-medium text-ink-600">
          Age at date
          <input type="date" value={asOf} onChange={(e) => setAsOf(e.target.value)}
            className="mt-1 rounded-md border border-ink-200 bg-white px-3 py-2 text-base text-ink-900 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100" />
        </label>
      </div>

      {!dob && <p className="text-sm text-ink-400">Enter a date of birth to see the exact age.</p>}

      {result?.error && (
        <p className="rounded border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">{result.error}</p>
      )}

      {result && !result.error && (
        <>
          <div className="rounded-xl border border-brand-200 bg-brand-50/40 p-5 text-center">
            <div className="text-xs uppercase tracking-wide text-brand-700">Exact age</div>
            <div className="mt-1 text-3xl font-bold text-ink-900">
              {result.years} <span className="text-lg font-medium text-ink-500">years</span>{" "}
              {result.months} <span className="text-lg font-medium text-ink-500">months</span>{" "}
              {result.days} <span className="text-lg font-medium text-ink-500">days</span>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {stat("In months", result.totalMonths.toLocaleString())}
            {stat("In weeks", result.totalWeeks.toLocaleString())}
            {stat("In days", result.totalDays.toLocaleString())}
            {stat("In hours", result.totalHours.toLocaleString())}
            {stat("Born on a", result.weekday)}
            {stat("Next birthday", result.daysToNext === 0 ? "Today! 🎉" : `in ${result.daysToNext} days`)}
          </div>
        </>
      )}

      <p className="text-xs text-ink-400">
        Calculated entirely in your browser — your dates never leave your device.
      </p>
    </div>
  );
}
