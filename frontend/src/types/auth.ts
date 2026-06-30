export type UserRole = 'admin' | 'scientist' | 'ndma' | 'isro' | 'operator' | 'citizen'

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  permissions: string[]
  organization?: string
  createdAt: string
  lastLogin?: string
}

export interface AuthTokens {
  accessToken: string
  refreshToken: string
  expiresIn: number
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  email: string
  password: string
  name: string
  role: UserRole
  organization?: string
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}
