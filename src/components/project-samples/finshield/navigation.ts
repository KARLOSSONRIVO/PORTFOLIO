// Source: PROJECTS/FINSHIELD_MANAGEMENT_FRONTEND/lib/navigation.ts
// Presentation copied from the original; services are replaced with local fixtures.
import {
  Archive,
  BarChart3,
  Building2,
  Database,
  FileCheck2,
  FilePlus2,
  Files,
  GitBranch,
  KeyRound,
  LayoutDashboard,
  Link2,
  Megaphone,
  MessageSquareText,
  PackageSearch,
  ScrollText,
  RotateCcw,
  Settings,
  ShieldCheck,
  UserRoundCog,
  Users,
  Wrench,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { UserRole } from "@/components/project-samples/finshield/auth-types";

export type NavigationItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

export type NavigationGroup = {
  label: string;
  items: NavigationItem[];
};

// ─── Role dashboards ───────────────────────────────────────────────────────────

const dashboardFor: Record<UserRole, string> = {
  SUPER_ADMIN: "/admin/super-admin",
  ADMINISTRATOR: "/admin/administrator",
  COMPANY_OWNER: "/company/manager",
  BRANCH_MANAGER: "/company/branch-manager",
  CASHIER: "/company/cashier",
};

const profileHrefFor: Record<UserRole, string> = {
  SUPER_ADMIN: "/admin/super-admin/profile",
  ADMINISTRATOR: "/admin/administrator/profile",
  COMPANY_OWNER: "/company/manager/profile",
  BRANCH_MANAGER: "/company/manager/profile",
  CASHIER: "/company/cashier/profile",
};

const invoicesHrefFor: Record<UserRole, string> = {
  SUPER_ADMIN: "/admin/super-admin",
  ADMINISTRATOR: "/admin/administrator/invoices",
  COMPANY_OWNER: "/company/manager/invoices",
  BRANCH_MANAGER: "/company/branch-manager/invoices",
  CASHIER: "/company/cashier/invoices",
};

const createInvoiceHrefFor: Record<UserRole, string> = {
  SUPER_ADMIN: "/admin/super-admin",
  ADMINISTRATOR: "/admin/administrator/invoices",
  COMPANY_OWNER: "/company/manager/invoices/new",
  BRANCH_MANAGER: "/company/branch-manager/invoices/new",
  CASHIER: "/company/cashier/invoices/new",
};

export function getDashboardForRole(role: UserRole) {
  return dashboardFor[role];
}

export function getProfileHrefForRole(role: UserRole) {
  return profileHrefFor[role] ?? "/settings";
}

export function getInvoicesHrefForRole(role?: UserRole, invoiceId?: string) {
  const base = (role && invoicesHrefFor[role]) ?? "/company/manager/invoices";
  return invoiceId ? `${base}/${invoiceId}` : base;
}

export function getInvoiceSuccessHrefForRole(role: UserRole | undefined, invoiceId: string) {
  return `${getInvoicesHrefForRole(role, invoiceId)}/success`;
}

export function getCreateInvoiceHrefForRole(role?: UserRole) {
  return (role && createInvoiceHrefFor[role]) ?? "/company/manager/invoices/new";
}

const refundsHrefFor: Record<UserRole, string> = {
  SUPER_ADMIN: "/admin/super-admin",
  ADMINISTRATOR: "/company/manager/refunds",
  COMPANY_OWNER: "/company/manager/refunds",
  BRANCH_MANAGER: "/company/branch-manager/refunds",
  CASHIER: "/company/manager/refunds",
};

export function getRefundsHrefForRole(role?: UserRole, refundId?: string) {
  const base = (role && refundsHrefFor[role]) ?? "/company/manager/refunds";
  return refundId ? `${base}/${refundId}` : base;
}

const verificationHrefFor: Record<UserRole, string> = {
  SUPER_ADMIN: "/admin/super-admin",
  ADMINISTRATOR: "/admin/administrator/verification",
  COMPANY_OWNER: "/company/manager/verification",
  BRANCH_MANAGER: "/company/branch-manager/verification",
  CASHIER: "/company/cashier/verification",
};

export function getVerificationHrefForRole(role?: UserRole) {
  return (role && verificationHrefFor[role]) ?? "/invoice-verification";
}

const feedbackHrefFor: Record<UserRole, string> = {
  SUPER_ADMIN: "/admin/super-admin",
  ADMINISTRATOR: "/admin/administrator/feedback",
  COMPANY_OWNER: "/company/manager/feedback",
  BRANCH_MANAGER: "/company/branch-manager/feedback",
  CASHIER: "/company/cashier/feedback",
};

export function getFeedbackHrefForRole(role?: UserRole) {
  return (role && feedbackHrefFor[role]) ?? "/feedback";
}

const notificationsHrefFor: Record<UserRole, string> = {
  SUPER_ADMIN: "/admin/super-admin",
  ADMINISTRATOR: "/admin/administrator/notifications",
  COMPANY_OWNER: "/company/manager/notifications",
  BRANCH_MANAGER: "/company/branch-manager/notifications",
  CASHIER: "/company/cashier/notifications",
};

export function getNotificationsHrefForRole(role?: UserRole) {
  return (role && notificationsHrefFor[role]) ?? "/company/manager/notifications";
}

// ─── Role navigation ───────────────────────────────────────────────────────────

const roleNavigation: Record<UserRole, NavigationGroup[]> = {
  SUPER_ADMIN: [{ label: "Access", items: [
    { href: "/admin/super-admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/super-admin/companies", label: "Companies", icon: Building2 },
    { href: "/admin/super-admin/accounts", label: "Account Management", icon: UserRoundCog },
    { href: "/admin/super-admin/archives", label: "Archives", icon: Archive },
    { href: "/admin/super-admin/operations", label: "Platform Operations", icon: Wrench },
    { href: "/admin/super-admin/database-backups", label: "Database Backups", icon: Database },
    { href: "/admin/super-admin/audit-logs", label: "Audit Logs", icon: ScrollText },
  ] }],
  ADMINISTRATOR: [
    {
      label: "Overview",
      items: [{ href: "/admin/administrator", label: "System Overview", icon: LayoutDashboard }],
    },
    {
      label: "Management",
      items: [
        { href: "/admin/administrator/invoices", label: "All Invoices", icon: Files },
        { href: "/admin/administrator/companies", label: "Companies", icon: Building2 },
        { href: "/admin/administrator/accounts", label: "Account Management", icon: UserRoundCog },
        { href: "/admin/administrator/archives", label: "Archives", icon: Archive },
        { href: "/admin/administrator/reports", label: "Reports", icon: BarChart3 },
      ],
    },
    {
      label: "System",
      items: [
        { href: "/admin/administrator/blockchain", label: "Blockchain Transactions", icon: Link2 },
        { href: "/admin/administrator/maintenance", label: "Operations Center", icon: Wrench },
        { href: "/admin/administrator/database-backups", label: "Database Backups", icon: Database },
        { href: "/admin/administrator/announcements", label: "Announcements", icon: Megaphone },
        { href: "/admin/administrator/feedback", label: "Feedback", icon: MessageSquareText },
        { href: "/admin/administrator/audit-logs", label: "Audit Logs", icon: ScrollText },
      ],
    },
  ],
  COMPANY_OWNER: [
    {
      label: "Invoice Operations",
      items: [
        { href: "/company/manager", label: "Dashboard", icon: LayoutDashboard },
        { href: "/company/manager/invoices/new", label: "Create Invoice", icon: FilePlus2 },
        { href: "/company/manager/invoices", label: "Invoices", icon: Files },
        { href: "/company/manager/refunds", label: "Refunds", icon: RotateCcw },
        { href: "/company/manager/verification", label: "Invoice Verification", icon: ShieldCheck },
      ],
    },
    {
      label: "Company",
      items: [
        { href: "/company/manager/branches", label: "Branches", icon: GitBranch },
        { href: "/company/manager/items", label: "Item Catalog", icon: PackageSearch },
        { href: "/company/manager/managers", label: "Account Management", icon: UserRoundCog },
        { href: "/company/manager/reports", label: "Reports", icon: BarChart3 },
      ],
    },
    {
      label: "Control",
      items: [
        { href: "/company/manager/invoice-templates", label: "Templates", icon: FileCheck2 },
        { href: "/company/manager/archives", label: "Archives", icon: Archive },
        { href: "/company/manager/invoice-settings", label: "Invoice Numbering", icon: KeyRound },
        { href: "/company/manager/company", label: "Company Settings", icon: Settings },
        { href: "/company/manager/audit-logs", label: "Audit Logs", icon: ScrollText },
      ],
    },
  ],
  BRANCH_MANAGER: [
    {
      label: "Branch Operations",
      items: [
        { href: "/company/branch-manager", label: "Dashboard", icon: LayoutDashboard },
        { href: "/company/branch-manager/invoices/new", label: "Create Invoice", icon: FilePlus2 },
        { href: "/company/branch-manager/invoices", label: "Branch Invoices", icon: Files },
        { href: "/company/branch-manager/refunds", label: "Refunds", icon: RotateCcw },
        { href: "/company/branch-manager/items", label: "Branch Items", icon: PackageSearch },
        { href: "/company/branch-manager/employees", label: "Cashiers", icon: Users },
        { href: "/company/branch-manager/archives", label: "Archives", icon: Archive },
        { href: "/company/branch-manager/reports", label: "Reports", icon: BarChart3 },
        { href: "/company/branch-manager/verification", label: "Invoice Verification", icon: ShieldCheck },
      ],
    },
  ],
  CASHIER: [
    {
      label: "Invoice Desk",
      items: [
        { href: "/company/cashier", label: "Dashboard", icon: LayoutDashboard },
        { href: "/company/cashier/invoices/new", label: "Create Invoice", icon: FilePlus2 },
        { href: "/company/cashier/invoices", label: "My Invoices", icon: FileCheck2 },
        { href: "/company/cashier/items", label: "Branch Inventory", icon: PackageSearch },
        { href: "/company/cashier/archives", label: "Archives", icon: Archive },
        { href: "/company/cashier/verification", label: "Invoice Verification", icon: ShieldCheck },
      ],
    },
  ],
};

export function getNavigationForRole(role: UserRole, refundsEnabled = true) {
  const groups = roleNavigation[role] ?? [];
  if (refundsEnabled) return groups;
  return groups.map((group) => ({ ...group, items: group.items.filter((item) => !item.href.split("/").includes("refunds")) }));
}

// ─── Route access control ──────────────────────────────────────────────────────

const accessPrefixes: Record<UserRole, string[]> = {
  SUPER_ADMIN: ["/admin/super-admin"],
  ADMINISTRATOR: ["/admin/administrator"],
  COMPANY_OWNER: ["/company/manager", "/invoices", "/items", "/branches", "/employees", "/invoice-verification"],
  BRANCH_MANAGER: ["/company/branch-manager", "/company/manager/profile", "/invoices", "/items", "/branches", "/employees", "/invoice-verification"],
  CASHIER: ["/company/cashier", "/invoices", "/items", "/branches", "/employees", "/invoice-verification"],
};

export function canAccessPath(role: UserRole, pathname: string) {
  if (role === "SUPER_ADMIN") return ["/admin/super-admin", "/admin/super-admin/companies", "/admin/super-admin/accounts", "/admin/super-admin/archives", "/admin/super-admin/operations", "/admin/super-admin/database-backups", "/admin/super-admin/profile", "/admin/super-admin/audit-logs", "/admin/super-admin/policies", "/admin/super-admin/terms", "/admin/super-admin/wallet"].includes(pathname);
  if (pathname === "/notifications" || pathname === "/feedback") return true;
  return (accessPrefixes[role] ?? []).some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );
}

export const roleLabels: Record<UserRole, string> = {
  SUPER_ADMIN: "Super Admin",
  ADMINISTRATOR: "Administrator",
  COMPANY_OWNER: "Company Owner",
  BRANCH_MANAGER: "Branch Manager",
  CASHIER: "Cashier",
};
