import type { Metadata } from "next";
import { TranslatorClient } from "@/components/tools/clients/TranslatorClient";
import { SITE_URL } from "@/lib/utils";
import { LOCALES, HREFLANG_PREFIX } from "@/lib/seo";

const langs = Object.fromEntries(LOCALES.map((l) => [l, `${SITE_URL}${HREFLANG_PREFIX[l]}/translator`]));
langs["x-default"] = `${SITE_URL}/translator`;

export const metadata: Metadata = {
  title: "AI Translator — Translate Text in 30+ Languages",
  description: "Free AI translator with natural, idiomatic results in 30+ languages. Auto language detection, formal/informal register, real-time translation. Your text is never stored.",
  alternates: { canonical: "/translator", languages: langs },
};

export default function Page() {
  return (
    <section className="bg-surface">
      <div className="container py-10 md:py-14">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight text-ink-900 md:text-4xl">AI Translator</h1>
          <p className="mt-3 text-ink-500">Natural, idiomatic translation in 30+ languages — with formal/informal register. Real-time, free, private.</p>
        </div>
        <div className="mx-auto mt-8 max-w-5xl">
          <TranslatorClient />
        </div>
      </div>
    </section>
  );
}
