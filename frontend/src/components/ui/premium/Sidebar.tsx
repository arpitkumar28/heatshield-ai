'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  Map, 
  Brain, 
  BarChart3, 
  Settings, 
  Users, 
  FileText,
  AlertTriangle,
  Layers,
  Activity
} from 'lucide-react'

export interface SidebarItem {
  id: string
  label: string
  icon: React.ReactNode
  href: string
  badge?: number
  disabled?: boolean
}

export interface SidebarProps {
  items?: SidebarItem[]
  collapsed?: boolean
  onCollapse?: () => void
  className?: string
}

const defaultItems: SidebarItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: <LayoutDashboard className="h-5 w-5" />,
    href: '/dashboard',
  },
  {
    id: 'gis',
    label: 'GIS Intelligence',
    icon: <Map className="h-5 w-5" />,
    href: '/dashboard/gis',
  },
  {
    id: 'ai',
    label: 'AI Engine',
    icon: <Brain className="h-5 w-5" />,
    href: '/dashboard/ai',
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: <BarChart3 className="h-5 w-5" />,
    href: '/dashboard/analytics',
  },
  {
    id: 'alerts',
    label: 'Alerts',
    icon: <AlertTriangle className="h-5 w-5" />,
    href: '/dashboard/alerts',
    badge: 3,
  },
  {
    id: 'projects',
    label: 'Projects',
    icon: <Layers className="h-5 w-5" />,
    href: '/dashboard/projects',
  },
  {
    id: 'reports',
    label: 'Reports',
    icon: <FileText className="h-5 w-5" />,
    href: '/dashboard/reports',
  },
  {
    id: 'users',
    label: 'Users',
    icon: <Users className="h-5 w-5" />,
    href: '/dashboard/users',
  },
  {
    id: 'activity',
    label: 'Activity',
    icon: <Activity className="h-5 w-5" />,
    href: '/dashboard/activity',
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: <Settings className="h-5 w-5" />,
    href: '/dashboard/settings',
  },
]

export function EnterpriseSidebar({
  items = defaultItems,
  collapsed = false,
  className = '',
}: SidebarProps) {
  const pathname = usePathname()

  return (
    <aside
      className={`glass-panel border-r border-border flex flex-col ${
        collapsed ? 'w-20' : 'w-64'
      } transition-all duration-300 ${className}`}
    >
      <div className="flex h-16 items-center justify-center border-b border-border">
        {!collapsed ? (
          <h1 className="text-xl font-bold text-gradient">HeatShield AI</h1>
        ) : (
          <div className="h-8 w-8 rounded-lg bg-primary-gradient" />
        )}
      </div>

      <nav className="flex-1 overflow-y-auto p-4 space-y-1">
        {items.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
          
          return (
            <Link
              key={item.id}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                item.disabled
                  ? 'opacity-50 cursor-not-allowed'
                  : 'cursor-pointer'
              } ${
                isActive
                  ? 'bg-primary/20 text-primary border border-primary/30'
                  : 'text-text-secondary hover:bg-white/5 hover:text-white'
              }`}
              aria-disabled={item.disabled}
              onClick={(e) => item.disabled && e.preventDefault()}
            >
              <span className="flex-shrink-0">{item.icon}</span>
              {!collapsed && (
                <>
                  <span className="flex-1">{item.label}</span>
                  {item.badge && (
                    <span className="badge badge-danger">{item.badge}</span>
                  )}
                </>
              )}
            </Link>
          )
        })}
      </nav>

      {!collapsed && (
        <div className="border-t border-border p-4">
          <div className="glass-card p-4">
            <p className="text-xs text-text-muted mb-2">System Status</p>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
              <span className="text-sm text-white">Operational</span>
            </div>
          </div>
        </div>
      )}
    </aside>
  )
}
