import React, { useMemo, useState } from 'react'
import { AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Brush, ReferenceArea } from 'recharts'
import useTradingStore from '../../store/tradingStore'
import { calculateDrawdown } from '../../utils/analytics'

function formatDate(d: string) {
  return new Date(d).toLocaleDateString()
}

export const HistoricalPnLChart: React.FC = () => {
  const orders = useTradingStore((s) => s.orders)
  const [view, setView] = useState<'cumulative' | 'daily'>('cumulative')

  const series = useMemo(() => {
    // group by day
    const map = new Map<string, number>()
    orders.forEach((o) => {
      const day = new Date(o.date).toISOString().slice(0, 10)
      map.set(day, (map.get(day) || 0) + o.pnl)
    })
    const keys = Array.from(map.keys()).sort()
    let cum = 0
    return keys.map((k) => {
      const daily = map.get(k) || 0
      cum += daily
      return { date: k, daily, cumulative: cum }
    })
  }, [orders])

  const cumArray = series.map((s) => s.cumulative)
  const { maxDrawdown, drawdowns } = calculateDrawdown(cumArray)

  return (
    <div className="bg-card p-4 rounded-lg">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold">Historical PnL</h3>
        <div className="space-x-2">
          <button onClick={() => setView('cumulative')} className={`btn btn-sm ${view === 'cumulative' ? 'active' : ''}`}>
            Cumulative
          </button>
          <button onClick={() => setView('daily')} className={`btn btn-sm ${view === 'daily' ? 'active' : ''}`}>
            Daily
          </button>
        </div>
      </div>
      <div style={{ height: 260 }}>
        <ResponsiveContainer>
          <AreaChart data={series}>
            <defs>
              <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#34D399" stopOpacity={0.6} />
                <stop offset="95%" stopColor="#34D399" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" tickFormatter={formatDate} />
            <YAxis />
            <Tooltip labelFormatter={(l) => formatDate(l as string)} />
            <Area type="monotone" dataKey={view === 'cumulative' ? 'cumulative' : 'daily'} stroke="#34D399" fill="url(#grad)" />
            <Brush dataKey="date" height={20} stroke="#8884d8" />
            {maxDrawdown > 0 && (
              <ReferenceArea x1={series[0]?.date} x2={series[series.length - 1]?.date} strokeOpacity={0.2} />
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-3 text-xs text-muted">Max Drawdown: ${maxDrawdown.toFixed(2)}</div>
    </div>
  )
}

export default HistoricalPnLChart
