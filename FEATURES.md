# Deriverse Trading Analytics Dashboard - Feature Documentation

## Overview

The Deriverse Trading Analytics Dashboard is a comprehensive web application for tracking and analyzing trading performance on the Solana blockchain. It provides real-time insights into positions, profit/loss, fees, and detailed trade journaling capabilities.

### Demo Data

The dashboard includes **dynamic demo data** that starts at zero when you open the frontend and gradually evolves every 5 seconds to simulate realistic trading activity. This allows you to:
- Test the UI without any configuration
- See how data flows through the system
- Understand the dashboard layout and features

**To reset demo data**, refresh the page. All metrics will start from zero again.

---

## Core Features

### 1. **Dashboard Home Page** (`/`)
**Location:** Main landing page  
**Components:** TopSummaryCards, HistoricalPnLChart, JournalPanel

#### Features:
- **Summary Card Metrics**
  - Total PnL (Profit & Loss)
  - Win Rate (% of profitable trades)
  - Total Trades
  - Average Win/Loss per trade
  - Current Balance

- **Historical PnL Chart**
  - Visual representation of cumulative profit/loss over time
  - Real-time updates every 5 seconds
  - Interactive chart with hover details

- **Recent Trades Panel**
  - Quick view of last trades
  - Tags for trade classification
  - Trade notes and screenshots

### 2. **Portfolio Overview** (`/portfolio`)
**Location:** Portfolio page  
**Components:** PortfolioOverview

#### Features:
- **Open Positions Display**
  - Symbol and size information
  - Current unrealized P&L
  - Position type (LONG/SHORT)

- **Position Management**
  - Real-time position updates
  - Aggregated P&L by symbol
  - Visual indicators for profitable/losing positions

### 3. **Advanced Analytics** (`/analytics`)
**Location:** Analytics page  
**Components:** AdvancedAnalyticsOverview

#### Features:
- **Performance Metrics**
  - Sharpe Ratio
  - Sortino Ratio
  - Maximum Drawdown
  - Recovery Factor
  - Profit Factor

- **Trade Statistics**
  - Win/Loss analysis
  - Average trade duration
  - Best/Worst trades
  - Trade distribution by symbol

- **Visual Analytics**
  - Profit/Loss distribution charts
  - Monthly performance breakdown
  - Win rate trends
  - Trade frequency analysis

### 4. **Fees Management** (`/fees`)
**Location:** Fees page  
**Components:** FeesOverview

#### Features:
- **Fee Tracking by Symbol**
  - Total fees paid per trading pair
  - Fee rate analysis
  - Fee trends over time

- **Fee Optimization**
  - Identify high-fee trades
  - Analyze fee impact on profitability
  - Fee comparison across trading pairs

### 5. **Trading Journal** (`/journal`)
**Location:** Journal page  
**Components:** TradeTable, JournalPanel

#### Features:
- **Detailed Trade Table**
  - Complete trade history with all details
  - Sortable and filterable columns
  - Search functionality

- **Trade Management**
  - Add notes to trades
  - Tag trades for categorization
  - Upload trade screenshots
  - Record trade rationale

- **Trade Analysis**
  - Filter by symbol, date range, or market type
  - Search by trade ID or symbol
  - Export trade data (CSV/PDF)

---

## Layout Components

### 1. **Sidebar Navigation**
- Quick access to all major sections
- Collapsible on mobile
- Active page highlighting
- Icons for visual navigation

### 2. **Top Navigation Bar**
- Wallet connection status
- Current connected account
- Quick actions and settings
- Theme toggle (light/dark)

### 3. **Global Filter Bar**
Features multiple filtering options:
- **Symbol Filter**: Filter trades by cryptocurrency symbol
- **Market Type Filter**: 
  - ALL (default)
  - SPOT
  - PERP (Perpetuals)
  - OPTIONS
- **Date Range Filter**: Select custom date ranges for analysis

