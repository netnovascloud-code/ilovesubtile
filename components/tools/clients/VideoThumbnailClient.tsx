"use client";

import { useEffect, useRef, useState } from "react";
import { Film, Download, Loader2, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MiniDrop } from "@/components/tools/MiniDrop";
import { formatBytes } from "@/lib/utils";
import { useLocale } from "@/hooks/useLocale";

type Thumb = { t: number; url: string; size: number };

const fmtT = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

const T: Record<string, Record<string, string>> = {
  en: {
    videoFile: "Video file",
    captureCurrentFrame: "Capture current frame",
    scrubHint: "Scrub the video to the exact moment, then capture — or pick a suggestion below.",
    suggestedFrames: "Suggested frames",
    selectedFrame: "Selected frame",
    downloadPng: "Download PNG",
    privacy: "Frames are grabbed in your browser straight from the video — nothing is uploaded. PNG at the video's native resolution.",
    frameAlt: "Frame at",
    selectedFrameAlt: "Selected frame",
  },
  fr: {
    videoFile: "Fichier vidéo",
    captureCurrentFrame: "Capturer l'image actuelle",
    scrubHint: "Faites défiler la vidéo jusqu'au bon moment, puis capturez — ou choisissez une suggestion ci-dessous.",
    suggestedFrames: "Images suggérées",
    selectedFrame: "Image sélectionnée",
    downloadPng: "Télécharger PNG",
    privacy: "Les images sont extraites directement dans votre navigateur — rien n'est envoyé. PNG en résolution native.",
    frameAlt: "Image à",
    selectedFrameAlt: "Image sélectionnée",
  },
  es: {
    videoFile: "Archivo de vídeo",
    captureCurrentFrame: "Capturar fotograma actual",
    scrubHint: "Desplázate al momento exacto y captura — o elige una sugerencia abajo.",
    suggestedFrames: "Fotogramas sugeridos",
    selectedFrame: "Fotograma seleccionado",
    downloadPng: "Descargar PNG",
    privacy: "Los fotogramas se extraen en tu navegador directamente del vídeo — nada se sube. PNG a la resolución nativa.",
    frameAlt: "Fotograma en",
    selectedFrameAlt: "Fotograma seleccionado",
  },
  pt: {
    videoFile: "Arquivo de vídeo",
    captureCurrentFrame: "Capturar frame atual",
    scrubHint: "Arraste o vídeo até o momento exato e capture — ou escolha uma sugestão abaixo.",
    suggestedFrames: "Frames sugeridos",
    selectedFrame: "Frame selecionado",
    downloadPng: "Baixar PNG",
    privacy: "Os frames são capturados no seu navegador diretamente do vídeo — nada é enviado. PNG na resolução nativa.",
    frameAlt: "Frame em",
    selectedFrameAlt: "Frame selecionado",
  },
  de: {
    videoFile: "Videodatei",
    captureCurrentFrame: "Aktuelles Bild aufnehmen",
    scrubHint: "Suchen Sie den genauen Moment im Video und nehmen Sie auf — oder wählen Sie einen Vorschlag unten.",
    suggestedFrames: "Vorgeschlagene Bilder",
    selectedFrame: "Ausgewähltes Bild",
    downloadPng: "PNG herunterladen",
    privacy: "Frames werden direkt in Ihrem Browser aus dem Video entnommen — nichts wird hochgeladen. PNG in nativer Auflösung.",
    frameAlt: "Bild bei",
    selectedFrameAlt: "Ausgewähltes Bild",
  },
  it: {
    videoFile: "File video",
    captureCurrentFrame: "Cattura fotogramma corrente",
    scrubHint: "Scorri il video al momento esatto e cattura — oppure scegli un suggerimento qui sotto.",
    suggestedFrames: "Fotogrammi suggeriti",
    selectedFrame: "Fotogramma selezionato",
    downloadPng: "Scarica PNG",
    privacy: "I fotogrammi vengono estratti nel browser direttamente dal video — nulla viene caricato. PNG a risoluzione nativa.",
    frameAlt: "Fotogramma a",
    selectedFrameAlt: "Fotogramma selezionato",
  },
  nl: {
    videoFile: "Videobestand",
    captureCurrentFrame: "Huidig frame vastleggen",
    scrubHint: "Scrol naar het exacte moment en leg vast — of kies een suggestie hieronder.",
    suggestedFrames: "Voorgestelde frames",
    selectedFrame: "Geselecteerd frame",
    downloadPng: "PNG downloaden",
    privacy: "Frames worden rechtstreeks in uw browser uit de video gehaald — niets wordt geüpload. PNG op native resolutie.",
    frameAlt: "Frame bij",
    selectedFrameAlt: "Geselecteerd frame",
  },
  ja: {
    videoFile: "動画ファイル",
    captureCurrentFrame: "現在のフレームをキャプチャ",
    scrubHint: "動画を正確な瞬間にスクラブしてキャプチャ — または下の候補から選択。",
    suggestedFrames: "推奨フレーム",
    selectedFrame: "選択されたフレーム",
    downloadPng: "PNG をダウンロード",
    privacy: "フレームはブラウザ内で動画から直接取得 — アップロードなし。動画のネイティブ解像度の PNG。",
    frameAlt: "フレーム",
    selectedFrameAlt: "選択されたフレーム",
  },
  zh: {
    videoFile: "视频文件",
    captureCurrentFrame: "捕获当前帧",
    scrubHint: "将视频拖到准确的时刻，然后捕获 — 或从下方建议中选择。",
    suggestedFrames: "建议帧",
    selectedFrame: "已选帧",
    downloadPng: "下载 PNG",
    privacy: "帧直接在您的浏览器中从视频中提取 — 不会上传任何内容。PNG 为视频的原始分辨率。",
    frameAlt: "帧于",
    selectedFrameAlt: "已选帧",
  },
  ko: {
    videoFile: "동영상 파일",
    captureCurrentFrame: "현재 프레임 캡처",
    scrubHint: "동영상을 정확한 순간으로 스크럽한 다음 캡처 — 또는 아래 제안 중 하나를 선택하세요.",
    suggestedFrames: "추천 프레임",
    selectedFrame: "선택된 프레임",
    downloadPng: "PNG 다운로드",
    privacy: "프레임은 브라우저에서 직접 동영상에서 가져옵니다 — 업로드 없음. PNG는 동영상 기본 해상도.",
    frameAlt: "프레임",
    selectedFrameAlt: "선택된 프레임",
  },
  ar: {
    videoFile: "ملف الفيديو",
    captureCurrentFrame: "التقاط الإطار الحالي",
    scrubHint: "اسحب الفيديو إلى اللحظة الدقيقة ثم التقط — أو اختر من الاقتراحات أدناه.",
    suggestedFrames: "الإطارات المقترحة",
    selectedFrame: "الإطار المحدد",
    downloadPng: "تنزيل PNG",
    privacy: "يتم استخراج الإطارات في متصفحك مباشرة من الفيديو — لا يتم رفع أي شيء. PNG بدقة الفيديو الأصلية.",
    frameAlt: "إطار عند",
    selectedFrameAlt: "الإطار المحدد",
  },
  ru: {
    videoFile: "Видеофайл",
    captureCurrentFrame: "Захватить текущий кадр",
    scrubHint: "Прокрутите видео до нужного момента и захватите — или выберите предложение ниже.",
    suggestedFrames: "Предложенные кадры",
    selectedFrame: "Выбранный кадр",
    downloadPng: "Скачать PNG",
    privacy: "Кадры извлекаются в вашем браузере прямо из видео — ничего не загружается. PNG в нативном разрешении.",
    frameAlt: "Кадр на",
    selectedFrameAlt: "Выбранный кадр",
  },
  hi: {
    videoFile: "वीडियो फ़ाइल",
    captureCurrentFrame: "वर्तमान फ्रेम कैप्चर करें",
    scrubHint: "वीडियो को सटीक पल पर स्क्रब करें, फिर कैप्चर करें — या नीचे दिए सुझाव चुनें।",
    suggestedFrames: "सुझाए गए फ्रेम",
    selectedFrame: "चुना गया फ्रेम",
    downloadPng: "PNG डाउनलोड करें",
    privacy: "फ्रेम आपके ब्राउज़र में सीधे वीडियो से लिए जाते हैं — कुछ भी अपलोड नहीं होता। PNG मूल रिज़ॉल्यूशन में।",
    frameAlt: "फ्रेम",
    selectedFrameAlt: "चुना गया फ्रेम",
  },
  tr: {
    videoFile: "Video dosyası",
    captureCurrentFrame: "Mevcut kareyi yakala",
    scrubHint: "Videoyu tam ana getirin ve yakalayın — ya da aşağıdan bir öneri seçin.",
    suggestedFrames: "Önerilen kareler",
    selectedFrame: "Seçilen kare",
    downloadPng: "PNG indir",
    privacy: "Kareler tarayıcınızda doğrudan videodan alınır — hiçbir şey yüklenmez. PNG, videonun orijinal çözünürlüğünde.",
    frameAlt: "Kare",
    selectedFrameAlt: "Seçilen kare",
  },
  id: {
    videoFile: "File video",
    captureCurrentFrame: "Tangkap frame saat ini",
    scrubHint: "Gesek video ke momen yang tepat, lalu tangkap — atau pilih saran di bawah.",
    suggestedFrames: "Frame yang disarankan",
    selectedFrame: "Frame yang dipilih",
    downloadPng: "Unduh PNG",
    privacy: "Frame diambil di browser Anda langsung dari video — tidak ada yang diunggah. PNG pada resolusi asli video.",
    frameAlt: "Frame di",
    selectedFrameAlt: "Frame yang dipilih",
  },
  vi: {
    videoFile: "Tệp video",
    captureCurrentFrame: "Chụp khung hình hiện tại",
    scrubHint: "Kéo video đến thời điểm chính xác rồi chụp — hoặc chọn gợi ý bên dưới.",
    suggestedFrames: "Khung hình gợi ý",
    selectedFrame: "Khung hình đã chọn",
    downloadPng: "Tải PNG",
    privacy: "Khung hình được lấy trong trình duyệt của bạn trực tiếp từ video — không có gì được tải lên. PNG ở độ phân giải gốc.",
    frameAlt: "Khung hình tại",
    selectedFrameAlt: "Khung hình đã chọn",
  },
  sv: {
    videoFile: "Videofil",
    captureCurrentFrame: "Fånga nuvarande bildruta",
    scrubHint: "Skrubba videon till exakt rätt ögonblick och fånga — eller välj ett förslag nedan.",
    suggestedFrames: "Föreslagna bildrutor",
    selectedFrame: "Vald bildruta",
    downloadPng: "Ladda ned PNG",
    privacy: "Bildrutor tas i din webbläsare direkt från videon — inget laddas upp. PNG i videons ursprungliga upplösning.",
    frameAlt: "Bildruta vid",
    selectedFrameAlt: "Vald bildruta",
  },
  pl: {
    videoFile: "Plik wideo",
    captureCurrentFrame: "Przechwyć bieżącą klatkę",
    scrubHint: "Przewiń wideo do dokładnego momentu i przechwyć — lub wybierz sugestię poniżej.",
    suggestedFrames: "Sugerowane klatki",
    selectedFrame: "Wybrana klatka",
    downloadPng: "Pobierz PNG",
    privacy: "Klatki są pobierane w przeglądarce bezpośrednio z wideo — nic nie jest przesyłane. PNG w oryginalnej rozdzielczości.",
    frameAlt: "Klatka przy",
    selectedFrameAlt: "Wybrana klatka",
  },
  uk: {
    videoFile: "Відеофайл",
    captureCurrentFrame: "Захопити поточний кадр",
    scrubHint: "Прокрутіть відео до потрібного моменту та захопіть — або оберіть пропозицію нижче.",
    suggestedFrames: "Запропоновані кадри",
    selectedFrame: "Вибраний кадр",
    downloadPng: "Завантажити PNG",
    privacy: "Кадри знімаються у вашому браузері безпосередньо з відео — нічого не завантажується. PNG у нативному розрізненні.",
    frameAlt: "Кадр на",
    selectedFrameAlt: "Вибраний кадр",
  },
  cs: {
    videoFile: "Videosoubor",
    captureCurrentFrame: "Zachytit aktuální snímek",
    scrubHint: "Přetáhněte video na přesný okamžik a zachyťte — nebo vyberte návrh níže.",
    suggestedFrames: "Navrhované snímky",
    selectedFrame: "Vybraný snímek",
    downloadPng: "Stáhnout PNG",
    privacy: "Snímky jsou pořizovány v prohlížeči přímo z videa — nic se nenahrává. PNG v nativním rozlišení videa.",
    frameAlt: "Snímek v",
    selectedFrameAlt: "Vybraný snímek",
  },
};

