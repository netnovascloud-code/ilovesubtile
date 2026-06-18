"use client";

import { useEffect } from "react";
import { getSupabaseBrowser } from "@/lib/supabase/client";

/**
 * Counts a real conversion whenever a user downloads a converted file — across
 * ALL tools, with no per-tool wiring. A single delegated, capture-phase click
 * listener catches clicks on any `<a download>` in the document: 49+ tools
 * render such an anchor inline, and the shared downloadBlob() helper appends one
 * to <body> before clicking, so this one listener covers them. Fire-and-forget
 * bump to the public site_counters; debounced so a single action can't
 * double-count. Mounted once, globally, in the root layout.
 */
export function ConversionTracker() {
  useEffect(() => {
    let last = 0;
    function onClick(e: MouseEvent) {
      const target = e.target as HTMLElement | null;
      if (!target?.closest?.("a[download]")) return;
      const now = Date.now();
      if (now - last < 1000) return; // collapse rapid double-fires into one
      last = now;
      try { getSupabaseBrowser().rpc("bump_conversions", { p_n: 1 }); } catch { /* best-effort */ }
    }
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);
  return null;
}
