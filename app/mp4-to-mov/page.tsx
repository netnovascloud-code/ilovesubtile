import type { Metadata } from "next";
import { TOOLS_BY_SLUG } from "@/lib/tools-config";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { FfmpegToolClient } from "@/components/tools/clients/FfmpegToolClient";
import { buildToolMetadata } from "@/lib/seo";

const tool = TOOLS_BY_SLUG["mp4-to-mov"];
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <ToolPageShell tool={tool}>
      <FfmpegToolClient slug="mp4-to-mov" category={tool.category} />
    </ToolPageShell>
  );
}
