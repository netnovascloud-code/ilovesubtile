import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getSupabaseServer } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BillingPortalButton } from "@/components/billing/BillingPortalButton";
import { BuyCreditsCard } from "@/components/billing/BuyCreditsCard";
import { ReceiptText, ShieldCheck, ArrowLeft, CheckCircle2 } from "lucide-react";
import { PLANS, type PlanKey } from "@/lib/plans";
import { BUSINESS_MONTHLY_CREDITS } from "@/lib/credits";

type AccountPlan = "free" | PlanKey;

export const metadata: Metadata = {
  title: "Billing",
  robots: { index: false, follow: false },
};

// Auth/cookie-driven page — must render per request (the top-level redirect()
// + cookie read otherwise tripped a 503 on the RSC navigation fetch).
export const dynamic = "force-dynamic";

/**
 * /billing — subscription & payment management.
 *
 * Three account states are handled distinctly:
 *  1. Paying subscriber (ls_subscription_id present) → full LS customer portal
 *     (change/remove card, switch plan, download invoices, cancel).
 *  2. Comped/legacy account (plan != free but NO ls_subscription_id) → the plan
 *     was granted by us, there's no payment to manage. We say so plainly
 *     instead of nagging them to "subscribe".
 *  3. Free account → invite to a plan.
 *
 * Credit-pack purchase is embedded directly so nothing bounces to /dashboard.
 */
export default async function BillingPage() {
  let email: string | null = null;
  let plan: AccountPlan = "free";
  let credits = 0;
  let monthlyGrant = 0;
  let subStatus: string | null = null;
  let renewsAt: string | null = null;
  let lsSubscriptionId: string | null = null;
  let needsLogin = false;

  try {
    const supabase = getSupabaseServer();
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) {
      needsLogin = true;
    } else {
      email = userData.user.email ?? null;
      const { data: profile } = await supabase
        .from("profiles")
        .select("plan, credits, monthly_credits, monthly_credits_month, ls_subscription_status, ls_renews_at, ls_subscription_id")
        .eq("id", userData.user.id)
        .maybeSingle();
      plan = ((profile?.plan as AccountPlan | undefined) ?? "free");
      subStatus = (profile?.ls_subscription_status as string | null) ?? null;
      renewsAt = (profile?.ls_renews_at as string | null) ?? null;
      lsSubscriptionId = (profile?.ls_subscription_id as string | null) ?? null;
      const thisMonth = new Date().toISOString().slice(0, 7);
      monthlyGrant = profile?.monthly_credits_month === thisMonth ? (profile?.monthly_credits ?? 0) : 0;
      credits = (profile?.credits ?? 0) + monthlyGrant;
    }
  } catch {
    needsLogin = true;
  }

  if (needsLogin) redirect("/login?redirect=/billing");

  const planDef = plan !== "free" ? PLANS[plan] : null;
  const renewLabel = renewsAt
    ? new Date(renewsAt).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" })
    : null;

  // State 1: real LS subscription on file.
  const isSubscriber = !!lsSubscriptionId;
  // State 2: plan granted without an LS subscription (comped / legacy / admin).
  const isComped = plan !== "free" && !lsSubscriptionId;

  let statusLine: string | null = null;
  if (isSubscriber && renewLabel) {
    if (subStatus === "cancelled") statusLine = `Cancels on ${renewLabel} — you keep access until then.`;
    else if (subStatus === "past_due" || subStatus === "unpaid") statusLine = "Payment overdue — update your card below to keep access.";
    else statusLine = `Renews automatically on ${renewLabel}.`;
  } else if (isSubscriber) {
    statusLine = "Subscription active.";
  }

  return (
    <div className="container max-w-3xl py-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <Link href="/dashboard" className="inline-flex items-center gap-1 text-xs text-ink-500 hover:text-ink-900">
            <ArrowLeft className="h-3.5 w-3.5" /> Dashboard
          </Link>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-ink-900">Billing</h1>
          {email && <p className="mt-1 text-sm text-ink-500">Signed in as {email}</p>}
        </div>
        <Badge className="bg-brand-50 text-brand-700">{plan.toUpperCase()}</Badge>
      </div>

      {/* ── Subscription ─────────────────────────────────────────── */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Subscription</CardTitle>
          <CardDescription>
            {isSubscriber
              ? "Change plan, update or remove your card, download invoices, or cancel — all handled securely by Lemon Squeezy."
              : isComped
                ? "Your plan is active on this account."
                : "Pick a plan to unlock higher limits and the full API."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <p className="text-2xl font-semibold capitalize text-ink-900">{planDef?.name ?? "Free"}</p>
            {isSubscriber && (
              <span className="text-sm text-ink-500">
                €{plan === "business" ? PLANS.business.priceMonthly : PLANS.pro.priceMonthly}/mo
              </span>
            )}
          </div>
          {statusLine && <p className="mt-1 text-sm text-ink-500">{statusLine}</p>}

          {/* State 1 — real subscriber: portal */}
          {isSubscriber && (
            <div className="mt-4">
              <BillingPortalButton />
              <p className="mt-2 text-xs text-ink-400">
                Opens your secure Lemon Squeezy portal: payment method, plan changes, invoices and cancellation.
              </p>
            </div>
          )}

          {/* State 2 — comped/legacy: plan active, nothing to bill */}
          {isComped && (
            <div className="mt-4">
              <div className="flex items-start gap-2 rounded-md bg-emerald-50/60 px-3 py-2.5 text-sm text-emerald-800">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                <div>
                  <p className="font-medium">Your {planDef?.name} plan is active.</p>
                  <p className="mt-0.5 text-xs text-emerald-700">
                    It was granted directly on your account, so there&apos;s no payment method or invoice to manage here.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* State 3 — free */}
          {plan === "free" && (
            <div className="mt-4">
              <Link href="/pricing"><Button>See plans</Button></Link>
            </div>
          )}
        </CardContent>
      </Card>

      {/* ── Plan benefits (paid plans) ───────────────────────────── */}
      {planDef && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>What&apos;s included in {planDef.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="grid gap-2 sm:grid-cols-2">
              {planDef.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-ink-700">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            {plan === "business" && (
              <p className="mt-3 text-xs text-ink-400">
                Business includes {BUSINESS_MONTHLY_CREDITS.toLocaleString()} API credits every month
                (reset on the 1st), on top of any credit packs you buy.
              </p>
            )}
          </CardContent>
        </Card>
      )}

      {/* ── Credits (embedded purchase, no redirect) ─────────────── */}
      <div className="mt-6">
        <div className="mb-2 flex items-baseline justify-between">
          <h2 className="text-lg font-semibold text-ink-900">API credits</h2>
          <span className="text-sm text-ink-500">
            Balance: <span className="font-semibold text-ink-900">{credits.toLocaleString()}</span>
          </span>
        </div>
        <BuyCreditsCard />
      </div>

      {/* ── Invoices ─────────────────────────────────────────────── */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><ReceiptText className="h-4 w-4 text-brand-500" /> Invoices &amp; receipts</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-ink-600">
            {isSubscriber
              ? "Every receipt and invoice is emailed to you automatically, and all past invoices are downloadable from the portal above."
              : "When you have a paid subscription, every receipt and invoice is emailed to you automatically and downloadable from your billing portal."}
          </p>
          <div className="mt-3 flex items-center gap-2 rounded-md bg-emerald-50/50 px-3 py-2 text-xs text-emerald-700">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>Lemon Squeezy is our Merchant of Record — VAT/sales tax is calculated, collected and remitted for you.</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
