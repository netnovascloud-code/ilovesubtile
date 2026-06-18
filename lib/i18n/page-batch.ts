import { type Locale } from "@/lib/i18n/locales";

/**
 * Strings for the Batch Converter page (/batch and /<locale>/batch). English is
 * the base and the fallback for any locale not present here (same degradation as
 * the other page-* and plan-* string tables). Only `en` and `fr` are complete;
 * every other locale falls back to `en` via getBatch().
 */
export type BatchStrings = {
  meta: {
    title: string;
    description: string;
  };
  hero: {
    title: string;
    lead: string;
  };
  tabs: {
    images: string;
    pdfs: string;
    audio: string;
    videos: string;
  };
  common: {
    addMore: string;
    clear: string;
    downloadZip: string;
    done: (n: number) => string;
    failed: (n: number) => string;
    loadingFfmpeg: string;
  };
  image: {
    dropTitle: (max: number) => string;
    dropHint: string;
    queued: (n: number) => string;
    targetFormat: string;
    formatWebp: string;
    formatJpg: string;
    formatPng: string;
    quality: (q: number) => string;
    maxDimension: string;
    processing: (done: number, total: number) => string;
    process: (n: string) => string;
    privacy: string;
    errDecode: string;
    errCanvas: string;
    errEncode: string;
  };
  pdf: {
    dropTitle: (max: number) => string;
    dropHint: string;
    queued: (n: number) => string;
    preset: string;
    presetStrong: string;
    presetBalanced: string;
    presetHigh: string;
    compressing: (done: number, total: number) => string;
    compress: (n: string) => string;
    privacy: string;
  };
  audio: {
    dropTitle: (max: number) => string;
    dropHint: string;
    queued: (n: number) => string;
    bitrate: string;
    bitrate128: string;
    bitrate192: string;
    bitrate256: string;
    bitrate320: string;
    converting: (done: number, total: number) => string;
    convert: (n: string) => string;
    privacy: string;
  };
  video: {
    dropTitle: (max: number) => string;
    dropHint: string;
    queued: (n: number) => string;
    preset: string;
    presetStrong: string;
    presetBalanced: string;
    presetHigh: string;
    compressing: (done: number, total: number) => string;
    compress: (n: string) => string;
    privacy: string;
  };
};

const en: BatchStrings = {
  meta: {
    title: "Batch Converter — Process 50 Files at Once",
    description:
      "Convert up to 50 images (WebP/JPG/PNG), compress PDFs, batch-convert audio to MP3, or compress videos — all in one pass, then download a single ZIP. 100% in your browser.",
  },
  hero: {
    title: "Batch Converter",
    lead: "Drop up to 50 files, pick an action — get one ZIP back. Everything happens in your browser.",
  },
  tabs: {
    images: "Images",
    pdfs: "Compress PDFs",
    audio: "Audio → MP3",
    videos: "Compress videos",
  },
  common: {
    addMore: "Add more",
    clear: "Clear",
    downloadZip: "Download ZIP",
    done: (n) => `${n} done`,
    failed: (n) => `${n} failed`,
    loadingFfmpeg: "Loading FFmpeg (~30 MB) — only the first time.",
  },
  image: {
    dropTitle: (max) => `Drop up to ${max} images`,
    dropHint: "JPG · PNG · WebP · GIF · BMP — processed in your browser, packed in a ZIP",
    queued: (n) => `${n} image${n > 1 ? "s" : ""} queued`,
    targetFormat: "Target format",
    formatWebp: "WebP (recommended)",
    formatJpg: "JPG",
    formatPng: "PNG",
    quality: (q) => `Quality · ${q}`,
    maxDimension: "Max dimension (px) · 0 = keep",
    processing: (done, total) => `Processing ${done}/${total}…`,
    process: (n) => `Process ${n} images`,
    privacy: "Processed 100% in your browser — your images are never uploaded.",
    errDecode: "Could not decode image",
    errCanvas: "Canvas unavailable",
    errEncode: "Encoding failed",
  },
  pdf: {
    dropTitle: (max) => `Drop up to ${max} PDFs`,
    dropHint: "Each is re-rendered to JPEG pages — biggest wins on image-heavy or scanned PDFs.",
    queued: (n) => `${n} PDF${n > 1 ? "s" : ""} queued`,
    preset: "Compression preset",
    presetStrong: "Strong (smaller)",
    presetBalanced: "Balanced",
    presetHigh: "High quality",
    compressing: (done, total) => `Compressing ${done}/${total}…`,
    compress: (n) => `Compress ${n} PDFs`,
    privacy:
      "Processed 100% in your browser — your PDFs are never uploaded. The output is image-based (no selectable text).",
  },
  audio: {
    dropTitle: (max) => `Drop up to ${max} audio files`,
    dropHint: "MP3 · WAV · M4A · FLAC · OGG — converted to MP3 in your browser",
    queued: (n) => `${n} audio file${n > 1 ? "s" : ""} queued`,
    bitrate: "Output bitrate",
    bitrate128: "128 kbps · small",
    bitrate192: "192 kbps · balanced",
    bitrate256: "256 kbps · good",
    bitrate320: "320 kbps · max",
    converting: (done, total) => `Converting ${done}/${total}…`,
    convert: (n) => `Convert ${n} to MP3`,
    privacy: "Processed 100% in your browser via FFmpeg.wasm — your files are never uploaded.",
  },
  video: {
    dropTitle: (max) => `Drop up to ${max} videos`,
    dropHint: "MP4 · MOV · MKV · WebM — re-encoded with H.264 + AAC in your browser",
    queued: (n) => `${n} video${n > 1 ? "s" : ""} queued`,
    preset: "Quality preset (lower CRF = bigger file, higher quality)",
    presetStrong: "Strong (CRF 32)",
    presetBalanced: "Balanced (CRF 28)",
    presetHigh: "High (CRF 23)",
    compressing: (done, total) => `Compressing ${done}/${total}…`,
    compress: (n) => `Compress ${n} videos`,
    privacy:
      "Processed 100% in your browser via FFmpeg.wasm — your videos are never uploaded. Big files are slow; consider trimming first.",
  },
};

const fr: BatchStrings = {
  meta: {
    title: "Convertisseur par lot — Traitez 50 fichiers d'un coup",
    description:
      "Convertissez jusqu'à 50 images (WebP/JPG/PNG), compressez des PDF, convertissez de l'audio en MP3 par lot, ou compressez des vidéos — le tout en une passe, puis téléchargez un seul ZIP. 100 % dans votre navigateur.",
  },
  hero: {
    title: "Convertisseur par lot",
    lead: "Déposez jusqu'à 50 fichiers, choisissez une action — récupérez un seul ZIP. Tout se passe dans votre navigateur.",
  },
  tabs: {
    images: "Images",
    pdfs: "Compresser des PDF",
    audio: "Audio → MP3",
    videos: "Compresser des vidéos",
  },
  common: {
    addMore: "Ajouter",
    clear: "Effacer",
    downloadZip: "Télécharger le ZIP",
    done: (n) => `${n} terminé${n > 1 ? "s" : ""}`,
    failed: (n) => `${n} échoué${n > 1 ? "s" : ""}`,
    loadingFfmpeg: "Chargement de FFmpeg (~30 Mo) — uniquement la première fois.",
  },
  image: {
    dropTitle: (max) => `Déposez jusqu'à ${max} images`,
    dropHint: "JPG · PNG · WebP · GIF · BMP — traitées dans votre navigateur, regroupées dans un ZIP",
    queued: (n) => `${n} image${n > 1 ? "s" : ""} en file`,
    targetFormat: "Format cible",
    formatWebp: "WebP (recommandé)",
    formatJpg: "JPG",
    formatPng: "PNG",
    quality: (q) => `Qualité · ${q}`,
    maxDimension: "Dimension max (px) · 0 = conserver",
    processing: (done, total) => `Traitement ${done}/${total}…`,
    process: (n) => `Traiter ${n} images`,
    privacy: "Traité à 100 % dans votre navigateur — vos images ne sont jamais envoyées.",
    errDecode: "Impossible de décoder l'image",
    errCanvas: "Canevas indisponible",
    errEncode: "Échec de l'encodage",
  },
  pdf: {
    dropTitle: (max) => `Déposez jusqu'à ${max} PDF`,
    dropHint: "Chaque page est ré-rendue en JPEG — gains maximaux sur les PDF riches en images ou scannés.",
    queued: (n) => `${n} PDF en file`,
    preset: "Préréglage de compression",
    presetStrong: "Fort (plus petit)",
    presetBalanced: "Équilibré",
    presetHigh: "Haute qualité",
    compressing: (done, total) => `Compression ${done}/${total}…`,
    compress: (n) => `Compresser ${n} PDF`,
    privacy:
      "Traité à 100 % dans votre navigateur — vos PDF ne sont jamais envoyés. Le résultat est basé sur des images (pas de texte sélectionnable).",
  },
  audio: {
    dropTitle: (max) => `Déposez jusqu'à ${max} fichiers audio`,
    dropHint: "MP3 · WAV · M4A · FLAC · OGG — convertis en MP3 dans votre navigateur",
    queued: (n) => `${n} fichier${n > 1 ? "s" : ""} audio en file`,
    bitrate: "Débit de sortie",
    bitrate128: "128 kbps · léger",
    bitrate192: "192 kbps · équilibré",
    bitrate256: "256 kbps · bon",
    bitrate320: "320 kbps · max",
    converting: (done, total) => `Conversion ${done}/${total}…`,
    convert: (n) => `Convertir ${n} en MP3`,
    privacy: "Traité à 100 % dans votre navigateur via FFmpeg.wasm — vos fichiers ne sont jamais envoyés.",
  },
  video: {
    dropTitle: (max) => `Déposez jusqu'à ${max} vidéos`,
    dropHint: "MP4 · MOV · MKV · WebM — ré-encodées en H.264 + AAC dans votre navigateur",
    queued: (n) => `${n} vidéo${n > 1 ? "s" : ""} en file`,
    preset: "Préréglage de qualité (CRF plus bas = fichier plus gros, meilleure qualité)",
    presetStrong: "Fort (CRF 32)",
    presetBalanced: "Équilibré (CRF 28)",
    presetHigh: "Haute (CRF 23)",
    compressing: (done, total) => `Compression ${done}/${total}…`,
    compress: (n) => `Compresser ${n} vidéos`,
    privacy:
      "Traité à 100 % dans votre navigateur via FFmpeg.wasm — vos vidéos ne sont jamais envoyées. Les gros fichiers sont lents ; pensez à les rogner d'abord.",
  },
};

