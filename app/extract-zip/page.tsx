import type { Metadata } from "next";
import { TOOLS_BY_SLUG } from "@/lib/tools-config";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { ZipExtractClient } from "@/components/tools/clients/ZipExtractClient";
import { buildToolMetadata } from "@/lib/seo";

const tool = TOOLS_BY_SLUG["extract-zip"];
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <ToolPageShell tool={tool}>
      <ZipExtractClient />
    </ToolPageShell>
  );
}
