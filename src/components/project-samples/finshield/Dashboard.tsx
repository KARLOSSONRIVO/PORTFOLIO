"use client";
// Source: PROJECTS/FINSHIELD_MANAGEMENT_FRONTEND/components/dashboard/dashboard-view.tsx
// Original company-owner presentation; deterministic fixture data replaces every service.
import {useState} from "react";
import {CircleDollarSign,FilePlus2,Files} from "lucide-react";
import Link from "@/components/project-samples/SampleLink";
import {MobileTable,MobileTableRecord} from "./mobile-table";
import {TableActionIcon} from "./table-action-icon";
import {DashboardChartFilters,type Period} from "./dashboard-chart-filters";
import {ComparisonChart,StatusChart,TrendChart} from "./dashboard-charts";
import {CompanyInventoryHealthChart} from "./company-inventory-health-chart";
import {PageHeader} from "./page-header";
import {StatusBadge} from "./status-badge";
import {EmptyState,MetricCard,SectionHeading} from "./workspace-ui";
import {getInvoicesHrefForRole} from "./navigation";
import {cn} from "@/lib/utils";
import {user, financialRows, recentInvoices, data, refundedItemMix} from "./fixtures";
const money=(value:string|number)=>`₱${Number(value).toLocaleString("en-PH",{minimumFractionDigits:2,maximumFractionDigits:2})}`;
export default function DashboardView(){
 const [period,setPeriod]=useState<Period>("monthly");
 const [dateRange,setDateRange]=useState("6");
 const [companyFilter,setCompanyFilter]=useState("all");
 const owner=true,isAdmin=false,manager=false,cashier=false,showRefunds=true,showStatusChart=true;
 const availableYears=[2025,2026],companyNames=["Sample Trading Co."];
 const title="Company overview",displayName="Karlos Rivo";
 const chartDescription=`Revenue activity ${period==="yearly"?"for the selected year":`over the last ${dateRange} ${period==="weekly"?"weeks":"months"}`}.`;
 const financialTrend=financialRows(period,dateRange);
 const trend=financialTrend;
 const statusData=refundedItemMix;
 const metrics=[
 ["Company invoices",128,"Current authorized scope",Files],
 ["Net revenue",money(financialTrend.reduce((total,row)=>total+row.net,0)),"Issued sales less refunds",CircleDollarSign],
 ["Completed refunds",money(financialTrend.reduce((total,row)=>total+row.refunds,0)),"Completed credit memos",CircleDollarSign],
 ["Invoices created today",12,"Issued today",FilePlus2],
 ] as const;
  return (
    <div className="w-full min-w-0 max-w-none p-[26px_24px_72px] m-0 max-sm:p-[22px_16px_64px]">
      <PageHeader
        eyebrow={isAdmin ? "Administrator" : owner ? "Company owner" : manager ? "Branch manager" : "Invoice desk"}
        title={title}
        description={`Welcome back, ${displayName}. Review invoice activity, ${showRefunds ? "refunds, " : ""}net revenue${owner ? ", and inventory health" : ""}.`}
        className="mb-6"
        action={
          <DashboardChartFilters
            period={period}
            onPeriodChange={setPeriod}
            dateRange={dateRange}
            onDateRangeChange={setDateRange}
            availableYears={availableYears}
            showCompanyFilter={isAdmin}
            company={companyFilter}
            onCompanyChange={setCompanyFilter}
            companies={companyNames}
          />
        }
      />
          <div className="grid gap-3 sm:gap-[14px] grid-cols-2 xl:grid-cols-4">
            {metrics.map(([label, value, note, icon]) => (
              <MetricCard key={label} label={label} value={value} note={note} icon={icon} compactOnMobile />
            ))}
          </div>

          {/* Trend & Status Charts */}
          <div className={cn(
            "mt-4 grid grid-cols-1 gap-4",
            owner
              ? showRefunds
                ? "lg:grid-cols-2 xl:grid-cols-[minmax(0,1.35fr)_minmax(260px,.85fr)_minmax(260px,.85fr)]"
                : "lg:grid-cols-[minmax(0,1.55fr)_minmax(280px,.85fr)]"
              : showStatusChart ? "lg:grid-cols-[minmax(0,1.55fr)_minmax(300px,.85fr)]" : undefined,
          )}>
            <div className={owner && showRefunds ? "lg:col-span-2 xl:col-span-1" : undefined}>
              <TrendChart
                title={isAdmin ? (owner ? "Company invoice value trend" : manager ? "Branch invoice trend" : cashier ? "My issued invoice activity" : "Issued invoice trend") : owner ? "Company revenue trend" : manager ? "Branch revenue trend" : cashier ? "My revenue activity" : "Branch revenue trend"}
                description={isAdmin ? chartDescription : `${chartDescription} ${showRefunds ? "Includes issued sales, completed refunds, and net revenue." : "Includes issued sales and net revenue."}`}
                data={isAdmin ? trend : financialTrend}
                valueKey={owner || manager ? "value" : "count"}
                valueLabel={owner || manager ? "Invoice value" : "Invoices"}
                series={isAdmin ? undefined : [
                  { dataKey: "issued", label: "Issued sales", color: "#10b981" },
                  ...(showRefunds ? [{ dataKey: "refunds", label: "Refunds", color: "#f59e0b" }] : []),
                  { dataKey: "net", label: "Net revenue", color: "#60a5fa" },
                ]}
              />
            </div>
            {owner ? <CompanyInventoryHealthChart /> : null}
            {showStatusChart ? <StatusChart
              data={isAdmin ? statusData : refundedItemMix}
              title={isAdmin ? undefined : "Refunded item mix"}
              description={isAdmin ? undefined : "Completed refunds by item value in the selected period."}
              valueFormat={isAdmin ? undefined : money}
            /> : null}
          </div>


          {isAdmin || owner || manager ? (
            <div className="mt-4">
              <ComparisonChart
                title={isAdmin ? "Top company performance" : owner ? "Top branch performance" : "Cashier output breakdown"}
                description={isAdmin ? "Compares issued invoice volume across companies." : owner ? "Compares issued invoice volume across active branches." : "Compares issued invoice volume across cashiers."}
                data={
                  isAdmin
                    ? (data?.byBranch ?? []).map((item) => ({ label: item.branch?.branchName ?? "Company", count: item.invoiceCount, value: item.invoiceValue }))
                    : owner
                    ? (data?.byBranch ?? []).map((item) => ({ label: item.branch?.branchName ?? "Branch", count: item.invoiceCount, value: item.invoiceValue }))
                    : (data?.byCashier ?? []).map((item) => ({ label: item.cashier ? `${item.cashier.firstName} ${item.cashier.lastName}` : "Cashier", count: item.invoiceCount, value: item.invoiceValue }))
                }
                valueKey="count"
                valueLabel="Invoices"
              />
            </div>
          ) : null}

          {/* Recent Invoices Table */}
          <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
            <section className={cn("min-w-0 p-4 sm:p-5 bg-white border border-[var(--line)] rounded-2xl shadow-xs", (owner || manager || cashier) && "lg:col-span-2")}>
              <SectionHeading title="Recent issued invoices" description="Latest official records generated across your authorized scope." />
              <MobileTable
                label="Recent issued invoices"
                primaryLabel="Invoice / customer"
                secondaryLabel="Amount / status"
                actionLabel="Action"
                empty={<EmptyState title="No recent invoices to review" description="Issued invoices will appear here once they are recorded." />}
                rows={recentInvoices.map((inv) => ({
                  key: inv.id,
                  primary: <MobileTableRecord title={<Link href={getInvoicesHrefForRole(user?.role, inv.id)} className="font-bold text-[var(--teal)] hover:underline">{inv.invoiceNumber}</Link>} subtitle={inv.customerName || "Walk-in Customer"} />,
                  secondary: <div className="space-y-2"><strong className="block tabular-nums text-[var(--ink)]">{money(inv.totalAmount)}</strong><StatusBadge status={inv.invoiceStatus} /></div>,
                  actions: <TableActionIcon href={getInvoicesHrefForRole(user?.role, inv.id)} text="View" label={`View invoice ${inv.invoiceNumber}`} />,
                }))}
              />
              <div className="hidden overflow-x-auto sm:block">
                <table className="w-full table-fixed min-w-[700px] border-collapse text-xs text-center">
                  <colgroup>
                    <col className="w-[28%]" />
                    <col className="w-[32%]" />
                    <col className="w-[20%]" />
                    <col className="w-[20%]" />
                  </colgroup>
                  <thead>
                    <tr className="border-b border-[var(--line)] bg-[var(--surface-muted)]/50">
                      <th className="px-6 py-3.5 text-center text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">Invoice #</th>
                      <th className="px-4 py-3.5 text-center text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">Customer</th>
                      <th className="px-4 py-3.5 text-center text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">Amount</th>
                      <th className="px-6 py-3.5 text-center text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--line)]">
                    {recentInvoices.map((inv) => (
                      <tr key={inv.id} className="h-14 hover:bg-[var(--surface-muted)]/50 transition-colors">
                        <td className="px-6 py-3 font-bold text-[var(--ink)] text-center">
                          <Link href={getInvoicesHrefForRole(user?.role, inv.id)} className="inline-block text-center hover:underline text-[var(--teal)] font-bold">
                            {inv.invoiceNumber}
                          </Link>
                        </td>
                        <td className="px-4 py-3 font-semibold text-[var(--ink)] truncate max-w-[240px] text-center">
                          {inv.customerName || "Walk-in Customer"}
                        </td>
                        <td className="px-4 py-3 text-center font-mono font-bold text-xs text-[var(--ink)]">
                          {money(inv.totalAmount)}
                        </td>
                        <td className="px-6 py-3 text-center">
                          <div className="flex justify-center">
                            <StatusBadge status={inv.invoiceStatus} />
                          </div>
                        </td>
                      </tr>
                    ))}
                    {!recentInvoices.length ? (
                      <tr>
                        <td colSpan={4} className="p-0">
                          <EmptyState title="No recent invoices to review" description="Issued invoices will appear here once they are recorded." />
                        </td>
                      </tr>
                    ) : null}
                  </tbody>
                </table>
              </div>
            </section>

          </div>
    </div>
  );
}
