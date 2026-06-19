"use client";

import { useEffect, useRef, useState } from "react";
import { Upload, X, Download, Loader2, Music, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatBytes } from "@/lib/utils";
import { getFfmpeg } from "@/lib/ffmpeg-client";
import { useLocale } from "@/hooks/useLocale";

const T: Record<string, Record<string, string>> = {
  en: {
    audioFile: "Audio file",
    coverImage: "Cover image",
    loadingFfmpeg: "Loading FFmpeg (~30 MB, first time only)…",
    renderingMp4: "Rendering MP4…",
    rendering: "Rendering…",
    createVideo: "Create video",
    downloadMp4: "Download MP4",
    errorPrefix: "Could not build the video: ",
    privacy: "100% in your browser via FFmpeg.wasm — your files are never uploaded.",
  },
  fr: {
    audioFile: "Fichier audio",
    coverImage: "Image de couverture",
    loadingFfmpeg: "Chargement de FFmpeg (~30 Mo, première fois seulement)…",
    renderingMp4: "Rendu MP4…",
    rendering: "Rendu…",
    createVideo: "Créer la vidéo",
    downloadMp4: "Télécharger MP4",
    errorPrefix: "Impossible de créer la vidéo : ",
    privacy: "100 % dans votre navigateur via FFmpeg.wasm — vos fichiers ne sont jamais envoyés.",
  },
  es: {
    audioFile: "Archivo de audio",
    coverImage: "Imagen de portada",
    loadingFfmpeg: "Cargando FFmpeg (~30 MB, solo la primera vez)…",
    renderingMp4: "Renderizando MP4…",
    rendering: "Renderizando…",
    createVideo: "Crear vídeo",
    downloadMp4: "Descargar MP4",
    errorPrefix: "No se pudo crear el vídeo: ",
    privacy: "100 % en tu navegador con FFmpeg.wasm — tus archivos nunca se suben.",
  },
  pt: {
    audioFile: "Arquivo de áudio",
    coverImage: "Imagem de capa",
    loadingFfmpeg: "Carregando FFmpeg (~30 MB, apenas na primeira vez)…",
    renderingMp4: "Renderizando MP4…",
    rendering: "Renderizando…",
    createVideo: "Criar vídeo",
    downloadMp4: "Baixar MP4",
    errorPrefix: "Não foi possível criar o vídeo: ",
    privacy: "100% no seu navegador via FFmpeg.wasm — seus arquivos nunca são enviados.",
  },
  de: {
    audioFile: "Audiodatei",
    coverImage: "Titelbild",
    loadingFfmpeg: "FFmpeg wird geladen (~30 MB, nur beim ersten Mal)…",
    renderingMp4: "MP4 wird gerendert…",
    rendering: "Wird gerendert…",
    createVideo: "Video erstellen",
    downloadMp4: "MP4 herunterladen",
    errorPrefix: "Video konnte nicht erstellt werden: ",
    privacy: "100 % in Ihrem Browser via FFmpeg.wasm — Ihre Dateien werden nie hochgeladen.",
  },
  it: {
    audioFile: "File audio",
    coverImage: "Immagine di copertina",
    loadingFfmpeg: "Caricamento di FFmpeg (~30 MB, solo la prima volta)…",
    renderingMp4: "Rendering MP4…",
    rendering: "Rendering…",
    createVideo: "Crea video",
    downloadMp4: "Scarica MP4",
    errorPrefix: "Impossibile creare il video: ",
    privacy: "100% nel tuo browser via FFmpeg.wasm — i tuoi file non vengono mai caricati.",
  },
  nl: {
    audioFile: "Audiobestand",
    coverImage: "Omslagafbeelding",
    loadingFfmpeg: "FFmpeg laden (~30 MB, alleen de eerste keer)…",
    renderingMp4: "MP4 renderen…",
    rendering: "Renderen…",
    createVideo: "Video maken",
    downloadMp4: "MP4 downloaden",
    errorPrefix: "Kon de video niet maken: ",
    privacy: "100% in uw browser via FFmpeg.wasm — uw bestanden worden nooit geüpload.",
  },
  ja: {
    audioFile: "オーディオファイル",
    coverImage: "カバーイメージ",
    loadingFfmpeg: "FFmpegを読み込んでいます（～30 MB、初回のみ）…",
    renderingMp4: "MP4をレンダリング中…",
    rendering: "レンダリング中…",
    createVideo: "動画を作成",
    downloadMp4: "MP4をダウンロード",
    errorPrefix: "動画を作成できませんでした: ",
    privacy: "FFmpeg.wasmでブラウザ内で100%処理 — ファイルは決してアップロードされません。",
  },
  zh: {
    audioFile: "音频文件",
    coverImage: "封面图片",
    loadingFfmpeg: "正在加载 FFmpeg（～30 MB，仅首次）…",
    renderingMp4: "正在渲染 MP4…",
    rendering: "渲染中…",
    createVideo: "创建视频",
    downloadMp4: "下载 MP4",
    errorPrefix: "无法创建视频：",
    privacy: "100% 在您的浏览器中通过 FFmpeg.wasm 处理 — 您的文件永远不会被上传。",
  },
  ko: {
    audioFile: "오디오 파일",
    coverImage: "커버 이미지",
    loadingFfmpeg: "FFmpeg 로딩 중（~30 MB, 첫 번만）…",
    renderingMp4: "MP4 렌더링 중…",
    rendering: "렌더링 중…",
    createVideo: "동영상 만들기",
    downloadMp4: "MP4 다운로드",
    errorPrefix: "동영상을 만들 수 없습니다: ",
    privacy: "FFmpeg.wasm을 통해 브라우저에서 100% 처리 — 파일은 절대 업로드되지 않습니다.",
  },
  ar: {
    audioFile: "ملف صوتي",
    coverImage: "صورة الغلاف",
    loadingFfmpeg: "جاري تحميل FFmpeg (سل30 MB، في المرة الأولى فقط)…",
    renderingMp4: "جاري معالجة MP4…",
    rendering: "جاري المعالجة…",
    createVideo: "إنشاء الفيديو",
    downloadMp4: "تنزيل MP4",
    errorPrefix: "تعذّر إنشاء الفيديو: ",
    privacy: "معالجة 100% في متصفحك عبر FFmpeg.wasm — لن يتم رفع ملفاتك مطلقًا.",
  },
  ru: {
    audioFile: "Аудиофайл",
    coverImage: "Обложка",
    loadingFfmpeg: "Загрузка FFmpeg (~30 МБ, только первый раз)…",
    renderingMp4: "Рендеринг MP4…",
    rendering: "Рендеринг…",
    createVideo: "Создать видео",
    downloadMp4: "Скачать MP4",
    errorPrefix: "Не удалось создать видео: ",
    privacy: "100% в вашем браузере через FFmpeg.wasm — ваши файлы никогда не загружаются.",
  },
  hi: {
    audioFile: "ऑडियो फ़ाइल",
    coverImage: "कवर चित्र",
    loadingFfmpeg: "FFmpeg लोड हो रहा है (~30 MB, केवल पहली बार)…",
    renderingMp4: "MP4 रेंडर हो रहा है…",
    rendering: "रेंडर हो रहा है…",
    createVideo: "वीडियो बनाएं",
    downloadMp4: "MP4 डाउनलोड करें",
    errorPrefix: "वीडियो नहीं बनाई जा सकी: ",
    privacy: "FFmpeg.wasm के जरिए आपके ब्राउज़र में 100% उपयोग — आपकी फ़ाइलें कभी अपलोड नहीं होतीं।",
  },
  tr: {
    audioFile: "Ses dosyası",
    coverImage: "Kapak görseli",
    loadingFfmpeg: "FFmpeg yükleniyor (~30 MB, yalnızca ilk seferinde)…",
    renderingMp4: "MP4 oluşturuluyor…",
    rendering: "Oluşturuluyor…",
    createVideo: "Video oluştur",
    downloadMp4: "MP4 indir",
    errorPrefix: "Video oluşturulamadı: ",
    privacy: "FFmpeg.wasm aracılığıyla tarayıcınızda %100 işlenir — dosyalarınız asla yüklenmez.",
  },
  id: {
    audioFile: "File audio",
    coverImage: "Gambar sampul",
    loadingFfmpeg: "Memuat FFmpeg (~30 MB, hanya pertama kali)…",
    renderingMp4: "Merender MP4…",
    rendering: "Merender…",
    createVideo: "Buat video",
    downloadMp4: "Unduh MP4",
    errorPrefix: "Tidak dapat membuat video: ",
    privacy: "100% diproses di browser Anda melalui FFmpeg.wasm — file Anda tidak pernah diunggah.",
  },
  vi: {
    audioFile: "Tệp âm thanh",
    coverImage: "Ảnh bìa",
    loadingFfmpeg: "Đang tải FFmpeg (~30 MB, chỉ lần đầu tiên)…",
    renderingMp4: "Đang xuất MP4…",
    rendering: "Đang xử lý…",
    createVideo: "Tạo video",
    downloadMp4: "Tải MP4",
    errorPrefix: "Không thể tạo video: ",
    privacy: "100% xử lý trong trình duyệt của bạn qua FFmpeg.wasm — tệp của bạn không bao giờ được tải lên.",
  },
  sv: {
    audioFile: "Ljudfil",
    coverImage: "Omslagsbild",
    loadingFfmpeg: "Laddar FFmpeg (~30 MB, bara första gången)…",
    renderingMp4: "Renderar MP4…",
    rendering: "Renderar…",
    createVideo: "Skapa video",
    downloadMp4: "Ladda ned MP4",
    errorPrefix: "Kunde inte skapa videon: ",
    privacy: "100% i din webbläsare via FFmpeg.wasm — dina filer laddas aldrig upp.",
  },
  pl: {
    audioFile: "Plik audio",
    coverImage: "Obraz okładki",
    loadingFfmpeg: "Ładowanie FFmpeg (~30 MB, tylko za pierwszym razem)…",
    renderingMp4: "Renderowanie MP4…",
    rendering: "Renderowanie…",
    createVideo: "Utwórz wideo",
    downloadMp4: "Pobierz MP4",
    errorPrefix: "Nie można utworzyć wideo: ",
    privacy: "100% w Twojej przeglądarce przez FFmpeg.wasm — Twoje pliki nigdy nie są przesyłane.",
  },
  uk: {
    audioFile: "Аудіофайл",
    coverImage: "Зображення обкладинки",
    loadingFfmpeg: "Завантаження FFmpeg (~30 МБ, лише перший раз)…",
    renderingMp4: "Рендеринг MP4…",
    rendering: "Рендеринг…",
    createVideo: "Створити відео",
    downloadMp4: "Завантажити MP4",
    errorPrefix: "Не вдалося створити відео: ",
    privacy: "100% у вашому браузері через FFmpeg.wasm — ваші файли ніколи не завантажуються.",
  },
  cs: {
    audioFile: "Zvukový soubor",
    coverImage: "Obrázek obalu",
    loadingFfmpeg: "Načítání FFmpeg (~30 MB, pouze poprvé)…",
    renderingMp4: "Renderování MP4…",
    rendering: "Renderování…",
    createVideo: "Vytvořit video",
    downloadMp4: "Stáhnout MP4",
    errorPrefix: "Video se nepodařilo vytvořit: ",
    privacy: "100% ve vašem prohlížeči přes FFmpeg.wasm — vaše soubory nejsou nikdy nahrávány.",
  },
};

