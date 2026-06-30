"use client";

import { useRouter } from "next/navigation";
import { Button, type ButtonProps } from "@/components/ui/button";
import type { PlanKey } from "@/lib/plans";
import { BILLING_ENABLED } from "@/lib/flags";

type Props = Omit<ButtonProps, "onClick" | "children"> & {
  plan: PlanKey;
  interval?: "monthly" | "annual";
  label: string;
};

/**
 * Routes to /billing/checkout, which handles auth (bouncing through /login when
 * needed) and the Lemon Squeezy hosted-checkout redirect. One code path whether
 * or not the visitor is signed in — the launcher page decides.
 */
export function UpgradeButton({ plan, interval = "monthly", label, ...buttonProps }: Props) {
  const router = useRouter();
  // Subscriptions are paused (lib/flags) until Paddle is live — render an inert
  // button so no one reaches the (removed) checkout.
  if (!BILLING_ENABLED) {
    return (
      <Button {...buttonProps} disabled aria-disabled className={`${buttonProps.className ?? ""} cursor-not-allowed opacity-60`}>
        {label}
      </Button>
    );
  }
  return (
    <Button
      {...buttonProps}
      onClick={() => router.push(`/billing/checkout?plan=${plan}&interval=${interval}`)}
    >
      {label}
    </Button>
  );
}
