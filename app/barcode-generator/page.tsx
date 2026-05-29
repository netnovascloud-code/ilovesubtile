import type { Metadata } from "next";
import { TOOLS_BY_SLUG } from "@/lib/tools-config";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { BarcodeGeneratorClient } from "@/components/tools/clients/BarcodeGeneratorClient";
import { buildToolMetadata } from "@/lib/seo";

const tool = TOOLS_BY_SLUG["barcode-generator"];
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <ToolPageShell tool={tool}>
      <BarcodeGeneratorClient />
    </ToolPageShell>
  );
}
