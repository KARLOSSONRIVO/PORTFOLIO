// Source: PROJECTS/FINSHIELD_MANAGEMENT_FRONTEND/components/common/table-action-icon.tsx
// Presentation copied from the original; services are replaced with local fixtures.
import type { LucideIcon } from "lucide-react";
import { ChevronRight, Pencil } from "lucide-react";
import Link from "@/components/project-samples/SampleLink";
import type { MouseEventHandler } from "react";
import { cn } from "@/lib/utils";

type TableActionTone = "primary" | "neutral" | "danger" | "info" | "warning";

type TableActionBaseProps = {
  icon?: LucideIcon;
  endIcon?: LucideIcon;
  text?: string;
  label: string;
  id?: string;
  tone?: TableActionTone;
  className?: string;
};

type TableActionButtonProps = TableActionBaseProps & {
  href?: never;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
};

type TableActionLinkProps = TableActionBaseProps & {
  href: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  disabled?: never;
};

const toneClasses: Record<TableActionTone, string> = {
  primary: "border-emerald-600 bg-emerald-600 !text-white hover:border-emerald-700 hover:bg-emerald-700",
  neutral: "border-[var(--line-strong)] bg-[var(--surface)] text-[var(--ink)] hover:border-[var(--teal)] hover:bg-[var(--surface-muted)] hover:text-[var(--teal)]",
  danger: "border-red-600 bg-red-600 !text-white hover:border-red-700 hover:bg-red-700",
  info: "border-blue-700 bg-blue-700 !text-white hover:border-blue-800 hover:bg-blue-800",
  warning: "border-amber-300 bg-amber-50 text-amber-800 hover:border-amber-400 hover:bg-amber-100",
};

function isLinkAction(props: TableActionButtonProps | TableActionLinkProps): props is TableActionLinkProps {
  return typeof props.href === "string";
}

export function TableActionIcon(props: TableActionButtonProps | TableActionLinkProps) {
  const { icon: Icon, endIcon: EndIconProp, text, label, id, tone = "primary", className } = props;
  const actionLabel = text ?? label;
  const ActionIcon = Icon ?? (actionLabel.trim().toLowerCase() === "edit" ? Pencil : undefined);
  const EndIcon = EndIconProp ?? (text === "View" || text === "Review" ? ChevronRight : undefined);
  const isMultiIcon = Boolean(!text && ActionIcon && EndIcon);
  const classes = cn(
    "inline-flex h-8 shrink-0 items-center justify-center gap-1 rounded-[var(--button-radius)] border shadow-xs transition-colors duration-150 motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--teal)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--surface)]",
    text ? "min-w-[50px] px-2.5 text-xs font-bold whitespace-nowrap" : isMultiIcon ? "px-2" : "w-8",
    toneClasses[tone],
    className,
  );
  const forceWhite = tone === "primary" || tone === "danger" || tone === "info";
  const content = text ? (
    <>
      {ActionIcon ? <ActionIcon size={14} aria-hidden="true" /> : null}
      <span>{text}</span>
      {EndIcon ? <EndIcon size={14} aria-hidden="true" /> : null}
    </>
  ) : ActionIcon && EndIcon ? (
    <>
      <ActionIcon size={14} aria-hidden="true" />
      <EndIcon size={14} aria-hidden="true" />
    </>
  ) : ActionIcon ? (
    <ActionIcon size={16} aria-hidden="true" />
  ) : EndIcon ? (
    <EndIcon size={16} aria-hidden="true" />
  ) : null;

  if (isLinkAction(props)) {
    return (
      <Link
        id={id}
        href={props.href}
        onClick={props.onClick}
        className={classes}
        aria-label={label}
        title={label}
        style={forceWhite ? { color: "#ffffff" } : undefined}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      id={id}
      type="button"
      onClick={props.onClick}
      disabled={props.disabled}
      className={cn(classes, "cursor-pointer disabled:cursor-not-allowed disabled:opacity-50")}
      aria-label={label}
      title={label}
      style={forceWhite ? { color: "#ffffff" } : undefined}
    >
      {content}
    </button>
  );
}
