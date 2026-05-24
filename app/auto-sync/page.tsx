import type { Metadata } from "next";
import { TOOLS_BY_SLUG } from "@/lib/tools-config";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { AutoSyncClient } from "@/components/tools/clients/AutoSyncClient";
import { buildToolMetadata } from "@/lib/seo";

const tool = TOOLS_BY_SLUG["auto-sync"];
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <ToolPageShell tool={tool}>
      <AutoSyncClient />
    </ToolPageShell>
  );
}
