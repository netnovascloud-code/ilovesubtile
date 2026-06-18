"use client";

import { useEffect, useRef, useState } from "react";
import { getSupabaseBrowser } from "@/lib/supabase/client";
import { type Locale } from "@/lib/i18n/locales";
import { getLiveConversions } from "@/lib/i18n/live-conversions";

/**
 * Live "conversions done" counter. Reads the public site_counters row on mount,
 * then subscribes to Realtime UPDATEs so the number ticks up as people download
 * results anywhere on the site (incremented by ConversionTracker). Real data,
 * no invented base. Renders nothing until the value resolves (and never 0), so
 * it degrades silently if Supabase is unreachable.
 */
export function LiveConversions({ locale }: { locale: Locale }) {
  const [count, setCount] = useState<number | null>(null);
  const channelId = useRef(Math.random().toString(36).slice(2));

  useEffect(() => {
    let sb: ReturnType<typeof getSupabaseBrowser>;
    try { sb = getSupabaseBrowser(); } catch { return; }
    let cancelled = false;

    (async () => {
      const { data } = await sb.from("site_counters").select("value").eq("key", "conversions").maybeSingle();
      if (!cancelled && data) setCount(Number(data.value) || 0);
    })();

    const ch = sb
      .channel(`site_counters:${channelId.current}`)
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "site_counters", filter: "key=eq.conversions" },
        (payload) => {
          const v = (payload.new as { value?: number })?.value;
          if (!cancelled && typeof v !== "undefined") setCount(Number(v) || 0);
        },
      )
      .subscribe();

    return () => { cancelled = true; sb.removeChannel(ch); };
  }, []);

  if (count == null || count < 1) return null;
  const s = getLiveConversions(locale);

  return (
    <span className="inline-flex items-center gap-1.5 text-sm text-ink-500">
      <strong className="font-semibold tabular-nums text-ink-700">{count.toLocaleString(locale)}</strong> {s.conversions}
    </span>
  );
}
