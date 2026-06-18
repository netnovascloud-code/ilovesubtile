"use client";

import { useMemo, useState } from "react";
import { useLocale } from "@/hooks/useLocale";

type Mode = "of" | "is_what" | "change";

function num(v: string): number {
  const n = Number(v);
  return Number.isFinite(n) ? n : NaN;
}
function show(locale: string, n: number): string {
  if (!Number.isFinite(n)) return "—";
  const v = Math.round(n * 1e6) / 1e6;
  const opts = { maximumFractionDigits: 6 } as const;
  try { return v.toLocaleString(locale, opts); } catch { return v.toLocaleString("en-US", opts); }
}

const T: Record<string, Record<string, string>> = {
  en: {
    tabOf: "% of a number",
    tabIsWhat: "X is what % of Y",
    tabChange: "% increase / decrease",
    aOf: "Percentage (%)",
    bOf: "Of value",
    aIsWhat: "Value X",
    bIsWhat: "Of total Y",
    aChange: "From",
    bChange: "To",
    result: "Result",
    labelOf: "{x}% of {y}",
    labelIsWhat: "{x} is this % of {y}",
    labelChange: "Change from {x} to {y}",
    privacy: "Everything is computed live in your browser — nothing is sent anywhere.",
  },
  fr: {
    tabOf: "% d'un nombre",
    tabIsWhat: "X représente quel % de Y",
    tabChange: "% d'augmentation / diminution",
    aOf: "Pourcentage (%)",
    bOf: "De la valeur",
    aIsWhat: "Valeur X",
    bIsWhat: "Du total Y",
    aChange: "De",
    bChange: "À",
    result: "Résultat",
    labelOf: "{x} % de {y}",
    labelIsWhat: "{x} représente ce % de {y}",
    labelChange: "Variation de {x} à {y}",
    privacy: "Tout est calculé en direct dans votre navigateur — rien n'est envoyé nulle part.",
  },
  es: {
    tabOf: "% de un número",
    tabIsWhat: "X es qué % de Y",
    tabChange: "% de aumento / disminución",
    aOf: "Porcentaje (%)",
    bOf: "Del valor",
    aIsWhat: "Valor X",
    bIsWhat: "Del total Y",
    aChange: "Desde",
    bChange: "Hasta",
    result: "Resultado",
    labelOf: "{x} % de {y}",
    labelIsWhat: "{x} es este % de {y}",
    labelChange: "Cambio de {x} a {y}",
    privacy: "Todo se calcula en tiempo real en su navegador — nada se envía a ningún lado.",
  },
  pt: {
    tabOf: "% de um número",
    tabIsWhat: "X é qual % de Y",
    tabChange: "% de aumento / diminuição",
    aOf: "Percentagem (%)",
    bOf: "Do valor",
    aIsWhat: "Valor X",
    bIsWhat: "Do total Y",
    aChange: "De",
    bChange: "Para",
    result: "Resultado",
    labelOf: "{x} % de {y}",
    labelIsWhat: "{x} é esta % de {y}",
    labelChange: "Variação de {x} para {y}",
    privacy: "Tudo é calculado em tempo real no seu navegador — nada é enviado para lado nenhum.",
  },
  de: {
    tabOf: "% einer Zahl",
    tabIsWhat: "X ist was % von Y",
    tabChange: "% Erhöhung / Verringerung",
    aOf: "Prozentsatz (%)",
    bOf: "Von Wert",
    aIsWhat: "Wert X",
    bIsWhat: "Von Gesamt Y",
    aChange: "Von",
    bChange: "Zu",
    result: "Ergebnis",
    labelOf: "{x}% von {y}",
    labelIsWhat: "{x} ist dieser % von {y}",
    labelChange: "Änderung von {x} zu {y}",
    privacy: "Alles wird live in Ihrem Browser berechnet — nichts wird gesendet.",
  },
  it: {
    tabOf: "% di un numero",
    tabIsWhat: "X è quale % di Y",
    tabChange: "% aumento / diminuzione",
    aOf: "Percentuale (%)",
    bOf: "Del valore",
    aIsWhat: "Valore X",
    bIsWhat: "Del totale Y",
    aChange: "Da",
    bChange: "A",
    result: "Risultato",
    labelOf: "{x}% di {y}",
    labelIsWhat: "{x} è questa % di {y}",
    labelChange: "Variazione da {x} a {y}",
    privacy: "Tutto viene calcolato in tempo reale nel tuo browser — nulla viene inviato da nessuna parte.",
  },
  nl: {
    tabOf: "% van een getal",
    tabIsWhat: "X is hoeveel % van Y",
    tabChange: "% stijging / daling",
    aOf: "Percentage (%)",
    bOf: "Van waarde",
    aIsWhat: "Waarde X",
    bIsWhat: "Van totaal Y",
    aChange: "Van",
    bChange: "Naar",
    result: "Resultaat",
    labelOf: "{x}% van {y}",
    labelIsWhat: "{x} is dit % van {y}",
    labelChange: "Verandering van {x} naar {y}",
    privacy: "Alles wordt live in uw browser berekend — er wordt niets verzonden.",
  },
  ja: {
    tabOf: "数値の %",
    tabIsWhat: "X は Y の何 %",
    tabChange: "% 増加 / 減少",
    aOf: "パーセント (%)",
    bOf: "値",
    aIsWhat: "値 X",
    bIsWhat: "合計 Y",
    aChange: "開始値",
    bChange: "終了値",
    result: "結果",
    labelOf: "{y} の {x}%",
    labelIsWhat: "{x} は {y} のこの %",
    labelChange: "{x} から {y} への変化",
    privacy: "すべてブラウザ内でリアルタイム計算 — データはどこにも送信されません。",
  },
  zh: {
    tabOf: "数值的 %",
    tabIsWhat: "X 是 Y 的百分之几",
    tabChange: "% 增加 / 减少",
    aOf: "百分比 (%)",
    bOf: "值",
    aIsWhat: "值 X",
    bIsWhat: "总计 Y",
    aChange: "从",
    bChange: "到",
    result: "结果",
    labelOf: "{y} 的 {x}%",
    labelIsWhat: "{x} 是 {y} 的这个 %",
    labelChange: "从 {x} 到 {y} 的变化",
    privacy: "所有内容在您的浏览器中实时计算 — 不发送任何数据。",
  },
  ko: {
    tabOf: "숫자의 %",
    tabIsWhat: "X는 Y의 몇 %인가",
    tabChange: "% 증가 / 감소",
    aOf: "백분율 (%)",
    bOf: "값",
    aIsWhat: "값 X",
    bIsWhat: "전체 Y",
    aChange: "시작",
    bChange: "끝",
    result: "결과",
    labelOf: "{y}의 {x}%",
    labelIsWhat: "{x}는 {y}의 이 %",
    labelChange: "{x}에서 {y}(으)로의 변화",
    privacy: "모든 계산이 브라우저에서 실시간으로 이루어집니다 — 아무것도 전송되지 않습니다.",
  },
  ar: {
    tabOf: "% من رقم",
    tabIsWhat: "X هي ما نسبة % من Y",
    tabChange: "% زيادة / نقصان",
    aOf: "النسبة المئوية (%)",
    bOf: "من القيمة",
    aIsWhat: "القيمة X",
    bIsWhat: "من الإجمالي Y",
    aChange: "من",
    bChange: "إلى",
    result: "النتيجة",
    labelOf: "{x}٪ من {y}",
    labelIsWhat: "{x} هي هذه النسبة % من {y}",
    labelChange: "التغير من {x} إلى {y}",
    privacy: "يتم حساب كل شيء مباشرةً في متصفحك — لا يُرسل أي شيء إلى أي مكان.",
  },
  ru: {
    tabOf: "% от числа",
    tabIsWhat: "X составляет какой % от Y",
    tabChange: "% увеличение / уменьшение",
    aOf: "Процент (%)",
    bOf: "От значения",
    aIsWhat: "Значение X",
    bIsWhat: "От суммы Y",
    aChange: "Из",
    bChange: "В",
    result: "Результат",
    labelOf: "{x}% от {y}",
    labelIsWhat: "{x} — это столько % от {y}",
    labelChange: "Изменение с {x} на {y}",
    privacy: "Всё вычисляется в реальном времени в вашем браузере — ничего никуда не отправляется.",
  },
  hi: {
    tabOf: "संख्या का %",
    tabIsWhat: "X, Y का कितना % है",
    tabChange: "% वृद्धि / कमी",
    aOf: "प्रतिशत (%)",
    bOf: "मूल्य का",
    aIsWhat: "मूल्य X",
    bIsWhat: "कुल Y का",
    aChange: "से",
    bChange: "तक",
    result: "परिणाम",
    labelOf: "{y} का {x}%",
    labelIsWhat: "{x}, {y} का यह % है",
    labelChange: "{x} से {y} तक परिवर्तन",
    privacy: "सब कुछ आपके ब्राउज़र में लाइव गणना होती है — कुछ भी कहीं नहीं भेजा जाता।",
  },
  tr: {
    tabOf: "Bir sayının %'si",
    tabIsWhat: "X, Y'nin yüzde kaçı",
    tabChange: "% artış / azalış",
    aOf: "Yüzde (%)",
    bOf: "Değerin",
    aIsWhat: "X değeri",
    bIsWhat: "Toplam Y'nin",
    aChange: "Başlangıç",
    bChange: "Bitiş",
    result: "Sonuç",
    labelOf: "{y} sayısının %{x}'i",
    labelIsWhat: "{x}, {y}'nin bu yüzdesi",
    labelChange: "{x} değerinden {y} değerine değişim",
    privacy: "Her şey tarayıcınızda canlı hesaplanır — hiçbir şey hiçbir yere gönderilmez.",
  },
  id: {
    tabOf: "% dari sebuah angka",
    tabIsWhat: "X adalah berapa % dari Y",
    tabChange: "% kenaikan / penurunan",
    aOf: "Persentase (%)",
    bOf: "Dari nilai",
    aIsWhat: "Nilai X",
    bIsWhat: "Dari total Y",
    aChange: "Dari",
    bChange: "Ke",
    result: "Hasil",
    labelOf: "{x}% dari {y}",
    labelIsWhat: "{x} adalah persentase ini dari {y}",
    labelChange: "Perubahan dari {x} ke {y}",
    privacy: "Semua dihitung secara langsung di browser Anda — tidak ada yang dikirim ke mana pun.",
  },
  vi: {
    tabOf: "% của một số",
    tabIsWhat: "X là bao nhiêu % của Y",
    tabChange: "% tăng / giảm",
    aOf: "Phần trăm (%)",
    bOf: "Của giá trị",
    aIsWhat: "Giá trị X",
    bIsWhat: "Của tổng Y",
    aChange: "Từ",
    bChange: "Đến",
    result: "Kết quả",
    labelOf: "{x}% của {y}",
    labelIsWhat: "{x} là phần trăm này của {y}",
    labelChange: "Thay đổi từ {x} đến {y}",
    privacy: "Tất cả được tính toán trực tiếp trong trình duyệt của bạn — không có gì được gửi đi.",
  },
  sv: {
    tabOf: "% av ett tal",
    tabIsWhat: "X är hur många % av Y",
    tabChange: "% ökning / minskning",
    aOf: "Procent (%)",
    bOf: "Av värdet",
    aIsWhat: "Värde X",
    bIsWhat: "Av totalt Y",
    aChange: "Från",
    bChange: "Till",
    result: "Resultat",
    labelOf: "{x}% av {y}",
    labelIsWhat: "{x} är denna % av {y}",
    labelChange: "Förändring från {x} till {y}",
    privacy: "Allt beräknas live i din webbläsare — ingenting skickas någonstans.",
  },
  pl: {
    tabOf: "% liczby",
    tabIsWhat: "X to ile % z Y",
    tabChange: "% wzrost / spadek",
    aOf: "Procent (%)",
    bOf: "Z wartości",
    aIsWhat: "Wartość X",
    bIsWhat: "Z sumy Y",
    aChange: "Od",
    bChange: "Do",
    result: "Wynik",
    labelOf: "{x}% z {y}",
    labelIsWhat: "{x} to ten % z {y}",
    labelChange: "Zmiana z {x} na {y}",
    privacy: "Wszystko jest obliczane na bieżąco w Twojej przeglądarce — nic nie jest wysyłane.",
  },
  uk: {
    tabOf: "% від числа",
    tabIsWhat: "X становить який % від Y",
    tabChange: "% збільшення / зменшення",
    aOf: "Відсоток (%)",
    bOf: "Від значення",
    aIsWhat: "Значення X",
    bIsWhat: "Від суми Y",
    aChange: "Від",
    bChange: "До",
    result: "Результат",
    labelOf: "{x}% від {y}",
    labelIsWhat: "{x} — це стільки % від {y}",
    labelChange: "Зміна з {x} на {y}",
    privacy: "Усе обчислюється в режимі реального часу у вашому браузері — нічого нікуди не надсилається.",
  },
  cs: {
    tabOf: "% z čísla",
    tabIsWhat: "X je kolik % z Y",
    tabChange: "% nárůst / pokles",
    aOf: "Procento (%)",
    bOf: "Z hodnoty",
    aIsWhat: "Hodnota X",
    bIsWhat: "Z celku Y",
    aChange: "Od",
    bChange: "Do",
    result: "Výsledek",
    labelOf: "{x} % z {y}",
    labelIsWhat: "{x} je toto % z {y}",
    labelChange: "Změna z {x} na {y}",
    privacy: "Vše se počítá živě ve vašem prohlížeči — nic se nikam neposílá.",
  },
};

