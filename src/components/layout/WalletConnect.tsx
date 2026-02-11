"use client"
import React, { useState } from 'react'
import deriverse from '../../services/deriverse'

export default function WalletConnect() {
  const [connecting, setConnecting] = useState(false)
  const [connected, setConnected] = useState(false)

  async function handleConnect() {
    setConnecting(true)
    try {
      const res = await deriverse.connectWallet()
      setConnected(!!res.connected)
    } catch (e) {
      setConnected(false)
    } finally {
      setConnecting(false)
    }
  }

  return (
    <div className="flex items-center gap-3">
      <button onClick={handleConnect} className={`btn ${connected ? 'btn-success' : 'btn-primary'}`} disabled={connecting}>
        {connecting ? 'Connecting…' : connected ? 'Wallet Connected' : 'Connect Wallet'}
      </button>
      {connected && <div className="text-sm text-green-400">Connected</div>}
    </div>
  )
}
