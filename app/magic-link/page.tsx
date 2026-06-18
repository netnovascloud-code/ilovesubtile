import type { Metadata } from "next";
import { TOOLS_BY_SLUG } from "@/lib/tools-config";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { ServerLinkClient } from "@/components/tools/clients/ServerLinkClient";
import { buildToolMetadata } from "@/lib/seo";

const tool = TOOLS_BY_SLUG["magic-link"];
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <ToolPageShell tool={tool}>
      <ServerLinkClient kind="magic" />
    </ToolPageShell>
  );
}
