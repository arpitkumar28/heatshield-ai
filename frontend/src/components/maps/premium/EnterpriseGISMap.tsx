'use client'

import { MapContainer, TileLayer, CircleMarker, Popup, LayersControl, useMap, WMSTileLayer } from 'react-leaflet'
import L from 'leaflet'
import { useEffect, useRef, useState } from 'react'
import { Satellite, MapPin, Thermometer, Leaf, Activity, Maximize2, Minimize2, Download, Share2 } from 'lucide-react'

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

interface EnterpriseGISMapProps {
  center: [number, number]
  heatData: HeatDataPoint[]
  selectedLayer: 'lst' | 'ndvi' | 'heatIndex'
  getColor: (value: number, layer: string) => string
  getRadius: (value: number) => number
  onExport?: () => void
  onShare?: () => void
}

// Global icon initialization
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

// Map controller for smooth center updates
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

// Enterprise-grade markers with enhanced popups
function EnterpriseMarkers({ 
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
          <Popup className="enterprise-popup">
            <div className="min-w-[200px]">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-sm">Location #{point.id}</h3>
                {point.isHotspot && (
                  <span className="px-2 py-0.5 bg-danger/20 text-danger text-xs rounded-full border border-danger/30">
                    Hotspot
                  </span>
                )}
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-text-muted">LST:</span>
                  <span className="font-semibold">{point.lst.toFixed(1)}°C</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-muted">NDVI:</span>
                  <span className="font-semibold">{point.ndvi.toFixed(3)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-muted">Heat Index:</span>
                  <span className="font-semibold">{point.heatIndex.toFixed(1)}°C</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-muted">Time:</span>
                  <span className="font-semibold">{new Date(point.timestamp).toLocaleTimeString()}</span>
                </div>
              </div>
              <div className="mt-3 pt-2 border-t border-white/10">
                <button className="w-full bg-primary/20 hover:bg-primary/30 text-primary text-xs py-1.5 rounded transition-colors">
                  View Details
                </button>
              </div>
            </div>
          </Popup>
        </CircleMarker>
      ))}
    </>
  )
}

// Satellite overlay component
function SatelliteOverlay({ visible }: { visible: boolean }) {
  if (!visible) return null
  
  return (
    <WMSTileLayer
      url="https://earthengine.googleapis.com/v1/projects/earthengine-legacy/assets/projects/landsat/wms"
      layers="Landsat"
      format="image/png"
      transparent={true}
      attribution="ISRO/NRSC Satellite Data"
      opacity={0.6}
    />
  )
}

export default function EnterpriseGISMap({
  center,
  heatData,
  selectedLayer,
  getColor,
  getRadius,
  onExport,
  onShare
}: EnterpriseGISMapProps) {
  const mapRef = useRef<L.Map | null>(null)
  const [showSatellite, setShowSatellite] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)

  useEffect(() => {
    initializeIcons()
  }, [])

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
    if (mapRef.current) {
      if (!isFullscreen) {
        mapRef.current.getContainer().requestFullscreen()
      } else {
        document.exitFullscreen()
      }
    }
  }

  return (
    <div className="relative h-full w-full">
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
          {/* Base Layers */}
          <LayersControl.BaseLayer checked name="Dark Mode">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="Light Mode">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="Satellite">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            />
          </LayersControl.BaseLayer>

          {/* Overlay Layers */}
          <LayersControl.Overlay checked name="ISRO Satellite Data">
            <SatelliteOverlay visible={showSatellite} />
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Heat Data">
            <EnterpriseMarkers 
              heatData={heatData}
              selectedLayer={selectedLayer}
              getColor={getColor}
              getRadius={getRadius}
            />
          </LayersControl.Overlay>
        </LayersControl>
      </MapContainer>

      {/* Enterprise Map Controls */}
      <div className="absolute top-4 left-4 z-[1000] flex flex-col gap-2">
        <div className="glass-card rounded-lg p-2 border border-white/10">
          <div className="flex flex-col gap-1">
            <button
              onClick={() => setShowSatellite(!showSatellite)}
              className={`p-2 rounded-lg transition-colors ${
                showSatellite ? 'bg-primary/20 text-primary' : 'bg-white/10 text-text-muted hover:bg-white/20'
              }`}
              title="Toggle Satellite Overlay"
            >
              <Satellite className="w-4 h-4" />
            </button>
            <button
              onClick={toggleFullscreen}
              className="p-2 rounded-lg bg-white/10 text-text-muted hover:bg-white/20 transition-colors"
              title="Toggle Fullscreen"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
            {onExport && (
              <button
                onClick={onExport}
                className="p-2 rounded-lg bg-white/10 text-text-muted hover:bg-white/20 transition-colors"
                title="Export Map"
              >
                <Download className="w-4 h-4" />
              </button>
            )}
            {onShare && (
              <button
                onClick={onShare}
                className="p-2 rounded-lg bg-white/10 text-text-muted hover:bg-white/20 transition-colors"
                title="Share Map"
              >
                <Share2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Layer Indicator */}
      <div className="absolute bottom-4 left-4 z-[1000]">
        <div className="glass-card rounded-lg px-3 py-2 border border-white/10">
          <div className="flex items-center gap-2 text-xs">
            {selectedLayer === 'lst' && <Thermometer className="w-4 h-4 text-danger" />}
            {selectedLayer === 'ndvi' && <Leaf className="w-4 h-4 text-success" />}
            {selectedLayer === 'heatIndex' && <Activity className="w-4 h-4 text-warning" />}
            <span className="text-text-muted font-display">
              {selectedLayer === 'lst' ? 'Land Surface Temperature' : 
               selectedLayer === 'ndvi' ? 'Vegetation Index' : 'Heat Index'}
            </span>
          </div>
        </div>
      </div>

      {/* Data Points Counter */}
      <div className="absolute bottom-4 right-4 z-[1000]">
        <div className="glass-card rounded-lg px-3 py-2 border border-white/10">
          <div className="flex items-center gap-2 text-xs">
            <MapPin className="w-4 h-4 text-primary" />
            <span className="text-text-muted font-display">
              {heatData.length} Data Points
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
