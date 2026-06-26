'use client'

import { motion } from 'framer-motion'
import { Map, Layers, ZoomIn, ZoomOut, Maximize2, Compass, Satellite, Wind, Droplets, Users, Thermometer, Building, GraduationCap } from 'lucide-react'
import { PremiumCard } from '@/components/ui/premium'
import { useState } from 'react'

const mapLayers = [
  { id: 'heat', label: 'Heat Layer', icon: Thermometer, active: true },
  { id: 'satellite', label: 'Satellite', icon: Satellite, active: false },
  { id: 'population', label: 'Population', icon: Users, active: false },
  { id: 'humidity', label: 'Humidity', icon: Droplets, active: false },
  { id: 'wind', label: 'Wind', icon: Wind, active: false },
  { id: 'hospitals', label: 'Hospitals', icon: Building, active: false },
  { id: 'schools', label: 'Schools', icon: GraduationCap, active: false },
]

const mapControls = [
  { id: 'zoom-in', label: 'Zoom In', icon: ZoomIn },
  { id: 'zoom-out', label: 'Zoom Out', icon: ZoomOut },
  { id: 'fullscreen', label: 'Fullscreen', icon: Maximize2 },
  { id: 'compass', label: 'North', icon: Compass },
]

export default function PremiumGISMap() {
  const [activeLayer, setActiveLayer] = useState('heat')

  return (
    <PremiumCard variant="glass" padding="none" className="h-full">
      <div className="relative h-full min-h-[600px] bg-gradient-to-br from-background-dark to-background">
        {/* Map grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />

        {/* Map controls */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          {mapControls.map((control) => (
            <motion.button
              key={control.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-lg glass-card border border-white/10 hover:border-primary/30 transition-colors"
              title={control.label}
            >
              <control.icon className="w-4 h-4 text-text-muted" />
            </motion.button>
          ))}
        </div>

        {/* Layer control */}
        <div className="absolute top-4 left-4 glass-card rounded-xl p-4 border border-white/10">
          <div className="flex items-center gap-2 mb-3">
            <Layers className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-white">Layers</span>
          </div>
          <div className="space-y-2">
            {mapLayers.map((layer) => (
              <button
                key={layer.id}
                onClick={() => setActiveLayer(layer.id)}
                className={`flex items-center gap-2 w-full px-3 py-2 rounded-lg transition-colors ${
                  activeLayer === layer.id
                    ? 'bg-primary/20 text-primary border border-primary/30'
                    : 'text-text-muted hover:bg-white/5'
                }`}
              >
                <layer.icon className="w-4 h-4" />
                <span className="text-xs">{layer.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 glass-card rounded-xl p-4 border border-white/10">
          <div className="text-xs font-semibold text-white mb-3">Heat Intensity</div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-32 h-2 rounded-full heat-gradient" />
          </div>
          <div className="flex justify-between text-xs text-text-muted">
            <span>Low (25°C)</span>
            <span>Critical (45°C+)</span>
          </div>
        </div>

        {/* Time slider */}
        <div className="absolute bottom-4 right-4 glass-card rounded-xl p-4 border border-white/10 w-64">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-white">Timeline</span>
            <span className="text-xs text-text-muted">Live</span>
          </div>
          <div className="relative">
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <div className="absolute left-0 top-0 h-full w-3/4 bg-gradient-to-r from-primary to-secondary rounded-full" />
            </div>
            <div className="absolute left-3/4 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg cursor-pointer" />
          </div>
          <div className="flex justify-between text-xs text-text-muted mt-2">
            <span>00:00</span>
            <span>12:00</span>
            <span>23:59</span>
          </div>
        </div>

        {/* Map content placeholder */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center space-y-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-32 h-32 rounded-full border-2 border-primary/30 flex items-center justify-center"
            >
              <Map className="w-16 h-16 text-primary/50" />
            </motion.div>
            <div className="text-text-muted">
              <div className="text-sm">Interactive GIS Map</div>
              <div className="text-xs text-text-secondary">Loading map data...</div>
            </div>
          </div>
        </div>

        {/* Hotspots */}
        {[
          { x: 25, y: 35, temp: 46, risk: 'critical' },
          { x: 45, y: 25, temp: 44, risk: 'high' },
          { x: 65, y: 45, temp: 42, risk: 'medium' },
          { x: 35, y: 55, temp: 40, risk: 'medium' },
          { x: 55, y: 65, temp: 38, risk: 'low' },
        ].map((hotspot, index) => (
          <motion.button
            key={index}
            className="absolute cursor-pointer group"
            style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.div
              animate={{ scale: [1, 1.5, 1], opacity: [0.6, 0, 0.6] }}
              transition={{ duration: 2, repeat: Infinity }}
              className={`absolute inset-0 rounded-full ${
                hotspot.risk === 'critical' ? 'bg-heat-red' :
                hotspot.risk === 'high' ? 'bg-heat-orange' :
                hotspot.risk === 'medium' ? 'bg-heat-yellow' : 'bg-heat-green'
              } blur-sm`}
            />
            <div className={`relative w-4 h-4 rounded-full ${
              hotspot.risk === 'critical' ? 'bg-heat-red' :
              hotspot.risk === 'high' ? 'bg-heat-orange' :
              hotspot.risk === 'medium' ? 'bg-heat-yellow' : 'bg-heat-green'
            } border-2 border-white/30`} />
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 glass-card rounded-lg px-2 py-1 border border-white/10 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              <div className="text-xs font-semibold text-white">{hotspot.temp}°C</div>
            </div>
          </motion.button>
        ))}
      </div>
    </PremiumCard>
  )
}
