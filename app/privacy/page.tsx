import type { Metadata } from "next";
import { SITE_URL } from "@/lib/utils";
import { LOCALES, HREFLANG_PREFIX } from "@/lib/seo";
import { LegalRender } from "@/lib/legal/render";
import { PRIVACY_EN } from "@/lib/legal/privacy-en";

// English Privacy Policy. The canonical source is lib/legal/privacy-en.ts —
// translations are derived from it by scripts/translate-legal.mjs and live
// in lib/legal/legal-translations.generated.ts.

const langAlts: Record<string, string> = {};
for (const l of LOCALES) langAlts[l] = `${SITE_URL}${HREFLANG_PREFIX[l]}/privacy`;
langAlts["x-default"] = `${SITE_URL}/privacy`;

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Konvertools handles your data: nothing is stored, browser-only tools never upload anything, server tools delete files immediately, GDPR-compliant rights.",
  alternates: { canonical: "/privacy", languages: langAlts },
};

export default function Page() {
  return <LegalRender doc={PRIVACY_EN} slug="privacy" />;
}
