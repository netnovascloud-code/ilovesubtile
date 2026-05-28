import type { Metadata } from "next";
import { TOOLS_BY_SLUG } from "@/lib/tools-config";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { WatermarkVideoClient } from "@/components/tools/clients/WatermarkVideoClient";
import { buildToolMetadata } from "@/lib/seo";

const tool = TOOLS_BY_SLUG["add-watermark"];
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <ToolPageShell tool={tool}>
      <WatermarkVideoClient />
    </ToolPageShell>
  );
}
