import type { DateRange } from '../types';

export const getPresetDateRange = (preset: '7d' | '30d' | '90d' | '180d'): DateRange => {
  const end = new Date();
  const start = new Date();

  switch (preset) {
    case '7d':
      start.setDate(end.getDate() - 7);
      break;
    case '30d':
      start.setDate(end.getDate() - 30);
      break;
    case '90d':
      start.setDate(end.getDate() - 90);
      break;
    case '180d':
      start.setDate(end.getDate() - 180);
      break;
  }

  return { start, end, preset };
};

export const getPreviousPeriod = (dateRange: DateRange): DateRange => {
  const duration = dateRange.end.getTime() - dateRange.start.getTime();
  const start = new Date(dateRange.start.getTime() - duration);
  const end = new Date(dateRange.start.getTime());
  return { start, end };
};

export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};
