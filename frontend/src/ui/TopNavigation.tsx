'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Search, User, Settings, LogOut, Menu, Moon, Sun } from 'lucide-react'
import { EnterpriseNotificationButton } from './Notification'

export interface TopNavigationProps {
  title?: string
  user?: {
    name: string
    email: string
    avatar?: string
  }
  notifications?: number
  onSearch?: (query: string) => void
  onMenuClick?: () => void
  onThemeToggle?: () => void
  isDarkMode?: boolean
  className?: string
}

export function EnterpriseTopNavigation({
  title = 'National Command Center',
  user = {
    name: 'Admin User',
    email: 'admin@heatshield.gov.in',
  },
  notifications = 0,
  onSearch,
  onMenuClick,
  onThemeToggle,
  isDarkMode = true,
  className = '',
}: TopNavigationProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [showUserMenu, setShowUserMenu] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch?.(searchQuery)
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
    onSearch?.(e.target.value)
  }

  return (
    <header className={`glass-panel border-b border-border ${className}`}>
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="rounded-lg p-2 text-text-muted transition-colors hover:bg-white/10 hover:text-white focus-ring lg:hidden"
            aria-label="Toggle menu"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-lg font-semibold text-white">{title}</h1>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {onSearch && (
            <form onSubmit={handleSearch} className="hidden md:block">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Search..."
                  className="input-field w-64 pl-10"
                  aria-label="Search"
                />
              </div>
            </form>
          )}

          {onThemeToggle && (
            <button
              onClick={onThemeToggle}
              className="rounded-lg p-2 text-text-muted transition-colors hover:bg-white/10 hover:text-white focus-ring"
              aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>
          )}

          <EnterpriseNotificationButton
            notifications={Array.from({ length: notifications }, (_, i) => ({
              id: `notif-${i}`,
              type: 'info' as const,
              title: 'Notification',
              message: 'Sample notification message',
              timestamp: new Date(),
            }))}
            onClick={() => {}}
          />

          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-white/10 focus-ring"
              aria-label="User menu"
              aria-expanded={showUserMenu}
            >
              {user.avatar ? (
                <Image
                  src={user.avatar}
                  alt={user.name}
                  width={32}
                  height={32}
                  className="h-8 w-8 rounded-full object-cover"
                />
              ) : (
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white">
                  {user.name.charAt(0)}
                </div>
              )}
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-white">{user.name}</p>
                <p className="text-xs text-text-muted">{user.email}</p>
              </div>
            </button>

            {showUserMenu && (
              <div className="dropdown-menu right-0 mt-2 w-56">
                <div className="border-b border-border px-4 py-3">
                  <p className="text-sm font-medium text-white">{user.name}</p>
                  <p className="text-xs text-text-muted">{user.email}</p>
                </div>
                <div className="py-2">
                  <button className="dropdown-item w-full">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </button>
                  <button className="dropdown-item w-full">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </button>
                </div>
                <div className="border-t border-border py-2">
                  <button className="dropdown-item w-full text-danger">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
