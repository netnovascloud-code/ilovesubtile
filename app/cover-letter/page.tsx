import type { Metadata } from "next";
import { TOOLS_BY_SLUG } from "@/lib/tools-config";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { CoverLetterClient } from "@/components/tools/clients/CoverLetterClient";
import { buildToolMetadata } from "@/lib/seo";

const tool = TOOLS_BY_SLUG["cover-letter"];
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <ToolPageShell tool={tool}>
      <CoverLetterClient />
    </ToolPageShell>
  );
}
