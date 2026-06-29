import type { Metadata } from 'next'
import './globals.css'

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
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
