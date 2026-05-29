import Link from "next/link";
import { Home, ChevronRight, ArrowRight } from "lucide-react";
import { TOOLS_BY_SLUG } from "@/lib/tools-config";
import { Button } from "@/components/ui/button";
import { ToolGlyph } from "@/components/tools/ToolGlyph";
import type { HowTo } from "@/lib/howto";

export function HowToPage({ howto }: { howto: HowTo }) {
  const tool = TOOLS_BY_SLUG[howto.toolSlug];

  return (
    <div>
      <section className="border-b border-ink-100 bg-surface">
        <div className="container py-10">
          <nav className="mb-6 flex items-center gap-2 text-sm text-ink-500">
            <Link href="/" className="inline-flex items-center hover:text-ink-900"><Home className="mr-1 h-3.5 w-3.5" />Home</Link>
            <ChevronRight className="h-3.5 w-3.5 text-ink-300" />
            <span className="text-ink-400">Guides</span>
            <ChevronRight className="h-3.5 w-3.5 text-ink-300" />
            <span className="truncate text-ink-900">{howto.h1.replace(/ — .*/, "")}</span>
          </nav>
          <h1 className="text-3xl font-semibold tracking-tight text-ink-900 md:text-4xl">{howto.h1}</h1>
        </div>
      </section>

      <main className="container py-12">
        <div className="grid gap-10 lg:grid-cols-[1fr_300px]">
          <article className="max-w-2xl">
            <p className="text-lg leading-relaxed text-ink-600">{howto.intro}</p>

            <h2 className="mt-10 text-2xl font-semibold text-ink-900">Steps</h2>
            <ol className="mt-6 space-y-5">
              {howto.steps.map((s, i) => (
                <li key={s.title} className="flex gap-4">
                  <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand-500 text-sm font-semibold text-white">{i + 1}</div>
                  <div>
                    <h3 className="font-semibold text-ink-900">{s.title}</h3>
                    <p className="mt-1 text-ink-600">{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>

            <h2 className="mt-10 text-2xl font-semibold text-ink-900">Why use Konver for this</h2>
            <p className="mt-3 text-ink-600">{howto.why}</p>

            <h2 className="mt-10 text-2xl font-semibold text-ink-900">FAQ</h2>
            <dl className="mt-6 space-y-4">
              {howto.faq.map((f) => (
                <div key={f.q} className="rounded-lg border border-ink-100 bg-white p-5">
                  <dt className="font-semibold text-ink-900">{f.q}</dt>
                  <dd className="mt-2 text-sm leading-relaxed text-ink-500">{f.a}</dd>
                </div>
              ))}
            </dl>
          </article>

          <aside className="lg:sticky lg:top-4 lg:self-start">
            {tool && (
              <div className="rounded-lg border border-brand-200 bg-brand-50/40 p-5">
                <p className="text-xs uppercase tracking-wide text-brand-700">The tool for this</p>
                <Link href={`/${tool.slug}`} className="mt-3 flex items-start gap-3">
                  <ToolGlyph category={tool.category} iconName={(tool.icon as { displayName?: string }).displayName ?? "Wrench"} px={40} />
                  <div className="min-w-0">
                    <div className="flex items-center gap-1 font-medium text-ink-900">{tool.name}<ArrowRight className="h-3.5 w-3.5 text-brand-500" /></div>
                    <div className="mt-0.5 text-sm text-ink-500">{tool.short}</div>
                  </div>
                </Link>
                <Link href={`/${tool.slug}`} className="mt-4 block">
                  <Button className="w-full">{howto.toolCta}</Button>
                </Link>
              </div>
            )}
          </aside>
        </div>
      </main>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: howto.h1,
            step: howto.steps.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: s.title, text: s.body })),
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: howto.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
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
              { "@type": "ListItem", position: 2, name: "Guides", item: "https://konver.app/how-to" },
              { "@type": "ListItem", position: 3, name: howto.h1, item: `https://konver.app/how-to/${howto.id}` },
            ],
          }),
        }}
      />
    </div>
  );
}
