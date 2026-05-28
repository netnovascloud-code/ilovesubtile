import type { Metadata } from "next";
import { BatchTabs } from "@/components/tools/clients/BatchTabs";
import { SITE_URL } from "@/lib/utils";
import { LOCALES, HREFLANG_PREFIX } from "@/lib/seo";

const langs = Object.fromEntries(LOCALES.map((l) => [l, `${SITE_URL}${HREFLANG_PREFIX[l]}/batch`]));
langs["x-default"] = `${SITE_URL}/batch`;

export const metadata: Metadata = {
  title: "Batch Converter — Process 50 Files at Once",
  description: "Convert up to 50 images (WebP/JPG/PNG) or compress 50 PDFs in one go, then download a ZIP. 100% in-browser.",
  alternates: { canonical: "/batch", languages: langs },
};

export default function Page() {
  return (
    <section className="bg-surface">
      <div className="container py-10 md:py-14">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight text-ink-900 md:text-4xl">Batch Converter</h1>
          <p className="mt-3 text-ink-500">Drop up to 50 files, pick an action — get one ZIP back. Everything happens in your browser.</p>
        </div>
        <div className="mx-auto mt-8 max-w-5xl rounded-2xl border border-ink-100 bg-white p-5 shadow-card md:p-7">
          <BatchTabs />
        </div>
      </div>
    </section>
  );
}
