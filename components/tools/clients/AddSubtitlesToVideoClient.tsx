"use client";

import { useEffect, useRef, useState } from "react";
import { FilmIcon, FileText, Loader2, Download, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatBytes } from "@/lib/utils";
import { MiniDrop } from "@/components/tools/MiniDrop";
import { useLocale } from "@/hooks/useLocale";
import { getToolUi } from "@/lib/i18n/tool-ui";
import { getFfmpeg } from "@/lib/ffmpeg-client";

type Phase = "idle" | "loading" | "running" | "done" | "error";

// Muxes the subtitle file into the MP4 as a soft (selectable) track via
// -c:s mov_text. Runs entirely in the browser — no libass dependency, no server.
//
// Note: this produces a TOGGLEABLE caption track. Players (VLC, Quicktime,
// Apple TV, etc.) will offer it as a subtitle option. It does NOT burn captions
// into the pixels — social-media autoplay (TikTok/Instagram) won't show it.
// The UI says so explicitly so users aren't surprised.

const T: Record<string, Record<string, string>> = {
  en: {
    captionsInfo: "Captions will be added as a selectable subtitle track in the MP4 — viewers can turn them on in any modern player. For autoplay-with-captions on TikTok / Instagram, use the styled .ass from Style Subtitles with your own editor first.",
    captionsInfoBold1: "selectable subtitle track",
    captionsInfoBold2: "Style Subtitles",
    loadingEngine: "Loading the video engine…",
    loadingHint: "First load is ~30 MB; cached afterwards.",
    muxing: "Muxing the subtitle track…",
    runAgain: "Run again",
    loading: "Loading…",
    working: "Working…",
    addSubtitleTrack: "Add subtitle track",
    download: "Download",
    reset: "Reset",
    errorMux: "Could not mux the subtitles: ",
    privacy: "Processed 100% in your browser via FFmpeg WebAssembly — your video is never uploaded.",
  },
  fr: {
    captionsInfo: "Les sous-titres seront ajoutés en tant que piste de sous-titres sélectionnable dans le MP4 — les spectateurs peuvent les activer dans tout lecteur moderne. Pour la lecture automatique avec sous-titres sur TikTok / Instagram, utilisez d'abord le .ass stylisé de Style Subtitles avec votre propre éditeur.",
    captionsInfoBold1: "piste de sous-titres sélectionnable",
    captionsInfoBold2: "Style Subtitles",
    loadingEngine: "Chargement du moteur vidéo…",
    loadingHint: "Premier chargement ~30 Mo ; mis en cache ensuite.",
    muxing: "Multiplexage de la piste de sous-titres…",
    runAgain: "Relancer",
    loading: "Chargement…",
    working: "En cours…",
    addSubtitleTrack: "Ajouter une piste de sous-titres",
    download: "Télécharger",
    reset: "Réinitialiser",
    errorMux: "Impossible de multiplexer les sous-titres : ",
    privacy: "Traitement 100 % dans votre navigateur via FFmpeg WebAssembly — votre vidéo n'est jamais envoyée.",
  },
  es: {
    captionsInfo: "Los subtítulos se añadirán como una pista de subtítulos seleccionable en el MP4 — los espectadores pueden activarlos en cualquier reproductor moderno. Para la reproducción automática con subtítulos en TikTok / Instagram, usa primero el .ass estilizado de Style Subtitles con tu propio editor.",
    captionsInfoBold1: "pista de subtítulos seleccionable",
    captionsInfoBold2: "Style Subtitles",
    loadingEngine: "Cargando el motor de vídeo…",
    loadingHint: "Primera carga ~30 MB; almacenado en caché después.",
    muxing: "Multiplexando la pista de subtítulos…",
    runAgain: "Ejecutar de nuevo",
    loading: "Cargando…",
    working: "Procesando…",
    addSubtitleTrack: "Agregar pista de subtítulos",
    download: "Descargar",
    reset: "Restablecer",
    errorMux: "No se pudieron multiplexar los subtítulos: ",
    privacy: "Procesado 100 % en tu navegador con FFmpeg WebAssembly — tu vídeo nunca se sube.",
  },
  pt: {
    captionsInfo: "As legendas serão adicionadas como uma faixa de legendas selecionável no MP4 — os espectadores podem ativá-las em qualquer player moderno. Para reprodução automática com legendas no TikTok / Instagram, use primeiro o .ass estilizado do Style Subtitles com seu próprio editor.",
    captionsInfoBold1: "faixa de legendas selecionável",
    captionsInfoBold2: "Style Subtitles",
    loadingEngine: "Carregando o mecanismo de vídeo…",
    loadingHint: "Primeiro carregamento ~30 MB; em cache depois.",
    muxing: "Multiplexando a faixa de legendas…",
    runAgain: "Executar novamente",
    loading: "Carregando…",
    working: "Processando…",
    addSubtitleTrack: "Adicionar faixa de legendas",
    download: "Baixar",
    reset: "Redefinir",
    errorMux: "Não foi possível multiplexar as legendas: ",
    privacy: "Processado 100% no seu navegador via FFmpeg WebAssembly — seu vídeo nunca é enviado.",
  },
  de: {
    captionsInfo: "Untertitel werden als auswählbare Untertitelspur in die MP4-Datei eingefügt — Zuschauer können sie in jedem modernen Player aktivieren. Für automatische Wiedergabe mit Untertiteln auf TikTok / Instagram verwenden Sie zuerst die gestylte .ass-Datei aus Style Subtitles mit Ihrem eigenen Editor.",
    captionsInfoBold1: "auswählbare Untertitelspur",
    captionsInfoBold2: "Style Subtitles",
    loadingEngine: "Video-Engine wird geladen…",
    loadingHint: "Erster Ladevorgang ~30 MB; danach im Cache.",
    muxing: "Untertitelspur wird eingebettet…",
    runAgain: "Erneut ausführen",
    loading: "Laden…",
    working: "Verarbeitung…",
    addSubtitleTrack: "Untertitelspur hinzufügen",
    download: "Herunterladen",
    reset: "Zurücksetzen",
    errorMux: "Untertitel konnten nicht eingebettet werden: ",
    privacy: "100 % im Browser via FFmpeg WebAssembly verarbeitet — Ihr Video wird nie hochgeladen.",
  },
  it: {
    captionsInfo: "I sottotitoli verranno aggiunti come traccia di sottotitoli selezionabile nel MP4 — gli spettatori possono attivarli in qualsiasi player moderno. Per la riproduzione automatica con sottotitoli su TikTok / Instagram, usa prima il .ass con stile da Style Subtitles con il tuo editor.",
    captionsInfoBold1: "traccia di sottotitoli selezionabile",
    captionsInfoBold2: "Style Subtitles",
    loadingEngine: "Caricamento del motore video…",
    loadingHint: "Primo caricamento ~30 MB; poi in cache.",
    muxing: "Multiplexing della traccia dei sottotitoli…",
    runAgain: "Esegui di nuovo",
    loading: "Caricamento…",
    working: "Elaborazione…",
    addSubtitleTrack: "Aggiungi traccia sottotitoli",
    download: "Scarica",
    reset: "Reimposta",
    errorMux: "Impossibile fare il mux dei sottotitoli: ",
    privacy: "Elaborato 100% nel tuo browser via FFmpeg WebAssembly — il tuo video non viene mai caricato.",
  },
  nl: {
    captionsInfo: "Ondertitels worden toegevoegd als een selecteerbaar ondertitelspoor in de MP4 — kijkers kunnen ze inschakelen in elke moderne speler. Voor automatisch afspelen met ondertitels op TikTok / Instagram, gebruik eerst de gestijlde .ass van Style Subtitles met uw eigen editor.",
    captionsInfoBold1: "selecteerbaar ondertitelspoor",
    captionsInfoBold2: "Style Subtitles",
    loadingEngine: "Video-engine laden…",
    loadingHint: "Eerste keer laden ~30 MB; daarna in cache.",
    muxing: "Ondertitelspoor wordt ingebed…",
    runAgain: "Opnieuw uitvoeren",
    loading: "Laden…",
    working: "Bezig…",
    addSubtitleTrack: "Ondertitelspoor toevoegen",
    download: "Downloaden",
    reset: "Herstellen",
    errorMux: "Ondertitels konden niet worden ingebed: ",
    privacy: "100% verwerkt in uw browser via FFmpeg WebAssembly — uw video wordt nooit geüpload.",
  },
  ja: {
    captionsInfo: "字幕はMP4に選択可能な字幕トラックとして追加されます — 視聴者は現代のプレイヤーでオン/オフできます。TikTok / Instagramでの自動再生に字幕を表示したい場合は、まずStyle Subtitlesのスタイル付き.assを自分のエディタで使用してください。",
    captionsInfoBold1: "選択可能な字幕トラック",
    captionsInfoBold2: "Style Subtitles",
    loadingEngine: "動画エンジンを読み込んでいます…",
    loadingHint: "初回読み込みは ~30 MB；以降はキャッシュ。",
    muxing: "字幕トラックをマルチプレクス中…",
    runAgain: "再実行",
    loading: "読み込み中…",
    working: "処理中…",
    addSubtitleTrack: "字幕トラックを追加",
    download: "ダウンロード",
    reset: "リセット",
    errorMux: "字幕をマルチプレクスできませんでした: ",
    privacy: "FFmpeg WebAssemblyでブラウザ内で100%処理 — 動画は決してアップロードされません。",
  },
  zh: {
    captionsInfo: "字幕将作为可选字幕轨道添加到 MP4 中 — 观看者可以在任何现代播放器中开启。如需在 TikTok / Instagram 上自动播放带字幕的视频，请先使用 Style Subtitles 中的样式化 .ass 文件。",
    captionsInfoBold1: "可选字幕轨道",
    captionsInfoBold2: "Style Subtitles",
    loadingEngine: "正在加载视频引擎…",
    loadingHint: "首次加载约 30 MB；之后缓存。",
    muxing: "正在混流字幕轨道…",
    runAgain: "再次运行",
    loading: "加载中…",
    working: "处理中…",
    addSubtitleTrack: "添加字幕轨道",
    download: "下载",
    reset: "重置",
    errorMux: "无法混流字幕：",
    privacy: "100% 在您的浏览器中通过 FFmpeg WebAssembly 处理 — 您的视频永远不会被上传。",
  },
  ko: {
    captionsInfo: "자막은 MP4에 선택 가능한 자막 트랙으로 추가됩니다 — 시청자는 모든 최신 플레이어에서 켤 수 있습니다. TikTok / Instagram에서 자막이 있는 자동 재생을 원하면 먼저 Style Subtitles의 스타일링된 .ass를 자신의 편집기에서 사용하세요.",
    captionsInfoBold1: "선택 가능한 자막 트랙",
    captionsInfoBold2: "Style Subtitles",
    loadingEngine: "동영상 엔진 로딩 중…",
    loadingHint: "첫 번째 로딩은 ~30 MB; 이후 캐시됩니다.",
    muxing: "자막 트랙 먹싱 중…",
    runAgain: "다시 실행",
    loading: "로딩 중…",
    working: "처리 중…",
    addSubtitleTrack: "자막 트랙 추가",
    download: "다운로드",
    reset: "초기화",
    errorMux: "자막을 먹싱할 수 없습니다: ",
    privacy: "FFmpeg WebAssembly를 통해 브라우저에서 100% 처리 — 동영상은 절대 업로드되지 않습니다.",
  },
  ar: {
    captionsInfo: "ستُضاف الترجمات كمسار ترجمة قابل للتحديد في ملف MP4 — يمكن للمشاهدين تشغيله في أي مشغّل حديث. للتشغيل التلقائي مع الترجمات على TikTok / Instagram، استخدم أولاً ملف .ass المنسَّق من Style Subtitles مع محررك الخاص.",
    captionsInfoBold1: "مسار ترجمة قابل للتحديد",
    captionsInfoBold2: "Style Subtitles",
    loadingEngine: "جاري تحميل محرك الفيديو…",
    loadingHint: "التحميل الأول ~30 MB؛ يُخزَّن في الذاكرة المؤقتة بعد ذلك.",
    muxing: "جاري تضمين مسار الترجمة…",
    runAgain: "تشغيل مجدداً",
    loading: "جاري التحميل…",
    working: "جاري العمل…",
    addSubtitleTrack: "إضافة مسار ترجمة",
    download: "تنزيل",
    reset: "إعادة تعيين",
    errorMux: "تعذّر تضمين الترجمات: ",
    privacy: "معالجة 100% في متصفحك عبر FFmpeg WebAssembly — لن يتم رفع الفيديو مطلقًا.",
  },
  ru: {
    captionsInfo: "Субтитры будут добавлены как выбираемая дорожка субтитров в MP4 — зрители могут включить их в любом современном плеере. Для автовоспроизведения с субтитрами на TikTok / Instagram сначала используйте стилизованный .ass из Style Subtitles в своём редакторе.",
    captionsInfoBold1: "выбираемая дорожка субтитров",
    captionsInfoBold2: "Style Subtitles",
    loadingEngine: "Загрузка видеодвижка…",
    loadingHint: "Первая загрузка ~30 МБ; затем кеш.",
    muxing: "Мультиплексирование дорожки субтитров…",
    runAgain: "Запустить снова",
    loading: "Загрузка…",
    working: "Обработка…",
    addSubtitleTrack: "Добавить дорожку субтитров",
    download: "Скачать",
    reset: "Сбросить",
    errorMux: "Не удалось мультиплексировать субтитры: ",
    privacy: "100% обрабатывается в вашем браузере через FFmpeg WebAssembly — ваше видео никогда не загружается.",
  },
  hi: {
    captionsInfo: "MP4 में कैप्शन एक चयन योग्य सब्टाइटल ट्रैक के रूप में जोड़े जाएंगे — दर्शक किसी भी आधुनिक प्लेयर में इन्हें चालू कर सकते हैं। TikTok / Instagram पर कैप्शन के साथ ऑटोप्ले के लिए, पहले Style Subtitles से स्टाइल किया गया .ass अपने एडिटर में उपयोग करें।",
    captionsInfoBold1: "चयन योग्य सब्टाइटल ट्रैक",
    captionsInfoBold2: "Style Subtitles",
    loadingEngine: "वीडियो इंजन लोड हो रहा है…",
    loadingHint: "पहली लोडिंग ~30 MB; बाद में कैश।",
    muxing: "सब्टाइटल ट्रैक मक्स हो रहा है…",
    runAgain: "पुनः चलाएं",
    loading: "लोड हो रहा है…",
    working: "प्रसंस्करण…",
    addSubtitleTrack: "सब्टाइटल ट्रैक जोड़ें",
    download: "डाउनलोड करें",
    reset: "रीसेट करें",
    errorMux: "सब्टाइटल मक्स नहीं हो सके: ",
    privacy: "FFmpeg WebAssembly के जरिए आपके ब्राउज़र में 100% प्रसंस्करण — आपका वीडियो कभी अपलोड नहीं होता।",
  },
  tr: {
    captionsInfo: "Altyazılar MP4'e seçilebilir bir altyazı parçası olarak eklenecek — izleyiciler herhangi bir modern oynatıcıda açabilir. TikTok / Instagram'da altyazılı otomatik oynatma için önce Style Subtitles'dan stillendirilmiş .ass dosyasını kendi düzenleyicinizle kullanın.",
    captionsInfoBold1: "seçilebilir altyazı parçası",
    captionsInfoBold2: "Style Subtitles",
    loadingEngine: "Video motoru yükleniyor…",
    loadingHint: "İlk yükleme ~30 MB; sonraki seferlerde önbellek.",
    muxing: "Altyazı parçası birleştiriliyor…",
    runAgain: "Tekrar çalıştır",
    loading: "Yükleniyor…",
    working: "İşleniyor…",
    addSubtitleTrack: "Altyazı parçası ekle",
    download: "İndir",
    reset: "Sıfırla",
    errorMux: "Altyazılar birleştirilemedi: ",
    privacy: "FFmpeg WebAssembly aracılığıyla tarayıcınızda %100 işlenir — videonuz asla yüklenmez.",
  },
  id: {
    captionsInfo: "Teks akan ditambahkan sebagai trek subtitle yang dapat dipilih dalam MP4 — penonton dapat mengaktifkannya di pemutar modern mana pun. Untuk pemutaran otomatis dengan teks di TikTok / Instagram, gunakan terlebih dahulu .ass yang diberi gaya dari Style Subtitles dengan editor Anda sendiri.",
    captionsInfoBold1: "trek subtitle yang dapat dipilih",
    captionsInfoBold2: "Style Subtitles",
    loadingEngine: "Memuat mesin video…",
    loadingHint: "Pemuatan pertama ~30 MB; selanjutnya dari cache.",
    muxing: "Menggabungkan trek subtitle…",
    runAgain: "Jalankan lagi",
    loading: "Memuat…",
    working: "Memproses…",
    addSubtitleTrack: "Tambah trek subtitle",
    download: "Unduh",
    reset: "Reset",
    errorMux: "Tidak dapat mux subtitle: ",
    privacy: "100% diproses di browser Anda melalui FFmpeg WebAssembly — video Anda tidak pernah diunggah.",
  },
  vi: {
    captionsInfo: "Phụ đề sẽ được thêm dưới dạng bản nhạc phụ đề có thể chọn trong MP4 — người xem có thể bật trong bất kỳ trình phát hiện đại nào. Để tự động phát với phụ đề trên TikTok / Instagram, hãy sử dụng trước .ass được tạo kiểu từ Style Subtitles với trình chỉnh sửa của bạn.",
    captionsInfoBold1: "bản nhạc phụ đề có thể chọn",
    captionsInfoBold2: "Style Subtitles",
    loadingEngine: "Đang tải công cụ video…",
    loadingHint: "Lần đầu tải ~30 MB; sau đó lưu vào bộ nhớ đệm.",
    muxing: "Đang ghép bản nhạc phụ đề…",
    runAgain: "Chạy lại",
    loading: "Đang tải…",
    working: "Đang xử lý…",
    addSubtitleTrack: "Thêm bản nhạc phụ đề",
    download: "Tải xuống",
    reset: "Đặt lại",
    errorMux: "Không thể ghép phụ đề: ",
    privacy: "100% xử lý trong trình duyệt của bạn qua FFmpeg WebAssembly — video của bạn không bao giờ được tải lên.",
  },
  sv: {
    captionsInfo: "Undertexter läggs till som ett valbart undertextspår i MP4:an — tittare kan aktivera dem i vilken modern spelare som helst. För automatisk uppspelning med undertexter på TikTok / Instagram, använd först den stiliserade .ass-filen från Style Subtitles med din egna redigerare.",
    captionsInfoBold1: "valbart undertextspår",
    captionsInfoBold2: "Style Subtitles",
    loadingEngine: "Laddar videomotorn…",
    loadingHint: "Första laddning ~30 MB; därefter cachad.",
    muxing: "Lägger till undertextspår…",
    runAgain: "Kör igen",
    loading: "Laddar…",
    working: "Bearbetar…",
    addSubtitleTrack: "Lägg till undertextspår",
    download: "Ladda ned",
    reset: "Återställ",
    errorMux: "Kunde inte lägga till undertexter: ",
    privacy: "Bearbetas till 100% i din webbläsare via FFmpeg WebAssembly — din video laddas aldrig upp.",
  },
  pl: {
    captionsInfo: "Napisy zostaną dodane jako wybieralny tor napisów w MP4 — widzowie mogą je włączyć w dowolnym nowoczesnym odtwarzaczu. Aby automatycznie odtwarzać z napisami na TikTok / Instagram, najpierw użyj stylizowanego .ass z Style Subtitles we własnym edytorze.",
    captionsInfoBold1: "wybieralny tor napisów",
    captionsInfoBold2: "Style Subtitles",
    loadingEngine: "Ładowanie silnika wideo…",
    loadingHint: "Pierwsze ładowanie ~30 MB; potem z pamięci podręcznej.",
    muxing: "Dodawanie toru napisów…",
    runAgain: "Uruchom ponownie",
    loading: "Ładowanie…",
    working: "Przetwarzanie…",
    addSubtitleTrack: "Dodaj tor napisów",
    download: "Pobierz",
    reset: "Resetuj",
    errorMux: "Nie można osadzić napisów: ",
    privacy: "100% przetwarzane w przeglądarce przez FFmpeg WebAssembly — Twoje wideo nigdy nie jest przesyłane.",
  },
  uk: {
    captionsInfo: "Субтитри будуть додані як вибірна доріжка субтитрів у MP4 — глядачі можуть увімкнути їх у будь-якому сучасному плеєрі. Для автовідтворення із субтитрами на TikTok / Instagram спочатку використайте стилізований .ass із Style Subtitles у своєму редакторі.",
    captionsInfoBold1: "вибірна доріжка субтитрів",
    captionsInfoBold2: "Style Subtitles",
    loadingEngine: "Завантаження відеодвигуна…",
    loadingHint: "Перше завантаження ~30 МБ; потім кеш.",
    muxing: "Мультиплексування доріжки субтитрів…",
    runAgain: "Запустити знову",
    loading: "Завантаження…",
    working: "Обробка…",
    addSubtitleTrack: "Додати доріжку субтитрів",
    download: "Завантажити",
    reset: "Скинути",
    errorMux: "Не вдалося мультиплексувати субтитри: ",
    privacy: "100% обробляється у вашому браузері через FFmpeg WebAssembly — ваше відео ніколи не завантажується.",
  },
  cs: {
    captionsInfo: "Titulky budou přidány jako volitelná titulková stopa do MP4 — diváci je mohou zapnout v libovolném moderním přehrávači. Pro automatické přehrávání s titulky na TikTok / Instagram nejprve použijte stylizovaný .ass ze Style Subtitles ve vlastním editoru.",
    captionsInfoBold1: "volitelná titulková stopa",
    captionsInfoBold2: "Style Subtitles",
    loadingEngine: "Načítání video modulu…",
    loadingHint: "První načtení ~30 MB; poté z mezipaměti.",
    muxing: "Vkládání titulkové stopy…",
    runAgain: "Spustit znovu",
    loading: "Načítání…",
    working: "Zpracování…",
    addSubtitleTrack: "Přidat titulkovou stopu",
    download: "Stáhnout",
    reset: "Resetovat",
    errorMux: "Titulky se nepodařilo vložit: ",
    privacy: "100% zpracováno ve vašem prohlížeči přes FFmpeg WebAssembly — vaše video se nikdy nenahrává.",
  },
};

