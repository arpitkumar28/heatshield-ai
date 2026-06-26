'use client'

import { useState, useEffect, useCallback } from 'react'
import GISWorkspace from '@/components/gis/GISWorkspace'
import { analyticsAPI } from '@/lib/api'

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
      console.error('Error fetching GIS data:', error)
      // Fallback to empty if real API fails, or keep previous data
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
