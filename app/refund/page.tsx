import type { Metadata } from "next";
import { SITE_URL } from "@/lib/utils";
import { LOCALES, HREFLANG_PREFIX } from "@/lib/seo";
import { LegalRender } from "@/lib/legal/render";
import { REFUND_EN } from "@/lib/legal/refund-en";

const langAlts: Record<string, string> = {};
for (const l of LOCALES) langAlts[l] = `${SITE_URL}${HREFLANG_PREFIX[l]}/refund`;
langAlts["x-default"] = `${SITE_URL}/refund`;

export const metadata: Metadata = {
  title: "Refund Policy",
  description: "When and how you can get a refund on Konvertools. Payments and refunds are handled by Paddle (Merchant of Record).",
  alternates: { canonical: "/refund", languages: langAlts },
};

export default function Page() {
  return <LegalRender doc={REFUND_EN} slug="refund" />;
}
