'use client'

import { useState } from 'react'
import { Layers, Search, Clock, MapPin, Activity, AlertTriangle, Info, X } from 'lucide-react'
import GISMap from '@/components/maps/GISMap'
import { MapErrorBoundary } from '@/components/maps/MapErrorBoundary'
import LayerPanel from './LayerPanel'
import SearchPanel from './SearchPanel'
import InsightsPanel from './InsightsPanel'
import TimelinePanel from './TimelinePanel'

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

interface GISWorkspaceProps {
  center: [number, number]
  heatData: HeatDataPoint[]
  selectedCity: string
  onCityChange: (city: string) => void
}

export default function GISWorkspace({ center, heatData, selectedCity, onCityChange }: GISWorkspaceProps) {
  const [selectedLayer, setSelectedLayer] = useState<'lst' | 'ndvi' | 'heatIndex'>('lst')
  const [selectedTime, setSelectedTime] = useState('current')
  const [selectedLocation, setSelectedLocation] = useState<HeatDataPoint | null>(null)
  const [leftPanelOpen, setLeftPanelOpen] = useState(true)
  const [rightPanelOpen, setRightPanelOpen] = useState(true)
  const [bottomPanelOpen, setBottomPanelOpen] = useState(true)

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

  const handleLocationClick = (point: HeatDataPoint) => {
    setSelectedLocation(point)
    setRightPanelOpen(true)
  }

  return (
    <div className="h-screen w-full flex flex-col bg-background">
      {/* Top Bar */}
      <div className="h-14 bg-surface border-b border-white/10 flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-secondary">
            <MapPin className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-display font-bold text-white">GIS Command Center</h1>
            <p className="text-xs text-text-muted">Enterprise Heat Intelligence Platform</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-success/10 border border-success/30">
            <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
            <span className="text-xs font-medium text-success">Live</span>
          </div>
          <div className="text-xs text-text-muted">
            {selectedCity} • {new Date().toLocaleTimeString()}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel */}
        <div className={`${leftPanelOpen ? 'w-80' : 'w-0'} transition-all duration-300 border-r border-white/10 bg-surface/50 flex flex-col`}>
          {leftPanelOpen && (
            <>
              <div className="flex items-center justify-between p-3 border-b border-white/10">
                <h2 className="text-sm font-semibold text-white flex items-center gap-2">
                  <Layers className="w-4 h-4" />
                  Controls
                </h2>
                <button
                  onClick={() => setLeftPanelOpen(false)}
                  className="p-1 hover:bg-white/10 rounded text-text-muted hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto">
                <SearchPanel
                  selectedCity={selectedCity}
                  onCityChange={onCityChange}
                />
                <LayerPanel
                  selectedLayer={selectedLayer}
                  onLayerChange={setSelectedLayer}
                  selectedTime={selectedTime}
                  onTimeChange={setSelectedTime}
                />
              </div>
            </>
          )}
        </div>

        {/* Center - Map */}
        <div className="flex-1 relative">
          <MapErrorBoundary>
            <GISMap
              center={center}
              heatData={heatData}
              selectedLayer={selectedLayer}
              getColor={getColor}
              getRadius={getRadius}
              onLocationClick={handleLocationClick}
            />
          </MapErrorBoundary>

          {/* Left Panel Toggle */}
          <button
            onClick={() => setLeftPanelOpen(!leftPanelOpen)}
            className="absolute left-4 top-4 z-[1000] p-2 glass-card rounded-lg border border-white/10 text-text-muted hover:text-white transition-colors"
          >
            <Layers className="w-5 h-5" />
          </button>

          {/* Right Panel Toggle */}
          <button
            onClick={() => setRightPanelOpen(!rightPanelOpen)}
            className="absolute right-4 top-4 z-[1000] p-2 glass-card rounded-lg border border-white/10 text-text-muted hover:text-white transition-colors"
          >
            <Info className="w-5 h-5" />
          </button>

          {/* Bottom Panel Toggle */}
          <button
            onClick={() => setBottomPanelOpen(!bottomPanelOpen)}
            className="absolute right-4 bottom-4 z-[1000] p-2 glass-card rounded-lg border border-white/10 text-text-muted hover:text-white transition-colors"
          >
            <Clock className="w-5 h-5" />
          </button>
        </div>

        {/* Right Panel */}
        <div className={`${rightPanelOpen ? 'w-96' : 'w-0'} transition-all duration-300 border-l border-white/10 bg-surface/50 flex flex-col`}>
          {rightPanelOpen && (
            <>
              <div className="flex items-center justify-between p-3 border-b border-white/10">
                <h2 className="text-sm font-semibold text-white flex items-center gap-2">
                  <Activity className="w-4 h-4" />
                  Insights
                </h2>
                <button
                  onClick={() => setRightPanelOpen(false)}
                  className="p-1 hover:bg-white/10 rounded text-text-muted hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto">
                <InsightsPanel
                  selectedLocation={selectedLocation}
                  selectedLayer={selectedLayer}
                />
              </div>
            </>
          )}
        </div>
      </div>

      {/* Bottom Panel */}
      <div className={`${bottomPanelOpen ? 'h-48' : 'h-0'} transition-all duration-300 border-t border-white/10 bg-surface/50`}>
        {bottomPanelOpen && (
          <TimelinePanel
            selectedTime={selectedTime}
            onTimeChange={setSelectedTime}
          />
        )}
      </div>
    </div>
  )
}
