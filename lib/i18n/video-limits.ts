import { type Locale } from "@/lib/i18n/locales";

/**
 * Messages shown when a video exceeds the caller's plan caps (weight or
 * duration). `{max}` is interpolated with the already-formatted limit (e.g.
 * "200 MB" or "3 min"). English is the base + fallback for untranslated locales.
 */
export type VideoLimitStrings = {
  tooHeavy: string; // {max} = formatted weight, e.g. "200 MB"
  tooLong: string;  // {max} = formatted duration, e.g. "3 min"
  upgrade: string;
};

const en: VideoLimitStrings = {
  tooHeavy: "This video is heavier than your plan allows (max {max}). Upgrade your plan or use a smaller file.",
  tooLong: "This video is longer than your plan allows (max {max}). Upgrade your plan or trim it first.",
  upgrade: "Upgrade plan",
};
const fr: VideoLimitStrings = {
  tooHeavy: "Cette vidéo est plus lourde que ne l'autorise votre offre (max {max}). Passez à l'offre supérieure ou utilisez un fichier plus léger.",
  tooLong: "Cette vidéo dépasse la durée autorisée par votre offre (max {max}). Passez à l'offre supérieure ou raccourcissez-la d'abord.",
  upgrade: "Changer d'offre",
};
const es: VideoLimitStrings = {
  tooHeavy: "Este vídeo pesa más de lo que permite tu plan (máx. {max}). Mejora tu plan o usa un archivo más pequeño.",
  tooLong: "Este vídeo dura más de lo que permite tu plan (máx. {max}). Mejora tu plan o recórtalo primero.",
  upgrade: "Mejorar plan",
};
const pt: VideoLimitStrings = {
  tooHeavy: "Este vídeo é mais pesado do que o seu plano permite (máx. {max}). Atualize o seu plano ou use um ficheiro menor.",
  tooLong: "Este vídeo é mais longo do que o seu plano permite (máx. {max}). Atualize o seu plano ou corte-o primeiro.",
  upgrade: "Mudar de plano",
};
const de: VideoLimitStrings = {
  tooHeavy: "Dieses Video ist schwerer, als dein Tarif erlaubt (max. {max}). Wechsle zu einem höheren Tarif oder verwende eine kleinere Datei.",
  tooLong: "Dieses Video ist länger, als dein Tarif erlaubt (max. {max}). Wechsle zu einem höheren Tarif oder kürze es zuerst.",
  upgrade: "Tarif wechseln",
};
const it: VideoLimitStrings = {
  tooHeavy: "Questo video è più pesante di quanto consenta il tuo piano (max {max}). Passa a un piano superiore o usa un file più piccolo.",
  tooLong: "Questo video è più lungo di quanto consenta il tuo piano (max {max}). Passa a un piano superiore o accorcialo prima.",
  upgrade: "Cambia piano",
};
const nl: VideoLimitStrings = {
  tooHeavy: "Deze video is zwaarder dan je abonnement toestaat (max. {max}). Upgrade je abonnement of gebruik een kleiner bestand.",
  tooLong: "Deze video is langer dan je abonnement toestaat (max. {max}). Upgrade je abonnement of kort hem eerst in.",
  upgrade: "Abonnement upgraden",
};
const ja: VideoLimitStrings = {
  tooHeavy: "この動画はご利用中のプランの上限を超えています（最大 {max}）。プランをアップグレードするか、より小さいファイルをご利用ください。",
  tooLong: "この動画はご利用中のプランの上限より長いです（最大 {max}）。プランをアップグレードするか、先に短くしてください。",
  upgrade: "プランを変更",
};
const zh: VideoLimitStrings = {
  tooHeavy: "此视频超出了您套餐允许的大小（上限 {max}）。请升级套餐或使用更小的文件。",
  tooLong: "此视频超出了您套餐允许的时长（上限 {max}）。请升级套餐或先进行裁剪。",
  upgrade: "升级套餐",
};
const ko: VideoLimitStrings = {
  tooHeavy: "이 동영상은 요금제에서 허용하는 용량을 초과합니다(최대 {max}). 요금제를 업그레이드하거나 더 작은 파일을 사용하세요.",
  tooLong: "이 동영상은 요금제에서 허용하는 길이를 초과합니다(최대 {max}). 요금제를 업그레이드하거나 먼저 잘라내세요.",
  upgrade: "요금제 변경",
};
const ar: VideoLimitStrings = {
  tooHeavy: "حجم هذا الفيديو أكبر مما تسمح به باقتك (الحد الأقصى {max}). قم بترقية باقتك أو استخدم ملفًا أصغر.",
  tooLong: "مدة هذا الفيديو أطول مما تسمح به باقتك (الحد الأقصى {max}). قم بترقية باقتك أو اقتطعه أولًا.",
  upgrade: "ترقية الباقة",
};
const ru: VideoLimitStrings = {
  tooHeavy: "Это видео тяжелее, чем позволяет ваш тариф (макс. {max}). Перейдите на более высокий тариф или используйте файл поменьше.",
  tooLong: "Это видео длиннее, чем позволяет ваш тариф (макс. {max}). Перейдите на более высокий тариф или сначала обрежьте его.",
  upgrade: "Сменить тариф",
};
const hi: VideoLimitStrings = {
  tooHeavy: "यह वीडियो आपके प्लान की अनुमति से भारी है (अधिकतम {max})। अपना प्लान अपग्रेड करें या छोटी फ़ाइल इस्तेमाल करें।",
  tooLong: "यह वीडियो आपके प्लान की अनुमति से लंबा है (अधिकतम {max})। अपना प्लान अपग्रेड करें या पहले इसे छोटा करें।",
  upgrade: "प्लान अपग्रेड करें",
};
const tr: VideoLimitStrings = {
  tooHeavy: "Bu video, planınızın izin verdiğinden daha büyük (en fazla {max}). Planınızı yükseltin veya daha küçük bir dosya kullanın.",
  tooLong: "Bu video, planınızın izin verdiğinden daha uzun (en fazla {max}). Planınızı yükseltin veya önce kısaltın.",
  upgrade: "Planı yükselt",
};
const id: VideoLimitStrings = {
  tooHeavy: "Video ini lebih besar dari yang diizinkan paket Anda (maks {max}). Tingkatkan paket Anda atau gunakan file yang lebih kecil.",
  tooLong: "Video ini lebih panjang dari yang diizinkan paket Anda (maks {max}). Tingkatkan paket Anda atau potong terlebih dahulu.",
  upgrade: "Tingkatkan paket",
};
const vi: VideoLimitStrings = {
  tooHeavy: "Video này nặng hơn mức gói của bạn cho phép (tối đa {max}). Hãy nâng cấp gói hoặc dùng tệp nhỏ hơn.",
  tooLong: "Video này dài hơn mức gói của bạn cho phép (tối đa {max}). Hãy nâng cấp gói hoặc cắt ngắn nó trước.",
  upgrade: "Nâng cấp gói",
};
const sv: VideoLimitStrings = {
  tooHeavy: "Den här videon är tyngre än vad din plan tillåter (max {max}). Uppgradera din plan eller använd en mindre fil.",
  tooLong: "Den här videon är längre än vad din plan tillåter (max {max}). Uppgradera din plan eller korta ner den först.",
  upgrade: "Uppgradera plan",
};
const pl: VideoLimitStrings = {
  tooHeavy: "Ten film jest cięższy, niż pozwala Twój plan (maks. {max}). Przejdź na wyższy plan lub użyj mniejszego pliku.",
  tooLong: "Ten film jest dłuższy, niż pozwala Twój plan (maks. {max}). Przejdź na wyższy plan lub najpierw go przytnij.",
  upgrade: "Zmień plan",
};
const uk: VideoLimitStrings = {
  tooHeavy: "Це відео важче, ніж дозволяє ваш тариф (макс. {max}). Перейдіть на вищий тариф або використайте менший файл.",
  tooLong: "Це відео довше, ніж дозволяє ваш тариф (макс. {max}). Перейдіть на вищий тариф або спершу обріжте його.",
  upgrade: "Змінити тариф",
};
const cs: VideoLimitStrings = {
  tooHeavy: "Toto video je těžší, než povoluje váš tarif (max. {max}). Přejděte na vyšší tarif nebo použijte menší soubor.",
  tooLong: "Toto video je delší, než povoluje váš tarif (max. {max}). Přejděte na vyšší tarif nebo jej nejprve zkraťte.",
  upgrade: "Změnit tarif",
};

const TABLE: Partial<Record<Locale, VideoLimitStrings>> = { en, fr, es, pt, de, it, nl, ja, zh, ko, ar, ru, hi, tr, id, vi, sv, pl, uk, cs };

export function getVideoLimits(locale: Locale): VideoLimitStrings {
  return TABLE[locale] ?? en;
}
