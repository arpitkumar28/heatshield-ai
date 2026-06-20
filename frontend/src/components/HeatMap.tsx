'use client'

import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, CircleMarker, Popup, LayersControl } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { Thermometer, Droplets, Leaf, Activity } from 'lucide-react'

// Fix for default marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

interface HeatDataPoint {
  id: number
  lat: number
  lng: number
  lst: number
  ndvi: number
  heatIndex: number
  isHotspot: boolean
}

export default function HeatMap() {
  const [heatData, setHeatData] = useState<HeatDataPoint[]>([])
  const [selectedLayer, setSelectedLayer] = useState<'lst' | 'ndvi' | 'heatIndex'>('lst')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate fetching heat data
    const mockData: HeatDataPoint[] = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      lat: 28.6 + Math.random() * 0.1,
      lng: 77.2 + Math.random() * 0.1,
      lst: 30 + Math.random() * 15,
      ndvi: Math.random() * 0.8,
      heatIndex: 35 + Math.random() * 20,
      isHotspot: Math.random() > 0.7
    }))
    setHeatData(mockData)
    setLoading(false)
  }, [])

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

  const getRadius = (value: number) => {
    return 500 + (value * 20)
  }

  if (loading) {
    return (
      <div className="glass rounded-xl p-8 flex items-center justify-center h-[600px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-isro-orange mx-auto mb-4"></div>
          <p className="text-gray-400">Loading heat map data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          icon={<Thermometer className="w-6 h-6" />}
          title="Avg LST"
          value="38.5°C"
          change="+2.3°C"
          color="isro-orange"
        />
        <StatCard
          icon={<Activity className="w-6 h-6" />}
          title="Heat Index"
          value="42.1°C"
          change="+1.8°C"
          color="red"
        />
        <StatCard
          icon={<Leaf className="w-6 h-6" />}
          title="Avg NDVI"
          value="0.45"
          change="-0.05"
          color="green"
        />
        <StatCard
          icon={<Droplets className="w-6 h-6" />}
          title="Hotspots"
          value="12"
          change="+3"
          color="isro-accent"
        />
      </div>

      {/* Map Controls */}
      <div className="glass rounded-xl p-4">
        <div className="flex flex-wrap gap-2 mb-4">
          <button
            onClick={() => setSelectedLayer('lst')}
            className={`px-4 py-2 rounded-lg transition-all ${
              selectedLayer === 'lst'
                ? 'bg-isro-orange text-white'
                : 'bg-white/10 hover:bg-white/20'
            }`}
          >
            Land Surface Temperature
          </button>
          <button
            onClick={() => setSelectedLayer('ndvi')}
            className={`px-4 py-2 rounded-lg transition-all ${
              selectedLayer === 'ndvi'
                ? 'bg-isro-orange text-white'
                : 'bg-white/10 hover:bg-white/20'
            }`}
          >
            NDVI (Vegetation)
          </button>
          <button
            onClick={() => setSelectedLayer('heatIndex')}
            className={`px-4 py-2 rounded-lg transition-all ${
              selectedLayer === 'heatIndex'
                ? 'bg-isro-orange text-white'
                : 'bg-white/10 hover:bg-white/20'
            }`}
          >
            Heat Index
          </button>
        </div>

        {/* Map */}
        <div className="h-[500px] rounded-lg overflow-hidden border border-isro-blue/30">
          <MapContainer
            center={[28.6139, 77.2090]}
            zoom={12}
            style={{ height: '100%', width: '100%' }}
          >
            <LayersControl position="topright">
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              />
              
              {heatData.map((point) => (
                <CircleMarker
                  key={point.id}
                  center={[point.lat, point.lng]}
                  radius={getRadius(point[selectedLayer])}
                  fillColor={getColor(point[selectedLayer], selectedLayer)}
                  color={point.isHotspot ? '#FF6B35' : '#0066CC'}
                  weight={point.isHotspot ? 3 : 1}
                  opacity={0.7}
                  fillOpacity={0.5}
                >
                  <Popup>
                    <div className="text-black">
                      <h3 className="font-bold mb-2">Location Details</h3>
                      <p>LST: {point.lst.toFixed(1)}°C</p>
                      <p>NDVI: {point.ndvi.toFixed(3)}</p>
                      <p>Heat Index: {point.heatIndex.toFixed(1)}°C</p>
                      {point.isHotspot && (
                        <p className="text-red-600 font-bold mt-2">⚠️ Heat Hotspot</p>
                      )}
                    </div>
                  </Popup>
                </CircleMarker>
              ))}
            </LayersControl>
          </MapContainer>
        </div>
      </div>

      {/* Legend */}
      <div className="glass rounded-xl p-4">
        <h3 className="font-semibold mb-3">Legend</h3>
        <div className="flex flex-wrap gap-4">
          <LegendItem color="#00ff00" label="Low" />
          <LegendItem color="#ffff00" label="Moderate" />
          <LegendItem color="#ff8800" label="High" />
          <LegendItem color="#ff0000" label="Extreme" />
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-full bg-isro-orange border-2 border-isro-orange"></div>
            <span className="text-sm text-gray-400">Hotspot</span>
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
