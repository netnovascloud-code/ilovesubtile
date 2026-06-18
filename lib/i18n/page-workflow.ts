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

const TABLE: Partial<Record<Locale, WorkflowStrings>> = { en, fr };

export function getWorkflow(locale: Locale): WorkflowStrings {
  return TABLE[locale] ?? en;
}
