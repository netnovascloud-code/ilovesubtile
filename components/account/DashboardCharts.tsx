"use client";

import { useEffect, useRef, useState } from "react";
import { BarChart3 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getSupabaseBrowser } from "@/lib/supabase/client";
import { getDashboard } from "@/lib/i18n/account";
import { type Locale } from "@/lib/i18n/locales";

type Job = { tool: string; status: string; created_at: string };
type Tx = { balance_after: number; created_at: string };

type Stats = {
  total: number;
  perDay: { label: string; count: number }[];
  done: number;
  errors: number;
  topTools: { tool: string; count: number }[];
  credits: number[];
};

/** Count from 0 → target with an easeOut curve once `run` flips true. */
function useCountUp(target: number, run: boolean, ms = 900): number {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!run) return;
    let raf = 0;
    const start = performance.now();
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
 * Animated usage analytics for the signed-in user, built from real `jobs` and
 * `credit_transactions` rows (RLS restricts to the caller's own). Self-contained
 * client fetch; renders nothing until the data resolves (no SSR-baked markup →
 * no hydration mismatch). Pure SVG/CSS, sober animations.
 */
export function DashboardCharts({ locale }: { locale: Locale }) {
  const s = getDashboard(locale);
  const [stats, setStats] = useState<Stats | null>(null);
  const [shown, setShown] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const sb = getSupabaseBrowser();
        const { data: u } = await sb.auth.getUser();
        if (!u.user) { if (!cancelled) setStats(null); return; }
        const since = new Date(Date.now() - 90 * 86400000).toISOString();
        const [{ data: jobsData }, { data: txData }] = await Promise.all([
          sb.from("jobs").select("tool, status, created_at").eq("user_id", u.user.id).gte("created_at", since).order("created_at", { ascending: true }).limit(2000),
          sb.from("credit_transactions").select("balance_after, created_at").eq("user_id", u.user.id).gte("created_at", since).order("created_at", { ascending: true }).limit(400),
        ]);
        if (cancelled) return;
        const jobs = (jobsData as Job[] | null) ?? [];
        const tx = (txData as Tx[] | null) ?? [];

        // Conversions per day for the last 14 days.
        const days: { label: string; count: number }[] = [];
        const byDay = new Map<string, number>();
        for (const j of jobs) byDay.set(j.created_at.slice(0, 10), (byDay.get(j.created_at.slice(0, 10)) ?? 0) + 1);
        for (let i = 13; i >= 0; i--) {
          const d = new Date(Date.now() - i * 86400000);
          const key = d.toISOString().slice(0, 10);
          days.push({ label: d.toLocaleDateString(locale, { day: "2-digit", month: "short" }), count: byDay.get(key) ?? 0 });
        }

        const done = jobs.filter((j) => j.status === "done").length;
        const errs = jobs.filter((j) => j.status === "error").length;

        const toolCount = new Map<string, number>();
        for (const j of jobs) toolCount.set(j.tool, (toolCount.get(j.tool) ?? 0) + 1);
        const topTools = [...toolCount.entries()].map(([tool, count]) => ({ tool, count })).sort((a, b) => b.count - a.count).slice(0, 6);

        setStats({ total: jobs.length, perDay: days, done, errors: errs, topTools, credits: tx.map((t) => t.balance_after).slice(-24) });
      } catch { if (!cancelled) setStats({ total: 0, perDay: [], done: 0, errors: 0, topTools: [], credits: [] }); }
    })();
    return () => { cancelled = true; };
  }, [locale]);

  // Trigger the grow/draw animations once the section scrolls into view.
  useEffect(() => {
    if (!stats || !ref.current) return;
    const el = ref.current;
    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) { setShown(true); io.disconnect(); }
    }, { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, [stats]);

  const totalCount = useCountUp(stats?.total ?? 0, shown);
  const successData = stats ? stats.done + stats.errors : 0;
  const successPct = successData > 0 ? Math.round((stats!.done / successData) * 100) : 0;
  const pctCount = useCountUp(successPct, shown);

  if (!stats) return null;
  if (stats.total === 0 && stats.credits.length === 0) {
    return (
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><BarChart3 className="h-4 w-4 text-brand-500" /> {s.statsTitle}</CardTitle>
        </CardHeader>
        <CardContent><p className="text-sm text-ink-500">{s.noData}</p></CardContent>
      </Card>
    );
  }

  const maxDay = Math.max(1, ...stats.perDay.map((d) => d.count));
  const maxTool = Math.max(1, ...stats.topTools.map((t) => t.count));
  const R = 42, C = 2 * Math.PI * R;

  return (
    <div ref={ref} className="mt-8 space-y-6">
      <div className="flex items-baseline gap-3">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-ink-900"><BarChart3 className="h-4 w-4 text-brand-500" /> {s.statsTitle}</h2>
        <span className="text-sm text-ink-400">{totalCount.toLocaleString(locale)} {s.totalConversions.toLowerCase()}</span>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Conversions over time — animated bars */}
        <Card>
          <CardHeader><CardTitle className="text-sm font-medium text-ink-700">{s.convOverTime}</CardTitle></CardHeader>
          <CardContent>
            <div className="flex h-32 items-end gap-1">
              {stats.perDay.map((d, i) => (
                <div key={i} className="group flex flex-1 flex-col items-center justify-end" title={`${d.label}: ${d.count}`}>
                  <div
                    className="w-full rounded-t bg-brand-400 transition-[height] duration-700 ease-out group-hover:bg-brand-500"
                    style={{ height: shown ? `${Math.round((d.count / maxDay) * 100)}%` : "0%", minHeight: d.count > 0 ? 2 : 0 }}
                  />
                </div>
              ))}
            </div>
            <div className="mt-2 flex justify-between text-[10px] text-ink-400">
              <span>{stats.perDay[0]?.label}</span>
              <span>{stats.perDay[stats.perDay.length - 1]?.label}</span>
            </div>
          </CardContent>
        </Card>

        {/* Success rate — animated donut */}
        <Card>
          <CardHeader><CardTitle className="text-sm font-medium text-ink-700">{s.successRate}</CardTitle></CardHeader>
          <CardContent>
            <div className="flex items-center gap-5">
              <svg viewBox="0 0 100 100" className="h-28 w-28 -rotate-90">
                <circle cx="50" cy="50" r={R} fill="none" stroke="#f1f5f9" strokeWidth="10" />
                <circle
                  cx="50" cy="50" r={R} fill="none" stroke="#10b981" strokeWidth="10" strokeLinecap="round"
                  strokeDasharray={C} strokeDashoffset={shown ? C * (1 - (successData > 0 ? stats.done / successData : 0)) : C}
                  style={{ transition: "stroke-dashoffset 900ms ease-out" }}
                />
              </svg>
              <div>
                <div className="text-3xl font-semibold text-ink-900 tabular-nums">{pctCount}%</div>
                <p className="mt-1 text-xs text-emerald-600">{stats.done.toLocaleString(locale)} {s.successful}</p>
                <p className="text-xs text-red-500">{stats.errors.toLocaleString(locale)} {s.errors}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Top tools — horizontal animated bars */}
        <Card>
          <CardHeader><CardTitle className="text-sm font-medium text-ink-700">{s.topTools}</CardTitle></CardHeader>
          <CardContent>
            <ul className="space-y-2.5">
              {stats.topTools.map((t) => (
                <li key={t.tool} className="text-xs">
                  <div className="mb-1 flex justify-between text-ink-600"><span className="truncate">{t.tool}</span><span className="tabular-nums text-ink-400">{t.count.toLocaleString(locale)}</span></div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-ink-100">
                    <div className="h-full rounded-full bg-brand-400 transition-[width] duration-700 ease-out" style={{ width: shown ? `${Math.round((t.count / maxTool) * 100)}%` : "0%" }} />
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Credit balance over time — animated line */}
        <Card>
          <CardHeader><CardTitle className="text-sm font-medium text-ink-700">{s.creditsOverTime}</CardTitle></CardHeader>
          <CardContent>
            {stats.credits.length < 2 ? (
              <p className="flex h-32 items-center justify-center text-sm text-ink-400">—</p>
            ) : (() => {
              const w = 300, h = 110, pad = 6;
              const max = Math.max(...stats.credits), min = Math.min(...stats.credits);
              const span = max - min || 1;
              const pts = stats.credits.map((v, i) => {
                const x = pad + (i / (stats.credits.length - 1)) * (w - 2 * pad);
                const y = pad + (1 - (v - min) / span) * (h - 2 * pad);
                return `${x.toFixed(1)},${y.toFixed(1)}`;
              }).join(" ");
              return (
                <svg viewBox={`0 0 ${w} ${h}`} className="h-32 w-full">
                  <polyline
                    points={pts} fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    style={{ strokeDasharray: 1000, strokeDashoffset: shown ? 0 : 1000, transition: "stroke-dashoffset 1100ms ease-out" }}
                  />
                </svg>
              );
            })()}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
