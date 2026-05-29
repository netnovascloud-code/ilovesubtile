import type { Metadata } from "next";
import { TOOLS_BY_SLUG } from "@/lib/tools-config";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { CaseConverterClient } from "@/components/tools/clients/CaseConverterClient";
import { buildToolMetadata } from "@/lib/seo";

const tool = TOOLS_BY_SLUG["case-converter"];
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <ToolPageShell tool={tool}>
      <CaseConverterClient />
    </ToolPageShell>
  );
}
