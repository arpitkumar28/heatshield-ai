import type { Metadata } from 'next'
import { Inter, Space_Grotesk, IBM_Plex_Sans } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

const ibmPlexSans = IBM_Plex_Sans({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-ibm-plex-sans',
  display: 'swap',
})

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
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} ${ibmPlexSans.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
