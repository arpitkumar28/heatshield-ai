'use client'

import { motion } from 'framer-motion'
import { PremiumButton as Button, PremiumBadge as Badge } from '@/ui'
import { Shield, Clock, Users, DollarSign, ArrowRight } from 'lucide-react'

const recommendations = [
  {
    id: 1,
    title: 'Deploy Green Roofs Initiative',
    description: 'Install green roofs on 50 commercial buildings in the industrial zone to reduce urban heat island effect.',
    priority: 'critical',
    impact: 92,
    cost: '₹2.5 Cr',
    population: '1.2L',
    timeline: '6 months',
    status: 'pending',
  },
  {
    id: 2,
    title: 'Establish Cooling Centers',
    description: 'Set up 10 emergency cooling centers in high-risk residential areas with 24/7 operation during heat waves.',
    priority: 'critical',
    impact: 95,
    cost: '₹1.8 Cr',
    population: '2.5L',
    timeline: '3 months',
    status: 'in_progress',
  },
  {
    id: 3,
    title: 'Urban Tree Plantation Drive',
    description: 'Plant 10,000 native trees along major roads and public spaces to increase vegetation cover and provide shade.',
    priority: 'high',
    impact: 78,
    cost: '₹80 L',
    population: '5L',
    timeline: '12 months',
    status: 'pending',
  },
  {
    id: 4,
    title: 'Water Station Network',
    description: 'Install 100 public water stations with chilled water dispensers across the city for emergency hydration.',
    priority: 'high',
    impact: 85,
    cost: '₹45 L',
    population: '3L',
    timeline: '4 months',
    status: 'completed',
  },
  {
    id: 5,
    title: 'Reflective Surface Program',
    description: 'Apply reflective coatings on rooftops and roads in commercial districts to reduce heat absorption.',
    priority: 'medium',
    impact: 72,
    cost: '₹1.2 Cr',
    population: '80K',
    timeline: '8 months',
    status: 'pending',
  },
  {
    id: 6,
    title: 'Smart Irrigation System',
    description: 'Implement AI-controlled irrigation for public parks and gardens to optimize water usage and maintain greenery.',
    priority: 'medium',
    impact: 68,
    cost: '₹65 L',
    population: '1.5L',
    timeline: '6 months',
    status: 'pending',
  },
]

const columns = [
  { id: 'pending', title: 'Pending', color: 'border-warning/50' },
  { id: 'in_progress', title: 'In Progress', color: 'border-secondary/50' },
  { id: 'completed', title: 'Completed', color: 'border-success/50' },
]

export default function RecommendationsPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
          {/* Page header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">Recommendations</h1>
            <p className="text-gray-400">AI-powered heat mitigation strategies prioritized by impact and feasibility</p>
          </div>

          {/* Kanban Board */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {columns.map((column) => (
              <motion.div
                key={column.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: columns.indexOf(column) * 0.1 }}
              >
                <div className={`glass-panel rounded-xl p-4 border-2 ${column.color} min-h-[500px]`}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold">{column.title}</h3>
                    <Badge variant="low" size="sm">
                      {recommendations.filter(r => r.status === column.id).length}
                    </Badge>
                  </div>

                  <div className="space-y-4">
                    {recommendations
                      .filter(r => r.status === column.id)
                      .map((rec) => (
                        <motion.div
                          key={rec.id}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          whileHover={{ scale: 1.02 }}
                          className="glass-card rounded-lg p-4 border border-white/10 cursor-pointer hover:border-primary/30 transition-all"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <Badge variant={rec.priority === 'critical' ? 'critical' : rec.priority === 'high' ? 'high' : 'medium'} size="sm">
                              {rec.priority}
                            </Badge>
                            <div className="flex items-center gap-1 text-sm text-gray-400">
                              <Shield className="w-4 h-4" />
                              <span>{rec.impact}%</span>
                            </div>
                          </div>

                          <h4 className="font-semibold mb-2">{rec.title}</h4>
                          <p className="text-sm text-gray-400 mb-4 line-clamp-2">{rec.description}</p>

                          <div className="grid grid-cols-3 gap-2 mb-4">
                            <div className="text-center p-2 rounded bg-white/5">
                              <DollarSign className="w-4 h-4 mx-auto mb-1 text-secondary" />
                              <div className="text-xs text-gray-400">Cost</div>
                              <div className="text-sm font-semibold">{rec.cost}</div>
                            </div>
                            <div className="text-center p-2 rounded bg-white/5">
                              <Users className="w-4 h-4 mx-auto mb-1 text-primary" />
                              <div className="text-xs text-gray-400">Impact</div>
                              <div className="text-sm font-semibold">{rec.population}</div>
                            </div>
                            <div className="text-center p-2 rounded bg-white/5">
                              <Clock className="w-4 h-4 mx-auto mb-1 text-warning" />
                              <div className="text-xs text-gray-400">Timeline</div>
                              <div className="text-sm font-semibold">{rec.timeline}</div>
                            </div>
                          </div>

                          <Button variant="ghost" size="sm" className="w-full" icon={<ArrowRight className="w-4 h-4" />}>
                            View Details
                          </Button>
                        </motion.div>
                      ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
  )
}
