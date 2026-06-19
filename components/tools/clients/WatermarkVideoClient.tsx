"use client";

import { useEffect, useRef, useState } from "react";
import { Upload, X, Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn, formatBytes } from "@/lib/utils";
import { TemplatesBar } from "@/components/tools/TemplatesBar";
import { getFfmpeg } from "@/lib/ffmpeg-client";
import { useLocale } from "@/hooks/useLocale";

// Overlay-filter coordinates (W,H = main video; w,h = the watermark overlay).
const POSITIONS = [
  { id: "BR", label: "Bottom right", x: "W-w-20", y: "H-h-20" },
  { id: "BL", label: "Bottom left", x: "20", y: "H-h-20" },
  { id: "TR", label: "Top right", x: "W-w-20", y: "20" },
  { id: "TL", label: "Top left", x: "20", y: "20" },
  { id: "C", label: "Centre", x: "(W-w)/2", y: "(H-h)/2" },
] as const;

const T: Record<string, Record<string, string>> = {
  en: {
    uploadVideo: "Upload a video",
    uploadHint: "MP4 · MOV · MKV · WebM — encoded in your browser",
    watermarkText: "Watermark text",
    position: "Position",
    fontSize: "Font size",
    colour: "Colour",
    opacity: "Opacity",
    loadingFfmpeg: "Loading FFmpeg…",
    loadingHint: "First load is ~30MB; cached afterwards.",
    burningWatermark: "Burning watermark…",
    percentComplete: "% complete",
    watermarkAgain: "Watermark again",
    working: "Working…",
    addWatermark: "Add watermark",
    downloadMp4: "Download MP4",
    errorPrefix: "Watermarking failed: ",
    privacy: "Processed 100% in your browser via FFmpeg.wasm — your video is never uploaded.",
  },
  fr: {
    uploadVideo: "Téléverser une vidéo",
    uploadHint: "MP4 · MOV · MKV · WebM — encodé dans votre navigateur",
    watermarkText: "Texte du filigrane",
    position: "Position",
    fontSize: "Taille de police",
    colour: "Couleur",
    opacity: "Opacité",
    loadingFfmpeg: "Chargement de FFmpeg…",
    loadingHint: "Premier chargement ~30 Mo ; mis en cache ensuite.",
    burningWatermark: "Application du filigrane…",
    percentComplete: "% terminé",
    watermarkAgain: "Ajouter de nouveau",
    working: "En cours…",
    addWatermark: "Ajouter le filigrane",
    downloadMp4: "Télécharger MP4",
    errorPrefix: "Échec du filigrane : ",
    privacy: "Traitement 100 % dans votre navigateur via FFmpeg.wasm — votre vidéo n'est jamais envoyée.",
  },
  es: {
    uploadVideo: "Subir un vídeo",
    uploadHint: "MP4 · MOV · MKV · WebM — codificado en tu navegador",
    watermarkText: "Texto de la marca de agua",
    position: "Posición",
    fontSize: "Tamaño de fuente",
    colour: "Color",
    opacity: "Opacidad",
    loadingFfmpeg: "Cargando FFmpeg…",
    loadingHint: "La primera carga es ~30 MB; almacenado en caché después.",
    burningWatermark: "Aplicando marca de agua…",
    percentComplete: "% completado",
    watermarkAgain: "Agregar de nuevo",
    working: "Procesando…",
    addWatermark: "Agregar marca de agua",
    downloadMp4: "Descargar MP4",
    errorPrefix: "Error al agregar marca de agua: ",
    privacy: "Procesado 100 % en tu navegador con FFmpeg.wasm — tu vídeo nunca se sube.",
  },
  pt: {
    uploadVideo: "Enviar um vídeo",
    uploadHint: "MP4 · MOV · MKV · WebM — codificado no seu navegador",
    watermarkText: "Texto da marca d'água",
    position: "Posição",
    fontSize: "Tamanho da fonte",
    colour: "Cor",
    opacity: "Opacidade",
    loadingFfmpeg: "Carregando FFmpeg…",
    loadingHint: "Primeiro carregamento ~30 MB; em cache depois.",
    burningWatermark: "Aplicando marca d'água…",
    percentComplete: "% concluído",
    watermarkAgain: "Aplicar novamente",
    working: "Processando…",
    addWatermark: "Adicionar marca d'água",
    downloadMp4: "Baixar MP4",
    errorPrefix: "Falha ao adicionar marca d'água: ",
    privacy: "Processado 100% no seu navegador via FFmpeg.wasm — seu vídeo nunca é enviado.",
  },
  de: {
    uploadVideo: "Video hochladen",
    uploadHint: "MP4 · MOV · MKV · WebM — im Browser kodiert",
    watermarkText: "Wasserzeichen-Text",
    position: "Position",
    fontSize: "Schriftgröße",
    colour: "Farbe",
    opacity: "Deckkraft",
    loadingFfmpeg: "FFmpeg wird geladen…",
    loadingHint: "Erster Ladevorgang ~30 MB; danach im Cache.",
    burningWatermark: "Wasserzeichen wird eingebettet…",
    percentComplete: "% abgeschlossen",
    watermarkAgain: "Erneut hinzufügen",
    working: "Verarbeitung…",
    addWatermark: "Wasserzeichen hinzufügen",
    downloadMp4: "MP4 herunterladen",
    errorPrefix: "Wasserzeichen fehlgeschlagen: ",
    privacy: "100 % im Browser via FFmpeg.wasm verarbeitet — Ihr Video wird nie hochgeladen.",
  },
  it: {
    uploadVideo: "Carica un video",
    uploadHint: "MP4 · MOV · MKV · WebM — codificato nel browser",
    watermarkText: "Testo filigrana",
    position: "Posizione",
    fontSize: "Dimensione font",
    colour: "Colore",
    opacity: "Opacità",
    loadingFfmpeg: "Caricamento FFmpeg…",
    loadingHint: "Primo caricamento ~30 MB; poi in cache.",
    burningWatermark: "Applicazione filigrana…",
    percentComplete: "% completato",
    watermarkAgain: "Aggiungi di nuovo",
    working: "Elaborazione…",
    addWatermark: "Aggiungi filigrana",
    downloadMp4: "Scarica MP4",
    errorPrefix: "Filigrana fallita: ",
    privacy: "Elaborato 100% nel tuo browser via FFmpeg.wasm — il tuo video non viene mai caricato.",
  },
  nl: {
    uploadVideo: "Video uploaden",
    uploadHint: "MP4 · MOV · MKV · WebM — gecodeerd in uw browser",
    watermarkText: "Watermerk tekst",
    position: "Positie",
    fontSize: "Lettergrootte",
    colour: "Kleur",
    opacity: "Dekking",
    loadingFfmpeg: "FFmpeg laden…",
    loadingHint: "Eerste keer laden ~30 MB; daarna in cache.",
    burningWatermark: "Watermerk toevoegen…",
    percentComplete: "% voltooid",
    watermarkAgain: "Opnieuw toevoegen",
    working: "Bezig…",
    addWatermark: "Watermerk toevoegen",
    downloadMp4: "MP4 downloaden",
    errorPrefix: "Watermerk mislukt: ",
    privacy: "100% verwerkt in uw browser via FFmpeg.wasm — uw video wordt nooit geüpload.",
  },
  ja: {
    uploadVideo: "動画をアップロード",
    uploadHint: "MP4 · MOV · MKV · WebM — ブラウザ内でエンコード",
    watermarkText: "透かしテキスト",
    position: "位置",
    fontSize: "フォントサイズ",
    colour: "色",
    opacity: "不透明度",
    loadingFfmpeg: "FFmpegを読み込んでいます…",
    loadingHint: "初回読み込みは ~30 MB；以降はキャッシュ。",
    burningWatermark: "透かしを埋め込み中…",
    percentComplete: "% 完了",
    watermarkAgain: "再度追加",
    working: "処理中…",
    addWatermark: "透かしを追加",
    downloadMp4: "MP4をダウンロード",
    errorPrefix: "透かしの追加に失敗: ",
    privacy: "FFmpeg.wasmでブラウザ内で100%処理 — 動画は決してアップロードされません。",
  },
  zh: {
    uploadVideo: "上传视频",
    uploadHint: "MP4 · MOV · MKV · WebM — 在您的浏览器中编码",
    watermarkText: "水印文字",
    position: "位置",
    fontSize: "字体大小",
    colour: "颜色",
    opacity: "不透明度",
    loadingFfmpeg: "正在加载 FFmpeg…",
    loadingHint: "首次加载约 30 MB；之后缓存。",
    burningWatermark: "正在添加水印…",
    percentComplete: "% 完成",
    watermarkAgain: "再次添加",
    working: "处理中…",
    addWatermark: "添加水印",
    downloadMp4: "下载 MP4",
    errorPrefix: "添加水印失败：",
    privacy: "100% 在您的浏览器中通过 FFmpeg.wasm 处理 — 您的视频永远不会被上传。",
  },
  ko: {
    uploadVideo: "동영상 업로드",
    uploadHint: "MP4 · MOV · MKV · WebM — 브라우저에서 인코딩",
    watermarkText: "워터마크 텍스트",
    position: "위치",
    fontSize: "글꼴 크기",
    colour: "색상",
    opacity: "불투명도",
    loadingFfmpeg: "FFmpeg 로딩 중…",
    loadingHint: "첫 번째 로딩은 ~30 MB; 이후 캐시됩니다.",
    burningWatermark: "워터마크 적용 중…",
    percentComplete: "% 완료",
    watermarkAgain: "다시 추가",
    working: "처리 중…",
    addWatermark: "워터마크 추가",
    downloadMp4: "MP4 다운로드",
    errorPrefix: "워터마크 추가 실패: ",
    privacy: "FFmpeg.wasm을 통해 브라우저에서 100% 처리 — 동영상은 절대 업로드되지 않습니다.",
  },
  ar: {
    uploadVideo: "رفع فيديو",
    uploadHint: "MP4 · MOV · MKV · WebM — يُعالَج في متصفحك",
    watermarkText: "نص العلامة المائية",
    position: "الموضع",
    fontSize: "حجم الخط",
    colour: "اللون",
    opacity: "الشفافية",
    loadingFfmpeg: "جاري تحميل FFmpeg…",
    loadingHint: "التحميل الأول ~30 MB؛ يُخزَّن في الذاكرة المؤقتة بعد ذلك.",
    burningWatermark: "جاري إضافة العلامة المائية…",
    percentComplete: "% مكتمل",
    watermarkAgain: "إضافة مجدداً",
    working: "جاري العمل…",
    addWatermark: "إضافة علامة مائية",
    downloadMp4: "تنزيل MP4",
    errorPrefix: "فشل إضافة العلامة المائية: ",
    privacy: "معالجة 100% في متصفحك عبر FFmpeg.wasm — لن يتم رفع الفيديو مطلقًا.",
  },
  ru: {
    uploadVideo: "Загрузить видео",
    uploadHint: "MP4 · MOV · MKV · WebM — кодируется в вашем браузере",
    watermarkText: "Текст водяного знака",
    position: "Положение",
    fontSize: "Размер шрифта",
    colour: "Цвет",
    opacity: "Прозрачность",
    loadingFfmpeg: "Загрузка FFmpeg…",
    loadingHint: "Первая загрузка ~30 МБ; затем кеш.",
    burningWatermark: "Нанесение водяного знака…",
    percentComplete: "% завершено",
    watermarkAgain: "Добавить снова",
    working: "Обработка…",
    addWatermark: "Добавить водяной знак",
    downloadMp4: "Скачать MP4",
    errorPrefix: "Ошибка при добавлении водяного знака: ",
    privacy: "100% обрабатывается в вашем браузере через FFmpeg.wasm — ваше видео никогда не загружается.",
  },
  hi: {
    uploadVideo: "वीडियो अपलोड करें",
    uploadHint: "MP4 · MOV · MKV · WebM — आपके ब्राउज़र में एन्कोड किया गया",
    watermarkText: "वॉटरमार्क टेक्स्ट",
    position: "स्थान",
    fontSize: "फ़ॉन्ट आकार",
    colour: "रंग",
    opacity: "अपारदर्शिता",
    loadingFfmpeg: "FFmpeg लोड हो रहा है…",
    loadingHint: "पहली लोडिंग ~30 MB; बाद में कैश।",
    burningWatermark: "वॉटरमार्क लगाया जा रहा है…",
    percentComplete: "% पूर्ण",
    watermarkAgain: "फिर से जोड़ें",
    working: "प्रसंस्करण…",
    addWatermark: "वॉटरमार्क जोड़ें",
    downloadMp4: "MP4 डाउनलोड करें",
    errorPrefix: "वॉटरमार्क जोड़ना विफल: ",
    privacy: "FFmpeg.wasm के जरिए आपके ब्राउज़र में 100% प्रसंस्करण — आपका वीडियो कभी अपलोड नहीं होता।",
  },
  tr: {
    uploadVideo: "Video yükle",
    uploadHint: "MP4 · MOV · MKV · WebM — tarayıcınızda kodlanır",
    watermarkText: "Filigran metni",
    position: "Konum",
    fontSize: "Yazı tipi boyutu",
    colour: "Renk",
    opacity: "Opaklık",
    loadingFfmpeg: "FFmpeg yükleniyor…",
    loadingHint: "İlk yükleme ~30 MB; sonraki seferlerde önbellek.",
    burningWatermark: "Filigran ekleniyor…",
    percentComplete: "% tamamlandı",
    watermarkAgain: "Tekrar ekle",
    working: "İşleniyor…",
    addWatermark: "Filigran ekle",
    downloadMp4: "MP4 indir",
    errorPrefix: "Filigran eklenemedi: ",
    privacy: "FFmpeg.wasm aracılığıyla tarayıcınızda %100 işlenir — videonuz asla yüklenmez.",
  },
  id: {
    uploadVideo: "Unggah video",
    uploadHint: "MP4 · MOV · MKV · WebM — dikodekan di browser Anda",
    watermarkText: "Teks tanda air",
    position: "Posisi",
    fontSize: "Ukuran font",
    colour: "Warna",
    opacity: "Opasitas",
    loadingFfmpeg: "Memuat FFmpeg…",
    loadingHint: "Pemuatan pertama ~30 MB; selanjutnya dari cache.",
    burningWatermark: "Menambahkan tanda air…",
    percentComplete: "% selesai",
    watermarkAgain: "Tambah lagi",
    working: "Memproses…",
    addWatermark: "Tambah tanda air",
    downloadMp4: "Unduh MP4",
    errorPrefix: "Gagal menambah tanda air: ",
    privacy: "100% diproses di browser Anda melalui FFmpeg.wasm — video Anda tidak pernah diunggah.",
  },
  vi: {
    uploadVideo: "Tải lên video",
    uploadHint: "MP4 · MOV · MKV · WebM — mã hóa trong trình duyệt của bạn",
    watermarkText: "Văn bản hình mờ",
    position: "Vị trí",
    fontSize: "Cỡ chữ",
    colour: "Màu sắc",
    opacity: "Độ mờ",
    loadingFfmpeg: "Đang tải FFmpeg…",
    loadingHint: "Lần đầu tải ~30 MB; sau đó lưu vào bộ nhớ đệm.",
    burningWatermark: "Đang thêm hình mờ…",
    percentComplete: "% hoàn thành",
    watermarkAgain: "Thêm lại",
    working: "Đang xử lý…",
    addWatermark: "Thêm hình mờ",
    downloadMp4: "Tải MP4",
    errorPrefix: "Thêm hình mờ thất bại: ",
    privacy: "100% xử lý trong trình duyệt của bạn qua FFmpeg.wasm — video của bạn không bao giờ được tải lên.",
  },
  sv: {
    uploadVideo: "Ladda upp video",
    uploadHint: "MP4 · MOV · MKV · WebM — kodas i din webbläsare",
    watermarkText: "Vattenstämpeltext",
    position: "Position",
    fontSize: "Teckenstorlek",
    colour: "Färg",
    opacity: "Opacitet",
    loadingFfmpeg: "Laddar FFmpeg…",
    loadingHint: "Första laddning ~30 MB; därefter cachad.",
    burningWatermark: "Lägger till vattenstämpel…",
    percentComplete: "% klart",
    watermarkAgain: "Lägg till igen",
    working: "Bearbetar…",
    addWatermark: "Lägg till vattenstämpel",
    downloadMp4: "Ladda ned MP4",
    errorPrefix: "Vattenstämpel misslyckades: ",
    privacy: "Bearbetas till 100% i din webbläsare via FFmpeg.wasm — din video laddas aldrig upp.",
  },
  pl: {
    uploadVideo: "Prześlij wideo",
    uploadHint: "MP4 · MOV · MKV · WebM — kodowane w przeglądarce",
    watermarkText: "Tekst znaku wodnego",
    position: "Pozycja",
    fontSize: "Rozmiar czcionki",
    colour: "Kolor",
    opacity: "Krycie",
    loadingFfmpeg: "Ładowanie FFmpeg…",
    loadingHint: "Pierwsze ładowanie ~30 MB; potem z pamięci podręcznej.",
    burningWatermark: "Dodawanie znaku wodnego…",
    percentComplete: "% ukończono",
    watermarkAgain: "Dodaj ponownie",
    working: "Przetwarzanie…",
    addWatermark: "Dodaj znak wodny",
    downloadMp4: "Pobierz MP4",
    errorPrefix: "Dodanie znaku wodnego nie powiodło się: ",
    privacy: "100% przetwarzane w przeglądarce przez FFmpeg.wasm — Twoje wideo nigdy nie jest przesyłane.",
  },
  uk: {
    uploadVideo: "Завантажити відео",
    uploadHint: "MP4 · MOV · MKV · WebM — кодується у вашому браузері",
    watermarkText: "Текст водяного знаку",
    position: "Положення",
    fontSize: "Розмір шрифту",
    colour: "Колір",
    opacity: "Прозорість",
    loadingFfmpeg: "Завантаження FFmpeg…",
    loadingHint: "Перше завантаження ~30 МБ; потім кеш.",
    burningWatermark: "Нанесення водяного знаку…",
    percentComplete: "% завершено",
    watermarkAgain: "Додати знову",
    working: "Обробка…",
    addWatermark: "Додати водяний знак",
    downloadMp4: "Завантажити MP4",
    errorPrefix: "Помилка при додаванні водяного знаку: ",
    privacy: "100% обробляється у вашому браузері через FFmpeg.wasm — ваше відео ніколи не завантажується.",
  },
  cs: {
    uploadVideo: "Nahrát video",
    uploadHint: "MP4 · MOV · MKV · WebM — kódováno ve vašem prohlížeči",
    watermarkText: "Text vodoznaku",
    position: "Pozice",
    fontSize: "Velikost písma",
    colour: "Barva",
    opacity: "Průhlednost",
    loadingFfmpeg: "Načítání FFmpeg…",
    loadingHint: "První načtení ~30 MB; poté z mezipaměti.",
    burningWatermark: "Přidávání vodoznaku…",
    percentComplete: "% dokončeno",
    watermarkAgain: "Přidat znovu",
    working: "Zpracování…",
    addWatermark: "Přidat vodoznak",
    downloadMp4: "Stáhnout MP4",
    errorPrefix: "Přidání vodoznaku selhalo: ",
    privacy: "100% zpracováno ve vašem prohlížeči přes FFmpeg.wasm — vaše video se nikdy nenahrává.",
  },
};

