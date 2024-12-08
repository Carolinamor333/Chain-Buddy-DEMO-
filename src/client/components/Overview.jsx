import { 
  ShoppingCartIcon,
  TruckIcon,
  CubeIcon,
  ClockIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  Legend
} from 'recharts';
import { format } from 'date-fns';

const metrics = [
  {
    title: 'Total Orders',
    value: '2,345',
    change: '+12.3%',
    changeType: 'increase',
    icon: ShoppingCartIcon
  },
  {
    title: 'Fulfillment Rate',
    value: '94.5%',
    change: '+2.4%',
    changeType: 'increase',
    icon: TruckIcon
  },
  {
    title: 'Low Stock Items',
    value: '12',
    change: '-3',
    changeType: 'decrease',
    icon: CubeIcon
  },
  {
    title: 'Delayed Shipments',
    value: '3',
    change: '+1',
    changeType: 'increase',
    icon: ClockIcon,
    alert: true
  }
];

const demandData = [
  { date: '2023-12-01', actual: 4000, forecast: 4400 },
  { date: '2023-12-02', actual: 3000, forecast: 3200 },
  { date: '2023-12-03', actual: 2000, forecast: 2400 },
  { date: '2023-12-04', actual: 2780, forecast: 2900 },
  { date: '2023-12-05', actual: 1890, forecast: 2100 },
  { date: '2023-12-06', actual: 2390, forecast: 2500 },
  { date: '2023-12-07', actual: 3490, forecast: 3200 }
];

const activities = [
  {
    id: 1,
    type: 'shipped',
    message: 'Order #12345 shipped to Warehouse A',
    timestamp: '2:30 PM',
    icon: TruckIcon,
    iconBackground: 'bg-blue-100',
    iconColor: 'text-blue-600'
  },
  {
    id: 2,
    type: 'delayed',
    message: 'Shipment #5678 delayed by 2 days',
    timestamp: '1:45 PM',
    icon: ExclamationTriangleIcon,
    iconBackground: 'bg-red-100',
    iconColor: 'text-red-600'
  },
  {
    id: 3,
    type: 'delivered',
    message: 'Order #9012 delivered successfully',
    timestamp: '11:30 AM',
    icon: TruckIcon,
    iconBackground: 'bg-green-100',
    iconColor: 'text-green-600'
  }
];

export default function Overview() {
  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Supply Chain Overview</h1>
        <p className="mt-1 text-sm text-gray-500">
          Monitor your supply chain performance and key metrics in real-time
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => (
          <div 
            key={metric.title} 
            className={`bg-white rounded-lg shadow p-6 ${
              metric.alert ? 'border-l-4 border-red-500' : ''
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className={`p-2 rounded-lg ${
                  metric.alert ? 'bg-red-100' : 'bg-blue-100'
                }`}>
                  <metric.icon className={`h-6 w-6 ${
                    metric.alert ? 'text-red-600' : 'text-blue-600'
                  }`} />
                </div>
                <h3 className="ml-3 text-sm font-medium text-gray-900">{metric.title}</h3>
              </div>
              <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium ${
                metric.changeType === 'increase' 
                  ? metric.alert ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                  : 'bg-green-100 text-green-800'
              }`}>
                {metric.changeType === 'increase' ? (
                  <ArrowUpIcon className="h-4 w-4 mr-1" />
                ) : (
                  <ArrowDownIcon className="h-4 w-4 mr-1" />
                )}
                {metric.change}
              </div>
            </div>
            <p className="mt-4 text-3xl font-semibold text-gray-900">{metric.value}</p>
          </div>
        ))}
      </div>

      {/* Charts and Activity Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Demand Chart */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Demand vs Forecast</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={demandData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="date" 
                    tickFormatter={(date) => format(new Date(date), 'MMM d')}
                  />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="actual" 
                    stroke="#4F46E5" 
                    name="Actual Demand"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="forecast" 
                    stroke="#10B981" 
                    name="Forecast" 
                    strokeDasharray="5 5"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
          </div>
          <div className="p-6">
            <div className="flow-root">
              <ul className="-mb-8">
                {activities.map((activity, activityIdx) => (
                  <li key={activity.id}>
                    <div className="relative pb-8">
                      {activityIdx !== activities.length - 1 ? (
                        <span
                          className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                          aria-hidden="true"
                        />
                      ) : null}
                      <div className="relative flex space-x-3">
                        <div>
                          <span className={`h-8 w-8 rounded-full ${activity.iconBackground} flex items-center justify-center ring-8 ring-white`}>
                            <activity.icon className={`h-5 w-5 ${activity.iconColor}`} aria-hidden="true" />
                          </span>
                        </div>
                        <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                          <div>
                            <p className="text-sm text-gray-500">{activity.message}</p>
                          </div>
                          <div className="text-right text-sm whitespace-nowrap text-gray-500">
                            {activity.timestamp}
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}