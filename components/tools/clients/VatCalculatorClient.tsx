"use client";

import { useMemo, useState } from "react";
import { useLocale } from "@/hooks/useLocale";

/** Standard VAT rates per country (commonly accurate as of 2024-2025; for guidance only). */
const RATES: { code: string; name: string; rate: number; cur: string }[] = [
  { code: "FR", name: "France", rate: 20, cur: "EUR" },
  { code: "DE", name: "Germany", rate: 19, cur: "EUR" },
  { code: "IT", name: "Italy", rate: 22, cur: "EUR" },
  { code: "ES", name: "Spain", rate: 21, cur: "EUR" },
  { code: "PT", name: "Portugal", rate: 23, cur: "EUR" },
  { code: "NL", name: "Netherlands", rate: 21, cur: "EUR" },
  { code: "BE", name: "Belgium", rate: 21, cur: "EUR" },
  { code: "LU", name: "Luxembourg", rate: 17, cur: "EUR" },
  { code: "AT", name: "Austria", rate: 20, cur: "EUR" },
  { code: "IE", name: "Ireland", rate: 23, cur: "EUR" },
  { code: "FI", name: "Finland", rate: 25.5, cur: "EUR" },
  { code: "GR", name: "Greece", rate: 24, cur: "EUR" },
  { code: "DK", name: "Denmark", rate: 25, cur: "DKK" },
  { code: "SE", name: "Sweden", rate: 25, cur: "SEK" },
  { code: "NO", name: "Norway", rate: 25, cur: "NOK" },
  { code: "PL", name: "Poland", rate: 23, cur: "PLN" },
  { code: "CZ", name: "Czechia", rate: 21, cur: "CZK" },
  { code: "RO", name: "Romania", rate: 19, cur: "RON" },
  { code: "HU", name: "Hungary", rate: 27, cur: "HUF" },
  { code: "BG", name: "Bulgaria", rate: 20, cur: "BGN" },
  { code: "HR", name: "Croatia", rate: 25, cur: "EUR" },
  { code: "EE", name: "Estonia", rate: 22, cur: "EUR" },
  { code: "LV", name: "Latvia", rate: 21, cur: "EUR" },
  { code: "LT", name: "Lithuania", rate: 21, cur: "EUR" },
  { code: "SK", name: "Slovakia", rate: 23, cur: "EUR" },
  { code: "SI", name: "Slovenia", rate: 22, cur: "EUR" },
  { code: "MT", name: "Malta", rate: 18, cur: "EUR" },
  { code: "CY", name: "Cyprus", rate: 19, cur: "EUR" },
  { code: "GB", name: "United Kingdom", rate: 20, cur: "GBP" },
  { code: "CH", name: "Switzerland", rate: 8.1, cur: "CHF" },
];

type Mode = "from_net" | "from_gross";

function fmt(value: number, cur: string): string {
  try {
    return new Intl.NumberFormat("en-GB", { style: "currency", currency: cur, maximumFractionDigits: 2 }).format(value);
  } catch {
    return value.toFixed(2) + " " + cur;
  }
}

