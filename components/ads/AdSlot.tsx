"use client";

/**
 * Reserved space for an ad. Real network code (Ezoic / AdSense / Media.net)
 * will be injected here later. Keeping a fixed footprint protects CLS.
 */
export function AdSlot({ slot }: { slot: "processing" | "sidebar" | "pre-download" }) {
  const sizes = {
    processing: "h-[250px] min-w-[300px] max-w-[728px]",
    sidebar: "h-[600px] w-[300px]",
    "pre-download": "h-[280px] w-full max-w-[336px]",
  } as const;

  return (
    <div
      role="complementary"
      aria-label="Advertisement"
      className={`mx-auto grid place-items-center rounded border border-dashed border-ink-200 bg-ink-50 text-xs text-ink-300 ${sizes[slot]}`}
    >
      <span data-ad-slot={slot}>Ad slot · {slot}</span>
    </div>
  );
}
