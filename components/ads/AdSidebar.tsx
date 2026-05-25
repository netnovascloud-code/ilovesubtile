"use client";

import { AdSlot } from "@/components/ads/AdSlot";
import { useShowAds } from "@/hooks/useShowAds";
import { useLocale } from "@/hooks/useLocale";
import { getChrome } from "@/lib/i18n/chrome";

/** Sidebar rectangle on the result page, desktop only. Hidden for Pro/Business. */
export function AdSidebar() {
  const show = useShowAds();
  const locale = useLocale();
  if (!show) return null;
  return (
    <aside className="hidden lg:block">
      <div className="mb-2 text-[10px] uppercase tracking-wide text-ink-300">
        {getChrome(locale).processing.ad}
      </div>
      <AdSlot slot="sidebar" />
    </aside>
  );
}
