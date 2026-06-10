"use client";

import { useMemo, useState } from "react";
import { useLocale } from "@/hooks/useLocale";

function money(n: number): string {
  if (!Number.isFinite(n)) return "—";
  return n.toLocaleString("en-US", { maximumFractionDigits: 2, minimumFractionDigits: 2 });
}

const T: Record<string, Record<string, string>> = {
  en: {
    loanAmount: "Loan amount",
    annualRate: "Annual interest rate (%)",
    term: "Term (years)",
    monthlyPayment: "Monthly payment",
    totalInterest: "Total interest",
    totalRepaid: "Total repaid",
    disclaimer: "Fixed-rate amortised estimate over {n} payments. For guidance only — your lender's terms (fees, compounding) may differ.",
  },
  fr: {
    loanAmount: "Montant du prêt",
    annualRate: "Taux d'intérêt annuel (%)",
    term: "Durée (années)",
    monthlyPayment: "Mensualité",
    totalInterest: "Total des intérêts",
    totalRepaid: "Total remboursé",
    disclaimer: "Estimation à taux fixe amorti sur {n} paiements. À titre indicatif uniquement — les conditions de votre prêteur (frais, capitalisation) peuvent différer.",
  },
  es: {
    loanAmount: "Importe del préstamo",
    annualRate: "Tasa de interés anual (%)",
    term: "Plazo (años)",
    monthlyPayment: "Cuota mensual",
    totalInterest: "Intereses totales",
    totalRepaid: "Total reembolsado",
    disclaimer: "Estimación amortizada a tipo fijo en {n} pagos. Solo orientativo — las condiciones de su prestamista (comisiones, capitalización) pueden diferir.",
  },
  pt: {
    loanAmount: "Valor do empréstimo",
    annualRate: "Taxa de juro anual (%)",
    term: "Prazo (anos)",
    monthlyPayment: "Prestação mensal",
    totalInterest: "Juros totais",
    totalRepaid: "Total reembolsado",
    disclaimer: "Estimativa amortizada a taxa fixa em {n} pagamentos. Apenas para orientação — as condições do seu credor (taxas, capitalização) podem diferir.",
  },
  de: {
    loanAmount: "Darlehensbetrag",
    annualRate: "Jährlicher Zinssatz (%)",
    term: "Laufzeit (Jahre)",
    monthlyPayment: "Monatliche Rate",
    totalInterest: "Gesamtzinsen",
    totalRepaid: "Gesamtrückzahlung",
    disclaimer: "Festzins-Amortisationsschätzung über {n} Zahlungen. Nur zur Orientierung — die Konditionen Ihres Kreditgebers (Gebühren, Zinseszins) können abweichen.",
  },
  it: {
    loanAmount: "Importo del prestito",
    annualRate: "Tasso di interesse annuo (%)",
    term: "Durata (anni)",
    monthlyPayment: "Rata mensile",
    totalInterest: "Interessi totali",
    totalRepaid: "Totale rimborsato",
    disclaimer: "Stima ammortizzata a tasso fisso su {n} pagamenti. Solo a scopo informativo — i termini del tuo istituto di credito (spese, capitalizzazione) possono differire.",
  },
  nl: {
    loanAmount: "Leenbedrag",
    annualRate: "Jaarlijkse rente (%)",
    term: "Looptijd (jaren)",
    monthlyPayment: "Maandelijkse betaling",
    totalInterest: "Totale rente",
    totalRepaid: "Totaal terugbetaald",
    disclaimer: "Vaste rente amortisatieschatting over {n} betalingen. Alleen ter informatie — de voorwaarden van uw kredietverstrekker (kosten, rente op rente) kunnen afwijken.",
  },
  ja: {
    loanAmount: "借入金額",
    annualRate: "年利率 (%)",
    term: "返済期間（年）",
    monthlyPayment: "月々の支払い",
    totalInterest: "総利息",
    totalRepaid: "総返済額",
    disclaimer: "{n} 回払いの固定金利元利均等返済の試算です。参考のみ — 金融機関の条件（手数料、複利）は異なる場合があります。",
  },
  zh: {
    loanAmount: "贷款金额",
    annualRate: "年利率 (%)",
    term: "期限（年）",
    monthlyPayment: "月供",
    totalInterest: "总利息",
    totalRepaid: "总还款额",
    disclaimer: "{n} 期固定利率摊还估算。仅供参考 — 您的贷款方条款（费用、复利）可能有所不同。",
  },
  ko: {
    loanAmount: "대출 금액",
    annualRate: "연이자율 (%)",
    term: "기간 (년)",
    monthlyPayment: "월 상환액",
    totalInterest: "총 이자",
    totalRepaid: "총 상환액",
    disclaimer: "{n}회 고정금리 원리금균등상환 추정치입니다. 참고용 — 대출기관의 조건(수수료, 복리)과 다를 수 있습니다.",
  },
  ar: {
    loanAmount: "مبلغ القرض",
    annualRate: "سعر الفائدة السنوي (%)",
    term: "المدة (بالسنوات)",
    monthlyPayment: "الدفعة الشهرية",
    totalInterest: "إجمالي الفوائد",
    totalRepaid: "إجمالي المسدَّد",
    disclaimer: "تقدير إطفاء بسعر ثابت على {n} دفعة. للاسترشاد فقط — قد تختلف شروط المقرض (الرسوم، الفائدة المركبة).",
  },
  ru: {
    loanAmount: "Сумма кредита",
    annualRate: "Годовая процентная ставка (%)",
    term: "Срок (лет)",
    monthlyPayment: "Ежемесячный платёж",
    totalInterest: "Общая сумма процентов",
    totalRepaid: "Всего выплачено",
    disclaimer: "Расчёт с фиксированной ставкой на {n} платежей. Только для ориентации — условия вашего кредитора (комиссии, капитализация) могут отличаться.",
  },
  hi: {
    loanAmount: "ऋण राशि",
    annualRate: "वार्षिक ब्याज दर (%)",
    term: "अवधि (वर्ष)",
    monthlyPayment: "मासिक भुगतान",
    totalInterest: "कुल ब्याज",
    totalRepaid: "कुल चुकाया गया",
    disclaimer: "{n} भुगतानों में निश्चित-दर परिशोधन अनुमान। केवल मार्गदर्शन के लिए — आपके ऋणदाता की शर्तें (शुल्क, चक्रवृद्धि) भिन्न हो सकती हैं।",
  },
  tr: {
    loanAmount: "Kredi tutarı",
    annualRate: "Yıllık faiz oranı (%)",
    term: "Vade (yıl)",
    monthlyPayment: "Aylık ödeme",
    totalInterest: "Toplam faiz",
    totalRepaid: "Toplam geri ödeme",
    disclaimer: "{n} taksit üzerinden sabit oranlı itfa tahmini. Yalnızca rehberlik amaçlıdır — kreditörünüzün koşulları (ücretler, bileşik faiz) farklı olabilir.",
  },
  id: {
    loanAmount: "Jumlah pinjaman",
    annualRate: "Suku bunga tahunan (%)",
    term: "Jangka waktu (tahun)",
    monthlyPayment: "Cicilan bulanan",
    totalInterest: "Total bunga",
    totalRepaid: "Total yang dibayar",
    disclaimer: "Estimasi amortisasi suku bunga tetap selama {n} pembayaran. Hanya untuk panduan — syarat pemberi pinjaman Anda (biaya, bunga majemuk) mungkin berbeda.",
  },
  vi: {
    loanAmount: "Số tiền vay",
    annualRate: "Lãi suất hàng năm (%)",
    term: "Thời hạn (năm)",
    monthlyPayment: "Thanh toán hàng tháng",
    totalInterest: "Tổng lãi",
    totalRepaid: "Tổng số đã trả",
    disclaimer: "Ước tính khấu hao lãi suất cố định trong {n} kỳ thanh toán. Chỉ mang tính tham khảo — điều khoản của bên cho vay (phí, lãi kép) có thể khác.",
  },
  sv: {
    loanAmount: "Lånebelopp",
    annualRate: "Årlig ränta (%)",
    term: "Löptid (år)",
    monthlyPayment: "Månadsbetalning",
    totalInterest: "Total ränta",
    totalRepaid: "Totalt återbetalat",
    disclaimer: "Fast räntamorteringsberäkning över {n} betalningar. Endast vägledning — din långivares villkor (avgifter, ränta på ränta) kan skilja sig.",
  },
  pl: {
    loanAmount: "Kwota kredytu",
    annualRate: "Roczna stopa procentowa (%)",
    term: "Okres (lata)",
    monthlyPayment: "Miesięczna rata",
    totalInterest: "Łączne odsetki",
    totalRepaid: "Łączna spłata",
    disclaimer: "Szacunek amortyzacji o stałej stopie przez {n} rat. Tylko informacyjnie — warunki Twojego kredytodawcy (opłaty, oprocentowanie składane) mogą się różnić.",
  },
  uk: {
    loanAmount: "Сума кредиту",
    annualRate: "Річна відсоткова ставка (%)",
    term: "Термін (роки)",
    monthlyPayment: "Щомісячний платіж",
    totalInterest: "Загальна сума відсотків",
    totalRepaid: "Всього виплачено",
    disclaimer: "Розрахунок з фіксованою ставкою на {n} платежів. Лише для орієнтації — умови вашого кредитора (комісії, капіталізація) можуть відрізнятися.",
  },
  cs: {
    loanAmount: "Výše úvěru",
    annualRate: "Roční úroková sazba (%)",
    term: "Doba splácení (roky)",
    monthlyPayment: "Měsíční splátka",
    totalInterest: "Celkové úroky",
    totalRepaid: "Celkem splaceno",
    disclaimer: "Odhad amortizace s fixní sazbou na {n} splátek. Pouze pro orientaci — podmínky vašeho věřitele (poplatky, složené úročení) se mohou lišit.",
  },
};

