import type { Metadata } from "next";
import { TOOLS_BY_SLUG } from "@/lib/tools-config";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { LinkBuilderClient } from "@/components/tools/clients/LinkBuilderClient";
import { buildToolMetadata } from "@/lib/seo";

const tool = TOOLS_BY_SLUG["link-builder"];
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <ToolPageShell tool={tool}>
      <LinkBuilderClient />
    </ToolPageShell>
  );
}
