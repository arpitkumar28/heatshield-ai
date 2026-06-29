'use client'

import { useMemo, useState } from 'react'
import { MapPin, Satellite, Thermometer, Trees, Waves } from 'lucide-react'

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

interface GISMapClientProps {
  center: [number, number]
  heatData: HeatDataPoint[]
  selectedLayer: 'lst' | 'ndvi' | 'heatIndex'
  getColor: (value: number, layer: string) => string
  getRadius: (value: number) => number
  fullScreen?: boolean
  onLocationClick?: (point: HeatDataPoint) => void
}

const cityOutlines = [
  'M 50 70 L 78 42 L 108 52 L 142 36 L 182 58 L 220 48 L 260 80 L 292 124 L 282 174 L 302 226 L 268 288 L 218 330 L 164 318 L 116 278 L 90 224 L 62 182 Z',
  'M 318 84 L 358 60 L 398 74 L 430 112 L 418 168 L 444 214 L 420 278 L 372 314 L 326 298 L 304 238 L 322 178 Z',
]

const fallbackHeatData: HeatDataPoint[] = [
  { id: 1, lat: 26.91, lng: 75.78, lst: 42.5, ndvi: 0.28, heatIndex: 48.2, isHotspot: true, timestamp: '2026-06-27T08:30:00.000Z' },
  { id: 2, lat: 26.94, lng: 75.81, lst: 39.1, ndvi: 0.42, heatIndex: 43.5, isHotspot: false, timestamp: '2026-06-27T08:30:00.000Z' },
  { id: 3, lat: 26.88, lng: 75.74, lst: 44.8, ndvi: 0.19, heatIndex: 50.1, isHotspot: true, timestamp: '2026-06-27T08:30:00.000Z' },
  { id: 4, lat: 26.96, lng: 75.72, lst: 36.6, ndvi: 0.55, heatIndex: 40.8, isHotspot: false, timestamp: '2026-06-27T08:30:00.000Z' },
  { id: 5, lat: 26.89, lng: 75.84, lst: 41.4, ndvi: 0.33, heatIndex: 46.0, isHotspot: true, timestamp: '2026-06-27T08:30:00.000Z' },
  { id: 6, lat: 26.93, lng: 75.76, lst: 34.2, ndvi: 0.62, heatIndex: 38.1, isHotspot: false, timestamp: '2026-06-27T08:30:00.000Z' },
]

