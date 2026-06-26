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

interface GISMapProps {
  center: [number, number]
  heatData: HeatDataPoint[]
  selectedLayer: 'lst' | 'ndvi' | 'heatIndex'
  getColor: (value: number, layer: string) => string
  getRadius: (value: number) => number
  fullScreen?: boolean
  onLocationClick?: (point: HeatDataPoint) => void
}

// Dynamic import with SSR disabled to prevent hydration issues
const GISMapClient = dynamic(
  () => import('./GISMapClient'),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-full bg-white/5 rounded-lg">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }
)

export default function GISMap(props: GISMapProps) {
  return <GISMapClient {...props} />
}
