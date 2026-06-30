'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

interface WebSocketMessage {
  type: string
  data?: any
  timestamp?: string
}

interface UseWebSocketOptions {
  onMessage?: (message: WebSocketMessage) => void
  onConnect?: () => void
  onDisconnect?: () => void
  onError?: (error: Event) => void
  reconnectInterval?: number
  subscriptions?: string[]
}

export function useWebSocket(
  url: string,
  options: UseWebSocketOptions = {}
) {
  const {
    onMessage,
    onConnect,
    onDisconnect,
    onError,
    reconnectInterval = 5000,
    subscriptions = []
  } = options

  const [isConnected, setIsConnected] = useState(false)
  const [lastMessage, setLastMessage] = useState<WebSocketMessage | null>(null)
  const wsRef = useRef<WebSocket | null>(null)
  const reconnectTimeoutRef = useRef<NodeJS.Timeout>()
  const clientIdRef = useRef(`client_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`)

  const connect = useCallback(() => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      return
    }

    try {
      const wsUrl = url.includes('?') 
        ? `${url}&client_id=${clientIdRef.current}`
        : `${url}?client_id=${clientIdRef.current}`

      wsRef.current = new WebSocket(wsUrl)

      wsRef.current.onopen = () => {
        setIsConnected(true)
        onConnect?.()

        // Subscribe to topics if provided
        if (subscriptions.length > 0) {
          wsRef.current?.send(JSON.stringify({
            type: 'subscribe',
            subscriptions
          }))
        }
      }

      wsRef.current.onmessage = (event) => {
        const message: WebSocketMessage = JSON.parse(event.data)
        setLastMessage(message)
        onMessage?.(message)
      }

      wsRef.current.onerror = (error) => {
        onError?.(error)
      }

      wsRef.current.onclose = () => {
        setIsConnected(false)
        onDisconnect?.()

        // Attempt to reconnect
        if (reconnectInterval > 0) {
          reconnectTimeoutRef.current = setTimeout(() => {
            connect()
          }, reconnectInterval)
        }
      }
    } catch (error) {
      onError?.(error as Event)
    }
  }, [url, onConnect, onDisconnect, onError, reconnectInterval, subscriptions])

  const disconnect = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current)
    }

    if (wsRef.current) {
      wsRef.current.close()
      wsRef.current = null
    }

    setIsConnected(false)
  }, [])

  const sendMessage = useCallback((message: any) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(message))
    }
  }, [])

  const sendPing = useCallback(() => {
    sendMessage({ type: 'ping' })
  }, [sendMessage])

  useEffect(() => {
    connect()

    return () => {
      disconnect()
    }
  }, [connect, disconnect])

  // Keep connection alive with periodic pings
  useEffect(() => {
    if (!isConnected) return

    const pingInterval = setInterval(() => {
      sendPing()
    }, 30000) // Ping every 30 seconds

    return () => {
      clearInterval(pingInterval)
    }
  }, [isConnected, sendPing])

  return {
    isConnected,
    lastMessage,
    sendMessage,
    sendPing,
    disconnect,
    connect
  }
}

// Specific hooks for different WebSocket endpoints
export function useHeatDataWebSocket(city: string = 'all', onHeatData?: (data: any) => void) {
  const wsUrl = `${process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:8000'}/api/v1/realtime/ws/heat-data?city=${city}`

  return useWebSocket(wsUrl, {
    onMessage: (message) => {
      if (message.type === 'heat_data' && onHeatData) {
        onHeatData(message.data)
      }
    }
  })
}

export function useAlertsWebSocket(onAlert?: (alert: any) => void) {
  const wsUrl = `${process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:8000'}/api/v1/realtime/ws/alerts`

  return useWebSocket(wsUrl, {
    onMessage: (message) => {
      if (message.type === 'alert' && onAlert) {
        onAlert(message.data)
      }
    }
  })
}
