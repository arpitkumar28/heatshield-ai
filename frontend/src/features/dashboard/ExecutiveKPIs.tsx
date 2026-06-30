'use client'

import { motion } from 'framer-motion'
import { Thermometer, AlertTriangle, Users, Building2, TrendingUp, Activity, Zap, Shield, ArrowUp } from 'lucide-react'
import { PremiumCard } from '@/ui'

const kpiData = [
  {
    icon: Thermometer,
    title: 'Average Temperature',
    value: '41.2°C',
    change: '+2.5°C',
    trend: 'up',
    status: 'critical',
    description: 'National average across monitored cities',
  },
  {
    icon: AlertTriangle,
    title: 'Active Alerts',
    value: '147',
    change: '+23',
    trend: 'up',
    status: 'critical',
    description: 'Critical heat alerts requiring attention',
  },
  {
    icon: Users,
    title: 'Affected Population',
    value: '8.9M',
    change: '+450K',
    trend: 'up',
    status: 'high',
    description: 'Citizens in high-risk zones',
  },
  {
    icon: Building2,
    title: 'Cities at Risk',
    value: '34',
    change: '+5',
    trend: 'up',
    status: 'high',
    description: 'Cities exceeding safe temperature thresholds',
  },
  {
    icon: Activity,
    title: 'AI Predictions',
    value: '15.2M',
    change: '+1.2M',
    trend: 'up',
    status: 'medium',
    description: 'Heat predictions generated in last 24h',
  },
  {
    icon: Shield,
    title: 'Response Rate',
    value: '94.2%',
    change: '+2.1%',
    trend: 'up',
    status: 'low',
    description: 'Alert response time effectiveness',
  },
  {
    icon: Zap,
    title: 'System Load',
    value: '67%',
    change: '-3%',
    trend: 'down',
    status: 'low',
    description: 'Current processing infrastructure load',
  },
  {
    icon: TrendingUp,
    title: 'Cooling Centers',
    value: '156',
    change: '+12',
    trend: 'up',
    status: 'medium',
    description: 'Active cooling centers nationwide',
  },
]

export default function PremiumExecutiveKPIs() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical': return 'text-heat-red'
      case 'high': return 'text-heat-orange'
      case 'medium': return 'text-heat-yellow'
      case 'low': return 'text-heat-green'
      default: return 'text-primary'
    }
  }

  const getStatusBg = (status: string) => {
    switch (status) {
      case 'critical': return 'bg-heat-red/10 border-heat-red/30'
      case 'high': return 'bg-heat-orange/10 border-heat-orange/30'
      case 'medium': return 'bg-heat-yellow/10 border-heat-yellow/30'
      case 'low': return 'bg-heat-green/10 border-heat-green/30'
      default: return 'bg-primary/10 border-primary/30'
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {kpiData.map((kpi, index) => (
        <motion.div
          key={kpi.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <PremiumCard variant="glass" padding="lg" className="hover:shadow-card-hover transition-all duration-300">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 rounded-xl ${getStatusBg(kpi.status)} border`}>
                <kpi.icon className={`w-5 h-5 ${getStatusColor(kpi.status)}`} />
              </div>
              <div className={`flex items-center gap-1 text-xs font-semibold ${kpi.trend === 'up' ? 'text-danger' : 'text-success'}`}>
                {kpi.trend === 'up' ? <TrendingUp className="w-3 h-3" /> : <ArrowUp className="w-3 h-3 rotate-180" />}
                <span>{kpi.change}</span>
              </div>
            </div>

            {/* Value */}
            <div className="mb-2">
              <div className="font-display text-3xl font-bold text-white">{kpi.value}</div>
            </div>

            {/* Title */}
            <h3 className="text-sm font-medium text-text-muted mb-1">{kpi.title}</h3>
            
            {/* Description */}
            <p className="text-xs text-text-secondary">{kpi.description}</p>
          </PremiumCard>
        </motion.div>
      ))}
    </div>
  )
}
