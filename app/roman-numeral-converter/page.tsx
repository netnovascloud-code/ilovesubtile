import type { Metadata } from "next";
import { TOOLS_BY_SLUG } from "@/lib/tools-config";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { RomanNumeralClient } from "@/components/tools/clients/RomanNumeralClient";
import { buildToolMetadata } from "@/lib/seo";

const tool = TOOLS_BY_SLUG["roman-numeral-converter"];
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <ToolPageShell tool={tool}>
      <RomanNumeralClient />
    </ToolPageShell>
  );
}
