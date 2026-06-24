'use client'

import { motion } from 'framer-motion'
import { 
  Flame, 
  Thermometer, 
  Leaf, 
  Users, 
  TrendingUp, 
  MapPin, 
  Building, 
  Lightbulb 
} from 'lucide-react'

const capabilities = [
  {
    icon: Flame,
    title: 'Urban Heat Island Detection',
    description: 'Identify and map heat islands across urban areas using satellite thermal imagery and ground sensor data fusion',
    category: 'Detection'
  },
  {
    icon: Thermometer,
    title: 'Satellite LST Monitoring',
    description: 'Continuous Land Surface Temperature monitoring with ISRO Bhuvan, Landsat, and Sentinel-2 data integration',
    category: 'Monitoring'
  },
  {
    icon: Leaf,
    title: 'NDVI Analytics',
    description: 'Vegetation health analysis to understand green cover impact on urban temperature distribution',
    category: 'Analytics'
  },
  {
    icon: Users,
    title: 'Population Vulnerability Scoring',
    description: 'Multi-factor risk assessment considering age, income, health conditions, and access to cooling infrastructure',
    category: 'Risk Assessment'
  },
  {
    icon: TrendingUp,
    title: 'Heatwave Forecasting',
    description: '72-hour advanced prediction of heatwave events with probability confidence intervals',
    category: 'Prediction'
  },
  {
    icon: Building,
    title: 'Cooling Center Planning',
    description: 'Optimal location recommendation for cooling centers based on vulnerable population density',
    category: 'Planning'
  },
  {
    icon: MapPin,
    title: 'Ward-Level Risk Mapping',
    description: 'Granular risk assessment at administrative ward level for targeted intervention planning',
    category: 'Mapping'
  },
  {
    icon: Lightbulb,
    title: 'AI Mitigation Recommendations',
    description: 'Data-driven suggestions for green infrastructure, reflective surfaces, and urban cooling strategies',
    category: 'Recommendations'
  },
]

export default function CoreCapabilities() {
  return (
    <section id="capabilities" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">Core Capabilities</h2>
          <p className="text-text-muted max-w-2xl mx-auto text-lg">
            Enterprise-grade urban heat intelligence features designed for government decision-making
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {capabilities.map((capability, index) => (
            <motion.div
              key={capability.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="glass-card rounded-xl p-6 border border-white/10 hover:border-primary/30 transition-all duration-300 h-full hover:shadow-neon-orange">
                <div className="flex flex-col h-full">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <capability.icon className="w-6 h-6 text-primary" />
                  </div>
                  
                  <span className="text-xs font-mono text-primary mb-2 uppercase tracking-wider">
                    {capability.category}
                  </span>
                  
                  <h3 className="text-lg font-semibold text-white mb-3">{capability.title}</h3>
                  <p className="text-sm text-text-muted leading-relaxed flex-grow">
                    {capability.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Capability summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-4 px-6 py-3 rounded-full glass-card border border-primary/30">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
              <span className="text-sm text-text-muted">All capabilities integrated into unified platform</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
