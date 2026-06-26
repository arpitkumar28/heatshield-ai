'use client'

import { Thermometer, Activity, MapPin, Users, AlertTriangle, Building2, TrendingUp, LucideIcon } from 'lucide-react'

interface MetricCardProps {
  title: string
  value: string
  change: string
  icon: any
  color: 'danger' | 'warning' | 'success' | 'primary'
}

function MetricCard({ title, value, change, icon: Icon, color }: MetricCardProps) {
  const colorStyles = {
    danger: 'bg-danger/20 text-danger border-danger/30',
    warning: 'bg-warning/20 text-warning border-warning/30',
    success: 'bg-success/20 text-success border-success/30',
    primary: 'bg-primary/20 text-primary border-primary/30',
  }

  const changeColor = change.startsWith('+') ? 'text-danger' : 'text-success'

  return (
    <div className="glass-card rounded-xl p-5 border border-white/10 hover:border-white/20 transition-all">
      <div className="flex items-start justify-between mb-3">
        <div className={`p-3 rounded-lg ${colorStyles[color]} border`}>
          <Icon className="w-5 h-5" />
        </div>
        <div className={`text-sm font-medium ${changeColor} flex items-center gap-1`}>
          <TrendingUp className="w-4 h-4" />
          {change}
        </div>
      </div>
      <div className="text-2xl font-bold text-white font-display mb-1">{value}</div>
      <div className="text-sm text-text-muted font-display">{title}</div>
    </div>
  )
}

export default function ExecutiveMetrics() {
  const metrics = [
    {
      title: 'Current Temperature',
      value: '42.5°C',
      change: '+2.3°C',
      icon: Thermometer,
      color: 'danger' as const,
    },
    {
      title: 'Heat Index',
      value: '48.2°C',
      change: '+1.8°C',
      icon: Activity,
      color: 'warning' as const,
    },
    {
      title: 'Active Hotspots',
      value: '23',
      change: '+5',
      icon: MapPin,
      color: 'danger' as const,
    },
    {
      title: 'Vulnerable Population',
      value: '2.4M',
      change: '+120K',
      icon: Users,
      color: 'warning' as const,
    },
    {
      title: 'Cooling Centers',
      value: '156',
      change: '+12',
      icon: Building2,
      color: 'success' as const,
    },
    {
      title: 'Active Alerts',
      value: '8',
      change: '+2',
      icon: AlertTriangle,
      color: 'danger' as const,
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {metrics.map((metric, index) => (
        <MetricCard key={index} {...metric} />
      ))}
    </div>
  )
}
