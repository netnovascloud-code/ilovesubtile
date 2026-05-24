import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ToolCard } from "@/components/tools/ToolCard";
import { TOOLS, type ALTERNATIVES } from "@/lib/tools-config";

type Alt = (typeof ALTERNATIVES)[number];

export function CompetitorPage({ alt }: { alt: Alt }) {
  const featured = TOOLS.filter((t) => t.phase === 1).slice(0, 6);

  return (
    <>
      <section className="border-b border-ink-100 bg-white">
        <div className="container py-20 text-center">
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

      <section className="bg-surface">
        <div className="container py-16">
          <h2 className="text-2xl font-semibold text-ink-900">
            Why creators switch from {alt.competitor} to iLoveSubtitle
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

      <section className="border-t border-ink-100 bg-white">
        <div className="container py-16">
          <h2 className="text-2xl font-semibold text-ink-900">Most-used tools</h2>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((t) => (
              <ToolCard key={t.slug} tool={t} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
