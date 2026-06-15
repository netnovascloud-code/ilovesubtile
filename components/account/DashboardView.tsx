import Link from "next/link";
import { redirect } from "next/navigation";
import { getSupabaseServer } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ApiKeysCard } from "@/components/billing/ApiKeysCard";
import { BuyCreditsCard } from "@/components/billing/BuyCreditsCard";
import { type PlanKey } from "@/lib/quotas";
import { planLimit, type Plan } from "@/lib/ai-quotas";
import { getDashboard } from "@/lib/i18n/account";
import { localePath, type Locale } from "@/lib/i18n/locales";

type JobRow = { id: string; tool: string; status: string; created_at: string; output_file_url: string | null };

/** Supabase signed URLs carry a JWT in `?token=`; its `exp` claim is the exact
 *  expiry. Returns the expiry in ms, or null if it can't be read. */
function signedUrlExpiryMs(url: string): number | null {
  try {
    const token = new URL(url).searchParams.get("token");
    if (!token) return null;
    const payload = JSON.parse(Buffer.from(token.split(".")[1], "base64url").toString("utf8"));
    return typeof payload.exp === "number" ? payload.exp * 1000 : null;
  } catch {
    return null;
  }
}

/** A Download link is live only if the job succeeded and its signed URL hasn't
 *  expired. */
function isDownloadLive(j: JobRow): boolean {
  if (!j.output_file_url || j.status !== "done") return false;
  const exp = signedUrlExpiryMs(j.output_file_url);
  if (exp != null) return exp > Date.now();
  return Date.now() - new Date(j.created_at).getTime() < 60 * 60 * 1000;
}

/**
 * Shared body of the Dashboard, rendered by both /dashboard (locale="en") and
 * /[locale]/dashboard. Auth-gated and per-request — see the page wrappers for
 * force-dynamic. Strings from getDashboard(locale) (EN base + FR, EN fallback).
 */
