import type { Locale } from "@/lib/i18n/locales";

// Tiny string set for the AI text-tool character meter (Part 5). `signIn` and
// `upgrade` carry a {limit} placeholder the component interpolates with the
// next tier's formatted character ceiling.
export type TextMeterStrings = {
  words: string;
  minRead: string;
  over: string;
  signIn: string;
  upgrade: string;
};

const STRINGS: Partial<Record<Locale, TextMeterStrings>> = {
  en: { words: "words", minRead: "min read", over: "This text is too long for your plan.", signIn: "Sign in to paste up to {limit} characters.", upgrade: "Upgrade to Pro to paste up to {limit} characters." },
  fr: { words: "mots", minRead: "min de lecture", over: "Ce texte dépasse la limite de votre offre.", signIn: "Connectez-vous pour coller jusqu'à {limit} caractères.", upgrade: "Passez Pro pour coller jusqu'à {limit} caractères." },
  es: { words: "palabras", minRead: "min de lectura", over: "Este texto supera el límite de tu plan.", signIn: "Inicia sesión para pegar hasta {limit} caracteres.", upgrade: "Pasa a Pro para pegar hasta {limit} caracteres." },
  pt: { words: "palavras", minRead: "min de leitura", over: "Este texto excede o limite do seu plano.", signIn: "Entre para colar até {limit} caracteres.", upgrade: "Vá Pro para colar até {limit} caracteres." },
  de: { words: "Wörter", minRead: "Min. Lesezeit", over: "Dieser Text überschreitet das Limit deines Plans.", signIn: "Melde dich an, um bis zu {limit} Zeichen einzufügen.", upgrade: "Hol dir Pro für bis zu {limit} Zeichen." },
  it: { words: "parole", minRead: "min di lettura", over: "Questo testo supera il limite del tuo piano.", signIn: "Accedi per incollare fino a {limit} caratteri.", upgrade: "Passa a Pro per incollare fino a {limit} caratteri." },
  nl: { words: "woorden", minRead: "min lezen", over: "Deze tekst overschrijdt de limiet van je abonnement.", signIn: "Log in om tot {limit} tekens te plakken.", upgrade: "Ga Pro om tot {limit} tekens te plakken." },
  ja: { words: "語", minRead: "分で読了", over: "このテキストはプランの上限を超えています。", signIn: "ログインすると最大 {limit} 文字まで貼り付けられます。", upgrade: "Pro なら最大 {limit} 文字まで貼り付けられます。" },
  zh: { words: "字词", minRead: "分钟阅读", over: "此文本超出了您套餐的上限。", signIn: "登录后最多可粘贴 {limit} 个字符。", upgrade: "升级 Pro 后最多可粘贴 {limit} 个字符。" },
  ko: { words: "단어", minRead: "분 분량", over: "이 텍스트는 요금제 한도를 초과합니다.", signIn: "로그인하면 최대 {limit}자까지 붙여넣을 수 있습니다.", upgrade: "Pro로 업그레이드하면 최대 {limit}자까지 가능합니다." },
  ar: { words: "كلمة", minRead: "دقيقة قراءة", over: "هذا النص يتجاوز حد خطتك.", signIn: "سجّل الدخول للصق حتى {limit} حرف.", upgrade: "ترقَّ إلى Pro للصق حتى {limit} حرف." },
  ru: { words: "слов", minRead: "мин чтения", over: "Этот текст превышает лимит вашего тарифа.", signIn: "Войдите, чтобы вставить до {limit} символов.", upgrade: "Перейдите на Pro, чтобы вставить до {limit} символов." },
  hi: { words: "शब्द", minRead: "मिनट पठन", over: "यह टेक्स्ट आपकी योजना की सीमा से अधिक है।", signIn: "{limit} वर्ण तक पेस्ट करने के लिए लॉग इन करें।", upgrade: "{limit} वर्ण तक के लिए Pro लें।" },
  tr: { words: "kelime", minRead: "dk okuma", over: "Bu metin planınızın sınırını aşıyor.", signIn: "{limit} karaktere kadar yapıştırmak için giriş yapın.", upgrade: "{limit} karaktere kadar için Pro'ya geçin." },
  id: { words: "kata", minRead: "mnt baca", over: "Teks ini melebihi batas paket Anda.", signIn: "Masuk untuk menempel hingga {limit} karakter.", upgrade: "Tingkatkan ke Pro untuk menempel hingga {limit} karakter." },
  vi: { words: "từ", minRead: "phút đọc", over: "Văn bản này vượt quá giới hạn gói của bạn.", signIn: "Đăng nhập để dán tối đa {limit} ký tự.", upgrade: "Nâng cấp Pro để dán tối đa {limit} ký tự." },
  sv: { words: "ord", minRead: "min läsning", over: "Den här texten överskrider din plans gräns.", signIn: "Logga in för att klistra in upp till {limit} tecken.", upgrade: "Uppgradera till Pro för upp till {limit} tecken." },
  pl: { words: "słów", minRead: "min czytania", over: "Ten tekst przekracza limit Twojego planu.", signIn: "Zaloguj się, aby wkleić do {limit} znaków.", upgrade: "Przejdź na Pro, aby wkleić do {limit} znaków." },
  uk: { words: "слів", minRead: "хв читання", over: "Цей текст перевищує ліміт вашого тарифу.", signIn: "Увійдіть, щоб вставити до {limit} символів.", upgrade: "Перейдіть на Pro, щоб вставити до {limit} символів." },
  cs: { words: "slov", minRead: "min čtení", over: "Tento text překračuje limit vašeho plánu.", signIn: "Přihlaste se a vložte až {limit} znaků.", upgrade: "Přejděte na Pro a vložte až {limit} znaků." },
};

export function getTextMeter(locale: Locale): TextMeterStrings {
  return STRINGS[locale] ?? STRINGS.en!;
}
