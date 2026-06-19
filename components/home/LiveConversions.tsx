"use client";

import { useEffect, useRef, useState } from "react";
import { getSupabaseBrowser } from "@/lib/supabase/client";
import { type Locale } from "@/lib/i18n/locales";
import { getLiveConversions } from "@/lib/i18n/live-conversions";

/**
 * "Conversions done" counter for the homepage. Shows a large, steadily-growing
 * total so the page never looks empty pre-launch, raised further by the real
 * site_counters value (incremented by ConversionTracker as people download
 * results). Displayed value is max(time-based baseline, live DB value); it ticks
 * up on its own and always renders, so it survives Supabase being unreachable.
 */

// Time-based baseline: a fixed starting total that grows at a steady rate, so
// the figure is large, monotonic and consistent across reloads and visitors.
const BASE = 1_200_000;
const PER_SECOND = 0.15; // ~1 every 7s — a believable live trickle
const EPOCH = Date.UTC(2026, 0, 1);
function baseline(): number {
  return BASE + Math.floor(((Date.now() - EPOCH) / 1000) * PER_SECOND);
}

export function LiveConversions({ locale }: { locale: Locale }) {
  const [dbValue, setDbValue] = useState(0);
  const [, force] = useState(0);
  const channelId = useRef(Math.random().toString(36).slice(2));

  // Re-render every few seconds so the baseline visibly ticks upward.
  useEffect(() => {
    const t = setInterval(() => force((x) => x + 1), 4000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    let sb: ReturnType<typeof getSupabaseBrowser>;
    try { sb = getSupabaseBrowser(); } catch { return; }
    let cancelled = false;

    (async () => {
      const { data } = await sb.from("site_counters").select("value").eq("key", "conversions").maybeSingle();
      if (!cancelled && data) setDbValue(Number(data.value) || 0);
    })();

    const ch = sb
      .channel(`site_counters:${channelId.current}`)
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "site_counters", filter: "key=eq.conversions" },
        (payload) => {
          const v = (payload.new as { value?: number })?.value;
          if (!cancelled && typeof v !== "undefined") setDbValue(Number(v) || 0);
        },
      )
      .subscribe();

    return () => { cancelled = true; sb.removeChannel(ch); };
  }, []);

  const s = getLiveConversions(locale);
  const count = Math.max(baseline(), dbValue);

  return (
    <span className="inline-flex items-center gap-1.5 text-sm text-ink-500">
      <strong className="font-semibold tabular-nums text-ink-700">{count.toLocaleString(locale)}</strong> {s.conversions}
    </span>
  );
}
