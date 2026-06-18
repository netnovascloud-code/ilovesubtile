import { type Locale } from "@/lib/i18n/locales";
import { type StepKind } from "@/lib/workflow-engine";

/**
 * Strings for the Workflow Builder page (/workflow and /<locale>/workflow).
 * English is the base and the fallback for any locale not present here (same
 * degradation as the other page/i18n modules). Add new locales by extending
 * TABLE — the page never breaks because getWorkflow falls back to `en`.
 */
export type WorkflowStrings = {
  meta: { title: string; description: string };
  hero: { title: string; lead: string };
  upload: {
    cta: string;
    hint: (max: number) => string;
  };
  pipeline: {
    heading: (n: number, max: number) => string;
    addStep: string;
    runIdle: (n: number) => string;
    runBusy: (cur: number, total: number) => string;
    download: (size: string) => string;
    stepFailed: (n: number, message: string) => string;
    footnote: string;
  };
  stepLabels: Record<StepKind, string>;
  templates: {
    webOptimised: string;
    watermarkedWebp: string;
    imageToPdf: string;
  };
  resize: { width: string; height: string; fitRatio: string };
  format: {
    label: string;
    quality: string;
    webp: string;
    jpg: string;
    png: string;
  };
  rotate: { angle: string };
  watermark: {
    text: string;
    position: string;
    size: string;
    colour: string;
    opacity: string;
    positions: { br: string; bl: string; tr: string; tl: string; c: string };
  };
  toPdf: {
    page: string;
    margin: string;
    marginUnit: string;
    pageSizes: { A4: string; Letter: string; Fit: string };
  };
};

const en: WorkflowStrings = {
  meta: {
    title: "Workflow Builder — Chain Conversions in One Click",
    description:
      "Build a pipeline of image conversions: resize, convert format, rotate, watermark, embed in PDF — up to 5 steps, all in your browser.",
  },
  hero: {
    title: "Workflow Builder",
    lead: "Chain up to 5 conversion steps for a single image — resize, convert, rotate, watermark, embed in PDF. Reorder, run, download. Everything happens in your browser.",
  },
  upload: {
    cta: "Upload an image to start",
    hint: (max) => `JPG · PNG · WebP — chain up to ${max} steps below`,
  },
  pipeline: {
    heading: (n, max) => `Pipeline (${n}/${max} steps)`,
    addStep: "add step:",
    runIdle: (n) => `Run pipeline (${n})`,
    runBusy: (cur, total) => `Running step ${cur}/${total}…`,
    download: (size) => `Download · ${size}`,
    stepFailed: (n, message) => `Step ${n} failed: ${message}`,
    footnote:
      "Processed 100% in your browser — your image is never uploaded. Each step feeds the next; reorder or remove freely.",
  },
  stepLabels: {
    resize: "Resize",
    format: "Convert format",
    rotate: "Rotate",
    grayscale: "Black & white",
    watermark: "Add watermark",
    "to-pdf": "Embed in PDF",
  },
  templates: {
    webOptimised: "Web-optimised photo",
    watermarkedWebp: "Watermarked WebP",
    imageToPdf: "Image → branded PDF",
  },
  resize: { width: "Width", height: "Height", fitRatio: "Fit ratio" },
  format: {
    label: "Format",
    quality: "Quality",
    webp: "WebP",
    jpg: "JPG",
    png: "PNG",
  },
  rotate: { angle: "Angle" },
  watermark: {
    text: "Text",
    position: "Position",
    size: "Size",
    colour: "Colour",
    opacity: "Opacity",
    positions: {
      br: "Bottom right",
      bl: "Bottom left",
      tr: "Top right",
      tl: "Top left",
      c: "Centre",
    },
  },
  toPdf: {
    page: "Page",
    margin: "Margin",
    marginUnit: "pt",
    pageSizes: { A4: "A4", Letter: "Letter", Fit: "Fit image" },
  },
};

const fr: WorkflowStrings = {
  meta: {
    title: "Générateur de workflow — Enchaînez vos conversions en un clic",
    description:
      "Construisez un pipeline de conversions d'image : redimensionner, convertir le format, pivoter, filigraner, intégrer dans un PDF — jusqu'à 5 étapes, le tout dans votre navigateur.",
  },
  hero: {
    title: "Générateur de workflow",
    lead: "Enchaînez jusqu'à 5 étapes de conversion sur une seule image — redimensionner, convertir, pivoter, filigraner, intégrer dans un PDF. Réorganisez, lancez, téléchargez. Tout se passe dans votre navigateur.",
  },
  upload: {
    cta: "Importez une image pour commencer",
    hint: (max) => `JPG · PNG · WebP — enchaînez jusqu'à ${max} étapes ci-dessous`,
  },
  pipeline: {
    heading: (n, max) => `Pipeline (${n}/${max} étapes)`,
    addStep: "ajouter une étape :",
    runIdle: (n) => `Lancer le pipeline (${n})`,
    runBusy: (cur, total) => `Étape ${cur}/${total} en cours…`,
    download: (size) => `Télécharger · ${size}`,
    stepFailed: (n, message) => `Échec de l'étape ${n} : ${message}`,
    footnote:
      "Traité à 100 % dans votre navigateur — votre image n'est jamais envoyée. Chaque étape alimente la suivante ; réorganisez ou supprimez librement.",
  },
  stepLabels: {
    resize: "Redimensionner",
    format: "Convertir le format",
    rotate: "Pivoter",
    grayscale: "Noir et blanc",
    watermark: "Ajouter un filigrane",
    "to-pdf": "Intégrer dans un PDF",
  },
  templates: {
    webOptimised: "Photo optimisée pour le web",
    watermarkedWebp: "WebP filigrané",
    imageToPdf: "Image → PDF de marque",
  },
  resize: { width: "Largeur", height: "Hauteur", fitRatio: "Conserver les proportions" },
  format: {
    label: "Format",
    quality: "Qualité",
    webp: "WebP",
    jpg: "JPG",
    png: "PNG",
  },
  rotate: { angle: "Angle" },
  watermark: {
    text: "Texte",
    position: "Position",
    size: "Taille",
    colour: "Couleur",
    opacity: "Opacité",
    positions: {
      br: "En bas à droite",
      bl: "En bas à gauche",
      tr: "En haut à droite",
      tl: "En haut à gauche",
      c: "Centre",
    },
  },
  toPdf: {
    page: "Page",
    margin: "Marge",
    marginUnit: "pt",
    pageSizes: { A4: "A4", Letter: "Letter", Fit: "Ajuster à l'image" },
  },
};

