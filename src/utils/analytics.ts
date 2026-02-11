import type { Order } from '../types'
import { mean } from './_helpers'

export function calculateWinRate(trades: Order[]): number {
  if (!trades.length) return 0
  const wins = trades.filter((t) => t.pnl > 0).length
  return (wins / trades.length) * 100
}

export function calculateProfitFactor(trades: Order[]): number {
  const grossWin = trades.filter((t) => t.pnl > 0).reduce((s, t) => s + t.pnl, 0)
  const grossLoss = Math.abs(trades.filter((t) => t.pnl < 0).reduce((s, t) => s + t.pnl, 0))
  if (grossLoss === 0) return grossWin > 0 ? Infinity : 0
  return grossWin / grossLoss
}

export function calculateLongShortRatio(trades: Order[]): number {
  if (!trades.length) return 0
  const longs = trades.filter((t) => t.side === 'LONG').length
  const shorts = trades.filter((t) => t.side === 'SHORT').length
  return shorts === 0 ? Infinity : longs / shorts
}

export function calculateAverageDuration(trades: Order[]): number {
  // Orders may include entry/exit times; here we support optional `entryDate` and `exitDate` ISO strings
  const durations: number[] = trades
    .map((t: any) => {
      if (!t.entryDate || !t.exitDate) return null
      const s = new Date(t.entryDate).getTime()
      const e = new Date(t.exitDate).getTime()
      if (Number.isFinite(s) && Number.isFinite(e)) return Math.max(0, e - s)
      return null
    })
    .filter((d): d is number => d !== null)

  if (!durations.length) return 0
  // return average in minutes
  return mean(durations) / 1000 / 60
}

export function calculateDrawdown(cumulativePnls: number[]): { maxDrawdown: number; drawdowns: number[] } {
  let peak = -Infinity
  const drawdowns: number[] = []
  let maxDD = 0
  cumulativePnls.forEach((v) => {
    if (v > peak) peak = v
    const dd = peak - v
    drawdowns.push(dd)
    if (dd > maxDD) maxDD = dd
  })
  return { maxDrawdown: maxDD, drawdowns }
}

export function calculateSharpeRatio(dailyReturns: number[], riskFree = 0): number {
  if (!dailyReturns.length) return 0
  const avg = mean(dailyReturns) - riskFree
  const std = Math.sqrt(mean(dailyReturns.map((r) => (r - mean(dailyReturns)) ** 2)))
  if (std === 0) return avg > 0 ? Infinity : 0
  // annualize assuming 252 trading days
  return (avg / std) * Math.sqrt(252)
}

// internal helper exported for tests
export { mean }
