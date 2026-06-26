'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { Thermometer, AlertTriangle, Users, Building2, TrendingUp, Zap, Flame, Droplets, Shield } from 'lucide-react'
import { PremiumCard } from '@/components/ui/premium'
import { useRef } from 'react'

const crisisStages = [
  {
    icon: Thermometer,
    title: 'Rising Temperatures',
    description: 'Urban heat islands are intensifying, with cities experiencing temperatures 5-8°C higher than surrounding areas.',
    stats: { value: '45°C', label: 'Peak Temperature', change: '+2.5°C' },
    color: 'heat-yellow',
  },
  {
    icon: Flame,
    title: 'Heat Crisis Escalation',
    description: 'Heat waves are becoming more frequent and severe, threatening vulnerable populations and infrastructure.',
    stats: { value: '234', label: 'Heat Wave Days', change: '+45%' },
    color: 'heat-orange',
  },
  {
    icon: AlertTriangle,
    title: 'Public Health Emergency',
    description: 'Heat-related illnesses surge, overwhelming healthcare systems and increasing mortality rates.',
    stats: { value: '2,400+', label: 'Annual Deaths', change: '+18%' },
    color: 'heat-red',
  },
  {
    icon: Users,
    title: 'Vulnerable Communities',
    description: 'Low-income neighborhoods, elderly populations, and outdoor workers face disproportionate risks.',
    stats: { value: '120M', label: 'At-Risk Population', change: '+15%' },
    color: 'heat-dark-red',
  },
  {
    icon: Building2,
    title: 'Infrastructure Stress',
    description: 'Power grids buckle under cooling demand, roads buckle, and water systems face unprecedented strain.',
    stats: { value: '8.2GW', label: 'Peak Power Demand', change: '+22%' },
    color: 'danger',
  },
  {
    icon: Droplets,
    title: 'Water Crisis',
    description: 'Depleting water tables and increased evaporation exacerbate drought conditions.',
    stats: { value: '45%', label: 'Water Table Drop', change: '-12%' },
    color: 'heat-blue',
  },
]

