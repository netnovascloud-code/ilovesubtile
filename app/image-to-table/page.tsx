import type { Metadata } from "next";
import { TOOLS_BY_SLUG } from "@/lib/tools-config";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { ImageToTableClient } from "@/components/tools/clients/ImageToTableClient";
import { buildToolMetadata } from "@/lib/seo";

const tool = TOOLS_BY_SLUG["image-to-table"];
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <ToolPageShell tool={tool}>
      <ImageToTableClient />
    </ToolPageShell>
  );
}
