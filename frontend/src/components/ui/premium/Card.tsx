'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface PremiumCardProps {
  children: ReactNode
  variant?: 'default' | 'glass' | 'gradient' | 'surface'
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  hover?: boolean
  onClick?: () => void
}

export default function PremiumCard({
  children,
  variant = 'default',
  padding = 'md',
  className = '',
  hover = false,
  onClick,
}: PremiumCardProps) {
  const baseStyles = 'rounded-card transition-all duration-300'
  
  const variantStyles = {
    default: 'bg-card border border-border shadow-card',
    glass: 'glass-card border-0',
    gradient: 'bg-gradient-to-br from-card to-surface border border-border shadow-card',
    surface: 'bg-surface border border-border',
  }
  
  const paddingStyles = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-10',
  }
  
  const CardComponent = hover ? motion.div : 'div'
  
  return (
    <CardComponent
      className={`${baseStyles} ${variantStyles[variant]} ${paddingStyles[padding]} ${hover ? 'cursor-pointer hover:shadow-card-hover hover:-translate-y-1' : ''} ${className}`}
      onClick={onClick}
      {...(hover && {
        whileHover: { scale: 1.01 },
        whileTap: { scale: 0.99 },
      })}
    >
      {children}
    </CardComponent>
  )
}
