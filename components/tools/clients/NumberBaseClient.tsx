"use client";

import { useMemo, useState } from "react";
import { Copy, Check, AlertCircle } from "lucide-react";
import { useLocale } from "@/hooks/useLocale";

const BASES = [
  { id: 2, label: "Binary", placeholder: "10110011" },
  { id: 8, label: "Octal", placeholder: "263" },
  { id: 10, label: "Decimal", placeholder: "179" },
  { id: 16, label: "Hexadecimal", placeholder: "B3" },
] as const;

function isValid(value: string, base: number): boolean {
  if (!value) return false;
  const re = base === 2 ? /^-?[01]+$/ : base === 8 ? /^-?[0-7]+$/ : base === 10 ? /^-?\d+$/ : /^-?[0-9a-f]+$/i;
  return re.test(value);
}

/** Parse digit-by-digit straight into a BigInt. Going through parseInt() first
 *  would round-trip the value through a 53-bit double and silently corrupt any
 *  number above 2^53 (e.g. a 64-bit hex value). Callers pre-validate the digits. */
function parseToBigInt(value: string, base: number): bigint {
  const neg = value.startsWith("-");
  const digits = (neg ? value.slice(1) : value).toLowerCase();
  const b = BigInt(base);
  let n = 0n;
  for (const ch of digits) n = n * b + BigInt(parseInt(ch, base));
  return neg ? -n : n;
}

