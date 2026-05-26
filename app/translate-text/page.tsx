import type { Metadata } from "next";
import { TOOLS_BY_SLUG } from "@/lib/tools-config";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { AiTextClient } from "@/components/tools/clients/AiTextClient";
import { buildToolMetadata } from "@/lib/seo";

const tool = TOOLS_BY_SLUG["translate-text"];
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <ToolPageShell tool={tool}>
      <AiTextClient slug="translate-text" />
    </ToolPageShell>
  );
}
