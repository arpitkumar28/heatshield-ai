'use client'

import dynamic from 'next/dynamic'

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

interface LeafletMapProps {
  center: [number, number]
  heatData: HeatDataPoint[]
  selectedLayer: 'lst' | 'ndvi' | 'heatIndex'
  getColor: (value: number, layer: string) => string
  getRadius: (value: number) => number
  fullScreen?: boolean
}

// Directly dynamic-import the Client component with SSR disabled
// This handles the 'window is not defined' and mounting logic automatically
const LeafletMap = dynamic(
  () => import('./LeafletMapClient'),
  { 
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-full bg-white/5 rounded-lg">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }
)

export default LeafletMap
