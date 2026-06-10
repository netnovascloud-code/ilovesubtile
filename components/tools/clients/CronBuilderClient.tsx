"use client";

import { useMemo, useState } from "react";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/hooks/useLocale";

type Field = "minute" | "hour" | "dom" | "month" | "dow";

const T: Record<string, Record<string, string>> = {
  en: {
    expression: "Expression",
    copied: "Copied",
    copy: "Copy",
    fieldMinute: "Minute",
    fieldHour: "Hour",
    fieldDom: "Day of month",
    fieldMonth: "Month",
    fieldDow: "Day of week",
    next5: "Next 5 fire times",
    noMatch: "No matching time in the next 14 days.",
    presets: "Presets",
    privacy: "100% in your browser — nothing leaves your device.",
    p_everyMinute: "Every minute",
    p_every5min: "Every 5 minutes",
    p_every15min: "Every 15 minutes",
    p_everyHour: "Every hour, on the hour",
    p_midnightDaily: "Every day at midnight",
    p_9amDaily: "Every day at 9am",
    p_mon9am: "Every Monday at 9am",
    p_weekdays9am: "Weekdays at 9am",
    p_firstMonth: "First of every month, midnight",
    p_onceYear: "Once a year (1 Jan, midnight)",
  },
  fr: {
    expression: "Expression",
    copied: "Copié",
    copy: "Copier",
    fieldMinute: "Minute",
    fieldHour: "Heure",
    fieldDom: "Jour du mois",
    fieldMonth: "Mois",
    fieldDow: "Jour de la semaine",
    next5: "5 prochaines exécutions",
    noMatch: "Aucune correspondance dans les 14 prochains jours.",
    presets: "Préréglages",
    privacy: "100 % dans votre navigateur — rien ne quitte votre appareil.",
    p_everyMinute: "Chaque minute",
    p_every5min: "Toutes les 5 minutes",
    p_every15min: "Toutes les 15 minutes",
    p_everyHour: "Chaque heure, à l'heure pile",
    p_midnightDaily: "Chaque jour à minuit",
    p_9amDaily: "Chaque jour à 9 h",
    p_mon9am: "Chaque lundi à 9 h",
    p_weekdays9am: "Jours ouvrés à 9 h",
    p_firstMonth: "1er de chaque mois, minuit",
    p_onceYear: "Une fois par an (1er janv., minuit)",
  },
  es: {
    expression: "Expresión",
    copied: "Copiado",
    copy: "Copiar",
    fieldMinute: "Minuto",
    fieldHour: "Hora",
    fieldDom: "Día del mes",
    fieldMonth: "Mes",
    fieldDow: "Día de la semana",
    next5: "Próximas 5 ejecuciones",
    noMatch: "Sin coincidencia en los próximos 14 días.",
    presets: "Ajustes predef.",
    privacy: "100 % en su navegador — nada sale de su dispositivo.",
    p_everyMinute: "Cada minuto",
    p_every5min: "Cada 5 minutos",
    p_every15min: "Cada 15 minutos",
    p_everyHour: "Cada hora, en punto",
    p_midnightDaily: "Cada día a medianoche",
    p_9amDaily: "Cada día a las 9 am",
    p_mon9am: "Cada lunes a las 9 am",
    p_weekdays9am: "Días laborables a las 9 am",
    p_firstMonth: "El 1 de cada mes, a medianoche",
    p_onceYear: "Una vez al año (1 ene, medianoche)",
  },
  pt: {
    expression: "Expressão",
    copied: "Copiado",
    copy: "Copiar",
    fieldMinute: "Minuto",
    fieldHour: "Hora",
    fieldDom: "Dia do mês",
    fieldMonth: "Mês",
    fieldDow: "Dia da semana",
    next5: "Próximas 5 execuções",
    noMatch: "Sem correspondência nos próximos 14 dias.",
    presets: "Predefinições",
    privacy: "100 % no seu navegador — nada sai do seu dispositivo.",
    p_everyMinute: "A cada minuto",
    p_every5min: "A cada 5 minutos",
    p_every15min: "A cada 15 minutos",
    p_everyHour: "A cada hora, na hora exata",
    p_midnightDaily: "Todos os dias à meia-noite",
    p_9amDaily: "Todos os dias às 9h",
    p_mon9am: "Todas as segundas às 9h",
    p_weekdays9am: "Dias úteis às 9h",
    p_firstMonth: "1.º de cada mês, meia-noite",
    p_onceYear: "Uma vez por ano (1 jan, meia-noite)",
  },
  de: {
    expression: "Ausdruck",
    copied: "Kopiert",
    copy: "Kopieren",
    fieldMinute: "Minute",
    fieldHour: "Stunde",
    fieldDom: "Tag des Monats",
    fieldMonth: "Monat",
    fieldDow: "Wochentag",
    next5: "Nächste 5 Ausführungen",
    noMatch: "Kein Treffer in den nächsten 14 Tagen.",
    presets: "Voreinstellungen",
    privacy: "100 % in Ihrem Browser — nichts verlässt Ihr Gerät.",
    p_everyMinute: "Jede Minute",
    p_every5min: "Alle 5 Minuten",
    p_every15min: "Alle 15 Minuten",
    p_everyHour: "Jede Stunde, zur vollen Stunde",
    p_midnightDaily: "Jeden Tag um Mitternacht",
    p_9amDaily: "Jeden Tag um 9 Uhr",
    p_mon9am: "Jeden Montag um 9 Uhr",
    p_weekdays9am: "Wochentags um 9 Uhr",
    p_firstMonth: "Ersten jeden Monats, Mitternacht",
    p_onceYear: "Einmal jährlich (1. Jan, Mitternacht)",
  },
  it: {
    expression: "Espressione",
    copied: "Copiato",
    copy: "Copia",
    fieldMinute: "Minuto",
    fieldHour: "Ora",
    fieldDom: "Giorno del mese",
    fieldMonth: "Mese",
    fieldDow: "Giorno della settimana",
    next5: "Prossime 5 esecuzioni",
    noMatch: "Nessuna corrispondenza nei prossimi 14 giorni.",
    presets: "Preset",
    privacy: "100 % nel tuo browser — nulla lascia il tuo dispositivo.",
    p_everyMinute: "Ogni minuto",
    p_every5min: "Ogni 5 minuti",
    p_every15min: "Ogni 15 minuti",
    p_everyHour: "Ogni ora, in punto",
    p_midnightDaily: "Ogni giorno a mezzanotte",
    p_9amDaily: "Ogni giorno alle 9:00",
    p_mon9am: "Ogni lunedì alle 9:00",
    p_weekdays9am: "Giorni feriali alle 9:00",
    p_firstMonth: "Il 1° di ogni mese, mezzanotte",
    p_onceYear: "Una volta l'anno (1 gen, mezzanotte)",
  },
  nl: {
    expression: "Expressie",
    copied: "Gekopieerd",
    copy: "Kopiëren",
    fieldMinute: "Minuut",
    fieldHour: "Uur",
    fieldDom: "Dag van de maand",
    fieldMonth: "Maand",
    fieldDow: "Dag van de week",
    next5: "Volgende 5 uitvoertijden",
    noMatch: "Geen overeenkomst in de komende 14 dagen.",
    presets: "Voorinstellingen",
    privacy: "100 % in uw browser — niets verlaat uw apparaat.",
    p_everyMinute: "Elke minuut",
    p_every5min: "Elke 5 minuten",
    p_every15min: "Elke 15 minuten",
    p_everyHour: "Elk uur, op het uur",
    p_midnightDaily: "Elke dag om middernacht",
    p_9amDaily: "Elke dag om 9:00",
    p_mon9am: "Elke maandag om 9:00",
    p_weekdays9am: "Werkdagen om 9:00",
    p_firstMonth: "Eerste van elke maand, middernacht",
    p_onceYear: "Eens per jaar (1 jan, middernacht)",
  },
  ja: {
    expression: "式",
    copied: "コピー済み",
    copy: "コピー",
    fieldMinute: "分",
    fieldHour: "時",
    fieldDom: "日（月内）",
    fieldMonth: "月",
    fieldDow: "曜日",
    next5: "次の5回の実行時刻",
    noMatch: "今後14日間に一致する時刻はありません。",
    presets: "プリセット",
    privacy: "100 % ブラウザ内で処理 — データはデバイス外に出ません。",
    p_everyMinute: "毎分",
    p_every5min: "5分ごと",
    p_every15min: "15分ごと",
    p_everyHour: "毎時0分",
    p_midnightDaily: "毎日深夜0時",
    p_9amDaily: "毎日午前9時",
    p_mon9am: "毎週月曜午前9時",
    p_weekdays9am: "平日午前9時",
    p_firstMonth: "毎月1日深夜0時",
    p_onceYear: "年1回（1月1日深夜0時）",
  },
  zh: {
    expression: "表达式",
    copied: "已复制",
    copy: "复制",
    fieldMinute: "分钟",
    fieldHour: "小时",
    fieldDom: "月中日期",
    fieldMonth: "月份",
    fieldDow: "星期",
    next5: "未来5次触发时间",
    noMatch: "未来14天内没有匹配时间。",
    presets: "预设",
    privacy: "100 % 在您的浏览器中处理 — 数据不会离开您的设备。",
    p_everyMinute: "每分钟",
    p_every5min: "每5分钟",
    p_every15min: "每15分钟",
    p_everyHour: "每小时整点",
    p_midnightDaily: "每天午夜",
    p_9amDaily: "每天上午9点",
    p_mon9am: "每周一上午9点",
    p_weekdays9am: "工作日上午9点",
    p_firstMonth: "每月1日午夜",
    p_onceYear: "每年一次（1月1日午夜）",
  },
  ko: {
    expression: "표현식",
    copied: "복사됨",
    copy: "복사",
    fieldMinute: "분",
    fieldHour: "시",
    fieldDom: "월 중 날짜",
    fieldMonth: "월",
    fieldDow: "요일",
    next5: "다음 5번 실행 시간",
    noMatch: "향후 14일 내 일치하는 시간 없음.",
    presets: "프리셋",
    privacy: "100 % 브라우저에서 실행 — 데이터가 기기를 떠나지 않습니다.",
    p_everyMinute: "매분",
    p_every5min: "5분마다",
    p_every15min: "15분마다",
    p_everyHour: "매시 정각",
    p_midnightDaily: "매일 자정",
    p_9amDaily: "매일 오전 9시",
    p_mon9am: "매주 월요일 오전 9시",
    p_weekdays9am: "평일 오전 9시",
    p_firstMonth: "매월 1일 자정",
    p_onceYear: "연 1회 (1월 1일 자정)",
  },
  ar: {
    expression: "التعبير",
    copied: "تم النسخ",
    copy: "نسخ",
    fieldMinute: "الدقيقة",
    fieldHour: "الساعة",
    fieldDom: "يوم الشهر",
    fieldMonth: "الشهر",
    fieldDow: "يوم الأسبوع",
    next5: "أوقات التنفيذ الخمسة القادمة",
    noMatch: "لا يوجد وقت مطابق في الـ 14 يومًا القادمة.",
    presets: "إعدادات مسبقة",
    privacy: "معالجة 100 % في متصفحك — لا تغادر بياناتك جهازك.",
    p_everyMinute: "كل دقيقة",
    p_every5min: "كل 5 دقائق",
    p_every15min: "كل 15 دقيقة",
    p_everyHour: "كل ساعة في بدايتها",
    p_midnightDaily: "كل يوم في منتصف الليل",
    p_9amDaily: "كل يوم في الساعة 9 صباحًا",
    p_mon9am: "كل اثنين في الساعة 9 صباحًا",
    p_weekdays9am: "أيام العمل في الساعة 9 صباحًا",
    p_firstMonth: "أول كل شهر في منتصف الليل",
    p_onceYear: "مرة في السنة (1 يناير، منتصف الليل)",
  },
  ru: {
    expression: "Выражение",
    copied: "Скопировано",
    copy: "Копировать",
    fieldMinute: "Минута",
    fieldHour: "Час",
    fieldDom: "День месяца",
    fieldMonth: "Месяц",
    fieldDow: "День недели",
    next5: "Следующие 5 запусков",
    noMatch: "Нет совпадений в ближайшие 14 дней.",
    presets: "Шаблоны",
    privacy: "100 % в вашем браузере — ничего не покидает ваше устройство.",
    p_everyMinute: "Каждую минуту",
    p_every5min: "Каждые 5 минут",
    p_every15min: "Каждые 15 минут",
    p_everyHour: "Каждый час, в начале часа",
    p_midnightDaily: "Каждый день в полночь",
    p_9amDaily: "Каждый день в 9:00",
    p_mon9am: "Каждый понедельник в 9:00",
    p_weekdays9am: "По будням в 9:00",
    p_firstMonth: "Первый день каждого месяца, полночь",
    p_onceYear: "Раз в год (1 янв, полночь)",
  },
  hi: {
    expression: "अभिव्यक्ति",
    copied: "कॉपी किया",
    copy: "कॉपी करें",
    fieldMinute: "मिनट",
    fieldHour: "घंटा",
    fieldDom: "महीने का दिन",
    fieldMonth: "महीना",
    fieldDow: "सप्ताह का दिन",
    next5: "अगली 5 निष्पादन समय",
    noMatch: "अगले 14 दिनों में कोई मिलान नहीं।",
    presets: "प्रीसेट",
    privacy: "100 % आपके ब्राउज़र में — कोई डेटा आपके डिवाइस से नहीं जाता।",
    p_everyMinute: "हर मिनट",
    p_every5min: "हर 5 मिनट",
    p_every15min: "हर 15 मिनट",
    p_everyHour: "हर घंटे, घंटे की शुरुआत में",
    p_midnightDaily: "हर दिन आधी रात",
    p_9amDaily: "हर दिन सुबह 9 बजे",
    p_mon9am: "हर सोमवार सुबह 9 बजे",
    p_weekdays9am: "सप्ताह के दिनों में सुबह 9 बजे",
    p_firstMonth: "हर महीने का पहला दिन, आधी रात",
    p_onceYear: "साल में एक बार (1 जनवरी, आधी रात)",
  },
  tr: {
    expression: "İfade",
    copied: "Kopyalandı",
    copy: "Kopyala",
    fieldMinute: "Dakika",
    fieldHour: "Saat",
    fieldDom: "Ayın günü",
    fieldMonth: "Ay",
    fieldDow: "Haftanın günü",
    next5: "Sonraki 5 çalışma zamanı",
    noMatch: "Önümüzdeki 14 gün içinde eşleşme yok.",
    presets: "Ön ayarlar",
    privacy: "100 % tarayıcınızda — hiçbir şey cihazınızdan çıkmaz.",
    p_everyMinute: "Her dakika",
    p_every5min: "Her 5 dakikada bir",
    p_every15min: "Her 15 dakikada bir",
    p_everyHour: "Her saat başı",
    p_midnightDaily: "Her gün gece yarısı",
    p_9amDaily: "Her gün saat 09:00'da",
    p_mon9am: "Her Pazartesi saat 09:00'da",
    p_weekdays9am: "Hafta içi saat 09:00'da",
    p_firstMonth: "Her ayın 1'i, gece yarısı",
    p_onceYear: "Yılda bir kez (1 Oca, gece yarısı)",
  },
  id: {
    expression: "Ekspresi",
    copied: "Disalin",
    copy: "Salin",
    fieldMinute: "Menit",
    fieldHour: "Jam",
    fieldDom: "Hari dalam bulan",
    fieldMonth: "Bulan",
    fieldDow: "Hari dalam minggu",
    next5: "5 waktu eksekusi berikutnya",
    noMatch: "Tidak ada waktu yang cocok dalam 14 hari ke depan.",
    presets: "Prasetel",
    privacy: "100 % di browser Anda — tidak ada yang meninggalkan perangkat Anda.",
    p_everyMinute: "Setiap menit",
    p_every5min: "Setiap 5 menit",
    p_every15min: "Setiap 15 menit",
    p_everyHour: "Setiap jam, tepat di awal jam",
    p_midnightDaily: "Setiap hari tengah malam",
    p_9amDaily: "Setiap hari pukul 9 pagi",
    p_mon9am: "Setiap Senin pukul 9 pagi",
    p_weekdays9am: "Hari kerja pukul 9 pagi",
    p_firstMonth: "Tanggal 1 setiap bulan, tengah malam",
    p_onceYear: "Setahun sekali (1 Jan, tengah malam)",
  },
  vi: {
    expression: "Biểu thức",
    copied: "Đã sao chép",
    copy: "Sao chép",
    fieldMinute: "Phút",
    fieldHour: "Giờ",
    fieldDom: "Ngày trong tháng",
    fieldMonth: "Tháng",
    fieldDow: "Ngày trong tuần",
    next5: "5 lần chạy tiếp theo",
    noMatch: "Không có thời gian khớp trong 14 ngày tới.",
    presets: "Cài đặt sẵn",
    privacy: "100 % trong trình duyệt của bạn — không có gì rời khỏi thiết bị của bạn.",
    p_everyMinute: "Mỗi phút",
    p_every5min: "Mỗi 5 phút",
    p_every15min: "Mỗi 15 phút",
    p_everyHour: "Mỗi giờ, đúng giờ",
    p_midnightDaily: "Mỗi ngày lúc nửa đêm",
    p_9amDaily: "Mỗi ngày lúc 9 giờ sáng",
    p_mon9am: "Mỗi thứ Hai lúc 9 giờ sáng",
    p_weekdays9am: "Các ngày trong tuần lúc 9 giờ sáng",
    p_firstMonth: "Ngày 1 mỗi tháng, nửa đêm",
    p_onceYear: "Một lần mỗi năm (1 tháng 1, nửa đêm)",
  },
  sv: {
    expression: "Uttryck",
    copied: "Kopierat",
    copy: "Kopiera",
    fieldMinute: "Minut",
    fieldHour: "Timme",
    fieldDom: "Dag i månaden",
    fieldMonth: "Månad",
    fieldDow: "Veckodag",
    next5: "Nästa 5 körningstider",
    noMatch: "Ingen matchning de kommande 14 dagarna.",
    presets: "Förinställningar",
    privacy: "100 % i din webbläsare — ingenting lämnar din enhet.",
    p_everyMinute: "Varje minut",
    p_every5min: "Var 5:e minut",
    p_every15min: "Var 15:e minut",
    p_everyHour: "Varje timme, i precis",
    p_midnightDaily: "Varje dag vid midnatt",
    p_9amDaily: "Varje dag kl. 9:00",
    p_mon9am: "Varje måndag kl. 9:00",
    p_weekdays9am: "Vardagar kl. 9:00",
    p_firstMonth: "Första i varje månad, midnatt",
    p_onceYear: "En gång om året (1 jan, midnatt)",
  },
  pl: {
    expression: "Wyrażenie",
    copied: "Skopiowano",
    copy: "Kopiuj",
    fieldMinute: "Minuta",
    fieldHour: "Godzina",
    fieldDom: "Dzień miesiąca",
    fieldMonth: "Miesiąc",
    fieldDow: "Dzień tygodnia",
    next5: "Następne 5 uruchomień",
    noMatch: "Brak dopasowania w ciągu najbliższych 14 dni.",
    presets: "Ustawienia wstępne",
    privacy: "100 % w Twojej przeglądarce — nic nie opuszcza Twojego urządzenia.",
    p_everyMinute: "Co minutę",
    p_every5min: "Co 5 minut",
    p_every15min: "Co 15 minut",
    p_everyHour: "Co godzinę, o pełnej godzinie",
    p_midnightDaily: "Codziennie o północy",
    p_9amDaily: "Codziennie o 9:00",
    p_mon9am: "W każdy poniedziałek o 9:00",
    p_weekdays9am: "W dni robocze o 9:00",
    p_firstMonth: "Pierwszego dnia każdego miesiąca, o północy",
    p_onceYear: "Raz w roku (1 sty, o północy)",
  },
  uk: {
    expression: "Вираз",
    copied: "Скопійовано",
    copy: "Копіювати",
    fieldMinute: "Хвилина",
    fieldHour: "Година",
    fieldDom: "День місяця",
    fieldMonth: "Місяць",
    fieldDow: "День тижня",
    next5: "Наступні 5 запусків",
    noMatch: "Немає збігів у наступні 14 днів.",
    presets: "Шаблони",
    privacy: "100 % у вашому браузері — нічого не покидає ваш пристрій.",
    p_everyMinute: "Щохвилини",
    p_every5min: "Кожні 5 хвилин",
    p_every15min: "Кожні 15 хвилин",
    p_everyHour: "Щогодини, на початку години",
    p_midnightDaily: "Щодня о півночі",
    p_9amDaily: "Щодня о 9:00",
    p_mon9am: "Щопонеділка о 9:00",
    p_weekdays9am: "У будні о 9:00",
    p_firstMonth: "Перший день кожного місяця, північ",
    p_onceYear: "Раз на рік (1 січ, північ)",
  },
  cs: {
    expression: "Výraz",
    copied: "Zkopírováno",
    copy: "Kopírovat",
    fieldMinute: "Minuta",
    fieldHour: "Hodina",
    fieldDom: "Den v měsíci",
    fieldMonth: "Měsíc",
    fieldDow: "Den v týdnu",
    next5: "Příštích 5 spuštění",
    noMatch: "Žádná shoda v příštích 14 dnech.",
    presets: "Předvolby",
    privacy: "100 % ve vašem prohlížeči — nic neopustí vaše zařízení.",
    p_everyMinute: "Každou minutu",
    p_every5min: "Každých 5 minut",
    p_every15min: "Každých 15 minut",
    p_everyHour: "Každou hodinu, přesně na hodinu",
    p_midnightDaily: "Každý den o půlnoci",
    p_9amDaily: "Každý den v 9:00",
    p_mon9am: "Každé pondělí v 9:00",
    p_weekdays9am: "Pracovní dny v 9:00",
    p_firstMonth: "První den každého měsíce, půlnoc",
    p_onceYear: "Jednou ročně (1. led, půlnoc)",
  },
};

