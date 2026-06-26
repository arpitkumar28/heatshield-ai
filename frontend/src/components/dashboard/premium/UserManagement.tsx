'use client'

import { useState } from 'react'
import { Users, Search, Plus, Filter, MoreVertical, Shield, Mail, MapPin, Edit, Trash2, CheckCircle, XCircle, Clock } from 'lucide-react'
import { EnterpriseCard } from '@/components/ui/premium'

interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'researcher' | 'analyst' | 'viewer'
  department: string
  status: 'active' | 'inactive' | 'pending'
  lastActive: string
  location: string
  phone?: string
}

export default function UserManagement() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedRole, setSelectedRole] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])

  const users: User[] = [
    {
      id: '1',
      name: 'Dr. Rajesh Kumar',
      email: 'rajesh.kumar@isro.gov.in',
      role: 'admin',
      department: 'Climate Research',
      status: 'active',
      lastActive: '2 minutes ago',
      location: 'Ahmedabad',
      phone: '+91-79-2691-2345'
    },
    {
      id: '2',
      name: 'Priya Sharma',
      email: 'priya.sharma@nrsc.gov.in',
      role: 'researcher',
      department: 'Remote Sensing',
      status: 'active',
      lastActive: '15 minutes ago',
      location: 'Hyderabad',
      phone: '+91-40-2384-5678'
    },
    {
      id: '3',
      name: 'Amit Patel',
      email: 'amit.patel@smartcity.gov.in',
      role: 'analyst',
      department: 'Urban Planning',
      status: 'active',
      lastActive: '1 hour ago',
      location: 'Jaipur'
    },
    {
      id: '4',
      name: 'Sneha Reddy',
      email: 'sneha.reddy@ndma.gov.in',
      role: 'viewer',
      department: 'Disaster Management',
      status: 'pending',
      lastActive: 'Never',
      location: 'New Delhi'
    },
    {
      id: '5',
      name: 'Vikram Singh',
      email: 'vikram.singh@municipal.gov.in',
      role: 'analyst',
      department: 'Public Health',
      status: 'inactive',
      lastActive: '3 days ago',
      location: 'Mumbai',
      phone: '+91-22-2261-1234'
    }
  ]

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRole = selectedRole === 'all' || user.role === selectedRole
    const matchesStatus = selectedStatus === 'all' || user.status === selectedStatus
    return matchesSearch && matchesRole && matchesStatus
  })

  const roleConfig = {
    admin: { color: 'bg-red-500/20 text-red-400', label: 'Administrator' },
    researcher: { color: 'bg-blue-500/20 text-blue-400', label: 'Researcher' },
    analyst: { color: 'bg-green-500/20 text-green-400', label: 'Analyst' },
    viewer: { color: 'bg-gray-500/20 text-gray-400', label: 'Viewer' }
  }

  const statusConfig = {
    active: { color: 'bg-green-500/20 text-green-400', icon: CheckCircle },
    inactive: { color: 'bg-gray-500/20 text-gray-400', icon: XCircle },
    pending: { color: 'bg-yellow-500/20 text-yellow-400', icon: Clock }
  }

  return (
    <EnterpriseCard>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold text-white">User Management</h3>
            <p className="text-sm text-text-muted mt-1">Manage user access and permissions</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 rounded-lg text-white transition-colors">
            <Plus className="w-4 h-4" />
            <span>Add User</span>
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2 flex-1 min-w-[200px]">
            <Search className="w-4 h-4 text-text-muted" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-primary"
            />
          </div>

          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-text-muted" />
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-primary"
            >
              <option value="all">All Roles</option>
              <option value="admin">Administrator</option>
              <option value="researcher">Researcher</option>
              <option value="analyst">Analyst</option>
              <option value="viewer">Viewer</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-text-muted" />
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-primary"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="pending">Pending</option>
            </select>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard title="Total Users" value={users.length.toString()} icon={<Users className="w-5 h-5" />} />
          <StatCard title="Active Users" value={users.filter(u => u.status === 'active').length.toString()} icon={<CheckCircle className="w-5 h-5 text-green-500" />} />
          <StatCard title="Pending Approvals" value={users.filter(u => u.status === 'pending').length.toString()} icon={<Clock className="w-5 h-5 text-yellow-500" />} />
          <StatCard title="Administrators" value={users.filter(u => u.role === 'admin').length.toString()} icon={<Shield className="w-5 h-5 text-red-500" />} />
        </div>

        {/* User Table */}
        <div className="bg-gradient-to-br from-white/5 to-white/[0.02] rounded-xl border border-white/10 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">
                  <input
                    type="checkbox"
                    checked={selectedUsers.length === filteredUsers.length}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedUsers(filteredUsers.map(u => u.id))
                      } else {
                        setSelectedUsers([])
                      }
                    }}
                    className="w-4 h-4 rounded bg-white/10 border-white/20 text-primary focus:ring-primary"
                  />
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">User</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">Role</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">Department</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">Status</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">Location</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">Last Active</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="py-3 px-4">
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(user.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedUsers([...selectedUsers, user.id])
                        } else {
                          setSelectedUsers(selectedUsers.filter(id => id !== user.id))
                        }
                      }}
                      className="w-4 h-4 rounded bg-white/10 border-white/20 text-primary focus:ring-primary"
                    />
                  </td>
                  <td className="py-3 px-4">
                    <div>
                      <p className="text-white font-medium">{user.name}</p>
                      <p className="text-sm text-text-muted flex items-center gap-1">
                        <Mail className="w-3 h-3" />
                        {user.email}
                      </p>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded text-xs ${roleConfig[user.role].color}`}>
                      {roleConfig[user.role].label}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-text-muted">{user.department}</td>
                  <td className="py-3 px-4">
                    <span className={`flex items-center gap-1 px-2 py-1 rounded text-xs ${statusConfig[user.status].color}`}>
                      {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-text-muted flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {user.location}
                  </td>
                  <td className="py-3 px-4 text-sm text-text-muted">{user.lastActive}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <button className="p-1.5 rounded hover:bg-white/10 text-text-muted hover:text-white transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 rounded hover:bg-white/10 text-text-muted hover:text-red-400 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 rounded hover:bg-white/10 text-text-muted hover:text-white transition-colors">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bulk Actions */}
        {selectedUsers.length > 0 && (
          <div className="flex items-center justify-between bg-gradient-to-r from-primary/20 to-primary/10 rounded-lg p-4 border border-primary/30">
            <p className="text-sm text-white">{selectedUsers.length} users selected</p>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded text-sm text-white transition-colors">
                Activate
              </button>
              <button className="px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded text-sm text-white transition-colors">
                Deactivate
              </button>
              <button className="px-3 py-1.5 bg-red-500/20 hover:bg-red-500/30 rounded text-sm text-red-400 transition-colors">
                Delete
              </button>
            </div>
          </div>
        )}
      </div>
    </EnterpriseCard>
  )
}

interface StatCardProps {
  title: string
  value: string
  icon: React.ReactNode
}

function StatCard({ title, value, icon }: StatCardProps) {
  return (
    <div className="bg-gradient-to-br from-white/5 to-white/[0.02] rounded-xl p-4 border border-white/10">
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <p className="text-sm text-text-muted">{title}</p>
      </div>
      <p className="text-2xl font-bold text-white">{value}</p>
    </div>
  )
}
