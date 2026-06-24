'use client'

import { motion } from 'framer-motion'
import { Check, ArrowRight } from 'lucide-react'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'

const plans = [
  {
    name: 'Starter',
    price: '₹49,999',
    period: '/month',
    description: 'Perfect for small municipalities',
    features: [
      '5 Cities monitored',
      'Basic heat mapping',
      '24-hour predictions',
      'Email alerts',
      'Standard support',
    ],
    popular: false,
  },
  {
    name: 'Professional',
    price: '₹1,99,999',
    period: '/month',
    description: 'For growing smart cities',
    features: [
      '25 Cities monitored',
      'Advanced AI predictions',
      '72-hour forecasts',
      'SMS + Email alerts',
      'Priority support',
      'API access',
      'Custom reports',
    ],
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'For state and national governments',
    features: [
      'Unlimited cities',
      'Real-time satellite feed',
      'Custom ML models',
      'Multi-channel alerts',
      'Dedicated support',
      'Full API suite',
      'White-label solution',
      'On-premise deployment',
    ],
    popular: false,
  },
]

export default function Pricing() {
  return (
    <section className="py-24 bg-isro-gradient relative overflow-hidden">
      <div className="absolute inset-0 hero-gradient opacity-30" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Simple, <span className="text-gradient">Transparent</span> Pricing
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Choose the plan that fits your city's needs
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative ${plan.popular ? 'scale-105' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-primary to-secondary rounded-full text-sm font-semibold">
                  Most Popular
                </div>
              )}
              <Card className={`h-full ${plan.popular ? 'border-primary/50 shadow-neon-orange' : ''}`}>
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-gray-400 text-sm mb-4">{plan.description}</p>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-gray-400">{plan.period}</span>
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-success/20 flex items-center justify-center">
                        <Check className="w-3 h-3 text-success" />
                      </div>
                      <span className="text-sm text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  variant={plan.popular ? 'primary' : 'secondary'}
                  className="w-full"
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  {plan.name === 'Enterprise' ? 'Contact Sales' : 'Get Started'}
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
