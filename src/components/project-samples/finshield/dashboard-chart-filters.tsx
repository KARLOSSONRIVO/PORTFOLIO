// Source: PROJECTS/FINSHIELD_MANAGEMENT_FRONTEND/components/dashboard/dashboard-chart-filters.tsx
// Presentation copied from the original; services are replaced with local fixtures.
"use client";

import { Building2, CalendarDays, Check, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
type FilterSelectOption = {value:string;label:string};

export type Period = "weekly" | "monthly" | "yearly";

export function CustomFilterSelect({
  value,
  options,
  onChange,
  icon: Icon,
  align = "left",
  ariaLabel,
  className,
  containerClassName,
}: {
  value: string;
  options: FilterSelectOption[];
  onChange: (val: string) => void;
  icon?: React.ComponentType<{ className?: string }>;
  align?: "left" | "right";
  ariaLabel: string;
  className?: string;
  containerClassName?: string;
}) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value) ?? options[0];

  useEffect(() => {
    const ownerDocument = containerRef.current?.ownerDocument;
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    ownerDocument?.addEventListener("mousedown", handleClickOutside);
    return () => ownerDocument?.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={cn("relative inline-block text-left", containerClassName)} ref={containerRef}>
      <button
        type="button"
        aria-label={ariaLabel}
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
        className={cn(
          "h-10 px-2.5 sm:px-4 inline-flex items-center justify-between gap-1.5 sm:gap-2 font-bold text-[11px] sm:text-xs rounded-xl shadow-xs transition-all duration-150 cursor-pointer group outline-none border select-none shrink-0",
          open
            ? "bg-[var(--primary-soft)] text-[var(--teal)] border-[var(--teal)]"
            : "bg-[var(--surface)] text-[var(--ink)] border-[var(--line)] hover:border-[var(--line-strong)]",
          className
        )}
      >
        <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
          {Icon ? <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 text-[var(--teal)]" /> : null}
          <span className="truncate font-bold text-[11px] sm:text-xs text-[var(--ink)]">{selectedOption?.label}</span>
        </div>
        <ChevronDown
          className={cn(
            "w-3 h-3 sm:w-3.5 sm:h-3.5 transition-transform duration-200 shrink-0 ml-0.5",
            open ? "rotate-180 text-[var(--teal)]" : "text-[var(--muted)]"
          )}
        />
      </button>

      {open ? (
        <div
          className={cn(
            "absolute mt-1.5 z-50 min-w-[200px] w-max max-w-[320px] max-sm:w-full max-sm:max-w-none rounded-xl shadow-2xl p-1 space-y-0.5 animate-in fade-in-50 zoom-in-95 bg-[var(--surface)] text-[var(--ink)] border border-[var(--line)]",
            options.length <= 8 ? "max-h-none overflow-visible" : "max-h-72 overflow-y-auto",
            align === "right" ? "right-0" : "left-0"
          )}
        >
          {options.map((option) => {
            const isSelected = option.value === value;
            return (
              <button
                key={option.value}
                type="button"
                className={cn(
                  "w-full flex items-center justify-between gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer text-left select-none",
                  isSelected
                    ? "bg-[var(--primary-soft)] text-[var(--teal)] font-bold"
                    : "text-[var(--ink)] hover:bg-[var(--surface-muted)]"
                )}
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
              >
                <span className="truncate text-xs font-medium">{option.label}</span>
                {isSelected ? <Check className="w-3.5 h-3.5 shrink-0 text-[var(--teal)]" /> : null}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

interface DashboardChartFiltersProps {
  period: Period;
  onPeriodChange: (value: Period) => void;
  dateRange: string;
  onDateRangeChange: (value: string) => void;
  availableYears?: number[];
  showCompanyFilter?: boolean;
  company?: string;
  onCompanyChange?: (value: string) => void;
  companyOptions?: FilterSelectOption[];
  companies?: string[];
}

export function DashboardChartFilters({
  period,
  onPeriodChange,
  dateRange,
  onDateRangeChange,
  availableYears = [2024, 2025, 2026],
  showCompanyFilter = false,
  company = "all",
  onCompanyChange,
  companyOptions = [],
  companies = [],
}: DashboardChartFiltersProps) {
  const computedCompanyOptions: FilterSelectOption[] =
    companyOptions.length > 0
      ? companyOptions
      : [
          { value: "all", label: "All Companies" },
          ...companies.map((c) => ({ value: c, label: c })),
        ];

  const rangeOptions: FilterSelectOption[] =
    period === "weekly"
      ? [
          { value: "1", label: "Last 1 week" },
          { value: "2", label: "Last 2 weeks" },
          { value: "4", label: "Last 4 weeks" },
          { value: "6", label: "Last 6 weeks" },
          { value: "8", label: "Last 8 weeks" },
          { value: "12", label: "Last 12 weeks" },
        ]
      : period === "monthly"
      ? [
          { value: "1", label: "Last 1 month" },
          { value: "3", label: "Last 3 months" },
          { value: "6", label: "Last 6 months" },
          { value: "12", label: "Last 12 months" },
        ]
      : [
          { value: "all", label: "All recorded years" },
          ...availableYears.map((year) => ({
            value: String(year),
            label: `Year ${year}`,
          })),
        ];

  return (
    <div className="grid w-full min-w-0 grid-cols-1 gap-2 sm:flex sm:w-auto sm:flex-wrap sm:items-center sm:gap-2.5">
      {/* Period Selection Pills */}
      <div className="flex h-10 w-full items-center rounded-xl border border-[var(--line)] bg-[var(--surface-muted)] p-1 text-xs font-semibold sm:w-auto">
        {(["weekly", "monthly", "yearly"] as const).map((p) => {
          const isActive = period === p;
          return (
            <button
              key={p}
              type="button"
              onClick={() => {
                onPeriodChange(p);
                if (p === "weekly") onDateRangeChange("6");
                else if (p === "monthly") onDateRangeChange("6");
                else onDateRangeChange("all");
              }}
              aria-pressed={isActive}
              className={cn(
                "h-full flex-1 rounded-lg px-2 text-xs capitalize transition-all duration-150 cursor-pointer sm:flex-none sm:px-3",
                isActive
                  ? "bg-[var(--surface)] text-[var(--ink)] shadow-xs font-bold"
                  : "text-[var(--muted)] hover:text-[var(--ink)]"
              )}
            >
              {p}
            </button>
          );
        })}
      </div>

      {/* Date Range Dropdown */}
      <CustomFilterSelect
        value={dateRange}
        options={rangeOptions}
        onChange={onDateRangeChange}
        icon={CalendarDays}
        align="right"
        ariaLabel="Filter by date range"
        className="w-full min-h-10 sm:w-auto"
        containerClassName="w-full sm:w-auto"
      />

      {/* Company Filter Dropdown */}
      {showCompanyFilter && onCompanyChange && computedCompanyOptions.length > 0 ? (
        <CustomFilterSelect
          value={company}
          options={computedCompanyOptions}
          onChange={onCompanyChange}
          icon={Building2}
          align="right"
          ariaLabel="Filter by company"
          className="w-full min-h-10 sm:w-auto"
          containerClassName="w-full sm:w-auto"
        />
      ) : null}
    </div>
  );
}
