'use client'

import { useState } from 'react'
import { Code, Book, Search, Copy, Check, ExternalLink, ChevronRight, ChevronDown, Terminal, Database, Shield, Zap } from 'lucide-react'
import { EnterpriseCard } from '@/ui'

interface APIEndpoint {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  path: string
  description: string
  parameters?: Array<{ name: string; type: string; required: boolean; description: string }>
  response?: Record<string, unknown>
  example?: string
}

export default function APIDocumentation() {
  const [selectedCategory, setSelectedCategory] = useState<'overview' | 'endpoints' | 'authentication' | 'examples'>('overview')
  const [searchQuery, setSearchQuery] = useState('')
  const [copiedEndpoint, setCopiedEndpoint] = useState<string | null>(null)

  const apiEndpoints: APIEndpoint[] = [
    {
      method: 'GET',
      path: '/api/v1/heatmap',
      description: 'Get heat map data for a specific city',
      parameters: [
        { name: 'city', type: 'string', required: true, description: 'City name (e.g., Jaipur)' },
        { name: 'date', type: 'string', required: false, description: 'Date in YYYY-MM-DD format' },
        { name: 'layer', type: 'string', required: false, description: 'Data layer (lst, ndvi, heatIndex)' }
      ],
      response: {
        hotspots: [
          { lat: 26.9124, lng: 75.7873, temperature: 42.5, risk_level: 'High' }
        ],
        metadata: {
          city: 'Jaipur',
          timestamp: '2024-06-25T10:00:00Z',
          data_source: 'ISRO Bhuvan'
        }
      }
    },
    {
      method: 'GET',
      path: '/api/v1/analytics/summary',
      description: 'Get analytics summary for dashboard',
      parameters: [
        { name: 'time_range', type: 'string', required: false, description: 'Time range (1m, 3m, 6m, 1y)' }
      ],
      response: {
        average_temperature: 38.5,
        heat_index: 42.3,
        ndvi_score: 0.35,
        hotspot_count: 12
      }
    },
    {
      method: 'POST',
      path: '/api/v1/predict',
      description: 'Predict heat for future time periods',
      parameters: [
        { name: 'city', type: 'string', required: true, description: 'City name' },
        { name: 'days_ahead', type: 'integer', required: true, description: 'Number of days to predict' },
        { name: 'model', type: 'string', required: false, description: 'Model type (random_forest, xgboost)' }
      ],
      response: {
        predictions: [
          { date: '2024-06-26', predicted_temp: 39.2, confidence: 0.85 }
        ]
      }
    },
    {
      method: 'GET',
      path: '/api/v1/vulnerability',
      description: 'Get vulnerability assessment for area',
      parameters: [
        { name: 'lat', type: 'float', required: true, description: 'Latitude' },
        { name: 'lng', type: 'float', required: true, description: 'Longitude' },
        { name: 'radius', type: 'integer', required: false, description: 'Search radius in meters' }
      ],
      response: {
        vulnerability_score: 0.75,
        risk_factors: ['high_temperature', 'low_vegetation', 'high_urban_density'],
        recommendations: ['increase_green_cover', 'install_cool_roofs']
      }
    }
  ]

  const methodColors = {
    GET: 'bg-green-500/20 text-green-400 border-green-500/30',
    POST: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    PUT: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    DELETE: 'bg-red-500/20 text-red-400 border-red-500/30'
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedEndpoint(text)
    setTimeout(() => setCopiedEndpoint(null), 2000)
  }

  return (
    <EnterpriseCard>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold text-white">API Documentation</h3>
            <p className="text-sm text-text-muted mt-1">RESTful API reference and integration guide</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-text-muted hover:text-white transition-colors">
            <ExternalLink className="w-4 h-4" />
            <span>Open Swagger</span>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 bg-white/5 rounded-lg p-1">
          <TabButton
            icon={<Book className="w-4 h-4" />}
            label="Overview"
            active={selectedCategory === 'overview'}
            onClick={() => setSelectedCategory('overview')}
          />
          <TabButton
            icon={<Terminal className="w-4 h-4" />}
            label="Endpoints"
            active={selectedCategory === 'endpoints'}
            onClick={() => setSelectedCategory('endpoints')}
          />
          <TabButton
            icon={<Shield className="w-4 h-4" />}
            label="Authentication"
            active={selectedCategory === 'authentication'}
            onClick={() => setSelectedCategory('authentication')}
          />
          <TabButton
            icon={<Code className="w-4 h-4" />}
            label="Examples"
            active={selectedCategory === 'examples'}
            onClick={() => setSelectedCategory('examples')}
          />
        </div>

        {selectedCategory === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <InfoCard
                icon={<Zap className="w-5 h-5" />}
                title="Base URL"
                value="https://api.heatshield.gov.in/v1"
                description="Production API endpoint"
              />
              <InfoCard
                icon={<Database className="w-5 h-5" />}
                title="Rate Limit"
                value="1000 requests/hour"
                description="Per API key"
              />
              <InfoCard
                icon={<Shield className="w-5 h-5" />}
                title="Authentication"
                value="JWT Bearer Token"
                description="Required for all endpoints"
              />
            </div>

            <div className="bg-gradient-to-br from-white/5 to-white/[0.02] rounded-xl p-6 border border-white/10">
              <h4 className="text-sm font-semibold text-white mb-4">Quick Start</h4>
              <div className="space-y-4">
                <Step number={1} title="Get API Key" description="Register at developer portal to obtain API credentials" />
                <Step number={2} title="Authenticate" description="Include JWT token in Authorization header" />
                <Step number={3} title="Make Requests" description="Use RESTful endpoints to access heat data" />
              </div>
            </div>
          </div>
        )}

        {selectedCategory === 'endpoints' && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-text-muted" />
              <input
                type="text"
                placeholder="Search endpoints..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-primary"
              />
            </div>

            {apiEndpoints
              .filter(endpoint => 
                endpoint.path.toLowerCase().includes(searchQuery.toLowerCase()) ||
                endpoint.description.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((endpoint, index) => (
                <EndpointCard
                  key={index}
                  endpoint={endpoint}
                  methodColors={methodColors}
                  onCopy={copyToClipboard}
                  copied={copiedEndpoint === endpoint.path}
                />
              ))}
          </div>
        )}

        {selectedCategory === 'authentication' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-white/5 to-white/[0.02] rounded-xl p-6 border border-white/10">
              <h4 className="text-sm font-semibold text-white mb-4">Authentication Flow</h4>
              <div className="space-y-4">
                <CodeBlock
                  title="Request Token"
                  code={`POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "user@agency.gov.in",
  "password": "secure_password"
}`}
                />
                <CodeBlock
                  title="Use Token"
                  code={`GET /api/v1/heatmap
Authorization: Bearer <your_jwt_token>
Content-Type: application/json`}
                />
              </div>
            </div>

            <div className="bg-gradient-to-br from-white/5 to-white/[0.02] rounded-xl p-6 border border-white/10">
              <h4 className="text-sm font-semibold text-white mb-4">Token Refresh</h4>
              <p className="text-sm text-text-muted mb-4">JWT tokens expire after 1 hour. Use the refresh endpoint to obtain a new token.</p>
              <CodeBlock
                code={`POST /api/v1/auth/refresh
Authorization: Bearer <refresh_token>`}
              />
            </div>
          </div>
        )}

        {selectedCategory === 'examples' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-white/5 to-white/[0.02] rounded-xl p-6 border border-white/10">
              <h4 className="text-sm font-semibold text-white mb-4">Python Example</h4>
              <CodeBlock
                code={`import requests

# Get heat map data
response = requests.get(
    'https://api.heatshield.gov.in/v1/heatmap',
    params={'city': 'Jaipur', 'layer': 'lst'},
    headers={'Authorization': 'Bearer YOUR_TOKEN'}
)

data = response.json()
print(f"Hotspots found: {len(data['hotspots'])}")`}
              />
            </div>

            <div className="bg-gradient-to-br from-white/5 to-white/[0.02] rounded-xl p-6 border border-white/10">
              <h4 className="text-sm font-semibold text-white mb-4">JavaScript Example</h4>
              <CodeBlock
                code={`// Fetch heat predictions
const response = await fetch(
  'https://api.heatshield.gov.in/v1/predict',
  {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_TOKEN',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      city: 'Jaipur',
      days_ahead: 7
    })
  }
);

const data = await response.json();
console.log('Predictions:', data.predictions);`}
              />
            </div>
          </div>
        )}
      </div>
    </EnterpriseCard>
  )
}

