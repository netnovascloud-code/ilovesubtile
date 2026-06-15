"use client";

import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { getSupabaseBrowser } from "@/lib/supabase/client";
import { planLimit, type Plan } from "@/lib/ai-quotas";
import { getBilling } from "@/lib/i18n/account";
import { type Locale } from "@/lib/i18n/locales";

type Usage = { kind: "daily" | "monthly"; used: number; limit: number; remaining: number; resetsAt: Date | null };

function utcMonth(): string {
  const d = new Date();
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}`;
}

/**
 * AI-run consumption for the signed-in user, surfaced on /billing as a progress
 * bar + reset date. Self-contained one-shot fetch — deliberately NOT the
 * realtime useAiQuota hook: the header already mounts useAiQuota, and a second
 * instance opens a duplicate realtime channel (`profile_quota:<id>`) on the
 * shared browser client, which throws. Renders nothing until the fetch
 * resolves, so there's no SSR-baked markup to hydration-mismatch.
 */
export function AiUsageCard({ locale = "en" }: { locale?: Locale }) {
  const s = getBilling(locale);
  const [u, setU] = useState<Usage | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const sb = getSupabaseBrowser();
        const { data: au } = await sb.auth.getUser();
        if (!au.user) { if (!cancelled) setU(null); return; }
        const { data } = await sb
          .from("profiles")
          .select("plan, daily_usage, monthly_ai_usage, monthly_ai_month")
          .eq("id", au.user.id)
          .maybeSingle();
        if (cancelled) return;
        const plan = (data?.plan as Plan) ?? "free";
        const { kind, limit } = planLimit(plan);
        if (limit <= 0) { setU(null); return; }
        let used = 0;
        let resetsAt: Date | null = null;
        if (kind === "daily") {
          used = data?.daily_usage ?? 0;
          const r = new Date(); r.setHours(r.getHours() + 24); resetsAt = r;
        } else {
          used = data?.monthly_ai_month === utcMonth() ? (data?.monthly_ai_usage ?? 0) : 0;
          const n = new Date(); n.setUTCDate(1); n.setUTCHours(0, 0, 0, 0); n.setUTCMonth(n.getUTCMonth() + 1); resetsAt = n;
        }
        setU({ kind, used, limit, remaining: Math.max(0, limit - used), resetsAt });
      } catch { if (!cancelled) setU(null); }
    })();
    return () => { cancelled = true; };
  }, []);

  if (!u) return null;

  const shown = Math.min(u.used, u.limit);
  const pct = u.limit > 0 ? Math.min(100, Math.round((shown / u.limit) * 100)) : 0;
  const bar = u.remaining === 0 ? "bg-red-500" : pct >= 80 ? "bg-amber-500" : "bg-brand-500";
  const usedLabel = u.kind === "monthly" ? s.runsThisMonth : s.runsToday;
  const resets = u.kind === "monthly" && u.resetsAt
    ? s.resetsOn(u.resetsAt.toLocaleDateString(locale, { month: "short", day: "numeric" }))
    : s.resets24h;

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><Sparkles className="h-4 w-4 text-brand-500" /> {s.aiUsage}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap items-baseline justify-between gap-x-3 text-sm">
          <span className="text-ink-700">
            <span className="font-semibold text-ink-900">{u.used.toLocaleString(locale)}</span> / {u.limit.toLocaleString(locale)} {usedLabel}
          </span>
          <span className="text-ink-500">{s.left(u.remaining.toLocaleString(locale))}</span>
        </div>
        <div
          className="mt-2 h-2 w-full overflow-hidden rounded-full bg-ink-100"
          role="progressbar" aria-valuenow={shown} aria-valuemin={0} aria-valuemax={u.limit}
        >
          <div className={cn("h-full rounded-full transition-all", bar)} style={{ width: `${pct}%` }} />
        </div>
        <p className="mt-2 text-xs text-ink-400">{resets}</p>
      </CardContent>
    </Card>
  );
}
