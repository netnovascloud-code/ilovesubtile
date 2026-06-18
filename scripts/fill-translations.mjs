// Fill missing translations by calling the deployed Konvertools `ai-process` edge
// function (which holds the Mistral API key server-side). The caller only
// needs the public anon key — no MISTRAL_API_KEY required locally.
//
// v5 — bumped to re-trigger after the 4 security tools (virus scanner,
// email verifier, phishing detector, URL scanner) were added EN-only.
//
// Reads NEXT_PUBLIC_SUPABASE_URL + NEXT_PUBLIC_SUPABASE_ANON_KEY from .env
// (or your shell env). Tasks supported: i18n-tool, i18n-category.
//
//   node scripts/fill-translations.mjs --dry-run               # audit only
//   node scripts/fill-translations.mjs                          # fill everything
//   node scripts/fill-translations.mjs --target tools           # tools only
//   node scripts/fill-translations.mjs --target categories
//   node scripts/fill-translations.mjs --target steps           # "How it works" step cards
//   node scripts/fill-translations.mjs --locale fr --limit 20
//
// Resumable: writes the overlay back to disk every 10 successful translations
// so a Ctrl+C / network drop just means re-run to continue.

import { writeFile, readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const TOOL_PATH = resolve(ROOT, "lib/i18n/tool-translations.generated.ts");
const CAT_PATH = resolve(ROOT, "lib/i18n/category-translations.generated.ts");
const STEPS_PATH = resolve(ROOT, "lib/i18n/tool-steps.generated.ts");

const LOCALES = [
  ["fr", "French"], ["es", "Spanish"], ["pt", "Portuguese"], ["de", "German"],
  ["it", "Italian"], ["nl", "Dutch"], ["ja", "Japanese"], ["zh", "Chinese (Simplified)"],
  ["ko", "Korean"], ["ar", "Arabic"], ["ru", "Russian"], ["hi", "Hindi"],
  ["tr", "Turkish"], ["id", "Indonesian"], ["vi", "Vietnamese"], ["sv", "Swedish"],
  ["pl", "Polish"], ["uk", "Ukrainian"], ["cs", "Czech"],
];

const args = process.argv.slice(2);
const has = (f) => args.includes(f);
const valOf = (f) => { const i = args.indexOf(f); return i >= 0 ? args[i + 1] : null; };
const DRY_RUN = has("--dry-run");
const ONLY_LOCALE = valOf("--locale");
const LIMIT = valOf("--limit") ? Number(valOf("--limit")) : Infinity;
const TARGET = valOf("--target") ?? "all";
const CONCURRENCY = Number(valOf("--concurrency") ?? 3);
const MAX_RETRIES = 6;

async function loadEnv() {
  // Read NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY from .env
  // (the standard Next.js dev/build pattern); shell env wins when both set.
  try {
    const raw = await readFile(resolve(ROOT, ".env"), "utf8");
    for (const line of raw.split(/\r?\n/)) {
      const m = /^\s*([A-Z_][A-Z0-9_]*)\s*=\s*(.*)$/.exec(line);
      if (!m) continue;
      if (process.env[m[1]] === undefined) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
    }
  } catch { /* no .env file is fine — the shell may already have the vars */ }
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anon) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY (check .env or shell env)");
  }
  return { url, anon };
}

async function main() {
  const { TOOLS, CATEGORIES } = await import(resolve(ROOT, "lib/tools-config.ts"));
  const { TOOL_TRANSLATIONS } = await import(resolve(ROOT, "lib/i18n/tool-translations.ts"));
  const { GENERATED_TOOL_TRANSLATIONS } = await import(TOOL_PATH);
  const { GENERATED_CATEGORY_TRANSLATIONS } = await import(CAT_PATH);

  const env = DRY_RUN ? null : await loadEnv();

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
      apiTask: "i18n-tool",
      env,
    });
  }
  if (TARGET === "all" || TARGET === "steps") {
    const { HAND_STEP_SLUGS } = await loadHandStepSlugs();
    const { GENERATED_STEP_TRANSLATIONS } = await import(STEPS_PATH);
    await processSteps({
      items: TOOLS.filter((t) => Array.isArray(t.steps) && t.steps.length),
      handHas: (slug, loc) => HAND_STEP_SLUGS.has(`${loc}:${slug}`),
      generated: structuredClone(GENERATED_STEP_TRANSLATIONS),
      env,
    });
  }
  if (TARGET === "all" || TARGET === "categories") {
    await processTarget({
      title: "Categories",
      items: CATEGORIES,
      keyOf: (c) => c.id,
      fields: ["label", "blurb"],
      handHas: () => false,
      generated: structuredClone(GENERATED_CATEGORY_TRANSLATIONS),
      path: CAT_PATH,
      typeName: "CategoryI18n",
      typeImport: "export type CategoryI18n = { label: string; blurb: string };",
      apiTask: "i18n-category",
      env,
    });
  }
}

