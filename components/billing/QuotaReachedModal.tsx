"use client";

import { useEffect } from "react";
import Link from "next/link";
import { X, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/hooks/useLocale";
import { useUser } from "@/hooks/useUser";
import { localePath } from "@/lib/i18n/locales";
import { getQuotaModal, interp } from "@/lib/i18n/quota-modal";

export type QuotaReason = {
  /** "daily_limit" or "monthly_limit" — matches the ai-process error code. */
  kind: "daily" | "monthly";
  limit: number;
  used: number;
  /** ISO string from the 429 body. */
  resetAt?: string | null;
};

/**
 * Modal shown when the AI run is blocked by quota (Part 6).
 * - Anonymous user → "Sign in for more" (→ /login)
 * - Free user      → "Upgrade for more" (→ /pricing)
 * - Pro/Business   → "Maybe later" (already on the highest tier or has reached
 *                    the monthly cap, in which case we still show the upgrade
 *                    CTA for Pro since Business is a step up).
 */
export function QuotaReachedModal({ reason, onClose }: { reason: QuotaReason | null; onClose: () => void }) {
  const locale = useLocale();
  const t = getQuotaModal(locale);
  const { user, plan } = useUser();

  useEffect(() => {
    if (!reason) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [reason, onClose]);

  if (!reason) return null;

  const when = (() => {
    if (!reason.resetAt) return "";
    try {
      const d = new Date(reason.resetAt);
      return new Intl.DateTimeFormat(locale, { dateStyle: "medium", timeStyle: "short" }).format(d);
    } catch { return ""; }
  })();

  const isMonthly = reason.kind === "monthly";
  const title = isMonthly ? t.monthlyTitle : t.dailyTitle;
  const body = interp(isMonthly ? t.monthlyBody : t.dailyBody, { used: reason.used, limit: reason.limit });
  const isAnon = !user;
  const upgradePath = localePath(locale, "pricing");
  const ctaLabel = isAnon ? t.signIn : t.upgrade;
  const ctaHref = isAnon ? "/login" : upgradePath;
  // Business has nowhere higher to go — hide the upgrade CTA in that case.
  const showCta = isAnon || plan !== "business";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="quota-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink-900/40 px-4 py-6"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          aria-label="Close"
          onClick={onClose}
          className="absolute right-3 top-3 rounded p-1 text-ink-400 hover:bg-ink-50 hover:text-ink-700"
        >
          <X className="h-4 w-4" />
        </button>
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-brand-50 text-brand-600">
          <Crown className="h-5 w-5" />
        </div>
        <h2 id="quota-modal-title" className="mt-3 text-lg font-semibold text-ink-900">
          {title}
        </h2>
        <p className="mt-2 text-sm text-ink-600">{body}</p>
        {when && <p className="mt-1 text-xs text-ink-400">{interp(t.resetsAt, { when })}</p>}
        <div className="mt-5 flex flex-wrap gap-2">
          {showCta && (
            <Link href={ctaHref} className="grow">
              <Button className="w-full">{ctaLabel}</Button>
            </Link>
          )}
          <Button variant="outline" onClick={onClose} className={showCta ? "" : "grow"}>
            {t.later}
          </Button>
        </div>
      </div>
    </div>
  );
}
