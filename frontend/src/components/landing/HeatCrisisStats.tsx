'use client'

import { motion } from 'framer-motion'
import { Building2, Users, Clock, Target } from 'lucide-react'

const stats = [
  {
    value: '500+',
    label: 'Cities Supported',
    icon: Building2,
    description: 'Across all Indian states and union territories',
    color: 'primary'
  },
  {
    value: '1M+',
    label: 'Citizens Protected',
    icon: Users,
    description: 'Real-time heat risk monitoring and alerts',
    color: 'secondary'
  },
  {
    value: '72 Hours',
    label: 'Forecast Window',
    icon: Clock,
    description: 'Advanced predictive modeling capabilities',
    color: 'warning'
  },
  {
    value: '99.2%',
    label: 'Prediction Accuracy',
    icon: Target,
    description: 'Validated against ground station data',
    color: 'success'
  },
]

export default function HeatCrisisStats() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">Heat Crisis Response</h2>
          <p className="text-text-muted max-w-2xl mx-auto text-lg">
            Nationwide urban heat intelligence infrastructure protecting millions of citizens
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              <div className="glass-card rounded-2xl p-8 border border-white/10 hover:border-primary/30 transition-all duration-300 h-full">
                <div className="flex flex-col items-center text-center">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br from-${stat.color}/20 to-${stat.color}/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <stat.icon className={`w-8 h-8 text-${stat.color}`} />
                  </div>
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                    className="mb-3"
                  >
                    <div className="text-5xl font-bold text-white mb-2">{stat.value}</div>
                  </motion.div>
                  <h3 className="text-xl font-semibold text-white mb-3">{stat.label}</h3>
                  <p className="text-sm text-text-muted leading-relaxed">{stat.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
