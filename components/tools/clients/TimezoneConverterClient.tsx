"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowRightLeft } from "lucide-react";

/** Full IANA zone list when the engine supports it; otherwise a sane fallback. */
function zoneList(): string[] {
  type IntlWithValues = typeof Intl & { supportedValuesOf?: (k: string) => string[] };
  const intl = Intl as IntlWithValues;
  if (typeof intl.supportedValuesOf === "function") {
    try { return intl.supportedValuesOf("timeZone"); } catch { /* fall through */ }
  }
  return [
    "UTC", "Europe/London", "Europe/Paris", "Europe/Berlin", "Europe/Moscow",
    "America/New_York", "America/Chicago", "America/Denver", "America/Los_Angeles",
    "America/Sao_Paulo", "Asia/Dubai", "Asia/Kolkata", "Asia/Shanghai",
    "Asia/Tokyo", "Asia/Singapore", "Australia/Sydney", "Pacific/Auckland",
  ];
}

function browserZone(): string {
  try { return Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC"; } catch { return "UTC"; }
}

function nowLocalInput(): string {
  const n = new Date();
  const p = (x: number) => String(x).padStart(2, "0");
  return `${n.getFullYear()}-${p(n.getMonth() + 1)}-${p(n.getDate())}T${p(n.getHours())}:${p(n.getMinutes())}`;
}

/** Offset (ms) of `timeZone` at the given instant: (wall-clock in zone) − UTC. */
function zoneOffsetMs(timeZone: string, instant: Date): number {
  const dtf = new Intl.DateTimeFormat("en-US", {
    timeZone, hour12: false,
    year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", second: "2-digit",
  });
  const parts = Object.fromEntries(dtf.formatToParts(instant).map((p) => [p.type, p.value]));
  // "24" can appear for midnight in some engines — normalise to 0.
  const hour = parts.hour === "24" ? 0 : Number(parts.hour);
  const asUTC = Date.UTC(+parts.year, +parts.month - 1, +parts.day, hour, +parts.minute, +parts.second);
  return asUTC - instant.getTime();
}

/** Convert a wall-clock time entered FOR `fromZone` into the absolute instant. */
function wallTimeToInstant(local: string, fromZone: string): number | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})$/.exec(local);
  if (!m) return null;
  const guess = Date.UTC(+m[1], +m[2] - 1, +m[3], +m[4], +m[5], 0);
  // Two passes so DST transition boundaries resolve correctly.
  let offset = zoneOffsetMs(fromZone, new Date(guess));
  let instant = guess - offset;
  offset = zoneOffsetMs(fromZone, new Date(instant));
  instant = guess - offset;
  return instant;
}

function fmtOffset(ms: number): string {
  const sign = ms >= 0 ? "+" : "−";
  const abs = Math.abs(ms);
  const h = Math.floor(abs / 3_600_000);
  const min = Math.floor((abs % 3_600_000) / 60_000);
  return `UTC${sign}${String(h).padStart(2, "0")}:${String(min).padStart(2, "0")}`;
}

