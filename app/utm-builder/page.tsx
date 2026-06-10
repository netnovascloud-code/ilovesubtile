import type { Metadata } from "next";
import { TOOLS_BY_SLUG } from "@/lib/tools-config";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { UtmBuilderClient } from "@/components/tools/clients/UtmBuilderClient";
import { buildToolMetadata } from "@/lib/seo";

const tool = TOOLS_BY_SLUG["utm-builder"];
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <ToolPageShell tool={tool}>
      <UtmBuilderClient />
    </ToolPageShell>
  );
}
