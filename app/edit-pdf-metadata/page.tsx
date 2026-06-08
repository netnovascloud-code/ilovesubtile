import type { Metadata } from "next";
import { TOOLS_BY_SLUG } from "@/lib/tools-config";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { EditPdfMetadataClient } from "@/components/tools/clients/EditPdfMetadataClient";
import { buildToolMetadata } from "@/lib/seo";

const tool = TOOLS_BY_SLUG["edit-pdf-metadata"];
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <ToolPageShell tool={tool}>
      <EditPdfMetadataClient />
    </ToolPageShell>
  );
}
