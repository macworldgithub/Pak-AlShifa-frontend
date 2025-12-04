import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { code: "J09", value: 50 },
  { code: "J22", value: 40 },
  { code: "R13", value: 60 },
  { code: "J29", value: 30 },
  { code: "M28", value: 70 },
  { code: "K20", value: 20 },
  { code: "N30", value: 80 },
];

const DiagnosisCodesChart: React.FC = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Diagnosis Codes</h3>
        <span className="text-gray-500">•••</span>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="code" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#18a0fb"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DiagnosisCodesChart;