const es: WorkflowStrings = {
  meta: {
    title: "Creador de flujos de trabajo — Encadena conversiones en un clic",
    description:
      "Crea un pipeline de conversiones de imagen: redimensionar, convertir formato, rotar, marca de agua, incrustar en PDF — hasta 5 pasos, todo en tu navegador.",
  },
  hero: {
    title: "Creador de flujos de trabajo",
    lead: "Encadena hasta 5 pasos de conversión para una sola imagen — redimensionar, convertir, rotar, marca de agua, incrustar en PDF. Reordena, ejecuta, descarga. Todo ocurre en tu navegador.",
  },
  upload: {
    cta: "Sube una imagen para empezar",
    hint: (max) => `JPG · PNG · WebP — encadena hasta ${max} pasos abajo`,
  },
  pipeline: {
    heading: (n, max) => `Pipeline (${n}/${max} pasos)`,
    addStep: "añadir paso:",
    runIdle: (n) => `Ejecutar pipeline (${n})`,
    runBusy: (cur, total) => `Ejecutando paso ${cur}/${total}…`,
    download: (size) => `Descargar · ${size}`,
    stepFailed: (n, message) => `El paso ${n} falló: ${message}`,
    footnote:
      "Procesado al 100 % en tu navegador — tu imagen nunca se sube. Cada paso alimenta al siguiente; reordena o elimina libremente.",
  },
  stepLabels: {
    resize: "Redimensionar",
    format: "Convertir formato",
    rotate: "Rotar",
    grayscale: "Blanco y negro",
    watermark: "Añadir marca de agua",
    "to-pdf": "Incrustar en PDF",
  },
  templates: {
    webOptimised: "Foto optimizada para web",
    watermarkedWebp: "WebP con marca de agua",
    imageToPdf: "Imagen → PDF de marca",
  },
  resize: { width: "Ancho", height: "Alto", fitRatio: "Mantener proporción" },
  format: {
    label: "Formato",
    quality: "Calidad",
    webp: "WebP",
    jpg: "JPG",
    png: "PNG",
  },
  rotate: { angle: "Ángulo" },
  watermark: {
    text: "Texto",
    position: "Posición",
    size: "Tamaño",
    colour: "Color",
    opacity: "Opacidad",
    positions: {
      br: "Abajo a la derecha",
      bl: "Abajo a la izquierda",
      tr: "Arriba a la derecha",
      tl: "Arriba a la izquierda",
      c: "Centro",
    },
  },
  toPdf: {
    page: "Página",
    margin: "Margen",
    marginUnit: "pt",
    pageSizes: { A4: "A4", Letter: "Letter", Fit: "Ajustar a la imagen" },
  },
};

const pt: WorkflowStrings = {
  meta: {
    title: "Criador de fluxos de trabalho — Encadeie conversões em um clique",
    description:
      "Crie um pipeline de conversões de imagem: redimensionar, converter formato, girar, marca d'água, incorporar em PDF — até 5 etapas, tudo no seu navegador.",
  },
  hero: {
    title: "Criador de fluxos de trabalho",
    lead: "Encadeie até 5 etapas de conversão para uma única imagem — redimensionar, converter, girar, marca d'água, incorporar em PDF. Reordene, execute, baixe. Tudo acontece no seu navegador.",
  },
  upload: {
    cta: "Envie uma imagem para começar",
    hint: (max) => `JPG · PNG · WebP — encadeie até ${max} etapas abaixo`,
  },
  pipeline: {
    heading: (n, max) => `Pipeline (${n}/${max} etapas)`,
    addStep: "adicionar etapa:",
    runIdle: (n) => `Executar pipeline (${n})`,
    runBusy: (cur, total) => `Executando etapa ${cur}/${total}…`,
    download: (size) => `Baixar · ${size}`,
    stepFailed: (n, message) => `A etapa ${n} falhou: ${message}`,
    footnote:
      "Processado 100 % no seu navegador — sua imagem nunca é enviada. Cada etapa alimenta a próxima; reordene ou remova livremente.",
  },
  stepLabels: {
    resize: "Redimensionar",
    format: "Converter formato",
    rotate: "Girar",
    grayscale: "Preto e branco",
    watermark: "Adicionar marca d'água",
    "to-pdf": "Incorporar em PDF",
  },
  templates: {
    webOptimised: "Foto otimizada para web",
    watermarkedWebp: "WebP com marca d'água",
    imageToPdf: "Imagem → PDF de marca",
  },
  resize: { width: "Largura", height: "Altura", fitRatio: "Manter proporção" },
  format: {
    label: "Formato",
    quality: "Qualidade",
    webp: "WebP",
    jpg: "JPG",
    png: "PNG",
  },
  rotate: { angle: "Ângulo" },
  watermark: {
    text: "Texto",
    position: "Posição",
    size: "Tamanho",
    colour: "Cor",
    opacity: "Opacidade",
    positions: {
      br: "Inferior direito",
      bl: "Inferior esquerdo",
      tr: "Superior direito",
      tl: "Superior esquerdo",
      c: "Centro",
    },
  },
  toPdf: {
    page: "Página",
    margin: "Margem",
    marginUnit: "pt",
    pageSizes: { A4: "A4", Letter: "Letter", Fit: "Ajustar à imagem" },
  },
};

const de: WorkflowStrings = {
  meta: {
    title: "Workflow-Builder — Verkette Konvertierungen mit einem Klick",
    description:
      "Erstelle eine Pipeline von Bildkonvertierungen: Größe ändern, Format konvertieren, drehen, Wasserzeichen, in PDF einbetten — bis zu 5 Schritte, alles in deinem Browser.",
  },
  hero: {
    title: "Workflow-Builder",
    lead: "Verkette bis zu 5 Konvertierungsschritte für ein einzelnes Bild — Größe ändern, konvertieren, drehen, Wasserzeichen, in PDF einbetten. Neu anordnen, ausführen, herunterladen. Alles geschieht in deinem Browser.",
  },
  upload: {
    cta: "Lade ein Bild hoch, um zu starten",
    hint: (max) => `JPG · PNG · WebP — verkette unten bis zu ${max} Schritte`,
  },
  pipeline: {
    heading: (n, max) => `Pipeline (${n}/${max} Schritte)`,
    addStep: "Schritt hinzufügen:",
    runIdle: (n) => `Pipeline ausführen (${n})`,
    runBusy: (cur, total) => `Schritt ${cur}/${total} wird ausgeführt…`,
    download: (size) => `Herunterladen · ${size}`,
    stepFailed: (n, message) => `Schritt ${n} fehlgeschlagen: ${message}`,
    footnote:
      "Zu 100 % in deinem Browser verarbeitet — dein Bild wird nie hochgeladen. Jeder Schritt speist den nächsten; ordne neu an oder entferne nach Belieben.",
  },
  stepLabels: {
    resize: "Größe ändern",
    format: "Format konvertieren",
    rotate: "Drehen",
    grayscale: "Schwarz-Weiß",
    watermark: "Wasserzeichen hinzufügen",
    "to-pdf": "In PDF einbetten",
  },
  templates: {
    webOptimised: "Web-optimiertes Foto",
    watermarkedWebp: "WebP mit Wasserzeichen",
    imageToPdf: "Bild → gebrandetes PDF",
  },
  resize: { width: "Breite", height: "Höhe", fitRatio: "Seitenverhältnis beibehalten" },
  format: {
    label: "Format",
    quality: "Qualität",
    webp: "WebP",
    jpg: "JPG",
    png: "PNG",
  },
  rotate: { angle: "Winkel" },
  watermark: {
    text: "Text",
    position: "Position",
    size: "Größe",
    colour: "Farbe",
    opacity: "Deckkraft",
    positions: {
      br: "Unten rechts",
      bl: "Unten links",
      tr: "Oben rechts",
      tl: "Oben links",
      c: "Mitte",
    },
  },
  toPdf: {
    page: "Seite",
    margin: "Rand",
    marginUnit: "pt",
    pageSizes: { A4: "A4", Letter: "Letter", Fit: "An Bild anpassen" },
  },
};

