import type { Metadata } from "next";
import { TOOLS_BY_SLUG } from "@/lib/tools-config";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { ExifViewerClient } from "@/components/tools/clients/ExifViewerClient";
import { buildToolMetadata } from "@/lib/seo";

const tool = TOOLS_BY_SLUG["exif-viewer"];
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <ToolPageShell tool={tool}>
      <ExifViewerClient />
    </ToolPageShell>
  );
}
