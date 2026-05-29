import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Order } from '../types';

export const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      
      // Fetch from Supabase
      const { data, error: supabaseError } = await supabase
        .from('dashboard_orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (supabaseError) throw supabaseError;

      // Transform Supabase data to Order type
      const transformedOrders: Order[] = (data || []).map((row: any) => {
        // Парсим дату - Supabase возвращает ISO string
        const orderDate = row.created_at ? new Date(row.created_at) : new Date();
        
        return {
          id: row.id,
          orderNumber: row.order_number,
          customerName: row.customer_name,
          customerEmail: row.customer_email,
          productName: row.product,
          category: row.category,
          amount: parseFloat(row.amount),
          status: row.status,
          region: row.region,
          orderDate: orderDate
        };
      });

      setOrders(transformedOrders);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch orders');
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  };

  return { orders, loading, error, refetch: fetchOrders };
};
