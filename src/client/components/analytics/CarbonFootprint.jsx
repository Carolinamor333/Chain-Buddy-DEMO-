import { useState } from 'react';
import { 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import { 
  BeakerIcon, 
  TruckIcon, 
  BuildingOfficeIcon 
} from '@heroicons/react/24/outline';

const metrics = [
  {
    id: 'transportation',
    name: 'Transportation',
    value: 28.5,
    change: '-12.3%',
    icon: TruckIcon,
    details: 'CO2 emissions from logistics',
    color: '#3B82F6'
  },
  {
    id: 'warehousing',
    name: 'Warehousing',
    value: 15.2,
    change: '-8.7%',
    icon: BuildingOfficeIcon,
    details: 'Energy consumption in facilities',
    color: '#10B981'
  },
  {
    id: 'packaging',
    name: 'Packaging',
    value: 8.4,
    change: '-5.2%',
    icon: BeakerIcon,
    details: 'Material usage and waste',
    color: '#6366F1'
  }
];

const recommendations = [
  'Switch to electric vehicles for local deliveries',
  'Implement solar panels in warehouses',
  'Use recycled packaging materials',
  'Optimize delivery routes to reduce emissions'
];

const monthlyData = [
  { month: 'Jan', emissions: 52.1 },
  { month: 'Feb', emissions: 48.3 },
  { month: 'Mar', emissions: 45.2 },
  { month: 'Apr', emissions: 43.1 },
  { month: 'May', emissions: 41.8 },
  { month: 'Jun', emissions: 39.5 }
];

export default function CarbonFootprint() {
  const [selectedMetric, setSelectedMetric] = useState('transportation');
  const totalEmissions = metrics.reduce((sum, m) => sum + m.value, 0);
  const maxEmissions = 100; // Maximum possible emissions
  const score = 100 - (totalEmissions / maxEmissions) * 100;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Carbon Footprint</h2>
          <p className="text-sm text-gray-500">Monitor and reduce environmental impact</p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">Sustainability Score:</span>
          <span className={`text-lg font-semibold ${
            score >= 70 ? 'text-green-600' : score >= 40 ? 'text-yellow-600' : 'text-red-600'
          }`}>
            {score.toFixed(1)}%
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Metrics and Charts */}
        <div className="lg:col-span-2 space-y-6">
          {/* Metrics Grid */}
          <div className="grid grid-cols-3 gap-4">
            {metrics.map((metric) => (
              <button
                key={metric.id}
                onClick={() => setSelectedMetric(metric.id)}
                className={`p-4 rounded-lg border transition-colors ${
                  selectedMetric === metric.id
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <metric.icon className={`h-6 w-6 ${
                    selectedMetric === metric.id ? 'text-green-600' : 'text-gray-400'
                  }`} />
                  <span className="text-green-600 text-sm font-medium">{metric.change}</span>
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-gray-900">{metric.name}</p>
                  <p className="text-2xl font-semibold text-gray-900 mt-1">
                    {metric.value}
                    <span className="text-sm text-gray-500 ml-1">tCO2e</span>
                  </p>
                </div>
              </button>
            ))}
          </div>

          {/* Emissions Distribution Chart */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-900 mb-4">Emissions Distribution</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={metrics}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                  >
                    {metrics.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Monthly Trends */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-900 mb-4">Monthly Emissions Trend</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="emissions" fill="#10B981" name="Total Emissions (tCO2e)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="space-y-6">
          <div className="bg-green-50 rounded-lg p-4">
            <h3 className="text-sm font-medium text-green-800 mb-3">
              Sustainability Recommendations
            </h3>
            <ul className="space-y-2">
              {recommendations.map((recommendation, index) => (
                <li key={index} className="flex items-start">
                  <BeakerIcon className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-green-700">{recommendation}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Selected Metric Details */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-900 mb-2">
              {metrics.find(m => m.id === selectedMetric)?.name} Details
            </h3>
            <p className="text-sm text-gray-600">
              {metrics.find(m => m.id === selectedMetric)?.details}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}