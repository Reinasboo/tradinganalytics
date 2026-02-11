"use client"
import React, { useMemo } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'
import useTradingStore from '../../store/tradingStore'

const COLORS = ['#06b6d4', '#34d399', '#f97316', '#60a5fa', '#a78bfa']

export default function PortfolioOverview() {
  const positions = useTradingStore((s) => s.positions)

  const pieData = useMemo(() => positions.map((p) => ({ name: p.symbol, value: Math.abs(p.unrealizedPnl || p.size) })), [positions])
  const barData = useMemo(() => positions.map((p) => ({ symbol: p.symbol, pnl: p.unrealizedPnl })), [positions])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="bg-card p-4 rounded-lg">
        <h4 className="text-sm font-semibold mb-2">Asset Allocation</h4>
        <div style={{ height: 260 }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" innerRadius={40} outerRadius={80} paddingAngle={2}>
                {pieData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-card p-4 rounded-lg">
        <h4 className="text-sm font-semibold mb-2">Symbol Performance</h4>
        <div style={{ height: 260 }}>
          <ResponsiveContainer>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="symbol" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="pnl" fill="#06b6d4" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
