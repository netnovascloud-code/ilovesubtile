import type { MetadataRoute } from "next";
import { TOOLS, ALTERNATIVES, CATEGORIES } from "@/lib/tools-config";
import { EXTRA_ALTERNATIVES } from "@/lib/alternatives-extra";
import { SECTOR_IDS } from "@/lib/sectors";
import { SITE_URL } from "@/lib/utils";
import { LOCALES, HREFLANG_PREFIX } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  const altsFor = (path: string) => ({
    languages: Object.fromEntries(
      LOCALES.map((l) => [l, `${SITE_URL}${HREFLANG_PREFIX[l]}${path}`]),
    ),
  });

  // Homepage — one entry per locale, each pointing to itself with full hreflang.
  for (const loc of LOCALES) {
    entries.push({
      url: `${SITE_URL}${HREFLANG_PREFIX[loc]}/`,
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

  // Category landing pages — English only (one entry per category).
  for (const c of CATEGORIES) {
    entries.push({
      url: `${SITE_URL}/${c.id}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    });
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
  for (const p of ["/api", "/translator", "/rephraser", "/ai-humanizer", "/batch", "/workflow", "/privacy", "/terms"]) {
    entries.push({
      url: `${SITE_URL}${p}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    });
  }

  return entries;
}
