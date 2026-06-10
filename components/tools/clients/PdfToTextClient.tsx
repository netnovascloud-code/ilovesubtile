"use client";

import { useState } from "react";
import { Upload, X, Download, Copy, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatBytes } from "@/lib/utils";
import { useLocale } from "@/hooks/useLocale";

const T: Record<string, Record<string, string>> = {
  en: {
    uploadPdf: "Upload a PDF",
    uploadHint: "Text is extracted in your browser",
    readingPdf: "Reading PDF…",
    progressHint: "first run downloads the PDF reader (~2MB) from CDN",
    copy: "Copy",
    copied: "Copied",
    downloadTxt: "Download .txt",
    characters: "characters",
    couldNotExtract: "Could not extract text: ",
    privacy: "Extracted 100% in your browser via pdfjs — your PDF is never uploaded.",
  },
  fr: {
    uploadPdf: "Télécharger un PDF",
    uploadHint: "Le texte est extrait dans votre navigateur",
    readingPdf: "Lecture du PDF…",
    progressHint: "le premier lancement télécharge le lecteur PDF (~2 Mo) depuis le CDN",
    copy: "Copier",
    copied: "Copié",
    downloadTxt: "Télécharger .txt",
    characters: "caractères",
    couldNotExtract: "Impossible d'extraire le texte : ",
    privacy: "Extrait 100 % dans votre navigateur via pdfjs — votre PDF n'est jamais envoyé.",
  },
  es: {
    uploadPdf: "Subir un PDF",
    uploadHint: "El texto se extrae en tu navegador",
    readingPdf: "Leyendo PDF…",
    progressHint: "la primera ejecución descarga el lector de PDF (~2 MB) desde CDN",
    copy: "Copiar",
    copied: "Copiado",
    downloadTxt: "Descargar .txt",
    characters: "caracteres",
    couldNotExtract: "No se pudo extraer el texto: ",
    privacy: "Extraído 100 % en tu navegador via pdfjs — tu PDF nunca se sube.",
  },
  pt: {
    uploadPdf: "Carregar um PDF",
    uploadHint: "O texto é extraído no seu navegador",
    readingPdf: "Lendo PDF…",
    progressHint: "a primeira execução baixa o leitor de PDF (~2 MB) do CDN",
    copy: "Copiar",
    copied: "Copiado",
    downloadTxt: "Baixar .txt",
    characters: "caracteres",
    couldNotExtract: "Não foi possível extrair o texto: ",
    privacy: "Extraído 100 % no seu navegador via pdfjs — seu PDF nunca é enviado.",
  },
  de: {
    uploadPdf: "PDF hochladen",
    uploadHint: "Text wird in Ihrem Browser extrahiert",
    readingPdf: "PDF wird gelesen…",
    progressHint: "Beim ersten Start wird der PDF-Reader (~2 MB) vom CDN geladen",
    copy: "Kopieren",
    copied: "Kopiert",
    downloadTxt: ".txt herunterladen",
    characters: "Zeichen",
    couldNotExtract: "Text konnte nicht extrahiert werden: ",
    privacy: "100 % im Browser über pdfjs extrahiert — Ihre PDF wird nie hochgeladen.",
  },
  it: {
    uploadPdf: "Carica un PDF",
    uploadHint: "Il testo viene estratto nel tuo browser",
    readingPdf: "Lettura PDF…",
    progressHint: "al primo avvio scarica il lettore PDF (~2 MB) dal CDN",
    copy: "Copia",
    copied: "Copiato",
    downloadTxt: "Scarica .txt",
    characters: "caratteri",
    couldNotExtract: "Impossibile estrarre il testo: ",
    privacy: "Estratto al 100 % nel browser via pdfjs — il tuo PDF non viene mai caricato.",
  },
  nl: {
    uploadPdf: "PDF uploaden",
    uploadHint: "Tekst wordt in uw browser geëxtraheerd",
    readingPdf: "PDF lezen…",
    progressHint: "bij de eerste run wordt de PDF-lezer (~2 MB) van CDN gedownload",
    copy: "Kopiëren",
    copied: "Gekopieerd",
    downloadTxt: ".txt downloaden",
    characters: "tekens",
    couldNotExtract: "Tekst kon niet worden geëxtraheerd: ",
    privacy: "100 % geëxtraheerd in uw browser via pdfjs — uw PDF wordt nooit geüpload.",
  },
  ja: {
    uploadPdf: "PDFをアップロード",
    uploadHint: "テキストはブラウザで抽出されます",
    readingPdf: "PDF読み込み中…",
    progressHint: "初回実行時にCDNからPDFリーダー（約2MB）をダウンロードします",
    copy: "コピー",
    copied: "コピーしました",
    downloadTxt: ".txtをダウンロード",
    characters: "文字",
    couldNotExtract: "テキストを抽出できませんでした: ",
    privacy: "ブラウザでpdfjs経由100%抽出 — PDFはアップロードされません。",
  },
  zh: {
    uploadPdf: "上传PDF",
    uploadHint: "文本在您的浏览器中提取",
    readingPdf: "正在读取PDF…",
    progressHint: "首次运行从CDN下载PDF阅读器（约2MB）",
    copy: "复制",
    copied: "已复制",
    downloadTxt: "下载.txt",
    characters: "字符",
    couldNotExtract: "无法提取文本：",
    privacy: "通过pdfjs在您的浏览器中100%提取 — PDF永远不会被上传。",
  },
  ko: {
    uploadPdf: "PDF 업로드",
    uploadHint: "텍스트는 브라우저에서 추출됩니다",
    readingPdf: "PDF 읽는 중…",
    progressHint: "첫 실행 시 CDN에서 PDF 리더(~2MB)를 다운로드합니다",
    copy: "복사",
    copied: "복사됨",
    downloadTxt: ".txt 다운로드",
    characters: "자",
    couldNotExtract: "텍스트를 추출할 수 없습니다: ",
    privacy: "브라우저에서 pdfjs로 100% 추출 — PDF는 업로드되지 않습니다.",
  },
  ar: {
    uploadPdf: "تحميل PDF",
    uploadHint: "يتم استخراج النص في متصفحك",
    readingPdf: "جاري قراءة PDF…",
    progressHint: "التشغيل الأول يُنزّل قارئ PDF (حوالي 2 ميغابايت) من CDN",
    copy: "نسخ",
    copied: "تم النسخ",
    downloadTxt: "تنزيل .txt",
    characters: "حرف",
    couldNotExtract: "تعذّر استخراج النص: ",
    privacy: "يتم الاستخراج 100% في متصفحك عبر pdfjs — لن يتم تحميل ملف PDF مطلقًا.",
  },
  ru: {
    uploadPdf: "Загрузить PDF",
    uploadHint: "Текст извлекается в вашем браузере",
    readingPdf: "Чтение PDF…",
    progressHint: "при первом запуске загружает PDF-ридер (~2 МБ) с CDN",
    copy: "Копировать",
    copied: "Скопировано",
    downloadTxt: "Скачать .txt",
    characters: "символов",
    couldNotExtract: "Не удалось извлечь текст: ",
    privacy: "Извлечено на 100% в вашем браузере через pdfjs — ваш PDF не загружается.",
  },
  hi: {
    uploadPdf: "PDF अपलोड करें",
    uploadHint: "टेक्स्ट आपके ब्राउज़र में निकाला जाता है",
    readingPdf: "PDF पढ़ा जा रहा है…",
    progressHint: "पहली बार CDN से PDF रीडर (~2MB) डाउनलोड होता है",
    copy: "कॉपी करें",
    copied: "कॉपी हुआ",
    downloadTxt: ".txt डाउनलोड करें",
    characters: "अक्षर",
    couldNotExtract: "टेक्स्ट नहीं निकाला जा सका: ",
    privacy: "आपके ब्राउज़र में pdfjs द्वारा 100% निकाला — PDF कभी अपलोड नहीं होता।",
  },
  tr: {
    uploadPdf: "PDF yükle",
    uploadHint: "Metin tarayıcında çıkarılır",
    readingPdf: "PDF okunuyor…",
    progressHint: "ilk çalıştırmada CDN'den PDF okuyucu (~2 MB) indirilir",
    copy: "Kopyala",
    copied: "Kopyalandı",
    downloadTxt: ".txt indir",
    characters: "karakter",
    couldNotExtract: "Metin çıkarılamadı: ",
    privacy: "Tarayıcınızda pdfjs aracılığıyla 100% çıkarıldı — PDF'iniz hiçbir zaman yüklenmez.",
  },
  id: {
    uploadPdf: "Unggah PDF",
    uploadHint: "Teks diekstrak di browser Anda",
    readingPdf: "Membaca PDF…",
    progressHint: "pertama kali menjalankan akan mengunduh pembaca PDF (~2 MB) dari CDN",
    copy: "Salin",
    copied: "Disalin",
    downloadTxt: "Unduh .txt",
    characters: "karakter",
    couldNotExtract: "Gagal mengekstrak teks: ",
    privacy: "Diekstrak 100% di browser Anda via pdfjs — PDF Anda tidak pernah diunggah.",
  },
  vi: {
    uploadPdf: "Tải lên PDF",
    uploadHint: "Văn bản được trích xuất trong trình duyệt của bạn",
    readingPdf: "Đang đọc PDF…",
    progressHint: "lần đầu chạy sẽ tải xuống trình đọc PDF (~2MB) từ CDN",
    copy: "Sao chép",
    copied: "Đã sao chép",
    downloadTxt: "Tải xuống .txt",
    characters: "ký tự",
    couldNotExtract: "Không thể trích xuất văn bản: ",
    privacy: "Trích xuất 100% trong trình duyệt qua pdfjs — PDF của bạn không bao giờ được tải lên.",
  },
  sv: {
    uploadPdf: "Ladda upp PDF",
    uploadHint: "Text extraheras i din webbläsare",
    readingPdf: "Läser PDF…",
    progressHint: "vid första körningen laddas PDF-läsaren (~2 MB) från CDN",
    copy: "Kopiera",
    copied: "Kopierat",
    downloadTxt: "Ladda ner .txt",
    characters: "tecken",
    couldNotExtract: "Kunde inte extrahera text: ",
    privacy: "Extraherad 100% i din webbläsare via pdfjs — din PDF laddas aldrig upp.",
  },
  pl: {
    uploadPdf: "Prześlij PDF",
    uploadHint: "Tekst jest wyodrębniany w Twojej przeglądarce",
    readingPdf: "Odczytywanie PDF…",
    progressHint: "przy pierwszym uruchomieniu pobiera czytnik PDF (~2 MB) z CDN",
    copy: "Kopiuj",
    copied: "Skopiowano",
    downloadTxt: "Pobierz .txt",
    characters: "znaków",
    couldNotExtract: "Nie można wyodrębnić tekstu: ",
    privacy: "Wyodrębniono w 100% w przeglądarce via pdfjs — Twój PDF nigdy nie jest przesyłany.",
  },
  uk: {
    uploadPdf: "Завантажити PDF",
    uploadHint: "Текст витягується у вашому браузері",
    readingPdf: "Читання PDF…",
    progressHint: "при першому запуску завантажує PDF-рідер (~2 МБ) з CDN",
    copy: "Копіювати",
    copied: "Скопійовано",
    downloadTxt: "Завантажити .txt",
    characters: "символів",
    couldNotExtract: "Не вдалося витягти текст: ",
    privacy: "Витягнуто на 100% у вашому браузері через pdfjs — ваш PDF ніколи не завантажується.",
  },
  cs: {
    uploadPdf: "Nahrát PDF",
    uploadHint: "Text se extrahuje ve vašem prohlížeči",
    readingPdf: "Čtení PDF…",
    progressHint: "při prvním spuštění se stáhne čtečka PDF (~2 MB) z CDN",
    copy: "Kopírovat",
    copied: "Zkopírováno",
    downloadTxt: "Stáhnout .txt",
    characters: "znaků",
    couldNotExtract: "Text nelze extrahovat: ",
    privacy: "Extrahováno 100% ve vašem prohlížeči přes pdfjs — váš PDF soubor není nikdy nahrán.",
  },
};

