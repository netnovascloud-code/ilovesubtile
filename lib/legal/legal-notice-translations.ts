import type { LegalDoc } from "@/lib/legal/types";
import type { Locale } from "@/lib/seo";

// Hand-authored Legal Notice translations. English (lib/legal/legal-notice-en.ts)
// is the canonical source; locales not present here fall back to English (which
// already carries the real publisher data). The publisher facts are common
// across languages — only the labels and the cross-link targets are localised.

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
          "SIREN : 924 763 717 — SIRET : 924 763 717 00015",
          "Immatriculé au Registre National des Entreprises (RNE) ; non inscrit au Registre du Commerce et des Sociétés (RCS).",
          "TVA non applicable, art. 293 B du CGI.",
          "E-mail : [contact@konvertools.com](mailto:contact@konvertools.com)",
        ] },
      ],
    },
    {
      id: "director",
      title: "2. Directeur de la publication",
      blocks: [
        { kind: "p", text: "Directeur de la publication : **Mayeul Flory**." },
      ],
    },
    {
      id: "hosting",
      title: "3. Hébergement",
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
      title: "4. Propriété intellectuelle",
      blocks: [
        { kind: "p", text: "Le nom Konvertools, l'interface, les contenus et le logiciel sont protégés par le droit de la propriété intellectuelle. Toute reproduction ou réutilisation sans autorisation préalable est interdite, sauf dans les limites prévues par la loi. Les fichiers et contenus que vous traitez avec les outils restent les vôtres." },
      ],
    },
    {
      id: "personal-data",
      title: "5. Données personnelles",
      blocks: [
        { kind: "p", text: "Les données personnelles collectées via le Service sont traitées conformément à notre [Politique de confidentialité](/fr/privacy), qui détaille ce que nous collectons, les bases légales, les durées de conservation et l'exercice de vos droits RGPD. Les fichiers que vous traitez avec les outils dans le navigateur ne sont pas stockés sur nos serveurs." },
      ],
    },
    {
      id: "cookies",
      title: "6. Cookies",
      blocks: [
        { kind: "p", text: "Le Service utilise un nombre minimal de cookies et de stockages similaires, décrits dans notre [Politique cookies](/fr/cookies). Lorsque cela est requis, vous pouvez accepter ou refuser les cookies non essentiels (publicitaires) et modifier votre choix à tout moment." },
      ],
    },
    {
      id: "liability",
      title: "7. Responsabilité",
      blocks: [
        { kind: "p", text: "L'éditeur s'efforce de maintenir le Service disponible et les informations exactes, mais le fournit « en l'état », sans garantie de fonctionnement ininterrompu ou sans erreur. Dans les limites permises par la loi, l'éditeur ne saurait être tenu responsable des dommages indirects résultant de l'utilisation du Service. Les conditions complètes d'utilisation figurent dans nos [Conditions d'utilisation](/fr/terms)." },
      ],
    },
    {
      id: "law",
      title: "8. Droit applicable et litiges",
      blocks: [
        { kind: "p", text: "Les présentes mentions et toute utilisation du Service sont régies par le **droit français**. En cas de litige, contactez-nous d'abord à [contact@konvertools.com](mailto:contact@konvertools.com) afin de rechercher une solution amiable ; à défaut, les tribunaux français sont compétents." },
        { kind: "p", text: "**Médiation de la consommation** — conformément aux articles L.611-1 et suivants du Code de la consommation, en tant que consommateur vous pouvez recourir gratuitement à un médiateur de la consommation pour régler un litige avec nous. Contactez-nous à l'adresse ci-dessus pour obtenir les coordonnées du médiateur compétent." },
      ],
    },
    {
      id: "contact",
      title: "9. Contact",
      blocks: [
        { kind: "p", text: "Pour toute question concernant ces mentions ou le Service, contactez [contact@konvertools.com](mailto:contact@konvertools.com)." },
      ],
    },
  ],
};

export const LEGAL_NOTICE_TRANSLATIONS: Partial<Record<Locale, LegalDoc>> = {
  fr: LEGAL_NOTICE_FR,
};
