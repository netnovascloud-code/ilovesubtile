// Canonical per-plan file-size limits — single source of truth, modelled on
// iLovePDF / iLoveIMG. Free is intentionally generous (25 MB everywhere
// except subtitles and video where the category demands different defaults).
//
// Pure-client tools (no upload to the server) declare `freeMaxMb: 0` in
// tools-config.ts and ignore this table — they're only limited by available
// browser memory. The UI surfaces the soft hint below for those too.
//
// The server-assisted edge functions enforce the per-plan cap server-side;
// these UI values mirror what they accept.

import type { Plan } from "@/lib/ai-quotas";

/** Hard per-plan upload cap (MB) across every server-assisted tool.
 *  KONVER pricing: Free 20 MB · Pro 1 GB · Business 5 GB. */
export const PLAN_FILE_MB: Record<Plan, number> = {
  free: 20,
  pro: 1024,
  business: 5120,
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

/** Per-plan VIDEO caps — two dimensions, both enforced (the stricter one wins).
 *  Weight in MB, duration in seconds. KONVER: Free 200 MB / 3 min · Pro 1 GB /
 *  30 min · Business 5 GB / 3 h. These are the canonical defaults the UI gates
 *  on; the authoritative server path (when a video tool runs server-side) may
 *  override them from billing_config so they can be tuned without a redeploy. */
export const PLAN_VIDEO_MAX_MB: Record<Plan, number> = {
  free: 200,
  pro: 1024,
  business: 5120,
};
export const PLAN_VIDEO_MAX_SEC: Record<Plan, number> = {
  free: 180,    // 3 minutes
  pro: 1800,    // 30 minutes
  business: 10800, // 3 hours
};

export type VideoLimitCheck =
  | { ok: true }
  | { ok: false; kind: "weight"; limitMb: number; limitSec: number }
  | { ok: false; kind: "duration"; limitMb: number; limitSec: number };

/** Validate a video against the caller's plan on BOTH weight and duration.
 *  The first limit exceeded (weight checked first, then duration) is reported so
 *  the UI can explain exactly which one blocked. `seconds` may be null when the
 *  duration could not be read — in that case only the weight cap is enforced. */
export function checkVideoLimits(plan: Plan, bytes: number, seconds: number | null): VideoLimitCheck {
  const limitMb = PLAN_VIDEO_MAX_MB[plan];
  const limitSec = PLAN_VIDEO_MAX_SEC[plan];
  if (bytes > limitMb * 1024 * 1024) return { ok: false, kind: "weight", limitMb, limitSec };
  if (seconds != null && Number.isFinite(seconds) && seconds > limitSec) {
    return { ok: false, kind: "duration", limitMb, limitSec };
  }
  return { ok: true };
}
