import type { Metadata } from "next";
import { TOOLS_BY_SLUG } from "@/lib/tools-config";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { ExcelToPdfClient } from "@/components/tools/clients/ExcelToPdfClient";
import { buildToolMetadata } from "@/lib/seo";

const tool = TOOLS_BY_SLUG["excel-to-pdf"];
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <ToolPageShell tool={tool}>
      <ExcelToPdfClient />
    </ToolPageShell>
  );
}
