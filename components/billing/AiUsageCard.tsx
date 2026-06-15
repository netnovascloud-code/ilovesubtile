"use client";

import { Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useAiQuota } from "@/hooks/useAiQuota";

/**
 * AI-run consumption for the signed-in user, surfaced on /billing as a full
 * progress bar + reset date. Mirrors the realtime header pill (useAiQuota), so
 * it ticks down live after a run. Renders nothing while loading or for
 * anonymous/uncapped states — so there is no SSR-baked markup to
 * hydration-mismatch (the hook starts in `loading`, identical on server and the
 * first client render).
 */
export function AiUsageCard() {
  const q = useAiQuota();
  if (q.loading || q.remaining === Infinity || q.limit === 0) return null;

  const used = Math.min(q.used, q.limit);
  const pct = q.limit > 0 ? Math.min(100, Math.round((used / q.limit) * 100)) : 0;
  const bar = q.remaining === 0 ? "bg-red-500" : pct >= 80 ? "bg-amber-500" : "bg-brand-500";
  const period = q.kind === "monthly" ? "this month" : "today";
  const resets = q.kind === "monthly" && q.resetsAt
    ? `Resets on ${q.resetsAt.toLocaleDateString(undefined, { month: "short", day: "numeric" })}.`
    : "Resets 24h after your first run.";

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><Sparkles className="h-4 w-4 text-brand-500" /> AI usage</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap items-baseline justify-between gap-x-3 text-sm">
          <span className="text-ink-700">
            <span className="font-semibold text-ink-900">{q.used.toLocaleString()}</span> / {q.limit.toLocaleString()} AI runs used {period}
          </span>
          <span className="text-ink-500">{q.remaining.toLocaleString()} left</span>
        </div>
        <div
          className="mt-2 h-2 w-full overflow-hidden rounded-full bg-ink-100"
          role="progressbar" aria-valuenow={used} aria-valuemin={0} aria-valuemax={q.limit}
        >
          <div className={cn("h-full rounded-full transition-all", bar)} style={{ width: `${pct}%` }} />
        </div>
        <p className="mt-2 text-xs text-ink-400">{resets}</p>
      </CardContent>
    </Card>
  );
}
