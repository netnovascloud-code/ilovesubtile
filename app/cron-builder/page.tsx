import type { Metadata } from "next";
import { TOOLS_BY_SLUG } from "@/lib/tools-config";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { CronBuilderClient } from "@/components/tools/clients/CronBuilderClient";
import { buildToolMetadata } from "@/lib/seo";

const tool = TOOLS_BY_SLUG["cron-builder"];
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <ToolPageShell tool={tool}>
      <CronBuilderClient />
    </ToolPageShell>
  );
}