export function LoanCalculatorClient() {
  const s = T[useLocale()] ?? T.en;

  const [amount, setAmount] = useState("20000");
  const [rate, setRate] = useState("5");
  const [years, setYears] = useState("5");

  const result = useMemo(() => {
    const p = Number(amount), annual = Number(rate), y = Number(years);
    if (!Number.isFinite(p) || !Number.isFinite(annual) || !Number.isFinite(y) || p <= 0 || y <= 0) return null;
    const n = Math.round(y * 12);
    const r = annual / 100 / 12;
    // Amortised monthly payment. r === 0 → straight-line (interest-free loan).
    const monthly = r === 0 ? p / n : (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const total = monthly * n;
    return { monthly, total, interest: total - p, n };
  }, [amount, rate, years]);

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-3">
        <label className="flex flex-col text-xs font-medium text-ink-600">
          {s.loanAmount}
          <input type="number" min={0} step={100} value={amount} onChange={(e) => setAmount(e.target.value)}
            className="mt-1 rounded-md border border-ink-200 bg-white px-3 py-2 text-base text-ink-900 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100" />
        </label>
        <label className="flex flex-col text-xs font-medium text-ink-600">
          {s.annualRate}
          <input type="number" min={0} step={0.01} value={rate} onChange={(e) => setRate(e.target.value)}
            className="mt-1 rounded-md border border-ink-200 bg-white px-3 py-2 text-base text-ink-900 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100" />
        </label>
        <label className="flex flex-col text-xs font-medium text-ink-600">
          {s.term}
          <input type="number" min={0} step={1} value={years} onChange={(e) => setYears(e.target.value)}
            className="mt-1 rounded-md border border-ink-200 bg-white px-3 py-2 text-base text-ink-900 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100" />
        </label>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-lg border border-brand-200 bg-brand-50/40 p-4">
          <div className="text-xs uppercase tracking-wide text-brand-700">{s.monthlyPayment}</div>
          <div className="mt-1 text-2xl font-semibold text-ink-900">{result ? money(result.monthly) : "—"}</div>
        </div>
        <div className="rounded-lg border border-ink-100 bg-white p-4">
          <div className="text-xs uppercase tracking-wide text-ink-400">{s.totalInterest}</div>
          <div className="mt-1 text-2xl font-semibold text-amber-700">{result ? money(result.interest) : "—"}</div>
        </div>
        <div className="rounded-lg border border-ink-100 bg-white p-4">
          <div className="text-xs uppercase tracking-wide text-ink-400">{s.totalRepaid}</div>
          <div className="mt-1 text-2xl font-semibold text-ink-900">{result ? money(result.total) : "—"}</div>
        </div>
      </div>

      <p className="text-xs text-ink-400">
        {s.disclaimer.replace("{n}", String(result ? result.n : 0))}
      </p>
    </div>
  );
}