export default function PremiumHeatCrisisStory() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8])

  return (
    <section ref={containerRef} className="relative py-32 bg-background overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-surface to-background" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(239,68,68,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(239,68,68,0.03)_1px,transparent_1px)] bg-[size:80px_80px]" />

      <motion.div
        style={{ opacity, scale }}
        className="relative z-10 container mx-auto px-6"
      >
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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-danger/30 mb-6"
          >
            <AlertTriangle className="w-4 h-4 text-danger" />
            <span className="text-sm font-medium text-danger">Climate Crisis</span>
          </motion.div>
          
          <h2 className="font-display text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-white">The Urban Heat</span>
            <span className="text-gradient-warm"> Crisis</span>
          </h2>
          
          <p className="text-xl text-text-muted max-w-3xl mx-auto">
            A cascading crisis threatening India&apos;s urban future. From rising temperatures to public health emergencies, 
            the heat wave challenge demands immediate, intelligent action.
          </p>
        </motion.div>

        {/* Interactive story stages */}
        <div className="space-y-24">
          {crisisStages.map((stage, index) => (
            <motion.div
              key={stage.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center`}
            >
              {/* Content */}
              <div className="flex-1">
                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.1 + 0.2 }}
                >
                  <PremiumCard variant="glass" padding="lg" className="h-full">
                    <div className="flex items-start gap-4 mb-6">
                      <div className={`p-3 rounded-xl bg-${stage.color}/10 border border-${stage.color}/30`}>
                        <stage.icon className={`w-8 h-8 text-${stage.color}`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-display text-2xl font-bold text-white mb-2">
                          {stage.title}
                        </h3>
                        <p className="text-text-muted leading-relaxed">
                          {stage.description}
                        </p>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center gap-6 pt-6 border-t border-white/10">
                      <div>
                        <div className="font-display text-4xl font-bold text-white mb-1">
                          {stage.stats.value}
                        </div>
                        <div className="text-sm text-text-muted">{stage.stats.label}</div>
                      </div>
                      <div className={`text-sm ${stage.stats.change.startsWith('+') ? 'text-danger' : 'text-success'} font-semibold`}>
                        {stage.stats.change}
                      </div>
                    </div>
                  </PremiumCard>
                </motion.div>
              </div>

              {/* Visual */}
              <div className="flex-1">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.1 + 0.3 }}
                  className="relative"
                >
                  <div className="glass-premium rounded-premium p-8 border border-white/10">
                    {/* Animated visualization */}
                    <div className="relative h-64 rounded-card bg-gradient-to-br from-background-dark to-background overflow-hidden">
                      {/* Background grid */}
                      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
                      
                      {/* Dynamic elements based on stage */}
                      {index === 0 && (
                        <>
                          <motion.div
                            animate={{ scale: [1, 1.3, 1] }}
                            transition={{ duration: 4, repeat: Infinity }}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-heat-yellow/30 blur-xl"
                          />
                          <motion.div
                            animate={{ y: [0, -20, 0] }}
                            transition={{ duration: 3, repeat: Infinity }}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                          >
                            <Thermometer className="w-16 h-16 text-heat-yellow" />
                          </motion.div>
                        </>
                      )}

                      {index === 1 && (
                        <>
                          {[...Array(5)].map((_, i) => (
                            <motion.div
                              key={i}
                              animate={{ 
                                scale: [1, 1.5, 1],
                                opacity: [0.5, 1, 0.5],
                              }}
                              transition={{ 
                                duration: 2 + i * 0.3,
                                repeat: Infinity,
                                delay: i * 0.2,
                              }}
                              className="absolute w-8 h-8 rounded-full bg-heat-orange/50 blur-sm"
                              style={{
                                left: `${20 + i * 15}%`,
                                top: `${30 + (i % 2) * 30}%`,
                              }}
                            />
                          ))}
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 10, repeat: Infinity }}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                          >
                            <Flame className="w-20 h-20 text-heat-orange" />
                          </motion.div>
                        </>
                      )}

                      {index === 2 && (
                        <>
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1, repeat: Infinity }}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full bg-heat-red/20 blur-2xl"
                          />
                          <motion.div
                            animate={{ 
                              rotate: [0, 10, -10, 0],
                            }}
                            transition={{ duration: 0.5, repeat: Infinity }}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                          >
                            <AlertTriangle className="w-24 h-24 text-heat-red" />
                          </motion.div>
                        </>
                      )}

                      {index === 3 && (
                        <>
                          {[...Array(8)].map((_, i) => (
                            <motion.div
                              key={i}
                              animate={{ 
                                scale: [0.8, 1.2, 0.8],
                                opacity: [0.4, 0.8, 0.4],
                              }}
                              transition={{ 
                                duration: 2 + Math.random(),
                                repeat: Infinity,
                                delay: Math.random(),
                              }}
                              className="absolute w-4 h-4 rounded-full bg-heat-dark-red/60"
                              style={{
                                left: `${10 + Math.random() * 80}%`,
                                top: `${10 + Math.random() * 80}%`,
                              }}
                            />
                          ))}
                          <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                          >
                            <Users className="w-20 h-20 text-heat-dark-red" />
                          </motion.div>
                        </>
                      )}

                      {index === 4 && (
                        <>
                          <motion.div
                            animate={{ 
                              backgroundPosition: ['0% 0%', '100% 100%'],
                            }}
                            transition={{ duration: 3, repeat: Infinity }}
                            className="absolute inset-0 bg-gradient-to-br from-danger/20 to-background"
                          />
                          <motion.div
                            animate={{ rotate: 180 }}
                            transition={{ duration: 8, repeat: Infinity }}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                          >
                            <Building2 className="w-20 h-20 text-danger" />
                          </motion.div>
                        </>
                      )}

                      {index === 5 && (
                        <>
                          {[...Array(6)].map((_, i) => (
                            <motion.div
                              key={i}
                              animate={{ 
                                y: [0, -30, 0],
                                opacity: [0, 1, 0],
                              }}
                              transition={{ 
                                duration: 2,
                                repeat: Infinity,
                                delay: i * 0.3,
                              }}
                              className="absolute w-1 h-16 bg-gradient-to-t from-transparent to-heat-blue/60 rounded-full"
                              style={{
                                left: `${15 + i * 14}%`,
                                bottom: '20%',
                              }}
                            />
                          ))}
                          <motion.div
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 3, repeat: Infinity }}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                          >
                            <Droplets className="w-20 h-20 text-heat-blue" />
                          </motion.div>
                        </>
                      )}
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mt-24"
        >
          <PremiumCard variant="gradient" padding="xl" className="max-w-4xl mx-auto">
            <h3 className="font-display text-3xl font-bold text-white mb-4">
              The Time for Action is Now
            </h3>
            <p className="text-text-muted mb-8 text-lg">
              HeatShield AI provides the intelligence and tools needed to combat this crisis. 
              From real-time monitoring to AI-powered predictions, we&apos;re building India&apos;s heat defense system.
            </p>
            <div className="flex items-center justify-center gap-4">
              <div className="flex items-center gap-2 text-success">
                <Zap className="w-5 h-5" />
                <span className="font-semibold">Real-time Monitoring</span>
              </div>
              <div className="w-px h-6 bg-white/20" />
              <div className="flex items-center gap-2 text-primary">
                <TrendingUp className="w-5 h-5" />
                <span className="font-semibold">AI Predictions</span>
              </div>
              <div className="w-px h-6 bg-white/20" />
              <div className="flex items-center gap-2 text-secondary">
                <Shield className="w-5 h-5" />
                <span className="font-semibold">Proactive Response</span>
              </div>
            </div>
          </PremiumCard>
        </motion.div>
      </motion.div>
    </section>
  )
}
