"use client";

import { useEffect, useRef, useState } from "react";
import { Upload, Download, X, Loader2, FileDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn, formatBytes } from "@/lib/utils";
import { categoryTheme } from "@/lib/category-theme";
import { getFfmpeg } from "@/lib/ffmpeg-client";
import { useLocale } from "@/hooks/useLocale";

type Track = { url: string; name: string; size: number; lang: string; codec: string };
type Phase = "idle" | "loading" | "probing" | "extracting" | "done" | "error";

// Text subtitle codecs we can re-mux to SRT. Image-based tracks (PGS, VobSub)
// would need OCR, so we surface them as "not extractable to text" instead.
const TEXT_CODECS = new Set(["subrip", "srt", "ass", "ssa", "mov_text", "webvtt", "text", "stl"]);

const T: Record<string, Record<string, string>> = {
  en: {
    clickToUpload: "Click to upload a video",
    uploadHint: "MKV, MP4, MOV or WebM with embedded subtitle tracks",
    loadingEngine: "Loading the subtitle engine…",
    largeFilesHint: "Runs in your browser — large files take longer.",
    scanningTracks: "Scanning for subtitle tracks…",
    extractingTracks: "Extracting tracks…",
    tracksExtracted: "subtitle track",
    tracksExtractedPlural: "subtitle tracks",
    extracted: "extracted",
    downloadSrt: "Download .srt",
    privacy: "Processed 100% in your browser via FFmpeg WebAssembly — your file is never uploaded.",
    errNoTracks: "No subtitle tracks found in this file. It may have no embedded subtitles, or only burned-in (hard) ones.",
    errImageBased: "The subtitle tracks in this file are image-based (e.g. PGS/VobSub) and can't be converted to text SRT here.",
    errNoneExtracted: "Could not extract any subtitle tracks from this file.",
    errExtraction: "Extraction failed: ",
    noteSkipped: "image-based track",
    noteSkippedPlural: "image-based tracks were",
    noteSkippedSuffix: " was skipped (can't convert to text SRT).",
    noteSkippedSuffixPlural: " skipped (can't convert to text SRT).",
  },
  fr: {
    clickToUpload: "Cliquez pour téléverser une vidéo",
    uploadHint: "MKV, MP4, MOV ou WebM avec des pistes de sous-titres intégrées",
    loadingEngine: "Chargement du moteur de sous-titres…",
    largeFilesHint: "Traitement dans votre navigateur — les fichiers volumineux prennent plus de temps.",
    scanningTracks: "Recherche des pistes de sous-titres…",
    extractingTracks: "Extraction des pistes…",
    tracksExtracted: "piste de sous-titres",
    tracksExtractedPlural: "pistes de sous-titres",
    extracted: "extraite(s)",
    downloadSrt: "Télécharger .srt",
    privacy: "Traitement 100 % dans votre navigateur via FFmpeg WebAssembly — votre fichier n'est jamais envoyé.",
    errNoTracks: "Aucune piste de sous-titres trouvée dans ce fichier. Il n'a peut-être pas de sous-titres intégrés, ou seulement des sous-titres incrustés.",
    errImageBased: "Les pistes de sous-titres de ce fichier sont en image (ex. PGS/VobSub) et ne peuvent pas être converties en SRT ici.",
    errNoneExtracted: "Impossible d'extraire des pistes de sous-titres de ce fichier.",
    errExtraction: "Extraction échouée : ",
    noteSkipped: "piste basée sur image",
    noteSkippedPlural: "pistes basées sur image ont été",
    noteSkippedSuffix: " a été ignorée (impossible de convertir en SRT).",
    noteSkippedSuffixPlural: " ignorées (impossible de convertir en SRT).",
  },
  es: {
    clickToUpload: "Haz clic para subir un vídeo",
    uploadHint: "MKV, MP4, MOV o WebM con pistas de subtítulos incrustadas",
    loadingEngine: "Cargando el motor de subtítulos…",
    largeFilesHint: "Se ejecuta en tu navegador — los archivos grandes tardan más.",
    scanningTracks: "Buscando pistas de subtítulos…",
    extractingTracks: "Extrayendo pistas…",
    tracksExtracted: "pista de subtítulos",
    tracksExtractedPlural: "pistas de subtítulos",
    extracted: "extraída(s)",
    downloadSrt: "Descargar .srt",
    privacy: "Procesado 100 % en tu navegador con FFmpeg WebAssembly — tu archivo nunca se sube.",
    errNoTracks: "No se encontraron pistas de subtítulos en este archivo. Puede que no tenga subtítulos incrustados, o solo subtítulos quemados.",
    errImageBased: "Las pistas de subtítulos de este archivo son basadas en imagen (p. ej. PGS/VobSub) y no se pueden convertir a SRT aquí.",
    errNoneExtracted: "No se pudo extraer ninguna pista de subtítulos de este archivo.",
    errExtraction: "Error de extracción: ",
    noteSkipped: "pista basada en imagen",
    noteSkippedPlural: "pistas basadas en imagen fueron",
    noteSkippedSuffix: " fue omitida (no se puede convertir a SRT).",
    noteSkippedSuffixPlural: " omitidas (no se puede convertir a SRT).",
  },
  pt: {
    clickToUpload: "Clique para enviar um vídeo",
    uploadHint: "MKV, MP4, MOV ou WebM com faixas de legendas incorporadas",
    loadingEngine: "Carregando o mecanismo de legendas…",
    largeFilesHint: "Roda no seu navegador — arquivos grandes demoram mais.",
    scanningTracks: "Procurando faixas de legendas…",
    extractingTracks: "Extraindo faixas…",
    tracksExtracted: "faixa de legenda",
    tracksExtractedPlural: "faixas de legendas",
    extracted: "extraída(s)",
    downloadSrt: "Baixar .srt",
    privacy: "Processado 100% no seu navegador via FFmpeg WebAssembly — seu arquivo nunca é enviado.",
    errNoTracks: "Nenhuma faixa de legenda encontrada neste arquivo. Pode não ter legendas incorporadas, ou apenas legendas queimadas.",
    errImageBased: "As faixas de legendas neste arquivo são baseadas em imagem (ex. PGS/VobSub) e não podem ser convertidas para SRT aqui.",
    errNoneExtracted: "Não foi possível extrair nenhuma faixa de legenda deste arquivo.",
    errExtraction: "Extração falhou: ",
    noteSkipped: "faixa baseada em imagem",
    noteSkippedPlural: "faixas baseadas em imagem foram",
    noteSkippedSuffix: " foi ignorada (não pode ser convertida para SRT).",
    noteSkippedSuffixPlural: " ignoradas (não podem ser convertidas para SRT).",
  },
  de: {
    clickToUpload: "Klicken, um ein Video hochzuladen",
    uploadHint: "MKV, MP4, MOV oder WebM mit eingebetteten Untertitelspuren",
    loadingEngine: "Untertitel-Engine wird geladen…",
    largeFilesHint: "Läuft in Ihrem Browser — große Dateien dauern länger.",
    scanningTracks: "Untertitelspuren werden gesucht…",
    extractingTracks: "Spuren werden extrahiert…",
    tracksExtracted: "Untertitelspur",
    tracksExtractedPlural: "Untertitelspuren",
    extracted: "extrahiert",
    downloadSrt: ".srt herunterladen",
    privacy: "100 % im Browser via FFmpeg WebAssembly verarbeitet — Ihre Datei wird nie hochgeladen.",
    errNoTracks: "Keine Untertitelspuren in dieser Datei gefunden. Sie enthält möglicherweise keine eingebetteten Untertitel oder nur eingebrannte.",
    errImageBased: "Die Untertitelspuren in dieser Datei sind bildbasiert (z. B. PGS/VobSub) und können hier nicht in SRT konvertiert werden.",
    errNoneExtracted: "Es konnten keine Untertitelspuren aus dieser Datei extrahiert werden.",
    errExtraction: "Extraktion fehlgeschlagen: ",
    noteSkipped: "bildbasierte Spur",
    noteSkippedPlural: "bildbasierte Spuren wurden",
    noteSkippedSuffix: " wurde übersprungen (kann nicht in SRT konvertiert werden).",
    noteSkippedSuffixPlural: " übersprungen (kann nicht in SRT konvertiert werden).",
  },
  it: {
    clickToUpload: "Clicca per caricare un video",
    uploadHint: "MKV, MP4, MOV o WebM con tracce di sottotitoli incorporate",
    loadingEngine: "Caricamento del motore dei sottotitoli…",
    largeFilesHint: "Funziona nel browser — i file grandi richiedono più tempo.",
    scanningTracks: "Ricerca delle tracce di sottotitoli…",
    extractingTracks: "Estrazione delle tracce…",
    tracksExtracted: "traccia di sottotitoli",
    tracksExtractedPlural: "tracce di sottotitoli",
    extracted: "estratta/e",
    downloadSrt: "Scarica .srt",
    privacy: "Elaborato 100% nel tuo browser via FFmpeg WebAssembly — il tuo file non viene mai caricato.",
    errNoTracks: "Nessuna traccia di sottotitoli trovata in questo file. Potrebbe non avere sottotitoli incorporati, o solo sottotitoli incorporati nel video.",
    errImageBased: "Le tracce di sottotitoli in questo file sono basate su immagini (es. PGS/VobSub) e non possono essere convertite in SRT qui.",
    errNoneExtracted: "Impossibile estrarre tracce di sottotitoli da questo file.",
    errExtraction: "Estrazione fallita: ",
    noteSkipped: "traccia basata su immagini",
    noteSkippedPlural: "tracce basate su immagini sono state",
    noteSkippedSuffix: " è stata saltata (impossibile convertire in SRT).",
    noteSkippedSuffixPlural: " saltate (impossibile convertire in SRT).",
  },
  nl: {
    clickToUpload: "Klik om een video te uploaden",
    uploadHint: "MKV, MP4, MOV of WebM met ingebedde ondertitelsporen",
    loadingEngine: "Ondertitelengine laden…",
    largeFilesHint: "Draait in uw browser — grote bestanden duren langer.",
    scanningTracks: "Ondertitelsporen zoeken…",
    extractingTracks: "Sporen extraheren…",
    tracksExtracted: "ondertitelspoor",
    tracksExtractedPlural: "ondertitelsporen",
    extracted: "geëxtraheerd",
    downloadSrt: ".srt downloaden",
    privacy: "100% verwerkt in uw browser via FFmpeg WebAssembly — uw bestand wordt nooit geüpload.",
    errNoTracks: "Geen ondertitelsporen gevonden in dit bestand. Het heeft mogelijk geen ingebedde ondertitels, of alleen ingebakken ondertitels.",
    errImageBased: "De ondertitelsporen in dit bestand zijn afbeeldingsgebaseerd (bijv. PGS/VobSub) en kunnen hier niet worden geconverteerd naar SRT.",
    errNoneExtracted: "Kon geen ondertitelsporen uit dit bestand extraheren.",
    errExtraction: "Extractie mislukt: ",
    noteSkipped: "afbeeldingsgebaseerd spoor",
    noteSkippedPlural: "afbeeldingsgebaseerde sporen zijn",
    noteSkippedSuffix: " is overgeslagen (kan niet worden geconverteerd naar SRT).",
    noteSkippedSuffixPlural: " overgeslagen (kunnen niet worden geconverteerd naar SRT).",
  },
  ja: {
    clickToUpload: "クリックして動画をアップロード",
    uploadHint: "MKV、MP4、MOV または WebM（字幕トラック埋め込み）",
    loadingEngine: "字幕エンジンを読み込んでいます…",
    largeFilesHint: "ブラウザ内で実行 — 大きなファイルは時間がかかります。",
    scanningTracks: "字幕トラックをスキャン中…",
    extractingTracks: "トラックを抽出中…",
    tracksExtracted: "字幕トラック",
    tracksExtractedPlural: "字幕トラック",
    extracted: "抽出済み",
    downloadSrt: ".srt をダウンロード",
    privacy: "FFmpeg WebAssemblyでブラウザ内で100%処理 — ファイルは決してアップロードされません。",
    errNoTracks: "このファイルに字幕トラックが見つかりませんでした。埋め込み字幕がないか、ハードサブのみの可能性があります。",
    errImageBased: "このファイルの字幕トラックは画像ベース（PGS/VobSubなど）であり、ここではSRTに変換できません。",
    errNoneExtracted: "このファイルから字幕トラックを抽出できませんでした。",
    errExtraction: "抽出に失敗しました: ",
    noteSkipped: "個の画像ベーストラック",
    noteSkippedPlural: "個の画像ベーストラック",
    noteSkippedSuffix: "がスキップされました（SRTに変換不可）。",
    noteSkippedSuffixPlural: "がスキップされました（SRTに変換不可）。",
  },
  zh: {
    clickToUpload: "点击上传视频",
    uploadHint: "带有嵌入字幕轨道的 MKV、MP4、MOV 或 WebM",
    loadingEngine: "正在加载字幕引擎…",
    largeFilesHint: "在您的浏览器中运行 — 大文件需要更长时间。",
    scanningTracks: "正在扫描字幕轨道…",
    extractingTracks: "正在提取轨道…",
    tracksExtracted: "条字幕轨道",
    tracksExtractedPlural: "条字幕轨道",
    extracted: "已提取",
    downloadSrt: "下载 .srt",
    privacy: "100% 在您的浏览器中通过 FFmpeg WebAssembly 处理 — 您的文件永远不会被上传。",
    errNoTracks: "此文件中未找到字幕轨道。它可能没有嵌入字幕，或只有硬字幕。",
    errImageBased: "此文件中的字幕轨道是基于图像的（例如 PGS/VobSub），无法在此处转换为 SRT。",
    errNoneExtracted: "无法从此文件中提取任何字幕轨道。",
    errExtraction: "提取失败：",
    noteSkipped: "条基于图像的轨道",
    noteSkippedPlural: "条基于图像的轨道",
    noteSkippedSuffix: "已跳过（无法转换为 SRT）。",
    noteSkippedSuffixPlural: "已跳过（无法转换为 SRT）。",
  },
  ko: {
    clickToUpload: "클릭하여 동영상 업로드",
    uploadHint: "자막 트랙이 포함된 MKV, MP4, MOV 또는 WebM",
    loadingEngine: "자막 엔진 로딩 중…",
    largeFilesHint: "브라우저에서 실행됩니다 — 큰 파일은 더 오래 걸립니다.",
    scanningTracks: "자막 트랙 검색 중…",
    extractingTracks: "트랙 추출 중…",
    tracksExtracted: "자막 트랙",
    tracksExtractedPlural: "자막 트랙",
    extracted: "추출됨",
    downloadSrt: ".srt 다운로드",
    privacy: "FFmpeg WebAssembly를 통해 브라우저에서 100% 처리 — 파일은 절대 업로드되지 않습니다.",
    errNoTracks: "이 파일에서 자막 트랙을 찾을 수 없습니다. 내장 자막이 없거나 하드 자막만 있을 수 있습니다.",
    errImageBased: "이 파일의 자막 트랙은 이미지 기반(예: PGS/VobSub)이며 여기서 SRT로 변환할 수 없습니다.",
    errNoneExtracted: "이 파일에서 자막 트랙을 추출할 수 없습니다.",
    errExtraction: "추출 실패: ",
    noteSkipped: "개의 이미지 기반 트랙",
    noteSkippedPlural: "개의 이미지 기반 트랙",
    noteSkippedSuffix: "이(가) 건너뛰었습니다 (SRT로 변환 불가).",
    noteSkippedSuffixPlural: "이(가) 건너뛰었습니다 (SRT로 변환 불가).",
  },
  ar: {
    clickToUpload: "انقر لرفع فيديو",
    uploadHint: "MKV أو MP4 أو MOV أو WebM مع مسارات ترجمة مضمّنة",
    loadingEngine: "جاري تحميل محرك الترجمة…",
    largeFilesHint: "يعمل في متصفحك — الملفات الكبيرة تستغرق وقتاً أطول.",
    scanningTracks: "جاري البحث عن مسارات الترجمة…",
    extractingTracks: "جاري استخراج المسارات…",
    tracksExtracted: "مسار ترجمة",
    tracksExtractedPlural: "مسارات ترجمة",
    extracted: "مستخرج",
    downloadSrt: "تنزيل .srt",
    privacy: "معالجة 100% في متصفحك عبر FFmpeg WebAssembly — لن يتم رفع ملفك مطلقًا.",
    errNoTracks: "لم يتم العثور على مسارات ترجمة في هذا الملف. قد لا يحتوي على ترجمات مضمّنة أو يحتوي فقط على ترجمات محروقة.",
    errImageBased: "مسارات الترجمة في هذا الملف مستندة إلى صور (مثل PGS/VobSub) ولا يمكن تحويلها إلى SRT هنا.",
    errNoneExtracted: "تعذّر استخراج أي مسارات ترجمة من هذا الملف.",
    errExtraction: "فشل الاستخراج: ",
    noteSkipped: "مسار مستند إلى صور",
    noteSkippedPlural: "مسارات مستندة إلى صور تم",
    noteSkippedSuffix: " تم تخطّيه (لا يمكن تحويله إلى SRT).",
    noteSkippedSuffixPlural: " تخطّيها (لا يمكن تحويلها إلى SRT).",
  },
  ru: {
    clickToUpload: "Нажмите для загрузки видео",
    uploadHint: "MKV, MP4, MOV или WebM со встроенными субтитрами",
    loadingEngine: "Загрузка движка субтитров…",
    largeFilesHint: "Работает в вашем браузере — большие файлы занимают больше времени.",
    scanningTracks: "Поиск дорожек субтитров…",
    extractingTracks: "Извлечение дорожек…",
    tracksExtracted: "дорожка субтитров",
    tracksExtractedPlural: "дорожки субтитров",
    extracted: "извлечено",
    downloadSrt: "Скачать .srt",
    privacy: "100% обрабатывается в вашем браузере через FFmpeg WebAssembly — ваш файл никогда не загружается.",
    errNoTracks: "В этом файле не найдено дорожек субтитров. Возможно, нет встроенных субтитров или только сожжённые.",
    errImageBased: "Дорожки субтитров в этом файле основаны на изображениях (например, PGS/VobSub) и не могут быть преобразованы в SRT здесь.",
    errNoneExtracted: "Не удалось извлечь ни одной дорожки субтитров из этого файла.",
    errExtraction: "Ошибка извлечения: ",
    noteSkipped: "дорожка на основе изображений",
    noteSkippedPlural: "дорожки на основе изображений были",
    noteSkippedSuffix: " была пропущена (не может быть преобразована в SRT).",
    noteSkippedSuffixPlural: " пропущены (не могут быть преобразованы в SRT).",
  },
  hi: {
    clickToUpload: "वीडियो अपलोड करने के लिए क्लिक करें",
    uploadHint: "एम्बेडेड सब्टाइटल ट्रैक के साथ MKV, MP4, MOV या WebM",
    loadingEngine: "सब्टाइटल इंजन लोड हो रहा है…",
    largeFilesHint: "आपके ब्राउज़र में चलता है — बड़ी फ़ाइलों में अधिक समय लगता है।",
    scanningTracks: "सब्टाइटल ट्रैक खोजे जा रहे हैं…",
    extractingTracks: "ट्रैक निकाले जा रहे हैं…",
    tracksExtracted: "सब्टाइटल ट्रैक",
    tracksExtractedPlural: "सब्टाइटल ट्रैक",
    extracted: "निकाले गए",
    downloadSrt: ".srt डाउनलोड करें",
    privacy: "FFmpeg WebAssembly के जरिए आपके ब्राउज़र में 100% प्रसंस्करण — आपकी फ़ाइल कभी अपलोड नहीं होती।",
    errNoTracks: "इस फ़ाइल में कोई सब्टाइटल ट्रैक नहीं मिला। इसमें एम्बेडेड सब्टाइटल नहीं हो सकते, या केवल हार्ड-कोडेड हो सकते हैं।",
    errImageBased: "इस फ़ाइल में सब्टाइटल ट्रैक इमेज-आधारित (जैसे PGS/VobSub) हैं और यहाँ SRT में परिवर्तित नहीं किए जा सकते।",
    errNoneExtracted: "इस फ़ाइल से कोई सब्टाइटल ट्रैक निकाला नहीं जा सका।",
    errExtraction: "निष्कर्षण विफल: ",
    noteSkipped: "इमेज-आधारित ट्रैक",
    noteSkippedPlural: "इमेज-आधारित ट्रैक",
    noteSkippedSuffix: " छोड़ा गया (SRT में नहीं बदला जा सकता)।",
    noteSkippedSuffixPlural: " छोड़े गए (SRT में नहीं बदले जा सकते)।",
  },
  tr: {
    clickToUpload: "Bir video yüklemek için tıklayın",
    uploadHint: "Gömülü altyazı parçaları içeren MKV, MP4, MOV veya WebM",
    loadingEngine: "Altyazı motoru yükleniyor…",
    largeFilesHint: "Tarayıcınızda çalışır — büyük dosyalar daha uzun sürer.",
    scanningTracks: "Altyazı parçaları taranıyor…",
    extractingTracks: "Parçalar çıkarılıyor…",
    tracksExtracted: "altyazı parçası",
    tracksExtractedPlural: "altyazı parçası",
    extracted: "çıkarıldı",
    downloadSrt: ".srt indir",
    privacy: "FFmpeg WebAssembly aracılığıyla tarayıcınızda %100 işlenir — dosyanız asla yüklenmez.",
    errNoTracks: "Bu dosyada altyazı parçası bulunamadı. Gömülü altyazısı olmayabilir ya da sadece sabit altyazısı olabilir.",
    errImageBased: "Bu dosyadaki altyazı parçaları görüntü tabanlıdır (örn. PGS/VobSub) ve burada SRT'ye dönüştürülemiyor.",
    errNoneExtracted: "Bu dosyadan altyazı parçası çıkarılamadı.",
    errExtraction: "Çıkarma başarısız: ",
    noteSkipped: "görüntü tabanlı parça",
    noteSkippedPlural: "görüntü tabanlı parça",
    noteSkippedSuffix: " atlandı (SRT'ye dönüştürülemiyor).",
    noteSkippedSuffixPlural: " atlandı (SRT'ye dönüştürülemiyor).",
  },
  id: {
    clickToUpload: "Klik untuk mengunggah video",
    uploadHint: "MKV, MP4, MOV atau WebM dengan trek subtitle tertanam",
    loadingEngine: "Memuat mesin subtitle…",
    largeFilesHint: "Berjalan di browser Anda — file besar membutuhkan waktu lebih lama.",
    scanningTracks: "Memindai trek subtitle…",
    extractingTracks: "Mengekstrak trek…",
    tracksExtracted: "trek subtitle",
    tracksExtractedPlural: "trek subtitle",
    extracted: "diekstrak",
    downloadSrt: "Unduh .srt",
    privacy: "100% diproses di browser Anda melalui FFmpeg WebAssembly — file Anda tidak pernah diunggah.",
    errNoTracks: "Tidak ada trek subtitle yang ditemukan dalam file ini. Mungkin tidak ada subtitle tertanam, atau hanya subtitle yang tercetak.",
    errImageBased: "Trek subtitle dalam file ini berbasis gambar (mis. PGS/VobSub) dan tidak dapat dikonversi ke SRT di sini.",
    errNoneExtracted: "Tidak dapat mengekstrak trek subtitle apa pun dari file ini.",
    errExtraction: "Ekstraksi gagal: ",
    noteSkipped: "trek berbasis gambar",
    noteSkippedPlural: "trek berbasis gambar",
    noteSkippedSuffix: " dilewati (tidak dapat dikonversi ke SRT).",
    noteSkippedSuffixPlural: " dilewati (tidak dapat dikonversi ke SRT).",
  },
  vi: {
    clickToUpload: "Nhấp để tải lên video",
    uploadHint: "MKV, MP4, MOV hoặc WebM với các bản nhạc phụ đề được nhúng",
    loadingEngine: "Đang tải công cụ phụ đề…",
    largeFilesHint: "Chạy trong trình duyệt của bạn — tệp lớn mất nhiều thời gian hơn.",
    scanningTracks: "Đang quét bản nhạc phụ đề…",
    extractingTracks: "Đang trích xuất bản nhạc…",
    tracksExtracted: "bản nhạc phụ đề",
    tracksExtractedPlural: "bản nhạc phụ đề",
    extracted: "đã trích xuất",
    downloadSrt: "Tải .srt",
    privacy: "100% xử lý trong trình duyệt của bạn qua FFmpeg WebAssembly — tệp của bạn không bao giờ được tải lên.",
    errNoTracks: "Không tìm thấy bản nhạc phụ đề nào trong tệp này. Nó có thể không có phụ đề nhúng, hoặc chỉ có phụ đề cứng.",
    errImageBased: "Các bản nhạc phụ đề trong tệp này dựa trên hình ảnh (ví dụ: PGS/VobSub) và không thể chuyển đổi thành SRT tại đây.",
    errNoneExtracted: "Không thể trích xuất bất kỳ bản nhạc phụ đề nào từ tệp này.",
    errExtraction: "Trích xuất thất bại: ",
    noteSkipped: "bản nhạc dựa trên hình ảnh",
    noteSkippedPlural: "bản nhạc dựa trên hình ảnh",
    noteSkippedSuffix: " đã bị bỏ qua (không thể chuyển đổi thành SRT).",
    noteSkippedSuffixPlural: " đã bị bỏ qua (không thể chuyển đổi thành SRT).",
  },
  sv: {
    clickToUpload: "Klicka för att ladda upp en video",
    uploadHint: "MKV, MP4, MOV eller WebM med inbäddade undertextspår",
    loadingEngine: "Laddar undertextmotorn…",
    largeFilesHint: "Körs i din webbläsare — stora filer tar längre tid.",
    scanningTracks: "Söker efter undertextspår…",
    extractingTracks: "Extraherar spår…",
    tracksExtracted: "undertextspår",
    tracksExtractedPlural: "undertextspår",
    extracted: "extraherat",
    downloadSrt: "Ladda ned .srt",
    privacy: "Bearbetas till 100% i din webbläsare via FFmpeg WebAssembly — din fil laddas aldrig upp.",
    errNoTracks: "Inga undertextspår hittades i den här filen. Den kanske inte har inbäddade undertexter, eller bara inbrända.",
    errImageBased: "Undertextspåren i den här filen är bildbaserade (t.ex. PGS/VobSub) och kan inte konverteras till SRT här.",
    errNoneExtracted: "Det gick inte att extrahera några undertextspår från den här filen.",
    errExtraction: "Extrahering misslyckades: ",
    noteSkipped: "bildbaserat spår",
    noteSkippedPlural: "bildbaserade spår hoppades",
    noteSkippedSuffix: " hoppades över (kan inte konverteras till SRT).",
    noteSkippedSuffixPlural: " över (kan inte konverteras till SRT).",
  },
  pl: {
    clickToUpload: "Kliknij, aby przesłać wideo",
    uploadHint: "MKV, MP4, MOV lub WebM z osadzonymi ścieżkami napisów",
    loadingEngine: "Ładowanie silnika napisów…",
    largeFilesHint: "Działa w przeglądarce — duże pliki zajmują więcej czasu.",
    scanningTracks: "Skanowanie ścieżek napisów…",
    extractingTracks: "Wyodrębnianie ścieżek…",
    tracksExtracted: "ścieżka napisów",
    tracksExtractedPlural: "ścieżki napisów",
    extracted: "wyodrębniono",
    downloadSrt: "Pobierz .srt",
    privacy: "100% przetwarzane w przeglądarce przez FFmpeg WebAssembly — Twój plik nigdy nie jest przesyłany.",
    errNoTracks: "Nie znaleziono ścieżek napisów w tym pliku. Może nie mieć osadzonych napisów lub tylko napisy wypalone.",
    errImageBased: "Ścieżki napisów w tym pliku są oparte na obrazach (np. PGS/VobSub) i nie mogą być tutaj przekonwertowane do SRT.",
    errNoneExtracted: "Nie udało się wyodrębnić żadnych ścieżek napisów z tego pliku.",
    errExtraction: "Wyodrębnianie nie powiodło się: ",
    noteSkipped: "ścieżka oparta na obrazach",
    noteSkippedPlural: "ścieżki oparte na obrazach zostały",
    noteSkippedSuffix: " została pominięta (nie może być przekonwertowana do SRT).",
    noteSkippedSuffixPlural: " pominięte (nie mogą być przekonwertowane do SRT).",
  },
  uk: {
    clickToUpload: "Натисніть для завантаження відео",
    uploadHint: "MKV, MP4, MOV або WebM із вбудованими доріжками субтитрів",
    loadingEngine: "Завантаження двигуна субтитрів…",
    largeFilesHint: "Працює у вашому браузері — великі файли займають більше часу.",
    scanningTracks: "Пошук доріжок субтитрів…",
    extractingTracks: "Вилучення доріжок…",
    tracksExtracted: "доріжка субтитрів",
    tracksExtractedPlural: "доріжки субтитрів",
    extracted: "вилучено",
    downloadSrt: "Завантажити .srt",
    privacy: "100% обробляється у вашому браузері через FFmpeg WebAssembly — ваш файл ніколи не завантажується.",
    errNoTracks: "У цьому файлі не знайдено доріжок субтитрів. Можливо, немає вбудованих субтитрів або є лише «вбудовані».",
    errImageBased: "Доріжки субтитрів у цьому файлі засновані на зображеннях (наприклад, PGS/VobSub) і не можуть бути перетворені в SRT тут.",
    errNoneExtracted: "Не вдалося вилучити жодної доріжки субтитрів із цього файлу.",
    errExtraction: "Помилка вилучення: ",
    noteSkipped: "доріжка на основі зображень",
    noteSkippedPlural: "доріжки на основі зображень були",
    noteSkippedSuffix: " була пропущена (не може бути перетворена в SRT).",
    noteSkippedSuffixPlural: " пропущені (не можуть бути перетворені в SRT).",
  },
  cs: {
    clickToUpload: "Klikněte pro nahrání videa",
    uploadHint: "MKV, MP4, MOV nebo WebM s vloženými titulkovými stopami",
    loadingEngine: "Načítání titulkového modulu…",
    largeFilesHint: "Běží ve vašem prohlížeči — velké soubory trvají déle.",
    scanningTracks: "Prohledávání titulkových stop…",
    extractingTracks: "Extrahování stop…",
    tracksExtracted: "titulková stopa",
    tracksExtractedPlural: "titulkové stopy",
    extracted: "extrahováno",
    downloadSrt: "Stáhnout .srt",
    privacy: "100% zpracováno ve vašem prohlížeči přes FFmpeg WebAssembly — váš soubor se nikdy nenahrává.",
    errNoTracks: "V tomto souboru nebyly nalezeny žádné titulkové stopy. Možná nemá vložené titulky nebo jen vypálené.",
    errImageBased: "Titulkové stopy v tomto souboru jsou obrazové (např. PGS/VobSub) a nelze je zde převést na SRT.",
    errNoneExtracted: "Z tohoto souboru se nepodařilo extrahovat žádné titulkové stopy.",
    errExtraction: "Extrakce selhala: ",
    noteSkipped: "obrazová stopa",
    noteSkippedPlural: "obrazové stopy byly",
    noteSkippedSuffix: " byla přeskočena (nelze převést na SRT).",
    noteSkippedSuffixPlural: " přeskočeny (nelze převést na SRT).",
  },
};

