import type { Metadata } from "next";
import { TOOLS_BY_SLUG } from "@/lib/tools-config";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { RemoveVideoBackgroundClient } from "@/components/tools/clients/RemoveVideoBackgroundClient";
import { buildToolMetadata } from "@/lib/seo";

const tool = TOOLS_BY_SLUG["remove-video-background"];
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <ToolPageShell tool={tool}>
      <RemoveVideoBackgroundClient />
    </ToolPageShell>
  );
}