interface TabButtonProps {
  icon: React.ReactNode
  label: string
  active: boolean
  onClick: () => void
}

function TabButton({ icon, label, active, onClick }: TabButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all ${
        active
          ? 'bg-primary text-white'
          : 'text-text-muted hover:text-white hover:bg-white/10'
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  )
}

interface InfoCardProps {
  icon: React.ReactNode
  title: string
  value: string
  description: string
}

function InfoCard({ icon, title, value, description }: InfoCardProps) {
  return (
    <div className="bg-gradient-to-br from-white/5 to-white/[0.02] rounded-xl p-4 border border-white/10">
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <p className="text-sm text-text-muted">{title}</p>
      </div>
      <p className="text-lg font-bold text-white mb-1">{value}</p>
      <p className="text-xs text-text-muted">{description}</p>
    </div>
  )
}

interface StepProps {
  number: number
  title: string
  description: string
}

function Step({ number, title, description }: StepProps) {
  return (
    <div className="flex items-start gap-4">
      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
        {number}
      </div>
      <div>
        <p className="text-white font-medium">{title}</p>
        <p className="text-sm text-text-muted">{description}</p>
      </div>
    </div>
  )
}

interface EndpointCardProps {
  endpoint: APIEndpoint
  methodColors: Record<string, string>
  onCopy: (path: string) => void
  copied: boolean
}

