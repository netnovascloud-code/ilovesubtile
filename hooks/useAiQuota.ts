"use client";

import { useCallback, useEffect, useState } from "react";
import { getSupabaseBrowser } from "@/lib/supabase/client";
import { useUser } from "@/hooks/useUser";
import { planLimit, type Plan } from "@/lib/ai-quotas";

export type AiQuotaState = {
  plan: Plan;
  kind: "daily" | "monthly";
  limit: number;
  used: number;
  remaining: number;
  resetsAt: Date | null;
  loading: boolean;
};

function utcMonth(): string {
  const d = new Date();
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}`;
}

/**
 * Live AI quota for the signed-in user. Calls the ai_quota_state() RPC on
 * mount, then subscribes to realtime UPDATEs on the user's profiles row so
 * the meter ticks down right after a run lands (the edge function writes the
 * new daily_usage / monthly_ai_usage). Returns an `Infinity`-remaining
 * placeholder for anonymous users so callers don't gate them on this state.
 */
export function useAiQuota(): AiQuotaState & { refresh: () => Promise<void> } {
  const { user, plan, loading: userLoading } = useUser();
  const [state, setState] = useState<AiQuotaState>({
    plan: "free", kind: "daily", limit: 2, used: 0, remaining: 2, resetsAt: null, loading: true,
  });

  const compute = useCallback(
    (row: { daily_usage?: number; monthly_ai_usage?: number; monthly_ai_month?: string | null }) => {
      const { kind, limit } = planLimit(plan as Plan);
      let used = 0;
      let resetsAt: Date | null = null;
      if (kind === "daily") {
        used = row.daily_usage ?? 0;
        const r = new Date(); r.setHours(r.getHours() + 24);
        resetsAt = r;
      } else {
        const sameMonth = row.monthly_ai_month === utcMonth();
        used = sameMonth ? (row.monthly_ai_usage ?? 0) : 0;
        const next = new Date();
        next.setUTCDate(1); next.setUTCHours(0, 0, 0, 0);
        next.setUTCMonth(next.getUTCMonth() + 1);
        resetsAt = next;
      }
      return { plan: plan as Plan, kind, limit, used, remaining: Math.max(0, limit - used), resetsAt, loading: false };
    },
    [plan],
  );

  const refresh = useCallback(async () => {
    if (!user) return;
    try {
      const sb = getSupabaseBrowser();
      const { data } = await sb
        .from("profiles")
        .select("daily_usage, monthly_ai_usage, monthly_ai_month")
        .eq("id", user.id)
        .maybeSingle();
      setState(compute(data ?? {}));
    } catch { /* keep current state */ }
  }, [user, compute]);

  useEffect(() => {
    if (userLoading) return;
    if (!user) {
      // Anonymous — surface a benign infinity state so the meter component
      // doesn't render and the run button isn't gated by this hook.
      setState({ plan: "free", kind: "daily", limit: 0, used: 0, remaining: Infinity, resetsAt: null, loading: false });
      return;
    }
    let cancelled = false;
    let sb: ReturnType<typeof getSupabaseBrowser>;
    try { sb = getSupabaseBrowser(); } catch { return; }

    (async () => {
      const { data } = await sb
        .from("profiles")
        .select("daily_usage, monthly_ai_usage, monthly_ai_month")
        .eq("id", user.id)
        .maybeSingle();
      if (cancelled) return;
      setState(compute(data ?? {}));
    })();

    // Realtime: every edge-function run UPDATEs profiles → the meter ticks
    // down within ~100ms without a manual refresh.
    const ch = sb
      .channel(`profile_quota:${user.id}`)
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "profiles", filter: `id=eq.${user.id}` },
        (payload) => { if (!cancelled) setState(compute((payload.new as Record<string, unknown>) ?? {})); },
      )
      .subscribe();

    return () => { cancelled = true; sb.removeChannel(ch); };
  }, [user, userLoading, compute]);

  return { ...state, refresh };
}
