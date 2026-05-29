import Link from "next/link";
import { Check, ArrowRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ToolCard } from "@/components/tools/ToolCard";
import { TOOLS, type AlternativeDef } from "@/lib/tools-config";

export function CompetitorPage({ alt }: { alt: AlternativeDef }) {
  const featured = TOOLS.filter((t) => t.phase === 1).slice(0, 6);

  // Render an X / Check icon when a comparison cell is a clear no/yes.
  const cell = (value: string, isUs: boolean) => {
    const negative = /^(no|aucun|non)\b/i.test(value);
    return (
      <span className={isUs ? "font-medium text-ink-900" : "text-ink-500"}>
        {negative ? (
          <span className="inline-flex items-center gap-1">
            <X className="h-3.5 w-3.5 text-red-500" /> {value}
          </span>
        ) : isUs ? (
          <span className="inline-flex items-center gap-1">
            <Check className="h-3.5 w-3.5 text-green-600" /> {value}
          </span>
        ) : (
          value
        )}
      </span>
    );
  };

  return (
    <>
      <section className="border-b border-ink-100 bg-white">
        <div className="container py-16 text-center">
          <span className="inline-flex rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700">
            Comparison
          </span>
          <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-semibold tracking-tight text-ink-900 md:text-5xl">
            {alt.title}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-ink-500">{alt.metaDescription}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/subtitle-generator">
              <Button size="lg">
                Try the generator <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/pricing">
              <Button size="lg" variant="outline">
                See pricing
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-ink-100 bg-white">
        <div className="container py-16">
          <h2 className="text-2xl font-semibold text-ink-900">
            Why creators switch from {alt.competitor} to Konver
          </h2>
          <ul className="mt-8 grid gap-4 md:grid-cols-2">
            {alt.bulletPoints.map((b) => (
              <li
                key={b}
                className="flex gap-3 rounded-lg border border-ink-100 bg-white p-5 shadow-card"
              >
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />
                <span className="text-sm text-ink-700">{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-ink-100 bg-surface">
        <div className="container py-16">
          <h2 className="text-2xl font-semibold text-ink-900">
            Konver vs {alt.competitor}
          </h2>
          <div className="mt-8 overflow-x-auto rounded-lg border border-ink-100 bg-white shadow-card">
            <table className="w-full min-w-[560px] text-sm">
              <thead>
                <tr className="border-b border-ink-100 text-left">
                  <th className="px-5 py-3 font-medium text-ink-500">Feature</th>
                  <th className="px-5 py-3 font-semibold text-brand-700">Konver</th>
                  <th className="px-5 py-3 font-medium text-ink-500">{alt.competitor}</th>
                </tr>
              </thead>
              <tbody>
                {alt.comparison.map((row) => (
                  <tr key={row.feature} className="border-b border-ink-50 last:border-0">
                    <td className="px-5 py-3 text-ink-700">{row.feature}</td>
                    <td className="bg-brand-50/30 px-5 py-3">{cell(row.us, true)}</td>
                    <td className="px-5 py-3">{cell(row.them, false)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="border-t border-ink-100 bg-white">
        <div className="container py-16">
          <h2 className="text-2xl font-semibold text-ink-900">Most-used tools on Konver</h2>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((t) => (
              <ToolCard key={t.slug} tool={t} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-ink-100 bg-surface">
        <div className="container py-16">
          <h2 className="text-2xl font-semibold text-ink-900">Frequently asked questions</h2>
          <dl className="mt-8 grid gap-4 md:grid-cols-2">
            {alt.faqs.map((f) => (
              <div key={f.q} className="rounded-lg border border-ink-100 bg-white p-6 shadow-card">
                <dt className="font-semibold text-ink-900">{f.q}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-ink-500">{f.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: alt.faqs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        }}
      />
    </>
  );
}
