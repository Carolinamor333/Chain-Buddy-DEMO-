import { format } from 'date-fns';

export function formatMetric(value, type) {
  switch (type) {
    case 'currency':
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0
      }).format(value);
    case 'percentage':
      return `${value.toFixed(1)}%`;
    case 'number':
      return new Intl.NumberFormat('en-US').format(value);
    case 'date':
      return format(new Date(value), 'MMM d, yyyy');
    default:
      return value;
  }
}

export function calculateTrend(current, previous) {
  if (!previous) return { value: 0, type: 'neutral' };
  const change = ((current - previous) / previous) * 100;
  return {
    value: Math.abs(change).toFixed(1),
    type: change >= 0 ? 'increase' : 'decrease'
  };
}

export function aggregateData(data, timeRange) {
  if (!data?.length) return [];
  
  const now = new Date();
  const periods = {
    day: 24,
    week: 7,
    month: 30,
    quarter: 90
  };

  return data
    .filter(item => {
      const itemDate = new Date(item.date);
      const hoursDiff = (now - itemDate) / (1000 * 60 * 60);
      return hoursDiff <= periods[timeRange];
    })
    .reduce((acc, item) => {
      const key = format(new Date(item.date), 'MMM d');
      if (!acc[key]) {
        acc[key] = { date: key, value: 0 };
      }
      acc[key].value += item.value;
      return acc;
    }, {});
}

export function calculatePerformanceScore(metrics) {
  const weights = {
    fulfillmentRate: 0.3,
    onTimeDelivery: 0.3,
    stockAccuracy: 0.2,
    costEfficiency: 0.2
  };

  return Object.entries(metrics).reduce((score, [key, value]) => {
    return score + (value * (weights[key] || 0));
  }, 0);
}