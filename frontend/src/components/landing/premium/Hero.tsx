'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Satellite, Shield, Thermometer, Users, Building2, Play, Brain } from 'lucide-react'
import { PremiumButton } from '@/components/ui/premium'
import { useState, useEffect } from 'react'

export default function PremiumHero() {
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

  const liveStats = [
    { label: 'Cities Monitored', value: '127', icon: Building2, change: '+12' },
    { label: 'Active Hotspots', value: '2,847', icon: Thermometer, change: '+234' },
    { label: 'AI Predictions', value: '15.2M', icon: Brain, change: '+1.2M' },
    { label: 'Lives Protected', value: '8.9M', icon: Users, change: '+450K' },
  ]

  const governmentBadges = [
    { name: 'ISRO Partner', color: 'primary' },
    { name: 'Smart Cities Mission', color: 'secondary' },
    { name: 'NDMA Approved', color: 'success' },
    { name: 'NRSC Integrated', color: 'warning' },
  ]

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Premium animated background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-surface to-background" />
      
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 2 }}
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-secondary/20 rounded-full blur-[100px]"
        />
      </div>

      {/* Premium grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,200,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,200,255,0.03)_1px,transparent_1px)] bg-[size:100px_100px]" />

      {/* Scan line effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ y: [-100, windowHeight + 100] }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="w-full h-[2px] bg-gradient-to-r from-transparent via-primary/40 to-transparent"
        />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -100],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
            className="absolute w-1 h-1 bg-primary/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-12"
          >
            {/* Government badges */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap gap-3"
            >
              {governmentBadges.map((badge, index) => (
                <motion.div
                  key={badge.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="glass-card px-4 py-2 rounded-full border border-white/10"
                >
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full bg-${badge.color} animate-pulse`} />
                    <span className="text-sm font-medium text-text-muted">{badge.name}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Main heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h1 className="font-display text-6xl lg:text-8xl font-bold leading-tight tracking-tight mb-6">
                <span className="text-white">National</span>
                <br />
                <span className="text-gradient">Heat Shield</span>
                <br />
                <span className="text-white">Intelligence</span>
              </h1>
              <p className="text-xl text-text-muted max-w-2xl leading-relaxed font-light">
                Enterprise-grade AI-powered urban heat monitoring for ISRO, Smart Cities Mission, and national disaster management agencies.
              </p>
            </motion.div>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-4"
            >
              <PremiumButton size="lg" icon={<ArrowRight className="w-5 h-5" />}>
                Launch Command Center
              </PremiumButton>
              <PremiumButton variant="secondary" size="lg" icon={<Play className="w-5 h-5" />}>
                Watch Demo
              </PremiumButton>
            </motion.div>

            {/* Live statistics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-white/10"
            >
              {liveStats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className="space-y-2"
                >
                  <div className="flex items-center gap-2 text-text-muted">
                    <stat.icon className="w-4 h-4" />
                    <span className="text-sm">{stat.label}</span>
                  </div>
                  <div className="font-display text-3xl font-bold text-white">
                    {stat.value}
                  </div>
                  <div className="text-sm text-success flex items-center gap-1">
                    <span>↑</span>
                    <span>{stat.change}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* System status */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex items-center gap-6 pt-4"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                <span className="text-sm text-text-muted">System Operational</span>
              </div>
              <div className="text-sm text-text-muted">
                Last updated: {currentTime.toLocaleTimeString()}
              </div>
              <div className="flex items-center gap-2 text-text-muted">
                <Shield className="w-4 h-4" />
                <span className="text-sm">Enterprise Security</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right content - 3D Earth visualization */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Main visualization container */}
            <div className="relative w-full aspect-square max-w-2xl mx-auto min-h-[500px]">
              {/* Outer glow */}
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{ duration: 6, repeat: Infinity }}
                className="absolute inset-0 bg-gradient-to-br from-primary/30 to-secondary/30 rounded-premium blur-[100px]"
              />
              
              {/* Main visualization */}
              <div className="relative glass-premium rounded-premium p-8 border border-white/10 overflow-hidden">
                {/* 3D Earth representation */}
                <div className="relative w-full h-full rounded-card bg-gradient-to-br from-background-dark to-background relative overflow-hidden">
                  
                  {/* Grid lines */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(0,200,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(0,200,255,0.08)_1px,transparent_1px)] bg-[size:50px_50px]" />
                  
                  {/* Earth globe visualization */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <div className="relative w-[80%] h-[80%]">
                      {/* Globe base */}
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20" />
                      
                      {/* Globe grid */}
                      <div className="absolute inset-0 rounded-full border-2 border-primary/30" />
                      <div className="absolute inset-4 rounded-full border border-primary/20" />
                      <div className="absolute inset-8 rounded-full border border-primary/10" />
                      
                      {/* Continents representation */}
                      <div className="absolute inset-0 rounded-full overflow-hidden">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                          className="absolute inset-0"
                        >
                          {/* India continent highlight */}
                          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-1/4 h-1/3 bg-primary/40 rounded-full blur-sm" />
                          
                          {/* Heat hotspots */}
                          {[...Array(8)].map((_, i) => (
                            <motion.div
                              key={i}
                              animate={{ 
                                scale: [1, 1.5, 1],
                                opacity: [0.6, 1, 0.6],
                              }}
                              transition={{ 
                                duration: 2 + Math.random() * 2,
                                repeat: Infinity,
                                delay: Math.random() * 2,
                              }}
                              className="absolute w-3 h-3 rounded-full"
                              style={{
                                backgroundColor: i % 2 === 0 ? '#EF4444' : '#F59E0B',
                                left: `${20 + Math.random() * 60}%`,
                                top: `${20 + Math.random() * 60}%`,
                                boxShadow: '0 0 20px currentColor',
                              }}
                            />
                          ))}
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Orbiting satellites */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0"
                  >
                    {[0, 120, 240].map((angle, i) => (
                      <motion.div
                        key={i}
                        className="absolute"
                        style={{
                          top: '50%',
                          left: '50%',
                          transform: `rotate(${angle}deg) translate(120px) rotate(-${angle}deg)`,
                        }}
                      >
                        <motion.div
                          animate={{ 
                            scale: [1, 1.2, 1],
                            opacity: [0.8, 1, 0.8],
                          }}
                          transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                          className="relative"
                        >
                          <Satellite className="w-6 h-6 text-primary" />
                          <motion.div
                            animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="absolute inset-0 bg-primary/30 rounded-full blur-sm"
                          />
                        </motion.div>
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* Data streams */}
                  {['heat-blue', 'heat-green', 'heat-yellow', 'heat-orange', 'heat-red'].map((color, i) => (
                    <motion.div
                      key={color}
                      animate={{ 
                        y: [0, -100],
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: i * 0.5,
                      }}
                      className="absolute w-1 h-20 bg-gradient-to-t from-transparent to-current rounded-full"
                      style={{
                        backgroundColor: color === 'heat-blue' ? '#3B82F6' : 
                                      color === 'heat-green' ? '#10B981' :
                                      color === 'heat-yellow' ? '#F59E0B' :
                                      color === 'heat-orange' ? '#F97316' : '#EF4444',
                        left: `${15 + i * 18}%`,
                        bottom: '20%',
                      }}
                    />
                  ))}

                  {/* Legend */}
                  <div className="absolute bottom-4 left-4 right-4 glass-card rounded-lg p-4 border border-white/10">
                    <div className="text-xs text-text-muted mb-2">Heat Intensity Scale</div>
                    <div className="flex items-center gap-1">
                      <div className="flex-1 h-2 rounded-full heat-gradient" />
                    </div>
                    <div className="flex justify-between text-xs text-text-muted mt-1">
                      <span>Low</span>
                      <span>Critical</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-text-muted"
        >
          <span className="text-xs">Scroll to explore</span>
          <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-primary rounded-full"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
