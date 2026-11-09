// Source: PROJECTS/FINSHIELD_MANAGEMENT_FRONTEND/components/ui/status-badge.tsx
// Presentation copied from the original; services are replaced with local fixtures.
import { AlertCircle, Ban, CheckCircle2, CircleDashed, Clock3, Mail, RefreshCw, Repeat2, UploadCloud } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type StatusBadgeTone = "success" | "info" | "warning" | "danger" | "neutral";

const positive = new Set([
  "ACTIVE",
    "ANCHORED",
    "APPROVED",
    "AUTHENTIC",
    "AVAILABLE",
    "CONFIGURED",
  "COMPLETE",
  "COMPANY CREATED",
  "COMPANY ENABLED",
  "DONE",
  "ENABLED",
  "GENERATED",
  "HEALTHY",
  "IN STOCK",
  "ISSUED",
  "LOGIN SUCCESS",
  "OPERATIONAL",
  "PASSED",
  "READY",
  "PROCESSING RETRY",
  "RESOLVED",
  "SELECTED",
  "SENT",
  "STORED",
  "SUCCESS",
  "UPLOADED",
  "USER CREATED",
  "USER ENABLED",
  "VALID",
  "VERIFIED",
]);

const information = new Set([
  "EMAIL MFA",
  "GENERATING",
  "IN PROGRESS",
  "PROCESSING",
  "QUEUED",
  "SENDING",
  "SUBMITTED",
  "UPLOADING",
]);

const warning = new Set([
  "ATTENTION",
  "LOW STOCK",
  "MAINTENANCE",
  "OPEN",
  "PENDING",
  "PENDING REVIEW",
  "PENDING SETUP",
  "REQUIRED",
  "SETUP NEEDED",
  "UNKNOWN",
]);

const negative = new Set([
  "CANCELLED",
  "COMPANY DISABLED",
  "DISABLED",
  "EXPIRED",
  "FAILED",
  "LOGIN FAILED",
  "OUT OF STOCK",
  "REJECTED",
  "UNAVAILABLE",
  "USER DISABLED",
  "VERIFICATION FAILED",
]);

const neutral = new Set(["ARCHIVED", "MODIFIED", "NO ACTIVE ITEMS", "NOT CONFIGURED", "NOT TRACKED", "REPLACED", "SKIPPED"]);

const labelOverrides: Record<string, string> = {
  "EMAIL MFA": "Email MFA",
  "IN STOCK": "In Stock",
  "LOW STOCK": "Low Stock",
  "NO ACTIVE ITEMS": "No Active Items",
  "NOT CONFIGURED": "Not Tracked",
  "NOT TRACKED": "Not Tracked",
  "OUT OF STOCK": "Out of Stock",
  "PENDING REVIEW": "Pending Review",
  "PENDING SETUP": "Pending Setup",
  "SETUP NEEDED": "Setup Needed",
};

const toneClasses: Record<StatusBadgeTone, string> = {
  danger: "border-[var(--alert-danger-border)] bg-[var(--alert-danger-bg)] text-[var(--alert-danger-ink)]",
  info: "border-[var(--alert-info-border)] bg-[var(--alert-info-bg)] text-[var(--alert-info-ink)]",
  neutral: "border-[var(--alert-neutral-border)] bg-[var(--alert-neutral-bg)] text-[var(--alert-neutral-ink)]",
  success: "border-[var(--alert-success-border)] bg-[var(--alert-success-bg)] text-[var(--alert-success-ink)]",
  warning: "border-[var(--alert-warning-border)] bg-[var(--alert-warning-bg)] text-[var(--alert-warning-ink)]",
};

function normalizeStatus(status?: string | null) {
  return (status ?? "").trim().toUpperCase().replace(/[_-]+/g, " ").replace(/\s+/g, " ") || "UNKNOWN";
}

function statusTone(normalized: string): StatusBadgeTone {
  if (positive.has(normalized)) return "success";
  if (information.has(normalized)) return "info";
  if (warning.has(normalized)) return "warning";
  if (negative.has(normalized)) return "danger";
  if (neutral.has(normalized)) return "neutral";
  return "neutral";
}

function statusLabel(normalized: string) {
  return labelOverrides[normalized] ?? normalized.toLowerCase().replace(/\b\w/g, (character) => character.toUpperCase());
}

function statusIcon(normalized: string, tone: StatusBadgeTone): LucideIcon {
  if (normalized === "CANCELLED" || normalized === "DISABLED" || normalized === "REJECTED") return Ban;
  if (normalized === "REPLACED") return Repeat2;
  if (normalized === "UPLOADING" || normalized === "STORED") return UploadCloud;
  if (normalized === "PROCESSING" || normalized === "GENERATING" || normalized === "SENDING" || normalized === "QUEUED" || normalized === "IN PROGRESS") return RefreshCw;
  if (normalized === "EMAIL MFA") return Mail;
  if (tone === "success") return CheckCircle2;
  if (tone === "danger") return AlertCircle;
  if (tone === "warning") return Clock3;
  return CircleDashed;
}

export function StatusBadge({
  status,
  label,
  tone: toneOverride,
  className,
}: {
  status?: string | null;
  label?: string;
  tone?: StatusBadgeTone;
  className?: string;
}) {
  const normalized = normalizeStatus(status);
  const tone = toneOverride ?? statusTone(normalized);
  const displayLabel = label?.trim() || statusLabel(normalized);
  const Icon = statusIcon(normalized, tone);

  return (
    <span
      aria-label={`Status: ${displayLabel}`}
      className={cn(
        "inline-flex min-h-[25px] items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] font-extrabold tracking-[.04em] shadow-2xs",
        toneClasses[tone],
        className,
      )}
      data-status-badge="true"
      data-status-key={normalized.toLowerCase().replace(/\s+/g, "-")}
      data-status-tone={tone}
      title={label ? `${label}: ${normalized.toLowerCase()}` : undefined}
    >
      {/* statusIcon selects a module-level Lucide component; it never creates one. */}
      {/* eslint-disable-next-line react-hooks/static-components */}
      <Icon size={12} aria-hidden="true" className="shrink-0" />
      <span className="font-extrabold">{displayLabel}</span>
    </span>
  );
}
