import type { Metadata } from "next";
import { PricingTiles } from "@/components/billing/PricingTiles";
import { PlanComparisonTable } from "@/components/billing/PlanComparisonTable";
import { getStrings } from "@/lib/i18n/strings";
import { getToolUi } from "@/lib/i18n/tool-ui";
import { getPlanFeatures } from "@/lib/i18n/plan-features";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Free forever for browser tools. Pro at €25/month for unlimited AI, Workflow Builder and batch. Business at €79/month for teams, with higher quotas and priority support.",
  alternates: { canonical: "/pricing" },
};

export default function PricingPage() {
  const ui = getStrings("en").pricing;
  const intervalLabels = getToolUi("en").pricing;
  return (
    <section className="bg-white">
      <div className="container py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-semibold tracking-tight text-ink-900">{ui.title}</h1>
          <p className="mt-3 text-ink-500">{ui.lead}</p>
        </div>

        <PricingTiles
          strings={{
            mostPopular: ui.mostPopular,
            perMonth: ui.perMonth,
            forever: ui.forever,
            free: ui.free,
            pro: ui.pro,
            business: ui.business,
          }}
          intervalLabels={intervalLabels}
          features={getPlanFeatures("en")}
        />

        <PlanComparisonTable locale="en" />

        <p className="mt-10 text-center text-xs text-ink-400">{ui.footnote}</p>
      </div>
    </section>
  );
}
