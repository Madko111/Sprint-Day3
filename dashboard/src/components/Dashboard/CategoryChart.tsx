import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { ChartDataPoint } from '../../types';
import './Charts.css';

interface CategoryChartProps {
  data: ChartDataPoint[];
}

export const CategoryChart = ({ data }: CategoryChartProps) => {
  return (
    <div className="chart-container">
      <h3 className="chart-title">Revenue by Region</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
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
            cursor={false}
          />
          <Bar 
            dataKey="value" 
            fill="#7c3aed"
            activeBar={{
              fill: '#00d9c0',
              filter: 'drop-shadow(0 0 16px rgba(0, 217, 192, 0.8))'
            }}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
