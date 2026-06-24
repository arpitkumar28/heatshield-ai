'use client'

import Sidebar from '@/components/dashboard/Sidebar'
import TopNav from '@/components/dashboard/TopNav'
import ExecutiveMetrics from '@/components/dashboard/ExecutiveMetrics'
import AIInsights from '@/components/dashboard/AIInsights'
import AnalyticsCharts from '@/components/dashboard/AnalyticsCharts'
import dynamic from 'next/dynamic'

// Dynamically import HeatMap to avoid SSR issues with Leaflet
const HeatMap = dynamic(
  () => import('@/components/HeatMap'),
  { ssr: false }
)

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <TopNav />
      
      <main className="ml-64 pt-16 p-6">
        <div>
          {/* Page header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">Command Center</h1>
            <p className="text-gray-400">Real-time urban heat intelligence and monitoring</p>
          </div>

          {/* Executive Metrics */}
          <ExecutiveMetrics />

          {/* Main content grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Heat Map - takes 2 columns */}
            <div className="xl:col-span-2">
              <div className="glass-card rounded-xl p-6 border border-white/10 h-full">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Live Heat Map</h3>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                    <span className="text-sm text-gray-400">Live</span>
                  </div>
                </div>
                <HeatMap />
              </div>
            </div>

            {/* AI Insights Panel */}
            <div>
              <AIInsights />
            </div>
          </div>

          {/* Analytics Section */}
          <div className="mt-6">
            <AnalyticsCharts />
          </div>
        </div>
      </main>
    </div>
  )
}
