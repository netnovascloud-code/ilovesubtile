import type { Metadata } from "next";
import { TOOLS_BY_SLUG } from "@/lib/tools-config";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { SocialMediaCropClient } from "@/components/tools/clients/SocialMediaCropClient";
import { buildToolMetadata } from "@/lib/seo";

const tool = TOOLS_BY_SLUG["social-media-crop"];
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <ToolPageShell tool={tool}>
      <SocialMediaCropClient />
    </ToolPageShell>
  );
}
