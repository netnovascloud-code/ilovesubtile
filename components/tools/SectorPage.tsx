import Link from "next/link";
import { Home, ChevronRight, ArrowRight, Sparkles } from "lucide-react";
import { TOOLS_BY_SLUG } from "@/lib/tools-config";
import { Button } from "@/components/ui/button";
import { ToolGlyph } from "@/components/tools/ToolGlyph";
import type { Sector } from "@/lib/sectors";

export function SectorPage({ sector }: { sector: Sector }) {
  const tools = sector.toolSlugs.map((s) => TOOLS_BY_SLUG[s]).filter(Boolean);

  return (
    <div>
      <section className="border-b border-ink-100 bg-surface">
        <div className="container py-10">
          <nav className="mb-6 flex items-center gap-2 text-sm text-ink-500">
            <Link href="/" className="inline-flex items-center hover:text-ink-900">
              <Home className="mr-1 h-3.5 w-3.5" />
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-ink-300" />
            <span className="text-ink-900">For {sector.id}</span>
          </nav>
          <div className="flex items-start gap-3">
            <Sparkles className="mt-2 h-7 w-7 text-brand-500" />
            <div>
              <h1 className="text-3xl font-semibold tracking-tight text-ink-900 md:text-4xl">{sector.hero}</h1>
              <p className="mt-3 max-w-2xl text-base text-ink-500">{sector.intro}</p>
            </div>
          </div>
        </div>
      </section>

      <main className="container py-12 space-y-12">
        <section>
          <h2 className="text-xl font-semibold text-ink-900">What you get</h2>
          <ul className="mt-6 grid gap-4 md:grid-cols-3">
            {sector.highlights.map((h) => (
              <li key={h.title} className="rounded-lg border border-ink-100 bg-white p-5 shadow-card">
                <h3 className="font-semibold text-ink-900">{h.title}</h3>
                <p className="mt-1.5 text-sm text-ink-500">{h.body}</p>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-ink-900">Tools built for you</h2>
          <p className="mt-1 text-sm text-ink-500">{tools.length} tools, all free, most run right in your browser.</p>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {tools.map((t) => (
              <li key={t.slug}>
                <Link href={`/${t.slug}`} className="group flex items-start gap-3 rounded-lg border border-ink-100 bg-white p-4 shadow-card transition-all hover:-translate-y-0.5 hover:border-brand-300">
                  <div className="shrink-0">
                    <ToolGlyph category={t.category} iconName={(t.icon as { displayName?: string }).displayName ?? "Wrench"} px={40} />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1 font-medium text-ink-900">
                      {t.name}
                      <ArrowRight className="h-3.5 w-3.5 text-brand-500 opacity-0 transition-opacity group-hover:opacity-100" />
                    </div>
                    <div className="mt-0.5 text-sm text-ink-500 line-clamp-2">{t.short}</div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-lg border border-brand-200 bg-brand-50/40 p-6 md:p-8">
          <h2 className="text-2xl font-semibold text-ink-900">Get more, faster.</h2>
          <p className="mt-2 max-w-2xl text-ink-700">
            Pro unlocks unlimited AI runs, batch processing up to 20 files, saved templates, files up to 500 MB and no ads — €9/month.
            Business adds the public REST API and 200 included credits every month — €29/month.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/pricing"><Button>See pricing</Button></Link>
            <Link href="/register"><Button variant="outline">Create free account</Button></Link>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-ink-900">FAQ</h2>
          <dl className="mt-6 grid gap-4 md:grid-cols-2">
            {sector.faq.map((f) => (
              <div key={f.q} className="rounded-lg border border-ink-100 bg-white p-5 shadow-card">
                <dt className="font-semibold text-ink-900">{f.q}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-ink-500">{f.a}</dd>
              </div>
            ))}
          </dl>
        </section>
      </main>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: sector.faq.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://konver.app/" },
              { "@type": "ListItem", position: 2, name: `For ${sector.id}`, item: `https://konver.app/for/${sector.id}` },
            ],
          }),
        }}
      />
    </div>
  );
}
