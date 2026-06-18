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

const TABLE: Partial<Record<Locale, BatchStrings>> = { en, fr };

export function getBatch(locale: Locale): BatchStrings {
  return TABLE[locale] ?? en;
}
