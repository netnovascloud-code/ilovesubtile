import { type Locale } from "@/lib/i18n/locales";

/**
 * Strings for the account pages (/billing, /dashboard) and their cards. These
 * pages are auth-gated and were English-only; we localise them with a small
 * hand-authored table. English is the base and the fallback for any locale not
 * present here (mirrors how the legal pages degrade), so adding a language later
 * is purely additive. The AI fill script can generate the missing locales.
 */
export type BillingStrings = {
  title: string;
  signedInAs: (email: string) => string;
  back: string;
  subscription: string;
  subDescSubscriber: string;
  subDescComped: string;
  subDescFree: string;
  free: string;
  perMo: string;
  cancelsOn: (d: string) => string;
  paymentOverdue: string;
  renewsAuto: (d: string) => string;
  subActive: string;
  portalNote: string;
  compedTitle: (plan: string) => string;
  compedBody: string;
  seePlans: string;
  whatsIncluded: (plan: string) => string;
  businessCreditsNote: (n: string) => string;
  apiCredits: string;
  balance: string;
  monthlyBusiness: string;
  resets1st: string;
  purchasedPacks: string;
  neverExpire: string;
  invoicesTitle: string;
  invoicesSubscriber: string;
  invoicesNonSub: string;
  vatNote: string;
  // AiUsageCard
  aiUsage: string;
  runsThisMonth: string;
  runsToday: string;
  left: (n: string) => string;
  resetsOn: (d: string) => string;
  resets24h: string;
  // CreditHistoryCard
  creditHistory: string;
  creditPack: (id: string) => string;
  apiCall: (task: string) => string;
  monthlyGrant: string;
  bal: (n: string) => string;
  // BuyCreditsCard
  buyCreditsTitle: string;
  buyCreditsSubtitle: string;
  creditsUnit: string;
  perCreditSuffix: string;
  buy: string;
  buyCreditsBusinessNote: string;
};

const en: BillingStrings = {
  title: "Billing",
  signedInAs: (e) => `Signed in as ${e}`,
  back: "Dashboard",
  subscription: "Subscription",
  subDescSubscriber: "Change plan, update or remove your card, download invoices, or cancel — all handled securely by Lemon Squeezy.",
  subDescComped: "Your plan is active on this account.",
  subDescFree: "Pick a plan to unlock higher limits and the full API.",
  free: "Free",
  perMo: "/mo",
  cancelsOn: (d) => `Cancels on ${d} — you keep access until then.`,
  paymentOverdue: "Payment overdue — update your card below to keep access.",
  renewsAuto: (d) => `Renews automatically on ${d}.`,
  subActive: "Subscription active.",
  portalNote: "Opens your secure Lemon Squeezy portal: payment method, plan changes, invoices and cancellation.",
  compedTitle: (p) => `Your ${p} plan is active.`,
  compedBody: "It was granted directly on your account, so there's no payment method or invoice to manage here.",
  seePlans: "See plans",
  whatsIncluded: (p) => `What's included in ${p}`,
  businessCreditsNote: (n) => `Business includes ${n} API credits every month (reset on the 1st), on top of any credit packs you buy.`,
  apiCredits: "API credits",
  balance: "Balance:",
  monthlyBusiness: "Monthly (Business)",
  resets1st: "resets 1st",
  purchasedPacks: "Purchased packs",
  neverExpire: "never expire",
  invoicesTitle: "Invoices & receipts",
  invoicesSubscriber: "Every receipt and invoice is emailed to you automatically, and all past invoices are downloadable from the portal above.",
  invoicesNonSub: "When you have a paid subscription, every receipt and invoice is emailed to you automatically and downloadable from your billing portal.",
  vatNote: "Lemon Squeezy is our Merchant of Record — VAT/sales tax is calculated, collected and remitted for you.",
  aiUsage: "AI usage",
  runsThisMonth: "AI runs used this month",
  runsToday: "AI runs used today",
  left: (n) => `${n} left`,
  resetsOn: (d) => `Resets on ${d}.`,
  resets24h: "Resets 24h after your first run.",
  creditHistory: "Credit history",
  creditPack: (id) => `Credit pack · ${id}`,
  apiCall: (t) => `API call · ${t}`,
  monthlyGrant: "Monthly Business credits",
  bal: (n) => `bal. ${n}`,
  buyCreditsTitle: "Buy API credits",
  buyCreditsSubtitle: "Top up your balance for the REST API. Credits never expire.",
  creditsUnit: "credits",
  perCreditSuffix: "/credit",
  buy: "Buy",
  buyCreditsBusinessNote: "Business plans also include 300 credits every month (these reset monthly; purchased packs don't).",
};

