'use client'

import { useState } from 'react'
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ScatterChart, Scatter, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts'
import { TrendingUp, BarChart3, PieChart, Activity, Download, Filter, Calendar, Maximize2, RefreshCw } from 'lucide-react'
import { EnterpriseCard } from '@/components/ui/premium'

interface DataVisualizationProps {
  title?: string
  compact?: boolean
}

export default function DataVisualization({ title = 'Data Visualization', compact = false }: DataVisualizationProps) {
  const [selectedChart, setSelectedChart] = useState<'line' | 'area' | 'bar' | 'scatter' | 'radar'>('line')
  const [timeRange, setTimeRange] = useState('6m')
  const [isFullscreen, setIsFullscreen] = useState(false)

  const heatTrendData = [
    { month: 'Jan', lst: 25, heatIndex: 28, ndvi: 0.6, humidity: 45, windSpeed: 12 },
    { month: 'Feb', lst: 28, heatIndex: 32, ndvi: 0.55, humidity: 42, windSpeed: 14 },
    { month: 'Mar', lst: 32, heatIndex: 36, ndvi: 0.5, humidity: 38, windSpeed: 16 },
    { month: 'Apr', lst: 36, heatIndex: 40, ndvi: 0.45, humidity: 35, windSpeed: 18 },
    { month: 'May', lst: 40, heatIndex: 44, ndvi: 0.4, humidity: 32, windSpeed: 20 },
    { month: 'Jun', lst: 42, heatIndex: 46, ndvi: 0.35, humidity: 30, windSpeed: 22 },
  ]

  const radarData = [
    { subject: 'Temperature', A: 85, B: 90, fullMark: 100 },
    { subject: 'Humidity', A: 65, B: 70, fullMark: 100 },
    { subject: 'Wind Speed', A: 45, B: 55, fullMark: 100 },
    { subject: 'Vegetation', A: 70, B: 65, fullMark: 100 },
    { subject: 'Urban Density', A: 80, B: 85, fullMark: 100 },
    { subject: 'Albedo', A: 55, B: 60, fullMark: 100 },
  ]


  const scatterData = [
    { x: 30, y: 28, z: 100 },
    { x: 35, y: 32, z: 150 },
    { x: 40, y: 36, z: 200 },
    { x: 45, y: 40, z: 250 },
    { x: 42, y: 38, z: 220 },
    { x: 38, y: 34, z: 180 },
    { x: 44, y: 42, z: 280 },
  ]

  return (
    <EnterpriseCard className={isFullscreen ? 'fixed inset-4 z-50 m-0' : ''}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold text-white">{title}</h3>
            <p className="text-sm text-text-muted mt-1">Advanced data visualization and analytics</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-text-muted hover:text-white transition-colors"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
            <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-text-muted hover:text-white transition-colors">
              <RefreshCw className="w-4 h-4" />
            </button>
            <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-text-muted hover:text-white transition-colors">
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2 bg-white/5 rounded-lg p-1">
            <ChartTypeButton
              icon={<Activity className="w-4 h-4" />}
              label="Line"
              active={selectedChart === 'line'}
              onClick={() => setSelectedChart('line')}
            />
            <ChartTypeButton
              icon={<TrendingUp className="w-4 h-4" />}
              label="Area"
              active={selectedChart === 'area'}
              onClick={() => setSelectedChart('area')}
            />
            <ChartTypeButton
              icon={<BarChart3 className="w-4 h-4" />}
              label="Bar"
              active={selectedChart === 'bar'}
              onClick={() => setSelectedChart('bar')}
            />
            <ChartTypeButton
              icon={<PieChart className="w-4 h-4" />}
              label="Scatter"
              active={selectedChart === 'scatter'}
              onClick={() => setSelectedChart('scatter')}
            />
            <ChartTypeButton
              icon={<Activity className="w-4 h-4" />}
              label="Radar"
              active={selectedChart === 'radar'}
              onClick={() => setSelectedChart('radar')}
            />
          </div>

          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-text-muted" />
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-primary"
            >
              <option value="1m">Last Month</option>
              <option value="3m">Last 3 Months</option>
              <option value="6m">Last 6 Months</option>
              <option value="1y">Last Year</option>
            </select>
          </div>

          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-text-muted hover:text-white transition-colors">
            <Filter className="w-4 h-4" />
            <span className="text-sm">Filters</span>
          </button>
        </div>

        {/* Chart Display */}
        <div className="bg-gradient-to-br from-white/5 to-white/[0.02] rounded-xl p-6 border border-white/10">
          {selectedChart === 'line' && (
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={heatTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="month" stroke="rgba(255,255,255,0.5)" />
                <YAxis stroke="rgba(255,255,255,0.5)" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0A0E27', border: '1px solid rgba(0,102,204,0.3)', borderRadius: '8px', color: '#fff' }}
                />
                <Legend />
                <Line type="monotone" dataKey="lst" stroke="#0066CC" strokeWidth={2} name="LST (°C)" />
                <Line type="monotone" dataKey="heatIndex" stroke="#FF6B35" strokeWidth={2} name="Heat Index (°C)" />
                <Line type="monotone" dataKey="ndvi" stroke="#00CC66" strokeWidth={2} name="NDVI" />
              </LineChart>
            </ResponsiveContainer>
          )}

          {selectedChart === 'area' && (
            <ResponsiveContainer width="100%" height={400}>
              <AreaChart data={heatTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="month" stroke="rgba(255,255,255,0.5)" />
                <YAxis stroke="rgba(255,255,255,0.5)" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0A0E27', border: '1px solid rgba(0,102,204,0.3)', borderRadius: '8px', color: '#fff' }}
                />
                <Legend />
                <Area type="monotone" dataKey="lst" stackId="1" stroke="#0066CC" fill="#0066CC" fillOpacity={0.4} name="LST (°C)" />
                <Area type="monotone" dataKey="heatIndex" stackId="2" stroke="#FF6B35" fill="#FF6B35" fillOpacity={0.4} name="Heat Index (°C)" />
              </AreaChart>
            </ResponsiveContainer>
          )}

          {selectedChart === 'bar' && (
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={heatTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="month" stroke="rgba(255,255,255,0.5)" />
                <YAxis stroke="rgba(255,255,255,0.5)" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0A0E27', border: '1px solid rgba(0,102,204,0.3)', borderRadius: '8px', color: '#fff' }}
                />
                <Legend />
                <Bar dataKey="lst" fill="#0066CC" name="LST (°C)" />
                <Bar dataKey="heatIndex" fill="#FF6B35" name="Heat Index (°C)" />
                <Bar dataKey="humidity" fill="#00CC66" name="Humidity (%)" />
              </BarChart>
            </ResponsiveContainer>
          )}

          {selectedChart === 'scatter' && (
            <ResponsiveContainer width="100%" height={400}>
              <ScatterChart data={scatterData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="x" name="Temperature" stroke="rgba(255,255,255,0.5)" />
                <YAxis dataKey="y" name="Heat Index" stroke="rgba(255,255,255,0.5)" />
                <Tooltip
                  cursor={{ strokeDasharray: '3 3' }}
                  contentStyle={{ backgroundColor: '#0A0E27', border: '1px solid rgba(0,102,204,0.3)', borderRadius: '8px', color: '#fff' }}
                />
                <Scatter name="Data Points" data={scatterData} fill="#0066CC" />
              </ScatterChart>
            </ResponsiveContainer>
          )}

          {selectedChart === 'radar' && (
            <ResponsiveContainer width="100%" height={400}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="rgba(255,255,255,0.1)" />
                <PolarAngleAxis dataKey="subject" stroke="rgba(255,255,255,0.5)" />
                <PolarRadiusAxis stroke="rgba(255,255,255,0.5)" />
                <Radar name="Current" dataKey="A" stroke="#0066CC" fill="#0066CC" fillOpacity={0.4} />
                <Radar name="Previous" dataKey="B" stroke="#FF6B35" fill="#FF6B35" fillOpacity={0.4} />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <MetricCard
            title="Data Points"
            value="1,247"
            change="+12.5%"
            trend="up"
          />
          <MetricCard
            title="Avg Temperature"
            value="38.5°C"
            change="+2.3°C"
            trend="up"
          />
          <MetricCard
            title="Peak Heat Index"
            value="46.2°C"
            change="+1.4°C"
            trend="up"
          />
          <MetricCard
            title="Vegetation Cover"
            value="42%"
            change="-3%"
            trend="down"
          />
        </div>
      </div>
    </EnterpriseCard>
  )
}

function ChartTypeButton({ icon, label, active, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all ${
        active
          ? 'bg-primary text-white'
          : 'text-text-muted hover:text-white hover:bg-white/10'
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  )
}

function MetricCard({ title, value, change, trend }: any) {
  return (
    <div className="bg-gradient-to-br from-white/5 to-white/[0.02] rounded-xl p-4 border border-white/10">
      <p className="text-sm text-text-muted mb-1">{title}</p>
      <p className="text-2xl font-bold text-white mb-1">{value}</p>
      <p className={`text-sm ${trend === 'up' ? 'text-red-400' : 'text-green-400'}`}>
        {change}
      </p>
    </div>
  )
}
