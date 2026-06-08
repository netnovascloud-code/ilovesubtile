"use client";

import { useEffect } from "react";
import Link from "next/link";
import { X, FileWarning } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/hooks/useLocale";
import { useUser } from "@/hooks/useUser";
import { localePath } from "@/lib/i18n/locales";
import { getQuotaModal, interp } from "@/lib/i18n/quota-modal";

export type FileTooLargeReason = { size: string; limitMb: number };

/** Modal shown when a dropped file exceeds the plan's size limit (Part 6). */
export function FileTooLargeModal({ reason, onClose }: { reason: FileTooLargeReason | null; onClose: () => void }) {
  const locale = useLocale();
  const t = getQuotaModal(locale);
  const { user } = useUser();

  useEffect(() => {
    if (!reason) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [reason, onClose]);

  if (!reason) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="file-too-large-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink-900/40 px-4 py-6"
      onClick={onClose}
    >
      <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <button aria-label="Close" onClick={onClose} className="absolute right-3 top-3 rounded p-1 text-ink-400 hover:bg-ink-50 hover:text-ink-700">
          <X className="h-4 w-4" />
        </button>
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-amber-50 text-amber-600">
          <FileWarning className="h-5 w-5" />
        </div>
        <h2 id="file-too-large-title" className="mt-3 text-lg font-semibold text-ink-900">{t.fileTooLargeTitle}</h2>
        <p className="mt-2 text-sm text-ink-600">{interp(t.fileTooLargeBody, { size: reason.size, limit: reason.limitMb })}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          <Link href={user ? localePath(locale, "pricing") : "/login"} className="grow">
            <Button className="w-full">{t.fileTooLargeUpgrade}</Button>
          </Link>
          <Button variant="outline" onClick={onClose}>{t.later}</Button>
        </div>
      </div>
    </div>
  );
}
