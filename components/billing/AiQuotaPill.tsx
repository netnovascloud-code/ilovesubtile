"use client";

import Link from "next/link";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAiQuota } from "@/hooks/useAiQuota";
import { useLocale } from "@/hooks/useLocale";
import { localePath } from "@/lib/i18n/locales";

/**
 * Header pill showing the user's remaining AI quota in realtime.
 * Hidden for anonymous visitors and while plan resolves. Turns amber under
 * 20% remaining and red at zero. Clicking jumps to pricing.
 */
export function AiQuotaPill() {
  const q = useAiQuota();
  const locale = useLocale();
  if (q.loading || q.remaining === Infinity || q.limit === 0) return null;

  const ratio = q.limit > 0 ? q.remaining / q.limit : 1;
  const tone = ratio === 0 ? "border-red-200 bg-red-50 text-red-700"
    : ratio < 0.2 ? "border-amber-200 bg-amber-50 text-amber-700"
    : "border-ink-100 bg-ink-50 text-ink-700";
  const fmt = (n: number) => { try { return n.toLocaleString(locale); } catch { return n.toLocaleString(); } };
  const unit = q.kind === "monthly" ? "/mo" : "/d";

  return (
    <Link
      href={localePath(locale, "pricing")}
      title={`${fmt(q.remaining)} / ${fmt(q.limit)} AI runs remaining`}
      className={cn("inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium tabular-nums transition-colors hover:brightness-95", tone)}
    >
      <Sparkles className="h-3 w-3" />
      {fmt(q.remaining)}/{fmt(q.limit)}<span className="opacity-60">{unit}</span>
    </Link>
  );
}
