import Link from "next/link";
import { Home, ChevronRight, ArrowRight, Check, X } from "lucide-react";
import { TOOLS_BY_SLUG } from "@/lib/tools-config";
import { JsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/button";
import { ToolGlyph } from "@/components/tools/ToolGlyph";
import type { Vs } from "@/lib/vs";

export function VsPage({ vs }: { vs: Vs }) {
  const ctas = vs.ctaSlugs.map((s) => TOOLS_BY_SLUG[s]).filter(Boolean);

  return (
    <div>
      <section className="border-b border-ink-100 bg-surface">
        <div className="container py-10">
          <nav className="mb-6 flex items-center gap-2 text-sm text-ink-500">
            <Link href="/" className="inline-flex items-center hover:text-ink-900"><Home className="mr-1 h-3.5 w-3.5" />Home</Link>
            <ChevronRight className="h-3.5 w-3.5 text-ink-300" />
            <span className="text-ink-900">vs {vs.competitor}</span>
          </nav>
          <h1 className="text-3xl font-semibold tracking-tight text-ink-900 md:text-4xl">{vs.hero}</h1>
          <p className="mt-3 max-w-2xl text-base text-ink-500">{vs.intro}</p>
        </div>
      </section>

      <main className="container py-12 space-y-12">
        <section className="overflow-x-auto">
          <table className="w-full min-w-[560px] overflow-hidden rounded-lg border border-ink-100 bg-white text-sm">
            <thead className="bg-ink-50 text-left text-xs uppercase tracking-wide text-ink-400">
              <tr>
                <th className="px-4 py-3">Feature</th>
                <th className="px-4 py-3 text-brand-700">Konvertools</th>
                <th className="px-4 py-3">{vs.competitor}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100">
              {vs.rows.map((r) => (
                <tr key={r.feature}>
                  <td className="px-4 py-3 font-medium text-ink-700">{r.feature}</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-1.5 text-ink-900">
                      {r.win && <Check className="h-4 w-4 shrink-0 text-emerald-600" />}
                      {r.konver}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-ink-500">{r.them}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-ink-900">What Konvertools does better</h2>
          <ul className="mt-4 space-y-2">
            {vs.better.map((b) => (
              <li key={b} className="flex items-start gap-2 text-ink-700">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" /><span>{b}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-lg border border-ink-100 bg-surface p-6">
          <h2 className="flex items-center gap-2 text-xl font-semibold text-ink-900">
            <X className="h-5 w-5 text-ink-400" /> When {vs.competitor} is the better pick
          </h2>
          <p className="mt-2 max-w-2xl text-ink-600">{vs.whenThem}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-ink-900">Try the tools people switch for</h2>
          <ul className="mt-4 grid gap-4 sm:grid-cols-3">
            {ctas.map((t) => (
              <li key={t.slug}>
                <Link href={`/${t.slug}`} className="group flex items-start gap-3 rounded-lg border border-ink-100 bg-white p-4 shadow-card transition-all hover:-translate-y-0.5 hover:border-brand-300">
                  <ToolGlyph category={t.category} iconName={(t.icon as { displayName?: string }).displayName ?? "Wrench"} px={40} />
                  <div className="min-w-0">
                    <div className="flex items-center gap-1 font-medium text-ink-900">{t.name}<ArrowRight className="h-3.5 w-3.5 text-brand-500 opacity-0 transition-opacity group-hover:opacity-100" /></div>
                    <div className="mt-0.5 line-clamp-2 text-sm text-ink-500">{t.short}</div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/pricing"><Button>See pricing</Button></Link>
            <Link href="/"><Button variant="outline">Browse all tools</Button></Link>
          </div>
        </section>
      </main>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://konvertools.com/" },
            { "@type": "ListItem", position: 2, name: `vs ${vs.competitor}`, item: `https://konvertools.com/vs/${vs.id}` },
          ],
        }}
      />
    </div>
  );
}
