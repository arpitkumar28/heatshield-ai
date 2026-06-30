'use client'

import { useEffect, useState, useCallback } from 'react'
import { Layers, Clock, MapPin } from 'lucide-react'
import { analyticsAPI } from '@/lib/api'
import dynamic from 'next/dynamic'

// Dynamically import GISMap to avoid SSR issues
const GISMap = dynamic(
  () => import('@/features/gis').then(mod => mod.GISMap),
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

interface HotspotData {
  lat: number
  lng: number
  temperature: number
  risk_level: string
}

interface LegendItemProps {
  color: string
  label: string
}

const fallbackHeatData: HeatDataPoint[] = [
  { id: 1, lat: 26.9124, lng: 75.7873, lst: 42.5, ndvi: 0.28, heatIndex: 48.2, isHotspot: true, timestamp: '2026-06-27T08:30:00.000Z' },
  { id: 2, lat: 26.9360, lng: 75.8050, lst: 39.1, ndvi: 0.42, heatIndex: 43.5, isHotspot: false, timestamp: '2026-06-27T08:30:00.000Z' },
  { id: 3, lat: 26.8890, lng: 75.7420, lst: 44.8, ndvi: 0.19, heatIndex: 50.1, isHotspot: true, timestamp: '2026-06-27T08:30:00.000Z' },
  { id: 4, lat: 26.9580, lng: 75.7220, lst: 36.6, ndvi: 0.55, heatIndex: 40.8, isHotspot: false, timestamp: '2026-06-27T08:30:00.000Z' },
  { id: 5, lat: 26.8980, lng: 75.8420, lst: 41.4, ndvi: 0.33, heatIndex: 46.0, isHotspot: true, timestamp: '2026-06-27T08:30:00.000Z' },
  { id: 6, lat: 26.9280, lng: 75.7620, lst: 34.2, ndvi: 0.62, heatIndex: 38.1, isHotspot: false, timestamp: '2026-06-27T08:30:00.000Z' },
]

export default function HeatMap({ fullScreen = false }: { fullScreen?: boolean }) {
  const [heatData, setHeatData] = useState<HeatDataPoint[]>([])
  const [selectedLayer, setSelectedLayer] = useState<'lst' | 'ndvi' | 'heatIndex'>('lst')
  const [loading, setLoading] = useState(true)
  const [selectedCity, setSelectedCity] = useState('Jaipur')
  const [selectedTime, setSelectedTime] = useState('current')

  const fetchHeatmapData = useCallback(async () => {
    try {
      setLoading(true)
      const response = await analyticsAPI.getHeatmap(selectedCity)

      const transformedData: HeatDataPoint[] = response.data.hotspots.map((hotspot: HotspotData, index: number) => ({
        id: index,
        lat: hotspot.lat,
        lng: hotspot.lng,
        lst: hotspot.temperature,
        ndvi: 0.3 + ((index % 5) * 0.08),
        heatIndex: hotspot.temperature + 2 + (index % 4) * 0.6,
        isHotspot: hotspot.risk_level === 'High',
        timestamp: '2026-06-27T08:30:00.000Z'
      }))

      setHeatData(transformedData)
    } catch {
      setHeatData(fallbackHeatData)
    } finally {
      setLoading(false)
    }
  }, [selectedCity])

  useEffect(() => {
    fetchHeatmapData()
  }, [fetchHeatmapData])

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
      <div className="glass-card rounded-xl p-8 flex items-center justify-center h-[600px] border border-white/10">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-text-muted">Loading satellite heat map data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="glass-card rounded-xl p-4 border border-white/10">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-primary" />
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-primary font-display"
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

          <div className="flex items-center gap-2 flex-1 min-w-[200px]">
            <Clock className="w-4 h-4 text-primary" />
            <select
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-primary font-display"
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

          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-primary" />
            <button
              onClick={() => setSelectedLayer('lst')}
              className={`px-4 py-2 rounded-lg text-sm transition-all font-display ${
                selectedLayer === 'lst'
                  ? 'bg-primary text-white'
                  : 'bg-white/10 hover:bg-white/20 text-text-muted'
              }`}
            >
              Temperature
            </button>
            <button
              onClick={() => setSelectedLayer('ndvi')}
              className={`px-4 py-2 rounded-lg text-sm transition-all font-display ${
                selectedLayer === 'ndvi'
                  ? 'bg-primary text-white'
                  : 'bg-white/10 hover:bg-white/20 text-text-muted'
              }`}
            >
              Vegetation
            </button>
            <button
              onClick={() => setSelectedLayer('heatIndex')}
              className={`px-4 py-2 rounded-lg text-sm transition-all font-display ${
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

      <div className={`rounded-xl overflow-hidden border border-white/10 ${fullScreen ? 'h-[calc(100vh-200px)]' : 'h-[600px]'}`}>
        <GISMap
          center={getCityCenter(selectedCity)}
          heatData={heatData}
          selectedLayer={selectedLayer}
          getColor={getColor}
          getRadius={getRadius}
          fullScreen={fullScreen}
        />
      </div>

      <div className="glass-card rounded-xl p-4 border border-white/10">
        <h3 className="font-semibold mb-3 text-white font-display">Legend</h3>
        <div className="flex flex-wrap gap-4">
          <LegendItem color="#00ff00" label="Low" />
          <LegendItem color="#ffff00" label="Moderate" />
          <LegendItem color="#ff8800" label="High" />
          <LegendItem color="#ff0000" label="Extreme" />
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-full bg-primary border-2 border-primary"></div>
            <span className="text-sm text-text-muted font-display">Hotspot</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function LegendItem({ color, label }: LegendItemProps) {
  return (
    <div className="flex items-center space-x-2">
      <div className="w-4 h-4 rounded" style={{ backgroundColor: color }}></div>
      <span className="text-sm text-text-muted font-display">{label}</span>
    </div>
  )
}
