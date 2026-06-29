// Renderer for a structured LegalDoc — turns Section[] into JSX. Supports a
// tiny markdown subset for inline emphasis and links:
//   **bold**                            → <strong>
//   [label](https://example.com)        → <a href="..." rel="noopener">
//   [label](mailto:foo@bar)             → <a href="mailto:...">
//   [label](/privacy)                   → internal link (cross-references)
// Section H2s carry stable id attributes for deep-linking; long documents get
// an in-page table of contents, and every legal page links to its siblings so
// the four pages (Privacy, Terms, Cookies, Legal Notice) feel like one set.

import Link from "next/link";
import type { LegalDoc, Block } from "@/lib/legal/types";
import { localePath, type Locale } from "@/lib/i18n/locales";

/** One of the four legal documents, used to cross-link the others. */
export type LegalSlug = "privacy" | "terms" | "cookies" | "legal-notice";

type NavLabels = {
  onThisPage: string;
  related: string;
  privacy: string;
  terms: string;
  cookies: string;
  "legal-notice": string;
};

// Only the chrome labels are translated here; English is the fallback (the
// pages themselves already fall back to English when a locale isn't translated).
const NAV: Partial<Record<Locale, NavLabels>> = {
  en: {
    onThisPage: "On this page",
    related: "See also",
    privacy: "Privacy Policy",
    terms: "Terms of Service",
    cookies: "Cookie Policy",
    "legal-notice": "Legal Notice",
  },
  fr: {
    onThisPage: "Sommaire",
    related: "À consulter aussi",
    privacy: "Politique de confidentialité",
    terms: "Conditions d'utilisation",
    cookies: "Politique cookies",
    "legal-notice": "Mentions légales",
  },
};

const ALL_SLUGS: LegalSlug[] = ["privacy", "terms", "cookies", "legal-notice"];

/** Parse the inline mini-markdown into React nodes. */
function inline(text: string): React.ReactNode[] {
  const out: React.ReactNode[] = [];
  // Walk a single regex that captures bold, an external/mailto link, or an
  // internal link (starting with "/"). Whichever fires first wins; everything
  // between matches is plain text.
  const re = /\*\*(.+?)\*\*|\[([^\]]+)\]\((https?:\/\/[^\s)]+|mailto:[^\s)]+|\/[^\s)]*)\)/g;
  let lastIndex = 0;
  let m: RegExpExecArray | null;
  let key = 0;
  while ((m = re.exec(text)) !== null) {
    if (m.index > lastIndex) out.push(text.slice(lastIndex, m.index));
    if (m[1] != null) {
      out.push(<strong key={`b${key++}`}>{m[1]}</strong>);
    } else if (m[2] != null && m[3] != null) {
      const href = m[3];
      const isInternal = href.startsWith("/");
      const isMailto = href.startsWith("mailto:");
      out.push(
        isInternal ? (
          <Link key={`a${key++}`} href={href} className="text-brand-600 underline">
            {m[2]}
          </Link>
        ) : (
          <a
            key={`a${key++}`}
            href={href}
            className="text-brand-600 underline"
            {...(isMailto ? {} : { rel: "noopener", target: "_blank" })}
          >
            {m[2]}
          </a>
        ),
      );
    }
    lastIndex = m.index + m[0].length;
  }
  if (lastIndex < text.length) out.push(text.slice(lastIndex));
  return out;
}

function RenderBlock({ block, k }: { block: Block; k: number }) {
  if (block.kind === "p") return <p key={k}>{inline(block.text)}</p>;
  return (
    <ul key={k}>
      {block.items.map((it, i) => (
        <li key={i}>{inline(it)}</li>
      ))}
    </ul>
  );
}

export function LegalRender({
  doc,
  locale = "en",
  slug,
}: {
  doc: LegalDoc;
  locale?: Locale;
  // "refund" renders with the same chrome but is not part of the four
  // cross-linked core docs (ALL_SLUGS), so it widens the prop without
  // entering the related-docs footer set.
  slug?: LegalSlug | "refund";
}) {
  const nav = NAV[locale] ?? NAV.en!;
  const showToc = doc.sections.length > 4;
  const related = slug ? ALL_SLUGS.filter((s) => s !== slug) : [];

  return (
    <article className="container max-w-3xl py-16">
      <h1 className="text-3xl font-semibold tracking-tight text-ink-900">{doc.h1}</h1>
      <p className="mt-3 text-sm text-ink-400">
        {doc.lastUpdatedLabel.replace("%DATE%", doc.lastUpdated)}
      </p>

      {showToc && (
        <nav aria-label={nav.onThisPage} className="mt-8 rounded-lg border border-ink-100 bg-surface/60 p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-ink-500">{nav.onThisPage}</p>
          <ol className="mt-3 grid gap-x-6 gap-y-1.5 text-sm sm:grid-cols-2">
            {doc.sections.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="text-ink-600 hover:text-brand-600 hover:underline">
                  {s.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      )}

      <section className="prose prose-sm mt-8 max-w-none text-ink-700">
        {doc.sections.map((s) => (
          <div key={s.id}>
            <h2 id={s.id} className="mt-10 scroll-mt-24 text-lg font-semibold text-ink-900">
              {s.title}
            </h2>
            {s.blocks.map((b, i) => (
              <RenderBlock key={i} block={b} k={i} />
            ))}
          </div>
        ))}
      </section>

      {related.length > 0 && (
        <footer className="mt-14 border-t border-ink-100 pt-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-ink-500">{nav.related}</p>
          <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm">
            {related.map((s) => (
              <li key={s}>
                <Link href={localePath(locale, s)} className="text-brand-600 hover:underline">
                  {nav[s]}
                </Link>
              </li>
            ))}
          </ul>
        </footer>
      )}
    </article>
  );
}
