import { Check, Minus } from "lucide-react";
import { PLANS, FREE_PLAN } from "@/lib/plans";
import { DAILY_LIMIT, MONTHLY_LIMIT } from "@/lib/ai-quotas";
import { PLAN_FILE_MB, PLAN_TIME_SEC, PLAN_VIDEO_MAX_MB, PLAN_VIDEO_MAX_SEC } from "@/lib/plan-limits";
import { getCompare } from "@/lib/i18n/plan-compare";
import { type Locale } from "@/lib/i18n/locales";

/** "20 MB" / "1 GB" / "5 GB" from the canonical per-plan cap. */
function mb(value: number, locale: Locale): string {
  return value >= 1024 ? `${(value / 1024).toLocaleString(locale)} GB` : `${value.toLocaleString(locale)} MB`;
}
/** "90 s" / "5 min" / "15 min" from the canonical per-plan time budget. */
function secs(value: number, locale: Locale): string {
  return value >= 60 ? `${(value / 60).toLocaleString(locale)} min` : `${value.toLocaleString(locale)} s`;
}
/** "3 min" / "30 min" / "3 h" — video duration cap, promoting to hours at 1 h. */
function dur(value: number, locale: Locale): string {
  return value >= 3600 ? `${(value / 3600).toLocaleString(locale)} h` : `${(value / 60).toLocaleString(locale)} min`;
}

type Cell = string | boolean;

/**
 * Side-by-side Free / Pro / Business comparison for the limits that matter on
 * the free tier (AI quota, upload size, processing time, batch, ads,
 * watermark). Pure server component — every value is derived from the same
 * config the edge functions enforce, so it stays truthful. Localised via
 * getCompare(locale) with an English fallback; horizontally scrollable on
 * mobile so the four columns never squash.
 */
export function PlanComparisonTable({ locale }: { locale: Locale }) {
  const s = getCompare(locale);

  const rows: { label: string; free: Cell; pro: Cell; business: Cell }[] = [
    {
      label: s.rows.aiRuns,
      free: s.perDay(DAILY_LIMIT.free.toLocaleString(locale)),
      pro: s.perMonth(MONTHLY_LIMIT.pro.toLocaleString(locale)),
      business: s.perMonth(MONTHLY_LIMIT.business.toLocaleString(locale)),
    },
    {
      label: s.rows.fileSize,
      free: mb(PLAN_FILE_MB.free, locale),
      pro: mb(PLAN_FILE_MB.pro, locale),
      business: mb(PLAN_FILE_MB.business, locale),
    },
    {
      label: s.rows.videoSize,
      free: mb(PLAN_VIDEO_MAX_MB.free, locale),
      pro: mb(PLAN_VIDEO_MAX_MB.pro, locale),
      business: mb(PLAN_VIDEO_MAX_MB.business, locale),
    },
    {
      label: s.rows.videoDuration,
      free: dur(PLAN_VIDEO_MAX_SEC.free, locale),
      pro: dur(PLAN_VIDEO_MAX_SEC.pro, locale),
      business: dur(PLAN_VIDEO_MAX_SEC.business, locale),
    },
    {
      label: s.rows.procTime,
      free: secs(PLAN_TIME_SEC.free, locale),
      pro: secs(PLAN_TIME_SEC.pro, locale),
      business: secs(PLAN_TIME_SEC.business, locale),
    },
    { label: s.rows.batch, free: s.oneFile, pro: s.files((20).toLocaleString(locale)), business: s.unlimited },
    { label: s.rows.templates, free: false, pro: (10).toLocaleString(locale), business: s.unlimited },
    // Ads / watermark: "Yes" on free is the limitation, so the check sits on the paid columns.
    { label: s.rows.ads, free: true, pro: false, business: false },
    { label: s.rows.watermark, free: true, pro: false, business: false },
    { label: s.rows.browserTools, free: s.allTools, pro: s.allTools, business: s.allTools },
  ];

  // For ads/watermark the desirable answer is "No", so render those two as the
  // inverse: a check means "not present" on that plan.
  const invertedRows = new Set([s.rows.ads, s.rows.watermark]);

  function renderCell(value: Cell, label: string) {
    if (typeof value === "string") return <span className="text-ink-700">{value}</span>;
    const inverted = invertedRows.has(label);
    // value === true means the feature is present on that plan.
    const good = inverted ? !value : value;
    return good ? (
      <Check className="mx-auto h-4 w-4 text-brand-600" aria-label={inverted ? s.no : s.yes} />
    ) : inverted ? (
      <span className="text-xs font-medium text-ink-500">{s.yes}</span>
    ) : (
      <Minus className="mx-auto h-4 w-4 text-ink-300" aria-label={s.no} />
    );
  }

  return (
    <div className="mt-16">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-2xl font-semibold tracking-tight text-ink-900">{s.title}</h2>
        <p className="mt-2 text-sm text-ink-500">{s.subtitle}</p>
      </div>

      <div className="mt-8 overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-ink-200">
              <th className="py-3 pr-4 text-left font-medium text-ink-500">{s.feature}</th>
              <th className="px-4 py-3 text-center font-semibold text-ink-900">{FREE_PLAN.name}</th>
              <th className="px-4 py-3 text-center font-semibold text-brand-700">
                {PLANS.pro.name}
              </th>
              <th className="px-4 py-3 text-center font-semibold text-ink-900">{PLANS.business.name}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.label} className="border-b border-ink-100">
                <td className="py-3 pr-4 text-left text-ink-700">{r.label}</td>
                <td className="px-4 py-3 text-center">{renderCell(r.free, r.label)}</td>
                <td className="bg-brand-50/40 px-4 py-3 text-center">{renderCell(r.pro, r.label)}</td>
                <td className="px-4 py-3 text-center">{renderCell(r.business, r.label)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
