import type { Metadata } from "next";
import { TOOLS_BY_SLUG } from "@/lib/tools-config";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { PasswordGenClient } from "@/components/tools/clients/PasswordGenClient";
import { buildToolMetadata } from "@/lib/seo";

const tool = TOOLS_BY_SLUG["password-generator"];
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <ToolPageShell tool={tool}>
      <PasswordGenClient />
    </ToolPageShell>
  );
}
