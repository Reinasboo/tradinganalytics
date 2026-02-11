"use client"
import React, { useState } from 'react'
import useTradingStore from '../../store/tradingStore'

export default function GlobalFilterBar() {
  const filters = useTradingStore((s) => s.filters)
  const setFilters = useTradingStore((s) => s.setFilters)
  const resetFilters = useTradingStore((s) => s.resetFilters)

  const [symbol, setSymbol] = useState(filters.symbol || '')
  const [market, setMarket] = useState(filters.market || 'ALL')
  const [from, setFrom] = useState(filters.dateRange?.from || '')
  const [to, setTo] = useState(filters.dateRange?.to || '')

  function apply() {
    setFilters({ symbol: symbol || undefined, market: market as any, dateRange: { from: from || undefined, to: to || undefined } })
  }

  return (
    <div className="w-full bg-zinc-900/40 p-3 rounded-lg flex gap-3 items-center">
      <input placeholder="Symbol (e.g. SOL/USDC)" value={symbol} onChange={(e) => setSymbol(e.target.value)} className="input input-sm flex-1" />
      <select value={market} onChange={(e) => setMarket(e.target.value)} className="select select-sm">
        <option value="ALL">All Markets</option>
        <option value="SPOT">Spot</option>
        <option value="PERP">Perp</option>
        <option value="OPTIONS">Options</option>
      </select>
      <input type="date" value={from} onChange={(e) => setFrom(e.target.value)} className="input input-sm" />
      <input type="date" value={to} onChange={(e) => setTo(e.target.value)} className="input input-sm" />
      <button onClick={apply} className="btn btn-sm">Apply</button>
      <button onClick={() => { setSymbol(''); setFrom(''); setTo(''); resetFilters() }} className="btn btn-ghost btn-sm">Reset</button>
    </div>
  )
}
