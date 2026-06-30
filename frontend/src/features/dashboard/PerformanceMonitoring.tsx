'use client'

import { useState } from 'react'
import { Activity, Zap, Clock, Server, Database, Cpu, Network, HardDrive, AlertTriangle, TrendingUp, TrendingDown, CheckCircle, XCircle, RefreshCw, Download, Settings } from 'lucide-react'
import { EnterpriseCard } from '@/ui'

export default function PerformanceMonitoring() {
  const [selectedTab, setSelectedTab] = useState<'overview' | 'metrics' | 'logs' | 'alerts'>('overview')
  const [autoRefresh, setAutoRefresh] = useState(true)

  const performanceScore = 87
  const systemHealth = 'Healthy'

  const systemMetrics = {
    cpu: 45,
    memory: 62,
    disk: 38,
    network: 23,
    responseTime: 120,
    throughput: 1250
  }

  const serviceStatus: Array<{ name: string; status: 'healthy' | 'degraded' | 'critical'; uptime: string; responseTime: string }> = [
    { name: 'API Server', status: 'healthy', uptime: '99.9%', responseTime: '45ms' },
    { name: 'Database', status: 'healthy', uptime: '99.8%', responseTime: '12ms' },
    { name: 'Redis Cache', status: 'healthy', uptime: '99.9%', responseTime: '2ms' },
    { name: 'AI Services', status: 'degraded', uptime: '98.5%', responseTime: '350ms' },
    { name: 'CDN', status: 'healthy', uptime: '99.9%', responseTime: '25ms' },
  ]

  const performanceAlerts: Array<{ id: number; severity: 'high' | 'medium' | 'low' | 'info'; message: string; time: string; metric: string }> = [
    { id: 1, severity: 'high', message: 'AI Services response time degraded', time: '5 min ago', metric: 'Response Time' },
    { id: 2, severity: 'medium', message: 'Memory usage above threshold', time: '15 min ago', metric: 'Memory' },
    { id: 3, severity: 'low', message: 'Database connection pool near capacity', time: '30 min ago', metric: 'Connections' },
    { id: 4, severity: 'info', message: 'Scheduled maintenance completed', time: '1 hour ago', metric: 'System' },
  ]

  const historicalData = {
    cpu: [42, 45, 48, 52, 49, 45, 43, 41, 44, 47, 45, 42],
    memory: [58, 60, 62, 65, 63, 61, 59, 58, 60, 62, 61, 60],
    responseTime: [110, 115, 120, 135, 128, 122, 118, 115, 120, 125, 122, 118],
  }

  return (
    <EnterpriseCard>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold text-white">Performance Monitoring</h3>
            <p className="text-sm text-text-muted mt-1">Real-time system performance and health monitoring</p>
          </div>
          <div className="flex items-center gap-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={autoRefresh}
                onChange={(e) => setAutoRefresh(e.target.checked)}
                className="w-4 h-4 rounded bg-white/10 border-white/20 text-primary focus:ring-primary"
              />
              <span className="text-sm text-text-muted">Auto-refresh</span>
            </label>
            <button className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-text-muted hover:text-white transition-colors">
              <RefreshCw className="w-4 h-4" />
              <span>Refresh</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-text-muted hover:text-white transition-colors">
              <Settings className="w-4 h-4" />
              <span>Configure</span>
            </button>
          </div>
        </div>

        {/* Performance Score */}
        <div className="bg-gradient-to-br from-green-500/20 to-green-500/5 rounded-xl p-6 border border-green-500/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-muted mb-1">Performance Score</p>
              <p className="text-4xl font-bold text-white">{performanceScore}/100</p>
              <p className="text-sm text-green-400 mt-1 flex items-center gap-1">
                <CheckCircle className="w-4 h-4" />
                {systemHealth}
              </p>
            </div>
            <div className="w-24 h-24 rounded-full border-4 border-green-500 flex items-center justify-center">
              <Activity className="w-12 h-12 text-green-500" />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 bg-white/5 rounded-lg p-1">
          <TabButton
            icon={<Activity className="w-4 h-4" />}
            label="Overview"
            active={selectedTab === 'overview'}
            onClick={() => setSelectedTab('overview')}
          />
          <TabButton
            icon={<Server className="w-4 h-4" />}
            label="Metrics"
            active={selectedTab === 'metrics'}
            onClick={() => setSelectedTab('metrics')}
          />
          <TabButton
            icon={<Clock className="w-4 h-4" />}
            label="Logs"
            active={selectedTab === 'logs'}
            onClick={() => setSelectedTab('logs')}
          />
          <TabButton
            icon={<AlertTriangle className="w-4 h-4" />}
            label="Alerts"
            active={selectedTab === 'alerts'}
            onClick={() => setSelectedTab('alerts')}
          />
        </div>

        {selectedTab === 'overview' && (
          <div className="space-y-6">
            {/* System Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <MetricCard
                title="CPU Usage"
                value={`${systemMetrics.cpu}%`}
                icon={<Cpu className="w-5 h-5" />}
                trend="stable"
                data={historicalData.cpu}
              />
              <MetricCard
                title="Memory Usage"
                value={`${systemMetrics.memory}%`}
                icon={<Database className="w-5 h-5" />}
                trend="up"
                data={historicalData.memory}
              />
              <MetricCard
                title="Response Time"
                value={`${systemMetrics.responseTime}ms`}
                icon={<Zap className="w-5 h-5" />}
                trend="down"
                data={historicalData.responseTime}
              />
            </div>

            {/* Service Status */}
            <div className="bg-gradient-to-br from-white/5 to-white/[0.02] rounded-xl p-4 border border-white/10">
              <h4 className="text-sm font-semibold text-white mb-3">Service Status</h4>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                {serviceStatus.map((service, index) => (
                  <ServiceStatusCard key={index} service={service} />
                ))}
              </div>
            </div>

            {/* Performance Alerts */}
            <div className="bg-gradient-to-br from-white/5 to-white/[0.02] rounded-xl p-4 border border-white/10">
              <h4 className="text-sm font-semibold text-white mb-3">Recent Alerts</h4>
              <div className="space-y-2">
                {performanceAlerts.map((alert) => (
                  <PerformanceAlert key={alert.id} alert={alert} />
                ))}
              </div>
            </div>
          </div>
        )}

        {selectedTab === 'metrics' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <DetailedMetricCard
                title="CPU Utilization"
                current="45%"
                average="42%"
                peak="78%"
                icon={<Cpu className="w-5 h-5" />}
              />
              <DetailedMetricCard
                title="Memory Utilization"
                current="62%"
                average="58%"
                peak="85%"
                icon={<Database className="w-5 h-5" />}
              />
              <DetailedMetricCard
                title="Disk I/O"
                current="38%"
                average="35%"
                peak="65%"
                icon={<HardDrive className="w-5 h-5" />}
              />
              <DetailedMetricCard
                title="Network Throughput"
                current="1.2 Gbps"
                average="1.0 Gbps"
                peak="2.5 Gbps"
                icon={<Network className="w-5 h-5" />}
              />
            </div>

            <div className="bg-gradient-to-br from-white/5 to-white/[0.02] rounded-xl p-6 border border-white/10">
              <h4 className="text-sm font-semibold text-white mb-4">Database Performance</h4>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <DatabaseMetric
                  title="Active Connections"
                  value="245"
                  max="500"
                  percentage="49%"
                />
                <DatabaseMetric
                  title="Query Latency"
                  value="12ms"
                  max="50ms"
                  percentage="24%"
                />
                <DatabaseMetric
                  title="Cache Hit Rate"
                  value="94%"
                  max="100%"
                  percentage="94%"
                />
                <DatabaseMetric
                  title="Disk Usage"
                  value="38%"
                  max="80%"
                  percentage="38%"
                />
              </div>
            </div>
          </div>
        )}

        {selectedTab === 'logs' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-white/5 to-white/[0.02] rounded-xl p-6 border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-semibold text-white">System Logs</h4>
                <button className="flex items-center gap-2 px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded text-sm text-white transition-colors">
                  <Download className="w-4 h-4" />
                  <span>Export</span>
                </button>
              </div>
              <div className="space-y-2 font-mono text-sm">
                <LogEntry
                  timestamp="2024-06-25 14:30:00"
                  level="INFO"
                  service="api-server"
                  message="Request processed successfully"
                />
                <LogEntry
                  timestamp="2024-06-25 14:29:55"
                  level="WARN"
                  service="ai-services"
                  message="Model inference latency increased"
                />
                <LogEntry
                  timestamp="2024-06-25 14:29:50"
                  level="INFO"
                  service="database"
                  message="Connection pool health check passed"
                />
                <LogEntry
                  timestamp="2024-06-25 14:29:45"
                  level="ERROR"
                  service="cache"
                  message="Redis connection timeout"
                />
                <LogEntry
                  timestamp="2024-06-25 14:29:40"
                  level="INFO"
                  service="api-server"
                  message="Health check completed"
                />
              </div>
            </div>
          </div>
        )}

        {selectedTab === 'alerts' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <AlertSummaryCard
                title="Critical"
                count={1}
                color="red"
              />
              <AlertSummaryCard
                title="High"
                count={3}
                color="orange"
              />
              <AlertSummaryCard
                title="Medium"
                count={7}
                color="yellow"
              />
              <AlertSummaryCard
                title="Low"
                count={12}
                color="blue"
              />
            </div>

            <div className="bg-gradient-to-br from-white/5 to-white/[0.02] rounded-xl p-6 border border-white/10">
              <h4 className="text-sm font-semibold text-white mb-4">Alert Configuration</h4>
              <div className="space-y-4">
                <AlertThreshold
                  title="CPU Usage Alert"
                  description="Trigger alert when CPU exceeds 80%"
                  threshold="80%"
                  enabled={true}
                />
                <AlertThreshold
                  title="Memory Usage Alert"
                  description="Trigger alert when memory exceeds 85%"
                  threshold="85%"
                  enabled={true}
                />
                <AlertThreshold
                  title="Response Time Alert"
                  description="Trigger alert when response time exceeds 500ms"
                  threshold="500ms"
                  enabled={true}
                />
                <AlertThreshold
                  title="Disk Space Alert"
                  description="Trigger alert when disk usage exceeds 90%"
                  threshold="90%"
                  enabled={false}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </EnterpriseCard>
  )
}

