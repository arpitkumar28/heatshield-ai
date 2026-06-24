'use client'

import { forwardRef, InputHTMLAttributes } from 'react'
import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onAnimationStart'> {
  label?: string
  icon?: LucideIcon
  error?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, icon: Icon, error, className = '', ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label className="text-sm font-medium text-gray-300">{label}</label>
        )}
        <div className="relative">
          {Icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Icon className="w-5 h-5" />
            </div>
          )}
          <motion.input
            ref={ref}
            className={`input-field w-full ${Icon ? 'pl-10' : 'pl-4'} pr-4 ${error ? 'border-danger' : ''} ${className}`}
            whileFocus={{ scale: 1.01 }}
            {...(props as any)}
          />
        </div>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm text-danger"
          >
            {error}
          </motion.p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input
