import { type Locale } from "@/lib/i18n/locales";

/**
 * Labels for the "where this tool runs" badge on tool cards. Browser tools are
 * private (the file never leaves the device) and free; server/AI tools run on
 * our infrastructure (and may use Mistral). English is the base + fallback for
 * any locale not yet translated here (same degradation as plan-compare / legal).
 */
export type RunsOnStrings = { browser: string; server: string };

const en: RunsOnStrings = { browser: "In your browser", server: "On our servers" };
const fr: RunsOnStrings = { browser: "Dans votre navigateur", server: "Sur nos serveurs" };

const TABLE: Partial<Record<Locale, RunsOnStrings>> = { en, fr };

export function getRunsOn(locale: Locale): RunsOnStrings {
  return TABLE[locale] ?? en;
}

/** Where a tool executes, derived from its `kind`. client + ffmpeg run entirely
 *  in the browser (private, free); edge + ai run server-side. */
export function runsOnKind(kind: "client" | "edge" | "ffmpeg" | "ai"): "browser" | "server" {
  return kind === "client" || kind === "ffmpeg" ? "browser" : "server";
}
