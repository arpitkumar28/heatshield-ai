'use client'

import { useEffect, useState, useCallback } from 'react'
import { Layers, Clock, MapPin } from 'lucide-react'
import { analyticsAPI } from '@/lib/api'
import dynamic from 'next/dynamic'

// Dynamically import only the LeafletMap component to avoid SSR issues
const LeafletMap = dynamic(
  () => import('@/components/maps/LeafletMap'),
  { ssr: false }
)

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

export default function HeatMap({ fullScreen = false }: { fullScreen?: boolean }) {
  const [heatData, setHeatData] = useState<HeatDataPoint[]>([])
  const [selectedLayer, setSelectedLayer] = useState<'lst' | 'ndvi' | 'heatIndex'>('lst')
  const [loading, setLoading] = useState(true)
  const [selectedCity, setSelectedCity] = useState('Jaipur')
  const [heatmapData, setHeatmapData] = useState<any>(null)
  const [isMounted, setIsMounted] = useState(false)
  const [selectedTime, setSelectedTime] = useState('current')
  const [showLayerPanel, setShowLayerPanel] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const fetchHeatmapData = useCallback(async () => {
    try {
      setLoading(true)
      const response = await analyticsAPI.getHeatmap(selectedCity)
      setHeatmapData(response.data)

      // Transform hotspots into heat data points
      const transformedData: HeatDataPoint[] = response.data.hotspots.map((hotspot: any, index: number) => ({
        id: index,
        lat: hotspot.lat,
        lng: hotspot.lng,
        lst: hotspot.temperature,
        ndvi: 0.3 + Math.random() * 0.4,
        heatIndex: hotspot.temperature + 2 + Math.random() * 3,
        isHotspot: hotspot.risk_level === 'High',
        timestamp: new Date().toISOString()
      }))

      setHeatData(transformedData)
    } catch (error) {
      console.error('Error fetching heatmap data:', error)
      const mockData: HeatDataPoint[] = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        lat: 26.9 + Math.random() * 0.1,
        lng: 75.7 + Math.random() * 0.1,
        lst: 30 + Math.random() * 15,
        ndvi: Math.random() * 0.8,
        heatIndex: 35 + Math.random() * 20,
        isHotspot: Math.random() > 0.7,
        timestamp: new Date().toISOString()
      }))
      setHeatData(mockData)
    } finally {
      setLoading(false)
    }
  }, [selectedCity, selectedTime])

  useEffect(() => {
    if (isMounted) {
      fetchHeatmapData()
    }
  }, [isMounted, fetchHeatmapData])

  const getColor = (value: number, layer: string) => {
    if (layer === 'lst') {
      if (value < 30) return '#00ff00'
      if (value < 35) return '#ffff00'
      if (value < 40) return '#ff8800'
      return '#ff0000'
    } else if (layer === 'ndvi') {
      if (value < 0.2) return '#8B4513'
      if (value < 0.4) return '#FFD700'
      if (value < 0.6) return '#90EE90'
      return '#006400'
    } else {
      if (value < 35) return '#00ff00'
      if (value < 40) return '#ffff00'
      if (value < 45) return '#ff8800'
      return '#ff0000'
    }
  }

  const getCityCenter = (city: string): [number, number] => {
    const cityCenters: { [key: string]: [number, number] } = {
      'Jaipur': [26.9124, 75.7873],
      'Delhi': [28.6139, 77.2090],
      'Ahmedabad': [23.0225, 72.5714],
      'Hyderabad': [17.3850, 78.4867],
      'Mumbai': [19.0760, 72.8777],
      'Chennai': [13.0827, 80.2707],
      'Kolkata': [22.5726, 88.3639],
      'Bangalore': [12.9716, 77.5946]
    }
    return cityCenters[city] || cityCenters['Jaipur']
  }

  const getRadius = (value: number) => {
    return 500 + (value * 20)
  }

  if (loading) {
    return (
      <div className="glass-card rounded-xl p-8 flex items-center justify-center h-[600px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-text-muted">Loading heat map data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Enhanced Map Controls */}
      <div className="glass-card rounded-xl p-4 border border-white/10">
        <div className="flex flex-wrap items-center gap-4">
          {/* City Selector */}
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-primary" />
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-primary"
            >
              <option value="Jaipur">Jaipur</option>
              <option value="Delhi">Delhi</option>
              <option value="Ahmedabad">Ahmedabad</option>
              <option value="Hyderabad">Hyderabad</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Chennai">Chennai</option>
              <option value="Kolkata">Kolkata</option>
              <option value="Bangalore">Bangalore</option>
            </select>
          </div>

          {/* Time Slider */}
          <div className="flex items-center gap-2 flex-1 min-w-[200px]">
            <Clock className="w-4 h-4 text-primary" />
            <select
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-primary"
            >
              <option value="current">Current</option>
              <option value="-1h">1 Hour Ago</option>
              <option value="-3h">3 Hours Ago</option>
              <option value="-6h">6 Hours Ago</option>
              <option value="-12h">12 Hours Ago</option>
              <option value="-24h">24 Hours Ago</option>
              <option value="-72h">72 Hours Ago</option>
            </select>
          </div>

          {/* Layer Controls */}
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-primary" />
            <button
              onClick={() => setSelectedLayer('lst')}
              className={`px-4 py-2 rounded-lg text-sm transition-all ${
                selectedLayer === 'lst'
                  ? 'bg-primary text-white'
                  : 'bg-white/10 hover:bg-white/20 text-text-muted'
              }`}
            >
              Temperature
            </button>
            <button
              onClick={() => setSelectedLayer('ndvi')}
              className={`px-4 py-2 rounded-lg text-sm transition-all ${
                selectedLayer === 'ndvi'
                  ? 'bg-primary text-white'
                  : 'bg-white/10 hover:bg-white/20 text-text-muted'
              }`}
            >
              Vegetation
            </button>
            <button
              onClick={() => setSelectedLayer('heatIndex')}
              className={`px-4 py-2 rounded-lg text-sm transition-all ${
                selectedLayer === 'heatIndex'
                  ? 'bg-primary text-white'
                  : 'bg-white/10 hover:bg-white/20 text-text-muted'
              }`}
            >
              Heat Index
            </button>
          </div>
        </div>
      </div>

      {/* Full-screen Map */}
      <div className={`rounded-xl overflow-hidden border border-white/10 ${fullScreen ? 'h-[calc(100vh-200px)]' : 'h-[600px]'}`}>
        {isMounted && (
          <LeafletMap
            key={`${selectedCity}-${selectedTime}`}
            center={getCityCenter(selectedCity)}
            heatData={heatData}
            selectedLayer={selectedLayer}
            getColor={getColor}
            getRadius={getRadius}
            fullScreen={fullScreen}
          />
        )}
      </div>

      {/* Legend */}
      <div className="glass-card rounded-xl p-4 border border-white/10">
        <h3 className="font-semibold mb-3 text-white">Legend</h3>
        <div className="flex flex-wrap gap-4">
          <LegendItem color="#00ff00" label="Low" />
          <LegendItem color="#ffff00" label="Moderate" />
          <LegendItem color="#ff8800" label="High" />
          <LegendItem color="#ff0000" label="Extreme" />
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-full bg-primary border-2 border-primary"></div>
            <span className="text-sm text-text-muted">Hotspot</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function StatCard({ icon, title, value, change, color }: any) {
  const colorClasses = {
    'isro-orange': 'text-isro-orange',
    'red': 'text-red-500',
    'green': 'text-green-500',
    'isro-accent': 'text-isro-accent'
  }

  return (
    <div className="glass rounded-lg p-4 hover:border-isro-orange/50 transition-all">
      <div className="flex items-center justify-between mb-2">
        <div className={`p-2 rounded-lg bg-white/10 ${colorClasses[color as keyof typeof colorClasses]}`}>
          {icon}
        </div>
        <span className={`text-sm ${change.startsWith('+') ? 'text-red-400' : 'text-green-400'}`}>
          {change}
        </span>
      </div>
      <p className="text-gray-400 text-sm">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  )
}

function LegendItem({ color, label }: any) {
  return (
    <div className="flex items-center space-x-2">
      <div className="w-4 h-4 rounded" style={{ backgroundColor: color }}></div>
      <span className="text-sm text-gray-400">{label}</span>
    </div>
  )
}
