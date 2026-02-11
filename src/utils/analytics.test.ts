import { describe, it, expect } from 'vitest'
import { calculateWinRate, calculateProfitFactor, calculateDrawdown, calculateSharpeRatio } from './analytics'

describe('analytics utilities', () => {
  it('calculates win rate', () => {
    const trades = [{ pnl: 10 }, { pnl: -5 }, { pnl: 0 }, { pnl: 15 }] as any
    const wr = calculateWinRate(trades)
    expect(wr).toBeCloseTo(50)
  })

  it('calculates profit factor', () => {
    const trades = [{ pnl: 10 }, { pnl: 20 }, { pnl: -5 }, { pnl: -5 }] as any
    const pf = calculateProfitFactor(trades)
    // gross wins 30 / gross losses 10 => 3
    expect(pf).toBeCloseTo(3)
  })

  it('calculates drawdown', () => {
    const cum = [0, 10, 5, 15, 8]
    const { maxDrawdown } = calculateDrawdown(cum)
    // peak 15 -> trough 8 => 7
    expect(maxDrawdown).toBe(7)
  })

  it('calculates sharpe ratio returns finite for simple input', () => {
    const daily = [0.01, 0.02, -0.005, 0.015]
    const sr = calculateSharpeRatio(daily)
    expect(Number.isFinite(sr)).toBe(true)
  })
})
