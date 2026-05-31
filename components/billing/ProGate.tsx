"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUser } from "@/hooks/useUser";
import { useLocale } from "@/hooks/useLocale";
import { localePath } from "@/lib/i18n/locales";
import { getQuotaModal } from "@/lib/i18n/quota-modal";

/**
 * Gates a Pro-only feature (Workflow Builder, Batch, saved Templates — Part 6).
 * Pro/Business users get the feature; everyone else sees a clear locked card
 * with an upgrade CTA (and a sign-in link when anonymous). While the plan
 * resolves we show a skeleton so a Pro user never flashes the lock.
 */
export function ProGate({ children, blurb }: { children: ReactNode; blurb?: string }) {
  const { user, plan, loading } = useUser();
  const locale = useLocale();
  const t = getQuotaModal(locale);

  if (loading) return <div className="h-48 animate-pulse rounded-xl bg-ink-50" aria-hidden />;
  if (plan === "pro" || plan === "business") return <>{children}</>;

  return (
    <div className="rounded-xl border border-brand-200 bg-brand-50/40 p-8 text-center md:p-12">
      <div className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-white text-brand-600 shadow-sm">
        <Lock className="h-6 w-6" />
      </div>
      <h2 className="mt-4 text-lg font-semibold text-ink-900">{t.proFeatureTitle}</h2>
      <p className="mx-auto mt-2 max-w-md text-sm text-ink-600">{blurb ?? t.proFeatureBody}</p>
      <div className="mt-5 flex flex-wrap justify-center gap-2">
        <Link href={localePath(locale, "pricing")}>
          <Button>{t.proFeatureCta}</Button>
        </Link>
        {!user && (
          <Link href="/login">
            <Button variant="outline">{t.signIn}</Button>
          </Link>
        )}
      </div>
    </div>
  );
}
