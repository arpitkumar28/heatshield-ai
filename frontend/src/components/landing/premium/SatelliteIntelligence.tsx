'use client'

import { motion } from 'framer-motion'
import { Satellite, Globe, Layers, Radar, Activity, Zap } from 'lucide-react'
import { PremiumCard } from '@/components/ui/premium'

const satelliteCapabilities = [
  {
    icon: Satellite,
    title: 'Multi-Spectral Imaging',
    description: 'High-resolution thermal and multispectral data from ISRO INSAT and Resourcesat satellites.',
    specs: ['Spatial: 10m resolution', 'Temporal: Daily updates', 'Spectral: 8 bands', 'Coverage: Pan-India'],
    color: 'primary',
  },
  {
    icon: Globe,
    title: 'Thermal Mapping',
    description: 'Land Surface Temperature (LST) mapping with sub-kilometer accuracy for urban heat detection.',
    specs: ['Accuracy: ±1°C', 'Resolution: 30m', 'Frequency: 6-hourly', 'Archive: 10+ years'],
    color: 'heat-orange',
  },
  {
    icon: Layers,
    title: 'NDVI Analysis',
    description: 'Vegetation health monitoring through Normalized Difference Vegetation Index processing.',
    specs: ['Green cover mapping', 'Change detection', 'Stress identification', 'Trend analysis'],
    color: 'heat-green',
  },
  {
    icon: Radar,
    title: 'Change Detection',
    description: 'Automated detection of urban expansion, land use changes, and environmental shifts.',
    specs: ['Urban growth tracking', 'Infrastructure monitoring', 'Environmental impact', 'Temporal analysis'],
    color: 'secondary',
  },
  {
    icon: Activity,
    title: 'Real-time Processing',
    description: 'Near real-time satellite data processing with automated quality control and calibration.',
    specs: ['Latency: <30 minutes', 'Automated QC', 'Cloud processing', 'Scalable infrastructure'],
    color: 'heat-yellow',
  },
  {
    icon: Zap,
    title: 'AI Enhancement',
    description: 'Machine learning-enhanced satellite imagery with super-resolution and feature extraction.',
    specs: ['Super-resolution 2x', 'Feature extraction', 'Anomaly detection', 'Predictive modeling'],
    color: 'heat-red',
  },
]

export default function SatelliteIntelligence() {
  return (
    <section className="relative py-32 bg-background overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-surface to-background" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,200,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,200,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px]" />

      <div className="relative z-10 container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-primary/30 mb-6"
          >
            <Satellite className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">ISRO Partnership</span>
          </motion.div>
          
          <h2 className="font-display text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-white">Satellite</span>
            <span className="text-gradient"> Intelligence</span>
          </h2>
          
          <p className="text-xl text-text-muted max-w-3xl mx-auto">
            Leveraging ISRO&apos;s satellite constellation for comprehensive urban heat monitoring and environmental intelligence.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {satelliteCapabilities.map((capability, index) => (
            <motion.div
              key={capability.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <PremiumCard variant="glass" padding="lg" className="h-full">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
                  className={`w-16 h-16 rounded-2xl bg-${capability.color}/10 border border-${capability.color}/30 flex items-center justify-center mb-6`}
                >
                  <capability.icon className={`w-8 h-8 text-${capability.color}`} />
                </motion.div>

                <h3 className="font-display text-xl font-bold text-white mb-3">
                  {capability.title}
                </h3>
                
                <p className="text-text-muted text-sm leading-relaxed mb-6">
                  {capability.description}
                </p>

                <div className="space-y-2 pt-4 border-t border-white/10">
                  {capability.specs.map((spec) => (
                    <div key={spec} className="flex items-center gap-2 text-xs text-text-muted">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>
              </PremiumCard>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20"
        >
          <PremiumCard variant="gradient" padding="xl">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="font-display text-2xl font-bold text-white mb-4">
                  ISRO-NRSC Integration
                </h3>
                <p className="text-text-muted mb-6">
                  Direct integration with ISRO&apos;s National Remote Sensing Centre (NRSC) provides access to India&apos;s most comprehensive satellite data archive. Our platform processes over 10TB of satellite imagery daily.
                </p>
                <div className="space-y-3">
                  {['INSAT-3D Thermal Imager', 'Resourcesat-2/3 LISS-III', 'Cartosat-2 Series', 'OceanSat', 'ScatSat-1'].map((satellite) => (
                    <div key={satellite} className="flex items-center gap-3 text-sm text-text-muted">
                      <Satellite className="w-4 h-4 text-primary" />
                      <span>{satellite}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="glass-card rounded-lg p-4 border border-white/10 text-center">
                  <div className="font-display text-3xl font-bold text-primary">10TB+</div>
                  <div className="text-xs text-text-muted mt-1">Daily Data</div>
                </div>
                <div className="glass-card rounded-lg p-4 border border-white/10 text-center">
                  <div className="font-display text-3xl font-bold text-secondary">30m</div>
                  <div className="text-xs text-text-muted mt-1">Resolution</div>
                </div>
                <div className="glass-card rounded-lg p-4 border border-white/10 text-center">
                  <div className="font-display text-3xl font-bold text-heat-orange">6hr</div>
                  <div className="text-xs text-text-muted mt-1">Update Frequency</div>
                </div>
                <div className="glass-card rounded-lg p-4 border border-white/10 text-center">
                  <div className="font-display text-3xl font-bold text-heat-green">10+</div>
                  <div className="text-xs text-text-muted mt-1">Years Archive</div>
                </div>
              </div>
            </div>
          </PremiumCard>
        </motion.div>
      </div>
    </section>
  )
}