interface TabButtonProps {
  icon: React.ReactNode
  label: string
  active: boolean
  onClick: () => void
}

function TabButton({ icon, label, active, onClick }: TabButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all ${
        active
          ? 'bg-primary text-white'
          : 'text-text-muted hover:text-white hover:bg-white/10'
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  )
}

interface MetricCardProps {
  title: string
  value: string
  icon: React.ReactNode
  trend: 'up' | 'down' | 'stable'
  data: number[]
}

function MetricCard({ title, value, icon, trend, data }: MetricCardProps) {
  const trendConfig = {
    up: { icon: TrendingUp, color: 'text-red-400' },
    down: { icon: TrendingDown, color: 'text-green-400' },
    stable: { icon: Activity, color: 'text-blue-400' }
  }

  const config = trendConfig[trend]
  const TrendIcon = config.icon

  return (
    <div className="bg-gradient-to-br from-white/5 to-white/[0.02] rounded-xl p-4 border border-white/10">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          {icon}
          <p className="text-sm text-text-muted">{title}</p>
        </div>
        <TrendIcon className={`w-4 h-4 ${config.color}`} />
      </div>
      <p className="text-2xl font-bold text-white mb-3">{value}</p>
      <div className="flex items-end gap-1 h-8">
        {data.map((value: number, index: number) => (
          < div
            key={index}
            className="flex-1 bg-primary/30 rounded-t transition-all hover:bg-primary/50"
            style={{ height: `${value}%` }}
          />
        ))}
      </div>
    </div>
  )
}

