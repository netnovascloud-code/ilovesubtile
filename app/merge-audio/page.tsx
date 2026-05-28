import type { Metadata } from "next";
import { TOOLS_BY_SLUG } from "@/lib/tools-config";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { PendingClient } from "@/components/tools/clients/PendingClient";
import { buildToolMetadata } from "@/lib/seo";

const tool = TOOLS_BY_SLUG["merge-audio"];
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <ToolPageShell tool={tool}>
      <PendingClient category={tool.category} accept={tool.accept.map((e) => "." + e).join(",")} />
    </ToolPageShell>
  );
}
