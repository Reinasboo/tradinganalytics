"use client"
import React, { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')

  useEffect(() => {
    const saved = localStorage.getItem('theme') as 'dark' | 'light' | null
    if (saved) setTheme(saved)
    apply(saved || 'dark')
  }, [])

  function apply(t: 'dark' | 'light') {
    const el = document.documentElement
    if (t === 'dark') {
      el.classList.remove('light')
      el.classList.add('dark')
    } else {
      el.classList.remove('dark')
      el.classList.add('light')
    }
  }

  function toggle() {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    localStorage.setItem('theme', next)
    apply(next)
  }

  return (
    <button onClick={toggle} className="btn btn-ghost btn-sm">
      {theme === 'dark' ? 'Dark' : 'Light'}
    </button>
  )
}
