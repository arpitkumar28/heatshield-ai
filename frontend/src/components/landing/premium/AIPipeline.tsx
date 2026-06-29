'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { Satellite, Cloud, Leaf, Brain, TrendingUp, Lightbulb, CheckCircle, ArrowRight, Zap, Database, Cpu, Shield, Bell, Building } from 'lucide-react'
import { PremiumCard } from '@/components/ui/premium'
import { useRef, useState } from 'react'

const pipelineStages = [
  {
    icon: Satellite,
    title: 'Satellite Imagery',
    description: 'Real-time data from ISRO and NRSC satellites capturing thermal signatures across urban landscapes.',
    tech: ['INSAT', 'Resourcesat', 'Cartosat'],
    color: 'primary',
    data: '10TB/day',
  },
  {
    icon: Cloud,
    title: 'Weather Data',
    description: 'Meteorological inputs including temperature, humidity, wind patterns, and atmospheric conditions.',
    tech: ['IMD Data', 'AWS Stations', 'Sensors'],
    color: 'accent',
    data: '1,200+ stations',
  },
  {
    icon: Leaf,
    title: 'NDVI Analysis',
    description: 'Vegetation health assessment through Normalized Difference Vegetation Index processing.',
    tech: ['Green Cover', 'Parks', 'Urban Forests'],
    color: 'success',
    data: 'Real-time',
  },
  {
    icon: Brain,
    title: 'AI Processing',
    description: 'Advanced machine learning models analyze multi-modal data to detect heat patterns and anomalies.',
    tech: ['Deep Learning', 'CNN', 'Transformers'],
    color: 'secondary',
    data: '50+ models',
  },
  {
    icon: TrendingUp,
    title: 'Prediction Engine',
    description: 'Forecast heat wave events 72 hours in advance with confidence intervals and risk assessment.',
    tech: ['Time Series', 'Ensemble', 'Probabilistic'],
    color: 'warning',
    data: '72hr forecast',
  },
  {
    icon: Lightbulb,
    title: 'Smart Recommendations',
    description: 'AI-generated mitigation strategies tailored to specific urban contexts and infrastructure.',
    tech: ['Green Roofs', 'Cool Pavements', 'Urban Forests'],
    color: 'warning',
    data: 'AI-generated',
  },
  {
    icon: Shield,
    title: 'Government Dashboard',
    description: 'Centralized command interface for NDMA, Smart Cities, and disaster management agencies.',
    tech: ['Real-time', 'Alerts', 'Reports'],
    color: 'danger',
    data: 'Enterprise',
  },
  {
    icon: Bell,
    title: 'Citizen Alert',
    description: 'Automated public notifications via SMS, app push, and digital displays during heat emergencies.',
    tech: ['SMS', 'Push', 'Digital'],
    color: 'danger',
    data: 'Automated',
  },
]

const getStageColorClass = (color: string) => {
  const colorMap: Record<string, string> = {
    primary: 'bg-primary/10 border-primary/30',
    accent: 'bg-accent/10 border-accent/30',
    success: 'bg-success/10 border-success/30',
    secondary: 'bg-secondary/10 border-secondary/30',
    warning: 'bg-warning/10 border-warning/30',
    danger: 'bg-danger/10 border-danger/30',
  }
  return colorMap[color] || 'bg-primary/10 border-primary/30'
}

const getStageTextColorClass = (color: string) => {
  const colorMap: Record<string, string> = {
    primary: 'text-primary',
    accent: 'text-accent',
    success: 'text-success',
    secondary: 'text-secondary',
    warning: 'text-warning',
    danger: 'text-danger',
  }
  return colorMap[color] || 'text-primary'
}

