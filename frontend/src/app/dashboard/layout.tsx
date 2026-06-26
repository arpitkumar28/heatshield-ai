'use client'

import { EnterpriseSidebar, EnterpriseTopNavigation } from '@/components/ui/premium'
import { useState } from 'react'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(true)

  return (
    <div className={`min-h-screen bg-background ${isDarkMode ? 'dark' : ''}`}>
      <EnterpriseSidebar
        collapsed={sidebarCollapsed}
        onCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      
      <div className={`transition-all duration-300 ${
        sidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64'
      }`}>
        <EnterpriseTopNavigation
          onMenuClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          onThemeToggle={() => setIsDarkMode(!isDarkMode)}
          isDarkMode={isDarkMode}
        />
        
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
