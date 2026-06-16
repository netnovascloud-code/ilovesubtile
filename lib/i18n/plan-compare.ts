import { type Locale } from "@/lib/i18n/locales";

/**
 * Strings for the plan comparison table on /pricing. English is the base and
 * the fallback for any locale not present here (same degradation as the legal
 * and billing strings). Values (file sizes, quotas, times) are computed from
 * the canonical config (lib/plans, lib/plan-limits, lib/ai-quotas) so the table
 * can never drift from what the server actually enforces.
 */
export type CompareStrings = {
  title: string;
  subtitle: string;
  feature: string;
  perDay: (n: string) => string;
  perMonth: (n: string) => string;
  files: (n: string) => string;
  oneFile: string;
  yes: string;
  no: string;
  unlimited: string;
  apiBiz: string;
  allTools: string;
  rows: {
    aiRuns: string;
    fileSize: string;
    procTime: string;
    batch: string;
    templates: string;
    ads: string;
    watermark: string;
    api: string;
    browserTools: string;
  };
};

const en: CompareStrings = {
  title: "Compare plans",
  subtitle: "Every in-browser tool is free and unlimited. Paid plans lift the limits on the AI tools and uploads.",
  feature: "Feature",
  perDay: (n) => `${n} / day`,
  perMonth: (n) => `${n} / month`,
  files: (n) => `${n} files`,
  oneFile: "1 file",
  yes: "Yes",
  no: "No",
  unlimited: "Unlimited",
  apiBiz: "Full API + 300 credits / mo",
  allTools: "All, unlimited",
  rows: {
    aiRuns: "AI conversions",
    fileSize: "Max file size",
    procTime: "Max processing time",
    batch: "Batch processing",
    templates: "Saved templates",
    ads: "Ads during AI processing",
    watermark: "Watermark on burned-in video",
    api: "REST API",
    browserTools: "Browser tools (image, PDF, audio…)",
  },
};

const fr: CompareStrings = {
  title: "Comparer les offres",
  subtitle: "Tous les outils dans le navigateur sont gratuits et illimités. Les offres payantes lèvent les limites des outils IA et des envois.",
  feature: "Fonctionnalité",
  perDay: (n) => `${n} / jour`,
  perMonth: (n) => `${n} / mois`,
  files: (n) => `${n} fichiers`,
  oneFile: "1 fichier",
  yes: "Oui",
  no: "Non",
  unlimited: "Illimité",
  apiBiz: "API complète + 300 crédits / mois",
  allTools: "Tous, illimités",
  rows: {
    aiRuns: "Conversions IA",
    fileSize: "Taille de fichier max",
    procTime: "Temps de traitement max",
    batch: "Traitement par lot",
    templates: "Modèles enregistrés",
    ads: "Publicités pendant l'IA",
    watermark: "Filigrane sur vidéo incrustée",
    api: "API REST",
    browserTools: "Outils navigateur (image, PDF, audio…)",
  },
};

const TABLE: Partial<Record<Locale, CompareStrings>> = { en, fr };

export function getCompare(locale: Locale): CompareStrings {
  return TABLE[locale] ?? en;
}
