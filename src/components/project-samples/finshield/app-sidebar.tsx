// Source: PROJECTS/FINSHIELD_MANAGEMENT_FRONTEND/components/layout/app-sidebar.tsx
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "@/components/project-samples/SampleLink";
import {useRef} from "react";
import {getNavigationForRole,roleLabels} from "./navigation";
import {user} from "./fixtures";
import {cn} from "@/lib/utils";
function isCurrentRoute(pathname: string, href: string, _allHrefs: string[]) {
  if (pathname === href) return true;

  // Root role dashboards must match exactly so they do not catch sub-features like /invoices
  const isDashboardRoot =
    href === "/admin/super-admin" ||
    href === "/admin/administrator" ||
    href === "/company/manager" ||
    href === "/company/branch-manager" ||
    href === "/company/cashier";

  if (isDashboardRoot) return false;

  const isLeaf = href === "/invoice-verification" || href.endsWith("/verification");
  const matchesRoute = !isDashboardRoot && !isLeaf && pathname.startsWith(`${href}/`);
  if (!matchesRoute) return false;

  return !_allHrefs.some((candidate) => {
    if (candidate === href || candidate.length <= href.length) return false;
    const candidateIsDashboardRoot =
      candidate === "/admin/super-admin" ||
      candidate === "/admin/administrator" ||
      candidate === "/company/manager" ||
      candidate === "/company/branch-manager" ||
      candidate === "/company/cashier";
    const candidateIsLeaf = candidate === "/invoice-verification" || candidate.endsWith("/verification");
    return pathname === candidate || (!candidateIsDashboardRoot && !candidateIsLeaf && pathname.startsWith(`${candidate}/`));
  });
}


export function AppSidebar({collapsed,setCollapsed}:{collapsed:boolean;setCollapsed:(value:boolean)=>void}) {
 const title="FinShield";
 const pathname="/company/manager";
 const groups=getNavigationForRole(user.role,true);
 const allHrefs=groups.flatMap(group=>group.items.map(item=>item.href));
 const desktopNavRef=useRef<HTMLElement>(null);
 const asideRef=useRef<HTMLElement>(null);
 const handleSidebarClick=()=>desktopNavRef.current?.focus();
 const handleClose=()=>{};
  const renderNavigationGroups = (compact = false, closeOnNavigate = false) => (
    <>
      {groups.map((group, groupIndex) => {
        return (
          <div
            key={group.label}
            className={cn(
              "space-y-1",
              groupIndex > 0 && !compact && "mt-4 border-t border-[var(--line)] pt-4",
            )}
          >
            <p
              className={cn(
                "px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--muted)]",
                compact && "hidden",
              )}
            >
              {group.label}
            </p>

            <div className="space-y-1">
              {group.items.map((link) => {
                const isActive = isCurrentRoute(pathname, link.href, allHrefs);
                const Icon = link.icon;

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={(e) => {
                      if ((e as React.MouseEvent).button === 1) {
                        e.preventDefault();
                        return;
                      }
                      if (closeOnNavigate) handleClose();
                    }}
                    onMouseDown={(e) => {
                      if (e.button === 1) {
                        e.preventDefault();
                      }
                    }}
                    onAuxClick={(e) => {
                      if (e.button === 1) {
                        e.preventDefault();
                      }
                    }}
                    className={cn(
                      "flex items-center gap-4 pl-[22px] pr-4 py-3.5 rounded-xl text-sm font-medium transition-colors duration-200 group whitespace-nowrap overflow-hidden relative justify-start",
                      isActive
                        ? "bg-[var(--primary-soft)] text-[var(--teal)] font-bold shadow-xs"
                        : "text-[var(--ink)] hover:bg-[var(--surface-muted)]",
                    )}
                    title={compact ? link.label : undefined}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <div className="flex items-center justify-center shrink-0 w-5">
                      <Icon
                        className={cn(
                          "h-5 w-5 transition-colors duration-200 shrink-0",
                          isActive ? "text-[var(--teal)]" : "text-[var(--muted)] group-hover:text-[var(--ink)]",
                        )}
                        strokeWidth={2.2}
                      />
                    </div>
                    <span
                      className={cn(
                        "font-semibold transition-opacity duration-200 ease-in-out",
                        compact ? "opacity-0" : "opacity-100",
                      )}
                    >
                      {link.label}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        );
      })}
    </>
  );

return <>
      <aside
        ref={asideRef}
        onClick={handleSidebarClick}
        className={cn(
          "hidden md:flex flex-col fixed top-0 left-0 bottom-0 z-30 bg-white border-r border-[var(--line)] transition-[width] duration-300 ease-in-out h-screen max-h-screen overflow-hidden outline-none",
          collapsed ? "w-24" : "w-72"
        )}
      >
        {/* Header / Brand Logo */}
        <div className="h-20 flex shrink-0 items-center justify-between pl-[26px] pr-4 border-b border-[var(--line)] relative overflow-hidden">
          <div className={cn(
            "flex items-center gap-3 transition-opacity duration-200 ease-in-out",
            collapsed ? "opacity-0 pointer-events-none" : "opacity-100"
          )}>
            <Image unoptimized
              src="/project-samples/assets/finshield/FinShield.svg"
              alt="FinShield Logo"
              width={36}
              height={36}
              priority
              className="w-9 h-9 object-contain shrink-0"
              style={{ width: "36px", height: "36px", objectFit: "contain" }}
            />
            <span className="font-bold text-xl tracking-tight text-[var(--ink)] truncate">{title}</span>
          </div>

          <div className={cn(
            "flex items-center gap-1 shrink-0 absolute transition-all duration-300 ease-in-out",
            collapsed ? "right-8" : "right-4"
          )}>
            <button
              type="button"
              onClick={() => setCollapsed(!collapsed)}
              className="p-1.5 rounded-full hover:bg-[var(--surface-muted)] transition-colors text-[var(--ink)] cursor-pointer"
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Navigation Link Groups */}
        <nav
          ref={desktopNavRef}
          tabIndex={0}
          className="flex-1 min-h-0 px-4 py-6 space-y-3 overflow-y-auto overflow-x-hidden overscroll-contain sidebar-scrollable touch-pan-y focus:outline-none"
          aria-label={`${roleLabels[user.role]} navigation`}
        >
          {renderNavigationGroups(collapsed)}
        </nav>
      </aside>

</>;
}
