import type { ReactNode } from 'react';
import './KPICard.css';

interface KPICardProps {
  title: string;
  value: string;
  change: number;
  icon?: ReactNode;
  isPercentage?: boolean;
}

export const KPICard = ({ title, value, change, icon, isPercentage = false }: KPICardProps) => {
  const isPositive = isPercentage ? change < 0 : change > 0;
  const changeClass = isPositive ? 'positive' : change < 0 ? 'negative' : 'neutral';

  return (
    <div className="kpi-card">
      <div className="kpi-header">
        <span className="kpi-title">{title}</span>
        {icon && <span className="kpi-icon">{icon}</span>}
      </div>
      <div className="kpi-value">{value}</div>
      <div className={`kpi-change ${changeClass}`}>
        <span className="change-arrow">{isPositive ? '↑' : change < 0 ? '↓' : '→'}</span>
        <span className="change-value">
          {change > 0 ? '+' : ''}{change.toFixed(1)}%
        </span>
        <span className="change-label">vs previous period</span>
      </div>
    </div>
  );
};

export const KPICardSkeleton = () => (
  <div className="kpi-card skeleton">
    <div className="skeleton-title"></div>
    <div className="skeleton-value"></div>
    <div className="skeleton-change"></div>
  </div>
);
