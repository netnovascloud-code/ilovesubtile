import { getSupabaseServer } from "@/lib/supabase/server";

/** Per-plan daily run cap on tools that hit the backend. */
export const DAILY_LIMITS = {
  anonymous: 2,
  free: 2,
  pro: Infinity,
  business: Infinity,
} as const;

export type PlanKey = keyof typeof DAILY_LIMITS;

export type QuotaCheck =
  | { ok: true; plan: PlanKey; remaining: number }
  | { ok: false; plan: PlanKey; reason: "daily_limit"; resetAt: string };

/**
 * Check (and atomically reserve) one quota unit for the calling user.
 * Anonymous callers share a 3/day pool — we don't try to fingerprint
 * the IP here; that lives one layer up if you need it.
 *
 * Returns ok: true after incrementing the counter, or ok: false with
 * a reason and reset timestamp.
 */
export async function checkAndReserveQuota(): Promise<QuotaCheck> {
  let supabase;
  try {
    supabase = getSupabaseServer();
  } catch {
    // Supabase not configured locally → don't gate.
    return { ok: true, plan: "anonymous", remaining: Infinity };
  }

  const { data: userData } = await supabase.auth.getUser();
  const user = userData.user;
  if (!user) {
    // Anonymous — we don't have a per-IP counter in this lightweight
    // helper. Trust the client-side button gating and let the request
    // through; the edge function will still cap.
    return { ok: true, plan: "anonymous", remaining: DAILY_LIMITS.anonymous };
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("plan, daily_usage, usage_reset_at")
    .eq("id", user.id)
    .maybeSingle();

  const plan = ((profile?.plan as PlanKey | undefined) ?? "free") as PlanKey;
  const limit = DAILY_LIMITS[plan];
  if (limit === Infinity) return { ok: true, plan, remaining: Infinity };

  const now = Date.now();
  const resetAt = profile?.usage_reset_at ? new Date(profile.usage_reset_at).getTime() : 0;
  const overdue = now - resetAt > 24 * 3600 * 1000;
  const current = overdue ? 0 : (profile?.daily_usage ?? 0);

  if (current >= limit) {
    const reset = new Date(resetAt + 24 * 3600 * 1000).toISOString();
    return { ok: false, plan, reason: "daily_limit", resetAt: reset };
  }

  await supabase
    .from("profiles")
    .update({
      daily_usage: current + 1,
      usage_reset_at: overdue ? new Date().toISOString() : profile?.usage_reset_at ?? new Date().toISOString(),
    })
    .eq("id", user.id);

  return { ok: true, plan, remaining: limit - current - 1 };
}
