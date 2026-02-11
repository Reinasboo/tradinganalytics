import React from 'react'
import { motion } from 'framer-motion'
import useTradingStore from '../../store/tradingStore'
import { calculateWinRate, calculateAverageDuration } from '../../utils/analytics'
import { LineChart, Line, ResponsiveContainer } from 'recharts'

export const TopSummaryCards: React.FC = () => {
  const orders = useTradingStore((s) => s.orders)

  const totalPnl = orders.reduce((s, o) => s + o.pnl, 0)
  const totalVolume = orders.reduce((s, o) => s + Math.abs(o.size), 0)
  const winRate = calculateWinRate(orders)
  const tradeCount = orders.length
  const avgDuration = calculateAverageDuration(orders)

  const sparkData = orders.map((o) => ({ value: o.pnl }))

  const card = (title: string, value: React.ReactNode, spark?: any) => (
    <motion.div className="bg-card p-4 rounded-lg shadow-sm" whileHover={{ y: -4 }}>
      <div className="text-xs text-muted">{title}</div>
      <div className="mt-2 font-semibold text-lg">{value}</div>
      {spark && (
        <div style={{ height: 40, marginTop: 8 }}>
          <ResponsiveContainer>
            <LineChart data={spark}>
              <Line type="monotone" dataKey="value" stroke="#34D399" dot={false} strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </motion.div>
  )

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {card('Total PnL', <span className={totalPnl >= 0 ? 'text-green-500' : 'text-red-500'}>${totalPnl.toFixed(2)}</span>, sparkData)}
      {card('Total Volume', <span>${totalVolume.toFixed(2)}</span>)}
      {card('Win Rate', <span>{winRate.toFixed(1)}%</span>)}
      {card('Trade Count', <span>{tradeCount}</span>)}
      {card('Avg Duration (min)', <span>{avgDuration.toFixed(1)}</span>)}
      {card('Fees Paid', <span>$0.00</span>)}
    </div>
  )
}

export default TopSummaryCards
