import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import HeatMap from '../HeatMap'

describe('HeatMap', () => {
  it('renders without crashing', async () => {
    render(<HeatMap />)
    await waitFor(() => {
      expect(screen.getByText('Temperature')).toBeInTheDocument()
    })
  })

  it('displays map component', async () => {
    render(<HeatMap />)
    await waitFor(() => {
      expect(screen.getByText('Legend')).toBeInTheDocument()
    })
  })
})
