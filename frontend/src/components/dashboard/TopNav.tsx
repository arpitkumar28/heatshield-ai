'use client'

import { motion } from 'framer-motion'
import { Search, Bell, Bot, User, Menu } from 'lucide-react'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'

export default function TopNav() {
  return (
    <motion.header
      initial={{ y: -20 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-64 right-0 h-16 glass-panel border-b border-white/10 z-30 flex items-center justify-between px-6"
    >
      {/* Search */}
      <div className="flex-1 max-w-xl">
        <Input
          icon={Search}
          placeholder="Search cities, alerts, reports..."
          className="bg-white/5 border-white/10"
        />
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-4">
        {/* AI Assistant */}
        <Button variant="ghost" size="sm" icon={<Bot className="w-4 h-4" />}>
          AI Assistant
        </Button>

        {/* Notifications */}
        <div className="relative">
          <Button variant="ghost" size="sm" icon={<Bell className="w-4 h-4" />} />
          <Badge variant="critical" size="sm" className="absolute -top-1 -right-1 px-1.5 py-0.5">
            3
          </Badge>
        </div>

        {/* User */}
        <div className="flex items-center gap-3 pl-4 border-l border-white/10">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-semibold text-sm">
            A
          </div>
          <div className="hidden md:block">
            <div className="text-sm font-medium">Admin User</div>
            <div className="text-xs text-gray-400">ISRO Partner</div>
          </div>
        </div>
      </div>
    </motion.header>
  )
}
