// components/dashboard/MonthlyServiceStats.tsx
import React from 'react';

const MonthlyServiceStats: React.FC = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Monthly Service Category Stats</h3>
        <span className="text-gray-500">No data</span>
      </div>
      <div className="text-center text-gray-500 py-8">No Data Available</div>
    </div>
  );
};

export default MonthlyServiceStats;