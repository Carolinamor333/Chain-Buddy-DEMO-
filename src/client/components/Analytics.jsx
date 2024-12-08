import { useState } from 'react';
import AnalyticsLayout from './analytics/AnalyticsLayout';
import CarbonFootprint from './analytics/CarbonFootprint';

export default function Analytics() {
  const [timeRange, setTimeRange] = useState('month');
  const [category, setCategory] = useState('all');

  return (
    <div className="space-y-6">
      <AnalyticsLayout 
        timeRange={timeRange} 
        setTimeRange={setTimeRange}
        category={category}
        setCategory={setCategory}
      />
      <CarbonFootprint />
    </div>
  );
}