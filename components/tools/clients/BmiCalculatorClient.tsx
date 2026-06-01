"use client";

import { useMemo, useState } from "react";

type Unit = "metric" | "imperial";

function category(bmi: number): { label: string; tone: string } {
  if (bmi < 18.5) return { label: "Underweight", tone: "text-sky-700" };
  if (bmi < 25) return { label: "Healthy weight", tone: "text-emerald-700" };
  if (bmi < 30) return { label: "Overweight", tone: "text-amber-700" };
  return { label: "Obese", tone: "text-red-700" };
}

export function BmiCalculatorClient() {
  const [unit, setUnit] = useState<Unit>("metric");
  // metric
  const [cm, setCm] = useState("175");
  const [kg, setKg] = useState("70");
  // imperial
  const [ft, setFt] = useState("5");
  const [inch, setInch] = useState("9");
  const [lb, setLb] = useState("154");

  const bmi = useMemo(() => {
    if (unit === "metric") {
      const h = Number(cm) / 100, w = Number(kg);
      if (!Number.isFinite(h) || !Number.isFinite(w) || h <= 0 || w <= 0) return NaN;
      return w / (h * h);
    }
    const totalIn = Number(ft) * 12 + Number(inch), w = Number(lb);
    if (!Number.isFinite(totalIn) || !Number.isFinite(w) || totalIn <= 0 || w <= 0) return NaN;
    return (w / (totalIn * totalIn)) * 703;
  }, [unit, cm, kg, ft, inch, lb]);

  const ok = Number.isFinite(bmi);
  const cat = ok ? category(bmi) : null;

  return (
    <div className="space-y-5">
      <div className="inline-flex rounded-lg border border-ink-200 bg-white p-1">
        {(["metric", "imperial"] as const).map((u) => (
          <button key={u} onClick={() => setUnit(u)}
            className={`rounded-md px-3 py-1.5 text-xs font-medium ${unit === u ? "bg-brand-500 text-white" : "text-ink-600"}`}>
            {u === "metric" ? "Metric (cm / kg)" : "Imperial (ft / lb)"}
          </button>
        ))}
      </div>

      {unit === "metric" ? (
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="flex flex-col text-xs font-medium text-ink-600">
            Height (cm)
            <input type="number" min={0} value={cm} onChange={(e) => setCm(e.target.value)}
              className="mt-1 rounded-md border border-ink-200 bg-white px-3 py-2 text-base text-ink-900 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100" />
          </label>
          <label className="flex flex-col text-xs font-medium text-ink-600">
            Weight (kg)
            <input type="number" min={0} value={kg} onChange={(e) => setKg(e.target.value)}
              className="mt-1 rounded-md border border-ink-200 bg-white px-3 py-2 text-base text-ink-900 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100" />
          </label>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-3">
          <label className="flex flex-col text-xs font-medium text-ink-600">
            Height (ft)
            <input type="number" min={0} value={ft} onChange={(e) => setFt(e.target.value)}
              className="mt-1 rounded-md border border-ink-200 bg-white px-3 py-2 text-base text-ink-900 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100" />
          </label>
          <label className="flex flex-col text-xs font-medium text-ink-600">
            Height (in)
            <input type="number" min={0} value={inch} onChange={(e) => setInch(e.target.value)}
              className="mt-1 rounded-md border border-ink-200 bg-white px-3 py-2 text-base text-ink-900 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100" />
          </label>
          <label className="flex flex-col text-xs font-medium text-ink-600">
            Weight (lb)
            <input type="number" min={0} value={lb} onChange={(e) => setLb(e.target.value)}
              className="mt-1 rounded-md border border-ink-200 bg-white px-3 py-2 text-base text-ink-900 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100" />
          </label>
        </div>
      )}

      <div className="rounded-lg border border-brand-200 bg-brand-50/40 p-5">
        <div className="text-xs uppercase tracking-wide text-brand-700">Your BMI</div>
        <div className="mt-1 flex items-baseline gap-3">
          <div className="text-3xl font-semibold text-ink-900">{ok ? bmi.toFixed(1) : "—"}</div>
          {cat && <div className={`text-sm font-semibold ${cat.tone}`}>{cat.label}</div>}
        </div>
      </div>

      <p className="text-xs text-ink-400">
        BMI is a rough screening tool and doesn't account for muscle mass, age or build. For guidance only, not medical advice.
      </p>
    </div>
  );
}
