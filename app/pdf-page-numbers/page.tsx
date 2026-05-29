import type { Metadata } from "next";
import { TOOLS_BY_SLUG } from "@/lib/tools-config";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { PdfPageNumbersClient } from "@/components/tools/clients/PdfPageNumbersClient";
import { buildToolMetadata } from "@/lib/seo";

const tool = TOOLS_BY_SLUG["pdf-page-numbers"];
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <ToolPageShell tool={tool}>
      <PdfPageNumbersClient />
    </ToolPageShell>
  );
}
