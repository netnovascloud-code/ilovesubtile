import { callTool } from "@/lib/tool-api";

export type VisionTask =
  | "ocr-handwriting"
  | "business-card"
  | "receipt"
  | "screenshot-to-code";

/** Encode a File as a data URL (Mistral accepts these directly). */
export async function fileToDataUrl(file: File): Promise<string> {
  return await new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onerror = () => reject(r.error);
    r.onload = () => resolve(r.result as string);
    r.readAsDataURL(file);
  });
}

/** Text-output vision call (handwriting, screenshot-to-code). */
export async function callVisionText(slug: string, task: VisionTask, file: File, prompt?: string): Promise<string> {
  const image = await fileToDataUrl(file);
  const res = await callTool(slug, { task, image, prompt });
  const json = (await res.json()) as { output?: string; error?: string; message?: string };
  if (!res.ok || !json.output) throw new Error(json.message ?? json.error ?? `Vision call failed (HTTP ${res.status})`);
  return json.output;
}

/** Structured-output vision call (business-card, receipt). */
export async function callVisionJson<T>(slug: string, task: VisionTask, file: File): Promise<T> {
  const image = await fileToDataUrl(file);
  const res = await callTool(slug, { task, image });
  const json = (await res.json()) as { data?: T; error?: string; message?: string };
  if (!res.ok || !json.data) throw new Error(json.message ?? json.error ?? `Vision call failed (HTTP ${res.status})`);
  return json.data;
}
