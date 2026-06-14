"use client";

import { useEffect, useRef, useState } from "react";
import { Upload, X, Download, Loader2, Lock } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { formatBytes } from "@/lib/utils";
import { useUser } from "@/hooks/useUser";
import { useLocale } from "@/hooks/useLocale";
import { getFfmpeg } from "@/lib/ffmpeg-client";

// ── @imgly background removal (loaded from CDN so onnxruntime never enters
// the webpack/SWC client chunk — same trick as the image tool) ─────────────
type BgModule = { removeBackground: (input: Blob | string, opts?: unknown) => Promise<Blob> };
let bgPromise: Promise<BgModule> | null = null;
async function getBg(): Promise<BgModule> {
  if (!bgPromise) {
    const url = "https://esm.sh/@imgly/background-removal@1.5.6?bundle";
    bgPromise = import(/* webpackIgnore: true */ url) as Promise<BgModule>;
  }
  return bgPromise;
}

// ── FFmpeg.wasm — shared, resilient singleton (lib/ffmpeg-client) ────────────
// Self-hosted worker + CDN fallback + load timeout; see that file's header for
// why a local FFmpeg.load() without classWorkerURL hangs under Next/Webpack.

type Bg = { id: string; label: string; swatch: string; color: string | null };

const FPS = 12;
type PlanLimit = { label: string; seconds: number };
function limitFor(user: boolean, plan: string): PlanLimit {
  if (plan === "business") return { label: "Business", seconds: Infinity };
  if (plan === "pro") return { label: "Pro", seconds: 300 }; // 5 min — matches the pricing promise
  if (user) return { label: "Free", seconds: 30 };
  return { label: "anonymous", seconds: 15 };
}

const padNum = (n: number) => String(n).padStart(5, "0");

