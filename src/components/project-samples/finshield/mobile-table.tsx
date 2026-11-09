// Source: PROJECTS/FINSHIELD_MANAGEMENT_FRONTEND/components/common/mobile-table.tsx
// Presentation copied from the original; services are replaced with local fixtures.
"use client";

import { Fragment, type Key, type KeyboardEvent, type MouseEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export type MobileTableRow = {
  key: Key;
  primary: ReactNode;
  secondary?: ReactNode;
  actions?: ReactNode;
  details?: ReactNode;
  expand?: {
    expanded: boolean;
    detailsId: string;
    onToggle: () => void;
  };
};

type MobileTableProps = {
  label: string;
  primaryLabel: string;
  secondaryLabel?: string;
  actionLabel?: string;
  rows: MobileTableRow[];
  loading?: boolean;
  empty?: ReactNode;
  breakpoint?: "sm" | "md" | "xl";
  className?: string;
};

/** The compact mobile counterpart of a register's desktop table. */
export function MobileTable({
  label,
  primaryLabel,
  secondaryLabel,
  actionLabel,
  rows,
  loading = false,
  empty,
  breakpoint = "sm",
  className,
}: MobileTableProps) {
  const columnCount = 1 + Number(Boolean(secondaryLabel)) + Number(Boolean(actionLabel));

  return (
    <div
      className={cn(
        "mobile-data-table min-w-0 w-full overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--surface)]",
        breakpoint === "xl" ? "xl:hidden" : breakpoint === "md" ? "md:hidden" : "sm:hidden",
        className,
      )}
      data-mobile-table
    >
      <table className="w-full table-fixed border-collapse text-left text-xs text-[var(--ink)]" aria-label={label} aria-busy={loading}>
        <colgroup>
          <col style={{ width: columnCount === 3 ? "46%" : columnCount === 2 ? "65%" : "100%" }} />
          {secondaryLabel ? <col style={{ width: columnCount === 3 ? "30%" : "35%" }} /> : null}
          {actionLabel ? <col style={{ width: columnCount === 3 ? "24%" : "35%" }} /> : null}
        </colgroup>
        <thead className="border-b border-[var(--line)] bg-[var(--surface-muted)]/40 text-[var(--muted)]">
          <tr>
            <th scope="col" className="px-3 py-3 text-left text-[11px] font-bold [overflow-wrap:anywhere]">{primaryLabel}</th>
            {secondaryLabel ? <th scope="col" className="px-1.5 py-3 text-center text-[11px] font-bold [overflow-wrap:anywhere]">{secondaryLabel}</th> : null}
            {actionLabel ? <th scope="col" className="px-1.5 py-3 text-center text-[11px] font-bold [overflow-wrap:anywhere]">{actionLabel}</th> : null}
          </tr>
        </thead>
        <tbody className="divide-y divide-[var(--line)]">
          <MobileTableBody rows={rows} loading={loading} empty={empty} columnCount={columnCount} secondaryLabel={secondaryLabel} actionLabel={actionLabel} />
        </tbody>
      </table>
      {loading ? <span className="sr-only" role="status">Loading {label.toLowerCase()}...</span> : null}
    </div>
  );
}

type MobileTableBodyProps = Pick<MobileTableProps, "rows" | "loading" | "empty" | "secondaryLabel" | "actionLabel"> & { columnCount: number };

function MobileTableBody({ rows, loading, empty, columnCount, ...columns }: MobileTableBodyProps) {
  if (loading) {
    return Array.from({ length: 4 }, (_, index) => (
      <tr key={index} aria-hidden="true">
        <td colSpan={columnCount} className="px-3 py-4">
          <div className="space-y-2 motion-safe:animate-pulse">
            <div className="h-3 w-2/3 rounded bg-[var(--line)]/60" />
            <div className="h-3 w-1/3 rounded bg-[var(--line)]/40" />
          </div>
        </td>
      </tr>
    ));
  }
  if (!rows.length) {
    return <tr><td colSpan={columnCount} className="p-0">{empty ?? <p className="m-0 px-3 py-6 text-center text-[var(--muted)]">No records to display.</p>}</td></tr>;
  }
  return rows.map((row) => <MobileTableContentRow key={row.key} row={row} columnCount={columnCount} {...columns} />);
}

function MobileTableContentRow({ row, columnCount, secondaryLabel, actionLabel }: Pick<MobileTableBodyProps, "columnCount" | "secondaryLabel" | "actionLabel"> & { row: MobileTableRow }) {
  function handleRowClick(event: MouseEvent<HTMLTableRowElement>) {
    if (!row.expand) return;
    const target = event.target;
    if (target instanceof Element && target.closest("button, a, input, select, textarea, [role='button'], [role='menuitem'], [data-mobile-row-action]")) return;
    row.expand.onToggle();
  }

  function handleRowKeyDown(event: KeyboardEvent<HTMLTableRowElement>) {
    if (!row.expand || event.target !== event.currentTarget || (event.key !== "Enter" && event.key !== " ")) return;
    event.preventDefault();
    row.expand.onToggle();
  }

  return (
    <Fragment>
      <tr
        onClick={row.expand ? handleRowClick : undefined}
        onKeyDown={row.expand ? handleRowKeyDown : undefined}
        aria-expanded={row.expand?.expanded}
        aria-controls={row.expand?.expanded ? row.expand.detailsId : undefined}
        tabIndex={row.expand ? 0 : undefined}
        className={row.expand ? "cursor-pointer hover:bg-[var(--surface-muted)]/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--teal)]" : undefined}
      >
        <th scope="row" className="min-w-0 px-3 py-4 align-top text-left font-normal [overflow-wrap:anywhere] [&_input]:max-w-full [&_select]:max-w-full">{row.primary}</th>
        {secondaryLabel ? <td className="px-1.5 py-4 align-top text-center [overflow-wrap:anywhere] [&>div]:min-w-0 [&_span]:whitespace-normal [&_span]:max-w-full">{row.secondary}</td> : null}
        {actionLabel ? (
          <td className="mobile-table-actions px-1.5 py-3 align-top text-center" data-mobile-row-action={row.expand ? "" : undefined}>
            <div className="flex min-w-0 flex-col items-center justify-start gap-2">{row.actions}</div>
          </td>
        ) : null}
      </tr>
      {row.details ? <tr><td colSpan={columnCount} className="min-w-0 bg-[var(--surface-muted)]/25 px-3 py-3 [overflow-wrap:anywhere]">{row.details}</td></tr> : null}
    </Fragment>
  );
}

export function MobileTableRecord({
  title,
  subtitle,
  fields = [],
  showFields = false,
  children,
}: {
  title: ReactNode;
  subtitle?: ReactNode;
  fields?: Array<{ label: string; value: ReactNode }>;
  showFields?: boolean;
  children?: ReactNode;
}) {
  return (
    <div className="min-w-0 space-y-1.5 [overflow-wrap:anywhere]">
      <div className="text-[13px] font-bold leading-snug text-[var(--ink)]">{title}</div>
      {subtitle ? <div className="text-xs leading-snug text-[var(--ink)]">{subtitle}</div> : null}
      {showFields && fields.length ? (
        <dl className="m-0 space-y-1.5">
          {fields.map((field) => (
            <div key={field.label}>
              <dt className="text-[10px] font-semibold leading-snug text-[var(--muted)]">{field.label}</dt>
              <dd className="m-0 mt-0.5 text-[11px] font-normal leading-snug text-[var(--ink)]">{field.value}</dd>
            </div>
          ))}
        </dl>
      ) : null}
      {children}
    </div>
  );
}
