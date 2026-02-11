import type { Order, Position, Fee, TradingAccount } from '../types'

type State = {
  accounts: TradingAccount[]
  orders: Order[]
  positions: Position[]
  fees: Fee[]
}

const state: State = {
  // Start all numbers at zero / empty to match requirement
  accounts: [{ id: 'demo', owner: 'demo', balance: 0 }],
  orders: [],
  positions: [],
  fees: [],
}

let timer: ReturnType<typeof setInterval> | null = null
let isInitialized = false

function seedInitial() {
  // Start with zeros and empty data structures
  state.accounts = [{ id: 'demo', owner: 'demo', balance: 0 }]
  state.orders = []
  state.positions = []
  state.fees = [
    { symbol: 'SOL/USDC', fee: 0 },
    { symbol: 'BTC/USDC', fee: 0 },
    { symbol: 'ETH/USDC', fee: 0 },
    { symbol: 'SRM/USDC', fee: 0 },
    { symbol: 'ORCA/USDC', fee: 0 },
  ]
}

function randomWalk(value: number, volatility = 1) {
  return Math.max(-999999, value + (Math.random() - 0.5) * volatility)
}

export function startDynamicMock({ interval = 5000 } = {}) {
  seedInitial()
  if (timer || isInitialized) return
  isInitialized = true

  timer = setInterval(() => {
    // Gradually introduce demo activity so the UI starts at zero then evolves
    // Occasionally push a new order
    if (Math.random() < 0.4) {
      const symbols = ['SOL/USDC', 'BTC/USDC', 'ETH/USDC', 'SRM/USDC', 'ORCA/USDC']
      const symbol = symbols[Math.floor(Math.random() * symbols.length)]
      const pnl = Math.round((Math.random() - 0.4) * 200 * 100) / 100
      const size = Math.round((Math.random() * 2) * 100) / 100
      const side = pnl >= 0 ? 'LONG' : 'SHORT'
      const id = `o_${Date.now()}_${Math.floor(Math.random() * 1000)}`
      state.orders.push({
        id,
        symbol,
        pnl,
        size,
        side,
        date: new Date().toISOString(),
      } as Order)
    }

    // Update positions by computing aggregated unrealized pnl from recent orders
    const agg: Record<string, { size: number; unrealizedPnl: number }> = {}
    for (const o of state.orders.slice(-20)) {
      const s = o.symbol.includes('/') ? o.symbol.split('/')[0] : o.symbol
      if (!agg[s]) agg[s] = { size: 0, unrealizedPnl: 0 }
      agg[s].size += Math.abs(o.size || 0)
      agg[s].unrealizedPnl += o.pnl || 0
    }
    state.positions = Object.entries(agg).map(([k, v], i) => ({
      id: `p_${i}_${k}`,
      symbol: k,
      size: Math.round(v.size * 100) / 100,
      unrealizedPnl: Math.round(v.unrealizedPnl * 100) / 100,
    }))

    // Fees grow slowly
    state.fees = state.fees.map((f) => ({ ...f, fee: Math.round(Math.max(0, randomWalk(f.fee, 0.1)) * 100) / 100 }))

    // Accounts balance based on orders (total PnL + base balance)
    const totalPnl = state.orders.reduce((s, o) => s + (o.pnl || 0), 0)
    state.accounts[0].balance = Math.round((10000 + totalPnl) * 100) / 100
  }, interval)
}

export function stopDynamicMock() {
  if (timer) clearInterval(timer)
  timer = null
  isInitialized = false
}

export function getMockAccounts(): TradingAccount[] {
  if (!isInitialized) {
    seedInitial()
    startDynamicMock()
  }
  return state.accounts
}

export function getMockOrders(): Order[] {
  if (!isInitialized) {
    seedInitial()
    startDynamicMock()
  }
  return state.orders
}

export function getMockPositions(): Position[] {
  if (!isInitialized) {
    seedInitial()
    startDynamicMock()
  }
  return state.positions
}

export function getMockFees(): Fee[] {
  if (!isInitialized) {
    seedInitial()
    startDynamicMock()
  }
  return state.fees
}

export default {
  startDynamicMock,
  stopDynamicMock,
  getMockAccounts,
  getMockOrders,
  getMockPositions,
  getMockFees,
}
