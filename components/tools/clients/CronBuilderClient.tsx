"use client";

import { useMemo, useState } from "react";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

type Field = "minute" | "hour" | "dom" | "month" | "dow";

const FIELDS: { id: Field; label: string; min: number; max: number; example: string }[] = [
  { id: "minute", label: "Minute", min: 0, max: 59, example: "0,15,30,45 | */5 | 0" },
  { id: "hour",   label: "Hour",   min: 0, max: 23, example: "9-17 | */2 | 0" },
  { id: "dom",    label: "Day of month", min: 1, max: 31, example: "*, 1, 1,15, L" },
  { id: "month",  label: "Month", min: 1, max: 12, example: "*, 1, 1-6, JAN-JUN" },
  { id: "dow",    label: "Day of week",  min: 0, max: 6,  example: "* MON-FRI | 0,6" },
];

const PRESETS: { label: string; expr: string }[] = [
  { label: "Every minute", expr: "* * * * *" },
  { label: "Every 5 minutes", expr: "*/5 * * * *" },
  { label: "Every 15 minutes", expr: "*/15 * * * *" },
  { label: "Every hour, on the hour", expr: "0 * * * *" },
  { label: "Every day at midnight", expr: "0 0 * * *" },
  { label: "Every day at 9am", expr: "0 9 * * *" },
  { label: "Every Monday at 9am", expr: "0 9 * * 1" },
  { label: "Weekdays at 9am", expr: "0 9 * * 1-5" },
  { label: "First of every month, midnight", expr: "0 0 1 * *" },
  { label: "Once a year (1 Jan, midnight)", expr: "0 0 1 1 *" },
];

function fieldFromExpr(expr: string): Record<Field, string> {
  const p = expr.split(/\s+/);
  while (p.length < 5) p.push("*");
  return { minute: p[0], hour: p[1], dom: p[2], month: p[3], dow: p[4] };
}

/** Best-effort human translation. Not exhaustive (Quartz extensions aren't supported)
 *  but covers the patterns 95% of users actually write. */
function humanize(parts: Record<Field, string>): string {
  const { minute, hour, dom, month, dow } = parts;
  const min = minute === "*" ? "every minute" : `at minute ${minute}`;
  const hr = hour === "*" ? "of every hour" : `of hour ${hour}`;
  const day = dom === "*" ? "every day" : `on day ${dom}`;
  const mo = month === "*" ? "every month" : `in month ${month}`;
  const wd = dow === "*" ? "" : `, on weekday ${dow}`;
  return `${min}, ${hr}, ${day}, ${mo}${wd}.`;
}

// Sample next-fire times. Pure brute-force scan minute-by-minute over the next
// ~14 days — enough for previewing without pulling in a real cron library.
// `min`/`max` are the field bounds: a bare star-step ("* / step") is anchored at
// the field minimum per cron semantics, so day-of-month step-2 fires on 1,3,5…
// not 2,4,6.
function fieldMatches(value: number, expr: string, min: number, max: number): boolean {
  if (expr === "*") return true;
  for (const part of expr.split(",")) {
    if (part.includes("/")) {
      const [range, stepStr] = part.split("/");
      const step = Number(stepStr) || 1;
      const [a, b] = range === "*" ? [min, max] : range.split("-").map(Number);
      const lo = a, hi = (b === undefined ? max : b);
      if (value >= lo && value <= hi && (value - lo) % step === 0) return true;
    } else if (part.includes("-")) {
      const [a, b] = part.split("-").map(Number);
      if (value >= a && value <= b) return true;
    } else if (Number(part) === value) return true;
  }
  return false;
}

/** Day-of-week matcher. Cron accepts both 0 and 7 for Sunday, but JS getDay()
 *  only returns 0 for Sunday — so test the raw value, then retry with any `7`
 *  rewritten to `0` when the current day is Sunday. */
function dowMatches(jsDay: number, expr: string): boolean {
  if (fieldMatches(jsDay, expr, 0, 7)) return true;
  if (jsDay === 0 && /7/.test(expr)) return fieldMatches(0, expr.replace(/7/g, "0"), 0, 6);
  return false;
}

function nextFires(parts: Record<Field, string>, count = 5): Date[] {
  const out: Date[] = [];
  const now = new Date();
  now.setSeconds(0, 0);
  now.setMinutes(now.getMinutes() + 1);
  const stop = new Date(now.getTime() + 14 * 24 * 3600 * 1000);
  for (let t = now.getTime(); t <= stop.getTime() && out.length < count; t += 60_000) {
    const d = new Date(t);
    if (
      fieldMatches(d.getMinutes(), parts.minute, 0, 59) &&
      fieldMatches(d.getHours(), parts.hour, 0, 23) &&
      fieldMatches(d.getDate(), parts.dom, 1, 31) &&
      fieldMatches(d.getMonth() + 1, parts.month, 1, 12) &&
      dowMatches(d.getDay(), parts.dow)
    ) out.push(new Date(d));
  }
  return out;
}

export function CronBuilderClient() {
  const [expr, setExpr] = useState("0 9 * * 1-5");
  const [copied, setCopied] = useState(false);
  const parts = useMemo(() => fieldFromExpr(expr), [expr]);
  const sample = useMemo(() => nextFires(parts, 5), [parts]);

  function setField(f: Field, value: string) {
    const next = { ...parts, [f]: value };
    setExpr(`${next.minute} ${next.hour} ${next.dom} ${next.month} ${next.dow}`);
  }
  async function copy() {
    try { await navigator.clipboard.writeText(expr); setCopied(true); setTimeout(() => setCopied(false), 1200); } catch {}
  }

  return (
    <div className="space-y-5">
      <div className="rounded-lg border border-ink-100 bg-white p-4">
        <label className="block text-xs font-semibold uppercase tracking-wide text-ink-400">Expression</label>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <input value={expr} onChange={(e) => setExpr(e.target.value)} spellCheck={false}
            className="min-w-0 flex-1 rounded-md border border-ink-200 px-3 py-2 font-mono text-base text-ink-900 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100" />
          <Button size="sm" variant="outline" onClick={copy}>
            {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            {copied ? "Copied" : "Copy"}
          </Button>
        </div>
        <p className="mt-2 text-sm text-ink-500">{humanize(parts)}</p>
      </div>

      <div className="grid gap-3 rounded-lg border border-ink-100 bg-white p-4 sm:grid-cols-5">
        {FIELDS.map((f) => (
          <label key={f.id} className="flex flex-col text-xs font-medium text-ink-600">
            {f.label}
            <input value={parts[f.id]} onChange={(e) => setField(f.id, e.target.value)} spellCheck={false}
              className="mt-1 rounded-md border border-ink-200 px-2 py-1.5 font-mono text-sm" />
            <span className="mt-1 truncate text-[10px] text-ink-400">{f.example}</span>
          </label>
        ))}
      </div>

      <div className="rounded-lg border border-ink-100 bg-white p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">Next 5 fire times</p>
        <ul className="mt-2 space-y-1 font-mono text-sm">
          {sample.length === 0 ? (
            <li className="text-ink-400">No matching time in the next 14 days.</li>
          ) : sample.map((d, i) => (
            <li key={i} className="text-ink-700">{d.toLocaleString()}</li>
          ))}
        </ul>
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">Presets</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {PRESETS.map((p) => (
            <button key={p.label} onClick={() => setExpr(p.expr)} className="rounded-full border border-ink-200 bg-white px-3 py-1 text-xs text-ink-700 hover:border-brand-300 hover:text-ink-900">
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <p className="text-xs text-ink-400">100% in your browser — nothing leaves your device.</p>
    </div>
  );
}
