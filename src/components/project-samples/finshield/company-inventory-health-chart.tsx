// Source: PROJECTS/FINSHIELD_MANAGEMENT_FRONTEND/components/dashboard/company-inventory-health-chart.tsx
// Presentation copied from the original; services are replaced with local fixtures.
"use client";

import Link from "@/components/project-samples/SampleLink";
import { StatusChart } from "@/components/project-samples/finshield/dashboard-charts";
import { EmptyState, ErrorState, SectionHeading } from "@/components/project-samples/finshield/workspace-ui";
import { useCompanyInventorySummary } from "@/components/project-samples/finshield/fixtures";

function BranchManagementLink() {
  return (
    <Link
      href="/company/manager/branches"
      className="inline-flex min-h-9 items-center justify-center rounded-lg border border-[var(--line-strong)] bg-white px-3 text-[11px] font-bold text-[var(--ink)] transition-colors hover:border-[var(--teal)] hover:text-[var(--teal)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--teal)]"
    >
      View branches
    </Link>
  );
}

export function CompanyInventoryHealthChart() {
  const query = useCompanyInventorySummary();
  const summary = query.data?.summary;
  const data = summary
    ? [
        { label: "In stock", value: summary.inStockLocations },
        { label: "Low stock", value: summary.lowStockLocations },
        { label: "Out of stock", value: summary.outOfStockLocations },
        { label: "Needs setup", value: summary.notConfiguredLocations },
      ]
    : [];

  if (query.isLoading) {
    return (
      <section className="min-w-0 rounded-2xl border border-[var(--line)] bg-white p-4 shadow-xs sm:p-5" aria-label="Loading inventory health">
        <SectionHeading title="Inventory health" action={<BranchManagementLink />} />
        <div className="h-[240px] animate-pulse rounded-xl bg-[var(--surface-muted)]" />
      </section>
    );
  }

  if (query.isError) {
    return (
      <section className="min-w-0 rounded-2xl border border-[var(--line)] bg-white p-4 shadow-xs sm:p-5" aria-label="Inventory health">
        <SectionHeading title="Inventory health" action={<BranchManagementLink />} />
        <ErrorState title="Inventory health could not be loaded" onRetry={() => query.refetch()} />
      </section>
    );
  }

  if (!summary?.activeBranches || !data.some((item) => item.value > 0)) {
    return (
      <section className="min-w-0 rounded-2xl border border-[var(--line)] bg-white p-4 shadow-xs sm:p-5" aria-label="Inventory health">
        <SectionHeading title="Inventory health" action={<BranchManagementLink />} />
        <EmptyState
          title="No branch stock to chart yet"
          description="Set an opening balance for an active branch item to begin monitoring stock health."
          action={<BranchManagementLink />}
        />
      </section>
    );
  }

  return (
    <StatusChart
      data={data}
      title="Inventory health"
      description="Current stock status across all active branches."
      valueLabel="Item locations"
      action={<BranchManagementLink />}
    />
  );
}
