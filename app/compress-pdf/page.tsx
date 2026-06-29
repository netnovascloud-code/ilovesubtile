import type { Metadata } from "next";
import { TOOLS_BY_SLUG } from "@/lib/tools-config";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { CompressPdfClient } from "@/components/tools/clients/CompressPdfClient";
import { buildToolMetadata } from "@/lib/seo";

const tool = TOOLS_BY_SLUG["compress-pdf"];
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <ToolPageShell tool={tool}>
      <CompressPdfClient />
    </ToolPageShell>
  );
}
