"use client";

import { useState } from "react";
import { Upload, Download, X, Loader2, Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatBytes } from "@/lib/utils";
import { LANGUAGES, type LanguageCode } from "@/lib/languages";
import { callTool } from "@/lib/tool-api";
import { QuotaReachedModal, type QuotaReason } from "@/components/billing/QuotaReachedModal";
import { useLocale } from "@/hooks/useLocale";

/**
 * Translate Document (DOCX) with layout preserved — Part 11 "moat".
 * DOCX is a ZIP of XML. We rewrite every `<w:t>` text node in `word/document.xml`
 * (the body) and `word/header*.xml` / `word/footer*.xml` (running heads/feet),
 * leaving every run-property, paragraph-property and image untouched. Result:
 * fonts, sizes, colours, headings, tables, lists, page breaks — all preserved.
 *
 * Translation is batched: we collect every text node into one list, send it to
 * the AI in chunks of ~80 strings using a delimiter the model is told never to
 * emit, then splice the translations back into the XML in order.
 */

const T: Record<string, Record<string, string>> = {
  en: {
    uploadLabel: "Upload your Word document",
    uploadHint: ".docx — fonts, headings, tables and images stay intact",
    translateInto: "Translate into",
    translating: "Translating…",
    translateBtn: "Translate document",
    download: "Download",
    readingDoc: "Reading document…",
    rebuildingDocx: "Rebuilding .docx…",
    done: "Done",
    noDocXml: "This file doesn't look like a Word .docx (no word/document.xml inside).",
    noText: "No text to translate was found.",
    translationFailed: "Translation failed.",
    privacy: "Translates every paragraph, heading, table cell, header and footer while preserving fonts, sizes, colours, lists and images. Long documents are translated in chunks of {CHUNK} runs each — large files may need a few AI calls (Pro 500/mo, Business 3,000/mo).",
  },
  fr: {
    uploadLabel: "Téléverser votre document Word",
    uploadHint: ".docx — polices, titres, tableaux et images conservés",
    translateInto: "Traduire en",
    translating: "Traduction…",
    translateBtn: "Traduire le document",
    download: "Télécharger",
    readingDoc: "Lecture du document…",
    rebuildingDocx: "Reconstruction du .docx…",
    done: "Terminé",
    noDocXml: "Ce fichier ne semble pas être un .docx Word (pas de word/document.xml à l'intérieur).",
    noText: "Aucun texte à traduire n'a été trouvé.",
    translationFailed: "Traduction échouée.",
    privacy: "Traduit chaque paragraphe, titre, cellule de tableau, en-tête et pied de page tout en préservant les polices, tailles, couleurs, listes et images. Les documents longs sont traduits par blocs de {CHUNK} segments — les fichiers volumineux peuvent nécessiter plusieurs appels IA (Pro 500/mois, Business 3 000/mois).",
  },
  es: {
    uploadLabel: "Sube tu documento Word",
    uploadHint: ".docx — fuentes, encabezados, tablas e imágenes se conservan",
    translateInto: "Traducir a",
    translating: "Traduciendo…",
    translateBtn: "Traducir documento",
    download: "Descargar",
    readingDoc: "Leyendo el documento…",
    rebuildingDocx: "Reconstruyendo .docx…",
    done: "Listo",
    noDocXml: "Este archivo no parece ser un .docx de Word (no hay word/document.xml dentro).",
    noText: "No se encontró texto para traducir.",
    translationFailed: "Traducción fallida.",
    privacy: "Traduce cada párrafo, encabezado, celda de tabla, cabecera y pie de página preservando fuentes, tamaños, colores, listas e imágenes. Los documentos largos se traducen en bloques de {CHUNK} segmentos — los archivos grandes pueden necesitar varias llamadas IA (Pro 500/mes, Business 3.000/mes).",
  },
  pt: {
    uploadLabel: "Carregue o seu documento Word",
    uploadHint: ".docx — tipos de letra, títulos, tabelas e imagens mantidos",
    translateInto: "Traduzir para",
    translating: "A traduzir…",
    translateBtn: "Traduzir documento",
    download: "Transferir",
    readingDoc: "A ler o documento…",
    rebuildingDocx: "A reconstruir .docx…",
    done: "Concluído",
    noDocXml: "Este ficheiro não parece ser um .docx do Word (sem word/document.xml no interior).",
    noText: "Não foi encontrado texto para traduzir.",
    translationFailed: "Tradução falhou.",
    privacy: "Traduz cada parágrafo, título, célula de tabela, cabeçalho e rodapé preservando tipos de letra, tamanhos, cores, listas e imagens. Documentos longos são traduzidos em blocos de {CHUNK} segmentos — ficheiros grandes podem precisar de algumas chamadas à IA (Pro 500/mês, Business 3.000/mês).",
  },
  de: {
    uploadLabel: "Word-Dokument hochladen",
    uploadHint: ".docx — Schriften, Überschriften, Tabellen und Bilder bleiben erhalten",
    translateInto: "Übersetzen nach",
    translating: "Übersetzen…",
    translateBtn: "Dokument übersetzen",
    download: "Herunterladen",
    readingDoc: "Dokument wird gelesen…",
    rebuildingDocx: ".docx wird neu erstellt…",
    done: "Fertig",
    noDocXml: "Diese Datei sieht nicht wie ein Word .docx aus (kein word/document.xml vorhanden).",
    noText: "Kein zu übersetzender Text gefunden.",
    translationFailed: "Übersetzung fehlgeschlagen.",
    privacy: "Übersetzt jeden Absatz, jede Überschrift, Tabellenzelle, Kopf- und Fußzeile und bewahrt dabei Schriften, Größen, Farben, Listen und Bilder. Lange Dokumente werden in Blöcken von je {CHUNK} Segmenten übersetzt — große Dateien benötigen möglicherweise mehrere KI-Aufrufe (Pro 500/Monat, Business 3.000/Monat).",
  },
  it: {
    uploadLabel: "Carica il tuo documento Word",
    uploadHint: ".docx — font, intestazioni, tabelle e immagini conservati",
    translateInto: "Traduci in",
    translating: "Traduzione…",
    translateBtn: "Traduci documento",
    download: "Scarica",
    readingDoc: "Lettura del documento…",
    rebuildingDocx: "Ricostruzione del .docx…",
    done: "Fatto",
    noDocXml: "Questo file non sembra essere un .docx di Word (nessun word/document.xml al suo interno).",
    noText: "Non è stato trovato testo da tradurre.",
    translationFailed: "Traduzione fallita.",
    privacy: "Traduce ogni paragrafo, intestazione, cella di tabella, intestazione e piè di pagina preservando font, dimensioni, colori, elenchi e immagini. I documenti lunghi vengono tradotti in blocchi da {CHUNK} segmenti — i file grandi potrebbero richiedere alcune chiamate IA (Pro 500/mese, Business 3.000/mese).",
  },
  nl: {
    uploadLabel: "Uw Word-document uploaden",
    uploadHint: ".docx — lettertypen, koppen, tabellen en afbeeldingen blijven intact",
    translateInto: "Vertalen naar",
    translating: "Vertalen…",
    translateBtn: "Document vertalen",
    download: "Downloaden",
    readingDoc: "Document lezen…",
    rebuildingDocx: ".docx opnieuw opbouwen…",
    done: "Klaar",
    noDocXml: "Dit bestand ziet er niet uit als een Word .docx (geen word/document.xml erin).",
    noText: "Er is geen te vertalen tekst gevonden.",
    translationFailed: "Vertaling mislukt.",
    privacy: "Vertaalt elke alinea, kop, tabelcel, koptekst en voettekst met behoud van lettertypen, groottes, kleuren, lijsten en afbeeldingen. Lange documenten worden vertaald in blokken van {CHUNK} segmenten — grote bestanden hebben mogelijk meerdere AI-aanroepen nodig (Pro 500/mnd, Business 3.000/mnd).",
  },
  ja: {
    uploadLabel: "Wordドキュメントをアップロード",
    uploadHint: ".docx — フォント、見出し、表、画像はそのまま保持",
    translateInto: "翻訳先",
    translating: "翻訳中…",
    translateBtn: "ドキュメントを翻訳",
    download: "ダウンロード",
    readingDoc: "ドキュメントを読み込み中…",
    rebuildingDocx: ".docxを再構築中…",
    done: "完了",
    noDocXml: "このファイルはWord .docxではないようです（word/document.xmlがありません）。",
    noText: "翻訳するテキストが見つかりませんでした。",
    translationFailed: "翻訳に失敗しました。",
    privacy: "フォント、サイズ、色、リスト、画像を保持しながら、すべての段落、見出し、表セル、ヘッダー、フッターを翻訳します。長いドキュメントは{CHUNK}セグメントのブロックで翻訳されます — 大きなファイルは複数のAI呼び出しが必要な場合があります（Pro 500回/月、Business 3,000回/月）。",
  },
  zh: {
    uploadLabel: "上传您的Word文档",
    uploadHint: ".docx — 字体、标题、表格和图片保持不变",
    translateInto: "翻译为",
    translating: "正在翻译…",
    translateBtn: "翻译文档",
    download: "下载",
    readingDoc: "正在读取文档…",
    rebuildingDocx: "正在重建 .docx…",
    done: "完成",
    noDocXml: "此文件看起来不像Word .docx（内部没有word/document.xml）。",
    noText: "未找到要翻译的文本。",
    translationFailed: "翻译失败。",
    privacy: "在保留字体、大小、颜色、列表和图片的同时翻译每个段落、标题、表格单元格、页眉和页脚。长文档以{CHUNK}段为一块进行翻译 — 大文件可能需要多次AI调用（Pro每月500次，Business每月3,000次）。",
  },
  ko: {
    uploadLabel: "Word 문서 업로드",
    uploadHint: ".docx — 글꼴, 제목, 표 및 이미지 유지",
    translateInto: "번역 대상",
    translating: "번역 중…",
    translateBtn: "문서 번역",
    download: "다운로드",
    readingDoc: "문서 읽는 중…",
    rebuildingDocx: ".docx 재구성 중…",
    done: "완료",
    noDocXml: "이 파일은 Word .docx처럼 보이지 않습니다(내부에 word/document.xml이 없음).",
    noText: "번역할 텍스트를 찾을 수 없습니다.",
    translationFailed: "번역 실패.",
    privacy: "글꼴, 크기, 색상, 목록 및 이미지를 유지하면서 모든 단락, 제목, 표 셀, 헤더 및 푸터를 번역합니다. 긴 문서는 {CHUNK}개 세그먼트씩 번역됩니다 — 큰 파일은 여러 번 AI 호출이 필요할 수 있습니다(Pro 월 500회, Business 월 3,000회).",
  },
  ar: {
    uploadLabel: "ارفع مستند Word الخاص بك",
    uploadHint: ".docx — تبقى الخطوط والعناوين والجداول والصور سليمة",
    translateInto: "ترجمة إلى",
    translating: "جاري الترجمة…",
    translateBtn: "ترجمة المستند",
    download: "تنزيل",
    readingDoc: "جاري قراءة المستند…",
    rebuildingDocx: "جاري إعادة بناء .docx…",
    done: "تم",
    noDocXml: "لا يبدو هذا الملف كملف .docx من Word (لا يوجد word/document.xml بداخله).",
    noText: "لم يُعثر على نص للترجمة.",
    translationFailed: "فشلت الترجمة.",
    privacy: "يترجم كل فقرة وعنوان وخلية جدول ورأس وتذييل مع الحفاظ على الخطوط والأحجام والألوان والقوائم والصور. تُترجم المستندات الطويلة على دفعات من {CHUNK} مقطعاً — قد تحتاج الملفات الكبيرة إلى عدة استدعاءات للذكاء الاصطناعي (Pro 500/شهر، Business 3,000/شهر).",
  },
  ru: {
    uploadLabel: "Загрузить документ Word",
    uploadHint: ".docx — шрифты, заголовки, таблицы и изображения сохраняются",
    translateInto: "Перевести на",
    translating: "Перевод…",
    translateBtn: "Перевести документ",
    download: "Скачать",
    readingDoc: "Чтение документа…",
    rebuildingDocx: "Пересборка .docx…",
    done: "Готово",
    noDocXml: "Этот файл не похож на Word .docx (внутри нет word/document.xml).",
    noText: "Текст для перевода не найден.",
    translationFailed: "Перевод не выполнен.",
    privacy: "Переводит каждый абзац, заголовок, ячейку таблицы, верхний и нижний колонтитул с сохранением шрифтов, размеров, цветов, списков и изображений. Длинные документы переводятся блоками по {CHUNK} сегментов — большие файлы могут потребовать нескольких вызовов ИИ (Pro 500/мес, Business 3 000/мес).",
  },
  hi: {
    uploadLabel: "अपना Word दस्तावेज़ अपलोड करें",
    uploadHint: ".docx — फ़ॉन्ट, शीर्षक, तालिकाएं और छवियां बरकरार रहती हैं",
    translateInto: "अनुवाद करें",
    translating: "अनुवाद हो रहा है…",
    translateBtn: "दस्तावेज़ अनुवाद करें",
    download: "डाउनलोड",
    readingDoc: "दस्तावेज़ पढ़ा जा रहा है…",
    rebuildingDocx: ".docx पुनर्निर्माण…",
    done: "पूर्ण",
    noDocXml: "यह फ़ाइल Word .docx नहीं लगती (अंदर कोई word/document.xml नहीं)।",
    noText: "अनुवाद के लिए कोई टेक्स्ट नहीं मिला।",
    translationFailed: "अनुवाद विफल।",
    privacy: "फ़ॉन्ट, आकार, रंग, सूचियां और छवियां बनाए रखते हुए प्रत्येक पैराग्राफ, शीर्षक, तालिका सेल, हेडर और फुटर का अनुवाद करता है। लंबे दस्तावेज़ों का {CHUNK} सेगमेंट के ब्लॉक में अनुवाद होता है — बड़ी फ़ाइलों को कई AI कॉल की आवश्यकता हो सकती है (Pro 500/माह, Business 3,000/माह)।",
  },
  tr: {
    uploadLabel: "Word belgenizi yükleyin",
    uploadHint: ".docx — yazı tipleri, başlıklar, tablolar ve resimler korunur",
    translateInto: "Şu dile çevir:",
    translating: "Çevriliyor…",
    translateBtn: "Belgeyi çevir",
    download: "İndir",
    readingDoc: "Belge okunuyor…",
    rebuildingDocx: ".docx yeniden oluşturuluyor…",
    done: "Tamamlandı",
    noDocXml: "Bu dosya Word .docx gibi görünmüyor (içinde word/document.xml yok).",
    noText: "Çevrilecek metin bulunamadı.",
    translationFailed: "Çeviri başarısız.",
    privacy: "Yazı tiplerini, boyutları, renkleri, listeleri ve resimleri korurken her paragrafı, başlığı, tablo hücresini, üst bilgiyi ve alt bilgiyi çevirir. Uzun belgeler {CHUNK} bölümlük bloklara bölünerek çevrilir — büyük dosyalar birkaç AI çağrısı gerektirebilir (Pro 500/ay, Business 3.000/ay).",
  },
  id: {
    uploadLabel: "Unggah dokumen Word Anda",
    uploadHint: ".docx — font, judul, tabel, dan gambar tetap utuh",
    translateInto: "Terjemahkan ke",
    translating: "Menerjemahkan…",
    translateBtn: "Terjemahkan dokumen",
    download: "Unduh",
    readingDoc: "Membaca dokumen…",
    rebuildingDocx: "Membangun ulang .docx…",
    done: "Selesai",
    noDocXml: "File ini tidak terlihat seperti Word .docx (tidak ada word/document.xml di dalamnya).",
    noText: "Tidak ada teks untuk diterjemahkan.",
    translationFailed: "Terjemahan gagal.",
    privacy: "Menerjemahkan setiap paragraf, judul, sel tabel, header dan footer sambil mempertahankan font, ukuran, warna, daftar, dan gambar. Dokumen panjang diterjemahkan dalam blok {CHUNK} segmen — file besar mungkin memerlukan beberapa panggilan AI (Pro 500/bln, Business 3.000/bln).",
  },
  vi: {
    uploadLabel: "Tải lên tài liệu Word của bạn",
    uploadHint: ".docx — phông chữ, tiêu đề, bảng và hình ảnh được giữ nguyên",
    translateInto: "Dịch sang",
    translating: "Đang dịch…",
    translateBtn: "Dịch tài liệu",
    download: "Tải xuống",
    readingDoc: "Đang đọc tài liệu…",
    rebuildingDocx: "Đang xây dựng lại .docx…",
    done: "Hoàn thành",
    noDocXml: "Tệp này trông không phải là Word .docx (không có word/document.xml bên trong).",
    noText: "Không tìm thấy văn bản cần dịch.",
    translationFailed: "Dịch thất bại.",
    privacy: "Dịch mọi đoạn văn, tiêu đề, ô bảng, đầu trang và chân trang trong khi bảo toàn phông chữ, kích thước, màu sắc, danh sách và hình ảnh. Tài liệu dài được dịch theo từng khối {CHUNK} đoạn — tệp lớn có thể cần một vài lần gọi AI (Pro 500/tháng, Business 3.000/tháng).",
  },
  sv: {
    uploadLabel: "Ladda upp ditt Word-dokument",
    uploadHint: ".docx — teckensnitt, rubriker, tabeller och bilder bibehålls",
    translateInto: "Översätt till",
    translating: "Översätter…",
    translateBtn: "Översätt dokument",
    download: "Ladda ner",
    readingDoc: "Läser dokument…",
    rebuildingDocx: "Bygger om .docx…",
    done: "Klar",
    noDocXml: "Filen verkar inte vara ett Word .docx (inget word/document.xml inuti).",
    noText: "Ingen text att översätta hittades.",
    translationFailed: "Översättning misslyckades.",
    privacy: "Översätter varje stycke, rubrik, tabellcell, sidhuvud och sidfot och bevarar teckensnitt, storlekar, färger, listor och bilder. Långa dokument översätts i block på {CHUNK} segment vardera — stora filer kan behöva ett par AI-anrop (Pro 500/mån, Business 3 000/mån).",
  },
  pl: {
    uploadLabel: "Prześlij swój dokument Word",
    uploadHint: ".docx — czcionki, nagłówki, tabele i obrazy pozostają nienaruszone",
    translateInto: "Przetłumacz na",
    translating: "Tłumaczenie…",
    translateBtn: "Przetłumacz dokument",
    download: "Pobierz",
    readingDoc: "Odczytywanie dokumentu…",
    rebuildingDocx: "Przebudowywanie .docx…",
    done: "Gotowe",
    noDocXml: "Ten plik nie wygląda jak Word .docx (brak word/document.xml w środku).",
    noText: "Nie znaleziono tekstu do przetłumaczenia.",
    translationFailed: "Tłumaczenie nie powiodło się.",
    privacy: "Tłumaczy każdy akapit, nagłówek, komórkę tabeli, nagłówek i stopkę, zachowując czcionki, rozmiary, kolory, listy i obrazy. Długie dokumenty są tłumaczone w blokach po {CHUNK} segmentów — duże pliki mogą wymagać kilku wywołań AI (Pro 500/mies., Business 3 000/mies.).",
  },
  uk: {
    uploadLabel: "Завантажте свій документ Word",
    uploadHint: ".docx — шрифти, заголовки, таблиці та зображення зберігаються",
    translateInto: "Перекласти на",
    translating: "Переклад…",
    translateBtn: "Перекласти документ",
    download: "Завантажити",
    readingDoc: "Читання документа…",
    rebuildingDocx: "Відновлення .docx…",
    done: "Готово",
    noDocXml: "Цей файл не схожий на Word .docx (всередині немає word/document.xml).",
    noText: "Текст для перекладу не знайдено.",
    translationFailed: "Переклад не вдався.",
    privacy: "Перекладає кожен абзац, заголовок, комірку таблиці, верхній і нижній колонтитул зі збереженням шрифтів, розмірів, кольорів, списків і зображень. Довгі документи перекладаються блоками по {CHUNK} сегментів — великі файли можуть потребувати кількох викликів ШІ (Pro 500/міс, Business 3 000/міс).",
  },
  cs: {
    uploadLabel: "Nahrát váš dokument Word",
    uploadHint: ".docx — písma, nadpisy, tabulky a obrázky zůstávají zachovány",
    translateInto: "Přeložit do",
    translating: "Překlad…",
    translateBtn: "Přeložit dokument",
    download: "Stáhnout",
    readingDoc: "Čtení dokumentu…",
    rebuildingDocx: "Přestavba .docx…",
    done: "Hotovo",
    noDocXml: "Tento soubor nevypadá jako Word .docx (uvnitř není žádný word/document.xml).",
    noText: "Nebyl nalezen žádný text k přeložení.",
    translationFailed: "Překlad se nezdařil.",
    privacy: "Překládá každý odstavec, nadpis, buňku tabulky, záhlaví a zápatí a přitom zachovává písma, velikosti, barvy, seznamy a obrázky. Dlouhé dokumenty jsou překládány po blocích {CHUNK} segmentů — velké soubory mohou vyžadovat několik volání AI (Pro 500/měs., Business 3 000/měs.).",
  },
};