const es: BatchStrings = {
  meta: {
    title: "Conversor por lotes — Procesa 50 archivos a la vez",
    description:
      "Convierte hasta 50 imágenes (WebP/JPG/PNG), comprime PDF, convierte audio a MP3 por lotes o comprime vídeos — todo en una sola pasada, luego descarga un único ZIP. 100 % en tu navegador.",
  },
  hero: {
    title: "Conversor por lotes",
    lead: "Suelta hasta 50 archivos, elige una acción — recibe un solo ZIP. Todo ocurre en tu navegador.",
  },
  tabs: {
    images: "Imágenes",
    pdfs: "Comprimir PDF",
    audio: "Audio → MP3",
    videos: "Comprimir vídeos",
  },
  common: {
    addMore: "Añadir más",
    clear: "Limpiar",
    downloadZip: "Descargar ZIP",
    done: (n) => `${n} listo${n > 1 ? "s" : ""}`,
    failed: (n) => `${n} fallido${n > 1 ? "s" : ""}`,
    loadingFfmpeg: "Cargando FFmpeg (~30 MB) — solo la primera vez.",
  },
  image: {
    dropTitle: (max) => `Suelta hasta ${max} imágenes`,
    dropHint: "JPG · PNG · WebP · GIF · BMP — procesadas en tu navegador, empaquetadas en un ZIP",
    queued: (n) => `${n} imagen${n > 1 ? "es" : ""} en cola`,
    targetFormat: "Formato de destino",
    formatWebp: "WebP (recomendado)",
    formatJpg: "JPG",
    formatPng: "PNG",
    quality: (q) => `Calidad · ${q}`,
    maxDimension: "Dimensión máx. (px) · 0 = conservar",
    processing: (done, total) => `Procesando ${done}/${total}…`,
    process: (n) => `Procesar ${n} imágenes`,
    privacy: "Procesado 100 % en tu navegador — tus imágenes nunca se suben.",
    errDecode: "No se pudo decodificar la imagen",
    errCanvas: "Canvas no disponible",
    errEncode: "Error de codificación",
  },
  pdf: {
    dropTitle: (max) => `Suelta hasta ${max} PDF`,
    dropHint: "Cada uno se vuelve a renderizar a páginas JPEG — máximo ahorro en PDF con muchas imágenes o escaneados.",
    queued: (n) => `${n} PDF en cola`,
    preset: "Preajuste de compresión",
    presetStrong: "Fuerte (más pequeño)",
    presetBalanced: "Equilibrado",
    presetHigh: "Alta calidad",
    compressing: (done, total) => `Comprimiendo ${done}/${total}…`,
    compress: (n) => `Comprimir ${n} PDF`,
    privacy:
      "Procesado 100 % en tu navegador — tus PDF nunca se suben. El resultado se basa en imágenes (sin texto seleccionable).",
  },
  audio: {
    dropTitle: (max) => `Suelta hasta ${max} archivos de audio`,
    dropHint: "MP3 · WAV · M4A · FLAC · OGG — convertidos a MP3 en tu navegador",
    queued: (n) => `${n} archivo${n > 1 ? "s" : ""} de audio en cola`,
    bitrate: "Bitrate de salida",
    bitrate128: "128 kbps · ligero",
    bitrate192: "192 kbps · equilibrado",
    bitrate256: "256 kbps · bueno",
    bitrate320: "320 kbps · máx",
    converting: (done, total) => `Convirtiendo ${done}/${total}…`,
    convert: (n) => `Convertir ${n} a MP3`,
    privacy: "Procesado 100 % en tu navegador con FFmpeg.wasm — tus archivos nunca se suben.",
  },
  video: {
    dropTitle: (max) => `Suelta hasta ${max} vídeos`,
    dropHint: "MP4 · MOV · MKV · WebM — recodificados con H.264 + AAC en tu navegador",
    queued: (n) => `${n} vídeo${n > 1 ? "s" : ""} en cola`,
    preset: "Preajuste de calidad (CRF más bajo = archivo más grande, mayor calidad)",
    presetStrong: "Fuerte (CRF 32)",
    presetBalanced: "Equilibrado (CRF 28)",
    presetHigh: "Alta (CRF 23)",
    compressing: (done, total) => `Comprimiendo ${done}/${total}…`,
    compress: (n) => `Comprimir ${n} vídeos`,
    privacy:
      "Procesado 100 % en tu navegador con FFmpeg.wasm — tus vídeos nunca se suben. Los archivos grandes son lentos; considera recortarlos primero.",
  },
};

const pt: BatchStrings = {
  meta: {
    title: "Conversor em lote — Processe 50 arquivos de uma vez",
    description:
      "Converta até 50 imagens (WebP/JPG/PNG), comprima PDFs, converta áudio para MP3 em lote ou comprima vídeos — tudo numa só passagem, depois baixe um único ZIP. 100% no seu navegador.",
  },
  hero: {
    title: "Conversor em lote",
    lead: "Solte até 50 arquivos, escolha uma ação — receba um único ZIP. Tudo acontece no seu navegador.",
  },
  tabs: {
    images: "Imagens",
    pdfs: "Comprimir PDFs",
    audio: "Áudio → MP3",
    videos: "Comprimir vídeos",
  },
  common: {
    addMore: "Adicionar mais",
    clear: "Limpar",
    downloadZip: "Baixar ZIP",
    done: (n) => `${n} concluído${n > 1 ? "s" : ""}`,
    failed: (n) => `${n} falhou${n > 1 ? "" : ""}`,
    loadingFfmpeg: "Carregando FFmpeg (~30 MB) — só na primeira vez.",
  },
  image: {
    dropTitle: (max) => `Solte até ${max} imagens`,
    dropHint: "JPG · PNG · WebP · GIF · BMP — processadas no seu navegador, empacotadas num ZIP",
    queued: (n) => `${n} imagem${n > 1 ? "ns" : ""} na fila`,
    targetFormat: "Formato de destino",
    formatWebp: "WebP (recomendado)",
    formatJpg: "JPG",
    formatPng: "PNG",
    quality: (q) => `Qualidade · ${q}`,
    maxDimension: "Dimensão máx. (px) · 0 = manter",
    processing: (done, total) => `Processando ${done}/${total}…`,
    process: (n) => `Processar ${n} imagens`,
    privacy: "Processado 100% no seu navegador — suas imagens nunca são enviadas.",
    errDecode: "Não foi possível decodificar a imagem",
    errCanvas: "Canvas indisponível",
    errEncode: "Falha na codificação",
  },
  pdf: {
    dropTitle: (max) => `Solte até ${max} PDFs`,
    dropHint: "Cada um é re-renderizado em páginas JPEG — maior ganho em PDFs com muitas imagens ou digitalizados.",
    queued: (n) => `${n} PDF${n > 1 ? "s" : ""} na fila`,
    preset: "Predefinição de compressão",
    presetStrong: "Forte (menor)",
    presetBalanced: "Equilibrado",
    presetHigh: "Alta qualidade",
    compressing: (done, total) => `Comprimindo ${done}/${total}…`,
    compress: (n) => `Comprimir ${n} PDFs`,
    privacy:
      "Processado 100% no seu navegador — seus PDFs nunca são enviados. O resultado é baseado em imagens (sem texto selecionável).",
  },
  audio: {
    dropTitle: (max) => `Solte até ${max} arquivos de áudio`,
    dropHint: "MP3 · WAV · M4A · FLAC · OGG — convertidos para MP3 no seu navegador",
    queued: (n) => `${n} arquivo${n > 1 ? "s" : ""} de áudio na fila`,
    bitrate: "Taxa de bits de saída",
    bitrate128: "128 kbps · leve",
    bitrate192: "192 kbps · equilibrado",
    bitrate256: "256 kbps · bom",
    bitrate320: "320 kbps · máx",
    converting: (done, total) => `Convertendo ${done}/${total}…`,
    convert: (n) => `Converter ${n} para MP3`,
    privacy: "Processado 100% no seu navegador via FFmpeg.wasm — seus arquivos nunca são enviados.",
  },
  video: {
    dropTitle: (max) => `Solte até ${max} vídeos`,
    dropHint: "MP4 · MOV · MKV · WebM — recodificados com H.264 + AAC no seu navegador",
    queued: (n) => `${n} vídeo${n > 1 ? "s" : ""} na fila`,
    preset: "Predefinição de qualidade (CRF menor = arquivo maior, qualidade maior)",
    presetStrong: "Forte (CRF 32)",
    presetBalanced: "Equilibrado (CRF 28)",
    presetHigh: "Alta (CRF 23)",
    compressing: (done, total) => `Comprimindo ${done}/${total}…`,
    compress: (n) => `Comprimir ${n} vídeos`,
    privacy:
      "Processado 100% no seu navegador via FFmpeg.wasm — seus vídeos nunca são enviados. Arquivos grandes são lentos; considere cortá-los primeiro.",
  },
};

const de: BatchStrings = {
  meta: {
    title: "Stapel-Konverter — 50 Dateien auf einmal verarbeiten",
    description:
      "Konvertiere bis zu 50 Bilder (WebP/JPG/PNG), komprimiere PDFs, wandle Audio im Stapel in MP3 um oder komprimiere Videos — alles in einem Durchgang, dann lade ein einziges ZIP herunter. 100 % in deinem Browser.",
  },
  hero: {
    title: "Stapel-Konverter",
    lead: "Lege bis zu 50 Dateien ab, wähle eine Aktion — erhalte ein einziges ZIP zurück. Alles passiert in deinem Browser.",
  },
  tabs: {
    images: "Bilder",
    pdfs: "PDFs komprimieren",
    audio: "Audio → MP3",
    videos: "Videos komprimieren",
  },
  common: {
    addMore: "Mehr hinzufügen",
    clear: "Leeren",
    downloadZip: "ZIP herunterladen",
    done: (n) => `${n} fertig`,
    failed: (n) => `${n} fehlgeschlagen`,
    loadingFfmpeg: "FFmpeg wird geladen (~30 MB) — nur beim ersten Mal.",
  },
  image: {
    dropTitle: (max) => `Lege bis zu ${max} Bilder ab`,
    dropHint: "JPG · PNG · WebP · GIF · BMP — in deinem Browser verarbeitet, in einem ZIP gebündelt",
    queued: (n) => `${n} Bild${n > 1 ? "er" : ""} in der Warteschlange`,
    targetFormat: "Zielformat",
    formatWebp: "WebP (empfohlen)",
    formatJpg: "JPG",
    formatPng: "PNG",
    quality: (q) => `Qualität · ${q}`,
    maxDimension: "Max. Abmessung (px) · 0 = beibehalten",
    processing: (done, total) => `Verarbeite ${done}/${total}…`,
    process: (n) => `${n} Bilder verarbeiten`,
    privacy: "Zu 100 % in deinem Browser verarbeitet — deine Bilder werden nie hochgeladen.",
    errDecode: "Bild konnte nicht dekodiert werden",
    errCanvas: "Canvas nicht verfügbar",
    errEncode: "Kodierung fehlgeschlagen",
  },
  pdf: {
    dropTitle: (max) => `Lege bis zu ${max} PDFs ab`,
    dropHint: "Jedes wird in JPEG-Seiten neu gerendert — größte Einsparungen bei bildlastigen oder gescannten PDFs.",
    queued: (n) => `${n} PDF${n > 1 ? "s" : ""} in der Warteschlange`,
    preset: "Komprimierungsvorgabe",
    presetStrong: "Stark (kleiner)",
    presetBalanced: "Ausgewogen",
    presetHigh: "Hohe Qualität",
    compressing: (done, total) => `Komprimiere ${done}/${total}…`,
    compress: (n) => `${n} PDFs komprimieren`,
    privacy:
      "Zu 100 % in deinem Browser verarbeitet — deine PDFs werden nie hochgeladen. Das Ergebnis ist bildbasiert (kein auswählbarer Text).",
  },
  audio: {
    dropTitle: (max) => `Lege bis zu ${max} Audiodateien ab`,
    dropHint: "MP3 · WAV · M4A · FLAC · OGG — in deinem Browser in MP3 umgewandelt",
    queued: (n) => `${n} Audiodatei${n > 1 ? "en" : ""} in der Warteschlange`,
    bitrate: "Ausgabe-Bitrate",
    bitrate128: "128 kbps · klein",
    bitrate192: "192 kbps · ausgewogen",
    bitrate256: "256 kbps · gut",
    bitrate320: "320 kbps · max",
    converting: (done, total) => `Konvertiere ${done}/${total}…`,
    convert: (n) => `${n} in MP3 konvertieren`,
    privacy: "Zu 100 % in deinem Browser über FFmpeg.wasm verarbeitet — deine Dateien werden nie hochgeladen.",
  },
  video: {
    dropTitle: (max) => `Lege bis zu ${max} Videos ab`,
    dropHint: "MP4 · MOV · MKV · WebM — in deinem Browser mit H.264 + AAC neu kodiert",
    queued: (n) => `${n} Video${n > 1 ? "s" : ""} in der Warteschlange`,
    preset: "Qualitätsvorgabe (niedrigerer CRF = größere Datei, höhere Qualität)",
    presetStrong: "Stark (CRF 32)",
    presetBalanced: "Ausgewogen (CRF 28)",
    presetHigh: "Hoch (CRF 23)",
    compressing: (done, total) => `Komprimiere ${done}/${total}…`,
    compress: (n) => `${n} Videos komprimieren`,
    privacy:
      "Zu 100 % in deinem Browser über FFmpeg.wasm verarbeitet — deine Videos werden nie hochgeladen. Große Dateien sind langsam; schneide sie am besten zuerst zu.",
  },
};

