// Source: PROJECTS/CARBONSENSE/FRONTEND/src/components/stats-cards.tsx
// Presentation copied from the original; services are replaced with local fixtures.
"use client"

import { Card, CardContent, CardHeader } from "@/components/project-samples/carbonsense/ui/card"
import { TrendingDown, TrendingUp, Target, Calendar } from "lucide-react"
import { motion, type Variants } from "framer-motion"
import { useDashboard } from "@/components/project-samples/carbonsense/fixtures"

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
}

export function StatsCards() {
  const { stats, isLoading } = useDashboard()

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20 animate-pulse" />
              <div className="h-4 w-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-24 mb-2 animate-pulse" />
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-32 animate-pulse" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  const isPositive = stats.deltaPct <= 0
  const TrendIcon = isPositive ? TrendingDown : TrendingUp

  return (
    <motion.div
      className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={cardVariants}>
        <Card className="group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-linear-to-br from-blue-500 via-blue-600 to-cyan-600 text-white hover:scale-105">
          <div className="absolute inset-0 bg-linear-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20 group-hover:scale-110 transition-transform duration-500" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-cyan-400/20 rounded-full blur-2xl -ml-12 -mb-12 group-hover:scale-125 transition-transform duration-500" />
          <CardContent className="p-6 relative z-10">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-white/90">This Month</p>
                <div className="text-3xl font-bold tracking-tight">{stats.thisMonth} t</div>
                <p className="text-xs text-white/80">CO₂ emissions</p>
              </div>
              <div className="p-3 rounded-xl bg-white/20 backdrop-blur-sm group-hover:bg-white/30 transition-colors duration-300">
                <Calendar className="h-5 w-5 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={cardVariants}>
        <Card className={`group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 ${isPositive ? 'bg-linear-to-br from-emerald-500 via-emerald-600 to-teal-600' : 'bg-linear-to-br from-red-500 via-red-600 to-rose-600'} text-white hover:scale-105`}>
          <div className="absolute inset-0 bg-linear-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20 group-hover:scale-110 transition-transform duration-500" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full blur-2xl -ml-12 -mb-12 group-hover:scale-125 transition-transform duration-500" />
          <CardContent className="p-6 relative z-10">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-white/90">vs Last Month</p>
                <div className="text-3xl font-bold tracking-tight">
                  {stats.deltaPct > 0 ? '+' : ''}{stats.deltaPct}%
                </div>
                <p className="text-xs text-white/80">
                  {stats.reductionTons} t {isPositive ? 'less' : 'more'}
                </p>
              </div>
              <div className="p-3 rounded-xl bg-white/20 backdrop-blur-sm group-hover:bg-white/30 transition-colors duration-300">
                <TrendIcon className="h-5 w-5 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={cardVariants}>
        <Card className="group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-linear-to-br from-purple-500 via-purple-600 to-violet-600 text-white hover:scale-105">
          <div className="absolute inset-0 bg-linear-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20 group-hover:scale-110 transition-transform duration-500" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-violet-400/20 rounded-full blur-2xl -ml-12 -mb-12 group-hover:scale-125 transition-transform duration-500" />
          <CardContent className="p-6 relative z-10">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-white/90">Annual Goal</p>
                <div className="text-3xl font-bold tracking-tight">{stats.annualGoalProgress}%</div>
                <p className="text-xs text-white/80">On track</p>
              </div>
              <div className="p-3 rounded-xl bg-white/20 backdrop-blur-sm group-hover:bg-white/30 transition-colors duration-300">
                <Target className="h-5 w-5 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={cardVariants}>
        <Card className="group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-linear-to-br from-amber-500 via-amber-600 to-orange-600 text-white hover:scale-105">
          <div className="absolute inset-0 bg-linear-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20 group-hover:scale-110 transition-transform duration-500" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-orange-400/20 rounded-full blur-2xl -ml-12 -mb-12 group-hover:scale-125 transition-transform duration-500" />
          <CardContent className="p-6 relative z-10">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-white/90">Streak</p>
                <div className="text-3xl font-bold tracking-tight">{stats.streak} days</div>
                <p className="text-xs text-white/80">Keep it up!</p>
              </div>
              <div className="p-3 rounded-xl bg-white/20 backdrop-blur-sm group-hover:bg-white/30 transition-colors duration-300">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
