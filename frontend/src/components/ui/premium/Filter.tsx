'use client'

import React, { useState } from 'react'
import { Filter, ChevronDown } from 'lucide-react'

export interface FilterOption {
  value: string
  label: string
  count?: number
}

export interface FilterGroup {
  id: string
  label: string
  type: 'checkbox' | 'radio'
  options: FilterOption[]
}

export interface FilterProps {
  groups: FilterGroup[]
  activeFilters: Record<string, string[]>
  onFilterChange: (groupId: string, values: string[]) => void
  onClearAll?: () => void
  className?: string
}

export function EnterpriseFilter({
  groups,
  activeFilters,
  onFilterChange,
  onClearAll,
  className = '',
}: FilterProps) {
  const [isExpanded, setIsExpanded] = useState(true)
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>(
    groups.reduce((acc, group) => ({ ...acc, [group.id]: true }), {})
  )

  const hasActiveFilters = Object.values(activeFilters).some(
    (values) => values.length > 0
  )

  const handleToggleGroup = (groupId: string) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [groupId]: !prev[groupId],
    }))
  }

  const handleOptionToggle = (groupId: string, value: string) => {
    const currentValues = activeFilters[groupId] || []
    const group = groups.find((g) => g.id === groupId)
    
    if (group?.type === 'radio') {
      onFilterChange(groupId, currentValues.includes(value) ? [] : [value])
    } else {
      const newValues = currentValues.includes(value)
        ? currentValues.filter((v) => v !== value)
        : [...currentValues, value]
 onFilterChange(groupId, newValues)
    }
  }

  const getActiveFilterCount = (): number => {
    return Object.values(activeFilters).reduce(
      (acc, values) => acc + values.length,
      0
    )
  }

  return (
    <div className={`glass-card ${className}`}>
      <div className="flex items-center justify-between border-b border-border px-6 py-4">
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-primary" />
          <h3 className="font-semibold text-white">Filters</h3>
          {hasActiveFilters && (
            <span className="badge badge-primary ml-2">
              {getActiveFilterCount()}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {hasActiveFilters && onClearAll && (
            <button
              onClick={onClearAll}
              className="text-sm text-text-muted transition-colors hover:text-primary"
            >
              Clear All
            </button>
          )}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="rounded-lg p-2 text-text-muted transition-colors hover:bg-white/10 hover:text-white focus-ring"
            aria-label={isExpanded ? 'Collapse filters' : 'Expand filters'}
          >
            <ChevronDown
              className={`h-4 w-4 transition-transform ${
                isExpanded ? 'rotate-180' : ''
              }`}
            />
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="p-6 space-y-6">
          {groups.map((group) => (
            <div key={group.id}>
              <button
                onClick={() => handleToggleGroup(group.id)}
                className="flex w-full items-center justify-between text-left"
              >
                <span className="font-medium text-white">{group.label}</span>
                <ChevronDown
                  className={`h-4 w-4 text-text-muted transition-transform ${
                    expandedGroups[group.id] ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {expandedGroups[group.id] && (
                <div className="mt-3 space-y-2">
                  {group.options.map((option) => {
                    const isActive =
                      (activeFilters[group.id] || []).includes(option.value)
                    const inputType = group.type === 'radio' ? 'radio' : 'checkbox'

                    return (
                      <label
                        key={option.value}
                        className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 transition-colors hover:bg-white/5"
                      >
                        <input
                          type={inputType}
                          checked={isActive}
                          onChange={() => handleOptionToggle(group.id, option.value)}
                          className="h-4 w-4 rounded border-border bg-surface text-primary focus:ring-2 focus:ring-primary focus:ring-offset-0"
                        />
                        <span className="flex-1 text-sm text-text-secondary">
                          {option.label}
                        </span>
                        {option.count !== undefined && (
                          <span className="text-xs text-text-muted">
                            {option.count}
                          </span>
                        )}
                      </label>
                    )
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