const it: WorkflowStrings = {
  meta: {
    title: "Generatore di flussi di lavoro — Concatena conversioni con un clic",
    description:
      "Crea una pipeline di conversioni immagine: ridimensiona, converti formato, ruota, filigrana, incorpora in PDF — fino a 5 passaggi, tutto nel tuo browser.",
  },
  hero: {
    title: "Generatore di flussi di lavoro",
    lead: "Concatena fino a 5 passaggi di conversione per una singola immagine — ridimensiona, converti, ruota, filigrana, incorpora in PDF. Riordina, esegui, scarica. Tutto avviene nel tuo browser.",
  },
  upload: {
    cta: "Carica un'immagine per iniziare",
    hint: (max) => `JPG · PNG · WebP — concatena fino a ${max} passaggi qui sotto`,
  },
  pipeline: {
    heading: (n, max) => `Pipeline (${n}/${max} passaggi)`,
    addStep: "aggiungi passaggio:",
    runIdle: (n) => `Esegui pipeline (${n})`,
    runBusy: (cur, total) => `Esecuzione del passaggio ${cur}/${total}…`,
    download: (size) => `Scarica · ${size}`,
    stepFailed: (n, message) => `Passaggio ${n} non riuscito: ${message}`,
    footnote:
      "Elaborato al 100 % nel tuo browser — la tua immagine non viene mai caricata. Ogni passaggio alimenta il successivo; riordina o rimuovi liberamente.",
  },
  stepLabels: {
    resize: "Ridimensiona",
    format: "Converti formato",
    rotate: "Ruota",
    grayscale: "Bianco e nero",
    watermark: "Aggiungi filigrana",
    "to-pdf": "Incorpora in PDF",
  },
  templates: {
    webOptimised: "Foto ottimizzata per il web",
    watermarkedWebp: "WebP con filigrana",
    imageToPdf: "Immagine → PDF brandizzato",
  },
  resize: { width: "Larghezza", height: "Altezza", fitRatio: "Mantieni proporzioni" },
  format: {
    label: "Formato",
    quality: "Qualità",
    webp: "WebP",
    jpg: "JPG",
    png: "PNG",
  },
  rotate: { angle: "Angolo" },
  watermark: {
    text: "Testo",
    position: "Posizione",
    size: "Dimensione",
    colour: "Colore",
    opacity: "Opacità",
    positions: {
      br: "In basso a destra",
      bl: "In basso a sinistra",
      tr: "In alto a destra",
      tl: "In alto a sinistra",
      c: "Centro",
    },
  },
  toPdf: {
    page: "Pagina",
    margin: "Margine",
    marginUnit: "pt",
    pageSizes: { A4: "A4", Letter: "Letter", Fit: "Adatta all'immagine" },
  },
};

const nl: WorkflowStrings = {
  meta: {
    title: "Workflow-builder — Koppel conversies met één klik",
    description:
      "Bouw een pipeline van beeldconversies: formaat wijzigen, formaat converteren, draaien, watermerk, insluiten in PDF — tot 5 stappen, allemaal in je browser.",
  },
  hero: {
    title: "Workflow-builder",
    lead: "Koppel tot 5 conversiestappen voor één afbeelding — formaat wijzigen, converteren, draaien, watermerk, insluiten in PDF. Herschik, voer uit, download. Alles gebeurt in je browser.",
  },
  upload: {
    cta: "Upload een afbeelding om te beginnen",
    hint: (max) => `JPG · PNG · WebP — koppel hieronder tot ${max} stappen`,
  },
  pipeline: {
    heading: (n, max) => `Pipeline (${n}/${max} stappen)`,
    addStep: "stap toevoegen:",
    runIdle: (n) => `Pipeline uitvoeren (${n})`,
    runBusy: (cur, total) => `Stap ${cur}/${total} wordt uitgevoerd…`,
    download: (size) => `Downloaden · ${size}`,
    stepFailed: (n, message) => `Stap ${n} mislukt: ${message}`,
    footnote:
      "100 % in je browser verwerkt — je afbeelding wordt nooit geüpload. Elke stap voedt de volgende; herschik of verwijder naar wens.",
  },
  stepLabels: {
    resize: "Formaat wijzigen",
    format: "Formaat converteren",
    rotate: "Draaien",
    grayscale: "Zwart-wit",
    watermark: "Watermerk toevoegen",
    "to-pdf": "Insluiten in PDF",
  },
  templates: {
    webOptimised: "Voor web geoptimaliseerde foto",
    watermarkedWebp: "WebP met watermerk",
    imageToPdf: "Afbeelding → merk-PDF",
  },
  resize: { width: "Breedte", height: "Hoogte", fitRatio: "Verhouding behouden" },
  format: {
    label: "Formaat",
    quality: "Kwaliteit",
    webp: "WebP",
    jpg: "JPG",
    png: "PNG",
  },
  rotate: { angle: "Hoek" },
  watermark: {
    text: "Tekst",
    position: "Positie",
    size: "Grootte",
    colour: "Kleur",
    opacity: "Dekking",
    positions: {
      br: "Rechtsonder",
      bl: "Linksonder",
      tr: "Rechtsboven",
      tl: "Linksboven",
      c: "Midden",
    },
  },
  toPdf: {
    page: "Pagina",
    margin: "Marge",
    marginUnit: "pt",
    pageSizes: { A4: "A4", Letter: "Letter", Fit: "Aanpassen aan afbeelding" },
  },
};

