'use client'

import { useState, useEffect, useMemo } from 'react'
import { Play, Pause, SkipBack, SkipForward, Clock, Calendar } from 'lucide-react'

interface TimelinePanelProps {
  selectedTime: string
  onTimeChange: (time: string) => void
}

const timeSteps = [
  { label: '72h Ago', value: '-72h' },
  { label: '48h Ago', value: '-48h' },
  { label: '24h Ago', value: '-24h' },
  { label: '12h Ago', value: '-12h' },
  { label: '6h Ago', value: '-6h' },
  { label: '3h Ago', value: '-3h' },
  { label: '1h Ago', value: '-1h' },
  { label: 'Current', value: 'current' },
]

export default function TimelinePanel({ selectedTime, onTimeChange }: TimelinePanelProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  
  const currentIndex = useMemo(() => 
    timeSteps.findIndex(step => step.value === selectedTime),
    [selectedTime]
  )

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null
    if (isPlaying) {
      interval = setInterval(() => {
        const nextIndex = (currentIndex + 1) % timeSteps.length
        onTimeChange(timeSteps[nextIndex].value)
        if (nextIndex === timeSteps.length - 1) {
          setIsPlaying(false)
        }
      }, 2000)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isPlaying, currentIndex, onTimeChange])

  return (
    <div className="h-full flex flex-col p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-primary" />
          <h3 className="text-sm font-semibold text-white">Temporal Analysis</h3>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
            <Calendar className="w-3 h-3 text-text-muted" />
            <span className="text-xs text-text-muted">Oct 24, 2023 - Present</span>
          </div>
          <div className="flex items-center gap-1">
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2 rounded-lg bg-primary hover:bg-primary/80 text-white transition-colors"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
            <button 
              onClick={() => onTimeChange(timeSteps[Math.max(0, currentIndex - 1)].value)}
              className="p-2 rounded-lg hover:bg-white/5 text-text-muted hover:text-white transition-colors"
            >
              <SkipBack className="w-4 h-4" />
            </button>
            <button 
              onClick={() => onTimeChange(timeSteps[Math.min(timeSteps.length - 1, currentIndex + 1)].value)}
              className="p-2 rounded-lg hover:bg-white/5 text-text-muted hover:text-white transition-colors"
            >
              <SkipForward className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="relative pt-6 pb-2">
        {/* Timeline Track */}
        <div className="absolute top-8 left-0 w-full h-1 bg-white/10 rounded-full" />
        
        {/* Progress Bar */}
        <div 
          className="absolute top-8 left-0 h-1 bg-primary rounded-full transition-all duration-500"
          style={{ width: `${(currentIndex / (timeSteps.length - 1)) * 100}%` }}
        />

        {/* Time Steps */}
        <div className="flex justify-between relative">
          {timeSteps.map((step, index) => (
            <button
              key={step.value}
              onClick={() => onTimeChange(step.value)}
              className="flex flex-col items-center group"
            >
              <div 
                className={`w-3 h-3 rounded-full border-2 transition-all mb-2 z-10 ${
                  index <= currentIndex 
                    ? 'bg-primary border-primary scale-110' 
                    : 'bg-surface border-white/20 group-hover:border-white/40'
                }`}
              />
              <span className={`text-[10px] font-medium transition-colors ${
                index === currentIndex ? 'text-white' : 'text-text-muted'
              }`}>
                {step.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between text-[10px] text-text-muted">
        <span>Historical Data</span>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-primary/20" />
            <span>Interpolated</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-primary" />
            <span>Observed</span>
          </div>
        </div>
        <span>Real-time Feed</span>
      </div>
    </div>
  )
}
