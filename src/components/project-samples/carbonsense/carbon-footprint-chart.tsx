// Source: PROJECTS/CARBONSENSE/FRONTEND/src/components/carbon-footprint-chart.tsx
// Presentation copied from the original; services are replaced with local fixtures.
"use client"

import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, ReferenceLine } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/project-samples/carbonsense/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/project-samples/carbonsense/ui/chart"
import { useDashboard } from "@/components/project-samples/carbonsense/fixtures"
import { Loader2, TrendingUp } from "lucide-react"

export function CarbonFootprintChart() {
  const { chartData, isLoading } = useDashboard()
  
  // Enhance: quick stats for header and average reference line
  const totalPerMonth = chartData.map(m => (m.transport || 0) + (m.energy || 0) + (m.food || 0) + (m.shopping || 0))
  const avgTotal = totalPerMonth.length ? totalPerMonth.reduce((a, b) => a + b, 0) / totalPerMonth.length : 0
  const last = totalPerMonth[totalPerMonth.length - 1] || 0
  const prev = totalPerMonth.length > 1 ? totalPerMonth[totalPerMonth.length - 2] : 0
  const delta = last - prev

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Carbon Footprint Trends</CardTitle>
          <CardDescription>Your monthly emissions by category (tons CO2e)</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px] flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    )
  }

  if (chartData.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Carbon Footprint Trends</CardTitle>
          <CardDescription>Your monthly emissions by category (tons CO2e)</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px] flex items-center justify-center">
          <div className="text-center">
            <p className="text-muted-foreground">No data available yet</p>
            <p className="text-sm text-muted-foreground mt-1">Start logging activities to see your trends</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="group relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-linear-to-br from-slate-50/90 to-gray-50/90 dark:from-slate-900/90 dark:to-gray-900/90 backdrop-blur-xl hover:scale-[1.02]">
      <div className="absolute inset-0 bg-linear-to-br from-emerald-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <CardHeader className="border-b bg-linear-to-r from-emerald-50/70 to-teal-50/70 dark:from-emerald-950/40 dark:to-teal-950/40 pb-4 relative z-10">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 group-hover:bg-emerald-200 dark:group-hover:bg-emerald-900/50 transition-colors duration-300">
            <TrendingUp className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <CardTitle className="text-lg font-semibold">Carbon Footprint Trends</CardTitle>
            <CardDescription className="text-sm text-gray-600 dark:text-gray-400">Your monthly emissions by category (tons CO2e)</CardDescription>
          </div>
          <div className="ml-auto hidden sm:flex items-center gap-2">
            <span className={`text-xs font-semibold px-2 py-1 rounded-md ${delta > 0 ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300' : delta < 0 ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300' : 'bg-gray-100 text-gray-600 dark:bg-gray-800/40 dark:text-gray-300'}`}>
              {delta === 0 ? 'No change' : `${delta > 0 ? '+' : ''}${delta.toFixed(1)}t vs last month`}
            </span>
            <span className="text-xs text-gray-600 dark:text-gray-400">Avg: {avgTotal.toFixed(1)}t</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-3 mt-2 p-2 rounded-lg bg-background/50">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-chart-1 shadow-sm" />
            <span className="text-[10px] font-medium">Transport</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-chart-2 shadow-sm" />
            <span className="text-[10px] font-medium">Energy</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-chart-3 shadow-sm" />
            <span className="text-[10px] font-medium">Food</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-chart-4 shadow-sm" />
            <span className="text-[10px] font-medium">Shopping</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-4 pb-4">
        <ChartContainer
          config={{
            transport: {
              label: "Transport",
              color: "hsl(var(--chart-1))",
            },
            energy: {
              label: "Energy",
              color: "hsl(var(--chart-2))",
            },
            food: {
              label: "Food",
              color: "hsl(var(--chart-3))",
            },
            shopping: {
              label: "Shopping",
              color: "hsl(var(--chart-4))",
            },
          }}
          className="h-[320px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorTransport" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-transport)" stopOpacity={0.9} />
                  <stop offset="95%" stopColor="var(--color-transport)" stopOpacity={0.2} />
                </linearGradient>
                <linearGradient id="colorEnergy" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-energy)" stopOpacity={0.9} />
                  <stop offset="95%" stopColor="var(--color-energy)" stopOpacity={0.2} />
                </linearGradient>
                <linearGradient id="colorFood" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-food)" stopOpacity={0.9} />
                  <stop offset="95%" stopColor="var(--color-food)" stopOpacity={0.2} />
                </linearGradient>
                <linearGradient id="colorShopping" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-shopping)" stopOpacity={0.9} />
                  <stop offset="95%" stopColor="var(--color-shopping)" stopOpacity={0.2} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted/40" />
              <XAxis dataKey="month" className="text-xs" />
              <YAxis className="text-xs" />
              <ChartTooltip content={<ChartTooltipContent />} />
              {/* Average reference line for quick context */}
              <ReferenceLine y={avgTotal} stroke="rgba(107,114,128,0.5)" strokeDasharray="4 4" />
              <Area
                type="monotone"
                dataKey="transport"
                stackId="1"
                stroke="var(--color-transport)"
                strokeWidth={2}
                fill="url(#colorTransport)"
                activeDot={{ r: 4 }}
              />
              <Area
                type="monotone"
                dataKey="energy"
                stackId="1"
                stroke="var(--color-energy)"
                strokeWidth={2}
                fill="url(#colorEnergy)"
                activeDot={{ r: 4 }}
              />
              <Area 
                type="monotone" 
                dataKey="food" 
                stackId="1" 
                stroke="var(--color-food)" 
                strokeWidth={2}
                fill="url(#colorFood)"
                activeDot={{ r: 4 }} 
              />
              <Area
                type="monotone"
                dataKey="shopping"
                stackId="1"
                stroke="var(--color-shopping)"
                strokeWidth={2}
                fill="url(#colorShopping)"
                activeDot={{ r: 4 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
