// Konver smoke test (v12) — runs in GitHub Actions against a freshly-built
// prod Next server on localhost:3000. For each tool slug:
//   1) navigate to /<slug>
//   2) assert HTTP 200
//   3) assert an <h1> renders
//   4) assert no unhandled page errors / console errors (filtered)
// Then a deeper "interactive" pass on 10 representative tools that asserts
// the actual feature reacts to input.
//
// Output: writes a markdown report to GITHUB_STEP_SUMMARY (visible inline on
// the workflow run page) and exits 1 if any check fails.

import { chromium } from "playwright";
import { appendFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const BASE = process.env.SMOKE_BASE_URL ?? "http://localhost:3000";
// Always write the full report to a stable repo-relative path so CI can
// commit it back. GITHUB_STEP_SUMMARY is appended in addition.
const REPORT_PATH = process.env.SMOKE_REPORT_PATH ?? resolve(ROOT, "SMOKE_TEST_REPORT.md");

// Import the actual tools array straight from the app source (Node 22 strips
// the TS types; lib/tools-config.ts has no runtime imports beyond lucide).
const { TOOLS } = await import(resolve(ROOT, "lib/tools-config.ts"));

// Slugs whose pages talk to a server we can't or shouldn't hit in CI. We still
// visit them, but skip the strict-console-error rule for known external 4xx/5xx
// resources (Ezoic, Mistral, Stripe) and FFmpeg.wasm warm-up logs.
const NOISE_RE = /(favicon|chrome-extension|sandbox iframe|web-vitals|Failed to load resource: net::ERR_|the resource was preloaded|ezoic|google-analytics|Manifest|Download the React|Preflight|Service Worker|Request timed out|wasm streaming compile|tracking)/i;

const results = [];
function record(slug, ok, detail = "") {
  results.push({ slug, ok, detail });
  process.stdout.write(`${ok ? "PASS" : "FAIL"}  ${slug}${ok ? "" : "  → " + detail}\n`);
}

const browser = await chromium.launch();

// Minimal valid 16-bit PCM mono WAV (~0.2s) generated in-memory — used to
// drive a REAL FFmpeg conversion through the browser worker pipeline.
function makeWav() {
  const sampleRate = 8000, n = Math.floor(sampleRate * 0.2);
  const data = Buffer.alloc(n * 2);
  for (let i = 0; i < n; i++) data.writeInt16LE(Math.round(Math.sin(i / 8) * 3000), i * 2);
  const h = Buffer.alloc(44);
  h.write("RIFF", 0); h.writeUInt32LE(36 + data.length, 4); h.write("WAVE", 8);
  h.write("fmt ", 12); h.writeUInt32LE(16, 16); h.writeUInt16LE(1, 20); h.writeUInt16LE(1, 22);
  h.writeUInt32LE(sampleRate, 24); h.writeUInt32LE(sampleRate * 2, 28); h.writeUInt16LE(2, 32); h.writeUInt16LE(16, 34);
  h.write("data", 36); h.writeUInt32LE(data.length, 40);
  return Buffer.concat([h, data]);
}
const WAV = makeWav();

// ── Pass 1 — every route loads cleanly ────────────────────────────────────
for (const tool of TOOLS) {
  const ctx = await browser.newContext({ ignoreHTTPSErrors: true });
  const page = await ctx.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push("pageerror: " + e.message));
  page.on("console", (msg) => msg.type() === "error" && errors.push("console: " + msg.text()));
  try {
    const res = await page.goto(`${BASE}/${tool.slug}`, { timeout: 30_000, waitUntil: "domcontentloaded" });
    if (!res) { record(tool.slug, false, "no response"); continue; }
    if (res.status() !== 200) { record(tool.slug, false, `HTTP ${res.status()}`); continue; }
    // h1 must render — proves the page hydrated past the metadata/shell.
    const h1 = await page.locator("h1").first().innerText({ timeout: 5_000 }).catch(() => "");
    if (!h1.trim()) { record(tool.slug, false, "no h1 rendered"); continue; }
    // Give the page a beat to flush any deferred console errors from hydration.
    await page.waitForTimeout(300);
    const real = errors.filter((e) => !NOISE_RE.test(e));
    if (real.length) { record(tool.slug, false, `${real[0].slice(0, 200)}`); continue; }
    record(tool.slug, true);
  } catch (e) {
    record(tool.slug, false, (e instanceof Error ? e.message : String(e)).slice(0, 200));
  } finally {
    await ctx.close();
  }
}

