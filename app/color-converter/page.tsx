import type { Metadata } from "next";
import { TOOLS_BY_SLUG } from "@/lib/tools-config";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { ColorConverterClient } from "@/components/tools/clients/ColorConverterClient";
import { buildToolMetadata } from "@/lib/seo";

const tool = TOOLS_BY_SLUG["color-converter"];
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <ToolPageShell tool={tool}>
      <ColorConverterClient />
    </ToolPageShell>
  );
}
