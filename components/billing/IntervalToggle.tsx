"use client";

import { cn } from "@/lib/utils";

export type Interval = "monthly" | "annual";

export function IntervalToggle({
  value,
  onChange,
  labels,
}: {
  value: Interval;
  onChange: (v: Interval) => void;
  labels: { monthly: string; annual: string; saveBadge: string };
}) {
  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-ink-100 bg-white p-1 text-sm shadow-card">
      <button
        type="button"
        onClick={() => onChange("monthly")}
        aria-pressed={value === "monthly"}
        className={cn(
          "rounded-full px-4 py-1.5 font-medium transition-colors",
          value === "monthly" ? "bg-brand-500 text-white" : "text-ink-700 hover:text-ink-900",
        )}
      >
        {labels.monthly}
      </button>
      <button
        type="button"
        onClick={() => onChange("annual")}
        aria-pressed={value === "annual"}
        className={cn(
          "flex items-center gap-2 rounded-full px-4 py-1.5 font-medium transition-colors",
          value === "annual" ? "bg-brand-500 text-white" : "text-ink-700 hover:text-ink-900",
        )}
      >
        <span>{labels.annual}</span>
        <span
          className={cn(
            "rounded-full px-1.5 py-0.5 text-[10px] font-semibold uppercase",
            value === "annual" ? "bg-white/20 text-white" : "bg-green-50 text-green-700",
          )}
        >
          {labels.saveBadge}
        </span>
      </button>
    </div>
  );
}
