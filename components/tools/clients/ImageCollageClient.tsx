"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Download, X, Upload, Trash2, GripVertical } from "lucide-react";
import { ReorderButtons } from "@/components/tools/ReorderButtons";
import { Button } from "@/components/ui/button";
import { formatBytes } from "@/lib/utils";
import { useLocale } from "@/hooks/useLocale";

// Composite N images onto a single canvas. Five preset layouts cover the
// 95% of "collage" search intent (grids + strips). Pure client-side via
// canvas — no upload, no encoder dep.
type Photo = { id: string; file: File; url: string; img?: HTMLImageElement };

type Layout = { id: string; name: string; cols: number; rows: number };

const T: Record<string, Record<string, string>> = {
  en: {
    dropPhotos: "Drop your photos",
    dropHint: "Pick a layout, drag to reorder — runs entirely in your browser.",
    choosePhotos: "Choose photos",
    photosCount: "photo",
    photosCountPlural: "photos",
    onlyFirstFit: "only the first",
    fitLayout: "fit the",
    fitLayoutSuffix: "layout",
    addMore: "Add more",
    gapLabel: "Gap",
    longestSide: "Longest side",
    background: "Background",
    exportCollage: "Export collage",
    download: "Download",
    layoutSideBySide: "Side by side",
    layoutTopBottom: "Top / bottom",
    layout2x2: "2 × 2 grid",
    layout3x3: "3 × 3 grid",
    layoutHStrip: "Horizontal strip (4)",
  },
  fr: {
    dropPhotos: "Déposez vos photos",
    dropHint: "Choisissez une disposition, glissez pour réorganiser — fonctionne entièrement dans votre navigateur.",
    choosePhotos: "Choisir des photos",
    photosCount: "photo",
    photosCountPlural: "photos",
    onlyFirstFit: "seules les",
    fitLayout: "premières correspondent à la disposition",
    fitLayoutSuffix: "",
    addMore: "Ajouter",
    gapLabel: "Espace",
    longestSide: "Côté le plus long",
    background: "Arrière-plan",
    exportCollage: "Exporter le collage",
    download: "Télécharger",
    layoutSideBySide: "Côte à côte",
    layoutTopBottom: "Haut / bas",
    layout2x2: "Grille 2 × 2",
    layout3x3: "Grille 3 × 3",
    layoutHStrip: "Bande horizontale (4)",
  },
  es: {
    dropPhotos: "Suelta tus fotos",
    dropHint: "Elige un diseño, arrastra para reordenar — funciona completamente en tu navegador.",
    choosePhotos: "Elegir fotos",
    photosCount: "foto",
    photosCountPlural: "fotos",
    onlyFirstFit: "solo las primeras",
    fitLayout: "caben en el diseño",
    fitLayoutSuffix: "",
    addMore: "Añadir más",
    gapLabel: "Espacio",
    longestSide: "Lado más largo",
    background: "Fondo",
    exportCollage: "Exportar collage",
    download: "Descargar",
    layoutSideBySide: "Lado a lado",
    layoutTopBottom: "Arriba / abajo",
    layout2x2: "Cuadrícula 2 × 2",
    layout3x3: "Cuadrícula 3 × 3",
    layoutHStrip: "Tira horizontal (4)",
  },
  pt: {
    dropPhotos: "Solte suas fotos",
    dropHint: "Escolha um layout, arraste para reordenar — funciona inteiramente no seu navegador.",
    choosePhotos: "Escolher fotos",
    photosCount: "foto",
    photosCountPlural: "fotos",
    onlyFirstFit: "apenas as primeiras",
    fitLayout: "cabem no layout",
    fitLayoutSuffix: "",
    addMore: "Adicionar mais",
    gapLabel: "Espaço",
    longestSide: "Lado mais longo",
    background: "Fundo",
    exportCollage: "Exportar colagem",
    download: "Baixar",
    layoutSideBySide: "Lado a lado",
    layoutTopBottom: "Cima / baixo",
    layout2x2: "Grade 2 × 2",
    layout3x3: "Grade 3 × 3",
    layoutHStrip: "Faixa horizontal (4)",
  },
  de: {
    dropPhotos: "Fotos ablegen",
    dropHint: "Layout wählen, per Drag & Drop neu anordnen — läuft vollständig in Ihrem Browser.",
    choosePhotos: "Fotos auswählen",
    photosCount: "Foto",
    photosCountPlural: "Fotos",
    onlyFirstFit: "nur die ersten",
    fitLayout: "passen ins Layout",
    fitLayoutSuffix: "",
    addMore: "Mehr hinzufügen",
    gapLabel: "Abstand",
    longestSide: "Längste Seite",
    background: "Hintergrund",
    exportCollage: "Collage exportieren",
    download: "Herunterladen",
    layoutSideBySide: "Nebeneinander",
    layoutTopBottom: "Oben / unten",
    layout2x2: "2 × 2 Raster",
    layout3x3: "3 × 3 Raster",
    layoutHStrip: "Horizontaler Streifen (4)",
  },
  it: {
    dropPhotos: "Trascina le tue foto",
    dropHint: "Scegli un layout, trascina per riordinare — funziona interamente nel browser.",
    choosePhotos: "Scegli foto",
    photosCount: "foto",
    photosCountPlural: "foto",
    onlyFirstFit: "solo le prime",
    fitLayout: "rientrano nel layout",
    fitLayoutSuffix: "",
    addMore: "Aggiungi altre",
    gapLabel: "Spazio",
    longestSide: "Lato più lungo",
    background: "Sfondo",
    exportCollage: "Esporta collage",
    download: "Scarica",
    layoutSideBySide: "Fianco a fianco",
    layoutTopBottom: "Alto / basso",
    layout2x2: "Griglia 2 × 2",
    layout3x3: "Griglia 3 × 3",
    layoutHStrip: "Striscia orizzontale (4)",
  },
  nl: {
    dropPhotos: "Zet uw foto's hier neer",
    dropHint: "Kies een indeling, sleep om te herordenen — werkt volledig in uw browser.",
    choosePhotos: "Foto's kiezen",
    photosCount: "foto",
    photosCountPlural: "foto's",
    onlyFirstFit: "alleen de eerste",
    fitLayout: "passen in de indeling",
    fitLayoutSuffix: "",
    addMore: "Meer toevoegen",
    gapLabel: "Ruimte",
    longestSide: "Langste zijde",
    background: "Achtergrond",
    exportCollage: "Collage exporteren",
    download: "Downloaden",
    layoutSideBySide: "Naast elkaar",
    layoutTopBottom: "Boven / onder",
    layout2x2: "2 × 2 raster",
    layout3x3: "3 × 3 raster",
    layoutHStrip: "Horizontale strook (4)",
  },
  ja: {
    dropPhotos: "写真をドロップ",
    dropHint: "レイアウトを選んでドラッグで並び替え — ブラウザ内で完全動作。",
    choosePhotos: "写真を選ぶ",
    photosCount: "枚",
    photosCountPlural: "枚",
    onlyFirstFit: "最初の",
    fitLayout: "枚のみがレイアウトに収まります",
    fitLayoutSuffix: "",
    addMore: "追加",
    gapLabel: "隙間",
    longestSide: "長辺",
    background: "背景",
    exportCollage: "コラージュをエクスポート",
    download: "ダウンロード",
    layoutSideBySide: "左右に並べる",
    layoutTopBottom: "上下に並べる",
    layout2x2: "2 × 2 グリッド",
    layout3x3: "3 × 3 グリッド",
    layoutHStrip: "横ストリップ (4)",
  },
  zh: {
    dropPhotos: "拖放您的照片",
    dropHint: "选择布局，拖动重新排序 — 完全在浏览器中运行。",
    choosePhotos: "选择照片",
    photosCount: "张",
    photosCountPlural: "张",
    onlyFirstFit: "只有前",
    fitLayout: "张符合",
    fitLayoutSuffix: "布局",
    addMore: "添加更多",
    gapLabel: "间距",
    longestSide: "最长边",
    background: "背景",
    exportCollage: "导出拼贴",
    download: "下载",
    layoutSideBySide: "并排",
    layoutTopBottom: "上下",
    layout2x2: "2 × 2 网格",
    layout3x3: "3 × 3 网格",
    layoutHStrip: "水平条带 (4)",
  },
  ko: {
    dropPhotos: "사진을 드롭하세요",
    dropHint: "레이아웃을 고르고 드래그하여 순서 변경 — 브라우저에서 완전히 실행됩니다.",
    choosePhotos: "사진 선택",
    photosCount: "장",
    photosCountPlural: "장",
    onlyFirstFit: "처음",
    fitLayout: "장만",
    fitLayoutSuffix: "레이아웃에 맞음",
    addMore: "더 추가",
    gapLabel: "간격",
    longestSide: "가장 긴 면",
    background: "배경",
    exportCollage: "콜라주 내보내기",
    download: "다운로드",
    layoutSideBySide: "나란히",
    layoutTopBottom: "위 / 아래",
    layout2x2: "2 × 2 그리드",
    layout3x3: "3 × 3 그리드",
    layoutHStrip: "가로 스트립 (4)",
  },
  ar: {
    dropPhotos: "أسقط صورك هنا",
    dropHint: "اختر تخطيطًا واسحب لإعادة الترتيب — يعمل بالكامل في متصفحك.",
    choosePhotos: "اختر الصور",
    photosCount: "صورة",
    photosCountPlural: "صور",
    onlyFirstFit: "فقط الـ",
    fitLayout: "الأولى تناسب تخطيط",
    fitLayoutSuffix: "",
    addMore: "إضافة المزيد",
    gapLabel: "الفجوة",
    longestSide: "الجانب الأطول",
    background: "الخلفية",
    exportCollage: "تصدير الكولاج",
    download: "تنزيل",
    layoutSideBySide: "جنبًا إلى جنب",
    layoutTopBottom: "أعلى / أسفل",
    layout2x2: "شبكة 2 × 2",
    layout3x3: "شبكة 3 × 3",
    layoutHStrip: "شريط أفقي (4)",
  },
  ru: {
    dropPhotos: "Перетащите фотографии",
    dropHint: "Выберите макет, перетаскивайте для изменения порядка — работает полностью в браузере.",
    choosePhotos: "Выбрать фотографии",
    photosCount: "фото",
    photosCountPlural: "фото",
    onlyFirstFit: "только первые",
    fitLayout: "вмещаются в макет",
    fitLayoutSuffix: "",
    addMore: "Добавить ещё",
    gapLabel: "Отступ",
    longestSide: "Длинная сторона",
    background: "Фон",
    exportCollage: "Экспортировать коллаж",
    download: "Скачать",
    layoutSideBySide: "Рядом",
    layoutTopBottom: "Сверху / снизу",
    layout2x2: "Сетка 2 × 2",
    layout3x3: "Сетка 3 × 3",
    layoutHStrip: "Горизонтальная полоса (4)",
  },
  hi: {
    dropPhotos: "अपनी फ़ोटो यहाँ छोड़ें",
    dropHint: "एक लेआउट चुनें, पुनः क्रमित करने के लिए खींचें — पूरी तरह आपके ब्राउज़र में चलता है।",
    choosePhotos: "फ़ोटो चुनें",
    photosCount: "फ़ोटो",
    photosCountPlural: "फ़ोटो",
    onlyFirstFit: "केवल पहले",
    fitLayout: "लेआउट में फिट होते हैं",
    fitLayoutSuffix: "",
    addMore: "और जोड़ें",
    gapLabel: "अंतर",
    longestSide: "सबसे लंबी भुजा",
    background: "पृष्ठभूमि",
    exportCollage: "कोलाज निर्यात करें",
    download: "डाउनलोड",
    layoutSideBySide: "बगल में",
    layoutTopBottom: "ऊपर / नीचे",
    layout2x2: "2 × 2 ग्रिड",
    layout3x3: "3 × 3 ग्रिड",
    layoutHStrip: "क्षैतिज पट्टी (4)",
  },
  tr: {
    dropPhotos: "Fotoğraflarınızı bırakın",
    dropHint: "Bir düzen seçin, sıralamak için sürükleyin — tamamen tarayıcınızda çalışır.",
    choosePhotos: "Fotoğraf seç",
    photosCount: "fotoğraf",
    photosCountPlural: "fotoğraf",
    onlyFirstFit: "yalnızca ilk",
    fitLayout: "düzene sığar",
    fitLayoutSuffix: "",
    addMore: "Daha fazla ekle",
    gapLabel: "Boşluk",
    longestSide: "En uzun kenar",
    background: "Arka plan",
    exportCollage: "Kolaj dışa aktar",
    download: "İndir",
    layoutSideBySide: "Yan yana",
    layoutTopBottom: "Üst / alt",
    layout2x2: "2 × 2 ızgara",
    layout3x3: "3 × 3 ızgara",
    layoutHStrip: "Yatay şerit (4)",
  },
  id: {
    dropPhotos: "Jatuhkan foto Anda",
    dropHint: "Pilih tata letak, seret untuk mengurutkan ulang — berjalan sepenuhnya di browser Anda.",
    choosePhotos: "Pilih foto",
    photosCount: "foto",
    photosCountPlural: "foto",
    onlyFirstFit: "hanya",
    fitLayout: "pertama yang cocok dengan tata letak",
    fitLayoutSuffix: "",
    addMore: "Tambah lebih banyak",
    gapLabel: "Jarak",
    longestSide: "Sisi terpanjang",
    background: "Latar belakang",
    exportCollage: "Ekspor kolase",
    download: "Unduh",
    layoutSideBySide: "Berdampingan",
    layoutTopBottom: "Atas / bawah",
    layout2x2: "Grid 2 × 2",
    layout3x3: "Grid 3 × 3",
    layoutHStrip: "Strip horizontal (4)",
  },
  vi: {
    dropPhotos: "Thả ảnh của bạn vào đây",
    dropHint: "Chọn bố cục, kéo để sắp xếp lại — chạy hoàn toàn trên trình duyệt.",
    choosePhotos: "Chọn ảnh",
    photosCount: "ảnh",
    photosCountPlural: "ảnh",
    onlyFirstFit: "chỉ",
    fitLayout: "ảnh đầu phù hợp với bố cục",
    fitLayoutSuffix: "",
    addMore: "Thêm ảnh",
    gapLabel: "Khoảng cách",
    longestSide: "Cạnh dài nhất",
    background: "Nền",
    exportCollage: "Xuất ảnh ghép",
    download: "Tải xuống",
    layoutSideBySide: "Cạnh nhau",
    layoutTopBottom: "Trên / dưới",
    layout2x2: "Lưới 2 × 2",
    layout3x3: "Lưới 3 × 3",
    layoutHStrip: "Dải ngang (4)",
  },
  sv: {
    dropPhotos: "Släpp dina foton här",
    dropHint: "Välj en layout, dra för att ändra ordning — körs helt i din webbläsare.",
    choosePhotos: "Välj foton",
    photosCount: "foto",
    photosCountPlural: "foton",
    onlyFirstFit: "bara de första",
    fitLayout: "passar i layouten",
    fitLayoutSuffix: "",
    addMore: "Lägg till fler",
    gapLabel: "Mellanrum",
    longestSide: "Längsta sidan",
    background: "Bakgrund",
    exportCollage: "Exportera kollage",
    download: "Ladda ner",
    layoutSideBySide: "Sida vid sida",
    layoutTopBottom: "Upp / ner",
    layout2x2: "2 × 2 rutnät",
    layout3x3: "3 × 3 rutnät",
    layoutHStrip: "Horisontell remsa (4)",
  },
  pl: {
    dropPhotos: "Upuść swoje zdjęcia",
    dropHint: "Wybierz układ, przeciągnij, aby zmienić kolejność — działa całkowicie w przeglądarce.",
    choosePhotos: "Wybierz zdjęcia",
    photosCount: "zdjęcie",
    photosCountPlural: "zdjęcia",
    onlyFirstFit: "tylko pierwsze",
    fitLayout: "mieści się w układzie",
    fitLayoutSuffix: "",
    addMore: "Dodaj więcej",
    gapLabel: "Odstęp",
    longestSide: "Najdłuższy bok",
    background: "Tło",
    exportCollage: "Eksportuj kolaż",
    download: "Pobierz",
    layoutSideBySide: "Obok siebie",
    layoutTopBottom: "Góra / dół",
    layout2x2: "Siatka 2 × 2",
    layout3x3: "Siatka 3 × 3",
    layoutHStrip: "Poziomy pasek (4)",
  },
  uk: {
    dropPhotos: "Перетягніть ваші фото",
    dropHint: "Виберіть макет, перетягуйте для зміни порядку — повністю у вашому браузері.",
    choosePhotos: "Вибрати фото",
    photosCount: "фото",
    photosCountPlural: "фото",
    onlyFirstFit: "лише перші",
    fitLayout: "вміщаються у макет",
    fitLayoutSuffix: "",
    addMore: "Додати ще",
    gapLabel: "Відступ",
    longestSide: "Довга сторона",
    background: "Фон",
    exportCollage: "Експортувати колаж",
    download: "Завантажити",
    layoutSideBySide: "Поряд",
    layoutTopBottom: "Зверху / знизу",
    layout2x2: "Сітка 2 × 2",
    layout3x3: "Сітка 3 × 3",
    layoutHStrip: "Горизонтальна смуга (4)",
  },
  cs: {
    dropPhotos: "Přetáhněte fotografie sem",
    dropHint: "Vyberte rozložení, přetahujte pro změnu pořadí — běží celé ve vašem prohlížeči.",
    choosePhotos: "Vybrat fotografie",
    photosCount: "fotografie",
    photosCountPlural: "fotografie",
    onlyFirstFit: "jen prvních",
    fitLayout: "se vejde do rozložení",
    fitLayoutSuffix: "",
    addMore: "Přidat další",
    gapLabel: "Mezera",
    longestSide: "Nejdelší strana",
    background: "Pozadí",
    exportCollage: "Exportovat koláž",
    download: "Stáhnout",
    layoutSideBySide: "Vedle sebe",
    layoutTopBottom: "Nahoře / dole",
    layout2x2: "Mřížka 2 × 2",
    layout3x3: "Mřížka 3 × 3",
    layoutHStrip: "Vodorovný pruh (4)",
  },
};

