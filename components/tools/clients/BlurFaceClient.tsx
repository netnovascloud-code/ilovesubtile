"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Download, X, Eraser, Undo2, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MiniDrop } from "@/components/tools/MiniDrop";
import { formatBytes } from "@/lib/utils";
import { useLocale } from "@/hooks/useLocale";

const T: Record<string, Record<string, string>> = {
  en: {
    dropLabel: "Drop your image (JPG, PNG, WebP)",
    dropHint: "Your image is processed entirely in your browser — never uploaded.",
    drawInstruction: "Click and drag a rectangle over each face (or any area) you want to anonymise.",
    blurStrength: "Blur strength",
    undo: "Undo",
    clearAll: "Clear all",
    region: "region",
    regions: "regions",
    exportBlurred: "Export blurred image",
    download: "Download",
  },
  fr: {
    dropLabel: "Déposez votre image (JPG, PNG, WebP)",
    dropHint: "Votre image est entièrement traitée dans votre navigateur — jamais envoyée.",
    drawInstruction: "Cliquez et faites glisser un rectangle sur chaque visage (ou toute zone) à anonymiser.",
    blurStrength: "Intensité du flou",
    undo: "Annuler",
    clearAll: "Tout effacer",
    region: "zone",
    regions: "zones",
    exportBlurred: "Exporter l'image floutée",
    download: "Télécharger",
  },
  es: {
    dropLabel: "Suelta tu imagen (JPG, PNG, WebP)",
    dropHint: "Tu imagen se procesa completamente en tu navegador — nunca se sube.",
    drawInstruction: "Haz clic y arrastra un rectángulo sobre cada cara (o cualquier área) que quieras anonimizar.",
    blurStrength: "Intensidad del desenfoque",
    undo: "Deshacer",
    clearAll: "Borrar todo",
    region: "zona",
    regions: "zonas",
    exportBlurred: "Exportar imagen difuminada",
    download: "Descargar",
  },
  pt: {
    dropLabel: "Solte sua imagem (JPG, PNG, WebP)",
    dropHint: "Sua imagem é processada inteiramente no seu navegador — nunca enviada.",
    drawInstruction: "Clique e arraste um retângulo sobre cada rosto (ou qualquer área) que deseja anonimizar.",
    blurStrength: "Intensidade do desfoque",
    undo: "Desfazer",
    clearAll: "Limpar tudo",
    region: "região",
    regions: "regiões",
    exportBlurred: "Exportar imagem desfocada",
    download: "Baixar",
  },
  de: {
    dropLabel: "Bild ablegen (JPG, PNG, WebP)",
    dropHint: "Ihr Bild wird vollständig in Ihrem Browser verarbeitet — niemals hochgeladen.",
    drawInstruction: "Klicken und ziehen Sie ein Rechteck über jedes Gesicht (oder jeden Bereich), das anonymisiert werden soll.",
    blurStrength: "Unschärfestärke",
    undo: "Rückgängig",
    clearAll: "Alles löschen",
    region: "Bereich",
    regions: "Bereiche",
    exportBlurred: "Verpixeltes Bild exportieren",
    download: "Herunterladen",
  },
  it: {
    dropLabel: "Trascina la tua immagine (JPG, PNG, WebP)",
    dropHint: "La tua immagine viene elaborata interamente nel browser — non viene mai caricata.",
    drawInstruction: "Fai clic e trascina un rettangolo su ogni volto (o qualsiasi area) da anonimizzare.",
    blurStrength: "Intensità della sfocatura",
    undo: "Annulla",
    clearAll: "Cancella tutto",
    region: "area",
    regions: "aree",
    exportBlurred: "Esporta immagine sfocata",
    download: "Scarica",
  },
  nl: {
    dropLabel: "Zet uw afbeelding hier neer (JPG, PNG, WebP)",
    dropHint: "Uw afbeelding wordt volledig in uw browser verwerkt — nooit geüpload.",
    drawInstruction: "Klik en sleep een rechthoek over elk gezicht (of elk gebied) dat u wilt anonimiseren.",
    blurStrength: "Vervagingssterkte",
    undo: "Ongedaan maken",
    clearAll: "Alles wissen",
    region: "gebied",
    regions: "gebieden",
    exportBlurred: "Vervaagde afbeelding exporteren",
    download: "Downloaden",
  },
  ja: {
    dropLabel: "画像をドロップ (JPG, PNG, WebP)",
    dropHint: "画像はすべてブラウザ内で処理されます — アップロードされません。",
    drawInstruction: "匿名化したい顔（または任意の領域）の上に四角形をクリック＆ドラッグしてください。",
    blurStrength: "ぼかし強度",
    undo: "元に戻す",
    clearAll: "すべて消去",
    region: "領域",
    regions: "領域",
    exportBlurred: "ぼかし済み画像をエクスポート",
    download: "ダウンロード",
  },
  zh: {
    dropLabel: "拖放您的图片 (JPG, PNG, WebP)",
    dropHint: "您的图片完全在浏览器中处理 — 从不上传。",
    drawInstruction: "在每个想要匿名化的面孔（或任意区域）上点击并拖动矩形。",
    blurStrength: "模糊强度",
    undo: "撤销",
    clearAll: "清除全部",
    region: "区域",
    regions: "个区域",
    exportBlurred: "导出模糊图片",
    download: "下载",
  },
  ko: {
    dropLabel: "이미지를 드롭하세요 (JPG, PNG, WebP)",
    dropHint: "이미지는 브라우저에서 완전히 처리됩니다 — 업로드되지 않습니다.",
    drawInstruction: "익명화하려는 얼굴(또는 원하는 영역) 위에 사각형을 클릭하여 드래그하세요.",
    blurStrength: "블러 강도",
    undo: "실행 취소",
    clearAll: "모두 지우기",
    region: "영역",
    regions: "개 영역",
    exportBlurred: "블러 처리된 이미지 내보내기",
    download: "다운로드",
  },
  ar: {
    dropLabel: "أسقط صورتك هنا (JPG أو PNG أو WebP)",
    dropHint: "تُعالج صورتك بالكامل في متصفحك — لا تُرفع أبدًا.",
    drawInstruction: "انقر واسحب مستطيلًا فوق كل وجه (أو أي منطقة) تريد إخفاء هويتها.",
    blurStrength: "شدة الضبابية",
    undo: "تراجع",
    clearAll: "مسح الكل",
    region: "منطقة",
    regions: "مناطق",
    exportBlurred: "تصدير الصورة المطمسة",
    download: "تنزيل",
  },
  ru: {
    dropLabel: "Перетащите изображение (JPG, PNG, WebP)",
    dropHint: "Ваше изображение полностью обрабатывается в браузере — никогда не загружается.",
    drawInstruction: "Нажмите и нарисуйте прямоугольник над каждым лицом (или любой областью), которую нужно анонимизировать.",
    blurStrength: "Сила размытия",
    undo: "Отменить",
    clearAll: "Очистить всё",
    region: "область",
    regions: "области",
    exportBlurred: "Экспортировать размытое изображение",
    download: "Скачать",
  },
  hi: {
    dropLabel: "अपनी छवि यहाँ छोड़ें (JPG, PNG, WebP)",
    dropHint: "आपकी छवि पूरी तरह से आपके ब्राउज़र में प्रसंस्कृत होती है — कभी अपलोड नहीं होती।",
    drawInstruction: "प्रत्येक चेहरे (या किसी भी क्षेत्र) के ऊपर एक आयत क्लिक करके खींचें जिसे आप गुमनाम करना चाहते हैं।",
    blurStrength: "धुंधलापन शक्ति",
    undo: "पूर्ववत करें",
    clearAll: "सब साफ़ करें",
    region: "क्षेत्र",
    regions: "क्षेत्र",
    exportBlurred: "धुंधली छवि निर्यात करें",
    download: "डाउनलोड",
  },
  tr: {
    dropLabel: "Görselinizi bırakın (JPG, PNG, WebP)",
    dropHint: "Görseliniz tamamen tarayıcınızda işlenir — hiçbir zaman yüklenmez.",
    drawInstruction: "Anonimleştirmek istediğiniz her yüzün (veya herhangi bir alanın) üzerine tıklayıp sürükleyerek dikdörtgen çizin.",
    blurStrength: "Bulanıklık gücü",
    undo: "Geri al",
    clearAll: "Tümünü temizle",
    region: "bölge",
    regions: "bölge",
    exportBlurred: "Bulanık görseli dışa aktar",
    download: "İndir",
  },
  id: {
    dropLabel: "Jatuhkan gambar Anda (JPG, PNG, WebP)",
    dropHint: "Gambar Anda diproses sepenuhnya di browser Anda — tidak pernah diunggah.",
    drawInstruction: "Klik dan seret persegi panjang di atas setiap wajah (atau area mana pun) yang ingin Anda anonimkan.",
    blurStrength: "Kekuatan buram",
    undo: "Batalkan",
    clearAll: "Hapus semua",
    region: "area",
    regions: "area",
    exportBlurred: "Ekspor gambar blur",
    download: "Unduh",
  },
  vi: {
    dropLabel: "Thả ảnh của bạn vào đây (JPG, PNG, WebP)",
    dropHint: "Ảnh của bạn được xử lý hoàn toàn trên trình duyệt — không bao giờ tải lên.",
    drawInstruction: "Nhấp và kéo một hình chữ nhật lên mỗi khuôn mặt (hoặc bất kỳ vùng nào) bạn muốn ẩn danh.",
    blurStrength: "Cường độ làm mờ",
    undo: "Hoàn tác",
    clearAll: "Xóa tất cả",
    region: "vùng",
    regions: "vùng",
    exportBlurred: "Xuất ảnh đã làm mờ",
    download: "Tải xuống",
  },
  sv: {
    dropLabel: "Släpp din bild här (JPG, PNG, WebP)",
    dropHint: "Din bild bearbetas helt i din webbläsare — laddas aldrig upp.",
    drawInstruction: "Klicka och dra en rektangel över varje ansikte (eller valfritt område) som du vill anonymisera.",
    blurStrength: "Oskärpestyrka",
    undo: "Ångra",
    clearAll: "Rensa allt",
    region: "region",
    regions: "regioner",
    exportBlurred: "Exportera suddig bild",
    download: "Ladda ner",
  },
  pl: {
    dropLabel: "Upuść swój obraz (JPG, PNG, WebP)",
    dropHint: "Twój obraz jest w całości przetwarzany w przeglądarce — nigdy nie jest przesyłany.",
    drawInstruction: "Kliknij i przeciągnij prostokąt nad każdą twarzą (lub dowolnym obszarem), który chcesz zanonimizować.",
    blurStrength: "Siła rozmycia",
    undo: "Cofnij",
    clearAll: "Wyczyść wszystko",
    region: "obszar",
    regions: "obszary",
    exportBlurred: "Eksportuj rozmyty obraz",
    download: "Pobierz",
  },
  uk: {
    dropLabel: "Перетягніть зображення (JPG, PNG, WebP)",
    dropHint: "Ваше зображення повністю обробляється у браузері — ніколи не завантажується.",
    drawInstruction: "Натисніть і намалюйте прямокутник над кожним обличчям (або будь-якою областю), яку потрібно анонімізувати.",
    blurStrength: "Сила розмиття",
    undo: "Скасувати",
    clearAll: "Очистити все",
    region: "область",
    regions: "областей",
    exportBlurred: "Експортувати розмите зображення",
    download: "Завантажити",
  },
  cs: {
    dropLabel: "Přetáhněte obrázek (JPG, PNG, WebP)",
    dropHint: "Váš obrázek je zpracován zcela v prohlížeči — nikdy není nahrán.",
    drawInstruction: "Klikněte a přetáhněte obdélník přes každý obličej (nebo libovolnou oblast), který chcete anonymizovat.",
    blurStrength: "Síla rozostření",
    undo: "Zpět",
    clearAll: "Vymazat vše",
    region: "oblast",
    regions: "oblasti",
    exportBlurred: "Exportovat rozmazaný obrázek",
    download: "Stáhnout",
  },
};

