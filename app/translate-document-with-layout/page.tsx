import type { Metadata } from "next";
import { TOOLS_BY_SLUG } from "@/lib/tools-config";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { TranslateDocumentClient } from "@/components/tools/clients/TranslateDocumentClient";
import { buildToolMetadata } from "@/lib/seo";

const tool = TOOLS_BY_SLUG["translate-document-with-layout"];
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <ToolPageShell tool={tool}>
      <TranslateDocumentClient />
    </ToolPageShell>
  );
}
