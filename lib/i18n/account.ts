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

export type DashboardStrings = {
  title: string;
  signedInAs: (email: string) => string;
  emptyState: string;
  upgrade: string;
  aiUsage: string;
  periodDaily: string;
  periodMonthly: string;
  usedLeft: (left: string) => string;
  dailyLimitReached: string;
  monthlyLimitReached: string;
  recentJobsCard: string;
  upTo20: string;
  plan: string;
  manageSubscription: string;
  cancelsOn: (d: string) => string;
  paymentOverdue: string;
  renewsOn: (d: string) => string;
  noActiveSub: string;
  creditBalance: string;
  manageBilling: string;
  recentJobsDesc: string;
  noJobs: string;
  download: string;
  linkExpired: string;
  // Stats / charts
  statsTitle: string;
  convOverTime: string;
  successRate: string;
  successful: string;
  errors: string;
  topTools: string;
  creditsOverTime: string;
  noData: string;
  totalConversions: string;
};

const dashEn: DashboardStrings = {
  title: "Dashboard",
  signedInAs: (e) => `Signed in as ${e}`,
  emptyState: "You're viewing the empty state. Configure Supabase to enable real data.",
  upgrade: "Upgrade",
  aiUsage: "AI usage",
  periodDaily: "Runs in the last 24 hours",
  periodMonthly: "AI conversions this month",
  usedLeft: (left) => `used · ${left} left`,
  dailyLimitReached: "Daily limit reached. Resets every 24h.",
  monthlyLimitReached: "Monthly quota reached. Resets on the 1st.",
  recentJobsCard: "Recent jobs",
  upTo20: "Up to 20 shown",
  plan: "Plan",
  manageSubscription: "Manage your subscription",
  cancelsOn: (d) => `Cancels on ${d} — access until then`,
  paymentOverdue: "Payment overdue — please update billing",
  renewsOn: (d) => `Renews on ${d}`,
  noActiveSub: "No active subscription",
  creditBalance: "Credit balance:",
  manageBilling: "Manage billing",
  recentJobsDesc: "Last 20 files you processed. Download links expire after 1 hour.",
  noJobs: "No jobs yet. Try a tool to see them here.",
  download: "Download",
  linkExpired: "Link expired",
  statsTitle: "Statistics",
  convOverTime: "Conversions (last 14 days)",
  successRate: "Success rate",
  successful: "successful",
  errors: "errors",
  topTools: "Most-used tools",
  creditsOverTime: "Credit balance over time",
  noData: "No data yet — run a tool to see your stats here.",
  totalConversions: "Total conversions",
};

const dashFr: DashboardStrings = {
  title: "Tableau de bord",
  signedInAs: (e) => `Connecté en tant que ${e}`,
  emptyState: "Vous voyez l'état vide. Configurez Supabase pour activer les données réelles.",
  upgrade: "Mettre à niveau",
  aiUsage: "Utilisation IA",
  periodDaily: "Requêtes sur les dernières 24 h",
  periodMonthly: "Conversions IA ce mois-ci",
  usedLeft: (left) => `utilisées · ${left} restantes`,
  dailyLimitReached: "Limite quotidienne atteinte. Réinitialisation toutes les 24 h.",
  monthlyLimitReached: "Quota mensuel atteint. Réinitialisation le 1er.",
  recentJobsCard: "Conversions récentes",
  upTo20: "20 maximum affichées",
  plan: "Offre",
  manageSubscription: "Gérez votre abonnement",
  cancelsOn: (d) => `Résiliation le ${d} — accès jusque-là`,
  paymentOverdue: "Paiement en retard — veuillez mettre à jour la facturation",
  renewsOn: (d) => `Renouvellement le ${d}`,
  noActiveSub: "Aucun abonnement actif",
  creditBalance: "Solde de crédits :",
  manageBilling: "Gérer la facturation",
  recentJobsDesc: "Les 20 derniers fichiers traités. Les liens de téléchargement expirent après 1 heure.",
  noJobs: "Aucune conversion pour l'instant. Lancez un outil pour les voir ici.",
  download: "Télécharger",
  linkExpired: "Lien expiré",
  statsTitle: "Statistiques",
  convOverTime: "Conversions (14 derniers jours)",
  successRate: "Taux de réussite",
  successful: "réussies",
  errors: "en erreur",
  topTools: "Outils les plus utilisés",
  creditsOverTime: "Solde de crédits dans le temps",
  noData: "Aucune donnée pour l'instant — lancez un outil pour voir vos stats ici.",
  totalConversions: "Conversions totales",
};

