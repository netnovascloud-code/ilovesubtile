import type { Metadata } from "next";
import { TOOLS_BY_SLUG } from "@/lib/tools-config";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { TimezoneConverterClient } from "@/components/tools/clients/TimezoneConverterClient";
import { buildToolMetadata } from "@/lib/seo";

const tool = TOOLS_BY_SLUG["timezone-converter"];
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <ToolPageShell tool={tool}>
      <TimezoneConverterClient />
    </ToolPageShell>
  );
}
