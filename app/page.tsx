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
          placeholder: "Search 150+ tools — e.g. mp3 to wav, pdf to word, json to csv…",
          all: "All",
          suggestions: ["MP3 → WAV", "PDF → Word", "Translate text", "JPG → PNG", "JSON → CSV"],
          free: "Free",
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
