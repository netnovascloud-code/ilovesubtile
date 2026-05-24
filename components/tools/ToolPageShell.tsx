import type { ToolDefinition, ToolFaq } from "@/lib/tools-config";
import { softwareApplicationSchema, breadcrumbSchema, type Locale } from "@/lib/seo";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Home, ChevronRight } from "lucide-react";
import { getStrings } from "@/lib/i18n/strings";
import { isRtl, localePath } from "@/lib/i18n/locales";
import { getLocalisedFaqs } from "@/lib/i18n/faq-templates";
import { getLocalisedSteps } from "@/lib/i18n/tool-steps";

function localisedFaqSchema(faqs: ToolFaq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function ToolPageShell({
  tool,
  locale = "en",
  override,
  children,
}: {
  tool: ToolDefinition;
  locale?: Locale;
  override?: { name?: string; h1?: string; metaDescription?: string };
  children: React.ReactNode;
}) {
  const Icon = tool.icon;
  const ui = getStrings(locale);
  const name = override?.name ?? tool.name;
  const h1 = override?.h1 ?? tool.h1;
  const description = override?.metaDescription ?? tool.metaDescription;
  const rtl = isRtl(locale);

  // Localised FAQs (template-generated) + steps (per tool × locale).
  const formats = tool.accept.length
    ? tool.accept.map((a) => a.toUpperCase()).join(", ")
    : "the supported formats";
  const faqs = locale === "en" ? tool.faqs : getLocalisedFaqs(locale, name, formats);
  const steps = (locale === "en" ? null : getLocalisedSteps(tool.slug, locale)) ?? tool.steps;

  return (
    <div dir={rtl ? "rtl" : undefined}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareApplicationSchema(tool, locale, { name, metaDescription: description })),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localisedFaqSchema(faqs)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema(tool, locale, { name, homeLabel: ui.tool.breadcrumbHome })),
        }}
      />

      <section className="border-b border-ink-100 bg-surface">
        <div className="container py-10">
          <nav className="mb-6 flex items-center gap-2 text-sm text-ink-500">
            <Link href={localePath(locale)} className="inline-flex items-center hover:text-ink-900">
              <Home className="mr-1 h-3.5 w-3.5" />
              {ui.tool.breadcrumbHome}
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-ink-300" />
            <span className="text-ink-900">{name}</span>
          </nav>

          <div className="flex flex-wrap items-start gap-4">
            <div className="grid h-12 w-12 place-items-center rounded bg-brand-50 text-brand-600">
              <Icon className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-3xl font-semibold tracking-tight text-ink-900 md:text-4xl">
                  {h1}
                </h1>
                {tool.proOnly && (
                  <Badge className="bg-amber-50 text-amber-700">{ui.tool.proBadge}</Badge>
                )}
              </div>
              <p className="mt-3 max-w-2xl text-base text-ink-500">{description}</p>
            </div>
          </div>
        </div>
      </section>

      <main className="container py-10">{children}</main>

      <section className="border-t border-ink-100 bg-white">
        <div className="container py-16">
          <h2 className="text-2xl font-semibold text-ink-900">{ui.tool.howItWorks}</h2>
          <ol className="mt-8 grid gap-6 md:grid-cols-3">
            {steps.map((s, i) => (
              <li key={s.title} className="rounded-lg border border-ink-100 bg-white p-6 shadow-card">
                <div className="grid h-8 w-8 place-items-center rounded bg-brand-500 text-sm font-semibold text-white">
                  {i + 1}
                </div>
                <h3 className="mt-4 font-semibold text-ink-900">{s.title}</h3>
                <p className="mt-2 text-sm text-ink-500">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t border-ink-100 bg-surface">
        <div className="container py-16">
          <h2 className="text-2xl font-semibold text-ink-900">{ui.tool.faq}</h2>
          <dl className="mt-8 grid gap-4 md:grid-cols-2">
            {faqs.map((f) => (
              <div key={f.q} className="rounded-lg border border-ink-100 bg-white p-6 shadow-card">
                <dt className="font-semibold text-ink-900">{f.q}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-ink-500">{f.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </div>
  );
}
