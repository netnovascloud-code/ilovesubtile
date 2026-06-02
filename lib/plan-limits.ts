// Canonical per-plan file-size limits — single source of truth, modelled on
// iLovePDF / iLoveIMG. Free is intentionally generous (25 MB everywhere
// except subtitles and video where the category demands different defaults).
//
// Pure-client tools (no upload to the server) declare `freeMaxMb: 0` in
// tools-config.ts and ignore this table — they're only limited by available
// browser memory. The UI surfaces the soft hint below for those too.
//
// The Konvertools API gateway enforces the per-plan cap server-side
// (supabase/functions/api-gateway/index.ts) — these UI values mirror it.

import type { Plan } from "@/lib/ai-quotas";

/** Hard per-plan upload cap (MB) used by the API gateway across every tool. */
export const PLAN_FILE_MB: Record<Plan, number> = {
  free: 25,
  pro: 500,
  business: 2048,
};

/** Per-accepted-file-type free cap (MB). The rule we apply across tools:
 *  decide by the FILE TYPE the tool actually accepts, not the category, so a
 *  "subtitle generator" that takes video gets the video cap, not the 10 MB
 *  text cap. Numbers are benchmarked against iLovePDF (100 MB docs / no
 *  audio-video), iLoveIMG (~30 MB images), Online-Convert (100 MB any),
 *  Veed (250 MB video) — sitting in the generous-but-not-CloudConvert band. */
export const FREE_MB_BY_TYPE = {
  video: 200,
  audio: 100,
  image: 25,
  document: 25,
  archive: 25,
  subtitle: 10,
  text: 5,
} as const;

/** Estimated max processing time (seconds) the UI quotes per plan. Used in
 *  pricing/feature copy so users see the same numbers everywhere. */
export const PLAN_TIME_SEC: Record<Plan, number> = {
  free: 90,    // matches the "30-90 seconds" UI hint
  pro: 300,
  business: 900,
};

export function planFileMb(plan: Plan): number {
  return PLAN_FILE_MB[plan];
}
