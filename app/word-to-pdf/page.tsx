import type { Metadata } from "next";
import { TOOLS_BY_SLUG } from "@/lib/tools-config";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { WordToPdfClient } from "@/components/tools/clients/WordToPdfClient";
import { buildToolMetadata } from "@/lib/seo";

const tool = TOOLS_BY_SLUG["word-to-pdf"];
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <ToolPageShell tool={tool}>
      <WordToPdfClient />
    </ToolPageShell>
  );
}
