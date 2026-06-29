'use client'

import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { Thermometer, AlertTriangle, Users, Building2, TrendingUp, Zap, Flame, Droplets, Shield, ArrowRight, Activity, HeartPulse } from 'lucide-react'
import { PremiumCard, PremiumButton } from '@/components/ui/premium'
import { useRef, useState } from 'react'

const crisisStages = [
  {
    icon: Thermometer,
    title: 'Rising Temperatures',
    description: 'Urban heat islands are intensifying, with cities experiencing temperatures 5-8°C higher than surrounding areas.',
    stats: { value: '45°C', label: 'Peak Temperature', change: '+2.5°C' },
    color: 'warning',
    before: '32°C avg',
    after: '45°C peak',
  },
  {
    icon: Flame,
    title: 'Heat Crisis Escalation',
    description: 'Heat waves are becoming more frequent and severe, threatening vulnerable populations and infrastructure.',
    stats: { value: '234', label: 'Heat Wave Days', change: '+45%' },
    color: 'danger',
    before: '120 days',
    after: '234 days',
  },
  {
    icon: AlertTriangle,
    title: 'Public Health Emergency',
    description: 'Heat-related illnesses surge, overwhelming healthcare systems and increasing mortality rates.',
    stats: { value: '2,400+', label: 'Annual Deaths', change: '+18%' },
    color: 'danger',
    before: '1,800 deaths',
    after: '2,400+ deaths',
  },
  {
    icon: Users,
    title: 'Vulnerable Communities',
    description: 'Low-income neighborhoods, elderly populations, and outdoor workers face disproportionate risks.',
    stats: { value: '120M', label: 'At-Risk Population', change: '+15%' },
    color: 'danger',
    before: '100M people',
    after: '120M people',
  },
  {
    icon: Building2,
    title: 'Infrastructure Stress',
    description: 'Power grids buckle under cooling demand, roads buckle, and water systems face unprecedented strain.',
    stats: { value: '8.2GW', label: 'Peak Power Demand', change: '+22%' },
    color: 'warning',
    before: '6.7GW demand',
    after: '8.2GW demand',
  },
  {
    icon: Droplets,
    title: 'Water Crisis',
    description: 'Depleting water tables and increased evaporation exacerbate drought conditions.',
    stats: { value: '45%', label: 'Water Table Drop', change: '-12%' },
    color: 'primary',
    before: 'Normal levels',
    after: '45% depletion',
  },
]

const temperatureBars = [58, 74, 66, 90, 78, 96, 72, 84]

const communityDots = Array.from({ length: 12 }, (_, i) => ({
  left: `${8 + ((i * 23) % 84)}%`,
  top: `${8 + ((i * 31) % 84)}%`,
  duration: 2.5 + (i % 4) * 0.35,
  delay: (i % 6) * 0.3,
}))

const getStageColorClass = (color: string) => {
  const colorMap: Record<string, string> = {
    warning: 'bg-warning/10 border-warning/30',
    danger: 'bg-danger/10 border-danger/30',
    primary: 'bg-primary/10 border-primary/30',
  }
  return colorMap[color] || 'bg-primary/10 border-primary/30'
}

const getStageTextColorClass = (color: string) => {
  const colorMap: Record<string, string> = {
    warning: 'text-warning',
    danger: 'text-danger',
    primary: 'text-primary',
  }
  return colorMap[color] || 'text-primary'
}

