'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Satellite, Shield, Zap, Map, Activity, Thermometer, Users, Building2 } from 'lucide-react'
import Button from '@/components/ui/Button'
import { useState, useEffect } from 'react'

export default function Hero() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [windowHeight, setWindowHeight] = useState(800)

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowHeight(window.innerHeight)
    }
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background-dark via-background to-background" />
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:80px_80px]" />

      {/* Scan line effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ y: [-100, windowHeight + 100] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="w-full h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent"
        />
      </div>

      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-10"
          >
            {/* Trust badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full glass-card border border-primary/30"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                <Shield className="w-4 h-4 text-primary" />
              </div>
              <span className="text-sm font-medium text-gray-300">National Urban Heat Intelligence Platform</span>
            </motion.div>

            {/* Main heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl lg:text-7xl font-bold leading-tight tracking-tight"
            >
              <span className="text-white">Predict.</span>
              <span className="text-gradient"> Protect.</span>
              <br />
              <span className="text-white">Cool Cities.</span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-text-muted max-w-2xl leading-relaxed"
            >
              Real-time heat monitoring powered by satellite imagery, AI predictions and geospatial analytics for Indian cities.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-4"
            >
              <Button size="lg" icon={<ArrowRight className="w-5 h-5" />}>
                Launch Platform
              </Button>
              <Button variant="secondary" size="lg">
                Request Demo
              </Button>
            </motion.div>

            {/* Live status */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex items-center gap-6 pt-4 border-t border-white/10"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                <span className="text-sm text-text-muted">System Operational</span>
              </div>
              <div className="text-sm text-text-muted">
                Last updated: {currentTime.toLocaleTimeString()}
              </div>
            </motion.div>
          </motion.div>

          {/* Right content - India map visualization */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Main map visualization */}
            <div className="relative w-full aspect-square max-w-xl mx-auto">
              {/* Outer glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl blur-3xl animate-pulse-slow" />
              
              {/* Map container */}
              <div className="relative glass-card rounded-3xl p-6 border border-white/10 overflow-hidden">
                {/* Map background */}
                <div className="w-full h-full rounded-2xl bg-gradient-to-br from-background-dark to-background relative overflow-hidden">
                  {/* Grid lines */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
                  
                  {/* India map silhouette (simplified) */}
                  <svg
                    viewBox="0 0 400 450"
                    className="w-full h-full opacity-30"
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

                  {/* Heat hotspots */}
                  <motion.div
                    animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="absolute top-1/4 left-1/3 w-3 h-3 bg-danger rounded-full shadow-neon-orange"
                  />
                  <motion.div
                    animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: 0.8 }}
                    className="absolute top-1/3 left-1/2 w-4 h-4 bg-danger rounded-full shadow-neon-orange"
                  />
                  <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 3.5, repeat: Infinity, delay: 1.5 }}
                    className="absolute top-1/2 left-2/3 w-3 h-3 bg-warning rounded-full shadow-neon-orange"
                  />
                  <motion.div
                    animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 2.8, repeat: Infinity, delay: 0.3 }}
                    className="absolute bottom-1/3 left-1/3 w-4 h-4 bg-danger rounded-full shadow-neon-orange"
                  />
                  <motion.div
                    animate={{ scale: [1, 1.5, 1], opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 3.2, repeat: Infinity, delay: 1.2 }}
                    className="absolute bottom-1/4 right-1/3 w-3 h-3 bg-warning rounded-full shadow-neon-orange"
                  />

                  {/* Satellite connections */}
                  <motion.div
                    animate={{ opacity: [0.3, 0.8, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute top-4 right-4"
                  >
                    <Satellite className="w-8 h-8 text-secondary" />
                  </motion.div>
                  <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    <motion.line
                      x1="350"
                      y1="40"
                      x2="200"
                      y2="150"
                      stroke="currentColor"
                      strokeWidth="1"
                      className="text-secondary/30"
                      animate={{ opacity: [0.2, 0.6, 0.2] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <motion.line
                      x1="350"
                      y1="40"
                      x2="250"
                      y2="200"
                      stroke="currentColor"
                      strokeWidth="1"
                      className="text-secondary/30"
                      animate={{ opacity: [0.2, 0.6, 0.2] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                    />
                  </svg>
                </div>

                {/* Map overlay controls */}
                <div className="absolute top-4 left-4 flex gap-2">
                  <div className="glass-card rounded-lg px-3 py-1.5 border border-white/10">
                    <span className="text-xs text-text-muted">Live</span>
                  </div>
                  <div className="glass-card rounded-lg px-3 py-1.5 border border-white/10">
                    <span className="text-xs text-text-muted">Heat Map</span>
                  </div>
                </div>
              </div>

              {/* Floating metrics cards */}
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -top-6 -right-6 glass-card rounded-xl p-4 border border-white/10 shadow-2xl"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-danger/20 text-danger">
                    <Thermometer className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-text-muted">Max Temperature</div>
                    <div className="text-lg font-bold text-white">47.2°C</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: 1.5 }}
                className="absolute -bottom-6 -left-6 glass-card rounded-xl p-4 border border-white/10 shadow-2xl"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-warning/20 text-warning">
                    <Activity className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-text-muted">Active Hotspots</div>
                    <div className="text-lg font-bold text-white">127</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, delay: 0.8 }}
                className="absolute top-1/2 -right-10 glass-card rounded-xl p-4 border border-white/10 shadow-2xl"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-secondary/20 text-secondary">
                    <Map className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-text-muted">Cities Monitored</div>
                    <div className="text-lg font-bold text-white">523</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3.8, repeat: Infinity, delay: 2 }}
                className="absolute bottom-1/4 -right-8 glass-card rounded-xl p-4 border border-white/10 shadow-2xl"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-success/20 text-success">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-text-muted">Population Protected</div>
                    <div className="text-lg font-bold text-white">1.2M+</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center pt-2">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-3 bg-primary rounded-full"
          />
        </div>
      </motion.div>
    </section>
  )
}