export function AudioToVideoClient() {
  const s = T[useLocale()] ?? T.en;
  const [audio, setAudio] = useState<File | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [phase, setPhase] = useState<"idle" | "loading" | "running">("idle");
  const [error, setError] = useState<string | null>(null);
  const [outUrl, setOutUrl] = useState<string | null>(null);
  const [outSize, setOutSize] = useState(0);
  const cleanup = useRef<string | null>(null);

  useEffect(() => () => { if (cleanup.current) URL.revokeObjectURL(cleanup.current); }, []);

  function pickAudio(f: File | null) { if (!f) return; setAudio(f); setOutUrl(null); setError(null); }
  function pickImage(f: File | null) { if (!f) return; setImage(f); setOutUrl(null); setError(null); }

  async function run() {
    if (!audio || !image || phase !== "idle") return;
    setError(null); setOutUrl(null); setPhase("loading");
    try {
      const { fetchFile } = await import("@ffmpeg/util");
      const ff = await getFfmpeg();
      setPhase("running");
      const audioExt = (audio.name.split(".").pop() || "mp3").toLowerCase();
      const imgExt = (image.name.split(".").pop() || "png").toLowerCase();
      const aName = `audio.${audioExt}`;
      const iName = `image.${imgExt}`;
      const out = "out.mp4";
      await ff.writeFile(iName, await fetchFile(image));
      await ff.writeFile(aName, await fetchFile(audio));
      // -loop 1 + -shortest = video plays the static image for the duration of the audio.
      // yuv420p + even-dimension scale = compatible with every player.
      const code = await ff.exec([
        "-loop", "1", "-i", iName,
        "-i", aName,
        "-c:v", "libx264", "-tune", "stillimage", "-pix_fmt", "yuv420p",
        "-vf", "scale=trunc(iw/2)*2:trunc(ih/2)*2",
        "-c:a", "aac", "-b:a", "192k",
        "-shortest", "-movflags", "+faststart",
        out,
      ]);
      if (code !== 0) throw new Error("FFmpeg exit " + code);
      const data = await ff.readFile(out);
      const blob = new Blob([data as BlobPart], { type: "video/mp4" });
      if (cleanup.current) URL.revokeObjectURL(cleanup.current);
      const url = URL.createObjectURL(blob);
      cleanup.current = url;
      setOutUrl(url); setOutSize(blob.size);
      try { await ff.deleteFile(aName); await ff.deleteFile(iName); await ff.deleteFile(out); } catch {}
    } catch (e) {
      setError(`${s.errorPrefix}${(e as Error).message}`);
    } finally {
      setPhase("idle");
    }
  }

  const busy = phase !== "idle";

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Drop label={s.audioFile} accept="audio/*,.mp3,.wav,.m4a,.flac,.aac,.ogg" icon="audio" file={audio} onPick={pickAudio} onClear={() => setAudio(null)} />
        <Drop label={s.coverImage} accept="image/*,.png,.jpg,.jpeg,.webp" icon="image" file={image} onPick={pickImage} onClear={() => setImage(null)} />
      </div>

      {busy && (
        <div className="flex items-center gap-3 rounded-lg border border-ink-100 bg-white px-4 py-3">
          <Loader2 className="h-4 w-4 animate-spin text-brand-500" />
          <span className="text-sm text-ink-700">
            {phase === "loading" ? s.loadingFfmpeg : s.renderingMp4}
          </span>
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        <Button size="lg" onClick={run} disabled={!audio || !image || busy}>
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          {busy ? s.rendering : s.createVideo}
        </Button>
        {outUrl && (
          <a href={outUrl} download="audio-to-video.mp4">
            <Button size="lg" variant="outline"><Download className="h-4 w-4" /> {s.downloadMp4} &middot; {formatBytes(outSize)}</Button>
          </a>
        )}
      </div>

      {outUrl && (
        <video src={outUrl} controls className="max-h-96 w-full rounded-lg border border-ink-100 bg-black" />
      )}

      {error && <p className="text-sm text-red-600">{error}</p>}
      <p className="text-xs text-ink-400">{s.privacy}</p>
    </div>
  );
}

function Drop({ label, accept, icon, file, onPick, onClear }: {
  label: string; accept: string; icon: "audio" | "image"; file: File | null;
  onPick: (f: File) => void; onClear: () => void;
}) {
  const Icon = icon === "audio" ? Music : ImageIcon;
  return file ? (
    <div className="flex items-center justify-between rounded-lg border border-ink-100 bg-white px-3 py-2 text-sm">
      <span className="min-w-0 truncate">
        <span className="font-medium text-ink-900">{file.name}</span>
        <span className="ml-2 text-ink-400">{formatBytes(file.size)}</span>
      </span>
      <button onClick={onClear} aria-label="Remove" className="rounded p-1 text-ink-400 hover:bg-ink-50 hover:text-ink-700"><X className="h-3.5 w-3.5" /></button>
    </div>
  ) : (
    <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-rose-300 bg-rose-50/40 px-4 py-8 text-center transition-colors hover:brightness-95">
      <Icon className="h-7 w-7 text-rose-600" />
      <span className="mt-2 text-sm font-medium text-ink-900">{label}</span>
      <Upload className="mt-1 h-4 w-4 text-ink-300" />
      <input type="file" accept={accept} className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) onPick(f); }} />
    </label>
  );
}