const T: Record<string, Record<string, string>> = {
  en: {
    enterNumber: "Enter a base-{base} number",
    invalidNumber: "Not a valid base-{base} number.",
    parseError: "Could not parse number.",
    privacy: "100% in your browser. Free and unlimited.",
    binary: "Binary",
    octal: "Octal",
    decimal: "Decimal",
    hexadecimal: "Hexadecimal",
  },
  fr: {
    enterNumber: "Saisir un nombre en base {base}",
    invalidNumber: "Pas un nombre valide en base {base}.",
    parseError: "Impossible d'analyser le nombre.",
    privacy: "100 % dans votre navigateur. Gratuit et illimité.",
    binary: "Binaire",
    octal: "Octal",
    decimal: "Décimal",
    hexadecimal: "Hexadécimal",
  },
  es: {
    enterNumber: "Introduce un número en base {base}",
    invalidNumber: "No es un número válido en base {base}.",
    parseError: "No se pudo analizar el número.",
    privacy: "100 % en tu navegador. Gratis e ilimitado.",
    binary: "Binario",
    octal: "Octal",
    decimal: "Decimal",
    hexadecimal: "Hexadecimal",
  },
  pt: {
    enterNumber: "Insira um número na base {base}",
    invalidNumber: "Não é um número válido na base {base}.",
    parseError: "Não foi possível analisar o número.",
    privacy: "100% no seu navegador. Gratuito e ilimitado.",
    binary: "Binário",
    octal: "Octal",
    decimal: "Decimal",
    hexadecimal: "Hexadecimal",
  },
  de: {
    enterNumber: "Geben Sie eine Basis-{base}-Zahl ein",
    invalidNumber: "Keine gültige Basis-{base}-Zahl.",
    parseError: "Zahl konnte nicht verarbeitet werden.",
    privacy: "100 % im Browser. Kostenlos und unbegrenzt.",
    binary: "Binär",
    octal: "Oktal",
    decimal: "Dezimal",
    hexadecimal: "Hexadezimal",
  },
  it: {
    enterNumber: "Inserisci un numero in base {base}",
    invalidNumber: "Non è un numero valido in base {base}.",
    parseError: "Impossibile analizzare il numero.",
    privacy: "100% nel tuo browser. Gratuito e illimitato.",
    binary: "Binario",
    octal: "Ottale",
    decimal: "Decimale",
    hexadecimal: "Esadecimale",
  },
  nl: {
    enterNumber: "Voer een grondtal-{base}-getal in",
    invalidNumber: "Geen geldig grondtal-{base}-getal.",
    parseError: "Getal kon niet worden verwerkt.",
    privacy: "100% in uw browser. Gratis en onbeperkt.",
    binary: "Binair",
    octal: "Octaal",
    decimal: "Decimaal",
    hexadecimal: "Hexadecimaal",
  },
  ja: {
    enterNumber: "{base}進数を入力してください",
    invalidNumber: "{base}進数として無効です。",
    parseError: "数値を解析できませんでした。",
    privacy: "ブラウザ内で 100% 処理。無料・無制限。",
    binary: "2進数",
    octal: "8進数",
    decimal: "10進数",
    hexadecimal: "16進数",
  },
  zh: {
    enterNumber: "输入一个{base}进制数",
    invalidNumber: "不是有效的{base}进制数。",
    parseError: "无法解析该数字。",
    privacy: "在您的浏览器中 100% 处理。免费且无限制。",
    binary: "二进制",
    octal: "八进制",
    decimal: "十进制",
    hexadecimal: "十六进制",
  },
  ko: {
    enterNumber: "{base}진수를 입력하세요",
    invalidNumber: "유효한 {base}진수가 아닙니다.",
    parseError: "숫자를 파싱할 수 없습니다.",
    privacy: "브라우저에서 100% 처리. 무료 및 무제한.",
    binary: "이진수",
    octal: "8진수",
    decimal: "10진수",
    hexadecimal: "16진수",
  },
  ar: {
    enterNumber: "أدخل رقماً بالأساس {base}",
    invalidNumber: "ليس رقماً صالحاً بالأساس {base}.",
    parseError: "تعذّر تحليل الرقم.",
    privacy: "100٪ في متصفحك. مجاني وغير محدود.",
    binary: "ثنائي",
    octal: "ثماني",
    decimal: "عشري",
    hexadecimal: "ست عشري",
  },
  ru: {
    enterNumber: "Введите число в системе счисления {base}",
    invalidNumber: "Неверное число в системе счисления {base}.",
    parseError: "Не удалось обработать число.",
    privacy: "100% в вашем браузере. Бесплатно и без ограничений.",
    binary: "Двоичное",
    octal: "Восьмеричное",
    decimal: "Десятичное",
    hexadecimal: "Шестнадцатеричное",
  },
  hi: {
    enterNumber: "आधार-{base} संख्या दर्ज करें",
    invalidNumber: "आधार-{base} में मान्य संख्या नहीं है।",
    parseError: "संख्या पार्स नहीं हो सकी।",
    privacy: "आपके ब्राउज़र में 100%। मुफ़्त और असीमित।",
    binary: "द्विआधारी",
    octal: "ऑक्टल",
    decimal: "दशमलव",
    hexadecimal: "हेक्साडेसिमल",
  },
  tr: {
    enterNumber: "{base} tabanında bir sayı girin",
    invalidNumber: "{base} tabanında geçerli bir sayı değil.",
    parseError: "Sayı işlenemedi.",
    privacy: "Tarayıcınızda %100 işlem. Ücretsiz ve sınırsız.",
    binary: "İkili",
    octal: "Sekizli",
    decimal: "Onlu",
    hexadecimal: "On Altılı",
  },
  id: {
    enterNumber: "Masukkan bilangan basis {base}",
    invalidNumber: "Bukan bilangan basis {base} yang valid.",
    parseError: "Tidak dapat mengurai angka.",
    privacy: "100% di browser Anda. Gratis dan tak terbatas.",
    binary: "Biner",
    octal: "Oktal",
    decimal: "Desimal",
    hexadecimal: "Heksadesimal",
  },
  vi: {
    enterNumber: "Nhập một số cơ số {base}",
    invalidNumber: "Không phải số cơ số {base} hợp lệ.",
    parseError: "Không thể phân tích số.",
    privacy: "100% trong trình duyệt của bạn. Miễn phí và không giới hạn.",
    binary: "Nhị phân",
    octal: "Bát phân",
    decimal: "Thập phân",
    hexadecimal: "Thập lục phân",
  },
  sv: {
    enterNumber: "Ange ett tal i bas {base}",
    invalidNumber: "Inte ett giltigt bas-{base}-tal.",
    parseError: "Kunde inte bearbeta talet.",
    privacy: "100 % i din webbläsare. Gratis och obegränsat.",
    binary: "Binärt",
    octal: "Oktalt",
    decimal: "Decimalt",
    hexadecimal: "Hexadecimalt",
  },
  pl: {
    enterNumber: "Wprowadź liczbę w systemie {base}",
    invalidNumber: "To nie jest poprawna liczba w systemie {base}.",
    parseError: "Nie można przetworzyć liczby.",
    privacy: "100% w Twojej przeglądarce. Bezpłatnie i bez ograniczeń.",
    binary: "Dwójkowy",
    octal: "Ósemkowy",
    decimal: "Dziesiętny",
    hexadecimal: "Szesnastkowy",
  },
  uk: {
    enterNumber: "Введіть число в системі числення {base}",
    invalidNumber: "Невірне число в системі числення {base}.",
    parseError: "Не вдалося обробити число.",
    privacy: "100% у вашому браузері. Безкоштовно та без обмежень.",
    binary: "Двійкове",
    octal: "Вісімкове",
    decimal: "Десяткове",
    hexadecimal: "Шістнадцяткове",
  },
  cs: {
    enterNumber: "Zadejte číslo v soustavě {base}",
    invalidNumber: "Není platné číslo v soustavě {base}.",
    parseError: "Číslo nelze zpracovat.",
    privacy: "100 % ve vašem prohlížeči. Zdarma a bez omezení.",
    binary: "Dvojkový",
    octal: "Osmičkový",
    decimal: "Desetinný",
    hexadecimal: "Šestnáctkový",
  },
};

