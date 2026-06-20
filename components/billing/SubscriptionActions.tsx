"use client";

import { useState } from "react";
import { CreditCard, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getSupabaseBrowser } from "@/lib/supabase/client";
import { edgeFnUrl } from "@/lib/utils";
import { getBilling } from "@/lib/i18n/account";
import { type Locale } from "@/lib/i18n/locales";

type PortalResponse = { url?: string; updatePaymentMethodUrl?: string; error?: string; scope?: string; status?: number };

/**
 * Subscription self-service: open the Lemon Squeezy customer portal, or jump
 * straight to the "change payment method" page. Both URLs come from the
 * `lemonsqueezy-portal` Edge Function (LS key never leaves the server). When the
 * caller has no active subscription, that's a calm, expected state — shown as a
 * neutral note ("No active subscription"), not a red error.
 */
export function SubscriptionActions({ locale, customerOnly = false }: { locale: Locale; customerOnly?: boolean }) {
  const s = getBilling(locale);
  // Track which action is in-flight so the two buttons spin independently.
  const [busy, setBusy] = useState<"portal" | "card" | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  async function go(kind: "portal" | "card") {
    setBusy(kind);
    setError(null);
    setInfo(null);
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
        // "No subscription" is a calm, expected state (comped plan / one-time
        // buyer with no recurring payment) → neutral note. Real failures → error.
        const calm = body.error === "no_subscription" || body.error === "no_billing_account" || body.error === "no_subscription_portal";
        if (calm) { setInfo(s.noSubscriptionError); return; }
        const diag = body.error ? ` (${body.error}${body.scope ? "/" + body.scope : ""}${body.status ? " " + body.status : ""})` : "";
        setError(s.portalError + diag);
        return;
      }
      window.location.href = target;
    } catch {
      setError(s.networkError);
    } finally {
      setBusy(null);
    }
  }

  const messages = (
    <>
      {info && <p className="mt-2 text-xs text-ink-500">{info}</p>}
      {error && <p className="mt-2 text-xs text-red-600">{error}</p>}
    </>
  );

  // Customer-only (no recorded subscription, but a Lemon Squeezy customer): one
  // button → the portal. The Edge Function still checks LS for a real
  // subscription first; if none, it shows the neutral "no subscription" note.
  if (customerOnly) {
    return (
      <div>
        <Button variant="outline" size="sm" onClick={() => go("portal")} disabled={busy !== null}>
          <CreditCard className="mr-1.5 h-4 w-4" />
          {busy === "portal" ? s.opening : s.managePortal}
        </Button>
        {messages}
      </div>
    );
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
      {messages}
    </div>
  );
}