// ── Pass 2 — interactive checks on 10 high-value tools ────────────────────
const INTERACTIVE = [
  { slug: "age-calculator", run: async (page) => {
    await page.locator('input[type="date"]').first().fill("1990-06-15");
    await page.waitForTimeout(400);
    const body = await page.locator("body").innerText();
    if (!/year/i.test(body)) throw new Error("no age in body");
  }},
  { slug: "roman-numeral-converter", run: async (page) => {
    const input = page.locator('input[inputmode="numeric"]').first();
    await input.fill("100");
    await page.waitForTimeout(300);
    const body = await page.locator("body").innerText();
    if (!/=\s*C\b/.test(body)) throw new Error("no roman result for 100");
  }},
  { slug: "color-palette-generator", run: async (page) => {
    const input = page.locator('input[type="text"], input[type="color"]').first();
    await input.fill("#4f46e5").catch(() => {});
    await page.waitForTimeout(300);
    // 5 schemes × 2-5 swatches = at least 8 swatch buttons.
    const count = await page.locator('button:has(div[style*="background"])').count();
    if (count < 8) throw new Error(`only ${count} swatches rendered`);
  }},
  { slug: "timezone-converter", run: async (page) => {
    const text = await page.locator("body").innerText();
    if (!/UTC/i.test(text)) throw new Error("no UTC offset shown");
  }},
  { slug: "email-signature-generator", run: async (page) => {
    // First text input is "Full name" — change it and verify the preview reflects it.
    await page.locator('input[type="text"]').first().fill("Test Konver");
    await page.waitForTimeout(300);
    const body = await page.locator("body").innerText();
    if (!body.includes("Test Konver")) throw new Error("preview didn't update");
  }},
  { slug: "hash-generator", run: async (page) => {
    await page.locator("textarea").first().fill("hello");
    await page.waitForTimeout(400);
    const body = await page.locator("body").innerText();
    // SHA-256 of "hello" = 2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824
    if (!body.includes("2cf24dba")) throw new Error("SHA-256('hello') not rendered");
  }},
  { slug: "color-converter", run: async (page) => {
    // Picker + hex input; type a known hex and look for the matching RGB.
    const hexIn = page.locator('input').filter({ hasText: "" }).first();
    await hexIn.fill("#ff0000").catch(() => {});
    await page.waitForTimeout(300);
    const body = await page.locator("body").innerText();
    if (!/255/.test(body)) throw new Error("no RGB output");
  }},
  { slug: "unit-converter", run: async (page) => {
    const body = await page.locator("body").innerText();
    if (!/meter|metre|kilo|temperature|length/i.test(body)) throw new Error("no unit UI");
  }},
  { slug: "case-converter", run: async (page) => {
    await page.locator("textarea").first().fill("hello world");
    await page.waitForTimeout(300);
    const body = await page.locator("body").innerText();
    if (!/HELLO WORLD/.test(body)) throw new Error("uppercase output missing");
  }},
  { slug: "qr-generator", run: async (page) => {
    const before = await page.locator("svg, canvas").count();
    await page.locator('input, textarea').first().fill("https://konver.app");
    await page.waitForTimeout(500);
    const after = await page.locator("svg, canvas").count();
    if (after < Math.max(1, before)) throw new Error("no QR canvas/svg rendered");
  }},
  // REAL FFmpeg end-to-end: uploads a generated WAV and converts it to MP3.
  // On failure we surface the on-page error text + console errors so CI tells
  // us exactly why (instead of a bare timeout).
  { slug: "wav-to-mp3", run: async (page) => {
    const consoleErrs = [];
    page.on("console", (m) => m.type() === "error" && consoleErrs.push(m.text()));
    page.on("pageerror", (e) => consoleErrs.push("pageerror: " + e.message));
    await page.locator('input[type="file"]').first().setInputFiles({ name: "tone.wav", mimeType: "audio/wav", buffer: WAV });
    await page.getByRole("button", { name: /^Convert$/ }).first().click();
    // Success = a download link; failure = the "Conversion failed:" paragraph.
    // Match the error string EXACTLY (the old matcher greedily matched the
    // benign "Loading FFmpeg…" status and aborted before the conversion ran).
    const dl = page.locator("a[download]").first();
    const errP = page.locator("text=/Conversion failed/i").first();
    const winner = await Promise.race([
      dl.waitFor({ state: "visible", timeout: 150_000 }).then(() => "ok").catch(() => "timeout"),
      errP.waitFor({ state: "visible", timeout: 150_000 }).then(() => "err").catch(() => "timeout"),
    ]);
    if (winner === "ok") return;
    const onPage = await errP.innerText().catch(() => "");
    const status = await page.locator("body").innerText().catch(() => "");
    const stuck = /Loading FFmpeg|Converting/.test(status) ? " [still in loading/converting state — load() hung]" : "";
    throw new Error(`no download (${winner})${stuck}. err="${onPage.slice(0, 140)}" console=${JSON.stringify(consoleErrs.slice(0, 3))}`);
  }},
];