export default function PremiumHeatCrisisStory() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [hoveredStage, setHoveredStage] = useState<number | null>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const scale = useSpring(useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]), { stiffness: 100, damping: 30 })

  return (
    <section ref={containerRef} className="relative py-32 bg-background overflow-hidden">
      {/* Background effects with warm gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-[#0A0F18] to-background" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,92,92,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,92,92,0.02)_1px,transparent_1px)] bg-[size:100px_100px]" />
      
      {/* Animated heat gradient background */}
      <motion.div
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(255,92,92,0.08),transparent_50%),radial-gradient(ellipse_at_70%_80%,rgba(255,176,32,0.06),transparent_50%)] bg-[length:200%_200%]"
      />

      <motion.div
        style={{ opacity, scale }}
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
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-card border border-danger/30 mb-8"
          >
            <motion.div
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.2, 1],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <AlertTriangle className="w-4 h-4 text-danger" />
            </motion.div>
            <span className="text-sm font-medium text-danger">Climate Crisis</span>
          </motion.div>
          
          <motion.h2 
            className="font-display text-5xl lg:text-7xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <span className="text-white block">The Urban Heat</span>
            <span className="bg-gradient-to-r from-warning via-danger to-danger bg-clip-text text-transparent block"> Crisis</span>
          </motion.h2>
          
          <motion.p 
            className="text-xl text-text-muted max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            A cascading crisis threatening India&apos;s urban future. From rising temperatures to public health emergencies, 
            the heat wave challenge demands immediate, intelligent action.
          </motion.p>
        </motion.div>

        {/* Interactive story stages with alternating timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-danger/30 to-transparent hidden lg:block" />
          
          {crisisStages.map((stage, index) => (
            <motion.div
              key={stage.title}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: [0.4, 0, 0.2, 1] }}
              className={`relative flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center mb-24`}
              onMouseEnter={() => setHoveredStage(index)}
              onMouseLeave={() => setHoveredStage(null)}
            >
              {/* Timeline dot */}
              <motion.div
                className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-4 border-background ${getStageTextColorClass(stage.color)} hidden lg:block z-20`}
                animate={{
                  scale: hoveredStage === index ? [1, 1.5, 1] : 1,
                  boxShadow: hoveredStage === index ? `0 0 20px ${stage.color === 'danger' ? 'rgba(255,92,92,0.8)' : 'rgba(255,176,32,0.8)'}` : 'none',
                }}
                transition={{ duration: 0.3 }}
              />

              {/* Content */}
              <div className="flex-1">
                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.1 + 0.2 }}
                  whileHover={{ scale: 1.02 }}
                  className="relative"
                >
                  <PremiumCard variant="glass" padding="lg" className="h-full border-white/8 hover:border-white/16 transition-all">
                    <div className="flex items-start gap-5 mb-6">
                      <motion.div
                        className={`p-4 rounded-2xl border ${getStageColorClass(stage.color)}`}
                        whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                        transition={{ duration: 0.5 }}
                      >
                        <stage.icon className={`w-8 h-8 ${getStageTextColorClass(stage.color)}`} />
                      </motion.div>
                      <div className="flex-1">
                        <h3 className="font-display text-2xl font-bold text-white mb-3">
                          {stage.title}
                        </h3>
                        <p className="text-text-muted leading-relaxed">
                          {stage.description}
                        </p>
                      </div>
                    </div>

                    {/* Stats with animation */}
                    <div className="flex items-center gap-8 pt-6 border-t border-white/8">
                      <div>
                        <motion.div 
                          className="font-display text-5xl font-bold text-white mb-1"
                          animate={{ scale: hoveredStage === index ? [1, 1.1, 1] : 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          {stage.stats.value}
                        </motion.div>
                        <div className="text-sm text-text-muted">{stage.stats.label}</div>
                      </div>
                      <div className={`text-lg font-semibold ${stage.stats.change.startsWith('+') ? 'text-danger' : 'text-success'} flex items-center gap-2`}>
                        <motion.span
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        >
                          {stage.stats.change.startsWith('+') ? '↑' : '↓'}
                        </motion.span>
                        {stage.stats.change}
                      </div>
                    </div>

                    {/* Before/After comparison */}
                    <div className="mt-6 pt-6 border-t border-white/8">
                      <div className="flex items-center justify-between text-sm">
                        <div className="text-text-muted">
                          <span className="block mb-1">Before</span>
                          <span className="text-white font-medium">{stage.before}</span>
                        </div>
                        <motion.div
                          className="flex-1 mx-4 h-1 bg-gradient-to-r from-primary via-warning to-danger rounded-full"
                          animate={{
                            scaleX: [0.8, 1, 0.8],
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                        <div className="text-right">
                          <span className="block mb-1 text-text-muted">After</span>
                          <span className={`font-medium ${getStageTextColorClass(stage.color)}`}>{stage.after}</span>
                        </div>
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
                  <div className="glass-premium rounded-premium p-8 border border-white/8">
                    {/* Animated visualization */}
                    <div className="relative min-h-[350px] rounded-card bg-gradient-to-br from-background to-surface overflow-hidden">
                      {/* Background grid */}
                      <div className="absolute inset-0 bg-[linear-gradient(rgba(31,162,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(31,162,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
                      
                      {/* Dynamic elements based on stage */}
                      {index === 0 && (
                        <>
                          <motion.div
                            animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.5, 0.3] }}
                            transition={{ duration: 4, repeat: Infinity }}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full bg-warning/30 blur-2xl"
                          />
                          <motion.div
                            animate={{ y: [0, -25, 0], scale: [1, 1.1, 1] }}
                            transition={{ duration: 3, repeat: Infinity }}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                          >
                            <Thermometer className="w-20 h-20 text-warning" />
                          </motion.div>
                          {/* Temperature rise lines */}
                          {[...Array(8)].map((_, i) => (
                            <motion.div
                              key={i}
                              animate={{ 
                                height: [20, temperatureBars[i], 20],
                                opacity: [0.3, 0.6, 0.3],
                              }}
                              transition={{ 
                                duration: 2 + i * 0.2,
                                repeat: Infinity,
                                delay: i * 0.15,
                              }}
                              className="absolute bottom-8 w-2 bg-gradient-to-t from-warning to-danger rounded-full"
                              style={{
                                left: `${15 + i * 10}%`,
                              }}
                            />
                          ))}
                        </>
                      )}

                      {index === 1 && (
                        <>
                          {[...Array(6)].map((_, i) => (
                            <motion.div
                              key={i}
                              animate={{ 
                                scale: [1, 1.6, 1],
                                opacity: [0.4, 0.9, 0.4],
                              }}
                              transition={{ 
                                duration: 2.5 + i * 0.3,
                                repeat: Infinity,
                                delay: i * 0.2,
                              }}
                              className="absolute w-10 h-10 rounded-full bg-danger/50 blur-sm"
                              style={{
                                left: `${15 + i * 14}%`,
                                top: `${25 + (i % 2) * 35}%`,
                              }}
                            />
                          ))}
                          <motion.div
                            animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                            transition={{ duration: 12, repeat: Infinity }}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                          >
                            <Flame className="w-24 h-24 text-danger" />
                          </motion.div>
                        </>
                      )}

                      {index === 2 && (
                        <>
                          <motion.div
                            animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-danger/20 blur-3xl"
                          />
                          <motion.div
                            animate={{ 
                              rotate: [0, 15, -15, 0],
                              scale: [1, 1.1, 1],
                            }}
                            transition={{ duration: 0.6, repeat: Infinity }}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                          >
                            <AlertTriangle className="w-28 h-28 text-danger" />
                          </motion.div>
                          {/* Pulse rings */}
                          {[...Array(3)].map((_, i) => (
                            <motion.div
                              key={i}
                              animate={{ 
                                scale: [1, 2, 1],
                                opacity: [0.5, 0, 0.5],
                              }}
                              transition={{ 
                                duration: 2,
                                repeat: Infinity,
                                delay: i * 0.6,
                              }}
                              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border-2 border-danger/30"
                            />
                          ))}
                        </>
                      )}

                      {index === 3 && (
                        <>
                          {communityDots.map((dot, i) => (
                            <motion.div
                              key={i}
                              animate={{ 
                                scale: [0.6, 1.3, 0.6],
                                opacity: [0.3, 0.8, 0.3],
                              }}
                              transition={{ 
                                duration: dot.duration,
                                repeat: Infinity,
                                delay: dot.delay,
                              }}
                              className="absolute w-3 h-3 rounded-full bg-danger/60"
                              style={{
                                left: dot.left,
                                top: dot.top,
                              }}
                            />
                          ))}
                          <motion.div
                            animate={{ y: [0, -15, 0] }}
                            transition={{ duration: 2.5, repeat: Infinity }}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                          >
                            <Users className="w-24 h-24 text-danger" />
                          </motion.div>
                        </>
                      )}

                      {index === 4 && (
                        <>
                          <motion.div
                            animate={{ 
                              backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
                            }}
                            transition={{ duration: 4, repeat: Infinity }}
                            className="absolute inset-0 bg-gradient-to-br from-danger/15 via-warning/10 to-background"
                          />
                          <motion.div
                            animate={{ rotate: 180, scale: [1, 1.1, 1] }}
                            transition={{ duration: 10, repeat: Infinity }}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                          >
                            <Building2 className="w-24 h-24 text-warning" />
                          </motion.div>
                          {/* Power lines */}
                          {[...Array(4)].map((_, i) => (
                            <motion.div
                              key={i}
                              animate={{ 
                                opacity: [0.2, 0.6, 0.2],
                              }}
                              transition={{ 
                                duration: 1.5,
                                repeat: Infinity,
                                delay: i * 0.3,
                              }}
                              className="absolute w-1 h-24 bg-gradient-to-b from-transparent via-warning to-transparent"
                              style={{
                                left: `${20 + i * 20}%`,
                                top: '20%',
                              }}
                            />
                          ))}
                        </>
                      )}

                      {index === 5 && (
                        <>
                          {[...Array(8)].map((_, i) => (
                            <motion.div
                              key={i}
                              animate={{ 
                                y: [0, -40, 0],
                                opacity: [0, 1, 0],
                              }}
                              transition={{ 
                                duration: 2.5,
                                repeat: Infinity,
                                delay: i * 0.35,
                              }}
                              className="absolute w-1.5 h-20 bg-gradient-to-t from-transparent to-primary/60 rounded-full"
                              style={{
                                left: `${12 + i * 11}%`,
                                bottom: '15%',
                              }}
                            />
                          ))}
                          <motion.div
                            animate={{ scale: [1, 1.15, 1] }}
                            transition={{ duration: 3.5, repeat: Infinity }}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                          >
                            <Droplets className="w-24 h-24 text-primary" />
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
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mt-32"
        >
          <PremiumCard variant="gradient" padding="xl" className="max-w-4xl mx-auto border-white/8">
            <motion.h3 
              className="font-display text-4xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              The Time for Action is Now
            </motion.h3>
            <motion.p 
              className="text-text-muted mb-10 text-lg leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              HeatShield AI provides the intelligence and tools needed to combat this crisis. 
              From real-time monitoring to AI-powered predictions, we&apos;re building India&apos;s heat defense system.
            </motion.p>
            <motion.div 
              className="flex flex-wrap items-center justify-center gap-6 mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
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
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <PremiumButton size="lg" className="gap-2 shadow-neon-primary">
                <Activity className="w-5 h-5" />
                <span>Explore Solutions</span>
                <ArrowRight className="w-5 h-5" />
              </PremiumButton>
            </motion.div>
          </PremiumCard>
        </motion.div>
      </motion.div>
    </section>
  )
}
