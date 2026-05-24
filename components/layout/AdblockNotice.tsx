"use client";

import { useState } from "react";
import { Heart, X } from "lucide-react";
import Link from "next/link";
import { useAdblockDetect } from "@/hooks/useAdblockDetect";

/**
 * Polite AdBlock notice — never blocks the service.
 * Shows AFTER content has rendered, dismissible, never on Pro screens.
 */
export function AdblockNotice() {
  const detected = useAdblockDetect();
  const [dismissed, setDismissed] = useState(false);

  if (!detected || dismissed) return null;

  return (
    <div className="fixed bottom-4 right-4 z-30 max-w-sm rounded-lg border border-ink-100 bg-white p-4 shadow-card">
      <div className="flex items-start gap-3">
        <div className="grid h-8 w-8 shrink-0 place-items-center rounded bg-brand-50 text-brand-600">
          <Heart className="h-4 w-4" />
        </div>
        <div className="flex-1 text-sm">
          <p className="font-medium text-ink-900">iLoveSubtitle is free thanks to ads</p>
          <p className="mt-1 text-ink-500">
            You can disable ads by{" "}
            <Link href="/pricing" className="text-brand-600 underline">
              going Pro at €12/month
            </Link>
            , or by allowing ads on this site.
          </p>
        </div>
        <button
          aria-label="Dismiss"
          onClick={() => setDismissed(true)}
          className="rounded p-1 text-ink-400 hover:bg-ink-50 hover:text-ink-700"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
