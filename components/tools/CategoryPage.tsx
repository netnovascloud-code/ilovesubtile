import Link from "next/link";
import { Home, ChevronRight, ArrowRight } from "lucide-react";
import { TOOLS, CATEGORY_BY_ID, type ToolCategory } from "@/lib/tools-config";
import { categoryTheme } from "@/lib/category-theme";
import { ToolGlyph } from "@/components/tools/ToolGlyph";
import { cn } from "@/lib/utils";

/** Shared category landing — lists every tool in the category, plus a brief
 * intro and a category-level FAQ. Drives /documents, /audio, /video, … */
export function CategoryPage({ category }: { category: ToolCategory }) {
  const def = CATEGORY_BY_ID[category];
  const tools = TOOLS.filter((t) => t.category === category);

  const FAQ: { q: string; a: string }[] = [
    {
      q: `Are these ${def.label.toLowerCase()} tools free?`,
      a: `Yes — every tool on this page is free and unlimited for browser-side conversions. AI-powered tools have a generous daily allowance on the free plan; Pro unlocks unlimited runs and larger files.`,
    },
    {
      q: `Are my files uploaded?`,
      a: `Most tools in this category run entirely in your browser via WebAssembly — your files never leave your device. The few that need a server (AI transcription, translation, video burn-in) delete files within 30 minutes of processing.`,
    },
    {
      q: `Do I need to sign up?`,
      a: `No. Every tool works without an account. Sign up only if you want a higher daily quota, larger files, saved templates and the workflow builder.`,
    },
  ];

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
            <span className="text-ink-900">{def.label}</span>
          </nav>
          <h1 className="text-3xl font-semibold tracking-tight text-ink-900 md:text-4xl">
            All {def.label} Tools — Free Online
          </h1>
          <p className="mt-3 max-w-2xl text-base text-ink-500">
            {def.blurb} Every tool below is free, runs in your browser when it can, and is built around a single conversion — no editor, no sign-up, no nonsense.
          </p>
          <p className="mt-2 text-sm text-ink-400">{tools.length} tools in {def.label.toLowerCase()}.</p>
        </div>
      </section>

      <main className="container py-12">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((t) => {
            const theme = categoryTheme(t.category);
            return (
              <li key={t.slug}>
                <Link
                  href={`/${t.slug}`}
                  className={cn("group flex items-start gap-3 rounded-lg border border-ink-100 bg-white p-5 shadow-card transition-all hover:-translate-y-0.5", theme.hoverBorder)}
                >
                  <div className="shrink-0">
                    <ToolGlyph category={t.category} iconName={(t.icon as { displayName?: string }).displayName ?? "Wrench"} px={40} />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1 font-medium text-ink-900">
                      {t.name}
                      <ArrowRight className="h-3.5 w-3.5 text-brand-500 opacity-0 transition-opacity group-hover:opacity-100" />
                    </div>
                    <p className="mt-0.5 text-sm text-ink-500">{t.short}</p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </main>

      <section className="border-t border-ink-100 bg-surface">
        <div className="container py-16">
          <h2 className="text-2xl font-semibold text-ink-900">Frequently asked questions</h2>
          <dl className="mt-8 grid gap-4 md:grid-cols-2">
            {FAQ.map((f) => (
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
            mainEntity: FAQ.map((f) => ({
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
              { "@type": "ListItem", position: 1, name: "Home", item: "https://wyrlo.io/" },
              { "@type": "ListItem", position: 2, name: def.label, item: `https://wyrlo.io/${category}` },
            ],
          }),
        }}
      />
    </div>
  );
}

/** SEO metadata builder shared by all category routes. */
export function categoryMetadata(category: ToolCategory) {
  const def = CATEGORY_BY_ID[category];
  const titles: Record<ToolCategory, string> = {
    documents: "All Document Conversion Tools — Free Online",
    audio: "All Audio Converter Tools — Free Online",
    video: "All Video Converter Tools — Free Online",
    images: "All Image Converter & Editor Tools — Free Online",
    subtitles: "All Subtitle Tools — Generate, Convert, Translate",
    developer: "All Code & Developer Tools — Free Online",
    "text-ai": "AI Text Tools — Translate, Rephrase, Summarize Free",
    utilities: "Online Utilities — QR, Colors, Units, Currencies & More",
    archives: "Archive Tools — Create & Extract ZIP Online Free",
  };
  return {
    title: { absolute: `${titles[category]} | Wyrlo` },
    description: `${def.blurb} Free, fast, browser-first — no sign-up needed.`,
    alternates: { canonical: `/${category}` },
  };
}
