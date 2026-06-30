'use client'

import { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { Map, Grid3X3, PieChart as PieChartIcon, BarChart3, Download, Share2 } from 'lucide-react'
import { EnterpriseCard } from '@/ui'

export default function SpatialAnalysis() {
  const [selectedView, setSelectedView] = useState<'zones' | 'distribution' | 'comparison'>('zones')
  const [selectedCity, setSelectedCity] = useState('Jaipur')

  const zoneData = [
    { zone: 'North', avgTemp: 38.5, heatIndex: 42.3, vegetation: 35, urbanDensity: 65 },
    { zone: 'South', avgTemp: 36.2, heatIndex: 40.1, vegetation: 45, urbanDensity: 55 },
    { zone: 'East', avgTemp: 37.8, heatIndex: 41.5, vegetation: 40, urbanDensity: 60 },
    { zone: 'West', avgTemp: 39.2, heatIndex: 43.8, vegetation: 30, urbanDensity: 70 },
    { zone: 'Central', avgTemp: 40.5, heatIndex: 45.2, vegetation: 25, urbanDensity: 80 },
  ]

  const landUseData = [
    { name: 'Residential', value: 35, color: '#0066CC' },
    { name: 'Commercial', value: 20, color: '#FF6B35' },
    { name: 'Industrial', value: 15, color: '#CC0000' },
    { name: 'Green Spaces', value: 20, color: '#00CC66' },
    { name: 'Water Bodies', value: 5, color: '#0099FF' },
    { name: 'Transportation', value: 5, color: '#FFCC00' },
  ]

  const comparisonData = [
    { city: 'Jaipur', avgTemp: 38.5, heatIndex: 42.3, ndvi: 0.35, hotspotCount: 12 },
    { city: 'Delhi', avgTemp: 40.2, heatIndex: 44.8, ndvi: 0.28, hotspotCount: 18 },
    { city: 'Ahmedabad', avgTemp: 39.8, heatIndex: 43.5, ndvi: 0.32, hotspotCount: 15 },
    { city: 'Hyderabad', avgTemp: 37.5, heatIndex: 41.2, ndvi: 0.38, hotspotCount: 10 },
    { city: 'Mumbai', avgTemp: 34.2, heatIndex: 38.5, ndvi: 0.42, hotspotCount: 8 },
  ]

  return (
    <EnterpriseCard>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold text-white">Spatial Analysis</h3>
            <p className="text-sm text-text-muted mt-1">Geospatial heat distribution patterns</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-text-muted hover:text-white transition-colors">
              <Download className="w-4 h-4" />
            </button>
            <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-text-muted hover:text-white transition-colors">
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* View Controls */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2 bg-white/5 rounded-lg p-1">
            <ViewButton
              icon={<Grid3X3 className="w-4 h-4" />}
              label="Zones"
              active={selectedView === 'zones'}
              onClick={() => setSelectedView('zones')}
            />
            <ViewButton
              icon={<PieChartIcon className="w-4 h-4" />}
              label="Distribution"
              active={selectedView === 'distribution'}
              onClick={() => setSelectedView('distribution')}
            />
            <ViewButton
              icon={<BarChart3 className="w-4 h-4" />}
              label="Comparison"
              active={selectedView === 'comparison'}
              onClick={() => setSelectedView('comparison')}
            />
          </div>

          {selectedView === 'comparison' && (
            <div className="flex items-center gap-2">
              <Map className="w-4 h-4 text-text-muted" />
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-primary"
              >
                <option value="Jaipur">Jaipur</option>
                <option value="Delhi">Delhi</option>
                <option value="Ahmedabad">Ahmedabad</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Mumbai">Mumbai</option>
              </select>
            </div>
          )}
        </div>

        {/* Chart Display */}
        <div className="bg-gradient-to-br from-white/5 to-white/[0.02] rounded-xl p-6 border border-white/10">
          {selectedView === 'zones' && (
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={zoneData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="zone" stroke="rgba(255,255,255,0.5)" />
                <YAxis stroke="rgba(255,255,255,0.5)" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0A0E27', border: '1px solid rgba(0,102,204,0.3)', borderRadius: '8px', color: '#fff' }}
                />
                <Legend />
                <Bar dataKey="avgTemp" fill="#FF6B35" name="Avg Temp (°C)" />
                <Bar dataKey="heatIndex" fill="#CC0000" name="Heat Index (°C)" />
                <Bar dataKey="vegetation" fill="#00CC66" name="Vegetation (%)" />
              </BarChart>
            </ResponsiveContainer>
          )}

          {selectedView === 'distribution' && (
            <div className="flex items-center justify-center h-[400px]">
              <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                  <Pie
                    data={landUseData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {landUseData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0A0E27', border: '1px solid rgba(0,102,204,0.3)', borderRadius: '8px', color: '#fff' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}

          {selectedView === 'comparison' && (
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={comparisonData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="city" stroke="rgba(255,255,255,0.5)" />
                <YAxis stroke="rgba(255,255,255,0.5)" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0A0E27', border: '1px solid rgba(0,102,204,0.3)', borderRadius: '8px', color: '#fff' }}
                />
                <Legend />
                <Bar dataKey="avgTemp" fill="#FF6B35" name="Avg Temp (°C)" />
                <Bar dataKey="heatIndex" fill="#CC0000" name="Heat Index (°C)" />
                <Bar dataKey="ndvi" fill="#00CC66" name="NDVI" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Spatial Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <SpatialMetricCard
            title="Highest Temperature Zone"
            value="Central"
            detail="40.5°C average"
          />
          <SpatialMetricCard
            title="Best Vegetation Cover"
            value="South"
            detail="45% coverage"
          />
          <SpatialMetricCard
            title="Highest Urban Density"
            value="Central"
            detail="80% built-up"
          />
        </div>

        {/* Heat Distribution Map Legend */}
        <div className="bg-gradient-to-br from-white/5 to-white/[0.02] rounded-xl p-4 border border-white/10">
          <h4 className="text-sm font-semibold text-white mb-3">Heat Distribution Legend</h4>
          <div className="flex flex-wrap gap-4">
            <LegendItem color="#0066CC" label="Low Heat (30-35°C)" />
            <LegendItem color="#FF6B35" label="Moderate Heat (35-40°C)" />
            <LegendItem color="#CC0000" label="High Heat (40-45°C)" />
            <LegendItem color="#FF0000" label="Extreme Heat (>45°C)" />
          </div>
        </div>
      </div>
    </EnterpriseCard>
  )
}

function ViewButton({ icon, label, active, onClick }: { icon: React.ReactNode; label: string; active: boolean; onClick: () => void }) {
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

function SpatialMetricCard({ title, value, detail }: { title: string; value: string; detail: string }) {
  return (
    <div className="bg-gradient-to-br from-white/5 to-white/[0.02] rounded-xl p-4 border border-white/10">
      <p className="text-sm text-text-muted mb-1">{title}</p>
      <p className="text-lg font-bold text-white mb-1">{value}</p>
      <p className="text-xs text-text-muted">{detail}</p>
    </div>
  )
}

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="w-4 h-4 rounded" style={{ backgroundColor: color }}></div>
      <span className="text-sm text-text-muted">{label}</span>
    </div>
  )
}