// Pick a delimiter no normal document text contains so we can re-split safely.
const DELIM = "<<<¶KONVER_NEXT§>>>";
const CHUNK = 80; // strings per AI call

function chunked<T>(xs: T[], n: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < xs.length; i += n) out.push(xs.slice(i, i + n));
  return out;
}

// Extract <w:t>…</w:t> contents in document order, then return a rewriter that
// splices new contents back into the same byte ranges. We deliberately keep
// the surrounding markup (xml:space="preserve" etc.) intact.
function extractTexts(xml: string): { items: string[]; rebuild: (translated: string[]) => string } {
  const re = /(<w:t(?:\s[^>]*)?>)([\s\S]*?)(<\/w:t>)/g;
  const items: string[] = [];
  const idxs: { open: string; close: string; start: number; end: number }[] = [];
  let m: RegExpExecArray | null;
  while ((m = re.exec(xml)) !== null) {
    items.push(decodeXml(m[2]));
    idxs.push({ open: m[1], close: m[3], start: m.index, end: m.index + m[0].length });
  }
  return {
    items,
    rebuild: (translated) => {
      let out = "";
      let cursor = 0;
      for (let i = 0; i < idxs.length; i++) {
        const { open, close, start, end } = idxs[i];
        out += xml.slice(cursor, start);
        out += open + encodeXml(translated[i] ?? items[i]) + close;
        cursor = end;
      }
      out += xml.slice(cursor);
      return out;
    },
  };
}

