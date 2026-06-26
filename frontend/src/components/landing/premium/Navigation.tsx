'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Satellite, Menu, X, ArrowRight, User } from 'lucide-react'
import { PremiumButton } from '@/components/ui/premium'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function PremiumNavigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { label: 'Capabilities', href: '#capabilities' },
    { label: 'AI Pipeline', href: '#pipeline' },
    { label: 'Platform', href: '#platform' },
    { label: 'Map', href: '#map' },
    { label: 'Use Cases', href: '#use-cases' },
    { label: 'Architecture', href: '#architecture' },
  ]

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass-panel border-b border-white/10 py-4' : 'py-6'
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
              className="p-2.5 rounded-xl bg-gradient-to-br from-primary to-secondary group-hover:shadow-neon-primary transition-shadow"
            >
              <Satellite className="w-6 h-6 text-white" />
            </motion.div>
            <div>
              <h1 className="font-display text-xl font-bold text-gradient">HeatShield AI</h1>
              <p className="text-xs text-text-muted">National Command Center</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-text-muted hover:text-white transition-colors relative group"
              >
                {link.label}
                <motion.div
                  className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"
                />
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <Link href="/dashboard">
              <PremiumButton variant="ghost" size="sm">
                <User className="w-4 h-4 mr-2" />
                Login
              </PremiumButton>
            </Link>
            <Link href="/dashboard">
              <PremiumButton size="sm" icon={<ArrowRight className="w-4 h-4" />}>
                Launch Platform
              </PremiumButton>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden mt-6 pb-4 border-t border-white/10 pt-4"
            >
              <nav className="flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-text-muted hover:text-white transition-colors py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                ))}
                <div className="flex flex-col space-y-3 pt-4 border-t border-white/10">
                  <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                    <PremiumButton variant="ghost" size="sm" className="w-full">
                      <User className="w-4 h-4 mr-2" />
                      Login
                    </PremiumButton>
                  </Link>
                  <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                    <PremiumButton size="sm" className="w-full" icon={<ArrowRight className="w-4 h-4" />}>
                      Launch Platform
                    </PremiumButton>
                  </Link>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}
