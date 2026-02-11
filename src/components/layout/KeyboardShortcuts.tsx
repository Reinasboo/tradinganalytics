"use client"
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function KeyboardShortcuts() {
  const router = useRouter()

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'g') {
        // start mnemonic sequence
      }
      // quick nav: p -> portfolio, a -> analytics, j -> journal, f -> fees
      if (e.key === 'p') router.push('/portfolio')
      if (e.key === 'a') router.push('/analytics')
      if (e.key === 'j') router.push('/journal')
      if (e.key === 'f') router.push('/fees')
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [router])

  return null
}
