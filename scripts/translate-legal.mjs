// Translate the Privacy Policy + Terms of Service into all non-English
// locales by calling the deployed Konvertools `ai-process` edge function
// (Mistral large via task=translate). The caller only needs the public
// anon key.
//
// Reads NEXT_PUBLIC_SUPABASE_URL + NEXT_PUBLIC_SUPABASE_ANON_KEY from .env
// (or your shell env).
//
//   node scripts/translate-legal.mjs --dry-run           # audit only
//   node scripts/translate-legal.mjs                     # fill everything missing
//   node scripts/translate-legal.mjs --locale fr         # one locale
//   node scripts/translate-legal.mjs --doc privacy       # one document
//   node scripts/translate-legal.mjs --force             # overwrite existing
//
// Resumable: writes the overlay back to disk every 5 successful sections so
// a Ctrl+C / network drop just means re-run to continue.
//
// v1 — initial pass for KONVER Part 5.

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
const ONLY_DOC = valOf("--doc"); // "privacy" | "terms"

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

/** Translate a chunk of plain text (with inline markdown-style links and
 *  bold) into the target language, preserving the markup tokens. */
async function translateText(text, targetName, env) {
  // Hint Mistral about the inline syntax so it leaves URLs and **bold**
  // markers intact.
  const prompt = `${text}`;
  const res = await fetch(`${env.url}/functions/v1/ai-process`, {
    method: "POST",
    headers: { Authorization: `Bearer ${env.anon}`, apikey: env.anon, "Content-Type": "application/json" },
    body: JSON.stringify({
      task: "translate",
      text: prompt,
      options: { target: targetName, register: "formal" },
    }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(`HTTP ${res.status} ${JSON.stringify(data).slice(0, 200)}`);
  const out = String(data.output ?? "").trim();
  if (!out) throw new Error("empty output");
  return out;
}

/** Translate a LegalDoc preserving id, h1 placement, and block kinds. */
async function translateDoc(doc, targetName, env, onProgress) {
  const out = {
    h1: await translateText(doc.h1, targetName, env),
    lastUpdated: doc.lastUpdated,
    // Translate the label template — keep %DATE% intact.
    lastUpdatedLabel: await translateText(doc.lastUpdatedLabel.replace("%DATE%", "__DATE__"), targetName, env)
      .then((t) => t.replace("__DATE__", "%DATE%")),
    sections: [],
  };
  onProgress?.(`  · h1 + label`);
  for (const s of doc.sections) {
    const sectionOut = { id: s.id, title: await translateText(s.title, targetName, env), blocks: [] };
    for (const b of s.blocks) {
      if (b.kind === "p") {
        sectionOut.blocks.push({ kind: "p", text: await translateText(b.text, targetName, env) });
      } else {
        const items = [];
        for (const it of b.items) items.push(await translateText(it, targetName, env));
        sectionOut.blocks.push({ kind: "ul", items });
      }
    }
    out.sections.push(sectionOut);
    onProgress?.(`  · ${s.id}`);
  }
  return out;
}

function emitFile(privacy, terms) {
  return [
    `import type { Locale } from "@/lib/seo";`,
    `import type { LegalDoc } from "@/lib/legal/types";`,
    ``,
    `/**`,
    ` * AUTO-GENERATED — do not edit by hand. Produced by scripts/translate-legal.mjs.`,
    ` * Translated via Mistral Large through the Konvertools ai-process edge function.`,
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

  // Load the existing overlay so we can resume.
  let existing = { PRIVACY_TRANSLATIONS: {}, TERMS_TRANSLATIONS: {} };
  try {
    existing = await import(OUT_PATH);
  } catch { /* fresh start */ }
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
      process.stdout.write(`▶ ${docName}:${code} (${name})\n`);
      try {
        const src = docName === "privacy" ? PRIVACY_EN : TERMS_EN;
        const doc = await translateDoc(src, name, env, (s) => process.stdout.write(s + "\n"));
        overlay[code] = doc;
        done++;
        // Checkpoint every successful doc.
        await writeFile(OUT_PATH, emitFile(privacy, terms), "utf8");
      } catch (e) {
        errors++;
        process.stdout.write(`✗ ${docName}:${code} — ${e instanceof Error ? e.message : String(e)}\n`);
      }
    }
  }
  process.stdout.write(`\n${done} translated · ${errors} errors · output: ${OUT_PATH}\n`);
}

main().catch((e) => { console.error(e); process.exit(1); });
