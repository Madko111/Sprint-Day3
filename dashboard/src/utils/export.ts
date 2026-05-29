import type { Order } from '../types';

export const exportToCSV = (orders: Order[], filename: string = 'orders.csv') => {
  const headers = [
    'Order Number',
    'Customer Name',
    'Customer Email',
    'Product',
    'Category',
    'Amount',
    'Status',
    'Region',
    'Created At'
  ];

  const rows = orders.map(order => [
    order.orderNumber,
    order.customerName,
    order.customerEmail,
    order.productName,
    order.category,
    order.amount.toString(),
    order.status,
    order.region,
    new Date(order.orderDate).toISOString()
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
