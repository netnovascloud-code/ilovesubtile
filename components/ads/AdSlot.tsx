"use client";

import { useEffect } from "react";

/** Ezoic placeholder IDs — register these same numbers in the Ezoic dashboard. */
const PLACEHOLDER_ID: Record<"processing" | "sidebar" | "pre-download", number> = {
  processing: 101,
  sidebar: 102,
  "pre-download": 103,
};

const SIZES = {
  processing: "min-h-[250px] min-w-[300px] max-w-[728px]",
  sidebar: "min-h-[600px] w-[300px]",
  "pre-download": "min-h-[280px] w-full max-w-[336px]",
} as const;

declare global {
  interface Window {
    ezstandalone?: { cmd: Array<() => void>; showAds?: (...ids: number[]) => void };
  }
}

/**
 * Ezoic ad placement. Renders the standard `ezoic-pub-ad-placeholder-NNN`
 * div and asks Ezoic to fill it on mount. The dashed box is a dev/empty
 * fallback the ad paints over; the reserved min-height protects CLS.
 */
export function AdSlot({ slot }: { slot: "processing" | "sidebar" | "pre-download" }) {
  const id = PLACEHOLDER_ID[slot];

  useEffect(() => {
    if (typeof window === "undefined") return;
    const ez = (window.ezstandalone = window.ezstandalone || { cmd: [] });
    ez.cmd.push(() => {
      window.ezstandalone?.showAds?.(id);
    });
  }, [id]);

  return (
    <div
      role="complementary"
      aria-label="Advertisement"
      className={`mx-auto grid place-items-center rounded border border-dashed border-ink-200 bg-ink-50 text-xs text-ink-300 ${SIZES[slot]}`}
    >
      <div id={`ezoic-pub-ad-placeholder-${id}`} data-ad-slot={slot} className="w-full" />
    </div>
  );
}
