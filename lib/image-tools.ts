// Client-side image tools powered by <canvas>. No upload, no server — the
// file is decoded and re-encoded entirely in the browser. Free & unlimited.

export type ImageTarget = "image/png" | "image/jpeg" | "image/webp" | "keep";

export type ImageToolConfig = {
  /** Output encoding. "keep" re-encodes in the source format (falls back to PNG). */
  target: ImageTarget;
  /** Output file extension (without dot). Empty when target is "keep". */
  ext: string;
  /** Accept attribute for the file input. */
  accept: string;
  controls: {
    quality?: boolean;
    resize?: boolean;
    rotate?: boolean;
    crop?: boolean;
  };
  /** Always desaturate the output. */
  forceGrayscale?: boolean;
  defaultQuality?: number;
};

export const IMAGE_TOOLS: Record<string, ImageToolConfig> = {
  "jpg-to-png": { target: "image/png", ext: "png", accept: "image/jpeg,.jpg,.jpeg", controls: {} },
  "png-to-jpg": { target: "image/jpeg", ext: "jpg", accept: "image/png,.png", controls: { quality: true }, defaultQuality: 92 },
  "jpg-to-webp": { target: "image/webp", ext: "webp", accept: "image/jpeg,.jpg,.jpeg", controls: { quality: true }, defaultQuality: 90 },
  "png-to-webp": { target: "image/webp", ext: "webp", accept: "image/png,.png", controls: { quality: true }, defaultQuality: 90 },
  "svg-to-png": { target: "image/png", ext: "png", accept: "image/svg+xml,.svg", controls: { resize: true } },
  "compress-image": { target: "image/webp", ext: "webp", accept: "image/*", controls: { quality: true }, defaultQuality: 75 },
  "resize-image": { target: "keep", ext: "", accept: "image/*", controls: { resize: true, quality: true }, defaultQuality: 92 },
  "crop-image": { target: "keep", ext: "", accept: "image/*", controls: { crop: true, quality: true }, defaultQuality: 92 },
  "rotate-image": { target: "keep", ext: "", accept: "image/*", controls: { rotate: true, quality: true }, defaultQuality: 92 },
  "grayscale-image": { target: "keep", ext: "", accept: "image/*", controls: { quality: true }, forceGrayscale: true, defaultQuality: 92 },
};

/** Resolve the effective output mime + extension given the source file type. */
export function resolveOutput(cfg: ImageToolConfig, sourceType: string): { mime: string; ext: string } {
  if (cfg.target !== "keep") return { mime: cfg.target, ext: cfg.ext };
  if (sourceType === "image/jpeg") return { mime: "image/jpeg", ext: "jpg" };
  if (sourceType === "image/webp") return { mime: "image/webp", ext: "webp" };
  return { mime: "image/png", ext: "png" };
}

export function supportsQualityMime(mime: string): boolean {
  return mime === "image/jpeg" || mime === "image/webp";
}