export function ImageCollageClient() {
  const s = T[useLocale()] ?? T.en;

  const LAYOUTS: Layout[] = [
    { id: "1x2-h", name: s.layoutSideBySide, cols: 2, rows: 1 },
    { id: "2x1-v", name: s.layoutTopBottom, cols: 1, rows: 2 },
    { id: "2x2", name: s.layout2x2, cols: 2, rows: 2 },
    { id: "3x3", name: s.layout3x3, cols: 3, rows: 3 },
    { id: "1x4-h", name: s.layoutHStrip, cols: 4, rows: 1 },
  ];

  const [photos, setPhotos] = useState<Photo[]>([]);
  const [layout, setLayout] = useState<Layout>(LAYOUTS[2]);
  const [gap, setGap] = useState(8);
  const [bg, setBg] = useState("#ffffff");
  const [side, setSide] = useState(1200);                  // longest side, px
  const [out, setOut] = useState<{ url: string; size: number } | null>(null);
  const dragIdx = useRef<number | null>(null);
  const previewRef = useRef<HTMLCanvasElement | null>(null);

  // Revoke object URLs only on unmount (see ImagesToGifClient): keying on
  // [photos, out] revoked live thumbnails on every add/remove/reorder.
  const cleanupRef = useRef({ photos, out });
  cleanupRef.current = { photos, out };
  useEffect(() => () => {
    cleanupRef.current.photos.forEach((p) => URL.revokeObjectURL(p.url));
    if (cleanupRef.current.out) URL.revokeObjectURL(cleanupRef.current.out.url);
  }, []);

  // Decode every newly added photo so the preview can draw it immediately.
  const onFiles = useCallback(async (files: FileList | null) => {
    if (!files) return;
    const next: Photo[] = [];
    for (const f of Array.from(files)) {
      if (!f.type.startsWith("image/")) continue;
      const url = URL.createObjectURL(f);
      const img = await new Promise<HTMLImageElement | null>((res) => {
        const i = new Image();
        i.onload = () => res(i);
        // Without onerror a corrupt file (that still passes the type check) would
        // hang the await forever, blocking the whole batch and leaking the URL.
        i.onerror = () => { URL.revokeObjectURL(url); res(null); };
        i.src = url;
      });
      if (!img) continue;
      next.push({ id: crypto.randomUUID(), file: f, url, img });
    }
    setPhotos((p) => [...p, ...next]);
  }, []);

  // Live preview, scaled to ~720px on the long edge.
  useEffect(() => {
    if (!previewRef.current) return;
    const cap = layout.cols * layout.rows;
    const used = photos.slice(0, cap);
    const previewMax = 720;
    const scale = previewMax / side;
    drawCollage(previewRef.current, used, layout, gap * scale, bg, Math.round(side * scale));
  }, [photos, layout, gap, bg, side]);

  const move = (from: number, to: number) => {
    if (from === to) return;
    setPhotos((p) => { const c = p.slice(); const [it] = c.splice(from, 1); c.splice(to, 0, it); return c; });
  };
  const remove = (i: number) => setPhotos((p) => p.filter((_, idx) => idx !== i));

  const exportCollage = useCallback(async () => {
    if (!photos.length) return;
    const cap = layout.cols * layout.rows;
    const c = document.createElement("canvas");
    drawCollage(c, photos.slice(0, cap), layout, gap, bg, side);
    const blob: Blob | null = await new Promise((res) => c.toBlob((b) => res(b), "image/png"));
    if (!blob) return; // toBlob can return null past the canvas-area limit
    if (out) URL.revokeObjectURL(out.url);
    setOut({ url: URL.createObjectURL(blob), size: blob.size });
  }, [photos, layout, gap, bg, side, out]);

  const reset = () => {
    photos.forEach((p) => URL.revokeObjectURL(p.url));
    if (out) URL.revokeObjectURL(out.url);
    setPhotos([]); setOut(null);
  };

  if (!photos.length) {
    return (
      <label className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-ink-200 bg-ink-50/40 px-6 py-16 text-center transition hover:border-brand-400">
        <Upload className="h-8 w-8 text-ink-400" />
        <div className="text-base font-semibold text-ink-900">{s.dropPhotos}</div>
        <div className="text-sm text-ink-500">{s.dropHint}</div>
        <input type="file" accept="image/*" multiple className="sr-only" onChange={(e) => onFiles(e.target.files)} />
        <span className="mt-2 rounded-lg bg-brand-500 px-4 py-2 text-sm font-semibold text-white">{s.choosePhotos}</span>
      </label>
    );
  }

  const cap = layout.cols * layout.rows;
  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="text-sm text-ink-700">
          {photos.length} {photos.length === 1 ? s.photosCount : s.photosCountPlural}
          {photos.length > cap && <span className="ml-2 text-amber-700">({s.onlyFirstFit} {cap} {s.fitLayout} {layout.name}{s.fitLayoutSuffix ? ` ${s.fitLayoutSuffix}` : ""})</span>}
        </div>
        <div className="flex items-center gap-2">
          <label className="inline-flex cursor-pointer items-center gap-1 rounded-md border border-ink-200 bg-white px-3 py-1.5 text-xs font-medium text-ink-700 hover:border-brand-300">
            <Upload className="h-3.5 w-3.5" /> {s.addMore}
            <input type="file" accept="image/*" multiple className="sr-only" onChange={(e) => onFiles(e.target.files)} />
          </label>
          <Button variant="ghost" size="sm" onClick={reset}><X className="h-4 w-4" /></Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {LAYOUTS.map((l) => (
          <button key={l.id} onClick={() => setLayout(l)}
            className={`rounded-full border px-3 py-1 text-xs font-medium ${layout.id === l.id ? "border-brand-300 bg-brand-50 text-brand-700" : "border-ink-200 bg-white text-ink-700"}`}>
            {l.name}
          </button>
        ))}
      </div>

      <ul className="grid grid-cols-3 gap-3 sm:grid-cols-5 md:grid-cols-6">
        {photos.map((p, i) => (
          <li key={p.id}
            draggable
            onDragStart={() => { dragIdx.current = i; }}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => { if (dragIdx.current !== null) move(dragIdx.current, i); dragIdx.current = null; }}
            className={`group relative cursor-move rounded-lg border bg-white p-1.5 shadow-sm hover:border-brand-300 ${i < cap ? "border-ink-200" : "border-amber-200 opacity-60"}`}>
            <button onClick={() => remove(i)} className="absolute right-1 top-1 z-10 grid h-6 w-6 place-items-center rounded bg-white/90 text-red-600 opacity-0 shadow ring-1 ring-ink-200 transition-opacity hover:bg-red-50 group-hover:opacity-100">
              <Trash2 className="h-3.5 w-3.5" />
            </button>
            <img src={p.url} alt={`photo ${i + 1}`} className="mx-auto block max-h-24 w-auto" />
            <div className="mt-1 flex items-center justify-between text-[10px] text-ink-500">
              <GripVertical className="h-3 w-3" />
              <ReorderButtons index={i} count={photos.length} onMove={move} />
              <span>#{i + 1}</span>
            </div>
          </li>
        ))}
      </ul>

      <div className="grid gap-4 sm:grid-cols-3">
        <label className="flex flex-col text-xs font-medium text-ink-600">
          {s.gapLabel} {gap}px
          <input type="range" min={0} max={48} value={gap} onChange={(e) => setGap(Number(e.target.value))} className="accent-brand-500" />
        </label>
        <label className="flex flex-col text-xs font-medium text-ink-600">
          {s.longestSide} {side}px
          <input type="range" min={400} max={4000} step={100} value={side} onChange={(e) => setSide(Number(e.target.value))} className="accent-brand-500" />
        </label>
        <label className="flex flex-col text-xs font-medium text-ink-600">
          {s.background}
          <input type="color" value={bg} onChange={(e) => setBg(e.target.value)} className="mt-1 h-10 w-full cursor-pointer rounded-md border border-ink-200" />
        </label>
      </div>

      <div className="rounded-lg border border-ink-100 bg-ink-50/40 p-3">
        <canvas ref={previewRef} className="mx-auto block max-h-[440px] w-auto rounded" />
      </div>

      <div className="flex flex-wrap gap-2">
        <Button onClick={exportCollage}>{s.exportCollage}</Button>
        {out && (
          <a href={out.url} download={`collage-${Date.now()}.png`}
            className="inline-flex items-center gap-2 rounded-lg border border-brand-200 bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700 hover:bg-brand-100">
            <Download className="h-4 w-4" /> {s.download} ({formatBytes(out.size)})
          </a>
        )}
      </div>
    </div>
  );
}

