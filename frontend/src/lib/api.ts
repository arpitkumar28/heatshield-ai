import axios from 'axios'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add auth token to requests
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
  }
  return config
})

// Auth APIs
export const authAPI = {
  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }),
  register: (data: { email: string; password: string; name: string }) =>
    api.post('/auth/register', data),
  getProfile: () =>
    api.get('/auth/me'),
}

// Location APIs
export const locationAPI = {
  getLocations: (params?: { city?: string; limit?: number; offset?: number }) =>
    api.get('/locations', { params }),
  getLocation: (id: number) =>
    api.get(`/locations/${id}`),
  createLocation: (data: { name: string; latitude: number; longitude: number; city: string }) =>
    api.post('/locations', data),
  getHeatData: (locationId: number, params?: { start_date?: string; end_date?: string }) =>
    api.get(`/locations/${locationId}/heat-data`, { params }),
  getHotspots: (threshold?: number) =>
    api.get('/locations/hotspots', { params: { threshold } }),
  getNearbyCoolingCenters: (lat: number, lng: number, radius?: number) =>
    api.get('/locations/cooling-centers/nearby', { params: { latitude: lat, longitude: lng, radius_km: radius } }),
}

// Recommendation APIs
export const recommendationAPI = {
  getAllRecommendations: () =>
    api.get('/recommendations'),
  getRecommendations: (locationId: number) =>
    api.get(`/recommendations/locations/${locationId}/recommendations`),
  createRecommendation: (data: { location_id: number; recommendation_type: string; priority: string; description: string }) =>
    api.post('/recommendations', data),
  getHeatAlerts: (locationId?: number) =>
    api.get('/recommendations/heat-alerts', { params: { location_id: locationId } }),
}

// Analytics APIs
export const analyticsAPI = {
  getHeatmap: (city: string = 'Jaipur') =>
    api.get('/heatmap', { params: { city } }),
  getHeatTrends: (locationId: number, days: number) =>
    api.get('/analytics/heat-trends', { params: { location_id: locationId, days } }),
  getSummary: () =>
    api.get('/analytics/summary'),
  getLocationComparison: (locationIds: number[]) =>
    api.get('/analytics/location-comparison', { params: { location_ids: locationIds } }),
  getVulnerabilityMap: () =>
    api.get('/analytics/vulnerability-map'),
}

export default api
