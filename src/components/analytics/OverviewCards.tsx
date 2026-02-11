"use client"
import React from 'react'
import { motion } from 'framer-motion'
import { format } from 'date-fns'

const Card = ({ title, value, delta, spark }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 6 }}
    animate={{ opacity: 1, y: 0 }}
    className="card p-4 rounded-xl shadow-md flex-1"
  >
    <div className="flex items-center justify-between">
      <div>
        <div className="text-sm text-zinc-400">{title}</div>
        <div className="text-2xl font-semibold mt-1">{value}</div>
      </div>
      <div className={`text-sm ${delta >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
        {delta >= 0 ? '▲' : '▼'} {Math.abs(delta)}%
      </div>
    </div>
    <div className="mt-3 h-6 sparkline text-zinc-400">{spark}</div>
  </motion.div>
)

export default function OverviewCards() {
  // placeholder values; real data comes via hooks
  const now = format(new Date(), 'MMM d')
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card title="Total PnL" value="$12,340" delta={4.2} spark={`Cumulative • ${now}`} />
      <Card title="Total Volume" value="$1.2M" delta={-1.4} spark={`24h • ${now}`} />
      <Card title="Win Rate" value="62%" delta={2.1} spark={`Since ${now}`} />
    </div>
  )
}
