'use client'

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { User, AuthTokens, LoginCredentials, RegisterData, AuthState } from '@/types/auth'

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>
  register: (data: RegisterData) => Promise<void>
  logout: () => void
  refreshToken: () => Promise<void>
  hasPermission: (permission: string) => boolean
  hasRole: (role: string) => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const TOKEN_STORAGE_KEY = 'auth_tokens'
const USER_STORAGE_KEY = 'auth_user'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
  })

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_STORAGE_KEY)
    localStorage.removeItem(USER_STORAGE_KEY)
    
    setState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    })
  }, [])

  // Initialize auth state from localStorage
  useEffect(() => {
    const tokens = localStorage.getItem(TOKEN_STORAGE_KEY)
    const user = localStorage.getItem(USER_STORAGE_KEY)
    
    if (tokens && user) {
      try {
        const parsedTokens: AuthTokens = JSON.parse(tokens)
        const parsedUser: User = JSON.parse(user)
        
        // Check if token is expired
        if (Date.now() >= parsedTokens.expiresIn) {
          logout()
        } else {
          setState({
            user: parsedUser,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          })
        }
      } catch (error) {
        console.error('Failed to parse auth data:', error)
        logout()
      }
    } else {
      setState(prev => ({ ...prev, isLoading: false }))
    }
  }, [logout])

  const login = useCallback(async (credentials: LoginCredentials) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }))
    
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Login failed')
      }

      const data = await response.json()
      const { user, tokens } = data

      localStorage.setItem(TOKEN_STORAGE_KEY, JSON.stringify(tokens))
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user))

      setState({
        user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      })
    } catch (error) {
      setState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Login failed',
      })
      throw error
    }
  }, [])

  const register = useCallback(async (data: RegisterData) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }))
    
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Registration failed')
      }

      await response.json()
      
      // Auto login after registration
      await login({ email: data.email, password: data.password })
    } catch (error) {
      setState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Registration failed',
      })
      throw error
    }
  }, [login])

  const refreshToken = useCallback(async () => {
    const tokens = localStorage.getItem(TOKEN_STORAGE_KEY)
    if (!tokens) return

    try {
      const parsedTokens: AuthTokens = JSON.parse(tokens)
      
      const response = await fetch('/api/auth/refresh', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken: parsedTokens.refreshToken }),
      })

      if (!response.ok) {
        logout()
        return
      }

      const data = await response.json()
      const { tokens: newTokens } = data

      localStorage.setItem(TOKEN_STORAGE_KEY, JSON.stringify(newTokens))
    } catch (error) {
      console.error('Token refresh failed:', error)
      logout()
    }
  }, [logout])

  const hasPermission = useCallback((permission: string) => {
    return state.user?.permissions.includes(permission) || false
  }, [state.user?.permissions])

  const hasRole = useCallback((role: string) => {
    return state.user?.role === role || false
  }, [state.user?.role])

  // Auto refresh token before expiration
  useEffect(() => {
    if (!state.isAuthenticated) return

    const tokens = localStorage.getItem(TOKEN_STORAGE_KEY)
    if (!tokens) return

    const parsedTokens: AuthTokens = JSON.parse(tokens)
    const timeUntilExpiry = parsedTokens.expiresIn - Date.now()
    
    // Refresh token 5 minutes before expiry
    if (timeUntilExpiry > 0 && timeUntilExpiry < 5 * 60 * 1000) {
      refreshToken()
    }
  }, [state.isAuthenticated, refreshToken])

  const value: AuthContextType = {
    ...state,
    login,
    register,
    logout,
    refreshToken,
    hasPermission,
    hasRole,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
