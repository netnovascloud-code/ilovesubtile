import type { Metadata } from "next";
import { TOOLS_BY_SLUG } from "@/lib/tools-config";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { AdjustImageClient } from "@/components/tools/clients/AdjustImageClient";
import { buildToolMetadata } from "@/lib/seo";

const tool = TOOLS_BY_SLUG["adjust-image"];
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <ToolPageShell tool={tool}>
      <AdjustImageClient />
    </ToolPageShell>
  );
}
