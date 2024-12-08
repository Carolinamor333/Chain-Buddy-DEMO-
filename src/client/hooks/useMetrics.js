import { useState, useEffect } from 'react';
import { memoize } from '../utils/performance';

const calculateMetrics = memoize((data) => {
  return {
    totalOrders: data.reduce((sum, item) => sum + item.orders, 0),
    averageFulfillment: data.reduce((sum, item) => sum + item.fulfillment, 0) / data.length,
    lowStockItems: data.filter(item => item.stock < item.reorderPoint).length,
    delayedShipments: data.filter(item => item.status === 'delayed').length
  };
});

export function useMetrics(data) {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (data) {
      const calculatedMetrics = calculateMetrics(data);
      setMetrics(calculatedMetrics);
      setLoading(false);
    }
  }, [data]);

  return { metrics, loading };
}