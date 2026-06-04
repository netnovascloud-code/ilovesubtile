import Script from "next/script";

/**
 * Loads Lemon Squeezy's lemon.js once for the whole app so the checkout overlay
 * is available on the pricing page and the credits store. Stamped with the
 * per-request CSP nonce (see middleware.ts / strict-dynamic) like every other
 * inline/external script. Our openCheckoutOverlay() helper calls
 * createLemonSqueezy() defensively before opening, so no onLoad hook is needed
 * here — this stays a server component.
 */
export function LemonSqueezyLoader({ nonce }: { nonce?: string }) {
  return (
    <Script
      id="lemonsqueezy"
      src="https://app.lemonsqueezy.com/js/lemon.js"
      strategy="afterInteractive"
      nonce={nonce}
    />
  );
}
