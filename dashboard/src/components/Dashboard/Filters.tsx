import { useState } from 'react';
import type { Filters as FiltersType } from '../../types';
import { formatDate } from '../../utils/dateHelpers';
import './Filters.css';

interface FiltersProps {
  filters: FiltersType;
  onDateRangeChange: (preset: '7d' | '30d' | '90d' | '180d') => void;
  onRegionsChange: (regions: string[]) => void;
  onCategoriesChange: (categories: string[]) => void;
  onStatusesChange: (statuses: string[]) => void;
  onSearchChange: (query: string) => void;
  onClearFilters: () => void;
}

const REGIONS = ['NA', 'EU', 'APAC', 'LATAM'];
const CATEGORIES = ['Electronics', 'Apparel', 'Home', 'Books'];
const STATUSES = ['pending', 'paid', 'refunded', 'cancelled'];

export const Filters = ({
  filters,
  onDateRangeChange,
  onRegionsChange,
  onCategoriesChange,
  onStatusesChange,
  onSearchChange,
  onClearFilters
}: FiltersProps) => {
  const [showRegions, setShowRegions] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [showStatuses, setShowStatuses] = useState(false);

  // Закрывать другие дропдауны при открытии нового
  const toggleRegionsDropdown = () => {
    setShowRegions(!showRegions);
    setShowCategories(false);
    setShowStatuses(false);
  };

  const toggleCategoriesDropdown = () => {
    setShowCategories(!showCategories);
    setShowRegions(false);
    setShowStatuses(false);
  };

  const toggleStatusesDropdown = () => {
    setShowStatuses(!showStatuses);
    setShowRegions(false);
    setShowCategories(false);
  };

  const toggleRegion = (region: string) => {
    const newRegions = filters.regions.includes(region)
      ? filters.regions.filter(r => r !== region)
      : [...filters.regions, region];
    onRegionsChange(newRegions);
  };

  const toggleCategory = (category: string) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter(c => c !== category)
      : [...filters.categories, category];
    onCategoriesChange(newCategories);
  };

  const toggleStatus = (status: string) => {
    const newStatuses = filters.statuses.includes(status)
      ? filters.statuses.filter(s => s !== status)
      : [...filters.statuses, status];
    onStatusesChange(newStatuses);
  };

  const hasActiveFilters = 
    filters.regions.length > 0 || 
    filters.categories.length > 0 || 
    filters.statuses.length > 0 ||
    filters.searchQuery.length > 0;

  return (
    <div className="filters-container">
      <div className="filters-row">
        {/* Date Range */}
        <div className="filter-group">
          <label className="filter-label">Date Range</label>
          <div className="date-buttons">
            {(['7d', '30d', '90d', '180d'] as const).map(preset => (
              <button
                key={preset}
                type="button"
                className={`date-btn ${filters.dateRange.preset === preset ? 'active' : ''}`}
                onClick={() => onDateRangeChange(preset)}
              >
                {preset === '7d' && '7 Days'}
                {preset === '30d' && '30 Days'}
                {preset === '90d' && '90 Days'}
                {preset === '180d' && '180 Days'}
              </button>
            ))}
          </div>
          <div className="date-range-display">
            {formatDate(filters.dateRange.start)} - {formatDate(filters.dateRange.end)}
          </div>
        </div>

        {/* Search */}
        <div className="filter-group search-group">
          <label className="filter-label">Search</label>
          <input
            type="text"
            className="search-input"
            placeholder="Order #, customer, product..."
            value={filters.searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>

      <div className="filters-row">
        {/* Region Filter */}
        <div className="filter-group">
          <label className="filter-label">Region</label>
          <div className="dropdown">
            <button
              type="button"
              className="dropdown-btn"
              onClick={toggleRegionsDropdown}
            >
              {filters.regions.length > 0 
                ? `${filters.regions.length} selected` 
                : 'All Regions'}
              <span className="dropdown-arrow">▼</span>
            </button>
            {showRegions && (
              <div className="dropdown-menu">
                {REGIONS.map(region => (
                  <label key={region} className="dropdown-item">
                    <input
                      type="checkbox"
                      checked={filters.regions.includes(region)}
                      onChange={() => toggleRegion(region)}
                    />
                    <span>{region}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Category Filter */}
        <div className="filter-group">
          <label className="filter-label">Category</label>
          <div className="dropdown">
            <button
              type="button"
              className="dropdown-btn"
              onClick={toggleCategoriesDropdown}
            >
              {filters.categories.length > 0 
                ? `${filters.categories.length} selected` 
                : 'All Categories'}
              <span className="dropdown-arrow">▼</span>
            </button>
            {showCategories && (
              <div className="dropdown-menu">
                {CATEGORIES.map(category => (
                  <label key={category} className="dropdown-item">
                    <input
                      type="checkbox"
                      checked={filters.categories.includes(category)}
                      onChange={() => toggleCategory(category)}
                    />
                    <span>{category}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Status Filter */}
        <div className="filter-group">
          <label className="filter-label">Status</label>
          <div className="dropdown">
            <button
              type="button"
              className="dropdown-btn"
              onClick={toggleStatusesDropdown}
            >
              {filters.statuses.length > 0 
                ? `${filters.statuses.length} selected` 
                : 'All Statuses'}
              <span className="dropdown-arrow">▼</span>
            </button>
            {showStatuses && (
              <div className="dropdown-menu">
                {STATUSES.map(status => (
                  <label key={status} className="dropdown-item">
                    <input
                      type="checkbox"
                      checked={filters.statuses.includes(status)}
                      onChange={() => toggleStatus(status)}
                    />
                    <span className="status-badge" data-status={status}>
                      {status}
                    </span>
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <button
            type="button"
            className="clear-filters-btn"
            onClick={onClearFilters}
          >
            Clear Filters
          </button>
        )}
      </div>
    </div>
  );
};
