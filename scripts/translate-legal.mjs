// Translate the Privacy Policy + Terms of Service into all non-English
// locales by calling the deployed Konvertools `ai-process` edge function
// with task=translate-legal (Mistral SMALL, JSON-array I/O). One call per
// (locale, document) — total 38 calls for a full pass, well within
// Mistral's rate limits.
//
// Reads NEXT_PUBLIC_SUPABASE_URL + NEXT_PUBLIC_SUPABASE_ANON_KEY from .env
// (or your shell env).
//
//   node scripts/translate-legal.mjs --dry-run           # audit only
//   node scripts/translate-legal.mjs                     # fill missing
//   node scripts/translate-legal.mjs --locale fr         # one locale
//   node scripts/translate-legal.mjs --doc privacy       # one document
//   node scripts/translate-legal.mjs --force             # overwrite existing
//
// v2 — switched from block-by-block translate (~25 large calls per
// locale-doc, instantly rate-limited) to single batched JSON-array call
// per locale-doc using Mistral small.

import { writeFile, readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const OUT_PATH = resolve(ROOT, "lib/legal/legal-translations.generated.ts");

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
const FORCE = has("--force");
const ONLY_LOCALE = valOf("--locale");
const ONLY_DOC = valOf("--doc");

async function loadEnv() {
  try {
    const raw = await readFile(resolve(ROOT, ".env"), "utf8");
    for (const line of raw.split(/\r?\n/)) {
      const m = /^\s*([A-Z_][A-Z0-9_]*)\s*=\s*(.*)$/.exec(line);
      if (!m) continue;
      if (process.env[m[1]] === undefined) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
    }
  } catch { /* shell env already has them */ }
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anon) throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY");
  return { url, anon };
}

/** Flatten a LegalDoc into an ordered list of strings to translate. The
 *  rebuildDoc() inverse uses the same traversal order to put the
 *  translations back. */
function flattenDoc(doc) {
  const strings = [doc.h1, doc.lastUpdatedLabel.replace("%DATE%", "__DATE__")];
  for (const s of doc.sections) {
    strings.push(s.title);
    for (const b of s.blocks) {
      if (b.kind === "p") strings.push(b.text);
      else for (const it of b.items) strings.push(it);
    }
  }
  return strings;
}

function rebuildDoc(doc, translated) {
  let i = 0;
  const out = {
    h1: translated[i++],
    lastUpdated: doc.lastUpdated,
    lastUpdatedLabel: translated[i++].replace("__DATE__", "%DATE%"),
    sections: doc.sections.map((s) => ({
      id: s.id,
      title: translated[i++],
      blocks: s.blocks.map((b) => {
        if (b.kind === "p") return { kind: "p", text: translated[i++] };
        return { kind: "ul", items: b.items.map(() => translated[i++]) };
      }),
    })),
  };
  if (i !== translated.length) {
    throw new Error(`length mismatch: rebuilt ${i} / received ${translated.length}`);
  }
  return out;
}

/** One batched JSON-array call per (locale, doc). Returns the translated
 *  array; throws on HTTP error, missing output or length mismatch. */
async function translateDoc(srcDoc, targetName, env) {
  const strings = flattenDoc(srcDoc);
  const res = await fetch(`${env.url}/functions/v1/ai-process`, {
    method: "POST",
    headers: { Authorization: `Bearer ${env.anon}`, apikey: env.anon, "Content-Type": "application/json" },
    body: JSON.stringify({
      task: "translate-legal",
      text: JSON.stringify(strings),
      options: { target: targetName },
    }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(`HTTP ${res.status} ${JSON.stringify(data).slice(0, 220)}`);
  // ai-process returns { output: <model JSON string> } for wantsJson tasks
  // with response_format: json_object — but our prompt asks for a JSON array.
  // The model wraps it in an object sometimes; handle both shapes.
  let parsed = null;
  try {
    const raw = data.output ?? "";
    parsed = JSON.parse(raw);
  } catch { /* fall through */ }
  if (parsed && !Array.isArray(parsed)) {
    // Common shape: { "result": [...] } / { "translations": [...] } / etc.
    const firstArray = Object.values(parsed).find((v) => Array.isArray(v));
    if (firstArray) parsed = firstArray;
  }
  if (!Array.isArray(parsed)) {
    throw new Error(`output is not a JSON array: ${(data.output ?? "").slice(0, 180)}`);
  }
  if (parsed.length !== strings.length) {
    throw new Error(`length mismatch: sent ${strings.length}, got ${parsed.length}`);
  }
  return rebuildDoc(srcDoc, parsed.map((s) => String(s)));
}

function emitFile(privacy, terms) {
  return [
    `import type { Locale } from "@/lib/seo";`,
    `import type { LegalDoc } from "@/lib/legal/types";`,
    ``,
    `/**`,
    ` * AUTO-GENERATED — do not edit by hand. Produced by scripts/translate-legal.mjs.`,
    ` * Translated via Mistral through the Konvertools ai-process edge function.`,
    ` * Missing entries fall back to English at render time.`,
    ` */`,
    `export const PRIVACY_TRANSLATIONS: Partial<Record<Locale, LegalDoc>> = ${JSON.stringify(privacy, null, 2)};`,
    `export const TERMS_TRANSLATIONS: Partial<Record<Locale, LegalDoc>> = ${JSON.stringify(terms, null, 2)};`,
    ``,
  ].join("\n");
}

async function main() {
  const env = DRY_RUN ? null : await loadEnv();
  const { PRIVACY_EN } = await import(resolve(ROOT, "lib/legal/privacy-en.ts"));
  const { TERMS_EN } = await import(resolve(ROOT, "lib/legal/terms-en.ts"));

  let existing = { PRIVACY_TRANSLATIONS: {}, TERMS_TRANSLATIONS: {} };
  try { existing = await import(OUT_PATH); } catch { /* fresh start */ }
  const privacy = { ...(existing.PRIVACY_TRANSLATIONS ?? {}) };
  const terms = { ...(existing.TERMS_TRANSLATIONS ?? {}) };

  let done = 0, errors = 0;
  for (const [code, name] of LOCALES) {
    if (ONLY_LOCALE && ONLY_LOCALE !== code) continue;
    for (const docName of ["privacy", "terms"]) {
      if (ONLY_DOC && ONLY_DOC !== docName) continue;
      const overlay = docName === "privacy" ? privacy : terms;
      if (overlay[code] && !FORCE) {
        process.stdout.write(`SKIP ${docName}:${code} (already translated; --force to redo)\n`);
        continue;
      }
      if (DRY_RUN) {
        process.stdout.write(`PLAN ${docName}:${code}\n`);
        continue;
      }
      process.stdout.write(`▶ ${docName}:${code} (${name}) — single call\n`);
      try {
        const src = docName === "privacy" ? PRIVACY_EN : TERMS_EN;
        overlay[code] = await translateDoc(src, name, env);
        done++;
        await writeFile(OUT_PATH, emitFile(privacy, terms), "utf8");
        // Pause briefly between calls to keep well under Mistral's rate limit.
        await new Promise((r) => setTimeout(r, 600));
      } catch (e) {
        errors++;
        process.stdout.write(`✗ ${docName}:${code} — ${e instanceof Error ? e.message : String(e)}\n`);
        // Soft back-off on rate-limit errors.
        if (/rate.?limit|429/i.test(String(e))) await new Promise((r) => setTimeout(r, 4000));
      }
    }
  }
  process.stdout.write(`\n${done} translated · ${errors} errors · output: ${OUT_PATH}\n`);
}

main().catch((e) => { console.error(e); process.exit(1); });
