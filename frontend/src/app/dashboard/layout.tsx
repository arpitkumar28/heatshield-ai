'use client'

import { EnterpriseSidebar, EnterpriseTopNavigation } from '@/ui'
import { useState } from 'react'
import { ProtectedRoute } from '@/components/ProtectedRoute'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(true)

  return (
    <ProtectedRoute>
      <div className={`min-h-screen bg-background ${isDarkMode ? 'dark' : ''}`}>
        <EnterpriseSidebar
          collapsed={sidebarCollapsed}
          onCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="fixed inset-y-0 left-0 z-40 h-screen"
        />
        
        <div className={`transition-all duration-300 ${
          sidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64'
        }`}>
          <EnterpriseTopNavigation
            onMenuClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            onThemeToggle={() => setIsDarkMode(!isDarkMode)}
            isDarkMode={isDarkMode}
            className="sticky top-0 z-30"
          />
          
          <main className="min-h-[calc(100vh-4rem)] p-6">
            {children}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
}
