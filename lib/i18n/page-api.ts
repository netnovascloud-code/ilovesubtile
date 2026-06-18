import { type Locale } from "@/lib/i18n/locales";

/**
 * Localised prose for the REST API documentation page (/api and /<locale>/api).
 *
 * Only HUMAN PROSE lives here — section headings, endpoint descriptions, error
 * "When" descriptions, the scope paragraphs, sidebar cards and labels. Code
 * samples (the cURL / JavaScript snippets), JSON response bodies, HTTP status
 * codes and machine-readable error codes (bad_request, 402, …) stay in the page
 * as English constants and are NEVER translated.
 *
 * English is the base and the fallback for any locale not present here (same
 * degradation as the other i18n dictionaries). Endpoint descriptions are keyed
 * by their `action`; error descriptions are keyed by their error `name`.
 */
export type ApiStrings = {
  sections: {
    auth: string;
    covers: string;
    endpoints: string;
    errors: string;
    privacy: string;
  };
  auth: {
    /** Prose around the Authorization header / dashboard link. */
    intro1: string;
    dashboardLink: string;
    intro2: string;
    /** Label before the base URL value. */
    baseUrlLabel: string;
    /** Sentence describing the rate limit. The numbers/tokens stay literal. */
    rateLimit1: string;
    rateLimit2: string;
    rateLimit3: string;
  };
  covers: {
    /** "What the API covers" — three paragraphs of prose. */
    p1a: string;
    p1Transcription: string;
    p1b: string;
    p1TextAi: string;
    p1c: string;
    p2a: string;
    browserToolsLink: string;
    p2b: string;
    p3: string;
  };
  /** Endpoint descriptions, keyed by their action. */
  endpoints: Record<
    | "me"
    | "transcribe"
    | "translate"
    | "rephrase"
    | "summarize"
    | "humanize"
    | "convert_code"
    | "job"
    | "remove_background"
    | "convert_pdf"
    | "convert_image",
    string
  >;
  /** Error "When" descriptions, keyed by the error name. */
  errors: Record<
    | "bad_request"
    | "invalid_api_key"
    | "insufficient_credits"
    | "job_not_found"
    | "text_too_long"
    | "rate_limited"
    | "server_error"
    | "processing_failed",
    string
  >;
  /** Labels for the errors section + table columns. */
  errorsIntro1: string;
  errorsIntro2: string;
  errorsTableHttp: string;
  errorsTableError: string;
  errorsTableWhen: string;
  errorExampleLabel: string;
  /** Privacy paragraph. */
  privacyBody: string;
  /** Sidebar cards. */
  sidebar: {
    getKeyTitle: string;
    getKeyBody: string;
    seePricing: string;
    creditPacksTitle: string;
    creditPacksNote: string;
    costTableTitle: string;
  };
  /** The live tester card (ApiTesterClient). */
  tester: {
    title: string;
    lead: string;
    keyPlaceholder: string;
    inputPlaceholder: string;
    calling: string;
    test: string;
    creditsRemaining: (n: string) => string;
    networkError: (msg: string) => string;
    httpError: (status: string, code: string, message: string) => string;
  };
};

