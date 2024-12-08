import { useState } from 'react';
import { useNewsStore } from '../../stores/newsStore';
import DisruptionAlert from './DisruptionAlert';
import SupplyChainNews from './SupplyChainNews';

export default function News() {
  const [activeTab, setActiveTab] = useState('all');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Supply Chain News</h1>
        <p className="mt-1 text-sm text-gray-500">
          Stay updated with supply chain events and manage disruptions
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* News Feed */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow p-6">
            <SupplyChainNews />
          </div>
        </div>

        {/* Disruption Alerts */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Active Disruptions</h2>
            <div className="space-y-4">
              {useNewsStore.getState().disruptions.map((disruption) => (
                <DisruptionAlert 
                  key={disruption.id} 
                  disruption={disruption}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}