import type { Metadata } from "next";
import { TOOLS_BY_SLUG } from "@/lib/tools-config";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { ImageToBase64Client } from "@/components/tools/clients/ImageToBase64Client";
import { buildToolMetadata } from "@/lib/seo";

const tool = TOOLS_BY_SLUG["image-to-base64"];
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <ToolPageShell tool={tool}>
      <ImageToBase64Client />
    </ToolPageShell>
  );
}
