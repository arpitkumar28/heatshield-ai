'use client'

import React from 'react'
import { AlertTriangle, Info, CheckCircle, XCircle } from 'lucide-react'

export interface DialogProps {
  type: 'info' | 'success' | 'warning' | 'error'
  title: string
  message: string
  confirmText?: string
  cancelText?: string
  onConfirm: () => void
  onCancel: () => void
  isOpen: boolean
  className?: string
}

const dialogIcons = {
  info: <Info className="h-6 w-6 text-info" />,
  success: <CheckCircle className="h-6 w-6 text-success" />,
  warning: <AlertTriangle className="h-6 w-6 text-warning" />,
  error: <XCircle className="h-6 w-6 text-danger" />,
}

const dialogColors = {
  info: 'border-info',
  success: 'border-success',
  warning: 'border-warning',
  error: 'border-danger',
}

export function EnterpriseDialog({
  type,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
  isOpen,
  className = '',
}: DialogProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-modal">
      <div
        className="modal-backdrop"
        onClick={onCancel}
        role="presentation"
      />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <div
          className={`glass-card w-full max-w-md border-l-4 ${dialogColors[type]} ${className}`}
          role="alertdialog"
          aria-modal="true"
          aria-labelledby="dialog-title"
          aria-describedby="dialog-message"
        >
          <div className="flex gap-4 p-6">
            <div className="flex-shrink-0">{dialogIcons[type]}</div>
            <div className="flex-1">
              <h3
                id="dialog-title"
                className="text-lg font-semibold text-white mb-2"
              >
                {title}
              </h3>
              <p
                id="dialog-message"
                className="text-sm text-text-secondary mb-6"
              >
                {message}
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={onCancel}
                  className="btn-secondary"
                >
                  {cancelText}
                </button>
                <button
                  onClick={onConfirm}
                  className="btn-primary"
                >
                  {confirmText}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
