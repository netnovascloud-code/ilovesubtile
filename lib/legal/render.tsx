// Renderer for a structured LegalDoc — turns Section[] into JSX. Supports a
// tiny markdown subset for inline emphasis and links:
//   **bold**                            → <strong>
//   [label](https://example.com)        → <a href="..." rel="noopener">
//   [label](mailto:foo@bar)             → <a href="mailto:...">
// Section H2s carry stable id attributes for deep-linking and the in-page
// table of contents.

import type { LegalDoc, Block } from "@/lib/legal/types";

/** Parse the inline mini-markdown into React nodes. */
function inline(text: string): React.ReactNode[] {
  const out: React.ReactNode[] = [];
  // Walk a single regex that captures either bold or link. Whichever fires
  // first wins; everything between matches is plain text.
  const re = /\*\*(.+?)\*\*|\[([^\]]+)\]\((https?:\/\/[^\s)]+|mailto:[^\s)]+)\)/g;
  let lastIndex = 0;
  let m: RegExpExecArray | null;
  let key = 0;
  while ((m = re.exec(text)) !== null) {
    if (m.index > lastIndex) out.push(text.slice(lastIndex, m.index));
    if (m[1] != null) {
      out.push(<strong key={`b${key++}`}>{m[1]}</strong>);
    } else if (m[2] != null && m[3] != null) {
      const isMailto = m[3].startsWith("mailto:");
      out.push(
        <a
          key={`a${key++}`}
          href={m[3]}
          className="text-brand-600 underline"
          {...(isMailto ? {} : { rel: "noopener", target: "_blank" })}
        >
          {m[2]}
        </a>,
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

export function LegalRender({ doc }: { doc: LegalDoc }) {
  return (
    <article className="container max-w-3xl py-16">
      <h1 className="text-3xl font-semibold tracking-tight text-ink-900">{doc.h1}</h1>
      <p className="mt-3 text-sm text-ink-400">
        {doc.lastUpdatedLabel.replace("%DATE%", doc.lastUpdated)}
      </p>
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
    </article>
  );
}
