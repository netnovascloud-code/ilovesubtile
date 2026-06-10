"use client";

import { useMemo, useState } from "react";
import { useLocale } from "@/hooks/useLocale";

/** Parse a YYYY-MM-DD value into a LOCAL date at midnight (no timezone drift). */
function parseLocalDate(v: string): Date | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(v);
  if (!m) return null;
  const d = new Date(+m[1], +m[2] - 1, +m[3]);
  // Reject impossible dates like 2026-02-31 (JS would roll them over).
  if (d.getFullYear() !== +m[1] || d.getMonth() !== +m[2] - 1 || d.getDate() !== +m[3]) return null;
  return d;
}

function todayValue(): string {
  const n = new Date();
  return `${n.getFullYear()}-${String(n.getMonth() + 1).padStart(2, "0")}-${String(n.getDate()).padStart(2, "0")}`;
}

const DAY_MS = 86_400_000;

const T: Record<string, Record<string, string>> = {
  en: {
    dateOfBirth: "Date of birth",
    ageAtDate: "Age at date",
    enterDob: "Enter a date of birth to see the exact age.",
    dobAfterRef: "Date of birth is after the reference date.",
    exactAge: "Exact age",
    years: "years",
    months: "months",
    days: "days",
    inMonths: "In months",
    inWeeks: "In weeks",
    inDays: "In days",
    inHours: "In hours",
    bornOn: "Born on a",
    nextBirthday: "Next birthday",
    today: "Today! 🎉",
    inDaysLabel: "in {n} days",
    privacy: "Calculated entirely in your browser — your dates never leave your device.",
  },
  fr: {
    dateOfBirth: "Date de naissance",
    ageAtDate: "Âge à la date",
    enterDob: "Entrez une date de naissance pour voir l'âge exact.",
    dobAfterRef: "La date de naissance est postérieure à la date de référence.",
    exactAge: "Âge exact",
    years: "ans",
    months: "mois",
    days: "jours",
    inMonths: "En mois",
    inWeeks: "En semaines",
    inDays: "En jours",
    inHours: "En heures",
    bornOn: "Né(e) un",
    nextBirthday: "Prochain anniversaire",
    today: "Aujourd'hui ! 🎉",
    inDaysLabel: "dans {n} jours",
    privacy: "Calculé entièrement dans votre navigateur — vos dates ne quittent jamais votre appareil.",
  },
  es: {
    dateOfBirth: "Fecha de nacimiento",
    ageAtDate: "Edad en la fecha",
    enterDob: "Ingrese una fecha de nacimiento para ver la edad exacta.",
    dobAfterRef: "La fecha de nacimiento es posterior a la fecha de referencia.",
    exactAge: "Edad exacta",
    years: "años",
    months: "meses",
    days: "días",
    inMonths: "En meses",
    inWeeks: "En semanas",
    inDays: "En días",
    inHours: "En horas",
    bornOn: "Nacido(a) un",
    nextBirthday: "Próximo cumpleaños",
    today: "¡Hoy! 🎉",
    inDaysLabel: "en {n} días",
    privacy: "Calculado íntegramente en su navegador — sus fechas nunca salen de su dispositivo.",
  },
  pt: {
    dateOfBirth: "Data de nascimento",
    ageAtDate: "Idade na data",
    enterDob: "Insira uma data de nascimento para ver a idade exata.",
    dobAfterRef: "A data de nascimento é posterior à data de referência.",
    exactAge: "Idade exata",
    years: "anos",
    months: "meses",
    days: "dias",
    inMonths: "Em meses",
    inWeeks: "Em semanas",
    inDays: "Em dias",
    inHours: "Em horas",
    bornOn: "Nascido(a) numa",
    nextBirthday: "Próximo aniversário",
    today: "Hoje! 🎉",
    inDaysLabel: "em {n} dias",
    privacy: "Calculado inteiramente no seu navegador — as suas datas nunca saem do seu dispositivo.",
  },
  de: {
    dateOfBirth: "Geburtsdatum",
    ageAtDate: "Alter am Datum",
    enterDob: "Geben Sie ein Geburtsdatum ein, um das genaue Alter zu sehen.",
    dobAfterRef: "Das Geburtsdatum liegt nach dem Referenzdatum.",
    exactAge: "Genaues Alter",
    years: "Jahre",
    months: "Monate",
    days: "Tage",
    inMonths: "In Monaten",
    inWeeks: "In Wochen",
    inDays: "In Tagen",
    inHours: "In Stunden",
    bornOn: "Geboren an einem",
    nextBirthday: "Nächster Geburtstag",
    today: "Heute! 🎉",
    inDaysLabel: "in {n} Tagen",
    privacy: "Komplett in Ihrem Browser berechnet — Ihre Daten verlassen nie Ihr Gerät.",
  },
  it: {
    dateOfBirth: "Data di nascita",
    ageAtDate: "Età alla data",
    enterDob: "Inserisci una data di nascita per vedere l'età esatta.",
    dobAfterRef: "La data di nascita è successiva alla data di riferimento.",
    exactAge: "Età esatta",
    years: "anni",
    months: "mesi",
    days: "giorni",
    inMonths: "In mesi",
    inWeeks: "In settimane",
    inDays: "In giorni",
    inHours: "In ore",
    bornOn: "Nato(a) un",
    nextBirthday: "Prossimo compleanno",
    today: "Oggi! 🎉",
    inDaysLabel: "tra {n} giorni",
    privacy: "Calcolato interamente nel tuo browser — le tue date non lasciano mai il tuo dispositivo.",
  },
  nl: {
    dateOfBirth: "Geboortedatum",
    ageAtDate: "Leeftijd op datum",
    enterDob: "Voer een geboortedatum in om de exacte leeftijd te zien.",
    dobAfterRef: "De geboortedatum is na de referentiedatum.",
    exactAge: "Exacte leeftijd",
    years: "jaar",
    months: "maanden",
    days: "dagen",
    inMonths: "In maanden",
    inWeeks: "In weken",
    inDays: "In dagen",
    inHours: "In uren",
    bornOn: "Geboren op een",
    nextBirthday: "Volgende verjaardag",
    today: "Vandaag! 🎉",
    inDaysLabel: "over {n} dagen",
    privacy: "Volledig berekend in uw browser — uw datums verlaten uw apparaat nooit.",
  },
  ja: {
    dateOfBirth: "生年月日",
    ageAtDate: "指定日時点の年齢",
    enterDob: "正確な年齢を表示するには生年月日を入力してください。",
    dobAfterRef: "生年月日が基準日より後です。",
    exactAge: "正確な年齢",
    years: "歳",
    months: "ヶ月",
    days: "日",
    inMonths: "月数",
    inWeeks: "週数",
    inDays: "日数",
    inHours: "時間数",
    bornOn: "誕生曜日",
    nextBirthday: "次の誕生日",
    today: "今日！🎉",
    inDaysLabel: "{n} 日後",
    privacy: "完全にブラウザ内で計算 — 日付はデバイス外に出ません。",
  },
  zh: {
    dateOfBirth: "出生日期",
    ageAtDate: "该日期的年龄",
    enterDob: "输入出生日期以查看确切年龄。",
    dobAfterRef: "出生日期晚于参考日期。",
    exactAge: "确切年龄",
    years: "岁",
    months: "月",
    days: "天",
    inMonths: "以月计",
    inWeeks: "以周计",
    inDays: "以天计",
    inHours: "以小时计",
    bornOn: "出生于",
    nextBirthday: "下次生日",
    today: "今天！🎉",
    inDaysLabel: "{n} 天后",
    privacy: "完全在您的浏览器中计算 — 您的日期不会离开您的设备。",
  },
  ko: {
    dateOfBirth: "생년월일",
    ageAtDate: "해당 날짜의 나이",
    enterDob: "정확한 나이를 보려면 생년월일을 입력하세요.",
    dobAfterRef: "생년월일이 기준 날짜 이후입니다.",
    exactAge: "정확한 나이",
    years: "세",
    months: "개월",
    days: "일",
    inMonths: "개월 기준",
    inWeeks: "주 기준",
    inDays: "일 기준",
    inHours: "시간 기준",
    bornOn: "출생 요일",
    nextBirthday: "다음 생일",
    today: "오늘! 🎉",
    inDaysLabel: "{n}일 후",
    privacy: "완전히 브라우저에서 계산 — 날짜가 기기를 떠나지 않습니다.",
  },
  ar: {
    dateOfBirth: "تاريخ الميلاد",
    ageAtDate: "العمر في التاريخ",
    enterDob: "أدخل تاريخ الميلاد لرؤية العمر الدقيق.",
    dobAfterRef: "تاريخ الميلاد بعد التاريخ المرجعي.",
    exactAge: "العمر الدقيق",
    years: "سنة",
    months: "شهر",
    days: "يوم",
    inMonths: "بالأشهر",
    inWeeks: "بالأسابيع",
    inDays: "بالأيام",
    inHours: "بالساعات",
    bornOn: "وُلد في يوم",
    nextBirthday: "عيد الميلاد القادم",
    today: "اليوم! 🎉",
    inDaysLabel: "خلال {n} أيام",
    privacy: "يُحسب بالكامل في متصفحك — تواريخك لا تغادر جهازك أبدًا.",
  },
  ru: {
    dateOfBirth: "Дата рождения",
    ageAtDate: "Возраст на дату",
    enterDob: "Введите дату рождения, чтобы увидеть точный возраст.",
    dobAfterRef: "Дата рождения позже референсной даты.",
    exactAge: "Точный возраст",
    years: "лет",
    months: "мес.",
    days: "дн.",
    inMonths: "В месяцах",
    inWeeks: "В неделях",
    inDays: "В днях",
    inHours: "В часах",
    bornOn: "Родился(ась) в",
    nextBirthday: "Следующий день рождения",
    today: "Сегодня! 🎉",
    inDaysLabel: "через {n} дней",
    privacy: "Вычисляется полностью в вашем браузере — даты никогда не покидают ваше устройство.",
  },
  hi: {
    dateOfBirth: "जन्म तिथि",
    ageAtDate: "उस तारीख पर आयु",
    enterDob: "सटीक आयु देखने के लिए जन्म तिथि दर्ज करें।",
    dobAfterRef: "जन्म तिथि संदर्भ तिथि के बाद है।",
    exactAge: "सटीक आयु",
    years: "वर्ष",
    months: "माह",
    days: "दिन",
    inMonths: "महीनों में",
    inWeeks: "हफ्तों में",
    inDays: "दिनों में",
    inHours: "घंटों में",
    bornOn: "जन्म हुआ",
    nextBirthday: "अगला जन्मदिन",
    today: "आज! 🎉",
    inDaysLabel: "{n} दिनों में",
    privacy: "पूरी तरह आपके ब्राउज़र में गणना — आपकी तारीखें कभी भी डिवाइस नहीं छोड़तीं।",
  },
  tr: {
    dateOfBirth: "Doğum tarihi",
    ageAtDate: "Bu tarihteki yaş",
    enterDob: "Tam yaşı görmek için doğum tarihi girin.",
    dobAfterRef: "Doğum tarihi referans tarihten sonra.",
    exactAge: "Tam yaş",
    years: "yıl",
    months: "ay",
    days: "gün",
    inMonths: "Ay cinsinden",
    inWeeks: "Hafta cinsinden",
    inDays: "Gün cinsinden",
    inHours: "Saat cinsinden",
    bornOn: "Doğum günü",
    nextBirthday: "Sonraki doğum günü",
    today: "Bugün! 🎉",
    inDaysLabel: "{n} gün sonra",
    privacy: "Tamamen tarayıcınızda hesaplanır — tarihleriniz cihazınızdan hiç çıkmaz.",
  },
  id: {
    dateOfBirth: "Tanggal lahir",
    ageAtDate: "Usia pada tanggal",
    enterDob: "Masukkan tanggal lahir untuk melihat usia tepat.",
    dobAfterRef: "Tanggal lahir setelah tanggal referensi.",
    exactAge: "Usia tepat",
    years: "tahun",
    months: "bulan",
    days: "hari",
    inMonths: "Dalam bulan",
    inWeeks: "Dalam minggu",
    inDays: "Dalam hari",
    inHours: "Dalam jam",
    bornOn: "Lahir pada hari",
    nextBirthday: "Ulang tahun berikutnya",
    today: "Hari ini! 🎉",
    inDaysLabel: "dalam {n} hari",
    privacy: "Dihitung seluruhnya di browser Anda — tanggal Anda tidak pernah meninggalkan perangkat Anda.",
  },
  vi: {
    dateOfBirth: "Ngày sinh",
    ageAtDate: "Tuổi vào ngày",
    enterDob: "Nhập ngày sinh để xem tuổi chính xác.",
    dobAfterRef: "Ngày sinh sau ngày tham chiếu.",
    exactAge: "Tuổi chính xác",
    years: "năm",
    months: "tháng",
    days: "ngày",
    inMonths: "Tính bằng tháng",
    inWeeks: "Tính bằng tuần",
    inDays: "Tính bằng ngày",
    inHours: "Tính bằng giờ",
    bornOn: "Sinh vào ngày",
    nextBirthday: "Sinh nhật tiếp theo",
    today: "Hôm nay! 🎉",
    inDaysLabel: "trong {n} ngày",
    privacy: "Được tính toán hoàn toàn trong trình duyệt của bạn — ngày tháng của bạn không bao giờ rời khỏi thiết bị.",
  },
  sv: {
    dateOfBirth: "Födelsedatum",
    ageAtDate: "Ålder på datumet",
    enterDob: "Ange ett födelsedatum för att se den exakta åldern.",
    dobAfterRef: "Födelsedatumet är efter referensdatumet.",
    exactAge: "Exakt ålder",
    years: "år",
    months: "månader",
    days: "dagar",
    inMonths: "I månader",
    inWeeks: "I veckor",
    inDays: "I dagar",
    inHours: "I timmar",
    bornOn: "Född på en",
    nextBirthday: "Nästa födelsedag",
    today: "Idag! 🎉",
    inDaysLabel: "om {n} dagar",
    privacy: "Beräknas helt i din webbläsare — dina datum lämnar aldrig din enhet.",
  },
  pl: {
    dateOfBirth: "Data urodzenia",
    ageAtDate: "Wiek w dacie",
    enterDob: "Wprowadź datę urodzenia, aby zobaczyć dokładny wiek.",
    dobAfterRef: "Data urodzenia jest po dacie referencyjnej.",
    exactAge: "Dokładny wiek",
    years: "lat",
    months: "mies.",
    days: "dni",
    inMonths: "W miesiącach",
    inWeeks: "W tygodniach",
    inDays: "W dniach",
    inHours: "W godzinach",
    bornOn: "Urodzony(a) w",
    nextBirthday: "Następne urodziny",
    today: "Dzisiaj! 🎉",
    inDaysLabel: "za {n} dni",
    privacy: "Obliczone w całości w Twojej przeglądarce — Twoje daty nigdy nie opuszczają Twojego urządzenia.",
  },
  uk: {
    dateOfBirth: "Дата народження",
    ageAtDate: "Вік на дату",
    enterDob: "Введіть дату народження, щоб побачити точний вік.",
    dobAfterRef: "Дата народження пізніше за референсну дату.",
    exactAge: "Точний вік",
    years: "років",
    months: "міс.",
    days: "днів",
    inMonths: "У місяцях",
    inWeeks: "У тижнях",
    inDays: "У днях",
    inHours: "У годинах",
    bornOn: "Народився(лась) у",
    nextBirthday: "Наступний день народження",
    today: "Сьогодні! 🎉",
    inDaysLabel: "через {n} днів",
    privacy: "Обчислено повністю у вашому браузері — ваші дати ніколи не покидають пристрій.",
  },
  cs: {
    dateOfBirth: "Datum narození",
    ageAtDate: "Věk k datu",
    enterDob: "Zadejte datum narození pro zobrazení přesného věku.",
    dobAfterRef: "Datum narození je po referenčním datu.",
    exactAge: "Přesný věk",
    years: "let",
    months: "měs.",
    days: "dní",
    inMonths: "V měsících",
    inWeeks: "V týdnech",
    inDays: "Ve dnech",
    inHours: "V hodinách",
    bornOn: "Narozen(a) v",
    nextBirthday: "Příští narozeniny",
    today: "Dnes! 🎉",
    inDaysLabel: "za {n} dní",
    privacy: "Vypočteno zcela ve vašem prohlížeči — vaše data nikdy neopustí vaše zařízení.",
  },
};