const FIELD_DEFS: { id: Field; min: number; max: number; example: string }[] = [
  { id: "minute", min: 0, max: 59, example: "0,15,30,45 | */5 | 0" },
  { id: "hour",   min: 0, max: 23, example: "9-17 | */2 | 0" },
  { id: "dom",    min: 1, max: 31, example: "*, 1, 1,15, L" },
  { id: "month",  min: 1, max: 12, example: "*, 1, 1-6, JAN-JUN" },
  { id: "dow",    min: 0, max: 6,  example: "* MON-FRI | 0,6" },
];

function fieldFromExpr(expr: string): Record<Field, string> {
  const p = expr.split(/\s+/);
  while (p.length < 5) p.push("*");
  return { minute: p[0], hour: p[1], dom: p[2], month: p[3], dow: p[4] };
}

/** Best-effort human translation. Not exhaustive (Quartz extensions aren't supported)
 *  but covers the patterns 95% of users actually write. */
function humanize(parts: Record<Field, string>): string {
  const { minute, hour, dom, month, dow } = parts;
  const min = minute === "*" ? "every minute" : `at minute ${minute}`;
  const hr = hour === "*" ? "of every hour" : `of hour ${hour}`;
  const day = dom === "*" ? "every day" : `on day ${dom}`;
  const mo = month === "*" ? "every month" : `in month ${month}`;
  const wd = dow === "*" ? "" : `, on weekday ${dow}`;
  return `${min}, ${hr}, ${day}, ${mo}${wd}.`;
}

