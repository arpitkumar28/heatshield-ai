'use client'

import { motion } from 'framer-motion'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'critical' | 'high' | 'medium' | 'low' | 'success' | 'warning'
  size?: 'sm' | 'md'
  className?: string
}

export default function Badge({ children, variant = 'medium', size = 'md', className = '' }: BadgeProps) {
  const variants = {
    critical: 'status-critical',
    high: 'status-high',
    medium: 'status-medium',
    low: 'status-low',
    success: 'status-low',
    warning: 'status-high',
  }
  
  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
  }
  
  return (
    <motion.span
      initial={{ scale: 0.9 }}
      animate={{ scale: 1 }}
      className={`inline-flex items-center rounded-full font-medium ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </motion.span>
  )
}
