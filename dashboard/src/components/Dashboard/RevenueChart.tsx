import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { ChartDataPoint } from '../../types';
import './Charts.css';

interface RevenueChartProps {
  data: ChartDataPoint[];
}

export const RevenueChart = ({ data }: RevenueChartProps) => {
  return (
    <div className="chart-container">
      <h3 className="chart-title">Revenue Over Time</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
          <XAxis 
            dataKey="name" 
            stroke="var(--text-tertiary)"
            style={{ fontSize: '12px' }}
          />
          <YAxis 
            stroke="var(--text-tertiary)"
            style={{ fontSize: '12px' }}
            tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
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
          />
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke="#00d9c0" 
            strokeWidth={3}
            dot={{ fill: '#00d9c0', r: 5 }}
            activeDot={{ r: 7, fill: '#00d9c0' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export const ChartSkeleton = () => (
  <div className="chart-container skeleton">
    <div className="skeleton-title"></div>
    <div className="skeleton-chart"></div>
  </div>
);
