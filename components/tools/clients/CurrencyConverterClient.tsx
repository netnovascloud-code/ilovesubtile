"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowLeftRight, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/hooks/useLocale";

/**
 * Live currency converter using the Frankfurter public API (no key, ECB rates).
 * Endpoint: https://api.frankfurter.dev/v1/latest?from=EUR&to=USD,GBP,...
 * Falls back gracefully on network errors. Rates cached for 1 hour in
 * sessionStorage to avoid hammering the API while the user plays.
 */

// ECB (Frankfurter) reference set only. RUB and AED were previously listed but
// the ECB feed does not publish them → they silently returned "—". Replaced
// with ISK and THB, which the feed does provide, keeping the count at 28.
const CURRENCIES = [
  "EUR", "USD", "GBP", "JPY", "CNY", "CAD", "AUD", "CHF", "SEK", "NOK", "DKK", "PLN", "CZK", "HUF",
  "RON", "BGN", "TRY", "THB", "INR", "BRL", "MXN", "ZAR", "SGD", "HKD", "KRW", "NZD", "ILS", "ISK",
];

const CACHE_KEY = "konver_fx_rates_v1";
const CACHE_TTL_MS = 60 * 60 * 1000;

type Rates = { base: string; date: string; rates: Record<string, number> };

async function fetchRates(base: string): Promise<Rates> {
  const cached = sessionStorage.getItem(`${CACHE_KEY}:${base}`);
  if (cached) {
    try {
      const { ts, data } = JSON.parse(cached) as { ts: number; data: Rates };
      if (Date.now() - ts < CACHE_TTL_MS) return data;
    } catch {}
  }
  const res = await fetch(`https://api.frankfurter.dev/v1/latest?base=${base}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const json = await res.json();
  const data: Rates = { base, date: json.date, rates: json.rates };
  // The API doesn't include the base in `rates`; add a 1.0 self-rate for symmetry.
  data.rates[base] = 1;
  sessionStorage.setItem(`${CACHE_KEY}:${base}`, JSON.stringify({ ts: Date.now(), data }));
  return data;
}

function fmt(n: number, cur: string): string {
  try {
    return new Intl.NumberFormat("en-GB", { style: "currency", currency: cur, maximumFractionDigits: 2 }).format(n);
  } catch {
    return n.toFixed(2) + " " + cur;
  }
}

const T: Record<string, Record<string, string>> = {
  en: {
    from: "From",
    to: "To",
    swapLabel: "Swap",
    ecbRates: "ECB rates",
    fetchError: "Could not fetch live rates ({msg}). The market may be closed.",
    privacy: "Rates from frankfurter.dev (ECB) — for information only, not for trading.",
  },
  fr: {
    from: "De",
    to: "Vers",
    swapLabel: "Inverser",
    ecbRates: "Taux BCE",
    fetchError: "Impossible de récupérer les taux en direct ({msg}). Le marché est peut-être fermé.",
    privacy: "Taux de frankfurter.dev (BCE) — à titre informatif uniquement, pas pour le trading.",
  },
  es: {
    from: "De",
    to: "A",
    swapLabel: "Intercambiar",
    ecbRates: "Tasas BCE",
    fetchError: "No se pudieron obtener las tasas en vivo ({msg}). El mercado puede estar cerrado.",
    privacy: "Tasas de frankfurter.dev (BCE) — solo informativo, no para operaciones comerciales.",
  },
  pt: {
    from: "De",
    to: "Para",
    swapLabel: "Inverter",
    ecbRates: "Taxas BCE",
    fetchError: "Não foi possível obter as taxas em tempo real ({msg}). O mercado pode estar fechado.",
    privacy: "Taxas de frankfurter.dev (BCE) — apenas para informação, não para negociação.",
  },
  de: {
    from: "Von",
    to: "Nach",
    swapLabel: "Tauschen",
    ecbRates: "EZB-Kurse",
    fetchError: "Live-Kurse konnten nicht abgerufen werden ({msg}). Der Markt kann geschlossen sein.",
    privacy: "Kurse von frankfurter.dev (EZB) — nur zur Information, nicht für den Handel.",
  },
  it: {
    from: "Da",
    to: "A",
    swapLabel: "Inverti",
    ecbRates: "Tassi BCE",
    fetchError: "Impossibile ottenere i tassi in tempo reale ({msg}). Il mercato potrebbe essere chiuso.",
    privacy: "Tassi da frankfurter.dev (BCE) — solo a scopo informativo, non per il trading.",
  },
  nl: {
    from: "Van",
    to: "Naar",
    swapLabel: "Wisselen",
    ecbRates: "ECB-koersen",
    fetchError: "Live koersen konden niet worden opgehaald ({msg}). De markt is mogelijk gesloten.",
    privacy: "Koersen van frankfurter.dev (ECB) — alleen ter informatie, niet voor handel.",
  },
  ja: {
    from: "変換元",
    to: "変換先",
    swapLabel: "入れ替え",
    ecbRates: "ECB レート",
    fetchError: "ライブレートを取得できませんでした（{msg}）。市場が閉まっている可能性があります。",
    privacy: "frankfurter.dev（ECB）のレート — 情報提供のみ、取引目的ではありません。",
  },
  zh: {
    from: "从",
    to: "到",
    swapLabel: "互换",
    ecbRates: "欧洲央行汇率",
    fetchError: "无法获取实时汇率（{msg}）。市场可能已关闭。",
    privacy: "来自 frankfurter.dev（欧洲央行）的汇率 — 仅供参考，不用于交易。",
  },
  ko: {
    from: "출발",
    to: "도착",
    swapLabel: "교환",
    ecbRates: "ECB 환율",
    fetchError: "실시간 환율을 가져올 수 없습니다 ({msg}). 시장이 닫혀 있을 수 있습니다.",
    privacy: "frankfurter.dev(ECB) 환율 — 정보 제공용이며 거래 목적이 아닙니다.",
  },
  ar: {
    from: "من",
    to: "إلى",
    swapLabel: "تبديل",
    ecbRates: "أسعار البنك المركزي الأوروبي",
    fetchError: "تعذّر جلب الأسعار الحية ({msg}). قد يكون السوق مغلقًا.",
    privacy: "أسعار من frankfurter.dev (البنك المركزي الأوروبي) — للاستعلام فقط، وليس للتداول.",
  },
  ru: {
    from: "Из",
    to: "В",
    swapLabel: "Поменять",
    ecbRates: "Курсы ЕЦБ",
    fetchError: "Не удалось получить актуальные курсы ({msg}). Рынок может быть закрыт.",
    privacy: "Курсы с frankfurter.dev (ЕЦБ) — только для информации, не для торговли.",
  },
  hi: {
    from: "से",
    to: "तक",
    swapLabel: "अदला-बदली",
    ecbRates: "ECB दरें",
    fetchError: "लाइव दरें प्राप्त नहीं हो सकीं ({msg})। बाज़ार बंद हो सकता है।",
    privacy: "frankfurter.dev (ECB) की दरें — केवल जानकारी के लिए, व्यापार के लिए नहीं।",
  },
  tr: {
    from: "Kaynak",
    to: "Hedef",
    swapLabel: "Değiştir",
    ecbRates: "ECB kuru",
    fetchError: "Canlı kurlar alınamadı ({msg}). Piyasa kapalı olabilir.",
    privacy: "frankfurter.dev (ECB) kurları — yalnızca bilgi amaçlı, alım satım için değil.",
  },
  id: {
    from: "Dari",
    to: "Ke",
    swapLabel: "Tukar",
    ecbRates: "Kurs ECB",
    fetchError: "Tidak dapat mengambil kurs langsung ({msg}). Pasar mungkin sedang tutup.",
    privacy: "Kurs dari frankfurter.dev (ECB) — hanya untuk informasi, bukan untuk perdagangan.",
  },
  vi: {
    from: "Từ",
    to: "Sang",
    swapLabel: "Hoán đổi",
    ecbRates: "Tỷ giá ECB",
    fetchError: "Không thể lấy tỷ giá trực tiếp ({msg}). Thị trường có thể đã đóng cửa.",
    privacy: "Tỷ giá từ frankfurter.dev (ECB) — chỉ để tham khảo, không dùng cho giao dịch.",
  },
  sv: {
    from: "Från",
    to: "Till",
    swapLabel: "Byt",
    ecbRates: "ECB-kurser",
    fetchError: "Kunde inte hämta livekurser ({msg}). Marknaden kan vara stängd.",
    privacy: "Kurser från frankfurter.dev (ECB) — endast för information, inte för handel.",
  },
  pl: {
    from: "Z",
    to: "Na",
    swapLabel: "Zamień",
    ecbRates: "Kursy EBC",
    fetchError: "Nie można pobrać kursów na żywo ({msg}). Rynek może być zamknięty.",
    privacy: "Kursy z frankfurter.dev (EBC) — tylko informacyjnie, nie do handlu.",
  },
  uk: {
    from: "З",
    to: "До",
    swapLabel: "Поміняти",
    ecbRates: "Курси ЄЦБ",
    fetchError: "Не вдалося отримати актуальні курси ({msg}). Ринок може бути закритим.",
    privacy: "Курси з frankfurter.dev (ЄЦБ) — лише для інформації, не для торгівлі.",
  },
  cs: {
    from: "Z",
    to: "Na",
    swapLabel: "Přepnout",
    ecbRates: "Kurzy ECB",
    fetchError: "Nepodařilo se načíst živé kurzy ({msg}). Trh může být uzavřen.",
    privacy: "Kurzy z frankfurter.dev (ECB) — pouze pro informaci, nikoli pro obchodování.",
  },
};

export function CurrencyConverterClient() {
  const s = T[useLocale()] ?? T.en;

  const [from, setFrom] = useState("EUR");
  const [to, setTo] = useState("USD");
  const [amount, setAmount] = useState("100");
  const [rates, setRates] = useState<Rates | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetchRates(from)
      .then((r) => { if (!cancelled) setRates(r); })
      .catch((e) => { if (!cancelled) setError(s.fetchError.replace("{msg}", (e as Error).message)); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [from, s.fetchError]);

  const result = useMemo(() => {
    const a = Number(amount);
    if (!rates || !Number.isFinite(a)) return null;
    const r = rates.rates[to];
    if (!r) return null;
    return { value: a * r, rate: r };
  }, [amount, to, rates]);

  function swap() {
    setFrom(to);
    setTo(from);
  }

  return (
    <div className="space-y-5">
      <div className="grid gap-3 sm:grid-cols-[1fr_auto_1fr]">
        <div className="rounded-lg border border-ink-100 bg-white p-4">
          <label htmlFor="cc-from" className="block text-xs font-medium text-ink-500">{s.from}</label>
          <select id="cc-from" value={from} onChange={(e) => setFrom(e.target.value)}
            className="mt-1 w-full rounded-md border border-ink-200 bg-white px-3 py-2 font-semibold text-ink-900">
            {CURRENCIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <input type="number" step="0.01" value={amount} onChange={(e) => setAmount(e.target.value)} aria-label={`${s.from} — ${from}`}
            className="mt-3 w-full rounded-md border border-ink-200 bg-white px-3 py-2 text-2xl font-semibold text-ink-900 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100" />
        </div>

        <div className="flex items-center justify-center">
          <Button variant="outline" size="sm" onClick={swap} aria-label={s.swapLabel}>
            <ArrowLeftRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="rounded-lg border border-brand-200 bg-brand-50/40 p-4">
          <label htmlFor="cc-to" className="block text-xs font-medium text-brand-700">{s.to}</label>
          <select id="cc-to" value={to} onChange={(e) => setTo(e.target.value)}
            className="mt-1 w-full rounded-md border border-ink-200 bg-white px-3 py-2 font-semibold text-ink-900">
            {CURRENCIES.filter((c) => c !== from).map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <div className="mt-3 truncate text-2xl font-semibold text-ink-900">
            {loading ? <Loader2 className="h-5 w-5 animate-spin text-brand-500" />
              : result ? fmt(result.value, to) : "—"}
          </div>
        </div>
      </div>

      {result && rates && (
        <div className="text-sm text-ink-500">
          1 {from} = <span className="font-mono text-ink-900">{result.rate.toFixed(6)}</span> {to} · {s.ecbRates} {rates.date}
        </div>
      )}
      {error && <p className="flex items-center gap-1.5 text-sm text-red-600"><AlertCircle className="h-4 w-4" /> {error}</p>}
      <p className="text-xs text-ink-400">{s.privacy}</p>
    </div>
  );
}