const it: BatchStrings = {
  meta: {
    title: "Convertitore in batch — Elabora 50 file in una volta",
    description:
      "Converti fino a 50 immagini (WebP/JPG/PNG), comprimi PDF, converti audio in MP3 in batch o comprimi video — tutto in un solo passaggio, poi scarica un unico ZIP. 100% nel tuo browser.",
  },
  hero: {
    title: "Convertitore in batch",
    lead: "Trascina fino a 50 file, scegli un'azione — ricevi un solo ZIP. Tutto avviene nel tuo browser.",
  },
  tabs: {
    images: "Immagini",
    pdfs: "Comprimi PDF",
    audio: "Audio → MP3",
    videos: "Comprimi video",
  },
  common: {
    addMore: "Aggiungi altri",
    clear: "Svuota",
    downloadZip: "Scarica ZIP",
    done: (n) => `${n} completat${n > 1 ? "i" : "o"}`,
    failed: (n) => `${n} fallit${n > 1 ? "i" : "o"}`,
    loadingFfmpeg: "Caricamento di FFmpeg (~30 MB) — solo la prima volta.",
  },
  image: {
    dropTitle: (max) => `Trascina fino a ${max} immagini`,
    dropHint: "JPG · PNG · WebP · GIF · BMP — elaborate nel tuo browser, raccolte in uno ZIP",
    queued: (n) => `${n} immagine${n > 1 ? "i" : ""} in coda`,
    targetFormat: "Formato di destinazione",
    formatWebp: "WebP (consigliato)",
    formatJpg: "JPG",
    formatPng: "PNG",
    quality: (q) => `Qualità · ${q}`,
    maxDimension: "Dimensione max (px) · 0 = mantieni",
    processing: (done, total) => `Elaborazione ${done}/${total}…`,
    process: (n) => `Elabora ${n} immagini`,
    privacy: "Elaborato al 100% nel tuo browser — le tue immagini non vengono mai caricate.",
    errDecode: "Impossibile decodificare l'immagine",
    errCanvas: "Canvas non disponibile",
    errEncode: "Codifica non riuscita",
  },
  pdf: {
    dropTitle: (max) => `Trascina fino a ${max} PDF`,
    dropHint: "Ciascuno viene ri-renderizzato in pagine JPEG — massimo risparmio su PDF ricchi di immagini o scansionati.",
    queued: (n) => `${n} PDF in coda`,
    preset: "Preset di compressione",
    presetStrong: "Forte (più piccolo)",
    presetBalanced: "Bilanciato",
    presetHigh: "Alta qualità",
    compressing: (done, total) => `Compressione ${done}/${total}…`,
    compress: (n) => `Comprimi ${n} PDF`,
    privacy:
      "Elaborato al 100% nel tuo browser — i tuoi PDF non vengono mai caricati. Il risultato è basato su immagini (nessun testo selezionabile).",
  },
  audio: {
    dropTitle: (max) => `Trascina fino a ${max} file audio`,
    dropHint: "MP3 · WAV · M4A · FLAC · OGG — convertiti in MP3 nel tuo browser",
    queued: (n) => `${n} file audio in coda`,
    bitrate: "Bitrate di uscita",
    bitrate128: "128 kbps · leggero",
    bitrate192: "192 kbps · bilanciato",
    bitrate256: "256 kbps · buono",
    bitrate320: "320 kbps · max",
    converting: (done, total) => `Conversione ${done}/${total}…`,
    convert: (n) => `Converti ${n} in MP3`,
    privacy: "Elaborato al 100% nel tuo browser tramite FFmpeg.wasm — i tuoi file non vengono mai caricati.",
  },
  video: {
    dropTitle: (max) => `Trascina fino a ${max} video`,
    dropHint: "MP4 · MOV · MKV · WebM — ricodificati con H.264 + AAC nel tuo browser",
    queued: (n) => `${n} video in coda`,
    preset: "Preset di qualità (CRF più basso = file più grande, qualità migliore)",
    presetStrong: "Forte (CRF 32)",
    presetBalanced: "Bilanciato (CRF 28)",
    presetHigh: "Alta (CRF 23)",
    compressing: (done, total) => `Compressione ${done}/${total}…`,
    compress: (n) => `Comprimi ${n} video`,
    privacy:
      "Elaborato al 100% nel tuo browser tramite FFmpeg.wasm — i tuoi video non vengono mai caricati. I file grandi sono lenti; valuta di tagliarli prima.",
  },
};

const nl: BatchStrings = {
  meta: {
    title: "Batchconverter — Verwerk 50 bestanden tegelijk",
    description:
      "Converteer tot 50 afbeeldingen (WebP/JPG/PNG), comprimeer PDF's, converteer audio in batch naar MP3 of comprimeer video's — alles in één keer, download daarna één ZIP. 100% in je browser.",
  },
  hero: {
    title: "Batchconverter",
    lead: "Sleep tot 50 bestanden, kies een actie — krijg één ZIP terug. Alles gebeurt in je browser.",
  },
  tabs: {
    images: "Afbeeldingen",
    pdfs: "PDF's comprimeren",
    audio: "Audio → MP3",
    videos: "Video's comprimeren",
  },
  common: {
    addMore: "Meer toevoegen",
    clear: "Wissen",
    downloadZip: "ZIP downloaden",
    done: (n) => `${n} klaar`,
    failed: (n) => `${n} mislukt`,
    loadingFfmpeg: "FFmpeg laden (~30 MB) — alleen de eerste keer.",
  },
  image: {
    dropTitle: (max) => `Sleep tot ${max} afbeeldingen`,
    dropHint: "JPG · PNG · WebP · GIF · BMP — verwerkt in je browser, gebundeld in een ZIP",
    queued: (n) => `${n} afbeelding${n > 1 ? "en" : ""} in wachtrij`,
    targetFormat: "Doelformaat",
    formatWebp: "WebP (aanbevolen)",
    formatJpg: "JPG",
    formatPng: "PNG",
    quality: (q) => `Kwaliteit · ${q}`,
    maxDimension: "Max. afmeting (px) · 0 = behouden",
    processing: (done, total) => `Verwerken ${done}/${total}…`,
    process: (n) => `${n} afbeeldingen verwerken`,
    privacy: "Voor 100% in je browser verwerkt — je afbeeldingen worden nooit geüpload.",
    errDecode: "Kan afbeelding niet decoderen",
    errCanvas: "Canvas niet beschikbaar",
    errEncode: "Coderen mislukt",
  },
  pdf: {
    dropTitle: (max) => `Sleep tot ${max} PDF's`,
    dropHint: "Elk wordt opnieuw weergegeven als JPEG-pagina's — grootste winst bij beeldrijke of gescande PDF's.",
    queued: (n) => `${n} PDF${n > 1 ? "'s" : ""} in wachtrij`,
    preset: "Compressievoorinstelling",
    presetStrong: "Sterk (kleiner)",
    presetBalanced: "Gebalanceerd",
    presetHigh: "Hoge kwaliteit",
    compressing: (done, total) => `Comprimeren ${done}/${total}…`,
    compress: (n) => `${n} PDF's comprimeren`,
    privacy:
      "Voor 100% in je browser verwerkt — je PDF's worden nooit geüpload. De uitvoer is op afbeeldingen gebaseerd (geen selecteerbare tekst).",
  },
  audio: {
    dropTitle: (max) => `Sleep tot ${max} audiobestanden`,
    dropHint: "MP3 · WAV · M4A · FLAC · OGG — in je browser naar MP3 geconverteerd",
    queued: (n) => `${n} audiobestand${n > 1 ? "en" : ""} in wachtrij`,
    bitrate: "Uitvoerbitrate",
    bitrate128: "128 kbps · klein",
    bitrate192: "192 kbps · gebalanceerd",
    bitrate256: "256 kbps · goed",
    bitrate320: "320 kbps · max",
    converting: (done, total) => `Converteren ${done}/${total}…`,
    convert: (n) => `${n} naar MP3 converteren`,
    privacy: "Voor 100% in je browser verwerkt via FFmpeg.wasm — je bestanden worden nooit geüpload.",
  },
  video: {
    dropTitle: (max) => `Sleep tot ${max} video's`,
    dropHint: "MP4 · MOV · MKV · WebM — opnieuw gecodeerd met H.264 + AAC in je browser",
    queued: (n) => `${n} video${n > 1 ? "'s" : ""} in wachtrij`,
    preset: "Kwaliteitsvoorinstelling (lagere CRF = groter bestand, hogere kwaliteit)",
    presetStrong: "Sterk (CRF 32)",
    presetBalanced: "Gebalanceerd (CRF 28)",
    presetHigh: "Hoog (CRF 23)",
    compressing: (done, total) => `Comprimeren ${done}/${total}…`,
    compress: (n) => `${n} video's comprimeren`,
    privacy:
      "Voor 100% in je browser verwerkt via FFmpeg.wasm — je video's worden nooit geüpload. Grote bestanden zijn traag; overweeg ze eerst in te korten.",
  },
};

