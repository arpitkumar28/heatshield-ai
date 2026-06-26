'use client'

import { MapContainer, TileLayer, CircleMarker, Popup, LayersControl, useMap } from 'react-leaflet'
import L from 'leaflet'
import { useEffect, useRef } from 'react'

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
}

// Global icon initialization - runs once per module load
let iconsInitialized = false
function initializeIcons() {
  if (!iconsInitialized) {
    try {
      delete (L.Icon.Default.prototype as { _getIconUrl?: unknown })._getIconUrl
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      })
      iconsInitialized = true
    } catch (error) {
      console.error('Error initializing Leaflet icons:', error)
    }
  }
}

// Component to handle map center updates without remounting
function MapController({ center }: { center: [number, number] }) {
  const map = useMap()
  
  useEffect(() => {
    try {
      map.setView(center, 12, {
        animate: true,
        duration: 0.5
      })
    } catch (error) {
      console.error('Error updating map view:', error)
    }
  }, [center, map])
  
  return null
}

// Component to render markers with stable keys
function MapMarkers({ 
  heatData, 
  selectedLayer, 
  getColor, 
  getRadius 
}: { 
  heatData: HeatDataPoint[]
  selectedLayer: 'lst' | 'ndvi' | 'heatIndex'
  getColor: (value: number, layer: string) => string
  getRadius: (value: number) => number
}) {
  return (
    <>
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
    </>
  )
}

export default function LeafletMapClient({
  center,
  heatData,
  selectedLayer,
  getColor,
  getRadius
}: LeafletMapClientProps) {
  const mapRef = useRef<L.Map | null>(null)

  // Initialize icons once when component mounts
  useEffect(() => {
    initializeIcons()
  }, [])

  return (
    <MapContainer
      center={center}
      zoom={12}
      style={{ height: '100%', width: '100%' }}
      ref={(map) => {
        if (map) {
          mapRef.current = map
        }
      }}
    >
      <MapController center={center} />
      <LayersControl position="topright">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        <MapMarkers 
          heatData={heatData}
          selectedLayer={selectedLayer}
          getColor={getColor}
          getRadius={getRadius}
        />
      </LayersControl>
    </MapContainer>
  )
}