for (const { slug, run } of INTERACTIVE) {
  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  try {
    const res = await page.goto(`${BASE}/${slug}`, { timeout: 30_000, waitUntil: "domcontentloaded" });
    if (!res || res.status() !== 200) { record(`${slug} [interactive]`, false, `HTTP ${res?.status() ?? "?"}`); continue; }
    await page.waitForTimeout(400); // settle hydration
    await run(page);
    record(`${slug} [interactive]`, true);
  } catch (e) {
    record(`${slug} [interactive]`, false, (e instanceof Error ? e.message : String(e)).slice(0, 200));
  } finally {
    await ctx.close();
  }
}

await browser.close();

// ── Pass 3 — real AI calls against the deployed edge functions ────────────
// Bypasses the browser and hits the prod Supabase functions directly so we
// detect Mistral / quota / CORS regressions, not just page load. Anonymous
// calls are allowed by design (client-gated); CORS allows localhost:3000.
// Cost is bounded: 6 small Mistral calls per run.
const SB_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
async function aiCall(fn, body, timeoutMs = 60_000) {
  if (!SB_URL) throw new Error("NEXT_PUBLIC_SUPABASE_URL not set");
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const r = await fetch(`${SB_URL}/functions/v1/${fn}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Origin: "http://localhost:3000" },
      body: JSON.stringify(body),
      signal: ctrl.signal,
    });
    const text = await r.text();
    let json = null;
    try { json = JSON.parse(text); } catch { /* leave as text */ }
    return { ok: r.ok, status: r.status, json, text };
  } finally {
    clearTimeout(t);
  }
}

const AI = [
  { name: "ai-process:synonyms", run: async () => {
    const r = await aiCall("ai-process", { task: "synonyms", text: "happy" });
    if (!r.ok) throw new Error(`HTTP ${r.status} ${r.text.slice(0, 120)}`);
    const out = String(r.json?.output ?? "");
    if (out.length < 5) throw new Error(`empty output: "${out}"`);
  }},
  { name: "ai-process:conjugate", run: async () => {
    const r = await aiCall("ai-process", { task: "conjugate", text: "to run" });
    if (!r.ok) throw new Error(`HTTP ${r.status} ${r.text.slice(0, 120)}`);
    const out = String(r.json?.output ?? "");
    if (!/run|ran|running/i.test(out)) throw new Error(`no conjugation of 'run' in: "${out.slice(0, 160)}"`);
  }},
  { name: "ai-process:rephrase (no markdown)", run: async () => {
    const r = await aiCall("ai-process", { task: "rephrase", text: "Hey can u send file asap thx", options: { style: "Professional" } });
    if (!r.ok) throw new Error(`HTTP ${r.status} ${r.text.slice(0, 120)}`);
    const out = String(r.json?.output ?? "");
    if (out.length < 5) throw new Error(`empty output: "${out}"`);
    if (/\*\*|^#{1,6} /m.test(out)) throw new Error(`markdown leaked: "${out.slice(0, 160)}"`);
  }},
  { name: "ai-process:translate (target lang)", run: async () => {
    const r = await aiCall("ai-process", { task: "translate", text: "Hello world", options: { target: "French" } });
    if (!r.ok) throw new Error(`HTTP ${r.status} ${r.text.slice(0, 120)}`);
    const out = String(r.json?.output ?? "").toLowerCase();
    if (!/(bonjour|monde|salut)/.test(out)) throw new Error(`not French: "${out.slice(0, 160)}"`);
  }},
  { name: "ai-process:ai-detect (JSON shape)", run: async () => {
    const r = await aiCall("ai-process", {
      task: "ai-detect",
      text: "The aforementioned methodology facilitates the optimization of operational efficiencies across the organization, enabling stakeholders to leverage synergies in a holistic manner. Furthermore, it is crucial to note that the implementation of such a paradigm shift requires a comprehensive evaluation of existing frameworks.",
    });
    if (!r.ok) throw new Error(`HTTP ${r.status} ${r.text.slice(0, 120)}`);
    let parsed;
    try { parsed = JSON.parse(r.json?.output ?? ""); } catch { throw new Error(`output is not JSON: ${String(r.json?.output).slice(0, 160)}`); }
    if (typeof parsed.score !== "number" || parsed.score < 0 || parsed.score > 100) throw new Error(`bad score: ${parsed.score}`);
    if (!Array.isArray(parsed.reasons)) throw new Error("reasons missing");
  }},
  { name: "ai-process:citation (APA)", run: async () => {
    const r = await aiCall("ai-process", {
      task: "citation",
      text: "style: APA\nTitle: The Selfish Gene\nAuthor: Richard Dawkins\nYear: 1976\nPublisher: Oxford University Press",
    });
    if (!r.ok) throw new Error(`HTTP ${r.status} ${r.text.slice(0, 120)}`);
    const out = String(r.json?.output ?? "");
    if (!/Dawkins/.test(out) || !/1976/.test(out)) throw new Error(`missing Dawkins/1976 in: "${out.slice(0, 160)}"`);
  }},
];

if (SB_URL) {
  for (const t of AI) {
    try { await t.run(); record(`AI ${t.name}`, true); }
    catch (e) { record(`AI ${t.name}`, false, (e instanceof Error ? e.message : String(e)).slice(0, 220)); }
  }
} else {
  process.stdout.write("SKIP AI live tests — NEXT_PUBLIC_SUPABASE_URL not set\n");
}

// ── Report ────────────────────────────────────────────────────────────────
const passCount = results.filter((r) => r.ok).length;
const failed = results.filter((r) => !r.ok);
const md = [
  `# Konver smoke test — ${passCount}/${results.length} passed`,
  "",
  failed.length === 0
    ? "✅ All routes load with no console errors, h1 renders, and all 10 interactive checks pass."
    : `❌ ${failed.length} failures — see below.`,
  "",
  "## Failures",
  failed.length === 0 ? "_None._" : "",
  ...failed.map((r) => `- **${r.slug}** — ${r.detail}`),
  "",
  "## Passes",
  ...results.filter((r) => r.ok).map((r) => `- ${r.slug}`),
];
const out = md.join("\n");
writeFileSync(REPORT_PATH, out, "utf8");
if (process.env.GITHUB_STEP_SUMMARY) appendFileSync(process.env.GITHUB_STEP_SUMMARY, "\n" + out);
console.log("\n" + out);

if (failed.length > 0) process.exit(1);
