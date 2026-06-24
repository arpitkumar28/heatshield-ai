'use client'

import { motion } from 'framer-motion'
import { Satellite, Mail, Github, FileText, BookOpen, Building2, Shield } from 'lucide-react'

const footerLinks = {
  Platform: [
    { name: 'Documentation', href: '#' },
    { name: 'API Reference', href: '#' },
    { name: 'Research Papers', href: '#' },
    { name: 'Case Studies', href: '#' },
  ],
  Resources: [
    { name: 'Getting Started', href: '#' },
    { name: 'User Guides', href: '#' },
    { name: 'Data Access', href: '#' },
    { name: 'Support Portal', href: '#' },
  ],
  Organization: [
    { name: 'About', href: '#' },
    { name: 'Contact', href: '#' },
    { name: 'Partners', href: '#' },
    { name: 'Careers', href: '#' },
  ],
  Legal: [
    { name: 'Privacy Policy', href: '#' },
    { name: 'Terms of Service', href: '#' },
    { name: 'Security', href: '#' },
    { name: 'Compliance', href: '#' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-background-dark border-t border-white/10 py-16">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-5 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-4"
            >
              <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-secondary">
                <Satellite className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold text-white">HeatShield AI</span>
                <div className="text-xs text-text-muted">National Urban Heat Intelligence</div>
              </div>
            </motion.div>
            <p className="text-sm text-text-muted mb-6 leading-relaxed">
              Enterprise-grade urban heat intelligence platform for government decision-making and climate resilience.
            </p>
            <div className="flex gap-3">
              {[Github, Mail].map((Icon, index) => (
                <motion.a
                  key={index}
                  href="#"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.1 }}
                  className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors border border-white/10"
                >
                  <Icon className="w-5 h-5 text-text-muted" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold text-white mb-4">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-sm text-text-muted hover:text-white transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-6">
            <p className="text-sm text-text-muted">
              © 2026 HeatShield AI. National Urban Heat Intelligence Platform.
            </p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
                <Shield className="w-4 h-4 text-success" />
                <span className="text-xs text-text-muted">ISO 27001 Certified</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
                <Building2 className="w-4 h-4 text-primary" />
                <span className="text-xs text-text-muted">GIGW Compliant</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-text-muted">
            <div className="flex items-center gap-4">
              <span>ISRO Bhuvan Partner</span>
              <span>•</span>
              <span>Smart Cities Mission</span>
              <span>•</span>
              <span>Ministry of Housing & Urban Affairs</span>
            </div>
            <div>Built for Government of India</div>
          </div>
        </div>
      </div>
    </footer>
  )
}
