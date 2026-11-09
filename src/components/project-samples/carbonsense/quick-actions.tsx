// Source: PROJECTS/CARBONSENSE/FRONTEND/src/components/quick-actions.tsx
// Presentation copied from the original; services are replaced with local fixtures.
import Link from "@/components/project-samples/SampleLink"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/project-samples/carbonsense/ui/card"
import { Car, Utensils, Zap, ShoppingBag } from "lucide-react"

const quickActions = [
  {
    title: "Log Transport",
    description: "Record your travel activities",
    href: "/log/transport",
    icon: Car,
    color: "text-chart-1",
    gradient: "from-emerald-500 to-teal-600",
    bgGradient: "from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30",
    hoverGradient: "from-emerald-500/10 to-teal-500/10",
  },
  {
    title: "Log Food",
    description: "Track your meals and diet",
    href: "/log/food",
    icon: Utensils,
    color: "text-chart-3",
    gradient: "from-green-500 to-emerald-600",
    bgGradient: "from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30",
    hoverGradient: "from-green-500/10 to-emerald-500/10",
  },
  {
    title: "Log Energy",
    description: "Record energy consumption",
    href: "/log/energy",
    icon: Zap,
    color: "text-chart-2",
    gradient: "from-blue-500 to-indigo-600",
    bgGradient: "from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30",
    hoverGradient: "from-blue-500/10 to-indigo-500/10",
  },
  {
    title: "Log Shopping",
    description: "Track purchases and consumption",
    href: "/log/shopping",
    icon: ShoppingBag,
    color: "text-chart-4",
    gradient: "from-orange-500 to-red-600",
    bgGradient: "from-orange-50 to-red-50 dark:from-orange-950/30 dark:to-red-950/30",
    hoverGradient: "from-orange-500/10 to-red-500/10",
  },
]

interface QuickActionsProps {
  horizontal?: boolean
}

export function QuickActions({ horizontal = false }: QuickActionsProps) {
  return (
    <Card className="group relative border-0 shadow-xl hover:shadow-2xl transition-all duration-500 bg-linear-to-br from-white/95 to-slate-50/95 dark:from-slate-900/95 dark:to-slate-800/95 backdrop-blur-xl hover:scale-[1.02]">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-linear-to-br from-purple-500/5 via-pink-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
      <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-2xl -mr-12 -mt-12 group-hover:scale-110 transition-transform duration-500" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-linear-to-br from-indigo-400/10 to-blue-400/10 rounded-full blur-xl -ml-8 -mb-8 group-hover:scale-125 transition-transform duration-500" />
      
      <CardHeader className="border-b bg-linear-to-r from-purple-50/80 via-pink-50/80 to-indigo-50/80 dark:from-purple-950/50 dark:via-pink-950/50 dark:to-indigo-950/50 pb-2 pt-2 relative z-10 rounded-t-xl">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-linear-to-br from-purple-100 to-pink-100 dark:from-purple-900/40 dark:to-pink-900/40 group-hover:from-purple-200 group-hover:to-pink-200 dark:group-hover:from-purple-900/60 dark:group-hover:to-pink-900/60 transition-all duration-300 shadow-lg group-hover:shadow-xl">
            <Zap className="h-3.5 w-3.5 text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform duration-300" />
          </div>
          <div>
            <CardTitle className="text-sm font-bold bg-linear-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">Quick Actions</CardTitle>
            <CardDescription className="text-[10px] text-gray-600 dark:text-gray-400">Log your daily activities</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-2">
        <div className={horizontal ? "grid grid-cols-4 gap-3" : "grid grid-cols-2 gap-3"}>
          {quickActions.map((action) => {
            const Icon = action.icon
            return (
              <Link key={action.title} href={action.href}>
                <button className={`group/btn relative w-full ${horizontal ? 'h-14' : 'h-20'} rounded-xl border-0 bg-linear-to-br ${action.bgGradient} hover:shadow-lg transition-all duration-300 hover:scale-[1.05]`}>
                  {/* Animated background overlay */}
                  <div className={`absolute inset-0 bg-linear-to-br ${action.hoverGradient} opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 rounded-xl`} />
                  
                  {/* Decorative elements */}
                  <div className="absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-full blur-xl -mr-6 -mt-6 group-hover/btn:scale-150 transition-transform duration-500" />
                  
                  {/* Colored accent bar */}
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-linear-to-r ${action.gradient} opacity-80 rounded-t-xl`} />
                  
                  <div className={`flex ${horizontal ? 'flex-row items-center justify-start' : 'flex-col items-center justify-center'} h-full ${horizontal ? 'space-x-2 p-2' : 'space-y-1.5 pt-4 pb-2 px-2'} relative z-10`}>
                    <div className={`p-2.5 rounded-lg bg-linear-to-br ${action.gradient} shadow-lg group-hover/btn:scale-110 group-hover/btn:shadow-xl transition-all duration-300`}>
                      <Icon className="h-3.5 w-3.5 text-white drop-shadow-sm" />
                    </div>
                    <div className={horizontal ? "text-left" : "text-center"}>
                      <div className="font-semibold text-xs text-gray-800 dark:text-gray-200 group-hover/btn:text-gray-900 dark:group-hover/btn:text-white transition-colors duration-300">
                        {action.title.replace('Log ', '')}
                      </div>
                      {!horizontal && (
                        <div className="text-[10px] text-gray-600 dark:text-gray-400 mt-0.5 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300">
                          {action.description}
                        </div>
                      )}
                    </div>
                  </div>
                </button>
              </Link>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
