'use client'

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">HeatShield AI</h1>
        <p className="text-gray-400 mb-8">Government-grade Heat Monitoring System</p>
        <div className="flex gap-4 justify-center">
          <a href="/dashboard" className="px-6 py-3 bg-primary hover:bg-primary/90 rounded-lg text-white transition-colors">
            Go to Dashboard
          </a>
        </div>
      </div>
    </div>
  )
}
