import type { LegalDoc } from "@/lib/legal/types";
import type { Locale } from "@/lib/seo";

// Hand-authored Legal Notice translations. English (lib/legal/legal-notice-en.ts)
// is the canonical source; locales not present here fall back to English.
// Company-identity values remain PLACEHOLDERS until the publisher provides them.

const LEGAL_NOTICE_FR: LegalDoc = {
  h1: "Mentions légales",
  lastUpdated: "2026-06-15",
  lastUpdatedLabel: "Dernière mise à jour : %DATE%",
  sections: [
    {
      id: "publisher",
      title: "1. Éditeur",
      blocks: [
        { kind: "p", text: "Ce site est édité par **[RAISON SOCIALE — à compléter]**." },
        { kind: "ul", items: [
          "Forme juridique : **[ex. SAS / SARL / micro-entreprise — à compléter]**" + " (capital social : **[montant, si société]**)",
          "Siège social : **[adresse postale complète — à compléter]**",
          "E-mail : [support@konvertools.com](mailto:support@konvertools.com) · Téléphone : **[numéro — à compléter]**",
        ] },
      ],
    },
    {
      id: "registration",
      title: "2. Immatriculation et TVA",
      blocks: [
        { kind: "ul", items: [
          "Immatriculation : **[SIRET / SIREN / RCS + ville — à compléter]** (ou « entrepreneur individuel »)",
          "N° de TVA intracommunautaire : **[numéro, le cas échéant — à compléter]**",
        ] },
      ],
    },
    {
      id: "director",
      title: "3. Directeur de la publication",
      blocks: [
        { kind: "p", text: "Directeur de la publication : **[nom complet — à compléter]**." },
      ],
    },
    {
      id: "hosting",
      title: "4. Hébergement",
      blocks: [
        { kind: "p", text: "L'application est hébergée par :" },
        { kind: "ul", items: [
          "**Vercel Inc.** — 340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis — [vercel.com](https://vercel.com) (hébergement de l'application et CDN).",
          "**Supabase, Inc.** — [supabase.com](https://supabase.com) (base de données, authentification et stockage). *Vérifiez l'adresse officielle du prestataire avant publication.*",
        ] },
      ],
    },
    {
      id: "ip",
      title: "5. Propriété intellectuelle",
      blocks: [
        { kind: "p", text: "Le nom Konvertools, l'interface, les contenus et le logiciel sont protégés par le droit de la propriété intellectuelle. Toute reproduction ou réutilisation sans autorisation préalable est interdite, sauf dans les limites prévues par la loi. Les fichiers et contenus que vous traitez avec les outils restent les vôtres — voir notre [Politique de confidentialité](/fr/privacy)." },
      ],
    },
    {
      id: "contact",
      title: "6. Contact",
      blocks: [
        { kind: "p", text: "Pour toute question concernant ces mentions ou le Service, contactez [support@konvertools.com](mailto:support@konvertools.com)." },
      ],
    },
  ],
};

export const LEGAL_NOTICE_TRANSLATIONS: Partial<Record<Locale, LegalDoc>> = {
  fr: LEGAL_NOTICE_FR,
};
