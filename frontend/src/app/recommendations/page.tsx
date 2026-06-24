'use client'

import { useState, useEffect } from 'react'
import { Zap, Leaf, Building, Droplets } from 'lucide-react'
import { recommendationAPI } from '@/lib/api'

interface Recommendation {
  id: number
  title: string
  category: string
  description: string
  impact_score: number
  cost_estimate: string
  expected_temperature_reduction: string
  priority: string
}

export default function RecommendationsPage() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    fetchRecommendations()
  }, [])

  const fetchRecommendations = async () => {
    try {
      const response = await recommendationAPI.getAllRecommendations()
      setRecommendations(response.data.recommendations || [])
    } catch (error) {
      console.error('Error fetching recommendations:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredRecommendations = filter === 'all' 
    ? recommendations 
    : recommendations.filter(rec => rec.priority.toLowerCase() === filter)

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'vegetation':
        return <Leaf className="w-5 h-5" />
      case 'infrastructure':
        return <Building className="w-5 h-5" />
      default:
        return <Droplets className="w-5 h-5" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return 'bg-red-500'
      case 'medium':
        return 'bg-yellow-500'
      case 'low':
        return 'bg-green-500'
      default:
        return 'bg-gray-500'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-isro-gradient text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-isro-orange mx-auto mb-4"></div>
          <p className="text-gray-400">Loading recommendations...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-isro-gradient text-white">
      {/* Header */}
      <header className="glass border-b border-isro-blue/30">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center space-x-3">
            <Zap className="w-10 h-10 text-isro-orange" />
            <div>
              <h1 className="text-2xl font-bold">AI Recommendations</h1>
              <p className="text-xs text-gray-400">Heat Mitigation Strategies</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* Filter Controls */}
        <div className="glass rounded-xl p-4 mb-6">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg transition-all ${
                filter === 'all' ? 'bg-isro-orange text-white' : 'bg-white/10 hover:bg-white/20'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('high')}
              className={`px-4 py-2 rounded-lg transition-all ${
                filter === 'high' ? 'bg-isro-orange text-white' : 'bg-white/10 hover:bg-white/20'
              }`}
            >
              High Priority
            </button>
            <button
              onClick={() => setFilter('medium')}
              className={`px-4 py-2 rounded-lg transition-all ${
                filter === 'medium' ? 'bg-isro-orange text-white' : 'bg-white/10 hover:bg-white/20'
              }`}
            >
              Medium Priority
            </button>
            <button
              onClick={() => setFilter('low')}
              className={`px-4 py-2 rounded-lg transition-all ${
                filter === 'low' ? 'bg-isro-orange text-white' : 'bg-white/10 hover:bg-white/20'
              }`}
            >
              Low Priority
            </button>
          </div>
        </div>

        {/* Recommendations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecommendations.map((rec) => (
            <RecommendationCard
              key={rec.id}
              recommendation={rec}
              getCategoryIcon={getCategoryIcon}
              getPriorityColor={getPriorityColor}
            />
          ))}
        </div>

        {filteredRecommendations.length === 0 && (
          <div className="glass rounded-xl p-8 text-center">
            <p className="text-gray-400">No recommendations found for the selected filter.</p>
          </div>
        )}
      </main>
    </div>
  )
}

function RecommendationCard({ 
  recommendation, 
  getCategoryIcon, 
  getPriorityColor 
}: { 
  recommendation: Recommendation
  getCategoryIcon: (category: string) => React.ReactNode
  getPriorityColor: (priority: string) => string
}) {
  return (
    <div className="glass rounded-xl p-6 hover:border-isro-orange/50 transition-all cursor-pointer">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className="p-2 rounded-lg bg-isro-blue/20 text-isro-blue">
            {getCategoryIcon(recommendation.category)}
          </div>
          <span className="text-xs px-2 py-1 rounded bg-isro-blue/20 text-isro-blue">
            {recommendation.category}
          </span>
        </div>
        <span className={`text-xs px-2 py-1 rounded ${getPriorityColor(recommendation.priority)} text-white`}>
          {recommendation.priority}
        </span>
      </div>

      <h3 className="text-lg font-semibold mb-2">{recommendation.title}</h3>
      <p className="text-sm text-gray-400 mb-4">{recommendation.description}</p>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-400">Impact Score:</span>
          <span className="text-sm font-semibold text-isro-accent">
            {(recommendation.impact_score * 100).toFixed(0)}%
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-400">Cost Estimate:</span>
          <span className="text-sm font-semibold text-isro-orange">
            {recommendation.cost_estimate}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-400">Temp Reduction:</span>
          <span className="text-sm font-semibold text-green-400">
            {recommendation.expected_temperature_reduction}
          </span>
        </div>
      </div>

      {/* Impact Score Bar */}
      <div className="mt-4">
        <div className="w-full bg-white/10 rounded-full h-2">
          <div
            className="bg-isro-orange h-2 rounded-full transition-all"
            style={{ width: `${recommendation.impact_score * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  )
}
