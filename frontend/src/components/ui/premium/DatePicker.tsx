'use client'

import React, { useState } from 'react'
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react'

export interface DatePickerProps {
  value?: Date
  onChange?: (date: Date) => void
  placeholder?: string
  disabled?: boolean
  className?: string
  minDate?: Date
  maxDate?: Date
}

export function EnterpriseDatePicker({
  value,
  onChange,
  placeholder = 'Select date',
  disabled = false,
  className = '',
  minDate,
  maxDate,
}: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [currentMonth, setCurrentMonth] = useState(value || new Date())

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  const getDaysInMonth = (date: Date): number => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date): number => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const isDateDisabled = (date: Date): boolean => {
    if (minDate && date < minDate) return true
    if (maxDate && date > maxDate) return true
    return false
  }

  const handleDateSelect = (date: Date) => {
    if (isDateDisabled(date)) return
    onChange?.(date)
    setIsOpen(false)
  }

  const handlePreviousMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    )
  }

  const handleNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    )
  }

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth)
    const firstDay = getFirstDayOfMonth(currentMonth)
    const days = []

    const dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-10" />)
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth(),
        day
      )
      const isSelected =
        value &&
        date.toDateString() === value.toDateString()
      const disabled = isDateDisabled(date)

      days.push(
        <button
          key={day}
          onClick={() => handleDateSelect(date)}
          disabled={disabled}
          className={`h-10 w-10 rounded-lg text-sm font-medium transition-all ${
            isSelected
              ? 'bg-primary text-white shadow-lg'
              : disabled
              ? 'text-text-disabled cursor-not-allowed'
              : 'text-text-secondary hover:bg-white/10'
          }`}
        >
          {day}
        </button>
      )
    }

    return (
      <div className="p-4">
        <div className="mb-4 flex items-center justify-between">
          <button
            onClick={handlePreviousMonth}
            className="rounded-lg p-2 text-text-muted transition-colors hover:bg-white/10 hover:text-white focus-ring"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <span className="text-sm font-semibold text-white">
            {currentMonth.toLocaleDateString('en-US', {
              month: 'long',
              year: 'numeric',
            })}
          </span>
          <button
            onClick={handleNextMonth}
            className="rounded-lg p-2 text-text-muted transition-colors hover:bg-white/10 hover:text-white focus-ring"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
        <div className="grid grid-cols-7 gap-1">
          {dayNames.map((day) => (
            <div
              key={day}
              className="h-10 text-center text-xs font-medium text-text-muted"
            >
              {day}
            </div>
          ))}
          {days}
        </div>
      </div>
    )
  }

  return (
    <div className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`input-field flex w-full items-center justify-between gap-2 ${
          disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
        }`}
      >
        <span className={value ? 'text-white' : 'text-text-muted'}>
          {value ? formatDate(value) : placeholder}
        </span>
        <Calendar className="h-4 w-4 text-text-muted" />
      </button>

      {isOpen && (
        <div className="dropdown-menu left-0 mt-2 w-auto">
          {renderCalendar()}
        </div>
      )}
    </div>
  )
}
