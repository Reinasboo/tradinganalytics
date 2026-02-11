import { mean, std } from './stats'

export function calculateWinRate(trades: { pnl: number }[]) {
  if (!trades.length) return 0
  const wins = trades.filter((t) => t.pnl > 0).length
  return (wins / trades.length) * 100
}

export function calculateProfitFactor(trades: { pnl: number }[]) {
  const wins = trades.filter((t) => t.pnl > 0).reduce((s, t) => s + t.pnl, 0)
  const losses = Math.abs(trades.filter((t) => t.pnl < 0).reduce((s, t) => s + t.pnl, 0))
  if (losses === 0) return wins === 0 ? 0 : Infinity
  return wins / losses
}

export function calculateDrawdown(cumulative: number[]) {
  let peak = -Infinity
  let maxDD = 0
  for (const v of cumulative) {
    if (v > peak) peak = v
    const dd = (peak - v) / (peak || 1)
    if (dd > maxDD) maxDD = dd
  }
  return maxDD
}

export function calculateSharpeRatio(returns: number[], riskFree = 0) {
  if (!returns.length) return 0
  const excess = returns.map((r) => r - riskFree)
  const avg = mean(excess)
  const sd = std(excess)
  if (sd === 0) return avg === 0 ? 0 : Infinity
  return avg / sd
}

export function calculateAverageDuration(trades: { durationSeconds: number }[]) {
  if (!trades.length) return 0
  return trades.reduce((s, t) => s + (t.durationSeconds || 0), 0) / trades.length
}
