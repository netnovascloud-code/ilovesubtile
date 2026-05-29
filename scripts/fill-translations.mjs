// Fill missing translations via Mistral Large — tool SEO fields + category labels.
//
//   node scripts/fill-translations.mjs --dry-run               # audit only, no API
//   MISTRAL_API_KEY=... node scripts/fill-translations.mjs                  # fill everything
//   MISTRAL_API_KEY=... node scripts/fill-translations.mjs --target tools   # tools only
//   MISTRAL_API_KEY=... node scripts/fill-translations.mjs --target categories
//   MISTRAL_API_KEY=... node scripts/fill-translations.mjs --locale fr --limit 20
//
// Reads the English source + existing translations, finds every missing
// (item, locale), translates the fields, and writes them into the matching
// generated overlay (tool-translations.generated.ts / category-translations
// .generated.ts). Safe to re-run: only fills what is still missing.
//
// Requires Node 22.18+ (native TypeScript type-stripping — the imported app
// modules are type-only at runtime, so no build step is needed).

import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const TOOL_PATH = resolve(ROOT, "lib/i18n/tool-translations.generated.ts");
const CAT_PATH = resolve(ROOT, "lib/i18n/category-translations.generated.ts");

const LOCALES = [
  ["fr", "French"], ["es", "Spanish"], ["pt", "Portuguese"], ["de", "German"],
  ["it", "Italian"], ["nl", "Dutch"], ["ja", "Japanese"], ["zh", "Chinese (Simplified)"],
  ["ko", "Korean"], ["ar", "Arabic"], ["ru", "Russian"], ["hi", "Hindi"],
];

const args = process.argv.slice(2);
const has = (f) => args.includes(f);
const valOf = (f) => { const i = args.indexOf(f); return i >= 0 ? args[i + 1] : null; };
const DRY_RUN = has("--dry-run");
const ONLY_LOCALE = valOf("--locale");
const LIMIT = valOf("--limit") ? Number(valOf("--limit")) : Infinity;
const TARGET = valOf("--target") ?? "all";
const CONCURRENCY = 4;

async function main() {
  const { TOOLS, CATEGORIES } = await import(resolve(ROOT, "lib/tools-config.ts"));
  const { TOOL_TRANSLATIONS } = await import(resolve(ROOT, "lib/i18n/tool-translations.ts"));
  const { GENERATED_TOOL_TRANSLATIONS } = await import(TOOL_PATH);
  const { GENERATED_CATEGORY_TRANSLATIONS } = await import(CAT_PATH);
  const locales = ONLY_LOCALE ? LOCALES.filter(([c]) => c === ONLY_LOCALE) : LOCALES;

  const key = process.env.MISTRAL_API_KEY;
  if (!DRY_RUN && !key) { console.error("MISTRAL_API_KEY is not set. Aborting."); process.exit(1); }

  if (TARGET === "all" || TARGET === "tools") {
    await processTarget({
      title: "Tools",
      items: TOOLS,
      keyOf: (t) => t.slug,
      fields: ["name", "short", "h1", "metaTitle", "metaDescription"],
      handHas: (slug, loc) => Boolean(TOOL_TRANSLATIONS[slug]?.[loc]),
      generated: structuredClone(GENERATED_TOOL_TRANSLATIONS),
      path: TOOL_PATH,
      typeName: "ToolI18n",
      typeImport: 'import type { ToolI18n } from "./tool-translations";',
      sysNoun: "UI/SEO strings for a tool",
      key,
    });
  }
  if (TARGET === "all" || TARGET === "categories") {
    await processTarget({
      title: "Categories",
      items: CATEGORIES,
      keyOf: (c) => c.id,
      fields: ["label", "blurb"],
      handHas: () => false, // no hand-authored category translations
      generated: structuredClone(GENERATED_CATEGORY_TRANSLATIONS),
      path: CAT_PATH,
      typeName: "CategoryI18n",
      typeImport: "export type CategoryI18n = { label: string; blurb: string };",
      sysNoun: "a tool-category label and one-line blurb",
      key,
    });
  }
}

