'use client'

import { motion } from 'framer-motion'
import { 
  LayoutDashboard, 
  Map, 
  Brain, 
  Shield, 
  AlertTriangle, 
  FileText, 
  Settings,
  ChevronRight,
  Satellite,
  Thermometer,
  Users,
  Building2,
  BarChart3,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { icon: LayoutDashboard, label: 'Command Center', href: '/dashboard', section: 'main' },
  { icon: Thermometer, label: 'Heat Intelligence', href: '/dashboard/heat-intelligence', section: 'main' },
  { icon: Satellite, label: 'Satellite Feed', href: '/dashboard/satellite', section: 'main' },
  { icon: Shield, label: 'Risk Assessment', href: '/dashboard/risk', section: 'main' },
  { icon: Brain, label: 'AI Prediction', href: '/dashboard/ai-prediction', section: 'intelligence' },
  { icon: BarChart3, label: 'Recommendations', href: '/dashboard/recommendations', section: 'intelligence' },
  { icon: Map, label: 'Projects', href: '/dashboard/projects', section: 'operations' },
  { icon: Users, label: 'Citizen Reports', href: '/dashboard/citizen-reports', section: 'operations' },
  { icon: Building2, label: 'Cooling Centers', href: '/dashboard/cooling-centers', section: 'operations' },
  { icon: FileText, label: 'Analytics', href: '/dashboard/analytics', section: 'reports' },
  { icon: AlertTriangle, label: 'Alerts', href: '/dashboard/alerts', section: 'reports' },
  { icon: Settings, label: 'Settings', href: '/dashboard/settings', section: 'system' },
]

const sections = {
  main: 'Main Operations',
  intelligence: 'AI Intelligence',
  operations: 'Field Operations',
  reports: 'Reports & Analytics',
  system: 'System',
}

export default function PremiumSidebar() {
  const pathname = usePathname()

  return (
    <motion.aside
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5 }}
      className="w-72 glass-panel border-r border-white/10 h-screen fixed left-0 top-0 z-40 flex flex-col"
    >
      {/* Logo */}
      <div className="p-6 border-b border-white/10">
        <Link href="/" className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
            className="p-2.5 rounded-xl bg-gradient-to-br from-primary to-secondary"
          >
            <Satellite className="w-6 h-6 text-white" />
          </motion.div>
          <div>
            <h1 className="font-display text-lg font-bold text-gradient">HeatShield AI</h1>
            <p className="text-xs text-text-muted">National Command Center</p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-6">
        {Object.entries(sections).map(([sectionKey, sectionLabel]) => (
          <div key={sectionKey}>
            <div className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3 px-4">
              {sectionLabel}
            </div>
            <div className="space-y-1">
              {navItems
                .filter(item => item.section === sectionKey)
                .map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${
                        isActive
                          ? 'bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/30 text-white shadow-neon-primary'
                          : 'text-text-muted hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <item.icon className={`w-5 h-5 ${isActive ? 'text-primary' : 'group-hover:text-primary'}`} />
                      <span className="font-medium text-sm">{item.label}</span>
                      {isActive && <ChevronRight className="w-4 h-4 ml-auto text-primary" />}
                    </Link>
                  )
                })}
            </div>
          </div>
        ))}
      </nav>

      {/* User section */}
      <div className="p-4 border-t border-white/10">
        <div className="glass-premium rounded-xl p-4 border border-white/10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-semibold">
              A
            </div>
            <div>
              <div className="font-semibold text-sm">Admin User</div>
              <div className="text-xs text-text-muted">ISRO Partner</div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-text-muted">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
              <span>System Operational</span>
            </div>
            <button className="text-xs text-text-muted hover:text-white transition-colors">
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </motion.aside>
  )
}
