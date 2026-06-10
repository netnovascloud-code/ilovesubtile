"use client";

import { useState } from "react";
import { useLocale } from "@/hooks/useLocale";

const MAP: [number, string][] = [
  [1000, "M"], [900, "CM"], [500, "D"], [400, "CD"], [100, "C"], [90, "XC"],
  [50, "L"], [40, "XL"], [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"],
];

function toRoman(n: number): string | null {
  if (!Number.isInteger(n) || n < 1 || n > 3999) return null;
  let out = "";
  for (const [v, s] of MAP) while (n >= v) { out += s; n -= v; }
  return out;
}

function fromRoman(raw: string): number | null {
  const s = raw.trim().toUpperCase();
  if (!s || !/^[MDCLXVI]+$/.test(s)) return null;
  const val: Record<string, number> = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
  let total = 0;
  for (let i = 0; i < s.length; i++) {
    const cur = val[s[i]], next = val[s[i + 1]] ?? 0;
    total += cur < next ? -cur : cur;
  }
  // Validate by round-tripping — rejects non-canonical forms like "IIII" or "IC".
  return toRoman(total) === s ? total : null;
}

const T: Record<string, Record<string, string>> = {
  en: {
    numberLabel: "Number (1–3999)",
    romanLabel: "Roman numeral",
    result: "Result",
    rangeError: "Enter a whole number between 1 and 3999.",
    disclaimer: "Roman numerals only go up to 3999 (MMMCMXCIX) in standard notation. Computed in your browser.",
  },
  fr: {
    numberLabel: "Nombre (1–3999)",
    romanLabel: "Chiffre romain",
    result: "Résultat",
    rangeError: "Entrez un nombre entier entre 1 et 3999.",
    disclaimer: "Les chiffres romains vont jusqu'à 3999 (MMMCMXCIX) en notation standard. Calculé dans votre navigateur.",
  },
  es: {
    numberLabel: "Número (1–3999)",
    romanLabel: "Número romano",
    result: "Resultado",
    rangeError: "Introduzca un número entero entre 1 y 3999.",
    disclaimer: "Los números romanos llegan hasta 3999 (MMMCMXCIX) en notación estándar. Calculado en su navegador.",
  },
  pt: {
    numberLabel: "Número (1–3999)",
    romanLabel: "Numeral romano",
    result: "Resultado",
    rangeError: "Introduza um número inteiro entre 1 e 3999.",
    disclaimer: "Os algarismos romanos vão até 3999 (MMMCMXCIX) na notação padrão. Calculado no seu navegador.",
  },
  de: {
    numberLabel: "Zahl (1–3999)",
    romanLabel: "Römische Zahl",
    result: "Ergebnis",
    rangeError: "Geben Sie eine ganze Zahl zwischen 1 und 3999 ein.",
    disclaimer: "Römische Ziffern gehen in der Standardnotation bis 3999 (MMMCMXCIX). Im Browser berechnet.",
  },
  it: {
    numberLabel: "Numero (1–3999)",
    romanLabel: "Numero romano",
    result: "Risultato",
    rangeError: "Inserisci un numero intero tra 1 e 3999.",
    disclaimer: "I numeri romani arrivano fino a 3999 (MMMCMXCIX) nella notazione standard. Calcolato nel tuo browser.",
  },
  nl: {
    numberLabel: "Getal (1–3999)",
    romanLabel: "Romeins cijfer",
    result: "Resultaat",
    rangeError: "Voer een geheel getal in tussen 1 en 3999.",
    disclaimer: "Romeinse cijfers gaan in standaardnotatie tot 3999 (MMMCMXCIX). Berekend in uw browser.",
  },
  ja: {
    numberLabel: "数値 (1–3999)",
    romanLabel: "ローマ数字",
    result: "結果",
    rangeError: "1 から 3999 の整数を入力してください。",
    disclaimer: "ローマ数字は標準表記で 3999（MMMCMXCIX）まで対応しています。ブラウザ内で計算されます。",
  },
  zh: {
    numberLabel: "数字 (1–3999)",
    romanLabel: "罗马数字",
    result: "结果",
    rangeError: "请输入 1 到 3999 之间的整数。",
    disclaimer: "罗马数字在标准表示法中最大为 3999（MMMCMXCIX）。在您的浏览器中计算。",
  },
  ko: {
    numberLabel: "숫자 (1–3999)",
    romanLabel: "로마 숫자",
    result: "결과",
    rangeError: "1에서 3999 사이의 정수를 입력하세요.",
    disclaimer: "로마 숫자는 표준 표기법에서 3999(MMMCMXCIX)까지 지원됩니다. 브라우저에서 계산됩니다.",
  },
  ar: {
    numberLabel: "الرقم (1–3999)",
    romanLabel: "الرقم الروماني",
    result: "النتيجة",
    rangeError: "أدخل عددًا صحيحًا بين 1 و3999.",
    disclaimer: "تصل الأرقام الرومانية إلى 3999 (MMMCMXCIX) في الترميز القياسي. يُحسب في متصفحك.",
  },
  ru: {
    numberLabel: "Число (1–3999)",
    romanLabel: "Римская цифра",
    result: "Результат",
    rangeError: "Введите целое число от 1 до 3999.",
    disclaimer: "Римские цифры в стандартной нотации идут до 3999 (MMMCMXCIX). Вычисляется в вашем браузере.",
  },
  hi: {
    numberLabel: "संख्या (1–3999)",
    romanLabel: "रोमन अंक",
    result: "परिणाम",
    rangeError: "1 से 3999 के बीच एक पूर्ण संख्या दर्ज करें।",
    disclaimer: "रोमन अंक मानक नोटेशन में 3999 (MMMCMXCIX) तक जाते हैं। आपके ब्राउज़र में गणना की जाती है।",
  },
  tr: {
    numberLabel: "Sayı (1–3999)",
    romanLabel: "Roma rakamı",
    result: "Sonuç",
    rangeError: "1 ile 3999 arasında bir tam sayı girin.",
    disclaimer: "Roma rakamları standart gösterimde 3999'a (MMMCMXCIX) kadar gider. Tarayıcınızda hesaplanır.",
  },
  id: {
    numberLabel: "Angka (1–3999)",
    romanLabel: "Angka Romawi",
    result: "Hasil",
    rangeError: "Masukkan bilangan bulat antara 1 dan 3999.",
    disclaimer: "Angka Romawi hanya sampai 3999 (MMMCMXCIX) dalam notasi standar. Dihitung di browser Anda.",
  },
  vi: {
    numberLabel: "Số (1–3999)",
    romanLabel: "Chữ số La Mã",
    result: "Kết quả",
    rangeError: "Nhập một số nguyên từ 1 đến 3999.",
    disclaimer: "Chữ số La Mã chỉ đến 3999 (MMMCMXCIX) trong ký hiệu chuẩn. Được tính trong trình duyệt của bạn.",
  },
  sv: {
    numberLabel: "Tal (1–3999)",
    romanLabel: "Romersk siffra",
    result: "Resultat",
    rangeError: "Ange ett heltal mellan 1 och 3999.",
    disclaimer: "Romerska siffror går upp till 3999 (MMMCMXCIX) i standardnotation. Beräknas i din webbläsare.",
  },
  pl: {
    numberLabel: "Liczba (1–3999)",
    romanLabel: "Cyfra rzymska",
    result: "Wynik",
    rangeError: "Wprowadź liczbę całkowitą od 1 do 3999.",
    disclaimer: "Cyfry rzymskie sięgają do 3999 (MMMCMXCIX) w standardowej notacji. Obliczane w Twojej przeglądarce.",
  },
  uk: {
    numberLabel: "Число (1–3999)",
    romanLabel: "Римська цифра",
    result: "Результат",
    rangeError: "Введіть ціле число від 1 до 3999.",
    disclaimer: "Римські цифри в стандартному записі йдуть до 3999 (MMMCMXCIX). Обчислюється у вашому браузері.",
  },
  cs: {
    numberLabel: "Číslo (1–3999)",
    romanLabel: "Římská číslice",
    result: "Výsledek",
    rangeError: "Zadejte celé číslo od 1 do 3999.",
    disclaimer: "Římské číslice jdou ve standardním zápisu do 3999 (MMMCMXCIX). Vypočteno ve vašem prohlížeči.",
  },
};

export function RomanNumeralClient() {
  const s = T[useLocale()] ?? T.en;

  const [arabic, setArabic] = useState("2026");
  const [roman, setRoman] = useState("MMXXVI");

  const onArabic = (v: string) => {
    setArabic(v);
    const r = toRoman(Number(v));
    if (r !== null) setRoman(r);
  };
  const onRoman = (v: string) => {
    setRoman(v.toUpperCase());
    const n = fromRoman(v);
    if (n !== null) setArabic(String(n));
  };

  const arabicValid = toRoman(Number(arabic)) !== null;
  const romanValid = fromRoman(roman) !== null;

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col text-xs font-medium text-ink-600">
          {s.numberLabel}
          <input value={arabic} inputMode="numeric" onChange={(e) => onArabic(e.target.value)}
            className={`mt-1 rounded-md border bg-white px-3 py-2 text-base text-ink-900 focus:outline-none focus:ring-2 focus:ring-brand-100 ${arabicValid ? "border-ink-200 focus:border-brand-400" : "border-red-300"}`} />
        </label>
        <label className="flex flex-col text-xs font-medium text-ink-600">
          {s.romanLabel}
          <input value={roman} onChange={(e) => onRoman(e.target.value)}
            className={`mt-1 rounded-md border bg-white px-3 py-2 text-base font-mono uppercase tracking-wider text-ink-900 focus:outline-none focus:ring-2 focus:ring-brand-100 ${romanValid ? "border-ink-200 focus:border-brand-400" : "border-red-300"}`} />
        </label>
      </div>

      <div className="rounded-xl border border-brand-200 bg-brand-50/40 p-5 text-center">
        <div className="text-xs uppercase tracking-wide text-brand-700">{s.result}</div>
        <div className="mt-1 text-3xl font-bold tracking-wider text-ink-900">
          {arabicValid ? `${Number(arabic)} = ${toRoman(Number(arabic))}` : "—"}
        </div>
      </div>

      {!arabicValid && arabic !== "" && (
        <p className="text-sm text-amber-700">{s.rangeError}</p>
      )}

      <p className="text-xs text-ink-400">{s.disclaimer}</p>
    </div>
  );
}
