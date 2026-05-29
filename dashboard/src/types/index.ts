// Order types
export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  productName: string;
  category: 'Electronics' | 'Apparel' | 'Home' | 'Books';
  amount: number;
  status: 'pending' | 'paid' | 'refunded' | 'cancelled';
  region: 'NA' | 'EU' | 'APAC' | 'LATAM';
  orderDate: Date;
}

// Filter types
export interface DateRange {
  start: Date;
  end: Date;
  preset?: '7d' | '30d' | '90d' | '180d' | 'custom';
}

export interface Filters {
  dateRange: DateRange;
  regions: string[];
  categories: string[];
  statuses: string[];
  searchQuery: string;
}

// KPI types
export interface KPIData {
  totalRevenue: number;
  revenueChange: number;
  ordersCount: number;
  ordersChange: number;
  aov: number;
  aovChange: number;
  refundRate: number;
  refundRateChange: number;
}

// Chart data types
export interface ChartDataPoint {
  name: string;
  value: number;
  fill?: string;
}
