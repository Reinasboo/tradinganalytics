export type TradingAccount = { id: string; owner: string; balance: number }

export type Order = {
  id: string
  symbol: string
  pnl: number
  size: number
  side: 'LONG' | 'SHORT'
  date: string
  tags?: string[]
}

export type Position = { id: string; symbol: string; unrealizedPnl: number; size: number }

export type Fee = { symbol: string; fee: number }
