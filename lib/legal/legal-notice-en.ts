import type { LegalDoc } from "@/lib/legal/types";

// Canonical English source for the Legal Notice (FR: "Mentions légales",
// LCEN art. 6-III). Publisher data is real and provided by the publisher.
// Sole trader (entreprise individuelle) → no RCS number and no share capital.
// Section order mirrors a standard French mentions légales and cross-links the
// Privacy, Cookie and Terms pages so the four documents form one coherent set.

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
          "SIREN: 924 763 717 — SIRET: 924 763 717 00015",
          "Registered with the National Business Register (RNE); not registered with the Trade and Companies Register (RCS).",
          "VAT: not applicable — art. 293 B of the French General Tax Code (franchise en base de TVA).",
          "Email: [contact@konvertools.com](mailto:contact@konvertools.com)",
        ] },
      ],
    },
    {
      id: "director",
      title: "2. Publication director",
      blocks: [
        { kind: "p", text: "Director of publication: **Mayeul Flory**." },
      ],
    },
    {
      id: "hosting",
      title: "3. Hosting",
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
      title: "4. Intellectual property",
      blocks: [
        { kind: "p", text: "The Konvertools name, interface, content and software are protected by intellectual-property law. Any reproduction or reuse without prior authorisation is prohibited, except as permitted by applicable law. Files and content you process with the tools remain yours." },
      ],
    },
    {
      id: "personal-data",
      title: "5. Personal data",
      blocks: [
        { kind: "p", text: "Personal data collected through the Service is processed in line with our [Privacy Policy](/privacy), which explains what we collect, the legal bases, retention periods and how to exercise your GDPR rights. Files you process with the in-browser tools are not stored on our servers." },
      ],
    },
    {
      id: "cookies",
      title: "6. Cookies",
      blocks: [
        { kind: "p", text: "The Service uses a minimal set of cookies and similar browser storage, described in our [Cookie Policy](/cookies). Where required, you can accept or refuse non-essential (advertising) cookies and change your choice at any time." },
      ],
    },
    {
      id: "liability",
      title: "7. Liability",
      blocks: [
        { kind: "p", text: "The publisher strives to keep the Service available and the information accurate, but provides it \"as is\", without warranty of uninterrupted or error-free operation. To the extent permitted by law, the publisher cannot be held liable for indirect damage arising from use of the Service. The full conditions of use are set out in our [Terms of Service](/terms)." },
      ],
    },
    {
      id: "law",
      title: "8. Governing law & disputes",
      blocks: [
        { kind: "p", text: "This notice and any use of the Service are governed by **French law**. In the event of a dispute, please contact us first at [contact@konvertools.com](mailto:contact@konvertools.com) so we can seek an amicable solution; failing that, the competent French courts have jurisdiction." },
        { kind: "p", text: "**Consumer mediation** — in accordance with articles L.611-1 et seq. of the French Consumer Code, as a consumer you may use a consumer mediator free of charge to settle a dispute with us. Contact us at the address above to obtain the details of the competent mediator." },
      ],
    },
    {
      id: "contact",
      title: "9. Contact",
      blocks: [
        { kind: "p", text: "For any question regarding this notice or the Service, contact [contact@konvertools.com](mailto:contact@konvertools.com)." },
      ],
    },
  ],
};
