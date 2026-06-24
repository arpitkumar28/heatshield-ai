'use client'

import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'

interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  gradient?: boolean
  icon?: LucideIcon
  title?: string
}

export default function Card({ children, className = '', hover = true, gradient = false, icon: Icon, title }: CardProps) {
  const baseStyles = 'glass-card rounded-xl p-6 border border-white/10'
  const hoverStyles = hover ? 'card-hover cursor-pointer' : ''
  const gradientStyles = gradient ? 'bg-gradient-to-br from-white/10 to-white/5' : ''
  
  return (
    <motion.div
      className={`${baseStyles} ${hoverStyles} ${gradientStyles} ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {title && Icon && (
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-primary/20 text-primary">
            <Icon className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-semibold">{title}</h3>
        </div>
      )}
      {children}
    </motion.div>
  )
}

interface StatCardProps {
  title: string
  value: string | number
  change?: string
  icon: LucideIcon
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
}

export function StatCard({ title, value, change, icon: Icon, color = 'primary' }: StatCardProps) {
  const colors = {
    primary: 'bg-primary/20 text-primary',
    secondary: 'bg-secondary/20 text-secondary',
    success: 'bg-success/20 text-success',
    warning: 'bg-warning/20 text-warning',
    danger: 'bg-danger/20 text-danger',
  }
  
  return (
    <motion.div
      className="glass-card rounded-xl p-6 border border-white/10 card-hover"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-xl ${colors[color]}`}>
          <Icon className="w-6 h-6" />
        </div>
        {change && (
          <span className={`text-sm font-medium ${change.startsWith('+') ? 'text-danger' : 'text-success'}`}>
            {change}
          </span>
        )}
      </div>
      <p className="text-gray-400 text-sm mb-1">{title}</p>
      <p className="text-3xl font-bold text-white">{value}</p>
    </motion.div>
  )
}
