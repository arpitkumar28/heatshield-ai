'use client'

import { motion } from 'framer-motion'
import { Building2, Globe, Shield, Zap } from 'lucide-react'
import { PremiumCard } from '@/components/ui/premium'

const partners = [
  {
    name: 'ISRO',
    logo: '🛰️',
    description: 'Indian Space Research Organisation - Satellite data partnership',
    tier: 'strategic',
  },
  {
    name: 'NRSC',
    logo: '📡',
    description: 'National Remote Sensing Centre - Data processing integration',
    tier: 'strategic',
  },
  {
    name: 'NDMA',
    logo: '🛡️',
    description: 'National Disaster Management Authority - Emergency response',
    tier: 'government',
  },
  {
    name: 'Smart Cities Mission',
    logo: '🏙️',
    description: 'Ministry of Housing and Urban Affairs - Urban development',
    tier: 'government',
  },
  {
    name: 'IMD',
    logo: '🌤️',
    description: 'India Meteorological Department - Weather data integration',
    tier: 'data',
  },
  {
    name: 'NIOT',
    logo: '🌊',
    description: 'National Institute of Ocean Technology - Coastal monitoring',
    tier: 'research',
  },
  {
    name: 'IIT Delhi',
    logo: '🎓',
    description: 'Indian Institute of Technology - Research collaboration',
    tier: 'academic',
  },
  {
    name: 'ISI Kolkata',
    logo: '📊',
    description: 'Indian Statistical Institute - Data science partnership',
    tier: 'academic',
  },
]

const tierColors: Record<string, string> = {
  strategic: 'primary',
  government: 'secondary',
  data: 'heat-green',
  research: 'heat-yellow',
  academic: 'heat-orange',
}

export default function Partners() {
  return (
    <section className="relative py-32 bg-background overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-surface to-background" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,200,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,200,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px]" />

      <div className="relative z-10 container mx-auto px-6">
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
            <span className="text-sm font-medium text-primary">Our Partners</span>
          </motion.div>
          
          <h2 className="font-display text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-white">Trusted</span>
            <span className="text-gradient"> Partnerships</span>
          </h2>
          
          <p className="text-xl text-text-muted max-w-3xl mx-auto">
            Collaborating with India&apos;s leading government agencies, research institutions, and organizations.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <PremiumCard variant="glass" padding="lg" className="h-full text-center hover:shadow-card-hover transition-all duration-300">
                <div className="text-5xl mb-4">{partner.logo}</div>
                <h3 className="font-display text-lg font-bold text-white mb-2">
                  {partner.name}
                </h3>
                <p className="text-xs text-text-muted leading-relaxed">
                  {partner.description}
                </p>
                <div className="mt-4">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium bg-${tierColors[partner.tier]}/10 text-${tierColors[partner.tier]} border border-${tierColors[partner.tier]}/30`}>
                    {partner.tier}
                  </span>
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
            <div className="grid lg:grid-cols-3 gap-8 items-center">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Globe className="w-6 h-6 text-primary" />
                  <h4 className="font-display text-lg font-bold text-white">Global Standards</h4>
                </div>
                <p className="text-text-muted text-sm">
                  Our platform aligns with international standards for climate monitoring and disaster management.
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Shield className="w-6 h-6 text-secondary" />
                  <h4 className="font-display text-lg font-bold text-white">Security First</h4>
                </div>
                <p className="text-text-muted text-sm">
                  Enterprise-grade security with government-compliant data protection and access controls.
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Zap className="w-6 h-6 text-heat-orange" />
                  <h4 className="font-display text-lg font-bold text-white">24/7 Support</h4>
                </div>
                <p className="text-text-muted text-sm">
                  Dedicated support team with guaranteed response times for government partners.
                </p>
              </div>
            </div>
          </PremiumCard>
        </motion.div>
      </div>
    </section>
  )
}
