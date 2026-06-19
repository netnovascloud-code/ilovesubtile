import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatBytes(bytes: number, decimals = 1) {
  if (!Number.isFinite(bytes) || bytes <= 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.min(Math.floor(Math.log(bytes) / Math.log(k)), sizes.length - 1);
  return `${(bytes / Math.pow(k, i)).toFixed(decimals)} ${sizes[i]}`;
}

/**
 * Production site URL. Used for canonical URLs, OG images, sitemap and
 * hreflang. Reads NEXT_PUBLIC_SITE_URL when set, otherwise falls back to
 * the live deployment domain.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://konvertools.com"
).replace(/\/$/, "");

/** Supabase project URL — exposed publicly via NEXT_PUBLIC_*. */
export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";

/**
 * Returns `raw` only if it is a safe same-origin, root-relative path; otherwise
 * `fallback`. Single source of truth for every post-auth / post-checkout
 * redirect so the validation can't drift between login, register and the OAuth
 * callback.
 *
 * Rejects:
 *  - missing / over-long values (phishing payloads are usually long)
 *  - anything not starting with "/" (absolute URLs, `javascript:`, `https:` …)
 *  - protocol-relative `//host` AND the backslash trick `/\host` — browsers
 *    normalise `\` to `/`, so `/\evil.com` navigates off-site just like
 *    `//evil.com`. This is the gap that made the old per-page check unsafe.
 */
export function safeInternalPath(raw: string | null | undefined, fallback = "/dashboard"): string {
  if (!raw || raw.length > 512) return fallback;
  if (raw[0] !== "/") return fallback;
  if (raw[1] === "/" || raw[1] === "\\") return fallback;
  return raw;
}

/** Build the URL of a Supabase Edge Function. */
export function edgeFnUrl(name: string, query?: Record<string, string>) {
  const base = `${SUPABASE_URL}/functions/v1/${name}`;
  if (!query) return base;
  const qs = new URLSearchParams(query).toString();
  return qs ? `${base}?${qs}` : base;
}

/**
 * Return a filename unique within `used` (which it mutates), inserting " (n)"
 * before the extension on collision: "a.webp" → "a (2).webp" → "a (3).webp".
 *
 * Batch tools derive each output name from the input name, so two inputs that
 * share a name (e.g. two "photo.png") would otherwise produce the same ZIP
 * entry and silently overwrite each other — the user would get back fewer files
 * than they put in. Run every name through this before adding it to a JSZip.
 */
export function uniqueFilename(name: string, used: Set<string>): string {
  if (!used.has(name)) {
    used.add(name);
    return name;
  }
  const dot = name.lastIndexOf(".");
  const base = dot > 0 ? name.slice(0, dot) : name;
  const ext = dot > 0 ? name.slice(dot) : "";
  let n = 2;
  let candidate = `${base} (${n})${ext}`;
  while (used.has(candidate)) candidate = `${base} (${++n})${ext}`;
  used.add(candidate);
  return candidate;
}

