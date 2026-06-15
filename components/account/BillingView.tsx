import Link from "next/link";
import { redirect } from "next/navigation";
import { getSupabaseServer } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BillingPortalButton } from "@/components/billing/BillingPortalButton";
import { BuyCreditsCard } from "@/components/billing/BuyCreditsCard";
import { AiUsageCard } from "@/components/billing/AiUsageCard";
import { CreditHistoryCard } from "@/components/billing/CreditHistoryCard";
import { ReceiptText, ShieldCheck, ArrowLeft, CheckCircle2 } from "lucide-react";
import { PLANS, type PlanKey } from "@/lib/plans";
import { BUSINESS_MONTHLY_CREDITS } from "@/lib/credits";
import { getBilling } from "@/lib/i18n/account";
import { getPlanFeatures } from "@/lib/i18n/plan-features";
import { localePath, type Locale } from "@/lib/i18n/locales";

type AccountPlan = "free" | PlanKey;

/**
 * Shared body of the Billing page, rendered by both /billing (locale="en") and
 * /[locale]/billing. Auth-gated and per-request — see the page wrappers for
 * `force-dynamic`. Strings come from getBilling(locale) (EN base + FR, English
 * fallback for the rest).
 */
export async function BillingView({ locale }: { locale: Locale }) {
  const s = getBilling(locale);

  let email: string | null = null;
  let plan: AccountPlan = "free";
  let credits = 0;
  let purchasedCredits = 0;
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
      purchasedCredits = profile?.credits ?? 0;
      credits = purchasedCredits + monthlyGrant;
    }
  } catch {
    needsLogin = true;
  }

  if (needsLogin) redirect(`/login?redirect=${encodeURIComponent(localePath(locale, "billing"))}`);

  const planDef = plan !== "free" ? PLANS[plan] : null;
  const renewLabel = renewsAt
    ? new Date(renewsAt).toLocaleDateString(locale, { year: "numeric", month: "short", day: "numeric" })
    : null;

  const isSubscriber = !!lsSubscriptionId;
  const isComped = plan !== "free" && !lsSubscriptionId;

  let statusLine: string | null = null;
  if (isSubscriber && renewLabel) {
    if (subStatus === "cancelled") statusLine = s.cancelsOn(renewLabel);
    else if (subStatus === "past_due" || subStatus === "unpaid") statusLine = s.paymentOverdue;
    else statusLine = s.renewsAuto(renewLabel);
  } else if (isSubscriber) {
    statusLine = s.subActive;
  }

  return (
    <div className="container max-w-3xl py-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <Link href={localePath(locale, "dashboard")} className="inline-flex items-center gap-1 text-xs text-ink-500 hover:text-ink-900">
            <ArrowLeft className="h-3.5 w-3.5" /> {s.back}
          </Link>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-ink-900">{s.title}</h1>
          {email && <p className="mt-1 text-sm text-ink-500">{s.signedInAs(email)}</p>}
        </div>
        <Badge className="bg-brand-50 text-brand-700">{plan.toUpperCase()}</Badge>
      </div>

      {/* ── Subscription ─────────────────────────────────────────── */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>{s.subscription}</CardTitle>
          <CardDescription>
            {isSubscriber ? s.subDescSubscriber : isComped ? s.subDescComped : s.subDescFree}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <p className="text-2xl font-semibold capitalize text-ink-900">{planDef?.name ?? s.free}</p>
            {isSubscriber && (
              <span className="text-sm text-ink-500">
                €{plan === "business" ? PLANS.business.priceMonthly : PLANS.pro.priceMonthly}{s.perMo}
              </span>
            )}
          </div>
          {statusLine && <p className="mt-1 text-sm text-ink-500">{statusLine}</p>}

          {isSubscriber && (
            <div className="mt-4">
              <BillingPortalButton />
              <p className="mt-2 text-xs text-ink-400">{s.portalNote}</p>
            </div>
          )}

          {isComped && (
            <div className="mt-4">
              <div className="flex items-start gap-2 rounded-md bg-emerald-50/60 px-3 py-2.5 text-sm text-emerald-800">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                <div>
                  <p className="font-medium">{s.compedTitle(planDef?.name ?? "")}</p>
                  <p className="mt-0.5 text-xs text-emerald-700">{s.compedBody}</p>
                </div>
              </div>
            </div>
          )}

          {plan === "free" && (
            <div className="mt-4">
              <Link href={localePath(locale, "pricing")}><Button>{s.seePlans}</Button></Link>
            </div>
          )}
        </CardContent>
      </Card>

      {/* ── Plan benefits (paid plans) ───────────────────────────── */}
      {planDef && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>{s.whatsIncluded(planDef.name)}</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="grid gap-2 sm:grid-cols-2">
              {getPlanFeatures(locale)[plan].map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-ink-700">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            {plan === "business" && (
              <p className="mt-3 text-xs text-ink-400">{s.businessCreditsNote(BUSINESS_MONTHLY_CREDITS.toLocaleString(locale))}</p>
            )}
          </CardContent>
        </Card>
      )}

      {/* ── AI usage (live meter) ────────────────────────────────── */}
      <AiUsageCard locale={locale} />

      {/* ── Credits (embedded purchase, no redirect) ─────────────── */}
      <div className="mt-6">
        <div className="mb-2 flex items-baseline justify-between">
          <h2 className="text-lg font-semibold text-ink-900">{s.apiCredits}</h2>
          <span className="text-sm text-ink-500">
            {s.balance} <span className="font-semibold text-ink-900">{credits.toLocaleString(locale)}</span>
          </span>
        </div>
        {credits > 0 && (
          <div className="mb-3 grid gap-2 rounded-lg border border-ink-100 bg-white p-3 text-sm sm:grid-cols-2">
            {plan === "business" && (
              <div className="flex items-center justify-between gap-2">
                <span className="text-ink-600">{s.monthlyBusiness}</span>
                <span className="text-ink-900"><span className="font-medium">{monthlyGrant.toLocaleString(locale)}</span> / {BUSINESS_MONTHLY_CREDITS.toLocaleString(locale)} · {s.resets1st}</span>
              </div>
            )}
            <div className="flex items-center justify-between gap-2">
              <span className="text-ink-600">{s.purchasedPacks}</span>
              <span className="text-ink-900"><span className="font-medium">{purchasedCredits.toLocaleString(locale)}</span> · {s.neverExpire}</span>
            </div>
          </div>
        )}
        <BuyCreditsCard locale={locale} />
      </div>

      {/* ── Credit history (ledger) ──────────────────────────────── */}
      <CreditHistoryCard locale={locale} />

      {/* ── Invoices ─────────────────────────────────────────────── */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><ReceiptText className="h-4 w-4 text-brand-500" /> {s.invoicesTitle}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-ink-600">{isSubscriber ? s.invoicesSubscriber : s.invoicesNonSub}</p>
          <div className="mt-3 flex items-center gap-2 rounded-md bg-emerald-50/50 px-3 py-2 text-xs text-emerald-700">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>{s.vatNote}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
