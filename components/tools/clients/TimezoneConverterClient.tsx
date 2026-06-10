"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowRightLeft } from "lucide-react";
import { useLocale } from "@/hooks/useLocale";

/** Full IANA zone list when the engine supports it; otherwise a sane fallback. */
function zoneList(): string[] {
  type IntlWithValues = typeof Intl & { supportedValuesOf?: (k: string) => string[] };
  const intl = Intl as IntlWithValues;
  if (typeof intl.supportedValuesOf === "function") {
    try { return intl.supportedValuesOf("timeZone"); } catch { /* fall through */ }
  }
  return [
    "UTC", "Europe/London", "Europe/Paris", "Europe/Berlin", "Europe/Moscow",
    "America/New_York", "America/Chicago", "America/Denver", "America/Los_Angeles",
    "America/Sao_Paulo", "Asia/Dubai", "Asia/Kolkata", "Asia/Shanghai",
    "Asia/Tokyo", "Asia/Singapore", "Australia/Sydney", "Pacific/Auckland",
  ];
}

function browserZone(): string {
  try { return Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC"; } catch { return "UTC"; }
}

function nowLocalInput(): string {
  const n = new Date();
  const p = (x: number) => String(x).padStart(2, "0");
  return `${n.getFullYear()}-${p(n.getMonth() + 1)}-${p(n.getDate())}T${p(n.getHours())}:${p(n.getMinutes())}`;
}

/** Offset (ms) of `timeZone` at the given instant: (wall-clock in zone) − UTC. */
function zoneOffsetMs(timeZone: string, instant: Date): number {
  const dtf = new Intl.DateTimeFormat("en-US", {
    timeZone, hour12: false,
    year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", second: "2-digit",
  });
  const parts = Object.fromEntries(dtf.formatToParts(instant).map((p) => [p.type, p.value]));
  // "24" can appear for midnight in some engines — normalise to 0.
  const hour = parts.hour === "24" ? 0 : Number(parts.hour);
  const asUTC = Date.UTC(+parts.year, +parts.month - 1, +parts.day, hour, +parts.minute, +parts.second);
  return asUTC - instant.getTime();
}

/** Convert a wall-clock time entered FOR `fromZone` into the absolute instant. */
function wallTimeToInstant(local: string, fromZone: string): number | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})$/.exec(local);
  if (!m) return null;
  const guess = Date.UTC(+m[1], +m[2] - 1, +m[3], +m[4], +m[5], 0);
  // Two passes so DST transition boundaries resolve correctly.
  let offset = zoneOffsetMs(fromZone, new Date(guess));
  let instant = guess - offset;
  offset = zoneOffsetMs(fromZone, new Date(instant));
  instant = guess - offset;
  return instant;
}

function fmtOffset(ms: number): string {
  const sign = ms >= 0 ? "+" : "−";
  const abs = Math.abs(ms);
  const h = Math.floor(abs / 3_600_000);
  const min = Math.floor((abs % 3_600_000) / 60_000);
  return `UTC${sign}${String(h).padStart(2, "0")}:${String(min).padStart(2, "0")}`;
}