const ja: WorkflowStrings = {
  meta: {
    title: "ワークフロービルダー — ワンクリックで変換を連結",
    description:
      "画像変換のパイプラインを構築：リサイズ、形式変換、回転、ウォーターマーク、PDFへの埋め込み — 最大5ステップ、すべてブラウザ内で。",
  },
  hero: {
    title: "ワークフロービルダー",
    lead: "1枚の画像に最大5つの変換ステップを連結 — リサイズ、変換、回転、ウォーターマーク、PDFへの埋め込み。並べ替え、実行、ダウンロード。すべてブラウザ内で行われます。",
  },
  upload: {
    cta: "画像をアップロードして開始",
    hint: (max) => `JPG · PNG · WebP — 以下で最大${max}ステップを連結`,
  },
  pipeline: {
    heading: (n, max) => `パイプライン（${n}/${max} ステップ）`,
    addStep: "ステップを追加：",
    runIdle: (n) => `パイプラインを実行（${n}）`,
    runBusy: (cur, total) => `ステップ ${cur}/${total} を実行中…`,
    download: (size) => `ダウンロード · ${size}`,
    stepFailed: (n, message) => `ステップ ${n} が失敗しました：${message}`,
    footnote:
      "100% ブラウザ内で処理 — 画像がアップロードされることはありません。各ステップが次のステップに引き継がれます。自由に並べ替えや削除ができます。",
  },
  stepLabels: {
    resize: "リサイズ",
    format: "形式を変換",
    rotate: "回転",
    grayscale: "白黒",
    watermark: "ウォーターマークを追加",
    "to-pdf": "PDFに埋め込み",
  },
  templates: {
    webOptimised: "Web最適化された写真",
    watermarkedWebp: "ウォーターマーク付きWebP",
    imageToPdf: "画像 → ブランドPDF",
  },
  resize: { width: "幅", height: "高さ", fitRatio: "縦横比を維持" },
  format: {
    label: "形式",
    quality: "品質",
    webp: "WebP",
    jpg: "JPG",
    png: "PNG",
  },
  rotate: { angle: "角度" },
  watermark: {
    text: "テキスト",
    position: "位置",
    size: "サイズ",
    colour: "色",
    opacity: "不透明度",
    positions: {
      br: "右下",
      bl: "左下",
      tr: "右上",
      tl: "左上",
      c: "中央",
    },
  },
  toPdf: {
    page: "ページ",
    margin: "余白",
    marginUnit: "pt",
    pageSizes: { A4: "A4", Letter: "Letter", Fit: "画像に合わせる" },
  },
};

const zh: WorkflowStrings = {
  meta: {
    title: "工作流构建器 — 一键串联转换",
    description:
      "构建图像转换流水线：调整尺寸、转换格式、旋转、水印、嵌入 PDF — 最多 5 个步骤，全部在浏览器中完成。",
  },
  hero: {
    title: "工作流构建器",
    lead: "为单张图像串联最多 5 个转换步骤 — 调整尺寸、转换、旋转、水印、嵌入 PDF。重新排序、运行、下载。一切都在浏览器中进行。",
  },
  upload: {
    cta: "上传图像即可开始",
    hint: (max) => `JPG · PNG · WebP — 在下方串联最多 ${max} 个步骤`,
  },
  pipeline: {
    heading: (n, max) => `流水线（${n}/${max} 个步骤）`,
    addStep: "添加步骤：",
    runIdle: (n) => `运行流水线（${n}）`,
    runBusy: (cur, total) => `正在运行步骤 ${cur}/${total}…`,
    download: (size) => `下载 · ${size}`,
    stepFailed: (n, message) => `步骤 ${n} 失败：${message}`,
    footnote:
      "100% 在浏览器中处理 — 您的图像绝不会被上传。每个步骤都会传递给下一个步骤；可自由重新排序或删除。",
  },
  stepLabels: {
    resize: "调整尺寸",
    format: "转换格式",
    rotate: "旋转",
    grayscale: "黑白",
    watermark: "添加水印",
    "to-pdf": "嵌入 PDF",
  },
  templates: {
    webOptimised: "网页优化照片",
    watermarkedWebp: "带水印的 WebP",
    imageToPdf: "图像 → 品牌 PDF",
  },
  resize: { width: "宽度", height: "高度", fitRatio: "保持比例" },
  format: {
    label: "格式",
    quality: "质量",
    webp: "WebP",
    jpg: "JPG",
    png: "PNG",
  },
  rotate: { angle: "角度" },
  watermark: {
    text: "文本",
    position: "位置",
    size: "大小",
    colour: "颜色",
    opacity: "不透明度",
    positions: {
      br: "右下角",
      bl: "左下角",
      tr: "右上角",
      tl: "左上角",
      c: "居中",
    },
  },
  toPdf: {
    page: "页面",
    margin: "页边距",
    marginUnit: "pt",
    pageSizes: { A4: "A4", Letter: "Letter", Fit: "适应图像" },
  },
};

const ko: WorkflowStrings = {
  meta: {
    title: "워크플로 빌더 — 클릭 한 번으로 변환 연결",
    description:
      "이미지 변환 파이프라인 구축: 크기 조정, 형식 변환, 회전, 워터마크, PDF에 삽입 — 최대 5단계, 모두 브라우저에서.",
  },
  hero: {
    title: "워크플로 빌더",
    lead: "단일 이미지에 최대 5개의 변환 단계를 연결 — 크기 조정, 변환, 회전, 워터마크, PDF에 삽입. 순서 변경, 실행, 다운로드. 모든 작업이 브라우저에서 이루어집니다.",
  },
  upload: {
    cta: "이미지를 업로드하여 시작하세요",
    hint: (max) => `JPG · PNG · WebP — 아래에서 최대 ${max}단계 연결`,
  },
  pipeline: {
    heading: (n, max) => `파이프라인 (${n}/${max} 단계)`,
    addStep: "단계 추가:",
    runIdle: (n) => `파이프라인 실행 (${n})`,
    runBusy: (cur, total) => `${cur}/${total} 단계 실행 중…`,
    download: (size) => `다운로드 · ${size}`,
    stepFailed: (n, message) => `${n}단계 실패: ${message}`,
    footnote:
      "100% 브라우저에서 처리 — 이미지는 업로드되지 않습니다. 각 단계는 다음 단계로 이어집니다. 자유롭게 순서를 변경하거나 제거하세요.",
  },
  stepLabels: {
    resize: "크기 조정",
    format: "형식 변환",
    rotate: "회전",
    grayscale: "흑백",
    watermark: "워터마크 추가",
    "to-pdf": "PDF에 삽입",
  },
  templates: {
    webOptimised: "웹 최적화 사진",
    watermarkedWebp: "워터마크가 있는 WebP",
    imageToPdf: "이미지 → 브랜드 PDF",
  },
  resize: { width: "너비", height: "높이", fitRatio: "비율 유지" },
  format: {
    label: "형식",
    quality: "품질",
    webp: "WebP",
    jpg: "JPG",
    png: "PNG",
  },
  rotate: { angle: "각도" },
  watermark: {
    text: "텍스트",
    position: "위치",
    size: "크기",
    colour: "색상",
    opacity: "불투명도",
    positions: {
      br: "오른쪽 아래",
      bl: "왼쪽 아래",
      tr: "오른쪽 위",
      tl: "왼쪽 위",
      c: "가운데",
    },
  },
  toPdf: {
    page: "페이지",
    margin: "여백",
    marginUnit: "pt",
    pageSizes: { A4: "A4", Letter: "Letter", Fit: "이미지에 맞춤" },
  },
};

