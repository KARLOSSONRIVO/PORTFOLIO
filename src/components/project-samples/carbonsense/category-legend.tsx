// Source: PROJECTS/CARBONSENSE/FRONTEND/src/components/category-legend.tsx
// Presentation copied from the original; services are replaced with local fixtures.
"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/project-samples/carbonsense/ui/card"
import { Car, Zap, Utensils, ShoppingBag } from "lucide-react"

const categories = [
  {
    name: "Transport",
    color: "bg-linear-to-br from-emerald-500 to-teal-600",
    icon: Car,
    description: "Vehicles, public transit, flights",
    textColor: "text-emerald-600 dark:text-emerald-400"
  },
  {
    name: "Energy",
    color: "bg-linear-to-br from-blue-500 to-indigo-600",
    icon: Zap,
    description: "Electricity, heating, cooling",
    textColor: "text-blue-600 dark:text-blue-400"
  },
  {
    name: "Food",
    color: "bg-linear-to-br from-green-500 to-emerald-600",
    icon: Utensils,
    description: "Meals, groceries, dining out",
    textColor: "text-green-600 dark:text-green-400"
  },
  {
    name: "Shopping",
    color: "bg-linear-to-br from-orange-500 to-red-600",
    icon: ShoppingBag,
    description: "Retail purchases, deliveries",
    textColor: "text-orange-600 dark:text-orange-400"
  }
]

export function CategoryLegend() {
  return (
    <Card className="group relative border-0 shadow-xl hover:shadow-2xl transition-all duration-500 bg-linear-to-br from-white/95 to-slate-50/95 dark:from-slate-900/95 dark:to-slate-800/95 backdrop-blur-xl hover:scale-[1.02]">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-linear-to-br from-emerald-500/5 via-teal-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
      <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-emerald-400/10 to-teal-400/10 rounded-full blur-2xl -mr-12 -mt-12 group-hover:scale-110 transition-transform duration-500" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-linear-to-br from-teal-400/10 to-cyan-400/10 rounded-full blur-xl -ml-8 -mb-8 group-hover:scale-125 transition-transform duration-500" />
      
      <CardHeader className="border-b bg-linear-to-r from-emerald-50/80 via-teal-50/80 to-cyan-50/80 dark:from-emerald-950/50 dark:via-teal-950/50 dark:to-cyan-950/50 pb-3 pt-3 relative z-10 rounded-t-xl">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-linear-to-br from-emerald-100 to-teal-100 dark:from-emerald-900/40 dark:to-teal-900/40 group-hover:from-emerald-200 group-hover:to-teal-200 dark:group-hover:from-emerald-900/60 dark:group-hover:to-teal-900/60 transition-all duration-300 shadow-lg group-hover:shadow-xl">
            <Car className="h-4 w-4 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform duration-300" />
          </div>
          <div>
            <CardTitle className="text-base font-bold bg-linear-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent">Activity Categories</CardTitle>
            <CardDescription className="text-xs text-gray-600 dark:text-gray-400">Emission categories overview</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-3">
        <div className="space-y-2">
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <div 
                key={category.name} 
                className="group/category relative flex items-center gap-2.5 p-2.5 rounded-lg border-0 bg-linear-to-r from-white/80 to-slate-50/80 dark:from-slate-800/80 dark:to-slate-700/80 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
              >
                {/* Animated background overlay */}
                <div className="absolute inset-0 bg-linear-to-r from-emerald-500/5 to-teal-500/5 opacity-0 group-hover/category:opacity-100 transition-opacity duration-300 rounded-lg" />
                
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-12 h-12 bg-white/10 rounded-full blur-lg -mr-4 -mt-4 group-hover/category:scale-150 transition-transform duration-500" />
                
                <div className={`p-2 rounded-lg ${category.color} shadow-lg group-hover/category:scale-110 group-hover/category:shadow-xl transition-all duration-300 relative z-10`}>
                  <Icon className="h-3.5 w-3.5 text-white drop-shadow-sm" />
                </div>
                <div className="flex-1 min-w-0 relative z-10">
                  <p className="text-xs font-semibold text-gray-800 dark:text-gray-200 group-hover/category:text-gray-900 dark:group-hover/category:text-white transition-colors duration-300">
                    {category.name}
                  </p>
                  <p className="text-[10px] text-gray-600 dark:text-gray-400 mt-0.5 leading-tight">
                    {category.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

