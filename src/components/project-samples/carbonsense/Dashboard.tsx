// Source: PROJECTS/CARBONSENSE/FRONTEND/src/app/dashboard/page.tsx
"use client"

import Link from "@/components/project-samples/SampleLink"
import { DashboardNav } from "@/components/project-samples/carbonsense/dashboard-nav"
import { StatsCards } from "@/components/project-samples/carbonsense/stats-cards"
import { CarbonFootprintChart } from "@/components/project-samples/carbonsense/carbon-footprint-chart"
import { RecentActivities } from "@/components/project-samples/carbonsense/recent-activities"
import { QuickActions } from "@/components/project-samples/carbonsense/quick-actions"
import { CategoryLegend } from "@/components/project-samples/carbonsense/category-legend"
import { Sparkles, Sun, Moon, Sunrise, Sunset, BarChart3, TrendingDown, TrendingUp, Target } from "lucide-react"
import { motion, type Variants } from "framer-motion"
import { useAnalytics } from "@/components/project-samples/carbonsense/fixtures"
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, BarChart, Bar, PieChart, Pie, Cell, Legend } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/project-samples/carbonsense/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/project-samples/carbonsense/ui/chart"
import { useAuth } from "@/components/project-samples/carbonsense/fixtures"
import { useMemo } from "react"

const pageVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.2,
    },
  },
}

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
}

