import type { Metadata } from "next";
import { TOOLS_BY_SLUG } from "@/lib/tools-config";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { PdfToTextClient } from "@/components/tools/clients/PdfToTextClient";
import { buildToolMetadata } from "@/lib/seo";

const tool = TOOLS_BY_SLUG["pdf-to-text"];
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <ToolPageShell tool={tool}>
      <PdfToTextClient />
    </ToolPageShell>
  );
}