export function AddSubtitlesToVideoClient({ crossLinks = [] }: { crossLinks?: { href: string; label: string }[] }) {
  const locale = useLocale();
  const s = T[locale] ?? T.en;
  const ui = getToolUi(locale);

  const [video, setVideo] = useState<File | null>(null);
  const [subs, setSubs] = useState<File | null>(null);
  const [phase, setPhase] = useState<Phase>("idle");
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [outUrl, setOutUrl] = useState<string | null>(null);
  const [outName, setOutName] = useState<string>("");
  const [outSize, setOutSize] = useState(0);
  const cleanup = useRef<string | null>(null);

  useEffect(() => () => { if (cleanup.current) URL.revokeObjectURL(cleanup.current); }, []);

  async function run() {
    if (!video || !subs) {
      setError(ui.autoSync.bothNeeded);
      return;
    }
    setPhase("loading"); setError(null); setProgress(0);
    try {
      const ff = await getFfmpeg((p) => setProgress(p));
      const { fetchFile } = await import("@ffmpeg/util");
      const vExt = (video.name.split(".").pop() || "mp4").toLowerCase();
      const sExt = (subs.name.split(".").pop() || "srt").toLowerCase();
      const vIn = `video.${vExt}`;
      const sIn = `subs.${sExt}`;
      const out = "out.mp4";
      await ff.writeFile(vIn, await fetchFile(video));
      await ff.writeFile(sIn, await fetchFile(subs));
      setPhase("running");
      // Stream-copy the video + audio and mux the subtitles as a selectable
      // mov_text track. faststart moves the moov atom to the front so the file
      // plays as it loads.
      const code = await ff.exec([
        "-i", vIn, "-i", sIn,
        "-map", "0:v:0", "-map", "0:a:0?", "-map", "1:0",
        "-c:v", "copy", "-c:a", "copy", "-c:s", "mov_text",
        "-metadata:s:s:0", "language=und",
        "-movflags", "+faststart",
        out,
      ]);
      if (code !== 0) throw new Error("FFmpeg exited with a non-zero status.");
      const data = await ff.readFile(out);
      const blob = new Blob([data as BlobPart], { type: "video/mp4" });
      if (cleanup.current) URL.revokeObjectURL(cleanup.current);
      const url = URL.createObjectURL(blob);
      cleanup.current = url;
      setOutUrl(url); setOutSize(blob.size);
      setOutName(`${video.name.replace(/\.[^.]+$/, "")}.subtitled.mp4`);
      try { await ff.deleteFile(vIn); await ff.deleteFile(sIn); await ff.deleteFile(out); } catch {}
      setProgress(100); setPhase("done");
    } catch (e) {
      setError(`${s.errorMux}${(e as Error).message}`);
      setPhase("error");
    }
  }

  function reset() {
    setVideo(null); setSubs(null); setPhase("idle"); setProgress(0); setOutUrl(null); setError(null);
  }

  const busy = phase === "loading" || phase === "running";

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <MiniDrop
          label={ui.burnIn.videoFile}
          accept={{
            "video/mp4": [".mp4"],
            "video/quicktime": [".mov"],
            "video/webm": [".webm"],
            "video/x-matroska": [".mkv"],
            "video/x-msvideo": [".avi"],
          }}
          icon={<FilmIcon className="h-5 w-5" />}
          onFile={setVideo}
          current={video}
        />
        <MiniDrop
          label={ui.burnIn.subtitleFile}
          accept={{ "application/x-subrip": [".srt"], "text/vtt": [".vtt"] }}
          icon={<FileText className="h-5 w-5" />}
          onFile={setSubs}
          current={subs}
        />
      </div>

      {video && subs && phase === "idle" && (
        <div className="flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50/60 p-3 text-xs text-amber-800">
          <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          <span>
            {s.captionsInfo.split(s.captionsInfoBold1)[0]}
            <strong>{s.captionsInfoBold1}</strong>
            {s.captionsInfo.split(s.captionsInfoBold1)[1]?.split(s.captionsInfoBold2)[0]}
            <strong>{s.captionsInfoBold2}</strong>
            {s.captionsInfo.split(s.captionsInfoBold2)[1]}
          </span>
        </div>
      )}

      {busy && (
        <div className="flex items-center gap-3 rounded-lg border border-ink-100 bg-white px-4 py-3">
          <Loader2 className="h-4 w-4 animate-spin text-brand-500" />
          <div className="flex-1">
            <p className="text-sm font-medium text-ink-900">{phase === "loading" ? s.loadingEngine : s.muxing}</p>
            <p className="text-xs text-ink-400">{phase === "loading" ? s.loadingHint : `${progress}% complete`}</p>
          </div>
          <div className="h-1.5 w-32 overflow-hidden rounded-full bg-ink-100">
            <div className="h-full rounded-full bg-brand-500 transition-all" style={{ width: `${progress}%` }} />
          </div>
        </div>
      )}

      {error && <p className="rounded border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</p>}

      <div className="flex flex-wrap gap-2">
        <Button onClick={run} disabled={!video || !subs || busy} size="lg">
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <FilmIcon className="h-4 w-4" />}
          {phase === "done" ? s.runAgain : busy ? (phase === "loading" ? s.loading : s.working) : s.addSubtitleTrack}
        </Button>
        {outUrl && (
          <a href={outUrl} download={outName}>
            <Button size="lg" variant="outline"><Download className="h-4 w-4" /> {s.download} · {formatBytes(outSize)}</Button>
          </a>
        )}
        {(video || subs || outUrl) && !busy && (
          <Button variant="outline" size="lg" onClick={reset}>{s.reset}</Button>
        )}
      </div>

      {crossLinks.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-1">
          {crossLinks.map((c) => (
            <a key={c.href} href={c.href} className="rounded-full border border-ink-200 bg-white px-3 py-1 text-xs text-ink-700 hover:border-brand-300 hover:text-ink-900">{c.label}</a>
          ))}
        </div>
      )}

      <p className="text-xs text-ink-400">{s.privacy}</p>
    </div>
  );
}