const ja: BatchStrings = {
  meta: {
    title: "一括変換ツール — 50ファイルを一度に処理",
    description:
      "最大50枚の画像（WebP/JPG/PNG）を変換、PDFを圧縮、音声を一括でMP3に変換、または動画を圧縮 — すべて一度の処理で行い、1つのZIPでダウンロード。100%ブラウザ内で完結。",
  },
  hero: {
    title: "一括変換ツール",
    lead: "最大50ファイルをドロップしてアクションを選択 — 1つのZIPで受け取れます。すべてブラウザ内で処理されます。",
  },
  tabs: {
    images: "画像",
    pdfs: "PDFを圧縮",
    audio: "音声 → MP3",
    videos: "動画を圧縮",
  },
  common: {
    addMore: "追加",
    clear: "クリア",
    downloadZip: "ZIPをダウンロード",
    done: (n) => `${n}件完了`,
    failed: (n) => `${n}件失敗`,
    loadingFfmpeg: "FFmpeg（約30 MB）を読み込み中 — 初回のみ。",
  },
  image: {
    dropTitle: (max) => `最大${max}枚の画像をドロップ`,
    dropHint: "JPG · PNG · WebP · GIF · BMP — ブラウザ内で処理し、ZIPにまとめます",
    queued: (n) => `${n}枚の画像を待機中`,
    targetFormat: "出力フォーマット",
    formatWebp: "WebP（推奨）",
    formatJpg: "JPG",
    formatPng: "PNG",
    quality: (q) => `品質 · ${q}`,
    maxDimension: "最大寸法（px）· 0 = 維持",
    processing: (done, total) => `処理中 ${done}/${total}…`,
    process: (n) => `${n}枚の画像を処理`,
    privacy: "100%ブラウザ内で処理 — 画像がアップロードされることはありません。",
    errDecode: "画像をデコードできませんでした",
    errCanvas: "Canvasが利用できません",
    errEncode: "エンコードに失敗しました",
  },
  pdf: {
    dropTitle: (max) => `最大${max}件のPDFをドロップ`,
    dropHint: "各ファイルをJPEGページに再レンダリング — 画像が多いPDFやスキャンPDFで最大の効果。",
    queued: (n) => `${n}件のPDFを待機中`,
    preset: "圧縮プリセット",
    presetStrong: "強（より小さく）",
    presetBalanced: "バランス",
    presetHigh: "高品質",
    compressing: (done, total) => `圧縮中 ${done}/${total}…`,
    compress: (n) => `${n}件のPDFを圧縮`,
    privacy:
      "100%ブラウザ内で処理 — PDFがアップロードされることはありません。出力は画像ベースです（選択可能なテキストはありません）。",
  },
  audio: {
    dropTitle: (max) => `最大${max}件の音声ファイルをドロップ`,
    dropHint: "MP3 · WAV · M4A · FLAC · OGG — ブラウザ内でMP3に変換",
    queued: (n) => `${n}件の音声ファイルを待機中`,
    bitrate: "出力ビットレート",
    bitrate128: "128 kbps · 小",
    bitrate192: "192 kbps · バランス",
    bitrate256: "256 kbps · 良",
    bitrate320: "320 kbps · 最大",
    converting: (done, total) => `変換中 ${done}/${total}…`,
    convert: (n) => `${n}件をMP3に変換`,
    privacy: "FFmpeg.wasmで100%ブラウザ内で処理 — ファイルがアップロードされることはありません。",
  },
  video: {
    dropTitle: (max) => `最大${max}件の動画をドロップ`,
    dropHint: "MP4 · MOV · MKV · WebM — ブラウザ内でH.264 + AACに再エンコード",
    queued: (n) => `${n}件の動画を待機中`,
    preset: "品質プリセット（CRFが低いほどファイルが大きく高品質）",
    presetStrong: "強（CRF 32）",
    presetBalanced: "バランス（CRF 28）",
    presetHigh: "高（CRF 23）",
    compressing: (done, total) => `圧縮中 ${done}/${total}…`,
    compress: (n) => `${n}件の動画を圧縮`,
    privacy:
      "FFmpeg.wasmで100%ブラウザ内で処理 — 動画がアップロードされることはありません。大きなファイルは時間がかかります。先にトリミングを検討してください。",
  },
};

const zh: BatchStrings = {
  meta: {
    title: "批量转换器 — 一次处理 50 个文件",
    description:
      "最多转换 50 张图片（WebP/JPG/PNG）、压缩 PDF、批量将音频转换为 MP3 或压缩视频 — 一次处理完成，然后下载单个 ZIP。100% 在浏览器中运行。",
  },
  hero: {
    title: "批量转换器",
    lead: "拖入最多 50 个文件，选择一个操作 — 获得一个 ZIP。一切都在您的浏览器中完成。",
  },
  tabs: {
    images: "图片",
    pdfs: "压缩 PDF",
    audio: "音频 → MP3",
    videos: "压缩视频",
  },
  common: {
    addMore: "添加更多",
    clear: "清除",
    downloadZip: "下载 ZIP",
    done: (n) => `${n} 个完成`,
    failed: (n) => `${n} 个失败`,
    loadingFfmpeg: "正在加载 FFmpeg（约 30 MB）— 仅首次。",
  },
  image: {
    dropTitle: (max) => `拖入最多 ${max} 张图片`,
    dropHint: "JPG · PNG · WebP · GIF · BMP — 在您的浏览器中处理，打包成 ZIP",
    queued: (n) => `${n} 张图片排队中`,
    targetFormat: "目标格式",
    formatWebp: "WebP（推荐）",
    formatJpg: "JPG",
    formatPng: "PNG",
    quality: (q) => `质量 · ${q}`,
    maxDimension: "最大尺寸（px）· 0 = 保持",
    processing: (done, total) => `处理中 ${done}/${total}…`,
    process: (n) => `处理 ${n} 张图片`,
    privacy: "100% 在您的浏览器中处理 — 您的图片绝不会被上传。",
    errDecode: "无法解码图片",
    errCanvas: "Canvas 不可用",
    errEncode: "编码失败",
  },
  pdf: {
    dropTitle: (max) => `拖入最多 ${max} 个 PDF`,
    dropHint: "每个都会重新渲染为 JPEG 页面 — 对图片密集或扫描的 PDF 效果最佳。",
    queued: (n) => `${n} 个 PDF 排队中`,
    preset: "压缩预设",
    presetStrong: "强（更小）",
    presetBalanced: "平衡",
    presetHigh: "高质量",
    compressing: (done, total) => `压缩中 ${done}/${total}…`,
    compress: (n) => `压缩 ${n} 个 PDF`,
    privacy:
      "100% 在您的浏览器中处理 — 您的 PDF 绝不会被上传。输出基于图片（没有可选文本）。",
  },
  audio: {
    dropTitle: (max) => `拖入最多 ${max} 个音频文件`,
    dropHint: "MP3 · WAV · M4A · FLAC · OGG — 在您的浏览器中转换为 MP3",
    queued: (n) => `${n} 个音频文件排队中`,
    bitrate: "输出比特率",
    bitrate128: "128 kbps · 小",
    bitrate192: "192 kbps · 平衡",
    bitrate256: "256 kbps · 良好",
    bitrate320: "320 kbps · 最高",
    converting: (done, total) => `转换中 ${done}/${total}…`,
    convert: (n) => `将 ${n} 个转换为 MP3`,
    privacy: "通过 FFmpeg.wasm 在您的浏览器中 100% 处理 — 您的文件绝不会被上传。",
  },
  video: {
    dropTitle: (max) => `拖入最多 ${max} 个视频`,
    dropHint: "MP4 · MOV · MKV · WebM — 在您的浏览器中以 H.264 + AAC 重新编码",
    queued: (n) => `${n} 个视频排队中`,
    preset: "质量预设（CRF 越低 = 文件越大，质量越高）",
    presetStrong: "强（CRF 32）",
    presetBalanced: "平衡（CRF 28）",
    presetHigh: "高（CRF 23）",
    compressing: (done, total) => `压缩中 ${done}/${total}…`,
    compress: (n) => `压缩 ${n} 个视频`,
    privacy:
      "通过 FFmpeg.wasm 在您的浏览器中 100% 处理 — 您的视频绝不会被上传。大文件较慢；建议先裁剪。",
  },
};

const ko: BatchStrings = {
  meta: {
    title: "일괄 변환기 — 한 번에 50개 파일 처리",
    description:
      "최대 50개 이미지(WebP/JPG/PNG) 변환, PDF 압축, 오디오를 일괄로 MP3로 변환, 또는 동영상 압축 — 모두 한 번에 처리한 후 하나의 ZIP으로 다운로드. 100% 브라우저 내에서 처리됩니다.",
  },
  hero: {
    title: "일괄 변환기",
    lead: "최대 50개 파일을 끌어다 놓고 작업을 선택하세요 — 하나의 ZIP으로 받습니다. 모든 처리는 브라우저에서 이루어집니다.",
  },
  tabs: {
    images: "이미지",
    pdfs: "PDF 압축",
    audio: "오디오 → MP3",
    videos: "동영상 압축",
  },
  common: {
    addMore: "더 추가",
    clear: "지우기",
    downloadZip: "ZIP 다운로드",
    done: (n) => `${n}개 완료`,
    failed: (n) => `${n}개 실패`,
    loadingFfmpeg: "FFmpeg(~30 MB) 로딩 중 — 최초 1회만.",
  },
  image: {
    dropTitle: (max) => `최대 ${max}개 이미지를 끌어다 놓으세요`,
    dropHint: "JPG · PNG · WebP · GIF · BMP — 브라우저에서 처리하여 ZIP으로 묶습니다",
    queued: (n) => `이미지 ${n}개 대기 중`,
    targetFormat: "대상 형식",
    formatWebp: "WebP (권장)",
    formatJpg: "JPG",
    formatPng: "PNG",
    quality: (q) => `품질 · ${q}`,
    maxDimension: "최대 크기(px) · 0 = 유지",
    processing: (done, total) => `처리 중 ${done}/${total}…`,
    process: (n) => `이미지 ${n}개 처리`,
    privacy: "100% 브라우저에서 처리 — 이미지는 절대 업로드되지 않습니다.",
    errDecode: "이미지를 디코딩할 수 없습니다",
    errCanvas: "Canvas를 사용할 수 없습니다",
    errEncode: "인코딩 실패",
  },
  pdf: {
    dropTitle: (max) => `최대 ${max}개 PDF를 끌어다 놓으세요`,
    dropHint: "각 PDF는 JPEG 페이지로 다시 렌더링됩니다 — 이미지가 많거나 스캔된 PDF에서 효과가 가장 큽니다.",
    queued: (n) => `PDF ${n}개 대기 중`,
    preset: "압축 프리셋",
    presetStrong: "강함 (더 작게)",
    presetBalanced: "균형",
    presetHigh: "고품질",
    compressing: (done, total) => `압축 중 ${done}/${total}…`,
    compress: (n) => `PDF ${n}개 압축`,
    privacy:
      "100% 브라우저에서 처리 — PDF는 절대 업로드되지 않습니다. 결과물은 이미지 기반입니다(선택 가능한 텍스트 없음).",
  },
  audio: {
    dropTitle: (max) => `최대 ${max}개 오디오 파일을 끌어다 놓으세요`,
    dropHint: "MP3 · WAV · M4A · FLAC · OGG — 브라우저에서 MP3로 변환",
    queued: (n) => `오디오 파일 ${n}개 대기 중`,
    bitrate: "출력 비트레이트",
    bitrate128: "128 kbps · 작음",
    bitrate192: "192 kbps · 균형",
    bitrate256: "256 kbps · 좋음",
    bitrate320: "320 kbps · 최대",
    converting: (done, total) => `변환 중 ${done}/${total}…`,
    convert: (n) => `${n}개를 MP3로 변환`,
    privacy: "FFmpeg.wasm을 통해 100% 브라우저에서 처리 — 파일은 절대 업로드되지 않습니다.",
  },
  video: {
    dropTitle: (max) => `최대 ${max}개 동영상을 끌어다 놓으세요`,
    dropHint: "MP4 · MOV · MKV · WebM — 브라우저에서 H.264 + AAC로 다시 인코딩",
    queued: (n) => `동영상 ${n}개 대기 중`,
    preset: "품질 프리셋 (CRF가 낮을수록 파일이 크고 품질이 높음)",
    presetStrong: "강함 (CRF 32)",
    presetBalanced: "균형 (CRF 28)",
    presetHigh: "고품질 (CRF 23)",
    compressing: (done, total) => `압축 중 ${done}/${total}…`,
    compress: (n) => `동영상 ${n}개 압축`,
    privacy:
      "FFmpeg.wasm을 통해 100% 브라우저에서 처리 — 동영상은 절대 업로드되지 않습니다. 큰 파일은 느립니다. 먼저 잘라내는 것을 고려하세요.",
  },
};

