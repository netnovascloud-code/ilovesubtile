import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The rules for using iLoveSubtitle.",
  alternates: { canonical: "/terms" },
};

export default function Page() {
  return (
    <article className="container max-w-3xl py-16">
      <h1 className="text-3xl font-semibold tracking-tight text-ink-900">Terms of Service</h1>
      <p className="mt-3 text-sm text-ink-400">Last updated: {new Date().toISOString().slice(0, 10)}</p>

      <section className="prose prose-sm mt-8 max-w-none text-ink-700">
        <h2 className="mt-8 text-lg font-semibold text-ink-900">Using the service</h2>
        <p>
          iLoveSubtitle is provided as-is. Free users have daily quotas; Pro and Business users get
          higher limits per their subscription tier.
        </p>

        <h2 className="mt-8 text-lg font-semibold text-ink-900">Your content</h2>
        <p>
          You retain all rights to files you upload. By using the service, you grant us a temporary
          licence to process them solely to deliver the tool you requested.
        </p>

        <h2 className="mt-8 text-lg font-semibold text-ink-900">Prohibited use</h2>
        <p>
          Don&apos;t use iLoveSubtitle to process content you don&apos;t have rights to, to generate
          illegal content, or to attempt to overwhelm our service.
        </p>

        <h2 className="mt-8 text-lg font-semibold text-ink-900">Billing</h2>
        <p>
          Subscriptions auto-renew until you cancel. Cancellations take effect at the end of the
          current billing period.
        </p>
      </section>
    </article>
  );
}
