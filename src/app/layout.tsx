import '../styles/globals.css'
import { ReactNode } from 'react'
import Providers from '../providers'

export const metadata = {
  title: 'Deriverse Analytics',
  description: 'Trading analytics dashboard for Deriverse (Solana)'
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-b from-black via-zinc-900 to-zinc-800 text-slate-100">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
