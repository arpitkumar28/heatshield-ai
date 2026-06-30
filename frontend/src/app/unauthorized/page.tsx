'use client'

import { EnterpriseCard, PremiumButton as EnterpriseButton } from '@/ui'
import { ShieldAlert, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
      <EnterpriseCard className="w-full max-w-md text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-500/20 mb-4">
          <ShieldAlert className="w-8 h-8 text-red-400" />
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">Access Denied</h1>
        <p className="text-gray-400 mb-6">
          You don&apos;t have the required permissions to access this resource.
        </p>
        <Link href="/dashboard">
          <EnterpriseButton className="w-full">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Return to Dashboard
          </EnterpriseButton>
        </Link>
      </EnterpriseCard>
    </div>
  )
}