export function TimezoneConverterClient() {
  const zones = useMemo(zoneList, []);
  // browserZone() and nowLocalInput() both depend on the runtime environment.
  // SSR resolves UTC + an arbitrary build-time minute, then the client
  // resolves the user's real zone + the current minute → React #425 mismatch.
  // Seed deterministic defaults and overwrite in useEffect after mount.
  const [fromZone, setFromZone] = useState("UTC");
  const [toZone, setToZone] = useState("UTC");
  const [local, setLocal] = useState("");
  useEffect(() => {
    setFromZone(browserZone());
    setLocal(nowLocalInput());
  }, []);

  const out = useMemo(() => {
    const instant = wallTimeToInstant(local, fromZone);
    if (instant == null) return null;
    const date = new Date(instant);
    const fmt = (tz: string) =>
      new Intl.DateTimeFormat(undefined, {
        timeZone: tz, dateStyle: "full", timeStyle: "short",
      }).format(date);
    const diffMs = zoneOffsetMs(toZone, date) - zoneOffsetMs(fromZone, date);
    const diffH = diffMs / 3_600_000;
    return {
      fromText: fmt(fromZone),
      toText: fmt(toZone),
      fromOffset: fmtOffset(zoneOffsetMs(fromZone, date)),
      toOffset: fmtOffset(zoneOffsetMs(toZone, date)),
      diffH,
    };
  }, [local, fromZone, toZone]);

  const swap = () => { setFromZone(toZone); setToZone(fromZone); };

  // Why a mount gate: Intl.supportedValuesOf("timeZone") returns a different
  // list under Node ICU than V8 ICU in the browser, so each <option> in the
  // zone <select> mismatches on hydration (React #425). Gate the full render
  // and the SSR ships a tiny skeleton; the client renders for real after mount.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) {
    return <div className="space-y-5"><div className="h-9 w-full animate-pulse rounded-md bg-ink-100" /><div className="h-9 w-72 animate-pulse rounded-md bg-ink-100" /></div>;
  }

  return (
    <div className="space-y-5">
      <div className="grid items-end gap-3 sm:grid-cols-[1fr_auto_1fr]">
        <label className="flex flex-col text-xs font-medium text-ink-600">
          From timezone
          <select value={fromZone} onChange={(e) => setFromZone(e.target.value)}
            className="mt-1 rounded-md border border-ink-200 bg-white px-3 py-2 text-sm text-ink-900">
            {zones.map((z) => <option key={z} value={z}>{z.replace(/_/g, " ")}</option>)}
          </select>
        </label>
        <button onClick={swap} aria-label="Swap timezones"
          className="mb-1 inline-flex h-9 w-9 items-center justify-center rounded-md border border-ink-200 bg-white text-ink-600 hover:border-brand-300 hover:text-ink-900">
          <ArrowRightLeft className="h-4 w-4" />
        </button>
        <label className="flex flex-col text-xs font-medium text-ink-600">
          To timezone
          <select value={toZone} onChange={(e) => setToZone(e.target.value)}
            className="mt-1 rounded-md border border-ink-200 bg-white px-3 py-2 text-sm text-ink-900">
            {zones.map((z) => <option key={z} value={z}>{z.replace(/_/g, " ")}</option>)}
          </select>
        </label>
      </div>

      <div className="flex flex-wrap items-end gap-3">
        <label className="flex flex-col text-xs font-medium text-ink-600">
          Date & time (in the “from” zone)
          <input type="datetime-local" value={local} onChange={(e) => setLocal(e.target.value)}
            className="mt-1 rounded-md border border-ink-200 bg-white px-3 py-2 text-base text-ink-900 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100" />
        </label>
        <button onClick={() => setLocal(nowLocalInput())}
          className="mb-px rounded-md border border-ink-200 bg-white px-3 py-2 text-xs font-medium text-ink-600 hover:border-brand-300 hover:text-ink-900">
          Now
        </button>
      </div>

      {out && (
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg border border-ink-100 bg-white p-4">
            <div className="text-xs uppercase tracking-wide text-ink-400">{fromZone.replace(/_/g, " ")} · {out.fromOffset}</div>
            <div className="mt-1 text-base font-semibold text-ink-900">{out.fromText}</div>
          </div>
          <div className="rounded-lg border border-brand-200 bg-brand-50/40 p-4">
            <div className="text-xs uppercase tracking-wide text-brand-700">{toZone.replace(/_/g, " ")} · {out.toOffset}</div>
            <div className="mt-1 text-base font-semibold text-ink-900">{out.toText}</div>
          </div>
        </div>
      )}

      {out && (
        <p className="text-sm text-ink-500">
          {toZone.replace(/_/g, " ")} is{" "}
          <strong>
            {out.diffH === 0 ? "the same time" : `${Math.abs(out.diffH)} hour${Math.abs(out.diffH) === 1 ? "" : "s"} ${out.diffH > 0 ? "ahead of" : "behind"}`}
          </strong>{" "}
          {out.diffH === 0 ? "as" : ""} {fromZone.replace(/_/g, " ")}.
        </p>
      )}

      <p className="text-xs text-ink-400">
        Handles daylight-saving transitions automatically. Computed entirely in your browser.
      </p>
    </div>
  );
}
