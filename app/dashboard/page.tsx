import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Dashboard",
  robots: { index: false, follow: false },
};

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
 *  expired. We decode the token expiry when possible; otherwise we fall back to
 *  the documented 1-hour TTL measured from creation. This stops the dashboard
 *  from showing dead Download buttons days after the link expired. */
function isDownloadLive(j: JobRow): boolean {
  if (!j.output_file_url || j.status !== "done") return false;
  const exp = signedUrlExpiryMs(j.output_file_url);
  if (exp != null) return exp > Date.now();
  return Date.now() - new Date(j.created_at).getTime() < 60 * 60 * 1000;
}

export default async function DashboardPage() {
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
  // When Supabase is configured but the visitor has no valid session (e.g. a
  // stale `sb-*-auth-token` cookie that satisfied the presence-only middleware
  // gate but no longer resolves to a user), send them to login instead of
  // rendering the confusing "Configure Supabase" empty shell. redirect() must
  // run outside the try/catch — it throws a control-flow signal the catch
  // would otherwise swallow.
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
      // Effective balance = permanent credits + this month's Business grant.
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
    // Supabase env not configured (local dev without keys) — render an empty
    // shell so the page still works. In production env is always present, so
    // this branch never strands a real visitor.
  }

  if (needsLogin) redirect("/login?redirect=/dashboard");

  // AI quota: free is a rolling 24h counter, Pro/Business are monthly (UTC).
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
  const limitLabel = String(limit);
  const periodLabel = kind === "daily" ? "Runs in the last 24 hours" : "AI conversions this month";
  const atLimit = displayedUsage >= limit;

  // Subscription line for the Plan card. Lemon Squeezy keeps a cancelled
  // subscription active until the paid period ends (ls_renews_at holds that
  // date), so we surface "Cancels on" vs "Renews on" accordingly.
  const renewLabel = renewsAt
    ? new Date(renewsAt).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" })
    : null;
  let planSubtitle: string | null = null;
  if (plan !== "free" && renewLabel) {
    if (subStatus === "cancelled") planSubtitle = `Cancels on ${renewLabel} — access until then`;
    else if (subStatus === "past_due" || subStatus === "unpaid") planSubtitle = `Payment overdue — please update billing`;
    else planSubtitle = `Renews on ${renewLabel}`;
  }

  return (
    <div className="container py-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-ink-900">Dashboard</h1>
          {email ? (
            <p className="mt-1 text-sm text-ink-500">Signed in as {email}</p>
          ) : (
            <p className="mt-1 text-sm text-ink-500">
              You&apos;re viewing the empty state. Configure Supabase to enable real data.
            </p>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Badge className="bg-brand-50 text-brand-700">{plan.toUpperCase()}</Badge>
          {plan === "free" && (
            <Link href="/pricing">
              <Button size="sm">Upgrade</Button>
            </Link>
          )}
        </div>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>AI usage</CardTitle>
            <CardDescription>{periodLabel}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold text-ink-900">
              {displayedUsage} / {limitLabel}
            </div>
            <p className="mt-1 text-xs text-ink-400">
              used · {Math.max(0, limit - displayedUsage).toLocaleString()} left
            </p>
            {atLimit && (
              <p className="mt-2 text-xs text-amber-700">
                {kind === "daily" ? "Daily limit reached. Resets every 24h." : "Monthly quota reached. Resets on the 1st."}
              </p>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent jobs</CardTitle>
            <CardDescription>Up to 20 shown</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold text-ink-900">
              {jobs.length}{jobs.length === 20 ? "+" : ""}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Plan</CardTitle>
            <CardDescription>Manage your subscription</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold capitalize text-ink-900">{plan}</p>
            {planSubtitle ? (
              <p className="mt-1 text-xs text-ink-500">{planSubtitle}</p>
            ) : plan === "free" ? (
              <p className="mt-1 text-xs text-ink-400">No active subscription</p>
            ) : null}
            <p className="mt-2 text-xs text-ink-500">
              Credit balance: <span className="font-medium text-ink-900">{credits.toLocaleString()}</span>
            </p>
            <div className="mt-3">
              {/* Full billing management (cancel, change card, invoices) lives
                  on /billing, which opens the Lemon Squeezy portal. */}
              <Link href="/billing"><Button variant="outline" size="sm">Manage billing</Button></Link>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Recent jobs</CardTitle>
          <CardDescription>Last 20 files you processed. Download links expire after 1 hour.</CardDescription>
        </CardHeader>
        <CardContent>
          {jobs.length === 0 ? (
            <p className="text-sm text-ink-500">No jobs yet. Try a tool to see them here.</p>
          ) : (
            <ul className="divide-y divide-ink-100 text-sm">
              {jobs.map((j) => (
                <li key={j.id} className="flex items-center justify-between gap-3 py-3">
                  <div className="min-w-0 flex-1">
                    <div className="font-medium text-ink-900">{j.tool}</div>
                    <div className="text-xs text-ink-400">{new Date(j.created_at).toLocaleString()}</div>
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
                    <a
                      href={j.output_file_url!}
                      className="text-xs font-medium text-brand-600 hover:underline"
                    >
                      Download
                    </a>
                  ) : j.output_file_url && j.status === "done" ? (
                    <span className="text-xs text-ink-400" title="Download links expire after 1 hour">
                      Link expired
                    </span>
                  ) : null}
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>

      <div className="mt-8">
        <ApiKeysCard plan={plan} credits={credits} />
      </div>

      <div className="mt-8">
        <BuyCreditsCard />
      </div>
    </div>
  );
}
