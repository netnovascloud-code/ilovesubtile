import type { Metadata } from "next";
import { TOOLS_BY_SLUG } from "@/lib/tools-config";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { UnixTimestampClient } from "@/components/tools/clients/UnixTimestampClient";
import { buildToolMetadata } from "@/lib/seo";

const tool = TOOLS_BY_SLUG["unix-timestamp"];
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <ToolPageShell tool={tool}>
      <UnixTimestampClient />
    </ToolPageShell>
  );
}
