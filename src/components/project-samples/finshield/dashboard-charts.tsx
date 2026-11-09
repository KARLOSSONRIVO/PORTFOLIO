// Source: PROJECTS/FINSHIELD_MANAGEMENT_FRONTEND/components/dashboard/dashboard-charts.tsx
// Presentation copied from the original; services are replaced with local fixtures.
"use client";

import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { EmptyState, SectionHeading } from "@/components/project-samples/finshield/workspace-ui";

const palette = ["#22e77e", "#27d7e9", "#f59e0b", "#a855f7", "#3b82f6", "#ff2d7a"];
const tooltipStyle = { backgroundColor: "var(--surface)", color: "var(--ink)", border: "1px solid var(--line)", borderRadius: 10, boxShadow: "var(--shadow-float)", fontSize: 11 };
const tooltipLabelStyle = { color: "var(--ink)", fontWeight: 700, marginBottom: 4 };
const tooltipItemStyle = { fontWeight: 600 };
export const STATUS_PIE_CHART_SETTINGS = {
  startAngle: 90,
  endAngle: -265,
  paddingAngle: 5,
  cornerRadius: 10,
  stroke: "var(--surface)",
  strokeWidth: 4,
} as const;
const peso = (value: number) => `₱${value.toLocaleString("en-PH", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
const compactPeso = (value: number) => {
  if (Math.abs(value) >= 1_000_000) return `₱${(value / 1_000_000).toFixed(1)}M`;
  if (Math.abs(value) >= 1_000) return `₱${(value / 1_000).toFixed(0)}k`;
  return `₱${value}`;
};

type TrendSeries = { dataKey: string; label: string; color: string };
type ComparisonSeries = { dataKey: string; label: string; color: string };
type ComparisonChartVariant = "grouped" | "stacked";

export function TrendChart({ title, description, data, valueKey = "count", valueLabel = "Invoices", action, series }: { title: string; description: string; data: Array<Record<string, string | number>>; valueKey?: string; valueLabel?: string; action?: React.ReactNode; series?: TrendSeries[] }) {
  const chartSeries = series?.length ? series : [{ dataKey: valueKey, label: valueLabel, color: "#10b981" }];
  const currencyMode = Boolean(series?.length) || valueKey === "value";
  return (
    <section className="min-w-0 p-4 sm:p-5 bg-white border border-[var(--line)] rounded-2xl shadow-xs">
      <SectionHeading title={title} description={description} action={action} />
      {data.length ? (
        <div className="h-[240px] w-full sm:h-[280px]" role="img" aria-label={`${title}. ${description}`}>
          <ResponsiveContainer width="100%" height="100%" debounce={250}>
            <AreaChart data={data} margin={{ top: 8, right: 8, left: -14, bottom: 2 }}>
              <defs>{chartSeries.map((item) => <linearGradient key={item.dataKey} id={`trend-${item.dataKey}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={item.color} stopOpacity={0.28} /><stop offset="100%" stopColor={item.color} stopOpacity={0} /></linearGradient>)}</defs>
              <CartesianGrid stroke="var(--line)" strokeDasharray="3 4" vertical={false} fill="none" />
              <XAxis dataKey="label" tick={{ fill: "var(--muted)", fontSize: 10 }} axisLine={false} tickLine={false} minTickGap={20} />
              <YAxis tick={{ fill: "var(--muted)", fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={(value) => currencyMode && typeof value === "number" ? compactPeso(value) : value} />
              <Tooltip
                contentStyle={tooltipStyle}
                labelStyle={tooltipLabelStyle}
                itemStyle={tooltipItemStyle}
                separator=": "
                formatter={(value, name) => [currencyMode && typeof value === "number" ? peso(value) : value, name ?? valueLabel]}
              />
              {series?.length ? <Legend wrapperStyle={{ fontSize: 10, paddingTop: 6 }} /> : null}
              {chartSeries.map((item) => <Area key={item.dataKey} type="monotone" dataKey={item.dataKey} name={item.label} stroke={item.color} strokeWidth={2.2} fill={`url(#trend-${item.dataKey})`} fillOpacity={series?.length ? 0.45 : 1} activeDot={{ r: 5, fill: "var(--surface)", stroke: item.color, strokeWidth: 2 }} />)}
            </AreaChart>
          </ResponsiveContainer>
        </div>
      ) : <EmptyState title="No trend data yet" description="This chart will populate as invoices and refunds are recorded in the selected scope." />}
    </section>
  );
}

