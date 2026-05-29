import type { Metadata } from "next";
import { TOOLS_BY_SLUG } from "@/lib/tools-config";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { ChangeBackgroundClient } from "@/components/tools/clients/ChangeBackgroundClient";
import { buildToolMetadata } from "@/lib/seo";

const tool = TOOLS_BY_SLUG["change-background"];
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <ToolPageShell tool={tool}>
      <ChangeBackgroundClient />
    </ToolPageShell>
  );
}
