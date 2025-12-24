// components/dashboard/DepartmentChart.tsx
import React, { useState, useEffect } from "react";
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
import { BACKEND_URL } from "@/config";

interface ChartData {
  category: string;
  value: number;
}

const fallbackData: ChartData[] = [
  { category: "Paracetamol", value: 220 },
  { category: "Amoxicillin", value: 180 },
  { category: "Ibuprofen", value: 150 },
  { category: "Metformin", value: 120 },
  { category: "Aspirin", value: 100 },
];

const colors = ["#0085ff", "#48c8ff", "#aee8f7", "#202858", "#67a95f"];

type ChartType = "departments" | "diagnosis" | "medicines";

interface DepartmentChartProps {
  title: string;
  chartType: ChartType;
}

const DepartmentChart: React.FC<DepartmentChartProps> = ({
  title,
  chartType,
}) => {
  const [data, setData] = useState<ChartData[]>(fallbackData);
  const [loading, setLoading] = useState(chartType !== "departments");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (chartType === "departments") {
      setData(fallbackData);
      return;
    }

    const fetchData = async () => {
      try {
        const token = localStorage.getItem("access_token");
        if (!token) {
          throw new Error("Please login first.");
        }

        const endpoint =
          chartType === "diagnosis" ? "/diagnoses/common" : "/medicines/common";

        const response = await fetch(`${BACKEND_URL}${endpoint}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch ${title.toLowerCase()} data`);
        }

        const apiData = await response.json();

        let processedData: ChartData[];

        if (chartType === "diagnosis") {
          processedData = apiData.map(
            (item: { code: string; value: number }) => ({
              category: item.code,
              value: Number(item.value),
            })
          );
        } else {
          // medicines
          processedData = apiData.map(
            (item: { name: string; value: number }) => ({
              category: item.name,
              value: Number(item.value),
            })
          );
        }

        setData(processedData.length > 0 ? processedData : fallbackData);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        setData(fallbackData);
        setLoading(false);
      }
    };

    fetchData();
  }, [chartType, title]);

  if (loading) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <span className="text-gray-500">•••</span>
        </div>
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">Loading...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <span className="text-gray-500">•••</span>
        </div>
        <div className="flex items-center justify-center h-64">
          <div className="text-red-600">Error: {error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <span className="text-gray-500">•••</span>
      </div>

      {/* Only show legend for static Departments chart */}
      {chartType === "departments" && (
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
      )}

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
          <YAxis
            dataKey="category"
            type="category"
            tick={{ fontSize: 12 }}
            width={120}
          />
          <Tooltip formatter={(value: number) => [`${value}`, "Count"]} />
          <Bar dataKey="value" radius={[0, 5, 5, 0]}>
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

// Exported components
export const DepartmentsChart: React.FC = () => (
  <DepartmentChart title="Departments" chartType="departments" />
);

export const DiagnosisChart: React.FC = () => (
  <DepartmentChart title="Diagnosis" chartType="diagnosis" />
);

export const MedicinesChart: React.FC = () => (
  <DepartmentChart title="Medicines" chartType="medicines" />
);
