'use client'

import React from 'react'

export interface Tab {
  id: string
  label: string
  icon?: React.ReactNode
  disabled?: boolean
}

export interface TabsProps {
  tabs: Tab[]
  activeTab: string
  onChange: (tabId: string) => void
  className?: string
  variant?: 'default' | 'pills'
}

export function EnterpriseTabs({
  tabs,
  activeTab,
  onChange,
  className = '',
  variant = 'default',
}: TabsProps) {
  if (variant === 'pills') {
    return (
      <div className={`flex flex-wrap gap-2 ${className}`}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => !tab.disabled && onChange(tab.id)}
            disabled={tab.disabled}
            className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${
              activeTab === tab.id
                ? 'bg-primary text-white shadow-lg'
                : 'bg-surface text-text-secondary hover:bg-white/10'
            } ${
              tab.disabled
                ? 'opacity-50 cursor-not-allowed'
                : 'cursor-pointer'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>
    )
  }

  return (
    <div className={`tab-nav ${className}`}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => !tab.disabled && onChange(tab.id)}
          disabled={tab.disabled}
          className={`tab-item ${activeTab === tab.id ? 'active' : ''} ${
            tab.disabled ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          role="tab"
          aria-selected={activeTab === tab.id}
          aria-controls={`panel-${tab.id}`}
        >
          {tab.icon && <span className="mr-2">{tab.icon}</span>}
          {tab.label}
        </button>
      ))}
    </div>
  )
}

export interface TabPanelProps {
  id: string
  activeTab: string
  children: React.ReactNode
  className?: string
}

export function TabPanel({ id, activeTab, children, className = '' }: TabPanelProps) {
  if (activeTab !== id) return null

  return (
    <div
      id={`panel-${id}`}
      role="tabpanel"
      aria-labelledby={`tab-${id}`}
      className={`animate-fade-in ${className}`}
    >
      {children}
    </div>
  )
}
