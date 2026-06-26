'use client'

import { motion } from 'framer-motion'
import { TrendingUp, Users, TreePine, Droplets, Zap, Shield, Award, Target } from 'lucide-react'
import { PremiumCard } from '@/components/ui/premium'

const impactMetrics = [
  {
    icon: Users,
    title: 'Lives Protected',
    value: '8.9M',
    change: '+450K',
    description: 'Citizens covered by early warning systems and heat protection programs',
    color: 'primary',
  },
  {
    icon: TreePine,
    title: 'Green Cover Added',
    value: '2,400',
    change: '+320',
    unit: 'hectares',
    description: 'Urban green spaces created through AI-recommended interventions',
    color: 'heat-green',
  },
  {
    icon: Droplets,
    title: 'Water Saved',
    value: '15.2B',
    change: '+2.1B',
    unit: 'liters',
    description: 'Water conservation through smart cooling and irrigation systems',
    color: 'heat-blue',
  },
  {
    icon: Zap,
    title: 'Energy Reduced',
    value: '850',
    change: '+120',
    unit: 'GWh',
    description: 'Energy savings through cool roofs and efficient infrastructure',
    color: 'heat-yellow',
  },
  {
    icon: Shield,
    title: 'Critical Events Prevented',
    value: '47',
    change: '+12',
    description: 'Major heat-related disasters averted through early intervention',
    color: 'heat-red',
  },
  {
    icon: Award,
    title: 'Awards & Recognition',
    value: '12',
    change: '+4',
    description: 'National and international awards for climate innovation',
    color: 'heat-orange',
  },
]

const successStories = [
  {
    city: 'Delhi',
    title: 'Reduced heat-related hospitalizations by 34%',
    description: 'Implementation of early warning systems and cooling centers led to significant reduction in heat emergencies during summer 2025.',
    metrics: ['34% fewer hospitalizations', '156 cooling centers', '2.3M citizens covered'],
  },
  {
    city: 'Ahmedabad',
    title: 'Lowered urban heat island effect by 2.8°C',
    description: 'AI-guided green infrastructure and cool pavement implementation reduced urban temperatures across the city.',
    metrics: ['2.8°C temperature reduction', '450 hectares green cover', '1.8M citizens benefited'],
  },
  {
    city: 'Chennai',
    title: 'Achieved 45% faster emergency response',
    description: 'Integrated alert system and automated response protocols improved emergency response times during heat waves.',
    metrics: ['45% faster response', '89% citizen satisfaction', '24/7 monitoring'],
  },
]

export default function PremiumImpactMetrics() {
  return (
    <section className="relative py-32 bg-background overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-surface to-background" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.02)_1px,transparent_1px)] bg-[size:100px_100px]" />

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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-success/30 mb-6"
          >
            <TrendingUp className="w-4 h-4 text-success" />
            <span className="text-sm font-medium text-success">Proven Impact</span>
          </motion.div>
          
          <h2 className="font-display text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-white">Measurable</span>
            <span className="text-gradient"> Results</span>
          </h2>
          
          <p className="text-xl text-text-muted max-w-3xl mx-auto">
            Real impact across Indian cities. Our platform has delivered measurable improvements in 
            public health, environmental sustainability, and urban resilience.
          </p>
        </motion.div>

        {/* Impact metrics grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {impactMetrics.map((metric, index) => (
            <motion.div
              key={metric.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <PremiumCard variant="glass" padding="lg" className="text-center">
                {/* Icon */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
                  className={`w-16 h-16 rounded-2xl bg-${metric.color}/10 border border-${metric.color}/30 flex items-center justify-center mx-auto mb-6`}
                >
                  <metric.icon className={`w-8 h-8 text-${metric.color}`} />
                </motion.div>

                {/* Value */}
                <div className="mb-2">
                  <span className="font-display text-5xl font-bold text-white">{metric.value}</span>
                  {metric.unit && <span className="text-xl text-text-muted ml-1">{metric.unit}</span>}
                </div>

                {/* Change */}
                <div className="inline-flex items-center gap-1 text-success text-sm font-semibold mb-3">
                  <TrendingUp className="w-4 h-4" />
                  <span>{metric.change}</span>
                </div>

                {/* Title */}
                <h3 className="font-display text-lg font-bold text-white mb-2">
                  {metric.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-text-muted">
                  {metric.description}
                </p>
              </PremiumCard>
            </motion.div>
          ))}
        </div>

        {/* Success stories */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="text-center mb-12">
            <h3 className="font-display text-3xl font-bold text-white mb-4">Success Stories</h3>
            <p className="text-text-muted max-w-2xl mx-auto">
              Real-world implementations delivering tangible results across India
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <motion.div
                key={story.city}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
              >
                <PremiumCard variant="gradient" padding="lg" className="h-full">
                  {/* City */}
                  <div className="flex items-center gap-2 mb-4">
                    <Target className="w-5 h-5 text-primary" />
                    <span className="text-sm font-semibold text-primary">{story.city}</span>
                  </div>

                  {/* Title */}
                  <h4 className="font-display text-xl font-bold text-white mb-3">
                    {story.title}
                  </h4>

                  {/* Description */}
                  <p className="text-sm text-text-muted mb-6 leading-relaxed">
                    {story.description}
                  </p>

                  {/* Metrics */}
                  <div className="space-y-2 pt-4 border-t border-white/10">
                    {story.metrics.map((metric) => (
                      <div key={metric} className="flex items-center gap-2 text-sm text-text-muted">
                        <div className="w-1.5 h-1.5 rounded-full bg-success" />
                        <span>{metric}</span>
                      </div>
                    ))}
                  </div>
                </PremiumCard>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