const T: Record<string, Record<string, string>> = {
  en: {
    country: "Country",
    overrideRate: "Override rate (%)",
    mode: "Mode",
    modeNetToGross: "Net → Gross",
    modeGrossToNet: "Gross → Net",
    netAmount: "Net amount",
    grossAmount: "Gross amount",
    net: "Net",
    vatLabel: "VAT",
    grossInclVat: "Gross (incl. VAT)",
    disclaimer: "Standard rates only — many countries have reduced or zero rates on specific goods. For guidance only, not tax advice.",
  },
  fr: {
    country: "Pays",
    overrideRate: "Taux personnalisé (%)",
    mode: "Mode",
    modeNetToGross: "HT → TTC",
    modeGrossToNet: "TTC → HT",
    netAmount: "Montant HT",
    grossAmount: "Montant TTC",
    net: "HT",
    vatLabel: "TVA",
    grossInclVat: "TTC (TVA incluse)",
    disclaimer: "Taux standard uniquement — de nombreux pays appliquent des taux réduits ou nuls sur certains biens. À titre indicatif uniquement, pas un conseil fiscal.",
  },
  es: {
    country: "País",
    overrideRate: "Tipo personalizado (%)",
    mode: "Modo",
    modeNetToGross: "Neto → Bruto",
    modeGrossToNet: "Bruto → Neto",
    netAmount: "Importe neto",
    grossAmount: "Importe bruto",
    net: "Neto",
    vatLabel: "IVA",
    grossInclVat: "Bruto (IVA incluido)",
    disclaimer: "Solo tipos estándar — muchos países aplican tipos reducidos o cero en bienes específicos. Solo orientativo, no es asesoramiento fiscal.",
  },
  pt: {
    country: "País",
    overrideRate: "Taxa personalizada (%)",
    mode: "Modo",
    modeNetToGross: "Líquido → Bruto",
    modeGrossToNet: "Bruto → Líquido",
    netAmount: "Valor líquido",
    grossAmount: "Valor bruto",
    net: "Líquido",
    vatLabel: "IVA",
    grossInclVat: "Bruto (IVA incluído)",
    disclaimer: "Apenas taxas padrão — muitos países têm taxas reduzidas ou zero em bens específicos. Apenas para orientação, não é aconselhamento fiscal.",
  },
  de: {
    country: "Land",
    overrideRate: "Benutzerdefinierter Satz (%)",
    mode: "Modus",
    modeNetToGross: "Netto → Brutto",
    modeGrossToNet: "Brutto → Netto",
    netAmount: "Nettobetrag",
    grossAmount: "Bruttobetrag",
    net: "Netto",
    vatLabel: "MwSt.",
    grossInclVat: "Brutto (inkl. MwSt.)",
    disclaimer: "Nur Standardsätze — viele Länder haben ermäßigte oder Nullsätze für bestimmte Waren. Nur zur Orientierung, keine Steuerberatung.",
  },
  it: {
    country: "Paese",
    overrideRate: "Aliquota personalizzata (%)",
    mode: "Modalità",
    modeNetToGross: "Netto → Lordo",
    modeGrossToNet: "Lordo → Netto",
    netAmount: "Importo netto",
    grossAmount: "Importo lordo",
    net: "Netto",
    vatLabel: "IVA",
    grossInclVat: "Lordo (IVA inclusa)",
    disclaimer: "Solo aliquote standard — molti paesi hanno aliquote ridotte o zero su beni specifici. Solo a scopo informativo, non è una consulenza fiscale.",
  },
  nl: {
    country: "Land",
    overrideRate: "Aangepast tarief (%)",
    mode: "Modus",
    modeNetToGross: "Netto → Bruto",
    modeGrossToNet: "Bruto → Netto",
    netAmount: "Nettobedrag",
    grossAmount: "Brutobedrag",
    net: "Netto",
    vatLabel: "BTW",
    grossInclVat: "Bruto (incl. BTW)",
    disclaimer: "Alleen standaardtarieven — veel landen hebben verlaagde of nultarieven op specifieke goederen. Alleen ter informatie, geen fiscaal advies.",
  },
  ja: {
    country: "国",
    overrideRate: "カスタム税率 (%)",
    mode: "モード",
    modeNetToGross: "税抜 → 税込",
    modeGrossToNet: "税込 → 税抜",
    netAmount: "税抜金額",
    grossAmount: "税込金額",
    net: "税抜",
    vatLabel: "消費税",
    grossInclVat: "税込（消費税含む）",
    disclaimer: "標準税率のみ — 多くの国では特定の商品に軽減税率または免税が適用されます。参考情報のみ、税務アドバイスではありません。",
  },
  zh: {
    country: "国家",
    overrideRate: "自定义税率 (%)",
    mode: "模式",
    modeNetToGross: "不含税 → 含税",
    modeGrossToNet: "含税 → 不含税",
    netAmount: "不含税金额",
    grossAmount: "含税金额",
    net: "不含税",
    vatLabel: "增值税",
    grossInclVat: "含税（含增值税）",
    disclaimer: "仅为标准税率 — 许多国家对特定商品适用较低税率或零税率。仅供参考，非税务建议。",
  },
  ko: {
    country: "국가",
    overrideRate: "사용자 정의 세율 (%)",
    mode: "모드",
    modeNetToGross: "세전 → 세후",
    modeGrossToNet: "세후 → 세전",
    netAmount: "세전 금액",
    grossAmount: "세후 금액",
    net: "세전",
    vatLabel: "부가세",
    grossInclVat: "세후 (부가세 포함)",
    disclaimer: "표준 세율만 표시 — 많은 국가에서 특정 상품에 감면세율 또는 0% 세율을 적용합니다. 참고용이며 세무 조언이 아닙니다.",
  },
  ar: {
    country: "البلد",
    overrideRate: "نسبة مخصصة (%)",
    mode: "الوضع",
    modeNetToGross: "صافٍ → إجمالي",
    modeGrossToNet: "إجمالي → صافٍ",
    netAmount: "المبلغ الصافي",
    grossAmount: "المبلغ الإجمالي",
    net: "صافٍ",
    vatLabel: "ضريبة القيمة المضافة",
    grossInclVat: "الإجمالي (شامل الضريبة)",
    disclaimer: "النسب القياسية فقط — تطبّق دول كثيرة نسبًا مخفضة أو معفاة على سلع معينة. للاسترشاد فقط، وليس مشورة ضريبية.",
  },
  ru: {
    country: "Страна",
    overrideRate: "Пользовательская ставка (%)",
    mode: "Режим",
    modeNetToGross: "Без НДС → С НДС",
    modeGrossToNet: "С НДС → Без НДС",
    netAmount: "Сумма без НДС",
    grossAmount: "Сумма с НДС",
    net: "Без НДС",
    vatLabel: "НДС",
    grossInclVat: "Итого (с НДС)",
    disclaimer: "Только стандартные ставки — во многих странах действуют пониженные или нулевые ставки на отдельные товары. Только для ориентации, не является налоговым советом.",
  },
  hi: {
    country: "देश",
    overrideRate: "कस्टम दर (%)",
    mode: "मोड",
    modeNetToGross: "शुद्ध → सकल",
    modeGrossToNet: "सकल → शुद्ध",
    netAmount: "शुद्ध राशि",
    grossAmount: "सकल राशि",
    net: "शुद्ध",
    vatLabel: "VAT",
    grossInclVat: "सकल (VAT सहित)",
    disclaimer: "केवल मानक दरें — कई देशों में विशिष्ट वस्तुओं पर कम या शून्य दरें हैं। केवल मार्गदर्शन के लिए, कर सलाह नहीं।",
  },
  tr: {
    country: "Ülke",
    overrideRate: "Özel oran (%)",
    mode: "Mod",
    modeNetToGross: "Net → Brüt",
    modeGrossToNet: "Brüt → Net",
    netAmount: "Net tutar",
    grossAmount: "Brüt tutar",
    net: "Net",
    vatLabel: "KDV",
    grossInclVat: "Brüt (KDV dahil)",
    disclaimer: "Yalnızca standart oranlar — pek çok ülkede belirli mallara indirimli veya sıfır oran uygulanır. Yalnızca rehberlik amaçlıdır, vergi tavsiyesi değildir.",
  },
  id: {
    country: "Negara",
    overrideRate: "Tarif khusus (%)",
    mode: "Mode",
    modeNetToGross: "Neto → Bruto",
    modeGrossToNet: "Bruto → Neto",
    netAmount: "Jumlah neto",
    grossAmount: "Jumlah bruto",
    net: "Neto",
    vatLabel: "PPN",
    grossInclVat: "Bruto (termasuk PPN)",
    disclaimer: "Hanya tarif standar — banyak negara memiliki tarif yang dikurangi atau nol untuk barang tertentu. Hanya untuk panduan, bukan saran pajak.",
  },
  vi: {
    country: "Quốc gia",
    overrideRate: "Thuế suất tùy chỉnh (%)",
    mode: "Chế độ",
    modeNetToGross: "Chưa thuế → Có thuế",
    modeGrossToNet: "Có thuế → Chưa thuế",
    netAmount: "Số tiền chưa thuế",
    grossAmount: "Số tiền đã có thuế",
    net: "Chưa thuế",
    vatLabel: "VAT",
    grossInclVat: "Tổng (đã có VAT)",
    disclaimer: "Chỉ thuế suất tiêu chuẩn — nhiều quốc gia có thuế suất giảm hoặc bằng 0 cho các hàng hóa cụ thể. Chỉ mang tính tham khảo, không phải tư vấn thuế.",
  },
  sv: {
    country: "Land",
    overrideRate: "Anpassad skattesats (%)",
    mode: "Läge",
    modeNetToGross: "Netto → Brutto",
    modeGrossToNet: "Brutto → Netto",
    netAmount: "Nettobelopp",
    grossAmount: "Bruttobelopp",
    net: "Netto",
    vatLabel: "Moms",
    grossInclVat: "Brutto (inkl. moms)",
    disclaimer: "Endast standardskattesatser — många länder har reducerade eller nollskattesatser på specifika varor. Endast vägledning, inte skatterådgivning.",
  },
  pl: {
    country: "Kraj",
    overrideRate: "Niestandardowa stawka (%)",
    mode: "Tryb",
    modeNetToGross: "Netto → Brutto",
    modeGrossToNet: "Brutto → Netto",
    netAmount: "Kwota netto",
    grossAmount: "Kwota brutto",
    net: "Netto",
    vatLabel: "VAT",
    grossInclVat: "Brutto (z VAT)",
    disclaimer: "Tylko stawki standardowe — wiele krajów stosuje obniżone lub zerowe stawki na określone towary. Tylko do celów informacyjnych, nie jest to doradztwo podatkowe.",
  },
  uk: {
    country: "Країна",
    overrideRate: "Власна ставка (%)",
    mode: "Режим",
    modeNetToGross: "Без ПДВ → З ПДВ",
    modeGrossToNet: "З ПДВ → Без ПДВ",
    netAmount: "Сума без ПДВ",
    grossAmount: "Сума з ПДВ",
    net: "Без ПДВ",
    vatLabel: "ПДВ",
    grossInclVat: "Разом (з ПДВ)",
    disclaimer: "Лише стандартні ставки — у багатьох країнах діють знижені або нульові ставки на окремі товари. Лише для орієнтації, не є податковою консультацією.",
  },
  cs: {
    country: "Země",
    overrideRate: "Vlastní sazba (%)",
    mode: "Režim",
    modeNetToGross: "Bez DPH → S DPH",
    modeGrossToNet: "S DPH → Bez DPH",
    netAmount: "Částka bez DPH",
    grossAmount: "Částka s DPH",
    net: "Bez DPH",
    vatLabel: "DPH",
    grossInclVat: "Celkem (vč. DPH)",
    disclaimer: "Pouze standardní sazby — mnoho zemí má snížené nebo nulové sazby na konkrétní zboží. Pouze pro orientaci, ne daňové poradenství.",
  },
};

