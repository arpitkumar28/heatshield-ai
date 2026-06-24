'use client'

import { motion } from 'framer-motion'
import { 
  Layout, 
  Server, 
  Database, 
  Cpu, 
  Globe, 
  Satellite,
  ArrowRight
} from 'lucide-react'

const architecture = [
  {
    category: 'Frontend',
    icon: Layout,
    technologies: ['Next.js 15', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    color: 'primary'
  },
  {
    category: 'Backend',
    icon: Server,
    technologies: ['FastAPI', 'Python', 'REST API', 'WebSocket'],
    color: 'secondary'
  },
  {
    category: 'Database',
    icon: Database,
    technologies: ['PostgreSQL', 'PostGIS', 'Redis', 'TimescaleDB'],
    color: 'success'
  },
  {
    category: 'ML/AI',
    icon: Cpu,
    technologies: ['XGBoost', 'Scikit-learn', 'TensorFlow', 'PyTorch'],
    color: 'warning'
  },
  {
    category: 'Maps',
    icon: Globe,
    technologies: ['Mapbox GL', 'Leaflet', 'OpenStreetMap', 'GeoJSON'],
    color: 'danger'
  },
  {
    category: 'Satellite',
    icon: Satellite,
    technologies: ['ISRO Bhuvan', 'Sentinel-2', 'Landsat 8/9', 'MODIS'],
    color: 'primary'
  },
]

export default function TechnologyArchitecture() {
  return (
    <section id="architecture" className="py-24 bg-background-dark">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">Technology Architecture</h2>
          <p className="text-text-muted max-w-2xl mx-auto text-lg">
            Enterprise-grade technology stack built for scalability, security, and performance
          </p>
        </motion.div>

        {/* Architecture diagram */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {architecture.map((layer, index) => (
            <motion.div
              key={layer.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="glass-card rounded-xl p-6 border border-white/10 hover:border-primary/30 transition-all duration-300 h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br from-${layer.color}/20 to-${layer.color}/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <layer.icon className={`w-6 h-6 text-${layer.color}`} />
                  </div>
                  <h3 className="text-lg font-semibold text-white">{layer.category}</h3>
                </div>
                
                <div className="space-y-2">
                  {layer.technologies.map((tech, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary/50" />
                      <span className="text-sm text-text-muted">{tech}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Data flow diagram */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="glass-card rounded-2xl p-8 border border-white/10"
        >
          <h3 className="text-2xl font-bold text-white mb-8 text-center">Data Flow Architecture</h3>
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Satellite Data */}
            <div className="flex-1 text-center">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mx-auto mb-3">
                <Satellite className="w-8 h-8 text-primary" />
              </div>
              <div className="text-sm font-semibold text-white mb-1">Satellite Data</div>
              <div className="text-xs text-text-muted">ISRO Bhuvan, Sentinel-2</div>
            </div>

            <ArrowRight className="w-6 h-6 text-primary/50 rotate-90 md:rotate-0" />

            {/* Processing */}
            <div className="flex-1 text-center">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-secondary/20 to-secondary/10 flex items-center justify-center mx-auto mb-3">
                <Server className="w-8 h-8 text-secondary" />
              </div>
              <div className="text-sm font-semibold text-white mb-1">Data Processing</div>
              <div className="text-xs text-text-muted">FastAPI, Python</div>
            </div>

            <ArrowRight className="w-6 h-6 text-primary/50 rotate-90 md:rotate-0" />

            {/* ML Engine */}
            <div className="flex-1 text-center">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-warning/20 to-warning/10 flex items-center justify-center mx-auto mb-3">
                <Cpu className="w-8 h-8 text-warning" />
              </div>
              <div className="text-sm font-semibold text-white mb-1">ML Engine</div>
              <div className="text-xs text-text-muted">XGBoost, TensorFlow</div>
            </div>

            <ArrowRight className="w-6 h-6 text-primary/50 rotate-90 md:rotate-0" />

            {/* Database */}
            <div className="flex-1 text-center">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-success/20 to-success/10 flex items-center justify-center mx-auto mb-3">
                <Database className="w-8 h-8 text-success" />
              </div>
              <div className="text-sm font-semibold text-white mb-1">Database</div>
              <div className="text-xs text-text-muted">PostGIS, PostgreSQL</div>
            </div>

            <ArrowRight className="w-6 h-6 text-primary/50 rotate-90 md:rotate-0" />

            {/* Frontend */}
            <div className="flex-1 text-center">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-danger/20 to-danger/10 flex items-center justify-center mx-auto mb-3">
                <Layout className="w-8 h-8 text-danger" />
              </div>
              <div className="text-sm font-semibold text-white mb-1">Frontend</div>
              <div className="text-xs text-text-muted">Next.js 15, React</div>
            </div>
          </div>
        </motion.div>

        {/* Security and compliance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-8 grid md:grid-cols-3 gap-6"
        >
          <div className="glass-card rounded-xl p-6 border border-white/10 text-center">
            <div className="text-2xl font-bold text-primary mb-2">ISO 27001</div>
            <div className="text-sm text-text-muted">Information Security</div>
          </div>
          <div className="glass-card rounded-xl p-6 border border-white/10 text-center">
            <div className="text-2xl font-bold text-secondary mb-2">GIGW</div>
            <div className="text-sm text-text-muted">Government Guidelines</div>
          </div>
          <div className="glass-card rounded-xl p-6 border border-white/10 text-center">
            <div className="text-2xl font-bold text-success mb-2">GDPR</div>
            <div className="text-sm text-text-muted">Data Protection</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
