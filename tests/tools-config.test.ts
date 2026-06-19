import { describe, it, expect } from "vitest";
import { TOOLS, TOOLS_BY_SLUG, CATEGORIES, CATEGORY_BY_ID, toCardSpec } from "@/lib/tools-config";

const CATEGORY_IDS = new Set(CATEGORIES.map((c) => c.id));

describe("tools-config integrity", () => {
  it("has tools and unique slugs", () => {
    expect(TOOLS.length).toBeGreaterThan(100);
    const slugs = TOOLS.map((t) => t.slug);
    const dupes = slugs.filter((s, i) => slugs.indexOf(s) !== i);
    expect(dupes).toEqual([]); // no duplicate slug
  });

  it("every tool's category is a defined category", () => {
    const bad = TOOLS.filter((t) => !CATEGORY_IDS.has(t.category)).map((t) => t.slug);
    expect(bad).toEqual([]);
  });

  it("TOOLS_BY_SLUG maps every slug back to the same tool", () => {
    for (const t of TOOLS) expect(TOOLS_BY_SLUG[t.slug]?.slug).toBe(t.slug);
    expect(Object.keys(TOOLS_BY_SLUG)).toHaveLength(TOOLS.length);
  });

  it("CATEGORY_BY_ID covers every category", () => {
    for (const c of CATEGORIES) expect(CATEGORY_BY_ID[c.id]?.id).toBe(c.id);
  });

  it("no tool has empty required SEO/content fields", () => {
    const missing: string[] = [];
    for (const t of TOOLS) {
      for (const f of ["name", "short", "h1", "metaTitle", "metaDescription", "primaryKeyword"] as const) {
        if (!t[f] || String(t[f]).trim() === "") missing.push(`${t.slug}.${f}`);
      }
    }
    expect(missing).toEqual([]);
  });

  it("toCardSpec is total (never throws) and the free flag tracks client tools", () => {
    for (const t of TOOLS) {
      const card = toCardSpec(t);
      expect(card.slug).toBe(t.slug);
      expect(card.free).toBe(t.kind === "client");
    }
  });

  it("the new tools we added are present and categorised", () => {
    expect(TOOLS_BY_SLUG["font-converter"]?.category).toBe("utilities");
    expect(TOOLS_BY_SLUG["images-to-gif"]?.category).toBe("images");
    // text-to-speech was removed (no external TTS provider) — must be gone.
    expect(TOOLS_BY_SLUG["text-to-speech"]).toBeUndefined();
  });
});
