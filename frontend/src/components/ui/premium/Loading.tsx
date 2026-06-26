'use client'

import { motion } from 'framer-motion'

interface PremiumLoadingProps {
  variant?: 'spinner' | 'skeleton' | 'dots' | 'pulse'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export default function PremiumLoading({
  variant = 'spinner',
  size = 'md',
  className = '',
}: PremiumLoadingProps) {
  const sizeStyles = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  }
  
  if (variant === 'spinner') {
    return (
      <div className={`relative ${sizeStyles[size]} ${className}`}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className={`absolute inset-0 border-2 border-primary/30 rounded-full`}
        />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className={`absolute inset-0 border-2 border-transparent border-t-primary rounded-full`}
        />
      </div>
    )
  }
  
  if (variant === 'skeleton') {
    const skeletonSizes = {
      sm: 'h-4 w-20',
      md: 'h-6 w-32',
      lg: 'h-8 w-48',
    }
    return (
      <div className={`skeleton rounded ${skeletonSizes[size]} ${className}`} />
    )
  }
  
  if (variant === 'dots') {
    const dotSizes = {
      sm: 'w-1.5 h-1.5',
      md: 'w-2 h-2',
      lg: 'w-2.5 h-2.5',
    }
    return (
      <div className={`flex gap-2 ${className}`}>
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.1 }}
            className={`${dotSizes[size]} bg-primary rounded-full`}
          />
        ))}
      </div>
    )
  }
  
  if (variant === 'pulse') {
    return (
      <motion.div
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className={`bg-primary/20 rounded-full ${sizeStyles[size]} ${className}`}
      />
    )
  }
  
  return null
}
