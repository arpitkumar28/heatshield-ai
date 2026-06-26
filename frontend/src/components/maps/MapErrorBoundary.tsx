'use client'

import React, { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
  onRetry?: () => void
}

interface State {
  hasError: boolean
  error?: Error
  errorInfo?: ErrorInfo
  retryCount: number
}

export class MapErrorBoundary extends Component<Props, State> {
  private maxRetries = 3
  private retryTimeout: NodeJS.Timeout | null = null

  constructor(props: Props) {
    super(props)
    this.state = { 
      hasError: false, 
      retryCount: 0 
    }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Map Error Boundary caught an error:', error, errorInfo)
    this.setState({ errorInfo })
    
    // Log to external monitoring service in production
    if (typeof window !== 'undefined' && (window as any).Sentry) {
      (window as any).Sentry.captureException(error, {
        contexts: {
          react: {
            componentStack: errorInfo.componentStack
          }
        }
      })
    }
  }

  componentWillUnmount() {
    if (this.retryTimeout) {
      clearTimeout(this.retryTimeout)
    }
  }

  handleRetry = () => {
    const { retryCount } = this.state
    
    if (retryCount < this.maxRetries) {
      this.setState({ 
        hasError: false, 
        error: undefined,
        errorInfo: undefined,
        retryCount: retryCount + 1 
      })
      
      // Call custom retry handler if provided
      if (this.props.onRetry) {
        this.props.onRetry()
      }
    } else {
      // Max retries reached, reload page
      window.location.reload()
    }
  }

  handleReload = () => {
    window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }
      
      const { retryCount } = this.state
      const canRetry = retryCount < this.maxRetries
      
      return (
        <div className="flex items-center justify-center h-full bg-white/5 rounded-lg border border-white/10">
          <div className="text-center p-6 max-w-md">
            <div className="text-danger mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            
            <h3 className="text-lg font-semibold text-white mb-2">Map Error</h3>
            
            <p className="text-sm text-text-muted mb-4">
              {this.state.error?.message || 'Failed to load map'}
            </p>
            
            {this.state.errorInfo && (
              <details className="text-left mb-4 text-xs text-text-secondary">
                <summary className="cursor-pointer hover:text-text-muted mb-2">
                  Error Details
                </summary>
                <pre className="bg-black/20 p-2 rounded overflow-auto max-h-32">
                  {this.state.errorInfo.componentStack}
                </pre>
              </details>
            )}
            
            <div className="flex flex-col gap-2">
              {canRetry ? (
                <button
                  onClick={this.handleRetry}
                  className="px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg text-sm transition-colors"
                >
                  Retry Map ({this.maxRetries - retryCount} attempts remaining)
                </button>
              ) : (
                <button
                  onClick={this.handleReload}
                  className="px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg text-sm transition-colors"
                >
                  Reload Page
                </button>
              )}
              
              <button
                onClick={() => this.setState({ hasError: false })}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm transition-colors"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
