'use client'

import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell } from 'recharts'

const temperatureData = [
  { name: '00:00', temp: 32, heatIndex: 35 },
  { name: '04:00', temp: 30, heatIndex: 33 },
  { name: '08:00', temp: 35, heatIndex: 38 },
  { name: '12:00', temp: 42, heatIndex: 48 },
  { name: '16:00', temp: 45, heatIndex: 52 },
  { name: '20:00', temp: 40, heatIndex: 45 },
  { name: '24:00', temp: 36, heatIndex: 40 },
]

const ndviData = [
  { name: 'Week 1', ndvi: 0.42 },
  { name: 'Week 2', ndvi: 0.40 },
  { name: 'Week 3', ndvi: 0.38 },
  { name: 'Week 4', ndvi: 0.36 },
  { name: 'Week 5', ndvi: 0.35 },
  { name: 'Week 6', ndvi: 0.34 },
  { name: 'Week 7', ndvi: 0.33 },
  { name: 'Week 8', ndvi: 0.32 },
]

const riskDistributionData = [
  { name: 'Critical', value: 23, color: '#EF4444' },
  { name: 'High', value: 45, color: '#F59E0B' },
  { name: 'Medium', value: 78, color: '#00D4FF' },
  { name: 'Low', value: 124, color: '#22C55E' },
]

const cityComparisonData = [
  { name: 'Delhi', critical: 15, high: 28, medium: 42, low: 35 },
  { name: 'Mumbai', critical: 8, high: 22, medium: 38, low: 52 },
  { name: 'Chennai', critical: 12, high: 25, medium: 35, low: 48 },
  { name: 'Kolkata', critical: 10, high: 20, medium: 40, low: 50 },
  { name: 'Bangalore', critical: 5, high: 15, medium: 30, low: 65 },
]

const interventionData = [
  { name: 'Green Roofs', impact: 85, cost: 45, roi: 1.89 },
  { name: 'Cooling Centers', impact: 92, cost: 60, roi: 1.53 },
  { name: 'Tree Plantation', impact: 78, cost: 30, roi: 2.60 },
  { name: 'Water Stations', impact: 88, cost: 35, roi: 2.51 },
  { name: 'Reflective Surfaces', impact: 72, cost: 40, roi: 1.80 },
]

export default function AnalyticsCharts() {
  return (
    <div className="space-y-6">
      {/* Heat Trend Chart */}
      <div className="glass-card rounded-xl p-6 border border-white/10">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">24-Hour Heat Trend</h3>
          <div className="flex gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-danger" />
              <span className="text-text-muted">Temperature (°C)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-warning" />
              <span className="text-text-muted">Heat Index</span>
            </div>
          </div>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={temperatureData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="name" stroke="rgba(255,255,255,0.3)" />
              <YAxis stroke="rgba(255,255,255,0.3)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(2, 6, 23, 0.9)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                }}
              />
              <Area type="monotone" dataKey="temp" stroke="#EF4444" fill="#EF4444" fillOpacity={0.3} />
              <Area type="monotone" dataKey="heatIndex" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* NDVI Trend */}
        <div className="glass-card rounded-xl p-6 border border-white/10">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">NDVI Trend (8 Weeks)</h3>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-success" />
              <span className="text-sm text-text-muted">Vegetation Index</span>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={ndviData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.3)" />
                <YAxis stroke="rgba(255,255,255,0.3)" domain={[0, 0.5]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(2, 6, 23, 0.9)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                  }}
                />
                <Line type="monotone" dataKey="ndvi" stroke="#22C55E" strokeWidth={2} dot={{ fill: '#22C55E' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Risk Distribution */}
        <div className="glass-card rounded-xl p-6 border border-white/10">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Risk Distribution</h3>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={riskDistributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {riskDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(2, 6, 23, 0.9)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* City Comparison */}
      <div className="glass-card rounded-xl p-6 border border-white/10">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">Vulnerability by City</h3>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={cityComparisonData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="name" stroke="rgba(255,255,255,0.3)" />
              <YAxis stroke="rgba(255,255,255,0.3)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(2, 6, 23, 0.9)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                }}
              />
              <Legend />
              <Bar dataKey="critical" stackId="a" fill="#EF4444" name="Critical" />
              <Bar dataKey="high" stackId="a" fill="#F59E0B" name="High" />
              <Bar dataKey="medium" stackId="a" fill="#00D4FF" name="Medium" />
              <Bar dataKey="low" stackId="a" fill="#22C55E" name="Low" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Intervention Effectiveness */}
      <div className="glass-card rounded-xl p-6 border border-white/10">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">Intervention ROI Analysis</h3>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={interventionData} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis type="number" stroke="rgba(255,255,255,0.3)" />
              <YAxis dataKey="name" type="category" stroke="rgba(255,255,255,0.3)" width={120} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(2, 6, 23, 0.9)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                }}
              />
              <Legend />
              <Bar dataKey="impact" fill="#FF6B35" name="Impact Score" />
              <Bar dataKey="cost" fill="#00D4FF" name="Cost Index" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
