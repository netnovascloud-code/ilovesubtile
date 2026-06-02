"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import { useUser } from "@/hooks/useUser";
import { useLocale } from "@/hooks/useLocale";
import { localePath } from "@/lib/i18n/locales";

/**
 * One-line, non-intrusive daily-quota hint under the tool H1.
 * - anonymous: "3 free runs/day — Sign in for 5"
 * - free signed-in: "2 / 5 runs used today — Go Pro for unlimited"
 * - pro/business: "✓ Unlimited" (green)
 *
 * Client-only data; renders nothing until the user state resolves to
 * avoid layout shift on the SSG shell.
 */
export function QuotaLine() {
  const { user, plan, loading } = useUser();
  const locale = useLocale();
  if (loading) return null;

  const pricing = localePath(locale, "pricing");

  if (plan === "pro" || plan === "business") {
    return (
      <p className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-green-600">
        <Check className="h-3.5 w-3.5" /> Unlimited
      </p>
    );
  }

  if (!user) {
    return (
      <p className="mt-3 text-sm text-ink-400">
        2 free AI runs/day —{" "}
        <Link href="/login" className="text-brand-600 hover:underline">
          Sign in for 3
        </Link>
      </p>
    );
  }

  return (
    <p className="mt-3 text-sm text-ink-400">
      Free plan: 3 AI runs/day —{" "}
      <Link href={pricing} className="text-brand-600 hover:underline">
        Go Pro for 500/month
      </Link>
    </p>
  );
}
