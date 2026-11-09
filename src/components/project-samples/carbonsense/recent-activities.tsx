// Source: PROJECTS/CARBONSENSE/FRONTEND/src/components/recent-activities.tsx
// Presentation copied from the original; services are replaced with local fixtures.
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/project-samples/carbonsense/ui/card"
import { Badge } from "@/components/project-samples/carbonsense/ui/badge"
import { Car, Utensils, Zap, ShoppingBag, RefreshCw, Activity } from "lucide-react"
import { useRecentActivities } from "@/components/project-samples/carbonsense/fixtures"
import { formatTimeElapsed, formatCO2Emissions } from "@/components/project-samples/carbonsense/fixtures"
import { Button } from "@/components/project-samples/carbonsense/ui/button"

const getActivityIcon = (activityType: string) => {
  switch (activityType.toLowerCase()) {
    case 'transport':
      return Car
    case 'food':
      return Utensils
    case 'energy':
      return Zap
    case 'shopping':
      return ShoppingBag
    default:
      return Car
  }
}

const getActivityColor = (activityType: string) => {
  switch (activityType.toLowerCase()) {
    case 'transport':
      return {
        bg: "bg-linear-to-br from-emerald-500 to-teal-600",
        text: "text-emerald-600 dark:text-emerald-400"
      }
    case 'food':
      return {
        bg: "bg-linear-to-br from-green-500 to-emerald-600",
        text: "text-green-600 dark:text-green-400"
      }
    case 'energy':
      return {
        bg: "bg-linear-to-br from-blue-500 to-indigo-600",
        text: "text-blue-600 dark:text-blue-400"
      }
    case 'shopping':
      return {
        bg: "bg-linear-to-br from-orange-500 to-red-600",
        text: "text-orange-600 dark:text-orange-400"
      }
    default:
      return {
        bg: "bg-linear-to-br from-emerald-500 to-teal-600",
        text: "text-emerald-600 dark:text-emerald-400"
      }
  }
}

export function RecentActivities() {
  const { activities, isLoading, error, refetch } = useRecentActivities()

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Activities</CardTitle>
          <CardDescription>Your latest logged activities and their carbon impact</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center space-x-4 animate-pulse">
                <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                <div className="flex-1 space-y-1">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
                <div className="w-16 h-6 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Recent Activities</CardTitle>
              <CardDescription>Your latest logged activities and their carbon impact</CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={refetch}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Retry
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-red-500">Failed to load activities. Please try again.</p>
        </CardContent>
      </Card>
    )
  }

  if (activities.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Activities</CardTitle>
          <CardDescription>Your latest logged activities and their carbon impact</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-muted-foreground">No activities logged yet</p>
            <p className="text-sm text-muted-foreground mt-1">Start logging your activities to see them here</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="group relative border-0 shadow-xl hover:shadow-2xl transition-all duration-500 bg-linear-to-br from-white/95 to-slate-50/95 dark:from-slate-900/95 dark:to-slate-800/95 backdrop-blur-xl hover:scale-[1.02]">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-linear-to-br from-blue-500/5 via-indigo-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
      <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-blue-400/10 to-indigo-400/10 rounded-full blur-2xl -mr-12 -mt-12 group-hover:scale-110 transition-transform duration-500" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-linear-to-br from-cyan-400/10 to-blue-400/10 rounded-full blur-xl -ml-8 -mb-8 group-hover:scale-125 transition-transform duration-500" />
      
      <CardHeader className="border-b bg-linear-to-r from-blue-50/80 via-indigo-50/80 to-cyan-50/80 dark:from-blue-950/50 dark:via-indigo-950/50 dark:to-cyan-950/50 pb-3 pt-3 relative z-10 rounded-t-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-linear-to-br from-blue-100 to-indigo-100 dark:from-blue-900/40 dark:to-indigo-900/40 group-hover:from-blue-200 group-hover:to-indigo-200 dark:group-hover:from-blue-900/60 dark:group-hover:to-indigo-900/60 transition-all duration-300 shadow-lg group-hover:shadow-xl">
              <Activity className="h-4 w-4 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-300" />
            </div>
            <div>
              <CardTitle className="text-base font-bold bg-linear-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">Recent Activities</CardTitle>
              <CardDescription className="text-xs text-gray-600 dark:text-gray-400">Latest logged activities</CardDescription>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={refetch} className="h-7 w-7 p-0 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors duration-300">
            <RefreshCw className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-3">
        <div className="space-y-2">
          {activities.map((activity) => {
            const Icon = getActivityIcon(activity.ActivityType)
            const color = getActivityColor(activity.ActivityType)
            return (
              <div key={activity._id} className="group/activity relative flex items-center gap-2.5 p-2.5 rounded-lg border-0 bg-linear-to-r from-white/80 to-slate-50/80 dark:from-slate-800/80 dark:to-slate-700/80 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                {/* Animated background overlay */}
                <div className="absolute inset-0 bg-linear-to-r from-blue-500/5 to-indigo-500/5 opacity-0 group-hover/activity:opacity-100 transition-opacity duration-300 rounded-lg" />
                
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-12 h-12 bg-white/10 rounded-full blur-lg -mr-4 -mt-4 group-hover/activity:scale-150 transition-transform duration-500" />
                
                <div className={`p-2 rounded-lg ${color.bg} shadow-lg group-hover/activity:scale-110 group-hover/activity:shadow-xl transition-all duration-300 relative z-10`}>
                  <Icon className="h-3.5 w-3.5 text-white drop-shadow-sm" />
                </div>
                <div className="flex-1 min-w-0 space-y-0.5 relative z-10">
                  <p className="text-xs font-semibold leading-none truncate text-gray-800 dark:text-gray-200 group-hover/activity:text-gray-900 dark:group-hover/activity:text-white transition-colors duration-300">
                    {activity.notes || activity.description}
                  </p>
                  <p className="text-[10px] text-gray-600 dark:text-gray-400">{formatTimeElapsed(activity.dateLogged)}</p>
                </div>
                <Badge variant="secondary" className="shrink-0 text-[10px] h-5 px-2 bg-linear-to-r from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 text-emerald-700 dark:text-emerald-300 border-0 shadow-sm group-hover/activity:shadow-md transition-shadow duration-300">
                  {formatCO2Emissions(activity.co2_emissions)}
                </Badge>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
