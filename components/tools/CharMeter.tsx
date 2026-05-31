"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import type { CharLimitState } from "@/hooks/useCharLimit";

/**
 * Live character / word / reading-time counter for the AI text tools.
 * Turns amber near the plan ceiling and red once over, with a sign-in /
 * upgrade CTA that names the next tier's limit. Pair with the parent button's
 * `disabled={... || state.over}` so an over-limit run is actually blocked.
 */
export function CharMeter({ state }: { state: CharLimitState }) {
  const { chars, words, minutes, limit, nextLimit, over, near, tier, locale, strings } = state;
  const fmt = (n: number) => {
    try { return n.toLocaleString(locale); } catch { return n.toLocaleString(); }
  };
  const interp = (tpl: string, n: number) => tpl.replace("{limit}", fmt(n));
  const countColor = over ? "text-red-600" : near ? "text-amber-600" : "text-ink-400";

  return (
    <div className="mt-1.5 space-y-1">
      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-0.5 text-xs">
        <span className="text-ink-400">
          {fmt(words)} {strings.words} · {minutes} {strings.minRead}
        </span>
        <span className={cn("font-medium tabular-nums", countColor)}>
          {fmt(chars)} / {fmt(limit)}
        </span>
      </div>
      {over && (
        <p className="text-xs text-red-600">
          {strings.over}{" "}
          {nextLimit !== null && (
            <Link
              href={tier === "anonymous" ? "/login" : "/pricing"}
              className="font-semibold underline underline-offset-2 hover:text-red-700"
            >
              {interp(tier === "anonymous" ? strings.signIn : strings.upgrade, nextLimit)}
            </Link>
          )}
        </p>
      )}
    </div>
  );
}
