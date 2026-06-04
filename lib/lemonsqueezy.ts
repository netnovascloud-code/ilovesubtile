// Client-side helper for the Lemon Squeezy checkout overlay (lemon.js).
//
// lemon.js is injected once by <LemonSqueezyLoader/> in the root layout. It
// exposes window.LemonSqueezy after window.createLemonSqueezy() runs. We open
// embed-ready checkout URLs (the edge function sets checkout_options.embed:true)
// in the hosted overlay so the buyer never leaves the site.

type LemonSqueezyGlobal = {
  Setup?: (opts: { eventHandler?: (e: { event: string }) => void }) => void;
  Url?: { Open?: (url: string) => void };
  Loader?: { Show?: () => void; Hide?: () => void };
};

declare global {
  interface Window {
    createLemonSqueezy?: () => void;
    LemonSqueezy?: LemonSqueezyGlobal;
  }
}

/** Resolves once window.LemonSqueezy is available (lemon.js loaded + init). */
async function ensureLemon(timeoutMs = 8000): Promise<LemonSqueezyGlobal | null> {
  if (typeof window === "undefined") return null;
  const start = Date.now();
  // createLemonSqueezy initialises the LemonSqueezy global; safe to call again.
  while (Date.now() - start < timeoutMs) {
    if (window.LemonSqueezy?.Url?.Open) return window.LemonSqueezy;
    window.createLemonSqueezy?.();
    if (window.LemonSqueezy?.Url?.Open) return window.LemonSqueezy;
    await new Promise((r) => setTimeout(r, 120));
  }
  return window.LemonSqueezy ?? null;
}

/**
 * Open a Lemon Squeezy checkout URL in the overlay. Falls back to a full-page
 * redirect if lemon.js hasn't loaded (e.g. blocked by an extension), so a sale
 * is never lost. `onClose` fires when the buyer dismisses the overlay.
 */
export async function openCheckoutOverlay(url: string, onSuccess?: () => void): Promise<void> {
  const ls = await ensureLemon();
  if (!ls?.Url?.Open) {
    window.location.href = url;
    return;
  }
  if (onSuccess) {
    ls.Setup?.({
      eventHandler: (e) => {
        if (e.event === "Checkout.Success") onSuccess();
      },
    });
  }
  ls.Url.Open(url);
}
