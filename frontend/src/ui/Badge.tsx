'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface PremiumBadgeProps {
  children: ReactNode
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'critical' | 'high' | 'medium' | 'low'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  icon?: ReactNode
}

export default function PremiumBadge({
  children,
  variant = 'default',
  size = 'md',
  className = '',
  icon,
}: PremiumBadgeProps) {
  const baseStyles = 'inline-flex items-center gap-2 font-semibold rounded-full'
  
  const variantStyles = {
    default: 'bg-surface border border-border text-white',
    primary: 'bg-primary/10 border border-primary/30 text-primary',
    secondary: 'bg-secondary/10 border border-secondary/30 text-secondary',
    success: 'bg-success/10 border border-success/30 text-success',
    warning: 'bg-warning/10 border border-warning/30 text-warning',
    danger: 'bg-danger/10 border border-danger/30 text-danger',
    critical: 'status-critical',
    high: 'status-high',
    medium: 'status-medium',
    low: 'status-low',
  }
  
  const sizeStyles = {
    sm: 'px-3 py-1 text-xs',
    md: 'px-4 py-1.5 text-sm',
    lg: 'px-5 py-2 text-base',
  }
  
  return (
    <motion.span
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </motion.span>
  )
}