export function VideoThumbnailClient() {
  const s = T[useLocale()] ?? T.en;
  const [file, setFile] = useState<File | null>(null);
  const [src, setSrc] = useState<string | null>(null);
  const [thumbs, setThumbs] = useState<Thumb[]>([]);
  const [out, setOut] = useState<Thumb | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const urls = useRef<string[]>([]);

  useEffect(() => () => { urls.current.forEach((u) => URL.revokeObjectURL(u)); }, []);

  function onFile(f: File) {
    urls.current.forEach((u) => URL.revokeObjectURL(u));
    urls.current = [];
    setThumbs([]); setOut(null); setError(null);
    const u = URL.createObjectURL(f);
    urls.current.push(u);
    setFile(f); setSrc(u);
  }

  // Grab the frame currently shown by the <video> element. When `time` is
  // given we seek first and wait for the browser to paint that frame.
  function capture(time?: number): Promise<Thumb> {
    return new Promise((resolve, reject) => {
      const v = videoRef.current;
      if (!v || !v.videoWidth) { reject(new Error("Video not ready yet.")); return; }
      const grab = () => {
        const c = document.createElement("canvas");
        c.width = v.videoWidth; c.height = v.videoHeight;
        c.getContext("2d")!.drawImage(v, 0, 0, c.width, c.height);
        c.toBlob((b) => {
          if (!b) { reject(new Error("Could not encode the frame.")); return; }
          const url = URL.createObjectURL(b);
          urls.current.push(url);
          resolve({ t: v.currentTime, url, size: b.size });
        }, "image/png");
      };
      if (time == null || Math.abs(v.currentTime - time) < 0.02) { grab(); return; }
      const onSeeked = () => { v.removeEventListener("seeked", onSeeked); requestAnimationFrame(grab); };
      v.addEventListener("seeked", onSeeked);
      v.currentTime = time;
    });
  }

  async function genThumbs() {
    const v = videoRef.current;
    if (!v || !isFinite(v.duration) || v.duration <= 0) { setError("Could not read the video duration."); return; }
    setBusy(true); setError(null); setThumbs([]);
    try {
      const positions = [0.05, 0.2, 0.4, 0.6, 0.8, 0.95].map((p) => p * v.duration);
      const collected: Thumb[] = [];
      for (const t of positions) {
        const thumb = await capture(t);
        collected.push(thumb);
        setThumbs([...collected]);
      }
      v.currentTime = 0;
    } catch (e) {
      setError((e as Error).message);
    } finally { setBusy(false); }
  }

  async function captureCurrent() {
    setBusy(true); setError(null);
    try { setOut(await capture()); }
    catch (e) { setError((e as Error).message); }
    finally { setBusy(false); }
  }

  const baseName = (file?.name ?? "video").replace(/\.[^.]+$/, "");

  return (
    <div className="space-y-5">
      <MiniDrop
        label={s.videoFile}
        accept={{ "video/mp4": [".mp4"], "video/quicktime": [".mov"], "video/webm": [".webm"], "video/x-matroska": [".mkv"] }}
        icon={<Film className="h-5 w-5" />}
        onFile={onFile}
        current={file}
      />

      {src && (
        <>
          <video
            ref={videoRef}
            src={src}
            controls
            muted
            playsInline
            preload="metadata"
            onLoadedMetadata={genThumbs}
            className="mx-auto max-h-80 w-full rounded-lg border border-ink-100 bg-black"
          />

          <div className="flex flex-wrap items-center gap-2">
            <Button onClick={captureCurrent} disabled={busy} size="lg">
              {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Camera className="h-4 w-4" />}
              {s.captureCurrentFrame}
            </Button>
            <span className="text-xs text-ink-400">{s.scrubHint}</span>
          </div>
        </>
      )}

      {error && <p className="rounded border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</p>}

      {thumbs.length > 0 && (
        <div>
          <div className="mb-2 text-xs font-medium text-ink-600">{s.suggestedFrames}</div>
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
            {thumbs.map((th) => (
              <button key={th.t} onClick={() => setOut(th)}
                className={`overflow-hidden rounded-lg border ${out?.url === th.url ? "ring-2 ring-brand-500" : "border-ink-200"}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={th.url} alt={`${s.frameAlt} ${fmtT(th.t)}`} className="h-16 w-full object-cover" />
                <div className="bg-white py-0.5 text-center text-[10px] text-ink-500">{fmtT(th.t)}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {out && (
        <div className="space-y-3">
          <div className="text-xs font-medium text-ink-600">{s.selectedFrame} · {fmtT(out.t)}</div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={out.url} alt={s.selectedFrameAlt} className="mx-auto max-h-80 rounded-lg border border-ink-100" />
          <a href={out.url} download={`${baseName}-${fmtT(out.t).replace(":", "m")}s.png`}>
            <Button size="lg"><Download className="h-4 w-4" /> {s.downloadPng} · {formatBytes(out.size)}</Button>
          </a>
        </div>
      )}

      <p className="text-xs text-ink-400">
        {s.privacy}
      </p>
    </div>
  );
}
