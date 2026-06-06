import { headers } from "next/headers";

/** Inline schema.org JSON-LD block. Reads the per-request CSP nonce from
 *  the middleware-set `x-nonce` header so the script is allowed under the
 *  strict-dynamic CSP. Use this in any Server Component instead of writing
 *  `<script type="application/ld+json" dangerouslySetInnerHTML=…>` directly.
 *  Async because Next 16's `headers()` is async; render it from a Server
 *  Component (`<JsonLd data={…} />`). */
export async function JsonLd({ data }: { data: unknown }) {
  const nonce = (await headers()).get("x-nonce") ?? undefined;
  return (
    <script
      type="application/ld+json"
      nonce={nonce}
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