const T: Record<string, Record<string, string>> = {
  en: {
    uploadVideo: "Upload a video",
    uploadHint: "MP4 · MOV · WebM — processed 100% in your browser",
    replaceBg: "Replacement background",
    transparent: "Transparent",
    greenScreen: "Green screen",
    white: "White",
    black: "Black",
    custom: "Custom",
    transparentNote: "Transparent exports a WebM with an alpha channel; a colour exports MP4. Output runs at",
    fpsNote: "fps.",
    loadingEngine: "Loading engine (~70 MB, first run only)…",
    extractingFrames: "Extracting frames…",
    removingBgFrame: "Removing background — frame",
    encodingVideo: "Encoding the new video…",
    working: "Working…",
    removeVideoBg: "Remove video background",
    privacyNote: "100% in your browser via WebAssembly — your video is never uploaded.",
    tierNote: "On the",
    tierCapAt: "tier, clips are capped at",
    tierSuffix: "s —",
    upgrade: "upgrade",
    forUpTo: "for up to 5 min (Pro) or unlimited (Business).",
    errorPrefix: "Could not process the video: ",
    clipTooLong: "Your clip is",
    clipTooLongMid: "s — on the",
    clipTooLongEnd: "tier we'll process the first",
    clipTooLongSuffix: "s. Upgrade for longer clips.",
  },
  fr: {
    uploadVideo: "Télécharger une vidéo",
    uploadHint: "MP4 · MOV · WebM — traité à 100 % dans votre navigateur",
    replaceBg: "Arrière-plan de remplacement",
    transparent: "Transparent",
    greenScreen: "Fond vert",
    white: "Blanc",
    black: "Noir",
    custom: "Personnalisé",
    transparentNote: "Transparent exporte un WebM avec canal alpha ; une couleur exporte un MP4. La sortie tourne à",
    fpsNote: "ips.",
    loadingEngine: "Chargement du moteur (∼70 Mo, première fois uniquement)…",
    extractingFrames: "Extraction des images…",
    removingBgFrame: "Suppression de l'arrière-plan — image",
    encodingVideo: "Encodage de la nouvelle vidéo…",
    working: "En cours…",
    removeVideoBg: "Supprimer l'arrière-plan de la vidéo",
    privacyNote: "100 % dans votre navigateur via WebAssembly — votre vidéo n'est jamais envoyée.",
    tierNote: "Sur le niveau",
    tierCapAt: ", les clips sont limités à",
    tierSuffix: "s —",
    upgrade: "passez à un niveau supérieur",
    forUpTo: "pour jusqu'à 5 min (Pro) ou illimité (Business).",
    errorPrefix: "Impossible de traiter la vidéo : ",
    clipTooLong: "Votre clip fait",
    clipTooLongMid: "s — sur le niveau",
    clipTooLongEnd: "nous traiterons les premières",
    clipTooLongSuffix: "s. Passez à un niveau supérieur pour des clips plus longs.",
  },
  es: {
    uploadVideo: "Subir un video",
    uploadHint: "MP4 · MOV · WebM — procesado al 100 % en tu navegador",
    replaceBg: "Fondo de reemplazo",
    transparent: "Transparente",
    greenScreen: "Pantalla verde",
    white: "Blanco",
    black: "Negro",
    custom: "Personalizado",
    transparentNote: "Transparente exporta un WebM con canal alfa; un color exporta MP4. La salida corre a",
    fpsNote: "fps.",
    loadingEngine: "Cargando motor (∼70 MB, solo la primera vez)…",
    extractingFrames: "Extrayendo fotogramas…",
    removingBgFrame: "Eliminando fondo — fotograma",
    encodingVideo: "Codificando el nuevo video…",
    working: "Procesando…",
    removeVideoBg: "Eliminar fondo del video",
    privacyNote: "100 % en tu navegador mediante WebAssembly — tu video nunca se sube.",
    tierNote: "En el nivel",
    tierCapAt: ", los clips están limitados a",
    tierSuffix: "s —",
    upgrade: "mejora",
    forUpTo: "para hasta 5 min (Pro) o ilimitado (Business).",
    errorPrefix: "No se pudo procesar el video: ",
    clipTooLong: "Tu clip dura",
    clipTooLongMid: "s — en el nivel",
    clipTooLongEnd: "procesaremos los primeros",
    clipTooLongSuffix: "s. Mejora tu plan para clips más largos.",
  },
  pt: {
    uploadVideo: "Carregar um vídeo",
    uploadHint: "MP4 · MOV · WebM — processado 100% no seu navegador",
    replaceBg: "Fundo de substituição",
    transparent: "Transparente",
    greenScreen: "Fundo verde",
    white: "Branco",
    black: "Preto",
    custom: "Personalizado",
    transparentNote: "Transparente exporta um WebM com canal alfa; uma cor exporta MP4. A saída roda a",
    fpsNote: "fps.",
    loadingEngine: "Carregando motor (∼70 MB, apenas na primeira vez)…",
    extractingFrames: "Extraindo quadros…",
    removingBgFrame: "Removendo fundo — quadro",
    encodingVideo: "Codificando o novo vídeo…",
    working: "Processando…",
    removeVideoBg: "Remover fundo do vídeo",
    privacyNote: "100% no seu navegador via WebAssembly — seu vídeo nunca é enviado.",
    tierNote: "No nível",
    tierCapAt: ", os clipes são limitados a",
    tierSuffix: "s —",
    upgrade: "faça upgrade",
    forUpTo: "para até 5 min (Pro) ou ilimitado (Business).",
    errorPrefix: "Não foi possível processar o vídeo: ",
    clipTooLong: "Seu clipe tem",
    clipTooLongMid: "s — no nível",
    clipTooLongEnd: "processaremos os primeiros",
    clipTooLongSuffix: "s. Faça upgrade para clipes mais longos.",
  },
  de: {
    uploadVideo: "Ein Video hochladen",
    uploadHint: "MP4 · MOV · WebM — zu 100 % in Ihrem Browser verarbeitet",
    replaceBg: "Ersatzhintergrund",
    transparent: "Transparent",
    greenScreen: "Green Screen",
    white: "Weiß",
    black: "Schwarz",
    custom: "Benutzerdefiniert",
    transparentNote: "Transparent exportiert ein WebM mit Alpha-Kanal; eine Farbe exportiert MP4. Ausgabe läuft mit",
    fpsNote: "FPS.",
    loadingEngine: "Engine wird geladen (∼70 MB, nur beim ersten Mal)…",
    extractingFrames: "Frames werden extrahiert…",
    removingBgFrame: "Hintergrund wird entfernt — Frame",
    encodingVideo: "Neues Video wird kodiert…",
    working: "Wird verarbeitet…",
    removeVideoBg: "Videohintergrund entfernen",
    privacyNote: "100 % in Ihrem Browser via WebAssembly — Ihr Video wird niemals hochgeladen.",
    tierNote: "Im",
    tierCapAt: "-Tarif sind Clips auf",
    tierSuffix: "s begrenzt —",
    upgrade: "Upgrade durchführen",
    forUpTo: "für bis zu 5 Min. (Pro) oder unbegrenzt (Business).",
    errorPrefix: "Das Video konnte nicht verarbeitet werden: ",
    clipTooLong: "Ihr Clip ist",
    clipTooLongMid: "s lang — im",
    clipTooLongEnd: "-Tarif werden die ersten",
    clipTooLongSuffix: "s verarbeitet. Führen Sie ein Upgrade für längere Clips durch.",
  },
  it: {
    uploadVideo: "Carica un video",
    uploadHint: "MP4 · MOV · WebM — elaborato al 100 % nel tuo browser",
    replaceBg: "Sfondo di sostituzione",
    transparent: "Trasparente",
    greenScreen: "Schermo verde",
    white: "Bianco",
    black: "Nero",
    custom: "Personalizzato",
    transparentNote: "Trasparente esporta un WebM con canale alfa; un colore esporta MP4. L'output gira a",
    fpsNote: "fps.",
    loadingEngine: "Caricamento del motore (∼70 MB, solo al primo avvio)…",
    extractingFrames: "Estrazione dei fotogrammi…",
    removingBgFrame: "Rimozione sfondo — fotogramma",
    encodingVideo: "Codifica del nuovo video…",
    working: "In elaborazione…",
    removeVideoBg: "Rimuovi sfondo video",
    privacyNote: "100 % nel tuo browser tramite WebAssembly — il tuo video non viene mai caricato.",
    tierNote: "Nel livello",
    tierCapAt: ", i clip sono limitati a",
    tierSuffix: "s —",
    upgrade: "fai l'upgrade",
    forUpTo: "fino a 5 min (Pro) o illimitato (Business).",
    errorPrefix: "Impossibile elaborare il video: ",
    clipTooLong: "Il tuo clip è di",
    clipTooLongMid: "s — nel livello",
    clipTooLongEnd: "elaboreremo i primi",
    clipTooLongSuffix: "s. Fai l'upgrade per clip più lunghi.",
  },
  nl: {
    uploadVideo: "Een video uploaden",
    uploadHint: "MP4 · MOV · WebM — 100% verwerkt in uw browser",
    replaceBg: "Vervangende achtergrond",
    transparent: "Transparant",
    greenScreen: "Green screen",
    white: "Wit",
    black: "Zwart",
    custom: "Aangepast",
    transparentNote: "Transparant exporteert een WebM met alfakanaal; een kleur exporteert MP4. Uitvoer draait op",
    fpsNote: "fps.",
    loadingEngine: "Engine laden (∼70 MB, alleen de eerste keer)…",
    extractingFrames: "Frames extraheren…",
    removingBgFrame: "Achtergrond verwijderen — frame",
    encodingVideo: "Nieuwe video coderen…",
    working: "Bezig…",
    removeVideoBg: "Videoachtergrond verwijderen",
    privacyNote: "100% in uw browser via WebAssembly — uw video wordt nooit geüpload.",
    tierNote: "Op het",
    tierCapAt: "-niveau zijn clips beperkt tot",
    tierSuffix: "s —",
    upgrade: "upgrade",
    forUpTo: "voor tot 5 min (Pro) of onbeperkt (Business).",
    errorPrefix: "Kan de video niet verwerken: ",
    clipTooLong: "Uw clip is",
    clipTooLongMid: "s — op het",
    clipTooLongEnd: "-niveau verwerken we de eerste",
    clipTooLongSuffix: "s. Upgrade voor langere clips.",
  },
  ja: {
    uploadVideo: "動画をアップロード",
    uploadHint: "MP4・MOV・WebM — ブラウザ内で100%処理",
    replaceBg: "置き換える背景",
    transparent: "透明",
    greenScreen: "グリーンスクリーン",
    white: "白",
    black: "黒",
    custom: "カスタム",
    transparentNote: "透明はアルファチャンネル付き WebM でエクスポート; カラーは MP4 でエクスポート。出力は",
    fpsNote: "fps。",
    loadingEngine: "エンジンを読み込み中（∼70 MB、初回のみ）…",
    extractingFrames: "フレームを抽出中…",
    removingBgFrame: "背景を削除中 — フレーム",
    encodingVideo: "新しい動画をエンコード中…",
    working: "処理中…",
    removeVideoBg: "動画の背景を削除",
    privacyNote: "WebAssembly を使用してブラウザ内で100%処理 — 動画はアップロードされません。",
    tierNote: "",
    tierCapAt: "プランではクリップは",
    tierSuffix: "秒に制限されています —",
    upgrade: "アップグレード",
    forUpTo: "して最大5分（Pro）または無制限（Business）に。",
    errorPrefix: "動画を処理できませんでした: ",
    clipTooLong: "クリップは",
    clipTooLongMid: "秒です —",
    clipTooLongEnd: "プランでは最初の",
    clipTooLongSuffix: "秒を処理します。長いクリップにはアップグレードしてください。",
  },
  zh: {
    uploadVideo: "上传视频",
    uploadHint: "MP4 · MOV · WebM — 在您的浏览器中100%处理",
    replaceBg: "替换背景",
    transparent: "透明",
    greenScreen: "绿幕",
    white: "白色",
    black: "黑色",
    custom: "自定义",
    transparentNote: "透明导出带 Alpha 通道的 WebM；纯色导出 MP4。输出帧率为",
    fpsNote: "fps。",
    loadingEngine: "加载引擎中（∼70 MB，仅首次）…",
    extractingFrames: "提取帧…",
    removingBgFrame: "正在删除背景 — 帧",
    encodingVideo: "正在编码新视频…",
    working: "处理中…",
    removeVideoBg: "删除视频背景",
    privacyNote: "100%在您的浏览器中通过 WebAssembly 处理 — 您的视频永远不会被上传。",
    tierNote: "在",
    tierCapAt: "套餐中，片段上限为",
    tierSuffix: "秒 —",
    upgrade: "升级",
    forUpTo: "最长 5 分钟（Pro）或无限制（Business）。",
    errorPrefix: "无法处理视频: ",
    clipTooLong: "您的片段为",
    clipTooLongMid: "秒 — 在",
    clipTooLongEnd: "套餐中我们只处理前",
    clipTooLongSuffix: "秒。升级以处理更长片段。",
  },
  ko: {
    uploadVideo: "동영상 업로드",
    uploadHint: "MP4 · MOV · WebM — 브라우저에서 100% 처리",
    replaceBg: "대체 배경",
    transparent: "투명",
    greenScreen: "그린 스크린",
    white: "흰색",
    black: "검정",
    custom: "사용자 지정",
    transparentNote: "투명은 알파 채널이 있는 WebM으로 내보냅니다; 색상은 MP4로 내보냅니다. 출력은",
    fpsNote: "fps.",
    loadingEngine: "엔진 로딩 중(∼70 MB, 최초 1회)…",
    extractingFrames: "프레임 추출 중…",
    removingBgFrame: "배경 제거 중 — 프레임",
    encodingVideo: "새 동영상 인코딩 중…",
    working: "처리 중…",
    removeVideoBg: "동영상 배경 제거",
    privacyNote: "WebAssembly를 통해 브라우저에서 100% 처리 — 동영상은 절대 업로드되지 않습니다.",
    tierNote: "",
    tierCapAt: "플랜에서는 클립이",
    tierSuffix: "초로 제한됩니다 —",
    upgrade: "업그레이드",
    forUpTo: "하여 최대 5분(Pro) 또는 무제한(Business)으로.",
    errorPrefix: "동영상을 처리할 수 없습니다: ",
    clipTooLong: "클립이",
    clipTooLongMid: "초입니다 —",
    clipTooLongEnd: "플랜에서는 처음",
    clipTooLongSuffix: "초만 처리합니다. 긴 클립은 업그레이드하세요.",
  },
  ar: {
    uploadVideo: "تحميل مقطع فيديو",
    uploadHint: "MP4 · MOV · WebM — يُعالج 100‏% في متصفحك",
    replaceBg: "خلفية بديلة",
    transparent: "شفاف",
    greenScreen: "شاشة خضراء",
    white: "أبيض",
    black: "أسود",
    custom: "مخصص",
    transparentNote: "الشفاف يُصدّر WebM بقناة ألفا؛ اللون يُصدّر MP4. يعمل الإخراج بـ",
    fpsNote: "إطارًا/ث.",
    loadingEngine: "جارٍ تحميل المحرك (∼70 ميغابايت، المرة الأولى فقط)…",
    extractingFrames: "جارٍ استخراج الإطارات…",
    removingBgFrame: "جارٍ إزالة الخلفية — الإطار",
    encodingVideo: "جارٍ ترميز الفيديو الجديد…",
    working: "جارٍ المعالجة…",
    removeVideoBg: "إزالة خلفية الفيديو",
    privacyNote: "يعمل 100‏% في متصفحك عبر WebAssembly — مقطعك لن يُرفع أبدًا.",
    tierNote: "في مستوى",
    tierCapAt: "، تُقيَّد المقاطع بـ",
    tierSuffix: "ث —",
    upgrade: "الترقية",
    forUpTo: "للحصول على حتى 5 دقائق (Pro) أو غير محدود (Business).",
    errorPrefix: "تعذّر معالجة الفيديو: ",
    clipTooLong: "مقطعك يبلغ",
    clipTooLongMid: "ث — في مستوى",
    clipTooLongEnd: "سنعالج الـ",
    clipTooLongSuffix: "ث الأولى. قم بالترقية للمقاطع الأطول.",
  },
  ru: {
    uploadVideo: "Загрузить видео",
    uploadHint: "MP4 · MOV · WebM — обрабатывается на 100 % в вашем браузере",
    replaceBg: "Замена фона",
    transparent: "Прозрачный",
    greenScreen: "Хромакей",
    white: "Белый",
    black: "Чёрный",
    custom: "Произвольный",
    transparentNote: "Прозрачный экспортирует WebM с альфа-каналом; цвет экспортирует MP4. Выходной FPS:",
    fpsNote: "",
    loadingEngine: "Загружается движок (∼70 МБ, только при первом запуске)…",
    extractingFrames: "Извлекаются кадры…",
    removingBgFrame: "Удаляется фон — кадр",
    encodingVideo: "Кодируется новое видео…",
    working: "Обрабатывается…",
    removeVideoBg: "Удалить фон видео",
    privacyNote: "100 % в вашем браузере через WebAssembly — ваше видео никогда не загружается.",
    tierNote: "На тарифе",
    tierCapAt: "клипы ограничены до",
    tierSuffix: "с —",
    upgrade: "перейдите на более высокий тариф",
    forUpTo: "для до 5 мин (Pro) или без ограничений (Business).",
    errorPrefix: "Не удалось обработать видео: ",
    clipTooLong: "Ваш клип",
    clipTooLongMid: "с — на тарифе",
    clipTooLongEnd: "мы обработаем первые",
    clipTooLongSuffix: "с. Обновите тариф для более длинных клипов.",
  },
  hi: {
    uploadVideo: "वीडियो अपलोड करें",
    uploadHint: "MP4 · MOV · WebM — आपके ब्राउज़र में 100% प्रसंस्कृत",
    replaceBg: "प्रतिस्थापन पृष्ठभूमि",
    transparent: "पारदर्शी",
    greenScreen: "ग्रीन स्क्रीन",
    white: "सफ़ेद",
    black: "काला",
    custom: "कस्टम",
    transparentNote: "पारदर्शी अल्फा चैनल के साथ WebM निर्यात करता है; रंग MP4 निर्यात करता है। आउटपुट चलता है",
    fpsNote: "fps पर।",
    loadingEngine: "इंजन लोड हो रहा है (∼70 MB, केवल पहली बार)…",
    extractingFrames: "फ्रेम निकाले जा रहे हैं…",
    removingBgFrame: "पृष्ठभूमि हटाई जा रही है — फ्रेम",
    encodingVideo: "नया वीडियो एन्कोड हो रहा है…",
    working: "प्रसंस्करण जारी है…",
    removeVideoBg: "वीडियो पृष्ठभूमि हटाएं",
    privacyNote: "WebAssembly के जरिए आपके ब्राउज़र में 100% — आपका वीडियो कभी अपलोड नहीं होता।",
    tierNote: "",
    tierCapAt: "प्लान पर क्लिप",
    tierSuffix: "सेकंड तक सीमित हैं —",
    upgrade: "अपग्रेड करें",
    forUpTo: "5 मिनट (Pro) या असीमित (Business) के लिए।",
    errorPrefix: "वीडियो प्रसंस्कृत नहीं हो सका: ",
    clipTooLong: "आपका क्लिप",
    clipTooLongMid: "सेकंड का है —",
    clipTooLongEnd: "प्लान पर पहले",
    clipTooLongSuffix: "सेकंड प्रसंस्कृत होंगे। लंबे क्लिप के लिए अपग्रेड करें।",
  },
  tr: {
    uploadVideo: "Video yükleyin",
    uploadHint: "MP4 · MOV · WebM — tarayıcınızda %100 işlenir",
    replaceBg: "Yedek arka plan",
    transparent: "Şeffaf",
    greenScreen: "Yeşil ekran",
    white: "Beyaz",
    black: "Siyah",
    custom: "Özel",
    transparentNote: "Şeffaf, alfa kanallı WebM olarak dışa aktarır; renk MP4 olarak dışa aktarır. Çıktı",
    fpsNote: "fps çalışır.",
    loadingEngine: "Motor yükleniyor (∼70 MB, yalnızca ilk seferinde)…",
    extractingFrames: "Kareler çıkarılıyor…",
    removingBgFrame: "Arka plan kaldırılıyor — kare",
    encodingVideo: "Yeni video kodlanıyor…",
    working: "İşleniyor…",
    removeVideoBg: "Video arka planını kaldır",
    privacyNote: "WebAssembly aracılığıyla tarayıcınızda %100 — videonuz hiçbir zaman yüklenmez.",
    tierNote: "",
    tierCapAt: "planında klipler",
    tierSuffix: "s ile sınırlıdır —",
    upgrade: "yükseltin",
    forUpTo: "5 dakikaya kadar (Pro) veya sınırsız (Business) için.",
    errorPrefix: "Video işlenemedi: ",
    clipTooLong: "Klibin",
    clipTooLongMid: "s —",
    clipTooLongEnd: "planında ilk",
    clipTooLongSuffix: "s işlenecek. Daha uzun klipler için planı yükseltin.",
  },
  id: {
    uploadVideo: "Unggah video",
    uploadHint: "MP4 · MOV · WebM — diproses 100% di browser Anda",
    replaceBg: "Latar belakang pengganti",
    transparent: "Transparan",
    greenScreen: "Layar hijau",
    white: "Putih",
    black: "Hitam",
    custom: "Kustom",
    transparentNote: "Transparan mengekspor WebM dengan saluran alfa; warna mengekspor MP4. Output berjalan pada",
    fpsNote: "fps.",
    loadingEngine: "Memuat mesin (∼70 MB, hanya pertama kali)…",
    extractingFrames: "Mengekstrak frame…",
    removingBgFrame: "Menghapus latar belakang — frame",
    encodingVideo: "Mengkodekan video baru…",
    working: "Memproses…",
    removeVideoBg: "Hapus latar belakang video",
    privacyNote: "100% di browser Anda melalui WebAssembly — video Anda tidak pernah diunggah.",
    tierNote: "Pada tingkat",
    tierCapAt: ", klip dibatasi hingga",
    tierSuffix: "d —",
    upgrade: "upgrade",
    forUpTo: "untuk hingga 5 menit (Pro) atau tidak terbatas (Business).",
    errorPrefix: "Tidak dapat memproses video: ",
    clipTooLong: "Klip Anda berdurasi",
    clipTooLongMid: "d — di tingkat",
    clipTooLongEnd: "kami akan memproses",
    clipTooLongSuffix: "d pertama. Upgrade untuk klip lebih panjang.",
  },
  vi: {
    uploadVideo: "Tải video lên",
    uploadHint: "MP4 · MOV · WebM — xử lý 100% trên trình duyệt của bạn",
    replaceBg: "Nền thay thế",
    transparent: "Trong suốt",
    greenScreen: "Phông xanh",
    white: "Trắng",
    black: "Đen",
    custom: "Tùy chỉnh",
    transparentNote: "Trong suốt xuất WebM có kênh alpha; màu sắc xuất MP4. Đầu ra chạy ở",
    fpsNote: "fps.",
    loadingEngine: "Đang tải công cụ (∼70 MB, chỉ lần đầu)…",
    extractingFrames: "Đang trích xuất khung hình…",
    removingBgFrame: "Đang xóa nền — khung",
    encodingVideo: "Đang mã hóa video mới…",
    working: "Đang xử lý…",
    removeVideoBg: "Xóa nền video",
    privacyNote: "100% trên trình duyệt của bạn qua WebAssembly — video của bạn không bao giờ được tải lên.",
    tierNote: "Ở gói",
    tierCapAt: ", clip bị giới hạn ở",
    tierSuffix: "giây —",
    upgrade: "nâng cấp",
    forUpTo: "lên tới 5 phút (Pro) hoặc không giới hạn (Business).",
    errorPrefix: "Không thể xử lý video: ",
    clipTooLong: "Clip của bạn dài",
    clipTooLongMid: "giây — ở gói",
    clipTooLongEnd: "chúng tôi sẽ xử lý",
    clipTooLongSuffix: "giây đầu. Nâng cấp để xử lý clip dài hơn.",
  },
  sv: {
    uploadVideo: "Ladda upp en video",
    uploadHint: "MP4 · MOV · WebM — bearbetas 100 % i din webbläsare",
    replaceBg: "Ersättningsbakgrund",
    transparent: "Transparent",
    greenScreen: "Green screen",
    white: "Vit",
    black: "Svart",
    custom: "Anpassad",
    transparentNote: "Transparent exporterar en WebM med alfakanal; en färg exporterar MP4. Utdata körs på",
    fpsNote: "fps.",
    loadingEngine: "Laddar motor (∼70 MB, bara första gången)…",
    extractingFrames: "Extraherar ramar…",
    removingBgFrame: "Tar bort bakgrund — ram",
    encodingVideo: "Kodar ny video…",
    working: "Bearbetar…",
    removeVideoBg: "Ta bort videobakgrund",
    privacyNote: "100 % i din webbläsare via WebAssembly — din video laddas aldrig upp.",
    tierNote: "På",
    tierCapAt: "-nivån begränsas klipp till",
    tierSuffix: "s —",
    upgrade: "uppgradera",
    forUpTo: "för upp till 5 min (Pro) eller obegränsat (Business).",
    errorPrefix: "Kunde inte bearbeta videon: ",
    clipTooLong: "Ditt klipp är",
    clipTooLongMid: "s — på",
    clipTooLongEnd: "-nivån bearbetar vi de första",
    clipTooLongSuffix: "s. Uppgradera för längre klipp.",
  },
  pl: {
    uploadVideo: "Prześlij wideo",
    uploadHint: "MP4 · MOV · WebM — przetwarzane w 100 % w Twojej przeglądarce",
    replaceBg: "Zastępcze tło",
    transparent: "Przezroczyste",
    greenScreen: "Zielone tło",
    white: "Białe",
    black: "Czarne",
    custom: "Niestandardowe",
    transparentNote: "Przezroczyste eksportuje WebM z kanałem alfa; kolor eksportuje MP4. Wyjście działa z",
    fpsNote: "kl./s.",
    loadingEngine: "Ładowanie silnika (∼70 MB, tylko za pierwszym razem)…",
    extractingFrames: "Wyodrębnianie klatek…",
    removingBgFrame: "Usuwanie tła — klatka",
    encodingVideo: "Kodowanie nowego wideo…",
    working: "Przetwarzanie…",
    removeVideoBg: "Usuń tło wideo",
    privacyNote: "100 % w Twojej przeglądarce przez WebAssembly — Twoje wideo nigdy nie jest przesyłane.",
    tierNote: "W planie",
    tierCapAt: "klipy są ograniczone do",
    tierSuffix: "s —",
    upgrade: "uaktualnij",
    forUpTo: "do 5 min (Pro) lub bez ograniczeń (Business).",
    errorPrefix: "Nie można przetworzyć wideo: ",
    clipTooLong: "Twój klip trwa",
    clipTooLongMid: "s — w planie",
    clipTooLongEnd: "przetworzymy pierwsze",
    clipTooLongSuffix: "s. Uaktualnij plan dla dłuższych klipów.",
  },
  uk: {
    uploadVideo: "Завантажити відео",
    uploadHint: "MP4 · MOV · WebM — обробляється на 100 % у вашому браузері",
    replaceBg: "Замінити фон",
    transparent: "Прозорий",
    greenScreen: "Хромакей",
    white: "Білий",
    black: "Чорний",
    custom: "Власний",
    transparentNote: "Прозорий експортує WebM з альфа-каналом; колір експортує MP4. Вихід працює з",
    fpsNote: "кадр/с.",
    loadingEngine: "Завантаження двигуна (∼70 МБ, лише при першому запуску)…",
    extractingFrames: "Витягуються кадри…",
    removingBgFrame: "Видалення фону — кадр",
    encodingVideo: "Кодується нове відео…",
    working: "Обробляється…",
    removeVideoBg: "Видалити фон відео",
    privacyNote: "100 % у вашому браузері через WebAssembly — ваше відео ніколи не завантажується.",
    tierNote: "На тарифі",
    tierCapAt: "кліпи обмежені до",
    tierSuffix: "с —",
    upgrade: "перейдіть на вищий тариф",
    forUpTo: "до 5 хв (Pro) або необмежено (Business).",
    errorPrefix: "Не вдалося обробити відео: ",
    clipTooLong: "Ваш кліп",
    clipTooLongMid: "с — на тарифі",
    clipTooLongEnd: "ми обробимо перші",
    clipTooLongSuffix: "с. Оновіть тариф для довших кліпів.",
  },
  cs: {
    uploadVideo: "Nahrát video",
    uploadHint: "MP4 · MOV · WebM — zpracováno 100 % ve vašem prohlížeči",
    replaceBg: "Náhradní pozadí",
    transparent: "Průhledné",
    greenScreen: "Zelené plátno",
    white: "Bílé",
    black: "Černé",
    custom: "Vlastní",
    transparentNote: "Průhledné exportuje WebM s alfa kanálem; barva exportuje MP4. Výstup běží na",
    fpsNote: "fps.",
    loadingEngine: "Načítání engine (∼70 MB, pouze poprvé)…",
    extractingFrames: "Extrahování snímků…",
    removingBgFrame: "Odstraňování pozadí — snímek",
    encodingVideo: "Kódování nového videa…",
    working: "Zpracovávání…",
    removeVideoBg: "Odstranit pozadí videa",
    privacyNote: "100 % ve vašem prohlížeči přes WebAssembly — vaše video není nikdy nahráno.",
    tierNote: "V plánu",
    tierCapAt: "jsou klipy omezeny na",
    tierSuffix: "s —",
    upgrade: "upgradujte",
    forUpTo: "na až 5 min (Pro) nebo neomezeno (Business).",
    errorPrefix: "Video nelze zpracovat: ",
    clipTooLong: "Váš klip je",
    clipTooLongMid: "s — v plánu",
    clipTooLongEnd: "zpracujeme prvních",
    clipTooLongSuffix: "s. Upgradujte pro delší klipy.",
  },
};

