import type { Metadata } from "next";
import { TOOLS_BY_SLUG } from "@/lib/tools-config";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { SslCheckerClient } from "@/components/tools/clients/SslCheckerClient";
import { buildToolMetadata } from "@/lib/seo";

const tool = TOOLS_BY_SLUG["ssl-checker"];
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <ToolPageShell tool={tool}>
      <SslCheckerClient />
    </ToolPageShell>
  );
}
