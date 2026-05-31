// Single source of truth for the per-plan AI run quotas (mirrors the
// ai-process edge function — Part 6). Free is a rolling 24-hour bucket; Pro
// and Business are monthly (UTC calendar month).
export type Plan = "free" | "pro" | "business";

export const DAILY_LIMIT: Record<Plan, number> = { free: 2, pro: 0, business: 0 };
export const MONTHLY_LIMIT: Record<Plan, number> = { free: 0, pro: 500, business: 3000 };

export function planLimit(plan: Plan): { kind: "daily" | "monthly"; limit: number } {
  return plan === "free"
    ? { kind: "daily", limit: DAILY_LIMIT.free }
    : { kind: "monthly", limit: MONTHLY_LIMIT[plan] };
}
