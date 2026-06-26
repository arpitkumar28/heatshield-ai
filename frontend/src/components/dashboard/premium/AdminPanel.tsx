'use client'

import { useState } from 'react'
import { Shield, Settings, Activity, Users, AlertTriangle, Server, Lock, Key, Globe, FileText, Bell, Database } from 'lucide-react'
import { EnterpriseCard } from '@/components/ui/premium'

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'security' | 'system'>('overview')

  const systemStats = {
    totalUsers: 156,
    activeUsers: 142,
    apiCalls: 245890,
    storageUsed: '2.4 TB',
    uptime: '99.9%',
    avgResponseTime: '120ms'
  }

  const recentAlerts = [
    { id: 1, type: 'security', message: 'Unusual login attempt detected', time: '5 minutes ago', severity: 'high' },
    { id: 2, type: 'system', message: 'Database backup completed', time: '1 hour ago', severity: 'info' },
    { id: 3, type: 'performance', message: 'High CPU usage on API server', time: '2 hours ago', severity: 'warning' },
    { id: 4, type: 'security', message: 'API rate limit exceeded', time: '3 hours ago', severity: 'medium' },
  ]

  const securityMetrics = [
    { label: 'Active Sessions', value: 42, trend: '+5%' },
    { label: 'Failed Logins (24h)', value: 12, trend: '-15%' },
    { label: 'Security Score', value: 'A+', trend: 'Stable' },
    { label: 'Pending Reviews', value: 3, trend: '-2' },
  ]

  return (
    <EnterpriseCard>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold text-white">Administration Panel</h3>
            <p className="text-sm text-text-muted mt-1">System administration and monitoring</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-text-muted hover:text-white transition-colors">
            <Settings className="w-4 h-4" />
            <span>Settings</span>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 bg-white/5 rounded-lg p-1">
          <TabButton
            icon={<Activity className="w-4 h-4" />}
            label="Overview"
            active={activeTab === 'overview'}
            onClick={() => setActiveTab('overview')}
          />
          <TabButton
            icon={<Users className="w-4 h-4" />}
            label="Users"
            active={activeTab === 'users'}
            onClick={() => setActiveTab('users')}
          />
          <TabButton
            icon={<Shield className="w-4 h-4" />}
            label="Security"
            active={activeTab === 'security'}
            onClick={() => setActiveTab('security')}
          />
          <TabButton
            icon={<Server className="w-4 h-4" />}
            label="System"
            active={activeTab === 'system'}
            onClick={() => setActiveTab('system')}
          />
        </div>

        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* System Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <SystemStatCard
                title="Total Users"
                value={systemStats.totalUsers.toString()}
                icon={<Users className="w-5 h-5" />}
                change="+12 this week"
              />
              <SystemStatCard
                title="API Calls (24h)"
                value={systemStats.apiCalls.toLocaleString()}
                icon={<Activity className="w-5 h-5" />}
                change="+8.5%"
              />
              <SystemStatCard
                title="System Uptime"
                value={systemStats.uptime}
                icon={<Server className="w-5 h-5" />}
                change="Stable"
              />
            </div>

            {/* Recent Alerts */}
            <div className="bg-gradient-to-br from-white/5 to-white/[0.02] rounded-xl p-4 border border-white/10">
              <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                <Bell className="w-4 h-4" />
                Recent Alerts
              </h4>
              <div className="space-y-2">
                {recentAlerts.map((alert) => (
                  <AlertItem key={alert.id} alert={alert} />
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <QuickActionButton
                icon={<Database className="w-5 h-5" />}
                label="Database Backup"
                description="Create backup"
              />
              <QuickActionButton
                icon={<Users className="w-5 h-5" />}
                label="User Audit"
                description="Review access"
              />
              <QuickActionButton
                icon={<Shield className="w-5 h-5" />}
                label="Security Scan"
                description="Run scan"
              />
              <QuickActionButton
                icon={<FileText className="w-5 h-5" />}
                label="Generate Report"
                description="System status"
              />
            </div>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {securityMetrics.map((metric, index) => (
                <SecurityMetricCard
                  key={index}
                  label={metric.label}
                  value={typeof metric.value === 'number' ? metric.value.toString() : metric.value}
                  trend={metric.trend}
                />
              ))}
            </div>

            <div className="bg-gradient-to-br from-white/5 to-white/[0.02] rounded-xl p-6 border border-white/10">
              <h4 className="text-sm font-semibold text-white mb-4">Security Configuration</h4>
              <div className="space-y-4">
                <SecurityConfigItem
                  icon={<Lock className="w-5 h-5" />}
                  title="Two-Factor Authentication"
                  description="Require 2FA for all admin users"
                  enabled={true}
                />
                <SecurityConfigItem
                  icon={<Key className="w-5 h-5" />}
                  title="API Key Rotation"
                  description="Auto-rotate API keys every 90 days"
                  enabled={true}
                />
                <SecurityConfigItem
                  icon={<Globe className="w-5 h-5" />}
                  title="IP Whitelist"
                  description="Restrict access to specific IP ranges"
                  enabled={false}
                />
                <SecurityConfigItem
                  icon={<Bell className="w-5 h-5" />}
                  title="Security Alerts"
                  description="Send alerts for suspicious activities"
                  enabled={true}
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="bg-gradient-to-br from-white/5 to-white/[0.02] rounded-xl p-6 border border-white/10">
            <p className="text-text-muted text-center py-8">User management interface - See User Management component</p>
          </div>
        )}

        {activeTab === 'system' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <SystemHealthCard
                title="API Server"
                status="healthy"
                uptime="99.9%"
                responseTime="120ms"
              />
              <SystemHealthCard
                title="Database"
                status="healthy"
                uptime="99.8%"
                responseTime="45ms"
              />
              <SystemHealthCard
                title="Cache Server"
                status="healthy"
                uptime="99.9%"
                responseTime="2ms"
              />
              <SystemHealthCard
                title="AI Services"
                status="degraded"
                uptime="98.5%"
                responseTime="350ms"
              />
            </div>
          </div>
        )}
      </div>
    </EnterpriseCard>
  )
}

