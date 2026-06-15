import type { LegalDoc } from "@/lib/legal/types";

// Canonical English source for the Legal Notice (FR: "Mentions légales",
// required by LCEN art. 6-III for FR-facing sites). Company-identity fields are
// PLACEHOLDERS in [brackets] — they must be filled with real, verified data by
// the publisher; do not invent them. Hosting providers reflect the actual stack
// (Vercel for the app, Supabase for the backend) — verify the addresses before
// relying on them.

export const LEGAL_NOTICE_EN: LegalDoc = {
  h1: "Legal Notice",
  lastUpdated: "2026-06-15",
  lastUpdatedLabel: "Last updated: %DATE%",
  sections: [
    {
      id: "publisher",
      title: "1. Publisher",
      blocks: [
        { kind: "p", text: "This website is published by **[COMPANY LEGAL NAME — to be completed]**." },
        { kind: "ul", items: [
          "Legal form: **[e.g. SAS / SARL / sole trader — to be completed]**" + " (share capital: **[amount, if a company]**)",
          "Registered office: **[full postal address — to be completed]**",
          "Email: [support@konvertools.com](mailto:support@konvertools.com) · Phone: **[phone number — to be completed]**",
        ] },
      ],
    },
    {
      id: "registration",
      title: "2. Registration & VAT",
      blocks: [
        { kind: "ul", items: [
          "Company registration: **[SIRET / SIREN / RCS + city — to be completed]** (or \"individual entrepreneur\")",
          "Intra-EU VAT number: **[VAT number, if applicable — to be completed]**",
        ] },
      ],
    },
    {
      id: "director",
      title: "3. Publication director",
      blocks: [
        { kind: "p", text: "Director of publication: **[full name — to be completed]**." },
      ],
    },
    {
      id: "hosting",
      title: "4. Hosting",
      blocks: [
        { kind: "p", text: "The application is hosted by:" },
        { kind: "ul", items: [
          "**Vercel Inc.** — 340 S Lemon Ave #4133, Walnut, CA 91789, USA — [vercel.com](https://vercel.com) (application hosting & CDN).",
          "**Supabase, Inc.** — [supabase.com](https://supabase.com) (database, authentication & storage). *Verify the provider's current registered address before publication.*",
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
        { kind: "p", text: "For any question regarding this notice or the Service, contact [support@konvertools.com](mailto:support@konvertools.com)." },
      ],
    },
  ],
};
