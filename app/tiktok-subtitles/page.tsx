import type { Metadata } from "next";
import { TOOLS_BY_SLUG } from "@/lib/tools-config";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { TikTokSubtitlesClient } from "@/components/tools/clients/TikTokSubtitlesClient";
import { buildToolMetadata } from "@/lib/seo";

const tool = TOOLS_BY_SLUG["tiktok-subtitles"];
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <ToolPageShell tool={tool}>
      <TikTokSubtitlesClient />
    </ToolPageShell>
  );
}
