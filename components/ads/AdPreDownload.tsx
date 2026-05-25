"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { AdSlot } from "@/components/ads/AdSlot";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/hooks/useLocale";
import { getChrome } from "@/lib/i18n/chrome";

/**
 * 5-second interstitial with a countdown shown before a download starts
 * (free users only — callers gate on useShowAds). After the countdown,
 * or once the user clicks the now-enabled button, onComplete() fires.
 */
export function AdPreDownload({
  onComplete,
  onCancel,
}: {
  onComplete: () => void;
  onCancel: () => void;
}) {
  const [seconds, setSeconds] = useState(5);
  const locale = useLocale();
  const chrome = getChrome(locale);

  useEffect(() => {
    if (seconds <= 0) return;
    const id = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(id);
  }, [seconds]);

  const ready = seconds <= 0;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-ink-900/60 p-4" role="dialog" aria-modal="true">
      <div className="w-full max-w-md rounded-lg border border-ink-100 bg-white p-6 shadow-card">
        <div className="flex items-center justify-between">
          <div className="text-xs uppercase tracking-wide text-ink-300">
            {chrome.processing.ad}
          </div>
          <button
            aria-label={chrome.adblock.dismiss}
            onClick={onCancel}
            className="rounded p-1 text-ink-400 hover:bg-ink-50 hover:text-ink-700"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-3">
          <AdSlot slot="pre-download" />
        </div>

        <Button className="mt-5 w-full" disabled={!ready} onClick={onComplete}>
          {ready ? chrome.result.download : `${chrome.result.download} (${seconds})`}
        </Button>
      </div>
    </div>
  );
}
