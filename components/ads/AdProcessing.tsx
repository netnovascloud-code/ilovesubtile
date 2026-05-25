"use client";

import { AdSlot } from "@/components/ads/AdSlot";
import { useShowAds } from "@/hooks/useShowAds";
import { useLocale } from "@/hooks/useLocale";
import { getChrome } from "@/lib/i18n/chrome";

/** 300×250 / 728×90 rectangle shown during processing. Hidden for Pro/Business. */
export function AdProcessing() {
  const show = useShowAds();
  const locale = useLocale();
  if (!show) return null;
  return (
    <div className="mt-8">
      <div className="mb-2 text-center text-xs uppercase tracking-wide text-ink-300">
        {getChrome(locale).processing.ad}
      </div>
      <AdSlot slot="processing" />
    </div>
  );
}