type PdfJs = {
  GlobalWorkerOptions: { workerSrc: string };
  getDocument: (src: { data: Uint8Array }) => { promise: Promise<{ numPages: number; getPage: (n: number) => Promise<{ getTextContent: () => Promise<{ items: { str: string; hasEOL?: boolean }[] }> }> }> };
};

async function loadPdfjs(): Promise<PdfJs> {
  const url = "https://esm.sh/pdfjs-dist@4.7.76/build/pdf.min.mjs";
  const lib = (await import(/* webpackIgnore: true */ url)) as unknown as PdfJs;
  lib.GlobalWorkerOptions.workerSrc = "https://esm.sh/pdfjs-dist@4.7.76/build/pdf.worker.min.mjs";
  return lib;
}

export function PdfToTextClient() {
  const s = T[useLocale()] ?? T.en;
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  async function run(f: File) {
    setBusy(true); setError(null); setText(""); setProgress(2);
    try {
      const pdfjs = await loadPdfjs();
      const buf = new Uint8Array(await f.arrayBuffer());
      const doc = await pdfjs.getDocument({ data: buf }).promise;
      const out: string[] = [];
      for (let i = 1; i <= doc.numPages; i++) {
        const page = await doc.getPage(i);
        const content = await page.getTextContent();
        const lines: string[] = [];
        let cur = "";
        for (const it of content.items) {
          cur += it.str;
          if (it.hasEOL) { lines.push(cur); cur = ""; } else cur += " ";
        }
        if (cur) lines.push(cur);
        out.push(lines.join("\n"));
        setProgress(Math.max(2, Math.min(99, Math.round((i / doc.numPages) * 100))));
      }
      setText(out.join("\n\n"));
      setProgress(100);
    } catch (e) { setError(`${s.couldNotExtract}${(e as Error).message}`); }
    finally { setBusy(false); }
  }

  function copy() { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 1500); }

  function download() {
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${file?.name.replace(/\.pdf$/i, "")}.txt`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  return (
    <div className="space-y-4">
      {!file ? (
        <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-blue-300 bg-blue-50/40 px-6 py-12 text-center transition-colors hover:brightness-95">
          <Upload className="h-7 w-7 text-blue-600" />
          <span className="mt-2 font-medium text-ink-900">{s.uploadPdf}</span>
          <span className="mt-0.5 text-xs text-ink-400">{s.uploadHint}</span>
          <input type="file" accept="application/pdf,.pdf" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) { setFile(f); run(f); } }} />
        </label>
      ) : (
        <div className="flex items-center justify-between rounded-lg border border-ink-100 bg-white px-4 py-2.5">
          <div className="min-w-0 truncate text-sm">
            <span className="font-medium text-ink-900">{file.name}</span>
            <span className="ml-2 text-ink-400">{formatBytes(file.size)}</span>
          </div>
          <button onClick={() => { setFile(null); setText(""); setError(null); }} className="rounded p-1 text-xs text-ink-400 hover:bg-ink-50 hover:text-ink-700"><X className="h-3.5 w-3.5" /></button>
        </div>
      )}

      {busy && (
        <div className="flex items-center gap-3 rounded-lg border border-ink-100 bg-white px-4 py-3">
          <Loader2 className="h-4 w-4 animate-spin text-brand-500" />
          <div className="flex-1">
            <p className="text-sm font-medium text-ink-900">{s.readingPdf}</p>
            <p className="text-xs text-ink-400">{progress}% — {s.progressHint}</p>
          </div>
        </div>
      )}

      {text && (
        <>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline" onClick={copy}>{copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />} {copied ? s.copied : s.copy}</Button>
            <Button size="sm" variant="outline" onClick={download}><Download className="h-3.5 w-3.5" /> {s.downloadTxt}</Button>
            <span className="ml-auto text-xs text-ink-400">{text.length.toLocaleString()} {s.characters}</span>
          </div>
          <textarea value={text} readOnly className="h-96 w-full resize-y rounded-lg border border-ink-200 bg-white p-3 font-mono text-sm text-ink-900" />
        </>
      )}

      {error && <p className="text-sm text-red-600">{error}</p>}
      <p className="text-xs text-ink-400">{s.privacy}</p>
    </div>
  );
}
