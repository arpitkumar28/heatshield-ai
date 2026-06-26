'use client'

import { useState, useEffect } from 'react'
import { Bell, AlertTriangle, CheckCircle, Clock, MapPin, Thermometer, Users, X, Settings, Filter, BellRing, Archive, Mail } from 'lucide-react'
import { EnterpriseCard } from '@/components/ui/premium'

interface Alert {
  id: string
  type: 'critical' | 'warning' | 'info' | 'success'
  category: 'heat' | 'infrastructure' | 'population' | 'system'
  title: string
  description: string
  location?: string
  value?: string
  timestamp: string
  acknowledged: boolean
  severity: number
}

interface AlertRule {
  id: string
  name: string
  type: string
  threshold: number
  enabled: boolean
  channels: string[]
}

export default function RealTimeAlerts() {
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [selectedFilter, setSelectedFilter] = useState<string>('all')
  const [showSettings, setShowSettings] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)

  useEffect(() => {
    // Mock alerts data
    const mockAlerts: Alert[] = [
      {
        id: 'alert-1',
        type: 'critical',
        category: 'heat',
        title: 'Extreme Heat Warning',
        description: 'Temperature exceeding 50°C in Industrial Zone A. Immediate action required.',
        location: 'Jaipur - Industrial Zone A',
        value: '52.3°C',
        timestamp: new Date(Date.now() - 5 * 60000).toISOString(),
        acknowledged: false,
        severity: 95
      },
      {
        id: 'alert-2',
        type: 'warning',
        category: 'population',
        title: 'High Vulnerability Alert',
        description: 'Vulnerable population density above threshold in Residential District B.',
        location: 'Delhi - Residential District B',
        value: '85,000',
        timestamp: new Date(Date.now() - 15 * 60000).toISOString(),
        acknowledged: false,
        severity: 78
      },
      {
        id: 'alert-3',
        type: 'critical',
        category: 'infrastructure',
        title: 'Cooling Center Failure',
        description: 'Cooling Center #12 offline. 5,000 citizens affected.',
        location: 'Mumbai - Sector 4',
        value: 'Offline',
        timestamp: new Date(Date.now() - 30 * 60000).toISOString(),
        acknowledged: false,
        severity: 88
      },
      {
        id: 'alert-4',
        type: 'info',
        category: 'system',
        title: 'System Update Complete',
        description: 'AI prediction model v2.4 deployed successfully.',
        timestamp: new Date(Date.now() - 45 * 60000).toISOString(),
        acknowledged: true,
        severity: 30
      },
      {
        id: 'alert-5',
        type: 'success',
        category: 'heat',
        title: 'Temperature Normalized',
        description: 'Heat index returned to safe levels in Suburban Area D.',
        location: 'Bangalore - Suburban Area D',
        value: '38°C',
        timestamp: new Date(Date.now() - 60 * 60000).toISOString(),
        acknowledged: true,
        severity: 25
      }
    ]
    setAlerts(mockAlerts)
    setUnreadCount(mockAlerts.filter(a => !a.acknowledged).length)
  }, [])

  const alertRules: AlertRule[] = [
    { id: 'rule-1', name: 'Temperature Threshold', type: 'heat', threshold: 45, enabled: true, channels: ['sms', 'email', 'dashboard'] },
    { id: 'rule-2', name: 'Vulnerability Density', type: 'population', threshold: 70, enabled: true, channels: ['sms', 'dashboard'] },
    { id: 'rule-3', name: 'Infrastructure Status', type: 'infrastructure', threshold: 1, enabled: true, channels: ['email', 'dashboard'] },
    { id: 'rule-4', name: 'NDVI Degradation', type: 'heat', threshold: 0.2, enabled: false, channels: ['dashboard'] }
  ]

  const acknowledgeAlert = (id: string) => {
    setAlerts(alerts.map(alert => 
      alert.id === id ? { ...alert, acknowledged: true } : alert
    ))
    setUnreadCount(prev => Math.max(0, prev - 1))
  }

  const dismissAlert = (id: string) => {
    setAlerts(alerts.filter(alert => alert.id !== id))
    setUnreadCount(prev => Math.max(0, prev - 1))
  }

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'critical': return 'bg-danger/20 text-danger border-danger/30'
      case 'warning': return 'bg-warning/20 text-warning border-warning/30'
      case 'info': return 'bg-primary/20 text-primary border-primary/30'
      case 'success': return 'bg-success/20 text-success border-success/30'
      default: return 'bg-white/10 text-text-muted border-white/20'
    }
  }

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'critical': return <AlertTriangle className="w-5 h-5" />
      case 'warning': return <AlertTriangle className="w-5 h-5" />
      case 'info': return <Bell className="w-5 h-5" />
      case 'success': return <CheckCircle className="w-5 h-5" />
      default: return <Bell className="w-5 h-5" />
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'heat': return <Thermometer className="w-4 h-4" />
      case 'infrastructure': return <MapPin className="w-4 h-4" />
      case 'population': return <Users className="w-4 h-4" />
      case 'system': return <BellRing className="w-4 h-4" />
      default: return <Bell className="w-4 h-4" />
    }
  }

  const filteredAlerts = selectedFilter === 'all' 
    ? alerts 
    : selectedFilter === 'unread'
    ? alerts.filter(a => !a.acknowledged)
    : alerts.filter(a => a.type === selectedFilter)

  const timeAgo = (timestamp: string) => {
    const seconds = Math.floor((Date.now() - new Date(timestamp).getTime()) / 1000)
    if (seconds < 60) return 'Just now'
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
    return `${Math.floor(seconds / 86400)}d ago`
  }

  return (
    <div className="space-y-6">
      {/* Alert Overview */}
      <EnterpriseCard
        title="Real-Time Alert System"
        subtitle="Live monitoring and emergency notifications"
        icon={<BellRing className="w-5 h-5" />}
        badge={`${unreadCount} New`}
        badgeColor={unreadCount > 0 ? 'danger' : 'success'}
      >
        <div className="space-y-6">
          {/* Alert Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-4 h-4 text-danger" />
                <span className="text-xs text-text-muted">Critical</span>
              </div>
              <div className="text-2xl font-bold text-white font-display">
                {alerts.filter(a => a.type === 'critical').length}
              </div>
            </div>
            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <Bell className="w-4 h-4 text-warning" />
                <span className="text-xs text-text-muted">Warnings</span>
              </div>
              <div className="text-2xl font-bold text-white font-display">
                {alerts.filter(a => a.type === 'warning').length}
              </div>
            </div>
            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-4 h-4 text-success" />
                <span className="text-xs text-text-muted">Acknowledged</span>
              </div>
              <div className="text-2xl font-bold text-white font-display">
                {alerts.filter(a => a.acknowledged).length}
              </div>
            </div>
            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-primary" />
                <span className="text-xs text-text-muted">Avg Response</span>
              </div>
              <div className="text-2xl font-bold text-white font-display">2.3m</div>
            </div>
          </div>

          {/* Filter Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-text-muted" />
              <span className="text-sm text-text-muted">Filter:</span>
              <div className="flex gap-2">
                {['all', 'unread', 'critical', 'warning', 'info'].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setSelectedFilter(filter)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      selectedFilter === filter
                        ? 'bg-primary text-white'
                        : 'bg-white/10 text-text-muted hover:bg-white/20'
                    }`}
                  >
                    {filter.charAt(0).toUpperCase() + filter.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm transition-colors"
              >
                <Settings className="w-4 h-4" />
                Alert Rules
              </button>
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm transition-colors">
                <Archive className="w-4 h-4" />
                Archive
              </button>
            </div>
          </div>

          {/* Alert Rules Panel */}
          {showSettings && (
            <div className="bg-white/5 rounded-xl p-6 border border-white/10">
              <h4 className="text-lg font-semibold text-white font-display mb-4">Alert Configuration Rules</h4>
              <div className="space-y-3">
                {alertRules.map((rule) => (
                  <div key={rule.id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
                    <div className="flex items-center gap-4">
                      <div className={`w-3 h-3 rounded-full ${rule.enabled ? 'bg-success' : 'bg-text-muted'}`} />
                      <div>
                        <div className="font-semibold text-white font-display">{rule.name}</div>
                        <div className="text-xs text-text-muted">
                          Threshold: {rule.threshold} • Channels: {rule.channels.join(', ')}
                        </div>
                      </div>
                    </div>
                    <button className="text-xs text-primary hover:text-white transition-colors">
                      Configure
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Alerts List */}
          <div className="space-y-3">
            {filteredAlerts.map((alert) => (
              <div
                key={alert.id}
                className={`p-4 rounded-xl border transition-all ${
                  !alert.acknowledged 
                    ? 'bg-white/5 border-white/10 hover:border-white/20' 
                    : 'bg-white/5 border-white/5 opacity-60'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg ${getAlertColor(alert.type)} border`}>
                    {getAlertIcon(alert.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-white font-display">{alert.title}</h4>
                        {!alert.acknowledged && (
                          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-text-muted flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {timeAgo(alert.timestamp)}
                        </span>
                        <button
                          onClick={() => dismissAlert(alert.id)}
                          className="p-1 hover:bg-white/10 rounded transition-colors"
                        >
                          <X className="w-4 h-4 text-text-muted" />
                        </button>
                      </div>
                    </div>
                    <p className="text-sm text-text-muted mb-3">{alert.description}</p>
                    <div className="flex items-center gap-4">
                      {alert.location && (
                        <div className="flex items-center gap-1 text-xs text-text-muted">
                          <MapPin className="w-3 h-3" />
                          {alert.location}
                        </div>
                      )}
                      {alert.value && (
                        <div className="flex items-center gap-1 text-xs text-text-muted">
                          <Thermometer className="w-3 h-3" />
                          {alert.value}
                        </div>
                      )}
                      <div className="flex items-center gap-1 text-xs text-text-muted">
                        {getCategoryIcon(alert.category)}
                        <span className="capitalize">{alert.category}</span>
                      </div>
                    </div>
                  </div>
                  {!alert.acknowledged && (
                    <button
                      onClick={() => acknowledgeAlert(alert.id)}
                      className="px-4 py-2 bg-primary/20 hover:bg-primary/30 text-primary rounded-lg text-sm font-medium transition-colors"
                    >
                      Acknowledge
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {filteredAlerts.length === 0 && (
            <div className="text-center py-12">
              <CheckCircle className="w-12 h-12 text-success mx-auto mb-4" />
              <p className="text-text-muted font-display">No alerts match your filter criteria</p>
            </div>
          )}
        </div>
      </EnterpriseCard>

      {/* Alert Channels */}
      <EnterpriseCard
        title="Notification Channels"
        subtitle="Configure alert delivery methods"
        icon={<Bell className="w-5 h-5" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 rounded-lg bg-success/20 text-success">
                <BellRing className="w-4 h-4" />
              </div>
              <div>
                <div className="font-semibold text-white font-display">Dashboard</div>
                <div className="text-xs text-text-muted">Real-time notifications</div>
              </div>
            </div>
            <div className="text-sm text-success font-medium">Active</div>
          </div>
          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 rounded-lg bg-primary/20 text-primary">
                <Bell className="w-4 h-4" />
              </div>
              <div>
                <div className="font-semibold text-white font-display">SMS Gateway</div>
                <div className="text-xs text-text-muted">Mobile alerts</div>
              </div>
            </div>
            <div className="text-sm text-success font-medium">Active</div>
          </div>
          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 rounded-lg bg-warning/20 text-warning">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <div className="font-semibold text-white font-display">Email</div>
                <div className="text-xs text-text-muted">Detailed reports</div>
              </div>
            </div>
            <div className="text-sm text-success font-medium">Active</div>
          </div>
        </div>
      </EnterpriseCard>
    </div>
  )
}