const ar: WorkflowStrings = {
  meta: {
    title: "منشئ سير العمل — اربط التحويلات بنقرة واحدة",
    description:
      "أنشئ سلسلة من تحويلات الصور: تغيير الحجم، تحويل الصيغة، التدوير، العلامة المائية، التضمين في PDF — حتى 5 خطوات، كل ذلك في متصفحك.",
  },
  hero: {
    title: "منشئ سير العمل",
    lead: "اربط حتى 5 خطوات تحويل لصورة واحدة — تغيير الحجم، التحويل، التدوير، العلامة المائية، التضمين في PDF. أعد الترتيب، شغّل، نزّل. كل شيء يحدث في متصفحك.",
  },
  upload: {
    cta: "ارفع صورة للبدء",
    hint: (max) => `JPG · PNG · WebP — اربط حتى ${max} خطوات أدناه`,
  },
  pipeline: {
    heading: (n, max) => `سلسلة المعالجة (${n}/${max} خطوات)`,
    addStep: "إضافة خطوة:",
    runIdle: (n) => `تشغيل السلسلة (${n})`,
    runBusy: (cur, total) => `جارٍ تنفيذ الخطوة ${cur}/${total}…`,
    download: (size) => `تنزيل · ${size}`,
    stepFailed: (n, message) => `فشلت الخطوة ${n}: ${message}`,
    footnote:
      "تتم المعالجة بنسبة 100% في متصفحك — لا يتم رفع صورتك أبدًا. كل خطوة تغذّي التالية؛ أعد الترتيب أو احذف بحرية.",
  },
  stepLabels: {
    resize: "تغيير الحجم",
    format: "تحويل الصيغة",
    rotate: "تدوير",
    grayscale: "أبيض وأسود",
    watermark: "إضافة علامة مائية",
    "to-pdf": "التضمين في PDF",
  },
  templates: {
    webOptimised: "صورة محسّنة للويب",
    watermarkedWebp: "WebP بعلامة مائية",
    imageToPdf: "صورة → PDF بعلامة تجارية",
  },
  resize: { width: "العرض", height: "الارتفاع", fitRatio: "الحفاظ على النسبة" },
  format: {
    label: "الصيغة",
    quality: "الجودة",
    webp: "WebP",
    jpg: "JPG",
    png: "PNG",
  },
  rotate: { angle: "الزاوية" },
  watermark: {
    text: "النص",
    position: "الموضع",
    size: "الحجم",
    colour: "اللون",
    opacity: "الشفافية",
    positions: {
      br: "أسفل اليمين",
      bl: "أسفل اليسار",
      tr: "أعلى اليمين",
      tl: "أعلى اليسار",
      c: "الوسط",
    },
  },
  toPdf: {
    page: "الصفحة",
    margin: "الهامش",
    marginUnit: "pt",
    pageSizes: { A4: "A4", Letter: "Letter", Fit: "ملاءمة الصورة" },
  },
};

const ru: WorkflowStrings = {
  meta: {
    title: "Конструктор рабочих процессов — Объедините преобразования в один клик",
    description:
      "Создайте конвейер преобразований изображений: изменение размера, конвертация формата, поворот, водяной знак, встраивание в PDF — до 5 шагов, всё в вашем браузере.",
  },
  hero: {
    title: "Конструктор рабочих процессов",
    lead: "Объедините до 5 шагов преобразования для одного изображения — изменение размера, конвертация, поворот, водяной знак, встраивание в PDF. Меняйте порядок, запускайте, скачивайте. Всё происходит в вашем браузере.",
  },
  upload: {
    cta: "Загрузите изображение, чтобы начать",
    hint: (max) => `JPG · PNG · WebP — объедините до ${max} шагов ниже`,
  },
  pipeline: {
    heading: (n, max) => `Конвейер (${n}/${max} шагов)`,
    addStep: "добавить шаг:",
    runIdle: (n) => `Запустить конвейер (${n})`,
    runBusy: (cur, total) => `Выполняется шаг ${cur}/${total}…`,
    download: (size) => `Скачать · ${size}`,
    stepFailed: (n, message) => `Шаг ${n} не выполнен: ${message}`,
    footnote:
      "Обработка на 100 % в вашем браузере — изображение никогда не загружается на сервер. Каждый шаг передаётся следующему; меняйте порядок или удаляйте свободно.",
  },
  stepLabels: {
    resize: "Изменить размер",
    format: "Конвертировать формат",
    rotate: "Повернуть",
    grayscale: "Чёрно-белое",
    watermark: "Добавить водяной знак",
    "to-pdf": "Встроить в PDF",
  },
  templates: {
    webOptimised: "Оптимизированное для веба фото",
    watermarkedWebp: "WebP с водяным знаком",
    imageToPdf: "Изображение → фирменный PDF",
  },
  resize: { width: "Ширина", height: "Высота", fitRatio: "Сохранять пропорции" },
  format: {
    label: "Формат",
    quality: "Качество",
    webp: "WebP",
    jpg: "JPG",
    png: "PNG",
  },
  rotate: { angle: "Угол" },
  watermark: {
    text: "Текст",
    position: "Положение",
    size: "Размер",
    colour: "Цвет",
    opacity: "Непрозрачность",
    positions: {
      br: "Внизу справа",
      bl: "Внизу слева",
      tr: "Вверху справа",
      tl: "Вверху слева",
      c: "По центру",
    },
  },
  toPdf: {
    page: "Страница",
    margin: "Поле",
    marginUnit: "pt",
    pageSizes: { A4: "A4", Letter: "Letter", Fit: "По размеру изображения" },
  },
};

const hi: WorkflowStrings = {
  meta: {
    title: "वर्कफ़्लो बिल्डर — एक क्लिक में रूपांतरण जोड़ें",
    description:
      "इमेज रूपांतरणों की एक पाइपलाइन बनाएं: आकार बदलें, फ़ॉर्मेट बदलें, घुमाएं, वॉटरमार्क, PDF में एम्बेड करें — 5 चरणों तक, सब कुछ आपके ब्राउज़र में।",
  },
  hero: {
    title: "वर्कफ़्लो बिल्डर",
    lead: "एक ही इमेज के लिए 5 तक रूपांतरण चरण जोड़ें — आकार बदलें, बदलें, घुमाएं, वॉटरमार्क, PDF में एम्बेड करें। पुनः क्रमित करें, चलाएं, डाउनलोड करें। सब कुछ आपके ब्राउज़र में होता है।",
  },
  upload: {
    cta: "शुरू करने के लिए एक इमेज अपलोड करें",
    hint: (max) => `JPG · PNG · WebP — नीचे ${max} चरणों तक जोड़ें`,
  },
  pipeline: {
    heading: (n, max) => `पाइपलाइन (${n}/${max} चरण)`,
    addStep: "चरण जोड़ें:",
    runIdle: (n) => `पाइपलाइन चलाएं (${n})`,
    runBusy: (cur, total) => `चरण ${cur}/${total} चल रहा है…`,
    download: (size) => `डाउनलोड · ${size}`,
    stepFailed: (n, message) => `चरण ${n} विफल रहा: ${message}`,
    footnote:
      "100% आपके ब्राउज़र में संसाधित — आपकी इमेज कभी अपलोड नहीं होती। हर चरण अगले को फ़ीड करता है; स्वतंत्र रूप से पुनः क्रमित करें या हटाएं।",
  },
  stepLabels: {
    resize: "आकार बदलें",
    format: "फ़ॉर्मेट बदलें",
    rotate: "घुमाएं",
    grayscale: "श्वेत-श्याम",
    watermark: "वॉटरमार्क जोड़ें",
    "to-pdf": "PDF में एम्बेड करें",
  },
  templates: {
    webOptimised: "वेब-अनुकूलित फ़ोटो",
    watermarkedWebp: "वॉटरमार्क वाली WebP",
    imageToPdf: "इमेज → ब्रांडेड PDF",
  },
  resize: { width: "चौड़ाई", height: "ऊंचाई", fitRatio: "अनुपात बनाए रखें" },
  format: {
    label: "फ़ॉर्मेट",
    quality: "गुणवत्ता",
    webp: "WebP",
    jpg: "JPG",
    png: "PNG",
  },
  rotate: { angle: "कोण" },
  watermark: {
    text: "टेक्स्ट",
    position: "स्थिति",
    size: "आकार",
    colour: "रंग",
    opacity: "अपारदर्शिता",
    positions: {
      br: "नीचे दाएं",
      bl: "नीचे बाएं",
      tr: "ऊपर दाएं",
      tl: "ऊपर बाएं",
      c: "केंद्र",
    },
  },
  toPdf: {
    page: "पृष्ठ",
    margin: "मार्जिन",
    marginUnit: "pt",
    pageSizes: { A4: "A4", Letter: "Letter", Fit: "इमेज के अनुसार फ़िट करें" },
  },
};

