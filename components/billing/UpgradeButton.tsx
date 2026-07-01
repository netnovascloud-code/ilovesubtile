"use client";

import { useRouter } from "next/navigation";
import { Button, type ButtonProps } from "@/components/ui/button";
import type { PlanKey } from "@/lib/plans";
import { BILLING_ENABLED } from "@/lib/flags";
import { useUser } from "@/hooks/useUser";
import { openPaddleCheckout } from "@/lib/paddle";

type Props = Omit<ButtonProps, "onClick" | "children"> & {
  plan: PlanKey;
  interval?: "monthly" | "annual";
  label: string;
};

/**
 * Opens the Paddle Billing overlay checkout (client-side) for the chosen plan.
 * While BILLING_ENABLED is false the button is inert (subscriptions paused until
 * Paddle is live). Anonymous visitors are bounced through /login first.
 */
export function UpgradeButton({ plan, interval = "monthly", label, ...buttonProps }: Props) {
  const router = useRouter();
  const { user } = useUser();

  if (!BILLING_ENABLED) {
    return (
      <Button {...buttonProps} disabled aria-disabled className={`${buttonProps.className ?? ""} cursor-not-allowed opacity-60`}>
        {label}
      </Button>
    );
  }

  async function go() {
    if (!user) {
      router.push(`/login?redirect=${encodeURIComponent("/pricing")}`);
      return;
    }
    try {
      await openPaddleCheckout({
        plan,
        interval,
        email: user.email ?? undefined,
        userId: user.id,
        successUrl: `${window.location.origin}/dashboard?upgraded=1`,
      });
    } catch {
      // Not configured / failed to load — no-op rather than a broken redirect.
    }
  }

  return (
    <Button {...buttonProps} onClick={go}>
      {label}
    </Button>
  );
}
