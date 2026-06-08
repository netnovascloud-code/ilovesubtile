import type { Metadata } from "next";
import { WorkflowBuilderClient } from "@/components/tools/clients/WorkflowBuilderClient";
import { ProGate } from "@/components/billing/ProGate";
import { SITE_URL } from "@/lib/utils";
import { LOCALES, HREFLANG_PREFIX } from "@/lib/seo";

const langs = Object.fromEntries(LOCALES.map((l) => [l, `${SITE_URL}${HREFLANG_PREFIX[l]}/workflow`]));
langs["x-default"] = `${SITE_URL}/workflow`;

export const metadata: Metadata = {
  title: "Workflow Builder — Chain Conversions in One Click",
  description: "Build a pipeline of image conversions: resize, convert format, rotate, watermark, embed in PDF — up to 5 steps, all in your browser.",
  alternates: { canonical: "/workflow", languages: langs },
};

export default function Page() {
  return (
    <section className="bg-surface">
      <div className="container py-10 md:py-14">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight text-ink-900 md:text-4xl">Workflow Builder</h1>
          <p className="mt-3 text-ink-500">
            Chain up to 5 conversion steps for a single image — resize, convert, rotate, watermark, embed in PDF. Reorder, run, download.
            Everything happens in your browser.
          </p>
        </div>
        <div className="mx-auto mt-8 max-w-5xl">
          <ProGate>
            <div className="rounded-2xl border border-ink-100 bg-white p-5 shadow-card md:p-7">
              <WorkflowBuilderClient />
            </div>
          </ProGate>
        </div>
      </div>
    </section>
  );
}