const en: ApiStrings = {
  sections: {
    auth: "Authentication",
    covers: "What the API covers",
    endpoints: "Endpoints",
    errors: "Errors",
    privacy: "Privacy",
  },
  auth: {
    intro1: "with every request. Generate a key from your",
    dashboardLink: "dashboard",
    intro2:
      "(Business plan). Each call spends credits from your balance — credits never expire.",
    baseUrlLabel: "Base URL:",
    rateLimit1: "Rate limit:",
    rateLimit2: "60 requests/minute",
    rateLimit3: "per key. Exceeding it returns",
  },
  covers: {
    p1a: "The API is",
    p1Transcription: "transcription",
    p1b: "(audio/video → text, Voxtral) and",
    p1TextAi: "text & AI",
    p1c:
      "(translate, summarise, rephrase, humanise, convert code). OCR and server-side video/heavy-format conversions are rolling out next.",
    p2a: "Our",
    browserToolsLink: "browser tools",
    p2b:
      "— image, PDF and audio edits, background removal, format conversions — are not in the API, by design. They run entirely in the visitor’s browser, so there is nothing to call server-side: the file never leaves the device and these tools stay free, unlimited and private. Run them client-side in your own product instead.",
    p3:
      "The same per-plan limits apply to API calls as to the web app. Uploads are capped by plan (Free 20 MB · Pro 1 GB · Business 5 GB) and enforced server-side; long media is billed per started minute, so video length is bounded by your credit balance rather than a hard cut-off. Every call is metered against your key — {api_keys} → {jobs} → {credit_transactions} — and follows one lifecycle: create the task → send the file → we process it → you fetch the result → the file is deleted. The Mistral key stays secret on our servers and is never exposed.",
  },
  endpoints: {
    me: "Account info: plan, credit balance, email, max file size.",
    transcribe:
      "Audio / video → timestamped SRT. Billed per started minute (61s = 2 min = 20). Multipart `file`, or JSON { file_url }.",
    translate:
      "Translate text or an SRT/VTT file (timestamps preserved). Billed per started 1000 words, minimum 5. Params: `target_lang`, `style`.",
    rephrase:
      "Rewrite text in a chosen style. 3 credits up to 500 words, 8 beyond. Params: `text`, `style` (professional/casual/academic/creative/simple/legal).",
    summarize:
      "Summarise text. 3 credits up to 500 words, 6 beyond. Params: `text`, `format` (short/bullets/detailed).",
    humanize:
      "Rewrite AI text so it reads naturally. 5 credits up to 500 words, 12 beyond. Params: `text`, `level` (light/medium/strong).",
    convert_code:
      "Convert source code between languages. Params: `code`, `from_language`, `to_language`.",
    job: "Fetch a job by id. Pass &id=<uuid>.",
    remove_background:
      "Cut out a transparent PNG. Runs in-browser today (free & unlimited); REST access is rolling out.",
    convert_pdf:
      "merge / split / compress / rotate / to_images / to_text. Runs in-browser today; REST access is rolling out.",
    convert_image:
      "Re-encode to a target format with quality/resize. Runs in-browser today; REST access is rolling out.",
  },
  errors: {
    bad_request: "Missing or invalid parameter — the message says which.",
    invalid_api_key: "Key missing, not found, or revoked.",
    insufficient_credits:
      "Balance too low — response includes how many you need.",
    job_not_found: "That job id doesn't belong to your account.",
    text_too_long: "Keep text payloads under 40,000 characters.",
    rate_limited: "Too many requests — retry after the indicated delay.",
    server_error: "Something broke on our side — retry.",
    processing_failed: "Upstream model error — you are not charged.",
  },
  errorsIntro1:
    "Every endpoint returns a consistent JSON envelope with an",
  errorsIntro2: "code and a human-readable",
  errorsTableHttp: "HTTP",
  errorsTableError: "error",
  errorsTableWhen: "When",
  errorExampleLabel: "402 example",
  privacyBody:
    "Result files in results/ storage carry a 10-minute signed URL and are deleted within 30 minutes by a scheduled purge. Job rows are deleted after 2 hours. File content is never retained beyond that window.",
  sidebar: {
    getKeyTitle: "Get an API key",
    getKeyBody:
      "The REST API is included with the Business plan (€39/month) — 300 credits every month, plus top-up packs that never expire.",
    seePricing: "See pricing →",
    creditPacksTitle: "Credit packs",
    creditPacksNote: "Top-ups never expire.",
    costTableTitle: "Cost table",
  },
  tester: {
    title: "Try it live",
    lead: "Paste your API key, pick an endpoint, we make the real call and show the response.",
    keyPlaceholder: "knv_live_…",
    inputPlaceholder: "Text to send…",
    calling: "Calling…",
    test: "Test",
    creditsRemaining: (n) => `${n} credits remaining`,
    networkError: (msg) => `Network error: ${msg}`,
    httpError: (status, code, message) =>
      `HTTP ${status} — ${code}${message ? `: ${message}` : ""}`,
  },
};

