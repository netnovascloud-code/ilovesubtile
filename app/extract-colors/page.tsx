import type { Metadata } from "next";
import { TOOLS_BY_SLUG } from "@/lib/tools-config";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { ExtractColorsClient } from "@/components/tools/clients/ExtractColorsClient";
import { buildToolMetadata } from "@/lib/seo";

const tool = TOOLS_BY_SLUG["extract-colors"];
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <ToolPageShell tool={tool}>
      <ExtractColorsClient />
    </ToolPageShell>
  );
}
