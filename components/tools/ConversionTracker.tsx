"use client";

import { useEffect } from "react";
import { getSupabaseBrowser } from "@/lib/supabase/client";

/**
 * Counts a real conversion whenever a user downloads a converted file — across
 * ALL tools, with no per-tool wiring. Mounted once, globally, in the root layout.
 *
 * Two complementary hooks cover every download pattern in the app:
 *  1. A delegated, capture-phase click listener for native clicks on an inline
 *     `<a download>` that's actually rendered in the page.
 *  2. A patch of `HTMLAnchorElement.prototype.click`, because the dominant
 *     pattern (81+ tool clients, incl. the shared downloadBlob helper and e.g.
 *     the JSON formatter's <button>) is `createElement("a") + a.download +
 *     a.click()` on an anchor that is NEVER appended to the DOM — so its click
 *     never bubbles to a document listener. Patching the prototype catches those.
 *
 * Fire-and-forget bump to the public site_counters; debounced so a single action
 * (which may trigger both hooks) is counted once.
 */
export function ConversionTracker() {
  useEffect(() => {
    let last = 0;
    const bump = () => {
      const now = Date.now();
      if (now - last < 800) return; // collapse a single action's double-fire
      last = now;
      try { getSupabaseBrowser().rpc("bump_conversions", { p_n: 1 }); } catch { /* best-effort */ }
    };

    // (1) Native clicks on an inline <a download> in the document.
    const onClick = (e: MouseEvent) => {
      const el = e.target as HTMLElement | null;
      if (el?.closest?.("a[download]")) bump();
    };
    document.addEventListener("click", onClick, true);

    // (2) Programmatic downloads via a (possibly detached) download anchor.
    const proto = HTMLAnchorElement.prototype;
    const original = proto.click;
    proto.click = function (this: HTMLAnchorElement) {
      try { if (this.hasAttribute("download")) bump(); } catch { /* ignore */ }
      return original.apply(this);
    };

    return () => {
      document.removeEventListener("click", onClick, true);
      proto.click = original;
    };
  }, []);

  return null;
}