export async function DashboardView({ locale }: { locale: Locale }) {
  const s = getDashboard(locale);

  let email: string | null = null;
  let plan: PlanKey = "free";
  let credits = 0;
  let dailyUsage = 0;
  let usageResetAt: string | null = null;
  let monthlyAiUsage = 0;
  let monthlyAiMonth: string | null = null;
  let subStatus: string | null = null;
  let renewsAt: string | null = null;
  let jobs: JobRow[] = [];
  let needsLogin = false;

  try {
    const supabase = getSupabaseServer();
    const { data: userData } = await supabase.auth.getUser();
    email = userData.user?.email ?? null;
    if (!userData.user) {
      needsLogin = true;
    } else {
      const { data: profile } = await supabase
        .from("profiles")
        .select("plan, daily_usage, usage_reset_at, credits, monthly_credits, monthly_credits_month, monthly_ai_usage, monthly_ai_month, ls_subscription_status, ls_renews_at")
        .eq("id", userData.user.id)
        .maybeSingle();
      plan = ((profile?.plan as PlanKey | undefined) ?? "free") as PlanKey;
      dailyUsage = profile?.daily_usage ?? 0;
      usageResetAt = profile?.usage_reset_at ?? null;
      monthlyAiUsage = profile?.monthly_ai_usage ?? 0;
      monthlyAiMonth = profile?.monthly_ai_month ?? null;
      subStatus = (profile?.ls_subscription_status as string | null) ?? null;
      renewsAt = (profile?.ls_renews_at as string | null) ?? null;
      const thisMonth = new Date().toISOString().slice(0, 7);
      const monthly = profile?.monthly_credits_month === thisMonth ? (profile?.monthly_credits ?? 0) : 0;
      credits = (profile?.credits ?? 0) + monthly;

      const { data: jobsData } = await supabase
        .from("jobs")
        .select("id, tool, status, created_at, output_file_url")
        .eq("user_id", userData.user.id)
        .order("created_at", { ascending: false })
        .limit(20);
      jobs = jobsData ?? [];
    }
  } catch {
    // Supabase env not configured (local dev) — render the empty shell.
  }

  if (needsLogin) redirect(`/login?redirect=${encodeURIComponent(localePath(locale, "dashboard"))}`);

  const { kind, limit } = planLimit(plan as Plan);
  let displayedUsage: number;
  if (kind === "daily") {
    const resetMs = usageResetAt ? new Date(usageResetAt).getTime() : 0;
    const overdue = Date.now() - resetMs > 24 * 3600 * 1000;
    displayedUsage = overdue ? 0 : dailyUsage;
  } else {
    const thisMonth = new Date().toISOString().slice(0, 7);
    displayedUsage = monthlyAiMonth === thisMonth ? monthlyAiUsage : 0;
  }
  const periodLabel = kind === "daily" ? s.periodDaily : s.periodMonthly;
  const atLimit = displayedUsage >= limit;

  const renewLabel = renewsAt
    ? new Date(renewsAt).toLocaleDateString(locale, { year: "numeric", month: "short", day: "numeric" })
    : null;
  let planSubtitle: string | null = null;
  if (plan !== "free" && renewLabel) {
    if (subStatus === "cancelled") planSubtitle = s.cancelsOn(renewLabel);
    else if (subStatus === "past_due" || subStatus === "unpaid") planSubtitle = s.paymentOverdue;
    else planSubtitle = s.renewsOn(renewLabel);
  }

  return (
    <div className="container py-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-ink-900">{s.title}</h1>
          {email ? (
            <p className="mt-1 text-sm text-ink-500">{s.signedInAs(email)}</p>
          ) : (
            <p className="mt-1 text-sm text-ink-500">{s.emptyState}</p>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Badge className="bg-brand-50 text-brand-700">{plan.toUpperCase()}</Badge>
          {plan === "free" && (
            <Link href={localePath(locale, "pricing")}>
              <Button size="sm">{s.upgrade}</Button>
            </Link>
          )}
        </div>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>{s.aiUsage}</CardTitle>
            <CardDescription>{periodLabel}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold text-ink-900">
              {displayedUsage.toLocaleString(locale)} / {limit.toLocaleString(locale)}
            </div>
            <p className="mt-1 text-xs text-ink-400">{s.usedLeft(Math.max(0, limit - displayedUsage).toLocaleString(locale))}</p>
            {atLimit && (
              <p className="mt-2 text-xs text-amber-700">
                {kind === "daily" ? s.dailyLimitReached : s.monthlyLimitReached}
              </p>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{s.recentJobsCard}</CardTitle>
            <CardDescription>{s.upTo20}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold text-ink-900">
              {jobs.length}{jobs.length === 20 ? "+" : ""}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{s.plan}</CardTitle>
            <CardDescription>{s.manageSubscription}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold capitalize text-ink-900">{plan}</p>
            {planSubtitle ? (
              <p className="mt-1 text-xs text-ink-500">{planSubtitle}</p>
            ) : plan === "free" ? (
              <p className="mt-1 text-xs text-ink-400">{s.noActiveSub}</p>
            ) : null}
            <p className="mt-2 text-xs text-ink-500">
              {s.creditBalance} <span className="font-medium text-ink-900">{credits.toLocaleString(locale)}</span>
            </p>
            <div className="mt-3">
              <Link href={localePath(locale, "billing")}><Button variant="outline" size="sm">{s.manageBilling}</Button></Link>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>{s.recentJobsCard}</CardTitle>
          <CardDescription>{s.recentJobsDesc}</CardDescription>
        </CardHeader>
        <CardContent>
          {jobs.length === 0 ? (
            <p className="text-sm text-ink-500">{s.noJobs}</p>
          ) : (
            <ul className="divide-y divide-ink-100 text-sm">
              {jobs.map((j) => (
                <li key={j.id} className="flex items-center justify-between gap-3 py-3">
                  <div className="min-w-0 flex-1">
                    <div className="font-medium text-ink-900">{j.tool}</div>
                    <div className="text-xs text-ink-400">{new Date(j.created_at).toLocaleString(locale)}</div>
                  </div>
                  <Badge
                    className={
                      j.status === "done"
                        ? "bg-green-50 text-green-700"
                        : j.status === "error"
                          ? "bg-red-50 text-red-700"
                          : "bg-ink-100 text-ink-700"
                    }
                  >
                    {j.status}
                  </Badge>
                  {isDownloadLive(j) ? (
                    <a href={j.output_file_url!} className="text-xs font-medium text-brand-600 hover:underline">
                      {s.download}
                    </a>
                  ) : j.output_file_url && j.status === "done" ? (
                    <span className="text-xs text-ink-400">{s.linkExpired}</span>
                  ) : null}
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>

      <div className="mt-8">
        <ApiKeysCard plan={plan} credits={credits} locale={locale} />
      </div>

      <div className="mt-8">
        <BuyCreditsCard locale={locale} />
      </div>
    </div>
  );
}
