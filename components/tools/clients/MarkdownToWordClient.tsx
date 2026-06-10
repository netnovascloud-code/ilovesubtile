"use client";

import { useState } from "react";
import { FileText, Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { buildDocx } from "@/lib/docx-writer";
import { useLocale } from "@/hooks/useLocale";

const T: Record<string, Record<string, string>> = {
  en: {
    loadFile: "Load a .md file",
    characters: "characters",
    placeholder: "Paste your Markdown here…",
    downloadDocx: "Download .docx",
    hint: "Headings, lists, blockquotes and inline emphasis are converted to a clean, editable Word document — built entirely in your browser.",
    buildError: "Could not build the document: ",
  },
  fr: {
    loadFile: "Charger un fichier .md",
    characters: "caractères",
    placeholder: "Collez votre Markdown ici…",
    downloadDocx: "Télécharger .docx",
    hint: "Les titres, listes, citations et mises en forme inline sont convertis en un document Word propre et éditable — construit entièrement dans votre navigateur.",
    buildError: "Impossible de créer le document : ",
  },
  es: {
    loadFile: "Cargar un archivo .md",
    characters: "caracteres",
    placeholder: "Pega tu Markdown aquí…",
    downloadDocx: "Descargar .docx",
    hint: "Los encabezados, listas, citas y énfasis en línea se convierten en un documento Word limpio y editable — construido completamente en tu navegador.",
    buildError: "No se pudo crear el documento: ",
  },
  pt: {
    loadFile: "Carregar um ficheiro .md",
    characters: "caracteres",
    placeholder: "Cole o seu Markdown aqui…",
    downloadDocx: "Transferir .docx",
    hint: "Títulos, listas, citações e ênfases em linha são convertidos num documento Word limpo e editável — construído inteiramente no seu navegador.",
    buildError: "Não foi possível criar o documento: ",
  },
  de: {
    loadFile: "Eine .md-Datei laden",
    characters: "Zeichen",
    placeholder: "Markdown hier einfügen…",
    downloadDocx: ".docx herunterladen",
    hint: "Überschriften, Listen, Blockzitate und Inline-Betonungen werden in ein sauberes, bearbeitbares Word-Dokument umgewandelt — vollständig in Ihrem Browser erstellt.",
    buildError: "Das Dokument konnte nicht erstellt werden: ",
  },
  it: {
    loadFile: "Carica un file .md",
    characters: "caratteri",
    placeholder: "Incolla il tuo Markdown qui…",
    downloadDocx: "Scarica .docx",
    hint: "Titoli, elenchi, citazioni in blocco e enfasi inline vengono convertiti in un documento Word pulito e modificabile — costruito interamente nel browser.",
    buildError: "Impossibile creare il documento: ",
  },
  nl: {
    loadFile: "Laad een .md-bestand",
    characters: "tekens",
    placeholder: "Plak hier uw Markdown…",
    downloadDocx: ".docx downloaden",
    hint: "Koppen, lijsten, blokcitaten en inline nadruk worden omgezet in een schoon, bewerkbaar Word-document — volledig in uw browser gebouwd.",
    buildError: "Kon het document niet aanmaken: ",
  },
  ja: {
    loadFile: ".mdファイルを読み込む",
    characters: "文字",
    placeholder: "Markdownをここに貼り付けてください…",
    downloadDocx: ".docxをダウンロード",
    hint: "見出し、リスト、ブロック引用、インライン強調がクリーンな編集可能なWordドキュメントに変換されます — ブラウザ内で完全に構築されます。",
    buildError: "ドキュメントを作成できませんでした: ",
  },
  zh: {
    loadFile: "加载 .md 文件",
    characters: "字符",
    placeholder: "在此粘贴您的 Markdown…",
    downloadDocx: "下载 .docx",
    hint: "标题、列表、块引用和内联强调将转换为干净、可编辑的 Word 文档 — 完全在您的浏览器中构建。",
    buildError: "无法创建文档：",
  },
  ko: {
    loadFile: ".md 파일 불러오기",
    characters: "자",
    placeholder: "여기에 Markdown을 붙여넣으세요…",
    downloadDocx: ".docx 다운로드",
    hint: "제목, 목록, 인용 블록 및 인라인 강조가 깔끔하고 편집 가능한 Word 문서로 변환됩니다 — 완전히 브라우저에서 빌드됩니다.",
    buildError: "문서를 만들 수 없습니다: ",
  },
  ar: {
    loadFile: "تحميل ملف .md",
    characters: "حرف",
    placeholder: "الصق Markdown هنا…",
    downloadDocx: "تنزيل .docx",
    hint: "يتم تحويل العناوين والقوائم والاقتباسات المجمّعة والتأكيدات المضمّنة إلى مستند Word نظيف وقابل للتعديل — مبني بالكامل في متصفحك.",
    buildError: "تعذر إنشاء المستند: ",
  },
  ru: {
    loadFile: "Загрузить файл .md",
    characters: "символов",
    placeholder: "Вставьте Markdown сюда…",
    downloadDocx: "Скачать .docx",
    hint: "Заголовки, списки, блок-цитаты и встроенное выделение преобразуются в чистый редактируемый документ Word — полностью в вашем браузере.",
    buildError: "Не удалось создать документ: ",
  },
  hi: {
    loadFile: ".md फ़ाइल लोड करें",
    characters: "अक्षर",
    placeholder: "अपना Markdown यहाँ चिपकाएँ…",
    downloadDocx: ".docx डाउनलोड करें",
    hint: "शीर्षक, सूचियाँ, ब्लॉककोट और इनलाइन जोर एक स्वच्छ, संपादन योग्य Word दस्तावेज़ में परिवर्तित होते हैं — पूरी तरह से आपके ब्राउज़र में बनाया गया।",
    buildError: "दस्तावेज़ नहीं बनाया जा सका: ",
  },
  tr: {
    loadFile: "Bir .md dosyası yükle",
    characters: "karakter",
    placeholder: "Markdown'ınızı buraya yapıştırın…",
    downloadDocx: ".docx indir",
    hint: "Başlıklar, listeler, blok alıntılar ve satır içi vurgu temiz, düzenlenebilir bir Word belgesine dönüştürülür — tamamen tarayıcınızda oluşturulur.",
    buildError: "Belge oluşturulamadı: ",
  },
  id: {
    loadFile: "Muat file .md",
    characters: "karakter",
    placeholder: "Tempel Markdown Anda di sini…",
    downloadDocx: "Unduh .docx",
    hint: "Judul, daftar, kutipan blok, dan penekanan inline diubah menjadi dokumen Word yang bersih dan dapat diedit — dibangun sepenuhnya di browser Anda.",
    buildError: "Tidak dapat membuat dokumen: ",
  },
  vi: {
    loadFile: "Tải tệp .md",
    characters: "ký tự",
    placeholder: "Dán Markdown của bạn vào đây…",
    downloadDocx: "Tải xuống .docx",
    hint: "Tiêu đề, danh sách, trích dẫn khối và nhấn mạnh nội tuyến được chuyển đổi thành tài liệu Word sạch, có thể chỉnh sửa — được xây dựng hoàn toàn trong trình duyệt của bạn.",
    buildError: "Không thể tạo tài liệu: ",
  },
  sv: {
    loadFile: "Ladda en .md-fil",
    characters: "tecken",
    placeholder: "Klistra in din Markdown här…",
    downloadDocx: "Ladda ner .docx",
    hint: "Rubriker, listor, blockcitat och inline-betoning konverteras till ett rent, redigerbart Word-dokument — byggt helt i din webbläsare.",
    buildError: "Kunde inte skapa dokumentet: ",
  },
  pl: {
    loadFile: "Załaduj plik .md",
    characters: "znaków",
    placeholder: "Wklej tutaj swój Markdown…",
    downloadDocx: "Pobierz .docx",
    hint: "Nagłówki, listy, cytaty blokowe i wyróżnienia w wierszu są konwertowane na czysty, edytowalny dokument Word — zbudowany w całości w przeglądarce.",
    buildError: "Nie można utworzyć dokumentu: ",
  },
  uk: {
    loadFile: "Завантажити файл .md",
    characters: "символів",
    placeholder: "Вставте Markdown сюди…",
    downloadDocx: "Завантажити .docx",
    hint: "Заголовки, списки, блок-цитати та вбудоване виділення перетворюються на чистий редагований документ Word — повністю у вашому браузері.",
    buildError: "Не вдалося створити документ: ",
  },
  cs: {
    loadFile: "Načíst soubor .md",
    characters: "znaků",
    placeholder: "Vložte sem Markdown…",
    downloadDocx: "Stáhnout .docx",
    hint: "Nadpisy, seznamy, blokové citace a inline důrazy jsou převedeny na čistý, upravitelný dokument Word — vytvořený celý ve vašem prohlížeči.",
    buildError: "Dokument se nepodařilo vytvořit: ",
  },
};

const SAMPLE = `# Project Brief

## Overview
This document is **converted to Word** from Markdown, entirely in your browser.

## Goals
- Ship the new landing page
- Improve Core Web Vitals
- Add the pricing table

## Notes
See the [docs](https://example.com) for details.`;

/** Flatten markdown into plain lines + a set of heading line-indexes for buildDocx. */
function markdownToLines(md: string): { lines: string[]; headings: Set<number> } {
  const lines: string[] = [];
  const headings = new Set<number>();
  let inFence = false;
  for (const rawLine of md.replace(/\r\n/g, "\n").split("\n")) {
    let line = rawLine;
    if (/^```/.test(line.trim())) { inFence = !inFence; continue; }
    if (inFence) { lines.push(line); continue; }

    const h = /^(#{1,6})\s+(.*)$/.exec(line);
    if (h) { headings.add(lines.length); lines.push(stripInline(h[2])); continue; }

    // Bullet / numbered lists → "• " prefix.
    const ul = /^\s*[-*+]\s+(.*)$/.exec(line);
    const ol = /^\s*\d+\.\s+(.*)$/.exec(line);
    if (ul) { lines.push("•  " + stripInline(ul[1])); continue; }
    if (ol) { lines.push("•  " + stripInline(ol[1])); continue; }

    if (/^\s*>/.test(line)) { lines.push(stripInline(line.replace(/^\s*>\s?/, ""))); continue; }
    if (/^\s*([-*_])\1{2,}\s*$/.test(line)) { lines.push("———"); continue; } // hr

    lines.push(stripInline(line));
  }
  return { lines, headings };
}

/** Strip inline markdown markers, keeping the visible text (link text, no URL). */
function stripInline(s: string): string {
  return s
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1")     // images → alt text
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")        // links → text
    .replace(/(\*\*|__)(.*?)\1/g, "$2")             // bold
    .replace(/(\*|_)(.*?)\1/g, "$2")                 // italic
    .replace(/`([^`]+)`/g, "$1")                     // inline code
    .trim();
}

export function MarkdownToWordClient() {
  const locale = useLocale();
  const s = T[locale] ?? T.en;

  const [md, setMd] = useState(SAMPLE);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function generate() {
    setBusy(true); setError(null);
    try {
      const { lines, headings } = markdownToLines(md);
      const blob = await buildDocx(lines, headings);
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url; a.download = "document.docx";
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 4000);
    } catch (e) {
      setError(`${s.buildError}${(e as Error).message}`);
    } finally {
      setBusy(false);
    }
  }

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (f) setMd(await f.text());
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <label className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-ink-200 bg-white px-3 py-2 text-xs font-medium text-ink-700 hover:border-brand-300">
          <FileText className="h-4 w-4" /> {s.loadFile}
          <input type="file" accept=".md,.markdown,text/markdown,text/plain" onChange={onFile} className="hidden" />
        </label>
        <span className="text-xs text-ink-400">{md.length.toLocaleString()} {s.characters}</span>
      </div>

      <textarea
        value={md} onChange={(e) => setMd(e.target.value)} spellCheck={false}
        className="h-72 w-full rounded-lg border border-ink-200 bg-white p-3 font-mono text-sm text-ink-900 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100"
        placeholder={s.placeholder}
      />

      {error && <p className="rounded border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</p>}

      <Button onClick={generate} disabled={busy || !md.trim()} size="lg">
        {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
        {s.downloadDocx}
      </Button>

      <p className="text-xs text-ink-400">
        {s.hint}
      </p>
    </div>
  );
}
