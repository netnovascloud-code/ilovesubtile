"use client";

import { useMemo, useState } from "react";
import { useLocale } from "@/hooks/useLocale";

function money(n: number): string {
  if (!Number.isFinite(n)) return "—";
  return n.toLocaleString("en-US", { maximumFractionDigits: 2, minimumFractionDigits: 2 });
}

const T: Record<string, Record<string, string>> = {
  en: {
    billAmount: "Bill amount",
    tipPct: "Tip (%)",
    splitBetween: "Split between",
    tip: "Tip",
    total: "Total",
    eachPays: "Each pays",
    privacy: "Calculated live in your browser — split a bill fairly in seconds.",
  },
  fr: {
    billAmount: "Montant de l'addition",
    tipPct: "Pourboire (%)",
    splitBetween: "Partager entre",
    tip: "Pourboire",
    total: "Total",
    eachPays: "Chacun paie",
    privacy: "Calculé en direct dans votre navigateur — partagez une note équitablement en quelques secondes.",
  },
  es: {
    billAmount: "Importe de la cuenta",
    tipPct: "Propina (%)",
    splitBetween: "Dividir entre",
    tip: "Propina",
    total: "Total",
    eachPays: "Cada uno paga",
    privacy: "Calculado en tiempo real en su navegador — divida una cuenta equitativamente en segundos.",
  },
  pt: {
    billAmount: "Valor da conta",
    tipPct: "Gorjeta (%)",
    splitBetween: "Dividir entre",
    tip: "Gorjeta",
    total: "Total",
    eachPays: "Cada um paga",
    privacy: "Calculado em tempo real no seu navegador — divida uma conta de forma justa em segundos.",
  },
  de: {
    billAmount: "Rechnungsbetrag",
    tipPct: "Trinkgeld (%)",
    splitBetween: "Aufteilen auf",
    tip: "Trinkgeld",
    total: "Gesamt",
    eachPays: "Jeder zahlt",
    privacy: "Live in Ihrem Browser berechnet — teilen Sie eine Rechnung in Sekunden fair auf.",
  },
  it: {
    billAmount: "Importo del conto",
    tipPct: "Mancia (%)",
    splitBetween: "Dividi tra",
    tip: "Mancia",
    total: "Totale",
    eachPays: "Ognuno paga",
    privacy: "Calcolato in tempo reale nel tuo browser — dividi un conto equamente in pochi secondi.",
  },
  nl: {
    billAmount: "Rekenbedrag",
    tipPct: "Fooi (%)",
    splitBetween: "Splitsen tussen",
    tip: "Fooi",
    total: "Totaal",
    eachPays: "Iedereen betaalt",
    privacy: "Live berekend in uw browser — splits een rekening eerlijk in seconden.",
  },
  ja: {
    billAmount: "請求金額",
    tipPct: "チップ (%)",
    splitBetween: "人数で割る",
    tip: "チップ",
    total: "合計",
    eachPays: "一人あたり",
    privacy: "ブラウザ内でリアルタイム計算 — 数秒で公平に割り勘できます。",
  },
  zh: {
    billAmount: "账单金额",
    tipPct: "小费 (%)",
    splitBetween: "分摊人数",
    tip: "小费",
    total: "总计",
    eachPays: "每人支付",
    privacy: "在您的浏览器中实时计算 — 几秒钟内公平分摊账单。",
  },
  ko: {
    billAmount: "청구 금액",
    tipPct: "팁 (%)",
    splitBetween: "나눌 인원",
    tip: "팁",
    total: "합계",
    eachPays: "각자 부담",
    privacy: "브라우저에서 실시간 계산 — 몇 초 만에 공정하게 나눠요.",
  },
  ar: {
    billAmount: "مبلغ الفاتورة",
    tipPct: "الإكرامية (%)",
    splitBetween: "التقسيم بين",
    tip: "الإكرامية",
    total: "الإجمالي",
    eachPays: "كل شخص يدفع",
    privacy: "يُحسب مباشرةً في متصفحك — قسّم فاتورة بعدل في ثوانٍ.",
  },
  ru: {
    billAmount: "Сумма счёта",
    tipPct: "Чаевые (%)",
    splitBetween: "Разделить между",
    tip: "Чаевые",
    total: "Итого",
    eachPays: "Каждый платит",
    privacy: "Вычисляется в реальном времени в вашем браузере — справедливо поделите счёт за секунды.",
  },
  hi: {
    billAmount: "बिल राशि",
    tipPct: "टिप (%)",
    splitBetween: "विभाजित करें",
    tip: "टिप",
    total: "कुल",
    eachPays: "प्रत्येक देता है",
    privacy: "आपके ब्राउज़र में लाइव गणना — सेकंडों में बिल को निष्पक्ष रूप से विभाजित करें।",
  },
  tr: {
    billAmount: "Hesap tutarı",
    tipPct: "Bahşiş (%)",
    splitBetween: "Arasında böl",
    tip: "Bahşiş",
    total: "Toplam",
    eachPays: "Her biri öder",
    privacy: "Tarayıcınızda canlı hesaplanır — faturayı saniyeler içinde adil bölün.",
  },
  id: {
    billAmount: "Jumlah tagihan",
    tipPct: "Tips (%)",
    splitBetween: "Bagi antara",
    tip: "Tips",
    total: "Total",
    eachPays: "Masing-masing bayar",
    privacy: "Dihitung secara langsung di browser Anda — bagi tagihan secara adil dalam hitungan detik.",
  },
  vi: {
    billAmount: "Số tiền hóa đơn",
    tipPct: "Tiền tip (%)",
    splitBetween: "Chia cho",
    tip: "Tiền tip",
    total: "Tổng cộng",
    eachPays: "Mỗi người trả",
    privacy: "Tính toán trực tiếp trong trình duyệt của bạn — chia hóa đơn công bằng trong vài giây.",
  },
  sv: {
    billAmount: "Räkningens belopp",
    tipPct: "Dricks (%)",
    splitBetween: "Dela mellan",
    tip: "Dricks",
    total: "Totalt",
    eachPays: "Var och en betalar",
    privacy: "Beräknas live i din webbläsare — dela en räkning rättvist på sekunder.",
  },
  pl: {
    billAmount: "Kwota rachunku",
    tipPct: "Napiwek (%)",
    splitBetween: "Podziel między",
    tip: "Napiwek",
    total: "Suma",
    eachPays: "Każdy płaci",
    privacy: "Obliczane na bieżąco w Twojej przeglądarce — podziel rachunek sprawiedliwie w kilka sekund.",
  },
  uk: {
    billAmount: "Сума рахунку",
    tipPct: "Чайові (%)",
    splitBetween: "Розділити між",
    tip: "Чайові",
    total: "Разом",
    eachPays: "Кожен платить",
    privacy: "Обчислюється в реальному часі у вашому браузері — справедливо розділіть рахунок за секунди.",
  },
  cs: {
    billAmount: "Částka účtu",
    tipPct: "Spropitné (%)",
    splitBetween: "Rozdělit mezi",
    tip: "Spropitné",
    total: "Celkem",
    eachPays: "Každý platí",
    privacy: "Vypočteno živě ve vašem prohlížeči — spravedlivě rozdělte účet během sekund.",
  },
};

