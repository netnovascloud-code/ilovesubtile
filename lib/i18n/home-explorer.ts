import type { Locale } from "@/lib/i18n/locales";

/**
 * Localised copy for the homepage search hero (HomeExplorer).
 * `counter` and `seeAll` contain a "{n}" placeholder the page interpolates.
 * `suggestions` are 5 labels in a fixed order; the query/category that drive
 * each chip live in the page and are never translated.
 */
export type HomeExplorerStrings = {
  title: string;
  subtitle: string;
  placeholder: string;
  all: string;
  counter: string;
  ai: string;
  seeAll: string;
  empty: string;
  suggestions: [string, string, string, string, string];
};

const en: HomeExplorerStrings = {
  title: "What do you want to convert?",
  subtitle: "Free, fast online tools for files, images, code and text. Drop it in, get your result.",
  placeholder: "Search tools — e.g. jpg to png, json to csv, translate…",
  all: "All",
  counter: "{n}+ free tools · 13 languages · Files deleted instantly",
  ai: "AI",
  seeAll: "See all {n} tools",
  empty: "No tool matches your search yet.",
  suggestions: ["JPG → PNG", "Compress image", "JSON → CSV", "Translate text", "Subtitles"],
};

const fr: HomeExplorerStrings = {
  title: "Que voulez-vous convertir ?",
  subtitle: "Des outils en ligne gratuits et rapides pour fichiers, images, code et texte. Déposez, récupérez le résultat.",
  placeholder: "Rechercher un outil — ex. jpg en png, json en csv, traduire…",
  all: "Tout",
  counter: "{n}+ outils gratuits · 13 langues · Fichiers supprimés instantanément",
  ai: "IA",
  seeAll: "Voir les {n} outils",
  empty: "Aucun outil ne correspond à votre recherche pour l'instant.",
  suggestions: ["JPG → PNG", "Compresser une image", "JSON → CSV", "Traduire du texte", "Sous-titres"],
};

const es: HomeExplorerStrings = {
  title: "¿Qué quieres convertir?",
  subtitle: "Herramientas online gratis y rápidas para archivos, imágenes, código y texto. Suéltalo y obtén tu resultado.",
  placeholder: "Buscar herramientas — p. ej. jpg a png, json a csv, traducir…",
  all: "Todo",
  counter: "{n}+ herramientas gratis · 13 idiomas · Archivos eliminados al instante",
  ai: "IA",
  seeAll: "Ver las {n} herramientas",
  empty: "Ninguna herramienta coincide con tu búsqueda todavía.",
  suggestions: ["JPG → PNG", "Comprimir imagen", "JSON → CSV", "Traducir texto", "Subtítulos"],
};

const pt: HomeExplorerStrings = {
  title: "O que você quer converter?",
  subtitle: "Ferramentas online grátis e rápidas para arquivos, imagens, código e texto. Solte e receba o resultado.",
  placeholder: "Buscar ferramentas — ex. jpg para png, json para csv, traduzir…",
  all: "Tudo",
  counter: "{n}+ ferramentas grátis · 13 idiomas · Arquivos excluídos na hora",
  ai: "IA",
  seeAll: "Ver as {n} ferramentas",
  empty: "Nenhuma ferramenta corresponde à sua busca ainda.",
  suggestions: ["JPG → PNG", "Comprimir imagem", "JSON → CSV", "Traduzir texto", "Legendas"],
};

const de: HomeExplorerStrings = {
  title: "Was möchtest du konvertieren?",
  subtitle: "Kostenlose, schnelle Online-Tools für Dateien, Bilder, Code und Text. Ablegen, Ergebnis erhalten.",
  placeholder: "Tools suchen — z. B. jpg zu png, json zu csv, übersetzen…",
  all: "Alle",
  counter: "{n}+ kostenlose Tools · 13 Sprachen · Dateien sofort gelöscht",
  ai: "KI",
  seeAll: "Alle {n} Tools ansehen",
  empty: "Noch kein Tool passt zu deiner Suche.",
  suggestions: ["JPG → PNG", "Bild komprimieren", "JSON → CSV", "Text übersetzen", "Untertitel"],
};

const it: HomeExplorerStrings = {
  title: "Cosa vuoi convertire?",
  subtitle: "Strumenti online gratuiti e veloci per file, immagini, codice e testo. Trascina e ottieni il risultato.",
  placeholder: "Cerca strumenti — es. jpg in png, json in csv, tradurre…",
  all: "Tutto",
  counter: "{n}+ strumenti gratis · 13 lingue · File eliminati all'istante",
  ai: "IA",
  seeAll: "Vedi tutti i {n} strumenti",
  empty: "Nessuno strumento corrisponde ancora alla tua ricerca.",
  suggestions: ["JPG → PNG", "Comprimi immagine", "JSON → CSV", "Traduci testo", "Sottotitoli"],
};

