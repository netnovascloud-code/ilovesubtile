"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import { useUser } from "@/hooks/useUser";
import { useLocale } from "@/hooks/useLocale";
import { localePath } from "@/lib/i18n/locales";
import { getCommonUi } from "@/lib/i18n/tool-ui";

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
  const t = getCommonUi(locale);
  if (loading) return null;

  const pricing = localePath(locale, "pricing");

  if (plan === "pro" || plan === "business") {
    return (
      <p className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-green-600">
        <Check className="h-3.5 w-3.5" /> {t.unlimited}
      </p>
    );
  }

  if (!user) {
    // No anonymous AI: logged-out visitors must sign in (free account) to use
    // the AI/edge tools — enforced server-side in the AI Edge Functions.
    return (
      <p className="mt-3 text-sm text-ink-400">
        <Link href="/login" className="text-brand-600 hover:underline">
          {t.quotaAnonRequire ?? "Sign in to use the AI tools — free account"}
        </Link>
      </p>
    );
  }

  return (
    <p className="mt-3 text-sm text-ink-400">
      {t.quotaFreePrefix}{" "}
      <Link href={pricing} className="text-brand-600 hover:underline">
        {t.quotaFreeLink}
      </Link>
    </p>
  );
}
