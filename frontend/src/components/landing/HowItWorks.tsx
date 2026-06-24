'use client'

import { motion } from 'framer-motion'
import { Satellite, Cpu, AlertTriangle, Lightbulb, LayoutDashboard, ArrowDown } from 'lucide-react'

const pipeline = [
  {
    icon: Satellite,
    title: 'Satellite Data',
    description: 'ISRO Bhuvan, Landsat, Sentinel-2 imagery ingestion',
    color: 'primary'
  },
  {
    icon: Cpu,
    title: 'Data Processing',
    description: 'LST extraction, NDVI calculation, atmospheric correction',
    color: 'secondary'
  },
  {
    icon: Cpu,
    title: 'AI Prediction Engine',
    description: 'XGBoost models for heat forecasting and risk scoring',
    color: 'warning'
  },
  {
    icon: AlertTriangle,
    title: 'Risk Analysis',
    description: 'Population vulnerability assessment and hotspot detection',
    color: 'danger'
  },
  {
    icon: Lightbulb,
    title: 'Recommendation Engine',
    description: 'AI-generated mitigation strategies and intervention planning',
    color: 'success'
  },
  {
    icon: LayoutDashboard,
    title: 'Government Dashboard',
    description: 'Real-time monitoring, alerts, and decision support',
    color: 'primary'
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-background-dark">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">How It Works</h2>
          <p className="text-text-muted max-w-2xl mx-auto text-lg">
            End-to-end pipeline from satellite imagery to actionable government intelligence
          </p>
        </motion.div>

        <div className="relative">
          {/* Connection line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/0 via-primary/50 to-primary/0 transform -translate-y-1/2" />

          <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-6">
            {pipeline.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                <div className="glass-card rounded-xl p-6 border border-white/10 hover:border-primary/30 transition-all duration-300 h-full group">
                  <div className="flex flex-col items-center text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                      className={`w-14 h-14 rounded-lg bg-gradient-to-br from-${step.color}/20 to-${step.color}/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <step.icon className={`w-7 h-7 text-${step.color}`} />
                    </motion.div>
                    
                    <div className="text-xs font-mono text-text-muted mb-2">
                      STEP {index + 1}
                    </div>
                    
                    <h3 className="text-base font-semibold text-white mb-3">{step.title}</h3>
                    <p className="text-xs text-text-muted leading-relaxed">{step.description}</p>
                  </div>
                </div>

                {/* Arrow connector for mobile */}
                {index < pipeline.length - 1 && (
                  <div className="lg:hidden flex justify-center my-2">
                    <ArrowDown className="w-5 h-5 text-primary/50" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Process summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 glass-card rounded-2xl p-8 border border-white/10"
        >
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">&lt; 5 min</div>
              <div className="text-sm text-text-muted">Data Processing Latency</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary mb-2">24/7</div>
              <div className="text-sm text-text-muted">Automated Monitoring</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-success mb-2">Real-time</div>
              <div className="text-sm text-text-muted">Alert Generation</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
