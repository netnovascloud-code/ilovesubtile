import type { Metadata } from "next";
import { TOOLS_BY_SLUG } from "@/lib/tools-config";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { ScanFileClient } from "@/components/tools/clients/ScanFileClient";
import { buildToolMetadata } from "@/lib/seo";

const tool = TOOLS_BY_SLUG["scan-file"];
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <ToolPageShell tool={tool}>
      <ScanFileClient />
    </ToolPageShell>
  );
}
