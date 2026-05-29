import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import type { ChartDataPoint } from '../../types';
import './Charts.css';

interface StatusChartProps {
  data: ChartDataPoint[];
}

export const StatusChart = ({ data }: StatusChartProps) => {
  return (
    <div className="chart-container">
      <h3 className="chart-title">Orders by Status</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={100}
            paddingAngle={4}
            dataKey="value"
            stroke="none"
            activeShape={{
              stroke: '#fff',
              strokeWidth: 2,
              filter: 'drop-shadow(0 0 12px currentColor)'
            }}
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={entry.fill}
                style={{ cursor: 'pointer' }}
              />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{
              backgroundColor: 'rgba(37, 37, 71, 0.98)',
              border: '1px solid var(--border-color)',
              borderRadius: '12px',
              color: 'var(--text-primary)',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.6)',
              padding: '12px 16px',
              fontSize: '14px',
              fontWeight: '600'
            }}
            itemStyle={{
              color: 'var(--text-primary)',
              fontSize: '14px',
              fontWeight: '600',
              padding: '4px 0'
            }}
            formatter={(value: number, name: string) => {
              const total = data.reduce((sum, item) => sum + item.value, 0);
              const percentage = ((value / total) * 100).toFixed(1);
              return [`${value} orders (${percentage}%)`, name.toUpperCase()];
            }}
            cursor={{ fill: 'transparent' }}
          />
          <Legend 
            verticalAlign="bottom" 
            height={50}
            iconType="circle"
            iconSize={10}
            formatter={(value) => (
              <span style={{ 
                color: 'var(--text-secondary)', 
                fontSize: '13px',
                fontWeight: '500',
                textTransform: 'capitalize'
              }}>
                {value}
              </span>
            )}
            wrapperStyle={{
              paddingTop: '20px'
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
