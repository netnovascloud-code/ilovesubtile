"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getSupabaseBrowser } from "@/lib/supabase/client";
import { edgeFnUrl } from "@/lib/utils";
import { openCheckoutOverlay } from "@/lib/lemonsqueezy";
import { CREDIT_PACKS } from "@/lib/credits";

/**
 * Credit-pack store. One-time Lemon Squeezy payments; purchased credits never
 * expire. Mirrors the subscription flow in UpgradeButton (auth → checkout
 * overlay → webhook grants the credits).
 */
export function BuyCreditsCard() {
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function buy(packId: string) {
    setLoading(packId);
    setError(null);
    try {
      const supabase = getSupabaseBrowser();
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push("/login?redirect=/dashboard");
        return;
      }
      const res = await fetch(edgeFnUrl("lemonsqueezy-checkout", { pack: packId }), {
        method: "POST",
        headers: { Authorization: `Bearer ${session.access_token}` },
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok || !body.url) {
        setError(body.error === "no_variant_configured" ? "Credit packs aren't on sale yet — check back soon." : (body.error ?? `Checkout error (${res.status}).`));
        return;
      }
      // Hosted overlay — stay on the dashboard; refresh once the purchase
      // succeeds so the new balance shows after the webhook grants it.
      await openCheckoutOverlay(body.url as string, () => router.refresh());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Network error.");
    } finally {
      setLoading(null);
    }
  }

  return (
    <div className="rounded-lg border border-ink-100 bg-white p-6 shadow-card">
      <div className="flex items-center gap-2">
        <Sparkles className="h-5 w-5 text-brand-500" />
        <h3 className="font-semibold text-ink-900">Buy API credits</h3>
      </div>
      <p className="mt-1 text-sm text-ink-500">
        Top up your balance for the REST API. Credits never expire.
      </p>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {CREDIT_PACKS.map((p) => (
          <div key={p.id} className="relative flex flex-col rounded-lg border border-ink-100 p-4">
            {p.badge && (
              <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-brand-500 px-2 py-0.5 text-[10px] font-semibold text-white">
                {p.badge}
              </span>
            )}
            <div className="text-2xl font-semibold text-ink-900">{p.credits.toLocaleString()}</div>
            <div className="text-xs text-ink-400">credits</div>
            <div className="mt-2 text-lg font-medium text-ink-900">€{p.priceEur}</div>
            <div className="mt-0.5 flex items-center gap-1 text-[11px] text-emerald-600">
              <Check className="h-3 w-3" /> €{p.perCredit.toFixed(4).replace(/0+$/, "")}/credit
            </div>
            <Button
              size="sm"
              variant={p.badge ? "primary" : "outline"}
              className="mt-3 w-full"
              disabled={loading !== null}
              onClick={() => buy(p.id)}
            >
              {loading === p.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : "Buy"}
            </Button>
          </div>
        ))}
      </div>

      {error && <p className="mt-3 text-xs text-red-600">{error}</p>}
      <p className="mt-3 text-[11px] text-ink-400">
        Business plans also include 300 credits every month (these reset monthly; purchased packs don't).
      </p>
    </div>
  );
}
