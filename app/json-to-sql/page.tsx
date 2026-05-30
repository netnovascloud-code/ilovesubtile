import type { Metadata } from "next";
import { TOOLS_BY_SLUG } from "@/lib/tools-config";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { SqlJsonClient } from "@/components/tools/clients/SqlJsonClient";
import { buildToolMetadata } from "@/lib/seo";

const tool = TOOLS_BY_SLUG["json-to-sql"];
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <ToolPageShell tool={tool}>
      <SqlJsonClient defaultDir="json_to_sql" />
    </ToolPageShell>
  );
}