const fr: ApiStrings = {
  sections: {
    auth: "Authentification",
    covers: "Ce que couvre l’API",
    endpoints: "Points de terminaison",
    errors: "Erreurs",
    privacy: "Confidentialité",
  },
  auth: {
    intro1: "avec chaque requête. Générez une clé depuis votre",
    dashboardLink: "tableau de bord",
    intro2:
      "(offre Business). Chaque appel consomme des crédits de votre solde — les crédits n’expirent jamais.",
    baseUrlLabel: "URL de base :",
    rateLimit1: "Limite de débit :",
    rateLimit2: "60 requêtes/minute",
    rateLimit3: "par clé. La dépasser renvoie",
  },
  covers: {
    p1a: "L’API est",
    p1Transcription: "la transcription",
    p1b: "(audio/vidéo → texte, Voxtral) et",
    p1TextAi: "le texte & l’IA",
    p1c:
      "(traduire, résumer, reformuler, humaniser, convertir du code). L’OCR et les conversions vidéo/formats lourds côté serveur arrivent ensuite.",
    p2a: "Nos",
    browserToolsLink: "outils navigateur",
    p2b:
      "— retouches d’image, PDF et audio, suppression d’arrière-plan, conversions de format — ne sont pas dans l’API, par conception. Ils s’exécutent entièrement dans le navigateur du visiteur, il n’y a donc rien à appeler côté serveur : le fichier ne quitte jamais l’appareil et ces outils restent gratuits, illimités et privés. Exécutez-les côté client dans votre propre produit.",
    p3:
      "Les mêmes limites par offre s’appliquent aux appels API qu’à l’application web. Les envois sont plafonnés selon l’offre (Free 20 Mo · Pro 1 Go · Business 5 Go) et appliqués côté serveur ; les médias longs sont facturés par minute entamée, donc la durée d’une vidéo est limitée par votre solde de crédits plutôt que par un plafond strict. Chaque appel est comptabilisé sur votre clé — {api_keys} → {jobs} → {credit_transactions} — et suit un seul cycle de vie : créer la tâche → envoyer le fichier → nous le traitons → vous récupérez le résultat → le fichier est supprimé. La clé Mistral reste secrète sur nos serveurs et n’est jamais exposée.",
  },
  endpoints: {
    me: "Infos du compte : offre, solde de crédits, e-mail, taille de fichier max.",
    transcribe:
      "Audio / vidéo → SRT horodaté. Facturé par minute entamée (61 s = 2 min = 20). `file` multipart, ou JSON { file_url }.",
    translate:
      "Traduit du texte ou un fichier SRT/VTT (horodatages préservés). Facturé par tranche de 1000 mots entamée, minimum 5. Paramètres : `target_lang`, `style`.",
    rephrase:
      "Réécrit le texte dans un style choisi. 3 crédits jusqu’à 500 mots, 8 au-delà. Paramètres : `text`, `style` (professional/casual/academic/creative/simple/legal).",
    summarize:
      "Résume le texte. 3 crédits jusqu’à 500 mots, 6 au-delà. Paramètres : `text`, `format` (short/bullets/detailed).",
    humanize:
      "Réécrit un texte d’IA pour qu’il se lise naturellement. 5 crédits jusqu’à 500 mots, 12 au-delà. Paramètres : `text`, `level` (light/medium/strong).",
    convert_code:
      "Convertit du code source d’un langage à un autre. Paramètres : `code`, `from_language`, `to_language`.",
    job: "Récupère une tâche par identifiant. Ajoutez &id=<uuid>.",
    remove_background:
      "Détoure un PNG transparent. Fonctionne dans le navigateur aujourd’hui (gratuit & illimité) ; l’accès REST se déploie progressivement.",
    convert_pdf:
      "merge / split / compress / rotate / to_images / to_text. Fonctionne dans le navigateur aujourd’hui ; l’accès REST se déploie progressivement.",
    convert_image:
      "Réencode vers un format cible avec qualité/redimensionnement. Fonctionne dans le navigateur aujourd’hui ; l’accès REST se déploie progressivement.",
  },
  errors: {
    bad_request: "Paramètre manquant ou invalide — le message précise lequel.",
    invalid_api_key: "Clé manquante, introuvable ou révoquée.",
    insufficient_credits:
      "Solde trop faible — la réponse indique combien il vous en faut.",
    job_not_found: "Cet identifiant de tâche n’appartient pas à votre compte.",
    text_too_long: "Gardez les charges de texte sous 40 000 caractères.",
    rate_limited: "Trop de requêtes — réessayez après le délai indiqué.",
    server_error: "Un problème est survenu de notre côté — réessayez.",
    processing_failed: "Erreur du modèle en amont — vous n’êtes pas facturé.",
  },
  errorsIntro1:
    "Chaque point de terminaison renvoie une enveloppe JSON cohérente avec un code",
  errorsIntro2: "et un message lisible",
  errorsTableHttp: "HTTP",
  errorsTableError: "erreur",
  errorsTableWhen: "Quand",
  errorExampleLabel: "Exemple 402",
  privacyBody:
    "Les fichiers de résultat dans le stockage results/ portent une URL signée de 10 minutes et sont supprimés dans les 30 minutes par une purge planifiée. Les enregistrements de tâche sont supprimés après 2 heures. Le contenu des fichiers n’est jamais conservé au-delà de cette fenêtre.",
  sidebar: {
    getKeyTitle: "Obtenir une clé API",
    getKeyBody:
      "L’API REST est incluse dans l’offre Business (39 €/mois) — 300 crédits chaque mois, plus des packs de recharge qui n’expirent jamais.",
    seePricing: "Voir les tarifs →",
    creditPacksTitle: "Packs de crédits",
    creditPacksNote: "Les recharges n’expirent jamais.",
    costTableTitle: "Tableau des coûts",
  },
  tester: {
    title: "Essayer en direct",
    lead: "Collez votre clé API, choisissez un point de terminaison, nous faisons l’appel réel et affichons la réponse.",
    keyPlaceholder: "knv_live_…",
    inputPlaceholder: "Texte à envoyer…",
    calling: "Appel en cours…",
    test: "Tester",
    creditsRemaining: (n) => `${n} crédits restants`,
    networkError: (msg) => `Erreur réseau : ${msg}`,
    httpError: (status, code, message) =>
      `HTTP ${status} — ${code}${message ? ` : ${message}` : ""}`,
  },
};

const TABLE: Partial<Record<Locale, ApiStrings>> = { en, fr };

export function getApi(locale: Locale): ApiStrings {
  return TABLE[locale] ?? en;
}