// Sample next-fire times. Pure brute-force scan minute-by-minute over the next
// ~14 days — enough for previewing without pulling in a real cron library.
// `min`/`max` are the field bounds: a bare star-step ("* / step") is anchored at
// the field minimum per cron semantics, so day-of-month step-2 fires on 1,3,5…
// not 2,4,6.
const MONTH_NAMES: Record<string, number> = { JAN: 1, FEB: 2, MAR: 3, APR: 4, MAY: 5, JUN: 6, JUL: 7, AUG: 8, SEP: 9, OCT: 10, NOV: 11, DEC: 12 };
const DOW_NAMES: Record<string, number> = { SUN: 0, MON: 1, TUE: 2, WED: 3, THU: 4, FRI: 5, SAT: 6 };

// Resolve one cron token to a number, accepting the named months/days
// (JAN, MON, …) that the field hints advertise. Garbage → NaN, which simply
// never matches below.
function tok(s: string, names?: Record<string, number>): number {
  const named = names?.[s.trim().toUpperCase()];
  return named !== undefined ? named : Number(s);
}

function fieldMatches(value: number, expr: string, min: number, max: number, names?: Record<string, number>): boolean {
  if (expr === "*") return true;
  for (const part of expr.split(",")) {
    if (part.includes("/")) {
      const [range, stepStr] = part.split("/");
      const step = Number(stepStr) || 1;
      const [a, b] = range === "*" ? [min, max] : range.split("-").map((x) => tok(x, names));
      const lo = a, hi = (b === undefined ? max : b);
      if (value >= lo && value <= hi && (value - lo) % step === 0) return true;
    } else if (part.includes("-")) {
      const [a, b] = part.split("-").map((x) => tok(x, names));
      if (value >= a && value <= b) return true;
    } else if (tok(part, names) === value) return true;
  }
  return false;
}

