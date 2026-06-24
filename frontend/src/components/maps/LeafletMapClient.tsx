'use client'

import { MapContainer, TileLayer, CircleMarker, Popup, LayersControl } from 'react-leaflet'
import L from 'leaflet'
import { useEffect } from 'react'

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

interface LeafletMapClientProps {
  center: [number, number]
  heatData: HeatDataPoint[]
  selectedLayer: 'lst' | 'ndvi' | 'heatIndex'
  getColor: (value: number, layer: string) => string
  getRadius: (value: number) => number
  fullScreen?: boolean
}

export default function LeafletMapClient({
  center,
  heatData,
  selectedLayer,
  getColor,
  getRadius,
  fullScreen = false
}: LeafletMapClientProps) {
  useEffect(() => {
    // Fix for default marker icons - run only on client
    delete (L.Icon.Default.prototype as any)._getIconUrl
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    })
  }, [])

  return (
    <MapContainer
      center={center}
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
            color={point.isHotspot ? '#FF6B35' : '#00D4FF'}
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
                <p>Time: {new Date(point.timestamp).toLocaleTimeString()}</p>
                {point.isHotspot && (
                  <p className="text-red-600 font-bold mt-2">⚠️ Heat Hotspot</p>
                )}
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </LayersControl>
    </MapContainer>
  )
}