export function ExtractSubtitlesClient() {
  const s = T[useLocale()] ?? T.en;
  const th = categoryTheme("subtitles");
  const [file, setFile] = useState<File | null>(null);
  const [phase, setPhase] = useState<Phase>("idle");
  const [tracks, setTracks] = useState<Track[]>([]);
  const [note, setNote] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const urls = useRef<string[]>([]);

  useEffect(() => () => { urls.current.forEach((u) => URL.revokeObjectURL(u)); }, []);

  function clearTracks() {
    urls.current.forEach((u) => URL.revokeObjectURL(u));
    urls.current = [];
    setTracks([]);
  }

  async function run(f: File) {
    setError(null); setNote(null); clearTracks(); setPhase("loading");
    try {
      const logs: string[] = [];
      const ff = await getFfmpeg();
      // Named so we can remove it — getFfmpeg() is a singleton, so an anonymous
      // listener added every run would accumulate (stale closures + memory).
      const onLog = (e: { message?: string }) => { if (typeof e.message === "string") logs.push(e.message); };
      ff.on("log", onLog);
      const { fetchFile } = await import("@ffmpeg/util");
      const inExt = (f.name.split(".").pop() || "mkv").toLowerCase();
      const input = `input.${inExt}`;
      await ff.writeFile(input, await fetchFile(f));

      // Probe: a no-output run prints stream info to the log, then errors out
      // (expected). We parse the captured lines for Subtitle streams.
      setPhase("probing");
      try { await ff.exec(["-hide_banner", "-i", input]); } catch { /* expected non-zero */ }
      ff.off("log", onLog); // probe done — stop capturing so the listener doesn't pile up

      const streams: { codec: string; lang: string }[] = [];
      const re = /Stream #\d+:\d+(?:\[[^\]]*\])?(?:\(([^)]+)\))?:\s*Subtitle:\s*([A-Za-z0-9_]+)/g;
      for (const line of logs) {
        let m: RegExpExecArray | null;
        re.lastIndex = 0;
        while ((m = re.exec(line))) streams.push({ lang: m[1] || "und", codec: m[2].toLowerCase() });
      }

      if (streams.length === 0) {
        setPhase("error");
        setError(s.errNoTracks);
        try { await ff.deleteFile(input); } catch {}
        return;
      }

      // Extract each TEXT subtitle stream to SRT, indexed by its position among
      // subtitle streams (-map 0:s:N).
      setPhase("extracting");
      const out: Track[] = [];
      let skipped = 0;
      const baseName = f.name.replace(/\.[^.]+$/, "");
      for (let i = 0; i < streams.length; i++) {
        const st = streams[i];
        if (!TEXT_CODECS.has(st.codec)) { skipped++; continue; }
        const outName = `track_${i}.srt`;
        try {
          const code = await ff.exec(["-hide_banner", "-i", input, "-map", `0:s:${i}`, outName]);
          if (code !== 0) { skipped++; continue; }
          const data = await ff.readFile(outName);
          if (!data || data.length === 0) { skipped++; continue; }
          const blob = new Blob([data as BlobPart], { type: "application/x-subrip" });
          const url = URL.createObjectURL(blob);
          urls.current.push(url);
          out.push({ url, name: `${baseName}.${st.lang}.${i + 1}.srt`, size: blob.size, lang: st.lang, codec: st.codec });
          try { await ff.deleteFile(outName); } catch {}
        } catch { skipped++; }
      }
      try { await ff.deleteFile(input); } catch {}

      if (out.length === 0) {
        setPhase("error");
        setError(
          skipped > 0
            ? s.errImageBased
            : s.errNoneExtracted,
        );
        return;
      }
      if (skipped > 0) setNote(`${skipped} ${skipped > 1 ? s.noteSkippedPlural : s.noteSkipped}${skipped > 1 ? s.noteSkippedSuffixPlural : s.noteSkippedSuffix}`);
      setTracks(out);
      setPhase("done");
    } catch (e) {
      setPhase("error");
      setError(`${s.errExtraction}${(e as Error).message}`);
    }
  }

  const busy = phase === "loading" || phase === "probing" || phase === "extracting";
  const busyLabel = phase === "loading" ? s.loadingEngine : phase === "probing" ? s.scanningTracks : s.extractingTracks;

  function reset() { clearTracks(); setFile(null); setPhase("idle"); setError(null); setNote(null); }

  return (
    <div className="space-y-4">
      {!file ? (
        <label className={cn("flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed px-6 py-14 text-center transition-colors hover:brightness-95", th.dropBorder, th.dropBg)}>
          <span className={cn("grid h-12 w-12 place-items-center rounded-xl", th.iconBg, th.iconText)}>
            <Upload className="h-6 w-6" />
          </span>
          <span className="mt-3 font-semibold text-ink-900">{s.clickToUpload}</span>
          <span className="mt-0.5 text-xs text-ink-400">{s.uploadHint}</span>
          <input
            type="file"
            accept="video/*,.mkv,.mp4,.mov,.webm"
            className="hidden"
            onChange={(e) => { const f = e.target.files?.[0]; if (f) { setFile(f); run(f); } }}
          />
        </label>
      ) : (
        <div className="flex items-center justify-between rounded-lg border border-ink-100 bg-white px-4 py-2.5">
          <div className="min-w-0 truncate text-sm">
            <span className="font-medium text-ink-900">{file.name}</span>
            <span className="ml-2 text-ink-400">{formatBytes(file.size)}</span>
          </div>
          <button onClick={reset} aria-label="Remove" className="rounded p-1 text-xs text-ink-400 hover:bg-ink-50 hover:text-ink-700"><X className="h-3.5 w-3.5" /></button>
        </div>
      )}

      {busy && (
        <div className="flex items-center gap-3 rounded-lg border border-ink-100 bg-white px-4 py-3">
          <Loader2 className="h-4 w-4 animate-spin text-brand-500" />
          <div className="flex-1">
            <p className="text-sm font-medium text-ink-900">{busyLabel}</p>
            <p className="text-xs text-ink-400">{s.largeFilesHint}</p>
          </div>
        </div>
      )}

      {tracks.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium text-ink-700">{tracks.length} {tracks.length > 1 ? s.tracksExtractedPlural : s.tracksExtracted} {s.extracted}</p>
          {tracks.map((t, i) => (
            <div key={i} className="flex items-center justify-between rounded-lg border border-ink-100 bg-white px-4 py-2.5 text-sm">
              <span className="inline-flex items-center gap-2">
                <FileDown className="h-4 w-4 text-ink-400" />
                <span className="font-medium text-ink-900">{t.lang.toUpperCase()}</span>
                <span className="text-ink-400">{t.codec} · {formatBytes(t.size)}</span>
              </span>
              <a href={t.url} download={t.name}>
                <Button size="sm" variant="outline"><Download className="h-3.5 w-3.5" /> {s.downloadSrt}</Button>
              </a>
            </div>
          ))}
        </div>
      )}

      {note && <p className="rounded border border-amber-200 bg-amber-50 p-2 text-xs text-amber-700">{note}</p>}
      {error && <p className="text-sm text-red-600">{error}</p>}
      <p className="text-xs text-ink-400">{s.privacy}</p>
    </div>
  );
}