const tr: WorkflowStrings = {
  meta: {
    title: "İş Akışı Oluşturucu — Dönüştürmeleri tek tıkla zincirleyin",
    description:
      "Bir görüntü dönüştürme hattı oluşturun: yeniden boyutlandırın, biçim dönüştürün, döndürün, filigran ekleyin, PDF'ye gömün — 5 adıma kadar, tümü tarayıcınızda.",
  },
  hero: {
    title: "İş Akışı Oluşturucu",
    lead: "Tek bir görüntü için 5 adıma kadar dönüştürme adımını zincirleyin — yeniden boyutlandırın, dönüştürün, döndürün, filigran ekleyin, PDF'ye gömün. Yeniden sıralayın, çalıştırın, indirin. Her şey tarayıcınızda gerçekleşir.",
  },
  upload: {
    cta: "Başlamak için bir görüntü yükleyin",
    hint: (max) => `JPG · PNG · WebP — aşağıda ${max} adıma kadar zincirleyin`,
  },
  pipeline: {
    heading: (n, max) => `Hat (${n}/${max} adım)`,
    addStep: "adım ekle:",
    runIdle: (n) => `Hattı çalıştır (${n})`,
    runBusy: (cur, total) => `${cur}/${total} adımı çalıştırılıyor…`,
    download: (size) => `İndir · ${size}`,
    stepFailed: (n, message) => `${n}. adım başarısız oldu: ${message}`,
    footnote:
      "%100 tarayıcınızda işlenir — görüntünüz asla yüklenmez. Her adım bir sonrakini besler; serbestçe yeniden sıralayın veya kaldırın.",
  },
  stepLabels: {
    resize: "Yeniden boyutlandır",
    format: "Biçim dönüştür",
    rotate: "Döndür",
    grayscale: "Siyah beyaz",
    watermark: "Filigran ekle",
    "to-pdf": "PDF'ye göm",
  },
  templates: {
    webOptimised: "Web için optimize edilmiş fotoğraf",
    watermarkedWebp: "Filigranlı WebP",
    imageToPdf: "Görüntü → markalı PDF",
  },
  resize: { width: "Genişlik", height: "Yükseklik", fitRatio: "Oranı koru" },
  format: {
    label: "Biçim",
    quality: "Kalite",
    webp: "WebP",
    jpg: "JPG",
    png: "PNG",
  },
  rotate: { angle: "Açı" },
  watermark: {
    text: "Metin",
    position: "Konum",
    size: "Boyut",
    colour: "Renk",
    opacity: "Saydamlık",
    positions: {
      br: "Sağ alt",
      bl: "Sol alt",
      tr: "Sağ üst",
      tl: "Sol üst",
      c: "Orta",
    },
  },
  toPdf: {
    page: "Sayfa",
    margin: "Kenar boşluğu",
    marginUnit: "pt",
    pageSizes: { A4: "A4", Letter: "Letter", Fit: "Görüntüye sığdır" },
  },
};

const id: WorkflowStrings = {
  meta: {
    title: "Pembuat Alur Kerja — Rangkai konversi dengan satu klik",
    description:
      "Buat pipeline konversi gambar: ubah ukuran, konversi format, putar, tanda air, sematkan ke PDF — hingga 5 langkah, semua di browser Anda.",
  },
  hero: {
    title: "Pembuat Alur Kerja",
    lead: "Rangkai hingga 5 langkah konversi untuk satu gambar — ubah ukuran, konversi, putar, tanda air, sematkan ke PDF. Susun ulang, jalankan, unduh. Semuanya terjadi di browser Anda.",
  },
  upload: {
    cta: "Unggah gambar untuk memulai",
    hint: (max) => `JPG · PNG · WebP — rangkai hingga ${max} langkah di bawah`,
  },
  pipeline: {
    heading: (n, max) => `Pipeline (${n}/${max} langkah)`,
    addStep: "tambah langkah:",
    runIdle: (n) => `Jalankan pipeline (${n})`,
    runBusy: (cur, total) => `Menjalankan langkah ${cur}/${total}…`,
    download: (size) => `Unduh · ${size}`,
    stepFailed: (n, message) => `Langkah ${n} gagal: ${message}`,
    footnote:
      "Diproses 100% di browser Anda — gambar Anda tidak pernah diunggah. Setiap langkah menjadi masukan langkah berikutnya; susun ulang atau hapus dengan bebas.",
  },
  stepLabels: {
    resize: "Ubah ukuran",
    format: "Konversi format",
    rotate: "Putar",
    grayscale: "Hitam putih",
    watermark: "Tambah tanda air",
    "to-pdf": "Sematkan ke PDF",
  },
  templates: {
    webOptimised: "Foto teroptimasi untuk web",
    watermarkedWebp: "WebP bertanda air",
    imageToPdf: "Gambar → PDF bermerek",
  },
  resize: { width: "Lebar", height: "Tinggi", fitRatio: "Pertahankan rasio" },
  format: {
    label: "Format",
    quality: "Kualitas",
    webp: "WebP",
    jpg: "JPG",
    png: "PNG",
  },
  rotate: { angle: "Sudut" },
  watermark: {
    text: "Teks",
    position: "Posisi",
    size: "Ukuran",
    colour: "Warna",
    opacity: "Opasitas",
    positions: {
      br: "Kanan bawah",
      bl: "Kiri bawah",
      tr: "Kanan atas",
      tl: "Kiri atas",
      c: "Tengah",
    },
  },
  toPdf: {
    page: "Halaman",
    margin: "Margin",
    marginUnit: "pt",
    pageSizes: { A4: "A4", Letter: "Letter", Fit: "Sesuaikan dengan gambar" },
  },
};

