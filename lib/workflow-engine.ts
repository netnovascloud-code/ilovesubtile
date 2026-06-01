// Pure-canvas image operations used by the workflow builder. Each op takes a
// Blob in and returns a Blob out, optionally with a different MIME type so
// the next step can react. All run 100% in the browser.

import { PDFDocument } from "pdf-lib";

export type StepKind = "resize" | "format" | "rotate" | "grayscale" | "watermark" | "to-pdf";

export type Step =
  | { id: string; kind: "resize"; width: number; height: number; lockRatio: boolean }
  | { id: string; kind: "format"; format: "image/webp" | "image/jpeg" | "image/png"; quality: number }
  | { id: string; kind: "rotate"; angle: 90 | 180 | 270 }
  | { id: string; kind: "grayscale" }
  | { id: string; kind: "watermark"; text: string; position: "br" | "bl" | "tr" | "tl" | "c"; size: number; color: string; opacity: number }
  | { id: string; kind: "to-pdf"; pageSize: "A4" | "Letter" | "Fit"; margin: number };

export const STEP_LABELS: Record<StepKind, string> = {
  resize: "Resize",
  format: "Convert format",
  rotate: "Rotate",
  grayscale: "Black & white",
  watermark: "Add watermark",
  "to-pdf": "Embed in PDF",
};

function loadImage(blob: Blob): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(blob);
    const img = new Image();
    img.onload = () => { URL.revokeObjectURL(url); resolve(img); };
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error("decode failed")); };
    img.src = url;
  });
}

function toBlob(canvas: HTMLCanvasElement, mime: string, quality?: number): Promise<Blob> {
  return new Promise((res, rej) => canvas.toBlob((b) => (b ? res(b) : rej(new Error("encode failed"))), mime, quality));
}

function mimeFromBlob(b: Blob): string {
  return b.type || "image/png";
}

async function runResize(blob: Blob, s: Extract<Step, { kind: "resize" }>): Promise<Blob> {
  const img = await loadImage(blob);
  let w = Math.max(1, Math.round(s.width));
  let h = Math.max(1, Math.round(s.height));
  if (s.lockRatio) {
    const k = Math.min(w / img.width, h / img.height);
    w = Math.max(1, Math.round(img.width * k));
    h = Math.max(1, Math.round(img.height * k));
  }
  const c = document.createElement("canvas"); c.width = w; c.height = h;
  c.getContext("2d")!.drawImage(img, 0, 0, w, h);
  return toBlob(c, mimeFromBlob(blob));
}

async function runFormat(blob: Blob, s: Extract<Step, { kind: "format" }>): Promise<Blob> {
  const img = await loadImage(blob);
  const c = document.createElement("canvas"); c.width = img.naturalWidth; c.height = img.naturalHeight;
  const ctx = c.getContext("2d")!;
  if (s.format === "image/jpeg") { ctx.fillStyle = "#FFFFFF"; ctx.fillRect(0, 0, c.width, c.height); }
  ctx.drawImage(img, 0, 0);
  return toBlob(c, s.format, s.format === "image/png" ? undefined : s.quality / 100);
}

async function runRotate(blob: Blob, s: Extract<Step, { kind: "rotate" }>): Promise<Blob> {
  const img = await loadImage(blob);
  const swap = s.angle === 90 || s.angle === 270;
  const c = document.createElement("canvas");
  c.width = swap ? img.naturalHeight : img.naturalWidth;
  c.height = swap ? img.naturalWidth : img.naturalHeight;
  const ctx = c.getContext("2d")!;
  ctx.save();
  ctx.translate(c.width / 2, c.height / 2);
  ctx.rotate((s.angle * Math.PI) / 180);
  ctx.drawImage(img, -img.naturalWidth / 2, -img.naturalHeight / 2);
  ctx.restore();
  return toBlob(c, mimeFromBlob(blob));
}

async function runGrayscale(blob: Blob): Promise<Blob> {
  const img = await loadImage(blob);
  const c = document.createElement("canvas"); c.width = img.naturalWidth; c.height = img.naturalHeight;
  const ctx = c.getContext("2d")!;
  ctx.filter = "grayscale(100%)";
  ctx.drawImage(img, 0, 0);
  return toBlob(c, mimeFromBlob(blob));
}

