"use client";

import { useState } from "react";
import { Upload, X, Loader2, GitCompare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatBytes } from "@/lib/utils";
import { useLocale } from "@/hooks/useLocale";

const T: Record<string, Record<string, string>> = {
  en: {
    firstPdf: "First PDF (original)",
    secondPdf: "Second PDF (changed)",
    comparing: "Comparing…",
    comparePdfs: "Compare PDFs",
    added: "added",
    removed: "removed",
    unchanged: "unchanged",
    couldNotCompare: "Could not compare: ",
    privacy: "Text is extracted and compared line by line, 100% in your browser — your PDFs are never uploaded. Compares the text layer only (not images or exact layout). Scanned PDFs need OCR first.",
  },
  fr: {
    firstPdf: "Premier PDF (original)",
    secondPdf: "Deuxième PDF (modifié)",
    comparing: "Comparaison en cours…",
    comparePdfs: "Comparer les PDF",
    added: "ajouté",
    removed: "supprimé",
    unchanged: "inchangé",
    couldNotCompare: "Impossible de comparer : ",
    privacy: "Le texte est extrait et comparé ligne par ligne, 100 % dans votre navigateur — vos PDF ne sont jamais envoyés. Compare uniquement la couche de texte (pas les images ni la mise en page). Les PDF numérisés nécessitent une OCR préalable.",
  },
  es: {
    firstPdf: "Primer PDF (original)",
    secondPdf: "Segundo PDF (modificado)",
    comparing: "Comparando…",
    comparePdfs: "Comparar PDF",
    added: "añadido",
    removed: "eliminado",
    unchanged: "sin cambios",
    couldNotCompare: "No se pudo comparar: ",
    privacy: "El texto se extrae y compara línea por línea, 100 % en tu navegador — tus PDF nunca se suben. Compara solo la capa de texto (no imágenes ni diseño). Los PDF escaneados necesitan OCR primero.",
  },
  pt: {
    firstPdf: "Primeiro PDF (original)",
    secondPdf: "Segundo PDF (alterado)",
    comparing: "Comparando…",
    comparePdfs: "Comparar PDF",
    added: "adicionado",
    removed: "removido",
    unchanged: "sem alteração",
    couldNotCompare: "Não foi possível comparar: ",
    privacy: "O texto é extraído e comparado linha por linha, 100 % no seu navegador — seus PDF nunca são enviados. Compara apenas a camada de texto (não imagens ou layout). PDFs digitalizados precisam de OCR primeiro.",
  },
  de: {
    firstPdf: "Erstes PDF (Original)",
    secondPdf: "Zweites PDF (geändert)",
    comparing: "Wird verglichen…",
    comparePdfs: "PDFs vergleichen",
    added: "hinzugefügt",
    removed: "entfernt",
    unchanged: "unverändert",
    couldNotCompare: "Vergleich fehlgeschlagen: ",
    privacy: "Text wird zeilenweise extrahiert und verglichen, 100 % im Browser — Ihre PDFs werden nie hochgeladen. Vergleicht nur die Textebene (keine Bilder oder exaktes Layout). Gescannte PDFs benötigen zuerst OCR.",
  },
  it: {
    firstPdf: "Primo PDF (originale)",
    secondPdf: "Secondo PDF (modificato)",
    comparing: "Confronto in corso…",
    comparePdfs: "Confronta PDF",
    added: "aggiunto",
    removed: "rimosso",
    unchanged: "invariato",
    couldNotCompare: "Impossibile confrontare: ",
    privacy: "Il testo viene estratto e confrontato riga per riga, al 100 % nel browser — i tuoi PDF non vengono mai caricati. Confronta solo il livello testo (non immagini o layout). I PDF scansionati richiedono prima l'OCR.",
  },
  nl: {
    firstPdf: "Eerste PDF (origineel)",
    secondPdf: "Tweede PDF (gewijzigd)",
    comparing: "Vergelijken…",
    comparePdfs: "PDF's vergelijken",
    added: "toegevoegd",
    removed: "verwijderd",
    unchanged: "ongewijzigd",
    couldNotCompare: "Vergelijken mislukt: ",
    privacy: "Tekst wordt regel voor regel geëxtraheerd en vergeleken, 100 % in uw browser — uw PDF's worden nooit geüpload. Vergelijkt alleen de tekstlaag (geen afbeeldingen of exacte lay-out). Gescande PDF's hebben eerst OCR nodig.",
  },
  ja: {
    firstPdf: "最初のPDF（元）",
    secondPdf: "2番目のPDF（変更後）",
    comparing: "比較中…",
    comparePdfs: "PDFを比較",
    added: "追加",
    removed: "削除",
    unchanged: "変更なし",
    couldNotCompare: "比較できませんでした: ",
    privacy: "テキストをブラウザ内で行ごとに抽出・比較 — PDFはアップロードされません。テキスト層のみ比較（画像・レイアウト除く）。スキャンPDFにはOCRが先に必要です。",
  },
  zh: {
    firstPdf: "第一个PDF（原始）",
    secondPdf: "第二个PDF（修改后）",
    comparing: "比较中…",
    comparePdfs: "比较PDF",
    added: "已添加",
    removed: "已删除",
    unchanged: "未更改",
    couldNotCompare: "无法比较：",
    privacy: "文本在您的浏览器中逐行提取并比较，100%本地处理 — PDF永远不会被上传。仅比较文本层（不含图像或精确布局）。扫描PDF需先进行OCR。",
  },
  ko: {
    firstPdf: "첫 번째 PDF (원본)",
    secondPdf: "두 번째 PDF (변경됨)",
    comparing: "비교 중…",
    comparePdfs: "PDF 비교",
    added: "추가됨",
    removed: "삭제됨",
    unchanged: "변경 없음",
    couldNotCompare: "비교할 수 없습니다: ",
    privacy: "텍스트를 브라우저에서 100% 줄별로 추출하여 비교 — PDF는 업로드되지 않습니다. 텍스트 레이어만 비교(이미지 또는 레이아웃 제외). 스캔된 PDF는 먼저 OCR이 필요합니다.",
  },
  ar: {
    firstPdf: "ملف PDF الأول (الأصلي)",
    secondPdf: "ملف PDF الثاني (المعدَّل)",
    comparing: "جاري المقارنة…",
    comparePdfs: "مقارنة PDF",
    added: "مضاف",
    removed: "محذوف",
    unchanged: "بدون تغيير",
    couldNotCompare: "تعذّرت المقارنة: ",
    privacy: "يتم استخراج النص ومقارنته سطرًا بسطر بنسبة 100% في متصفحك — لن يتم تحميل ملفات PDF مطلقًا. يقارن طبقة النص فقط (لا الصور ولا التخطيط). تحتاج ملفات PDF الممسوحة ضوئيًا إلى OCR أولاً.",
  },
  ru: {
    firstPdf: "Первый PDF (оригинал)",
    secondPdf: "Второй PDF (изменённый)",
    comparing: "Сравнение…",
    comparePdfs: "Сравнить PDF",
    added: "добавлено",
    removed: "удалено",
    unchanged: "без изменений",
    couldNotCompare: "Не удалось сравнить: ",
    privacy: "Текст извлекается и сравнивается построчно на 100% в браузере — ваши PDF не загружаются. Сравниваются только текстовые слои (без изображений и точного расположения). Сканированные PDF требуют предварительного OCR.",
  },
  hi: {
    firstPdf: "पहला PDF (मूल)",
    secondPdf: "दूसरा PDF (बदला हुआ)",
    comparing: "तुलना हो रही है…",
    comparePdfs: "PDF की तुलना करें",
    added: "जोड़ा गया",
    removed: "हटाया गया",
    unchanged: "अपरिवर्तित",
    couldNotCompare: "तुलना नहीं हो सकी: ",
    privacy: "आपके ब्राउज़र में 100% लाइन-दर-लाइन तुलना — PDF कभी अपलोड नहीं होते। केवल टेक्स्ट लेयर की तुलना होती है (चित्र या लेआउट नहीं)। स्कैन किए PDF के लिए पहले OCR जरूरी है।",
  },
  tr: {
    firstPdf: "Birinci PDF (orijinal)",
    secondPdf: "İkinci PDF (değiştirilmiş)",
    comparing: "Karşılaştırılıyor…",
    comparePdfs: "PDF'leri karşılaştır",
    added: "eklendi",
    removed: "kaldırıldı",
    unchanged: "değişmedi",
    couldNotCompare: "Karşılaştırılamadı: ",
    privacy: "Metin, tarayıcınızda satır satır 100% çıkarılıp karşılaştırılır — PDF'leriniz hiçbir zaman yüklenmez. Yalnızca metin katmanını karşılaştırır (görüntüler veya tam düzen değil). Taranmış PDF'ler önce OCR gerektirir.",
  },
  id: {
    firstPdf: "PDF pertama (asli)",
    secondPdf: "PDF kedua (diubah)",
    comparing: "Membandingkan…",
    comparePdfs: "Bandingkan PDF",
    added: "ditambahkan",
    removed: "dihapus",
    unchanged: "tidak berubah",
    couldNotCompare: "Gagal membandingkan: ",
    privacy: "Teks diekstrak dan dibandingkan baris per baris, 100% di browser Anda — PDF Anda tidak pernah diunggah. Hanya membandingkan lapisan teks (bukan gambar atau tata letak). PDF yang dipindai memerlukan OCR terlebih dahulu.",
  },
  vi: {
    firstPdf: "PDF đầu tiên (gốc)",
    secondPdf: "PDF thứ hai (đã thay đổi)",
    comparing: "Đang so sánh…",
    comparePdfs: "So sánh PDF",
    added: "đã thêm",
    removed: "đã xóa",
    unchanged: "không thay đổi",
    couldNotCompare: "Không thể so sánh: ",
    privacy: "Văn bản được trích xuất và so sánh từng dòng, 100% trong trình duyệt — PDF của bạn không bao giờ được tải lên. Chỉ so sánh lớp văn bản (không phải hình ảnh hay bố cục). PDF được quét cần OCR trước.",
  },
  sv: {
    firstPdf: "Första PDF (original)",
    secondPdf: "Andra PDF (ändrad)",
    comparing: "Jämför…",
    comparePdfs: "Jämför PDF:er",
    added: "tillagd",
    removed: "borttagen",
    unchanged: "oförändrad",
    couldNotCompare: "Kunde inte jämföra: ",
    privacy: "Text extraheras och jämförs rad för rad, 100% i din webbläsare — dina PDF:er laddas aldrig upp. Jämför enbart textlagret (inte bilder eller exakt layout). Skannade PDF:er behöver OCR först.",
  },
  pl: {
    firstPdf: "Pierwszy PDF (oryginał)",
    secondPdf: "Drugi PDF (zmieniony)",
    comparing: "Porównywanie…",
    comparePdfs: "Porównaj pliki PDF",
    added: "dodano",
    removed: "usunięto",
    unchanged: "bez zmian",
    couldNotCompare: "Nie można porównać: ",
    privacy: "Tekst jest wyodrębniany i porównywany wiersz po wierszu, w 100% w przeglądarce — Twoje pliki PDF nigdy nie są przesyłane. Porównuje tylko warstwę tekstową (nie obrazy ani układ). Zeskanowane pliki PDF wymagają najpierw OCR.",
  },
  uk: {
    firstPdf: "Перший PDF (оригінал)",
    secondPdf: "Другий PDF (змінений)",
    comparing: "Порівняння…",
    comparePdfs: "Порівняти PDF",
    added: "додано",
    removed: "видалено",
    unchanged: "без змін",
    couldNotCompare: "Не вдалося порівняти: ",
    privacy: "Текст витягується та порівнюється рядок за рядком, на 100% у браузері — ваші PDF ніколи не завантажуються. Порівнює лише текстовий шар (без зображень або точного макету). Скановані PDF потребують попереднього OCR.",
  },
  cs: {
    firstPdf: "První PDF (originál)",
    secondPdf: "Druhé PDF (změněné)",
    comparing: "Porovnávání…",
    comparePdfs: "Porovnat PDF",
    added: "přidáno",
    removed: "odstraněno",
    unchanged: "beze změny",
    couldNotCompare: "Porovnání se nezdařilo: ",
    privacy: "Text je extrahován a porovnán řádek po řádku, 100% ve vašem prohlížeči — vaše PDF soubory nejsou nikdy nahrány. Porovnává pouze textovou vrstvu (nikoli obrázky nebo přesné rozvržení). Naskenované PDF soubory vyžadují nejprve OCR.",
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

async function extractLines(pdfjs: PdfJs, file: File): Promise<string[]> {
  const doc = await pdfjs.getDocument({ data: new Uint8Array(await file.arrayBuffer()) }).promise;
  const lines: string[] = [];
  for (let i = 1; i <= doc.numPages; i++) {
    const page = await doc.getPage(i);
    const content = await page.getTextContent();
    let cur = "";
    for (const it of content.items) {
      cur += it.str;
      if (it.hasEOL) { lines.push(cur.trim()); cur = ""; } else cur += " ";
    }
    if (cur.trim()) lines.push(cur.trim());
  }
  return lines.filter((l) => l.length > 0);
}

type Op = { type: "eq" | "add" | "del"; text: string };
function lineDiff(A: string[], B: string[]): Op[] {
  const n = A.length, m = B.length;
  const dp: number[][] = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
  for (let i = n - 1; i >= 0; i--) for (let j = m - 1; j >= 0; j--) dp[i][j] = A[i] === B[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
  const ops: Op[] = [];
  let i = 0, j = 0;
  while (i < n && j < m) {
    if (A[i] === B[j]) { ops.push({ type: "eq", text: A[i] }); i++; j++; }
    else if (dp[i + 1][j] >= dp[i][j + 1]) { ops.push({ type: "del", text: A[i] }); i++; }
    else { ops.push({ type: "add", text: B[j] }); j++; }
  }
  while (i < n) ops.push({ type: "del", text: A[i++] });
  while (j < m) ops.push({ type: "add", text: B[j++] });
  return ops;
}

function Drop({ label, file, onPick, onClear }: { label: string; file: File | null; onPick: (f: File) => void; onClear: () => void }) {
  return file ? (
    <div className="flex items-center justify-between rounded-lg border border-ink-100 bg-white px-3 py-2 text-sm">
      <span className="min-w-0 truncate"><span className="font-medium text-ink-900">{file.name}</span><span className="ml-2 text-ink-400">{formatBytes(file.size)}</span></span>
      <button onClick={onClear} aria-label="Remove" className="rounded p-1 text-ink-400 hover:bg-ink-50 hover:text-ink-700"><X className="h-3.5 w-3.5" /></button>
    </div>
  ) : (
    <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-blue-300 bg-blue-50/40 px-4 py-8 text-center transition-colors hover:brightness-95">
      <Upload className="h-6 w-6 text-blue-600" />
      <span className="mt-1.5 text-sm font-medium text-ink-900">{label}</span>
      <input type="file" accept="application/pdf,.pdf" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) onPick(f); }} />
    </label>
  );
}

