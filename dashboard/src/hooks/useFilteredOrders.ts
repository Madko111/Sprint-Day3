import { useMemo } from 'react';
import type { Order, Filters } from '../types';

export const useFilteredOrders = (orders: Order[], filters: Filters) => {
  return useMemo(() => {
    return orders.filter(order => {
      // Date range filter
      const orderDate = new Date(order.orderDate);
      if (orderDate < filters.dateRange.start || orderDate > filters.dateRange.end) {
        return false;
      }

      // Region filter
      if (filters.regions.length > 0 && !filters.regions.includes(order.region)) {
        return false;
      }

      // Category filter
      if (filters.categories.length > 0 && !filters.categories.includes(order.category)) {
        return false;
      }

      // Status filter
      if (filters.statuses.length > 0 && !filters.statuses.includes(order.status)) {
        return false;
      }

      // Search filter
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        return (
          order.orderNumber.toLowerCase().includes(query) ||
          order.customerName.toLowerCase().includes(query) ||
          order.customerEmail.toLowerCase().includes(query) ||
          order.productName.toLowerCase().includes(query)
        );
      }

      return true;
    });
  }, [orders, filters]);
};
