import type { Metadata } from "next";
import { TOOLS_BY_SLUG } from "@/lib/tools-config";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { YouTubeChaptersClient } from "@/components/tools/clients/YouTubeChaptersClient";
import { buildToolMetadata } from "@/lib/seo";

const tool = TOOLS_BY_SLUG["youtube-chapters"];
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <ToolPageShell tool={tool}>
      <YouTubeChaptersClient />
    </ToolPageShell>
  );
}
