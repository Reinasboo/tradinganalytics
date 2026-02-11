"use client"
import React from 'react'
import useTradingStore from '../../store/tradingStore'
import { calculateWinRate, calculateProfitFactor } from '../../utils/analytics'

export default function AdvancedAnalyticsOverview() {
  const orders = useTradingStore((s) => s.orders)

  const winRate = calculateWinRate(orders)
  const profitFactor = calculateProfitFactor(orders)

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-card p-4 rounded-lg">
        <div className="text-sm text-zinc-400">Win Rate</div>
        <div className="text-2xl font-semibold mt-2 text-green-400">{winRate.toFixed(1)}%</div>
      </div>
      <div className="bg-card p-4 rounded-lg">
        <div className="text-sm text-zinc-400">Profit Factor</div>
        <div className="text-2xl font-semibold mt-2">{isFinite(profitFactor) ? profitFactor.toFixed(2) : '∞'}</div>
      </div>
      <div className="bg-card p-4 rounded-lg">
        <div className="text-sm text-zinc-400">Max Drawdown</div>
        <div className="text-2xl font-semibold mt-2">—</div>
      </div>
    </div>
  )
}
