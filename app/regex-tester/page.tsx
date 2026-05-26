import type { Metadata } from "next";
import { TOOLS_BY_SLUG } from "@/lib/tools-config";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { RegexClient } from "@/components/tools/clients/RegexClient";
import { buildToolMetadata } from "@/lib/seo";

const tool = TOOLS_BY_SLUG["regex-tester"];
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <ToolPageShell tool={tool}>
      <RegexClient />
    </ToolPageShell>
  );
}
