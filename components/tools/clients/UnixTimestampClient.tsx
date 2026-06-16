"use client";

import { useEffect, useMemo, useState } from "react";
import { Copy, Check, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/hooks/useLocale";

function pad(n: number, w = 2) { return String(n).padStart(w, "0"); }
function toLocalISO(d: Date) {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

const ZONES = ["UTC", "America/New_York", "America/Los_Angeles", "Europe/London", "Europe/Paris", "Asia/Tokyo", "Asia/Shanghai"];

const T: Record<string, Record<string, string>> = {
  en: {
    currentUnixTime: "Current Unix time",
    useNow: "Use now",
    timestampToDate: "Timestamp → date",
    seconds: "Seconds",
    milliseconds: "Milliseconds",
    enterNumericTimestamp: "Enter a numeric timestamp.",
    dateToTimestamp: "Date → timestamp",
    pickValidDate: "Pick a valid date.",
    privacy: "100% in your browser — no data leaves your device.",
  },
  fr: {
    currentUnixTime: "Temps Unix actuel",
    useNow: "Utiliser maintenant",
    timestampToDate: "Horodatage → date",
    seconds: "Secondes",
    milliseconds: "Millisecondes",
    enterNumericTimestamp: "Entrez un horodatage numérique.",
    dateToTimestamp: "Date → horodatage",
    pickValidDate: "Choisissez une date valide.",
    privacy: "100 % dans votre navigateur — aucune donnée ne quitte votre appareil.",
  },
  es: {
    currentUnixTime: "Tiempo Unix actual",
    useNow: "Usar ahora",
    timestampToDate: "Marca de tiempo → fecha",
    seconds: "Segundos",
    milliseconds: "Milisegundos",
    enterNumericTimestamp: "Ingrese una marca de tiempo numérica.",
    dateToTimestamp: "Fecha → marca de tiempo",
    pickValidDate: "Elija una fecha válida.",
    privacy: "100 % en su navegador — ninguna dato sale de su dispositivo.",
  },
  pt: {
    currentUnixTime: "Tempo Unix atual",
    useNow: "Usar agora",
    timestampToDate: "Timestamp → data",
    seconds: "Segundos",
    milliseconds: "Milissegundos",
    enterNumericTimestamp: "Insira um timestamp numérico.",
    dateToTimestamp: "Data → timestamp",
    pickValidDate: "Escolha uma data válida.",
    privacy: "100 % no seu navegador — nenhum dado sai do seu dispositivo.",
  },
  de: {
    currentUnixTime: "Aktuelle Unix-Zeit",
    useNow: "Jetzt verwenden",
    timestampToDate: "Zeitstempel → Datum",
    seconds: "Sekunden",
    milliseconds: "Millisekunden",
    enterNumericTimestamp: "Geben Sie einen numerischen Zeitstempel ein.",
    dateToTimestamp: "Datum → Zeitstempel",
    pickValidDate: "Wählen Sie ein gültiges Datum.",
    privacy: "100 % in Ihrem Browser — keine Daten verlassen Ihr Gerät.",
  },
  it: {
    currentUnixTime: "Tempo Unix attuale",
    useNow: "Usa adesso",
    timestampToDate: "Timestamp → data",
    seconds: "Secondi",
    milliseconds: "Millisecondi",
    enterNumericTimestamp: "Inserisci un timestamp numerico.",
    dateToTimestamp: "Data → timestamp",
    pickValidDate: "Scegli una data valida.",
    privacy: "100 % nel tuo browser — nessun dato lascia il tuo dispositivo.",
  },
  nl: {
    currentUnixTime: "Huidige Unix-tijd",
    useNow: "Nu gebruiken",
    timestampToDate: "Tijdstempel → datum",
    seconds: "Seconden",
    milliseconds: "Milliseconden",
    enterNumericTimestamp: "Voer een numerieke tijdstempel in.",
    dateToTimestamp: "Datum → tijdstempel",
    pickValidDate: "Kies een geldige datum.",
    privacy: "100 % in uw browser — geen gegevens verlaten uw apparaat.",
  },
  ja: {
    currentUnixTime: "現在のUnix時刻",
    useNow: "現在時刻を使用",
    timestampToDate: "タイムスタンプ → 日付",
    seconds: "秒",
    milliseconds: "ミリ秒",
    enterNumericTimestamp: "数値のタイムスタンプを入力してください。",
    dateToTimestamp: "日付 → タイムスタンプ",
    pickValidDate: "有効な日付を選んでください。",
    privacy: "100 % ブラウザ内で処理 — データはデバイス外に出ません。",
  },
  zh: {
    currentUnixTime: "当前Unix时间",
    useNow: "使用当前时间",
    timestampToDate: "时间戳 → 日期",
    seconds: "秒",
    milliseconds: "毫秒",
    enterNumericTimestamp: "请输入数字时间戳。",
    dateToTimestamp: "日期 → 时间戳",
    pickValidDate: "请选择有效日期。",
    privacy: "100 % 在您的浏览器中处理 — 数据不会离开您的设备。",
  },
  ko: {
    currentUnixTime: "현재 Unix 시간",
    useNow: "현재 시간 사용",
    timestampToDate: "타임스탬프 → 날짜",
    seconds: "아",
    milliseconds: "밀리초",
    enterNumericTimestamp: "숫자 타임스탬프를 입력하세요.",
    dateToTimestamp: "날짜 → 타임스탬프",
    pickValidDate: "유효한 날짜를 선택하세요.",
    privacy: "100 % 브라우저에서 실행 — 데이터가 기기를 다나가지 않습니다.",
  },
  ar: {
    currentUnixTime: "وقت Unix الحالي",
    useNow: "استخدام الآن",
    timestampToDate: "الطابع الزمني → التاريخ",
    seconds: "ثوان",
    milliseconds: "مليثانية",
    enterNumericTimestamp: "أدخل طابعًا زمنيًا رقميًا.",
    dateToTimestamp: "التاريخ → الطابع الزمني",
    pickValidDate: "اختر تاريخًا صحيحًا.",
    privacy: "معالجة 100 % في متصفحك — لا تغادر بياناتك جهازك.",
  },
  ru: {
    currentUnixTime: "Текущее время Unix",
    useNow: "Использовать сейчас",
    timestampToDate: "Метка времени → дата",
    seconds: "Секунды",
    milliseconds: "Миллисекунды",
    enterNumericTimestamp: "Введите числовую метку времени.",
    dateToTimestamp: "Дата → метка времени",
    pickValidDate: "Выберите корректную дату.",
    privacy: "100 % в вашем браузере — данные не покидают ваше устройство.",
  },
  hi: {
    currentUnixTime: "वर्तमान Unix समय",
    useNow: "अभी उपयोग करें",
    timestampToDate: "टाइमस्टैंप → तारीख",
    seconds: "सेकंड",
    milliseconds: "मिलीसेकंड",
    enterNumericTimestamp: "एक संख्यात्मक टाइमस्टैंप दर्ज करें।",
    dateToTimestamp: "तारीख → टाइमस्टैंप",
    pickValidDate: "एक वैध तारीख चुनें।",
    privacy: "100 % आपके ब्राउज़र में — कोई डेटा आपके डिवाइस से नहीं जाता।",
  },
  tr: {
    currentUnixTime: "Mevcut Unix zamanı",
    useNow: "Şimdi kullan",
    timestampToDate: "Zaman damgası → tarih",
    seconds: "Saniye",
    milliseconds: "Milisaniye",
    enterNumericTimestamp: "Sayısal bir zaman damgası girin.",
    dateToTimestamp: "Tarih → zaman damgası",
    pickValidDate: "Geçerli bir tarih seçin.",
    privacy: "100 % tarayıcınızda — hiçbir veri cihazınızdan çıkmaz.",
  },
  id: {
    currentUnixTime: "Waktu Unix saat ini",
    useNow: "Gunakan sekarang",
    timestampToDate: "Cap waktu → tanggal",
    seconds: "Detik",
    milliseconds: "Milidetik",
    enterNumericTimestamp: "Masukkan cap waktu numerik.",
    dateToTimestamp: "Tanggal → cap waktu",
    pickValidDate: "Pilih tanggal yang valid.",
    privacy: "100 % di browser Anda — tidak ada data yang meninggalkan perangkat Anda.",
  },
  vi: {
    currentUnixTime: "Thời gian Unix hiện tại",
    useNow: "Dùng bây giờ",
    timestampToDate: "Dấu thời gian → ngày",
    seconds: "Giây",
    milliseconds: "Mili giây",
    enterNumericTimestamp: "Nhập dấu thời gian số.",
    dateToTimestamp: "Ngày → dấu thời gian",
    pickValidDate: "Chọn một ngày hợp lệ.",
    privacy: "100 % trong trình duyệt của bạn — không có dữ liệu nào rời khỏi thiết bị của bạn.",
  },
  sv: {
    currentUnixTime: "Aktuell Unix-tid",
    useNow: "Använd nu",
    timestampToDate: "Tidsstempel → datum",
    seconds: "Sekunder",
    milliseconds: "Millisekunder",
    enterNumericTimestamp: "Ange ett numeriskt tidsstempel.",
    dateToTimestamp: "Datum → tidsstempel",
    pickValidDate: "Välj ett giltigt datum.",
    privacy: "100 % i din webbläsare — ingen data lämnar din enhet.",
  },
  pl: {
    currentUnixTime: "Bieżący czas Unix",
    useNow: "Użyj teraz",
    timestampToDate: "Znacznik czasu → data",
    seconds: "Sekundy",
    milliseconds: "Milisekundy",
    enterNumericTimestamp: "Wprowadź numeryczny znacznik czasu.",
    dateToTimestamp: "Data → znacznik czasu",
    pickValidDate: "Wybierz prawidłową datę.",
    privacy: "100 % w Twojej przeglądarce — żadne dane nie opuszczają Twojego urządzenia.",
  },
  uk: {
    currentUnixTime: "Поточний час Unix",
    useNow: "Використати зараз",
    timestampToDate: "Мітка часу → дата",
    seconds: "Секунди",
    milliseconds: "Мілісекунди",
    enterNumericTimestamp: "Введіть числову мітку часу.",
    dateToTimestamp: "Дата → мітка часу",
    pickValidDate: "Виберіть правильну дату.",
    privacy: "100 % у вашому браузері — жодні дані не покидають ваш пристрій.",
  },
  cs: {
    currentUnixTime: "Aktuální čas Unix",
    useNow: "Použít nyní",
    timestampToDate: "Časové razítko → datum",
    seconds: "Sekundy",
    milliseconds: "Milisekundy",
    enterNumericTimestamp: "Zadejte číselné časové razítko.",
    dateToTimestamp: "Datum → časové razítko",
    pickValidDate: "Vyberte platné datum.",
    privacy: "100 % ve vašem prohlížeči — žádná data neošetřují vaše zařízení.",
  },
};

export function UnixTimestampClient() {
  const locale = useLocale();
  const s = T[locale] ?? T.en;
  // BCP-47 tag for date formatting. Keep en → en-GB (the day-month order the
  // page shipped with); every other supported locale code is a valid Intl tag.
  const dateLocale = locale === "en" ? "en-GB" : locale;

  // SSR can't pick a stable "now", so we start at 0 and let useEffect seed
  // the real values after mount. Without this the rendered seconds-since-epoch
  // and the local-ISO datetime input differ between SSR and hydration and
  // throw React #425.
  const [now, setNow] = useState(0);
  const [tsInput, setTsInput] = useState("");
  const [unit, setUnit] = useState<"s" | "ms">("s");
  const [dateInput, setDateInput] = useState("");
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    const seed = Math.floor(Date.now() / 1000);
    setNow(seed);
    setTsInput(String(seed));
    setDateInput(toLocalISO(new Date()));
    const id = setInterval(() => setNow(Math.floor(Date.now() / 1000)), 1000);
    return () => clearInterval(id);
  }, []);

  const date = useMemo(() => {
    const n = Number(tsInput);
    if (!Number.isFinite(n)) return null;
    const ms = unit === "ms" ? n : n * 1000;
    const d = new Date(ms);
    return isNaN(d.getTime()) ? null : d;
  }, [tsInput, unit]);

  const fromDate = useMemo(() => {
    const d = new Date(dateInput);
    if (isNaN(d.getTime())) return null;
    return d;
  }, [dateInput]);

  async function copy(id: string, value: string) {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(id);
      setTimeout(() => setCopied((c) => (c === id ? null : c)), 1200);
    } catch {}
  }

  // Why a mount gate: date.toLocaleString and dateInput's datetime-local
  // initial value both depend on the runtime's timezone and ICU build, so SSR
  // (Node, UTC) and the client (browser, user TZ) can diverge in the rendered
  // timestamp rows. SSR ships a skeleton and the client renders for real.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) {
    return <div className="space-y-6"><div className="h-14 w-full animate-pulse rounded-md bg-ink-100" /><div className="h-40 w-full animate-pulse rounded-md bg-ink-100" /></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3 rounded-lg border border-ink-100 bg-white p-4">
        <div>
          <div className="text-xs uppercase tracking-wide text-ink-400">{s.currentUnixTime}</div>
          <div className="font-mono text-2xl text-ink-900">{now}</div>
        </div>
        <Button size="sm" variant="outline" className="ml-auto" onClick={() => { setTsInput(String(now)); setUnit("s"); }}>
          <RefreshCw className="h-3.5 w-3.5" /> {s.useNow}
        </Button>
      </div>

      <section className="rounded-lg border border-ink-100 bg-white p-5">
        <h2 className="font-semibold text-ink-900">{s.timestampToDate}</h2>
        <div className="mt-3 flex flex-wrap gap-3">
          <input
            value={tsInput}
            onChange={(e) => setTsInput(e.target.value)}
            placeholder="1700000000"
            className="flex-1 rounded-md border border-ink-200 bg-white px-3 py-2 font-mono text-sm text-ink-900 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100"
          />
          <div className="inline-flex rounded-lg border border-ink-200 bg-white p-1">
            {(["s", "ms"] as const).map((u) => (
              <button key={u} onClick={() => setUnit(u)} className={`rounded-md px-3 py-1 text-xs font-medium ${unit === u ? "bg-brand-500 text-white" : "text-ink-600"}`}>
                {u === "s" ? s.seconds : s.milliseconds}
              </button>
            ))}
          </div>
        </div>

        {date ? (
          <ul className="mt-4 space-y-2 text-sm">
            {ZONES.map((tz) => {
              const value = date.toLocaleString(dateLocale, { timeZone: tz, dateStyle: "full", timeStyle: "medium" });
              return (
                <li key={tz} className="flex items-center gap-3 rounded border border-ink-100 px-3 py-2">
                  <span className="w-44 shrink-0 font-mono text-xs uppercase tracking-wide text-ink-400">{tz}</span>
                  <span className="flex-1 text-ink-800">{value}</span>
                  <button onClick={() => copy(tz, value)} className="rounded p-1 text-ink-400 hover:bg-ink-50 hover:text-ink-700">
                    {copied === tz ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                  </button>
                </li>
              );
            })}
            <li className="flex items-center gap-3 rounded border border-ink-100 px-3 py-2">
              <span className="w-44 shrink-0 font-mono text-xs uppercase tracking-wide text-ink-400">ISO 8601</span>
              <span className="flex-1 font-mono text-ink-800">{date.toISOString()}</span>
              <button onClick={() => copy("iso", date.toISOString())} className="rounded p-1 text-ink-400 hover:bg-ink-50 hover:text-ink-700">
                {copied === "iso" ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
              </button>
            </li>
          </ul>
        ) : (
          <p className="mt-3 text-sm text-red-600">{s.enterNumericTimestamp}</p>
        )}
      </section>

      <section className="rounded-lg border border-ink-100 bg-white p-5">
        <h2 className="font-semibold text-ink-900">{s.dateToTimestamp}</h2>
        <input
          type="datetime-local"
          step="1"
          value={dateInput}
          onChange={(e) => setDateInput(e.target.value)}
          className="mt-3 rounded-md border border-ink-200 bg-white px-3 py-2 text-sm text-ink-900 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100"
        />
        {fromDate ? (
          <ul className="mt-4 space-y-2 text-sm">
            <li className="flex items-center gap-3 rounded border border-ink-100 px-3 py-2">
              <span className="w-44 shrink-0 font-mono text-xs uppercase tracking-wide text-ink-400">{s.seconds}</span>
              <span className="flex-1 font-mono text-ink-900">{Math.floor(fromDate.getTime() / 1000)}</span>
              <button onClick={() => copy("s", String(Math.floor(fromDate.getTime() / 1000)))} className="rounded p-1 text-ink-400 hover:bg-ink-50 hover:text-ink-700">
                {copied === "s" ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
              </button>
            </li>
            <li className="flex items-center gap-3 rounded border border-ink-100 px-3 py-2">
              <span className="w-44 shrink-0 font-mono text-xs uppercase tracking-wide text-ink-400">{s.milliseconds}</span>
              <span className="flex-1 font-mono text-ink-900">{fromDate.getTime()}</span>
              <button onClick={() => copy("ms", String(fromDate.getTime()))} className="rounded p-1 text-ink-400 hover:bg-ink-50 hover:text-ink-700">
                {copied === "ms" ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
              </button>
            </li>
          </ul>
        ) : (
          <p className="mt-3 text-sm text-red-600">{s.pickValidDate}</p>
        )}
      </section>

      <p className="text-xs text-ink-400">{s.privacy}</p>
    </div>
  );
}
