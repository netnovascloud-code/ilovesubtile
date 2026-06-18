import type { Metadata } from "next";
import { SITE_URL } from "@/lib/utils";
import { LOCALES, HREFLANG_PREFIX } from "@/lib/seo";
import { LegalRender } from "@/lib/legal/render";
import { TERMS_EN } from "@/lib/legal/terms-en";

// English Terms of Service. The canonical source is lib/legal/terms-en.ts —
// translations are derived from it by scripts/translate-legal.mjs and live
// in lib/legal/legal-translations.generated.ts.

const langAlts: Record<string, string> = {};
for (const l of LOCALES) langAlts[l] = `${SITE_URL}${HREFLANG_PREFIX[l]}/terms`;
langAlts["x-default"] = `${SITE_URL}/terms`;

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The legal terms governing use of Konvertools — service description, limitation of liability, acceptable use, subscriptions, API, intellectual property and French jurisdiction.",
  alternates: { canonical: "/terms", languages: langAlts },
};

export default function Page() {
  return <LegalRender doc={TERMS_EN} slug="terms" />;
}
