import type { Metadata } from "next";
import { RephraserClient } from "@/components/tools/clients/RephraserClient";
import { SITE_URL } from "@/lib/utils";
import { LOCALES, HREFLANG_PREFIX } from "@/lib/seo";

const langs = Object.fromEntries(LOCALES.map((l) => [l, `${SITE_URL}${HREFLANG_PREFIX[l]}/rephraser`]));
langs["x-default"] = `${SITE_URL}/rephraser`;

export const metadata: Metadata = {
  title: "AI Rephraser & Grammar Corrector — Rewrite Text in 8 Styles",
  description: "Correct grammar and spelling with click-to-accept changes, or rephrase your text in 8 different styles. Free, private — your text is never stored.",
  alternates: { canonical: "/rephraser", languages: langs },
};

export default function Page() {
  return (
    <section className="bg-surface">
      <div className="container py-10 md:py-14">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight text-ink-900 md:text-4xl">AI Rephraser & Grammar Checker</h1>
          <p className="mt-3 text-ink-500">Correct your text with click-to-accept suggestions, or rephrase it in 8 different styles — instantly.</p>
        </div>
        <div className="mx-auto mt-8 max-w-5xl rounded-2xl border border-ink-100 bg-white p-5 shadow-card md:p-7">
          <RephraserClient />
        </div>
      </div>
    </section>
  );
}
