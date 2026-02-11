"use client"
import React from 'react'
import WalletConnect from './WalletConnect'
import ThemeToggle from './ThemeToggle'
import { Button } from '../ui/Button'
import { LucideSearch } from 'lucide-react'

export default function TopNav() {
  return (
    <div className="w-full flex items-center justify-between gap-4 mb-4">
      <div className="flex items-center gap-3">
        <div className="text-sm text-zinc-400">Overview</div>
      </div>
      <div className="flex items-center gap-3">
        <div className="hidden md:flex items-center bg-zinc-900/40 p-2 rounded">
          <LucideSearch className="mr-2" />
          <input placeholder="Search symbol" className="bg-transparent outline-none text-sm" />
        </div>
        <ThemeToggle />
        <WalletConnect />
        <Button variant="ghost" className="hidden md:inline-flex">Export</Button>
      </div>
    </div>
  )
}
