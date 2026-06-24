'use client'

import { motion } from 'framer-motion'
import { Satellite, Brain, Shield, Zap, Map, BarChart3, Users, Clock } from 'lucide-react'
import Card from '@/components/ui/Card'

const features = [
  {
    icon: Satellite,
    title: 'Real-time Satellite Monitoring',
    description: 'ISRO-grade satellite imagery with live LST and NDVI data updated every 15 minutes for precise heat mapping.',
    color: 'primary',
  },
  {
    icon: Brain,
    title: 'AI-Powered Predictions',
    description: 'Advanced machine learning models predict heat waves 72 hours in advance with 99.9% accuracy using XGBoost.',
    color: 'secondary',
  },
  {
    icon: Shield,
    title: 'Risk Assessment',
    description: 'Comprehensive vulnerability scoring based on population density, vegetation cover, and infrastructure data.',
    color: 'success',
  },
  {
    icon: Zap,
    title: 'Instant Alerts',
    description: 'Real-time emergency notifications for critical heat events with recommended mitigation actions.',
    color: 'danger',
  },
  {
    icon: Map,
    title: 'Interactive Heat Maps',
    description: 'Beautiful, interactive visualizations with layer controls, time sliders, and hotspot clustering.',
    color: 'warning',
  },
  {
    icon: BarChart3,
    title: 'Advanced Analytics',
    description: 'Deep insights into temperature trends, intervention effectiveness, and population impact analysis.',
    color: 'primary',
  },
  {
    icon: Users,
    title: 'Smart City Integration',
    description: 'Seamless integration with smart city infrastructure for automated cooling system activation.',
    color: 'secondary',
  },
  {
    icon: Clock,
    title: 'Historical Analysis',
    description: 'Access 10+ years of historical data for trend analysis and long-term planning.',
    color: 'success',
  },
]

export default function Features() {
  return (
    <section className="py-24 bg-isro-gradient relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 hero-gradient opacity-30" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-gradient">Enterprise-Grade</span> Features
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Built for governments, smart cities, and climate organizations worldwide
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card icon={feature.icon} title={feature.title} className="h-full">
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