const vi: WorkflowStrings = {
  meta: {
    title: "Trình tạo quy trình — Nối các chuyển đổi chỉ với một cú nhấp",
    description:
      "Xây dựng một pipeline chuyển đổi hình ảnh: thay đổi kích thước, chuyển đổi định dạng, xoay, hình mờ, nhúng vào PDF — tối đa 5 bước, tất cả trong trình duyệt của bạn.",
  },
  hero: {
    title: "Trình tạo quy trình",
    lead: "Nối tối đa 5 bước chuyển đổi cho một hình ảnh — thay đổi kích thước, chuyển đổi, xoay, hình mờ, nhúng vào PDF. Sắp xếp lại, chạy, tải xuống. Mọi thứ đều diễn ra trong trình duyệt của bạn.",
  },
  upload: {
    cta: "Tải lên một hình ảnh để bắt đầu",
    hint: (max) => `JPG · PNG · WebP — nối tối đa ${max} bước bên dưới`,
  },
  pipeline: {
    heading: (n, max) => `Pipeline (${n}/${max} bước)`,
    addStep: "thêm bước:",
    runIdle: (n) => `Chạy pipeline (${n})`,
    runBusy: (cur, total) => `Đang chạy bước ${cur}/${total}…`,
    download: (size) => `Tải xuống · ${size}`,
    stepFailed: (n, message) => `Bước ${n} thất bại: ${message}`,
    footnote:
      "Xử lý 100% trong trình duyệt của bạn — hình ảnh của bạn không bao giờ được tải lên. Mỗi bước cấp dữ liệu cho bước tiếp theo; sắp xếp lại hoặc xóa tùy ý.",
  },
  stepLabels: {
    resize: "Thay đổi kích thước",
    format: "Chuyển đổi định dạng",
    rotate: "Xoay",
    grayscale: "Đen trắng",
    watermark: "Thêm hình mờ",
    "to-pdf": "Nhúng vào PDF",
  },
  templates: {
    webOptimised: "Ảnh tối ưu cho web",
    watermarkedWebp: "WebP có hình mờ",
    imageToPdf: "Hình ảnh → PDF thương hiệu",
  },
  resize: { width: "Chiều rộng", height: "Chiều cao", fitRatio: "Giữ tỷ lệ" },
  format: {
    label: "Định dạng",
    quality: "Chất lượng",
    webp: "WebP",
    jpg: "JPG",
    png: "PNG",
  },
  rotate: { angle: "Góc" },
  watermark: {
    text: "Văn bản",
    position: "Vị trí",
    size: "Kích thước",
    colour: "Màu sắc",
    opacity: "Độ mờ",
    positions: {
      br: "Dưới bên phải",
      bl: "Dưới bên trái",
      tr: "Trên bên phải",
      tl: "Trên bên trái",
      c: "Giữa",
    },
  },
  toPdf: {
    page: "Trang",
    margin: "Lề",
    marginUnit: "pt",
    pageSizes: { A4: "A4", Letter: "Letter", Fit: "Vừa với hình ảnh" },
  },
};

const sv: WorkflowStrings = {
  meta: {
    title: "Arbetsflödesbyggare — Kedja konverteringar med ett klick",
    description:
      "Bygg en pipeline av bildkonverteringar: ändra storlek, konvertera format, rotera, vattenstämpel, bädda in i PDF — upp till 5 steg, allt i din webbläsare.",
  },
  hero: {
    title: "Arbetsflödesbyggare",
    lead: "Kedja upp till 5 konverteringssteg för en enda bild — ändra storlek, konvertera, rotera, vattenstämpel, bädda in i PDF. Ändra ordning, kör, ladda ner. Allt sker i din webbläsare.",
  },
  upload: {
    cta: "Ladda upp en bild för att börja",
    hint: (max) => `JPG · PNG · WebP — kedja upp till ${max} steg nedan`,
  },
  pipeline: {
    heading: (n, max) => `Pipeline (${n}/${max} steg)`,
    addStep: "lägg till steg:",
    runIdle: (n) => `Kör pipeline (${n})`,
    runBusy: (cur, total) => `Kör steg ${cur}/${total}…`,
    download: (size) => `Ladda ner · ${size}`,
    stepFailed: (n, message) => `Steg ${n} misslyckades: ${message}`,
    footnote:
      "Bearbetas 100 % i din webbläsare — din bild laddas aldrig upp. Varje steg matar nästa; ändra ordning eller ta bort fritt.",
  },
  stepLabels: {
    resize: "Ändra storlek",
    format: "Konvertera format",
    rotate: "Rotera",
    grayscale: "Svartvitt",
    watermark: "Lägg till vattenstämpel",
    "to-pdf": "Bädda in i PDF",
  },
  templates: {
    webOptimised: "Webboptimerat foto",
    watermarkedWebp: "WebP med vattenstämpel",
    imageToPdf: "Bild → varumärkt PDF",
  },
  resize: { width: "Bredd", height: "Höjd", fitRatio: "Behåll proportioner" },
  format: {
    label: "Format",
    quality: "Kvalitet",
    webp: "WebP",
    jpg: "JPG",
    png: "PNG",
  },
  rotate: { angle: "Vinkel" },
  watermark: {
    text: "Text",
    position: "Position",
    size: "Storlek",
    colour: "Färg",
    opacity: "Opacitet",
    positions: {
      br: "Nere till höger",
      bl: "Nere till vänster",
      tr: "Uppe till höger",
      tl: "Uppe till vänster",
      c: "Mitten",
    },
  },
  toPdf: {
    page: "Sida",
    margin: "Marginal",
    marginUnit: "pt",
    pageSizes: { A4: "A4", Letter: "Letter", Fit: "Anpassa till bild" },
  },
};

const pl: WorkflowStrings = {
  meta: {
    title: "Kreator przepływów pracy — Łącz konwersje jednym kliknięciem",
    description:
      "Zbuduj potok konwersji obrazów: zmiana rozmiaru, konwersja formatu, obrót, znak wodny, osadzanie w PDF — do 5 kroków, wszystko w Twojej przeglądarce.",
  },
  hero: {
    title: "Kreator przepływów pracy",
    lead: "Połącz do 5 kroków konwersji dla jednego obrazu — zmiana rozmiaru, konwersja, obrót, znak wodny, osadzanie w PDF. Zmieniaj kolejność, uruchamiaj, pobieraj. Wszystko dzieje się w Twojej przeglądarce.",
  },
  upload: {
    cta: "Prześlij obraz, aby rozpocząć",
    hint: (max) => `JPG · PNG · WebP — połącz poniżej do ${max} kroków`,
  },
  pipeline: {
    heading: (n, max) => `Potok (${n}/${max} kroków)`,
    addStep: "dodaj krok:",
    runIdle: (n) => `Uruchom potok (${n})`,
    runBusy: (cur, total) => `Wykonywanie kroku ${cur}/${total}…`,
    download: (size) => `Pobierz · ${size}`,
    stepFailed: (n, message) => `Krok ${n} nie powiódł się: ${message}`,
    footnote:
      "Przetwarzane w 100 % w Twojej przeglądarce — Twój obraz nigdy nie jest przesyłany. Każdy krok zasila następny; dowolnie zmieniaj kolejność lub usuwaj.",
  },
  stepLabels: {
    resize: "Zmień rozmiar",
    format: "Konwertuj format",
    rotate: "Obróć",
    grayscale: "Czarno-białe",
    watermark: "Dodaj znak wodny",
    "to-pdf": "Osadź w PDF",
  },
  templates: {
    webOptimised: "Zdjęcie zoptymalizowane pod kątem sieci",
    watermarkedWebp: "WebP ze znakiem wodnym",
    imageToPdf: "Obraz → markowy PDF",
  },
  resize: { width: "Szerokość", height: "Wysokość", fitRatio: "Zachowaj proporcje" },
  format: {
    label: "Format",
    quality: "Jakość",
    webp: "WebP",
    jpg: "JPG",
    png: "PNG",
  },
  rotate: { angle: "Kąt" },
  watermark: {
    text: "Tekst",
    position: "Pozycja",
    size: "Rozmiar",
    colour: "Kolor",
    opacity: "Krycie",
    positions: {
      br: "Prawy dolny",
      bl: "Lewy dolny",
      tr: "Prawy górny",
      tl: "Lewy górny",
      c: "Środek",
    },
  },
  toPdf: {
    page: "Strona",
    margin: "Margines",
    marginUnit: "pt",
    pageSizes: { A4: "A4", Letter: "Letter", Fit: "Dopasuj do obrazu" },
  },
};