const T: Record<string, Record<string, string>> = {
  en: {
    fromTimezone: "From timezone",
    toTimezone: "To timezone",
    swapTimezones: "Swap timezones",
    dateTimeLabel: "Date & time (in the \"from\" zone)",
    now: "Now",
    sameTime: "the same time",
    ahead: "ahead of",
    behind: "behind",
    hoursAhead: "{n} hour{s} ahead of",
    hoursBehind: "{n} hour{s} behind",
    isAs: "as",
    privacy: "Handles daylight-saving transitions automatically. Computed entirely in your browser.",
  },
  fr: {
    fromTimezone: "Fuseau source",
    toTimezone: "Fuseau cible",
    swapTimezones: "Inverser les fuseaux",
    dateTimeLabel: "Date et heure (dans le fuseau source)",
    now: "Maintenant",
    sameTime: "la même heure",
    ahead: "en avance sur",
    behind: "en retard sur",
    hoursAhead: "{n} heure{s} en avance sur",
    hoursBehind: "{n} heure{s} en retard sur",
    isAs: "que",
    privacy: "Gère automatiquement les transitions heure d'été/hiver. Calculé entièrement dans votre navigateur.",
  },
  es: {
    fromTimezone: "Zona horaria origen",
    toTimezone: "Zona horaria destino",
    swapTimezones: "Intercambiar zonas",
    dateTimeLabel: "Fecha y hora (en la zona de origen)",
    now: "Ahora",
    sameTime: "la misma hora",
    ahead: "por delante de",
    behind: "por detrás de",
    hoursAhead: "{n} hora{s} por delante de",
    hoursBehind: "{n} hora{s} por detrás de",
    isAs: "que",
    privacy: "Maneja las transiciones de horario de verano automáticamente. Calculado completamente en su navegador.",
  },
  pt: {
    fromTimezone: "Fuso horário de origem",
    toTimezone: "Fuso horário de destino",
    swapTimezones: "Trocar fusos",
    dateTimeLabel: "Data e hora (no fuso de origem)",
    now: "Agora",
    sameTime: "a mesma hora",
    ahead: "à frente de",
    behind: "atrás de",
    hoursAhead: "{n} hora{s} à frente de",
    hoursBehind: "{n} hora{s} atrás de",
    isAs: "do que",
    privacy: "Lida com as transições de horário de verão automaticamente. Calculado inteiramente no seu navegador.",
  },
  de: {
    fromTimezone: "Quell-Zeitzone",
    toTimezone: "Ziel-Zeitzone",
    swapTimezones: "Zeitzonen tauschen",
    dateTimeLabel: "Datum und Uhrzeit (in der Quell-Zone)",
    now: "Jetzt",
    sameTime: "die gleiche Zeit",
    ahead: "vor",
    behind: "hinter",
    hoursAhead: "{n} Stunde{s} vor",
    hoursBehind: "{n} Stunde{s} hinter",
    isAs: "wie",
    privacy: "Berücksichtigt Sommerzeit-Übergänge automatisch. Komplett in Ihrem Browser berechnet.",
  },
  it: {
    fromTimezone: "Fuso orario di partenza",
    toTimezone: "Fuso orario di destinazione",
    swapTimezones: "Scambia fusi orari",
    dateTimeLabel: "Data e ora (nel fuso di partenza)",
    now: "Adesso",
    sameTime: "la stessa ora",
    ahead: "avanti rispetto a",
    behind: "indietro rispetto a",
    hoursAhead: "{n} ora{s} avanti rispetto a",
    hoursBehind: "{n} ora{s} indietro rispetto a",
    isAs: "a",
    privacy: "Gestisce automaticamente le transizioni dell'ora legale. Calcolato interamente nel tuo browser.",
  },
  nl: {
    fromTimezone: "Bron tijdzone",
    toTimezone: "Doel tijdzone",
    swapTimezones: "Tijdzones wisselen",
    dateTimeLabel: "Datum en tijd (in de bronzone)",
    now: "Nu",
    sameTime: "dezelfde tijd",
    ahead: "voor op",
    behind: "achter op",
    hoursAhead: "{n} uur voor op",
    hoursBehind: "{n} uur achter op",
    isAs: "als",
    privacy: "Verwerkt automatisch overgangen naar zomertijd. Volledig berekend in uw browser.",
  },
  ja: {
    fromTimezone: "変換元タイムゾーン",
    toTimezone: "変換先タイムゾーン",
    swapTimezones: "タイムゾーンを入れ替え",
    dateTimeLabel: "日時（変換元ゾーン基準）",
    now: "現在",
    sameTime: "同じ時刻",
    ahead: "進んでいる",
    behind: "遅れている",
    hoursAhead: "{n}時間進んでいる（{src} より）",
    hoursBehind: "{n}時間遅れている（{src} より）",
    isAs: "と",
    privacy: "夏時間の切り替えを自動的に処理します。完全にブラウザ内で計算されます。",
  },
  zh: {
    fromTimezone: "来源时区",
    toTimezone: "目标时区",
    swapTimezones: "交换时区",
    dateTimeLabel: "日期和时间（来源时区）",
    now: "现在",
    sameTime: "相同时间",
    ahead: "超前",
    behind: "落后",
    hoursAhead: "比 {src} 超前 {n} 小时",
    hoursBehind: "比 {src} 落后 {n} 小时",
    isAs: "与",
    privacy: "自动处理夏令时转换。完全在您的浏览器中计算。",
  },
  ko: {
    fromTimezone: "출발 시간대",
    toTimezone: "도착 시간대",
    swapTimezones: "시간대 교환",
    dateTimeLabel: "날짜 및 시간 (출발 시간대 기준)",
    now: "지금",
    sameTime: "같은 시간",
    ahead: "앞서 있다",
    behind: "뒤처져 있다",
    hoursAhead: "{n}시간 앞서 있다",
    hoursBehind: "{n}시간 뒤처져 있다",
    isAs: "와",
    privacy: "일광 절약 시간제 전환을 자동으로 처리합니다. 완전히 브라우저에서 계산됩니다.",
  },
  ar: {
    fromTimezone: "المنطقة الزمنية المصدر",
    toTimezone: "المنطقة الزمنية الهدف",
    swapTimezones: "تبديل المناطق الزمنية",
    dateTimeLabel: "التاريخ والوقت (في المنطقة المصدر)",
    now: "الآن",
    sameTime: "نفس التوقيت",
    ahead: "متقدمة على",
    behind: "متأخرة عن",
    hoursAhead: "متقدمة بـ {n} ساعة على",
    hoursBehind: "متأخرة بـ {n} ساعة عن",
    isAs: "مقارنةً بـ",
    privacy: "يتعامل تلقائيًا مع تحولات التوقيت الصيفي. يُحسب بالكامل في متصفحك.",
  },
  ru: {
    fromTimezone: "Исходный часовой пояс",
    toTimezone: "Целевой часовой пояс",
    swapTimezones: "Поменять пояса",
    dateTimeLabel: "Дата и время (в исходном поясе)",
    now: "Сейчас",
    sameTime: "то же время",
    ahead: "впереди",
    behind: "позади",
    hoursAhead: "на {n} час{s} впереди",
    hoursBehind: "на {n} час{s} позади",
    isAs: "относительно",
    privacy: "Автоматически обрабатывает переходы летнего времени. Вычисляется полностью в вашем браузере.",
  },
  hi: {
    fromTimezone: "स्रोत समयक्षेत्र",
    toTimezone: "लक्ष्य समयक्षेत्र",
    swapTimezones: "समयक्षेत्र बदलें",
    dateTimeLabel: "दिनांक और समय (स्रोत समयक्षेत्र में)",
    now: "अभी",
    sameTime: "समान समय",
    ahead: "आगे",
    behind: "पीछे",
    hoursAhead: "{n} घंटे आगे",
    hoursBehind: "{n} घंटे पीछे",
    isAs: "की तुलना में",
    privacy: "डेलाइट सेविंग परिवर्तन स्वचालित रूप से संभाला जाता है। पूरी तरह आपके ब्राउज़र में गणना की जाती है।",
  },
  tr: {
    fromTimezone: "Kaynak saat dilimi",
    toTimezone: "Hedef saat dilimi",
    swapTimezones: "Saat dilimlerini değiştir",
    dateTimeLabel: "Tarih ve saat (kaynak dilimde)",
    now: "Şimdi",
    sameTime: "aynı saat",
    ahead: "önünde",
    behind: "gerisinde",
    hoursAhead: "{n} saat önünde",
    hoursBehind: "{n} saat gerisinde",
    isAs: "ile aynı",
    privacy: "Yaz saati geçişlerini otomatik olarak işler. Tamamen tarayıcınızda hesaplanır.",
  },
  id: {
    fromTimezone: "Zona waktu asal",
    toTimezone: "Zona waktu tujuan",
    swapTimezones: "Tukar zona waktu",
    dateTimeLabel: "Tanggal & waktu (di zona asal)",
    now: "Sekarang",
    sameTime: "waktu yang sama",
    ahead: "lebih awal dari",
    behind: "lebih lambat dari",
    hoursAhead: "{n} jam lebih awal dari",
    hoursBehind: "{n} jam lebih lambat dari",
    isAs: "dari",
    privacy: "Menangani transisi waktu musim panas secara otomatis. Dihitung seluruhnya di browser Anda.",
  },
  vi: {
    fromTimezone: "Múi giờ nguồn",
    toTimezone: "Múi giờ đích",
    swapTimezones: "Hoán đổi múi giờ",
    dateTimeLabel: "Ngày & giờ (trong múi giờ nguồn)",
    now: "Bây giờ",
    sameTime: "cùng giờ",
    ahead: "sớm hơn",
    behind: "muộn hơn",
    hoursAhead: "sớm hơn {n} giờ so với",
    hoursBehind: "muộn hơn {n} giờ so với",
    isAs: "với",
    privacy: "Tự động xử lý các chuyển đổi giờ tiết kiệm ánh sáng ban ngày. Được tính toán hoàn toàn trong trình duyệt của bạn.",
  },
  sv: {
    fromTimezone: "Källtidszon",
    toTimezone: "Måltidszon",
    swapTimezones: "Byt tidszoner",
    dateTimeLabel: "Datum och tid (i källzonen)",
    now: "Nu",
    sameTime: "samma tid",
    ahead: "före",
    behind: "efter",
    hoursAhead: "{n} timme{s} före",
    hoursBehind: "{n} timme{s} efter",
    isAs: "som",
    privacy: "Hanterar övergångar till sommartid automatiskt. Beräknas helt i din webbläsare.",
  },
  pl: {
    fromTimezone: "Strefa czasowa źródłowa",
    toTimezone: "Strefa czasowa docelowa",
    swapTimezones: "Zamień strefy czasowe",
    dateTimeLabel: "Data i godzina (w strefie źródłowej)",
    now: "Teraz",
    sameTime: "ta sama godzina",
    ahead: "do przodu",
    behind: "do tyłu",
    hoursAhead: "{n} godzin{s} do przodu",
    hoursBehind: "{n} godzin{s} do tyłu",
    isAs: "w stosunku do",
    privacy: "Automatycznie obsługuje przejścia czasu letniego. Obliczane całkowicie w Twojej przeglądarce.",
  },
  uk: {
    fromTimezone: "Вихідний часовий пояс",
    toTimezone: "Цільовий часовий пояс",
    swapTimezones: "Поміняти пояси",
    dateTimeLabel: "Дата і час (у вихідному поясі)",
    now: "Зараз",
    sameTime: "той самий час",
    ahead: "попереду",
    behind: "позаду",
    hoursAhead: "на {n} годин{s} попереду",
    hoursBehind: "на {n} годин{s} позаду",
    isAs: "відносно",
    privacy: "Автоматично обробляє переходи на літній час. Обчислюється повністю у вашому браузері.",
  },
  cs: {
    fromTimezone: "Zdrojové časové pásmo",
    toTimezone: "Cílové časové pásmo",
    swapTimezones: "Přepnout časová pásma",
    dateTimeLabel: "Datum a čas (v zdrojovém pásmu)",
    now: "Nyní",
    sameTime: "stejný čas",
    ahead: "napřed",
    behind: "pozadu",
    hoursAhead: "o {n} hodinu{s} napřed",
    hoursBehind: "o {n} hodinu{s} pozadu",
    isAs: "ve srovnání s",
    privacy: "Automaticky zpracovává přechody letního času. Vypočteno zcela ve vašem prohlížeči.",
  },
};

