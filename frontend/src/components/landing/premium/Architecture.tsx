'use client'

import { motion } from 'framer-motion'
import { Server, Database, Cloud, Shield, Cpu, Globe, Lock, Zap, Brain } from 'lucide-react'
import { PremiumCard } from '@/components/ui/premium'

const architectureLayers = [
  {
    icon: Globe,
    title: 'Data Layer',
    description: 'Multi-source data ingestion from satellites, weather stations, IoT sensors, and government databases.',
    components: ['Satellite Feeds', 'Weather APIs', 'IoT Sensors', 'Government Data'],
    color: 'primary',
  },
  {
    icon: Server,
    title: 'Processing Layer',
    description: 'High-performance computing infrastructure for real-time data processing and AI model inference.',
    components: ['GPU Clusters', 'Edge Computing', 'Stream Processing', 'Batch Processing'],
    color: 'secondary',
  },
  {
    icon: Brain,
    title: 'AI Layer',
    description: 'Advanced machine learning models for prediction, anomaly detection, and recommendation generation.',
    components: ['Deep Learning', 'Time Series', 'Computer Vision', 'NLP'],
    color: 'orange',
  },
  {
    icon: Cloud,
    title: 'Storage Layer',
    description: 'Scalable cloud infrastructure with data lakes, warehouses, and real-time databases.',
    components: ['Data Lakes', 'Time-Series DB', 'Vector Store', 'Cache Layer'],
    color: 'blue',
  },
  {
    icon: Shield,
    title: 'Security Layer',
    description: 'Enterprise-grade security with encryption, access control, and compliance certifications.',
    components: ['End-to-End Encryption', 'RBAC', 'Audit Logs', 'Compliance'],
    color: 'success',
  },
  {
    icon: Zap,
    title: 'API Layer',
    description: 'RESTful and GraphQL APIs for seamless integration with government systems and third-party applications.',
    components: ['REST API', 'GraphQL', 'Webhooks', 'SDKs'],
    color: 'warning',
  },
]

const getLayerColorClass = (color: string) => {
  const colorMap: Record<string, string> = {
    primary: 'bg-primary/10 border-primary/30',
    secondary: 'bg-secondary/10 border-secondary/30',
    orange: 'bg-orange/10 border-orange/30',
    blue: 'bg-blue/10 border-blue/30',
    success: 'bg-success/10 border-success/30',
    warning: 'bg-warning/10 border-warning/30',
  }
  return colorMap[color] || 'bg-primary/10 border-primary/30'
}

const getLayerTextColorClass = (color: string) => {
  const colorMap: Record<string, string> = {
    primary: 'text-primary',
    secondary: 'text-secondary',
    orange: 'text-orange',
    blue: 'text-blue',
    success: 'text-success',
    warning: 'text-warning',
  }
  return colorMap[color] || 'text-primary'
}

export default function PremiumArchitecture() {
  return (
    <section className="relative py-32 bg-background overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-surface to-background" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(31,162,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(31,162,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px]" />

      <div className="relative z-10 w-full max-w-full mx-auto px-6">
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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-secondary/30 mb-6"
          >
            <Server className="w-4 h-4 text-secondary" />
            <span className="text-sm font-medium text-secondary">Enterprise Architecture</span>
          </motion.div>
          
          <h2 className="font-display text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-white">Platform</span>
            <span className="text-gradient"> Architecture</span>
          </h2>
          
          <p className="text-xl text-text-muted max-w-3xl mx-auto">
            Built on a modern, scalable architecture designed for high availability, security, and performance 
            at national scale.
          </p>
        </motion.div>

        {/* Architecture diagram */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <PremiumCard variant="glass" padding="xl">
            <div className="space-y-8">
              {/* Layer stack */}
              <div className="space-y-4">
                {architectureLayers.map((layer, index) => (
                  <motion.div
                    key={layer.title}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="flex items-start gap-6"
                  >
                    {/* Layer icon */}
                    <div className={`w-12 h-12 rounded-xl border flex items-center justify-center flex-shrink-0 ${getLayerColorClass(layer.color)}`}>
                      <layer.icon className={`w-6 h-6 ${getLayerTextColorClass(layer.color)}`} />
                    </div>

                    {/* Layer content */}
                    <div className="flex-1 glass-card rounded-lg p-4 border border-white/10">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-display text-lg font-bold text-white">{layer.title}</h4>
                        <div className="text-xs text-text-muted">Layer {index + 1}</div>
                      </div>
                      <p className="text-sm text-text-muted mb-3">{layer.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {layer.components.map((component) => (
                          <span
                            key={component}
                            className="px-2 py-1 text-xs rounded-full bg-white/5 border border-white/10 text-text-muted"
                          >
                            {component}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Connection line */}
                    {index < architectureLayers.length - 1 && (
                      <div className="absolute left-6 w-0.5 h-8 bg-gradient-to-b from-primary/30 to-transparent" />
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </PremiumCard>
        </motion.div>

        {/* Tech stack */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="grid lg:grid-cols-3 gap-8">
            <PremiumCard variant="glass" padding="lg">
              <div className="flex items-center gap-3 mb-4">
                <Database className="w-6 h-6 text-primary" />
                <h4 className="font-display text-lg font-bold text-white">Data Stack</h4>
              </div>
              <div className="space-y-2">
                {['PostgreSQL + PostGIS', 'TimescaleDB', 'Apache Kafka', 'MinIO Object Storage'].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-text-muted">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </PremiumCard>

            <PremiumCard variant="glass" padding="lg">
              <div className="flex items-center gap-3 mb-4">
                <Cpu className="w-6 h-6 text-secondary" />
                <h4 className="font-display text-lg font-bold text-white">AI Stack</h4>
              </div>
              <div className="space-y-2">
                {['TensorFlow', 'PyTorch', 'Scikit-learn', 'OpenCV'].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-text-muted">
                    <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </PremiumCard>

            <PremiumCard variant="glass" padding="lg">
              <div className="flex items-center gap-3 mb-4">
                <Lock className="w-6 h-6 text-success" />
                <h4 className="font-display text-lg font-bold text-white">Security Stack</h4>
              </div>
              <div className="space-y-2">
                {['AES-256 Encryption', 'OAuth 2.0', 'SOC 2 Type II', 'ISO 27001'].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-text-muted">
                    <div className="w-1.5 h-1.5 rounded-full bg-success" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </PremiumCard>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
