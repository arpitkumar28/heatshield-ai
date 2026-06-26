'use client'

import { useState } from 'react'
import { Smartphone, Download, QrCode, Link2, Users, Activity, AlertTriangle, MapPin, Thermometer, Bell, CheckCircle, XCircle, Clock, BarChart3 } from 'lucide-react'
import { EnterpriseCard } from '@/components/ui/premium'

export default function MobileIntegration() {
  const [selectedTab, setSelectedTab] = useState<'overview' | 'analytics' | 'alerts' | 'devices'>('overview')

  const mobileStats = {
    totalDevices: 1245,
    activeUsers: 892,
    dailyAlerts: 3420,
    avgSessionTime: '8.5 min'
  }

  const recentActivity = [
    { id: 1, user: 'Rajesh K.', action: 'Viewed heat map', location: 'Jaipur', time: '2 min ago' },
    { id: 2, user: 'Priya S.', action: 'Received alert', location: 'Hyderabad', time: '5 min ago' },
    { id: 3, user: 'Amit P.', action: 'Reported hotspot', location: 'Delhi', time: '12 min ago' },
    { id: 4, user: 'Sneha R.', action: 'Downloaded report', location: 'Mumbai', time: '25 min ago' },
  ]

  const deviceBreakdown = [
    { platform: 'Android', count: 856, percentage: 68.7, status: 'active' },
    { platform: 'iOS', count: 389, percentage: 31.3, status: 'active' },
  ]

  const alertStats = [
    { type: 'Heat Warnings', count: 1234, trend: '+12%' },
    { type: 'Cooling Centers', count: 567, trend: '+8%' },
    { type: 'Route Updates', count: 890, trend: '+15%' },
    { type: 'Health Tips', count: 2345, trend: '+5%' },
  ]

  return (
    <EnterpriseCard>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold text-white">Mobile App Integration</h3>
            <p className="text-sm text-text-muted mt-1">Monitor mobile app usage and engagement</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 rounded-lg text-white transition-colors">
              <Download className="w-4 h-4" />
              <span>Download App</span>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 bg-white/5 rounded-lg p-1">
          <TabButton
            icon={<Smartphone className="w-4 h-4" />}
            label="Overview"
            active={selectedTab === 'overview'}
            onClick={() => setSelectedTab('overview')}
          />
          <TabButton
            icon={<BarChart3 className="w-4 h-4" />}
            label="Analytics"
            active={selectedTab === 'analytics'}
            onClick={() => setSelectedTab('analytics')}
          />
          <TabButton
            icon={<Bell className="w-4 h-4" />}
            label="Alerts"
            active={selectedTab === 'alerts'}
            onClick={() => setSelectedTab('alerts')}
          />
          <TabButton
            icon={<Users className="w-4 h-4" />}
            label="Devices"
            active={selectedTab === 'devices'}
            onClick={() => setSelectedTab('devices')}
          />
        </div>

        {selectedTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <StatCard
                title="Total Devices"
                value={mobileStats.totalDevices.toLocaleString()}
                icon={<Smartphone className="w-5 h-5" />}
                change="+15.3%"
              />
              <StatCard
                title="Active Users"
                value={mobileStats.activeUsers.toLocaleString()}
                icon={<Users className="w-5 h-5" />}
                change="+12.1%"
              />
              <StatCard
                title="Daily Alerts"
                value={mobileStats.dailyAlerts.toLocaleString()}
                icon={<Bell className="w-5 h-5" />}
                change="+8.7%"
              />
              <StatCard
                title="Avg Session"
                value={mobileStats.avgSessionTime}
                icon={<Activity className="w-5 h-5" />}
                change="+5.2%"
              />
            </div>

            {/* QR Code Section */}
            <div className="bg-gradient-to-br from-white/5 to-white/[0.02] rounded-xl p-6 border border-white/10">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-semibold text-white mb-2">Download Mobile App</h4>
                  <p className="text-sm text-text-muted mb-4">Scan QR code to download the HeatShield AI mobile app</p>
                  <div className="flex items-center gap-4">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white text-sm transition-colors">
                      <Smartphone className="w-4 h-4" />
                      <span>Android</span>
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white text-sm transition-colors">
                      <Smartphone className="w-4 h-4" />
                      <span>iOS</span>
                    </button>
                  </div>
                </div>
                <div className="w-32 h-32 bg-white rounded-lg flex items-center justify-center">
                  <QrCode className="w-24 h-24 text-black" />
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-gradient-to-br from-white/5 to-white/[0.02] rounded-xl p-4 border border-white/10">
              <h4 className="text-sm font-semibold text-white mb-3">Recent Activity</h4>
              <div className="space-y-2">
                {recentActivity.map((activity) => (
                  <ActivityItem key={activity.id} activity={activity} />
                ))}
              </div>
            </div>
          </div>
        )}

        {selectedTab === 'analytics' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <AnalyticsCard
                title="User Engagement"
                metric="Daily Active Users"
                value="892"
                trend="+12.1%"
                data={[65, 72, 78, 85, 89, 92, 89]}
              />
              <AnalyticsCard
                title="Alert Effectiveness"
                metric="Alert Response Rate"
                value="78%"
                trend="+5.3%"
                data={[60, 65, 70, 72, 75, 78, 78]}
              />
            </div>

            <div className="bg-gradient-to-br from-white/5 to-white/[0.02] rounded-xl p-6 border border-white/10">
              <h4 className="text-sm font-semibold text-white mb-4">Feature Usage</h4>
              <div className="space-y-4">
                <FeatureUsage
                  icon={<MapPin className="w-5 h-5" />}
                  feature="Heat Map View"
                  usage="45,230 sessions"
                  percentage="78%"
                />
                <FeatureUsage
                  icon={<Thermometer className="w-5 h-5" />}
                  feature="Temperature Alerts"
                  usage="34,560 sessions"
                  percentage="65%"
                />
                <FeatureUsage
                  icon={<AlertTriangle className="w-5 h-5" />}
                  feature="Cooling Centers"
                  usage="23,450 sessions"
                  percentage="52%"
                />
                <FeatureUsage
                  icon={<Bell className="w-5 h-5" />}
                  feature="Push Notifications"
                  usage="56,780 sessions"
                  percentage="92%"
                />
              </div>
            </div>
          </div>
        )}

        {selectedTab === 'alerts' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {alertStats.map((stat, index) => (
                <AlertStatCard
                  key={index}
                  title={stat.type}
                  value={stat.count.toLocaleString()}
                  trend={stat.trend}
                />
              ))}
            </div>

            <div className="bg-gradient-to-br from-white/5 to-white/[0.02] rounded-xl p-6 border border-white/10">
              <h4 className="text-sm font-semibold text-white mb-4">Alert Configuration</h4>
              <div className="space-y-4">
                <AlertConfig
                  title="Heat Wave Warnings"
                  description="Send alerts when temperature exceeds 45°C"
                  enabled={true}
                />
                <AlertConfig
                  title="Air Quality Alerts"
                  description="Notify when AQI exceeds 300"
                  enabled={true}
                />
                <AlertConfig
                  title="Cooling Center Updates"
                  description="Send updates about nearby cooling centers"
                  enabled={false}
                />
                <AlertConfig
                  title="Health Recommendations"
                  description="Daily health tips based on conditions"
                  enabled={true}
                />
              </div>
            </div>
          </div>
        )}

        {selectedTab === 'devices' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {deviceBreakdown.map((device, index) => (
                <DeviceCard
                  key={index}
                  platform={device.platform}
                  count={device.count}
                  percentage={device.percentage}
                  status={device.status}
                />
              ))}
            </div>

            <div className="bg-gradient-to-br from-white/5 to-white/[0.02] rounded-xl p-6 border border-white/10">
              <h4 className="text-sm font-semibold text-white mb-4">Device Management</h4>
              <div className="space-y-3">
                <DeviceManagementItem
                  icon={<CheckCircle className="w-5 h-5 text-green-400" />}
                  title="Push Notifications"
                  status="Active"
                  description="Sending to 1,245 devices"
                />
                <DeviceManagementItem
                  icon={<CheckCircle className="w-5 h-5 text-green-400" />}
                  title="Location Services"
                  status="Active"
                  description="892 users sharing location"
                />
                <DeviceManagementItem
                  icon={<Clock className="w-5 h-5 text-yellow-400" />}
                  title="Background Sync"
                  status="Pending"
                  description="Update required"
                />
                <DeviceManagementItem
                  icon={<XCircle className="w-5 h-5 text-red-400" />}
                  title="Offline Mode"
                  status="Inactive"
                  description="Feature disabled"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </EnterpriseCard>
  )
}

