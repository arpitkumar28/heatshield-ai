'use client'

import dynamic from 'next/dynamic'
import { useState } from 'react'
import { Thermometer, Map, Activity, Shield, Satellite, Zap } from 'lucide-react'

const HeatMap = dynamic(() => import('@/components/HeatMap'), { ssr: false })
const AnalyticsDashboard = dynamic(() => import('@/components/AnalyticsDashboard'), { ssr: false })

export default function Home() {
  const [activeTab, setActiveTab] = useState('heatmap')

  return (
    <div className="min-h-screen bg-isro-gradient text-white">
      {/* Header */}
      <header className="glass border-b border-isro-blue/30">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Satellite className="w-10 h-10 text-isro-orange animate-float" />
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-isro-orange to-isro-accent bg-clip-text text-transparent">
                  HeatShield AI
                </h1>
                <p className="text-xs text-gray-400">Urban Heat Intelligence Platform</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="px-4 py-2 rounded-lg bg-isro-blue/20 border border-isro-blue/50 hover:bg-isro-blue/40 transition-all">
                Login
              </button>
              <button className="px-4 py-2 rounded-lg bg-isro-orange hover:bg-isro-orange/80 transition-all">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="container mx-auto px-6 py-4">
        <div className="flex space-x-2 glass rounded-lg p-2">
          <button
            onClick={() => setActiveTab('heatmap')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
              activeTab === 'heatmap'
                ? 'bg-isro-orange text-white'
                : 'hover:bg-white/10'
            }`}
          >
            <Map className="w-4 h-4" />
            <span>Heat Map</span>
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
              activeTab === 'analytics'
                ? 'bg-isro-orange text-white'
                : 'hover:bg-white/10'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>Analytics</span>
          </button>
          <button
            onClick={() => setActiveTab('recommendations')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
              activeTab === 'recommendations'
                ? 'bg-isro-orange text-white'
                : 'hover:bg-white/10'
            }`}
          >
            <Shield className="w-4 h-4" />
            <span>Recommendations</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {activeTab === 'heatmap' && <HeatMap />}
        {activeTab === 'analytics' && <AnalyticsDashboard />}
        {activeTab === 'recommendations' && <RecommendationsPanel />}
      </main>

      {/* Footer */}
      <footer className="glass border-t border-isro-blue/30 mt-12">
        <div className="container mx-auto px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold text-isro-orange mb-4">HeatShield AI</h3>
              <p className="text-sm text-gray-400">
                AI-Powered Urban Heat Intelligence Platform for Bharatiya Antariksh Hackathon 2026
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Features</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Heat Hotspot Detection</li>
                <li>LST Visualization</li>
                <li>NDVI Analysis</li>
                <li>AI Recommendations</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Data Sources</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>ISRO Bhuvan</li>
                <li>Landsat 8/9</li>
                <li>Sentinel-2</li>
                <li>IMD Weather Data</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Technology</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Next.js 15</li>
                <li>FastAPI</li>
                <li>XGBoost</li>
                <li>PostGIS</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-isro-blue/30 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>© 2026 HeatShield AI. Built for Bharatiya Antariksh Hackathon 2026.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

function RecommendationsPanel() {
  return (
    <div className="space-y-6">
      <div className="glass rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-4 flex items-center space-x-2">
          <Zap className="w-6 h-6 text-isro-orange" />
          <span>AI-Generated Recommendations</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <RecommendationCard
            title="Increase Green Cover"
            category="Vegetation"
            impact="2-3°C"
            cost="₹50 Lakhs"
            priority="High"
          />
          <RecommendationCard
            title="Cool Roofs Initiative"
            category="Infrastructure"
            impact="1-2°C"
            cost="₹30 Lakhs"
            priority="Medium"
          />
          <RecommendationCard
            title="Urban Water Bodies"
            category="Infrastructure"
            impact="1.5-2.5°C"
            cost="₹75 Lakhs"
            priority="High"
          />
          <RecommendationCard
            title="Tree Planting Drive"
            category="Vegetation"
            impact="1-2°C"
            cost="₹20 Lakhs"
            priority="Medium"
          />
          <RecommendationCard
            title="Permeable Pavements"
            category="Infrastructure"
            impact="0.5-1°C"
            cost="₹40 Lakhs"
            priority="Low"
          />
          <RecommendationCard
            title="Shade Structures"
            category="Infrastructure"
            impact="1-1.5°C"
            cost="₹25 Lakhs"
            priority="Medium"
          />
        </div>
      </div>
    </div>
  )
}

function RecommendationCard({ title, category, impact, cost, priority }: any) {
  const priorityColors = {
    High: 'bg-red-500',
    Medium: 'bg-yellow-500',
    Low: 'bg-green-500'
  }

  return (
    <div className="glass rounded-lg p-4 hover:border-isro-orange/50 transition-all cursor-pointer">
      <div className="flex items-start justify-between mb-3">
        <span className="text-xs px-2 py-1 rounded bg-isro-blue/20 text-isro-blue">
          {category}
        </span>
        <span className={`text-xs px-2 py-1 rounded ${priorityColors[priority as keyof typeof priorityColors]} text-white`}>
          {priority}
        </span>
      </div>
      <h3 className="font-semibold mb-2">{title}</h3>
      <div className="space-y-1 text-sm text-gray-400">
        <p>Temperature Reduction: <span className="text-isro-accent">{impact}</span></p>
        <p>Estimated Cost: <span className="text-isro-orange">{cost}</span></p>
      </div>
    </div>
  )
}
