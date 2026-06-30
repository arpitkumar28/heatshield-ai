'use client'

import { motion } from 'framer-motion'
import { EnterpriseCard, PremiumButton as Button, PremiumBadge as Badge } from '@/ui'
import { Clock, MapPin, Filter, Bell, CheckCircle } from 'lucide-react'

const Card = EnterpriseCard

const alerts = [
  {
    id: 1,
    type: 'critical',
    title: 'Extreme Heat Warning: Delhi NCR',
    description: 'Temperatures expected to reach 47°C. Immediate action required for vulnerable populations.',
    location: 'Delhi NCR',
    time: '2 hours ago',
    timestamp: '2024-06-21T10:30:00',
    acknowledged: false,
    coordinates: { lat: 28.6139, lng: 77.2090 },
  },
  {
    id: 2,
    type: 'critical',
    title: 'Heat Wave Alert: Ahmedabad',
    description: 'Prolonged heat wave conditions predicted for next 5 days. Activate emergency protocols.',
    location: 'Ahmedabad',
    time: '4 hours ago',
    timestamp: '2024-06-21T08:15:00',
    acknowledged: false,
    coordinates: { lat: 23.0225, lng: 72.5714 },
  },
  {
    id: 3,
    type: 'high',
    title: 'NDVI Decline: Mumbai Metropolitan',
    description: 'Vegetation cover decreased by 15% in the last month. Consider green initiatives.',
    location: 'Mumbai',
    time: '6 hours ago',
    timestamp: '2024-06-21T06:00:00',
    acknowledged: true,
    coordinates: { lat: 19.0760, lng: 72.8777 },
  },
  {
    id: 4,
    type: 'high',
    title: 'Hotspot Detected: Industrial Zone',
    description: 'New heat hotspot detected in the industrial area. Investigation recommended.',
    location: 'Hyderabad',
    time: '12 hours ago',
    timestamp: '2024-06-21T00:00:00',
    acknowledged: true,
    coordinates: { lat: 17.3850, lng: 78.4867 },
  },
  {
    id: 5,
    type: 'medium',
    title: 'Temperature Anomaly: Bangalore',
    description: 'Unusual temperature pattern detected. AI models predict 3°C above average.',
    location: 'Bangalore',
    time: '1 day ago',
    timestamp: '2024-06-20T12:00:00',
    acknowledged: true,
    coordinates: { lat: 12.9716, lng: 77.5946 },
  },
  {
    id: 6,
    type: 'low',
    title: 'System Update Available',
    description: 'New AI model v2.3 available with improved prediction accuracy.',
    location: 'System',
    time: '2 days ago',
    timestamp: '2024-06-19T10:00:00',
    acknowledged: true,
    coordinates: null,
  },
]

export default function AlertsPage() {
  const criticalAlerts = alerts.filter(a => a.type === 'critical')
  const highAlerts = alerts.filter(a => a.type === 'high')
  const otherAlerts = alerts.filter(a => !['critical', 'high'].includes(a.type))

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
          {/* Page header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">Alert Center</h1>
              <p className="text-gray-400">Real-time monitoring and emergency notifications</p>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" icon={<Filter className="w-4 h-4" />}>
                Filter
              </Button>
              <Button icon={<Bell className="w-4 h-4" />}>
                Configure Alerts
              </Button>
            </div>
          </div>

          {/* Alert Summary */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            <Card className="text-center">
              <div className="text-3xl font-bold text-danger">{criticalAlerts.length}</div>
              <div className="text-sm text-gray-400">Critical</div>
            </Card>
            <Card className="text-center">
              <div className="text-3xl font-bold text-warning">{highAlerts.length}</div>
              <div className="text-sm text-gray-400">High Priority</div>
            </Card>
            <Card className="text-center">
              <div className="text-3xl font-bold text-secondary">{otherAlerts.length}</div>
              <div className="text-sm text-gray-400">Other Alerts</div>
            </Card>
            <Card className="text-center">
              <div className="text-3xl font-bold text-success">{alerts.filter(a => a.acknowledged).length}</div>
              <div className="text-sm text-gray-400">Acknowledged</div>
            </Card>
          </div>

          {/* Timeline */}
          <div className="glass-panel rounded-xl p-6 border border-white/10">
            <h3 className="text-lg font-semibold mb-6">Alert Timeline</h3>
            
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-danger via-warning to-secondary" />

              <div className="space-y-6">
                {alerts.map((alert, index) => (
                  <motion.div
                    key={alert.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="relative pl-12"
                  >
                    {/* Timeline dot */}
                    <div className={`absolute left-2 w-5 h-5 rounded-full border-4 ${
                      alert.type === 'critical' ? 'bg-danger border-danger' :
                      alert.type === 'high' ? 'bg-warning border-warning' :
                      alert.type === 'medium' ? 'bg-secondary border-secondary' :
                      'bg-success border-success'
                    }`} />

                    {/* Alert card */}
                    <Card className={`border-l-4 ${
                      alert.type === 'critical' ? 'border-l-danger' :
                      alert.type === 'high' ? 'border-l-warning' :
                      alert.type === 'medium' ? 'border-l-secondary' :
                      'border-l-success'
                    }`}>
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <Badge variant={alert.type === 'critical' ? 'critical' : alert.type === 'high' ? 'high' : alert.type === 'medium' ? 'medium' : 'low'}>
                            {alert.type}
                          </Badge>
                          {alert.acknowledged && (
                            <div className="flex items-center gap-1 text-success text-sm">
                              <CheckCircle className="w-4 h-4" />
                              <span>Acknowledged</span>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <Clock className="w-4 h-4" />
                          <span>{alert.time}</span>
                        </div>
                      </div>

                      <h4 className="font-semibold mb-2">{alert.title}</h4>
                      <p className="text-sm text-gray-400 mb-3">{alert.description}</p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <MapPin className="w-4 h-4" />
                          <span>{alert.location}</span>
                        </div>
                        <div className="flex gap-2">
                          {!alert.acknowledged && (
                            <Button variant="ghost" size="sm" icon={<CheckCircle className="w-4 h-4" />}>
                              Acknowledge
                            </Button>
                          )}
                          <Button variant="secondary" size="sm">
                            View Details
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
  )
}