export function TipCalculatorClient() {
  const s = T[useLocale()] ?? T.en;

  const [bill, setBill] = useState("60");
  const [tip, setTip] = useState("15");
  const [people, setPeople] = useState("2");

  const result = useMemo(() => {
    const b = Number(bill), t = Number(tip), p = Math.max(1, Math.floor(Number(people) || 1));
    if (!Number.isFinite(b) || !Number.isFinite(t) || b < 0) return null;
    const tipAmount = b * (t / 100);
    const total = b + tipAmount;
    return { tipAmount, total, perPerson: total / p, tipPerPerson: tipAmount / p, p };
  }, [bill, tip, people]);

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-3">
        <label className="flex flex-col text-xs font-medium text-ink-600">
          {s.billAmount}
          <input type="number" min={0} step={0.01} value={bill} onChange={(e) => setBill(e.target.value)}
            className="mt-1 rounded-md border border-ink-200 bg-white px-3 py-2 text-base text-ink-900 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100" />
        </label>
        <label className="flex flex-col text-xs font-medium text-ink-600">
          {s.tipPct}
          <input type="number" min={0} step={1} value={tip} onChange={(e) => setTip(e.target.value)}
            className="mt-1 rounded-md border border-ink-200 bg-white px-3 py-2 text-base text-ink-900 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100" />
        </label>
        <label className="flex flex-col text-xs font-medium text-ink-600">
          {s.splitBetween}
          <input type="number" min={1} step={1} value={people} onChange={(e) => setPeople(e.target.value)}
            className="mt-1 rounded-md border border-ink-200 bg-white px-3 py-2 text-base text-ink-900 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100" />
        </label>
      </div>

      <div className="flex flex-wrap gap-2">
        {[10, 15, 18, 20, 25].map((q) => (
          <button key={q} onClick={() => setTip(String(q))}
            className={`rounded-full border px-3 py-1 text-xs font-medium ${Number(tip) === q ? "border-brand-300 bg-brand-50 text-brand-700" : "border-ink-200 bg-white text-ink-600"}`}>
            {q}%
          </button>
        ))}
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-lg border border-ink-100 bg-white p-4">
          <div className="text-xs uppercase tracking-wide text-ink-400">{s.tip}</div>
          <div className="mt-1 text-2xl font-semibold text-amber-700">{result ? money(result.tipAmount) : "—"}</div>
        </div>
        <div className="rounded-lg border border-ink-100 bg-white p-4">
          <div className="text-xs uppercase tracking-wide text-ink-400">{s.total}</div>
          <div className="mt-1 text-2xl font-semibold text-ink-900">{result ? money(result.total) : "—"}</div>
        </div>
        <div className="rounded-lg border border-brand-200 bg-brand-50/40 p-4">
          <div className="text-xs uppercase tracking-wide text-brand-700">{s.eachPays} ({result?.p ?? 1})</div>
          <div className="mt-1 text-2xl font-semibold text-ink-900">{result ? money(result.perPerson) : "—"}</div>
        </div>
      </div>

      <p className="text-xs text-ink-400">{s.privacy}</p>
    </div>
  );
}
