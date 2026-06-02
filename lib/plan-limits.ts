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

/** Per-category soft hint shown in the UI for free users. Tools may still
 *  declare a tighter `freeMaxMb` — this is just the default category cap. */
export const CATEGORY_FREE_MB: Record<string, number> = {
  subtitles: 10,
  images: 25,
  documents: 25,
  archives: 25,
  developer: 5,
  utilities: 5,
  audio: 50,
  video: 100,
  "text-ai": 5,
};

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
