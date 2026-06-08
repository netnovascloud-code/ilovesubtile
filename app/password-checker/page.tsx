import type { Metadata } from "next";
import { TOOLS_BY_SLUG } from "@/lib/tools-config";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { PasswordCheckerClient } from "@/components/tools/clients/PasswordCheckerClient";
import { buildToolMetadata } from "@/lib/seo";

const tool = TOOLS_BY_SLUG["password-checker"];
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <ToolPageShell tool={tool}>
      <PasswordCheckerClient />
    </ToolPageShell>
  );
}
