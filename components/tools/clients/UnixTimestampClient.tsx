"use client";

import { useEffect, useMemo, useState } from "react";
import { Copy, Check, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

function pad(n: number, w = 2) { return String(n).padStart(w, "0"); }
function toLocalISO(d: Date) {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

const ZONES = ["UTC", "America/New_York", "America/Los_Angeles", "Europe/London", "Europe/Paris", "Asia/Tokyo", "Asia/Shanghai"];

export function UnixTimestampClient() {
  // SSR can't pick a stable "now", so we start at 0 and let useEffect seed
  // the real values after mount. Without this the rendered seconds-since-epoch
  // and the local-ISO datetime input differ between SSR and hydration and
  // throw React #425.
  const [now, setNow] = useState(0);
  const [tsInput, setTsInput] = useState("");
  const [unit, setUnit] = useState<"s" | "ms">("s");
  const [dateInput, setDateInput] = useState("");
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    const seed = Math.floor(Date.now() / 1000);
    setNow(seed);
    setTsInput(String(seed));
    setDateInput(toLocalISO(new Date()));
    const id = setInterval(() => setNow(Math.floor(Date.now() / 1000)), 1000);
    return () => clearInterval(id);
  }, []);

  const date = useMemo(() => {
    const n = Number(tsInput);
    if (!Number.isFinite(n)) return null;
    const ms = unit === "ms" ? n : n * 1000;
    const d = new Date(ms);
    return isNaN(d.getTime()) ? null : d;
  }, [tsInput, unit]);

  const fromDate = useMemo(() => {
    const d = new Date(dateInput);
    if (isNaN(d.getTime())) return null;
    return d;
  }, [dateInput]);

  async function copy(id: string, value: string) {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(id);
      setTimeout(() => setCopied((c) => (c === id ? null : c)), 1200);
    } catch {}
  }

  // Why a mount gate: date.toLocaleString and dateInput's datetime-local
  // initial value both depend on the runtime's timezone and ICU build, so SSR
  // (Node, UTC) and the client (browser, user TZ) can diverge in the rendered
  // timestamp rows. SSR ships a skeleton and the client renders for real.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) {
    return <div className="space-y-6"><div className="h-14 w-full animate-pulse rounded-md bg-ink-100" /><div className="h-40 w-full animate-pulse rounded-md bg-ink-100" /></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3 rounded-lg border border-ink-100 bg-white p-4">
        <div>
          <div className="text-xs uppercase tracking-wide text-ink-400">Current Unix time</div>
          <div className="font-mono text-2xl text-ink-900">{now}</div>
        </div>
        <Button size="sm" variant="outline" className="ml-auto" onClick={() => { setTsInput(String(now)); setUnit("s"); }}>
          <RefreshCw className="h-3.5 w-3.5" /> Use now
        </Button>
      </div>

      <section className="rounded-lg border border-ink-100 bg-white p-5">
        <h2 className="font-semibold text-ink-900">Timestamp → date</h2>
        <div className="mt-3 flex flex-wrap gap-3">
          <input
            value={tsInput}
            onChange={(e) => setTsInput(e.target.value)}
            placeholder="1700000000"
            className="flex-1 rounded-md border border-ink-200 bg-white px-3 py-2 font-mono text-sm text-ink-900 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100"
          />
          <div className="inline-flex rounded-lg border border-ink-200 bg-white p-1">
            {(["s", "ms"] as const).map((u) => (
              <button key={u} onClick={() => setUnit(u)} className={`rounded-md px-3 py-1 text-xs font-medium ${unit === u ? "bg-brand-500 text-white" : "text-ink-600"}`}>
                {u === "s" ? "Seconds" : "Milliseconds"}
              </button>
            ))}
          </div>
        </div>

        {date ? (
          <ul className="mt-4 space-y-2 text-sm">
            {ZONES.map((tz) => {
              const value = date.toLocaleString("en-GB", { timeZone: tz, dateStyle: "full", timeStyle: "medium" });
              return (
                <li key={tz} className="flex items-center gap-3 rounded border border-ink-100 px-3 py-2">
                  <span className="w-44 shrink-0 font-mono text-xs uppercase tracking-wide text-ink-400">{tz}</span>
                  <span className="flex-1 text-ink-800">{value}</span>
                  <button onClick={() => copy(tz, value)} className="rounded p-1 text-ink-400 hover:bg-ink-50 hover:text-ink-700">
                    {copied === tz ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                  </button>
                </li>
              );
            })}
            <li className="flex items-center gap-3 rounded border border-ink-100 px-3 py-2">
              <span className="w-44 shrink-0 font-mono text-xs uppercase tracking-wide text-ink-400">ISO 8601</span>
              <span className="flex-1 font-mono text-ink-800">{date.toISOString()}</span>
              <button onClick={() => copy("iso", date.toISOString())} className="rounded p-1 text-ink-400 hover:bg-ink-50 hover:text-ink-700">
                {copied === "iso" ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
              </button>
            </li>
          </ul>
        ) : (
          <p className="mt-3 text-sm text-red-600">Enter a numeric timestamp.</p>
        )}
      </section>

      <section className="rounded-lg border border-ink-100 bg-white p-5">
        <h2 className="font-semibold text-ink-900">Date → timestamp</h2>
        <input
          type="datetime-local"
          step="1"
          value={dateInput}
          onChange={(e) => setDateInput(e.target.value)}
          className="mt-3 rounded-md border border-ink-200 bg-white px-3 py-2 text-sm text-ink-900 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100"
        />
        {fromDate ? (
          <ul className="mt-4 space-y-2 text-sm">
            <li className="flex items-center gap-3 rounded border border-ink-100 px-3 py-2">
              <span className="w-44 shrink-0 font-mono text-xs uppercase tracking-wide text-ink-400">Seconds</span>
              <span className="flex-1 font-mono text-ink-900">{Math.floor(fromDate.getTime() / 1000)}</span>
              <button onClick={() => copy("s", String(Math.floor(fromDate.getTime() / 1000)))} className="rounded p-1 text-ink-400 hover:bg-ink-50 hover:text-ink-700">
                {copied === "s" ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
              </button>
            </li>
            <li className="flex items-center gap-3 rounded border border-ink-100 px-3 py-2">
              <span className="w-44 shrink-0 font-mono text-xs uppercase tracking-wide text-ink-400">Milliseconds</span>
              <span className="flex-1 font-mono text-ink-900">{fromDate.getTime()}</span>
              <button onClick={() => copy("ms", String(fromDate.getTime()))} className="rounded p-1 text-ink-400 hover:bg-ink-50 hover:text-ink-700">
                {copied === "ms" ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
              </button>
            </li>
          </ul>
        ) : (
          <p className="mt-3 text-sm text-red-600">Pick a valid date.</p>
        )}
      </section>

      <p className="text-xs text-ink-400">100% in your browser — no data leaves your device.</p>
    </div>
  );
}
