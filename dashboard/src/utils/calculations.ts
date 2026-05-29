import type { Order, KPIData } from '../types';

export const calculateKPIs = (orders: Order[], previousOrders: Order[]): KPIData => {
  // Total Revenue (only paid orders)
  const totalRevenue = orders.reduce((sum, order) => {
    if (order.status === 'paid') {
      return sum + Number(order.amount);
    }
    return sum;
  }, 0);

  const previousRevenue = previousOrders.reduce((sum, order) => {
    if (order.status === 'paid') {
      return sum + Number(order.amount);
    }
    return sum;
  }, 0);

  const revenueChange = previousRevenue > 0 
    ? ((totalRevenue - previousRevenue) / previousRevenue) * 100 
    : 0;

  // Orders Count
  const ordersCount = orders.length;
  const previousOrdersCount = previousOrders.length;
  const ordersChange = previousOrdersCount > 0
    ? ((ordersCount - previousOrdersCount) / previousOrdersCount) * 100
    : 0;

  // Average Order Value (AOV)
  const paidOrders = orders.filter(o => o.status === 'paid');
  const aov = paidOrders.length > 0 ? totalRevenue / paidOrders.length : 0;
  
  const previousPaidOrders = previousOrders.filter(o => o.status === 'paid');
  const previousAov = previousPaidOrders.length > 0 
    ? previousRevenue / previousPaidOrders.length 
    : 0;
  
  const aovChange = previousAov > 0 
    ? ((aov - previousAov) / previousAov) * 100 
    : 0;

  // Refund Rate
  const refundedOrders = orders.filter(o => o.status === 'refunded').length;
  const refundRate = ordersCount > 0 ? (refundedOrders / ordersCount) * 100 : 0;
  
  const previousRefundedOrders = previousOrders.filter(o => o.status === 'refunded').length;
  const previousRefundRate = previousOrdersCount > 0 
    ? (previousRefundedOrders / previousOrdersCount) * 100 
    : 0;
  
  const refundRateChange = refundRate - previousRefundRate;

  return {
    totalRevenue,
    revenueChange,
    ordersCount,
    ordersChange,
    aov,
    aovChange,
    refundRate,
    refundRateChange
  };
};

export const getRevenueByRegion = (orders: Order[]) => {
  const regionMap = new Map<string, number>();
  
  orders.forEach(order => {
    if (order.status === 'paid') {
      const current = regionMap.get(order.region) || 0;
      regionMap.set(order.region, current + Number(order.amount));
    }
  });

  return Array.from(regionMap.entries())
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);
};

export const getRevenueByCategory = (orders: Order[]) => {
  const categoryMap = new Map<string, number>();
  
  orders.forEach(order => {
    if (order.status === 'paid') {
      const current = categoryMap.get(order.category) || 0;
      categoryMap.set(order.category, current + Number(order.amount));
    }
  });

  return Array.from(categoryMap.entries())
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);
};

export const getOrdersByStatus = (orders: Order[]) => {
  const statusMap = new Map<string, number>();
  
  orders.forEach(order => {
    const current = statusMap.get(order.status) || 0;
    statusMap.set(order.status, current + 1);
  });

  const statusColors: Record<string, string> = {
    paid: '#00d9c0',
    pending: '#fbbf24',
    refunded: '#ff6b6b',
    cancelled: '#8585ad'
  };

  return Array.from(statusMap.entries()).map(([name, value]) => ({ 
    name, 
    value,
    fill: statusColors[name] || '#8884d8'
  }));
};

export const getTopProducts = (orders: Order[], limit: number = 5) => {
  const productMap = new Map<string, number>();
  
  orders.forEach(order => {
    if (order.status === 'paid') {
      const current = productMap.get(order.productName) || 0;
      productMap.set(order.productName, current + Number(order.amount));
    }
  });

  return Array.from(productMap.entries())
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, limit);
};

export const getRevenueOverTime = (orders: Order[]) => {
  const dateMap = new Map<string, number>();
  
  orders.forEach(order => {
    if (order.status === 'paid') {
      const date = new Date(order.orderDate).toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      });
      const current = dateMap.get(date) || 0;
      dateMap.set(date, current + Number(order.amount));
    }
  });

  return Array.from(dateMap.entries())
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => {
      const dateA = new Date(a.name + ', 2026');
      const dateB = new Date(b.name + ', 2026');
      return dateA.getTime() - dateB.getTime();
    });
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

export const formatPercent = (value: number): string => {
  const sign = value > 0 ? '+' : '';
  return `${sign}${value.toFixed(1)}%`;
};
