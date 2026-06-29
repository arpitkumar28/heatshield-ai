'use client'

import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { ArrowRight, Satellite, Shield, Thermometer, Users, Building2, Play, Brain, Activity, Zap, Globe, Network, AlertTriangle } from 'lucide-react'
import { PremiumButton } from '@/components/ui/premium'
import { useState, useEffect, useRef } from 'react'

const starField = Array.from({ length: 50 }, (_, i) => ({
  left: `${((i * 37) % 100) + ((i % 3) * 0.21)}%`,
  top: `${((i * 53) % 100) + ((i % 5) * 0.13)}%`,
  duration: 3 + (i % 5) * 0.7,
  delay: (i % 10) * 0.45,
}))

const heatLayerPoints = Array.from({ length: 12 }, (_, i) => ({
  left: `${25 + ((i * 19) % 50)}%`,
  top: `${25 + ((i * 29) % 50)}%`,
  duration: 2 + (i % 4) * 0.6,
  delay: (i % 6) * 0.3,
}))

export default function PremiumHero() {
  const [currentTime, setCurrentTime] = useState('Live')
  const [activeIndex, setActiveIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()
  const scrollYProgress = useSpring(scrollY, { stiffness: 100, damping: 30 })
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])

  useEffect(() => {
    const updateClock = () => {
      setCurrentTime(new Date().toLocaleTimeString('en-IN', { hour12: false }))
    }
    updateClock()
    const timer = setInterval(updateClock, 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % 4)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const liveStats = [
    { label: 'Cities Monitored', value: '127', icon: Building2, change: '+12', color: 'primary' },
    { label: 'Active Hotspots', value: '2,847', icon: Thermometer, change: '+234', color: 'danger' },
    { label: 'AI Predictions', value: '15.2M', icon: Brain, change: '+1.2M', color: 'accent' },
    { label: 'Lives Protected', value: '8.9M', icon: Users, change: '+450K', color: 'success' },
  ]

  const governmentBadges = [
    { name: 'ISRO Partner', icon: Satellite, color: 'primary' },
    { name: 'Smart Cities', icon: Building2, color: 'secondary' },
    { name: 'NDMA Approved', icon: Shield, color: 'success' },
    { name: 'NRSC Integrated', icon: Globe, color: 'warning' },
  ]

  const predictionCards = [
    { city: 'Delhi', temp: 47, risk: 'Critical', trend: '+3.2°', humidity: 45 },
    { city: 'Mumbai', temp: 38, risk: 'High', trend: '+1.8°', humidity: 78 },
    { city: 'Chennai', temp: 42, risk: 'High', trend: '+2.1°', humidity: 65 },
  ]

  return (
    <motion.section 
      ref={containerRef}
      style={{ opacity, scale }}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background"
    >
      {/* Premium animated background with deep navy gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-[#081020] to-background" />
      
      {/* Animated gradient orbs with blue ambient lighting */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
            x: [0, 50, 0],
          }}
          transition={{ duration: 12, repeat: Infinity }}
          className="absolute top-1/4 left-1/4 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[150px]"
        />
        <motion.div
          animate={{ 
            scale: [1, 1.4, 1],
            opacity: [0.15, 0.35, 0.15],
            x: [0, -50, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, delay: 3 }}
          className="absolute bottom-1/4 right-1/4 w-[700px] h-[700px] bg-secondary/10 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.25, 0.1],
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 5 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/8 rounded-full blur-[100px]"
        />
      </div>

      {/* Premium grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(31,162,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(31,162,255,0.02)_1px,transparent_1px)] bg-[size:80px_80px]" />
      
      {/* Noise texture overlay */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIi8+CjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiMwMDAiLz4KPC9zdmc+')] pointer-events-none" />

      {/* Moving gradient lights */}
      <motion.div
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(31,162,255,0.05),transparent_50%)] bg-[length:200%_200%]"
      />

      {/* Floating glows */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -30, 0],
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 4 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.8,
            ease: "easeInOut"
          }}
          className="absolute w-32 h-32 rounded-full blur-3xl"
          style={{
            background: `radial-gradient(circle, ${i % 2 === 0 ? 'rgba(31,162,255,0.3)' : 'rgba(0,229,255,0.3)'} 0%, transparent 70%)`,
            left: `${10 + i * 15}%`,
            top: `${20 + (i % 3) * 25}%`,
          }}
        />
      ))}

      {/* Animated stars */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {starField.map((star, i) => (
          <motion.div
            key={i}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: star.duration,
              repeat: Infinity,
              delay: star.delay,
            }}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: star.left,
              top: star.top,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-full mx-auto px-6 py-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
            className="space-y-10"
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
                  className="glass-card px-4 py-2 rounded-full border border-white/8 hover:border-white/16 transition-all group"
                >
                  <div className="flex items-center gap-2">
                    <motion.div
                      animate={{ 
                        rotate: [0, 360],
                        scale: [1, 1.1, 1],
                      }}
                      transition={{ 
                        duration: 3,
                        repeat: Infinity,
                        delay: index * 0.2,
                      }}
                    >
                      <badge.icon className="w-3.5 h-3.5 text-primary" />
                    </motion.div>
                    <span className="text-sm font-medium text-text-muted group-hover:text-white transition-colors">{badge.name}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Main heading */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <motion.h1 
                className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.1] tracking-tight mb-6"
              >
                <motion.span 
                  className="text-white block"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  National
                </motion.span>
                <motion.span 
                  className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent block"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  Heat Intelligence
                </motion.span>
                <motion.span 
                  className="text-white block"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  Platform
                </motion.span>
              </motion.h1>
              <motion.p 
                className="text-lg md:text-xl text-text-muted max-w-2xl leading-relaxed font-light"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                Government-scale AI prediction platform for ISRO, NRSC, NDMA, and Smart Cities Mission. 
                Real-time heat monitoring, predictive analytics, and citizen alert systems.
              </motion.p>
            </motion.div>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="flex flex-wrap gap-4"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <PremiumButton size="lg" className="gap-2 shadow-neon-primary">
                  <Activity className="w-5 h-5" />
                  <span>Launch Platform</span>
                  <ArrowRight className="w-5 h-5" />
                </PremiumButton>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <PremiumButton variant="secondary" size="lg" className="gap-2">
                  <Play className="w-5 h-5" />
                  <span>Watch Demo</span>
                </PremiumButton>
              </motion.div>
            </motion.div>

            {/* Live statistics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-white/8"
            >
              {liveStats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1 + index * 0.1 }}
                  className="space-y-2 group"
                >
                  <div className="flex items-center gap-2 text-text-muted">
                    <motion.div
                      animate={{ 
                        rotate: [0, 360],
                      }}
                      transition={{ 
                        duration: 8,
                        repeat: Infinity,
                        delay: index * 0.5,
                      }}
                    >
                      <stat.icon className="w-4 h-4 text-primary" />
                    </motion.div>
                    <span className="text-sm">{stat.label}</span>
                  </div>
                  <motion.div 
                    className="font-display text-3xl font-bold text-white group-hover:text-primary transition-colors"
                    animate={{ scale: activeIndex === index ? [1, 1.1, 1] : 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-sm text-success flex items-center gap-1">
                    <motion.span
                      animate={{ y: [0, -3, 0] }}
                      transition={{ duration: 1, repeat: Infinity, delay: index * 0.2 }}
                    >
                      ↑
                    </motion.span>
                    <span>{stat.change}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* System status */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 }}
              className="flex flex-wrap items-center gap-6 pt-4"
            >
              <div className="flex items-center gap-2">
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-2 h-2 bg-success rounded-full"
                />
                <span className="text-sm text-text-muted">System Operational</span>
              </div>
              <div className="text-sm text-text-muted">
                Last updated: {currentTime}
              </div>
              <div className="flex items-center gap-2 text-text-muted">
                <Shield className="w-4 h-4 text-primary" />
                <span className="text-sm">Enterprise Security</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right content - Enhanced 3D visualization */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
            className="relative"
          >
            {/* Main visualization container */}
            <div className="relative w-full aspect-square max-w-2xl mx-auto min-h-[600px]">
              {/* Outer glow with animation */}
              <motion.div
                animate={{ 
                  scale: [1, 1.15, 1],
                  opacity: [0.25, 0.45, 0.25],
                  rotate: [0, 5, 0],
                }}
                transition={{ duration: 8, repeat: Infinity }}
                className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/15 to-secondary/20 rounded-premium blur-[120px]"
              />
              
              {/* Main visualization */}
              <div className="relative glass-premium rounded-premium p-6 border border-white/8 overflow-hidden">
                {/* 3D India Heat Map visualization */}
                <div className="relative w-full h-full rounded-card bg-gradient-to-br from-background to-surface relative overflow-hidden">
                  
                  {/* Grid lines */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(31,162,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(31,162,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
                  
                  {/* India map representation */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      animate={{ 
                        rotate: 360,
                      }}
                      transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
                      className="relative w-[70%] h-[70%]"
                    >
                      {/* Map base */}
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/15 to-secondary/15" />
                      
                      {/* India outline (simplified) */}
                      <motion.div
                        className="absolute inset-8 rounded-full border-2 border-primary/30"
                        animate={{
                          scale: [1, 1.05, 1],
                          opacity: [0.5, 0.8, 0.5],
                        }}
                        transition={{ duration: 4, repeat: Infinity }}
                      />
                      
                      {/* Heat layers */}
                      {heatLayerPoints.map((point, i) => (
                        <motion.div
                          key={i}
                          animate={{ 
                            scale: [1, 1.3, 1],
                            opacity: [0.4, 0.8, 0.4],
                          }}
                          transition={{ 
                            duration: point.duration,
                            repeat: Infinity,
                            delay: point.delay,
                          }}
                          className="absolute w-4 h-4 rounded-full blur-sm"
                          style={{
                            backgroundColor: i % 3 === 0 ? '#FF5C5C' : i % 3 === 1 ? '#FFB020' : '#00D68F',
                            left: point.left,
                            top: point.top,
                            boxShadow: '0 0 20px currentColor',
                          }}
                        />
                      ))}
                    </motion.div>
                  </div>

                  {/* AI nodes */}
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{
                        scale: [1, 1.4, 1],
                        opacity: [0.6, 1, 0.6],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: i * 0.4,
                      }}
                      className="absolute w-3 h-3 rounded-full bg-accent"
                      style={{
                        left: `${15 + i * 10}%`,
                        top: `${20 + (i % 4) * 20}%`,
                        boxShadow: '0 0 15px rgba(0,229,255,0.8)',
                      }}
                    >
                      <motion.div
                        animate={{
                          scale: [1, 2, 1],
                          opacity: [0.5, 0, 0.5],
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute inset-0 bg-accent rounded-full blur-sm"
                      />
                    </motion.div>
                  ))}

                  {/* Orbiting satellites */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0"
                  >
                    {[0, 90, 180, 270].map((angle, i) => (
                      <motion.div
                        key={i}
                        className="absolute"
                        style={{
                          top: '50%',
                          left: '50%',
                          transform: `rotate(${angle}deg) translate(140px) rotate(-${angle}deg)`,
                        }}
                      >
                        <motion.div
                          animate={{ 
                            scale: [1, 1.3, 1],
                            opacity: [0.7, 1, 0.7],
                          }}
                          transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.6 }}
                          className="relative"
                        >
                          <Satellite className="w-5 h-5 text-primary" />
                          <motion.div
                            animate={{ scale: [1, 2.5, 1], opacity: [0.4, 0, 0.4] }}
                            transition={{ duration: 2.5, repeat: Infinity }}
                            className="absolute inset-0 bg-primary/40 rounded-full blur-sm"
                          />
                        </motion.div>
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* Moving network lines */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    {[...Array(6)].map((_, i) => (
                      <motion.line
                        key={i}
                        x1={`${20 + i * 12}%`}
                        y1="80%"
                        x2={`${30 + i * 12}%`}
                        y2="20%"
                        stroke="url(#gradient)"
                        strokeWidth="1"
                        opacity="0.3"
                        animate={{
                          opacity: [0.1, 0.4, 0.1],
                          y2: ['20%', '25%', '20%'],
                        }}
                        transition={{
                          duration: 3 + i * 0.5,
                          repeat: Infinity,
                          delay: i * 0.3,
                        }}
                      />
                    ))}
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="100%" x2="0%" y2="0%">
                        <stop offset="0%" stopColor="#3B82F6" stopOpacity="0" />
                        <stop offset="50%" stopColor="#1FA2FF" stopOpacity="1" />
                        <stop offset="100%" stopColor="#00E5FF" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                  </svg>

                  {/* Prediction cards overlay */}
                  <div className="absolute bottom-4 left-4 right-4 space-y-2">
                    {predictionCards.map((card, index) => (
                      <motion.div
                        key={card.city}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.8 + index * 0.1 }}
                        className="glass-card rounded-lg p-3 border border-white/8"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`w-2 h-2 rounded-full ${card.risk === 'Critical' ? 'bg-danger animate-pulse' : 'bg-warning'}`} />
                            <div>
                              <div className="text-sm font-medium text-white">{card.city}</div>
                              <div className="text-xs text-text-muted">Humidity: {card.humidity}%</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-white">{card.temp}°C</div>
                            <div className="text-xs text-danger">{card.trend}</div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Temperature visualization legend */}
                  <div className="absolute top-4 right-4 glass-card rounded-lg p-3 border border-white/8">
                    <div className="text-xs text-text-muted mb-2 flex items-center gap-2">
                      <Thermometer className="w-3 h-3" />
                      <span>Heat Scale</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="flex-1 h-2 rounded-full bg-gradient-to-r from-primary via-accent via-warning to-danger" />
                    </div>
                    <div className="flex justify-between text-xs text-text-muted mt-1">
                      <span>25°</span>
                      <span>50°</span>
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
        transition={{ delay: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2.5, repeat: Infinity }}
          className="flex flex-col items-center gap-3 text-text-muted"
        >
          <span className="text-xs tracking-widest uppercase">Scroll to explore</span>
          <div className="w-6 h-12 rounded-full border-2 border-white/16 flex items-start justify-center p-2">
            <motion.div
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 2.5, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-gradient-to-b from-primary to-accent rounded-full"
            />
          </div>
        </motion.div>
      </motion.div>
    </motion.section>
  )
}
