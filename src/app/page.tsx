"use client"
import React, { useEffect } from 'react'
import Sidebar from '../components/layout/Sidebar'
import TopNav from '../components/layout/TopNav'
import KeyboardShortcuts from '../components/layout/KeyboardShortcuts'
import TopSummaryCards from '../components/analytics/TopSummaryCards'
import HistoricalPnLChart from '../components/charts/HistoricalPnLChart'
import GlobalFilterBar from '../components/layout/GlobalFilterBar'
import JournalPanel from '../components/journal/JournalPanel'
import useTradingData from '../hooks/useTradingData'

export default function Page() {
  // Load trading data on mount (will use dynamic mock data that starts at 0)
  const { loading } = useTradingData({ poll: true, interval: 5000 })

  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <main className="flex-1 p-6 lg:p-10">
        <TopNav />
        <div className="mb-4">
          <GlobalFilterBar />
        </div>
        <h1 className="text-2xl font-semibold mb-6">Deriverse — Trading Analytics</h1>
        <section className="space-y-6">
          <TopSummaryCards />
          <div className="mt-6">
            <HistoricalPnLChart />
          </div>
        </section>
        <JournalPanel />
        <KeyboardShortcuts />
      </main>
    </div>
  )
}