export function NumberBaseClient() {
  const locale = useLocale();
  const s = T[locale] ?? T.en;

  const localizedBases = [
    { id: 2, label: s.binary, placeholder: "10110011" },
    { id: 8, label: s.octal, placeholder: "263" },
    { id: 10, label: s.decimal, placeholder: "179" },
    { id: 16, label: s.hexadecimal, placeholder: "B3" },
  ] as const;

  const [value, setValue] = useState("179");
  const [base, setBase] = useState<number>(10);
  const [copied, setCopied] = useState<number | null>(null);

  const { results, error } = useMemo(() => {
    if (!value.trim()) return { results: null, error: null as string | null };
    if (!isValid(value.trim(), base)) return { results: null, error: s.invalidNumber.replace("{base}", String(base)) };
    let n: bigint;
    try { n = parseToBigInt(value.trim(), base); }
    catch { return { results: null, error: s.parseError }; }
    return {
      results: {
        2: n.toString(2),
        8: n.toString(8),
        10: n.toString(10),
        16: n.toString(16).toUpperCase(),
      } as Record<number, string>,
      error: null,
    };
  }, [value, base, s]);

  function copy(b: number) { if (!results) return; navigator.clipboard.writeText(results[b]); setCopied(b); setTimeout(() => setCopied(null), 1500); }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {localizedBases.map((b) => (
          <button key={b.id} onClick={() => setBase(b.id)}
            className={`rounded-full border px-3 py-1.5 text-sm font-medium transition-colors ${base === b.id ? "border-brand-300 bg-brand-50 text-brand-700" : "border-ink-200 bg-white text-ink-600 hover:border-ink-300"}`}>
            {b.label}
          </button>
        ))}
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-ink-700">{s.enterNumber.replace("{base}", String(base))}</label>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={localizedBases.find((x) => x.id === base)?.placeholder}
          className="w-full rounded-lg border border-ink-200 bg-white p-3 font-mono text-base text-ink-900 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100"
        />
      </div>
      {error && <p className="flex items-start gap-1.5 text-sm text-red-600"><AlertCircle className="mt-0.5 h-4 w-4 shrink-0" /> {error}</p>}
      {results && (
        <div className="space-y-2">
          {localizedBases.map((b) => (
            <div key={b.id} className="flex items-center gap-2">
              <span className="w-28 text-xs font-semibold uppercase tracking-wide text-ink-500">{b.label}</span>
              <code className="flex-1 break-all rounded-md border border-ink-200 bg-white px-3 py-2 font-mono text-sm text-ink-900">{results[b.id]}</code>
              <button onClick={() => copy(b.id)} className="inline-flex items-center gap-1 rounded-md border border-ink-200 bg-white px-2 py-2 text-xs text-ink-600 hover:text-ink-900">
                {copied === b.id ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              </button>
            </div>
          ))}
        </div>
      )}
      <p className="text-xs text-ink-400">{s.privacy}</p>
    </div>
  );
}
