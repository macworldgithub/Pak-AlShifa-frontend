// components/dashboard/StatusCards.tsx
import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const sparkData = [
  { x: 1, y: 78 },
  { x: 2, y: 80 },
  { x: 3, y: 75 },
  { x: 4, y: 82 },
  { x: 5, y: 78 },
];

const StatusCard: React.FC<{ title: string; value: number; change: string; color: string }> = ({ title, value, change, color }) => (
  <div className="flex-1 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
    <div className="flex justify-between items-start mb-2">
      <h4 className="text-sm font-medium text-gray-600">{title}</h4>
      <p className={`text-xs font-semibold ${change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>{change}</p>
    </div>
    <div className="flex justify-between items-center">
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      <div className="w-20 h-10">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={sparkData}>
            <Line type="monotone" dataKey="y" stroke={color} strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  </div>
);

const StatusCards: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <StatusCard title="Waiting" value={78} change="+5.2%" color="#10B981" />
      <StatusCard title="Nursing Done" value={25} change="+10%" color="#3B82F6" />
      <StatusCard title="Dr. Done" value={174} change="+17%" color="#8B5CF6" />
      <StatusCard title="Billed" value={149} change="+25%" color="#EF4444" />
    </div>
  );
};

export default StatusCards;