function TabButton({ icon, label, active, onClick }: { icon: React.ReactNode; label: string; active: boolean; onClick: () => void }) {
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

function SystemStatCard({ title, value, icon, change }: { title: string; value: string; icon: React.ReactNode; change: string }) {
  return (
    <div className="bg-gradient-to-br from-white/5 to-white/[0.02] rounded-xl p-4 border border-white/10">
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <p className="text-sm text-text-muted">{title}</p>
      </div>
      <p className="text-2xl font-bold text-white mb-1">{value}</p>
      <p className="text-xs text-text-muted">{change}</p>
    </div>
  )
}

function AlertItem({ alert }: { alert: { severity: string; message: string; time: string; type: string } }) {
  const severityColors = {
    high: 'bg-red-500/20 text-red-400 border-red-500/30',
    medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    warning: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
    info: 'bg-blue-500/20 text-blue-400 border-blue-500/30'
  }

  return (
    <div className={`flex items-center gap-3 p-3 rounded-lg border ${severityColors[alert.severity as keyof typeof severityColors]}`}>
      <AlertTriangle className="w-4 h-4" />
      <div className="flex-1">
        <p className="text-sm text-white">{alert.message}</p>
        <p className="text-xs text-text-muted">{alert.time}</p>
      </div>
      <span className="text-xs px-2 py-1 rounded bg-white/10">{alert.type}</span>
    </div>
  )
}

function QuickActionButton({ icon, label, description }: { icon: React.ReactNode; label: string; description: string }) {
  return (
    <button className="bg-gradient-to-br from-white/5 to-white/[0.02] rounded-xl p-4 border border-white/10 hover:border-white/20 transition-colors text-left">
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <p className="text-sm font-medium text-white">{label}</p>
      </div>
      <p className="text-xs text-text-muted">{description}</p>
    </button>
  )
}

function SecurityMetricCard({ label, value, trend }: { label: string; value: string; trend: string }) {
  return (
    <div className="bg-gradient-to-br from-white/5 to-white/[0.02] rounded-xl p-4 border border-white/10">
      <p className="text-sm text-text-muted mb-1">{label}</p>
      <p className="text-2xl font-bold text-white mb-1">{value}</p>
      <p className="text-xs text-text-muted">{trend}</p>
    </div>
  )
}

function SecurityConfigItem({ icon, title, description, enabled }: { icon: React.ReactNode; title: string; description: string; enabled: boolean }) {
  return (
    <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
      <div className="flex items-center gap-3">
        {icon}
        <div>
          <p className="text-sm font-medium text-white">{title}</p>
          <p className="text-xs text-text-muted">{description}</p>
        </div>
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

function SystemHealthCard({ title, status, uptime, responseTime }: any) {
  const statusConfig = {
    healthy: { color: 'text-green-400', bg: 'bg-green-500/20' },
    degraded: { color: 'text-yellow-400', bg: 'bg-yellow-500/20' },
    critical: { color: 'text-red-400', bg: 'bg-red-500/20' }
  }

  const config = statusConfig[status as keyof typeof statusConfig]

  return (
    <div className="bg-gradient-to-br from-white/5 to-white/[0.02] rounded-xl p-4 border border-white/10">
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm font-medium text-white">{title}</p>
        <span className={`px-2 py-1 rounded text-xs ${config.bg} ${config.color}`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      </div>
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-text-muted">Uptime</span>
          <span className="text-white">{uptime}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-text-muted">Response Time</span>
          <span className="text-white">{responseTime}</span>
        </div>
      </div>
    </div>
  )
}
