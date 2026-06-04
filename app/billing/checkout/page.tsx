"use client";

/**
 * /billing/checkout — Konvertools billing page.
 *
 * Two-column layout: order summary on the left, embedded Lemon Squeezy
 * checkout iframe on the right. Replaces the old full-page lemon.js overlay.
 *
 * Routing:
 *   /billing/checkout?plan=pro|business&interval=monthly|annual
 *   /billing/checkout?pack=starter|growth|scale|studio
 *
 * The page calls lemonsqueezy-checkout with success_path pointing to the
 * /billing/return helper, which break-outs the iframe back to /dashboard.
 */

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Check, Loader2, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getSupabaseBrowser } from "@/lib/supabase/client";
import { edgeFnUrl } from "@/lib/utils";
import { PLANS, type PlanKey } from "@/lib/plans";
import { CREDIT_PACKS, type CreditPack } from "@/lib/credits";

type Summary = {
  title: string;
  subtitle: string;
  priceLabel: string;
  fineprint: string;
  features: string[];
  badge?: string;
};

function buildSummary(params: URLSearchParams): { kind: "plan" | "pack" | "none"; summary: Summary | null; query: Record<string, string> } {
  const pack = params.get("pack")?.toLowerCase() as CreditPack["id"] | null;
  if (pack) {
    const p = CREDIT_PACKS.find((x) => x.id === pack);
    if (!p) return { kind: "none", summary: null, query: {} };
    return {
      kind: "pack",
      summary: {
        title: `${p.id.charAt(0).toUpperCase()}${p.id.slice(1)} Pack`,
        subtitle: `${p.credits.toLocaleString()} API credits`,
        priceLabel: `€${p.priceEur}`,
        fineprint: `€${p.perCredit.toFixed(4).replace(/0+$/, "")} per credit · one-time payment · credits never expire`,
        features: [
          `${p.credits.toLocaleString()} credits for the REST API`,
          "Never expires — use at your own pace",
          "Stack with any subscription plan",
          "Instant top-up after payment",
        ],
        badge: p.badge,
      },
      query: { pack },
    };
  }
  const plan = (params.get("plan") ?? "pro").toLowerCase() as PlanKey;
  const interval = params.get("interval") === "annual" ? "annual" : "monthly";
  const def = PLANS[plan];
  if (!def) return { kind: "none", summary: null, query: {} };
  const monthly = interval === "annual" ? Math.round(def.priceAnnual / 12) : def.priceMonthly;
  return {
    kind: "plan",
    summary: {
      title: `${def.name} (${interval === "annual" ? "Annual" : "Monthly"})`,
      subtitle: interval === "annual" ? `Billed yearly at €${def.priceAnnual}` : "Billed monthly",
      priceLabel: `€${monthly}/mo`,
      fineprint: interval === "annual"
        ? `Save ~${Math.round((1 - def.priceAnnual / (def.priceMonthly * 12)) * 100)}% vs monthly · cancel anytime`
        : "Cancel anytime · VAT included by Lemon Squeezy",
      features: [...def.features],
    },
    query: { plan, interval },
  };
}

export default function BillingCheckoutPage() {
  const router = useRouter();
  const params = useSearchParams();
  const fetchedRef = useRef(false);
  const [iframeUrl, setIframeUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const { kind, summary, query } = useMemo(() => buildSummary(params), [params]);

  useEffect(() => {
    if (kind === "none" || fetchedRef.current) return;
    fetchedRef.current = true;

    (async () => {
      try {
        const supabase = getSupabaseBrowser();
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          const next = `/billing/checkout?${params.toString()}`;
          router.push(`/login?redirect=${encodeURIComponent(next)}`);
          return;
        }
        const successDest = kind === "pack" ? "/dashboard?credits=1" : "/dashboard?upgraded=1";
        const successPath = `/billing/return?dest=${encodeURIComponent(successDest)}`;
        const res = await fetch(
          edgeFnUrl("lemonsqueezy-checkout", { ...query, success_path: successPath }),
          { method: "POST", headers: { Authorization: `Bearer ${session.access_token}` } },
        );
        const body = (await res.json().catch(() => ({}))) as { url?: string; error?: string };
        if (!res.ok || !body.url) {
          setError(body.error === "no_variant_configured" ? "This plan isn't available for sale yet." : body.error ?? `Checkout error (${res.status}).`);
          return;
        }
        setIframeUrl(body.url);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Network error.");
      } finally {
        setLoading(false);
      }
    })();
  }, [kind, params, query, router]);

  if (kind === "none") {
    return (
      <div className="container py-16">
        <h1 className="text-2xl font-semibold text-ink-900">Nothing to check out</h1>
        <p className="mt-2 text-sm text-ink-500">Pick a plan or a credit pack first.</p>
        <div className="mt-4 flex gap-3">
          <Link href="/pricing"><Button>See pricing</Button></Link>
          <Link href="/dashboard"><Button variant="outline">Back to dashboard</Button></Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-10">
      <div className="mb-6">
        <Link href="/pricing" className="text-sm text-ink-500 hover:text-ink-900">← Back to pricing</Link>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-ink-900">Checkout</h1>
        <p className="mt-1 text-sm text-ink-500">Secure payment by Lemon Squeezy — VAT included.</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)]">
        {/* ── Order summary ────────────────────────────────────────── */}
        <aside className="rounded-lg border border-ink-100 bg-white p-6 shadow-card lg:sticky lg:top-6 lg:self-start">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-brand-500" />
            <h2 className="text-lg font-semibold text-ink-900">Order summary</h2>
          </div>

          <div className="mt-4 rounded-md border border-ink-100 bg-ink-50/40 p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="font-medium text-ink-900">{summary!.title}</div>
                <div className="mt-0.5 text-xs text-ink-500">{summary!.subtitle}</div>
              </div>
              <div className="text-right">
                <div className="text-xl font-semibold text-ink-900">{summary!.priceLabel}</div>
                {summary!.badge && (
                  <div className="mt-1 inline-block rounded-full bg-brand-500 px-2 py-0.5 text-[10px] font-semibold text-white">
                    {summary!.badge}
                  </div>
                )}
              </div>
            </div>
            <p className="mt-3 text-xs text-ink-500">{summary!.fineprint}</p>
          </div>

          <ul className="mt-5 space-y-2 text-sm text-ink-700">
            {summary!.features.map((f) => (
              <li key={f} className="flex items-start gap-2">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                <span>{f}</span>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex items-center gap-2 rounded-md bg-emerald-50/50 px-3 py-2 text-xs text-emerald-700">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>Payments handled by Lemon Squeezy (PCI-DSS, MoR).</span>
          </div>
        </aside>

        {/* ── Checkout iframe ──────────────────────────────────────── */}
        <section className="rounded-lg border border-ink-100 bg-white p-2 shadow-card">
          {loading && (
            <div className="flex h-[820px] items-center justify-center">
              <div className="flex items-center gap-3 text-sm text-ink-500">
                <Loader2 className="h-4 w-4 animate-spin" />
                Preparing your secure checkout…
              </div>
            </div>
          )}
          {error && !loading && (
            <div className="flex h-[820px] flex-col items-center justify-center gap-3 px-6 text-center">
              <p className="text-sm text-red-600">{error}</p>
              <Link href="/pricing"><Button variant="outline" size="sm">Back to pricing</Button></Link>
            </div>
          )}
          {iframeUrl && !error && (
            <iframe
              src={iframeUrl}
              title="Secure checkout"
              className="block h-[820px] w-full rounded-md border-0"
              allow="payment *"
            />
          )}
        </section>
      </div>
    </div>
  );
}
