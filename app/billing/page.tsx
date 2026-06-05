import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getSupabaseServer } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BillingPortalButton } from "@/components/billing/BillingPortalButton";
import { ReceiptText, CreditCard, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Billing",
  robots: { index: false, follow: false },
};

/**
 * /billing — subscription & payment management. The actual "cancel / change
 * card / remove card / download invoices" surface is Lemon Squeezy's hosted
 * customer portal (LS is our Merchant of Record); the button here mints a
 * signed portal URL via the lemonsqueezy-portal edge function. Invoices/receipts
 * are emailed automatically by LS on every charge.
 */
export default async function BillingPage() {
  let email: string | null = null;
  let plan = "free";
  let credits = 0;
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
      plan = (profile?.plan as string | undefined) ?? "free";
      subStatus = (profile?.ls_subscription_status as string | null) ?? null;
      renewsAt = (profile?.ls_renews_at as string | null) ?? null;
      lsSubscriptionId = (profile?.ls_subscription_id as string | null) ?? null;
      const thisMonth = new Date().toISOString().slice(0, 7);
      const monthly = profile?.monthly_credits_month === thisMonth ? (profile?.monthly_credits ?? 0) : 0;
      credits = (profile?.credits ?? 0) + monthly;
    }
  } catch {
    needsLogin = true;
  }

  if (needsLogin) redirect("/login?redirect=/billing");

  const renewLabel = renewsAt
    ? new Date(renewsAt).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" })
    : null;
  let planSubtitle: string | null = null;
  if (plan !== "free" && renewLabel) {
    if (subStatus === "cancelled") planSubtitle = `Cancels on ${renewLabel} — access until then`;
    else if (subStatus === "past_due" || subStatus === "unpaid") planSubtitle = "Payment overdue — please update your card below";
    else planSubtitle = `Renews on ${renewLabel}`;
  }

  const hasSub = !!lsSubscriptionId;

  return (
    <div className="container max-w-3xl py-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-ink-900">Billing</h1>
          {email && <p className="mt-1 text-sm text-ink-500">Signed in as {email}</p>}
        </div>
        <Badge className="bg-brand-50 text-brand-700">{plan.toUpperCase()}</Badge>
      </div>

      {/* Subscription */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Subscription</CardTitle>
          <CardDescription>Change plan, update or remove your card, or cancel — all handled securely by Lemon Squeezy.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-2xl font-semibold capitalize text-ink-900">{plan}</p>
              {planSubtitle ? (
                <p className="mt-1 text-xs text-ink-500">{planSubtitle}</p>
              ) : (
                <p className="mt-1 text-xs text-ink-400">No active subscription</p>
              )}
            </div>
          </div>

          {hasSub ? (
            <div className="mt-4">
              <BillingPortalButton />
              <p className="mt-2 text-xs text-ink-400">
                Opens your Lemon Squeezy portal — manage payment method, switch plan, download invoices, or cancel.
              </p>
            </div>
          ) : (
            <div className="mt-4">
              {plan === "free" ? (
                <Link href="/pricing"><Button>See plans</Button></Link>
              ) : (
                <>
                  <Link href="/pricing"><Button>Subscribe</Button></Link>
                  <p className="mt-2 text-xs text-ink-400">
                    No Lemon Squeezy subscription is attached to this account yet. Subscribe to manage billing here.
                  </p>
                </>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Credits */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><CreditCard className="h-4 w-4 text-brand-500" /> API credits</CardTitle>
          <CardDescription>One-time packs, never expire. Used by the REST API.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-semibold text-ink-900">{credits.toLocaleString()} <span className="text-sm font-normal text-ink-400">credits</span></p>
          <div className="mt-4">
            <Link href="/dashboard"><Button variant="outline">Buy credits</Button></Link>
          </div>
        </CardContent>
      </Card>

      {/* Invoices */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><ReceiptText className="h-4 w-4 text-brand-500" /> Invoices & receipts</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-ink-600">
            Lemon Squeezy is our Merchant of Record. A receipt/invoice is emailed to you automatically after every payment,
            and all past invoices are downloadable from the subscription portal above.
          </p>
          <div className="mt-3 flex items-center gap-2 rounded-md bg-emerald-50/50 px-3 py-2 text-xs text-emerald-700">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>VAT/sales tax is calculated, collected and remitted by Lemon Squeezy.</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