const fr: BillingStrings = {
  title: "Facturation",
  signedInAs: (e) => `Connecté en tant que ${e}`,
  back: "Tableau de bord",
  subscription: "Abonnement",
  subDescSubscriber: "Changer d'offre, mettre à jour ou retirer votre carte, télécharger vos factures ou résilier — tout est géré en toute sécurité par Lemon Squeezy.",
  subDescComped: "Votre offre est active sur ce compte.",
  subDescFree: "Choisissez une offre pour débloquer des limites plus élevées et l'API complète.",
  free: "Gratuit",
  perMo: "/mois",
  cancelsOn: (d) => `Résiliation le ${d} — vous gardez l'accès jusque-là.`,
  paymentOverdue: "Paiement en retard — mettez à jour votre carte ci-dessous pour conserver l'accès.",
  renewsAuto: (d) => `Renouvellement automatique le ${d}.`,
  subActive: "Abonnement actif.",
  portalNote: "Ouvre votre portail Lemon Squeezy sécurisé : moyen de paiement, changement d'offre, factures et résiliation.",
  compedTitle: (p) => `Votre offre ${p} est active.`,
  compedBody: "Elle a été accordée directement sur votre compte : il n'y a donc ni moyen de paiement ni facture à gérer ici.",
  seePlans: "Voir les offres",
  whatsIncluded: (p) => `Ce qui est inclus dans ${p}`,
  businessCreditsNote: (n) => `Business inclut ${n} crédits API chaque mois (réinitialisés le 1er), en plus des packs de crédits que vous achetez.`,
  apiCredits: "Crédits API",
  balance: "Solde :",
  monthlyBusiness: "Mensuels (Business)",
  resets1st: "réinit. le 1er",
  purchasedPacks: "Packs achetés",
  neverExpire: "n'expirent jamais",
  invoicesTitle: "Factures et reçus",
  invoicesSubscriber: "Chaque reçu et facture vous est envoyé automatiquement par e-mail, et toutes les factures passées sont téléchargeables depuis le portail ci-dessus.",
  invoicesNonSub: "Dès que vous avez un abonnement payant, chaque reçu et facture vous est envoyé automatiquement par e-mail et est téléchargeable depuis votre portail de facturation.",
  vatNote: "Lemon Squeezy est notre revendeur officiel (Merchant of Record) — la TVA / taxe est calculée, collectée et reversée pour vous.",
  aiUsage: "Utilisation IA",
  runsThisMonth: "requêtes IA utilisées ce mois-ci",
  runsToday: "requêtes IA utilisées aujourd'hui",
  left: (n) => `${n} restantes`,
  resetsOn: (d) => `Réinitialisation le ${d}.`,
  resets24h: "Réinitialisation 24 h après votre première requête.",
  creditHistory: "Historique des crédits",
  creditPack: (id) => `Pack de crédits · ${id}`,
  apiCall: (t) => `Appel API · ${t}`,
  monthlyGrant: "Crédits Business mensuels",
  bal: (n) => `solde ${n}`,
  buyCreditsTitle: "Acheter des crédits API",
  buyCreditsSubtitle: "Rechargez votre solde pour l'API REST. Les crédits n'expirent jamais.",
  creditsUnit: "crédits",
  perCreditSuffix: "/crédit",
  buy: "Acheter",
  buyCreditsBusinessNote: "Les offres Business incluent aussi 300 crédits chaque mois (réinitialisés mensuellement ; les packs achetés, non).",
};

const TABLE: Partial<Record<Locale, BillingStrings>> = { en, fr };

/** Billing/account strings for a locale, falling back to English. */
export function getBilling(locale: Locale): BillingStrings {
  return TABLE[locale] ?? en;
}
