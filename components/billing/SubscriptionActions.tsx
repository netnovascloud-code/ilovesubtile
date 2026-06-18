"use client";

import { useState } from "react";
import { CreditCard, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getSupabaseBrowser } from "@/lib/supabase/client";
import { edgeFnUrl } from "@/lib/utils";
import { getBilling } from "@/lib/i18n/account";
import { type Locale } from "@/lib/i18n/locales";

type PortalResponse = { url?: string; updatePaymentMethodUrl?: string; error?: string };

/**
 * Subscription self-service for active subscribers: open the Lemon Squeezy
 * customer portal, or jump straight to the "change payment method" page. Both
 * URLs come from the same `lemonsqueezy-portal` Edge Function, which fetches the
 * subscription server-side (LS API key never leaves the function) and returns
 * fresh, signed, ~24h URLs — so we fetch on every click and never store them.
 */
export function SubscriptionActions({ locale }: { locale: Locale }) {
  const s = getBilling(locale);
  // Track which action is in-flight so the two buttons spin independently.
  const [busy, setBusy] = useState<"portal" | "card" | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function go(kind: "portal" | "card") {
    setBusy(kind);
    setError(null);
    try {
      const supabase = getSupabaseBrowser();
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { setError(s.signInFirstError); return; }
      const res = await fetch(edgeFnUrl("lemonsqueezy-portal"), {
        method: "POST",
        headers: { Authorization: `Bearer ${session.access_token}` },
      });
      const body = (await res.json()) as PortalResponse;
      const target = kind === "portal" ? body.url : (body.updatePaymentMethodUrl ?? body.url);
      if (!res.ok || !target) {
        setError(body.error === "no_subscription" ? s.noSubscriptionError : s.portalError);
        return;
      }
      window.location.href = target;
    } catch {
      setError(s.networkError);
    } finally {
      setBusy(null);
    }
  }

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        <Button variant="outline" size="sm" onClick={() => go("card")} disabled={busy !== null}>
          <CreditCard className="mr-1.5 h-4 w-4" />
          {busy === "card" ? s.opening : s.changePaymentMethod}
        </Button>
        <Button variant="outline" size="sm" onClick={() => go("portal")} disabled={busy !== null}>
          <ExternalLink className="mr-1.5 h-4 w-4" />
          {busy === "portal" ? s.opening : s.managePortal}
        </Button>
      </div>
      {error && <p className="mt-2 text-xs text-red-600">{error}</p>}
    </div>
  );
}
