'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { Map, Brain, Shield, AlertTriangle, BarChart3, Satellite, Users, Zap, Clock, Globe, Lock, Smartphone, TrendingUp, Activity, Thermometer } from 'lucide-react'
import { PremiumCard } from '@/components/ui/premium'
import { useRef, useState } from 'react'

const features = [
  {
    icon: Map,
    title: 'Live GIS Intelligence',
    description: 'Real-time geospatial monitoring with multi-layer visualization including satellite, street, terrain, and heat data layers.',
    highlights: ['Satellite View', 'Heat Layers', 'NDVI Analysis', 'Population Density'],
    color: 'primary',
    size: 'large',
    chart: 'map',
  },
  {
    icon: Brain,
    title: 'AI Prediction Engine',
    description: 'Advanced machine learning models forecast heat events 72 hours ahead with confidence intervals.',
    highlights: ['72-hour Forecast', 'Confidence Scores', 'Pattern Recognition'],
    color: 'secondary',
    size: 'medium',
    chart: 'line',
  },
  {
    icon: Shield,
    title: 'Risk Assessment',
    description: 'Comprehensive vulnerability analysis for infrastructure, populations, and critical assets.',
    highlights: ['Infrastructure Risk', 'Population Vulnerability', 'Asset Protection'],
    color: 'warning',
    size: 'medium',
    chart: 'radar',
  },
  {
    icon: AlertTriangle,
    title: 'Smart Alerting',
    description: 'Intelligent early warning system with multi-channel notifications and escalation protocols.',
    highlights: ['Multi-channel Alerts', 'Escalation Rules', 'Response Teams'],
    color: 'danger',
    size: 'medium',
    chart: 'pulse',
  },
  {
    icon: BarChart3,
    title: 'Executive Analytics',
    description: 'Command center dashboards with KPIs, trend analysis, and executive reporting.',
    highlights: ['Real-time KPIs', 'Trend Analysis', 'Executive Reports'],
    color: 'success',
    size: 'wide',
    chart: 'bar',
  },
  {
    icon: Satellite,
    title: 'Satellite Integration',
    description: 'Direct integration with ISRO/NRSC satellite feeds for continuous thermal monitoring.',
    highlights: ['ISRO Feed', 'NRSC Data', 'Change Detection'],
    color: 'accent',
    size: 'medium',
    chart: 'satellite',
  },
  {
    icon: Users,
    title: 'Citizen Portal',
    description: 'Public-facing platform for heat index information, cooling center locations, and emergency services.',
    highlights: ['Heat Index', 'Cooling Centers', 'Emergency Services'],
    color: 'primary',
    size: 'medium',
    chart: 'users',
  },
  {
    icon: Zap,
    title: 'Smart Recommendations',
    description: 'AI-generated mitigation strategies including green infrastructure and urban planning solutions.',
    highlights: ['Green Roofs', 'Cool Pavements', 'Urban Forests'],
    color: 'warning',
    size: 'medium',
    chart: 'spark',
  },
]

const analyticsBarHeights = [
  [38, 64, 38],
  [54, 76, 54],
  [30, 58, 30],
  [70, 88, 70],
  [46, 72, 46],
  [62, 84, 62],
]

const getFeatureColorClass = (color: string) => {
  const colorMap: Record<string, string> = {
    primary: 'bg-primary/10 border-primary/30',
    secondary: 'bg-secondary/10 border-secondary/30',
    accent: 'bg-accent/10 border-accent/30',
    warning: 'bg-warning/10 border-warning/30',
    danger: 'bg-danger/10 border-danger/30',
    success: 'bg-success/10 border-success/30',
  }
  return colorMap[color] || 'bg-primary/10 border-primary/30'
}

const getFeatureTextColorClass = (color: string) => {
  const colorMap: Record<string, string> = {
    primary: 'text-primary',
    secondary: 'text-secondary',
    accent: 'text-accent',
    warning: 'text-warning',
    danger: 'text-danger',
    success: 'text-success',
  }
  return colorMap[color] || 'text-primary'
}

const getGridSpan = (size: string) => {
  const spanMap: Record<string, string> = {
    large: 'md:col-span-2 lg:col-span-2 row-span-2',
    medium: 'md:col-span-1 lg:col-span-1',
    wide: 'md:col-span-2 lg:col-span-2',
  }
  return spanMap[size] || 'md:col-span-1 lg:col-span-1'
}

