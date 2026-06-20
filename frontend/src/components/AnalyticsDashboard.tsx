'use client'

import { useState } from 'react'
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle } from 'lucide-react'

const heatTrendData = [
  { month: 'Jan', lst: 25, heatIndex: 28, ndvi: 0.6 },
  { month: 'Feb', lst: 28, heatIndex: 32, ndvi: 0.55 },
  { month: 'Mar', lst: 32, heatIndex: 36, ndvi: 0.5 },
  { month: 'Apr', lst: 36, heatIndex: 40, ndvi: 0.45 },
  { month: 'May', lst: 40, heatIndex: 44, ndvi: 0.4 },
  { month: 'Jun', lst: 42, heatIndex: 46, ndvi: 0.35 },
]

const vulnerabilityData = [
  { name: 'Low', value: 25, color: '#00ff00' },
  { name: 'Medium', value: 35, color: '#ffff00' },
  { name: 'High', value: 25, color: '#ff8800' },
  { name: 'Extreme', value: 15, color: '#ff0000' },
]

const interventionData = [
  { name: 'Green Cover', reduction: 2.5, cost: 50 },
  { name: 'Cool Roofs', reduction: 1.8, cost: 30 },
  { name: 'Water Bodies', reduction: 2.2, cost: 75 },
  { name: 'Tree Planting', reduction: 1.5, cost: 20 },
  { name: 'Shade Structures', reduction: 1.2, cost: 25 },
]

export default function AnalyticsDashboard() {
  const [timeRange, setTimeRange] = useState('6m')

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="bg-white/10 border border-isro-blue/50 rounded-lg px-4 py-2 text-white"
        >
          <option value="1m">Last Month</option>
          <option value="3m">Last 3 Months</option>
          <option value="6m">Last 6 Months</option>
          <option value="1y">Last Year</option>
        </select>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <KPICard
          title="Total Hotspots Detected"
          value="156"
          change="+12%"
          icon={<AlertTriangle className="w-5 h-5 text-red-500" />}
          trend="up"
        />
        <KPICard
          title="Avg Temperature Reduction"
          value="1.8°C"
          change="+0.3°C"
          icon={<TrendingDown className="w-5 h-5 text-green-500" />}
          trend="down"
        />
        <KPICard
          title="Interventions Implemented"
          value="23"
          change="+5"
          icon={<CheckCircle className="w-5 h-5 text-isro-accent" />}
          trend="up"
        />
        <KPICard
          title="Population Protected"
          value="2.4M"
          change="+0.5M"
          icon={<TrendingUp className="w-5 h-5 text-isro-orange" />}
          trend="up"
        />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Heat Trend Chart */}
        <div className="glass rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4">Heat Trends Over Time</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={heatTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="month" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip
                contentStyle={{ backgroundColor: '#0A0E27', border: '1px solid #0066CC', borderRadius: '8px' }}
              />
              <Legend />
              <Area type="monotone" dataKey="lst" stackId="1" stroke="#FF6B35" fill="#FF6B35" fillOpacity={0.6} name="LST (°C)" />
              <Area type="monotone" dataKey="heatIndex" stackId="2" stroke="#0066CC" fill="#0066CC" fillOpacity={0.6} name="Heat Index (°C)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Vulnerability Distribution */}
        <div className="glass rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4">Vulnerability Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={vulnerabilityData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {vulnerabilityData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ backgroundColor: '#0A0E27', border: '1px solid #0066CC', borderRadius: '8px' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Intervention Effectiveness */}
        <div className="glass rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4">Intervention Effectiveness</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={interventionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="name" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip
                contentStyle={{ backgroundColor: '#0A0E27', border: '1px solid #0066CC', borderRadius: '8px' }}
              />
              <Legend />
              <Bar dataKey="reduction" fill="#0066CC" name="Temp Reduction (°C)" />
              <Bar dataKey="cost" fill="#FF6B35" name="Cost (Lakhs ₹)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* NDVI Trend */}
        <div className="glass rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4">Vegetation Index (NDVI) Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={heatTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="month" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip
                contentStyle={{ backgroundColor: '#0A0E27', border: '1px solid #0066CC', borderRadius: '8px' }}
              />
              <Legend />
              <Line type="monotone" dataKey="ndvi" stroke="#00ff00" strokeWidth={2} name="NDVI" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Detailed Metrics Table */}
      <div className="glass rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4">Detailed Metrics</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-isro-blue/30">
                <th className="text-left py-3 px-4">Metric</th>
                <th className="text-left py-3 px-4">Current</th>
                <th className="text-left py-3 px-4">Previous</th>
                <th className="text-left py-3 px-4">Change</th>
                <th className="text-left py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              <TableRow metric="Average LST" current="38.5°C" previous="36.2°C" change="+2.3°C" status="warning" />
              <TableRow metric="Peak Heat Index" current="46.2°C" previous="44.8°C" change="+1.4°C" status="danger" />
              <TableRow metric="Vegetation Cover" current="42%" previous="45%" change="-3%" status="warning" />
              <TableRow metric="Urban Density" current="68%" previous="65%" change="+3%" status="info" />
              <TableRow metric="Cooling Centers" current="15" previous="12" change="+3" status="success" />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function KPICard({ title, value, change, icon, trend }: any) {
  const trendColors = {
    up: trend === 'down' ? 'text-green-400' : 'text-red-400',
    down: trend === 'down' ? 'text-green-400' : 'text-red-400'
  }

  return (
    <div className="glass rounded-lg p-4 hover:border-isro-orange/50 transition-all">
      <div className="flex items-center justify-between mb-2">
        <div className="p-2 rounded-lg bg-white/10">{icon}</div>
        <span className={`text-sm ${trendColors[trend as keyof typeof trendColors]}`}>
          {change}
        </span>
      </div>
      <p className="text-gray-400 text-sm">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  )
}

function TableRow({ metric, current, previous, change, status }: any) {
  const statusStyles = {
    success: 'bg-green-500/20 text-green-400',
    warning: 'bg-yellow-500/20 text-yellow-400',
    danger: 'bg-red-500/20 text-red-400',
    info: 'bg-blue-500/20 text-blue-400'
  }

  return (
    <tr className="border-b border-isro-blue/20 hover:bg-white/5">
      <td className="py-3 px-4">{metric}</td>
      <td className="py-3 px-4 font-semibold">{current}</td>
      <td className="py-3 px-4 text-gray-400">{previous}</td>
      <td className={`py-3 px-4 ${change.startsWith('+') ? 'text-red-400' : 'text-green-400'}`}>
        {change}
      </td>
      <td className="py-3 px-4">
        <span className={`px-2 py-1 rounded text-xs ${statusStyles[status as keyof typeof statusStyles]}`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      </td>
    </tr>
  )
}
