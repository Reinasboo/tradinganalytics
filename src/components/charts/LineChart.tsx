"use client"
import React from 'react'
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'

const data = Array.from({ length: 30 }).map((_, i) => ({
  date: `Day ${i + 1}`,
  pnl: Math.round(Math.sin(i / 5) * 200 + i * 10)
}))

export default function LineChart() {
  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <AreaChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorPnl" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00e5ff" stopOpacity={0.6} />
              <stop offset="95%" stopColor="#00e5ff" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <XAxis dataKey="date" tick={{ fill: '#94a3b8' }} />
          <YAxis tick={{ fill: '#94a3b8' }} />
          <CartesianGrid strokeDasharray="3 3" stroke="#111827" />
          <Tooltip />
          <Area type="monotone" dataKey="pnl" stroke="#00e5ff" fill="url(#colorPnl)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