export function PercentageCalculatorClient() {
  const locale = useLocale();
  const s = T[locale] ?? T.en;

  const [mode, setMode] = useState<Mode>("of");
  const [a, setA] = useState("15");
  const [b, setB] = useState("200");

  const result = useMemo(() => {
    const x = num(a), y = num(b);
    if (!Number.isFinite(x) || !Number.isFinite(y)) return null;
    const fx = show(locale, x), fy = show(locale, y);
    if (mode === "of") return { label: s.labelOf.replace("{x}", fx).replace("{y}", fy), value: (x / 100) * y };
    if (mode === "is_what") return { label: s.labelIsWhat.replace("{x}", fx).replace("{y}", fy), value: y === 0 ? NaN : (x / y) * 100, suffix: "%" };
    return { label: s.labelChange.replace("{x}", fx).replace("{y}", fy), value: x === 0 ? NaN : ((y - x) / Math.abs(x)) * 100, suffix: "%" };
  }, [mode, a, b, s, locale]);

  const labels: Record<Mode, { tab: string; a: string; b: string }> = {
    of: { tab: s.tabOf, a: s.aOf, b: s.bOf },
    is_what: { tab: s.tabIsWhat, a: s.aIsWhat, b: s.bIsWhat },
    change: { tab: s.tabChange, a: s.aChange, b: s.bChange },
  };

  return (
    <div className="space-y-5">
      <div className="inline-flex flex-wrap rounded-lg border border-ink-200 bg-white p-1">
        {(["of", "is_what", "change"] as const).map((m) => (
          <button key={m} onClick={() => setMode(m)}
            className={`rounded-md px-3 py-1.5 text-xs font-medium ${mode === m ? "bg-brand-500 text-white" : "text-ink-600"}`}>
            {labels[m].tab}
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col text-xs font-medium text-ink-600">
          {labels[mode].a}
          <input type="number" value={a} onChange={(e) => setA(e.target.value)}
            className="mt-1 rounded-md border border-ink-200 bg-white px-3 py-2 text-base text-ink-900 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100" />
        </label>
        <label className="flex flex-col text-xs font-medium text-ink-600">
          {labels[mode].b}
          <input type="number" value={b} onChange={(e) => setB(e.target.value)}
            className="mt-1 rounded-md border border-ink-200 bg-white px-3 py-2 text-base text-ink-900 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100" />
        </label>
      </div>

      <div className="rounded-lg border border-brand-200 bg-brand-50/40 p-5">
        <div className="text-xs uppercase tracking-wide text-brand-700">{result?.label ?? s.result}</div>
        <div className="mt-1 text-3xl font-semibold text-ink-900">
          {result ? `${show(locale, result.value)}${result.suffix ?? ""}` : "—"}
        </div>
      </div>

      <p className="text-xs text-ink-400">{s.privacy}</p>
    </div>
  );
}
