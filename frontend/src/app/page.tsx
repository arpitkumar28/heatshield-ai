'use client'

import {
  PremiumHero,
  PremiumHeatCrisisStory,
  PremiumAIPipeline,
  PremiumPlatformFeatures,
  PremiumInteractiveIndiaMap,
  PremiumGovernmentUseCases,
  PremiumArchitecture,
  PremiumImpactMetrics,
  PremiumFooter,
  PremiumNavigation,
} from '@/components/landing/premium'

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-white">
      <PremiumNavigation />
      
      <main>
        <PremiumHero />
        <div id="crisis">
          <PremiumHeatCrisisStory />
        </div>
        <div id="pipeline">
          <PremiumAIPipeline />
        </div>
        <div id="platform">
          <PremiumPlatformFeatures />
        </div>
        <div id="map">
          <PremiumInteractiveIndiaMap />
        </div>
        <div id="use-cases">
          <PremiumGovernmentUseCases />
        </div>
        <div id="architecture">
          <PremiumArchitecture />
        </div>
        <div id="impact">
          <PremiumImpactMetrics />
        </div>
      </main>

      <PremiumFooter />
    </div>
  )
}
