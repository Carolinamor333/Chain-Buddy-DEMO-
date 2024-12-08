import { useState, useEffect } from 'react';
import { ExclamationTriangleIcon, NewspaperIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import { format } from 'date-fns';
import { useNewsStore } from '../../stores/newsStore';

export default function SupplyChainNews() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { news, disruptions, loading, fetchNews } = useNewsStore();

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  const categories = [
    { id: 'all', name: 'All News' },
    { id: 'disruptions', name: 'Disruptions' },
    { id: 'market', name: 'Market Updates' },
    { id: 'technology', name: 'Technology' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Supply Chain News</h2>
          <p className="text-sm text-gray-500">Stay updated with latest supply chain events</p>
        </div>
        <button
          onClick={() => fetchNews()}
          className="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-gray-900"
        >
          <ArrowPathIcon className="h-4 w-4 mr-1" />
          Refresh
        </button>
      </div>

      {/* Category Filters */}
      <div className="flex space-x-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-3 py-1.5 text-sm font-medium rounded-full ${
              selectedCategory === category.id
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Active Disruptions */}
      {disruptions.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-start">
            <ExclamationTriangleIcon className="h-5 w-5 text-red-600 mt-0.5" />
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Active Supply Chain Disruptions</h3>
              <div className="mt-2 space-y-2">
                {disruptions.map((disruption) => (
                  <div key={disruption.id} className="text-sm text-red-700">
                    • {disruption.description}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* News Feed */}
      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-8">
            <ArrowPathIcon className="h-8 w-8 text-gray-400 animate-spin mx-auto" />
            <p className="mt-2 text-sm text-gray-500">Loading news...</p>
          </div>
        ) : (
          news.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <NewspaperIcon className="h-6 w-6 text-gray-400" />
                </div>
                <div className="ml-3">
                  <h4 className="text-sm font-medium text-gray-900">{item.title}</h4>
                  <p className="mt-1 text-sm text-gray-500">{item.summary}</p>
                  <div className="mt-2 flex items-center text-xs text-gray-500">
                    <span>{format(new Date(item.date), 'MMM d, yyyy')}</span>
                    <span className="mx-1">•</span>
                    <span className="capitalize">{item.category}</span>
                    {item.impact && (
                      <>
                        <span className="mx-1">•</span>
                        <span className={`px-1.5 py-0.5 rounded-full text-xs font-medium ${
                          item.impact === 'high'
                            ? 'bg-red-100 text-red-800'
                            : item.impact === 'medium'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {item.impact.toUpperCase()} Impact
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}