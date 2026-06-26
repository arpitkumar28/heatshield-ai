import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import AnalyticsDashboard from '../AnalyticsDashboard'

describe('AnalyticsDashboard', () => {
  it('renders without crashing', async () => {
    render(<AnalyticsDashboard />)
    await waitFor(() => {
      expect(screen.getByText('Average Temperature')).toBeInTheDocument()
    })
  })

  it('displays dashboard title', async () => {
    render(<AnalyticsDashboard />)
    expect(screen.getByText('Analytics Dashboard')).toBeInTheDocument()
    await waitFor(() => {
      expect(screen.getByText('38.5°C')).toBeInTheDocument()
    })
  })
})
