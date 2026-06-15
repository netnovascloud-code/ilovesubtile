import type { LegalDoc } from "@/lib/legal/types";

// Canonical English source for the Cookie Policy. Describes the cookies and
// local-storage the Service actually sets (kept factual — update when the set
// changes). Translations are derived from this file by
// scripts/translate-legal.mjs into lib/legal/cookies-translations.ts.
// Keep section ids stable across edits so deep links survive.

export const COOKIES_EN: LegalDoc = {
  h1: "Cookie Policy",
  lastUpdated: "2026-06-15",
  lastUpdatedLabel: "Last updated: %DATE%",
  sections: [
    {
      id: "what",
      title: "1. What this policy covers",
      blocks: [
        { kind: "p", text: "This policy explains the cookies and similar browser storage (localStorage, sessionStorage) that Konvertools (the \"Service\") uses, why we use them, and how you can control them. It complements our [Privacy Policy](/privacy)." },
        { kind: "p", text: "We keep cookies to the minimum needed to run the Service. The in-browser tools themselves (image, PDF, audio/video, code and most utilities) process your files locally and do not require cookies to work." },
      ],
    },
    {
      id: "essential",
      title: "2. Strictly necessary",
      blocks: [
        { kind: "p", text: "These are required for the Service to function and cannot be switched off in our system. They are only set once you sign in." },
        { kind: "ul", items: [
          "**`sb-<project>-auth-token`** (and its `.0`/`.1` chunks) — keeps you signed in to your account. Set by our authentication provider (Supabase). Session/persistent depending on \"remember me\".",
        ] },
      ],
    },
    {
      id: "preferences",
      title: "3. Preferences",
      blocks: [
        { kind: "p", text: "These remember choices you make so the site behaves the way you expect. They store no personal data beyond the preference itself." },
        { kind: "ul", items: [
          "**`NEXT_LOCALE`** / **`konver_locale`** — the language you chose, so the interface stays in that language across the site. Persistent (up to 1 year).",
          "**`wyrlo_locale`** — a legacy language cookie still read so long-time visitors keep their preference. Persistent.",
        ] },
      ],
    },
    {
      id: "advertising",
      title: "4. Advertising",
      blocks: [
        { kind: "p", text: "Advertising cookies are only ever set for visitors on the free tier, and only while ads are enabled. Paid (Pro/Business) accounts and signed-out visitors on ad-free pages do not receive them." },
        { kind: "ul", items: [
          "**Ezoic** — our advertising partner sets cookies to display and measure ads. Ezoic acts as a Consent Management Platform in regions that require consent (EU/UK/etc.), presenting its own consent choices before non-essential advertising cookies are stored. See Ezoic's [privacy policy](https://www.ezoic.com/privacy-policy/).",
        ] },
      ],
    },
    {
      id: "control",
      title: "5. How to control cookies",
      blocks: [
        { kind: "p", text: "You can manage or delete cookies at any time:" },
        { kind: "ul", items: [
          "**Advertising consent** — where a consent banner is shown, you can accept or refuse non-essential cookies, and change your choice later via the privacy/consent control on the page.",
          "**Your browser** — every major browser lets you block or delete cookies and clear local storage from its settings. Blocking strictly-necessary cookies will sign you out and may break account features.",
          "**Stay signed out** — the in-browser tools work without an account and set no preference or advertising cookies beyond your language choice.",
        ] },
      ],
    },
    {
      id: "changes",
      title: "6. Changes & contact",
      blocks: [
        { kind: "p", text: "We may update this policy when the cookies we use change; the \"last updated\" date above reflects the latest revision. For any question about cookies or your data, contact [support@konvertools.com](mailto:support@konvertools.com)." },
      ],
    },
  ],
};
