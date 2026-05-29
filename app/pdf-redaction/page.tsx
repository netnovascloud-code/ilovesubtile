import type { Metadata } from "next";
import { TOOLS_BY_SLUG } from "@/lib/tools-config";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { PdfRedactionClient } from "@/components/tools/clients/PdfRedactionClient";
import { buildToolMetadata } from "@/lib/seo";

const tool = TOOLS_BY_SLUG["pdf-redaction"];
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <ToolPageShell tool={tool}>
      <PdfRedactionClient />
    </ToolPageShell>
  );
}