export function VatCalculatorClient() {
  const s = T[useLocale()] ?? T.en;

  const [country, setCountry] = useState("FR");
  const [customRate, setCustomRate] = useState<string>("");
  const [mode, setMode] = useState<Mode>("from_net");
  const [amount, setAmount] = useState("100");

  const row = RATES.find((r) => r.code === country)!;
  // Use the override only when it's actually entered — `|| row.rate` would treat a
  // deliberate 0% (zero-rated) override as falsy and silently revert to the standard rate.
  const customNum = customRate.trim() === "" ? NaN : Number(customRate);
  const rate = Number.isFinite(customNum) && customNum >= 0 ? customNum : row.rate;

  const result = useMemo(() => {
    const a = Number(amount);
    if (!Number.isFinite(a) || a < 0) return null;
    if (mode === "from_net") {
      const vat = a * (rate / 100);
      return { net: a, vat, gross: a + vat };
    }
    const net = a / (1 + rate / 100);
    return { net, vat: a - net, gross: a };
  }, [amount, rate, mode]);

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-3">
        <label className="flex flex-col text-xs font-medium text-ink-600">
          {s.country}
          <select value={country} onChange={(e) => { setCountry(e.target.value); setCustomRate(""); }}
            className="mt-1 rounded-md border border-ink-200 bg-white px-3 py-2 text-sm text-ink-900">
            {RATES.map((r) => <option key={r.code} value={r.code}>{r.name} ({r.rate}%)</option>)}
          </select>
        </label>
        <label className="flex flex-col text-xs font-medium text-ink-600">
          {s.overrideRate}
          <input type="number" min={0} max={100} step={0.1} value={customRate} placeholder={String(row.rate)}
            onChange={(e) => setCustomRate(e.target.value)}
            className="mt-1 rounded-md border border-ink-200 bg-white px-3 py-2 text-sm text-ink-900 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100" />
        </label>
        <div className="flex flex-col text-xs font-medium text-ink-600">
          {s.mode}
          <div className="mt-1 inline-flex rounded-lg border border-ink-200 bg-white p-1">
            {(["from_net", "from_gross"] as const).map((m) => (
              <button key={m} onClick={() => setMode(m)} className={`flex-1 rounded-md px-2 py-1 text-xs font-medium ${mode === m ? "bg-brand-500 text-white" : "text-ink-600"}`}>
                {m === "from_net" ? s.modeNetToGross : s.modeGrossToNet}
              </button>
            ))}
          </div>
        </div>
      </div>

      <label className="flex flex-col text-xs font-medium text-ink-600">
        {mode === "from_net" ? s.netAmount : s.grossAmount} ({row.cur})
        <input type="number" min={0} step={0.01} value={amount} onChange={(e) => setAmount(e.target.value)}
          className="mt-1 w-full rounded-md border border-ink-200 bg-white px-3 py-2 text-base text-ink-900 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100" />
      </label>

      <div className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-lg border border-ink-100 bg-white p-4">
          <div className="text-xs uppercase tracking-wide text-ink-400">{s.net}</div>
          <div className="mt-1 text-xl font-semibold text-ink-900">{result ? fmt(result.net, row.cur) : "—"}</div>
        </div>
        <div className="rounded-lg border border-ink-100 bg-white p-4">
          <div className="text-xs uppercase tracking-wide text-ink-400">{s.vatLabel} ({rate}%)</div>
          <div className="mt-1 text-xl font-semibold text-amber-700">{result ? fmt(result.vat, row.cur) : "—"}</div>
        </div>
        <div className="rounded-lg border border-brand-200 bg-brand-50/40 p-4">
          <div className="text-xs uppercase tracking-wide text-brand-700">{s.grossInclVat}</div>
          <div className="mt-1 text-xl font-semibold text-ink-900">{result ? fmt(result.gross, row.cur) : "—"}</div>
        </div>
      </div>

      <p className="text-xs text-ink-400">{s.disclaimer}</p>
    </div>
  );
}