### 4. **Keyboard Shortcuts**
Press `?` to view available keyboard shortcuts:
- `J` - Jump to Journal
- `A` - Go to Analytics
- `P` - Go to Portfolio
- `F` - Go to Fees
- `H` - Return to Home
- `T` - Toggle Theme
- `Esc` - Close any open modals

---

## Data Management

### Store (Zustand)
The application uses Zustand for state management:
- **Orders**: Complete trade history
- **Positions**: Current open positions
- **Fees**: Fee data per symbol
- **Filters**: Global UI filters
- **Trade Metadata**: Notes, tags, screenshots

**Persistence:** Local storage via `trading-store` - data persists across browser sessions

### Mock Data System

#### Dynamic Mock Generator (`src/mock/dynamicMock.ts`)
- **Starts at Zero**: All metrics begin at 0
- **Evolves Every 5 Seconds**: Simulates realistic trading activity
- **Automatic Initialization**: Auto-starts when demo data is needed
- **Realistic Relationships**: Orders generate positions and fees

#### Mock Data Levels:
1. **Accounts** (Demo only):
   - Balance starts at $10,000
   - Updates with cumulative P&L

2. **Orders**:
   - 40% chance of new trade every 5 seconds
   - Random symbol selection
   - Random P&L (-200 to 200)
   - Random size (0-2 units)

3. **Positions**:
   - Auto-calculated from last 20 orders
   - Aggregated by symbol
   - Running unrealized P&L

4. **Fees**:
   - 5 major trading pairs included
   - Grow slowly with random walk
   - Base values between $0-$10

---

## Connection & Integration

### Solana Wallet Integration
**Location:** `src/components/layout/WalletConnect.tsx`

#### Features:
- **Phantom Wallet Support** (Primary)
- **Fallback to Demo Data**: If wallet not connected
- **Auto-Connect**: Remembers previous connection

