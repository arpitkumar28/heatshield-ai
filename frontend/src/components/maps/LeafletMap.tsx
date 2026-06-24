'use client'

import { useEffect, useState } from 'react'
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

// Dynamically import the actual map component to avoid SSR issues
const LeafletMapClient = dynamic(
  () => import('./LeafletMapClient'),
  { ssr: false }
)

export default function LeafletMap(props: LeafletMapProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return (
      <div className="flex items-center justify-center h-full bg-white/5 rounded-lg">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return <LeafletMapClient {...props} />
}