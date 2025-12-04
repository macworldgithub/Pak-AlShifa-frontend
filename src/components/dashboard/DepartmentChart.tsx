// components/dashboard/DepartmentChart.tsx
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  ResponsiveContainer,
} from "recharts";

const data = [
  { category: "Consultations", value: 100 },
  { category: "General procedures", value: 220 },
  { category: "Drug", value: 180 },
  { category: "Consultations", value: 240 },
  { category: "General procedures", value: 250 },
];

const colors = ["#0085ff", "#48c8ff", "#aee8f7", "#202858", "#67a95f"];

const DepartmentChart: React.FC<{ title: string }> = ({ title }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6 ">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <span className="text-gray-500">•••</span>
      </div>
      <div className="flex justify-around space-x-6 mb-4 overflow-x-auto">
        <div className="flex items-center min-w-max">
          <div className="w-3 h-3 bg-[#0085ff] rounded mr-2"></div>
          <span className="text-sm text-gray-600">Consultation</span>
        </div>
        <div className="flex items-center min-w-max">
          <div className="w-3 h-3 bg-[#48c8ff] rounded mr-2"></div>
          <span className="text-sm text-gray-600">General Procedures</span>
        </div>
        <div className="flex items-center min-w-max">
          <div className="w-3 h-3 bg-[#aee8f7] rounded mr-2"></div>
          <span className="text-sm text-gray-600">Drug</span>
        </div>
        <div className="flex items-center min-w-max">
          <div className="w-3 h-3 bg-[#202858] rounded mr-2"></div>
          <span className="text-sm text-gray-600">Consultation</span>
        </div>
        <div className="flex items-center min-w-max">
          <div className="w-3 h-3 bg-[#67a95f] rounded mr-2"></div>
          <span className="text-sm text-gray-600">General Procedures</span>
        </div>
      </div>
      <ResponsiveContainer width="90%" height={230}>
        <BarChart
          layout="vertical"
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            horizontal={true}
            vertical={false}
          />
          <XAxis type="number" allowDecimals={false} />
          <YAxis dataKey="category" type="category" tick={false} />
          <Tooltip />
          <Bar dataKey="value" radius={[0, 5, 5, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

const DepartmentsChart: React.FC = () => (
  <DepartmentChart title="Departments" />
);
const DiagnosisChart: React.FC = () => <DepartmentChart title="Diagnosis" />;
const MedicinesChart: React.FC = () => <DepartmentChart title="Medicines" />;

export { DepartmentsChart, DiagnosisChart, MedicinesChart };
