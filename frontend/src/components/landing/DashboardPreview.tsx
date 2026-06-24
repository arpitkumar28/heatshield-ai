'use client'

import { motion } from 'framer-motion'
import { Play, Thermometer, Activity, MapPin, AlertTriangle, TrendingUp, Users, Building2 } from 'lucide-react'
import Button from '@/components/ui/Button'

export default function DashboardPreview() {
  return (
    <section id="dashboard" className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Platform <span className="text-gradient">Dashboard</span>
          </h2>
          <p className="text-text-muted max-w-2xl mx-auto text-lg">
            Real-time government command center for urban heat intelligence and decision support
          </p>
        </motion.div>

        {/* Dashboard mockup */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative max-w-7xl mx-auto"
        >
          {/* Browser frame */}
          <div className="glass-card rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
            {/* Browser header */}
            <div className="bg-surface border-b border-white/10 px-4 py-3 flex items-center gap-2">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-danger" />
                <div className="w-3 h-3 rounded-full bg-warning" />
                <div className="w-3 h-3 rounded-full bg-success" />
              </div>
              <div className="flex-1 text-center">
                <div className="text-sm text-text-muted font-mono">app.heatshield.ai/dashboard</div>
              </div>
            </div>

            {/* Dashboard content */}
            <div className="bg-background p-4">
              {/* Top bar */}
              <div className="flex items-center justify-between mb-6 px-2">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                    <Activity className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">HeatShield AI</div>
                    <div className="text-xs text-text-muted">National Urban Heat Intelligence</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="px-3 py-1.5 rounded-lg bg-white/5 text-xs text-text-muted border border-white/10">
                    Delhi Municipal Corporation
                  </div>
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <Users className="w-4 h-4 text-primary" />
                  </div>
                </div>
              </div>

              {/* KPI Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="glass-card rounded-xl p-4 border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <Thermometer className="w-4 h-4 text-danger" />
                    <span className="text-xs text-text-muted">Current Temp</span>
                  </div>
                  <div className="text-2xl font-bold text-white">42.5°C</div>
                  <div className="text-xs text-danger mt-1">+2.3°C from avg</div>
                </div>
                <div className="glass-card rounded-xl p-4 border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <Activity className="w-4 h-4 text-warning" />
                    <span className="text-xs text-text-muted">Heat Index</span>
                  </div>
                  <div className="text-2xl font-bold text-white">48.2°C</div>
                  <div className="text-xs text-warning mt-1">High Risk</div>
                </div>
                <div className="glass-card rounded-xl p-4 border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-4 h-4 text-danger" />
                    <span className="text-xs text-text-muted">Active Hotspots</span>
                  </div>
                  <div className="text-2xl font-bold text-white">23</div>
                  <div className="text-xs text-danger mt-1">5 critical</div>
                </div>
                <div className="glass-card rounded-xl p-4 border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-4 h-4 text-secondary" />
                    <span className="text-xs text-text-muted">At Risk Population</span>
                  </div>
                  <div className="text-2xl font-bold text-white">2.4M</div>
                  <div className="text-xs text-secondary mt-1">18% of city</div>
                </div>
              </div>

              {/* Main content grid */}
              <div className="grid md:grid-cols-3 gap-4">
                {/* Heat Map */}
                <div className="md:col-span-2 glass-card rounded-xl p-4 border border-white/10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-primary" />
                      <span className="font-semibold text-white">Heat Map</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="px-2 py-1 text-xs rounded bg-primary/20 text-primary border border-primary/30">Temperature</span>
                      <span className="px-2 py-1 text-xs rounded bg-white/5 text-text-muted border border-white/10">NDVI</span>
                      <span className="px-2 py-1 text-xs rounded bg-white/5 text-text-muted border border-white/10">Population</span>
                    </div>
                  </div>
                  <div className="relative h-64 bg-gradient-to-br from-background-dark to-background rounded-lg overflow-hidden">
                    {/* Grid overlay */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px]" />
                    
                    {/* Heat zones */}
                    <div className="absolute top-1/4 left-1/4 w-20 h-20 bg-danger/40 rounded-full blur-xl" />
                    <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-warning/40 rounded-full blur-xl" />
                    <div className="absolute bottom-1/4 left-1/3 w-24 h-24 bg-danger/30 rounded-full blur-xl" />
                    
                    {/* Map markers */}
                    <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-danger rounded-full animate-pulse" />
                    <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-warning rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
                    <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-danger rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
                    
                    {/* Legend */}
                    <div className="absolute bottom-3 right-3 glass-card rounded-lg p-2 border border-white/10">
                      <div className="flex items-center gap-2 text-xs">
                        <div className="w-3 h-3 rounded-full bg-success" />
                        <span className="text-text-muted">Low</span>
                        <div className="w-3 h-3 rounded-full bg-warning" />
                        <span className="text-text-muted">Medium</span>
                        <div className="w-3 h-3 rounded-full bg-danger" />
                        <span className="text-text-muted">High</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Alerts Panel */}
                <div className="glass-card rounded-xl p-4 border border-white/10">
                  <div className="flex items-center gap-2 mb-4">
                    <AlertTriangle className="w-5 h-5 text-danger" />
                    <span className="font-semibold text-white">Live Alerts</span>
                    <span className="ml-auto px-2 py-0.5 text-xs rounded-full bg-danger/20 text-danger">5 active</span>
                  </div>
                  <div className="space-y-3">
                    <div className="p-3 rounded-lg bg-danger/10 border border-danger/30">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-2 h-2 bg-danger rounded-full animate-pulse" />
                        <span className="text-xs font-semibold text-danger">CRITICAL</span>
                      </div>
                      <div className="text-sm text-white mb-1">Connaught Place</div>
                      <div className="text-xs text-text-muted">Temp: 47°C | 45K affected</div>
                    </div>
                    <div className="p-3 rounded-lg bg-warning/10 border border-warning/30">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-2 h-2 bg-warning rounded-full animate-pulse" />
                        <span className="text-xs font-semibold text-warning">WARNING</span>
                      </div>
                      <div className="text-sm text-white mb-1">Karol Bagh</div>
                      <div className="text-xs text-text-muted">Temp: 44°C | 32K affected</div>
                    </div>
                    <div className="p-3 rounded-lg bg-warning/10 border border-warning/30">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-2 h-2 bg-warning rounded-full animate-pulse" />
                        <span className="text-xs font-semibold text-warning">WARNING</span>
                      </div>
                      <div className="text-sm text-white mb-1">Chandni Chowk</div>
                      <div className="text-xs text-text-muted">Temp: 43°C | 28K affected</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom row */}
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                {/* Recommendations */}
                <div className="glass-card rounded-xl p-4 border border-white/10">
                  <div className="flex items-center gap-2 mb-4">
                    <TrendingUp className="w-5 h-5 text-success" />
                    <span className="font-semibold text-white">AI Recommendations</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 p-2 rounded-lg bg-white/5">
                      <div className="w-8 h-8 rounded bg-success/20 flex items-center justify-center">
                        <Building2 className="w-4 h-4 text-success" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm text-white">Deploy 3 cooling centers</div>
                        <div className="text-xs text-text-muted">Connaught Place area</div>
                      </div>
                      <span className="text-xs text-success">High Impact</span>
                    </div>
                    <div className="flex items-center gap-3 p-2 rounded-lg bg-white/5">
                      <div className="w-8 h-8 rounded bg-secondary/20 flex items-center justify-center">
                        <span className="text-secondary text-xs font-bold">NDVI</span>
                      </div>
                      <div className="flex-1">
                        <div className="text-sm text-white">Increase green cover</div>
                        <div className="text-xs text-text-muted">Karol Bagh sector</div>
                      </div>
                      <span className="text-xs text-secondary">Medium</span>
                    </div>
                  </div>
                </div>

                {/* Analytics Preview */}
                <div className="glass-card rounded-xl p-4 border border-white/10">
                  <div className="flex items-center gap-2 mb-4">
                    <Activity className="w-5 h-5 text-secondary" />
                    <span className="font-semibold text-white">Analytics</span>
                  </div>
                  <div className="h-32 flex items-end gap-2">
                    <div className="flex-1 bg-gradient-to-t from-primary/50 to-primary/20 rounded-t" style={{ height: '60%' }} />
                    <div className="flex-1 bg-gradient-to-t from-primary/50 to-primary/20 rounded-t" style={{ height: '80%' }} />
                    <div className="flex-1 bg-gradient-to-t from-danger/50 to-danger/20 rounded-t" style={{ height: '95%' }} />
                    <div className="flex-1 bg-gradient-to-t from-warning/50 to-warning/20 rounded-t" style={{ height: '70%' }} />
                    <div className="flex-1 bg-gradient-to-t from-primary/50 to-primary/20 rounded-t" style={{ height: '55%' }} />
                    <div className="flex-1 bg-gradient-to-t from-primary/50 to-primary/20 rounded-t" style={{ height: '65%' }} />
                    <div className="flex-1 bg-gradient-to-t from-success/50 to-success/20 rounded-t" style={{ height: '45%' }} />
                  </div>
                  <div className="flex justify-between mt-2 text-xs text-text-muted">
                    <span>Mon</span>
                    <span>Tue</span>
                    <span>Wed</span>
                    <span>Thu</span>
                    <span>Fri</span>
                    <span>Sat</span>
                    <span>Sun</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-12 text-center"
          >
            <Button size="lg" icon={<Play className="w-5 h-5" />}>
              Launch Platform
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
