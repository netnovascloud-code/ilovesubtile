import type { Metadata } from "next";
import { TOOLS_BY_SLUG } from "@/lib/tools-config";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { PdfRotateClient } from "@/components/tools/clients/PdfRotateClient";
import { buildToolMetadata } from "@/lib/seo";

const tool = TOOLS_BY_SLUG["rotate-pdf"];
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <ToolPageShell tool={tool}>
      <PdfRotateClient />
    </ToolPageShell>
  );
}
