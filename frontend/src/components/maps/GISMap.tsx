'use client'

import GISMapClient from './GISMapClient'

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

export default function GISMap(props: GISMapProps) {
  return <GISMapClient {...props} />
}
