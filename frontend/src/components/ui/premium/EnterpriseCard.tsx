'use client'

import { ReactNode } from 'react'

interface EnterpriseCardProps {
  children: ReactNode
  title?: string
  subtitle?: string
  icon?: ReactNode
  badge?: string
  badgeColor?: 'primary' | 'success' | 'warning' | 'danger'
  actions?: ReactNode
  className?: string
}

export default function EnterpriseCard({
  children,
  title,
  subtitle,
  icon,
  badge,
  badgeColor = 'primary',
  actions,
  className = '',
}: EnterpriseCardProps) {
  const badgeColors = {
    primary: 'bg-primary/20 text-primary border-primary/30',
    success: 'bg-success/20 text-success border-success/30',
    warning: 'bg-warning/20 text-warning border-warning/30',
    danger: 'bg-danger/20 text-danger border-danger/30',
  }

  return (
    <div className={`glass-card rounded-xl border border-white/10 ${className}`}>
      {(title || icon || badge || actions) && (
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            {icon && (
              <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-secondary">
                {icon}
              </div>
            )}
            <div>
              {title && (
                <h3 className="text-lg font-semibold text-white font-display">
                  {title}
                </h3>
              )}
              {subtitle && (
                <p className="text-sm text-text-muted font-display">{subtitle}</p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-3">
            {badge && (
              <span className={`px-3 py-1 rounded-full text-xs font-medium border ${badgeColors[badgeColor]}`}>
                {badge}
              </span>
            )}
            {actions}
          </div>
        </div>
      )}
      <div className="p-6">
        {children}
      </div>
    </div>
  )
}
