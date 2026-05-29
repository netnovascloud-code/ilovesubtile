import Link from "next/link";
import { Heart, ShieldCheck, Sparkles, GitBranch } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HomeExplorer } from "@/components/home/HomeExplorer";
import { TOOLS, CATEGORIES, toCardSpec } from "@/lib/tools-config";
import { getStrings } from "@/lib/i18n/strings";
import { getHomeExplorer } from "@/lib/i18n/home-explorer";

const WHY = [
  { icon: Heart, title: "Free to start", body: "No credit card. Use the core tools forever for free." },
  { icon: ShieldCheck, title: "Files deleted instantly", body: "GDPR-native. Your data never lingers on our servers." },
  { icon: Sparkles, title: "AI where it counts", body: "Smart features when they help — never gimmicky." },
  { icon: GitBranch, title: "Chain your conversions", body: "The only platform that connects steps end-to-end." },
];

export default function Home() {
  const ui = getStrings("en");
  const tools = TOOLS.map(toCardSpec);
  const categories = CATEGORIES.map((c) => ({ id: c.id, label: c.label, iconName: c.iconName, tone: c.tone }));
  const categoryLabels = Object.fromEntries(CATEGORIES.map((c) => [c.id, c.label]));
  const hx = getHomeExplorer("en");
  const SUGGEST = [
    { query: "jpg to png", category: "images" },
    { query: "compress", category: "images" },
    { query: "json to csv", category: "developer" },
    { query: "translate", category: "text-ai" },
    { query: "subtitle", category: "subtitles" },
  ] as const;

  return (
    <>
      <HomeExplorer
        tools={tools}
        categories={categories}
        categoryLabels={categoryLabels}
        strings={{
          title: hx.title,
          subtitle: hx.subtitle,
          placeholder: hx.placeholder,
          all: hx.all,
          counter: hx.counter.replace("{n}", String(tools.length)),
          suggestions: SUGGEST.map((s, i) => ({ ...s, label: hx.suggestions[i] })),
          ai: hx.ai,
          seeAll: hx.seeAll,
          empty: hx.empty,
        }}
      />

      <section className="border-t border-ink-100 bg-white">
        <div className="container py-16">
          <h2 className="text-center text-2xl font-bold tracking-tight text-ink-900 md:text-3xl">Why Wyrlo</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {WHY.map(({ icon: Icon, title, body }) => (
              <div key={title} className="rounded-xl border border-ink-100 bg-white p-5 shadow-card">
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-brand-50 text-brand-600">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-semibold text-ink-900">{title}</h3>
                <p className="mt-1.5 text-sm text-ink-500">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-ink-100 bg-surface">
        <div className="container py-20">
          <div className="rounded-lg border border-ink-100 bg-white p-10 shadow-card md:p-14">
            <div className="grid items-center gap-8 md:grid-cols-2">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight text-ink-900 md:text-3xl">
                  {ui.home.upgradeTitle}
                </h2>
                <p className="mt-3 text-ink-500">{ui.home.upgradeBody}</p>
                <div className="mt-6 flex gap-3">
                  <Link href="/pricing">
                    <Button>{ui.home.upgradeCtaPrimary}</Button>
                  </Link>
                  <Link href="/register">
                    <Button variant="outline">{ui.home.upgradeCtaSecondary}</Button>
                  </Link>
                </div>
              </div>
              <ul className="space-y-3 text-sm text-ink-700">
                {ui.home.upgradeFeatures.map((f) => (
                  <li key={f}>✓ {f}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
