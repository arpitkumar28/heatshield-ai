'use client'

import { Thermometer, Activity, MapPin, Users, AlertTriangle, Building2 } from 'lucide-react'
import { StatCard } from '@/components/ui/Card'

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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
      {metrics.map((metric) => (
        <div key={metric.title}>
          <StatCard {...metric} />
        </div>
      ))}
    </div>
  )
}
