# 🎯 E-commerce Admin Dashboard

A modern, real-time analytics dashboard for e-commerce businesses built with React, TypeScript, and Supabase.

## 🎥 Demo Video

> **📹 [Watch Demo Video on Google Drive](https://drive.google.com/file/d/1soxG2kF25dNSbS70J_vmt-R5u_fCC-j_/view?usp=sharing)**
> 
> 1-minute demo showcasing all dashboard features

## 🚀 Live Demo

**Live URL:** https://sprint-day3.vercel.app/

## ✨ Features

- **Real-time Data Sync** - Connected to Supabase PostgreSQL database
- **Interactive KPIs** - Total Revenue, Orders Count, Average Order Value, Refund Rate
- **Advanced Filtering** - Filter by date range, region, category, and status
- **Interactive Charts** - Revenue trends, regional performance, order status, top products
- **Sortable Data Table** - Sort by any column with pagination support
- **CSV Export** - Export all data for external analysis
- **Responsive Design** - Works on desktop and mobile devices

## 🛠️ Tech Stack

- **Frontend:** React 18, TypeScript, Vite
- **Database:** Supabase (PostgreSQL)
- **Charts:** Recharts
- **Styling:** CSS3 with custom properties
- **Deployment:** Vercel

## 📊 Database Schema

```sql
CREATE TABLE dashboard_orders (
  id UUID PRIMARY KEY,
  order_number TEXT UNIQUE,
  customer_name TEXT,
  customer_email TEXT,
  product TEXT,
  category TEXT,
  amount NUMERIC(10,2),
  status TEXT,
  region TEXT,
  created_at TIMESTAMPTZ
);
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Madko111/Sprint-Day3.git
cd Sprint-Day3/dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Set up Supabase database:
- Run the SQL script from `supabase/dashboard_seed.sql`
- This creates the table and inserts 50 sample orders

5. Start development server:
```bash
npm run dev
```

6. Open http://localhost:5174

## 📦 Build for Production

```bash
npm run build
```

## 🌐 Deploy to Vercel

1. Push code to GitHub
2. Import project in Vercel
3. Set Root Directory to `dashboard`
4. Add environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
5. Deploy!

## 📁 Project Structure

```
dashboard/
├── src/
│   ├── components/
│   │   └── Dashboard/
│   │       ├── Dashboard.tsx       # Main dashboard component
│   │       ├── KPICard.tsx         # KPI metrics cards
│   │       ├── Filters.tsx         # Filter controls
│   │       ├── RevenueChart.tsx    # Line chart
│   │       ├── CategoryChart.tsx   # Bar chart
│   │       ├── StatusChart.tsx     # Donut chart
│   │       ├── TopProductsChart.tsx # Horizontal bar chart
│   │       └── OrdersTable.tsx     # Data table
│   ├── hooks/
│   │   ├── useOrders.ts           # Fetch orders from Supabase
│   │   ├── useFilters.ts          # Filter state management
│   │   ├── useFilteredOrders.ts   # Apply filters to orders
│   │   └── usePagination.ts       # Pagination logic
│   ├── utils/
│   │   ├── calculations.ts        # KPI and chart calculations
│   │   ├── dateHelpers.ts         # Date range utilities
│   │   └── export.ts              # CSV export
│   ├── lib/
│   │   └── supabase.ts            # Supabase client
│   └── types/
│       └── index.ts               # TypeScript types
├── supabase/
│   └── dashboard_seed.sql         # Database setup script
└── package.json
```

## 🎨 Features Breakdown

### KPI Cards
- **Total Revenue** - Sum of all paid orders
- **Orders Count** - Total number of orders
- **Average Order Value** - Mean transaction size
- **Refund Rate** - Percentage of refunded orders
- Each shows percentage change vs previous period

### Filters
- **Date Range** - 7d, 30d, 90d, 180d presets
- **Region** - NA, EU, APAC, LATAM
- **Category** - Electronics, Apparel, Home, Books
- **Status** - pending, paid, refunded, cancelled
- **Search** - Filter by order #, customer, product

### Charts
1. **Revenue Over Time** - Line chart showing daily revenue trends
2. **Revenue by Region** - Bar chart comparing regional performance
3. **Orders by Status** - Donut chart showing order distribution
4. **Top 5 Products** - Horizontal bar chart of best sellers

### Data Table
- Sortable columns (click header to sort)
- Pagination (25 orders per page)
- CSV export functionality
- Responsive design

## 🔗 Links

- **Live Demo:** https://sprint-day3.vercel.app/
- **GitHub:** https://github.com/Madko111/Sprint-Day3
- **Demo Video:** [Add your YouTube link here]

## 👤 Author

**Madko111**
- GitHub: [@Madko111](https://github.com/Madko111)

## 📄 License

This project is open source and available under the MIT License.

---

**Built with ❤️ using React, TypeScript, and Supabase**
