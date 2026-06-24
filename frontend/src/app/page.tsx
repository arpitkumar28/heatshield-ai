'use client'

import { motion } from 'framer-motion'
import Hero from '@/components/landing/Hero'
import TrustIndicators from '@/components/landing/TrustIndicators'
import HeatCrisisStats from '@/components/landing/HeatCrisisStats'
import HowItWorks from '@/components/landing/HowItWorks'
import CoreCapabilities from '@/components/landing/CoreCapabilities'
import DashboardPreview from '@/components/landing/DashboardPreview'
import Impact from '@/components/landing/Impact'
import GovernmentUseCases from '@/components/landing/GovernmentUseCases'
import TechnologyArchitecture from '@/components/landing/TechnologyArchitecture'
import Footer from '@/components/landing/Footer'
import { Satellite, Menu, X } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'
import Button from '@/components/ui/Button'

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-secondary">
                <Satellite className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gradient">HeatShield AI</h1>
                <p className="text-xs text-text-muted">National Urban Heat Intelligence</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#capabilities" className="text-text-muted hover:text-white transition-colors">Capabilities</a>
              <a href="#how-it-works" className="text-text-muted hover:text-white transition-colors">How It Works</a>
              <a href="#dashboard" className="text-text-muted hover:text-white transition-colors">Platform</a>
              <a href="#use-cases" className="text-text-muted hover:text-white transition-colors">Use Cases</a>
              <a href="#architecture" className="text-text-muted hover:text-white transition-colors">Technology</a>
            </nav>

            <div className="hidden md:flex items-center space-x-4">
              <Link href="/dashboard">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link href="/dashboard">
                <Button>Launch Platform</Button>
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="md:hidden mt-4 pb-4 border-t border-white/10 pt-4"
            >
              <nav className="flex flex-col space-y-4">
                <a href="#capabilities" className="text-text-muted hover:text-white transition-colors">Capabilities</a>
                <a href="#how-it-works" className="text-text-muted hover:text-white transition-colors">How It Works</a>
                <a href="#dashboard" className="text-text-muted hover:text-white transition-colors">Platform</a>
                <a href="#use-cases" className="text-text-muted hover:text-white transition-colors">Use Cases</a>
                <a href="#architecture" className="text-text-muted hover:text-white transition-colors">Technology</a>
                <div className="flex flex-col space-y-2 pt-4">
                  <Link href="/dashboard">
                    <Button variant="ghost" className="w-full">Login</Button>
                  </Link>
                  <Link href="/dashboard">
                    <Button className="w-full">Launch Platform</Button>
                  </Link>
                </div>
              </nav>
            </motion.div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main>
        <Hero />
        <TrustIndicators />
        <HeatCrisisStats />
        <HowItWorks />
        <CoreCapabilities />
        <DashboardPreview />
        <Impact />
        <GovernmentUseCases />
        <TechnologyArchitecture />
      </main>

      <Footer />
    </div>
  )
}
