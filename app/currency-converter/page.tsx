import type { Metadata } from "next";
import { TOOLS_BY_SLUG } from "@/lib/tools-config";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { CurrencyConverterClient } from "@/components/tools/clients/CurrencyConverterClient";
import { buildToolMetadata } from "@/lib/seo";

const tool = TOOLS_BY_SLUG["currency-converter"];
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <ToolPageShell tool={tool}>
      <CurrencyConverterClient />
    </ToolPageShell>
  );
}
