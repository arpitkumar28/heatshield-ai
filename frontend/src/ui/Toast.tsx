'use client'

import React, { useEffect, useState } from 'react'
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react'

export type ToastType = 'success' | 'error' | 'warning' | 'info'

export interface ToastProps {
  type: ToastType
  message: string
  duration?: number
  onClose: () => void
  className?: string
}

const toastIcons = {
  success: <CheckCircle className="h-5 w-5 text-success" />,
  error: <AlertCircle className="h-5 w-5 text-danger" />,
  warning: <AlertTriangle className="h-5 w-5 text-warning" />,
  info: <Info className="h-5 w-5 text-info" />,
}

const toastClasses = {
  success: 'toast-success',
  error: 'toast-error',
  warning: 'toast-warning',
  info: 'toast-info',
}

export function EnterpriseToast({
  type,
  message,
  duration = 5000,
  onClose,
  className = '',
}: ToastProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(onClose, 300)
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  if (!isVisible) return null

  return (
    <div className={`toast ${toastClasses[type]} ${className}`}>
      <div className="flex items-start gap-3">
        {toastIcons[type]}
        <p className="flex-1 text-sm text-white">{message}</p>
        <button
          onClick={() => {
            setIsVisible(false)
            setTimeout(onClose, 300)
          }}
          className="rounded-lg p-1 text-text-muted transition-colors hover:bg-white/10 hover:text-white focus-ring"
          aria-label="Close toast"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

let toastCount = 0

export function showToast(): string {
  const id = `toast-${toastCount++}`
  
  const toastContainer = document.getElementById('toast-container')
  if (!toastContainer) {
    const container = document.createElement('div')
    container.id = 'toast-container'
    container.className = 'fixed bottom-4 right-4 z-notification flex flex-col gap-2'
    document.body.appendChild(container)
  }

  return id
}
