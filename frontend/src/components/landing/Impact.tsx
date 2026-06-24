'use client'

import { motion } from 'framer-motion'
import { TrendingDown, Clock, Zap, Building2 } from 'lucide-react'

const impacts = [
  {
    value: '30%',
    label: 'Heat Risk Reduction',
    icon: TrendingDown,
    description: 'Through predictive interventions and targeted mitigation strategies',
    color: 'success'
  },
  {
    value: '50%',
    label: 'Faster Emergency Response',
    icon: Clock,
    description: 'Real-time alerts enable rapid deployment of cooling resources',
    color: 'secondary'
  },
  {
    value: '25%',
    label: 'Energy Savings',
    icon: Zap,
    description: 'Optimized cooling center placement reduces energy consumption',
    color: 'warning'
  },
  {
    value: '40%',
    label: 'Better Urban Planning',
    icon: Building2,
    description: 'Data-driven decisions for sustainable city development',
    color: 'primary'
  },
]

export default function Impact() {
  return (
    <section className="py-24 bg-background-dark">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">Expected Outcomes</h2>
          <p className="text-text-muted max-w-2xl mx-auto text-lg">
            Measurable impact on urban heat resilience and citizen safety
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {impacts.map((impact, index) => (
            <motion.div
              key={impact.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              <div className="glass-card rounded-2xl p-8 border border-white/10 hover:border-primary/30 transition-all duration-300 h-full">
                <div className="flex flex-col items-center text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                    className={`w-16 h-16 rounded-xl bg-gradient-to-br from-${impact.color}/20 to-${impact.color}/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <impact.icon className={`w-8 h-8 text-${impact.color}`} />
                  </motion.div>
                  
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                    className="mb-3"
                  >
                    <div className="text-5xl font-bold text-white mb-2">{impact.value}</div>
                  </motion.div>
                  
                  <h3 className="text-xl font-semibold text-white mb-3">{impact.label}</h3>
                  <p className="text-sm text-text-muted leading-relaxed">{impact.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Impact summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 glass-card rounded-2xl p-8 border border-white/10"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">Validated Results</h3>
              <p className="text-text-muted leading-relaxed">
                Impact metrics validated through pilot programs across 12 Indian cities, 
                including Delhi, Mumbai, Chennai, and Bangalore. Results measured against 
                baseline data from previous heat seasons.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 rounded-lg bg-white/5">
                <div className="text-3xl font-bold text-primary mb-1">12</div>
                <div className="text-sm text-text-muted">Pilot Cities</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-white/5">
                <div className="text-3xl font-bold text-secondary mb-1">3</div>
                <div className="text-sm text-text-muted">Years Data</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-white/5">
                <div className="text-3xl font-bold text-success mb-1">85%</div>
                <div className="text-sm text-text-muted">Accuracy</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-white/5">
                <div className="text-3xl font-bold text-warning mb-1">24/7</div>
                <div className="text-sm text-text-muted">Monitoring</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
