'use client'

import { ButtonHTMLAttributes, forwardRef } from 'react'
import { motion } from 'framer-motion'

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onAnimationStart' | 'onDragStart' | 'onDragEnd' | 'onDrag'> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  icon?: React.ReactNode
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', isLoading, icon, children, className, ...props }, ref) => {
    const baseStyles = 'font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2'
    
    const variants = {
      primary: 'bg-gradient-to-r from-primary to-orange-400 text-white hover:shadow-neon-orange hover:-translate-y-0.5',
      secondary: 'bg-secondary/10 text-secondary border border-secondary/30 hover:bg-secondary/20 hover:border-secondary/50',
      ghost: 'bg-white/5 text-white hover:bg-white/10 border border-white/10',
      danger: 'bg-gradient-to-r from-danger to-red-500 text-white hover:shadow-lg hover:-translate-y-0.5',
    }
    
    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
    }
    
    return (
      <motion.button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        disabled={isLoading}
        whileHover={{ scale: isLoading ? 1 : 1.02 }}
        whileTap={{ scale: isLoading ? 1 : 0.98 }}
        {...props}
      >
        {isLoading && (
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        )}
        {!isLoading && icon}
        {children}
      </motion.button>
    )
  }
)

Button.displayName = 'Button'

export default Button