const ar: BatchStrings = {
  meta: {
    title: "محول الدفعات — عالج 50 ملفًا دفعة واحدة",
    description:
      "حوّل حتى 50 صورة (WebP/JPG/PNG)، اضغط ملفات PDF، حوّل الصوت إلى MP3 دفعة واحدة، أو اضغط مقاطع الفيديو — كل ذلك في تمريرة واحدة، ثم نزّل ملف ZIP واحدًا. 100% داخل متصفحك.",
  },
  hero: {
    title: "محول الدفعات",
    lead: "أفلِت حتى 50 ملفًا، اختر إجراءً — واحصل على ملف ZIP واحد. كل شيء يحدث داخل متصفحك.",
  },
  tabs: {
    images: "الصور",
    pdfs: "ضغط ملفات PDF",
    audio: "الصوت → MP3",
    videos: "ضغط الفيديو",
  },
  common: {
    addMore: "إضافة المزيد",
    clear: "مسح",
    downloadZip: "تنزيل ZIP",
    done: (n) => `${n} مكتمل`,
    failed: (n) => `${n} فشل`,
    loadingFfmpeg: "جارٍ تحميل FFmpeg (~30 ميجابايت) — في المرة الأولى فقط.",
  },
  image: {
    dropTitle: (max) => `أفلِت حتى ${max} صورة`,
    dropHint: "JPG · PNG · WebP · GIF · BMP — تُعالَج داخل متصفحك وتُجمَّع في ملف ZIP",
    queued: (n) => `${n} صورة في قائمة الانتظار`,
    targetFormat: "الصيغة الهدف",
    formatWebp: "WebP (موصى به)",
    formatJpg: "JPG",
    formatPng: "PNG",
    quality: (q) => `الجودة · ${q}`,
    maxDimension: "أقصى أبعاد (بكسل) · 0 = الإبقاء",
    processing: (done, total) => `جارٍ المعالجة ${done}/${total}…`,
    process: (n) => `معالجة ${n} صورة`,
    privacy: "تتم المعالجة 100% داخل متصفحك — لا يتم رفع صورك أبدًا.",
    errDecode: "تعذّر فك ترميز الصورة",
    errCanvas: "Canvas غير متوفر",
    errEncode: "فشل الترميز",
  },
  pdf: {
    dropTitle: (max) => `أفلِت حتى ${max} ملف PDF`,
    dropHint: "يُعاد عرض كل ملف كصفحات JPEG — أكبر مكسب في ملفات PDF الغنية بالصور أو الممسوحة ضوئيًا.",
    queued: (n) => `${n} ملف PDF في قائمة الانتظار`,
    preset: "إعداد الضغط المسبق",
    presetStrong: "قوي (أصغر)",
    presetBalanced: "متوازن",
    presetHigh: "جودة عالية",
    compressing: (done, total) => `جارٍ الضغط ${done}/${total}…`,
    compress: (n) => `ضغط ${n} ملف PDF`,
    privacy:
      "تتم المعالجة 100% داخل متصفحك — لا يتم رفع ملفات PDF أبدًا. الناتج قائم على الصور (لا يوجد نص قابل للتحديد).",
  },
  audio: {
    dropTitle: (max) => `أفلِت حتى ${max} ملف صوتي`,
    dropHint: "MP3 · WAV · M4A · FLAC · OGG — تُحوَّل إلى MP3 داخل متصفحك",
    queued: (n) => `${n} ملف صوتي في قائمة الانتظار`,
    bitrate: "معدل البت للإخراج",
    bitrate128: "128 kbps · صغير",
    bitrate192: "192 kbps · متوازن",
    bitrate256: "256 kbps · جيد",
    bitrate320: "320 kbps · الأقصى",
    converting: (done, total) => `جارٍ التحويل ${done}/${total}…`,
    convert: (n) => `تحويل ${n} إلى MP3`,
    privacy: "تتم المعالجة 100% داخل متصفحك عبر FFmpeg.wasm — لا يتم رفع ملفاتك أبدًا.",
  },
  video: {
    dropTitle: (max) => `أفلِت حتى ${max} مقطع فيديو`,
    dropHint: "MP4 · MOV · MKV · WebM — يُعاد ترميزها بـ H.264 + AAC داخل متصفحك",
    queued: (n) => `${n} مقطع فيديو في قائمة الانتظار`,
    preset: "إعداد الجودة المسبق (CRF أقل = ملف أكبر، جودة أعلى)",
    presetStrong: "قوي (CRF 32)",
    presetBalanced: "متوازن (CRF 28)",
    presetHigh: "عالٍ (CRF 23)",
    compressing: (done, total) => `جارٍ الضغط ${done}/${total}…`,
    compress: (n) => `ضغط ${n} مقطع فيديو`,
    privacy:
      "تتم المعالجة 100% داخل متصفحك عبر FFmpeg.wasm — لا يتم رفع مقاطع الفيديو أبدًا. الملفات الكبيرة بطيئة؛ يُفضّل قصها أولًا.",
  },
};

const ru: BatchStrings = {
  meta: {
    title: "Пакетный конвертер — обработка 50 файлов за раз",
    description:
      "Конвертируйте до 50 изображений (WebP/JPG/PNG), сжимайте PDF, пакетно конвертируйте аудио в MP3 или сжимайте видео — всё за один проход, затем скачайте один ZIP. 100% в вашем браузере.",
  },
  hero: {
    title: "Пакетный конвертер",
    lead: "Перетащите до 50 файлов, выберите действие — получите один ZIP. Всё происходит в вашем браузере.",
  },
  tabs: {
    images: "Изображения",
    pdfs: "Сжать PDF",
    audio: "Аудио → MP3",
    videos: "Сжать видео",
  },
  common: {
    addMore: "Добавить ещё",
    clear: "Очистить",
    downloadZip: "Скачать ZIP",
    done: (n) => `${n} готово`,
    failed: (n) => `${n} не удалось`,
    loadingFfmpeg: "Загрузка FFmpeg (~30 МБ) — только в первый раз.",
  },
  image: {
    dropTitle: (max) => `Перетащите до ${max} изображений`,
    dropHint: "JPG · PNG · WebP · GIF · BMP — обрабатываются в браузере и упаковываются в ZIP",
    queued: (n) => `${n} изображени${n > 1 ? "й" : "е"} в очереди`,
    targetFormat: "Целевой формат",
    formatWebp: "WebP (рекомендуется)",
    formatJpg: "JPG",
    formatPng: "PNG",
    quality: (q) => `Качество · ${q}`,
    maxDimension: "Макс. размер (px) · 0 = сохранить",
    processing: (done, total) => `Обработка ${done}/${total}…`,
    process: (n) => `Обработать ${n} изображений`,
    privacy: "Обрабатывается на 100% в вашем браузере — ваши изображения никогда не загружаются.",
    errDecode: "Не удалось декодировать изображение",
    errCanvas: "Canvas недоступен",
    errEncode: "Ошибка кодирования",
  },
  pdf: {
    dropTitle: (max) => `Перетащите до ${max} PDF`,
    dropHint: "Каждый перерисовывается в JPEG-страницы — наибольший выигрыш на PDF с большим количеством изображений или отсканированных.",
    queued: (n) => `${n} PDF в очереди`,
    preset: "Пресет сжатия",
    presetStrong: "Сильное (меньше)",
    presetBalanced: "Сбалансированное",
    presetHigh: "Высокое качество",
    compressing: (done, total) => `Сжатие ${done}/${total}…`,
    compress: (n) => `Сжать ${n} PDF`,
    privacy:
      "Обрабатывается на 100% в вашем браузере — ваши PDF никогда не загружаются. Результат основан на изображениях (без выделяемого текста).",
  },
  audio: {
    dropTitle: (max) => `Перетащите до ${max} аудиофайлов`,
    dropHint: "MP3 · WAV · M4A · FLAC · OGG — конвертируются в MP3 в вашем браузере",
    queued: (n) => `${n} аудиофайл${n > 1 ? "ов" : ""} в очереди`,
    bitrate: "Битрейт вывода",
    bitrate128: "128 kbps · небольшой",
    bitrate192: "192 kbps · сбалансированный",
    bitrate256: "256 kbps · хороший",
    bitrate320: "320 kbps · макс",
    converting: (done, total) => `Конвертация ${done}/${total}…`,
    convert: (n) => `Конвертировать ${n} в MP3`,
    privacy: "Обрабатывается на 100% в вашем браузере через FFmpeg.wasm — ваши файлы никогда не загружаются.",
  },
  video: {
    dropTitle: (max) => `Перетащите до ${max} видео`,
    dropHint: "MP4 · MOV · MKV · WebM — перекодируются в H.264 + AAC в вашем браузере",
    queued: (n) => `${n} видео в очереди`,
    preset: "Пресет качества (ниже CRF = больше файл, выше качество)",
    presetStrong: "Сильное (CRF 32)",
    presetBalanced: "Сбалансированное (CRF 28)",
    presetHigh: "Высокое (CRF 23)",
    compressing: (done, total) => `Сжатие ${done}/${total}…`,
    compress: (n) => `Сжать ${n} видео`,
    privacy:
      "Обрабатывается на 100% в вашем браузере через FFmpeg.wasm — ваши видео никогда не загружаются. Большие файлы обрабатываются медленно; сначала лучше обрезать.",
  },
};

const hi: BatchStrings = {
  meta: {
    title: "बैच कन्वर्टर — एक साथ 50 फ़ाइलें प्रोसेस करें",
    description:
      "50 तक छवियाँ (WebP/JPG/PNG) कन्वर्ट करें, PDF संपीड़ित करें, ऑडियो को बैच में MP3 में बदलें, या वीडियो संपीड़ित करें — सब एक ही बार में, फिर एक ही ZIP डाउनलोड करें. 100% आपके ब्राउज़र में.",
  },
  hero: {
    title: "बैच कन्वर्टर",
    lead: "50 तक फ़ाइलें छोड़ें, एक क्रिया चुनें — एक ही ZIP वापस पाएँ. सब कुछ आपके ब्राउज़र में होता है.",
  },
  tabs: {
    images: "छवियाँ",
    pdfs: "PDF संपीड़ित करें",
    audio: "ऑडियो → MP3",
    videos: "वीडियो संपीड़ित करें",
  },
  common: {
    addMore: "और जोड़ें",
    clear: "साफ़ करें",
    downloadZip: "ZIP डाउनलोड करें",
    done: (n) => `${n} पूर्ण`,
    failed: (n) => `${n} विफल`,
    loadingFfmpeg: "FFmpeg (~30 MB) लोड हो रहा है — केवल पहली बार.",
  },
  image: {
    dropTitle: (max) => `${max} तक छवियाँ छोड़ें`,
    dropHint: "JPG · PNG · WebP · GIF · BMP — आपके ब्राउज़र में प्रोसेस होती हैं, ZIP में पैक होती हैं",
    queued: (n) => `${n} छवि${n > 1 ? "याँ" : ""} कतार में`,
    targetFormat: "लक्ष्य प्रारूप",
    formatWebp: "WebP (अनुशंसित)",
    formatJpg: "JPG",
    formatPng: "PNG",
    quality: (q) => `गुणवत्ता · ${q}`,
    maxDimension: "अधिकतम आयाम (px) · 0 = रखें",
    processing: (done, total) => `प्रोसेस हो रहा है ${done}/${total}…`,
    process: (n) => `${n} छवियाँ प्रोसेस करें`,
    privacy: "100% आपके ब्राउज़र में प्रोसेस — आपकी छवियाँ कभी अपलोड नहीं होतीं.",
    errDecode: "छवि डिकोड नहीं हो सकी",
    errCanvas: "Canvas उपलब्ध नहीं",
    errEncode: "एन्कोडिंग विफल",
  },
  pdf: {
    dropTitle: (max) => `${max} तक PDF छोड़ें`,
    dropHint: "प्रत्येक को JPEG पृष्ठों के रूप में फिर से रेंडर किया जाता है — छवि-भारी या स्कैन की गई PDF पर सबसे अधिक लाभ.",
    queued: (n) => `${n} PDF कतार में`,
    preset: "संपीड़न प्रीसेट",
    presetStrong: "मज़बूत (छोटा)",
    presetBalanced: "संतुलित",
    presetHigh: "उच्च गुणवत्ता",
    compressing: (done, total) => `संपीड़ित हो रहा है ${done}/${total}…`,
    compress: (n) => `${n} PDF संपीड़ित करें`,
    privacy:
      "100% आपके ब्राउज़र में प्रोसेस — आपकी PDF कभी अपलोड नहीं होतीं. आउटपुट छवि-आधारित है (कोई चयन-योग्य टेक्स्ट नहीं).",
  },
  audio: {
    dropTitle: (max) => `${max} तक ऑडियो फ़ाइलें छोड़ें`,
    dropHint: "MP3 · WAV · M4A · FLAC · OGG — आपके ब्राउज़र में MP3 में कन्वर्ट",
    queued: (n) => `${n} ऑडियो फ़ाइल${n > 1 ? "ें" : ""} कतार में`,
    bitrate: "आउटपुट बिटरेट",
    bitrate128: "128 kbps · छोटा",
    bitrate192: "192 kbps · संतुलित",
    bitrate256: "256 kbps · अच्छा",
    bitrate320: "320 kbps · अधिकतम",
    converting: (done, total) => `कन्वर्ट हो रहा है ${done}/${total}…`,
    convert: (n) => `${n} को MP3 में कन्वर्ट करें`,
    privacy: "FFmpeg.wasm के ज़रिए 100% आपके ब्राउज़र में प्रोसेस — आपकी फ़ाइलें कभी अपलोड नहीं होतीं.",
  },
  video: {
    dropTitle: (max) => `${max} तक वीडियो छोड़ें`,
    dropHint: "MP4 · MOV · MKV · WebM — आपके ब्राउज़र में H.264 + AAC के साथ फिर से एन्कोड",
    queued: (n) => `${n} वीडियो कतार में`,
    preset: "गुणवत्ता प्रीसेट (कम CRF = बड़ी फ़ाइल, उच्च गुणवत्ता)",
    presetStrong: "मज़बूत (CRF 32)",
    presetBalanced: "संतुलित (CRF 28)",
    presetHigh: "उच्च (CRF 23)",
    compressing: (done, total) => `संपीड़ित हो रहा है ${done}/${total}…`,
    compress: (n) => `${n} वीडियो संपीड़ित करें`,
    privacy:
      "FFmpeg.wasm के ज़रिए 100% आपके ब्राउज़र में प्रोसेस — आपके वीडियो कभी अपलोड नहीं होते. बड़ी फ़ाइलें धीमी होती हैं; पहले काटने पर विचार करें.",
  },
};

