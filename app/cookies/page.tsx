import type { Metadata } from "next";
import { SITE_URL } from "@/lib/utils";
import { LOCALES, HREFLANG_PREFIX } from "@/lib/seo";
import { LegalRender } from "@/lib/legal/render";
import { COOKIES_EN } from "@/lib/legal/cookies-en";

// English Cookie Policy. Canonical source is lib/legal/cookies-en.ts;
// translations live in lib/legal/cookies-translations.ts.

const langAlts: Record<string, string> = {};
for (const l of LOCALES) langAlts[l] = `${SITE_URL}${HREFLANG_PREFIX[l]}/cookies`;
langAlts["x-default"] = `${SITE_URL}/cookies`;

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "The cookies and browser storage Konvertools uses, why, and how to control them.",
  alternates: { canonical: "/cookies", languages: langAlts },
};

export default function Page() {
  return <LegalRender doc={COOKIES_EN} slug="cookies" />;
}