const DASH_TABLE: Partial<Record<Locale, DashboardStrings>> = { en: dashEn, fr: dashFr };

/** Dashboard strings for a locale, falling back to English. */
export function getDashboard(locale: Locale): DashboardStrings {
  return DASH_TABLE[locale] ?? dashEn;
}

export type ApiKeysStrings = {
  title: string;
  credits: string;
  businessOnly: string;
  copyNow: string;
  copied: string;
  copy: string;
  loading: string;
  noKeys: string;
  defaultKeyName: string;
  used: (d: string) => string;
  neverUsed: string;
  revoke: string;
  namePlaceholder: string;
  generating: string;
  generate: string;
  atLimit: (n: number) => string;
  confirmTitle: string;
  confirmBody: (name: string, prefix: string) => string;
  confirmYes: string;
  confirmCancel: string;
  errRevoke: string;
};

const keysEn: ApiKeysStrings = {
  title: "API keys",
  credits: "Credits:",
  businessOnly: "The REST API is a Business-plan feature. Upgrade to generate keys and call the API.",
  copyNow: "Copy your key now — it won't be shown again.",
  copied: "Copied",
  copy: "Copy",
  loading: "Loading…",
  noKeys: "No active keys yet.",
  defaultKeyName: "API key",
  used: (d) => `used ${d}`,
  neverUsed: "never used",
  revoke: "Revoke",
  namePlaceholder: "Key name (required, e.g. Production)",
  generating: "Generating…",
  generate: "Generate API key",
  atLimit: (n) => `You've reached the maximum of ${n} active keys. Revoke one to create another.`,
  confirmTitle: "Revoke this API key permanently?",
  confirmBody: (name, prefix) => `"${name}" (${prefix}…) — this action is irreversible. Every application currently using this key will stop working immediately and start receiving 401 errors. The key cannot be reactivated; you'll have to create a new one and update your integrations.`,
  confirmYes: "Yes, revoke permanently",
  confirmCancel: "Cancel",
  errRevoke: "Could not revoke the key.",
};

const keysFr: ApiKeysStrings = {
  title: "Clés API",
  credits: "Crédits :",
  businessOnly: "L'API REST est une fonctionnalité de l'offre Business. Passez à Business pour générer des clés et appeler l'API.",
  copyNow: "Copiez votre clé maintenant — elle ne sera plus affichée.",
  copied: "Copié",
  copy: "Copier",
  loading: "Chargement…",
  noKeys: "Aucune clé active pour l'instant.",
  defaultKeyName: "Clé API",
  used: (d) => `utilisée le ${d}`,
  neverUsed: "jamais utilisée",
  revoke: "Révoquer",
  namePlaceholder: "Nom de la clé (requis, ex. Production)",
  generating: "Génération…",
  generate: "Générer une clé API",
  atLimit: (n) => `Vous avez atteint le maximum de ${n} clés actives. Révoquez-en une pour en créer une autre.`,
  confirmTitle: "Révoquer définitivement cette clé API ?",
  confirmBody: (name, prefix) => `« ${name} » (${prefix}…) — cette action est irréversible. Toute application utilisant cette clé cessera immédiatement de fonctionner et recevra des erreurs 401. La clé ne peut pas être réactivée ; vous devrez en créer une nouvelle et mettre à jour vos intégrations.`,
  confirmYes: "Oui, révoquer définitivement",
  confirmCancel: "Annuler",
  errRevoke: "Impossible de révoquer la clé.",
};

const KEYS_TABLE: Partial<Record<Locale, ApiKeysStrings>> = { en: keysEn, fr: keysFr };

/** API-keys card strings for a locale, falling back to English. */
export function getApiKeys(locale: Locale): ApiKeysStrings {
  return KEYS_TABLE[locale] ?? keysEn;
}