async function runWatermark(blob: Blob, s: Extract<Step, { kind: "watermark" }>): Promise<Blob> {
  const img = await loadImage(blob);
  const c = document.createElement("canvas"); c.width = img.naturalWidth; c.height = img.naturalHeight;
  const ctx = c.getContext("2d")!;
  ctx.drawImage(img, 0, 0);
  ctx.font = `bold ${s.size}px Helvetica, Arial, sans-serif`;
  ctx.textBaseline = "middle";
  ctx.fillStyle = s.color;
  ctx.globalAlpha = Math.max(0.1, Math.min(1, s.opacity / 100));
  const m = ctx.measureText(s.text);
  const tw = m.width;
  const th = s.size;
  let x = 20, y = 20 + th / 2;
  const pad = 20;
  if (s.position === "br") { x = c.width - tw - pad; y = c.height - th / 2 - pad; }
  else if (s.position === "bl") { x = pad; y = c.height - th / 2 - pad; }
  else if (s.position === "tr") { x = c.width - tw - pad; y = pad + th / 2; }
  else if (s.position === "tl") { x = pad; y = pad + th / 2; }
  else { x = (c.width - tw) / 2; y = c.height / 2; }
  ctx.fillText(s.text, x, y);
  ctx.globalAlpha = 1;
  return toBlob(c, mimeFromBlob(blob));
}

async function runToPdf(blob: Blob, s: Extract<Step, { kind: "to-pdf" }>): Promise<Blob> {
  const img = await loadImage(blob);
  const doc = await PDFDocument.create();
  // Ensure JPEG/PNG bytes for embedding. If the blob is something else, re-encode to PNG.
  let bytes = new Uint8Array(await blob.arrayBuffer());
  let mime = blob.type;
  if (mime !== "image/jpeg" && mime !== "image/png") {
    const c = document.createElement("canvas"); c.width = img.naturalWidth; c.height = img.naturalHeight;
    c.getContext("2d")!.drawImage(img, 0, 0);
    bytes = new Uint8Array(await (await toBlob(c, "image/png")).arrayBuffer());
    mime = "image/png";
  }
  const embedded = mime === "image/jpeg" ? await doc.embedJpg(bytes) : await doc.embedPng(bytes);
  const sizes = { A4: [595.28, 841.89], Letter: [612, 792] } as const;
  let pw: number, ph: number;
  if (s.pageSize === "Fit") { pw = embedded.width; ph = embedded.height; }
  else { [pw, ph] = sizes[s.pageSize]; }
  const page = doc.addPage([pw, ph]);
  if (s.pageSize === "Fit") {
    page.drawImage(embedded, { x: 0, y: 0, width: pw, height: ph });
  } else {
    const m = s.margin;
    const aw = pw - 2 * m, ah = ph - 2 * m;
    const k = Math.min(aw / embedded.width, ah / embedded.height);
    const w = embedded.width * k, h = embedded.height * k;
    page.drawImage(embedded, { x: (pw - w) / 2, y: (ph - h) / 2, width: w, height: h });
  }
  const out = await doc.save();
  return new Blob([out as BlobPart], { type: "application/pdf" });
}

export async function runStep(blob: Blob, step: Step): Promise<Blob> {
  switch (step.kind) {
    case "resize": return runResize(blob, step);
    case "format": return runFormat(blob, step);
    case "rotate": return runRotate(blob, step);
    case "grayscale": return runGrayscale(blob);
    case "watermark": return runWatermark(blob, step);
    case "to-pdf": return runToPdf(blob, step);
  }
}

export function defaultStep(kind: StepKind, width = 1280, height = 720): Step {
  const id = (typeof crypto !== "undefined" && "randomUUID" in crypto) ? crypto.randomUUID() : String(Math.random());
  switch (kind) {
    case "resize": return { id, kind, width, height, lockRatio: true };
    case "format": return { id, kind, format: "image/webp", quality: 85 };
    case "rotate": return { id, kind, angle: 90 };
    case "grayscale": return { id, kind };
    case "watermark": return { id, kind, text: "Konvertools.io", position: "br", size: 48, color: "#FFFFFF", opacity: 90 };
    case "to-pdf": return { id, kind, pageSize: "A4", margin: 20 };
  }
}
