import type { Metadata } from "next";
import { TOOLS_BY_SLUG } from "@/lib/tools-config";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { PdfToExcelClient } from "@/components/tools/clients/PdfToExcelClient";
import { buildToolMetadata } from "@/lib/seo";

const tool = TOOLS_BY_SLUG["pdf-to-excel"];
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <ToolPageShell tool={tool}>
      <PdfToExcelClient />
    </ToolPageShell>
  );
}
