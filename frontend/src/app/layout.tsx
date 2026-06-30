import type { Metadata } from 'next'
import './globals.css'
import { AuthProvider } from '@/context/AuthContext'

export const metadata: Metadata = {
  title: 'HeatShield AI - National Urban Heat Intelligence Platform',
  description: 'Enterprise-grade AI-powered urban heat monitoring and intelligence for ISRO, Smart Cities Mission, and national agencies',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}
