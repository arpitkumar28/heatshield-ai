'use client'

import { motion } from 'framer-motion'
import { 
  Building2, 
  Shield, 
  MapPin, 
  HeartPulse, 
  FlaskConical, 
  Users 
} from 'lucide-react'

const useCases = [
  {
    icon: Building2,
    title: 'Smart Cities Mission',
    description: 'Support smart city initiatives with data-driven urban planning and heat resilience strategies',
    features: ['Real-time monitoring', 'Predictive analytics', 'Infrastructure planning']
  },
  {
    icon: Shield,
    title: 'Municipal Corporations',
    description: 'Empower local governance with ward-level risk mapping and targeted intervention capabilities',
    features: ['Ward-level insights', 'Resource optimization', 'Citizen safety']
  },
  {
    icon: MapPin,
    title: 'Urban Planning Authorities',
    description: 'Inform development decisions with heat impact assessments and long-term climate resilience planning',
    features: ['Impact assessment', 'Zoning support', 'Climate resilience']
  },
  {
    icon: HeartPulse,
    title: 'Disaster Management',
    description: 'Enhance emergency response with real-time heat alerts and vulnerable population identification',
    features: ['Early warning', 'Rapid response', 'Resource deployment']
  },
  {
    icon: Users,
    title: 'Public Health Departments',
    description: 'Protect vulnerable populations with heat health risk mapping and preventive healthcare planning',
    features: ['Health risk scoring', 'Preventive care', 'Vulnerability mapping']
  },
  {
    icon: FlaskConical,
    title: 'Climate Research Organizations',
    description: 'Advance urban climate research with comprehensive datasets and analytical tools',
    features: ['Research datasets', 'Analytical tools', 'Publication support']
  },
]

export default function GovernmentUseCases() {
  return (
    <section id="use-cases" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">Government Use Cases</h2>
          <p className="text-text-muted max-w-2xl mx-auto text-lg">
            Trusted by government agencies and organizations across India for urban heat management
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {useCases.map((useCase, index) => (
            <motion.div
              key={useCase.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="glass-card rounded-xl p-6 border border-white/10 hover:border-primary/30 transition-all duration-300 h-full">
                <div className="flex flex-col h-full">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <useCase.icon className="w-7 h-7 text-primary" />
                  </div>
                  
                  <h3 className="text-xl font-semibold text-white mb-3">{useCase.title}</h3>
                  <p className="text-sm text-text-muted leading-relaxed mb-4 flex-grow">
                    {useCase.description}
                  </p>
                  
                  <div className="space-y-2">
                    {useCase.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        <span className="text-xs text-text-muted">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Government partnership badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-4 px-8 py-4 rounded-full glass-card border border-primary/30">
            <Shield className="w-6 h-6 text-primary" />
            <div className="text-left">
              <div className="text-sm font-semibold text-white">Government Partnership Ready</div>
              <div className="text-xs text-text-muted">Compliant with GIGW and data security standards</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