async function processTarget(cfg) {
  const { title, items, keyOf, fields, handHas, generated, env } = cfg;
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

  if (DRY_RUN) { console.log("Dry run — no API calls."); return; }
  if (jobs.length === 0) { console.log("Nothing to fill. ✅"); return; }

  let done = 0, failed = 0;
  const queue = [...jobs];
  const worker = async () => {
    while (queue.length) {
      const job = queue.shift();
      try {
        (generated[job.id] ??= {})[job.code] = await translate(job, fields, cfg.apiTask, env);
        if (++done % 10 === 0) {
          await flush(cfg, generated);
          process.stdout.write(`  …${done}/${jobs.length}\n`);
        }
      } catch (e) {
        failed++;
        console.warn(`  ! ${job.id} [${job.code}]: ${e.message}`);
      }
    }
  };
  await Promise.all(Array.from({ length: CONCURRENCY }, worker));
  await flush(cfg, generated);
  console.log(`${title}: filled ${done}${failed ? `, ${failed} failed (re-run to retry)` : ""}. ✅`);
}

// Which (locale, slug) step sets are already hand-authored in lib/i18n/tool-steps.ts?
// Parsed from source text — the file can't be `import`ed (path aliases + TS).
async function loadHandStepSlugs() {
  const HAND_STEP_SLUGS = new Set();
  let raw;
  try { raw = await readFile(resolve(ROOT, "lib/i18n/tool-steps.ts"), "utf8"); }
  catch { return { HAND_STEP_SLUGS }; }
  // Each `const <loc>: StepsBySlug = { ... };` block lists slug keys at indent 2.
  const blockRe = /const\s+([a-z]{2}):\s*StepsBySlug\s*=\s*\{/g;
  let m;
  const starts = [];
  while ((m = blockRe.exec(raw))) starts.push({ loc: m[1], idx: m.index });
  for (let i = 0; i < starts.length; i++) {
    const region = raw.slice(starts[i].idx, i + 1 < starts.length ? starts[i + 1].idx : raw.length);
    const keyRe = /\n {2}"?([\w-]+)"?:\s*\[/g;
    let k;
    while ((k = keyRe.exec(region))) HAND_STEP_SLUGS.add(`${starts[i].loc}:${k[1]}`);
  }
  return { HAND_STEP_SLUGS };
}

async function processSteps(cfg) {
  const { items, handHas, generated, env } = cfg;
  const locales = ONLY_LOCALE ? LOCALES.filter(([c]) => c === ONLY_LOCALE) : LOCALES;

  const jobs = [];
  const perLocale = Object.fromEntries(locales.map(([c]) => [c, 0]));
  let touched = 0;
  for (const item of items) {
    const slug = item.slug;
    let gap = false;
    for (const [code, lang] of locales) {
      if (handHas(slug, code) || generated[slug]?.[code]) continue;
      perLocale[code]++; gap = true;
      jobs.push({ slug, code, lang, steps: item.steps.map((s) => ({ title: s.title, body: s.body })) });
    }
    if (gap && ++touched > LIMIT) break;
  }

  console.log(`\nSteps audit (${items.length} tools × ${locales.length} locales):`);
  for (const [code] of locales) console.log(`  ${code}: ${perLocale[code]} missing`);
  console.log(`  ── ${jobs.length} (tool,locale) pairs to fill\n`);
  if (DRY_RUN) { console.log("Dry run — no API calls."); return; }
  if (jobs.length === 0) { console.log("Nothing to fill. ✅"); return; }

  let done = 0, failed = 0;
  const queue = [...jobs];
  const worker = async () => {
    while (queue.length) {
      const job = queue.shift();
      try {
        (generated[job.slug] ??= {})[job.code] = await translateSteps(job, env);
        if (++done % 10 === 0) { await flushSteps(generated); process.stdout.write(`  …${done}/${jobs.length}\n`); }
      } catch (e) { failed++; console.warn(`  ! ${job.slug} [${job.code}]: ${e.message}`); }
    }
  };
  await Promise.all(Array.from({ length: CONCURRENCY }, worker));
  await flushSteps(generated);
  console.log(`Steps: filled ${done}${failed ? `, ${failed} failed (re-run to retry)` : ""}. ✅`);
}

async function translateSteps(job, env) {
  let lastErr;
  const n = job.steps.length;
  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    if (attempt > 0) await sleep(Math.min(2000 * 2 ** (attempt - 1), 30_000) + Math.random() * 500);
    let res;
    try {
      res = await fetch(`${env.url}/functions/v1/ai-process`, {
        method: "POST",
        headers: { apikey: env.anon, Authorization: `Bearer ${env.anon}`, "Content-Type": "application/json", Origin: "https://konvertools.com" },
        body: JSON.stringify({ task: "i18n-tool", text: JSON.stringify({ steps: job.steps }), options: { target: job.lang } }),
      });
    } catch (e) { lastErr = e; continue; }
    if (res.status === 429 || res.status >= 500) { lastErr = new Error(`HTTP ${res.status}`); continue; }
    if (!res.ok) throw new Error(`HTTP ${res.status} ${(await res.text()).slice(0, 160)}`);
    const { output, error, message } = await res.json();
    if (!output) { lastErr = new Error(message ?? error ?? "empty response"); continue; }
    let parsed;
    try { parsed = JSON.parse(output); } catch { lastErr = new Error(`bad output: ${output.slice(0, 120)}`); continue; }
    const arr = Array.isArray(parsed) ? parsed : parsed.steps;
    if (!Array.isArray(arr) || arr.length !== n) { lastErr = new Error("step count mismatch"); continue; }
    let ok = true;
    for (const s of arr) if (!s || typeof s.title !== "string" || typeof s.body !== "string" || !s.title.trim() || !s.body.trim()) { ok = false; break; }
    if (!ok) { lastErr = new Error("incomplete step fields"); continue; }
    return arr.map((s) => ({ title: s.title.trim(), body: s.body.trim() }));
  }
  throw lastErr ?? new Error("exhausted retries");
}

async function flushSteps(generated) {
  const sorted = {};
  for (const slug of Object.keys(generated).sort()) {
    sorted[slug] = {};
    for (const code of Object.keys(generated[slug]).sort()) sorted[slug][code] = generated[slug][code];
  }
  const body = `import type { Locale } from "@/lib/i18n/locales";
import type { LocalisedStep } from "./tool-steps";

/**
 * AUTO-GENERATED — do not edit by hand. Produced by scripts/fill-translations.mjs --target steps.
 * Localised "How it works" step cards, keyed slug → locale. getLocalisedSteps prefers
 * hand-authored steps and falls back to the English source when a pair is absent.
 */
export const GENERATED_STEP_TRANSLATIONS: Record<string, Partial<Record<Locale, LocalisedStep[]>>> = ${JSON.stringify(sorted, null, 2)};
`;
  await writeFile(STEPS_PATH, body, "utf8");
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function translate(job, fields, apiTask, env) {
  let lastErr;
  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    if (attempt > 0) {
      // Exponential backoff with jitter: 2s, 4s, 8s, 16s, 30s(cap)…
      const wait = Math.min(2000 * 2 ** (attempt - 1), 30_000) + Math.random() * 500;
      await sleep(wait);
    }
    let res;
    try {
      res = await fetch(`${env.url}/functions/v1/ai-process`, {
        method: "POST",
        headers: {
          apikey: env.anon,
          Authorization: `Bearer ${env.anon}`,
          "Content-Type": "application/json",
          // Node's fetch doesn't set an Origin header — Supabase's edge gateway
          // rejects requests from unknown origins. Pretend to be the production
          // app so the function's CORS allowlist accepts us.
          Origin: "https://konvertools.com",
        },
        body: JSON.stringify({ task: apiTask, text: JSON.stringify(job.en), options: { target: job.lang } }),
      });
    } catch (e) {
      lastErr = e; continue; // network blip — retry
    }
    // 429 (rate limit) and 5xx (incl. the edge's 502 when Mistral throttles)
    // are transient — back off and retry. Other 4xx are fatal.
    if (res.status === 429 || res.status >= 500) {
      lastErr = new Error(`HTTP ${res.status} ${(await res.text()).slice(0, 120)}`);
      continue;
    }
    if (!res.ok) throw new Error(`HTTP ${res.status} ${(await res.text()).slice(0, 160)}`);

    const { output, error, message } = await res.json();
    if (!output) { lastErr = new Error(message ?? error ?? "empty response"); continue; }
    let parsed;
    try { parsed = JSON.parse(output); }
    catch { lastErr = new Error(`bad model output: ${output.slice(0, 120)}`); continue; }
    let ok = true;
    for (const f of fields) {
      if (typeof parsed[f] !== "string" || !parsed[f].trim()) { ok = false; break; }
    }
    if (!ok) { lastErr = new Error("incomplete fields in response"); continue; }
    return Object.fromEntries(fields.map((f) => [f, parsed[f].trim()]));
  }
  throw lastErr ?? new Error("exhausted retries");
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
 * Machine translations served by Mistral Large via the Konvertools ai-process edge
 * function. Resolvers prefer hand-authored strings over this overlay.
 */
export const ${exportName}: Record<string, Partial<Record<Locale, ${cfg.typeName}>>> = ${JSON.stringify(sorted, null, 2)};
`;
  await writeFile(cfg.path, body, "utf8");
}

main().catch((e) => { console.error(e); process.exit(1); });
