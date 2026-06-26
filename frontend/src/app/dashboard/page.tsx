'use client'

import { EnterpriseCard } from '@/components/ui/premium'
import ExecutiveMetrics from '@/components/dashboard/premium/ExecutiveMetrics'
import AIInsights from '@/components/dashboard/premium/AIInsights'
import AnalyticsCharts from '@/components/dashboard/premium/AnalyticsCharts'
import HeatMap from '@/components/dashboard/premium/HeatMap'
import { Activity, MapPin, Satellite, Shield, AlertTriangle, TrendingUp } from 'lucide-react'

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Enterprise Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-secondary">
              <Satellite className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-display font-bold text-white tracking-wide">
                National Command Center
              </h1>
              <p className="text-sm text-text-muted font-display">
                Real-time Urban Heat Intelligence & Monitoring System
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-success/10 border border-success/30">
            <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
            <span className="text-sm font-medium text-success">System Operational</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10">
            <Activity className="w-4 h-4 text-primary" />
            <span className="text-sm text-text-muted">Last Updated: 2 min ago</span>
          </div>
        </div>
      </div>

      {/* Executive Metrics */}
      <ExecutiveMetrics />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Heat Map - takes 2 columns */}
        <div className="xl:col-span-2">
          <EnterpriseCard
            title="Live Satellite Heat Map"
            subtitle="Real-time LST data from ISRO/NRSC satellites"
            icon={<MapPin className="w-5 h-5" />}
            badge="Live"
            badgeColor="success"
          >
            <HeatMap />
          </EnterpriseCard>
        </div>

        {/* AI Insights Panel */}
        <div>
          <AIInsights />
        </div>
      </div>

      {/* Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnalyticsCharts />
      </div>
    </div>
  )
}
