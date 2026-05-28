import type { Metadata } from "next";
import { TOOLS_BY_SLUG } from "@/lib/tools-config";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { HtmlToPdfClient } from "@/components/tools/clients/HtmlToPdfClient";
import { buildToolMetadata } from "@/lib/seo";

const tool = TOOLS_BY_SLUG["html-to-pdf"];
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <ToolPageShell tool={tool}>
      <HtmlToPdfClient />
    </ToolPageShell>
  );
}
