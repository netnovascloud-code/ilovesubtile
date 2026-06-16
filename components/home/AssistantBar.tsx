"use client";

import { useState } from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, Loader2, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TOOLS, TOOLS_BY_SLUG } from "@/lib/tools-config";
import { callTool } from "@/lib/tool-api";
import { type Locale, localePath } from "@/lib/i18n/locales";
import { resolveToolI18n } from "@/lib/i18n/resolve-tool-i18n";

type Step = { slug: string; why: string };

// Strings: English base + French; other locales fall back to English until
// translated (same degradation as plan-compare / runs-on).
const T: Record<string, Record<string, string>> = {
  en: {
    title: "Tell the assistant what you want to do",
    subtitle: "Describe your goal in plain words — it points you to the right tool, or the steps to chain.",
    placeholder: "e.g. compress this video to email it, or turn a PDF into clean text",
    ask: "Ask",
    asking: "Thinking…",
    empty: "No tool matched that — try rephrasing, or browse the tools above.",
    errorGeneric: "Something went wrong. Please try again.",
    limit: "You've reached your AI limit. Upgrade your plan or try again later.",
    suggested: "Suggested steps",
    open: "Open",
  },
  fr: {
    title: "Dites à l'assistant ce que vous voulez faire",
    subtitle: "Décrivez votre objectif simplement — il vous oriente vers le bon outil, ou les étapes à enchaîner.",
    placeholder: "ex. compresser cette vidéo pour l'envoyer par mail, ou transformer un PDF en texte propre",
    ask: "Demander",
    asking: "Réflexion…",
    empty: "Aucun outil ne correspond — reformulez, ou parcourez les outils ci-dessus.",
    errorGeneric: "Une erreur est survenue. Veuillez réessayer.",
    limit: "Vous avez atteint votre limite IA. Passez à l'offre supérieure ou réessayez plus tard.",
    suggested: "Étapes suggérées",
    open: "Ouvrir",
  },
};

// Compact tool catalogue sent to the model: "slug — name — description", one
// per line. Built once from the static config; the model returns slugs only.
const CATALOGUE = TOOLS.filter((t) => !t.pending)
  .map((t) => `${t.slug} — ${t.name} — ${t.short}`)
  .join("\n");

export function AssistantBar({ locale }: { locale: Locale }) {
  const s = T[locale] ?? T.en;
  const [prompt, setPrompt] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [steps, setSteps] = useState<Step[] | null>(null);

  async function ask() {
    const goal = prompt.trim();
    if (!goal || busy) return;
    setBusy(true); setError(null); setSteps(null);
    try {
      const text = `Goal: ${goal}\n\nCatalogue:\n${CATALOGUE}`;
      const res = await callTool("smart-assistant", { text });
      const data = (await res.json().catch(() => ({}))) as { steps?: Step[]; message?: string };
      if (res.status === 429) { setError(s.limit); return; }
      if (!res.ok) { setError(data.message ?? s.errorGeneric); return; }
      setSteps((data.steps ?? []).filter((st) => st && typeof st.slug === "string" && TOOLS_BY_SLUG[st.slug]));
    } catch {
      setError(s.errorGeneric);
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="border-t border-ink-100 bg-white">
      <div className="container py-14">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto mb-3 grid h-11 w-11 place-items-center rounded-full bg-brand-50 text-brand-600">
            <Wand2 className="h-5 w-5" />
          </div>
          <h2 className="text-2xl font-semibold tracking-tight text-ink-900">{s.title}</h2>
          <p className="mt-2 text-sm text-ink-500">{s.subtitle}</p>
        </div>

        <div className="mx-auto mt-6 flex max-w-2xl flex-col gap-2 sm:flex-row">
          <input
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") ask(); }}
            placeholder={s.placeholder}
            className="flex-1 rounded-lg border border-ink-200 bg-white px-4 py-3 text-sm text-ink-900 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100"
          />
          <Button onClick={ask} disabled={busy || !prompt.trim()} size="lg">
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
            {busy ? s.asking : s.ask}
          </Button>
        </div>

        {error && (
          <p className="mx-auto mt-4 max-w-2xl rounded-lg bg-amber-50 px-4 py-3 text-center text-sm text-amber-800">{error}</p>
        )}

        {steps && steps.length === 0 && !error && (
          <p className="mx-auto mt-4 max-w-2xl text-center text-sm text-ink-500">{s.empty}</p>
        )}

        {steps && steps.length > 0 && (
          <div className="mx-auto mt-6 max-w-2xl">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-400">{s.suggested}</p>
            <ol className="space-y-2">
              {steps.map((st, i) => {
                const tool = TOOLS_BY_SLUG[st.slug];
                const i18n = locale === "en" ? null : resolveToolI18n(st.slug, locale);
                const name = i18n?.name ?? tool.name;
                return (
                  <li key={`${st.slug}-${i}`}>
                    <Link
                      href={localePath(locale, st.slug)}
                      className="group flex items-center gap-3 rounded-lg border border-ink-100 bg-white p-4 shadow-card transition-all hover:-translate-y-0.5 hover:border-brand-200"
                    >
                      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand-50 text-xs font-semibold text-brand-700">{i + 1}</span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-medium text-ink-900">{name}</span>
                        <span className="block truncate text-sm text-ink-500">{st.why}</span>
                      </span>
                      <span className="inline-flex shrink-0 items-center gap-1 text-sm font-medium text-brand-600">
                        {s.open} <ArrowRight className="h-4 w-4" />
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ol>
          </div>
        )}
      </div>
    </section>
  );
}
