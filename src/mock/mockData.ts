import type { Order, Position, Fee } from '../types'

export const sampleOrders: Order[] = [
  {
    id: 't1',
    symbol: 'SOL/USDC',
    pnl: 250,
    size: 1.2,
    side: 'LONG',
    date: new Date().toISOString(),
    tags: ['momentum'],
  },
  {
    id: 't2',
    symbol: 'BTC/USDC',
    pnl: -120,
    size: 0.05,
    side: 'SHORT',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
  {
    id: 't3',
    symbol: 'SOL/USDC',
    pnl: 75,
    size: 0.5,
    side: 'LONG',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
  },
]

export const samplePositions: Position[] = [
  { id: 'p1', symbol: 'SOL/USDC', unrealizedPnl: 120, size: 2 },
  { id: 'p2', symbol: 'BTC/USDC', unrealizedPnl: -50, size: 0.02 },
]

export const sampleFees: Fee[] = [
  { symbol: 'SOL/USDC', fee: 3.5 },
  { symbol: 'BTC/USDC', fee: 1.2 },
]