const tr: BatchStrings = {
  meta: {
    title: "Toplu Dönüştürücü — Aynı anda 50 dosya işleyin",
    description:
      "50'ye kadar görseli (WebP/JPG/PNG) dönüştürün, PDF'leri sıkıştırın, sesi toplu olarak MP3'e dönüştürün veya videoları sıkıştırın — hepsi tek seferde, ardından tek bir ZIP indirin. %100 tarayıcınızda.",
  },
  hero: {
    title: "Toplu Dönüştürücü",
    lead: "50'ye kadar dosya bırakın, bir işlem seçin — tek bir ZIP alın. Her şey tarayıcınızda olur.",
  },
  tabs: {
    images: "Görseller",
    pdfs: "PDF sıkıştır",
    audio: "Ses → MP3",
    videos: "Video sıkıştır",
  },
  common: {
    addMore: "Daha fazla ekle",
    clear: "Temizle",
    downloadZip: "ZIP indir",
    done: (n) => `${n} tamamlandı`,
    failed: (n) => `${n} başarısız`,
    loadingFfmpeg: "FFmpeg yükleniyor (~30 MB) — yalnızca ilk seferde.",
  },
  image: {
    dropTitle: (max) => `${max} adede kadar görsel bırakın`,
    dropHint: "JPG · PNG · WebP · GIF · BMP — tarayıcınızda işlenir, bir ZIP'te paketlenir",
    queued: (n) => `${n} görsel sırada`,
    targetFormat: "Hedef format",
    formatWebp: "WebP (önerilen)",
    formatJpg: "JPG",
    formatPng: "PNG",
    quality: (q) => `Kalite · ${q}`,
    maxDimension: "Maks. boyut (px) · 0 = koru",
    processing: (done, total) => `İşleniyor ${done}/${total}…`,
    process: (n) => `${n} görseli işle`,
    privacy: "%100 tarayıcınızda işlenir — görselleriniz asla yüklenmez.",
    errDecode: "Görsel çözümlenemedi",
    errCanvas: "Canvas kullanılamıyor",
    errEncode: "Kodlama başarısız",
  },
  pdf: {
    dropTitle: (max) => `${max} adede kadar PDF bırakın`,
    dropHint: "Her biri JPEG sayfalarına yeniden işlenir — görsel ağırlıklı veya taranmış PDF'lerde en büyük kazanç.",
    queued: (n) => `${n} PDF sırada`,
    preset: "Sıkıştırma ön ayarı",
    presetStrong: "Güçlü (daha küçük)",
    presetBalanced: "Dengeli",
    presetHigh: "Yüksek kalite",
    compressing: (done, total) => `Sıkıştırılıyor ${done}/${total}…`,
    compress: (n) => `${n} PDF'yi sıkıştır`,
    privacy:
      "%100 tarayıcınızda işlenir — PDF'leriniz asla yüklenmez. Çıktı görsel tabanlıdır (seçilebilir metin yok).",
  },
  audio: {
    dropTitle: (max) => `${max} adede kadar ses dosyası bırakın`,
    dropHint: "MP3 · WAV · M4A · FLAC · OGG — tarayıcınızda MP3'e dönüştürülür",
    queued: (n) => `${n} ses dosyası sırada`,
    bitrate: "Çıkış bit hızı",
    bitrate128: "128 kbps · küçük",
    bitrate192: "192 kbps · dengeli",
    bitrate256: "256 kbps · iyi",
    bitrate320: "320 kbps · maks",
    converting: (done, total) => `Dönüştürülüyor ${done}/${total}…`,
    convert: (n) => `${n} dosyayı MP3'e dönüştür`,
    privacy: "FFmpeg.wasm aracılığıyla %100 tarayıcınızda işlenir — dosyalarınız asla yüklenmez.",
  },
  video: {
    dropTitle: (max) => `${max} adede kadar video bırakın`,
    dropHint: "MP4 · MOV · MKV · WebM — tarayıcınızda H.264 + AAC ile yeniden kodlanır",
    queued: (n) => `${n} video sırada`,
    preset: "Kalite ön ayarı (düşük CRF = daha büyük dosya, daha yüksek kalite)",
    presetStrong: "Güçlü (CRF 32)",
    presetBalanced: "Dengeli (CRF 28)",
    presetHigh: "Yüksek (CRF 23)",
    compressing: (done, total) => `Sıkıştırılıyor ${done}/${total}…`,
    compress: (n) => `${n} videoyu sıkıştır`,
    privacy:
      "FFmpeg.wasm aracılığıyla %100 tarayıcınızda işlenir — videolarınız asla yüklenmez. Büyük dosyalar yavaştır; önce kırpmayı düşünün.",
  },
};

const id: BatchStrings = {
  meta: {
    title: "Konverter Massal — Proses 50 file sekaligus",
    description:
      "Konversi hingga 50 gambar (WebP/JPG/PNG), kompres PDF, konversi audio ke MP3 secara massal, atau kompres video — semua dalam satu langkah, lalu unduh satu ZIP. 100% di browser Anda.",
  },
  hero: {
    title: "Konverter Massal",
    lead: "Jatuhkan hingga 50 file, pilih tindakan — dapatkan satu ZIP. Semuanya terjadi di browser Anda.",
  },
  tabs: {
    images: "Gambar",
    pdfs: "Kompres PDF",
    audio: "Audio → MP3",
    videos: "Kompres video",
  },
  common: {
    addMore: "Tambah lagi",
    clear: "Bersihkan",
    downloadZip: "Unduh ZIP",
    done: (n) => `${n} selesai`,
    failed: (n) => `${n} gagal`,
    loadingFfmpeg: "Memuat FFmpeg (~30 MB) — hanya pertama kali.",
  },
  image: {
    dropTitle: (max) => `Jatuhkan hingga ${max} gambar`,
    dropHint: "JPG · PNG · WebP · GIF · BMP — diproses di browser Anda, dikemas dalam ZIP",
    queued: (n) => `${n} gambar dalam antrean`,
    targetFormat: "Format tujuan",
    formatWebp: "WebP (disarankan)",
    formatJpg: "JPG",
    formatPng: "PNG",
    quality: (q) => `Kualitas · ${q}`,
    maxDimension: "Dimensi maks (px) · 0 = pertahankan",
    processing: (done, total) => `Memproses ${done}/${total}…`,
    process: (n) => `Proses ${n} gambar`,
    privacy: "Diproses 100% di browser Anda — gambar Anda tidak pernah diunggah.",
    errDecode: "Tidak dapat mendekode gambar",
    errCanvas: "Canvas tidak tersedia",
    errEncode: "Pengodean gagal",
  },
  pdf: {
    dropTitle: (max) => `Jatuhkan hingga ${max} PDF`,
    dropHint: "Setiap file dirender ulang menjadi halaman JPEG — penghematan terbesar pada PDF yang penuh gambar atau hasil pindaian.",
    queued: (n) => `${n} PDF dalam antrean`,
    preset: "Prasetel kompresi",
    presetStrong: "Kuat (lebih kecil)",
    presetBalanced: "Seimbang",
    presetHigh: "Kualitas tinggi",
    compressing: (done, total) => `Mengompres ${done}/${total}…`,
    compress: (n) => `Kompres ${n} PDF`,
    privacy:
      "Diproses 100% di browser Anda — PDF Anda tidak pernah diunggah. Hasilnya berbasis gambar (tanpa teks yang dapat dipilih).",
  },
  audio: {
    dropTitle: (max) => `Jatuhkan hingga ${max} file audio`,
    dropHint: "MP3 · WAV · M4A · FLAC · OGG — dikonversi ke MP3 di browser Anda",
    queued: (n) => `${n} file audio dalam antrean`,
    bitrate: "Bitrate keluaran",
    bitrate128: "128 kbps · kecil",
    bitrate192: "192 kbps · seimbang",
    bitrate256: "256 kbps · bagus",
    bitrate320: "320 kbps · maks",
    converting: (done, total) => `Mengonversi ${done}/${total}…`,
    convert: (n) => `Konversi ${n} ke MP3`,
    privacy: "Diproses 100% di browser Anda via FFmpeg.wasm — file Anda tidak pernah diunggah.",
  },
  video: {
    dropTitle: (max) => `Jatuhkan hingga ${max} video`,
    dropHint: "MP4 · MOV · MKV · WebM — dikodekan ulang dengan H.264 + AAC di browser Anda",
    queued: (n) => `${n} video dalam antrean`,
    preset: "Prasetel kualitas (CRF lebih rendah = file lebih besar, kualitas lebih tinggi)",
    presetStrong: "Kuat (CRF 32)",
    presetBalanced: "Seimbang (CRF 28)",
    presetHigh: "Tinggi (CRF 23)",
    compressing: (done, total) => `Mengompres ${done}/${total}…`,
    compress: (n) => `Kompres ${n} video`,
    privacy:
      "Diproses 100% di browser Anda via FFmpeg.wasm — video Anda tidak pernah diunggah. File besar lambat; pertimbangkan untuk memangkasnya terlebih dahulu.",
  },
};