// Render the watermark text to a transparent PNG with the Canvas API. The wasm
// core has no libfreetype, so FFmpeg's `drawtext` filter is unavailable — we
// composite this PNG with the `overlay` filter instead (and avoid the
// CSP-blocked jsdelivr font fetch the old drawtext path relied on).
function renderWatermarkPng(text: string, size: number, color: string, alpha: number): Uint8Array {
  const measure = document.createElement("canvas").getContext("2d")!;
  measure.font = `bold ${size}px sans-serif`;
  const tw = Math.ceil(measure.measureText(text).width);
  const pad = Math.round(size * 0.35);
  const canvas = document.createElement("canvas");
  canvas.width = tw + pad * 2;
  canvas.height = Math.ceil(size * 1.3) + pad * 2;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "rgba(0,0,0,0.2)"; // semi-transparent box, like the old boxcolor
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.font = `bold ${size}px sans-serif`;
  ctx.textBaseline = "middle";
  ctx.globalAlpha = alpha;
  ctx.fillStyle = color;
  ctx.fillText(text, pad, canvas.height / 2);
  const b64 = canvas.toDataURL("image/png").split(",")[1];
  const bin = atob(b64);
  const arr = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i);
  return arr;
}

export function WatermarkVideoClient() {
  const s = T[useLocale()] ?? T.en;
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState("Konvertools.io");
  const [pos, setPos] = useState<string>("BR");
  const [size, setSize] = useState(48);
  const [color, setColor] = useState("white");
  const [opacity, setOpacity] = useState(85);
  const [phase, setPhase] = useState<"idle" | "loading" | "running" | "done">("idle");
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [outUrl, setOutUrl] = useState<string | null>(null);
  const [outName, setOutName] = useState("watermarked.mp4");
  const cleanup = useRef<string | null>(null);

  useEffect(() => () => { if (cleanup.current) URL.revokeObjectURL(cleanup.current); }, []);

  async function run() {
    if (!file || !text.trim() || phase === "loading" || phase === "running") return;
    setError(null); setOutUrl(null); setProgress(0);
    setPhase("loading");
    try {
      const ff = await getFfmpeg((pr) => setProgress(pr));
      setPhase("running");
      const { fetchFile } = await import("@ffmpeg/util");

      const ext = (file.name.split(".").pop() || "mp4").toLowerCase();
      const inName = `input.${ext}`;
      const outNameInternal = "output.mp4";
      await ff.writeFile(inName, await fetchFile(file));
      await ff.writeFile("wm.png", renderWatermarkPng(text, size, color, opacity / 100));

      const p = POSITIONS.find((q) => q.id === pos)!;
      const filter = `overlay=${p.x}:${p.y}`;
      const code = await ff.exec(["-i", inName, "-i", "wm.png", "-filter_complex", filter, "-c:v", "libx264", "-preset", "veryfast", "-crf", "23", "-c:a", "copy", outNameInternal]);
      if (code !== 0) throw new Error("FFmpeg exited with a non-zero status.");
      const data = await ff.readFile(outNameInternal);
      const blob = new Blob([data as BlobPart], { type: "video/mp4" });

      if (cleanup.current) URL.revokeObjectURL(cleanup.current);
      const url = URL.createObjectURL(blob);
      cleanup.current = url;
      setOutUrl(url);
      setOutName(`${file.name.replace(/\.[^.]+$/, "")}-watermarked.mp4`);
      try { await ff.deleteFile(inName); await ff.deleteFile("wm.png"); await ff.deleteFile(outNameInternal); } catch {}
      setProgress(100); setPhase("done");
    } catch (e) {
      setError(`${s.errorPrefix}${(e as Error).message}`);
      setPhase("idle");
    }
  }

  const busy = phase === "loading" || phase === "running";

  return (
    <div className="space-y-4">
      {!file ? (
        <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-violet-300 bg-violet-50/40 px-6 py-14 text-center transition-colors hover:brightness-95">
          <span className="grid h-12 w-12 place-items-center rounded-xl bg-violet-50 text-violet-600"><Upload className="h-6 w-6" /></span>
          <span className="mt-3 font-semibold text-ink-900">{s.uploadVideo}</span>
          <span className="mt-0.5 text-xs text-ink-400">{s.uploadHint}</span>
          <input type="file" accept="video/*,.mp4,.mov,.mkv,.webm" className="hidden" onChange={(e) => { setFile(e.target.files?.[0] ?? null); setOutUrl(null); setError(null); }} />
        </label>
      ) : (
        <div className="flex items-center justify-between rounded-lg border border-ink-100 bg-white px-4 py-2.5">
          <div className="min-w-0 truncate text-sm">
            <span className="font-medium text-ink-900">{file.name}</span>
            <span className="ml-2 text-ink-400">{formatBytes(file.size)}</span>
          </div>
          <button onClick={() => { setFile(null); setOutUrl(null); setPhase("idle"); }} aria-label="Remove" className="rounded p-1 text-xs text-ink-400 hover:bg-ink-50 hover:text-ink-700"><X className="h-3.5 w-3.5" /></button>
        </div>
      )}

      <TemplatesBar
        tool="add-watermark"
        settings={{ text, pos, size, color, opacity }}
        onApply={(s) => {
          if (typeof s.text === "string") setText(s.text);
          if (typeof s.pos === "string") setPos(s.pos);
          if (typeof s.size === "number") setSize(s.size);
          if (typeof s.color === "string") setColor(s.color);
          if (typeof s.opacity === "number") setOpacity(s.opacity);
        }}
      />

      <div className="grid gap-3 rounded-lg border border-ink-100 bg-white p-4 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs font-medium text-ink-500">{s.watermarkText}</label>
          <input value={text} onChange={(e) => setText(e.target.value)} className="w-full rounded-md border border-ink-200 bg-white px-3 py-2 text-sm text-ink-900" />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-ink-500">{s.position}</label>
          <div className="flex flex-wrap gap-1">
            {POSITIONS.map((p) => (
              <button key={p.id} onClick={() => setPos(p.id)} className={cn("rounded-md border px-2.5 py-1 text-xs font-medium transition-colors", pos === p.id ? "border-brand-300 bg-brand-50 text-brand-700" : "border-ink-200 bg-white text-ink-600 hover:border-ink-300")}>{p.label}</button>
            ))}
          </div>
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-ink-500">{s.fontSize} · {size}</label>
          <input type="range" min={16} max={120} value={size} onChange={(e) => setSize(Number(e.target.value))} className="w-full accent-brand-500" />
        </div>
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 text-xs font-medium text-ink-500">{s.colour}
            <select value={color} onChange={(e) => setColor(e.target.value)} className="rounded-md border border-ink-200 bg-white px-2 py-1 text-sm">
              {["white", "black", "yellow", "red", "blue", "green"].map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </label>
          <label className="flex flex-1 items-center gap-2 text-xs font-medium text-ink-500">{s.opacity} · {opacity}%
            <input type="range" min={20} max={100} value={opacity} onChange={(e) => setOpacity(Number(e.target.value))} className="flex-1 accent-brand-500" />
          </label>
        </div>
      </div>

      {busy && (
        <div className="flex items-center gap-3 rounded-lg border border-ink-100 bg-white px-4 py-3">
          <Loader2 className="h-4 w-4 animate-spin text-brand-500" />
          <div className="flex-1">
            <p className="text-sm font-medium text-ink-900">{phase === "loading" ? s.loadingFfmpeg : s.burningWatermark}</p>
            <p className="text-xs text-ink-400">{phase === "loading" ? s.loadingHint : `${progress}${s.percentComplete}`}</p>
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        <Button onClick={run} disabled={!file || !text.trim() || busy} size="lg">
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          {phase === "done" ? s.watermarkAgain : busy ? s.working : s.addWatermark}
        </Button>
        {outUrl && (
          <a href={outUrl} download={outName}>
            <Button size="lg" variant="outline"><Download className="h-4 w-4" /> {s.downloadMp4}</Button>
          </a>
        )}
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}
      <p className="text-xs text-ink-400">{s.privacy}</p>
    </div>
  );
}
