"use client"
import React from 'react'
import useTradingStore from '../../store/tradingStore'

export default function TradeTable() {
  const orders = useTradingStore((s) => s.orders)
  const setSelected = useTradingStore((s) => s.setSelectedTrade)

  return (
    <div className="bg-zinc-900/40 rounded-xl p-4">
      <div className="text-sm text-zinc-400 mb-2">Trade History</div>
      <div className="overflow-auto">
        <table className="w-full text-sm">
          <thead className="text-zinc-400 text-left">
            <tr>
              <th className="p-2">Date</th>
              <th className="p-2">Symbol</th>
              <th className="p-2">PnL</th>
              <th className="p-2">Size</th>
              <th className="p-2">Side</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id} className="cursor-pointer hover:bg-zinc-800/40" onClick={() => setSelected(o)}>
                <td className="p-2">{new Date(o.date).toLocaleDateString()}</td>
                <td className="p-2">{o.symbol}</td>
                <td className={`p-2 ${o.pnl >= 0 ? 'text-green-400' : 'text-red-400'}`}>${o.pnl}</td>
                <td className="p-2">{o.size}</td>
                <td className="p-2">{o.side}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
