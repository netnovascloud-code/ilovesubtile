import type { Metadata } from "next";
import { TOOLS_BY_SLUG } from "@/lib/tools-config";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { ExtractPdfPagesClient } from "@/components/tools/clients/ExtractPdfPagesClient";
import { buildToolMetadata } from "@/lib/seo";

const tool = TOOLS_BY_SLUG["extract-pdf-pages"];
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <ToolPageShell tool={tool}>
      <ExtractPdfPagesClient />
    </ToolPageShell>
  );
}
