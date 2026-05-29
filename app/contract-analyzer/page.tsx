import type { Metadata } from "next";
import { TOOLS_BY_SLUG } from "@/lib/tools-config";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { ContractAnalyzerClient } from "@/components/tools/clients/ContractAnalyzerClient";
import { buildToolMetadata } from "@/lib/seo";

const tool = TOOLS_BY_SLUG["contract-analyzer"];
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <ToolPageShell tool={tool}>
      <ContractAnalyzerClient />
    </ToolPageShell>
  );
}
