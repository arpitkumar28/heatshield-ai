'use client'

import { Activity, Thermometer, Droplets, Wind, AlertTriangle, ShieldCheck, Zap } from 'lucide-react'

interface HeatDataPoint {
  id: number
  lat: number
  lng: number
  lst: number
  ndvi: number
  heatIndex: number
  isHotspot: boolean
  timestamp: string
}

interface InsightsPanelProps {
  selectedLocation: HeatDataPoint | null
  selectedLayer: 'lst' | 'ndvi' | 'heatIndex'
}

export default function InsightsPanel({ selectedLocation, selectedLayer }: InsightsPanelProps) {
  if (!selectedLocation) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 text-center">
        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
          <Activity className="w-8 h-8 text-text-muted" />
        </div>
        <h3 className="text-white font-medium mb-2">No Location Selected</h3>
        <p className="text-sm text-text-muted">
          Click on a marker on the map to view detailed AI insights and environmental metrics.
        </p>
      </div>
    )
  }

  const riskLevel = selectedLocation.lst > 42 ? 'Severe' : selectedLocation.lst > 38 ? 'High' : 'Moderate'
  const riskColor = riskLevel === 'Severe' ? 'text-error' : riskLevel === 'High' ? 'text-warning' : 'text-primary'

  const layerLabels = {
    lst: 'Land Surface Temperature',
    ndvi: 'Vegetation Index',
    heatIndex: 'Heat Index'
  }

  return (
    <div className="p-4 space-y-6">
      {/* Location Header */}
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">Coordinates</span>
          <span className={`text-xs font-bold px-2 py-0.5 rounded-full bg-white/10 ${riskColor}`}>
            {riskLevel} Risk
          </span>
        </div>
        <p className="text-lg font-display font-bold text-white">
          {selectedLocation.lat.toFixed(4)}°N, {selectedLocation.lng.toFixed(4)}°E
        </p>
        <p className="text-xs text-text-muted">
          Active Layer: {layerLabels[selectedLayer]}
        </p>
      </div>

      {/* Primary Metrics */}
      <div className="grid grid-cols-2 gap-3">
        <MetricCard
          icon={<Thermometer className="w-4 h-4 text-error" />}
          label="LST"
          value={`${selectedLocation.lst.toFixed(1)}°C`}
          trend="+1.2°C"
          trendUp={true}
        />
        <MetricCard
          icon={<Zap className="w-4 h-4 text-warning" />}
          label="Heat Index"
          value={`${selectedLocation.heatIndex.toFixed(1)}°C`}
          trend="-0.5°C"
          trendUp={false}
        />
        <MetricCard
          icon={<Droplets className="w-4 h-4 text-primary" />}
          label="NDVI"
          value={selectedLocation.ndvi.toFixed(2)}
          trend="+0.05"
          trendUp={true}
        />
        <MetricCard
          icon={<Wind className="w-4 h-4 text-secondary" />}
          label="Emissivity"
          value="0.96"
        />
      </div>

      {/* AI Insights */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-white flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-success" />
          AI Analysis
        </h3>
        <div className="glass-card rounded-lg p-3 border border-white/10 space-y-3">
          <div className="flex gap-3">
            <div className="w-1 h-auto rounded-full bg-primary" />
            <p className="text-xs text-text-muted leading-relaxed">
              <span className="text-white font-medium">Urban Heat Island Effect:</span> This location shows high thermal retention due to low albedo surfaces. AI predicts a 2.4°C increase over the next 4 hours.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1 h-auto rounded-full bg-success" />
            <p className="text-xs text-text-muted leading-relaxed">
              <span className="text-white font-medium">Vulnerability Index:</span> 0.68. High population density increases exposure risk for elderly residents.
            </p>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-white flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-warning" />
          Mitigation Actions
        </h3>
        <div className="space-y-2">
          <RecommendationItem
            title="Cool Roof Deployment"
            description="Highly effective for this building density."
            impact="High"
          />
          <RecommendationItem
            title="Strategic Tree Planting"
            description="Focus on the north-west perimeter."
            impact="Medium"
          />
        </div>
      </div>
    </div>
  )
}

interface MetricCardProps {
  icon: React.ReactNode
  label: string
  value: string
  trend?: string
  trendUp?: boolean
}

function MetricCard({ icon, label, value, trend, trendUp }: MetricCardProps) {
  return (
    <div className="glass-card rounded-xl p-3 border border-white/5 hover:border-white/20 transition-all">
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <span className="text-xs text-text-muted">{label}</span>
      </div>
      <div className="flex items-end justify-between">
        <span className="text-base font-bold text-white">{value}</span>
        {trend && (
          <span className={`text-[10px] font-medium ${trendUp ? 'text-error' : 'text-success'}`}>
            {trend}
          </span>
        )}
      </div>
    </div>
  )
}

interface RecommendationItemProps {
  title: string
  description: string
  impact: string
}

function RecommendationItem({ title, description, impact }: RecommendationItemProps) {
  return (
    <div className="p-2.5 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 transition-colors cursor-pointer">
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs font-semibold text-white">{title}</span>
        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-primary/20 text-primary uppercase">
          {impact}
        </span>
      </div>
      <p className="text-[10px] text-text-muted leading-tight">{description}</p>
    </div>
  )
}
