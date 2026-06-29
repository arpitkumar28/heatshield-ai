'use client'

import { motion } from 'framer-motion'
import { Check, X, Star, Building2, Users, Zap } from 'lucide-react'
import { PremiumCard, PremiumButton } from '@/components/ui/premium'

const plans = [
  {
    name: 'Starter',
    description: 'For small municipalities and pilot projects',
    price: '₹4,99,999',
    period: '/year',
    icon: Building2,
    features: [
      { name: 'Single city coverage', included: true },
      { name: 'Basic heat monitoring', included: true },
      { name: 'Daily satellite updates', included: true },
      { name: 'Standard AI predictions', included: true },
      { name: 'Email alerts', included: true },
      { name: 'API access (10K calls/month)', included: true },
      { name: 'Custom integrations', included: false },
      { name: 'Priority support', included: false },
      { name: 'White-label solution', included: false },
    ],
    color: 'primary',
    popular: false,
  },
  {
    name: 'Enterprise',
    description: 'For state governments and large cities',
    price: '₹24,99,999',
    period: '/year',
    icon: Users,
    features: [
      { name: 'State-wide coverage', included: true },
      { name: 'Advanced heat monitoring', included: true },
      { name: 'Real-time satellite updates', included: true },
      { name: 'Advanced AI predictions', included: true },
      { name: 'Multi-channel alerts', included: true },
      { name: 'API access (100K calls/month)', included: true },
      { name: 'Custom integrations', included: true },
      { name: 'Priority support', included: true },
      { name: 'White-label solution', included: false },
    ],
    color: 'secondary',
    popular: true,
  },
  {
    name: 'National',
    description: 'For central agencies and national programs',
    price: 'Custom',
    period: '',
    icon: Zap,
    features: [
      { name: 'National coverage', included: true },
      { name: 'Enterprise monitoring suite', included: true },
      { name: 'Real-time satellite updates', included: true },
      { name: 'Custom AI model training', included: true },
      { name: 'Multi-channel alerts', included: true },
      { name: 'Unlimited API access', included: true },
      { name: 'Custom integrations', included: true },
      { name: '24/7 dedicated support', included: true },
      { name: 'White-label solution', included: true },
    ],
    color: 'heat-orange',
    popular: false,
  },
]

export default function Pricing() {
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
            <Star className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Enterprise Pricing</span>
          </motion.div>
          
          <h2 className="font-display text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-white">Scalable</span>
            <span className="text-gradient"> Solutions</span>
          </h2>
          
          <p className="text-xl text-text-muted max-w-3xl mx-auto">
            Flexible pricing plans designed for government agencies of all sizes. 
            Contact us for custom enterprise solutions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative"
            >
              {plan.popular && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="absolute -top-4 left-1/2 -translate-x-1/2 z-10"
                >
                  <div className="bg-gradient-to-r from-primary to-secondary text-white text-xs font-semibold px-4 py-1.5 rounded-full shadow-neon-primary">
                    Most Popular
                  </div>
                </motion.div>
              )}

              <PremiumCard 
                variant={plan.popular ? "gradient" : "glass"} 
                padding="xl" 
                className={`h-full ${plan.popular ? 'border-2 border-primary/50' : ''}`}
              >
                <div className="text-center mb-8">
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
                    className={`w-16 h-16 rounded-2xl bg-${plan.color}/10 border border-${plan.color}/30 flex items-center justify-center mx-auto mb-4`}
                  >
                    <plan.icon className={`w-8 h-8 text-${plan.color}`} />
                  </motion.div>
                  
                  <h3 className="font-display text-2xl font-bold text-white mb-2">
                    {plan.name}
                  </h3>
                  
                  <p className="text-sm text-text-muted mb-4">
                    {plan.description}
                  </p>
                  
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="font-display text-4xl font-bold text-white">
                      {plan.price}
                    </span>
                    <span className="text-text-muted">{plan.period}</span>
                  </div>
                </div>

                <div className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <div key={feature.name} className="flex items-start gap-3">
                      {feature.included ? (
                        <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                      ) : (
                        <X className="w-5 h-5 text-text-disabled flex-shrink-0 mt-0.5" />
                      )}
                      <span className={`text-sm ${feature.included ? 'text-text-secondary' : 'text-text-disabled'}`}>
                        {feature.name}
                      </span>
                    </div>
                  ))}
                </div>

                <PremiumButton 
                  variant={plan.popular ? "primary" : "secondary"} 
                  className="w-full"
                  size="lg"
                >
                  {plan.name === 'National' ? 'Contact Sales' : 'Get Started'}
                </PremiumButton>
              </PremiumCard>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20 text-center"
        >
          <PremiumCard variant="glass" padding="xl" className="max-w-2xl mx-auto">
            <h3 className="font-display text-xl font-bold text-white mb-4">
              Need a Custom Solution?
            </h3>
            <p className="text-text-muted mb-6">
              Contact our enterprise team for tailored solutions, custom integrations, and volume pricing.
            </p>
            <PremiumButton size="lg">
              Contact Enterprise Sales
            </PremiumButton>
          </PremiumCard>
        </motion.div>
      </div>
    </section>
  )
}
