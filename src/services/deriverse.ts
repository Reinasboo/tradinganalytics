import type { TradingAccount, Order, Position, Fee } from '../types'
import dynamicMock from '../mock/dynamicMock'

let client: any = null

export async function initWithPublicKey(pubkey?: string) {
  // Placeholder for future @deriverse/kit integration
  // When available, implement client initialization here
  client = null
}

export async function connectWallet(): Promise<{ connected: boolean; pubkey?: string }> {
  // Lightweight wallet connect using window.solana if present (Phantom or compatible).
  try {
    const w = (globalThis as any).solana
    if (w && w.isPhantom) {
      // request connect; this will open the wallet popup
      await w.connect()
      const pk = w.publicKey?.toString()
      await initWithPublicKey(pk)
      return { connected: true, pubkey: pk }
    }
  } catch (e) {
    // ignore
  }
  return { connected: false }
}

async function tryClientCall<T>(fnName: string, ...args: any[]): Promise<T | null> {
  if (!client) return null
  try {
    if (typeof client[fnName] === 'function') return await client[fnName](...args)
  } catch (e) {
    return null
  }
  return null
}

export async function fetchTradingAccounts(pubkey?: string): Promise<TradingAccount[]> {
  const res = (await tryClientCall<TradingAccount[]>('fetchAccounts', pubkey)) || (await tryClientCall<TradingAccount[]>('getAccounts', pubkey))
  if (res) return res
  // Use dynamic mock if client unavailable (starts at 0, evolves over time)
  return dynamicMock.getMockAccounts()
}

export async function fetchOrderHistory(pubkey?: string): Promise<Order[]> {
  const res = (await tryClientCall<Order[]>('fetchOrders', pubkey)) || (await tryClientCall<Order[]>('getOrders', pubkey))
  if (res) return res
  // Use dynamic mock if client unavailable (starts at 0, evolves over time)
  return dynamicMock.getMockOrders()
}

export async function fetchPositions(pubkey?: string): Promise<Position[]> {
  const res = (await tryClientCall<Position[]>('fetchPositions', pubkey)) || (await tryClientCall<Position[]>('getPositions', pubkey))
  if (res) return res
  // Use dynamic mock if client unavailable (starts at 0, evolves over time)
  return dynamicMock.getMockPositions()
}

export async function fetchFees(pubkey?: string): Promise<Fee[]> {
  const res = (await tryClientCall<Fee[]>('fetchFees', pubkey)) || (await tryClientCall<Fee[]>('getFees', pubkey))
  if (res) return res
  // Use dynamic mock if client unavailable (starts at 0, evolves over time)
  return dynamicMock.getMockFees()
}

export default {
  initWithPublicKey,
  connectWallet,
  fetchTradingAccounts,
  fetchOrderHistory,
  fetchPositions,
  fetchFees,
}