export function RemoveVideoBackgroundClient() {
  const s = T[useLocale()] ?? T.en;

  const { user, plan, loading } = useUser();
  const [file, setFile] = useState<File | null>(null);
  const [bgId, setBgId] = useState("transparent");
  const [custom, setCustom] = useState("#2563eb");
  const [useCustom, setUseCustom] = useState(false);
  const [duration, setDuration] = useState(0);
  const [phase, setPhase] = useState<"idle" | "loading" | "frames" | "matting" | "encoding">("idle");
  const [matted, setMatted] = useState(0);
  const [totalFrames, setTotalFrames] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [note, setNote] = useState<string | null>(null);
  const [outUrl, setOutUrl] = useState<string | null>(null);
  const [outSize, setOutSize] = useState(0);
  const [outExt, setOutExt] = useState<"webm" | "mp4">("webm");
  const cleanup = useRef<string | null>(null);

  useEffect(() => () => { if (cleanup.current) URL.revokeObjectURL(cleanup.current); }, []);

  const limit = limitFor(!!user, plan);
  const busy = phase !== "idle";

  const BACKGROUNDS: Bg[] = [
    { id: "transparent", label: s.transparent, swatch: "repeating-conic-gradient(#d1d5db 0 25%, #fff 0 50%) 0/12px 12px", color: null },
    { id: "green", label: s.greenScreen, swatch: "#00b140", color: "#00b140" },
    { id: "white", label: s.white, swatch: "#ffffff", color: "#ffffff" },
    { id: "black", label: s.black, swatch: "#000000", color: "#000000" },
  ];

  const bgColor = useCustom ? custom : BACKGROUNDS.find((b) => b.id === bgId)?.color ?? null;
  const transparent = !useCustom && bgId === "transparent";

  function pick(f: File | null) {
    if (!f) return;
    setError(null); setOutUrl(null); setNote(null); setMatted(0); setTotalFrames(0);
    setFile(f);
    const v = document.createElement("video");
    v.preload = "metadata";
    v.onloadedmetadata = () => {
      setDuration(v.duration || 0);
      if (Number.isFinite(limit.seconds) && v.duration > limit.seconds) {
        setNote(`${s.clipTooLong} ${Math.round(v.duration)}${s.clipTooLongMid} ${limit.label} ${s.clipTooLongEnd} ${limit.seconds}${s.clipTooLongSuffix}`);
      }
      URL.revokeObjectURL(v.src);
    };
    v.src = URL.createObjectURL(f);
  }

  /** Composite one matted PNG (alpha) over the chosen background; return PNG bytes. */
  async function composite(alphaPng: Uint8Array): Promise<Uint8Array> {
    const bmp = await createImageBitmap(new Blob([alphaPng as BlobPart], { type: "image/png" }));
    const canvas = document.createElement("canvas");
    canvas.width = bmp.width; canvas.height = bmp.height;
    const ctx = canvas.getContext("2d")!;
    if (bgColor) { ctx.fillStyle = bgColor; ctx.fillRect(0, 0, canvas.width, canvas.height); }
    else ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(bmp, 0, 0);
    bmp.close();
    const blob: Blob = await new Promise((res) => canvas.toBlob((b) => res(b!), "image/png"));
    return new Uint8Array(await blob.arrayBuffer());
  }

  async function run() {
    if (!file || busy || loading) return;
    if (limit.seconds === 0) return;
    setError(null); setOutUrl(null); setMatted(0);
    const capSec = Number.isFinite(limit.seconds) ? Math.min(duration || limit.seconds, limit.seconds) : (duration || 600);

    try {
      setPhase("loading");
      const [ff, bg] = await Promise.all([getFfmpeg(), getBg()]);
      const inExt = (file.name.split(".").pop() || "mp4").toLowerCase();
      const inName = `in.${inExt}`;
      const { fetchFile } = await import("@ffmpeg/util");
      await ff.writeFile(inName, await fetchFile(file));

      // 1) Extract frames (capped, downscaled to ≤1280px wide for tractability).
      setPhase("frames");
      const extract = await ff.exec(["-i", inName, "-t", String(capSec), "-vf", `fps=${FPS},scale='min(1280,iw)':-2`, "frame%05d.png"]);
      if (extract !== 0) throw new Error("frame extraction failed");

      // 2) Try to keep the original audio (best-effort — clips may be silent).
      let hasAudio = false;
      try { hasAudio = (await ff.exec(["-i", inName, "-t", String(capSec), "-vn", "-c:a", "aac", "-b:a", "128k", "aud.m4a"])) === 0; } catch { hasAudio = false; }

      // 3) Count frames by reading sequentially until one is missing.
      const frames: number[] = [];
      for (let i = 1; ; i++) {
        try { await ff.readFile(`frame${padNum(i)}.png`); frames.push(i); } catch { break; }
      }
      if (!frames.length) throw new Error("no frames extracted");
      setTotalFrames(frames.length);

      // 4) Matte each frame, composite over the background, write back.
      setPhase("matting");
      for (const i of frames) {
        const raw = await ff.readFile(`frame${padNum(i)}.png`);
        const cut = await bg.removeBackground(new Blob([raw as BlobPart], { type: "image/png" }), { output: { format: "image/png", quality: 1 } });
        const composedPng = await composite(new Uint8Array(await cut.arrayBuffer()));
        await ff.writeFile(`out${padNum(i)}.png`, composedPng);
        await ff.deleteFile(`frame${padNum(i)}.png`);
        setMatted((m) => m + 1);
      }

      // 5) Re-encode. Transparent → VP9/alpha WebM; solid colour → H.264 MP4.
      setPhase("encoding");
      const ext: "webm" | "mp4" = transparent ? "webm" : "mp4";
      const out = `out.${ext}`;
      const audioIn = hasAudio ? ["-i", "aud.m4a"] : [];
      const args = transparent
        ? ["-framerate", String(FPS), "-i", "out%05d.png", ...audioIn, "-c:v", "libvpx-vp9", "-pix_fmt", "yuva420p", "-b:v", "1M", ...(hasAudio ? ["-c:a", "libopus", "-b:a", "96k", "-shortest"] : []), out]
        : ["-framerate", String(FPS), "-i", "out%05d.png", ...audioIn, "-c:v", "libx264", "-pix_fmt", "yuv420p", "-preset", "veryfast", "-crf", "23", ...(hasAudio ? ["-c:a", "aac", "-b:a", "128k", "-shortest"] : []), out];
      const code = await ff.exec(args);
      if (code !== 0) throw new Error("encoding failed (code " + code + ")");

      const data = await ff.readFile(out);
      const blob = new Blob([data as BlobPart], { type: transparent ? "video/webm" : "video/mp4" });
      if (cleanup.current) URL.revokeObjectURL(cleanup.current);
      const url = URL.createObjectURL(blob);
      cleanup.current = url;
      setOutUrl(url); setOutSize(blob.size); setOutExt(ext);

      // Tidy the FS.
      try {
        await ff.deleteFile(inName); await ff.deleteFile(out);
        if (hasAudio) await ff.deleteFile("aud.m4a");
        for (const i of frames) { try { await ff.deleteFile(`out${padNum(i)}.png`); } catch {} }
      } catch {}
    } catch (e) {
      setError(`${s.errorPrefix}${(e as Error).message}`);
    } finally {
      setPhase("idle");
    }
  }

  const phaseLabel = phase === "loading" ? s.loadingEngine
    : phase === "frames" ? s.extractingFrames
    : phase === "matting" ? `${s.removingBgFrame} ${matted}/${totalFrames || "…"}`
    : phase === "encoding" ? s.encodingVideo : "";
  const pct = phase === "matting" && totalFrames ? Math.round((matted / totalFrames) * 100) : phase === "encoding" ? 99 : phase === "frames" ? 5 : 0;

  return (
    <div className="space-y-4">
      {!file ? (
        <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-rose-300 bg-rose-50/40 px-6 py-12 text-center transition-colors hover:brightness-95">
          <Upload className="h-7 w-7 text-rose-600" />
          <span className="mt-2 font-medium text-ink-900">{s.uploadVideo}</span>
          <span className="mt-0.5 text-xs text-ink-400">{s.uploadHint}</span>
          <input type="file" accept="video/mp4,video/quicktime,video/webm,.mp4,.mov,.webm,.mkv" className="hidden" onChange={(e) => pick(e.target.files?.[0] ?? null)} />
        </label>
      ) : (
        <div className="flex items-center justify-between rounded-lg border border-ink-100 bg-white px-4 py-2.5">
          <div className="min-w-0 truncate text-sm">
            <span className="font-medium text-ink-900">{file.name}</span>
            <span className="ml-2 text-ink-400">{formatBytes(file.size)}{duration ? ` · ${Math.round(duration)}s` : ""}</span>
          </div>
          <button onClick={() => { setFile(null); setOutUrl(null); setError(null); setNote(null); }} className="rounded p-1 text-xs text-ink-400 hover:bg-ink-50 hover:text-ink-700"><X className="h-3.5 w-3.5" /></button>
        </div>
      )}

      {file && (
        <div>
          <p className="mb-2 text-sm font-medium text-ink-700">{s.replaceBg}</p>
          <div className="flex flex-wrap items-center gap-2">
            {BACKGROUNDS.map((b) => (
              <button key={b.id} onClick={() => { setUseCustom(false); setBgId(b.id); }}
                className={`flex items-center gap-2 rounded-lg border px-3 py-1.5 text-sm ${!useCustom && bgId === b.id ? "border-rose-400 ring-2 ring-rose-100" : "border-ink-200"}`}>
                <span className="h-4 w-4 rounded border border-ink-200" style={{ background: b.swatch }} />
                {b.label}
              </button>
            ))}
            <button onClick={() => setUseCustom(true)} className={`flex items-center gap-2 rounded-lg border px-3 py-1.5 text-sm ${useCustom ? "border-rose-400 ring-2 ring-rose-100" : "border-ink-200"}`}>
              <input type="color" value={custom} onChange={(e) => { setCustom(e.target.value); setUseCustom(true); }} className="h-4 w-4 cursor-pointer rounded border-0 bg-transparent p-0" />
              {s.custom}
            </button>
          </div>
          <p className="mt-2 text-xs text-ink-400">
            {s.transparentNote} {FPS} {s.fpsNote}
          </p>
        </div>
      )}

      {note && <p className="rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-700">{note}</p>}

      {busy && (
        <div className="flex items-center gap-3 rounded-lg border border-ink-100 bg-white px-4 py-3">
          <Loader2 className="h-4 w-4 animate-spin text-rose-500" />
          <div className="flex-1">
            <p className="text-sm font-medium text-ink-900">{phaseLabel}</p>
            <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-ink-100">
              <div className="h-full rounded-full bg-rose-500 transition-all" style={{ width: `${pct}%` }} />
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        <Button size="lg" onClick={run} disabled={!file || busy || loading}>
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          {busy ? s.working : s.removeVideoBg}
        </Button>
        {outUrl && (
          <a href={outUrl} download={`no-background.${outExt}`}>
            <Button size="lg" variant="outline"><Download className="h-4 w-4" /> Download {outExt.toUpperCase()} · {formatBytes(outSize)}</Button>
          </a>
        )}
      </div>

      {outUrl && (
        <div className="rounded-lg border border-ink-100 bg-white p-3">
          <div className="grid min-h-48 place-items-center rounded p-2" style={{ background: transparent ? "repeating-conic-gradient(#d1d5db 0 25%, #fff 0 50%) 0/16px 16px" : "#111827" }}>
            <video src={outUrl} controls loop className="max-h-80 max-w-full rounded" />
          </div>
        </div>
      )}

      <p className="flex items-center gap-1.5 text-xs text-ink-400">
        <Lock className="h-3 w-3" /> {s.privacyNote}{" "}
        {Number.isFinite(limit.seconds) && (
          <span>{s.tierNote} {limit.label} {s.tierCapAt} {limit.seconds}{s.tierSuffix} <Link href="/pricing" className="text-rose-600 hover:underline">{s.upgrade}</Link> {s.forUpTo}</span>
        )}
      </p>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
