import type { Metadata } from "next";
import Link from "next/link";
import { getSupabaseServer } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BillingPortalButton } from "@/components/billing/BillingPortalButton";
import { ApiKeysCard } from "@/components/billing/ApiKeysCard";
import { BuyCreditsCard } from "@/components/billing/BuyCreditsCard";
import { DAILY_LIMITS, type PlanKey } from "@/lib/quotas";

export const metadata: Metadata = {
  title: "Dashboard",
  robots: { index: false, follow: false },
};

export default async function DashboardPage() {
  let email: string | null = null;
  let plan: PlanKey = "free";
  let credits = 0;
  let dailyUsage = 0;
  let usageResetAt: string | null = null;
  let jobs: { id: string; tool: string; status: string; created_at: string; output_file_url: string | null }[] = [];

  try {
    const supabase = getSupabaseServer();
    const { data: userData } = await supabase.auth.getUser();
    email = userData.user?.email ?? null;
    if (userData.user) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("plan, daily_usage, usage_reset_at, credits, monthly_credits, monthly_credits_month")
        .eq("id", userData.user.id)
        .maybeSingle();
      plan = ((profile?.plan as PlanKey | undefined) ?? "free") as PlanKey;
      dailyUsage = profile?.daily_usage ?? 0;
      usageResetAt = profile?.usage_reset_at ?? null;
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
    // Supabase env not configured — render an empty shell so the page still works.
  }

  // Reset the displayed counter if the 24h window has expired.
  const resetMs = usageResetAt ? new Date(usageResetAt).getTime() : 0;
  const overdue = Date.now() - resetMs > 24 * 3600 * 1000;
  const displayedUsage = overdue ? 0 : dailyUsage;
  const limit = DAILY_LIMITS[plan];
  const limitLabel = limit === Infinity ? "∞" : String(limit);

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
            <CardTitle>Daily usage</CardTitle>
            <CardDescription>Runs in the last 24 hours</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold text-ink-900">
              {displayedUsage} / {limitLabel}
            </div>
            {limit !== Infinity && displayedUsage >= limit && (
              <p className="mt-2 text-xs text-amber-700">
                Daily limit reached. Resets every 24h.
              </p>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total jobs</CardTitle>
            <CardDescription>Last 20 shown</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold text-ink-900">{jobs.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Plan</CardTitle>
            <CardDescription>Manage your subscription</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm capitalize text-ink-700">{plan}</p>
            <div className="mt-3">
              <BillingPortalButton disabled={plan === "free"} />
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
                  {j.output_file_url && j.status === "done" && (
                    <a
                      href={j.output_file_url}
                      className="text-xs font-medium text-brand-600 hover:underline"
                    >
                      Download
                    </a>
                  )}
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
