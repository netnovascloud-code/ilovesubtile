"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Coins, Sparkles, Activity, BadgeCheck } from "lucide-react";
import { getDashboard } from "@/lib/i18n/account";
import { type Locale } from "@/lib/i18n/locales";

/** Count 0 → target (easeOut) once `run` flips true. Initial state is the
 *  target so SSR and the first client render match the final value (no
 *  hydration mismatch); the animation then replays from 0 when scrolled in. */
function useCountUp(target: number, run: boolean, ms = 1000): number {
  const [n, setN] = useState(target);
  useEffect(() => {
    if (!run) return;
    let raf = 0;
    const start = performance.now();
    setN(0);
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / ms);
      setN(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, run, ms]);
  return n;
}

/**
 * Animated KPI summary row for the dashboard. Receives only serialisable
 * primitives from the server view; resolves its own strings client-side.
 * Numbers render at their final value on the server, then count up when the
 * row scrolls into view.
 */
export function DashboardKpis({ locale, credits, aiUsed, aiLimit, aiKind, recentJobs, plan, planSubtitle }: {
  locale: Locale;
  credits: number;
  aiUsed: number;
  aiLimit: number;
  aiKind: "daily" | "monthly";
  recentJobs: number;
  plan: string;
  planSubtitle: string | null;
}) {
  const s = getDashboard(locale);
  const [shown, setShown] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((e) => {
      if (e.some((x) => x.isIntersecting)) { setShown(true); io.disconnect(); }
    }, { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const fmt = (n: number) => n.toLocaleString(locale);
  const credN = useCountUp(credits, shown);
  const usedN = useCountUp(aiUsed, shown);
  const jobsN = useCountUp(recentJobs, shown);
  const atLimit = aiUsed >= aiLimit;
  const usagePeriod = atLimit ? (aiKind === "daily" ? s.dailyLimitReached : s.monthlyLimitReached) : (aiKind === "monthly" ? s.periodMonthly : s.periodDaily);

  type Card = { icon: ReactNode; tone: string; label: string; value: string; sub: string; cap?: boolean; subClass?: string };
  const cards: Card[] = [
    { icon: <Coins className="h-5 w-5" />, tone: "bg-amber-50 text-amber-600", label: s.kpiCredits, value: fmt(credN), sub: "" },
    { icon: <Sparkles className="h-5 w-5" />, tone: "bg-brand-50 text-brand-600", label: s.aiUsage, value: `${fmt(usedN)} / ${fmt(aiLimit)}`, sub: usagePeriod, subClass: atLimit ? "text-amber-700" : undefined },
    { icon: <Activity className="h-5 w-5" />, tone: "bg-emerald-50 text-emerald-600", label: s.recentJobsCard, value: `${fmt(jobsN)}${recentJobs >= 20 ? "+" : ""}`, sub: s.upTo20 },
    { icon: <BadgeCheck className="h-5 w-5" />, tone: "bg-indigo-50 text-indigo-600", label: s.plan, value: plan, cap: true, sub: planSubtitle ?? (plan === "free" ? s.noActiveSub : "") },
  ];

  return (
    <div ref={ref} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((c, i) => (
        <div key={i} className="rounded-xl border border-ink-100 bg-white p-5 shadow-card transition-shadow hover:shadow-cardHover">
          <div className={`grid h-10 w-10 place-items-center rounded-lg ${c.tone}`}>{c.icon}</div>
          <div className="mt-3 text-[11px] font-medium uppercase tracking-wide text-ink-400">{c.label}</div>
          <div className={`mt-1 text-2xl font-semibold tabular-nums text-ink-900 ${c.cap ? "capitalize" : ""}`}>{c.value}</div>
          {c.sub ? <p className={`mt-0.5 truncate text-xs ${c.subClass ?? "text-ink-400"}`}>{c.sub}</p> : null}
        </div>
      ))}
    </div>
  );
}
