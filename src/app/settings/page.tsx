"use client"
import React from 'react'
import Sidebar from '../../components/layout/Sidebar'
import TopNav from '../../components/layout/TopNav'

export default function SettingsPage() {
  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <main className="flex-1 p-6 lg:p-10">
        <TopNav />
        <h1 className="text-2xl font-semibold mb-6">Settings</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Appearance Settings */}
          <div className="bg-card p-6 rounded-lg">
            <h2 className="text-lg font-semibold mb-4">Appearance</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Theme</label>
                <select className="w-full px-3 py-2 bg-background border border-zinc-700 rounded-lg text-sm focus:outline-none focus:border-cyan-500">
                  <option>System</option>
                  <option>Light</option>
                  <option>Dark</option>
                </select>
              </div>
            </div>
          </div>

          {/* Account Settings */}
          <div className="bg-card p-6 rounded-lg">
            <h2 className="text-lg font-semibold mb-4">Account</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Primary Wallet</label>
                <input type="text" placeholder="Enter wallet address" className="w-full px-3 py-2 bg-background border border-zinc-700 rounded-lg text-sm focus:outline-none focus:border-cyan-500" />
              </div>
              <button className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-lg text-sm font-medium transition-colors">
                Connect Wallet
              </button>
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-card p-6 rounded-lg">
            <h2 className="text-lg font-semibold mb-4">Notifications</h2>
            <div className="space-y-4">
              <label className="flex items-center">
                <input type="checkbox" defaultChecked className="rounded" />
                <span className="ml-3 text-sm">Email alerts for large trades</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" defaultChecked className="rounded" />
                <span className="ml-3 text-sm">Daily analytics summary</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="rounded" />
                <span className="ml-3 text-sm">PnL updates</span>
              </label>
            </div>
          </div>

          {/* Export Settings */}
          <div className="bg-card p-6 rounded-lg">
            <h2 className="text-lg font-semibold mb-4">Data Export</h2>
            <div className="space-y-3">
              <button className="w-full px-4 py-2 bg-zinc-700 hover:bg-zinc-600 rounded-lg text-sm font-medium transition-colors">
                Export as CSV
              </button>
              <button className="w-full px-4 py-2 bg-zinc-700 hover:bg-zinc-600 rounded-lg text-sm font-medium transition-colors">
                Export as JSON
              </button>
            </div>
          </div>

          {/* API Settings */}
          <div className="bg-card p-6 rounded-lg lg:col-span-2">
            <h2 className="text-lg font-semibold mb-4">API Configuration</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">API Endpoint</label>
                <input type="text" defaultValue="https://api.deriverse.io" className="w-full px-3 py-2 bg-background border border-zinc-700 rounded-lg text-sm focus:outline-none focus:border-cyan-500" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Update Interval (ms)</label>
                <input type="number" defaultValue="5000" className="w-full px-3 py-2 bg-background border border-zinc-700 rounded-lg text-sm focus:outline-none focus:border-cyan-500" />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