// Brush-based privacy blur — click and drag rectangles over faces (or any
// region) and the underlying pixels get blurred. Avoiding face-detection
// models keeps the bundle tiny and the tool predictable: the user decides
// what's sensitive, nothing leaves their browser, and partial faces (side
// profile, masks, kids) work just as well as front-on portraits.
type Region = { x: number; y: number; w: number; h: number };

export function BlurFaceClient() {
  const s = T[useLocale()] ?? T.en;

  const [file, setFile] = useState<File | null>(null);
  const [img, setImg] = useState<HTMLImageElement | null>(null);
  const [scale, setScale] = useState(1);                       // display → source px
  const [regions, setRegions] = useState<Region[]>([]);
  const [strength, setStrength] = useState(20);                 // blur radius in px
  const [out, setOut] = useState<{ url: string; size: number; name: string } | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const drag = useRef<{ x: number; y: number } | null>(null);

  const onFile = useCallback((f: File) => {
    setRegions([]); setOut(null);
    const url = URL.createObjectURL(f);
    const i = new Image();
    i.onload = () => { setFile(f); setImg(i); URL.revokeObjectURL(url); };
    i.onerror = () => URL.revokeObjectURL(url); // don't leak the URL on a bad image
    i.src = url;
  }, []);

  // Redraw whenever a region changes.
  useEffect(() => {
    if (!img || !canvasRef.current) return;
    const c = canvasRef.current;
    const maxSide = 720;
    const s2 = Math.min(1, maxSide / Math.max(img.naturalWidth, img.naturalHeight));
    setScale(s2);
    c.width = Math.round(img.naturalWidth * s2);
    c.height = Math.round(img.naturalHeight * s2);
    const ctx = c.getContext("2d")!;
    ctx.drawImage(img, 0, 0, c.width, c.height);
    for (const r of regions) {
      const dx = r.x * s2, dy = r.y * s2, dw = r.w * s2, dh = r.h * s2;
      ctx.save();
      ctx.filter = `blur(${strength * s2}px)`;
      ctx.drawImage(c, dx, dy, dw, dh, dx, dy, dw, dh);
      ctx.restore();
      ctx.strokeStyle = "rgba(45, 107, 228, 0.7)";
      ctx.lineWidth = 1.5;
      ctx.strokeRect(dx, dy, dw, dh);
    }
  }, [img, regions, strength]);

  // Mouse → source coordinates (drag on the scaled canvas, store at source res).
  const onDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    drag.current = { x: (e.clientX - r.left) / scale, y: (e.clientY - r.top) / scale };
  };
  const onUp = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!drag.current) return;
    const r = e.currentTarget.getBoundingClientRect();
    const x2 = (e.clientX - r.left) / scale, y2 = (e.clientY - r.top) / scale;
    const x = Math.min(drag.current.x, x2), y = Math.min(drag.current.y, y2);
    const w = Math.abs(x2 - drag.current.x), h = Math.abs(y2 - drag.current.y);
    drag.current = null;
    if (w < 8 || h < 8) return;
    setRegions((rs) => [...rs, { x, y, w, h }]);
  };

  const exportImg = useCallback(async () => {
    if (!img || !file) return;
    const c = document.createElement("canvas");
    c.width = img.naturalWidth; c.height = img.naturalHeight;
    const ctx = c.getContext("2d")!;
    ctx.drawImage(img, 0, 0);
    for (const r of regions) {
      ctx.save();
      ctx.filter = `blur(${strength}px)`;
      ctx.drawImage(c, r.x, r.y, r.w, r.h, r.x, r.y, r.w, r.h);
      ctx.restore();
    }
    const mime = file.type === "image/png" ? "image/png" : "image/jpeg";
    const blob: Blob = await new Promise((res) => c.toBlob((b) => res(b!), mime, 0.94));
    if (out) URL.revokeObjectURL(out.url);
    // Name the download with the actual output extension (a .webp input is
    // re-encoded to JPEG, so keeping the original name produced an unopenable
    // "blurred-x.webp" that was really JPEG bytes).
    const base = file.name.replace(/\.[^.]+$/, "") || "image";
    const ext = mime === "image/png" ? "png" : "jpg";
    setOut({ url: URL.createObjectURL(blob), size: blob.size, name: `blurred-${base}.${ext}` });
  }, [img, file, regions, strength, out]);

  const reset = () => {
    if (out) URL.revokeObjectURL(out.url);
    setFile(null); setImg(null); setRegions([]); setOut(null);
  };

  if (!file) {
    return (
      <MiniDrop
        label={s.dropLabel}
        accept={{ "image/jpeg": [".jpg", ".jpeg"], "image/png": [".png"], "image/webp": [".webp"] }}
        icon={<ImageIcon className="h-5 w-5" />}
        onFile={onFile}
        current={null}
        hint={s.dropHint}
      />
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0 truncate text-sm text-ink-700">{file.name}</div>
        <Button variant="ghost" size="sm" onClick={reset}><X className="h-4 w-4" /></Button>
      </div>

      <p className="text-sm text-ink-600">
        {s.drawInstruction}
      </p>

      <div className="rounded-lg border border-ink-100 bg-ink-50/40 p-3">
        <canvas ref={canvasRef} className="mx-auto block max-h-[440px] cursor-crosshair rounded" onMouseDown={onDown} onMouseUp={onUp} />
      </div>

      <div className="flex flex-wrap items-end gap-4">
        <label className="flex flex-col text-xs font-medium text-ink-600 sm:w-64">
          {s.blurStrength} {strength}px
          <input type="range" min={5} max={60} value={strength} onChange={(e) => setStrength(Number(e.target.value))} className="accent-brand-500" />
        </label>
        <button onClick={() => setRegions((r) => r.slice(0, -1))} disabled={!regions.length}
          className="inline-flex items-center gap-1 rounded-md border border-ink-200 bg-white px-3 py-1.5 text-xs font-medium text-ink-700 hover:border-brand-300 disabled:opacity-50">
          <Undo2 className="h-3.5 w-3.5" /> {s.undo}
        </button>
        <button onClick={() => setRegions([])} disabled={!regions.length}
          className="inline-flex items-center gap-1 rounded-md border border-ink-200 bg-white px-3 py-1.5 text-xs font-medium text-ink-700 hover:border-brand-300 disabled:opacity-50">
          <Eraser className="h-3.5 w-3.5" /> {s.clearAll}
        </button>
        <span className="text-xs text-ink-400">{regions.length} {regions.length === 1 ? s.region : s.regions}</span>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button onClick={exportImg} disabled={!regions.length}>{s.exportBlurred}</Button>
        {out && (
          <a href={out.url} download={out.name}
            className="inline-flex items-center gap-2 rounded-lg border border-brand-200 bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700 hover:bg-brand-100">
            <Download className="h-4 w-4" /> {s.download} ({formatBytes(out.size)})
          </a>
        )}
      </div>
    </div>
  );
}
