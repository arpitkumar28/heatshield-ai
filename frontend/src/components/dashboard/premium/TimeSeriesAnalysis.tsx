'use client'

import { useState } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts'
import { Clock, TrendingUp, AlertTriangle, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react'
import { EnterpriseCard } from '@/components/ui/premium'

interface TimeSeriesData {
  timestamp: string
  temperature: number
  heatIndex: number
  humidity: number
  windSpeed: number
  ndvi: number
}

export default function TimeSeriesAnalysis() {
  const [selectedMetric, setSelectedMetric] = useState<'temperature' | 'heatIndex' | 'humidity' | 'windSpeed' | 'ndvi'>('temperature')
  const [timeRange, setTimeRange] = useState('24h')
  const [showThreshold, setShowThreshold] = useState(true)

  const generateTimeSeriesData = (): TimeSeriesData[] => {
    const data: TimeSeriesData[] = []
    const now = new Date()
    
    for (let i = 23; i >= 0; i--) {
      const time = new Date(now.getTime() - i * 60 * 60 * 1000)
      data.push({
        timestamp: time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        temperature: 35 + Math.random() * 10 + Math.sin(i / 4) * 5,
        heatIndex: 38 + Math.random() * 12 + Math.sin(i / 4) * 6,
        humidity: 30 + Math.random() * 20 + Math.cos(i / 3) * 10,
        windSpeed: 10 + Math.random() * 15,
        ndvi: 0.3 + Math.random() * 0.4
      })
    }
    
    return data
  }

  const timeSeriesData = generateTimeSeriesData()

  const metricConfig = {
    temperature: { label: 'Temperature (°C)', color: '#FF6B35', threshold: 40, unit: '°C' },
    heatIndex: { label: 'Heat Index (°C)', color: '#CC0000', threshold: 45, unit: '°C' },
    humidity: { label: 'Humidity (%)', color: '#0066CC', threshold: 80, unit: '%' },
    windSpeed: { label: 'Wind Speed (km/h)', color: '#00CC66', threshold: 30, unit: 'km/h' },
    ndvi: { label: 'NDVI', color: '#00FF00', threshold: 0.2, unit: '' }
  }

  const currentMetric = metricConfig[selectedMetric]

  return (
    <EnterpriseCard>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold text-white">Time Series Analysis</h3>
            <p className="text-sm text-text-muted mt-1">Real-time temporal data analysis</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-text-muted hover:text-white transition-colors">
              <ZoomIn className="w-4 h-4" />
            </button>
            <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-text-muted hover:text-white transition-colors">
              <ZoomOut className="w-4 h-4" />
            </button>
            <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-text-muted hover:text-white transition-colors">
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-text-muted" />
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-primary"
            >
              <option value="1h">Last Hour</option>
              <option value="6h">Last 6 Hours</option>
              <option value="24h">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-text-muted" />
            <select
              value={selectedMetric}
              onChange={(e) => setSelectedMetric(e.target.value as 'temperature' | 'heatIndex' | 'humidity' | 'windSpeed' | 'ndvi')}
              className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-primary"
            >
              <option value="temperature">Temperature</option>
              <option value="heatIndex">Heat Index</option>
              <option value="humidity">Humidity</option>
              <option value="windSpeed">Wind Speed</option>
              <option value="ndvi">NDVI</option>
            </select>
          </div>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showThreshold}
              onChange={(e) => setShowThreshold(e.target.checked)}
              className="w-4 h-4 rounded bg-white/10 border-white/20 text-primary focus:ring-primary"
            />
            <span className="text-sm text-text-muted">Show Threshold</span>
          </label>
        </div>

        {/* Chart */}
        <div className="bg-gradient-to-br from-white/5 to-white/[0.02] rounded-xl p-6 border border-white/10">
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={timeSeriesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis 
                dataKey="timestamp" 
                stroke="rgba(255,255,255,0.5)"
                interval="preserveStartEnd"
              />
              <YAxis stroke="rgba(255,255,255,0.5)" />
              <Tooltip
                contentStyle={{ backgroundColor: '#0A0E27', border: '1px solid rgba(0,102,204,0.3)', borderRadius: '8px', color: '#fff' }}
                labelFormatter={(label) => `Time: ${label}`}
              />
              <Legend />
              {showThreshold && (
                <ReferenceLine 
                  y={currentMetric.threshold} 
                  stroke="#FF0000" 
                  strokeDasharray="3 3"
                  label={{ value: `Threshold: ${currentMetric.threshold}${currentMetric.unit}`, fill: '#FF0000', fontSize: 12 }}
                />
              )}
              <Area 
                type="monotone" 
                dataKey={selectedMetric} 
                stroke={currentMetric.color} 
                fill={currentMetric.color} 
                fillOpacity={0.4}
                name={currentMetric.label}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard
            title="Current Value"
            value={`${timeSeriesData[timeSeriesData.length - 1][selectedMetric].toFixed(1)}${currentMetric.unit}`}
            icon={<Clock className="w-5 h-5" />}
          />
          <StatCard
            title="Peak Value"
            value={`${Math.max(...timeSeriesData.map(d => d[selectedMetric])).toFixed(1)}${currentMetric.unit}`}
            icon={<TrendingUp className="w-5 h-5" />}
          />
          <StatCard
            title="Average"
            value={`${(timeSeriesData.reduce((sum, d) => sum + d[selectedMetric], 0) / timeSeriesData.length).toFixed(1)}${currentMetric.unit}`}
            icon={<TrendingUp className="w-5 h-5" />}
          />
          <StatCard
            title="Threshold Exceeded"
            value={`${timeSeriesData.filter(d => d[selectedMetric] > currentMetric.threshold).length} times`}
            icon={<AlertTriangle className="w-5 h-5 text-red-500" />}
          />
        </div>

        {/* Alert Timeline */}
        <div className="bg-gradient-to-br from-white/5 to-white/[0.02] rounded-xl p-4 border border-white/10">
          <h4 className="text-sm font-semibold text-white mb-3">Alert Timeline</h4>
          <div className="space-y-2">
            {timeSeriesData.filter(d => d[selectedMetric] > currentMetric.threshold).slice(0, 5).map((d, i) => (
              <div key={i} className="flex items-center gap-3 text-sm">
                <AlertTriangle className="w-4 h-4 text-red-500" />
                <span className="text-text-muted">{d.timestamp}</span>
                <span className="text-white font-medium">{d[selectedMetric].toFixed(1)}{currentMetric.unit}</span>
                <span className="text-red-400">Exceeded threshold</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </EnterpriseCard>
  )
}

interface StatCardProps {
  title: string
  value: string
  icon: React.ReactNode
}

function StatCard({ title, value, icon }: StatCardProps) {
  return (
    <div className="bg-gradient-to-br from-white/5 to-white/[0.02] rounded-xl p-4 border border-white/10">
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <p className="text-sm text-text-muted truncate">{title}</p>
      </div>
      <p className="text-xl font-bold text-white">{value}</p>
    </div>
  )
}
