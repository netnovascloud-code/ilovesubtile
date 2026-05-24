import type { Metadata } from "next";
import Link from "next/link";
import { getSupabaseServer } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Dashboard",
  robots: { index: false, follow: false },
};

export default async function DashboardPage() {
  let email: string | null = null;
  let plan = "free";
  let jobs: { id: string; tool: string; status: string; created_at: string }[] = [];

  try {
    const supabase = getSupabaseServer();
    const { data: userData } = await supabase.auth.getUser();
    email = userData.user?.email ?? null;
    if (userData.user) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("plan")
        .eq("id", userData.user.id)
        .maybeSingle();
      plan = (profile?.plan as string) ?? "free";

      const { data: jobsData } = await supabase
        .from("jobs")
        .select("id, tool, status, created_at")
        .eq("user_id", userData.user.id)
        .order("created_at", { ascending: false })
        .limit(10);
      jobs = jobsData ?? [];
    }
  } catch {
    // Supabase env not configured — render an empty shell so the page still works.
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
            <CardTitle>Daily usage</CardTitle>
            <CardDescription>Runs in the last 24 hours</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold text-ink-900">0 / 5</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total jobs</CardTitle>
            <CardDescription>All time</CardDescription>
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
            <form action="/api/billing/portal" method="POST" className="mt-3">
              <Button variant="outline" size="sm" type="submit">
                Manage billing
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Recent jobs</CardTitle>
          <CardDescription>Last 10 files you processed.</CardDescription>
        </CardHeader>
        <CardContent>
          {jobs.length === 0 ? (
            <p className="text-sm text-ink-500">No jobs yet. Try a tool to see them here.</p>
          ) : (
            <ul className="divide-y divide-ink-100 text-sm">
              {jobs.map((j) => (
                <li key={j.id} className="flex items-center justify-between py-3">
                  <div>
                    <div className="font-medium text-ink-900">{j.tool}</div>
                    <div className="text-xs text-ink-400">{new Date(j.created_at).toLocaleString()}</div>
                  </div>
                  <Badge className="bg-ink-100 text-ink-700">{j.status}</Badge>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
