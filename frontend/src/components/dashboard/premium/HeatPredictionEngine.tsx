'use client'

import { useState } from 'react'
import { Brain, TrendingUp, MapPin, Settings, Play, Download, BarChart3, AlertCircle, CheckCircle, Clock, Thermometer } from 'lucide-react'
import { EnterpriseCard } from '@/components/ui/premium'

interface PredictionModel {
  id: string
  name: string
  type: 'LSTM' | 'RandomForest' | 'XGBoost' | 'Transformer'
  accuracy: number
  lastTrained: string
  status: 'active' | 'training' | 'deprecated'
}

interface PredictionResult {
  timestamp: string
  predictedTemp: number
  confidence: number
  riskLevel: 'low' | 'medium' | 'high' | 'critical'
}

export default function HeatPredictionEngine() {
  const [selectedModel, setSelectedModel] = useState<string>('lstm-v2')
  const [predictionHorizon, setPredictionHorizon] = useState<number>(24)
  const [isPredicting, setIsPredicting] = useState(false)
  const [selectedRegion, setSelectedRegion] = useState('Jaipur')

  const models: PredictionModel[] = [
    { id: 'lstm-v2', name: 'LSTM Heat Model v2', type: 'LSTM', accuracy: 94.2, lastTrained: '2024-01-15', status: 'active' },
    { id: 'rf-v1', name: 'Random Forest Ensemble', type: 'RandomForest', accuracy: 91.8, lastTrained: '2024-01-10', status: 'active' },
    { id: 'xgb-v3', name: 'XGBoost Optimized', type: 'XGBoost', accuracy: 93.5, lastTrained: '2024-01-12', status: 'active' },
    { id: 'transformer-v1', name: 'Temporal Transformer', type: 'Transformer', accuracy: 89.2, lastTrained: '2024-01-08', status: 'training' },
  ]

  const predictionResults: PredictionResult[] = [
    { timestamp: '00:00', predictedTemp: 32, confidence: 95, riskLevel: 'low' },
    { timestamp: '04:00', predictedTemp: 30, confidence: 94, riskLevel: 'low' },
    { timestamp: '08:00', predictedTemp: 35, confidence: 93, riskLevel: 'medium' },
    { timestamp: '12:00', predictedTemp: 42, confidence: 91, riskLevel: 'high' },
    { timestamp: '16:00', predictedTemp: 45, confidence: 89, riskLevel: 'critical' },
    { timestamp: '20:00', predictedTemp: 40, confidence: 92, riskLevel: 'high' },
    { timestamp: '24:00', predictedTemp: 36, confidence: 94, riskLevel: 'medium' },
  ]

  const runPrediction = () => {
    setIsPredicting(true)
    setTimeout(() => setIsPredicting(false), 2000)
  }

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'critical': return 'bg-danger/20 text-danger border-danger/30'
      case 'high': return 'bg-warning/20 text-warning border-warning/30'
      case 'medium': return 'bg-primary/20 text-primary border-primary/30'
      case 'low': return 'bg-success/20 text-success border-success/30'
      default: return 'bg-white/10 text-text-muted border-white/20'
    }
  }

  const getRiskBadge = (level: string) => {
    switch (level) {
      case 'critical': return 'CRITICAL'
      case 'high': return 'HIGH'
      case 'medium': return 'MEDIUM'
      case 'low': return 'LOW'
      default: return 'UNKNOWN'
    }
  }

  return (
    <div className="space-y-6">
      {/* Model Selection Card */}
      <EnterpriseCard
        title="AI Prediction Models"
        subtitle="Select and configure machine learning models"
        icon={<Brain className="w-5 h-5" />}
      >
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {models.map((model) => (
              <div
                key={model.id}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  selectedModel === model.id
                    ? 'bg-primary/20 border-primary/50'
                    : 'bg-white/5 border-white/10 hover:border-white/20'
                }`}
                onClick={() => setSelectedModel(model.id)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-secondary">
                    <Brain className="w-4 h-4 text-white" />
                  </div>
                  <div className={`px-2 py-0.5 rounded-full text-xs font-medium border ${
                    model.status === 'active' ? 'bg-success/20 text-success border-success/30' :
                    model.status === 'training' ? 'bg-warning/20 text-warning border-warning/30' :
                    'bg-danger/20 text-danger border-danger/30'
                  }`}>
                    {model.status.toUpperCase()}
                  </div>
                </div>
                <h4 className="font-semibold text-white font-display mb-1">{model.name}</h4>
                <div className="text-xs text-text-muted mb-2">{model.type}</div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-text-muted">Accuracy:</span>
                  <span className="text-success font-semibold">{model.accuracy}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </EnterpriseCard>

      {/* Prediction Configuration */}
      <EnterpriseCard
        title="Prediction Configuration"
        subtitle="Configure prediction parameters and regions"
        icon={<Settings className="w-5 h-5" />}
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Region Selection */}
            <div>
              <label className="block text-sm font-medium text-text-muted mb-2 font-display">Target Region</label>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary font-display"
              >
                <option value="Jaipur">Jaipur</option>
                <option value="Delhi">Delhi</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Chennai">Chennai</option>
                <option value="Kolkata">Kolkata</option>
                <option value="Bangalore">Bangalore</option>
              </select>
            </div>

            {/* Prediction Horizon */}
            <div>
              <label className="block text-sm font-medium text-text-muted mb-2 font-display">Prediction Horizon (Hours)</label>
              <select
                value={predictionHorizon}
                onChange={(e) => setPredictionHorizon(Number(e.target.value))}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary font-display"
              >
                <option value={6}>6 Hours</option>
                <option value={12}>12 Hours</option>
                <option value={24}>24 Hours</option>
                <option value={48}>48 Hours</option>
                <option value={72}>72 Hours</option>
              </select>
            </div>

            {/* Model Parameters */}
            <div>
              <label className="block text-sm font-medium text-text-muted mb-2 font-display">Confidence Threshold</label>
              <select
                defaultValue={90}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary font-display"
              >
                <option value={80}>80%</option>
                <option value={85}>85%</option>
                <option value={90}>90%</option>
                <option value={95}>95%</option>
              </select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={runPrediction}
              disabled={isPredicting}
              className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPredicting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                  Running Prediction...
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  Run Prediction
                </>
              )}
            </button>
            <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg font-medium transition-colors">
              <Download className="w-4 h-4" />
              Export Results
            </button>
          </div>
        </div>
      </EnterpriseCard>

      {/* Prediction Results */}
      <EnterpriseCard
        title="Prediction Results"
        subtitle="AI-generated heat predictions and risk assessments"
        icon={<TrendingUp className="w-5 h-5" />}
        badge="Live"
        badgeColor="success"
      >
        <div className="space-y-4">
          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <Thermometer className="w-4 h-4 text-danger" />
                <span className="text-xs text-text-muted">Peak Temp</span>
              </div>
              <div className="text-2xl font-bold text-white font-display">45°C</div>
            </div>
            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-4 h-4 text-success" />
                <span className="text-xs text-text-muted">Avg Confidence</span>
              </div>
              <div className="text-2xl font-bold text-white font-display">92%</div>
            </div>
            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="w-4 h-4 text-warning" />
                <span className="text-xs text-text-muted">Critical Hours</span>
              </div>
              <div className="text-2xl font-bold text-white font-display">3</div>
            </div>
            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-primary" />
                <span className="text-xs text-text-muted">Horizon</span>
              </div>
              <div className="text-2xl font-bold text-white font-display">{predictionHorizon}h</div>
            </div>
          </div>

          {/* Prediction Timeline */}
          <div className="space-y-3">
            {predictionResults.map((result, index) => (
              <div key={index} className="flex items-center gap-4 p-4 bg-white/5 rounded-lg border border-white/10 hover:border-white/20 transition-all">
                <div className="w-16 text-sm font-medium text-text-muted font-display">{result.timestamp}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-semibold">{result.predictedTemp}°C</span>
                    <span className={`px-2 py-0.5 rounded text-xs font-medium border ${getRiskColor(result.riskLevel)}`}>
                      {getRiskBadge(result.riskLevel)}
                    </span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all ${
                        result.riskLevel === 'critical' ? 'bg-danger' :
                        result.riskLevel === 'high' ? 'bg-warning' :
                        result.riskLevel === 'medium' ? 'bg-primary' : 'bg-success'
                      }`}
                      style={{ width: `${(result.predictedTemp / 50) * 100}%` }}
                    />
                  </div>
                </div>
                <div className="w-20 text-right">
                  <div className="text-sm font-semibold text-success">{result.confidence}%</div>
                  <div className="text-xs text-text-muted">confidence</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </EnterpriseCard>

      {/* Model Performance */}
      <EnterpriseCard
        title="Model Performance Metrics"
        subtitle="Historical accuracy and performance analysis"
        icon={<BarChart3 className="w-5 h-5" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/5 rounded-lg p-6 border border-white/10">
            <div className="text-sm text-text-muted mb-2 font-display">MAE (Mean Absolute Error)</div>
            <div className="text-3xl font-bold text-white font-display mb-1">1.2°C</div>
            <div className="text-xs text-success">↓ 0.3°C from last week</div>
          </div>
          <div className="bg-white/5 rounded-lg p-6 border border-white/10">
            <div className="text-sm text-text-muted mb-2 font-display">RMSE (Root Mean Square Error)</div>
            <div className="text-3xl font-bold text-white font-display mb-1">1.8°C</div>
            <div className="text-xs text-success">↓ 0.5°C from last week</div>
          </div>
          <div className="bg-white/5 rounded-lg p-6 border border-white/10">
            <div className="text-sm text-text-muted mb-2 font-display">R² Score</div>
            <div className="text-3xl font-bold text-white font-display mb-1">0.94</div>
            <div className="text-xs text-success">↑ 0.02 from last week</div>
          </div>
        </div>
      </EnterpriseCard>
    </div>
  )
}
