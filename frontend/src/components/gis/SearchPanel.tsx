'use client'

import { useState } from 'react'
import { Search, MapPin, Navigation } from 'lucide-react'

interface SearchPanelProps {
  selectedCity: string
  onCityChange: (city: string) => void
}

const CITIES = [
  'Jaipur', 'Delhi', 'Ahmedabad', 'Hyderabad', 
  'Mumbai', 'Chennai', 'Kolkata', 'Bangalore'
]

export default function SearchPanel({ selectedCity, onCityChange }: SearchPanelProps) {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredCities = CITIES.filter(city => 
    city.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="p-4 space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
        <input
          type="text"
          placeholder="Search city, district, or ward..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-primary transition-colors"
        />
      </div>

      <div className="space-y-2">
        <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wider px-1">
          Quick Access
        </h3>
        <div className="grid grid-cols-1 gap-1">
          {filteredCities.map(city => (
            <button
              key={city}
              onClick={() => onCityChange(city)}
              className={`flex items-center gap-3 p-2 rounded-lg transition-colors ${
                selectedCity === city 
                  ? 'bg-primary/20 text-primary border border-primary/30' 
                  : 'text-text-muted hover:bg-white/5 hover:text-white border border-transparent'
              }`}
            >
              <MapPin className="w-4 h-4" />
              <span className="text-sm font-medium">{city}</span>
              {selectedCity === city && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />}
            </button>
          ))}
        </div>
      </div>

      <div className="pt-4 border-t border-white/10">
        <button className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-white/5 text-white text-sm font-medium hover:bg-white/10 transition-colors">
          <Navigation className="w-4 h-4" />
          Use My Location
        </button>
      </div>
    </div>
  )
}
