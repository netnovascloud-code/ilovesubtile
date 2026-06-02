import type { Metadata } from "next";
import { TOOLS_BY_SLUG } from "@/lib/tools-config";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { EmailCheckerClient } from "@/components/tools/clients/EmailCheckerClient";
import { buildToolMetadata } from "@/lib/seo";

const tool = TOOLS_BY_SLUG["email-checker"];
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <ToolPageShell tool={tool}>
      <EmailCheckerClient />
    </ToolPageShell>
  );
}
