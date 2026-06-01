import type { Metadata } from "next";
import { TOOLS_BY_SLUG } from "@/lib/tools-config";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { FillPdfFormClient } from "@/components/tools/clients/FillPdfFormClient";
import { buildToolMetadata } from "@/lib/seo";

const tool = TOOLS_BY_SLUG["fill-pdf-form"];
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <ToolPageShell tool={tool}>
      <FillPdfFormClient />
    </ToolPageShell>
  );
}
