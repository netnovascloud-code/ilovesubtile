import type { Metadata } from "next";
import { TOOLS_BY_SLUG } from "@/lib/tools-config";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { LoremIpsumClient } from "@/components/tools/clients/LoremIpsumClient";
import { buildToolMetadata } from "@/lib/seo";

const tool = TOOLS_BY_SLUG["lorem-ipsum"];
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <ToolPageShell tool={tool}>
      <LoremIpsumClient />
    </ToolPageShell>
  );
}
