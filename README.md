
# Deriverse Trading Analytics (scaffold)

Production-ready scaffold for a trading analytics dashboard optimized for Solana and Deriverse integrations. The goal is a high-quality, hackathon-grade dashboard with advanced analytics, polished UX, and clear separation between SDK, services, UI, and utilities.

Included highlights

- SDK service skeleton: `src/services/deriverse.ts` (mock-safe, wire to `@deriverse/kit`)
- Data hook with mock fallback: `src/hooks/useTradingData.ts`
- Persistent global store: `src/store/tradingStore.ts` (zustand + persistence)
- Analytics utilities: `src/utils/analytics.ts` (win rate, drawdown, Sharpe, profit factor)
- Mock data for development: `src/mock/mockData.ts`
- Example UI: `src/components/analytics/TopSummaryCards.tsx`, `src/components/charts/HistoricalPnLChart.tsx`
- Global filter bar, wallet connect, and CSV export utilities (scaffolded)

Folder layout (important files)

- `src/services/deriverse.ts` — Deriverse SDK and wallet integration layer (skeleton)
- `src/hooks/useTradingData.ts` — central data loader with polling and mock fallback
- `src/store/tradingStore.ts` — persisted filters and dataset state
- `src/utils/*.ts` — analytics calculations and utilities
- `src/components/analytics/*` — summary cards, charts, metrics
- `src/components/journal/*` — trading journal and trade table (placeholder exists)

Quick start

```bash
npm install
npm run dev
```

Development notes and recommended next steps

- Integrate `@deriverse/kit` and the Solana wallet adapter inside `src/services/deriverse.ts`. Follow wallet-adapter best practices; never store private keys.
- Expand journal features: tagging, screenshot uploads (local), side-panel details for trades, emotion tagging.
- Implement robust date and symbol filters in `src/components/layout/GlobalFilterBar.tsx` and ensure the state flows through `useTradingStore`.
- Add unit tests for `src/utils/analytics.ts` to validate financial calculations (edge cases: zero trades, no losses, constant returns).
- Add export features: CSV and PDF reporting (scaffolded CSV util included).
- UX polish: skeleton loaders, animated page transitions with `framer-motion`, toasts with `react-toastify`, keyboard shortcuts, theme toggle.
- Performance: memoize heavy calculations, use virtualization for large trade tables, and provide a performance mode toggle.

Files added/modified in this update

- `src/components/layout/GlobalFilterBar.tsx` — global filter UI
- `src/components/layout/WalletConnect.tsx` — wallet connect skeleton
- `src/utils/export.ts` — CSV export utility

Where to go from here

Pick one: wallet integration, trading journal implementation, or analytics unit tests. I can implement any of these next — tell me which one to prioritize, or I'll proceed with wiring the real `@deriverse/kit` calls.

# Deriverse Analytics — Scaffold

This repository is a production-oriented scaffold for a trading analytics dashboard for Deriverse (Solana). It contains: Next.js 14 App Router, TypeScript, TailwindCSS, Framer Motion, Recharts, Zustand, React Table, Solana wallet adapter integration skeleton, and utilities for analytics.

Quick start

1. Install dependencies:

```bash
npm install
```

2. Run development server:

```bash
npm run dev
```

What I scaffolded

- `src/app` — Next.js App Router entry
- `src/components` — UI building blocks (charts, analytics, journal placeholders)
- `src/services/deriverse.ts` — SDK wrapper + mock fallbacks
- `src/hooks/useTradingData.ts` — data fetching hook
- `src/store/tradingStore.ts` — global filters store (Zustand)
- `src/utils` — metrics and stats utilities
- `src/types` — shared TypeScript types

Next steps (recommended)

- Wire up `@deriverse/kit` calls in `src/services/deriverse.ts`.
- Implement `TradeTable` using `react-table` and server-side pagination.
- Add authentication / wallet flows using `@solana/wallet-adapter` wallets and UI components.
- Create more chart components and fine-tune animations and UI polish.
