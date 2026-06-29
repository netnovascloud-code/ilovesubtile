import type { MetadataRoute } from "next";
import { TOOLS, ALTERNATIVES, CATEGORIES } from "@/lib/tools-config";
import { EXTRA_ALTERNATIVES } from "@/lib/alternatives-extra";
import { SECTOR_IDS } from "@/lib/sectors";
import { VS_IDS } from "@/lib/vs";
import { HOWTO_IDS } from "@/lib/howto";
import { SITE_URL } from "@/lib/utils";
import { LOCALES, HREFLANG_PREFIX } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  // For the homepage (path "/") the bare root keeps its slash but localized
  // homes must drop it (`/fr` not `/fr/`) to match trailingSlash:false; for any
  // other path the prefix + path already yields a non-trailing-slash URL.
  const altsFor = (path: string) => ({
    languages: Object.fromEntries(
      LOCALES.map((l) => [
        l,
        path === "/" ? `${SITE_URL}${HREFLANG_PREFIX[l] || "/"}` : `${SITE_URL}${HREFLANG_PREFIX[l]}${path}`,
      ]),
    ),
  });

  // Homepage — one entry per locale, each pointing to itself with full hreflang.
  for (const loc of LOCALES) {
    entries.push({
      url: `${SITE_URL}${HREFLANG_PREFIX[loc] || "/"}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: loc === "en" ? 1 : 0.9,
      alternates: altsFor("/"),
    });
  }

  // Tool pages — one entry per locale × tool.
  for (const tool of TOOLS) {
    for (const loc of LOCALES) {
      entries.push({
        url: `${SITE_URL}${HREFLANG_PREFIX[loc]}/${tool.slug}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: tool.phase === 1 ? (loc === "en" ? 0.95 : 0.85) : 0.7,
        alternates: altsFor(`/${tool.slug}`),
      });
    }
  }

  // Category landing pages — now localised: one entry per locale × category,
  // each with full hreflang alternates.
  for (const c of CATEGORIES) {
    for (const loc of LOCALES) {
      entries.push({
        url: `${SITE_URL}${HREFLANG_PREFIX[loc]}/${c.id}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.7,
        alternates: altsFor(`/${c.id}`),
      });
    }
  }

  // Sector landing pages — English only.
  for (const s of SECTOR_IDS) {
    entries.push({
      url: `${SITE_URL}/for/${s}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }

  // "Konvertools vs <competitor>" pages — English only, high-intent.
  for (const v of VS_IDS) {
    entries.push({
      url: `${SITE_URL}/vs/${v}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  // "How to …" guides — English only.
  for (const g of HOWTO_IDS) {
    entries.push({
      url: `${SITE_URL}/how-to/${g}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }

  // Pricing — one entry per locale.
  for (const loc of LOCALES) {
    entries.push({
      url: `${SITE_URL}${HREFLANG_PREFIX[loc]}/pricing`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
      alternates: altsFor("/pricing"),
    });
  }

  // Competitor pages — English only.
  for (const a of ALTERNATIVES) {
    entries.push({
      url: `${SITE_URL}/${a.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }

  // Extra competitor pages live under /alternatives/<slug> — English only.
  for (const a of EXTRA_ALTERNATIVES) {
    entries.push({
      url: `${SITE_URL}/alternatives/${a.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }

  // Other top-level pages — English only.
  for (const p of ["/api", "/translator", "/rephraser", "/ai-humanizer", "/batch", "/workflow", "/privacy", "/terms", "/refund"]) {
    entries.push({
      url: `${SITE_URL}${p}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    });
  }

  // Legal pages — locale variants with proper hreflang. Native translations
  // load when ready; until then the route serves the English source with a
  // translation-in-progress notice.
  for (const p of ["/privacy", "/terms", "/refund"]) {
    for (const loc of LOCALES) {
      if (loc === "en") continue;
      entries.push({
        url: `${SITE_URL}${HREFLANG_PREFIX[loc]}${p}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.4,
        alternates: altsFor(p),
      });
    }
  }

  return entries;
}