export default function PremiumAIPipeline() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [hoveredStage, setHoveredStage] = useState<number | null>(null)
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

      {/* Animated gradient background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ 
            scale: [1, 1.25, 1],
            opacity: [0.15, 0.25, 0.15],
            x: [0, 30, 0],
          }}
          transition={{ duration: 12, repeat: Infinity }}
          className="absolute top-1/4 left-1/4 w-[900px] h-[900px] bg-primary/10 rounded-full blur-[180px]"
        />
        <motion.div
          animate={{ 
            scale: [1, 1.35, 1],
            opacity: [0.12, 0.22, 0.12],
            x: [0, -30, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, delay: 4 }}
          className="absolute bottom-1/4 right-1/4 w-[700px] h-[700px] bg-secondary/10 rounded-full blur-[140px]"
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
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-card border border-primary/30 mb-8"
          >
            <motion.div
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.2, 1],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Brain className="w-4 h-4 text-primary" />
            </motion.div>
            <span className="text-sm font-medium text-primary">AI-Powered Intelligence</span>
          </motion.div>
          
          <motion.h2 
            className="font-display text-5xl lg:text-7xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <span className="text-white block">Advanced AI</span>
            <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent block"> Pipeline</span>
          </motion.h2>
          
          <motion.p 
            className="text-xl text-text-muted max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            From satellite data to actionable insights. Our multi-stage AI pipeline processes 
            petabytes of data to deliver real-time heat intelligence and predictive analytics.
          </motion.p>
        </motion.div>

        {/* Horizontal animated pipeline */}
        <div className="relative overflow-x-auto pb-8">
          {/* Animated connection line */}
          <motion.div
            className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent via-secondary to-warning opacity-20 hidden lg:block"
            animate={{
              backgroundPosition: ['0% 0%', '100% 0%', '0% 0%'],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              backgroundSize: '200% 100%',
            }}
          />

          {/* Pipeline stages */}
          <div className="flex flex-nowrap lg:flex-wrap gap-6 lg:gap-8 min-w-max lg:min-w-0">
            {pipelineStages.map((stage, index) => (
              <motion.div
                key={stage.title}
                initial={{ opacity: 0, x: -50, y: 30 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: index * 0.08, ease: [0.4, 0, 0.2, 1] }}
                className="relative flex-shrink-0 w-80"
                onMouseEnter={() => setHoveredStage(index)}
                onMouseLeave={() => setHoveredStage(null)}
              >
                {/* Stage number badge */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08 + 0.2 }}
                  className="absolute -top-3 -left-3 w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-sm shadow-neon-primary z-20"
                >
                  {index + 1}
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05, y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="relative h-full"
                >
                  <PremiumCard variant="glass" padding="lg" className="h-full border-white/8 hover:border-white/16 transition-all">
                    {/* Icon with glow */}
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.08 + 0.3 }}
                      className={`w-20 h-20 rounded-2xl border flex items-center justify-center mb-6 ${getStageColorClass(stage.color)} relative`}
                    >
                      <motion.div
                        className="absolute inset-0 rounded-2xl blur-xl opacity-50"
                        animate={{
                          opacity: hoveredStage === index ? [0.5, 0.8, 0.5] : 0.5,
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                        style={{ backgroundColor: stage.color === 'primary' ? 'rgba(31,162,255,0.3)' : 
                                              stage.color === 'accent' ? 'rgba(0,229,255,0.3)' :
                                              stage.color === 'success' ? 'rgba(0,214,143,0.3)' :
                                              stage.color === 'secondary' ? 'rgba(59,130,246,0.3)' :
                                              stage.color === 'warning' ? 'rgba(255,176,32,0.3)' : 'rgba(255,92,92,0.3)' }}
                      />
                      <stage.icon className={`w-10 h-10 ${getStageTextColorClass(stage.color)} relative z-10`} />
                    </motion.div>

                    {/* Content */}
                    <h3 className="font-display text-xl font-bold text-white mb-3">
                      {stage.title}
                    </h3>
                    
                    <p className="text-text-muted text-sm leading-relaxed mb-6">
                      {stage.description}
                    </p>

                    {/* Tech stack */}
                    <div className="space-y-2 mb-4">
                      {stage.tech.map((tech) => (
                        <motion.div
                          key={tech}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.08 + 0.4 + stage.tech.indexOf(tech) * 0.1 }}
                          className="flex items-center gap-2 text-xs text-text-muted"
                        >
                          <motion.div
                            className="w-1.5 h-1.5 rounded-full bg-primary"
                            animate={{
                              scale: [1, 1.3, 1],
                            }}
                            transition={{ duration: 2, repeat: Infinity, delay: index * 0.1 }}
                          />
                          <span>{tech}</span>
                        </motion.div>
                      ))}
                    </div>

                    {/* Data indicator */}
                    <div className="pt-4 border-t border-white/8">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-text-muted">Data Flow</span>
                        <motion.span
                          className={`text-xs font-semibold ${getStageTextColorClass(stage.color)}`}
                          animate={{
                            opacity: [0.7, 1, 0.7],
                          }}
                          transition={{ duration: 2, repeat: Infinity, delay: index * 0.15 }}
                        >
                          {stage.data}
                        </motion.span>
                      </div>
                    </div>

                    {/* Data flow animation */}
                    {index < pipelineStages.length - 1 && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.08 + 0.5 }}
                        className="hidden lg:block absolute -right-6 top-1/2 -translate-y-1/2 z-30"
                      >
                        <motion.div
                          animate={{
                            x: [0, 10, 0],
                            opacity: [0.5, 1, 0.5],
                          }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          <ArrowRight className="w-6 h-6 text-primary/60" />
                        </motion.div>
                      </motion.div>
                    )}
                  </PremiumCard>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Data flow visualization */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-24"
        >
          <PremiumCard variant="gradient" padding="xl" className="border-white/8">
            <div className="grid lg:grid-cols-3 gap-10">
              {/* Data sources */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="space-y-5"
              >
                <div className="flex items-center gap-3 mb-6">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 10, repeat: Infinity }}
                  >
                    <Database className="w-7 h-7 text-primary" />
                  </motion.div>
                  <h4 className="font-display text-xl font-bold text-white">Data Sources</h4>
                </div>
                <div className="space-y-4">
                  {['Satellite Imagery (10TB/day)', 'Weather Stations (1,200+)', 'IoT Sensors (50,000+)', 'Historical Data (10+ years)'].map((item, i) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                      className="flex items-center gap-3 text-sm text-text-muted"
                    >
                      <motion.div
                        className="w-2 h-2 rounded-full bg-success"
                        animate={{
                          scale: [1, 1.4, 1],
                        }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                      />
                      <span>{item}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Processing power */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="space-y-5"
              >
                <div className="flex items-center gap-3 mb-6">
                  <motion.div
                    animate={{ rotate: [0, -360] }}
                    transition={{ duration: 15, repeat: Infinity }}
                  >
                    <Cpu className="w-7 h-7 text-secondary" />
                  </motion.div>
                  <h4 className="font-display text-xl font-bold text-white">Processing Power</h4>
                </div>
                <div className="space-y-4">
                  {['GPU Clusters (128 nodes)', 'Deep Learning Models (50+)', 'Real-time Inference (<100ms)', 'Daily Predictions (15M+)'].map((item, i) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.6 + i * 0.1 }}
                      className="flex items-center gap-3 text-sm text-text-muted"
                    >
                      <motion.div
                        className="w-2 h-2 rounded-full bg-secondary"
                        animate={{
                          scale: [1, 1.4, 1],
                        }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 + 0.5 }}
                      />
                      <span>{item}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Output */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="space-y-5"
              >
                <div className="flex items-center gap-3 mb-6">
                  <motion.div
                    animate={{ 
                      scale: [1, 1.2, 1],
                      rotate: [0, 10, -10, 0],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <Zap className="w-7 h-7 text-warning" />
                  </motion.div>
                  <h4 className="font-display text-xl font-bold text-white">Intelligence Output</h4>
                </div>
                <div className="space-y-4">
                  {['Heat Maps (Real-time)', 'Risk Scores (Per location)', 'Alerts (Automated)', 'Recommendations (AI-generated)'].map((item, i) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.7 + i * 0.1 }}
                      className="flex items-center gap-3 text-sm text-text-muted"
                    >
                      <motion.div
                        className="w-2 h-2 rounded-full bg-warning"
                        animate={{
                          scale: [1, 1.4, 1],
                        }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 + 1 }}
                      />
                      <span>{item}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </PremiumCard>
        </motion.div>
      </motion.div>
    </section>
  )
}
