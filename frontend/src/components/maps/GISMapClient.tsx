'use client'

import { MapContainer, TileLayer, CircleMarker, Popup, useMap, useMapEvents } from 'react-leaflet'
import L from 'leaflet'
import { useEffect, useRef, useCallback, useState } from 'react'

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

// Initialize Leaflet icons once with proper error handling and StrictMode support
function initializeIcons() {
  if (typeof window === 'undefined') return false
  
  try {
    // Check if icons are already properly configured
    const defaultIcon = L.Icon.Default.prototype
    if (defaultIcon._getIconUrl && defaultIcon._getIconUrl()) {
      return true // Already initialized
    }
    
    delete (L.Icon.Default.prototype as { _getIconUrl?: unknown })._getIconUrl
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
    })
    return true
  } catch (error) {
    console.error('Error initializing Leaflet icons:', error)
    return false
  }
}

// Map controller for smooth center updates without remounting
function MapController({ center }: { center: [number, number] }) {
  const map = useMap()
  const prevCenterRef = useRef<[number, number] | null>(null)
  const isInitializedRef = useRef(false)
  
  useEffect(() => {
    // Skip first render to avoid initial animation
    if (!isInitializedRef.current) {
      isInitializedRef.current = true
      prevCenterRef.current = center
      return
    }
    
    // Only update if center actually changed
    if (prevCenterRef.current && 
        prevCenterRef.current[0] === center[0] && 
        prevCenterRef.current[1] === center[1]) {
      return
    }
    
    try {
      map.setView(center, 12, {
        animate: true,
        duration: 0.5
      })
      prevCenterRef.current = center
    } catch (error) {
      console.error('Error updating map view:', error)
    }
  }, [center, map])
  
  return null
}

// Map resize handler
function MapResizeHandler() {
  const map = useMap()
  
  useEffect(() => {
    const handleResize = () => {
      try {
        map.invalidateSize()
      } catch (error) {
        console.error('Error resizing map:', error)
      }
    }
    
    window.addEventListener('resize', handleResize)
    // Initial size validation
    handleResize()
    
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [map])
  
  return null
}

// Memoized marker component to prevent unnecessary re-renders
function MapMarkers({ 
  heatData, 
  selectedLayer, 
  getColor, 
  getRadius,
  onLocationClick
}: { 
  heatData: HeatDataPoint[]
  selectedLayer: 'lst' | 'ndvi' | 'heatIndex'
  getColor: (value: number, layer: string) => string
  getRadius: (value: number) => number
  onLocationClick?: (point: HeatDataPoint) => void
}) {
  const handleClick = useCallback((point: HeatDataPoint) => {
    if (onLocationClick) {
      onLocationClick(point)
    }
  }, [onLocationClick])
  
  // Use useMemo-like optimization with stable keys
  const markerKey = useCallback((point: HeatDataPoint) => {
    return `marker-${point.id}-${selectedLayer}`
  }, [selectedLayer])
  
  return (
    <>
      {heatData.map((point) => (
        <CircleMarker
          key={markerKey(point)}
          center={[point.lat, point.lng]}
          radius={getRadius(point[selectedLayer])}
          fillColor={getColor(point[selectedLayer], selectedLayer)}
          color={point.isHotspot ? '#FF6B35' : '#00D4FF'}
          weight={point.isHotspot ? 3 : 1}
          opacity={0.7}
          fillOpacity={0.5}
          eventHandlers={{
            click: () => handleClick(point)
          }}
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

export default function GISMapClient({
  center,
  heatData,
  selectedLayer,
  getColor,
  getRadius,
  onLocationClick
}: GISMapClientProps) {
  const mapRef = useRef<L.Map | null>(null)
  const [isClient, setIsClient] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Client-side mounting check
  useEffect(() => {
    setIsClient(true)
    initializeIcons()
  }, [])

  // Cleanup map instance on unmount
  useEffect(() => {
    return () => {
      if (mapRef.current) {
        try {
          mapRef.current.remove()
          mapRef.current = null
        } catch (error) {
          console.error('Error cleaning up map:', error)
        }
      }
    }
  }, [])

  // Handle container cleanup
  useEffect(() => {
    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = ''
      }
    }
  }, [])

  if (!isClient) {
    return (
      <div className="flex items-center justify-center h-full bg-white/5 rounded-lg">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div ref={containerRef} className="h-full w-full">
      <MapContainer
        center={center}
        zoom={12}
        style={{ height: '100%', width: '100%' }}
        ref={(map) => {
          if (map && !mapRef.current) {
            mapRef.current = map
          }
        }}
      >
        <MapController center={center} />
        <MapResizeHandler />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        <MapMarkers 
          heatData={heatData}
          selectedLayer={selectedLayer}
          getColor={getColor}
          getRadius={getRadius}
          onLocationClick={onLocationClick}
        />
      </MapContainer>
    </div>
  )
}
