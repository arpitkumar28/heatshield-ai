'use client'

import React from 'react'
import { Bell, X, Check, AlertTriangle, Info, AlertCircle } from 'lucide-react'

export type NotificationType = 'success' | 'warning' | 'info' | 'error'

export interface Notification {
  id: string
  type: NotificationType
  title: string
  message: string
  timestamp: Date
  read?: boolean
  action?: {
    label: string
    onClick: () => void
  }
}

export interface NotificationPanelProps {
  notifications: Notification[]
  onDismiss?: (id: string) => void
  onClearAll?: () => void
  className?: string
}

const notificationIcons = {
  success: <Check className="h-5 w-5 text-success" />,
  warning: <AlertTriangle className="h-5 w-5 text-warning" />,
  info: <Info className="h-5 w-5 text-info" />,
  error: <AlertCircle className="h-5 w-5 text-danger" />,
}

const notificationBorders = {
  success: 'border-l-success',
  warning: 'border-l-warning',
  info: 'border-l-info',
  error: 'border-l-danger',
}

export function EnterpriseNotificationPanel({
  notifications,
  onDismiss,
  onClearAll,
  className = '',
}: NotificationPanelProps) {
  const unreadCount = notifications.filter((n) => !n.read).length

  const formatTime = (date: Date): string => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (minutes < 1) return 'Just now'
    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return `${hours}h ago`
    return `${days}d ago`
  }

  return (
    <div className={`glass-card ${className}`}>
      <div className="flex items-center justify-between border-b border-border px-6 py-4">
        <div className="flex items-center gap-2">
          <Bell className="h-5 w-5 text-primary" />
          <h3 className="font-semibold text-white">Notifications</h3>
          {unreadCount > 0 && (
            <span className="badge badge-danger">{unreadCount}</span>
          )}
        </div>
        {notifications.length > 0 && onClearAll && (
          <button
            onClick={onClearAll}
            className="text-sm text-text-muted transition-colors hover:text-primary"
          >
            Clear All
          </button>
        )}
      </div>

      <div className="max-h-96 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="p-12 text-center">
            <Bell className="mx-auto h-12 w-12 text-text-muted mb-4" />
            <p className="text-text-muted">No notifications</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`border-l-4 ${notificationBorders[notification.type]} ${
                  !notification.read ? 'bg-white/5' : ''
                } transition-colors hover:bg-white/5`}
              >
                <div className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-0.5">
                      {notificationIcons[notification.type]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-medium text-white text-sm">
                          {notification.title}
                        </h4>
                        <button
                          onClick={() => onDismiss?.(notification.id)}
                          className="flex-shrink-0 rounded-lg p-1 text-text-muted transition-colors hover:bg-white/10 hover:text-white focus-ring"
                          aria-label="Dismiss notification"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="mt-1 text-sm text-text-secondary">
                        {notification.message}
                      </p>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-xs text-text-muted">
                          {formatTime(notification.timestamp)}
                        </span>
                        {notification.action && (
                          <button
                            onClick={notification.action.onClick}
                            className="text-xs font-medium text-primary transition-colors hover:text-primary/80"
                          >
                            {notification.action.label}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export interface NotificationButtonProps {
  notifications: Notification[]
  onClick?: () => void
  className?: string
}

export function EnterpriseNotificationButton({
  notifications,
  onClick,
  className = '',
}: NotificationButtonProps) {
  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <button
      onClick={onClick}
      className={`relative rounded-lg p-2 text-text-muted transition-colors hover:bg-white/10 hover:text-white focus-ring ${className}`}
      aria-label={`Notifications ${unreadCount > 0 ? `(${unreadCount} unread)` : ''}`}
    >
      <Bell className="h-5 w-5" />
      {unreadCount > 0 && (
        <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-danger text-xs font-bold text-white">
          {unreadCount > 9 ? '9+' : unreadCount}
        </span>
      )}
    </button>
  )
}