export function ComparisonChart({ title, description, data, valueKey = "count", valueLabel = "Invoices", series, currency = false, variant = "grouped" }: { title: string; description: string; data: Array<Record<string, string | number>>; valueKey?: string; valueLabel?: string; series?: ComparisonSeries[]; currency?: boolean; variant?: ComparisonChartVariant }) {
  const chartSeries = series?.length ? series : [{ dataKey: valueKey, label: valueLabel, color: "var(--teal)" }];
  const isStacked = variant === "stacked";
  const stackedChartHeight = Math.max(240, Math.min(420, data.length * 44 + 56));
  return (
    <section className="min-w-0 p-4 sm:p-5 bg-white border border-[var(--line)] rounded-2xl shadow-xs">
      <SectionHeading title={title} description={description} />
      {data.length ? (
        <div className={isStacked ? "w-full min-w-0" : "h-[240px] w-full sm:h-[280px]"} style={isStacked ? { height: stackedChartHeight } : undefined} role="img" aria-label={`${title}. ${description}`}>
          <ResponsiveContainer width="100%" height="100%" debounce={250}>
            <BarChart data={data} layout={isStacked ? "vertical" : undefined} margin={isStacked ? { top: 8, right: 12, left: 8, bottom: 2 } : { top: 8, right: 6, left: -14, bottom: 2 }}>
              <CartesianGrid stroke="var(--line)" strokeDasharray="3 4" vertical={isStacked} horizontal={isStacked ? false : undefined} fill="none" />
              {isStacked ? (
                <>
                  <XAxis type="number" tick={{ fill: "var(--muted)", fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={(value) => currency && typeof value === "number" ? compactPeso(value) : value} />
                  <YAxis type="category" dataKey="label" width={78} interval={0} tick={{ fill: "var(--muted)", fontSize: 10 }} axisLine={false} tickLine={false} />
                </>
              ) : (
                <>
                  <XAxis dataKey="label" tick={{ fill: "var(--muted)", fontSize: 10 }} axisLine={false} tickLine={false} minTickGap={16} />
                  <YAxis tick={{ fill: "var(--muted)", fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={(value) => currency && typeof value === "number" ? compactPeso(value) : value} />
                </>
              )}
              <Tooltip contentStyle={tooltipStyle} labelStyle={tooltipLabelStyle} itemStyle={tooltipItemStyle} separator=": " formatter={(value, name) => [currency && typeof value === "number" ? peso(value) : value, name ?? valueLabel]} cursor={{ fill: "var(--surface-muted)", opacity: 0.4 }} />
              {series?.length ? <Legend wrapperStyle={{ fontSize: 10, paddingTop: 6 }} /> : null}
              {chartSeries.map((item, index) => <Bar key={item.dataKey} dataKey={item.dataKey} name={item.label} fill={item.color} stackId={isStacked ? "value" : undefined} radius={isStacked ? index === 0 ? [6, 0, 0, 6] : index === chartSeries.length - 1 ? [0, 6, 6, 0] : [0, 0, 0, 0] : [6, 6, 0, 0]} maxBarSize={isStacked ? 32 : 54} />)}
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : <EmptyState title="Nothing to compare yet" description="Comparison data appears once issued invoices are available." />}
    </section>
  );
}

export function summarizeStatusChart(data: Array<{ label: string; value: number }>) {
  const populated = data
    .filter((item) => item.value > 0)
    .map((item) => ({ ...item, percentage: 0 }));
  const total = populated.reduce((sum, item) => sum + item.value, 0);

  return {
    total,
    populated: populated.map((item) => ({
      ...item,
      percentage: total > 0 ? Math.round((item.value / total) * 100) : 0,
    })),
  };
}

export function StatusChart({ data, title = "Invoice status distribution", description = "Issued, cancelled, and replaced records in the current scope.", valueFormat = (value) => value.toLocaleString(), valueLabel, action }: { data: Array<{ label: string; value: number }>; title?: string; description?: string; valueFormat?: (value: number) => string; valueLabel?: string; action?: React.ReactNode }) {
  const { populated, total } = summarizeStatusChart(data);
  const isRefundMix = title === "Refunded item mix";
  const tooltipValueLabel = valueLabel ?? (isRefundMix ? "Refunded amount" : "Invoices");
  return (
    <section className="w-full min-w-0 overflow-hidden p-4 sm:p-5 bg-white border border-[var(--line)] rounded-2xl shadow-xs">
      <SectionHeading title={title} action={action} />
      {populated.length ? (
        <div className="w-full min-w-0 overflow-hidden min-h-[240px] grid grid-cols-1 sm:grid-cols-[minmax(190px,.9fr)_minmax(0,1.1fr)] items-center gap-5 py-1">
          <div className="relative h-[220px] w-full min-w-0 max-w-[240px] mx-auto shrink-0 sm:h-[240px]" role="img" aria-label={`${title}. ${description}`}>
            <ResponsiveContainer width="100%" height="100%" debounce={250}>
              <PieChart>
                <Pie data={populated} dataKey="value" nameKey="label" innerRadius="61%" outerRadius="86%" {...STATUS_PIE_CHART_SETTINGS}>
                  {populated.map((entry, index) => <Cell key={entry.label} fill={palette[index % palette.length]} />)}
                </Pie>
                <Tooltip
                  isAnimationActive={false}
                  contentStyle={{ ...tooltipStyle, whiteSpace: "normal" }}
                  wrapperStyle={{ zIndex: 10, left: "50%", top: "calc(50% - 28px)", transform: "translate(-50%, -100%)", width: "max-content", maxWidth: "100%" }}
                  labelStyle={tooltipLabelStyle}
                  itemStyle={tooltipItemStyle}
                  separator=": "
                  formatter={(value) => [valueFormat(Number(value)), tooltipValueLabel]}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="pointer-events-none absolute inset-0 grid place-items-center">
              <div className="text-center">
                <strong className="block text-base font-extrabold tabular-nums text-[var(--ink)]">{valueFormat(total)}</strong>
                <span className="mt-0.5 block text-[9px] font-bold uppercase tracking-[0.16em] text-[var(--muted)]">Summary</span>
              </div>
            </div>
          </div>
          <div className="w-full min-w-0 grid gap-2.5 overflow-hidden">
            {populated.map((item, index) => (
              <div key={item.label} className="flex items-center justify-between gap-2 min-w-0 w-full">
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  <span className="w-2.5 h-2.5 rounded-[3px] shrink-0" style={{ background: palette[index % palette.length] }} />
                  <strong className="text-xs font-bold text-[var(--ink)] truncate" title={item.label}>
                    {item.label}
                  </strong>
                </div>
                <div className="flex shrink-0 items-baseline gap-1 pl-1 text-xs font-extrabold text-[var(--ink)]">
                  <span>{valueFormat(item.value)}</span>
                  <span className="text-[10px] font-semibold text-[var(--muted)]">({item.percentage}%)</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : <EmptyState title={isRefundMix ? "No completed refunds yet" : "No status distribution yet"} description={isRefundMix ? "Refunded item distribution appears after a completed credit memo." : "Distribution metrics appear when invoices enter processing stages."} />}
    </section>
  );
}
