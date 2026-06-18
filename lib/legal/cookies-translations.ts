import type { LegalDoc } from "@/lib/legal/types";
import type { Locale } from "@/lib/seo";

// Hand-authored Cookie Policy translations. English (lib/legal/cookies-en.ts)
// is the canonical, legally-binding source; locales not present here fall back
// to English with a "translation in progress" notice. scripts/translate-legal.mjs
// can fill the remaining locales from the English source.

const COOKIES_FR: LegalDoc = {
  h1: "Politique relative aux cookies",
  lastUpdated: "2026-06-15",
  lastUpdatedLabel: "Dernière mise à jour : %DATE%",
  sections: [
    {
      id: "what",
      title: "1. Objet de cette politique",
      blocks: [
        { kind: "p", text: "Cette politique explique les cookies et le stockage navigateur similaire (localStorage, sessionStorage) que Konvertools (le « Service ») utilise, pourquoi, et comment les contrôler. Elle complète notre [Politique de confidentialité](/fr/privacy)." },
        { kind: "p", text: "Nous limitons les cookies au strict minimum nécessaire au fonctionnement du Service. Les outils dans le navigateur (image, PDF, audio/vidéo, code et la plupart des utilitaires) traitent vos fichiers localement et ne nécessitent aucun cookie pour fonctionner." },
      ],
    },
    {
      id: "essential",
      title: "2. Strictement nécessaires",
      blocks: [
        { kind: "p", text: "Indispensables au fonctionnement du Service, ils ne peuvent pas être désactivés depuis notre système. Ils ne sont posés qu'une fois connecté." },
        { kind: "ul", items: [
          "**`sb-<projet>-auth-token`** (et ses fragments `.0`/`.1`) — vous maintient connecté à votre compte. Posé par notre fournisseur d'authentification (Supabase). De session ou persistant selon « rester connecté ».",
        ] },
      ],
    },
    {
      id: "preferences",
      title: "3. Préférences",
      blocks: [
        { kind: "p", text: "Ils mémorisent vos choix pour que le site se comporte comme attendu. Ils ne stockent aucune donnée personnelle au-delà de la préférence elle-même." },
        { kind: "ul", items: [
          "**`NEXT_LOCALE`** / **`konver_locale`** — la langue que vous avez choisie, pour conserver l'interface dans cette langue sur tout le site. Persistant (jusqu'à 1 an).",
          "**`wyrlo_locale`** — ancien cookie de langue toujours lu pour que les visiteurs de longue date gardent leur préférence. Persistant.",
        ] },
      ],
    },
    {
      id: "advertising",
      title: "4. Publicité",
      blocks: [
        { kind: "p", text: "Les cookies publicitaires ne sont posés que pour les visiteurs de l'offre gratuite, et uniquement lorsque les publicités sont activées. Les comptes payants (Pro/Business) et les visiteurs déconnectés sur les pages sans publicité n'en reçoivent pas." },
        { kind: "ul", items: [
          "**Ezoic** — notre partenaire publicitaire pose des cookies pour afficher et mesurer les publicités. Ezoic agit comme plateforme de gestion du consentement dans les régions qui l'exigent (UE/Royaume-Uni/etc.), en présentant ses propres choix de consentement avant le dépôt de cookies publicitaires non essentiels. Voir la [politique de confidentialité](https://www.ezoic.com/privacy-policy/) d'Ezoic.",
        ] },
      ],
    },
    {
      id: "control",
      title: "5. Comment contrôler les cookies",
      blocks: [
        { kind: "p", text: "Vous pouvez gérer ou supprimer les cookies à tout moment :" },
        { kind: "ul", items: [
          "**Consentement publicitaire** — lorsqu'un bandeau de consentement est affiché, vous pouvez accepter ou refuser les cookies non essentiels, et modifier votre choix ultérieurement via le contrôle de confidentialité/consentement sur la page.",
          "**Votre navigateur** — tous les grands navigateurs permettent de bloquer ou supprimer les cookies et de vider le stockage local depuis leurs réglages. Bloquer les cookies strictement nécessaires vous déconnectera et peut casser des fonctions du compte.",
          "**Rester déconnecté** — les outils dans le navigateur fonctionnent sans compte et ne posent aucun cookie de préférence ou de publicité au-delà de votre choix de langue.",
        ] },
      ],
    },
    {
      id: "changes",
      title: "6. Modifications et contact",
      blocks: [
        { kind: "p", text: "Nous pouvons mettre à jour cette politique lorsque les cookies utilisés changent ; la date de « dernière mise à jour » ci-dessus reflète la dernière révision. Pour toute question sur les cookies ou vos données, contactez [support@konvertools.com](mailto:support@konvertools.com)." },
      ],
    },
  ],
};

export const COOKIES_TRANSLATIONS: Partial<Record<Locale, LegalDoc>> = {
  fr: COOKIES_FR,
};
