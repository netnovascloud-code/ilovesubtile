import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HomeExplorer } from "@/components/home/HomeExplorer";
import { TOOLS, CATEGORIES, toCardSpec } from "@/lib/tools-config";
import { getStrings } from "@/lib/i18n/strings";

export default function Home() {
  const ui = getStrings("en");
  const tools = TOOLS.map(toCardSpec);
  const categories = CATEGORIES.map((c) => ({ id: c.id, label: c.label, iconName: c.iconName, tone: c.tone }));
  const categoryLabels = Object.fromEntries(CATEGORIES.map((c) => [c.id, c.label]));

  return (
    <>
      <HomeExplorer
        tools={tools}
        categories={categories}
        categoryLabels={categoryLabels}
        strings={{
          title: "What do you want to convert?",
          subtitle: "Free, fast online tools for files, images, code and text. Drop it in, get your result.",
          placeholder: "Search tools — e.g. jpg to png, json to csv, translate…",
          all: "All",
          counter: `${tools.length}+ free tools · 13 languages · Files deleted instantly`,
          suggestions: [
            { label: "JPG → PNG", query: "jpg to png", category: "images" },
            { label: "Compress image", query: "compress", category: "images" },
            { label: "JSON → CSV", query: "json to csv", category: "developer" },
            { label: "Translate text", query: "translate", category: "text-ai" },
            { label: "Subtitles", query: "subtitle", category: "subtitles" },
          ],
          ai: "AI",
          seeAll: "See all {n} tools",
          empty: "No tool matches your search yet.",
        }}
      />

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