export default function PremiumPlatformFeatures() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return (
    <section ref={containerRef} className="relative py-32 bg-background overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-[#081020] to-background" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(31,162,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(31,162,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px]" />

      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-1/3 left-1/4 w-[700px] h-[700px] bg-primary/10 rounded-full blur-[150px]"
        />
        <motion.div
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.08, 0.18, 0.08],
          }}
          transition={{ duration: 12, repeat: Infinity, delay: 3 }}
          className="absolute bottom-1/3 right-1/4 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[120px]"
        />
      </div>

      <motion.div
        style={{ opacity }}
        className="relative z-10 w-full max-w-full mx-auto px-6"
      >
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          className="text-center mb-24"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-card border border-secondary/30 mb-8"
          >
            <motion.div
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.2, 1],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Zap className="w-4 h-4 text-secondary" />
            </motion.div>
            <span className="text-sm font-medium text-secondary">Platform Capabilities</span>
          </motion.div>
          
          <motion.h2 
            className="font-display text-5xl lg:text-7xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <span className="text-white block">Enterprise-Grade</span>
            <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent block"> Features</span>
          </motion.h2>
          
          <motion.p 
            className="text-xl text-text-muted max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            A comprehensive suite of tools designed for national command centers, 
            municipal corporations, and disaster management agencies.
          </motion.p>
        </motion.div>

        {/* Bento grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[300px]">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.08, ease: [0.4, 0, 0.2, 1] }}
              className={`${getGridSpan(feature.size)} relative`}
              onMouseEnter={() => setHoveredFeature(index)}
              onMouseLeave={() => setHoveredFeature(null)}
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="h-full"
              >
                <PremiumCard 
                  variant="glass" 
                  padding="lg" 
                  className="h-full border-white/8 hover:border-white/16 transition-all overflow-hidden relative"
                >
                  {/* Mini chart visualization */}
                  <div className="absolute inset-0 opacity-20 pointer-events-none">
                    {feature.chart === 'line' && (
                      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <motion.path
                          d="M0,80 Q25,60 50,50 T100,30"
                          stroke="currentColor"
                          strokeWidth="2"
                          fill="none"
                          className={getFeatureTextColorClass(feature.color)}
                          animate={{
                            d: ['M0,80 Q25,60 50,50 T100,30', 'M0,70 Q25,50 50,40 T100,20', 'M0,80 Q25,60 50,50 T100,30'],
                          }}
                          transition={{ duration: 3, repeat: Infinity }}
                        />
                      </svg>
                    )}
                    {feature.chart === 'bar' && (
                      <div className="flex items-end justify-around h-full p-4 gap-2">
                        {[...Array(6)].map((_, i) => (
                          <motion.div
                            key={i}
                            className={`w-full ${getFeatureColorClass(feature.color)} rounded-t`}
                            animate={{ height: analyticsBarHeights[i] }}
                            transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                          />
                        ))}
                      </div>
                    )}
                    {feature.chart === 'pulse' && (
                      <motion.div
                        className={`absolute inset-0 ${getFeatureColorClass(feature.color)}`}
                        animate={{ opacity: [0.1, 0.3, 0.1], scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}
                    {feature.chart === 'map' && (
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(31,162,255,0.3),transparent_50%)]" />
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(59,130,246,0.2),transparent_50%)]" />
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="relative z-10 h-full flex flex-col">
                    {/* Icon */}
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.08 + 0.2 }}
                      className={`w-14 h-14 rounded-2xl border flex items-center justify-center mb-4 ${getFeatureColorClass(feature.color)}`}
                    >
                      <motion.div
                        className="absolute inset-0 rounded-2xl blur-xl opacity-50"
                        animate={{
                          opacity: hoveredFeature === index ? [0.5, 0.8, 0.5] : 0.5,
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                        style={{ backgroundColor: feature.color === 'primary' ? 'rgba(31,162,255,0.3)' : 
                                              feature.color === 'secondary' ? 'rgba(59,130,246,0.3)' :
                                              feature.color === 'accent' ? 'rgba(0,229,255,0.3)' :
                                              feature.color === 'warning' ? 'rgba(255,176,32,0.3)' :
                                              feature.color === 'danger' ? 'rgba(255,92,92,0.3)' : 'rgba(0,214,143,0.3)' }}
                      />
                      <feature.icon className={`w-7 h-7 ${getFeatureTextColorClass(feature.color)} relative z-10`} />
                    </motion.div>

                    <div className="flex-1">
                      <h3 className="font-display text-xl font-bold text-white mb-3">
                        {feature.title}
                      </h3>
                      
                      <p className="text-text-muted text-sm leading-relaxed mb-4">
                        {feature.description}
                      </p>
                    </div>

                    {/* Highlights */}
                    <div className="space-y-2 pt-4 border-t border-white/8">
                      {feature.highlights.map((highlight, i) => (
                        <motion.div
                          key={highlight}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.08 + 0.3 + i * 0.05 }}
                          className="flex items-center gap-2 text-xs text-text-muted"
                        >
                          <motion.div
                            className={`w-1.5 h-1.5 rounded-full ${getFeatureTextColorClass(feature.color)}`}
                            animate={{
                              scale: [1, 1.3, 1],
                            }}
                            transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                          />
                          <span>{highlight}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </PremiumCard>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Additional capabilities */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-24"
        >
          <PremiumCard variant="gradient" padding="xl" className="border-white/8">
            <div className="grid lg:grid-cols-4 gap-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="space-y-4"
              >
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 10, repeat: Infinity }}
                >
                  <Clock className="w-8 h-8 text-primary mb-3" />
                </motion.div>
                <h4 className="font-display text-xl font-bold text-white">Real-time</h4>
                <p className="text-sm text-text-muted leading-relaxed">Sub-second data processing and live updates across all modules</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="space-y-4"
              >
                <motion.div
                  animate={{ rotate: [0, -360] }}
                  transition={{ duration: 15, repeat: Infinity }}
                >
                  <Globe className="w-8 h-8 text-secondary mb-3" />
                </motion.div>
                <h4 className="font-display text-xl font-bold text-white">Pan-India</h4>
                <p className="text-sm text-text-muted leading-relaxed">Comprehensive coverage of all major cities and urban centers</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 }}
                className="space-y-4"
              >
                <motion.div
                  animate={{ 
                    scale: [1, 1.1, 1],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Lock className="w-8 h-8 text-success mb-3" />
                </motion.div>
                <h4 className="font-display text-xl font-bold text-white">Secure</h4>
                <p className="text-sm text-text-muted leading-relaxed">Enterprise-grade security with role-based access control</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 }}
                className="space-y-4"
              >
                <motion.div
                  animate={{ 
                    y: [0, -5, 0],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Smartphone className="w-8 h-8 text-warning mb-3" />
                </motion.div>
                <h4 className="font-display text-xl font-bold text-white">Mobile-First</h4>
                <p className="text-sm text-text-muted leading-relaxed">Native mobile apps with offline capabilities and push notifications</p>
              </motion.div>
            </div>
          </PremiumCard>
        </motion.div>
      </motion.div>
    </section>
  )
}
