import type { ToolDefinition } from "@/lib/tools-config";
import type { Locale } from "@/lib/seo";

// Locale-aware fragments used to expand a tool into the phrasings people
// actually type into Google. Deliberately deterministic (no AI): the goal is
// to capture obvious variants — converters ("mp3 to mp4", "convertir mp3 en
// mp4"), plus "online"/"free" modifiers — in the page's own language.
//
// Type-only imports above keep this module free of runtime imports, so it can
// be loaded anywhere without pulling in the whole tools graph.

const CONNECTORS: Record<Locale, string[]> = {
  en: ["to"], fr: ["en", "vers"], es: ["a"], pt: ["para"], de: ["in", "zu"],
  it: ["in"], nl: ["naar"], ja: ["to"], zh: ["to"], ko: ["to"], ar: ["to"],
  ru: ["в"], hi: ["to"],
  tr: ["ye"], id: ["ke"], vi: ["sang"], sv: ["till"], pl: ["do"], uk: ["в"], cs: ["do"],
};
const CONVERT: Record<Locale, string> = {
  en: "convert", fr: "convertir", es: "convertir", pt: "converter",
  de: "konvertieren", it: "convertire", nl: "converteren", ja: "変換",
  zh: "转换", ko: "변환", ar: "تحويل", ru: "конвертировать", hi: "बदलें",
  tr: "dönüştür", id: "konversi", vi: "chuyển đổi", sv: "konvertera",
  pl: "konwertuj", uk: "конвертувати", cs: "převést",
};
const ONLINE: Record<Locale, string> = {
  en: "online", fr: "en ligne", es: "online", pt: "online", de: "online",
  it: "online", nl: "online", ja: "オンライン", zh: "在线", ko: "온라인",
  ar: "عبر الإنترنت", ru: "онлайн", hi: "ऑनलाइन",
  tr: "çevrimiçi", id: "online", vi: "trực tuyến", sv: "online",
  pl: "online", uk: "онлайн", cs: "online",
};
const FREE: Record<Locale, string> = {
  en: "free", fr: "gratuit", es: "gratis", pt: "grátis", de: "kostenlos",
  it: "gratis", nl: "gratis", ja: "無料", zh: "免费", ko: "무료",
  ar: "مجاني", ru: "бесплатно", hi: "मुफ़्त",
  tr: "ücretsiz", id: "gratis", vi: "miễn phí", sv: "gratis",
  pl: "darmowy", uk: "безкоштовно", cs: "zdarma",
};

/** Split an "a-to-b" slug into its two format tokens, if it is one. */
function converterParts(slug: string): [string, string] | null {
  const m = /^([a-z0-9]+)-to-([a-z0-9]+)$/.exec(slug);
  return m ? [m[1], m[2]] : null;
}

/** Slug → extra keyword variants for tools whose phrasing doesn't follow the
 *  "X to Y" converter pattern. Keep in sync with the security-category tools
 *  and any future addition that has distinct search-intent variants. */
const SECURITY_VARIANTS: Record<string, string[]> = {
  "ssl-checker": [
    "ssl checker", "ssl certificate checker", "check ssl certificate",
    "ssl expiry checker", "verify ssl certificate", "tls certificate checker",
    "is my ssl valid", "certificate expiration check",
  ],
  "password-checker": [
    "password breach checker", "check if password compromised", "has my password been leaked",
    "pwned password checker", "is my password safe", "password leak checker",
    "have i been pwned password",
  ],
  "email-checker": [
    "email verifier free", "check email valid", "verify email address",
    "email validation tool", "is this email real", "email reliability check",
    "disposable email checker", "mx record check email",
  ],
  "phishing-detector": [
    "phishing email checker", "is this email a scam", "check email scam",
    "phishing detector free", "scam email check", "fraud email detector",
    "ai phishing detection",
  ],
  "url-scanner": [
    "check if link is safe", "url scanner", "is this website safe",
    "safe link checker", "phishing url check", "malicious link scanner",
    "google safe browsing check",
  ],
};

/** All keyword phrasings for a tool in a given locale (deduped, lowercased). */
export function toolKeywords(tool: ToolDefinition, locale: Locale = "en"): string[] {
  const out = new Set<string>();
  const pk = tool.primaryKeyword.toLowerCase();
  out.add(pk);
  out.add(tool.name.toLowerCase());
  out.add(`${pk} ${ONLINE[locale]}`);
  out.add(`${pk} ${FREE[locale]}`);

  const parts = converterParts(tool.slug);
  if (parts) {
    const [a, b] = parts;
    for (const c of CONNECTORS[locale]) {
      out.add(`${a} ${c} ${b}`);
      out.add(`${CONVERT[locale]} ${a} ${c} ${b}`);
      out.add(`${a} ${c} ${b} ${ONLINE[locale]}`);
    }
    // The latin "a to b" form is searched everywhere regardless of locale.
    out.add(`${a} to ${b}`);
    out.add(`${a} to ${b} converter`);
  }

  // Hand-curated long-tail variants for the security tools (no converter
  // pattern to expand from). Always English — security terminology is the
  // same in every major language search box.
  for (const v of SECURITY_VARIANTS[tool.slug] ?? []) out.add(v);

  return [...out].filter(Boolean);
}

const ALSO_LABEL: Record<Locale, string> = {
  en: "Also searched as", fr: "Aussi recherché", es: "También buscado como",
  pt: "Também pesquisado como", de: "Auch gesucht als", it: "Cercato anche come",
  nl: "Ook gezocht als", ja: "別名", zh: "也被搜索为", ko: "다음으로도 검색됨",
  ar: "يُبحث عنه أيضًا بـ", ru: "Также ищут как", hi: "इस रूप में भी खोजा गया",
  tr: "Şu şekilde de aranır", id: "Juga dicari sebagai", vi: "Còn được tìm là",
  sv: "Söks även som", pl: "Wyszukiwane też jako", uk: "Також шукають як",
  cs: "Hledáno také jako",
};

/** A short, natural "also searched as" line for converter tools (or null). */
export function alsoSearchedAs(tool: ToolDefinition, locale: Locale = "en"): string | null {
  const parts = converterParts(tool.slug);
  if (!parts) return null;
  const [a, b] = parts;
  const A = a.toUpperCase(), B = b.toUpperCase(), c = CONNECTORS[locale][0];
  const variants = new Set<string>([`${A} ${c} ${B}`]);
  variants.add(`${CONVERT[locale]} ${A} ${c} ${B}`);
  variants.add(`${A} ${c} ${B} ${ONLINE[locale]}`);
  return `${ALSO_LABEL[locale]}: ${[...variants].join(" · ")}`;
}