const uk: WorkflowStrings = {
  meta: {
    title: "Конструктор робочих процесів — Об'єднуйте перетворення одним кліком",
    description:
      "Створіть конвеєр перетворень зображень: зміна розміру, конвертація формату, поворот, водяний знак, вбудовування в PDF — до 5 кроків, усе у вашому браузері.",
  },
  hero: {
    title: "Конструктор робочих процесів",
    lead: "Об'єднайте до 5 кроків перетворення для одного зображення — зміна розміру, конвертація, поворот, водяний знак, вбудовування в PDF. Змінюйте порядок, запускайте, завантажуйте. Усе відбувається у вашому браузері.",
  },
  upload: {
    cta: "Завантажте зображення, щоб почати",
    hint: (max) => `JPG · PNG · WebP — об'єднайте до ${max} кроків нижче`,
  },
  pipeline: {
    heading: (n, max) => `Конвеєр (${n}/${max} кроків)`,
    addStep: "додати крок:",
    runIdle: (n) => `Запустити конвеєр (${n})`,
    runBusy: (cur, total) => `Виконується крок ${cur}/${total}…`,
    download: (size) => `Завантажити · ${size}`,
    stepFailed: (n, message) => `Крок ${n} не вдалося виконати: ${message}`,
    footnote:
      "Обробка на 100 % у вашому браузері — ваше зображення ніколи не завантажується. Кожен крок передається наступному; вільно змінюйте порядок або видаляйте.",
  },
  stepLabels: {
    resize: "Змінити розмір",
    format: "Конвертувати формат",
    rotate: "Повернути",
    grayscale: "Чорно-біле",
    watermark: "Додати водяний знак",
    "to-pdf": "Вбудувати в PDF",
  },
  templates: {
    webOptimised: "Оптимізоване для вебу фото",
    watermarkedWebp: "WebP із водяним знаком",
    imageToPdf: "Зображення → брендований PDF",
  },
  resize: { width: "Ширина", height: "Висота", fitRatio: "Зберігати пропорції" },
  format: {
    label: "Формат",
    quality: "Якість",
    webp: "WebP",
    jpg: "JPG",
    png: "PNG",
  },
  rotate: { angle: "Кут" },
  watermark: {
    text: "Текст",
    position: "Положення",
    size: "Розмір",
    colour: "Колір",
    opacity: "Непрозорість",
    positions: {
      br: "Внизу праворуч",
      bl: "Внизу ліворуч",
      tr: "Вгорі праворуч",
      tl: "Вгорі ліворуч",
      c: "По центру",
    },
  },
  toPdf: {
    page: "Сторінка",
    margin: "Поле",
    marginUnit: "pt",
    pageSizes: { A4: "A4", Letter: "Letter", Fit: "За розміром зображення" },
  },
};

const cs: WorkflowStrings = {
  meta: {
    title: "Tvůrce pracovních postupů — Zřetězte konverze jedním kliknutím",
    description:
      "Sestavte pipeline konverzí obrázků: změna velikosti, konverze formátu, otočení, vodoznak, vložení do PDF — až 5 kroků, vše ve vašem prohlížeči.",
  },
  hero: {
    title: "Tvůrce pracovních postupů",
    lead: "Zřetězte až 5 kroků konverze pro jeden obrázek — změna velikosti, konverze, otočení, vodoznak, vložení do PDF. Měňte pořadí, spouštějte, stahujte. Vše probíhá ve vašem prohlížeči.",
  },
  upload: {
    cta: "Nahrajte obrázek a začněte",
    hint: (max) => `JPG · PNG · WebP — zřetězte níže až ${max} kroků`,
  },
  pipeline: {
    heading: (n, max) => `Pipeline (${n}/${max} kroků)`,
    addStep: "přidat krok:",
    runIdle: (n) => `Spustit pipeline (${n})`,
    runBusy: (cur, total) => `Probíhá krok ${cur}/${total}…`,
    download: (size) => `Stáhnout · ${size}`,
    stepFailed: (n, message) => `Krok ${n} selhal: ${message}`,
    footnote:
      "Zpracováno 100 % ve vašem prohlížeči — váš obrázek se nikdy nenahrává. Každý krok navazuje na další; volně měňte pořadí nebo odstraňujte.",
  },
  stepLabels: {
    resize: "Změnit velikost",
    format: "Převést formát",
    rotate: "Otočit",
    grayscale: "Černobílé",
    watermark: "Přidat vodoznak",
    "to-pdf": "Vložit do PDF",
  },
  templates: {
    webOptimised: "Foto optimalizované pro web",
    watermarkedWebp: "WebP s vodoznakem",
    imageToPdf: "Obrázek → značkové PDF",
  },
  resize: { width: "Šířka", height: "Výška", fitRatio: "Zachovat poměr stran" },
  format: {
    label: "Formát",
    quality: "Kvalita",
    webp: "WebP",
    jpg: "JPG",
    png: "PNG",
  },
  rotate: { angle: "Úhel" },
  watermark: {
    text: "Text",
    position: "Pozice",
    size: "Velikost",
    colour: "Barva",
    opacity: "Krytí",
    positions: {
      br: "Vpravo dole",
      bl: "Vlevo dole",
      tr: "Vpravo nahoře",
      tl: "Vlevo nahoře",
      c: "Střed",
    },
  },
  toPdf: {
    page: "Stránka",
    margin: "Okraj",
    marginUnit: "pt",
    pageSizes: { A4: "A4", Letter: "Letter", Fit: "Přizpůsobit obrázku" },
  },
};

const TABLE: Partial<Record<Locale, WorkflowStrings>> = {
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

export function getWorkflow(locale: Locale): WorkflowStrings {
  return TABLE[locale] ?? en;
}
