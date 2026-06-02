// Shared types for legal documents (Privacy Policy + Terms of Service).
// Sections are renderable as JSX by lib/legal/render.tsx and translatable as
// a flat list of strings by scripts/translate-legal.mjs.

/** A single rendered block inside a section. Strings inside both kinds may
 *  contain inline markdown-style links: `[label](https://example.com)` or
 *  `[label](mailto:foo@bar)`. Bold uses `**text**`. */
export type Block =
  | { kind: "p"; text: string }
  | { kind: "ul"; items: string[] };

export type Section = {
  /** URL anchor — kept stable across translations. */
  id: string;
  title: string;
  blocks: Block[];
};

export type LegalDoc = {
  /** Heading rendered at the top of the page. */
  h1: string;
  /** Translated label for the "last updated" line; %DATE% is substituted. */
  lastUpdatedLabel: string;
  /** ISO date the editor last reviewed the text. */
  lastUpdated: string;
  sections: Section[];
};
