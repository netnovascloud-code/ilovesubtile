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
  description: "Publisher, hosting and legal information for Konvertools.",
  alternates: { canonical: "/legal-notice", languages: langAlts },
  // Draft until the publisher's verified details are filled in — don't index
  // a page with placeholder legal data.
  robots: { index: false, follow: true },
};

export default function Page() {
  return (
    <>
      <div className="container max-w-3xl pt-10">
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          ⚠ This legal notice is being finalised. Fields shown in [brackets] are placeholders awaiting the publisher&apos;s verified details.
        </div>
      </div>
      <LegalRender doc={LEGAL_NOTICE_EN} />
    </>
  );
}
