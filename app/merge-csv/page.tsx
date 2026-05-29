import type { Metadata } from "next";
import { TOOLS_BY_SLUG } from "@/lib/tools-config";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { MergeCsvClient } from "@/components/tools/clients/MergeCsvClient";
import { buildToolMetadata } from "@/lib/seo";

const tool = TOOLS_BY_SLUG["merge-csv"];
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <ToolPageShell tool={tool}>
      <MergeCsvClient />
    </ToolPageShell>
  );
}
