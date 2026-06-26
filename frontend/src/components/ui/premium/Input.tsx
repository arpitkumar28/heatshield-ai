'use client'

import { forwardRef, InputHTMLAttributes, ReactNode } from 'react'

interface PremiumInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  icon?: ReactNode
}

const PremiumInput = forwardRef<HTMLInputElement, PremiumInputProps>(
  ({ label, error, icon, className = '', ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label className="block text-sm font-medium text-text-muted">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={`w-full bg-surface border border-border rounded-input px-4 py-3 text-white placeholder:text-text-muted transition-all duration-300 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 ${icon ? 'pl-12' : ''} ${error ? 'border-danger focus:border-danger focus:ring-danger/20' : ''} ${className}`}
            {...props}
          />
        </div>
        {error && (
          <p className="text-sm text-danger">{error}</p>
        )}
      </div>
    )
  }
)

PremiumInput.displayName = 'PremiumInput'

export default PremiumInput
