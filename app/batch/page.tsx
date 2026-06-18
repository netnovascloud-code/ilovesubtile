import type { Metadata } from "next";
import { BatchTabs } from "@/components/tools/clients/BatchTabs";
import { ProGate } from "@/components/billing/ProGate";
import { getBatch } from "@/lib/i18n/page-batch";
import { SITE_URL } from "@/lib/utils";
import { LOCALES, HREFLANG_PREFIX } from "@/lib/seo";

const langs = Object.fromEntries(LOCALES.map((l) => [l, `${SITE_URL}${HREFLANG_PREFIX[l]}/batch`]));
langs["x-default"] = `${SITE_URL}/batch`;

const en = getBatch("en");

export const metadata: Metadata = {
  title: en.meta.title,
  description: en.meta.description,
  alternates: { canonical: "/batch", languages: langs },
};

export default function Page() {
  const t = getBatch("en");
  return (
    <section className="bg-surface">
      <div className="container py-10 md:py-14">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight text-ink-900 md:text-4xl">{t.hero.title}</h1>
          <p className="mt-3 text-ink-500">{t.hero.lead}</p>
        </div>
        <div className="mx-auto mt-8 max-w-5xl">
          <ProGate>
            <div className="rounded-2xl border border-ink-100 bg-white p-5 shadow-card md:p-7">
              <BatchTabs locale="en" />
            </div>
          </ProGate>
        </div>
      </div>
    </section>
  );
}