const nl: HomeExplorerStrings = {
  title: "Wat wil je converteren?",
  subtitle: "Gratis, snelle online tools voor bestanden, afbeeldingen, code en tekst. Sleep erin, krijg je resultaat.",
  placeholder: "Tools zoeken — bijv. jpg naar png, json naar csv, vertalen…",
  all: "Alles",
  counter: "{n}+ gratis tools · 13 talen · Bestanden direct verwijderd",
  ai: "AI",
  seeAll: "Bekijk alle {n} tools",
  empty: "Nog geen tool komt overeen met je zoekopdracht.",
  suggestions: ["JPG → PNG", "Afbeelding comprimeren", "JSON → CSV", "Tekst vertalen", "Ondertitels"],
};

const ja: HomeExplorerStrings = {
  title: "何を変換しますか？",
  subtitle: "ファイル・画像・コード・テキスト向けの無料で高速なオンラインツール。ドロップして結果を取得。",
  placeholder: "ツールを検索 — 例：jpg を png、json を csv、翻訳…",
  all: "すべて",
  counter: "{n}+ の無料ツール · 13 言語 · ファイルは即時削除",
  ai: "AI",
  seeAll: "{n} 個のツールをすべて見る",
  empty: "検索に一致するツールはまだありません。",
  suggestions: ["JPG → PNG", "画像を圧縮", "JSON → CSV", "テキストを翻訳", "字幕"],
};

const zh: HomeExplorerStrings = {
  title: "你想转换什么？",
  subtitle: "面向文件、图片、代码和文本的免费快捷在线工具。拖入即得结果。",
  placeholder: "搜索工具 — 例如 jpg 转 png、json 转 csv、翻译…",
  all: "全部",
  counter: "{n}+ 个免费工具 · 13 种语言 · 文件即时删除",
  ai: "AI",
  seeAll: "查看全部 {n} 个工具",
  empty: "暂无与你的搜索匹配的工具。",
  suggestions: ["JPG → PNG", "压缩图片", "JSON → CSV", "翻译文本", "字幕"],
};

const ko: HomeExplorerStrings = {
  title: "무엇을 변환할까요?",
  subtitle: "파일·이미지·코드·텍스트를 위한 무료 고속 온라인 도구. 드롭하면 결과가 나옵니다.",
  placeholder: "도구 검색 — 예: jpg를 png로, json을 csv로, 번역…",
  all: "전체",
  counter: "{n}+개 무료 도구 · 13개 언어 · 파일 즉시 삭제",
  ai: "AI",
  seeAll: "{n}개 도구 모두 보기",
  empty: "검색과 일치하는 도구가 아직 없습니다.",
  suggestions: ["JPG → PNG", "이미지 압축", "JSON → CSV", "텍스트 번역", "자막"],
};

const ar: HomeExplorerStrings = {
  title: "ماذا تريد أن تحوّل؟",
  subtitle: "أدوات أونلاين مجانية وسريعة للملفات والصور والشيفرة والنصوص. أفلِت ملفك واحصل على نتيجتك.",
  placeholder: "ابحث عن أداة — مثل jpg إلى png، json إلى csv، ترجمة…",
  all: "الكل",
  counter: "{n}+ أداة مجانية · 13 لغة · تُحذف الملفات فورًا",
  ai: "ذكاء اصطناعي",
  seeAll: "عرض كل الأدوات الـ {n}",
  empty: "لا توجد أداة تطابق بحثك بعد.",
  suggestions: ["JPG → PNG", "ضغط صورة", "JSON → CSV", "ترجمة نص", "ترجمات"],
};

const ru: HomeExplorerStrings = {
  title: "Что вы хотите конвертировать?",
  subtitle: "Бесплатные быстрые онлайн-инструменты для файлов, изображений, кода и текста. Перетащите — получите результат.",
  placeholder: "Поиск инструментов — напр. jpg в png, json в csv, перевести…",
  all: "Все",
  counter: "{n}+ бесплатных инструментов · 13 языков · Файлы удаляются мгновенно",
  ai: "ИИ",
  seeAll: "Показать все {n} инструментов",
  empty: "Пока нет инструментов по вашему запросу.",
  suggestions: ["JPG → PNG", "Сжать изображение", "JSON → CSV", "Перевести текст", "Субтитры"],
};

const hi: HomeExplorerStrings = {
  title: "आप क्या कन्वर्ट करना चाहते हैं?",
  subtitle: "फ़ाइलों, छवियों, कोड और टेक्स्ट के लिए मुफ़्त, तेज़ ऑनलाइन टूल। डालें और परिणाम पाएँ।",
  placeholder: "टूल खोजें — जैसे jpg से png, json से csv, अनुवाद…",
  all: "सभी",
  counter: "{n}+ मुफ़्त टूल · 13 भाषाएँ · फ़ाइलें तुरंत हटाई जाती हैं",
  ai: "AI",
  seeAll: "सभी {n} टूल देखें",
  empty: "आपकी खोज से अभी कोई टूल मेल नहीं खाता।",
  suggestions: ["JPG → PNG", "छवि संपीड़ित करें", "JSON → CSV", "टेक्स्ट अनुवाद", "सबटाइटल"],
};

const MAP: Record<Locale, HomeExplorerStrings> = { en, fr, es, pt, de, it, nl, ja, zh, ko, ar, ru, hi };

export function getHomeExplorer(locale: Locale): HomeExplorerStrings {
  return MAP[locale] ?? en;
}