export default function DashboardPage() {
  const { user } = useAuth()
  const userName = user?.firstName || 'there'
  const {
    monthlyData,
    monthsReducedCount,
    strongestCorrelation,
    weekdayData,
    // Category totals are supplied by the fixture adapter.
    categoryData,
  } = useAnalytics()

  // Get time-based greeting
  const { greeting, icon: GreetingIcon } = useMemo(() => {
    const hour = new Date("2026-11-09T09:00:00").getHours()
    if (hour < 6) return { greeting: "Good night", icon: Moon }
    if (hour < 12) return { greeting: "Good morning", icon: Sunrise }
    if (hour < 17) return { greeting: "Good afternoon", icon: Sun }
    if (hour < 21) return { greeting: "Good evening", icon: Sunset }
    return { greeting: "Good night", icon: Moon }
  }, [])

  // Get current date info
  const dateInfo = useMemo(() => {
    const now = new Date("2026-11-09T09:00:00")
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }
    return now.toLocaleDateString('en-US', options)
  }, [])

  return (
   
      <div className="min-h-screen bg-linear-to-br from-slate-50 via-emerald-50/30 to-blue-50/20 dark:from-slate-950 dark:via-emerald-950/30 dark:to-blue-950/20">
        <DashboardNav />

      <motion.div
        className="flex-1 space-y-3 p-3 md:p-4 pt-3 max-w-[1600px] mx-auto"
        variants={pageVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Enhanced Header */}
        <motion.div 
          className="relative overflow-hidden rounded-xl bg-linear-to-br from-emerald-500 to-teal-600 dark:from-emerald-600 dark:to-teal-700 p-5 shadow-xl"
          variants={sectionVariants}
        >
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-teal-400/20 rounded-full blur-2xl -ml-12 -mb-12" />
          
          <div className="relative z-10">
            <div className="flex items-start justify-between">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2 text-emerald-100">
                  <GreetingIcon className="h-3.5 w-3.5" />
                  <span className="text-[10px] font-medium">{dateInfo}</span>
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                  {greeting}, {userName}
                </h1>
                <p className="text-emerald-100 text-xs flex items-center gap-1.5 mt-0.5">
                  <Sparkles className="h-3 w-3" />
                  <span>Your environmental impact overview</span>
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div variants={sectionVariants}>
          <StatsCards />
        </motion.div>

        {/* Three Cards Side by Side */}
        <motion.div className="grid gap-3 lg:grid-cols-3" variants={sectionVariants}>
          <QuickActions horizontal={false} />
          <RecentActivities />
          <CategoryLegend />
        </motion.div>

        {/* Enhanced Key Insights Card */}
        <motion.div variants={sectionVariants}>
          <Card className="group relative border-0 shadow-xl hover:shadow-2xl transition-all duration-500 bg-linear-to-br from-white/95 to-slate-50/95 dark:from-slate-900/95 dark:to-slate-800/95 backdrop-blur-xl hover:scale-[1.02]">
            {/* Animated background elements */}
            <div className="absolute inset-0 bg-linear-to-br from-slate-500/5 via-gray-500/5 to-zinc-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
            <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-slate-400/10 to-gray-400/10 rounded-full blur-2xl -mr-12 -mt-12 group-hover:scale-110 transition-transform duration-500" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-linear-to-br from-zinc-400/10 to-slate-400/10 rounded-full blur-xl -ml-8 -mb-8 group-hover:scale-125 transition-transform duration-500" />
            
            <CardHeader className="border-b bg-linear-to-r from-slate-50/80 via-gray-50/80 to-zinc-50/80 dark:from-slate-950/50 dark:via-gray-950/50 dark:to-zinc-950/50 pb-3 pt-3 relative z-10 rounded-t-xl">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-linear-to-br from-slate-100 to-gray-100 dark:from-slate-900/40 dark:to-gray-900/40 group-hover:from-slate-200 group-hover:to-gray-200 dark:group-hover:from-slate-900/60 dark:group-hover:to-gray-900/60 transition-all duration-300 shadow-lg group-hover:shadow-xl">
                  <BarChart3 className="h-4 w-4 text-slate-600 dark:text-slate-400 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div>
                  <CardTitle className="text-base font-bold bg-linear-to-r from-slate-600 to-gray-600 dark:from-slate-400 dark:to-gray-400 bg-clip-text text-transparent">Key Insights</CardTitle>
                  <CardDescription className="text-xs text-gray-600 dark:text-gray-400">Performance metrics and trends</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4 relative z-10">
              <div className="grid gap-4 md:grid-cols-3">
                {/* Months with reduction */}
                <div className="space-y-2 relative p-3 rounded-lg bg-linear-to-br from-emerald-50/50 to-teal-50/50 dark:from-emerald-950/20 dark:to-teal-950/20 border border-emerald-200/30 dark:border-emerald-800/30">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-md bg-emerald-100 dark:bg-emerald-900/30">
                      <TrendingDown className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div className="text-xs font-semibold text-emerald-700 dark:text-emerald-300">Months with reduction</div>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">{monthsReducedCount ?? 0}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">months</div>
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    {(() => {
                      let streak = 0
                      for (let i = monthlyData.length - 1; i > 0; i--) {
                        if (monthlyData[i].total < monthlyData[i-1].total) streak++
                        else break
                      }
                      return `Current streak: ${streak} month${streak === 1 ? '' : 's'}`
                    })()}
                  </div>
                  {/* Right divider */}
                  <div className="absolute right-0 top-2 bottom-2 w-px bg-linear-to-b from-transparent via-emerald-200 dark:via-emerald-700 to-transparent hidden md:block"></div>
                </div>

                {/* Strongest correlation */}
                <div className="space-y-2 relative p-3 rounded-lg bg-linear-to-br from-blue-50/50 to-indigo-50/50 dark:from-blue-950/20 dark:to-indigo-950/20 border border-blue-200/30 dark:border-blue-800/30">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-md bg-blue-100 dark:bg-blue-900/30">
                      <BarChart3 className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="text-xs font-semibold text-blue-700 dark:text-blue-300">Strongest correlation</div>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <div className="text-lg font-bold text-gray-900 dark:text-white">
                      {strongestCorrelation ? strongestCorrelation.category : '—'}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      r = {strongestCorrelation ? strongestCorrelation.r.toFixed(2) : '0.00'}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="w-full h-1.5 rounded-full bg-blue-200/60 dark:bg-blue-900/40 overflow-hidden">
                      <div
                        className="h-1.5 rounded-full bg-linear-to-r from-blue-500 to-indigo-500 transition-all duration-500"
                        style={{ width: `${Math.min(Math.abs(strongestCorrelation?.r || 0) * 100, 100)}%` }}
                      />
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      {strongestCorrelation && strongestCorrelation.r > 0.5 ? 'Strong positive' : 
                       strongestCorrelation && strongestCorrelation.r < -0.5 ? 'Strong negative' : 
                       strongestCorrelation && Math.abs(strongestCorrelation.r) > 0.3 ? 'Moderate' : 'Weak'} correlation
                    </div>
                  </div>
                  {/* Right divider */}
                  <div className="absolute right-0 top-2 bottom-2 w-px bg-linear-to-b from-transparent via-blue-200 dark:via-blue-700 to-transparent hidden md:block"></div>
                </div>

                {/* Category trends */}
                <div className="space-y-2 p-3 rounded-lg bg-linear-to-br from-purple-50/50 to-pink-50/50 dark:from-purple-950/20 dark:to-pink-950/20 border border-purple-200/30 dark:border-purple-800/30">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-md bg-purple-100 dark:bg-purple-900/30">
                      <TrendingUp className="h-3.5 w-3.5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div className="text-xs font-semibold text-purple-700 dark:text-purple-300">Category trends</div>
                  </div>
                  <div className="grid grid-cols-2 gap-1.5">
                    {[
                      { key: 'transport', label: 'Transport', color: 'var(--chart-1)', bgColor: 'bg-emerald-100 dark:bg-emerald-900/30' },
                      { key: 'energy', label: 'Energy', color: 'var(--chart-2)', bgColor: 'bg-blue-100 dark:bg-blue-900/30' },
                      { key: 'food', label: 'Food', color: 'var(--chart-3)', bgColor: 'bg-green-100 dark:bg-green-900/30' },
                      { key: 'shopping', label: 'Shopping', color: 'var(--chart-4)', bgColor: 'bg-orange-100 dark:bg-orange-900/30' },
                    ].map(cfg => {
                      const categoryData = monthlyData.length > 0 ? monthlyData[monthlyData.length - 1] : null
                      const value = categoryData ? categoryData[cfg.key as "transport" | "energy" | "food" | "shopping"] || 0 : 0
                      const prevValue = monthlyData.length > 1 ? monthlyData[monthlyData.length - 2][cfg.key as "transport" | "energy" | "food" | "shopping"] || 0 : 0
                      const trend = value > prevValue ? 'up' : value < prevValue ? 'down' : 'stable'
                      
                      return (
                        <div key={cfg.key} className="space-y-1 p-2 rounded-md bg-white/60 dark:bg-gray-800/60 border border-gray-200/50 dark:border-gray-700/50">
                          <div className="flex items-center gap-1">
                            <div className={`w-2 h-2 rounded-full ${cfg.bgColor}`} style={{ backgroundColor: cfg.color }}></div>
                            <div className="text-[10px] font-medium text-gray-600 dark:text-gray-400">{cfg.label}</div>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="text-xs font-bold text-gray-800 dark:text-gray-200">{value.toFixed(1)}t</div>
                            <div className={`text-[10px] ${trend === 'up' ? 'text-red-500' : trend === 'down' ? 'text-green-500' : 'text-gray-500'}`}>
                              {trend === 'up' ? '↗' : trend === 'down' ? '↘' : '→'}
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Charts Overview: Line | Bar | Donut */}
        <motion.div className="space-y-4" variants={sectionVariants}>
          <div className="grid gap-4 lg:grid-cols-3">
          {/* Line: Monthly total emissions trend */}
          <Card className="group relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-linear-to-br from-emerald-50/80 to-teal-50/80 dark:from-emerald-950/30 dark:to-teal-950/30 backdrop-blur-xl hover:scale-105">
            <div className="absolute inset-0 bg-linear-to-br from-emerald-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 group-hover:bg-emerald-200 dark:group-hover:bg-emerald-900/50 transition-colors duration-300">
                  <TrendingUp className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <CardTitle className="text-base font-semibold">Emission Trend</CardTitle>
                  <CardDescription className="text-xs">Monthly total CO₂e over time</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ChartContainer config={{ total: { label: "Total Emissions", color: "hsl(var(--chart-1))" } }} className="h-[220px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.25} />
                    <XAxis dataKey="month" tickMargin={6} />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line type="monotone" dataKey="total" stroke={`var(--chart-1)`} strokeWidth={3} dot={{ r: 3 }} activeDot={{ r: 5 }} />
                    <Legend />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Bar: Weekday seasonality */}
          <Card className="group relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-linear-to-br from-blue-50/80 to-indigo-50/80 dark:from-blue-950/30 dark:to-indigo-950/30 backdrop-blur-xl hover:scale-105">
            <div className="absolute inset-0 bg-linear-to-br from-blue-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 group-hover:bg-blue-200 dark:group-hover:bg-blue-900/50 transition-colors duration-300">
                  <BarChart3 className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <CardTitle className="text-base font-semibold">Weekday Seasonality</CardTitle>
                  <CardDescription className="text-xs">Average emissions by weekday</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ChartContainer config={{ total: { label: "Avg per day", color: "hsl(var(--chart-2))" } }} className="h-[220px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weekdayData} barCategoryGap={24}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.25} />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="total" fill={`var(--chart-2)`} radius={[6,6,0,0]} />
                    <Legend />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Donut: Category distribution */}
          <Card className="group relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-linear-to-br from-purple-50/80 to-pink-50/80 dark:from-purple-950/30 dark:to-pink-950/30 backdrop-blur-xl hover:scale-105">
            <div className="absolute inset-0 bg-linear-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/30 group-hover:bg-purple-200 dark:group-hover:bg-purple-900/50 transition-colors duration-300">
                  <Target className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <CardTitle className="text-base font-semibold">Category Distribution</CardTitle>
                  <CardDescription className="text-xs">Total emissions by category</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  transport: { label: "Transport", color: "hsl(var(--chart-1))" },
                  energy: { label: "Energy", color: "hsl(var(--chart-2))" },
                  food: { label: "Food", color: "hsl(var(--chart-3))" },
                  shopping: { label: "Shopping", color: "hsl(var(--chart-4))" },
                }}
                className="h-[220px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%" cy="50%"
                      innerRadius={50} outerRadius={80}
                      paddingAngle={2}
                      dataKey="value"
                      labelLine={false}
                      label={(entry: {percent?: number;name?:string}) => {
                        // Only show labels for categories with more than 5% to avoid overlapping
                        const percentage = (entry.percent ?? 0) * 100;
                        return percentage > 5 ? `${entry.name} ${percentage.toFixed(0)}%` : '';
                      }}
                    >
                      {categoryData.map((entry, i) => (
                        <Cell key={i} fill={entry.color} />
                      ))}
                    </Pie>
                    <ChartTooltip 
                      content={<ChartTooltipContent />}
                      formatter={(value, name) => [
                        `${Number(value).toFixed(2)} tons CO₂e`,
                        name
                      ]}
                    />
                    <Legend 
                      verticalAlign="bottom" 
                      height={36}
                      iconType="circle"
                      wrapperStyle={{ fontSize: '12px' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
          </div>
        </motion.div>

        {/* Main Content - Chart */}
        <motion.div variants={sectionVariants}>
          <CarbonFootprintChart />
        </motion.div>
      </motion.div>

      {/* Floating AI Recommendations Button */}
      <Link
        href="/recommendations"
        className="fixed bottom-6 right-6 z-50 group"
        aria-label="AI Recommendations"
      >
        <div className="flex items-center gap-3 bg-linear-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-6 py-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 backdrop-blur-sm border border-white/20">
          <img 
            src="/project-samples/assets/carbonsense/CarbonLogo.png" 
            alt="AI Recommendations" 
            className="h-8 w-8 rounded-lg group-hover:scale-110 transition-transform duration-300"
          />
          <span className="font-semibold text-sm whitespace-nowrap">AI Recommendations</span>
        </div>
      </Link>
      </div>
   
  )
}
