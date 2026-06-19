"use client";

import { useState } from "react";
import { Upload, X, Download, Loader2, RotateCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatBytes, cn } from "@/lib/utils";
import { useLocale } from "@/hooks/useLocale";

const T: Record<string, Record<string, string>> = {
  en: {
    uploadPdf: "Upload a PDF",
    rotateEveryPage: "Rotate every page by:",
    rotating: "Rotating…",
    rotateBy: "Rotate by",
    downloadRotated: "Download rotated PDF",
    couldNotRotate: "Could not rotate: ",
    privacy: "Processed 100% in your browser — your PDF is never uploaded.",
  },
  fr: {
    uploadPdf: "Télécharger un PDF",
    rotateEveryPage: "Faire pivoter chaque page de :",
    rotating: "Rotation en cours…",
    rotateBy: "Faire pivoter de",
    downloadRotated: "Télécharger le PDF pivoté",
    couldNotRotate: "Impossible de faire pivoter : ",
    privacy: "Traité 100 % dans votre navigateur — votre PDF n'est jamais envoyé.",
  },
  es: {
    uploadPdf: "Subir un PDF",
    rotateEveryPage: "Rotar cada página:",
    rotating: "Rotando…",
    rotateBy: "Rotar",
    downloadRotated: "Descargar PDF rotado",
    couldNotRotate: "No se pudo rotar: ",
    privacy: "Procesado 100 % en tu navegador — tu PDF nunca se sube.",
  },
  pt: {
    uploadPdf: "Carregar um PDF",
    rotateEveryPage: "Girar cada página:",
    rotating: "Girando…",
    rotateBy: "Girar",
    downloadRotated: "Baixar PDF girado",
    couldNotRotate: "Não foi possível girar: ",
    privacy: "Processado 100 % no seu navegador — seu PDF nunca é enviado.",
  },
  de: {
    uploadPdf: "PDF hochladen",
    rotateEveryPage: "Jede Seite drehen um:",
    rotating: "Wird gedreht…",
    rotateBy: "Drehen um",
    downloadRotated: "Gedrehtes PDF herunterladen",
    couldNotRotate: "Drehen fehlgeschlagen: ",
    privacy: "100 % im Browser verarbeitet — Ihre PDF wird nie hochgeladen.",
  },
  it: {
    uploadPdf: "Carica un PDF",
    rotateEveryPage: "Ruota ogni pagina di:",
    rotating: "Rotazione in corso…",
    rotateBy: "Ruota di",
    downloadRotated: "Scarica PDF ruotato",
    couldNotRotate: "Impossibile ruotare: ",
    privacy: "Elaborato al 100 % nel browser — il tuo PDF non viene mai caricato.",
  },
  nl: {
    uploadPdf: "PDF uploaden",
    rotateEveryPage: "Elke pagina draaien met:",
    rotating: "Draaien…",
    rotateBy: "Draaien met",
    downloadRotated: "Geroteerde PDF downloaden",
    couldNotRotate: "Draaien mislukt: ",
    privacy: "100 % verwerkt in uw browser — uw PDF wordt nooit geüpload.",
  },
  ja: {
    uploadPdf: "PDFをアップロード",
    rotateEveryPage: "全ページを回転:",
    rotating: "回転中…",
    rotateBy: "回転",
    downloadRotated: "回転したPDFをダウンロード",
    couldNotRotate: "回転できませんでした: ",
    privacy: "ブラウザで100%処理 — PDFはアップロードされません。",
  },
  zh: {
    uploadPdf: "上传PDF",
    rotateEveryPage: "旋转每一页：",
    rotating: "旋转中…",
    rotateBy: "旋转",
    downloadRotated: "下载旋转后PDF",
    couldNotRotate: "无法旋转：",
    privacy: "全部在您的浏览器中处理 — PDF永远不会被上传。",
  },
  ko: {
    uploadPdf: "PDF 업로드",
    rotateEveryPage: "모든 페이지 회전:",
    rotating: "회전 중…",
    rotateBy: "회전",
    downloadRotated: "회전된 PDF 다운로드",
    couldNotRotate: "회전할 수 없습니다: ",
    privacy: "브라우저에서 100% 처리 — PDF는 업로드되지 않습니다.",
  },
  ar: {
    uploadPdf: "تحميل PDF",
    rotateEveryPage: "تدوير كل صفحة بمقدار:",
    rotating: "جاري التدوير…",
    rotateBy: "تدوير بمقدار",
    downloadRotated: "تنزيل PDF المُدار",
    couldNotRotate: "تعذّر التدوير: ",
    privacy: "تتم المعالجة 100% في متصفحك — لن يتم تحميل ملف PDF مطلقًا.",
  },
  ru: {
    uploadPdf: "Загрузить PDF",
    rotateEveryPage: "Повернуть каждую страницу на:",
    rotating: "Поворот…",
    rotateBy: "Повернуть на",
    downloadRotated: "Скачать повёрнутый PDF",
    couldNotRotate: "Не удалось повернуть: ",
    privacy: "Обработано на 100% в вашем браузере — ваш PDF не загружается.",
  },
  hi: {
    uploadPdf: "PDF अपलोड करें",
    rotateEveryPage: "हर पेज घुमाएं:",
    rotating: "घुमाया जा रहा है…",
    rotateBy: "घुमाएं",
    downloadRotated: "घुमाया हुआ PDF डाउनलोड करें",
    couldNotRotate: "घुमाया नहीं जा सका: ",
    privacy: "आपके ब्राउज़र में 100% संसाधित — आपका PDF कभी अपलोड नहीं होता।",
  },
  tr: {
    uploadPdf: "PDF yükle",
    rotateEveryPage: "Her sayfayı döndür:",
    rotating: "Döndürülüyor…",
    rotateBy: "Döndür",
    downloadRotated: "Döndürülmüş PDF'i indir",
    couldNotRotate: "Döndürülemedi: ",
    privacy: "Tarayıcınızda 100% işlendi — PDF'iniz hiçbir zaman yüklenmez.",
  },
  id: {
    uploadPdf: "Unggah PDF",
    rotateEveryPage: "Putar setiap halaman:",
    rotating: "Memutar…",
    rotateBy: "Putar",
    downloadRotated: "Unduh PDF yang diputar",
    couldNotRotate: "Gagal memutar: ",
    privacy: "Diproses 100% di browser Anda — PDF Anda tidak pernah diunggah.",
  },
  vi: {
    uploadPdf: "Tải lên PDF",
    rotateEveryPage: "Xoay mỗi trang:",
    rotating: "Đang xoay…",
    rotateBy: "Xoay",
    downloadRotated: "Tải xuống PDF đã xoay",
    couldNotRotate: "Không thể xoay: ",
    privacy: "Xử lý 100% trong trình duyệt — PDF của bạn không bao giờ được tải lên.",
  },
  sv: {
    uploadPdf: "Ladda upp PDF",
    rotateEveryPage: "Rotera varje sida:",
    rotating: "Roterar…",
    rotateBy: "Rotera",
    downloadRotated: "Ladda ner roterad PDF",
    couldNotRotate: "Kunde inte rotera: ",
    privacy: "Bearbetad 100% i din webbläsare — din PDF laddas aldrig upp.",
  },
  pl: {
    uploadPdf: "Prześlij PDF",
    rotateEveryPage: "Obróć każdą stronę o:",
    rotating: "Obracanie…",
    rotateBy: "Obróć o",
    downloadRotated: "Pobierz obrócony PDF",
    couldNotRotate: "Nie można obrócić: ",
    privacy: "Przetworzono w 100% w Twojej przeglądarce — Twój PDF nigdy nie jest przesyłany.",
  },
  uk: {
    uploadPdf: "Завантажити PDF",
    rotateEveryPage: "Повернути кожну сторінку на:",
    rotating: "Поворот…",
    rotateBy: "Повернути на",
    downloadRotated: "Завантажити повернутий PDF",
    couldNotRotate: "Не вдалося повернути: ",
    privacy: "Оброблено на 100% у вашому браузері — ваш PDF ніколи не завантажується.",
  },
  cs: {
    uploadPdf: "Nahrát PDF",
    rotateEveryPage: "Otočit každou stránku o:",
    rotating: "Otáčení…",
    rotateBy: "Otočit o",
    downloadRotated: "Stáhnout otočené PDF",
    couldNotRotate: "Otočení se nezdařilo: ",
    privacy: "Zpracováno 100% ve vašem prohlížeči — váš PDF soubor není nikdy nahrán.",
  },
};