/** Day-of-week matcher. Cron accepts both 0 and 7 for Sunday, but JS getDay()
 *  only returns 0 for Sunday — so test the raw value, then retry with any `7`
 *  rewritten to `0` when the current day is Sunday. */
function dowMatches(jsDay: number, expr: string): boolean {
  if (fieldMatches(jsDay, expr, 0, 7, DOW_NAMES)) return true;
  if (jsDay === 0 && /7/.test(expr)) return fieldMatches(0, expr.replace(/7/g, "0"), 0, 6, DOW_NAMES);
  return false;
}

function nextFires(parts: Record<Field, string>, count = 5): Date[] {
  const out: Date[] = [];
  const now = new Date();
  now.setSeconds(0, 0);
  now.setMinutes(now.getMinutes() + 1);
  const stop = new Date(now.getTime() + 14 * 24 * 3600 * 1000);
  for (let t = now.getTime(); t <= stop.getTime() && out.length < count; t += 60_000) {
    const d = new Date(t);
    if (
      fieldMatches(d.getMinutes(), parts.minute, 0, 59) &&
      fieldMatches(d.getHours(), parts.hour, 0, 23) &&
      fieldMatches(d.getDate(), parts.dom, 1, 31) &&
      fieldMatches(d.getMonth() + 1, parts.month, 1, 12, MONTH_NAMES) &&
      dowMatches(d.getDay(), parts.dow)
    ) out.push(new Date(d));
  }
  return out;
}

