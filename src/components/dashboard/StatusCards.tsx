import React from "react";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const sparkData = [
  { x: 1, y: 78 },
  { x: 2, y: 80 },
  { x: 9, y: 75 },
  { x: 4, y: 82 },
  { x: 5, y: 78 },
];

const StatusCard: React.FC<{
  title: string;
  value: number;
  change: string;
  lineColor: string;
}> = ({ title, value, change, lineColor }) => (
  <div className="flex flex-col bg-white p-4 rounded-xl shadow-sm border border-gray-200">
    <div className="flex justify-between items-start mb-2">
      <h4 className="text-sm font-medium text-gray-600">{title}</h4>

      <p
        className={`text-xs font-semibold flex items-center gap-1 ${
          change.startsWith("+") ? "text-green-600" : "text-red-600"
        }`}
      >
        {change} ↑
      </p>
    </div>

    <p className="text-3xl font-bold text-gray-900">{value}</p>

    {/* Sparkline Chart */}
    <div className="h-14 mt-2">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={sparkData}>
          <defs>
            <linearGradient
              id={`colorFill${title}`}
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop offset="0%" stopColor={lineColor} stopOpacity={0.4} />
              <stop offset="100%" stopColor={lineColor} stopOpacity={0.05} />
            </linearGradient>
          </defs>

          <Area
            type="monotone"
            dataKey="y"
            stroke={lineColor}
            strokeWidth={2}
            fill={`url(#colorFill${title})`}
          />

          {/* Hide Axes & Grid */}
          {/* @ts-ignore */}
          <XAxis dataKey="x" hide />
          {/* @ts-ignore */}
          <YAxis hide />
          {/* hide tooltip */}
          {/* @ts-ignore */}
          <Tooltip content={() => null} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  </div>
);

const StatusCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <StatusCard
        title="Waiting"
        value={78}
        change="+5.2%"
        lineColor="#0085ff"
      />
      <StatusCard
        title="Nursing Done"
        value={25}
        change="+10%"
        lineColor="#0085ff"
      />
      <StatusCard
        title="Dr. Done"
        value={174}
        change="+17%"
        lineColor="#0085ff"
      />
      <StatusCard
        title="Billed"
        value={149}
        change="+25%"
        lineColor="#0085ff"
      />
    </div>
  );
};

export default StatusCards;
