"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, type ButtonProps } from "@/components/ui/button";
import { getSupabaseBrowser } from "@/lib/supabase/client";
import { edgeFnUrl } from "@/lib/utils";
import type { PlanKey } from "@/lib/stripe";

type Props = Omit<ButtonProps, "onClick" | "children"> & {
  plan: PlanKey;
  interval?: "monthly" | "annual";
  label: string;
};

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
        // Not signed in — send them to register with the desired plan in the query.
        router.push(`/register?plan=${plan}&interval=${interval}`);
        return;
      }
      const res = await fetch(edgeFnUrl("stripe-checkout", { plan, interval }), {
        method: "POST",
        headers: { Authorization: `Bearer ${session.access_token}` },
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setError(body.error ?? `Stripe error (${res.status}). Try again in a moment.`);
        return;
      }
      const { url } = (await res.json()) as { url?: string };
      if (!url) {
        setError("Stripe didn't return a checkout URL.");
        return;
      }
      window.location.href = url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Network error.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <Button {...buttonProps} onClick={upgrade} disabled={loading || buttonProps.disabled}>
        {loading ? "Redirecting…" : label}
      </Button>
      {error && (
        <p className="mt-2 text-xs text-red-600">{error}</p>
      )}
    </div>
  );
}