#### How to Connect:
1. Install [Phantom Wallet](https://phantom.app/) extension
2. Click "Connect Wallet" in top navigation
3. Approve connection in Phantom popup
4. Dashboard loads real trading data

### Deriverse Service (`src/services/deriverse.ts`)

#### Current Capabilities:
- Placeholder for `@deriverse/kit` integration
- Wallet connection via Phantom
- Graceful fallback to demo data

#### API Methods (Ready for Live Data):
- `fetchTradingAccounts()` - Get user's trading accounts
- `fetchOrderHistory(pubkey?)` - Get trade history
- `fetchPositions(pubkey?)` - Get current positions
- `fetchFees(pubkey?)` - Get accumulated fees

---

## How to Enable Live Data

### Step 1: Install Deriverse Kit (When Available)
```bash
npm install @deriverse/kit
```

### Step 2: Update `src/services/deriverse.ts`
Replace the placeholder implementation with actual client initialization:

```typescript
import { DeriverseClient } from '@deriverse/kit'

let client: DeriverseClient | null = null

export async function initWithPublicKey(pubkey?: string) {
  try {
    client = new DeriverseClient({
      cluster: 'mainnet-beta',
      publicKey: pubkey,
    })
    await client.connect()
  } catch (e) {
    console.error('Failed to init Deriverse client:', e)
    client = null
  }
}
```

### Step 3: Handle API Responses
Update the fetch methods to properly map Deriverse API responses to your Order/Position/Fee types:

```typescript
export async function fetchOrderHistory(pubkey?: string): Promise<Order[]> {
  const res = await tryClientCall<any[]>('fetchOrders', pubkey)
  if (res) {
    return res.map(o => ({
      id: o.id,
      symbol: o.marketSymbol,
      pnl: o.realizedPnL,
      size: o.size,
      side: o.side,
      date: new Date(o.timestamp).toISOString(),
      tags: o.tags || [],
    }))
  }
  return dynamicMock.getMockOrders()
}
```

### Step 4: Environment Configuration (Vercel)
Add to `.env.local` (or Vercel project settings):
```
NEXT_PUBLIC_SOLANA_RPC=https://api.mainnet-beta.solana.com
NEXT_PUBLIC_DERIVERSE_API=https://api.deriverse.com
```

### Step 5: Disable Demo Data in Production (Optional)
Modify `src/hooks/useTradingData.ts` to check for environment:

```typescript
const isDemoMode = process.env.NEXT_PUBLIC_DEMO_MODE === 'true'

if (isDemoMode && !isInitialized) {
  dynamicMock.startDynamicMock()
}
```

---

## How to Contribute

### Development Setup
```bash
# Clone the repository
git clone https://github.com/Reinasboo/tradinganalytics.git
cd tradinganalytics

# Install dependencies
npm install

# Run development server
npm run dev

# Open browser to http://localhost:3000
```

### Adding New Features

#### 1. Add New Metric to Analytics
**Files to modify:**
- `src/components/analytics/AdvancedAnalyticsOverview.tsx` - Add UI
- `src/utils/metrics.ts` - Add calculation logic
- `src/utils/analytics.ts` - Add analytical functions

#### 2. Add New Trade Metadata
**Files to modify:**
- `src/types/index.ts` - Add to Order type
- `src/store/tradingStore.ts` - Add store state
- `src/components/journal/JournalPanel.tsx` - Add UI input

#### 3. Add New Export Format
**Files to modify:**
- `src/utils/export.ts` - Add format handler
- `src/components/journal/TradeTable.tsx` - Add export button

### Code Structure

```
src/
├── app/               # Next.js pages and layout
├── components/        # React components
│   ├── analytics/    # Analytics visualizations
│   ├── charts/       # Chart components
│   ├── layout/       # Layout components
│   ├── fees/         # Fees feature
│   └── journal/      # Journal feature
├── hooks/            # Custom React hooks
├── services/         # External API services
├── store/            # Zustand state management
├── types/            # TypeScript type definitions
├── utils/            # Utility functions
├── mock/             # Mock data generators
└── styles/           # Global CSS
```

### Testing
```bash
# Run tests
npm run test

# Run linter
npm run lint
```

### Building
```bash
# Production build
npm run build

# Start production server
npm start
```

---

## Deployment

### Deploy to Vercel
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

### Environment Variables for Vercel
In Vercel project settings, add:
- `NEXT_PUBLIC_DEMO_MODE=true` (to enable demo data)
- `NEXT_PUBLIC_SOLANA_RPC=https://api.mainnet-beta.solana.com` (Solana RPC)

---

## Troubleshooting

### Demo Data Not Updating
- Check browser console for errors
- Refresh page to reinitialize
- Check that `useTradingData` hook is being called

### Wallet Connection Issues
- Ensure Phantom wallet is installed
- Check that Solana network is set to Mainnet
- Grant required permissions in wallet

### Build Errors
```bash
# Clear build cache
rm -rf .next

# Rebuild
npm run build
```

### TypeScript Errors
```bash
# Run type check
npx tsc --noEmit
```

---

## Performance Optimization

### Current Optimizations:
- **Code Splitting**: Next.js automatic per-page splitting
- **Image Optimization**: Lucide icons (SVG)
- **Caching**: 1-hour public cache headers
- **Minimal Dependencies**: Essential packages only
- **Client-Side Rendering**: Optimized for browser
- **Polling Strategy**: 5-second interval (configurable)

### Recommended Improvements:
1. Add database for trade persistence
2. Implement WebSocket for real-time updates
3. Add compression middleware
4. Enable CDN caching for static assets
5. Implement pagination for large trade lists

---

## Support & Documentation

### Related Files:
- [README.md](./README.md) - Project overview
- [package.json](./package.json) - Dependencies and scripts
- [tsconfig.json](./tsconfig.json) - TypeScript configuration
- [next.config.js](./next.config.js) - Next.js configuration

### External Resources:
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Zustand Documentation](https://github.com/pmndrs/zustand)
- [Solana Documentation](https://docs.solana.com)

---

**Last Updated:** February 11, 2026  
**Version:** 1.0.0