async function processTarget(cfg) {
  const { title, items, keyOf, fields, handHas, generated, path, key } = cfg;
  const locales = ONLY_LOCALE ? LOCALES.filter(([c]) => c === ONLY_LOCALE) : LOCALES;

  const jobs = [];
  const perLocale = Object.fromEntries(locales.map(([c]) => [c, 0]));
  let touched = 0;
  for (const item of items) {
    const id = keyOf(item);
    let gap = false;
    for (const [code, lang] of locales) {
      if (handHas(id, code) || generated[id]?.[code]) continue;
      perLocale[code]++; gap = true;
      jobs.push({ id, code, lang, en: Object.fromEntries(fields.map((f) => [f, item[f]])) });
    }
    if (gap && ++touched > LIMIT) break;
  }

  console.log(`\n${title} audit (${items.length} × ${locales.length} locales):`);
  for (const [code] of locales) console.log(`  ${code}: ${perLocale[code]} missing`);
  console.log(`  ── ${jobs.length} (item,locale) pairs to fill\n`);

  if (DRY_RUN || jobs.length === 0) { if (DRY_RUN) console.log("Dry run — no API calls."); return; }

  let done = 0, failed = 0;
  const queue = [...jobs];
  const worker = async () => {
    while (queue.length) {
      const job = queue.shift();
      try {
        (generated[job.id] ??= {})[job.code] = await translate(job, fields, cfg.sysNoun, key);
        if (++done % 10 === 0) { await flush(cfg, generated); process.stdout.write(`  …${done}/${jobs.length}\n`); }
      } catch (e) { failed++; console.warn(`  ! ${job.id} [${job.code}]: ${e.message}`); }
    }
  };
  await Promise.all(Array.from({ length: CONCURRENCY }, worker));
  await flush(cfg, generated);
  console.log(`${title}: filled ${done}${failed ? `, ${failed} failed (re-run to retry)` : ""}. ✅`);
}

async function translate(job, fields, sysNoun, key) {
  const sys = `You are a professional software localizer for "Wyrlo", a free online file-converter and tools website. Translate the given ${sysNoun} into ${job.lang}. Rules: keep the brand name "Wyrlo" unchanged; keep technical/format tokens unchanged (SRT, VTT, MP4, PDF, HEX, RGB, JSON, etc.); keep it natural, concise and idiomatic; meta titles should stay roughly under 60 characters and meta descriptions under 160. Return ONLY a JSON object with exactly these keys: ${fields.join(", ")}.`;
  const res = await fetch("https://api.mistral.ai/v1/chat/completions", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "mistral-large-latest", temperature: 0.2,
      response_format: { type: "json_object" },
      messages: [{ role: "system", content: sys }, { role: "user", content: JSON.stringify(job.en) }],
    }),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} ${(await res.text()).slice(0, 120)}`);
  const parsed = JSON.parse((await res.json()).choices[0].message.content);
  for (const f of fields) if (typeof parsed[f] !== "string" || !parsed[f].trim()) throw new Error(`missing "${f}"`);
  return Object.fromEntries(fields.map((f) => [f, parsed[f].trim()]));
}

async function flush(cfg, generated) {
  const sorted = {};
  for (const id of Object.keys(generated).sort()) {
    sorted[id] = {};
    for (const code of Object.keys(generated[id]).sort()) sorted[id][code] = generated[id][code];
  }
  const exportName = cfg.path === CAT_PATH ? "GENERATED_CATEGORY_TRANSLATIONS" : "GENERATED_TOOL_TRANSLATIONS";
  const body = `import type { Locale } from "@/lib/i18n/locales";
${cfg.typeImport}

/**
 * AUTO-GENERATED — do not edit by hand. Produced by scripts/fill-translations.mjs.
 * Machine translations (Mistral Large). Resolvers prefer hand-authored strings.
 */
export const ${exportName}: Record<string, Partial<Record<Locale, ${cfg.typeName}>>> = ${JSON.stringify(sorted, null, 2)};
`;
  await writeFile(cfg.path, body, "utf8");
}

main().catch((e) => { console.error(e); process.exit(1); });
