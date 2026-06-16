import type { LegalDoc } from "@/lib/legal/types";

// Canonical English source for the Legal Notice (FR: "Mentions légales",
// LCEN art. 6-III). Publisher data is real and provided by the publisher.
// Sole trader (entreprise individuelle) → no RCS number and no share capital.

export const LEGAL_NOTICE_EN: LegalDoc = {
  h1: "Legal Notice",
  lastUpdated: "2026-06-16",
  lastUpdatedLabel: "Last updated: %DATE%",
  sections: [
    {
      id: "publisher",
      title: "1. Publisher",
      blocks: [
        { kind: "p", text: "This website is published by **Mayeul Flory**, a sole trader (entrepreneur individuel) trading under the business name **FUSION-IA**." },
        { kind: "ul", items: [
          "Registered office: Charbonnières-les-Bains (69260), France.",
          "Email: [contact@konvertools.com](mailto:contact@konvertools.com)",
        ] },
      ],
    },
    {
      id: "registration",
      title: "2. Registration & VAT",
      blocks: [
        { kind: "ul", items: [
          "SIREN: 924 763 717 — SIRET: 924 763 717 00015",
          "Registered with the National Business Register (RNE); not registered with the Trade and Companies Register (RCS).",
          "VAT: not applicable — art. 293 B of the French General Tax Code (franchise en base de TVA).",
        ] },
      ],
    },
    {
      id: "director",
      title: "3. Publication director",
      blocks: [
        { kind: "p", text: "Director of publication: **Mayeul Flory**." },
      ],
    },
    {
      id: "hosting",
      title: "4. Hosting",
      blocks: [
        { kind: "p", text: "The Service relies on the following providers:" },
        { kind: "ul", items: [
          "Website hosting: **OVH SAS** — 2 rue Kellermann, 59100 Roubaix, France — [ovh.com](https://www.ovh.com).",
          "Database, authentication & storage: **Supabase** — data hosted in Europe (eu-west-1) — [supabase.com](https://supabase.com).",
        ] },
      ],
    },
    {
      id: "ip",
      title: "5. Intellectual property",
      blocks: [
        { kind: "p", text: "The Konvertools name, interface, content and software are protected by intellectual-property law. Any reproduction or reuse without prior authorisation is prohibited, except as permitted by applicable law. Files and content you process with the tools remain yours — see our [Privacy Policy](/privacy)." },
      ],
    },
    {
      id: "contact",
      title: "6. Contact",
      blocks: [
        { kind: "p", text: "For any question regarding this notice or the Service, contact [contact@konvertools.com](mailto:contact@konvertools.com)." },
      ],
    },
  ],
};
