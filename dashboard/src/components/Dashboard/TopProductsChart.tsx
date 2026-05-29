import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { ChartDataPoint } from '../../types';
import './Charts.css';

interface TopProductsChartProps {
  data: ChartDataPoint[];
}

export const TopProductsChart = ({ data }: TopProductsChartProps) => {
  return (
    <div className="chart-container">
      <h3 className="chart-title">Top 5 Products</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart 
          data={data} 
          layout="vertical"
          margin={{ top: 5, right: 10, left: 100, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
          <XAxis 
            type="number"
            stroke="var(--text-tertiary)"
            style={{ fontSize: '12px' }}
            tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
          />
          <YAxis 
            type="category"
            dataKey="name" 
            stroke="var(--text-tertiary)"
            style={{ fontSize: '11px' }}
            width={90}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              borderRadius: '12px',
              color: 'var(--text-primary)',
              boxShadow: 'var(--shadow-lg)'
            }}
            formatter={(value: number) => [`$${value.toFixed(0)}`, 'Revenue']}
            cursor={false}
          />
          <Bar 
            dataKey="value" 
            fill="#00d9c0"
            activeBar={{
              fill: '#7c3aed',
              filter: 'drop-shadow(0 0 16px rgba(124, 58, 237, 0.8))'
            }}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
