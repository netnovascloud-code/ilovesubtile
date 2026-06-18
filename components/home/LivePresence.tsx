"use client";

import { useEffect, useState } from "react";
import { getSupabaseBrowser } from "@/lib/supabase/client";
import { type Locale } from "@/lib/i18n/locales";
import { getLivePresence } from "@/lib/i18n/live-presence";

/**
 * Live "visitors online" counter, backed by a Supabase Realtime presence
 * channel — no database, no polling, no invented numbers. Every open tab joins
 * the shared "presence:site" channel with a random key; the count is the number
 * of distinct keys currently present. Renders nothing until presence resolves
 * (and never shows 0), so it degrades silently if Realtime is unreachable.
 */
export function LivePresence({ locale }: { locale: Locale }) {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    let sb: ReturnType<typeof getSupabaseBrowser>;
    try { sb = getSupabaseBrowser(); } catch { return; }
    const key = Math.random().toString(36).slice(2);
    const ch = sb.channel("presence:site", { config: { presence: { key } } });
    ch
      .on("presence", { event: "sync" }, () => {
        setCount(Object.keys(ch.presenceState()).length);
      })
      .subscribe((status) => {
        if (status === "SUBSCRIBED") ch.track({ at: Date.now() });
      });
    return () => { sb.removeChannel(ch); };
  }, []);

  if (count == null || count < 1) return null;
  const s = getLivePresence(locale);

  return (
    <span className="inline-flex items-center gap-2 text-sm text-ink-500">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
      </span>
      <span className="tabular-nums">
        <strong className="font-semibold text-ink-700">{count.toLocaleString(locale)}</strong> {s.online}
      </span>
    </span>
  );
}
