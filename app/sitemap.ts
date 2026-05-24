import type { MetadataRoute } from "next";
import { TOOLS, ALTERNATIVES } from "@/lib/tools-config";
import { SITE_URL } from "@/lib/utils";
import { LOCALES, HREFLANG_PREFIX } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  const buildAlternates = (path: string) => ({
    languages: Object.fromEntries(
      LOCALES.map((l) => [l, `${SITE_URL}${HREFLANG_PREFIX[l]}${path}`]),
    ),
  });

  entries.push({
    url: `${SITE_URL}/`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 1,
    alternates: buildAlternates("/"),
  });

  for (const t of TOOLS) {
    entries.push({
      url: `${SITE_URL}/${t.slug}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: t.phase === 1 ? 0.9 : 0.7,
      alternates: buildAlternates(`/${t.slug}`),
    });
  }

  for (const a of ALTERNATIVES) {
    entries.push({
      url: `${SITE_URL}/${a.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }

  for (const p of ["/pricing", "/api", "/privacy", "/terms"]) {
    entries.push({
      url: `${SITE_URL}${p}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    });
  }

  return entries;
}