export function TimezoneConverterClient() {
  const s = T[useLocale()] ?? T.en;

  const zones = useMemo(zoneList, []);
  // browserZone() and nowLocalInput() both depend on the runtime environment.
  // SSR resolves UTC + an arbitrary build-time minute, then the client
  // resolves the user's real zone + the current minute → React #425 mismatch.
  // Seed deterministic defaults and overwrite in useEffect after mount.
  const [fromZone, setFromZone] = useState("UTC");
  const [toZone, setToZone] = useState("UTC");
  const [local, setLocal] = useState("");
  useEffect(() => {
    setFromZone(browserZone());
    setLocal(nowLocalInput());
  }, []);

  const out = useMemo(() => {
    const instant = wallTimeToInstant(local, fromZone);
    if (instant == null) return null;
    const date = new Date(instant);
    const fmt = (tz: string) =>
      new Intl.DateTimeFormat(undefined, {
        timeZone: tz, dateStyle: "full", timeStyle: "short",
      }).format(date);
    const diffMs = zoneOffsetMs(toZone, date) - zoneOffsetMs(fromZone, date);
    const diffH = diffMs / 3_600_000;
    return {
      fromText: fmt(fromZone),
      toText: fmt(toZone),
      fromOffset: fmtOffset(zoneOffsetMs(fromZone, date)),
      toOffset: fmtOffset(zoneOffsetMs(toZone, date)),
      diffH,
    };
  }, [local, fromZone, toZone]);

  const swap = () => { setFromZone(toZone); setToZone(fromZone); };

  // Why a mount gate: Intl.supportedValuesOf("timeZone") returns a different
  // list under Node ICU than V8 ICU in the browser, so each <option> in the
  // zone <select> mismatches on hydration (React #425). Gate the full render
  // and the SSR ships a tiny skeleton; the client renders for real after mount.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) {
    return <div className="space-y-5"><div className="h-9 w-full animate-pulse rounded-md bg-ink-100" /><div className="h-9 w-72 animate-pulse rounded-md bg-ink-100" /></div>;
  }

  function diffLabel(): string {
    if (!out) return "";
    if (out.diffH === 0) return `${s.sameTime}`;
    const abs = Math.abs(out.diffH);
    const plural = abs === 1 ? "" : "s";
    if (out.diffH > 0) {
      return `${abs} hour${plural} ${s.ahead}`;
    }
    return `${abs} hour${plural} ${s.behind}`;
  }

  return (
    <div className="space-y-5">
      <div className="grid items-end gap-3 sm:grid-cols-[1fr_auto_1fr]">
        <label className="flex flex-col text-xs font-medium text-ink-600">
          {s.fromTimezone}
          <select value={fromZone} onChange={(e) => setFromZone(e.target.value)}
            className="mt-1 rounded-md border border-ink-200 bg-white px-3 py-2 text-sm text-ink-900">
            {zones.map((z) => <option key={z} value={z}>{z.replace(/_/g, " ")}</option>)}
          </select>
        </label>
        <button onClick={swap} aria-label={s.swapTimezones}
          className="mb-1 inline-flex h-9 w-9 items-center justify-center rounded-md border border-ink-200 bg-white text-ink-600 hover:border-brand-300 hover:text-ink-900">
          <ArrowRightLeft className="h-4 w-4" />
        </button>
        <label className="flex flex-col text-xs font-medium text-ink-600">
          {s.toTimezone}
          <select value={toZone} onChange={(e) => setToZone(e.target.value)}
            className="mt-1 rounded-md border border-ink-200 bg-white px-3 py-2 text-sm text-ink-900">
            {zones.map((z) => <option key={z} value={z}>{z.replace(/_/g, " ")}</option>)}
          </select>
        </label>
      </div>

      <div className="flex flex-wrap items-end gap-3">
        <label className="flex flex-col text-xs font-medium text-ink-600">
          {s.dateTimeLabel}
          <input type="datetime-local" value={local} onChange={(e) => setLocal(e.target.value)}
            className="mt-1 rounded-md border border-ink-200 bg-white px-3 py-2 text-base text-ink-900 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100" />
        </label>
        <button onClick={() => setLocal(nowLocalInput())}
          className="mb-px rounded-md border border-ink-200 bg-white px-3 py-2 text-xs font-medium text-ink-600 hover:border-brand-300 hover:text-ink-900">
          {s.now}
        </button>
      </div>

      {out && (
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg border border-ink-100 bg-white p-4">
            <div className="text-xs uppercase tracking-wide text-ink-400">{fromZone.replace(/_/g, " ")} · {out.fromOffset}</div>
            <div className="mt-1 text-base font-semibold text-ink-900">{out.fromText}</div>
          </div>
          <div className="rounded-lg border border-brand-200 bg-brand-50/40 p-4">
            <div className="text-xs uppercase tracking-wide text-brand-700">{toZone.replace(/_/g, " ")} · {out.toOffset}</div>
            <div className="mt-1 text-base font-semibold text-ink-900">{out.toText}</div>
          </div>
        </div>
      )}

      {out && (
        <p className="text-sm text-ink-500">
          {toZone.replace(/_/g, " ")} is{" "}
          <strong>{diffLabel()}</strong>{" "}
          {out.diffH === 0 ? s.isAs : ""} {fromZone.replace(/_/g, " ")}.
        </p>
      )}

      <p className="text-xs text-ink-400">{s.privacy}</p>
    </div>
  );
}
