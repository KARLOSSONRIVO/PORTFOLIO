// Source: PROJECTS/FINSHIELD_MANAGEMENT_FRONTEND/components/ui/page-header.tsx
// Presentation copied from the original; services are replaced with local fixtures.
import { cn } from "@/lib/utils";

export function PageHeader({
  eyebrow,
  title,
  description,
  action,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col xl:flex-row xl:items-center justify-between gap-4 min-w-0 w-full", className)}>
      <div className="min-w-0 flex-1">
        {eyebrow ? (
          <div className="text-[var(--teal)] font-bold uppercase text-[10px] tracking-[.15em] mb-[7px] hidden">
            {eyebrow}
          </div>
        ) : null}
        <h1 className="m-0 mb-1 text-2xl font-bold tracking-tight text-[var(--ink)] [text-wrap:balance] whitespace-nowrap sm:whitespace-normal">
          {title}
        </h1>
        {description ? <div className="m-0 text-[var(--muted)] text-[14px]">{description}</div> : null}
      </div>
      {action ? <div className="min-w-0 w-full xl:w-auto shrink-0 max-sm:[&>button]:w-full max-sm:[&>button]:justify-center max-sm:[&>a]:w-full max-sm:[&>a]:justify-center">{action}</div> : null}
    </div>
  );
}

