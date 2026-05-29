import { useState } from 'react';
import type { Filters, DateRange } from '../types';
import { getPresetDateRange } from '../utils/dateHelpers';

export const useFilters = () => {
  const [filters, setFilters] = useState<Filters>({
    dateRange: getPresetDateRange('30d'),
    regions: [],
    categories: [],
    statuses: [],
    searchQuery: ''
  });

  const updateDateRange = (dateRange: DateRange) => {
    setFilters(prev => ({ ...prev, dateRange }));
  };

  const updateRegions = (regions: string[]) => {
    setFilters(prev => ({ ...prev, regions }));
  };

  const updateCategories = (categories: string[]) => {
    setFilters(prev => ({ ...prev, categories }));
  };

  const updateStatuses = (statuses: string[]) => {
    setFilters(prev => ({ ...prev, statuses }));
  };

  const updateSearchQuery = (searchQuery: string) => {
    setFilters(prev => ({ ...prev, searchQuery }));
  };

  const clearFilters = () => {
    setFilters({
      dateRange: getPresetDateRange('30d'),
      regions: [],
      categories: [],
      statuses: [],
      searchQuery: ''
    });
  };

  return {
    filters,
    updateDateRange,
    updateRegions,
    updateCategories,
    updateStatuses,
    updateSearchQuery,
    clearFilters
  };
};
