import type { Metadata } from "next";
import { TOOLS_BY_SLUG } from "@/lib/tools-config";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { SyncClient } from "@/components/tools/clients/SyncClient";
import { buildToolMetadata } from "@/lib/seo";

const tool = TOOLS_BY_SLUG["sync-subtitles"];
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <ToolPageShell tool={tool}>
      <SyncClient />
    </ToolPageShell>
  );
}