interface ServiceStatusCardProps {
  service: {
    name: string
    status: 'healthy' | 'degraded' | 'critical'
    responseTime: string
  }
}

function ServiceStatusCard({ service }: ServiceStatusCardProps) {
  const statusConfig = {
    healthy: { color: 'text-green-400', bg: 'bg-green-500/20', icon: CheckCircle },
    degraded: { color: 'text-yellow-400', bg: 'bg-yellow-500/20', icon: AlertTriangle },
    critical: { color: 'text-red-400', bg: 'bg-red-500/20', icon: XCircle }
  }

  const config = statusConfig[service.status]
  const StatusIcon = config.icon

  return (
    <div className="bg-white/5 rounded-lg p-3">
      <div className="flex items-center justify-between mb-2">
        <StatusIcon className={`w-4 h-4 ${config.color}`} />
        <span className={`text-xs px-2 py-0.5 rounded ${config.bg} ${config.color}`}>
          {service.status}
        </span>
      </div>
      <p className="text-sm text-white font-medium mb-1">{service.name}</p>
      <p className="text-xs text-text-muted">{service.responseTime}</p>
    </div>
  )
}

interface PerformanceAlertProps {
  alert: {
    severity: 'high' | 'medium' | 'low' | 'info'
    message: string
    time: string
    metric: string
  }
}

