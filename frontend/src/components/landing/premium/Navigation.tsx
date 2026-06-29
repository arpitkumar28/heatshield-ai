'use client'

import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { Satellite, Menu, X, ArrowRight, User, Shield, Activity } from 'lucide-react'
import { PremiumButton } from '@/components/ui/premium'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function PremiumNavigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const { scrollY } = useScroll()
  const navOpacity = useTransform(scrollY, [0, 100], [0.8, 0.95])
  const navBlur = useTransform(scrollY, [0, 100], [0, 24])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
      
      // Update active section based on scroll position
      const sections = ['crisis', 'pipeline', 'platform', 'map', 'use-cases', 'architecture', 'impact']
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(section)
            break
          }
        }
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { label: 'Crisis', href: '#crisis', id: 'crisis' },
    { label: 'AI Pipeline', href: '#pipeline', id: 'pipeline' },
    { label: 'Platform', href: '#platform', id: 'platform' },
    { label: 'India Map', href: '#map', id: 'map' },
    { label: 'Use Cases', href: '#use-cases', id: 'use-cases' },
    { label: 'Architecture', href: '#architecture', id: 'architecture' },
  ]

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
      style={{
        opacity: navOpacity,
        backdropFilter: `blur(${navBlur}px)`,
      }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-background/80 border-b border-white/8 py-4' 
          : 'bg-transparent py-6'
      }`}
    >
      {/* Animated gradient line at top */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"
        animate={{
          opacity: [0.3, 0.6, 0.3],
          scaleX: [0.8, 1, 0.8],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="w-full max-w-full mx-auto px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="relative"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity"
                animate={{
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <div className="relative p-2.5 rounded-xl bg-gradient-to-br from-primary to-secondary group-hover:shadow-neon-primary transition-shadow">
                <Satellite className="w-6 h-6 text-white" />
              </div>
            </motion.div>
            <div className="flex flex-col">
              <h1 className="font-display text-xl font-bold bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent group-hover:from-primary group-hover:to-accent transition-all duration-300">
                HeatShield AI
              </h1>
              <p className="text-xs text-text-muted group-hover:text-primary transition-colors">
                National Command Center
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <motion.div
                key={link.label}
                className="relative"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <a
                  href={link.href}
                  className={`text-sm px-4 py-2 rounded-lg transition-all duration-300 relative ${
                    activeSection === link.id
                      ? 'text-white font-medium'
                      : 'text-text-muted hover:text-white'
                  }`}
                >
                  {link.label}
                  {/* Active indicator */}
                  {activeSection === link.id && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary to-accent rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {/* Hover underline */}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary to-accent rounded-full"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </a>
              </motion.div>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/dashboard">
                <PremiumButton variant="ghost" size="sm" className="gap-2">
                  <User className="w-4 h-4" />
                  <span>Login</span>
                </PremiumButton>
              </Link>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-xl blur-lg opacity-40"
                animate={{
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <Link href="/dashboard" className="relative">
                <PremiumButton size="sm" className="gap-2 shadow-neon-primary">
                  <Activity className="w-4 h-4" />
                  <span>Launch Platform</span>
                  <ArrowRight className="w-4 h-4" />
                </PremiumButton>
              </Link>
            </motion.div>
          </div>

          {/* Mobile menu button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              {mobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-6 h-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-6 h-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="lg:hidden mt-6 pb-6 border-t border-white/10 pt-6"
            >
              <nav className="flex flex-col space-y-2">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`text-sm px-4 py-3 rounded-lg transition-all duration-300 ${
                      activeSection === link.id
                        ? 'bg-primary/10 text-primary font-medium border border-primary/20'
                        : 'text-text-muted hover:text-white hover:bg-white/5'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <div className="flex items-center justify-between">
                      <span>{link.label}</span>
                      {activeSection === link.id && (
                        <motion.div
                          layoutId="mobileActive"
                          className="w-2 h-2 rounded-full bg-primary"
                        />
                      )}
                    </div>
                  </motion.a>
                ))}
                <div className="flex flex-col space-y-3 pt-6 border-t border-white/10">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                      <PremiumButton variant="ghost" size="sm" className="w-full gap-2">
                        <User className="w-4 h-4" />
                        <span>Login</span>
                      </PremiumButton>
                    </Link>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 }}
                  >
                    <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                      <PremiumButton size="sm" className="w-full gap-2 shadow-neon-primary">
                        <Activity className="w-4 h-4" />
                        <span>Launch Platform</span>
                        <ArrowRight className="w-4 h-4" />
                      </PremiumButton>
                    </Link>
                  </motion.div>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}
