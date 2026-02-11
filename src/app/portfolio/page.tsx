"use client"
import React from 'react'
import Sidebar from '../../components/layout/Sidebar'
import TopNav from '../../components/layout/TopNav'
import PortfolioOverview from '../../components/analytics/PortfolioOverview'
import useTradingData from '../../hooks/useTradingData'

export default function PortfolioPage() {
  // Initialize trading data with dynamic mock
  useTradingData({ poll: true, interval: 5000 })

  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <main className="flex-1 p-6 lg:p-10">
        <TopNav />
        <h1 className="text-2xl font-semibold mb-6">Portfolio</h1>
        <PortfolioOverview />
      </main>
    </div>
  )
}
