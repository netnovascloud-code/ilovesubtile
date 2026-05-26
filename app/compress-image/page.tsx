import type { Metadata } from "next";
import { TOOLS_BY_SLUG } from "@/lib/tools-config";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { ImageToolClient } from "@/components/tools/clients/ImageToolClient";
import { buildToolMetadata } from "@/lib/seo";

const tool = TOOLS_BY_SLUG["compress-image"];
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <ToolPageShell tool={tool}>
      <ImageToolClient slug="compress-image" />
    </ToolPageShell>
  );
}
