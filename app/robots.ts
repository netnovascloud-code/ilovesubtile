import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/utils";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/auth/", "/dashboard", "/login", "/register", "/billing"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