export default function GISMapClient({
  heatData,
  selectedLayer,
  getColor,
  onLocationClick,
}: GISMapClientProps) {
  const points = heatData.length > 0 ? heatData : fallbackHeatData
  const [selectedPoint, setSelectedPoint] = useState<HeatDataPoint>(points[0])

  const plottedPoints = useMemo(() => {
    const minLat = Math.min(...points.map((point) => point.lat))
    const maxLat = Math.max(...points.map((point) => point.lat))
    const minLng = Math.min(...points.map((point) => point.lng))
    const maxLng = Math.max(...points.map((point) => point.lng))
    const latSpan = Math.max(maxLat - minLat, 0.01)
    const lngSpan = Math.max(maxLng - minLng, 0.01)

    return points.map((point, index) => ({
      ...point,
      x: 70 + ((point.lng - minLng) / lngSpan) * 360 + (index % 2) * 12,
      y: 70 + (1 - (point.lat - minLat) / latSpan) * 260 + (index % 3) * 8,
    }))
  }, [points])

  const metricLabel = selectedLayer === 'lst' ? 'Temperature' : selectedLayer === 'ndvi' ? 'Vegetation' : 'Heat Index'
  const metricValue = selectedLayer === 'ndvi'
    ? selectedPoint.ndvi.toFixed(2)
    : `${selectedPoint[selectedLayer].toFixed(1)}°C`
  const LayerIcon = selectedLayer === 'lst' ? Thermometer : selectedLayer === 'ndvi' ? Trees : Waves

  const handleSelect = (point: HeatDataPoint) => {
    setSelectedPoint(point)
    onLocationClick?.(point)
  }

  return (
    <div className="relative h-full min-h-[520px] overflow-hidden rounded-xl border border-white/10 bg-[#090f1b]">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(31,162,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(31,162,255,0.08)_1px,transparent_1px)] bg-[size:48px_48px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_42%,rgba(31,162,255,0.18),transparent_34%),radial-gradient(circle_at_64%_70%,rgba(255,92,92,0.14),transparent_28%)]" />

      <div className="absolute left-5 top-5 z-10 flex items-center gap-3 rounded-lg border border-white/10 bg-black/30 px-4 py-3 backdrop-blur-md">
        <Satellite className="h-5 w-5 text-primary" />
        <div>
          <p className="text-sm font-semibold text-white">ISRO/NRSC Thermal Layer</p>
          <p className="text-xs text-text-muted">Live simulated LST feed</p>
        </div>
      </div>

      <div className="absolute right-5 top-5 z-10 rounded-lg border border-white/10 bg-black/30 p-4 backdrop-blur-md">
        <p className="mb-3 text-xs uppercase tracking-wide text-text-muted">Selected Area</p>
        <div className="flex items-center gap-3">
          <div className="rounded-lg border border-primary/30 bg-primary/10 p-2">
            <LayerIcon className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-xl font-bold text-white">{metricValue}</p>
            <p className="text-xs text-text-muted">{metricLabel}</p>
          </div>
        </div>
      </div>

      <svg viewBox="0 0 520 400" className="relative z-[1] h-full w-full" role="img" aria-label="Interactive urban heat map">
        <defs>
          <filter id="heatGlow">
            <feGaussianBlur stdDeviation="8" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {cityOutlines.map((path, index) => (
          <path
            key={path}
            d={path}
            fill="rgba(31,162,255,0.04)"
            stroke="rgba(31,162,255,0.22)"
            strokeWidth="2"
            transform={index === 0 ? 'translate(30 8)' : 'translate(-18 0)'}
          />
        ))}

        {plottedPoints.map((point) => {
          const value = point[selectedLayer]
          const color = getColor(value, selectedLayer)
          const isSelected = selectedPoint.id === point.id

          return (
            <g key={point.id} className="cursor-pointer" onClick={() => handleSelect(point)}>
              <circle
                cx={point.x}
                cy={point.y}
                r={isSelected ? 28 : 22}
                fill={color}
                opacity="0.18"
                filter="url(#heatGlow)"
              />
              <circle
                cx={point.x}
                cy={point.y}
                r={isSelected ? 9 : 7}
                fill={color}
                stroke={isSelected ? '#ffffff' : 'rgba(255,255,255,0.7)'}
                strokeWidth={isSelected ? 3 : 2}
              />
              {point.isHotspot && (
                <circle cx={point.x} cy={point.y} r="15" fill="none" stroke="#FF5C5C" strokeWidth="2" opacity="0.8">
                  <animate attributeName="r" values="15;28;15" dur="2.4s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.8;0.1;0.8" dur="2.4s" repeatCount="indefinite" />
                </circle>
              )}
            </g>
          )
        })}
      </svg>

      <div className="absolute bottom-5 left-5 right-5 z-10 grid gap-3 md:grid-cols-3">
        <div className="rounded-lg border border-white/10 bg-black/30 p-3 backdrop-blur-md">
          <p className="text-xs text-text-muted">Active Hotspots</p>
          <p className="text-2xl font-bold text-white">{points.filter((point) => point.isHotspot).length}</p>
        </div>
        <div className="rounded-lg border border-white/10 bg-black/30 p-3 backdrop-blur-md">
          <p className="text-xs text-text-muted">Avg Temperature</p>
          <p className="text-2xl font-bold text-warning">
            {(points.reduce((sum, point) => sum + point.lst, 0) / points.length).toFixed(1)}°C
          </p>
        </div>
        <div className="rounded-lg border border-white/10 bg-black/30 p-3 backdrop-blur-md">
          <p className="text-xs text-text-muted">Risk Status</p>
          <p className="flex items-center gap-2 text-lg font-bold text-danger">
            <MapPin className="h-4 w-4" />
            Critical Watch
          </p>
        </div>
      </div>
    </div>
  )
}
