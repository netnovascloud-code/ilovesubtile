import type { Metadata } from "next";
import { TOOLS_BY_SLUG } from "@/lib/tools-config";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { HtmlToImageClient } from "@/components/tools/clients/HtmlToImageClient";
import { buildToolMetadata } from "@/lib/seo";

const tool = TOOLS_BY_SLUG["html-to-image"];
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <ToolPageShell tool={tool}>
      <HtmlToImageClient />
    </ToolPageShell>
  );
}
