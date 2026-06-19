"use client";

import { useEffect, useRef, useState } from "react";
import { Upload, X, Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatBytes } from "@/lib/utils";
import { useLocale } from "@/hooks/useLocale";

type Pos = "center" | "bottom-right" | "bottom-left" | "top-right" | "top-left" | "tiled";

const T: Record<string, Record<string, string>> = {
  en: {
    uploadLabel: "Upload an image",
    uploadHint: "JPG, PNG or WebP — a text watermark is burned in, in your browser",
    labelWatermarkText: "Watermark text",
    labelPosition: "Position",
    posBottomRight: "Bottom right",
    posBottomLeft: "Bottom left",
    posTopRight: "Top right",
    posTopLeft: "Top left",
    posCenter: "Center",
    posTiled: "Tiled",
    labelColour: "Colour",
    labelOpacity: "Opacity",
    labelSize: "Size",
    ofWidth: "% of width",
    applyChanges: "Apply changes",
    rendering: "Rendering…",
    result: "Result",
    download: "Download",
    couldNotWatermark: "Could not watermark the image",
    privacy: "100% in your browser via Canvas — your image is never uploaded.",
  },
  fr: {
    uploadLabel: "Télécharger une image",
    uploadHint: "JPG, PNG ou WebP — un filigrane texte est gravé dans votre navigateur",
    labelWatermarkText: "Texte du filigrane",
    labelPosition: "Position",
    posBottomRight: "En bas à droite",
    posBottomLeft: "En bas à gauche",
    posTopRight: "En haut à droite",
    posTopLeft: "En haut à gauche",
    posCenter: "Centre",
    posTiled: "En mosaïque",
    labelColour: "Couleur",
    labelOpacity: "Opacité",
    labelSize: "Taille",
    ofWidth: "% de la largeur",
    applyChanges: "Appliquer les modifications",
    rendering: "Rendu…",
    result: "Résultat",
    download: "Télécharger",
    couldNotWatermark: "Impossible d'appliquer le filigrane",
    privacy: "100% dans votre navigateur via Canvas — votre image n'est jamais envoyée.",
  },
  es: {
    uploadLabel: "Subir una imagen",
    uploadHint: "JPG, PNG o WebP — se graba una marca de agua de texto en tu navegador",
    labelWatermarkText: "Texto de la marca de agua",
    labelPosition: "Posición",
    posBottomRight: "Abajo a la derecha",
    posBottomLeft: "Abajo a la izquierda",
    posTopRight: "Arriba a la derecha",
    posTopLeft: "Arriba a la izquierda",
    posCenter: "Centro",
    posTiled: "Mosaico",
    labelColour: "Color",
    labelOpacity: "Opacidad",
    labelSize: "Tamaño",
    ofWidth: "% del ancho",
    applyChanges: "Aplicar cambios",
    rendering: "Renderizando…",
    result: "Resultado",
    download: "Descargar",
    couldNotWatermark: "No se pudo aplicar la marca de agua",
    privacy: "100% en tu navegador vía Canvas — tu imagen nunca se sube.",
  },
  pt: {
    uploadLabel: "Carregar uma imagem",
    uploadHint: "JPG, PNG ou WebP — uma marca d'água de texto é gravada no seu navegador",
    labelWatermarkText: "Texto da marca d'água",
    labelPosition: "Posição",
    posBottomRight: "Canto inferior direito",
    posBottomLeft: "Canto inferior esquerdo",
    posTopRight: "Canto superior direito",
    posTopLeft: "Canto superior esquerdo",
    posCenter: "Centro",
    posTiled: "Em mosaico",
    labelColour: "Cor",
    labelOpacity: "Opacidade",
    labelSize: "Tamanho",
    ofWidth: "% da largura",
    applyChanges: "Aplicar alterações",
    rendering: "A renderizar…",
    result: "Resultado",
    download: "Baixar",
    couldNotWatermark: "Não foi possível aplicar a marca d'água",
    privacy: "100% no seu navegador via Canvas — a sua imagem nunca é enviada.",
  },
  de: {
    uploadLabel: "Bild hochladen",
    uploadHint: "JPG, PNG oder WebP — ein Textwasserzeichen wird im Browser eingebettet",
    labelWatermarkText: "Wasserzeichen-Text",
    labelPosition: "Position",
    posBottomRight: "Unten rechts",
    posBottomLeft: "Unten links",
    posTopRight: "Oben rechts",
    posTopLeft: "Oben links",
    posCenter: "Mitte",
    posTiled: "Gekachelt",
    labelColour: "Farbe",
    labelOpacity: "Deckkraft",
    labelSize: "Größe",
    ofWidth: "% der Breite",
    applyChanges: "Änderungen anwenden",
    rendering: "Wird gerendert…",
    result: "Ergebnis",
    download: "Herunterladen",
    couldNotWatermark: "Das Wasserzeichen konnte nicht eingebettet werden",
    privacy: "100% im Browser über Canvas — Ihr Bild wird nie hochgeladen.",
  },
  it: {
    uploadLabel: "Carica un'immagine",
    uploadHint: "JPG, PNG o WebP — una filigrana testuale viene incisa nel browser",
    labelWatermarkText: "Testo della filigrana",
    labelPosition: "Posizione",
    posBottomRight: "In basso a destra",
    posBottomLeft: "In basso a sinistra",
    posTopRight: "In alto a destra",
    posTopLeft: "In alto a sinistra",
    posCenter: "Centro",
    posTiled: "A mosaico",
    labelColour: "Colore",
    labelOpacity: "Opacità",
    labelSize: "Dimensione",
    ofWidth: "% della larghezza",
    applyChanges: "Applica modifiche",
    rendering: "Rendering…",
    result: "Risultato",
    download: "Scarica",
    couldNotWatermark: "Impossibile applicare la filigrana",
    privacy: "100% nel browser tramite Canvas — la tua immagine non viene mai caricata.",
  },
  nl: {
    uploadLabel: "Afbeelding uploaden",
    uploadHint: "JPG, PNG of WebP — een tekst-watermerk wordt ingebrand in uw browser",
    labelWatermarkText: "Watermerktekst",
    labelPosition: "Positie",
    posBottomRight: "Rechtsonder",
    posBottomLeft: "Linksonder",
    posTopRight: "Rechtsboven",
    posTopLeft: "Linksboven",
    posCenter: "Midden",
    posTiled: "Betegeld",
    labelColour: "Kleur",
    labelOpacity: "Transparantie",
    labelSize: "Grootte",
    ofWidth: "% van de breedte",
    applyChanges: "Wijzigingen toepassen",
    rendering: "Renderen…",
    result: "Resultaat",
    download: "Downloaden",
    couldNotWatermark: "Kon watermerk niet toepassen",
    privacy: "100% in uw browser via Canvas — uw afbeelding wordt nooit geüpload.",
  },
  ja: {
    uploadLabel: "画像をアップロード",
    uploadHint: "JPG, PNG または WebP — テキスト透かしがブラウザで書き込まれます",
    labelWatermarkText: "透かしテキスト",
    labelPosition: "位置",
    posBottomRight: "右下",
    posBottomLeft: "左下",
    posTopRight: "右上",
    posTopLeft: "左上",
    posCenter: "中央",
    posTiled: "タイル状",
    labelColour: "色",
    labelOpacity: "不透明度",
    labelSize: "サイズ",
    ofWidth: "% (幅に対する割合)",
    applyChanges: "変更を適用",
    rendering: "レンダリング中…",
    result: "結果",
    download: "ダウンロード",
    couldNotWatermark: "透かしを適用できませんでした",
    privacy: "ブラウザ内で Canvas を使用して処理—画像はアップロードされません。",
  },
  zh: {
    uploadLabel: "上传图片",
    uploadHint: "JPG、PNG 或 WebP — 文字水印在您的浏览器中嵌入",
    labelWatermarkText: "水印文字",
    labelPosition: "位置",
    posBottomRight: "右下",
    posBottomLeft: "左下",
    posTopRight: "右上",
    posTopLeft: "左上",
    posCenter: "居中",
    posTiled: "平铺",
    labelColour: "颜色",
    labelOpacity: "不透明度",
    labelSize: "大小",
    ofWidth: "% 宽度",
    applyChanges: "应用更改",
    rendering: "渲染中…",
    result: "结果",
    download: "下载",
    couldNotWatermark: "无法添加水印",
    privacy: "100% 在您的浏览器中通过 Canvas 处理—图片永远不会被上传。",
  },
  ko: {
    uploadLabel: "이미지 업로드",
    uploadHint: "JPG, PNG 또는 WebP — 텍스트 워터마크가 브라우저에서 삽입됩니다",
    labelWatermarkText: "워터마크 텍스트",
    labelPosition: "위치",
    posBottomRight: "오른쪽 하단",
    posBottomLeft: "왼쪽 하단",
    posTopRight: "오른쪽 상단",
    posTopLeft: "왼쪽 상단",
    posCenter: "가운데",
    posTiled: "타일",
    labelColour: "색상",
    labelOpacity: "불투명도",
    labelSize: "크기",
    ofWidth: "% 너비",
    applyChanges: "변경 적용",
    rendering: "렌더링 중…",
    result: "결과",
    download: "다운로드",
    couldNotWatermark: "워터마크를 적용할 수 없습니다",
    privacy: "브라우저에서 Canvas로 100% 처리—이미지는 업로드되지 않습니다.",
  },
  ar: {
    uploadLabel: "تحميل صورة",
    uploadHint: "JPG أو PNG أو WebP — يُحفَر علامة مائية نصية في متصفحك",
    labelWatermarkText: "نص العلامة المائية",
    labelPosition: "الموضع",
    posBottomRight: "أسفل اليمين",
    posBottomLeft: "أسفل اليسار",
    posTopRight: "أعلى اليمين",
    posTopLeft: "أعلى اليسار",
    posCenter: "المركز",
    posTiled: "مبلّط",
    labelColour: "اللون",
    labelOpacity: "الشفافية",
    labelSize: "الحجم",
    ofWidth: "% من العرض",
    applyChanges: "تطبيق التغييرات",
    rendering: "جاريالتصيير…",
    result: "النتيجة",
    download: "تنزيل",
    couldNotWatermark: "تعذّر إضافة العلامة المائية",
    privacy: "100% في متصفحك عبر Canvas — لا تُرفَع صورتك أبداً.",
  },
  ru: {
    uploadLabel: "Загрузить изображение",
    uploadHint: "JPG, PNG или WebP — текстовый водяной знак вносится в браузере",
    labelWatermarkText: "Текст водяного знака",
    labelPosition: "Позиция",
    posBottomRight: "Снизу справа",
    posBottomLeft: "Снизу слева",
    posTopRight: "Сверху справа",
    posTopLeft: "Сверху слева",
    posCenter: "По центру",
    posTiled: "Плиткой",
    labelColour: "Цвет",
    labelOpacity: "Прозрачность",
    labelSize: "Размер",
    ofWidth: "% ширины",
    applyChanges: "Применить изменения",
    rendering: "Рендеринг…",
    result: "Результат",
    download: "Скачать",
    couldNotWatermark: "Не удалось добавить водяной знак",
    privacy: "100% в браузере через Canvas — ваше изображение никогда не загружается.",
  },
  hi: {
    uploadLabel: "छवि अपलोड करें",
    uploadHint: "JPG, PNG या WebP — आपके ब्राउज़र में टेक्स्ट वॉटरमार्क डाला जाता है",
    labelWatermarkText: "वॉटरमार्क टेक्स्ट",
    labelPosition: "स्थान",
    posBottomRight: "नीचे दाईं ओर",
    posBottomLeft: "नीचे बाईं ओर",
    posTopRight: "ऊपर दाईं ओर",
    posTopLeft: "ऊपर बाईं ओर",
    posCenter: "केंद्र",
    posTiled: "टाइल्ड",
    labelColour: "रंग",
    labelOpacity: "अपारदर्शिता",
    labelSize: "आकार",
    ofWidth: "% चौड़ाई का",
    applyChanges: "परिवर्तन लागू करें",
    rendering: "रेंडर हो रहा है…",
    result: "परिणाम",
    download: "डाउनलोड",
    couldNotWatermark: "वॉटरमार्क नहीं लगाया जा सका",
    privacy: "आपके ब्राउज़र में Canvas के माध्यम से 100% — आपकी छवि कभी अपलोड नहीं होती।",
  },
  tr: {
    uploadLabel: "Görsel yükle",
    uploadHint: "JPG, PNG veya WebP — tarayıcınızda metin filigranı eklenir",
    labelWatermarkText: "Filigran metni",
    labelPosition: "Konum",
    posBottomRight: "Sağ alt",
    posBottomLeft: "Sol alt",
    posTopRight: "Sağ üst",
    posTopLeft: "Sol üst",
    posCenter: "Orta",
    posTiled: "Döşemeli",
    labelColour: "Renk",
    labelOpacity: "Opaklık",
    labelSize: "Boyut",
    ofWidth: "% genişlik",
    applyChanges: "Değişiklikleri uygula",
    rendering: "Oluşturuluyor…",
    result: "Sonuç",
    download: "İndir",
    couldNotWatermark: "Filigran uygulanamadı",
    privacy: "Tarayıcınızda Canvas ile %100 — görseliniz hiçbir zaman yüklenmez.",
  },
  id: {
    uploadLabel: "Unggah gambar",
    uploadHint: "JPG, PNG atau WebP — tanda air teks disisipkan di browser Anda",
    labelWatermarkText: "Teks tanda air",
    labelPosition: "Posisi",
    posBottomRight: "Kanan bawah",
    posBottomLeft: "Kiri bawah",
    posTopRight: "Kanan atas",
    posTopLeft: "Kiri atas",
    posCenter: "Tengah",
    posTiled: "Ubin",
    labelColour: "Warna",
    labelOpacity: "Opasitas",
    labelSize: "Ukuran",
    ofWidth: "% lebar",
    applyChanges: "Terapkan perubahan",
    rendering: "Merender…",
    result: "Hasil",
    download: "Unduh",
    couldNotWatermark: "Gagal menambahkan tanda air",
    privacy: "100% di browser Anda melalui Canvas — gambar Anda tidak pernah diunggah.",
  },
  vi: {
    uploadLabel: "Tải lên hình ảnh",
    uploadHint: "JPG, PNG hoặc WebP — hình mờ văn bản được chèn trong trình duyệt của bạn",
    labelWatermarkText: "Văn bản hình mờ",
    labelPosition: "Vị trí",
    posBottomRight: "Dưới cùng bên phải",
    posBottomLeft: "Dưới cùng bên trái",
    posTopRight: "Trên cùng bên phải",
    posTopLeft: "Trên cùng bên trái",
    posCenter: "Giữa",
    posTiled: "Lát gạch",
    labelColour: "Màu sắc",
    labelOpacity: "Độ mờ",
    labelSize: "Kích thước",
    ofWidth: "% chiều rộng",
    applyChanges: "Áp dụng thay đổi",
    rendering: "Đang render…",
    result: "Kết quả",
    download: "Tải xuống",
    couldNotWatermark: "Không thể thêm hình mờ",
    privacy: "100% trong trình duyệt của bạn qua Canvas — hình ảnh không bao giờ được tải lên.",
  },
  sv: {
    uploadLabel: "Ladda upp en bild",
    uploadHint: "JPG, PNG eller WebP — ett textvattenstämpel bränns in i din webbläsare",
    labelWatermarkText: "Vattenstämpeltext",
    labelPosition: "Position",
    posBottomRight: "Nere till höger",
    posBottomLeft: "Nere till vänster",
    posTopRight: "Uppe till höger",
    posTopLeft: "Uppe till vänster",
    posCenter: "Mitten",
    posTiled: "Kaklad",
    labelColour: "Färg",
    labelOpacity: "Opacitet",
    labelSize: "Storlek",
    ofWidth: "% av bredden",
    applyChanges: "Tillämpa ändringar",
    rendering: "Renderar…",
    result: "Resultat",
    download: "Ladda ned",
    couldNotWatermark: "Kunde inte lägga till vattenstämpel",
    privacy: "100% i din webbläsare via Canvas — din bild laddas aldrig upp.",
  },
  pl: {
    uploadLabel: "Prześlij obraz",
    uploadHint: "JPG, PNG lub WebP — tekstowy znak wodny jest wpisywany w Twojej przeglądarce",
    labelWatermarkText: "Tekst znaku wodnego",
    labelPosition: "Pozycja",
    posBottomRight: "Prawy dół",
    posBottomLeft: "Lewy dół",
    posTopRight: "Prawy górny",
    posTopLeft: "Lewy górny",
    posCenter: "Środek",
    posTiled: "Kafelkowy",
    labelColour: "Kolor",
    labelOpacity: "Przezroczystość",
    labelSize: "Rozmiar",
    ofWidth: "% szerokości",
    applyChanges: "Zastosuj zmiany",
    rendering: "Renderowanie…",
    result: "Wynik",
    download: "Pobierz",
    couldNotWatermark: "Nie można dodać znaku wodnego",
    privacy: "100% w Twojej przeglądarce przez Canvas — Twój obraz nigdy nie jest przesyłany.",
  },
  uk: {
    uploadLabel: "Завантажити зображення",
    uploadHint: "JPG, PNG або WebP — текстовий водяний знак вбудовується у браузері",
    labelWatermarkText: "Текст водяного знака",
    labelPosition: "Позиція",
    posBottomRight: "Знизу праворуч",
    posBottomLeft: "Знизу ліворуч",
    posTopRight: "Зверху праворуч",
    posTopLeft: "Зверху ліворуч",
    posCenter: "По центру",
    posTiled: "Плиткою",
    labelColour: "Колір",
    labelOpacity: "Прозорість",
    labelSize: "Розмір",
    ofWidth: "% ширини",
    applyChanges: "Застосувати зміни",
    rendering: "Рендеринг…",
    result: "Результат",
    download: "Завантажити",
    couldNotWatermark: "Не вдалося додати водяний знак",
    privacy: "100% у браузері через Canvas — зображення ніколи не завантажується.",
  },
  cs: {
    uploadLabel: "Nahrát obrázek",
    uploadHint: "JPG, PNG nebo WebP — textový vodoznak je vložen ve vašem prohlížeči",
    labelWatermarkText: "Text vodoznaku",
    labelPosition: "Pozice",
    posBottomRight: "Vpravo dole",
    posBottomLeft: "Vlevo dole",
    posTopRight: "Vpravo nahoře",
    posTopLeft: "Vlevo nahoře",
    posCenter: "Střed",
    posTiled: "Dlaždice",
    labelColour: "Barva",
    labelOpacity: "Průhlednost",
    labelSize: "Velikost",
    ofWidth: "% šířky",
    applyChanges: "Použít změny",
    rendering: "Renderování…",
    result: "Výsledek",
    download: "Stáhnout",
    couldNotWatermark: "Nelze přidat vodoznak",
    privacy: "100% ve vašem prohlížeči přes Canvas — váš obrázek se nikdy nenačítá.",
  },
};

