'use client'

import React from 'react'

export interface TableColumn<T> {
  key: keyof T | string
  header: string
  render?: (value: unknown, row: T, index: number) => React.ReactNode
  sortable?: boolean
  width?: string
  align?: 'left' | 'center' | 'right'
}

export interface TableProps<T> {
  data: T[]
  columns: TableColumn<T>[]
  onRowClick?: (row: T, index: number) => void
  onSort?: (key: string, direction: 'asc' | 'desc') => void
  sortKey?: string
  sortDirection?: 'asc' | 'desc'
  loading?: boolean
  emptyMessage?: string
  className?: string
}

export function EnterpriseTable<T extends Record<string, unknown>>({
  data,
  columns,
  onRowClick,
  onSort,
  sortKey,
  sortDirection = 'asc',
  loading = false,
  emptyMessage = 'No data available',
  className = '',
}: TableProps<T>) {
  const handleSort = (column: TableColumn<T>) => {
    if (!column.sortable || !onSort) return
    const key = String(column.key)
    const newDirection = sortKey === key && sortDirection === 'asc' ? 'desc' : 'asc'
    onSort(key, newDirection)
  }

  const renderSortIcon = (column: TableColumn<T>) => {
    if (!column.sortable) return null
    const key = String(column.key)
    if (sortKey !== key) return null
    return (
      <span className="ml-2 text-primary">
        {sortDirection === 'asc' ? '↑' : '↓'}
      </span>
    )
  }

  if (loading) {
    return (
      <div className={`glass-card p-6 ${className}`}>
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="skeleton h-12 w-full" />
          ))}
        </div>
      </div>
    )
  }

  if (data.length === 0) {
    return (
      <div className={`glass-card p-12 text-center ${className}`}>
        <p className="text-text-muted text-lg">{emptyMessage}</p>
      </div>
    )
  }

  return (
    <div className={`glass-card overflow-hidden ${className}`}>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              {columns.map((column) => (
                <th
                  key={String(column.key)}
                  className={`px-6 py-4 text-sm font-semibold text-text-secondary uppercase tracking-wider ${
                    column.align === 'center' ? 'text-center' : 
                    column.align === 'right' ? 'text-right' : 'text-left'
                  } ${column.sortable && onSort ? 'cursor-pointer hover:text-primary transition-colors' : ''}`}
                  style={{ width: column.width }}
                  onClick={() => handleSort(column)}
                >
                  <div className="flex items-center">
                    {column.header}
                    {renderSortIcon(column)}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={`border-b border-border transition-colors ${
                  onRowClick ? 'cursor-pointer hover:bg-white/5' : ''
                }`}
                onClick={() => onRowClick?.(row, rowIndex)}
              >
                {columns.map((column) => (
                  <td
                    key={String(column.key)}
                    className={`px-6 py-4 text-sm text-text-secondary ${
                      column.align === 'center' ? 'text-center' : 
                      column.align === 'right' ? 'text-right' : 'text-left'
                    }`}
                  >
                    {column.render
                      ? column.render(row[column.key as keyof T], row, rowIndex)
                      : String(row[column.key as keyof T] ?? '')}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
