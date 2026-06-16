import type { Metadata } from "next";
import { SITE_URL } from "@/lib/utils";
import { LOCALES, HREFLANG_PREFIX } from "@/lib/seo";
import { LegalRender } from "@/lib/legal/render";
import { LEGAL_NOTICE_EN } from "@/lib/legal/legal-notice-en";

const langAlts: Record<string, string> = {};
for (const l of LOCALES) langAlts[l] = `${SITE_URL}${HREFLANG_PREFIX[l]}/legal-notice`;
langAlts["x-default"] = `${SITE_URL}/legal-notice`;

export const metadata: Metadata = {
  title: "Legal Notice",
  description: "Publisher, registration, hosting and legal information for Konvertools.",
  alternates: { canonical: "/legal-notice", languages: langAlts },
};

export default function Page() {
  return <LegalRender doc={LEGAL_NOTICE_EN} />;
}
