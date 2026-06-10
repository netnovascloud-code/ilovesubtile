"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Bookmark, BookmarkPlus, X, Lock } from "lucide-react";
import { getSupabaseBrowser } from "@/lib/supabase/client";
import { useUser } from "@/hooks/useUser";
import { useLocale } from "@/hooks/useLocale";
import { getCommonUi } from "@/lib/i18n/tool-ui";
import { loadTemplates, saveTemplate, deleteTemplate, type Template } from "@/lib/templates";

/**
 * Small bar that lets a signed-in Pro/Business user save and recall settings
 * for the current tool. Anonymous / Free users see an upgrade hint.
 */
export function TemplatesBar<S extends Record<string, unknown>>({
  tool,
  settings,
  onApply,
}: {
  tool: string;
  settings: S;
  onApply: (s: S) => void;
}) {
  const { user, plan } = useUser();
  const t = getCommonUi(useLocale());
  const [items, setItems] = useState<Template<S>[]>([]);
  const [saving, setSaving] = useState(false);
  const canSave = !!user && (plan === "pro" || plan === "business");

  useEffect(() => {
    if (!user) { setItems([]); return; }
    (async () => {
      const list = await loadTemplates(getSupabaseBrowser(), user.id, tool);
      setItems(list as Template<S>[]);
    })();
  }, [user, tool]);

  async function save() {
    if (!user || saving) return;
    const name = window.prompt(t.tplNamePrompt);
    if (!name?.trim()) return;
    setSaving(true);
    try {
      const tpl = await saveTemplate(getSupabaseBrowser(), user.id, tool, name.trim(), settings);
      setItems((s) => [tpl as Template<S>, ...s]);
    } finally { setSaving(false); }
  }
  async function remove(id: string) {
    if (!user) return;
    await deleteTemplate(getSupabaseBrowser(), user.id, id);
    setItems((s) => s.filter((t) => t.id !== id));
  }

  if (!user || !canSave) {
    return (
      <div className="flex flex-wrap items-center gap-2 rounded-lg border border-dashed border-ink-200 bg-white/60 px-3 py-2 text-xs text-ink-500">
        <Lock className="h-3.5 w-3.5" />
        <span>
          <Link href="/pricing" className="font-medium text-brand-600 hover:underline">{t.tplUpgrade}</Link>
          {" "}{t.tplUpgradeSuffix}
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-1.5 rounded-lg border border-ink-100 bg-white p-2">
      <span className="mr-1 inline-flex items-center gap-1 text-xs font-medium text-ink-500"><Bookmark className="h-3 w-3" /> {t.tplMine}</span>
      {items.length === 0 && <span className="text-xs text-ink-400">{t.tplNone}</span>}
      {items.map((t) => (
        <span key={t.id} className="group inline-flex items-center gap-1 rounded-full bg-brand-50 px-2.5 py-1 text-xs font-medium text-brand-700">
          <button onClick={() => onApply(t.settings)} className="hover:underline" title="Apply this template">{t.name}</button>
          <button onClick={() => remove(t.id)} className="ml-1 rounded p-0.5 text-brand-500 opacity-60 transition-opacity hover:bg-brand-100 hover:opacity-100" title="Delete"><X className="h-3 w-3" /></button>
        </span>
      ))}
      <button onClick={save} disabled={saving} className="ml-auto inline-flex items-center gap-1 rounded-full border border-ink-200 px-2.5 py-1 text-xs font-medium text-ink-700 hover:border-brand-300 hover:text-brand-600 disabled:opacity-50">
        <BookmarkPlus className="h-3 w-3" /> {saving ? t.tplSaving : t.tplSave}
      </button>
    </div>
  );
}
