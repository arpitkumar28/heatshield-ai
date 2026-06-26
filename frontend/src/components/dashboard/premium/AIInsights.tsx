'use client'

import { Brain, Lightbulb, ArrowRight, Building2, MapPin, CheckCircle, Clock } from 'lucide-react'

const recommendations = [
  {
    id: 1,
    priority: 'critical',
    category: 'Infrastructure',
    title: 'Deploy Emergency Cooling Centers',
    location: 'Industrial Zone, Jaipur',
    description: 'Based on current heat index of 52°C and vulnerable population density, deploy 5 additional cooling centers in the industrial zone. Estimated impact: 50,000 people protected.',
    impact: '50K citizens protected',
    cost: '₹2.5 Cr',
    timeline: '48 hours',
    confidence: 94,
    actions: [
      'Identify suitable government buildings',
      'Install air conditioning units',
      'Stock water and medical supplies',
      'Coordinate with municipal corporation'
    ]
  },
  {
    id: 2,
    priority: 'high',
    category: 'Urban Planning',
    title: 'Green Roof Initiative',
    location: 'Commercial District, Delhi',
    description: 'Implement green roof program for 20 commercial buildings to reduce urban heat island effect. Projected temperature reduction: 3-4°C in affected areas.',
    impact: '3-4°C temp reduction',
    cost: '₹8 Cr',
    timeline: '6 months',
    confidence: 87,
    actions: [
      'Survey eligible buildings',
      'Secure funding from Smart Cities Mission',
      'Partner with landscaping contractors',
      'Monitor NDVI improvements'
    ]
  },
  {
    id: 3,
    priority: 'medium',
    category: 'Public Health',
    title: 'Heat Health Alert System',
    location: 'City-wide, Mumbai',
    description: 'Launch SMS-based heat health alert system for vulnerable populations. Integration with existing municipal communication infrastructure.',
    impact: '2M citizens notified',
    cost: '₹1.2 Cr',
    timeline: '2 weeks',
    confidence: 91,
    actions: [
      'Integrate with municipal database',
      'Develop alert thresholds',
      'Setup SMS gateway',
      'Conduct pilot testing'
    ]
  }
]

export default function AIInsights() {
  return (
    <div className="glass-card rounded-xl border border-white/10">
      <div className="flex items-center justify-between p-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-secondary">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white font-display">AI Recommendations</h3>
            <p className="text-sm text-text-muted font-display">Government-grade action items</p>
          </div>
        </div>
        <button className="flex items-center gap-2 text-sm text-primary hover:text-white transition-colors">
          View All
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="p-6 space-y-4 max-h-[600px] overflow-y-auto">
        {recommendations.map((rec) => (
          <div key={rec.id} className="bg-white/5 rounded-xl p-5 border border-white/10 hover:border-primary/30 transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${
                  rec.priority === 'critical' ? 'bg-danger/20 text-danger border border-danger/30' :
                  rec.priority === 'high' ? 'bg-warning/20 text-warning border border-warning/30' :
                  'bg-success/20 text-success border border-success/30'
                }`}>
                  <Lightbulb className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-white font-display">{rec.title}</h4>
                    <span className={`px-2 py-0.5 rounded text-xs font-medium border ${
                      rec.priority === 'critical' ? 'bg-danger/20 text-danger border-danger/30' :
                      rec.priority === 'high' ? 'bg-warning/20 text-warning border-warning/30' :
                      'bg-success/20 text-success border-success/30'
                    }`}>
                      {rec.priority.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-text-muted">
                    <span className="flex items-center gap-1">
                      <Building2 className="w-3 h-3" />
                      {rec.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {rec.location}
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-white font-display">{rec.confidence}%</div>
                <div className="text-xs text-text-muted">Confidence</div>
              </div>
            </div>

            <p className="text-sm text-text-muted mb-4">{rec.description}</p>

            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                <div className="text-xs text-text-muted mb-1">Impact</div>
                <div className="text-sm font-semibold text-white">{rec.impact}</div>
              </div>
              <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                <div className="text-xs text-text-muted mb-1">Cost</div>
                <div className="text-sm font-semibold text-white">{rec.cost}</div>
              </div>
              <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                <div className="text-xs text-text-muted mb-1">Timeline</div>
                <div className="text-sm font-semibold text-white flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {rec.timeline}
                </div>
              </div>
            </div>

            <div className="border-t border-white/10 pt-4">
              <div className="text-xs text-text-muted mb-2">Required Actions</div>
              <div className="space-y-2">
                {rec.actions.slice(0, 3).map((action, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm text-text-muted">
                    <CheckCircle className="w-4 h-4 text-success" />
                    {action}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-2 mt-4 pt-4 border-t border-white/10">
              <button className="flex-1 bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                Implement
              </button>
              <button className="flex-1 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                Schedule Review
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
