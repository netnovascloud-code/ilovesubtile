"use client";

import { useRouter } from "next/navigation";
import { Button, type ButtonProps } from "@/components/ui/button";
import type { PlanKey } from "@/lib/plans";

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
  return (
    <Button
      {...buttonProps}
      onClick={() => router.push(`/billing/checkout?plan=${plan}&interval=${interval}`)}
    >
      {label}
    </Button>
  );
}
