import type { Metadata } from "next";
import { TOOLS_BY_SLUG } from "@/lib/tools-config";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { ImageToTextClient } from "@/components/tools/clients/ImageToTextClient";
import { buildToolMetadata } from "@/lib/seo";

const tool = TOOLS_BY_SLUG["image-to-text"];
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <ToolPageShell tool={tool}>
      <ImageToTextClient />
    </ToolPageShell>
  );
}
