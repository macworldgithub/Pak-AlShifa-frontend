// components/dashboard/DepartmentChart.tsx
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { category: 'Consultation', consultation: 200, general: 150, drug: 100 },
  { category: 'General Procedures', consultation: 180, general: 200, drug: 120 },
  { category: 'Drug', consultation: 160, general: 140, drug: 200 },
];

const DepartmentChart: React.FC<{ title: string }> = ({ title }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <span className="text-gray-500">•••</span>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="consultation" fill="#3B82F6" />
          <Bar dataKey="general" fill="#10B981" />
          <Bar dataKey="drug" fill="#F59E0B" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

const DepartmentsChart: React.FC = () => <DepartmentChart title="Departments" />;
const DiagnosisChart: React.FC = () => <DepartmentChart title="Diagnosis" />;
const MedicinesChart: React.FC = () => <DepartmentChart title="Medicines" />;

export { DepartmentsChart, DiagnosisChart, MedicinesChart };