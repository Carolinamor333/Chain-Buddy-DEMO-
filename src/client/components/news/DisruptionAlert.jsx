import { useState } from 'react';
import { ExclamationTriangleIcon, XMarkIcon } from '@heroicons/react/24/outline';

export default function DisruptionAlert({ disruption, onDismiss }) {
  const [showAlternatives, setShowAlternatives] = useState(false);

  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
      <div className="flex items-start justify-between">
        <div className="flex items-start">
          <ExclamationTriangleIcon className="h-5 w-5 text-red-600 mt-0.5" />
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">{disruption.description}</h3>
            
            {disruption.alternatives && (
              <div className="mt-2">
                <button
                  onClick={() => setShowAlternatives(!showAlternatives)}
                  className="text-sm text-red-700 hover:text-red-800"
                >
                  {showAlternatives ? 'Hide' : 'Show'} alternative solutions
                </button>
                
                {showAlternatives && (
                  <div className="mt-2 space-y-2">
                    {disruption.alternatives.map((alt, index) => (
                      <div key={index} className="bg-white bg-opacity-50 rounded p-2 text-sm">
                        <div className="font-medium text-red-800">
                          {alt.route || alt.supplier}
                        </div>
                        <div className="text-red-700 mt-1">
                          {alt.additionalTime && (
                            <span className="mr-3">
                              Extra time: {alt.additionalTime}
                            </span>
                          )}
                          {alt.additionalCost && (
                            <span>Cost impact: {alt.additionalCost}</span>
                          )}
                          {alt.leadTime && (
                            <span>Lead time: {alt.leadTime}</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="ml-4 text-red-500 hover:text-red-700"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  );
}