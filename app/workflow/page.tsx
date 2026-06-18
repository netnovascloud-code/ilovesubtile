import type { Metadata } from "next";
import { WorkflowBuilderClient } from "@/components/tools/clients/WorkflowBuilderClient";
import { ProGate } from "@/components/billing/ProGate";
import { SITE_URL } from "@/lib/utils";
import { LOCALES, HREFLANG_PREFIX } from "@/lib/seo";
import { getWorkflow } from "@/lib/i18n/page-workflow";

const langs = Object.fromEntries(LOCALES.map((l) => [l, `${SITE_URL}${HREFLANG_PREFIX[l]}/workflow`]));
langs["x-default"] = `${SITE_URL}/workflow`;

const t = getWorkflow("en");

export const metadata: Metadata = {
  title: t.meta.title,
  description: t.meta.description,
  alternates: { canonical: "/workflow", languages: langs },
};

export default function Page() {
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
              <WorkflowBuilderClient locale="en" />
            </div>
          </ProGate>
        </div>
      </div>
    </section>
  );
}
