import type { Metadata } from "next";
import { TOOLS_BY_SLUG } from "@/lib/tools-config";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { PdfToWordClient } from "@/components/tools/clients/PdfToWordClient";
import { buildToolMetadata } from "@/lib/seo";

const tool = TOOLS_BY_SLUG["pdf-to-word"];
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <ToolPageShell tool={tool}>
      <PdfToWordClient />
    </ToolPageShell>
  );
}
