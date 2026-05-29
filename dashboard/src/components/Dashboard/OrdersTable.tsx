import { useState } from 'react';
import type { Order } from '../../types';
import { formatCurrency } from '../../utils/calculations';
import { exportToCSV } from '../../utils/export';
import './OrdersTable.css';

interface OrdersTableProps {
  orders: Order[];
  currentPage: number;
  totalPages: number;
  onNextPage: () => void;
  onPrevPage: () => void;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

type SortField = 'orderNumber' | 'customerName' | 'productName' | 'amount' | 'orderDate';
type SortDirection = 'asc' | 'desc';

export const OrdersTable = ({
  orders,
  currentPage,
  totalPages,
  onNextPage,
  onPrevPage,
  hasNextPage,
  hasPrevPage
}: OrdersTableProps) => {
  const [sortField, setSortField] = useState<SortField>('orderDate');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedOrders = [...orders].sort((a, b) => {
    let aValue: string | number | Date = a[sortField];
    let bValue: string | number | Date = b[sortField];

    if (sortField === 'amount') {
      aValue = Number(a.amount);
      bValue = Number(b.amount);
    } else if (sortField === 'orderDate') {
      aValue = new Date(a.orderDate).getTime();
      bValue = new Date(b.orderDate).getTime();
    }

    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const handleExport = () => {
    exportToCSV(orders, `orders-${new Date().toISOString().split('T')[0]}.csv`);
  };

  if (orders.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">📦</div>
        <h3>No orders found</h3>
        <p>Try adjusting your filters to see more results</p>
      </div>
    );
  }

  return (
    <div className="table-container">
      <div className="table-header">
        <h3 className="table-title">Orders ({orders.length})</h3>
        <button type="button" className="export-btn" onClick={handleExport}>
          Export CSV
        </button>
      </div>

      <div className="table-wrapper">
        <table className="orders-table">
          <thead>
            <tr>
              <th onClick={() => handleSort('orderNumber')}>
                Order # {sortField === 'orderNumber' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th onClick={() => handleSort('customerName')}>
                Customer {sortField === 'customerName' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th onClick={() => handleSort('productName')}>
                Product {sortField === 'productName' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th>Category</th>
              <th onClick={() => handleSort('amount')}>
                Amount {sortField === 'amount' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th>Status</th>
              <th>Region</th>
              <th onClick={() => handleSort('orderDate')}>
                Date {sortField === 'orderDate' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedOrders.map(order => (
              <tr key={order.id}>
                <td className="order-number">{order.orderNumber}</td>
                <td>
                  <div className="customer-cell">
                    <div className="customer-name">{order.customerName}</div>
                    <div className="customer-email">{order.customerEmail}</div>
                  </div>
                </td>
                <td className="product-cell">{order.productName}</td>
                <td>
                  <span className="category-badge">{order.category}</span>
                </td>
                <td className="amount-cell">{formatCurrency(order.amount)}</td>
                <td>
                  <span className="status-badge" data-status={order.status}>
                    {order.status}
                  </span>
                </td>
                <td>
                  <span className="region-badge">{order.region}</span>
                </td>
                <td className="date-cell">
                  {new Date(order.orderDate).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button
            type="button"
            className="pagination-btn"
            onClick={onPrevPage}
            disabled={!hasPrevPage}
          >
            ← Previous
          </button>
          
          <div className="pagination-info">
            Page {currentPage} of {totalPages}
          </div>

          <button
            type="button"
            className="pagination-btn"
            onClick={onNextPage}
            disabled={!hasNextPage}
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
};

export const TableSkeleton = () => (
  <div className="table-container skeleton">
    <div className="skeleton-header"></div>
    <div className="skeleton-rows">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="skeleton-row"></div>
      ))}
    </div>
  </div>
);
