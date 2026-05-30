import type { Metadata } from "next";
import { TOOLS_BY_SLUG } from "@/lib/tools-config";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { VideoThumbnailClient } from "@/components/tools/clients/VideoThumbnailClient";
import { buildToolMetadata } from "@/lib/seo";

const tool = TOOLS_BY_SLUG["video-thumbnail"];
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <ToolPageShell tool={tool}>
      <VideoThumbnailClient />
    </ToolPageShell>
  );
}
