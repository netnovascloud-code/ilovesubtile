// Fill missing tool translations via Mistral Large.
//
//   node scripts/fill-translations.mjs --dry-run        # audit only, no API calls
//   MISTRAL_API_KEY=... node scripts/fill-translations.mjs              # fill all gaps
//   MISTRAL_API_KEY=... node scripts/fill-translations.mjs --locale fr  # one locale
//   MISTRAL_API_KEY=... node scripts/fill-translations.mjs --limit 20   # cap tools
//
// Reads the English source from lib/tools-config.ts and the existing
// hand-authored + generated translations, finds every (tool, locale) pair
// with no translation, asks Mistral to translate the 5 SEO/UI fields, and
// writes the results into lib/i18n/tool-translations.generated.ts. Safe to
// re-run: it only fills what is still missing, so it resumes after a crash.
//
// Requires Node 22.18+ (native TypeScript type-stripping — these imports are
// type-only at runtime, so no build step is needed).

import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const GENERATED_PATH = resolve(ROOT, "lib/i18n/tool-translations.generated.ts");

// The 12 non-English UI locales (locales.ts re-exports through the @/ alias,
// which a plain node script can't resolve — so the list is inlined here).
const LOCALES = [
  ["fr", "French"], ["es", "Spanish"], ["pt", "Portuguese"], ["de", "German"],
  ["it", "Italian"], ["nl", "Dutch"], ["ja", "Japanese"], ["zh", "Chinese (Simplified)"],
  ["ko", "Korean"], ["ar", "Arabic"], ["ru", "Russian"], ["hi", "Hindi"],
];
const FIELDS = ["name", "short", "h1", "metaTitle", "metaDescription"];

const args = process.argv.slice(2);
const has = (f) => args.includes(f);
const valOf = (f) => { const i = args.indexOf(f); return i >= 0 ? args[i + 1] : null; };
const DRY_RUN = has("--dry-run");
const ONLY_LOCALE = valOf("--locale");
const LIMIT = valOf("--limit") ? Number(valOf("--limit")) : Infinity;
const CONCURRENCY = 4;

async function main() {
  const { TOOLS } = await import(resolve(ROOT, "lib/tools-config.ts"));
  const { TOOL_TRANSLATIONS } = await import(resolve(ROOT, "lib/i18n/tool-translations.ts"));
  const { GENERATED_TOOL_TRANSLATIONS } = await import(GENERATED_PATH);

  const generated = structuredClone(GENERATED_TOOL_TRANSLATIONS);
  const locales = ONLY_LOCALE ? LOCALES.filter(([c]) => c === ONLY_LOCALE) : LOCALES;

  // Build the work list: every (tool, locale) with no hand-authored or
  // previously-generated translation.
  const jobs = [];
  const perLocaleMissing = Object.fromEntries(locales.map(([c]) => [c, 0]));
  let toolsTouched = 0;
  for (const tool of TOOLS) {
    let toolHasGap = false;
    for (const [code, lang] of locales) {
      const hand = TOOL_TRANSLATIONS[tool.slug]?.[code];
      const gen = generated[tool.slug]?.[code];
      if (hand || gen) continue;
      perLocaleMissing[code]++;
      toolHasGap = true;
      jobs.push({ slug: tool.slug, code, lang, en: pickEn(tool) });
    }
    if (toolHasGap && ++toolsTouched > LIMIT) break;
  }

  console.log(`\nTranslation audit (${TOOLS.length} tools × ${locales.length} locales):`);
  for (const [code] of locales) console.log(`  ${code}: ${perLocaleMissing[code]} missing`);
  console.log(`  ── ${jobs.length} (tool,locale) pairs to fill${LIMIT !== Infinity ? ` (capped to ${toolsTouched - 1} tools)` : ""}\n`);

  if (DRY_RUN) { console.log("Dry run — no API calls made."); return; }
  if (jobs.length === 0) { console.log("Nothing to fill. ✅"); return; }

  const key = process.env.MISTRAL_API_KEY;
  if (!key) { console.error("MISTRAL_API_KEY is not set. Aborting."); process.exit(1); }

  let done = 0, failed = 0;
  const queue = [...jobs];
  async function worker() {
    while (queue.length) {
      const job = queue.shift();
      try {
        const out = await translate(job, key);
        (generated[job.slug] ??= {})[job.code] = out;
        if (++done % 10 === 0) { await flush(generated); process.stdout.write(`  …${done}/${jobs.length}\n`); }
      } catch (e) {
        failed++;
        console.warn(`  ! ${job.slug} [${job.code}]: ${e.message}`);
      }
    }
  }
  await Promise.all(Array.from({ length: CONCURRENCY }, worker));
  await flush(generated);
  console.log(`\nFilled ${done} translations${failed ? `, ${failed} failed (re-run to retry)` : ""}. ✅`);
}

function pickEn(tool) {
  return Object.fromEntries(FIELDS.map((f) => [f, tool[f]]));
}

async function translate(job, key) {
  const sys = `You are a professional software localizer for "Wyrlo", a free online file-converter and tools website. Translate the given UI/SEO strings into ${job.lang}. Rules: keep the brand name "Wyrlo" unchanged; keep technical/format tokens unchanged (SRT, VTT, MP4, PDF, HEX, RGB, JSON, etc.); keep it natural, concise and idiomatic; the metaTitle should stay roughly under 60 characters and metaDescription under 160. Return ONLY a JSON object with exactly these keys: ${FIELDS.join(", ")}.`;
  const res = await fetch("https://api.mistral.ai/v1/chat/completions", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "mistral-large-latest",
      temperature: 0.2,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: sys },
        { role: "user", content: JSON.stringify(job.en) },
      ],
    }),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} ${(await res.text()).slice(0, 120)}`);
  const data = await res.json();
  const parsed = JSON.parse(data.choices[0].message.content);
  for (const f of FIELDS) {
    if (typeof parsed[f] !== "string" || !parsed[f].trim()) throw new Error(`missing field "${f}" in response`);
  }
  return Object.fromEntries(FIELDS.map((f) => [f, parsed[f].trim()]));
}

async function flush(generated) {
  // Stable key order for clean diffs.
  const sorted = {};
  for (const slug of Object.keys(generated).sort()) {
    sorted[slug] = {};
    for (const code of Object.keys(generated[slug]).sort()) sorted[slug][code] = generated[slug][code];
  }
  const body = `import type { Locale } from "@/lib/i18n/locales";
import type { ToolI18n } from "./tool-translations";

/**
 * AUTO-GENERATED — do not edit by hand. Produced by scripts/fill-translations.mjs.
 * Machine translations (Mistral Large) for tools without a hand-authored entry.
 * The resolver prefers hand-authored strings field-by-field over this overlay.
 */
export const GENERATED_TOOL_TRANSLATIONS: Record<string, Partial<Record<Locale, ToolI18n>>> = ${JSON.stringify(sorted, null, 2)};
`;
  await writeFile(GENERATED_PATH, body, "utf8");
}

main().catch((e) => { console.error(e); process.exit(1); });