export function WatermarkImageClient() {
  const s = T[useLocale()] ?? T.en;

  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState("© Konvertools");
  const [color, setColor] = useState("#ffffff");
  const [opacity, setOpacity] = useState(0.5);
  const [sizePct, setSizePct] = useState(6);
  const [pos, setPos] = useState<Pos>("bottom-right");
  const [outUrl, setOutUrl] = useState<string | null>(null);
  const [outSize, setOutSize] = useState(0);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const cleanup = useRef<string | null>(null);

  useEffect(() => () => { if (cleanup.current) URL.revokeObjectURL(cleanup.current); }, []);

  async function run(f: File) {
    setBusy(true); setError(null); setOutUrl(null);
    try {
      const bmp = await createImageBitmap(f);
      const canvas = document.createElement("canvas");
      canvas.width = bmp.width; canvas.height = bmp.height;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(bmp, 0, 0);
      bmp.close();

      const fontPx = Math.max(10, Math.round((sizePct / 100) * canvas.width));
      ctx.font = `bold ${fontPx}px sans-serif`;
      ctx.fillStyle = color;
      ctx.globalAlpha = opacity;
      ctx.textBaseline = "middle";
      const m = ctx.measureText(text);
      const pad = fontPx * 0.6;

      if (pos === "tiled") {
        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate(-Math.PI / 6);
        ctx.textAlign = "center";
        const stepX = m.width + fontPx * 3;
        const stepY = fontPx * 3;
        for (let y = -canvas.height; y < canvas.height; y += stepY) {
          for (let x = -canvas.width; x < canvas.width; x += stepX) {
            ctx.fillText(text, x, y);
          }
        }
        ctx.restore();
      } else {
        ctx.textAlign = "left";
        let x = pad, y = canvas.height - pad - fontPx / 2;
        if (pos === "center") { x = (canvas.width - m.width) / 2; y = canvas.height / 2; }
        else {
          if (pos.endsWith("right")) x = canvas.width - m.width - pad;
          if (pos.startsWith("top")) y = pad + fontPx / 2;
        }
        ctx.fillText(text, x, y);
      }
      ctx.globalAlpha = 1;

      const out: Blob = await new Promise((res) => canvas.toBlob((b) => res(b!), f.type === "image/jpeg" ? "image/jpeg" : "image/png", 0.95));
      if (cleanup.current) URL.revokeObjectURL(cleanup.current);
      const url = URL.createObjectURL(out);
      cleanup.current = url;
      setOutUrl(url); setOutSize(out.size);
    } catch (e) {
      setError(`${s.couldNotWatermark}: ${(e as Error).message}`);
    } finally {
      setBusy(false);
    }
  }

  function pick(f: File | null) { if (!f) return; setFile(f); run(f); }
  function rerun() { if (file) run(file); }

  // Live preview: re-render shortly after any setting changes, debounced so
  // typing the watermark text doesn't re-encode the image on every keystroke.
  useEffect(() => {
    if (!file) return;
    const id = setTimeout(() => run(file), 250);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, color, opacity, sizePct, pos]);

  return (
    <div className="space-y-4">
      {!file ? (
        <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-amber-300 bg-amber-50/40 px-6 py-12 text-center transition-colors hover:brightness-95">
          <Upload className="h-7 w-7 text-amber-600" />
          <span className="mt-2 font-medium text-ink-900">{s.uploadLabel}</span>
          <span className="mt-0.5 text-xs text-ink-400">{s.uploadHint}</span>
          <input type="file" accept="image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp" className="hidden" onChange={(e) => pick(e.target.files?.[0] ?? null)} />
        </label>
      ) : (
        <div className="flex items-center justify-between rounded-lg border border-ink-100 bg-white px-4 py-2.5 text-sm">
          <div className="min-w-0 truncate"><span className="font-medium text-ink-900">{file.name}</span><span className="ml-2 text-ink-400">{formatBytes(file.size)}</span></div>
          <button onClick={() => { setFile(null); setOutUrl(null); }} aria-label="Remove" className="rounded p-1 text-ink-400 hover:bg-ink-50 hover:text-ink-700"><X className="h-3.5 w-3.5" /></button>
        </div>
      )}

      {file && (
        <div className="grid gap-3 rounded-lg border border-ink-100 bg-white p-4 sm:grid-cols-2">
          <label className="flex flex-col text-xs font-medium text-ink-600 sm:col-span-2">
            {s.labelWatermarkText}
            <input value={text} onChange={(e) => setText(e.target.value)} onBlur={rerun} className="mt-1 rounded-md border border-ink-200 px-3 py-2 text-sm" />
          </label>
          <label className="flex flex-col text-xs font-medium text-ink-600">
            {s.labelPosition}
            <select value={pos} onChange={(e) => { setPos(e.target.value as Pos); }} onBlur={rerun} className="mt-1 rounded-md border border-ink-200 px-2 py-1.5 text-sm">
              <option value="bottom-right">{s.posBottomRight}</option>
              <option value="bottom-left">{s.posBottomLeft}</option>
              <option value="top-right">{s.posTopRight}</option>
              <option value="top-left">{s.posTopLeft}</option>
              <option value="center">{s.posCenter}</option>
              <option value="tiled">{s.posTiled}</option>
            </select>
          </label>
          <label className="flex items-center gap-2 text-xs font-medium text-ink-600">
            {s.labelColour} <input type="color" value={color} onChange={(e) => setColor(e.target.value)} onBlur={rerun} className="h-7 w-10 cursor-pointer rounded border-0 bg-transparent p-0" />
          </label>
          <label className="flex flex-col text-xs font-medium text-ink-600">
            {s.labelOpacity}: {Math.round(opacity * 100)}%
            <input type="range" min={10} max={100} value={opacity * 100} onChange={(e) => setOpacity(Number(e.target.value) / 100)} onMouseUp={rerun} onTouchEnd={rerun} className="mt-1" />
          </label>
          <label className="flex flex-col text-xs font-medium text-ink-600">
            {s.labelSize}: {sizePct}{s.ofWidth}
            <input type="range" min={2} max={20} value={sizePct} onChange={(e) => setSizePct(Number(e.target.value))} onMouseUp={rerun} onTouchEnd={rerun} className="mt-1" />
          </label>
          <div className="sm:col-span-2">
            <Button size="sm" variant="outline" onClick={rerun}>{s.applyChanges}</Button>
          </div>
        </div>
      )}

      {busy && <p className="flex items-center gap-2 text-sm text-ink-500"><Loader2 className="h-4 w-4 animate-spin" /> {s.rendering}</p>}

      {outUrl && (
        <div className="rounded-lg border border-ink-100 bg-white p-3">
          <p className="mb-2 text-sm font-medium text-ink-700">{s.result} &middot; {formatBytes(outSize)}</p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={outUrl} alt="Watermarked" className="max-h-96 w-full rounded object-contain" />
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        {outUrl && <a href={outUrl} download={file ? file.name.replace(/(\.[^.]+)?$/, "-watermarked$1") : "watermarked.png"}><Button size="lg"><Download className="h-4 w-4" /> {s.download}</Button></a>}
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}
      <p className="text-xs text-ink-400">{s.privacy}</p>
    </div>
  );
}
