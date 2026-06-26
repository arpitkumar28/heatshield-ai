'use client'

import { Layers, Eye, EyeOff, Settings, ChevronDown, ChevronRight } from 'lucide-react'
import { useState } from 'react'

interface LayerPanelProps {
  selectedLayer: 'lst' | 'ndvi' | 'heatIndex'
  onLayerChange: (layer: 'lst' | 'ndvi' | 'heatIndex') => void
  selectedTime: string
  onTimeChange: (time: string) => void
}

interface LayerConfig {
  id: string
  name: string
  visible: boolean
  opacity: number
  color: string
  description: string
}

const baseLayers = [
  { id: 'osm', name: 'OpenStreetMap', visible: false, opacity: 100, color: '#888', description: 'Standard street map' },
  { id: 'carto-dark', name: 'Carto Dark', visible: true, opacity: 100, color: '#333', description: 'Dark basemap' },
  { id: 'carto-light', name: 'Carto Light', visible: false, opacity: 100, color: '#eee', description: 'Light basemap' },
  { id: 'satellite', name: 'Satellite', visible: false, opacity: 100, color: '#000', description: 'Satellite imagery' },
  { id: 'terrain', name: 'Terrain', visible: false, opacity: 100, color: '#654321', description: 'Terrain elevation' },
]

const dataLayers = [
  { id: 'lst', name: 'Land Surface Temperature', visible: true, opacity: 80, color: '#ff0000', description: 'Temperature readings' },
  { id: 'ndvi', name: 'Vegetation Index', visible: false, opacity: 70, color: '#00ff00', description: 'NDVI values' },
  { id: 'heat-index', name: 'Heat Index', visible: false, opacity: 75, color: '#ff8800', description: 'Heat stress index' },
  { id: 'population', name: 'Population Density', visible: false, opacity: 60, color: '#0066ff', description: 'Population distribution' },
  { id: 'admin-boundaries', name: 'Administrative Boundaries', visible: false, opacity: 90, color: '#ffffff', description: 'District/Ward boundaries' },
  { id: 'roads', name: 'Road Network', visible: false, opacity: 50, color: '#ffff00', description: 'Major roads' },
  { id: 'water-bodies', name: 'Water Bodies', visible: false, opacity: 80, color: '#00ffff', description: 'Lakes, rivers, ponds' },
  { id: 'hospitals', name: 'Hospitals', visible: false, opacity: 100, color: '#ff00ff', description: 'Healthcare facilities' },
  { id: 'schools', name: 'Schools', visible: false, opacity: 100, color: '#00ff00', description: 'Educational institutions' },
  { id: 'cooling-centers', name: 'Cooling Centers', visible: false, opacity: 100, color: '#00ffff', description: 'Public cooling facilities' },
  { id: 'infrastructure', name: 'Critical Infrastructure', visible: false, opacity: 70, color: '#ff6600', description: 'Essential services' },
]