const vi: BatchStrings = {
  meta: {
    title: "Trình chuyển đổi hàng loạt — Xử lý 50 tệp cùng lúc",
    description:
      "Chuyển đổi tối đa 50 hình ảnh (WebP/JPG/PNG), nén PDF, chuyển âm thanh sang MP3 hàng loạt, hoặc nén video — tất cả trong một lượt, rồi tải về một tệp ZIP duy nhất. 100% trong trình duyệt của bạn.",
  },
  hero: {
    title: "Trình chuyển đổi hàng loạt",
    lead: "Thả tối đa 50 tệp, chọn một thao tác — nhận lại một tệp ZIP. Mọi thứ diễn ra trong trình duyệt của bạn.",
  },
  tabs: {
    images: "Hình ảnh",
    pdfs: "Nén PDF",
    audio: "Âm thanh → MP3",
    videos: "Nén video",
  },
  common: {
    addMore: "Thêm nữa",
    clear: "Xóa",
    downloadZip: "Tải ZIP",
    done: (n) => `${n} hoàn tất`,
    failed: (n) => `${n} thất bại`,
    loadingFfmpeg: "Đang tải FFmpeg (~30 MB) — chỉ lần đầu tiên.",
  },
  image: {
    dropTitle: (max) => `Thả tối đa ${max} hình ảnh`,
    dropHint: "JPG · PNG · WebP · GIF · BMP — xử lý trong trình duyệt của bạn, đóng gói trong một tệp ZIP",
    queued: (n) => `${n} hình ảnh trong hàng đợi`,
    targetFormat: "Định dạng đích",
    formatWebp: "WebP (khuyến nghị)",
    formatJpg: "JPG",
    formatPng: "PNG",
    quality: (q) => `Chất lượng · ${q}`,
    maxDimension: "Kích thước tối đa (px) · 0 = giữ nguyên",
    processing: (done, total) => `Đang xử lý ${done}/${total}…`,
    process: (n) => `Xử lý ${n} hình ảnh`,
    privacy: "Xử lý 100% trong trình duyệt của bạn — hình ảnh của bạn không bao giờ được tải lên.",
    errDecode: "Không thể giải mã hình ảnh",
    errCanvas: "Canvas không khả dụng",
    errEncode: "Mã hóa thất bại",
  },
  pdf: {
    dropTitle: (max) => `Thả tối đa ${max} tệp PDF`,
    dropHint: "Mỗi tệp được kết xuất lại thành các trang JPEG — hiệu quả nhất với PDF nhiều hình ảnh hoặc đã quét.",
    queued: (n) => `${n} PDF trong hàng đợi`,
    preset: "Cài đặt nén sẵn",
    presetStrong: "Mạnh (nhỏ hơn)",
    presetBalanced: "Cân bằng",
    presetHigh: "Chất lượng cao",
    compressing: (done, total) => `Đang nén ${done}/${total}…`,
    compress: (n) => `Nén ${n} PDF`,
    privacy:
      "Xử lý 100% trong trình duyệt của bạn — PDF của bạn không bao giờ được tải lên. Kết quả dựa trên hình ảnh (không có văn bản chọn được).",
  },
  audio: {
    dropTitle: (max) => `Thả tối đa ${max} tệp âm thanh`,
    dropHint: "MP3 · WAV · M4A · FLAC · OGG — chuyển sang MP3 trong trình duyệt của bạn",
    queued: (n) => `${n} tệp âm thanh trong hàng đợi`,
    bitrate: "Bitrate đầu ra",
    bitrate128: "128 kbps · nhỏ",
    bitrate192: "192 kbps · cân bằng",
    bitrate256: "256 kbps · tốt",
    bitrate320: "320 kbps · tối đa",
    converting: (done, total) => `Đang chuyển đổi ${done}/${total}…`,
    convert: (n) => `Chuyển ${n} sang MP3`,
    privacy: "Xử lý 100% trong trình duyệt của bạn qua FFmpeg.wasm — tệp của bạn không bao giờ được tải lên.",
  },
  video: {
    dropTitle: (max) => `Thả tối đa ${max} video`,
    dropHint: "MP4 · MOV · MKV · WebM — mã hóa lại bằng H.264 + AAC trong trình duyệt của bạn",
    queued: (n) => `${n} video trong hàng đợi`,
    preset: "Cài đặt chất lượng sẵn (CRF thấp hơn = tệp lớn hơn, chất lượng cao hơn)",
    presetStrong: "Mạnh (CRF 32)",
    presetBalanced: "Cân bằng (CRF 28)",
    presetHigh: "Cao (CRF 23)",
    compressing: (done, total) => `Đang nén ${done}/${total}…`,
    compress: (n) => `Nén ${n} video`,
    privacy:
      "Xử lý 100% trong trình duyệt của bạn qua FFmpeg.wasm — video của bạn không bao giờ được tải lên. Tệp lớn xử lý chậm; cân nhắc cắt bớt trước.",
  },
};

const sv: BatchStrings = {
  meta: {
    title: "Batchkonverterare — Bearbeta 50 filer på en gång",
    description:
      "Konvertera upp till 50 bilder (WebP/JPG/PNG), komprimera PDF:er, batchkonvertera ljud till MP3 eller komprimera videor — allt i en omgång, ladda sedan ner en enda ZIP. 100 % i din webbläsare.",
  },
  hero: {
    title: "Batchkonverterare",
    lead: "Släpp upp till 50 filer, välj en åtgärd — få tillbaka en enda ZIP. Allt sker i din webbläsare.",
  },
  tabs: {
    images: "Bilder",
    pdfs: "Komprimera PDF:er",
    audio: "Ljud → MP3",
    videos: "Komprimera videor",
  },
  common: {
    addMore: "Lägg till fler",
    clear: "Rensa",
    downloadZip: "Ladda ner ZIP",
    done: (n) => `${n} klara`,
    failed: (n) => `${n} misslyckades`,
    loadingFfmpeg: "Läser in FFmpeg (~30 MB) — endast första gången.",
  },
  image: {
    dropTitle: (max) => `Släpp upp till ${max} bilder`,
    dropHint: "JPG · PNG · WebP · GIF · BMP — bearbetas i din webbläsare, packas i en ZIP",
    queued: (n) => `${n} bild${n > 1 ? "er" : ""} i kö`,
    targetFormat: "Målformat",
    formatWebp: "WebP (rekommenderas)",
    formatJpg: "JPG",
    formatPng: "PNG",
    quality: (q) => `Kvalitet · ${q}`,
    maxDimension: "Max dimension (px) · 0 = behåll",
    processing: (done, total) => `Bearbetar ${done}/${total}…`,
    process: (n) => `Bearbeta ${n} bilder`,
    privacy: "Bearbetas 100 % i din webbläsare — dina bilder laddas aldrig upp.",
    errDecode: "Kunde inte avkoda bilden",
    errCanvas: "Canvas inte tillgänglig",
    errEncode: "Kodning misslyckades",
  },
  pdf: {
    dropTitle: (max) => `Släpp upp till ${max} PDF:er`,
    dropHint: "Var och en återrenderas till JPEG-sidor — störst vinst på bildtunga eller skannade PDF:er.",
    queued: (n) => `${n} PDF:er i kö`,
    preset: "Komprimeringsförval",
    presetStrong: "Stark (mindre)",
    presetBalanced: "Balanserad",
    presetHigh: "Hög kvalitet",
    compressing: (done, total) => `Komprimerar ${done}/${total}…`,
    compress: (n) => `Komprimera ${n} PDF:er`,
    privacy:
      "Bearbetas 100 % i din webbläsare — dina PDF:er laddas aldrig upp. Resultatet är bildbaserat (ingen markerbar text).",
  },
  audio: {
    dropTitle: (max) => `Släpp upp till ${max} ljudfiler`,
    dropHint: "MP3 · WAV · M4A · FLAC · OGG — konverteras till MP3 i din webbläsare",
    queued: (n) => `${n} ljudfil${n > 1 ? "er" : ""} i kö`,
    bitrate: "Utgångsbithastighet",
    bitrate128: "128 kbps · liten",
    bitrate192: "192 kbps · balanserad",
    bitrate256: "256 kbps · bra",
    bitrate320: "320 kbps · max",
    converting: (done, total) => `Konverterar ${done}/${total}…`,
    convert: (n) => `Konvertera ${n} till MP3`,
    privacy: "Bearbetas 100 % i din webbläsare via FFmpeg.wasm — dina filer laddas aldrig upp.",
  },
  video: {
    dropTitle: (max) => `Släpp upp till ${max} videor`,
    dropHint: "MP4 · MOV · MKV · WebM — omkodas med H.264 + AAC i din webbläsare",
    queued: (n) => `${n} video${n > 1 ? "r" : ""} i kö`,
    preset: "Kvalitetsförval (lägre CRF = större fil, högre kvalitet)",
    presetStrong: "Stark (CRF 32)",
    presetBalanced: "Balanserad (CRF 28)",
    presetHigh: "Hög (CRF 23)",
    compressing: (done, total) => `Komprimerar ${done}/${total}…`,
    compress: (n) => `Komprimera ${n} videor`,
    privacy:
      "Bearbetas 100 % i din webbläsare via FFmpeg.wasm — dina videor laddas aldrig upp. Stora filer är långsamma; överväg att klippa dem först.",
  },
};

const pl: BatchStrings = {
  meta: {
    title: "Konwerter wsadowy — Przetwórz 50 plików naraz",
    description:
      "Konwertuj do 50 obrazów (WebP/JPG/PNG), kompresuj pliki PDF, wsadowo konwertuj audio na MP3 lub kompresuj wideo — wszystko za jednym razem, a potem pobierz jeden ZIP. 100% w Twojej przeglądarce.",
  },
  hero: {
    title: "Konwerter wsadowy",
    lead: "Upuść do 50 plików, wybierz akcję — otrzymaj jeden ZIP. Wszystko dzieje się w Twojej przeglądarce.",
  },
  tabs: {
    images: "Obrazy",
    pdfs: "Kompresuj PDF",
    audio: "Audio → MP3",
    videos: "Kompresuj wideo",
  },
  common: {
    addMore: "Dodaj więcej",
    clear: "Wyczyść",
    downloadZip: "Pobierz ZIP",
    done: (n) => `${n} gotowe`,
    failed: (n) => `${n} nieudane`,
    loadingFfmpeg: "Ładowanie FFmpeg (~30 MB) — tylko za pierwszym razem.",
  },
  image: {
    dropTitle: (max) => `Upuść do ${max} obrazów`,
    dropHint: "JPG · PNG · WebP · GIF · BMP — przetwarzane w przeglądarce, pakowane w ZIP",
    queued: (n) => `${n} obraz${n > 1 ? "ów" : ""} w kolejce`,
    targetFormat: "Format docelowy",
    formatWebp: "WebP (zalecany)",
    formatJpg: "JPG",
    formatPng: "PNG",
    quality: (q) => `Jakość · ${q}`,
    maxDimension: "Maks. wymiar (px) · 0 = zachowaj",
    processing: (done, total) => `Przetwarzanie ${done}/${total}…`,
    process: (n) => `Przetwórz ${n} obrazów`,
    privacy: "Przetwarzane w 100% w Twojej przeglądarce — Twoje obrazy nigdy nie są przesyłane.",
    errDecode: "Nie można zdekodować obrazu",
    errCanvas: "Canvas niedostępny",
    errEncode: "Kodowanie nie powiodło się",
  },
  pdf: {
    dropTitle: (max) => `Upuść do ${max} plików PDF`,
    dropHint: "Każdy jest renderowany ponownie na strony JPEG — największe zyski przy PDF-ach z dużą liczbą obrazów lub skanach.",
    queued: (n) => `${n} PDF w kolejce`,
    preset: "Ustawienie kompresji",
    presetStrong: "Mocna (mniejszy)",
    presetBalanced: "Zrównoważona",
    presetHigh: "Wysoka jakość",
    compressing: (done, total) => `Kompresowanie ${done}/${total}…`,
    compress: (n) => `Kompresuj ${n} PDF`,
    privacy:
      "Przetwarzane w 100% w Twojej przeglądarce — Twoje pliki PDF nigdy nie są przesyłane. Wynik jest oparty na obrazach (brak zaznaczalnego tekstu).",
  },
  audio: {
    dropTitle: (max) => `Upuść do ${max} plików audio`,
    dropHint: "MP3 · WAV · M4A · FLAC · OGG — konwertowane na MP3 w Twojej przeglądarce",
    queued: (n) => `${n} plik${n > 1 ? "ów" : ""} audio w kolejce`,
    bitrate: "Przepływność wyjściowa",
    bitrate128: "128 kbps · mały",
    bitrate192: "192 kbps · zrównoważony",
    bitrate256: "256 kbps · dobry",
    bitrate320: "320 kbps · maks",
    converting: (done, total) => `Konwertowanie ${done}/${total}…`,
    convert: (n) => `Konwertuj ${n} na MP3`,
    privacy: "Przetwarzane w 100% w Twojej przeglądarce przez FFmpeg.wasm — Twoje pliki nigdy nie są przesyłane.",
  },
  video: {
    dropTitle: (max) => `Upuść do ${max} filmów`,
    dropHint: "MP4 · MOV · MKV · WebM — przekodowane do H.264 + AAC w Twojej przeglądarce",
    queued: (n) => `${n} film${n > 1 ? "ów" : ""} w kolejce`,
    preset: "Ustawienie jakości (niższy CRF = większy plik, wyższa jakość)",
    presetStrong: "Mocna (CRF 32)",
    presetBalanced: "Zrównoważona (CRF 28)",
    presetHigh: "Wysoka (CRF 23)",
    compressing: (done, total) => `Kompresowanie ${done}/${total}…`,
    compress: (n) => `Kompresuj ${n} filmów`,
    privacy:
      "Przetwarzane w 100% w Twojej przeglądarce przez FFmpeg.wasm — Twoje filmy nigdy nie są przesyłane. Duże pliki są wolne; rozważ wcześniejsze przycięcie.",
  },
};

