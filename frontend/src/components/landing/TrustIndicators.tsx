'use client'

import { motion } from 'framer-motion'
import { Satellite, Database, Cpu, Globe, Layers, Zap } from 'lucide-react'

const technologies = [
  {
    name: 'ISRO Bhuvan',
    icon: Satellite,
    description: 'Indian satellite imagery platform',
    category: 'Satellite'
  },
  {
    name: 'Landsat',
    icon: Globe,
    description: 'NASA Earth observation',
    category: 'Satellite'
  },
  {
    name: 'Sentinel-2',
    icon: Layers,
    description: 'ESA optical imaging',
    category: 'Satellite'
  },
  {
    name: 'FastAPI',
    icon: Zap,
    description: 'High-performance API framework',
    category: 'Backend'
  },
  {
    name: 'PostGIS',
    icon: Database,
    description: 'Spatial database extension',
    category: 'Database'
  },
  {
    name: 'XGBoost',
    icon: Cpu,
    description: 'Gradient boosting framework',
    category: 'ML'
  },
]

export default function TrustIndicators() {
  return (
    <section className="py-20 bg-background-dark border-y border-white/5">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Trusted Technologies</h2>
          <p className="text-text-muted max-w-2xl mx-auto">
            Built on enterprise-grade infrastructure and validated scientific platforms
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6">
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card rounded-xl p-6 border border-white/10 hover:border-primary/30 transition-all duration-300 group"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <tech.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-sm font-semibold text-white mb-1">{tech.name}</h3>
                <p className="text-xs text-text-muted mb-2">{tech.description}</p>
                <span className="text-xs px-2 py-1 rounded-full bg-white/5 text-text-muted">
                  {tech.category}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
