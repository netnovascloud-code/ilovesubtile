"use client";

import Script from "next/script";
import { useShowAds } from "@/hooks/useShowAds";

/**
 * Loads the Ezoic standalone script (sa.min.js) ONLY when ads should actually
 * be shown — i.e. ADS_ENABLED is on AND the visitor is on the Free plan
 * (useShowAds encodes both rules). Previously this <Script> lived directly in
 * the root layout and ran for every visitor, including Pro/Business (who are
 * promised an ad-free experience) and even while ADS_ENABLED was false — which
 * still pulled in Ezoic/id5-sync tracking and produced 503 console noise.
 *
 * Keeping the gate here means: no ad/tracking script is injected at all for
 * paying users or when ads are globally disabled.
 */
export function EzoicLoader({ nonce }: { nonce?: string }) {
  const show = useShowAds();
  if (!show) return null;
  return (
    <Script
      id="ezoic-sa"
      src="//www.ezojs.com/ezoic/sa.min.js"
      strategy="afterInteractive"
      async
      nonce={nonce}
    />
  );
}
