// Source: PROJECTS/CARBONSENSE/FRONTEND/src/components/dashboard-nav.tsx
import * as React from "react";
import Link from "@/components/project-samples/SampleLink";
import { Home, Plus, BarChart3, Trophy, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
type NavItem = {
  name: string
  href: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
}

const NAV_ITEMS: NavItem[] = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Log Activity", href: "/log", icon: Plus },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Achievements", href: "/achievements", icon: Trophy },
  { name: "Reports", href: "/reports", icon: FileText },
]

function useIsActive(pathname: string, href: string) {
  if (pathname === href) return true
  if (href !== "/" && pathname.startsWith(href + "/")) return true
  return false
}

function NavLink({
  item,
  pathname,
  className,
  onNavigate,
}: {
  item: NavItem
  pathname: string
  className?: string
  onNavigate?: () => void
}) {
  const Icon = item.icon
  const active = useIsActive(pathname, item.href)
  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      aria-current={active ? "page" : undefined}
      className={cn(
        "group relative flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-all duration-300 whitespace-nowrap",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/40",
        active
          ? "bg-linear-to-r from-emerald-500 via-emerald-600 to-teal-600 text-white shadow-lg hover:shadow-xl hover:scale-105"
          : "text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-linear-to-r hover:from-emerald-50 hover:to-teal-50 dark:hover:from-emerald-900/20 dark:hover:to-teal-900/20 hover:scale-105 hover:shadow-md",
        className,
      )}
    >
      {active && (
        <div className="absolute inset-0 bg-linear-to-r from-white/10 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      )}
      <Icon className={cn(
        "h-3.5 w-3.5 relative z-10 transition-transform duration-300",
        active ? "group-hover:scale-110" : "group-hover:scale-110"
      )} aria-hidden="true" />
      <span className="relative z-10">{item.name}</span>
    </Link>
  )
}


export function DashboardNav() {
 const pathname = "/dashboard";
 return <header className="sticky top-0 z-100 isolate border-b border-emerald-200/30 bg-white/90 backdrop-blur-xl shadow-lg">
 <div className="flex h-16 items-center px-6 max-w-[1600px] mx-auto w-full">
        {/* Brand */}
        <Link
          href="/dashboard"
          className="group flex items-center gap-3 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/40 rounded-xl p-2 transition-all duration-300"
          aria-label="Go to Dashboard"
        >
          <img 
            src="/project-samples/assets/carbonsense/CarbonLogo1.webp"
            alt="CarbonSense Logo" 
            className="h-14 w-14 rounded-lg group-hover:scale-110 transition-transform duration-300"
          />
          <span className="text-xl font-bold bg-linear-to-r from-emerald-600 via-emerald-700 to-teal-600 bg-clip-text text-transparent group-hover:from-emerald-500 group-hover:to-teal-500 transition-all duration-300">CarbonSense</span>
        </Link>

        {/* Desktop nav */}
        <nav className="ml-6 hidden lg:flex items-center gap-0.5">
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.name} item={item} pathname={pathname} />
          ))}
        </nav>

<span aria-label="Sample user Karlos Rivo" className="ml-auto flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-emerald-500 via-emerald-600 to-teal-600 text-sm font-semibold text-white ring-2 ring-emerald-200">KR</span>
 </div></header>;
}
