import type { Metadata } from "next";
import { TOOLS_BY_SLUG } from "@/lib/tools-config";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { RemoveBackgroundClient } from "@/components/tools/clients/RemoveBackgroundClient";
import { buildToolMetadata } from "@/lib/seo";

const tool = TOOLS_BY_SLUG["remove-background"];
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <ToolPageShell tool={tool}>
      <RemoveBackgroundClient />
    </ToolPageShell>
  );
}