function decodeXml(s: string): string {
  return s.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&apos;/g, "'");
}
function encodeXml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}

async function translateBatch(items: string[], target: string): Promise<string[]> {
  // Tag each item with a stable index so the model can't quietly drop one and
  // shift the rest. We re-split on the index marker and tolerate model drift.
  const joined = items.map((s, i) => `[${i + 1}]${s}${DELIM}`).join("\n");
  const sys =
    `Translate each tagged segment below into ${target} so it reads naturally. ` +
    `Each segment is prefixed by [N] and ends with the literal marker ${DELIM}. ` +
    `KEEP the [N] prefix and the ${DELIM} marker exactly. ` +
    `Never merge segments, never reorder, never add commentary. ` +
    `If a segment is whitespace-only or already in ${target}, keep it as-is (with its prefix/marker).`;
  const res = await callTool("translate-document-with-layout", { task: "translate", text: `${sys}\n\n${joined}`, options: { target } });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err: Error & { quota?: { kind: "daily" | "monthly"; limit: number; used: number; resetAt: string | null } } = new Error(data.error ?? "translation_failed");
    if (data.error === "daily_limit" || data.error === "monthly_limit") {
      err.quota = { kind: data.error === "monthly_limit" ? "monthly" : "daily", limit: data.limit ?? 0, used: data.used ?? 0, resetAt: data.resetAt ?? null };
    }
    throw err;
  }
  const out = String(data.output ?? "");
  // Recover by [N] index — robust against the model dropping the trailing marker
  // on the last segment, or swallowing one in the middle.
  const result: string[] = items.slice();
  const tagged = out.split(/\[(\d+)\]/);
  for (let k = 1; k < tagged.length; k += 2) {
    const n = parseInt(tagged[k], 10);
    let value = tagged[k + 1] ?? "";
    const delimAt = value.indexOf(DELIM);
    if (delimAt >= 0) value = value.slice(0, delimAt);
    // Strip any leading newline left over from the join.
    value = value.replace(/^\r?\n/, "").replace(/\r?\n$/, "");
    if (n >= 1 && n <= items.length) result[n - 1] = value;
  }
  return result;
}

