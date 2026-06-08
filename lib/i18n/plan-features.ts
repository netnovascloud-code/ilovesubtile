import type { Locale } from "@/lib/i18n/locales";

// Localized pricing-tile feature bullets (Part 7/10). The English set mirrors
// lib/plans.ts; non-translatable tokens (Workflow Builder, REST API, GB/MB,
// Pro) are kept verbatim. Missing locales fall back to English via getPlanFeatures.
export type PlanFeatures = { free: string[]; pro: string[]; business: string[] };

const en: PlanFeatures = {
  free: ["All browser tools, free & unlimited", "AI tools: 2/day", "AI files up to 20 MB", "Watermark on burned-in video", "Ads during AI processing"],
  pro: ["500 AI conversions / month", "Workflow Builder", "Batch up to 20 files", "Files up to 1 GB", "Text up to 50,000 characters", "No ads, no watermark", "10 saved templates", "Video background removal up to 5 min", "All AI languages", "Priority queue"],
  business: ["3,000 AI conversions / month", "Everything in Pro", "Full REST API + 300 API credits / month", "Text up to 100,000 characters", "Unlimited batch", "Unlimited templates", "Files up to 5 GB", "5 team seats", "Priority support", "Custom invoicing"],
};

const FEATURES: Partial<Record<Locale, PlanFeatures>> = {
  en,
  fr: {
    free: ["Tous les outils navigateur, gratuits et illimités", "IA : 2/jour", "Fichiers IA jusqu'à 20 Mo", "Filigrane sur vidéo incrustée", "Publicités pendant le traitement IA"],
    pro: ["500 conversions IA / mois", "Workflow Builder", "Batch jusqu'à 20 fichiers", "Fichiers jusqu'à 1 Go", "Texte jusqu'à 50 000 caractères", "Sans pub, sans filigrane", "10 modèles enregistrés", "Suppression de fond vidéo jusqu'à 5 min", "Toutes les langues IA", "File prioritaire"],
    business: ["3 000 conversions IA / mois", "Tout Pro inclus", "API REST complète + 300 crédits API / mois", "Texte jusqu'à 100 000 caractères", "Batch illimité", "Modèles illimités", "Fichiers jusqu'à 5 Go", "5 sièges d'équipe", "Support prioritaire", "Facturation personnalisée"],
  },
  es: {
    free: ["Todas las herramientas del navegador, gratis e ilimitadas", "IA: 2/día", "Archivos IA hasta 20 MB", "Marca de agua en vídeo incrustado", "Anuncios durante el proceso IA"],
    pro: ["500 conversiones IA / mes", "Workflow Builder", "Lote de hasta 20 archivos", "Archivos hasta 1 GB", "Texto hasta 50 000 caracteres", "Sin anuncios, sin marca de agua", "10 plantillas guardadas", "Quitar fondo de vídeo hasta 5 min", "Todos los idiomas IA", "Cola prioritaria"],
    business: ["3 000 conversiones IA / mes", "Todo lo de Pro", "API REST completa + 300 créditos API / mes", "Texto hasta 100 000 caracteres", "Lote ilimitado", "Plantillas ilimitadas", "Archivos hasta 5 GB", "5 puestos de equipo", "Soporte prioritario", "Facturación personalizada"],
  },
  pt: {
    free: ["Todas as ferramentas do navegador, grátis e ilimitadas", "IA: 2/dia", "Arquivos IA até 20 MB", "Marca d'água em vídeo incorporado", "Anúncios durante o processo IA"],
    pro: ["500 conversões IA / mês", "Workflow Builder", "Lote de até 20 arquivos", "Arquivos até 1 GB", "Texto até 50.000 caracteres", "Sem anúncios, sem marca d'água", "10 modelos salvos", "Remoção de fundo de vídeo até 5 min", "Todos os idiomas IA", "Fila prioritária"],
    business: ["3.000 conversões IA / mês", "Tudo do Pro", "API REST completa + 300 créditos API / mês", "Texto até 100.000 caracteres", "Lote ilimitado", "Modelos ilimitados", "Arquivos até 5 GB", "5 assentos de equipe", "Suporte prioritário", "Faturamento personalizado"],
  },
  de: {
    free: ["Alle Browser-Tools, kostenlos & unbegrenzt", "KI: 2/Tag", "KI-Dateien bis 20 MB", "Wasserzeichen auf eingebranntem Video", "Werbung während der KI-Verarbeitung"],
    pro: ["500 KI-Konvertierungen / Monat", "Workflow Builder", "Batch bis 20 Dateien", "Dateien bis 1 GB", "Text bis 50.000 Zeichen", "Keine Werbung, kein Wasserzeichen", "10 gespeicherte Vorlagen", "Video-Hintergrundentfernung bis 5 Min", "Alle KI-Sprachen", "Vorrangige Warteschlange"],
    business: ["3.000 KI-Konvertierungen / Monat", "Alles aus Pro", "Vollständige REST-API + 300 API-Credits / Monat", "Text bis 100.000 Zeichen", "Unbegrenzter Batch", "Unbegrenzte Vorlagen", "Dateien bis 5 GB", "5 Team-Plätze", "Vorrangiger Support", "Individuelle Rechnung"],
  },
  it: {
    free: ["Tutti gli strumenti del browser, gratis e illimitati", "IA: 2/giorno", "File IA fino a 20 MB", "Filigrana sul video incorporato", "Pubblicità durante l'elaborazione IA"],
    pro: ["500 conversioni IA / mese", "Workflow Builder", "Batch fino a 20 file", "File fino a 1 GB", "Testo fino a 50.000 caratteri", "Niente pubblicità, niente filigrana", "10 modelli salvati", "Rimozione sfondo video fino a 5 min", "Tutte le lingue IA", "Coda prioritaria"],
    business: ["3.000 conversioni IA / mese", "Tutto di Pro", "API REST completa + 300 crediti API / mese", "Testo fino a 100.000 caratteri", "Batch illimitato", "Modelli illimitati", "File fino a 5 GB", "5 postazioni team", "Supporto prioritario", "Fatturazione personalizzata"],
  },
  nl: {
    free: ["Alle browsertools, gratis & onbeperkt", "AI: 2/dag", "AI-bestanden tot 20 MB", "Watermerk op ingebrande video", "Advertenties tijdens AI-verwerking"],
    pro: ["500 AI-conversies / maand", "Workflow Builder", "Batch tot 20 bestanden", "Bestanden tot 1 GB", "Tekst tot 50.000 tekens", "Geen advertenties, geen watermerk", "10 opgeslagen sjablonen", "Video-achtergrond verwijderen tot 5 min", "Alle AI-talen", "Prioriteitswachtrij"],
    business: ["3.000 AI-conversies / maand", "Alles van Pro", "Volledige REST API + 300 API-credits / maand", "Tekst tot 100.000 tekens", "Onbeperkte batch", "Onbeperkte sjablonen", "Bestanden tot 5 GB", "5 teamplekken", "Prioriteitssupport", "Aangepaste facturering"],
  },
  ja: {
    free: ["すべてのブラウザツール、無料・無制限", "AI：1日2回", "AIファイル最大20 MB", "焼き込み動画に透かし", "AI処理中に広告"],
    pro: ["月500回のAI変換", "Workflow Builder", "最大20ファイルの一括処理", "ファイル最大1 GB", "テキスト最大50,000文字", "広告なし・透かしなし", "保存テンプレート10件", "動画背景除去 最大5分", "すべてのAI言語", "優先キュー"],
    business: ["月3,000回のAI変換", "Proのすべて", "完全なREST API＋月300 APIクレジット", "テキスト最大100,000文字", "無制限の一括処理", "無制限のテンプレート", "ファイル最大5 GB", "チーム5席", "優先サポート", "カスタム請求"],
  },
  zh: {
    free: ["所有浏览器工具，免费且无限", "AI：每天2次", "AI文件最大20 MB", "烧录视频带水印", "AI处理期间显示广告"],
    pro: ["每月500次AI转换", "Workflow Builder", "批量最多20个文件", "文件最大1 GB", "文本最多50,000字符", "无广告、无水印", "10个保存的模板", "视频去背景最长5分钟", "所有AI语言", "优先队列"],
    business: ["每月3,000次AI转换", "包含Pro全部", "完整REST API＋每月300 API额度", "文本最多100,000字符", "无限批量", "无限模板", "文件最大5 GB", "5个团队席位", "优先支持", "定制开票"],
  },
  ko: {
    free: ["모든 브라우저 도구, 무료·무제한", "AI: 하루 2회", "AI 파일 최대 20 MB", "인코딩 영상에 워터마크", "AI 처리 중 광고"],
    pro: ["월 500회 AI 변환", "Workflow Builder", "최대 20개 일괄 처리", "파일 최대 1 GB", "텍스트 최대 50,000자", "광고 없음·워터마크 없음", "저장 템플릿 10개", "영상 배경 제거 최대 5분", "모든 AI 언어", "우선 대기열"],
    business: ["월 3,000회 AI 변환", "Pro의 모든 기능", "완전한 REST API + 월 300 API 크레딧", "텍스트 최대 100,000자", "무제한 일괄 처리", "무제한 템플릿", "파일 최대 5 GB", "팀 좌석 5개", "우선 지원", "맞춤 인보이스"],
  },
  ar: {
    free: ["كل أدوات المتصفح، مجانية وغير محدودة", "الذكاء الاصطناعي: مرتان/يوم", "ملفات AI حتى 20 ميجا", "علامة مائية على الفيديو المحروق", "إعلانات أثناء معالجة AI"],
    pro: ["500 تحويل AI / شهر", "Workflow Builder", "دفعة حتى 20 ملفًا", "ملفات حتى 1 جيجا", "نص حتى 50,000 حرف", "بدون إعلانات وبدون علامة مائية", "10 قوالب محفوظة", "إزالة خلفية الفيديو حتى 5 دقائق", "كل لغات AI", "قائمة انتظار ذات أولوية"],
    business: ["3,000 تحويل AI / شهر", "كل ما في Pro", "API REST كاملة + 300 رصيد API / شهر", "نص حتى 100,000 حرف", "دفعات غير محدودة", "قوالب غير محدودة", "ملفات حتى 5 جيجا", "5 مقاعد للفريق", "دعم ذو أولوية", "فوترة مخصصة"],
  },
  ru: {
    free: ["Все браузерные инструменты, бесплатно и без лимита", "ИИ: 2/день", "ИИ-файлы до 20 МБ", "Водяной знак на вшитом видео", "Реклама во время ИИ-обработки"],
    pro: ["500 ИИ-конвертаций / мес", "Workflow Builder", "Пакет до 20 файлов", "Файлы до 1 ГБ", "Текст до 50 000 символов", "Без рекламы и водяных знаков", "10 сохранённых шаблонов", "Удаление фона видео до 5 мин", "Все языки ИИ", "Приоритетная очередь"],
    business: ["3 000 ИИ-конвертаций / мес", "Всё из Pro", "Полный REST API + 300 API-кредитов / мес", "Текст до 100 000 символов", "Безлимитный пакет", "Безлимитные шаблоны", "Файлы до 5 ГБ", "5 мест в команде", "Приоритетная поддержка", "Индивидуальный счёт"],
  },
  hi: {
    free: ["सभी ब्राउज़र टूल, मुफ़्त और असीमित", "AI: 2/दिन", "AI फ़ाइलें 20 MB तक", "बर्न किए वीडियो पर वॉटरमार्क", "AI प्रोसेसिंग के दौरान विज्ञापन"],
    pro: ["500 AI रूपांतरण / माह", "Workflow Builder", "20 फ़ाइलों तक बैच", "फ़ाइलें 1 GB तक", "टेक्स्ट 50,000 वर्ण तक", "कोई विज्ञापन नहीं, कोई वॉटरमार्क नहीं", "10 सहेजे गए टेम्पलेट", "वीडियो बैकग्राउंड हटाना 5 मिनट तक", "सभी AI भाषाएँ", "प्राथमिकता कतार"],
    business: ["3,000 AI रूपांतरण / माह", "Pro का सब कुछ", "पूर्ण REST API + 300 API क्रेडिट / माह", "टेक्स्ट 100,000 वर्ण तक", "असीमित बैच", "असीमित टेम्पलेट", "फ़ाइलें 5 GB तक", "5 टीम सीटें", "प्राथमिकता समर्थन", "कस्टम चालान"],
  },
  tr: {
    free: ["Tüm tarayıcı araçları, ücretsiz ve sınırsız", "AI: 2/gün", "AI dosyaları 20 MB'a kadar", "Gömülü videoda filigran", "AI işleme sırasında reklam"],
    pro: ["Aylık 500 AI dönüşümü", "Workflow Builder", "20 dosyaya kadar toplu işlem", "Dosyalar 1 GB'a kadar", "Metin 50.000 karaktere kadar", "Reklamsız, filigransız", "10 kayıtlı şablon", "Video arka plan kaldırma 5 dk'ya kadar", "Tüm AI dilleri", "Öncelikli kuyruk"],
    business: ["Aylık 3.000 AI dönüşümü", "Pro'daki her şey", "Tam REST API + aylık 300 API kredisi", "Metin 100.000 karaktere kadar", "Sınırsız toplu işlem", "Sınırsız şablon", "Dosyalar 5 GB'a kadar", "5 takım koltuğu", "Öncelikli destek", "Özel faturalandırma"],
  },
  id: {
    free: ["Semua alat browser, gratis & tanpa batas", "AI: 2/hari", "File AI hingga 20 MB", "Watermark pada video tertanam", "Iklan saat pemrosesan AI"],
    pro: ["500 konversi AI / bulan", "Workflow Builder", "Batch hingga 20 file", "File hingga 1 GB", "Teks hingga 50.000 karakter", "Tanpa iklan, tanpa watermark", "10 template tersimpan", "Hapus latar video hingga 5 mnt", "Semua bahasa AI", "Antrean prioritas"],
    business: ["3.000 konversi AI / bulan", "Semua di Pro", "REST API penuh + 300 kredit API / bulan", "Teks hingga 100.000 karakter", "Batch tanpa batas", "Template tanpa batas", "File hingga 5 GB", "5 kursi tim", "Dukungan prioritas", "Faktur khusus"],
  },
  vi: {
    free: ["Tất cả công cụ trình duyệt, miễn phí & không giới hạn", "AI: 2/ngày", "Tệp AI đến 20 MB", "Hình mờ trên video đã ghi", "Quảng cáo khi xử lý AI"],
    pro: ["500 lượt AI / tháng", "Workflow Builder", "Hàng loạt đến 20 tệp", "Tệp đến 1 GB", "Văn bản đến 50.000 ký tự", "Không quảng cáo, không hình mờ", "10 mẫu đã lưu", "Xóa nền video đến 5 phút", "Mọi ngôn ngữ AI", "Hàng đợi ưu tiên"],
    business: ["3.000 lượt AI / tháng", "Mọi thứ trong Pro", "REST API đầy đủ + 300 tín dụng API / tháng", "Văn bản đến 100.000 ký tự", "Hàng loạt không giới hạn", "Mẫu không giới hạn", "Tệp đến 5 GB", "5 chỗ nhóm", "Hỗ trợ ưu tiên", "Hóa đơn tùy chỉnh"],
  },
  sv: {
    free: ["Alla webbläsarverktyg, gratis & obegränsat", "AI: 2/dag", "AI-filer upp till 20 MB", "Vattenstämpel på inbränd video", "Annonser under AI-bearbetning"],
    pro: ["500 AI-konverteringar / månad", "Workflow Builder", "Batch upp till 20 filer", "Filer upp till 1 GB", "Text upp till 50 000 tecken", "Inga annonser, ingen vattenstämpel", "10 sparade mallar", "Ta bort videobakgrund upp till 5 min", "Alla AI-språk", "Prioriterad kö"],
    business: ["3 000 AI-konverteringar / månad", "Allt i Pro", "Fullständig REST API + 300 API-krediter / månad", "Text upp till 100 000 tecken", "Obegränsad batch", "Obegränsade mallar", "Filer upp till 5 GB", "5 teamplatser", "Prioriterad support", "Anpassad fakturering"],
  },
  pl: {
    free: ["Wszystkie narzędzia w przeglądarce, za darmo i bez limitu", "AI: 2 dziennie", "Pliki AI do 20 MB", "Znak wodny na wypalonym wideo", "Reklamy podczas przetwarzania AI"],
    pro: ["500 konwersji AI / mies.", "Workflow Builder", "Wsadowo do 20 plików", "Pliki do 1 GB", "Tekst do 50 000 znaków", "Bez reklam, bez znaku wodnego", "10 zapisanych szablonów", "Usuwanie tła wideo do 5 min", "Wszystkie języki AI", "Priorytetowa kolejka"],
    business: ["3000 konwersji AI / mies.", "Wszystko z Pro", "Pełne REST API + 300 kredytów API / mies.", "Tekst do 100 000 znaków", "Nielimitowany wsad", "Nielimitowane szablony", "Pliki do 5 GB", "5 miejsc w zespole", "Priorytetowe wsparcie", "Faktury na zamówienie"],
  },
  uk: {
    free: ["Усі браузерні інструменти, безкоштовно й без обмежень", "ШІ: 2/день", "Файли ШІ до 20 МБ", "Водяний знак на вшитому відео", "Реклама під час обробки ШІ"],
    pro: ["500 ШІ-конвертацій / міс", "Workflow Builder", "Пакет до 20 файлів", "Файли до 1 ГБ", "Текст до 50 000 символів", "Без реклами, без водяного знака", "10 збережених шаблонів", "Видалення фону відео до 5 хв", "Усі мови ШІ", "Пріоритетна черга"],
    business: ["3000 ШІ-конвертацій / міс", "Усе з Pro", "Повний REST API + 300 API-кредитів / міс", "Текст до 100 000 символів", "Необмежений пакет", "Необмежені шаблони", "Файли до 5 ГБ", "5 місць у команді", "Пріоритетна підтримка", "Індивідуальні рахунки"],
  },
  cs: {
    free: ["Všechny nástroje v prohlížeči, zdarma a bez omezení", "AI: 2/den", "AI soubory do 20 MB", "Vodoznak na vypáleném videu", "Reklamy během zpracování AI"],
    pro: ["500 AI konverzí / měsíc", "Workflow Builder", "Dávka až 20 souborů", "Soubory až 1 GB", "Text až 50 000 znaků", "Bez reklam, bez vodoznaku", "10 uložených šablon", "Odstranění pozadí videa až 5 min", "Všechny jazyky AI", "Prioritní fronta"],
    business: ["3 000 AI konverzí / měsíc", "Vše z Pro", "Plné REST API + 300 API kreditů / měsíc", "Text až 100 000 znaků", "Neomezená dávka", "Neomezené šablony", "Soubory až 5 GB", "5 týmových míst", "Prioritní podpora", "Vlastní fakturace"],
  },
};

export function getPlanFeatures(locale: Locale): PlanFeatures {
  return FEATURES[locale] ?? en;
}