function TabButton({ icon, label, active, onClick }: any) {
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

function StatCard({ title, value, icon, change }: any) {
  return (
    <div className="bg-gradient-to-br from-white/5 to-white/[0.02] rounded-xl p-4 border border-white/10">
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <p className="text-sm text-text-muted">{title}</p>
      </div>
      <p className="text-2xl font-bold text-white mb-1">{value}</p>
      <p className="text-xs text-green-400">{change}</p>
    </div>
  )
}

function ActivityItem({ activity }: any) {
  return (
    <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
        {activity.user.charAt(0)}
      </div>
      <div className="flex-1">
        <p className="text-sm text-white">{activity.user} - {activity.action}</p>
        <p className="text-xs text-text-muted flex items-center gap-1">
          <MapPin className="w-3 h-3" />
          {activity.location}
        </p>
      </div>
      <span className="text-xs text-text-muted">{activity.time}</span>
    </div>
  )
}

function AnalyticsCard({ title, metric, value, trend, data }: any) {
  return (
    <div className="bg-gradient-to-br from-white/5 to-white/[0.02] rounded-xl p-4 border border-white/10">
      <h4 className="text-sm font-semibold text-white mb-3">{title}</h4>
      <div className="flex items-end justify-between mb-4">
        <div>
          <p className="text-xs text-text-muted mb-1">{metric}</p>
          <p className="text-2xl font-bold text-white">{value}</p>
        </div>
        <span className="text-xs text-green-400">{trend}</span>
      </div>
      <div className="flex items-end gap-1 h-16">
        {data.map((value: number, index: number) => (
          <div
            key={index}
            className="flex-1 bg-primary/30 rounded-t transition-all hover:bg-primary/50"
            style={{ height: `${value}%` }}
          />
        ))}
      </div>
    </div>
  )
}

function FeatureUsage({ icon, feature, usage, percentage }: any) {
  return (
    <div className="flex items-center gap-4">
      <div className="p-2 rounded-lg bg-white/10">{icon}</div>
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <p className="text-sm text-white">{feature}</p>
          <p className="text-xs text-text-muted">{usage}</p>
        </div>
        <div className="w-full-full h-2 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all"
            style={{ width: percentage }}
          />
        </div>
      </div>
      <span className="text-sm text-white font-medium">{percentage}</span>
    </div>
  )
}

function AlertStatCard({ title, value, trend }: any) {
  return (
    <div className="bg-gradient-to-br from-white/5 to-white/[0.02] rounded-xl p-4 border border-white/10">
      <p className="text-sm text-text-muted mb-1">{title}</p>
      <p className="text-2xl font-bold text-white mb-1">{value}</p>
      <p className="text-xs text-green-400">{trend}</p>
    </div>
  )
}

function AlertConfig({ title, description, enabled }: any) {
  return (
    <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
      <div>
        <p className="text-sm font-medium text-white">{title}</p>
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

function DeviceCard({ platform, count, percentage, status }: any) {
  return (
    <div className="bg-gradient-to-br from-white/5 to-white/[0.02] rounded-xl p-4 border border-white/10">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Smartphone className="w-5 h-5 text-primary" />
          <p className="text-sm font-medium text-white">{platform}</p>
        </div>
        <span className={`px-2 py-1 rounded text-xs ${
          status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'
        }`}>
          {status}
        </span>
      </div>
      <p className="text-2xl font-bold text-white mb-1">{count.toLocaleString()}</p>
      <p className="text-xs text-text-muted">{percentage} of total</p>
    </div>
  )
}

function DeviceManagementItem({ icon, title, status, description }: any) {
  return (
    <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
      {icon}
      <div className="flex-1">
        <p className="text-sm font-medium text-white">{title}</p>
        <p className="text-xs text-text-muted">{description}</p>
      </div>
      <span className="text-xs text-text-muted">{status}</span>
    </div>
  )
}