function PerformanceAlert({ alert }: PerformanceAlertProps) {
  const severityColors = {
    high: 'bg-red-500/20 text-red-400 border-red-500/30',
    medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    low: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    info: 'bg-gray-500/20 text-gray-400 border-gray-500/30'
  }

  return (
    <div className={`flex items-center gap-3 p-3 rounded-lg border ${severityColors[alert.severity]}`}>
      <AlertTriangle className="w-4 h-4" />
      <div className="flex-1">
        <p className="text-sm text-white">{alert.message}</p>
        <p className="text-xs text-text-muted">{alert.time} • {alert.metric}</p>
      </div>
    </div>
  )
}

interface DetailedMetricCardProps {
  title: string
  current: string
  average: string
  peak: string
  icon: React.ReactNode
}

function DetailedMetricCard({ title, current, average, peak, icon }: DetailedMetricCardProps) {
  return (
    <div className="bg-gradient-to-br from-white/5 to-white/[0.02] rounded-xl p-4 border border-white/10">
      <div className="flex items-center gap-2 mb-3">
        {icon}
        <p className="text-sm text-white font-medium">{title}</p>
      </div>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-xs text-text-muted">Current</span>
          <span className="text-sm text-white font-medium">{current}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-xs text-text-muted">Average</span>
          <span className="text-sm text-text-muted">{average}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-xs text-text-muted">Peak</span>
          <span className="text-sm text-text-muted">{peak}</span>
        </div>
      </div>
    </div>
  )
}

interface DatabaseMetricProps {
  title: string
  value: string
  max: string
  percentage: string
}

function DatabaseMetric({ title, value, max, percentage }: DatabaseMetricProps) {
  return (
    <div className="bg-white/5 rounded-lg p-3">
      <p className="text-xs text-text-muted mb-1">{title}</p>
      <p className="text-lg font-bold text-white mb-2">{value}</p>
      <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all"
          style={{ width: percentage }}
        />
      </div>
      <p className="text-xs text-text-muted mt-1">{percentage} of {max}</p>
    </div>
  )
}

interface LogEntryProps {
  timestamp: string
  level: 'INFO' | 'WARN' | 'ERROR' | 'DEBUG'
  service: string
  message: string
}

function LogEntry({ timestamp, level, service, message }: LogEntryProps) {
  const levelColors = {
    INFO: 'text-blue-400',
    WARN: 'text-yellow-400',
    ERROR: 'text-red-400',
    DEBUG: 'text-gray-400'
  }

  return (
    <div className="flex items-start gap-3 p-2 bg-white/5 rounded">
      <span className="text-text-muted text-xs">{timestamp}</span>
      <span className={`text-xs font-medium ${levelColors[level]}`}>{level}</span>
      <span className="text-text-muted text-xs">{service}</span>
      <span className="text-white text-xs flex-1">{message}</span>
    </div>
  )
}

interface AlertSummaryCardProps {
  title: string
  count: number
  color: 'red' | 'orange' | 'yellow' | 'blue'
}

function AlertSummaryCard({ title, count, color }: AlertSummaryCardProps) {
  const colorConfig = {
    red: { bg: 'bg-red-500/20', text: 'text-red-400', border: 'border-red-500/30' },
    orange: { bg: 'bg-orange-500/20', text: 'text-orange-400', border: 'border-orange-500/30' },
    yellow: { bg: 'bg-yellow-500/20', text: 'text-yellow-400', border: 'border-yellow-500/30' },
    blue: { bg: 'bg-blue-500/20', text: 'text-blue-400', border: 'border-blue-500/30' }
  }

  const config = colorConfig[color]

  return (
    <div className={`bg-gradient-to-br from-white/5 to-white/[0.02] rounded-xl p-4 border ${config.border}`}>
      <p className="text-sm text-text-muted mb-1">{title}</p>
      <p className={`text-3xl font-bold ${config.text}`}>{count}</p>
    </div>
  )
}

interface AlertThresholdProps {
  title: string
  description: string
  threshold: string
  enabled: boolean
}

function AlertThreshold({ title, description, threshold, enabled }: AlertThresholdProps) {
  return (
    <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
      <div>
        <p className="text-sm text-white font-medium">{title}</p>
        <p className="text-xs text-text-muted">{description}</p>
        <p className="text-xs text-primary mt-1">Threshold: {threshold}</p>
      </div>
      <button
        className={`w-12 h-6 rounded-full transition-colors ${
          enabled ? 'bg-primary' : 'bg-white/10'
        }`}
      >
        <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
          enabled ? 'translate-x-6' : 'translate-x-0.5'
        }`} />
      </button>
    </div>
  )
}
