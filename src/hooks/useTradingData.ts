'use client'
import { useEffect, useState, useRef } from 'react'
import deriverse from '../services/deriverse'
import { startDynamicMock } from '../mock/dynamicMock'
import useTradingStore from '../store/tradingStore'

/**
 * Hook to load trading data from deriverse service
 * Falls back to dynamic mock data if service unavailable
 * Initializes dynamic mock on client-side load
 */
export function useTradingData({ poll = false, interval = 15000 } = {}) {
  const setOrders = useTradingStore((s) => s.setOrders)
  const setPositions = useTradingStore((s) => s.setPositions)
  const setFees = useTradingStore((s) => s.setFees)

  const [loading, setLoading] = useState(false)
  const [connected, setConnected] = useState(false)
  const timer = useRef<number | null>(null)

  async function load() {
    setLoading(true)
    try {
      const accounts = await deriverse.fetchTradingAccounts()
      setConnected(!!accounts.length)

      const [orders, positions, fees] = await Promise.all([deriverse.fetchOrderHistory(), deriverse.fetchPositions(), deriverse.fetchFees()])

      setOrders(orders)
      setPositions(positions)
      setFees(fees)
    } catch (e) {
      // Fallback already handled by deriverse service (uses dynamic mock)
      console.error('Error loading trading data:', e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // Ensure dynamic mock is started when component mounts (client-side only)
    startDynamicMock({ interval: 5000 })

    load()
    if (!poll) return
    timer.current = window.setInterval(load, interval) as unknown as number
    return () => {
      if (timer.current) window.clearInterval(timer.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [poll, interval])

  return { loading, connected, reload: load }
}

export default useTradingData
