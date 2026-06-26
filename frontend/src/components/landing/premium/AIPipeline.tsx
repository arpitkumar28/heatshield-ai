'use client'

import { motion } from 'framer-motion'
import { Satellite, Cloud, Leaf, Brain, TrendingUp, Lightbulb, CheckCircle, ArrowRight, Zap, Database, Cpu } from 'lucide-react'
import { PremiumCard } from '@/components/ui/premium'

const pipelineStages = [
  {
    icon: Satellite,
    title: 'Satellite Imagery',
    description: 'Real-time data from ISRO and NRSC satellites capturing thermal signatures across urban landscapes.',
    tech: ['INSAT', 'Resourcesat', 'Cartosat'],
    color: 'primary',
  },
  {
    icon: Cloud,
    title: 'Weather Data',
    description: 'Meteorological inputs including temperature, humidity, wind patterns, and atmospheric conditions.',
    tech: ['IMD Data', 'AWS Stations', 'Sensors'],
    color: 'heat-blue',
  },
  {
    icon: Leaf,
    title: 'NDVI Analysis',
    description: 'Vegetation health assessment through Normalized Difference Vegetation Index processing.',
    tech: ['Green Cover', 'Parks', 'Urban Forests'],
    color: 'heat-green',
  },
  {
    icon: Brain,
    title: 'AI Processing',
    description: 'Advanced machine learning models analyze multi-modal data to detect heat patterns and anomalies.',
    tech: ['Deep Learning', 'CNN', 'Transformers'],
    color: 'secondary',
  },
  {
    icon: TrendingUp,
    title: 'Prediction Engine',
    description: 'Forecast heat wave events 72 hours in advance with confidence intervals and risk assessment.',
    tech: ['Time Series', 'Ensemble', 'Probabilistic'],
    color: 'heat-yellow',
  },
  {
    icon: Lightbulb,
    title: 'Smart Recommendations',
    description: 'AI-generated mitigation strategies tailored to specific urban contexts and infrastructure.',
    tech: ['Green Roofs', 'Cool Pavements', 'Urban Forests'],
    color: 'heat-orange',
  },
  {
    icon: CheckCircle,
    title: 'Impact Monitoring',
    description: 'Continuous tracking of intervention effectiveness and long-term urban heat reduction.',
    tech: ['Before/After', 'KPIs', 'Reports'],
    color: 'heat-red',
  },
]

export default function PremiumAIPipeline() {
  return (
    <section className="relative py-32 bg-background overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-surface to-background" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,200,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,200,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px]" />

      {/* Animated gradient background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-1/4 left-1/4 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[150px]"
        />
        <motion.div
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 12, repeat: Infinity, delay: 3 }}
          className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[120px]"
        />
      </div>

      <div className="relative z-10 container mx-auto px-6">
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
            <Brain className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">AI-Powered Intelligence</span>
          </motion.div>
          
          <h2 className="font-display text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-white">Advanced AI</span>
            <span className="text-gradient"> Pipeline</span>
          </h2>
          
          <p className="text-xl text-text-muted max-w-3xl mx-auto">
            From satellite data to actionable insights. Our multi-stage AI pipeline processes 
            petabytes of data to deliver real-time heat intelligence and predictive analytics.
          </p>
        </motion.div>

        {/* Pipeline visualization */}
        <div className="relative">
          {/* Connection line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-secondary to-heat-orange opacity-30" />
          
          {/* Pipeline stages */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {pipelineStages.map((stage, index) => (
              <motion.div
                key={stage.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative"
              >
                {/* Stage number */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
                  className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-sm shadow-neon-primary"
                >
                  {index + 1}
                </motion.div>

                <PremiumCard variant="glass" padding="lg" className="h-full">
                  {/* Icon */}
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
                    className={`w-16 h-16 rounded-2xl bg-${stage.color}/10 border border-${stage.color}/30 flex items-center justify-center mb-6`}
                  >
                    <stage.icon className={`w-8 h-8 text-${stage.color}`} />
                  </motion.div>

                  {/* Content */}
                  <h3 className="font-display text-xl font-bold text-white mb-3">
                    {stage.title}
                  </h3>
                  
                  <p className="text-text-muted text-sm leading-relaxed mb-6">
                    {stage.description}
                  </p>

                  {/* Tech stack */}
                  <div className="space-y-2">
                    {stage.tech.map((tech) => (
                      <div
                        key={tech}
                        className="flex items-center gap-2 text-xs text-text-muted"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        <span>{tech}</span>
                      </div>
                    ))}
                  </div>

                  {/* Connection arrow */}
                  {index < pipelineStages.length - 1 && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 + 0.5 }}
                      className="hidden lg:block absolute -right-4 top-1/2 -translate-y-1/2"
                    >
                      <ArrowRight className="w-6 h-6 text-primary/50" />
                    </motion.div>
                  )}
                </PremiumCard>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Data flow visualization */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20"
        >
          <PremiumCard variant="gradient" padding="xl">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Data sources */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <Database className="w-6 h-6 text-primary" />
                  <h4 className="font-display text-lg font-bold text-white">Data Sources</h4>
                </div>
                <div className="space-y-3">
                  {['Satellite Imagery (10TB/day)', 'Weather Stations (1,200+)', 'IoT Sensors (50,000+)', 'Historical Data (10+ years)'].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-sm text-text-muted">
                      <div className="w-1.5 h-1.5 rounded-full bg-success" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Processing power */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <Cpu className="w-6 h-6 text-secondary" />
                  <h4 className="font-display text-lg font-bold text-white">Processing Power</h4>
                </div>
                <div className="space-y-3">
                  {['GPU Clusters (128 nodes)', 'Deep Learning Models (50+)', 'Real-time Inference (<100ms)', 'Daily Predictions (15M+)'].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-sm text-text-muted">
                      <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Output */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <Zap className="w-6 h-6 text-heat-orange" />
                  <h4 className="font-display text-lg font-bold text-white">Intelligence Output</h4>
                </div>
                <div className="space-y-3">
                  {['Heat Maps (Real-time)', 'Risk Scores (Per location)', 'Alerts (Automated)', 'Recommendations (AI-generated)'].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-sm text-text-muted">
                      <div className="w-1.5 h-1.5 rounded-full bg-heat-orange" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </PremiumCard>
        </motion.div>
      </div>
    </section>
  )
}
