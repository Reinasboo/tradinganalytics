"use client"
import React from 'react'
import useTradingStore from '../../store/tradingStore'
import { LineChart, Line, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts'

export default function FeesOverview() {
  const fees = useTradingStore((s) => s.fees)

  const data = fees.map((f, i) => ({ date: `T-${i}`, fee: f.fee }))

  return (
    <div className="grid grid-cols-1 gap-4">
      <div className="bg-card p-4 rounded-lg">
        <h4 className="text-sm font-semibold mb-2">Cumulative Fees</h4>
        <div style={{ height: 220 }}>
          <ResponsiveContainer>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="fee" stroke="#06b6d4" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