export default function LayerPanel({ selectedLayer, onLayerChange, selectedTime, onTimeChange }: LayerPanelProps) {
  const [activeTab, setActiveTab] = useState<'base' | 'data'>('data')
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['data']))
  const [layerConfigs, setLayerConfigs] = useState<LayerConfig[]>(dataLayers)

  const toggleSection = (sectionId: string) => {
    const newExpanded = new Set(expandedSections)
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId)
    } else {
      newExpanded.add(sectionId)
    }
    setExpandedSections(newExpanded)
  }

  const toggleLayerVisibility = (layerId: string) => {
    setLayerConfigs(prev => 
      prev.map(layer => 
        layer.id === layerId ? { ...layer, visible: !layer.visible } : layer
      )
    )
  }

  const updateLayerOpacity = (layerId: string, opacity: number) => {
    setLayerConfigs(prev =>
      prev.map(layer =>
        layer.id === layerId ? { ...layer, opacity } : layer
      )
    )
  }

  return (
    <div className="flex flex-col h-full">
      {/* Layer Controls */}
      <div className="p-3 border-b border-white/10">
        <div className="flex items-center gap-2 mb-3">
          <Layers className="w-4 h-4 text-primary" />
          <span className="text-sm font-semibold text-white">Layers</span>
        </div>

        {/* Tab Selector */}
        <div className="flex gap-1 mb-3">
          <button
            onClick={() => setActiveTab('data')}
            className={`flex-1 px-3 py-1.5 rounded text-xs transition-colors ${
              activeTab === 'data'
                ? 'bg-primary text-white'
                : 'bg-white/10 text-text-muted hover:bg-white/20'
            }`}
          >
            Data Layers
          </button>
          <button
            onClick={() => setActiveTab('base')}
            className={`flex-1 px-3 py-1.5 rounded text-xs transition-colors ${
              activeTab === 'base'
                ? 'bg-primary text-white'
                : 'bg-white/10 text-text-muted hover:bg-white/20'
            }`}
          >
            Base Maps
          </button>
        </div>

        {/* Time Controls */}
        <div className="space-y-2">
          <label className="text-xs text-text-muted">Time Period</label>
          <select
            value={selectedTime}
            onChange={(e) => onTimeChange(e.target.value)}
            className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-primary"
          >
            <option value="current">Current</option>
            <option value="-1h">1 Hour Ago</option>
            <option value="-3h">3 Hours Ago</option>
            <option value="-6h">6 Hours Ago</option>
            <option value="-12h">12 Hours Ago</option>
            <option value="-24h">24 Hours Ago</option>
            <option value="-72h">72 Hours Ago</option>
          </select>
        </div>
      </div>

      {/* Layer List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {activeTab === 'data' ? (
          <>
            {/* Analysis Layers */}
            <div className="space-y-1">
              <button
                onClick={() => toggleSection('analysis')}
                className="flex items-center justify-between w-full p-2 hover:bg-white/5 rounded-lg transition-colors"
              >
                <span className="text-xs font-medium text-white">Analysis Layers</span>
                {expandedSections.has('analysis') ? (
                  <ChevronDown className="w-4 h-4 text-text-muted" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-text-muted" />
                )}
              </button>

              {expandedSections.has('analysis') && (
                <div className="pl-2 space-y-1">
                  {['lst', 'ndvi', 'heat-index'].map(layerId => {
                    const layer = layerConfigs.find(l => l.id === layerId)
                    if (!layer) return null
                    return (
                      <div key={layerId} className="p-2 bg-white/5 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => toggleLayerVisibility(layerId)}
                              className="p-1 hover:bg-white/10 rounded transition-colors"
                            >
                              {layer.visible ? (
                                <Eye className="w-3 h-3 text-success" />
                              ) : (
                                <EyeOff className="w-3 h-3 text-text-muted" />
                              )}
                            </button>
                            <span className="text-xs text-white">{layer.name}</span>
                          </div>
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: layer.color }}
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={layer.opacity}
                            onChange={(e) => updateLayerOpacity(layerId, parseInt(e.target.value))}
                            className="flex-1 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer"
                          />
                          <span className="text-xs text-text-muted w-8">{layer.opacity}%</span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>

            {/* Infrastructure Layers */}
            <div className="space-y-1">
              <button
                onClick={() => toggleSection('infrastructure')}
                className="flex items-center justify-between w-full p-2 hover:bg-white/5 rounded-lg transition-colors"
              >
                <span className="text-xs font-medium text-white">Infrastructure</span>
                {expandedSections.has('infrastructure') ? (
                  <ChevronDown className="w-4 h-4 text-text-muted" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-text-muted" />
                )}
              </button>

              {expandedSections.has('infrastructure') && (
                <div className="pl-2 space-y-1">
                  {['admin-boundaries', 'roads', 'water-bodies', 'hospitals', 'schools', 'cooling-centers', 'infrastructure'].map(layerId => {
                    const layer = layerConfigs.find(l => l.id === layerId)
                    if (!layer) return null
                    return (
                      <div key={layerId} className="p-2 bg-white/5 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => toggleLayerVisibility(layerId)}
                              className="p-1 hover:bg-white/10 rounded transition-colors"
                            >
                              {layer.visible ? (
                                <Eye className="w-3 h-3 text-success" />
                              ) : (
                                <EyeOff className="w-3 h-3 text-text-muted" />
                              )}
                            </button>
                            <span className="text-xs text-white">{layer.name}</span>
                          </div>
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: layer.color }}
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={layer.opacity}
                            onChange={(e) => updateLayerOpacity(layerId, parseInt(e.target.value))}
                            className="flex-1 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer"
                          />
                          <span className="text-xs text-text-muted w-8">{layer.opacity}%</span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="space-y-1">
            {baseLayers.map(baseLayer => (
              <div key={baseLayer.id} className="p-2 bg-white/5 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {/* Base layer selection logic */}}
                      className="p-1 hover:bg-white/10 rounded transition-colors"
                    >
                      {baseLayer.visible ? (
                        <Eye className="w-3 h-3 text-success" />
                      ) : (
                        <EyeOff className="w-3 h-3 text-text-muted" />
                      )}
                    </button>
                    <span className="text-xs text-white">{baseLayer.name}</span>
                  </div>
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: baseLayer.color }}
                  />
                </div>
                <p className="text-xs text-text-muted">{baseLayer.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Layer Settings */}
      <div className="p-3 border-t border-white/10">
        <button className="flex items-center gap-2 w-full p-2 hover:bg-white/5 rounded-lg transition-colors">
          <Settings className="w-4 h-4 text-text-muted" />
          <span className="text-xs text-text-muted">Layer Settings</span>
        </button>
      </div>
    </div>
  )
}