'use client'

import { motion } from 'framer-motion'
import { Map, Brain, Shield, AlertTriangle, BarChart3, Satellite, Users, Zap, Clock, Globe, Lock, Smartphone } from 'lucide-react'
import { PremiumCard } from '@/components/ui/premium'

const features = [
  {
    icon: Map,
    title: 'Live GIS Intelligence',
    description: 'Real-time geospatial monitoring with multi-layer visualization including satellite, street, terrain, and heat data layers.',
    highlights: ['Satellite View', 'Heat Layers', 'NDVI Analysis', 'Population Density'],
    color: 'primary',
  },
  {
    icon: Brain,
    title: 'AI Prediction Engine',
    description: 'Advanced machine learning models forecast heat events 72 hours ahead with confidence intervals and risk assessment.',
    highlights: ['72-hour Forecast', 'Confidence Scores', 'Pattern Recognition', 'Anomaly Detection'],
    color: 'secondary',
  },
  {
    icon: Shield,
    title: 'Risk Assessment',
    description: 'Comprehensive vulnerability analysis for infrastructure, populations, and critical assets with automated scoring.',
    highlights: ['Infrastructure Risk', 'Population Vulnerability', 'Asset Protection', 'Impact Modeling'],
    color: 'orange',
  },
  {
    icon: AlertTriangle,
    title: 'Smart Alerting',
    description: 'Intelligent early warning system with multi-channel notifications, escalation protocols, and response coordination.',
    highlights: ['Multi-channel Alerts', 'Escalation Rules', 'Response Teams', 'SOS Integration'],
    color: 'danger',
  },
  {
    icon: BarChart3,
    title: 'Executive Analytics',
    description: 'Command center dashboards with KPIs, trend analysis, and executive reporting for decision-makers.',
    highlights: ['Real-time KPIs', 'Trend Analysis', 'Executive Reports', 'Custom Dashboards'],
    color: 'success',
  },
  {
    icon: Satellite,
    title: 'Satellite Integration',
    description: 'Direct integration with ISRO/NRSC satellite feeds for continuous thermal monitoring and change detection.',
    highlights: ['ISRO Feed', 'NRSC Data', 'Change Detection', 'Historical Analysis'],
    color: 'blue',
  },
  {
    icon: Users,
    title: 'Citizen Portal',
    description: 'Public-facing platform for heat index information, cooling center locations, and emergency services.',
    highlights: ['Heat Index', 'Cooling Centers', 'Emergency Services', 'Health Advisory'],
    color: 'warning',
  },
  {
    icon: Zap,
    title: 'Smart Recommendations',
    description: 'AI-generated mitigation strategies including green infrastructure, cool pavements, and urban planning solutions.',
    highlights: ['Green Roofs', 'Cool Pavements', 'Urban Forests', 'Cost Estimates'],
    color: 'red-800',
  },
]

const getFeatureColorClass = (color: string) => {
  const colorMap: Record<string, string> = {
    primary: 'bg-primary/10 border-primary/30',
    secondary: 'bg-secondary/10 border-secondary/30',
    orange: 'bg-orange/10 border-orange/30',
    danger: 'bg-danger/10 border-danger/30',
    success: 'bg-success/10 border-success/30',
    blue: 'bg-blue/10 border-blue/30',
    warning: 'bg-warning/10 border-warning/30',
    'red-800': 'bg-red-800/10 border-red-800/30',
  }
  return colorMap[color] || 'bg-primary/10 border-primary/30'
}

const getFeatureTextColorClass = (color: string) => {
  const colorMap: Record<string, string> = {
    primary: 'text-primary',
    secondary: 'text-secondary',
    orange: 'text-orange',
    danger: 'text-danger',
    success: 'text-success',
    blue: 'text-blue',
    warning: 'text-warning',
    'red-800': 'text-red-800',
  }
  return colorMap[color] || 'text-primary'
}

export default function PremiumPlatformFeatures() {
  return (
    <section className="relative py-32 bg-background overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-surface to-background" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.02)_1px,transparent_1px)] bg-[size:100px_100px]" />

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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-secondary/30 mb-6"
          >
            <Zap className="w-4 h-4 text-secondary" />
            <span className="text-sm font-medium text-secondary">Platform Capabilities</span>
          </motion.div>
          
          <h2 className="font-display text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-white">Enterprise-Grade</span>
            <span className="text-gradient"> Features</span>
          </h2>
          
          <p className="text-xl text-text-muted max-w-3xl mx-auto">
            A comprehensive suite of tools designed for national command centers, 
            municipal corporations, and disaster management agencies.
          </p>
        </motion.div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <PremiumCard 
                variant="glass" 
                padding="lg" 
                className="h-full hover:shadow-card-hover transition-all duration-300"
              >
                {/* Icon */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
                  className={`w-16 h-16 rounded-2xl border flex items-center justify-center mb-6 ${getFeatureColorClass(feature.color)}`}
                >
                  <feature.icon className={`w-8 h-8 ${getFeatureTextColorClass(feature.color)}`} />
                </motion.div>

                {/* Content */}
                <h3 className="font-display text-xl font-bold text-white mb-3">
                  {feature.title}
                </h3>
                
                <p className="text-text-muted text-sm leading-relaxed mb-6">
                  {feature.description}
                </p>

                {/* Highlights */}
                <div className="space-y-2 pt-4 border-t border-white/10">
                  {feature.highlights.map((highlight) => (
                    <div
                      key={highlight}
                      className="flex items-center gap-2 text-xs text-text-muted"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </PremiumCard>
            </motion.div>
          ))}
        </div>

        {/* Additional capabilities */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20"
        >
          <PremiumCard variant="gradient" padding="xl">
            <div className="grid lg:grid-cols-4 gap-8">
              <div className="space-y-3">
                <Clock className="w-8 h-8 text-primary mb-2" />
                <h4 className="font-display text-lg font-bold text-white">Real-time</h4>
                <p className="text-sm text-text-muted">Sub-second data processing and live updates across all modules</p>
              </div>
              <div className="space-y-3">
                <Globe className="w-8 h-8 text-secondary mb-2" />
                <h4 className="font-display text-lg font-bold text-white">Pan-India</h4>
                <p className="text-sm text-text-muted">Comprehensive coverage of all major cities and urban centers</p>
              </div>
              <div className="space-y-3">
                <Lock className="w-8 h-8 text-success mb-2" />
                <h4 className="font-display text-lg font-bold text-white">Secure</h4>
                <p className="text-sm text-text-muted">Enterprise-grade security with role-based access control</p>
              </div>
              <div className="space-y-3">
                <Smartphone className="w-8 h-8 text-orange mb-2" />
                <h4 className="font-display text-lg font-bold text-white">Mobile-First</h4>
                <p className="text-sm text-text-muted">Native mobile apps with offline capabilities and push notifications</p>
              </div>
            </div>
          </PremiumCard>
        </motion.div>
      </div>
    </section>
  )
}
