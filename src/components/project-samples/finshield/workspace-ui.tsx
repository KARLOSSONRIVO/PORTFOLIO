// Source: PROJECTS/FINSHIELD_MANAGEMENT_FRONTEND/components/ui/workspace-ui.tsx
"use client";

import {
  AlertCircle,
  CheckCircle2,
  Inbox,
  LoaderCircle,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function MetricCard({
  label,
  value,
  note,
  icon: Icon,
  trend,
  compactOnMobile = false,
}: {
  label: string;
  value: string | number;
  note: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  trend?: { value: string; direction: "up" | "down" | "neutral" };
  compactOnMobile?: boolean;
}) {
  const isEmerald = label.toLowerCase().includes("verified") || label.toLowerCase().includes("active") || label.toLowerCase().includes("completed");
  const isRefund = label.toLowerCase().includes("refund");
  const isRed = label.toLowerCase().includes("flagged") || label.toLowerCase().includes("fraud") || label.toLowerCase().includes("failed");

  let colorClass = "text-[var(--teal)]";
  let bgGlow = "bg-[var(--teal)]";

  if (isEmerald) { colorClass = "text-[#0a6840]"; bgGlow = "bg-[#0e2d1d]"; }
  if (isRefund) { colorClass = "text-amber-600"; bgGlow = "bg-amber-500"; }
  if (isRed) { colorClass = "text-red-500"; bgGlow = "bg-red-500"; }

  return (
    <article className={cn("group relative min-w-0 p-5 bg-white border border-[var(--line)] rounded-2xl shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-[var(--line-strong)] overflow-hidden", compactOnMobile && "max-sm:p-3.5")}>
      <div className={cn("absolute -right-6 -top-6 h-24 w-24 rounded-full opacity-5 blur-2xl transition-all duration-500 group-hover:opacity-20 group-hover:scale-150", bgGlow)} />
      <div className="relative z-10 flex items-center justify-between gap-3">
        <div className="space-y-1.5 min-w-0 flex-1">
          <p className={cn("text-[11px] font-bold tracking-wider text-[var(--muted)] uppercase truncate m-0", compactOnMobile && "whitespace-normal line-clamp-2 min-h-8 leading-4 xl:pr-12")}>{label}</p>
          <strong className={cn("block font-black tracking-tight text-[var(--ink)] truncate text-2xl sm:text-3xl font-sans", compactOnMobile && "max-xl:text-lg xl:text-2xl whitespace-normal break-words leading-tight tabular-nums")}>
            {value}
          </strong>
          <p className={cn("text-[11px] text-[var(--muted)] truncate m-0", compactOnMobile && "whitespace-normal line-clamp-2 leading-4")}>{note}</p>
        </div>
        <div className={cn("flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--surface-muted)] border border-[var(--line)] transition-transform duration-300 group-hover:scale-110", colorClass, compactOnMobile && "max-xl:hidden xl:absolute xl:right-0 xl:top-0")}>
          <Icon size={22} />
        </div>
      </div>
      {trend ? (
        <div className="mt-2 pt-2 border-t border-[var(--line)] flex items-center justify-between text-[10px]">
          <span className={cn("font-bold inline-flex items-center gap-1", trend.direction === "up" && "text-[#0a6840]", trend.direction === "down" && "text-red-600", trend.direction === "neutral" && "text-[var(--muted)]")}>
            {trend.direction === "up" ? <TrendingUp size={12} /> : trend.direction === "down" ? <TrendingDown size={12} /> : null}
            {trend.value}
          </span>
        </div>
      ) : null}
    </article>
  );
}

export function SectionHeading({
  title,
  description,
  titleAdornment,
  action,
}: {
  title: string;
  description?: string;
  titleAdornment?: ReactNode;
  action?: ReactNode;
}) {
  return (
    <header className="mb-[17px] flex items-start justify-between gap-[14px] max-sm:flex-col max-sm:items-stretch">
      <div>
        <h2 className="m-0 mb-[5px] flex items-center gap-2 text-[var(--ink)] text-[18px] font-bold">
          {title}
          {titleAdornment}
        </h2>
        {description ? <p className="m-0 max-w-[62ch] text-[var(--muted)] text-[11px] leading-[1.55]">{description}</p> : null}
      </div>
      {action ? <div className="max-sm:w-full max-sm:[&>button]:w-full max-sm:[&>button]:justify-center max-sm:[&>a]:w-full max-sm:[&>a]:justify-center">{action}</div> : null}
    </header>
  );
}

export function LoadingState({ label = "Loading view..." }: { label?: string }) {
  return (
    <div className="min-h-[280px] w-full flex flex-col items-center justify-center text-center space-y-4 p-6" role="status">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 bg-[var(--teal)] rounded-xl flex items-center justify-center text-white shadow-xs animate-pulse">
          <LoaderCircle size={22} className="animate-spin text-white" />
        </div>
        <span className="font-bold text-lg tracking-tight text-[var(--ink)]">FinShield</span>
      </div>
      <p className="text-xs font-semibold text-[var(--muted)] animate-pulse">
        {label}
      </p>
    </div>
  );
}

export function EmptyState({ title, description, action }: { title: string; description: string; action?: ReactNode }) {
  return (
    <div data-empty-state className="min-h-[210px] w-full p-[30px] flex flex-col items-center justify-center text-center gap-2 text-[var(--muted)]">
      <Inbox size={24} className="shrink-0" aria-hidden="true" />
      <strong className="text-[var(--ink)] text-[13px] font-bold">{title}</strong>
      <span className="max-w-[42ch] text-[10px] leading-[1.5]">{description}</span>
      {action}
    </div>
  );
}

export function ErrorState({ title = "This data could not be loaded", onRetry }: { title?: string; onRetry?: () => void }) {
  return (
    <div className="min-h-[210px] w-full p-[30px] flex flex-col items-center justify-center text-center gap-2 text-[var(--muted)]" role="alert">
      <AlertCircle size={24} className="text-[var(--danger)] shrink-0" />
      <strong className="text-[var(--ink)] text-[13px] font-bold">{title}</strong>
      <span className="max-w-[42ch] text-[10px] leading-[1.5]">Check your connection and try again.</span>
      {onRetry ? (
        <button
          type="button"
          className="min-h-[34px] px-[11px] py-[7px] inline-flex items-center justify-center gap-2 font-bold text-[11px] rounded-[9px] border border-[var(--line-strong)] text-[var(--ink)] bg-white hover:bg-[var(--surface-muted)] hover:border-[#9eb1aa] transition-all duration-150 outline-none active:scale-[.97]"
          onClick={onRetry}
        >
          Try again
        </button>
      ) : null}
    </div>
  );
}

export function InlineNotice({ children, tone = "success" }: { children: ReactNode; tone?: "success" | "warning" | "danger" }) {
  return (
    <div
      className={cn(
        "mb-4 p-[12px_14px] flex items-start gap-[10px] rounded-[10px] text-[11px] leading-[1.5] border shadow-2xs",
        tone === "success" && "text-emerald-900 bg-emerald-50 border-emerald-200 dark:text-emerald-200 dark:bg-emerald-950/60 dark:border-emerald-800/80",
        tone === "warning" && "text-amber-900 bg-amber-50 border-amber-200 dark:text-amber-200 dark:bg-amber-950/60 dark:border-amber-800/80",
        tone === "danger" && "text-red-900 bg-red-50 border-red-200 dark:text-red-200 dark:bg-red-950/60 dark:border-red-800/80"
      )}
      role={tone === "danger" ? "alert" : "status"}
    >
      {tone === "success" ? <CheckCircle2 size={18} className="shrink-0 mt-0.5 text-emerald-700 dark:text-emerald-400" /> : <AlertCircle size={18} className="shrink-0 mt-0.5" />}
      <div className="font-semibold">{children}</div>
    </div>
  );
}

