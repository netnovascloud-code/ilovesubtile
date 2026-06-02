import type { Metadata } from "next";
import { TOOLS_BY_SLUG } from "@/lib/tools-config";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { ImageCollageClient } from "@/components/tools/clients/ImageCollageClient";
import { buildToolMetadata } from "@/lib/seo";

const tool = TOOLS_BY_SLUG["image-collage"];
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <ToolPageShell tool={tool}>
      <ImageCollageClient />
    </ToolPageShell>
  );
}
