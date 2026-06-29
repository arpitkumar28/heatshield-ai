'use client'

import { motion } from 'framer-motion'
import { MapPin, Navigation, Activity, Thermometer, AlertTriangle } from 'lucide-react'
import { PremiumCard } from '@/components/ui/premium'
import { useState } from 'react'

const cityHotspots = [
  { name: 'Delhi', temp: 46, risk: 'critical', population: '32.9M', coordinates: { x: 35, y: 25 } },
  { name: 'Mumbai', temp: 38, risk: 'high', population: '21.6M', coordinates: { x: 25, y: 55 } },
  { name: 'Chennai', temp: 42, risk: 'high', population: '11.9M', coordinates: { x: 40, y: 75 } },
  { name: 'Kolkata', temp: 40, risk: 'medium', population: '15.4M', coordinates: { x: 65, y: 40 } },
  { name: 'Hyderabad', temp: 44, risk: 'high', population: '10.5M', coordinates: { x: 35, y: 60 } },
  { name: 'Ahmedabad', temp: 45, risk: 'critical', population: '8.6M', coordinates: { x: 20, y: 35 } },
  { name: 'Pune', temp: 41, risk: 'medium', population: '6.8M', coordinates: { x: 22, y: 52 } },
  { name: 'Jaipur', temp: 47, risk: 'critical', population: '4.2M', coordinates: { x: 28, y: 30 } },
  { name: 'Lucknow', temp: 43, risk: 'high', population: '3.8M', coordinates: { x: 45, y: 28 } },
  { name: 'Bengaluru', temp: 39, risk: 'medium', population: '13.2M', coordinates: { x: 32, y: 65 } },
]

