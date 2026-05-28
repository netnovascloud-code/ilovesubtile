import type { Metadata } from "next";
import { TOOLS_BY_SLUG } from "@/lib/tools-config";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { ImagesToPdfClient } from "@/components/tools/clients/ImagesToPdfClient";
import { buildToolMetadata } from "@/lib/seo";

const tool = TOOLS_BY_SLUG["images-to-pdf"];
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <ToolPageShell tool={tool}>
      <ImagesToPdfClient />
    </ToolPageShell>
  );
}
