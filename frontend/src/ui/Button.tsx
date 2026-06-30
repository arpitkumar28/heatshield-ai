'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface PremiumButtonProps {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  icon?: ReactNode
  className?: string
  onClick?: () => void
  disabled?: boolean
  fullWidth?: boolean
}

export default function PremiumButton({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  className = '',
  onClick,
  disabled = false,
  fullWidth = false,
}: PremiumButtonProps) {
  const baseStyles = 'font-semibold transition-all duration-300 rounded-button flex items-center justify-center gap-2'
  
  const variantStyles = {
    primary: 'bg-gradient-to-r from-primary to-secondary text-white shadow-neon-primary hover:shadow-neon-secondary hover:-translate-y-0.5',
    secondary: 'bg-primary/10 text-primary border border-primary/20 hover:bg-primary/15 hover:border-primary/30 hover:-translate-y-0.5',
    danger: 'bg-gradient-to-r from-danger to-heat-dark-red text-white shadow-neon-danger hover:-translate-y-0.5',
    ghost: 'text-text-muted hover:text-white hover:bg-white/5',
  }
  
  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
    xl: 'px-10 py-5 text-xl',
  }
  
  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${fullWidth ? 'w-full' : ''} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </motion.button>
  )
}
