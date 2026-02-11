import create from 'zustand'
import { persist } from 'zustand/middleware'
import type { Order, Position, Fee } from '../types'

type Filters = {
  symbol?: string
  market?: 'SPOT' | 'PERP' | 'OPTIONS' | 'ALL'
  dateRange?: { from?: string; to?: string }
}

type TradingState = {
  orders: Order[]
  positions: Position[]
  fees: Fee[]
  filters: Filters
  selectedTrade: Order | null
  tradeNotes: Record<string, string>
  tradeTags: Record<string, string[]>
  tradeScreenshots: Record<string, string[]>
  setOrders: (o: Order[]) => void
  setPositions: (p: Position[]) => void
  setFees: (f: Fee[]) => void
  setFilters: (f: Partial<Filters>) => void
  setSelectedTrade: (t: Order | null) => void
  updateOrder: (id: string, patch: Partial<Order>) => void
  setNoteForTrade: (id: string, note: string) => void
  addTagToTrade: (id: string, tag: string) => void
  removeTagFromTrade: (id: string, tag: string) => void
  addScreenshotForTrade: (id: string, dataUrl: string) => void
  resetFilters: () => void
}

export const useTradingStore = create<TradingState>()(
  persist(
    (set, get) => ({
      orders: [],
      positions: [],
      fees: [],
      selectedTrade: null,
      tradeNotes: {},
      tradeTags: {},
      tradeScreenshots: {},
      filters: { market: 'ALL' },
      setOrders: (o) => set({ orders: o }),
      setPositions: (p) => set({ positions: p }),
      setFees: (f) => set({ fees: f }),
      setFilters: (f) => set((s) => ({ filters: { ...s.filters, ...f } })),
      setSelectedTrade: (t) => set({ selectedTrade: t }),
      updateOrder: (id, patch) =>
        set((s) => ({ orders: s.orders.map((o) => (o.id === id ? { ...o, ...patch } : o)) })),
      setNoteForTrade: (id, note) => set((s) => ({ tradeNotes: { ...s.tradeNotes, [id]: note } })),
      addTagToTrade: (id, tag) =>
        set((s) => ({ tradeTags: { ...s.tradeTags, [id]: Array.from(new Set([...(s.tradeTags[id] || []), tag])) } })),
      removeTagFromTrade: (id, tag) =>
        set((s) => ({ tradeTags: { ...s.tradeTags, [id]: (s.tradeTags[id] || []).filter((t) => t !== tag) } })),
      addScreenshotForTrade: (id, dataUrl) =>
        set((s) => ({ tradeScreenshots: { ...s.tradeScreenshots, [id]: [...(s.tradeScreenshots[id] || []), dataUrl] } })),
      resetFilters: () => set({ filters: { market: 'ALL' } }),
    }),
    { name: 'trading-store' }
  )
)

export default useTradingStore
