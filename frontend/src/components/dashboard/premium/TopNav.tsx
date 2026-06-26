'use client'

import { motion } from 'framer-motion'
import { Bell, Search, Globe } from 'lucide-react'
import { useState } from 'react'

export default function PremiumTopNav() {
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-72 right-0 h-16 glass-panel border-b border-white/10 z-30 flex items-center justify-between px-6"
    >
      {/* Search */}
      <div className="flex-1 max-w-xl">
        <div className="relative">
          <motion.button
            onClick={() => setSearchOpen(!searchOpen)}
            className="flex items-center gap-3 w-full bg-surface border border-border rounded-input px-4 py-2 text-text-muted hover:border-primary/30 transition-colors"
          >
            <Search className="w-4 h-4" />
            <span className="text-sm">Search locations, alerts, reports...</span>
            <div className="ml-auto flex items-center gap-1">
              <span className="text-xs text-text-muted">⌘K</span>
            </div>
          </motion.button>
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        {/* Live status */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-success/10 border border-success/30">
          <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
          <span className="text-xs font-medium text-success">Live</span>
        </div>

        {/* Location */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
          <Globe className="w-4 h-4 text-text-muted" />
          <span className="text-xs text-text-muted">National View</span>
        </div>

        {/* Notifications */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative p-2 rounded-lg hover:bg-white/10 transition-colors"
        >
          <Bell className="w-5 h-5 text-text-muted" />
          <div className="absolute top-1 right-1 w-2 h-2 bg-danger rounded-full" />
        </motion.button>

        {/* User menu */}
        <div className="flex items-center gap-3 pl-4 border-l border-white/10">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-semibold text-sm">
            A
          </div>
          <div className="hidden md:block">
            <div className="text-sm font-medium text-white">Admin User</div>
            <div className="text-xs text-text-muted">ISRO Partner</div>
          </div>
        </div>
      </div>
    </motion.nav>
  )
}
