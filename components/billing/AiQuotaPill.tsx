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
  // Localised period suffix (the bar showed "/mo" on every non-English site).
  // One short month/day abbreviation per supported locale; unknown locales fall
  // back to the English abbreviation.
  const UNIT: Partial<Record<typeof locale, { mo: string; d: string }>> = {
    en: { mo: "/mo", d: "/d" },
    fr: { mo: "/mois", d: "/j" },
    es: { mo: "/mes", d: "/día" },
    pt: { mo: "/mês", d: "/dia" },
    de: { mo: "/Monat", d: "/Tag" },
    it: { mo: "/mese", d: "/g" },
    nl: { mo: "/mnd", d: "/dag" },
    ja: { mo: "/月", d: "/日" },
    zh: { mo: "/月", d: "/天" },
    ko: { mo: "/월", d: "/일" },
    ar: { mo: "/شهر", d: "/يوم" },
    ru: { mo: "/мес", d: "/дн" },
    hi: { mo: "/माह", d: "/दिन" },
    tr: { mo: "/ay", d: "/gün" },
    id: { mo: "/bln", d: "/hari" },
    vi: { mo: "/tháng", d: "/ngày" },
    sv: { mo: "/mån", d: "/dag" },
    pl: { mo: "/mies", d: "/dz" },
    uk: { mo: "/міс", d: "/дн" },
    cs: { mo: "/měs", d: "/den" },
  };
  const unitSet = UNIT[locale] ?? UNIT.en!;
  const unit = q.kind === "monthly" ? unitSet.mo : unitSet.d;

  return (
    <Link
      href={localePath(locale, "pricing")}
      prefetch={false}
      title={`${fmt(q.remaining)} / ${fmt(q.limit)} AI runs remaining`}
      className={cn("inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium tabular-nums transition-colors hover:brightness-95", tone)}
    >
      <Sparkles className="h-3 w-3" />
      {fmt(q.remaining)}/{fmt(q.limit)}<span className="opacity-60">{unit}</span>
    </Link>
  );
}
