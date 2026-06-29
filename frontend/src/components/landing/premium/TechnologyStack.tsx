'use client'

import { motion } from 'framer-motion'
import { Code, Database, Cloud, Shield, Zap, Cpu, Globe } from 'lucide-react'
import { PremiumCard } from '@/components/ui/premium'

const techCategories = [
  {
    icon: Code,
    title: 'Frontend',
    technologies: [
      { name: 'Next.js 15', description: 'React framework with App Router' },
      { name: 'TypeScript', description: 'Type-safe development' },
      { name: 'Tailwind CSS', description: 'Utility-first styling' },
      { name: 'Framer Motion', description: 'Production animations' },
    ],
    color: 'primary',
  },
  {
    icon: Cloud,
    title: 'Backend',
    technologies: [
      { name: 'FastAPI', description: 'High-performance Python framework' },
      { name: 'PostgreSQL + PostGIS', description: 'Geospatial database' },
      { name: 'Redis', description: 'Caching and session management' },
      { name: 'Celery', description: 'Distributed task queue' },
    ],
    color: 'secondary',
  },
  {
    icon: Cpu,
    title: 'AI/ML',
    technologies: [
      { name: 'PyTorch', description: 'Deep learning framework' },
      { name: 'TensorFlow', description: 'Machine learning models' },
      { name: 'Scikit-learn', description: 'Classical ML algorithms' },
      { name: 'SHAP', description: 'Explainable AI' },
    ],
    color: 'heat-orange',
  },
  {
    icon: Database,
    title: 'Data Processing',
    technologies: [
      { name: 'Apache Spark', description: 'Big data processing' },
      { name: 'GeoPandas', description: 'Geospatial data analysis' },
      { name: 'Rasterio', description: 'Raster data I/O' },
      { name: 'GDAL', description: 'Geospatial data abstraction' },
    ],
    color: 'heat-green',
  },
  {
    icon: Shield,
    title: 'Security',
    technologies: [
      { name: 'JWT Authentication', description: 'Token-based auth' },
      { name: 'RBAC', description: 'Role-based access control' },
      { name: 'HTTPS/TLS', description: 'Encrypted communications' },
      { name: 'OWASP Compliance', description: 'Security standards' },
    ],
    color: 'heat-red',
  },
  {
    icon: Globe,
    title: 'Infrastructure',
    technologies: [
      { name: 'Docker', description: 'Containerization' },
      { name: 'Kubernetes', description: 'Container orchestration' },
      { name: 'AWS', description: 'Cloud infrastructure' },
      { name: 'GitHub Actions', description: 'CI/CD pipeline' },
    ],
    color: 'heat-yellow',
  },
]

export default function TechnologyStack() {
  return (
    <section className="relative py-32 bg-background overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-surface to-background" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,200,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,200,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px]" />

      <div className="relative z-10 w-full max-w-full mx-auto px-6">
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
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Enterprise Technology</span>
          </motion.div>
          
          <h2 className="font-display text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-white">Technology</span>
            <span className="text-gradient"> Stack</span>
          </h2>
          
          <p className="text-xl text-text-muted max-w-3xl mx-auto">
            Built with enterprise-grade technologies for scalability, security, and performance. 
            Every component chosen for production readiness.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {techCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <PremiumCard variant="glass" padding="lg" className="h-full">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
                  className={`w-16 h-16 rounded-2xl bg-${category.color}/10 border border-${category.color}/30 flex items-center justify-center mb-6`}
                >
                  <category.icon className={`w-8 h-8 text-${category.color}`} />
                </motion.div>

                <h3 className="font-display text-xl font-bold text-white mb-4">
                  {category.title}
                </h3>
                
                <div className="space-y-3">
                  {category.technologies.map((tech) => (
                    <div key={tech.name} className="glass-card rounded-lg p-3 border border-white/5">
                      <div className="font-medium text-white text-sm mb-1">{tech.name}</div>
                      <div className="text-xs text-text-muted">{tech.description}</div>
                    </div>
                  ))}
                </div>
              </PremiumCard>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20"
        >
          <PremiumCard variant="gradient" padding="xl">
            <div className="grid lg:grid-cols-4 gap-8 text-center">
              <div className="space-y-2">
                <div className="font-display text-4xl font-bold text-white">99.9%</div>
                <div className="text-sm text-text-muted">Uptime SLA</div>
              </div>
              <div className="space-y-2">
                <div className="font-display text-4xl font-bold text-white">&lt;100ms</div>
                <div className="text-sm text-text-muted">API Response</div>
              </div>
              <div className="space-y-2">
                <div className="font-display text-4xl font-bold text-white">10PB+</div>
                <div className="text-sm text-text-muted">Data Processed</div>
              </div>
              <div className="space-y-2">
                <div className="font-display text-4xl font-bold text-white">24/7</div>
                <div className="text-sm text-text-muted">Support</div>
              </div>
            </div>
          </PremiumCard>
        </motion.div>
      </div>
    </section>
  )
}