export function AgeCalculatorClient() {
  const s = T[useLocale()] ?? T.en;

  const [dob, setDob] = useState("");
  const [asOf, setAsOf] = useState(todayValue());

  const result = useMemo(() => {
    const birth = parseLocalDate(dob);
    const ref = parseLocalDate(asOf);
    if (!birth || !ref) return null;
    if (birth.getTime() > ref.getTime()) return { error: s.dobAfterRef } as const;

    // Exact calendar age: years / months / days, borrowing correctly.
    let years = ref.getFullYear() - birth.getFullYear();
    let months = ref.getMonth() - birth.getMonth();
    let days = ref.getDate() - birth.getDate();
    if (days < 0) {
      months -= 1;
      // Days in the month preceding the reference month.
      const prevMonthLastDay = new Date(ref.getFullYear(), ref.getMonth(), 0).getDate();
      days += prevMonthLastDay;
    }
    if (months < 0) {
      months += 12;
      years -= 1;
    }

    const totalDays = Math.floor((ref.getTime() - birth.getTime()) / DAY_MS);
    const totalMonths = years * 12 + months;

    // Next birthday on or after the reference date.
    let nextBday = new Date(ref.getFullYear(), birth.getMonth(), birth.getDate());
    if (nextBday.getTime() < ref.getTime()) nextBday = new Date(ref.getFullYear() + 1, birth.getMonth(), birth.getDate());
    // ceil() so a date late in the day still reports "in N days" rather than
    // rounding down to N-1 when the next birthday is N*24h+23h away.
    const daysToNext = Math.ceil((nextBday.getTime() - ref.getTime()) / DAY_MS);

    const weekday = birth.toLocaleDateString(undefined, { weekday: "long" });

    return {
      error: null,
      years, months, days,
      totalMonths,
      totalWeeks: Math.floor(totalDays / 7),
      totalDays,
      totalHours: totalDays * 24,
      daysToNext,
      weekday,
    } as const;
  }, [dob, asOf, s.dobAfterRef]);

  const stat = (label: string, value: string) => (
    <div className="rounded-lg border border-ink-100 bg-white p-4">
      <div className="text-xs uppercase tracking-wide text-ink-400">{label}</div>
      <div className="mt-1 text-xl font-semibold text-ink-900">{value}</div>
    </div>
  );

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col text-xs font-medium text-ink-600">
          {s.dateOfBirth}
          <input type="date" value={dob} max={asOf} onChange={(e) => setDob(e.target.value)}
            className="mt-1 rounded-md border border-ink-200 bg-white px-3 py-2 text-base text-ink-900 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100" />
        </label>
        <label className="flex flex-col text-xs font-medium text-ink-600">
          {s.ageAtDate}
          <input type="date" value={asOf} onChange={(e) => setAsOf(e.target.value)}
            className="mt-1 rounded-md border border-ink-200 bg-white px-3 py-2 text-base text-ink-900 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100" />
        </label>
      </div>

      {!dob && <p className="text-sm text-ink-400">{s.enterDob}</p>}

      {result?.error && (
        <p className="rounded border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">{result.error}</p>
      )}

      {result && !result.error && (
        <>
          <div className="rounded-xl border border-brand-200 bg-brand-50/40 p-5 text-center">
            <div className="text-xs uppercase tracking-wide text-brand-700">{s.exactAge}</div>
            <div className="mt-1 text-3xl font-bold text-ink-900">
              {result.years} <span className="text-lg font-medium text-ink-500">{s.years}</span>{" "}
              {result.months} <span className="text-lg font-medium text-ink-500">{s.months}</span>{" "}
              {result.days} <span className="text-lg font-medium text-ink-500">{s.days}</span>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {stat(s.inMonths, (result.totalMonths ?? 0).toLocaleString())}
            {stat(s.inWeeks, (result.totalWeeks ?? 0).toLocaleString())}
            {stat(s.inDays, (result.totalDays ?? 0).toLocaleString())}
            {stat(s.inHours, (result.totalHours ?? 0).toLocaleString())}
            {stat(s.bornOn, result.weekday ?? "")}
            {stat(s.nextBirthday, (result.daysToNext ?? 0) === 0 ? s.today : s.inDaysLabel.replace("{n}", String(result.daysToNext ?? 0)))}
          </div>
        </>
      )}

      <p className="text-xs text-ink-400">{s.privacy}</p>
    </div>
  );
}
