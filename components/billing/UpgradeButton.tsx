"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, type ButtonProps } from "@/components/ui/button";
import { getSupabaseBrowser } from "@/lib/supabase/client";
import { edgeFnUrl } from "@/lib/utils";
import type { PlanKey } from "@/lib/plans";

type Props = Omit<ButtonProps, "onClick" | "children"> & {
  plan: PlanKey;
  interval?: "monthly" | "annual";
  label: string;
};

/**
 * Fetches a hosted Lemon Squeezy checkout URL and full-page redirects the
 * buyer there — same UX pattern as Stripe Checkout. Comes back to /dashboard
 * once the order settles (LS handles the redirect_url server-side).
 */
export function UpgradeButton({ plan, interval = "monthly", label, ...buttonProps }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function upgrade() {
    setLoading(true);
    setError(null);
    try {
      const supabase = getSupabaseBrowser();
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push(`/register?plan=${plan}&interval=${interval}`);
        return;
      }
      const res = await fetch(edgeFnUrl("lemonsqueezy-checkout", { plan, interval }), {
        method: "POST",
        headers: { Authorization: `Bearer ${session.access_token}` },
      });
      const body = (await res.json().catch(() => ({}))) as { url?: string; error?: string };
      if (!res.ok || !body.url) {
        setError(body.error ?? `Checkout error (${res.status}).`);
        return;
      }
      window.location.href = body.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Network error.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <Button {...buttonProps} onClick={upgrade} disabled={loading || buttonProps.disabled}>
        {loading ? "Opening…" : label}
      </Button>
      {error && <p className="mt-2 text-xs text-red-600">{error}</p>}
    </div>
  );
}
