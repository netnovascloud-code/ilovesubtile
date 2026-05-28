// User-saved tool presets ("templates"). Stored as a JSONB array on the
// profiles row so reads/writes go through the existing RLS policy. Each
// template targets a specific tool slug.

import type { SupabaseClient } from "@supabase/supabase-js";

export type Template<Settings = Record<string, unknown>> = {
  id: string;
  tool: string;
  name: string;
  settings: Settings;
  created_at: string;
};

export async function loadTemplates(supabase: SupabaseClient, userId: string, tool?: string): Promise<Template[]> {
  const { data } = await supabase.from("profiles").select("templates").eq("id", userId).maybeSingle();
  const all: Template[] = Array.isArray(data?.templates) ? (data!.templates as Template[]) : [];
  return tool ? all.filter((t) => t.tool === tool) : all;
}

export async function saveTemplate<S>(
  supabase: SupabaseClient, userId: string, tool: string, name: string, settings: S,
): Promise<Template<S>> {
  const { data } = await supabase.from("profiles").select("templates").eq("id", userId).maybeSingle();
  const all: Template[] = Array.isArray(data?.templates) ? (data!.templates as Template[]) : [];
  const tpl: Template<S> = {
    id: (typeof crypto !== "undefined" && "randomUUID" in crypto) ? crypto.randomUUID() : String(Math.random()),
    tool, name, settings, created_at: new Date().toISOString(),
  };
  const next = [tpl as Template, ...all].slice(0, 100);
  await supabase.from("profiles").update({ templates: next }).eq("id", userId);
  return tpl;
}

export async function deleteTemplate(supabase: SupabaseClient, userId: string, id: string): Promise<void> {
  const { data } = await supabase.from("profiles").select("templates").eq("id", userId).maybeSingle();
  const all: Template[] = Array.isArray(data?.templates) ? (data!.templates as Template[]) : [];
  const next = all.filter((t) => t.id !== id);
  await supabase.from("profiles").update({ templates: next }).eq("id", userId);
}
