'use client'

import { motion } from 'framer-motion'
import { MapPin, TrendingUp, CheckCircle, ArrowRight } from 'lucide-react'
import { PremiumCard, PremiumButton } from '@/components/ui/premium'

const caseStudies = [
  {
    city: 'Delhi',
    state: 'NCR',
    image: '🏛️',
    challenge: 'Extreme heat waves with temperatures exceeding 48°C, affecting 32.9M residents',
    solution: 'Implemented city-wide heat monitoring with 500+ IoT sensors and AI-powered predictions',
    results: {
      heatReduction: '3.2°C',
      alertsSent: '2.4M',
      livesProtected: '450K',
      coolingCenters: '127',
    },
    testimonial: 'HeatShield AI has transformed our heat management capabilities. The predictive alerts have saved countless lives during peak summer months.',
    author: 'Municipal Commissioner',
    color: 'heat-red',
  },
  {
    city: 'Mumbai',
    state: 'Maharashtra',
    image: '🌊',
    challenge: 'High humidity combined with heat creating dangerous conditions for 21.6M residents',
    solution: 'Integrated coastal heat monitoring with humidity-aware heat index calculations',
    results: {
      heatReduction: '2.8°C',
      alertsSent: '1.8M',
      livesProtected: '320K',
      coolingCenters: '89',
    },
    testimonial: 'The humidity-aware heat index has been crucial for our coastal city. We can now issue accurate heat warnings.',
    author: 'Disaster Management Head',
    color: 'heat-orange',
  },
  {
    city: 'Bengaluru',
    state: 'Karnataka',
    image: '🌳',
    challenge: 'Rapid urbanization reducing green cover and increasing urban heat island effect',
    solution: 'Green cover monitoring with NDVI analysis and urban planning recommendations',
    results: {
      heatReduction: '4.1°C',
      alertsSent: '890K',
      livesProtected: '180K',
      coolingCenters: '45',
    },
    testimonial: 'The NDVI monitoring helped us identify heat-vulnerable zones and prioritize green infrastructure projects.',
    author: 'Urban Planning Director',
    color: 'heat-green',
  },
]

export default function CaseStudies() {
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
            <CheckCircle className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Success Stories</span>
          </motion.div>
          
          <h2 className="font-display text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-white">Proven</span>
            <span className="text-gradient"> Impact</span>
          </h2>
          
          <p className="text-xl text-text-muted max-w-3xl mx-auto">
            Real-world results from cities across India. See how HeatShield AI is transforming urban heat management.
          </p>
        </motion.div>

        <div className="space-y-12">
          {caseStudies.map((study, index) => (
            <motion.div
              key={study.city}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center`}
            >
              <div className="flex-1">
                <PremiumCard variant="glass" padding="xl" className="h-full">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="text-6xl">{study.image}</div>
                    <div>
                      <h3 className="font-display text-3xl font-bold text-white mb-1">
                        {study.city}
                      </h3>
                      <p className="text-text-muted">{study.state}</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="w-4 h-4 text-danger" />
                        <span className="font-semibold text-white">Challenge</span>
                      </div>
                      <p className="text-text-muted text-sm leading-relaxed">
                        {study.challenge}
                      </p>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="w-4 h-4 text-success" />
                        <span className="font-semibold text-white">Solution</span>
                      </div>
                      <p className="text-text-muted text-sm leading-relaxed">
                        {study.solution}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                      <div className="glass-card rounded-lg p-3 border border-white/5">
                        <div className="font-display text-2xl font-bold text-success">{study.results.heatReduction}</div>
                        <div className="text-xs text-text-muted">Heat Reduction</div>
                      </div>
                      <div className="glass-card rounded-lg p-3 border border-white/5">
                        <div className="font-display text-2xl font-bold text-primary">{study.results.alertsSent}</div>
                        <div className="text-xs text-text-muted">Alerts Sent</div>
                      </div>
                      <div className="glass-card rounded-lg p-3 border border-white/5">
                        <div className="font-display text-2xl font-bold text-secondary">{study.results.livesProtected}</div>
                        <div className="text-xs text-text-muted">Lives Protected</div>
                      </div>
                      <div className="glass-card rounded-lg p-3 border border-white/5">
                        <div className="font-display text-2xl font-bold text-heat-orange">{study.results.coolingCenters}</div>
                        <div className="text-xs text-text-muted">Cooling Centers</div>
                      </div>
                    </div>

                    <div className="glass-card rounded-lg p-4 border border-white/10">
                      <p className="text-text-secondary text-sm italic mb-3">
                        &ldquo;{study.testimonial}&rdquo;
                      </p>
                      <p className="text-xs text-text-muted">— {study.author}</p>
                    </div>
                  </div>
                </PremiumCard>
              </div>

              <div className="flex-1">
                <div className="glass-premium rounded-premium p-8 border border-white/10 h-full flex items-center justify-center">
                  <div className="text-center space-y-6">
                    <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                      <TrendingUp className="w-16 h-16 text-white" />
                    </div>
                    <div>
                      <div className="font-display text-5xl font-bold text-white mb-2">
                        {study.results.heatReduction}
                      </div>
                      <div className="text-text-muted">Average Temperature Reduction</div>
                    </div>
                    <PremiumButton variant="secondary" icon={<ArrowRight className="w-4 h-4" />}>
                      Read Full Case Study
                    </PremiumButton>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-20 text-center"
        >
          <PremiumCard variant="gradient" padding="xl" className="max-w-4xl mx-auto">
            <h3 className="font-display text-2xl font-bold text-white mb-4">
              Want to See Your City Here?
            </h3>
            <p className="text-text-muted mb-6">
              Join the growing list of cities transforming their heat management with HeatShield AI.
            </p>
            <PremiumButton size="lg">
              Schedule a Demo
            </PremiumButton>
          </PremiumCard>
        </motion.div>
      </div>
    </section>
  )
}