export function CronBuilderClient() {
  const s = T[useLocale()] ?? T.en;

  const FIELDS: { id: Field; label: string; min: number; max: number; example: string }[] = [
    { ...FIELD_DEFS[0], label: s.fieldMinute },
    { ...FIELD_DEFS[1], label: s.fieldHour },
    { ...FIELD_DEFS[2], label: s.fieldDom },
    { ...FIELD_DEFS[3], label: s.fieldMonth },
    { ...FIELD_DEFS[4], label: s.fieldDow },
  ];

  const PRESETS: { label: string; expr: string }[] = [
    { label: s.p_everyMinute, expr: "* * * * *" },
    { label: s.p_every5min, expr: "*/5 * * * *" },
    { label: s.p_every15min, expr: "*/15 * * * *" },
    { label: s.p_everyHour, expr: "0 * * * *" },
    { label: s.p_midnightDaily, expr: "0 0 * * *" },
    { label: s.p_9amDaily, expr: "0 9 * * *" },
    { label: s.p_mon9am, expr: "0 9 * * 1" },
    { label: s.p_weekdays9am, expr: "0 9 * * 1-5" },
    { label: s.p_firstMonth, expr: "0 0 1 * *" },
    { label: s.p_onceYear, expr: "0 0 1 1 *" },
  ];

  const [expr, setExpr] = useState("0 9 * * 1-5");
  const [copied, setCopied] = useState(false);
  const parts = useMemo(() => fieldFromExpr(expr), [expr]);
  const sample = useMemo(() => nextFires(parts, 5), [parts]);

  function setField(f: Field, value: string) {
    const next = { ...parts, [f]: value };
    setExpr(`${next.minute} ${next.hour} ${next.dom} ${next.month} ${next.dow}`);
  }
  async function copy() {
    try { await navigator.clipboard.writeText(expr); setCopied(true); setTimeout(() => setCopied(false), 1200); } catch {}
  }

  return (
    <div className="space-y-5">
      <div className="rounded-lg border border-ink-100 bg-white p-4">
        <label className="block text-xs font-semibold uppercase tracking-wide text-ink-400">{s.expression}</label>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <input value={expr} onChange={(e) => setExpr(e.target.value)} spellCheck={false}
            className="min-w-0 flex-1 rounded-md border border-ink-200 px-3 py-2 font-mono text-base text-ink-900 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100" />
          <Button size="sm" variant="outline" onClick={copy}>
            {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            {copied ? s.copied : s.copy}
          </Button>
        </div>
        <p className="mt-2 text-sm text-ink-500">{humanize(parts)}</p>
      </div>

      <div className="grid gap-3 rounded-lg border border-ink-100 bg-white p-4 sm:grid-cols-5">
        {FIELDS.map((f) => (
          <label key={f.id} className="flex flex-col text-xs font-medium text-ink-600">
            {f.label}
            <input value={parts[f.id]} onChange={(e) => setField(f.id, e.target.value)} spellCheck={false}
              className="mt-1 rounded-md border border-ink-200 px-2 py-1.5 font-mono text-sm" />
            <span className="mt-1 truncate text-[10px] text-ink-400">{f.example}</span>
          </label>
        ))}
      </div>

      <div className="rounded-lg border border-ink-100 bg-white p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">{s.next5}</p>
        <ul className="mt-2 space-y-1 font-mono text-sm">
          {sample.length === 0 ? (
            <li className="text-ink-400">{s.noMatch}</li>
          ) : sample.map((d, i) => (
            <li key={i} className="text-ink-700">{d.toLocaleString()}</li>
          ))}
        </ul>
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">{s.presets}</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {PRESETS.map((p) => (
            <button key={p.label} onClick={() => setExpr(p.expr)} className="rounded-full border border-ink-200 bg-white px-3 py-1 text-xs text-ink-700 hover:border-brand-300 hover:text-ink-900">
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <p className="text-xs text-ink-400">{s.privacy}</p>
    </div>
  );
}
