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
 * Sends the visitor to /billing/checkout — the page itself handles auth,
 * variant resolution and the embedded Lemon Squeezy iframe. We keep this
 * thin so the pricing grid stays purely declarative.
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
