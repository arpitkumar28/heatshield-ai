'use client'

import { motion } from 'framer-motion'
import { Building2, Shield, Users, Zap, TreePine, AlertTriangle } from 'lucide-react'
import { PremiumCard } from '@/components/ui/premium'

const useCases = [
  {
    icon: Building2,
    title: 'ISRO & NRSC',
    description: 'Satellite data integration and thermal monitoring for national space research programs.',
    benefits: ['Real-time satellite feeds', 'Thermal anomaly detection', 'Change monitoring', 'Data validation'],
    color: 'primary',
  },
  {
    icon: Shield,
    title: 'NDMA',
    description: 'National Disaster Management Authority uses the platform for heat wave disaster preparedness.',
    benefits: ['Early warning systems', 'Evacuation planning', 'Resource allocation', 'Inter-agency coordination'],
    color: 'danger',
  },
  {
    icon: Users,
    title: 'Smart Cities Mission',
    description: 'Urban development agencies utilize heat intelligence for sustainable city planning.',
    benefits: ['Urban heat mapping', 'Infrastructure planning', 'Green zone identification', 'Climate resilience'],
    color: 'secondary',
  },
  {
    icon: Zap,
    title: 'State Governments',
    description: 'State-level monitoring and management of heat-related emergencies across districts.',
    benefits: ['District-level tracking', 'State-wide coordination', 'Resource management', 'Policy support'],
    color: 'orange',
  },
  {
    icon: TreePine,
    title: 'Municipal Corporations',
    description: 'City-level implementation of heat mitigation strategies and citizen services.',
    benefits: ['Local hotspot management', 'Cooling center operations', 'Citizen alerts', 'Infrastructure maintenance'],
    color: 'success',
  },
  {
    icon: AlertTriangle,
    title: 'Health Departments',
    description: 'Public health monitoring and heat-related illness prevention programs.',
    benefits: ['Health impact tracking', 'Hospital readiness', 'Public advisories', 'Emergency response'],
    color: 'warning',
  },
]

const getUseCaseColorClass = (color: string) => {
  const colorMap: Record<string, string> = {
    primary: 'bg-primary/10 border-primary/30',
    danger: 'bg-danger/10 border-danger/30',
    secondary: 'bg-secondary/10 border-secondary/30',
    orange: 'bg-orange/10 border-orange/30',
    success: 'bg-success/10 border-success/30',
    warning: 'bg-warning/10 border-warning/30',
  }
  return colorMap[color] || 'bg-primary/10 border-primary/30'
}

const getUseCaseTextColorClass = (color: string) => {
  const colorMap: Record<string, string> = {
    primary: 'text-primary',
    danger: 'text-danger',
    secondary: 'text-secondary',
    orange: 'text-orange',
    success: 'text-success',
    warning: 'text-warning',
  }
  return colorMap[color] || 'text-primary'
}

export default function PremiumGovernmentUseCases() {
  return (
    <section className="relative py-32 bg-background overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-surface to-background" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,200,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,200,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px]" />

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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-primary/30 mb-6"
          >
            <Building2 className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Government Partners</span>
          </motion.div>
          
          <h2 className="font-display text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-white">Trusted by</span>
            <span className="text-gradient"> Leaders</span>
          </h2>
          
          <p className="text-xl text-text-muted max-w-3xl mx-auto">
            Powering India&apos;s national heat management initiatives across central and state government agencies.
          </p>
        </motion.div>

        {/* Use cases grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {useCases.map((useCase, index) => (
            <motion.div
              key={useCase.title}
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
                  className={`w-16 h-16 rounded-2xl border flex items-center justify-center mb-6 ${getUseCaseColorClass(useCase.color)}`}
                >
                  <useCase.icon className={`w-8 h-8 ${getUseCaseTextColorClass(useCase.color)}`} />
                </motion.div>

                {/* Content */}
                <h3 className="font-display text-xl font-bold text-white mb-3">
                  {useCase.title}
                </h3>
                
                <p className="text-text-muted text-sm leading-relaxed mb-6">
                  {useCase.description}
                </p>

                {/* Benefits */}
                <div className="space-y-2 pt-4 border-t border-white/10">
                  {useCase.benefits.map((benefit) => (
                    <div
                      key={benefit}
                      className="flex items-center gap-2 text-xs text-text-muted"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-success" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </PremiumCard>
            </motion.div>
          ))}
        </div>

        {/* Trust indicators */}
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
                <div className="font-display text-4xl font-bold text-white">127</div>
                <div className="text-sm text-text-muted">Cities Covered</div>
              </div>
              <div className="space-y-2">
                <div className="font-display text-4xl font-bold text-white">28</div>
                <div className="text-sm text-text-muted">States Integrated</div>
              </div>
              <div className="space-y-2">
                <div className="font-display text-4xl font-bold text-white">15+</div>
                <div className="text-sm text-text-muted">Central Agencies</div>
              </div>
              <div className="space-y-2">
                <div className="font-display text-4xl font-bold text-white">500+</div>
                <div className="text-sm text-text-muted">Municipal Bodies</div>
              </div>
            </div>
          </PremiumCard>
        </motion.div>
      </div>
    </section>
  )
}
