import React from 'react'
import { render, screen } from '@testing-library/react'
import HeatMap from '../HeatMap'

describe('HeatMap', () => {
  it('renders without crashing', () => {
    render(<HeatMap />)
  })

  it('displays map component', () => {
    render(<HeatMap />)
    // Add specific assertions based on component content
  })
})
