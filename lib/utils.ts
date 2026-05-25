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
  process.env.NEXT_PUBLIC_SITE_URL || "https://ilovesubtile.vercel.app"
).replace(/\/$/, "");

/** Supabase project URL — exposed publicly via NEXT_PUBLIC_*. */
export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";

/** Build the URL of a Supabase Edge Function. */
export function edgeFnUrl(name: string, query?: Record<string, string>) {
  const base = `${SUPABASE_URL}/functions/v1/${name}`;
  if (!query) return base;
  const qs = new URLSearchParams(query).toString();
  return qs ? `${base}?${qs}` : base;
}
