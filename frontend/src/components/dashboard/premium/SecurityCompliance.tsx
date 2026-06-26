'use client'

import { useState } from 'react'
import { Shield, Lock, Key, Eye, AlertTriangle, CheckCircle, FileText, Clock, Users, Database, Activity, Download, RefreshCw } from 'lucide-react'
import { EnterpriseCard } from '@/components/ui/premium'

export default function SecurityCompliance() {
  const [selectedTab, setSelectedTab] = useState<'overview' | 'audit' | 'compliance' | 'policies'>('overview')

  const securityScore = 92
  const complianceStatus = 'Compliant'

  const securityMetrics = {
    activeThreats: 3,
    blockedAttacks: 1247,
    vulnerabilities: 5,
    lastAudit: '2 days ago'
  }

  const recentAlerts = [
    { id: 1, type: 'security', severity: 'high', message: 'Unusual login pattern detected', time: '5 min ago' },
    { id: 2, type: 'compliance', severity: 'medium', message: 'GDPR data retention policy review due', time: '1 hour ago' },
    { id: 3, type: 'security', severity: 'low', message: 'SSL certificate expiring in 30 days', time: '2 hours ago' },
    { id: 4, type: 'audit', severity: 'info', message: 'Monthly security audit completed', time: '1 day ago' },
  ]

  const complianceFrameworks = [
    { name: 'ISO 27001', status: 'compliant', lastAudit: '2024-05-15', score: 95 },
    { name: 'GDPR', status: 'compliant', lastAudit: '2024-06-01', score: 98 },
    { name: 'SOC 2 Type II', status: 'in-progress', lastAudit: '2024-04-20', score: 88 },
    { name: 'NIST 800-53', status: 'compliant', lastAudit: '2024-05-28', score: 94 },
  ]

  const securityPolicies = [
    { name: 'Password Policy', status: 'active', lastUpdated: '2024-06-01', enforced: true },
    { name: 'Two-Factor Authentication', status: 'active', lastUpdated: '2024-05-15', enforced: true },
    { name: 'Data Encryption', status: 'active', lastUpdated: '2024-06-10', enforced: true },
    { name: 'Access Control', status: 'active', lastUpdated: '2024-05-20', enforced: true },
  ]

  return (
    <EnterpriseCard>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold text-white">Security & Compliance</h3>
            <p className="text-sm text-text-muted mt-1">Enterprise security monitoring and compliance management</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-text-muted hover:text-white transition-colors">
              <RefreshCw className="w-4 h-4" />
              <span>Run Audit</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-text-muted hover:text-white transition-colors">
              <Download className="w-4 h-4" />
              <span>Export Report</span>
            </button>
          </div>
        </div>

        {/* Security Score Card */}
        <div className="bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl p-6 border border-primary/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-muted mb-1">Security Score</p>
              <p className="text-4xl font-bold text-white">{securityScore}/100</p>
              <p className="text-sm text-green-400 mt-1 flex items-center gap-1">
                <CheckCircle className="w-4 h-4" />
                {complianceStatus}
              </p>
            </div>
            <div className="w-24 h-24 rounded-full border-4 border-primary flex items-center justify-center">
              <Shield className="w-12 h-12 text-primary" />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 bg-white/5 rounded-lg p-1">
          <TabButton
            icon={<Shield className="w-4 h-4" />}
            label="Overview"
            active={selectedTab === 'overview'}
            onClick={() => setSelectedTab('overview')}
          />
          <TabButton
            icon={<Activity className="w-4 h-4" />}
            label="Audit Log"
            active={selectedTab === 'audit'}
            onClick={() => setSelectedTab('audit')}
          />
          <TabButton
            icon={<FileText className="w-4 h-4" />}
            label="Compliance"
            active={selectedTab === 'compliance'}
            onClick={() => setSelectedTab('compliance')}
          />
          <TabButton
            icon={<Lock className="w-4 h-4" />}
            label="Policies"
            active={selectedTab === 'policies'}
            onClick={() => setSelectedTab('policies')}
          />
        </div>

        {selectedTab === 'overview' && (
          <div className="space-y-6">
            {/* Security Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <SecurityMetricCard
                title="Active Threats"
                value={securityMetrics.activeThreats.toString()}
                icon={<AlertTriangle className="w-5 h-5 text-red-500" />}
                trend="critical"
              />
              <SecurityMetricCard
                title="Blocked Attacks"
                value={securityMetrics.blockedAttacks.toLocaleString()}
                icon={<Shield className="w-5 h-5 text-green-500" />}
                trend="+12%"
              />
              <SecurityMetricCard
                title="Vulnerabilities"
                value={securityMetrics.vulnerabilities.toString()}
                icon={<Eye className="w-5 h-5 text-yellow-500" />}
                trend="-2"
              />
              <SecurityMetricCard
                title="Last Audit"
                value={securityMetrics.lastAudit}
                icon={<Clock className="w-5 h-5 text-blue-500" />}
                trend="scheduled"
              />
            </div>

            {/* Recent Alerts */}
            <div className="bg-gradient-to-br from-white/5 to-white/[0.02] rounded-xl p-4 border border-white/10">
              <h4 className="text-sm font-semibold text-white mb-3">Recent Security Alerts</h4>
              <div className="space-y-2">
                {recentAlerts.map((alert) => (
                  <SecurityAlert key={alert.id} alert={alert} />
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <QuickAction
                icon={<Key className="w-5 h-5" />}
                title="Rotate Keys"
                description="Update API keys and secrets"
              />
              <QuickAction
                icon={<Users className="w-5 h-5" />}
                title="Review Access"
                description="Audit user permissions"
              />
              <QuickAction
                icon={<Database className="w-5 h-5" />}
                title="Backup Data"
                description="Create secure backup"
              />
            </div>
          </div>
        )}

        {selectedTab === 'audit' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-white/5 to-white/[0.02] rounded-xl p-6 border border-white/10">
              <h4 className="text-sm font-semibold text-white mb-4">Audit Log</h4>
              <div className="space-y-3">
                <AuditLogEntry
                  action="User Login"
                  user="admin@isro.gov.in"
                  timestamp="2024-06-25 14:30:00"
                  ip="192.168.1.100"
                  status="success"
                />
                <AuditLogEntry
                  action="API Key Generated"
                  user="system"
                  timestamp="2024-06-25 14:25:00"
                  ip="system"
                  status="success"
                />
                <AuditLogEntry
                  action="Failed Login Attempt"
                  user="unknown"
                  timestamp="2024-06-25 14:20:00"
                  ip="203.0.113.45"
                  status="failed"
                />
                <AuditLogEntry
                  action="Data Export"
                  user="researcher@nrsc.gov.in"
                  timestamp="2024-06-25 14:15:00"
                  ip="192.168.1.50"
                  status="success"
                />
                <AuditLogEntry
                  action="Configuration Change"
                  user="admin@isro.gov.in"
                  timestamp="2024-06-25 14:10:00"
                  ip="192.168.1.100"
                  status="success"
                />
              </div>
            </div>
          </div>
        )}

        {selectedTab === 'compliance' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {complianceFrameworks.map((framework, index) => (
                <ComplianceCard
                  key={index}
                  name={framework.name}
                  status={framework.status}
                  lastAudit={framework.lastAudit}
                  score={framework.score}
                />
              ))}
            </div>

            <div className="bg-gradient-to-br from-white/5 to-white/[0.02] rounded-xl p-6 border border-white/10">
              <h4 className="text-sm font-semibold text-white mb-4">Compliance Checklist</h4>
              <div className="space-y-3">
                <ComplianceItem
                  title="Data Encryption at Rest"
                  status="compliant"
                  description="All sensitive data encrypted using AES-256"
                />
                <ComplianceItem
                  title="Data Encryption in Transit"
                  status="compliant"
                  description="TLS 1.3 enabled for all communications"
                />
                <ComplianceItem
                  title="Access Control Implementation"
                  status="compliant"
                  description="Role-based access control enforced"
                />
                <ComplianceItem
                  title="Audit Trail Maintenance"
                  status="compliant"
                  description="Complete audit logs retained for 7 years"
                />
                <ComplianceItem
                  title="Data Retention Policy"
                  status="review"
                  description="Review data retention schedules"
                />
              </div>
            </div>
          </div>
        )}

        {selectedTab === 'policies' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-white/5 to-white/[0.02] rounded-xl p-6 border border-white/10">
              <h4 className="text-sm font-semibold text-white mb-4">Security Policies</h4>
              <div className="space-y-3">
                {securityPolicies.map((policy, index) => (
                  <PolicyCard
                    key={index}
                    name={policy.name}
                    status={policy.status}
                    lastUpdated={policy.lastUpdated}
                    enforced={policy.enforced}
                  />
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-white/5 to-white/[0.02] rounded-xl p-6 border border-white/10">
              <h4 className="text-sm font-semibold text-white mb-4">Policy Configuration</h4>
              <div className="space-y-4">
                <PolicyConfig
                  title="Password Complexity"
                  description="Minimum 12 characters, mixed case, numbers, symbols"
                  enabled={true}
                />
                <PolicyConfig
                  title="Session Timeout"
                  description="Auto-logout after 30 minutes of inactivity"
                  enabled={true}
                />
                <PolicyConfig
                  title="IP Whitelist"
                  description="Restrict access to approved IP ranges"
                  enabled={false}
                />
                <PolicyConfig
                  title="Multi-Factor Authentication"
                  description="Require MFA for all administrative access"
                  enabled={true}
                />
              </div>
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

function SecurityMetricCard({ title, value, icon, trend }: { title: string; value: string; icon: React.ReactNode; trend: string }) {
  return (
    <div className="bg-gradient-to-br from-white/5 to-white/[0.02] rounded-xl p-4 border border-white/10">
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <p className="text-sm text-text-muted">{title}</p>
      </div>
      <p className="text-2xl font-bold text-white mb-1">{value}</p>
      <p className="text-xs text-text-muted">{trend}</p>
    </div>
  )
}

function SecurityAlert({ alert }: { alert: { severity: string; message: string; time: string; type: string } }) {
  const severityColors = {
    high: 'bg-red-500/20 text-red-400 border-red-500/30',
    medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    low: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    info: 'bg-gray-500/20 text-gray-400 border-gray-500/30'
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

function QuickAction({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <button className="bg-gradient-to-br from-white/5 to-white/[0.02] rounded-xl p-4 border border-white/10 hover:border-white/20 transition-colors text-left">
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <p className="text-sm font-medium text-white">{title}</p>
      </div>
      <p className="text-xs text-text-muted">{description}</p>
    </button>
  )
}

function AuditLogEntry({ action, user, timestamp, ip, status }: { action: string; user: string; timestamp: string; ip: string; status: string }) {
  const statusColors = {
    success: 'text-green-400',
    failed: 'text-red-400'
  }

  return (
    <div className="flex items-center gap-4 p-3 bg-white/5 rounded-lg">
      <div className="flex-1">
        <p className="text-sm text-white font-medium">{action}</p>
        <p className="text-xs text-text-muted">User: {user} | IP: {ip}</p>
      </div>
      <div className="text-right">
        <p className="text-xs text-text-muted">{timestamp}</p>
        <p className={`text-xs ${statusColors[status as keyof typeof statusColors]}`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </p>
      </div>
    </div>
  )
}

function ComplianceCard({ name, status, lastAudit, score }: { name: string; status: string; lastAudit: string; score: number }) {
  const statusConfig = {
    compliant: { color: 'text-green-400', bg: 'bg-green-500/20' },
    'in-progress': { color: 'text-yellow-400', bg: 'bg-yellow-500/20' },
    non_compliant: { color: 'text-red-400', bg: 'bg-red-500/20' }
  }

  const config = statusConfig[status as keyof typeof statusConfig]

  return (
    <div className="bg-gradient-to-br from-white/5 to-white/[0.02] rounded-xl p-4 border border-white/10">
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm font-medium text-white">{name}</p>
        <span className={`px-2 py-1 rounded text-xs ${config.bg} ${config.color}`}>
          {status.replace('_', ' ').charAt(0).toUpperCase() + status.replace('_', ' ').slice(1)}
        </span>
      </div>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-text-muted">Compliance Score</p>
          <p className="text-2xl font-bold text-white">{score}%</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-text-muted">Last Audit</p>
          <p className="text-sm text-white">{lastAudit}</p>
        </div>
      </div>
    </div>
  )
}

interface ComplianceItemProps {
  title: string
  status: 'compliant' | 'review' | 'non_compliant'
  description: string
}

function ComplianceItem({ title, status, description }: ComplianceItemProps) {
  const statusConfig = {
    compliant: { icon: CheckCircle, color: 'text-green-400' },
    review: { icon: Clock, color: 'text-yellow-400' },
    non_compliant: { icon: AlertTriangle, color: 'text-red-400' }
  }

  const config = statusConfig[status]
  const Icon = config.icon

  return (
    <div className="flex items-start gap-3 p-3 bg-white/5 rounded-lg">
      <Icon className={`w-5 h-5 ${config.color} flex-shrink-0 mt-0.5`} />
      <div className="flex-1">
        <p className="text-sm text-white font-medium">{title}</p>
        <p className="text-xs text-text-muted">{description}</p>
      </div>
      <span className={`text-xs px-2 py-1 rounded ${
        status === 'compliant' ? 'bg-green-500/20 text-green-400' : 
        status === 'review' ? 'bg-yellow-500/20 text-yellow-400' : 
        'bg-red-500/20 text-red-400'
      }`}>
        {status.replace('_', ' ').charAt(0).toUpperCase() + status.replace('_', ' ').slice(1)}
      </span>
    </div>
  )
}

interface PolicyCardProps {
  name: string
  status: string
  lastUpdated: string
  enforced: boolean
}

function PolicyCard({ name, status, lastUpdated, enforced }: PolicyCardProps) {
  return (
    <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
      <div>
        <p className="text-sm text-white font-medium">{name}</p>
        <p className="text-xs text-text-muted">Updated: {lastUpdated}</p>
      </div>
      <div className="flex items-center gap-3">
        <span className={`text-xs px-2 py-1 rounded ${
          status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'
        }`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
        {enforced && (
          <span className="text-xs px-2 py-1 rounded bg-primary/20 text-primary">
            Enforced
          </span>
        )}
      </div>
    </div>
  )
}

function PolicyConfig({ title, description, enabled }: any) {
  return (
    <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
      <div>
        <p className="text-sm text-white font-medium">{title}</p>
        <p className="text-xs text-text-muted">{description}</p>
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
