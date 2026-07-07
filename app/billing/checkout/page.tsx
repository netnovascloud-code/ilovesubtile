"use client";

/**
 * /billing/checkout — checkout launcher (no iframe). Asks the stripe-checkout
 * Edge Function for a hosted Stripe Checkout Session and full-page redirects to
 * it. This is a pure transition page ("Redirecting to secure payment…"); the
 * buyer only sees a spinner for a moment.
 *
 * Routing: /billing/checkout?plan=pro|business&interval=monthly|annual
 *
 * Auth: if there's no session we bounce to /login?redirect=<this url>, so after
 * sign-in the user lands back here and the checkout fires automatically. That's
 * what makes "click Subscribe → sign in → pay" work end to end.
 */

import { Suspense, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getSupabaseBrowser } from "@/lib/supabase/client";
import { edgeFnUrl } from "@/lib/utils";
import { BILLING_ENABLED } from "@/lib/flags";

function CheckoutLauncher() {
  const router = useRouter();
  const params = useSearchParams();
  const started = useRef(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    // Subscriptions are paused (lib/flags).
    if (!BILLING_ENABLED) {
      setError("Subscriptions are temporarily unavailable — they'll be back soon.");
      return;
    }

    const plan = params.get("plan") === "business" ? "business" : "pro";
    const interval = params.get("interval") === "annual" ? "annual" : "monthly";

    (async () => {
      try {
        const supabase = getSupabaseBrowser();
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          const self = `/billing/checkout?${params.toString()}`;
          router.replace(`/login?redirect=${encodeURIComponent(self)}`);
          return;
        }
        const res = await fetch(edgeFnUrl("stripe-checkout", { plan, interval }), {
          method: "POST",
          headers: { Authorization: `Bearer ${session.access_token}` },
        });
        const body = (await res.json().catch(() => ({}))) as { url?: string; error?: string };
        if (!res.ok || !body.url) {
          // Map known error codes to short human messages. Unknown codes fall
          // back to a generic line — never leak raw status codes into the UI.
          const known: Record<string, string> = {
            no_price_configured: "This plan isn't on sale yet — please try again shortly.",
            unauthorized: "Your session expired. Please sign in again.",
            not_configured: "Checkout is temporarily unavailable. Please try again in a few minutes.",
            checkout_failed: "Our payment provider is having trouble. Please try again in a moment.",
          };
          setError(known[body.error ?? ""] ?? "We couldn't start the checkout. Please try again.");
          return;
        }
        // Full-page redirect to the Stripe-hosted checkout.
        window.location.href = body.url;
      } catch (err) {
        setError(err instanceof Error ? err.message : "Network error.");
      }
    })();
  }, [params, router]);

  if (error) {
    return (
      <div className="container flex min-h-[60vh] flex-col items-center justify-center text-center">
        <h1 className="text-xl font-semibold text-ink-900">Couldn&apos;t start checkout</h1>
        <p className="mt-2 max-w-md text-sm text-ink-500">{error}</p>
        <div className="mt-6 flex gap-3">
          <Button onClick={() => window.location.reload()}>Try again</Button>
          <Link href="/pricing"><Button variant="outline">Back to pricing</Button></Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container flex min-h-[60vh] items-center justify-center">
      <div className="flex items-center gap-3 text-sm text-ink-500">
        <Loader2 className="h-5 w-5 animate-spin" />
        Redirecting to secure payment…
      </div>
    </div>
  );
}

export default function BillingCheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="container flex min-h-[60vh] items-center justify-center">
          <Loader2 className="h-5 w-5 animate-spin text-ink-400" />
        </div>
      }
    >
      <CheckoutLauncher />
    </Suspense>
  );
}
