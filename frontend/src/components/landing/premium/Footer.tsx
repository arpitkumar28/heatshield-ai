'use client'

import { motion } from 'framer-motion'
import { Satellite, Mail, Phone, MapPin, Linkedin, Twitter, Github, Globe, Shield, Zap } from 'lucide-react'
import { PremiumButton } from '@/components/ui/premium'

const footerLinks = {
  platform: [
    { label: 'Features', href: '#features' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'API Documentation', href: '#api' },
    { label: 'Integrations', href: '#integrations' },
  ],
  solutions: [
    { label: 'ISRO & NRSC', href: '#isro' },
    { label: 'Smart Cities', href: '#smart-cities' },
    { label: 'NDMA', href: '#ndma' },
    { label: 'State Governments', href: '#states' },
  ],
  resources: [
    { label: 'Documentation', href: '#docs' },
    { label: 'Case Studies', href: '#cases' },
    { label: 'Research Papers', href: '#research' },
    { label: 'Blog', href: '#blog' },
  ],
  company: [
    { label: 'About Us', href: '#about' },
    { label: 'Careers', href: '#careers' },
    { label: 'Contact', href: '#contact' },
    { label: 'Press Kit', href: '#press' },
  ],
}

const contactInfo = [
  { icon: Mail, label: 'contact@heatshield.ai', value: 'contact@heatshield.ai' },
  { icon: Phone, label: '+91 11 2345 6789', value: '+91 11 2345 6789' },
  { icon: MapPin, label: 'New Delhi, India', value: 'New Delhi, India' },
]

const socialLinks = [
  { icon: Linkedin, href: '#linkedin', label: 'LinkedIn' },
  { icon: Twitter, href: '#twitter', label: 'Twitter' },
  { icon: Github, href: '#github', label: 'GitHub' },
  { icon: Globe, href: '#website', label: 'Website' },
]

export default function PremiumFooter() {
  return (
    <footer className="relative bg-background border-t border-white/10">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-surface to-background" />
      
      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-5 gap-12 mb-16">
          {/* Brand column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-secondary">
                <Satellite className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="font-display text-2xl font-bold text-gradient">HeatShield AI</h3>
                <p className="text-sm text-text-muted">National Urban Heat Intelligence</p>
              </div>
            </div>

            {/* Description */}
            <p className="text-text-muted leading-relaxed max-w-md">
              Enterprise-grade AI-powered urban heat monitoring and intelligence platform for ISRO, 
              Smart Cities Mission, and national disaster management agencies.
            </p>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg glass-card border border-white/10">
                <Shield className="w-4 h-4 text-success" />
                <span className="text-xs text-text-muted">SOC 2 Certified</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg glass-card border border-white/10">
                <Zap className="w-4 h-4 text-primary" />
                <span className="text-xs text-text-muted">ISO 27001</span>
              </div>
            </div>

            {/* CTA */}
            <PremiumButton size="md" className="w-full sm:w-auto">
              Schedule Demo
            </PremiumButton>
          </motion.div>

          {/* Links columns */}
          {Object.entries(footerLinks).map(([category, links], index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="space-y-4"
            >
              <h4 className="font-display text-lg font-bold text-white capitalize">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-text-muted hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Contact & Social */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="grid lg:grid-cols-2 gap-12 pt-8 border-t border-white/10"
        >
          {/* Contact info */}
          <div className="space-y-4">
            <h4 className="font-display text-lg font-bold text-white">Contact Us</h4>
            <div className="space-y-3">
              {contactInfo.map((info) => (
                <div key={info.label} className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-white/5">
                    <info.icon className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-sm text-text-muted">{info.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Social links */}
          <div className="space-y-4">
            <h4 className="font-display text-lg font-bold text-white">Follow Us</h4>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="p-3 rounded-lg glass-card border border-white/10 hover:border-primary/30 transition-colors group"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 text-text-muted group-hover:text-primary transition-colors" />
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="pt-8 mt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <div className="text-sm text-text-muted">
            © 2026 HeatShield AI. All rights reserved.
          </div>
          
          <div className="flex flex-wrap gap-6 text-sm">
            <a href="#privacy" className="text-text-muted hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#terms" className="text-text-muted hover:text-white transition-colors">
              Terms of Service
            </a>
            <a href="#cookies" className="text-text-muted hover:text-white transition-colors">
              Cookie Policy
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
