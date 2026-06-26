import '@testing-library/jest-dom'

class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

global.ResizeObserver = ResizeObserverMock

jest.mock('@/lib/api', () => ({
  __esModule: true,
  default: {
    get: jest.fn(() => Promise.resolve({ data: {} })),
    post: jest.fn(() => Promise.resolve({ data: {} })),
    put: jest.fn(() => Promise.resolve({ data: {} })),
    delete: jest.fn(() => Promise.resolve({ data: {} })),
  },
  analyticsAPI: {
    getSummary: jest.fn(() => Promise.resolve({
      data: {
        average_temperature: 38.5,
        heat_index: 44.2,
        ndvi_score: 0.4215,
        hotspot_count: 12,
        risk_level: 'High',
      },
    })),
    getHeatmap: jest.fn(() => Promise.resolve({
      data: {
        city: 'Jaipur',
        average_temperature: 38.5,
        hotspots: [
          { lat: 26.9124, lng: 75.7873, temperature: 42.1, risk_level: 'High' },
        ],
      },
    })),
    getHeatTrends: jest.fn(() => Promise.resolve({ data: { trends: [] } })),
    getLocationComparison: jest.fn(() => Promise.resolve({ data: { comparison: [] } })),
    getVulnerabilityMap: jest.fn(() => Promise.resolve({ data: { vulnerability_data: [] } })),
  },
  authAPI: {
    login: jest.fn(() => Promise.resolve({ data: { access_token: 'test-token', token_type: 'bearer' } })),
    register: jest.fn(() => Promise.resolve({ data: {} })),
    getProfile: jest.fn(() => Promise.resolve({ data: {} })),
  },
  locationAPI: {
    getLocations: jest.fn(() => Promise.resolve({ data: [] })),
    getLocation: jest.fn(() => Promise.resolve({ data: {} })),
    createLocation: jest.fn(() => Promise.resolve({ data: {} })),
    getHeatData: jest.fn(() => Promise.resolve({ data: [] })),
    getHotspots: jest.fn(() => Promise.resolve({ data: { hotspots: [] } })),
    getNearbyCoolingCenters: jest.fn(() => Promise.resolve({ data: [] })),
  },
  recommendationAPI: {
    getAllRecommendations: jest.fn(() => Promise.resolve({ data: { recommendations: [] } })),
    getRecommendations: jest.fn(() => Promise.resolve({ data: [] })),
    createRecommendation: jest.fn(() => Promise.resolve({ data: {} })),
    getHeatAlerts: jest.fn(() => Promise.resolve({ data: [] })),
  },
}))