function EndpointCard({ endpoint, methodColors, onCopy, copied }: EndpointCardProps) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="bg-gradient-to-br from-white/5 to-white/[0.02] rounded-xl border border-white/10 overflow-hidden">
      <div
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-white/5 transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-3">
          <span className={`px-2 py-1 rounded text-xs font-medium border ${methodColors[endpoint.method]}`}>
            {endpoint.method}
          </span>
          <code className="text-sm text-white font-mono">{endpoint.path}</code>
          <p className="text-sm text-text-muted hidden md:block">{endpoint.description}</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation()
              onCopy(endpoint.path)
            }}
            className="p-1.5 rounded hover:bg-white/10 text-text-muted hover:text-white transition-colors"
          >
            {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
          </button>
          {expanded ? <ChevronDown className="w-4 h-4 text-text-muted" /> : <ChevronRight className="w-4 h-4 text-text-muted" />}
        </div>
      </div>

      {expanded && (
        <div className="p-4 border-t border-white/10 space-y-4">
          {endpoint.parameters && (
            <div>
              <h5 className="text-sm font-semibold text-white mb-2">Parameters</h5>
              <div className="space-y-2">
                {endpoint.parameters.map((param: { name: string; type: string; required: boolean; description: string }, i: number) => (
                  <div key={i} className="flex items-center gap-3 text-sm">
                    <code className="text-primary">{param.name}</code>
                    <span className="text-text-muted">{param.type}</span>
                    {param.required && <span className="text-red-400">required</span>}
                    <span className="text-text-muted">- {param.description}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {endpoint.response && (
            <div>
              <h5 className="text-sm font-semibold text-white mb-2">Response</h5>
              <CodeBlock code={JSON.stringify(endpoint.response, null, 2)} />
            </div>
          )}
        </div>
      )}
    </div>
  )
}

interface CodeBlockProps {
  title?: string
  code: string
}

function CodeBlock({ title, code }: CodeBlockProps) {
  return (
    <div className="bg-black/30 rounded-lg p-4 border border-white/10">
      {title && <p className="text-xs text-text-muted mb-2">{title}</p>}
      <pre className="text-sm text-green-400 overflow-x-auto">
        <code>{code}</code>
      </pre>
    </div>
  )
}
