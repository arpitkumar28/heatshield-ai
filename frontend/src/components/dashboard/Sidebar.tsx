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
  Satellite
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { icon: LayoutDashboard, label: 'Overview', href: '/dashboard' },
  { icon: Map, label: 'Heat Intelligence', href: '/dashboard/heatmap' },
  { icon: Satellite, label: 'Satellite Feed', href: '/dashboard/satellite' },
  { icon: Shield, label: 'Risk Assessment', href: '/dashboard/risk' },
  { icon: Brain, label: 'AI Recommendations', href: '/dashboard/recommendations' },
  { icon: FileText, label: 'Analytics', href: '/dashboard/analytics' },
  { icon: AlertTriangle, label: 'Alerts', href: '/dashboard/alerts' },
  { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <motion.aside
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5 }}
      className="w-64 glass-panel border-r border-white/10 h-screen fixed left-0 top-0 z-40 flex flex-col"
    >
      {/* Logo */}
      <div className="p-6 border-b border-white/10">
        <Link href="/" className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-secondary">
            <Satellite className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gradient">HeatShield AI</h1>
            <p className="text-xs text-gray-400">Command Center</p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all group ${
                isActive
                  ? 'bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/30 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <item.icon className={`w-5 h-5 ${isActive ? 'text-primary' : 'group-hover:text-primary'}`} />
              <span className="font-medium">{item.label}</span>
              {isActive && <ChevronRight className="w-4 h-4 ml-auto text-primary" />}
            </Link>
          )
        })}
      </nav>

      {/* User section */}
      <div className="p-4 border-t border-white/10">
        <div className="glass-card rounded-lg p-4 border border-white/10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-semibold">
              A
            </div>
            <div>
              <div className="font-semibold text-sm">Admin User</div>
              <div className="text-xs text-gray-400">ISRO Partner</div>
            </div>
          </div>
          <div className="text-xs text-gray-400">
            <span className="text-success">●</span> System Operational
          </div>
        </div>
      </div>
    </motion.aside>
  )
}
