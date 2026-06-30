'use client'

import { useState, useEffect, useCallback } from 'react'
import dynamic from 'next/dynamic'
import { analyticsAPI } from '@/lib/api'

// Dynamically import GISWorkspace to avoid SSR issues
const GISWorkspace = dynamic(
  () => import('@/features/gis').then(mod => mod.GISWorkspace),
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

const fallbackHeatData: HeatDataPoint[] = [
  { id: 1, lat: 26.9124, lng: 75.7873, lst: 42.5, ndvi: 0.28, heatIndex: 48.2, isHotspot: true, timestamp: '2026-06-27T08:30:00.000Z' },
  { id: 2, lat: 26.9360, lng: 75.8050, lst: 39.1, ndvi: 0.42, heatIndex: 43.5, isHotspot: false, timestamp: '2026-06-27T08:30:00.000Z' },
  { id: 3, lat: 26.8890, lng: 75.7420, lst: 44.8, ndvi: 0.19, heatIndex: 50.1, isHotspot: true, timestamp: '2026-06-27T08:30:00.000Z' },
  { id: 4, lat: 26.9580, lng: 75.7220, lst: 36.6, ndvi: 0.55, heatIndex: 40.8, isHotspot: false, timestamp: '2026-06-27T08:30:00.000Z' },
  { id: 5, lat: 26.8980, lng: 75.8420, lst: 41.4, ndvi: 0.33, heatIndex: 46.0, isHotspot: true, timestamp: '2026-06-27T08:30:00.000Z' },
]

export default function GISPage() {
  const [heatData, setHeatData] = useState<HeatDataPoint[]>([])
  const [selectedCity, setSelectedCity] = useState('Jaipur')
  const [loading, setLoading] = useState(true)

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

  const fetchGISData = useCallback(async () => {
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
    fetchGISData()
  }, [fetchGISData])

  if (loading && heatData.length === 0) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-text-muted">Initializing GIS Environment...</p>
        </div>
      </div>
    )
  }

  return (
    <GISWorkspace
      center={cityCenters[selectedCity] || cityCenters['Jaipur']}
      heatData={heatData}
      selectedCity={selectedCity}
      onCityChange={setSelectedCity}
    />
  )
}
