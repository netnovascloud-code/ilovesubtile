import { type Locale } from "@/lib/i18n/locales";

/**
 * Labels for the "where this tool runs" badge on tool cards. Browser tools are
 * private (the file never leaves the device) and free; server/AI tools run on
 * our infrastructure (and may use Mistral). English is the base + fallback for
 * any locale not yet translated here (same degradation as plan-compare / legal).
 */
export type RunsOnStrings = { browser: string; server: string };

const en: RunsOnStrings = { browser: "In your browser", server: "On our servers" };
const fr: RunsOnStrings = { browser: "Dans votre navigateur", server: "Sur nos serveurs" };
const es: RunsOnStrings = { browser: "En tu navegador", server: "En nuestros servidores" };
const pt: RunsOnStrings = { browser: "No seu navegador", server: "Nos nossos servidores" };
const de: RunsOnStrings = { browser: "In deinem Browser", server: "Auf unseren Servern" };
const it: RunsOnStrings = { browser: "Nel tuo browser", server: "Sui nostri server" };
const nl: RunsOnStrings = { browser: "In je browser", server: "Op onze servers" };
const ja: RunsOnStrings = { browser: "ブラウザー内", server: "当社のサーバー上" };
const zh: RunsOnStrings = { browser: "在您的浏览器中", server: "在我们的服务器上" };
const ko: RunsOnStrings = { browser: "브라우저에서", server: "당사 서버에서" };
const ar: RunsOnStrings = { browser: "في متصفحك", server: "على خوادمنا" };
const ru: RunsOnStrings = { browser: "В вашем браузере", server: "На наших серверах" };
const hi: RunsOnStrings = { browser: "आपके ब्राउज़र में", server: "हमारे सर्वर पर" };
const tr: RunsOnStrings = { browser: "Tarayıcınızda", server: "Sunucularımızda" };
const id: RunsOnStrings = { browser: "Di browser Anda", server: "Di server kami" };
const vi: RunsOnStrings = { browser: "Trong trình duyệt của bạn", server: "Trên máy chủ của chúng tôi" };
const sv: RunsOnStrings = { browser: "I din webbläsare", server: "På våra servrar" };
const pl: RunsOnStrings = { browser: "W Twojej przeglądarce", server: "Na naszych serwerach" };
const uk: RunsOnStrings = { browser: "У вашому браузері", server: "На наших серверах" };
const cs: RunsOnStrings = { browser: "Ve vašem prohlížeči", server: "Na našich serverech" };

const TABLE: Partial<Record<Locale, RunsOnStrings>> = { en, fr, es, pt, de, it, nl, ja, zh, ko, ar, ru, hi, tr, id, vi, sv, pl, uk, cs };

export function getRunsOn(locale: Locale): RunsOnStrings {
  return TABLE[locale] ?? en;
}

/** Where a tool executes, derived from its `kind`. client + ffmpeg run entirely
 *  in the browser (private, free); edge + ai run server-side. */
export function runsOnKind(kind: "client" | "edge" | "ffmpeg" | "ai"): "browser" | "server" {
  return kind === "client" || kind === "ffmpeg" ? "browser" : "server";
}