const ANGLES = [90, 180, 270] as const;

export function PdfRotateClient() {
  const s = T[useLocale()] ?? T.en;
  const [file, setFile] = useState<File | null>(null);
  const [angle, setAngle] = useState<number>(90);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);

  async function rotate() {
    if (!file || busy) return;
    if (resultUrl) URL.revokeObjectURL(resultUrl); setBusy(true); setError(null); setResultUrl(null);
    try {
      const { PDFDocument, degrees } = await import("pdf-lib");
      const doc = await PDFDocument.load(await file.arrayBuffer(), { ignoreEncryption: true });
      for (const page of doc.getPages()) {
        const cur = page.getRotation().angle;
        page.setRotation(degrees((cur + angle) % 360));
      }
      const blob = new Blob([await doc.save() as BlobPart], { type: "application/pdf" });
      setResultUrl(URL.createObjectURL(blob));
    } catch (e) { setError(`${s.couldNotRotate}${(e as Error).message}`); }
    finally { setBusy(false); }
  }

  return (
    <div className="space-y-4">
      {!file ? (
        <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-blue-300 bg-blue-50/40 px-6 py-12 text-center transition-colors hover:brightness-95">
          <Upload className="h-7 w-7 text-blue-600" />
          <span className="mt-2 font-medium text-ink-900">{s.uploadPdf}</span>
          <input type="file" accept="application/pdf,.pdf" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) { setFile(f); setResultUrl(null); } }} />
        </label>
      ) : (
        <div className="flex items-center justify-between rounded-lg border border-ink-100 bg-white px-4 py-2.5">
          <div className="min-w-0 truncate text-sm">
            <span className="font-medium text-ink-900">{file.name}</span>
            <span className="ml-2 text-ink-400">{formatBytes(file.size)}</span>
          </div>
          <button onClick={() => { setFile(null); setResultUrl(null); }} className="rounded p-1 text-xs text-ink-400 hover:bg-ink-50 hover:text-ink-700"><X className="h-3.5 w-3.5" /></button>
        </div>
      )}

      {file && (
        <div className="flex items-center gap-2">
          <span className="text-sm text-ink-500">{s.rotateEveryPage}</span>
          <div className="inline-flex rounded-lg border border-ink-200 bg-white p-1">
            {ANGLES.map((a) => (
              <button key={a} onClick={() => setAngle(a)} className={cn("rounded-md px-3 py-1.5 text-sm font-medium transition-colors", angle === a ? "bg-brand-500 text-white" : "text-ink-600 hover:text-ink-900")}>
                {a}°
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        <Button onClick={rotate} disabled={!file || busy} size="lg">
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <RotateCw className="h-4 w-4" />}
          {busy ? s.rotating : `${s.rotateBy} ${angle}°`}
        </Button>
        {resultUrl && (
          <a href={resultUrl} download="rotated.pdf">
            <Button variant="outline" size="lg"><Download className="h-4 w-4" /> {s.downloadRotated}</Button>
          </a>
        )}
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}
      <p className="text-xs text-ink-400">{s.privacy}</p>
    </div>
  );
}