const uk: BatchStrings = {
  meta: {
    title: "Пакетний конвертер — Обробіть 50 файлів одразу",
    description:
      "Конвертуйте до 50 зображень (WebP/JPG/PNG), стискайте PDF, пакетно конвертуйте аудіо в MP3 або стискайте відео — усе за один прохід, потім завантажте один ZIP. 100% у вашому браузері.",
  },
  hero: {
    title: "Пакетний конвертер",
    lead: "Перетягніть до 50 файлів, виберіть дію — отримайте один ZIP. Усе відбувається у вашому браузері.",
  },
  tabs: {
    images: "Зображення",
    pdfs: "Стиснути PDF",
    audio: "Аудіо → MP3",
    videos: "Стиснути відео",
  },
  common: {
    addMore: "Додати ще",
    clear: "Очистити",
    downloadZip: "Завантажити ZIP",
    done: (n) => `${n} готово`,
    failed: (n) => `${n} не вдалося`,
    loadingFfmpeg: "Завантаження FFmpeg (~30 МБ) — лише першого разу.",
  },
  image: {
    dropTitle: (max) => `Перетягніть до ${max} зображень`,
    dropHint: "JPG · PNG · WebP · GIF · BMP — обробляються у вашому браузері та пакуються в ZIP",
    queued: (n) => `${n} зображен${n > 1 ? "ь" : "ня"} у черзі`,
    targetFormat: "Цільовий формат",
    formatWebp: "WebP (рекомендовано)",
    formatJpg: "JPG",
    formatPng: "PNG",
    quality: (q) => `Якість · ${q}`,
    maxDimension: "Макс. розмір (px) · 0 = зберегти",
    processing: (done, total) => `Обробка ${done}/${total}…`,
    process: (n) => `Обробити ${n} зображень`,
    privacy: "Обробляється на 100% у вашому браузері — ваші зображення ніколи не завантажуються.",
    errDecode: "Не вдалося декодувати зображення",
    errCanvas: "Canvas недоступний",
    errEncode: "Помилка кодування",
  },
  pdf: {
    dropTitle: (max) => `Перетягніть до ${max} PDF`,
    dropHint: "Кожен повторно рендериться у JPEG-сторінки — найбільший виграш на PDF з великою кількістю зображень або відсканованих.",
    queued: (n) => `${n} PDF у черзі`,
    preset: "Пресет стиснення",
    presetStrong: "Сильне (менше)",
    presetBalanced: "Збалансоване",
    presetHigh: "Висока якість",
    compressing: (done, total) => `Стиснення ${done}/${total}…`,
    compress: (n) => `Стиснути ${n} PDF`,
    privacy:
      "Обробляється на 100% у вашому браузері — ваші PDF ніколи не завантажуються. Результат базується на зображеннях (без виділюваного тексту).",
  },
  audio: {
    dropTitle: (max) => `Перетягніть до ${max} аудіофайлів`,
    dropHint: "MP3 · WAV · M4A · FLAC · OGG — конвертуються в MP3 у вашому браузері",
    queued: (n) => `${n} аудіофайл${n > 1 ? "ів" : ""} у черзі`,
    bitrate: "Бітрейт виводу",
    bitrate128: "128 kbps · малий",
    bitrate192: "192 kbps · збалансований",
    bitrate256: "256 kbps · хороший",
    bitrate320: "320 kbps · макс",
    converting: (done, total) => `Конвертація ${done}/${total}…`,
    convert: (n) => `Конвертувати ${n} у MP3`,
    privacy: "Обробляється на 100% у вашому браузері через FFmpeg.wasm — ваші файли ніколи не завантажуються.",
  },
  video: {
    dropTitle: (max) => `Перетягніть до ${max} відео`,
    dropHint: "MP4 · MOV · MKV · WebM — перекодовуються в H.264 + AAC у вашому браузері",
    queued: (n) => `${n} відео у черзі`,
    preset: "Пресет якості (нижчий CRF = більший файл, вища якість)",
    presetStrong: "Сильне (CRF 32)",
    presetBalanced: "Збалансоване (CRF 28)",
    presetHigh: "Висока (CRF 23)",
    compressing: (done, total) => `Стиснення ${done}/${total}…`,
    compress: (n) => `Стиснути ${n} відео`,
    privacy:
      "Обробляється на 100% у вашому браузері через FFmpeg.wasm — ваші відео ніколи не завантажуються. Великі файли обробляються повільно; спершу краще обрізати.",
  },
};

const cs: BatchStrings = {
  meta: {
    title: "Dávkový převodník — Zpracujte 50 souborů najednou",
    description:
      "Převeďte až 50 obrázků (WebP/JPG/PNG), komprimujte PDF, dávkově převádějte zvuk na MP3 nebo komprimujte videa — vše v jednom průchodu, poté stáhněte jediný ZIP. 100 % ve vašem prohlížeči.",
  },
  hero: {
    title: "Dávkový převodník",
    lead: "Přetáhněte až 50 souborů, zvolte akci — získejte zpět jediný ZIP. Vše probíhá ve vašem prohlížeči.",
  },
  tabs: {
    images: "Obrázky",
    pdfs: "Komprimovat PDF",
    audio: "Zvuk → MP3",
    videos: "Komprimovat videa",
  },
  common: {
    addMore: "Přidat další",
    clear: "Vymazat",
    downloadZip: "Stáhnout ZIP",
    done: (n) => `${n} hotovo`,
    failed: (n) => `${n} selhalo`,
    loadingFfmpeg: "Načítání FFmpeg (~30 MB) — pouze poprvé.",
  },
  image: {
    dropTitle: (max) => `Přetáhněte až ${max} obrázků`,
    dropHint: "JPG · PNG · WebP · GIF · BMP — zpracováno ve vašem prohlížeči, zabaleno do ZIP",
    queued: (n) => `${n} obrázk${n > 1 ? "ů" : ""} ve frontě`,
    targetFormat: "Cílový formát",
    formatWebp: "WebP (doporučeno)",
    formatJpg: "JPG",
    formatPng: "PNG",
    quality: (q) => `Kvalita · ${q}`,
    maxDimension: "Max. rozměr (px) · 0 = zachovat",
    processing: (done, total) => `Zpracování ${done}/${total}…`,
    process: (n) => `Zpracovat ${n} obrázků`,
    privacy: "Zpracováno 100 % ve vašem prohlížeči — vaše obrázky se nikdy nenahrávají.",
    errDecode: "Nelze dekódovat obrázek",
    errCanvas: "Canvas není k dispozici",
    errEncode: "Kódování selhalo",
  },
  pdf: {
    dropTitle: (max) => `Přetáhněte až ${max} PDF`,
    dropHint: "Každý se znovu vykreslí na stránky JPEG — největší úspora u PDF s mnoha obrázky nebo naskenovaných.",
    queued: (n) => `${n} PDF ve frontě`,
    preset: "Předvolba komprese",
    presetStrong: "Silná (menší)",
    presetBalanced: "Vyvážená",
    presetHigh: "Vysoká kvalita",
    compressing: (done, total) => `Komprese ${done}/${total}…`,
    compress: (n) => `Komprimovat ${n} PDF`,
    privacy:
      "Zpracováno 100 % ve vašem prohlížeči — vaše PDF se nikdy nenahrávají. Výstup je založen na obrázcích (bez vybíratelného textu).",
  },
  audio: {
    dropTitle: (max) => `Přetáhněte až ${max} zvukových souborů`,
    dropHint: "MP3 · WAV · M4A · FLAC · OGG — převedeny na MP3 ve vašem prohlížeči",
    queued: (n) => `${n} zvukov${n > 1 ? "ých souborů" : "ý soubor"} ve frontě`,
    bitrate: "Výstupní datový tok",
    bitrate128: "128 kbps · malý",
    bitrate192: "192 kbps · vyvážený",
    bitrate256: "256 kbps · dobrý",
    bitrate320: "320 kbps · max",
    converting: (done, total) => `Převod ${done}/${total}…`,
    convert: (n) => `Převést ${n} na MP3`,
    privacy: "Zpracováno 100 % ve vašem prohlížeči přes FFmpeg.wasm — vaše soubory se nikdy nenahrávají.",
  },
  video: {
    dropTitle: (max) => `Přetáhněte až ${max} videí`,
    dropHint: "MP4 · MOV · MKV · WebM — překódováno na H.264 + AAC ve vašem prohlížeči",
    queued: (n) => `${n} vide${n > 1 ? "í" : "o"} ve frontě`,
    preset: "Předvolba kvality (nižší CRF = větší soubor, vyšší kvalita)",
    presetStrong: "Silná (CRF 32)",
    presetBalanced: "Vyvážená (CRF 28)",
    presetHigh: "Vysoká (CRF 23)",
    compressing: (done, total) => `Komprese ${done}/${total}…`,
    compress: (n) => `Komprimovat ${n} videí`,
    privacy:
      "Zpracováno 100 % ve vašem prohlížeči přes FFmpeg.wasm — vaše videa se nikdy nenahrávají. Velké soubory jsou pomalé; zvažte jejich ořezání předem.",
  },
};

const TABLE: Partial<Record<Locale, BatchStrings>> = {
  en,
  fr,
  es,
  pt,
  de,
  it,
  nl,
  ja,
  zh,
  ko,
  ar,
  ru,
  hi,
  tr,
  id,
  vi,
  sv,
  pl,
  uk,
  cs,
};

export function getBatch(locale: Locale): BatchStrings {
  return TABLE[locale] ?? en;
}
