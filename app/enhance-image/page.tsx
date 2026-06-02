import type { Metadata } from "next";
import { TOOLS_BY_SLUG } from "@/lib/tools-config";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { EnhanceImageClient } from "@/components/tools/clients/EnhanceImageClient";
import { buildToolMetadata } from "@/lib/seo";

const tool = TOOLS_BY_SLUG["enhance-image"];
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <ToolPageShell tool={tool}>
      <EnhanceImageClient />
    </ToolPageShell>
  );
}
