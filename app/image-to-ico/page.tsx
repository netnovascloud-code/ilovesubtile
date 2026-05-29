import type { Metadata } from "next";
import { TOOLS_BY_SLUG } from "@/lib/tools-config";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { ImageToIcoClient } from "@/components/tools/clients/ImageToIcoClient";
import { buildToolMetadata } from "@/lib/seo";

const tool = TOOLS_BY_SLUG["image-to-ico"];
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <ToolPageShell tool={tool}>
      <ImageToIcoClient />
    </ToolPageShell>
  );
}