export default function PremiumInteractiveIndiaMap() {
  const [selectedCity, setSelectedCity] = useState<typeof cityHotspots[0] | null>(null)

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'critical': return 'bg-danger'
      case 'high': return 'bg-orange'
      case 'medium': return 'bg-warning'
      default: return 'bg-success'
    }
  }

  const getRiskBorderColor = (risk: string) => {
    switch (risk) {
      case 'critical': return 'border-danger'
      case 'high': return 'border-orange'
      case 'medium': return 'border-warning'
      default: return 'border-success'
    }
  }

  return (
    <section className="relative py-32 bg-background overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-surface to-background" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(31,162,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(31,162,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px]" />

      <div className="relative z-10 w-full max-w-full mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-primary/30 mb-6"
          >
            <MapPin className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Live Monitoring</span>
          </motion.div>
          
          <h2 className="font-display text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-white">India Heat</span>
            <span className="text-gradient-warm"> Map</span>
          </h2>
          
          <p className="text-xl text-text-muted max-w-3xl mx-auto">
            Real-time heat monitoring across Indian cities. Click on hotspots to view detailed analysis and risk assessment.
          </p>
        </motion.div>

        {/* Interactive map */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Map visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-2"
          >
            <PremiumCard variant="glass" padding="none" className="overflow-hidden">
              <div className="relative min-h-[500px] bg-gradient-to-br from-background-dark to-background">
                {/* Grid overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:50px_50px]" />
                
                {/* India map silhouette */}
                <svg
                  viewBox="0 0 400 450"
                  className="w-full h-full opacity-20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                >
                  <path
                    d="M200 50 L250 80 L280 120 L300 180 L320 250 L300 320 L250 380 L200 420 L150 380 L100 320 L80 250 L100 180 L120 120 L150 80 Z"
                    stroke="currentColor"
                    className="text-primary/50"
                  />
                </svg>

                {/* City hotspots */}
                {cityHotspots.map((city) => (
                  <motion.button
                    key={city.name}
                    onClick={() => setSelectedCity(city)}
                    className={`absolute group cursor-pointer`}
                    style={{
                      left: `${city.coordinates.x}%`,
                      top: `${city.coordinates.y}%`,
                    }}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {/* Pulse effect */}
                    <motion.div
                      animate={{ scale: [1, 1.5, 1], opacity: [0.6, 0, 0.6] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className={`absolute inset-0 rounded-full ${getRiskColor(city.risk)} blur-sm`}
                    />
                    
                    {/* Main dot */}
                    <div className={`relative w-4 h-4 rounded-full ${getRiskColor(city.risk)} border-2 border-white/30 shadow-lg`} />
                    
                    {/* Tooltip */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileHover={{ opacity: 1, y: 0 }}
                      className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 glass-card rounded-lg px-3 py-2 border border-white/10 whitespace-nowrap pointer-events-none"
                    >
                      <div className="text-sm font-semibold text-white">{city.name}</div>
                      <div className="text-xs text-text-muted">{city.temp}°C</div>
                    </motion.div>
                  </motion.button>
                ))}

                {/* Legend */}
                <div className="absolute bottom-4 left-4 glass-card rounded-lg p-4 border border-white/10">
                  <div className="text-xs text-text-muted mb-2">Risk Level</div>
                  <div className="space-y-2">
                    {['critical', 'high', 'medium'].map((risk) => (
                      <div key={risk} className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${getRiskColor(risk)}`} />
                        <span className="text-xs text-text-muted capitalize">{risk}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Stats overlay */}
                <div className="absolute top-4 right-4 glass-card rounded-lg p-4 border border-white/10">
                  <div className="text-xs text-text-muted mb-2">Live Statistics</div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-xs text-text-muted">Active Hotspots</span>
                      <span className="text-sm font-semibold text-white">2,847</span>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-xs text-text-muted">Critical Areas</span>
                      <span className="text-sm font-semibold text-danger">147</span>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-xs text-text-muted">Avg Temperature</span>
                      <span className="text-sm font-semibold text-orange">41.2°C</span>
                    </div>
                  </div>
                </div>
              </div>
            </PremiumCard>
          </motion.div>

          {/* City details panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <PremiumCard variant="glass" padding="lg" className="h-full">
              {selectedCity ? (
                <div className="space-y-6">
                  {/* City header */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="w-5 h-5 text-primary" />
                      <h3 className="font-display text-2xl font-bold text-white">{selectedCity.name}</h3>
                    </div>
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${getRiskColor(selectedCity.risk)}/20 border ${getRiskBorderColor(selectedCity.risk)}/30`}>
                      <AlertTriangle className={`w-4 h-4 ${selectedCity.risk === 'critical' ? 'text-danger' : selectedCity.risk === 'high' ? 'text-orange' : 'text-warning'}`} />
                      <span className="text-sm font-semibold capitalize">{selectedCity.risk} Risk</span>
                    </div>
                  </div>

                  {/* Temperature */}
                  <div className="glass-card rounded-lg p-4 border border-white/10">
                    <div className="flex items-center gap-3 mb-2">
                      <Thermometer className="w-5 h-5 text-orange" />
                      <span className="text-sm text-text-muted">Current Temperature</span>
                    </div>
                    <div className="font-display text-4xl font-bold text-white">{selectedCity.temp}°C</div>
                    <div className="text-sm text-orange mt-1">↑ 2.5°C above normal</div>
                  </div>

                  {/* Population */}
                  <div className="glass-card rounded-lg p-4 border border-white/10">
                    <div className="flex items-center gap-3 mb-2">
                      <Activity className="w-5 h-5 text-secondary" />
                      <span className="text-sm text-text-muted">Affected Population</span>
                    </div>
                    <div className="font-display text-3xl font-bold text-white">{selectedCity.population}</div>
                    <div className="text-sm text-text-muted mt-1">Total city population</div>
                  </div>

                  {/* Risk factors */}
                  <div className="space-y-3">
                    <div className="text-sm font-semibold text-white">Key Risk Factors</div>
                    <div className="space-y-2">
                      {['High urban density', 'Limited green cover', 'Heat-trapping infrastructure', 'Water scarcity'].map((factor) => (
                        <div key={factor} className="flex items-center gap-2 text-sm text-text-muted">
                          <div className="w-1.5 h-1.5 rounded-full bg-danger" />
                          <span>{factor}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recommendations */}
                  <div className="space-y-3">
                    <div className="text-sm font-semibold text-white">AI Recommendations</div>
                    <div className="space-y-2">
                      {['Increase green cover by 15%', 'Deploy cool pavements', 'Enhance water bodies', 'Establish cooling centers'].map((rec) => (
                        <div key={rec} className="flex items-center gap-2 text-sm text-text-muted">
                          <div className="w-1.5 h-1.5 rounded-full bg-success" />
                          <span>{rec}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <Navigation className="w-16 h-16 text-text-muted" />
                  <div>
                    <h3 className="font-display text-xl font-bold text-white mb-2">Select a City</h3>
                    <p className="text-sm text-text-muted">Click on any hotspot to view detailed heat analysis and AI recommendations</p>
                  </div>
                </div>
              )}
            </PremiumCard>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