export function ComparePdfClient() {
  const s = T[useLocale()] ?? T.en;
  const [a, setA] = useState<File | null>(null);
  const [b, setB] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ops, setOps] = useState<Op[] | null>(null);

  async function run() {
    if (!a || !b || busy) return;
    setBusy(true); setError(null); setOps(null);
    try {
      const pdfjs = await loadPdfjs();
      const [la, lb] = await Promise.all([extractLines(pdfjs, a), extractLines(pdfjs, b)]);
      setOps(lineDiff(la, lb));
    } catch (e) {
      setError(`${s.couldNotCompare}${(e as Error).message}`);
    } finally {
      setBusy(false);
    }
  }

  const stats = ops ? ops.reduce((acc, o) => { acc[o.type]++; return acc; }, { add: 0, del: 0, eq: 0 } as Record<string, number>) : null;

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <Drop label={s.firstPdf} file={a} onPick={(f) => { setA(f); setOps(null); }} onClear={() => { setA(null); setOps(null); }} />
        <Drop label={s.secondPdf} file={b} onPick={(f) => { setB(f); setOps(null); }} onClear={() => { setB(null); setOps(null); }} />
      </div>

      <Button size="lg" onClick={run} disabled={!a || !b || busy}>
        {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <GitCompare className="h-4 w-4" />}
        {busy ? s.comparing : s.comparePdfs}
      </Button>

      {stats && (
        <div className="flex items-center gap-3 text-xs">
          <span className="rounded bg-emerald-50 px-2 py-0.5 font-mono text-emerald-700">+{stats.add} {s.added}</span>
          <span className="rounded bg-red-50 px-2 py-0.5 font-mono text-red-700">−{stats.del} {s.removed}</span>
          <span className="rounded bg-ink-50 px-2 py-0.5 font-mono text-ink-500">{stats.eq} {s.unchanged}</span>
        </div>
      )}

      {ops && (
        <pre className="max-h-[32rem] overflow-auto rounded-lg border border-ink-100 bg-white p-4 font-mono text-xs leading-relaxed">
          {ops.map((o, i) => (
            <div key={i} className={o.type === "add" ? "bg-emerald-50 text-emerald-800" : o.type === "del" ? "bg-red-50 text-red-800" : "text-ink-600"}>
              <span className="select-none pr-2 text-ink-300">{o.type === "add" ? "+" : o.type === "del" ? "−" : " "}</span>{o.text || " "}
            </div>
          ))}
        </pre>
      )}

      {error && <p className="text-sm text-red-600">{error}</p>}
      <p className="text-xs text-ink-400">{s.privacy}</p>
    </div>
  );
}