function drawCollage(
  c: HTMLCanvasElement, photos: Photo[], layout: Layout,
  gap: number, bg: string, side: number,
) {
  // Aspect of the whole collage = cols / rows (square cells). Fit `side` to
  // the long edge, then compute the canvas dims.
  const aspect = layout.cols / layout.rows;
  let W: number, H: number;
  if (aspect >= 1) { W = side; H = Math.round(side / aspect); }
  else { H = side; W = Math.round(side * aspect); }
  c.width = W; c.height = H;

  const ctx = c.getContext("2d")!;
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  const cellW = (W - gap * (layout.cols + 1)) / layout.cols;
  const cellH = (H - gap * (layout.rows + 1)) / layout.rows;

  for (let r = 0; r < layout.rows; r++) {
    for (let col = 0; col < layout.cols; col++) {
      const idx = r * layout.cols + col;
      const p = photos[idx];
      if (!p?.img) continue;
      const x = gap + col * (cellW + gap);
      const y = gap + r * (cellH + gap);
      // object-fit: cover within each cell.
      const ir = p.img.naturalWidth / p.img.naturalHeight;
      const cr = cellW / cellH;
      let sw: number, sh: number, sx: number, sy: number;
      if (ir > cr) { sh = p.img.naturalHeight; sw = sh * cr; sx = (p.img.naturalWidth - sw) / 2; sy = 0; }
      else { sw = p.img.naturalWidth; sh = sw / cr; sx = 0; sy = (p.img.naturalHeight - sh) / 2; }
      ctx.drawImage(p.img, sx, sy, sw, sh, x, y, cellW, cellH);
    }
  }
}
