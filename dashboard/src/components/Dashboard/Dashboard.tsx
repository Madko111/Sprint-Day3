import { useMemo } from 'react';
import { useOrders } from '../../hooks/useOrders';
import { useFilters } from '../../hooks/useFilters';
import { useFilteredOrders } from '../../hooks/useFilteredOrders';
import { usePagination } from '../../hooks/usePagination';
import { useDebounce } from '../../hooks/useDebounce';
import { KPICard, KPICardSkeleton } from './KPICard';
import { RevenueChart, ChartSkeleton } from './RevenueChart';
import { CategoryChart } from './CategoryChart';
import { StatusChart } from './StatusChart';
import { TopProductsChart } from './TopProductsChart';
import { Filters } from './Filters';
import { OrdersTable, TableSkeleton } from './OrdersTable';
import { 
  calculateKPIs, 
  getRevenueByRegion, 
  getOrdersByStatus, 
  getTopProducts,
  getRevenueOverTime,
  formatCurrency 
} from '../../utils/calculations';
import { getPresetDateRange, getPreviousPeriod } from '../../utils/dateHelpers';
import './Dashboard.css';

export const Dashboard = () => {
  const { orders, loading, error } = useOrders();
  const {
    filters,
    updateDateRange,
    updateRegions,
    updateCategories,
    updateStatuses,
    updateSearchQuery,
    clearFilters
  } = useFilters();

  // Debounce search query
  const debouncedSearchQuery = useDebounce(filters.searchQuery, 300);
  const filtersWithDebouncedSearch = { ...filters, searchQuery: debouncedSearchQuery };

  // Filter orders
  const filteredOrders = useFilteredOrders(orders, filtersWithDebouncedSearch);

  // Get previous period orders for comparison
  const previousPeriodOrders = useMemo(() => {
    const previousPeriod = getPreviousPeriod(filters.dateRange);
    return orders.filter(order => {
      const orderDate = new Date(order.orderDate);
      return orderDate >= previousPeriod.start && orderDate <= previousPeriod.end;
    });
  }, [orders, filters.dateRange]);

  // Calculate KPIs
  const kpis = useMemo(() => 
    calculateKPIs(filteredOrders, previousPeriodOrders),
    [filteredOrders, previousPeriodOrders]
  );

  // Prepare chart data
  const revenueByRegion = useMemo(() => getRevenueByRegion(filteredOrders), [filteredOrders]);
  const ordersByStatus = useMemo(() => getOrdersByStatus(filteredOrders), [filteredOrders]);
  const topProducts = useMemo(() => getTopProducts(filteredOrders, 5), [filteredOrders]);
  const revenueOverTime = useMemo(() => getRevenueOverTime(filteredOrders), [filteredOrders]);

  // Pagination
  const {
    currentPage,
    totalPages,
    paginatedItems,
    nextPage,
    prevPage,
    hasNextPage,
    hasPrevPage
  } = usePagination(filteredOrders, 25);

  const handleDateRangeChange = (preset: '7d' | '30d' | '90d' | '180d') => {
    updateDateRange(getPresetDateRange(preset));
  };

  if (error) {
    return (
      <div className="error-state">
        <div className="error-icon">⚠️</div>
        <h2>Failed to load dashboard</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div>
          <h1 className="dashboard-title">E-commerce Dashboard</h1>
          <p className="dashboard-subtitle">Sales performance overview</p>
        </div>
      </header>

      <Filters
        filters={filters}
        onDateRangeChange={handleDateRangeChange}
        onRegionsChange={updateRegions}
        onCategoriesChange={updateCategories}
        onStatusesChange={updateStatuses}
        onSearchChange={updateSearchQuery}
        onClearFilters={clearFilters}
      />

      {loading ? (
        <>
          <div className="kpi-grid">
            <KPICardSkeleton />
            <KPICardSkeleton />
            <KPICardSkeleton />
            <KPICardSkeleton />
          </div>
          <div className="charts-grid">
            <ChartSkeleton />
            <ChartSkeleton />
            <ChartSkeleton />
            <ChartSkeleton />
          </div>
          <TableSkeleton />
        </>
      ) : (
        <>
          <div className="kpi-grid">
            <KPICard
              title="Total Revenue"
              value={formatCurrency(kpis.totalRevenue)}
              change={kpis.revenueChange}
              icon="💰"
            />
            <KPICard
              title="Orders"
              value={kpis.ordersCount.toString()}
              change={kpis.ordersChange}
              icon="📦"
            />
            <KPICard
              title="Avg Order Value"
              value={formatCurrency(kpis.aov)}
              change={kpis.aovChange}
              icon="💳"
            />
            <KPICard
              title="Refund Rate"
              value={`${kpis.refundRate.toFixed(1)}%`}
              change={kpis.refundRateChange}
              icon="↩️"
              isPercentage
            />
          </div>

          <div className="charts-grid">
            <div className="chart-full">
              <RevenueChart data={revenueOverTime} />
            </div>
            <CategoryChart data={revenueByRegion} />
            <StatusChart data={ordersByStatus} />
            <TopProductsChart data={topProducts} />
          </div>

          <OrdersTable
            orders={paginatedItems}
            currentPage={currentPage}
            totalPages={totalPages}
            onNextPage={nextPage}
            onPrevPage={prevPage}
            hasNextPage={hasNextPage}
            hasPrevPage={hasPrevPage}
          />
        </>
      )}
    </div>
  );
};
