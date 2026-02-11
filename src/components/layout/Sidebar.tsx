"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import { Home, PieChart, BarChart2, BookOpen, Settings, CreditCard, Menu } from 'lucide-react'

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside className={`h-screen transition-all ${collapsed ? 'w-20' : 'w-72'} hidden lg:block border-r border-zinc-800 p-4 bg-gradient-to-b from-black/60 to-zinc-900/40`}> 
      <div className="mb-6 flex items-center justify-between">
        <div>
          <div className="text-xl font-semibold">Deriverse</div>
          {!collapsed && <div className="text-sm text-zinc-400">Analytics</div>}
        </div>
        <button onClick={() => setCollapsed((c) => !c)} className="p-2 rounded hover:bg-zinc-800/50">
          <Menu />
        </button>
      </div>
      <nav className="space-y-2">
        <Link href="/" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-white/2 transition-colors">
          <Home /> {!collapsed && <span>Overview</span>}
        </Link>
        <Link href="/portfolio" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-white/2 transition-colors">
          <PieChart /> {!collapsed && <span>Portfolio</span>}
        </Link>
        <Link href="/analytics" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-white/2 transition-colors">
          <BarChart2 /> {!collapsed && <span>Analytics</span>}
        </Link>
        <Link href="/journal" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-white/2 transition-colors">
          <BookOpen /> {!collapsed && <span>Journal</span>}
        </Link>
        <Link href="/fees" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-white/2 transition-colors">
          <CreditCard /> {!collapsed && <span>Fees</span>}
        </Link>
        <Link href="/settings" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-white/2 transition-colors">
          <Settings /> {!collapsed && <span>Settings</span>}
        </Link>
      </nav>
    </aside>
  )
}
