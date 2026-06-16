import type { LegalDoc } from "@/lib/legal/types";
import type { Locale } from "@/lib/seo";

// Hand-authored Legal Notice translations. English (lib/legal/legal-notice-en.ts)
// is the canonical source; locales not present here fall back to English (which
// already carries the real publisher data). The values are common across
// languages — only the labels are translated.

const LEGAL_NOTICE_FR: LegalDoc = {
  h1: "Mentions légales",
  lastUpdated: "2026-06-16",
  lastUpdatedLabel: "Dernière mise à jour : %DATE%",
  sections: [
    {
      id: "publisher",
      title: "1. Éditeur",
      blocks: [
        { kind: "p", text: "Ce site est édité par **Mayeul Flory**, entrepreneur individuel (EI) exerçant sous le nom commercial **FUSION-IA**." },
        { kind: "ul", items: [
          "Siège : Charbonnières-les-Bains (69260), France.",
          "E-mail : [contact@konvertools.com](mailto:contact@konvertools.com)",
        ] },
      ],
    },
    {
      id: "registration",
      title: "2. Immatriculation et TVA",
      blocks: [
        { kind: "ul", items: [
          "SIREN : 924 763 717 — SIRET : 924 763 717 00015",
          "Immatriculé au Registre National des Entreprises (RNE) ; non inscrit au Registre du Commerce et des Sociétés (RCS).",
          "N° de TVA intracommunautaire : FR80924763717",
        ] },
      ],
    },
    {
      id: "director",
      title: "3. Directeur de la publication",
      blocks: [
        { kind: "p", text: "Directeur de la publication : **Mayeul Flory**." },
      ],
    },
    {
      id: "hosting",
      title: "4. Hébergement",
      blocks: [
        { kind: "p", text: "Le Service s'appuie sur les prestataires suivants :" },
        { kind: "ul", items: [
          "Hébergement du site : **OVH SAS** — 2 rue Kellermann, 59100 Roubaix, France — [ovh.com](https://www.ovh.com).",
          "Base de données, authentification et stockage : **Supabase** — données hébergées en Europe (eu-west-1) — [supabase.com](https://supabase.com).",
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
        { kind: "p", text: "Pour toute question concernant ces mentions ou le Service, contactez [contact@konvertools.com](mailto:contact@konvertools.com)." },
      ],
    },
  ],
};

export const LEGAL_NOTICE_TRANSLATIONS: Partial<Record<Locale, LegalDoc>> = {
  fr: LEGAL_NOTICE_FR,
};