export function TranslateDocumentClient() {
  const locale = useLocale();
  const s = T[locale] ?? T.en;

  const [file, setFile] = useState<File | null>(null);
  const [target, setTarget] = useState<LanguageCode>("ES");
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [outUrl, setOutUrl] = useState<string | null>(null);
  const [outName, setOutName] = useState("translated.docx");
  const [outSize, setOutSize] = useState(0);
  const [quotaReason, setQuotaReason] = useState<QuotaReason | null>(null);

  async function run() {
    if (!file || busy) return;
    setBusy(true); setError(null); setOutUrl(null); setProgress(0); setPhase(s.readingDoc);
    try {
      const { default: JSZip } = await import("jszip");
      const zip = await JSZip.loadAsync(await file.arrayBuffer());
      // Targets: body + every header/footer XML part.
      const targets: string[] = [];
      zip.forEach((path) => {
        if (path === "word/document.xml" || /^word\/(header|footer)\d*\.xml$/.test(path)) targets.push(path);
      });
      if (!targets.length) {
        setError(s.noDocXml);
        setBusy(false); return;
      }

      // Gather every <w:t> across every target XML so we can batch globally.
      const slices: { path: string; items: string[]; rebuild: (t: string[]) => string }[] = [];
      const flat: string[] = [];
      for (const p of targets) {
        const xml = await zip.file(p)!.async("string");
        const { items, rebuild } = extractTexts(xml);
        slices.push({ path: p, items, rebuild });
        flat.push(...items);
      }
      if (!flat.length) { setError(s.noText); setBusy(false); return; }

      // Translate the substantive items only (skip pure whitespace).
      const indexes: number[] = [];
      const payload: string[] = [];
      for (let i = 0; i < flat.length; i++) {
        if (flat[i].trim().length > 0) { indexes.push(i); payload.push(flat[i]); }
      }
      const translated = flat.slice();
      const lang = LANGUAGES.find((l) => l.code === target)?.english ?? target;
      const batches = chunked(payload, CHUNK);
      for (let b = 0; b < batches.length; b++) {
        setPhase(`Translating to ${lang} (chunk ${b + 1} / ${batches.length})…`);
        const tr = await translateBatch(batches[b], lang);
        for (let i = 0; i < tr.length; i++) translated[indexes[b * CHUNK + i]] = tr[i];
        setProgress(Math.round(((b + 1) / batches.length) * 100));
      }

      // Splice translations back into each part.
      setPhase(s.rebuildingDocx);
      let cursor = 0;
      for (const sl of slices) {
        const slice = translated.slice(cursor, cursor + sl.items.length);
        cursor += sl.items.length;
        zip.file(sl.path, sl.rebuild(slice));
      }
      const out = await zip.generateAsync({ type: "blob", mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" });
      const url = URL.createObjectURL(out);
      if (outUrl) URL.revokeObjectURL(outUrl);
      setOutUrl(url); setOutSize(out.size);
      setOutName(file.name.replace(/\.docx$/i, "") + `.${target.toLowerCase()}.docx`);
      setPhase(s.done); setProgress(100);
    } catch (e) {
      const q = (e as { quota?: QuotaReason }).quota;
      if (q) setQuotaReason(q);
      else setError(e instanceof Error ? e.message : s.translationFailed);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-4">
      {!file ? (
        <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-ink-200 bg-brand-50/30 px-6 py-12 text-center transition-colors hover:border-brand-300">
          <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-50 text-brand-600">
            <Upload className="h-5 w-5" />
          </span>
          <span className="mt-3 font-semibold text-ink-900">{s.uploadLabel}</span>
          <span className="mt-0.5 text-xs text-ink-400">{s.uploadHint}</span>
          <input type="file" accept=".docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document" className="hidden"
            onChange={(e) => { const f = e.target.files?.[0]; if (f) { setFile(f); setOutUrl(null); setError(null); setProgress(0); setPhase(""); } }} />
        </label>
      ) : (
        <div className="flex items-center justify-between rounded-lg border border-ink-100 bg-white px-4 py-2.5">
          <div className="min-w-0 truncate text-sm">
            <span className="font-medium text-ink-900">{file.name}</span>
            <span className="ml-2 text-ink-400">{formatBytes(file.size)}</span>
          </div>
          <button onClick={() => { setFile(null); setOutUrl(null); setError(null); setProgress(0); setPhase(""); }}
            className="rounded p-1 text-xs text-ink-400 hover:bg-ink-50 hover:text-ink-700">
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      <div className="flex flex-wrap items-end gap-3">
        <label className="flex flex-col text-xs font-medium text-ink-600">
          {s.translateInto}
          <select value={target} onChange={(e) => setTarget(e.target.value as LanguageCode)}
            className="mt-1 rounded-md border border-ink-200 bg-white px-3 py-2 text-sm text-ink-900 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100">
            {LANGUAGES.map((l) => <option key={l.code} value={l.code}>{l.native} ({l.code})</option>)}
          </select>
        </label>
        <Button onClick={run} disabled={!file || busy} size="lg">
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Languages className="h-4 w-4" />}
          {busy ? s.translating : s.translateBtn}
        </Button>
        {outUrl && (
          <a href={outUrl} download={outName}>
            <Button size="lg" variant="outline"><Download className="h-4 w-4" /> {s.download} · {formatBytes(outSize)}</Button>
          </a>
        )}
      </div>

      {busy && (
        <div className="rounded-lg border border-ink-100 bg-white p-3">
          <p className="text-sm text-ink-700">{phase}</p>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-ink-100">
            <div className="h-full rounded-full bg-brand-500 transition-all" style={{ width: `${progress}%` }} />
          </div>
        </div>
      )}

      {error && <p className="text-sm text-red-600">{error}</p>}
      <p className="text-xs text-ink-400">
        {s.privacy.replace("{CHUNK}", String(CHUNK))}
      </p>
      <QuotaReachedModal reason={quotaReason} onClose={() => setQuotaReason(null)} />
    </div>
  );
}
