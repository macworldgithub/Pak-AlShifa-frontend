// import React from "react";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";

// const data = [
//   { code: "J09", value: 50 },
//   { code: "J22", value: 40 },
//   { code: "R13", value: 60 },
//   { code: "J29", value: 30 },
//   { code: "M28", value: 70 },
//   { code: "K20", value: 20 },
//   { code: "N30", value: 80 },
// ];

// const DiagnosisCodesChart: React.FC = () => {
//   return (
//     <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
//       <div className="flex justify-between items-center mb-4">
//         <h3 className="text-lg font-semibold text-gray-900">Diagnosis Codes</h3>
//         <span className="text-gray-500">•••</span>
//       </div>
//       <ResponsiveContainer width="100%" height={300}>
//         <LineChart data={data}>
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="code" />
//           <YAxis />
//           <Tooltip />
//           <Line
//             type="monotone"
//             dataKey="value"
//             stroke="#18a0fb"
//             strokeWidth={2}
//           />
//         </LineChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default DiagnosisCodesChart;
import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { BACKEND_URL } from "@/config";

interface DiagnosisData {
  code: string;
  value: number;
}

const truncateText = (text: string, maxLength: number = 15): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
};

const DiagnosisCodesChart: React.FC = () => {
  const [data, setData] = useState<DiagnosisData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("access_token");
        if (!token) {
          throw new Error("Please login first.");
        }

        const response = await fetch(`${BACKEND_URL}/diagnoses/common`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch common diagnoses");
        }

        const commonData: DiagnosisData[] = await response.json();

        const processedData = commonData.map((item) => ({
          code: item.code,
          value: Number(item.value),
        }));

        setData(processedData);
        setLoading(false);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unexpected error occurred");
        }
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">Loading...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-red-600">Error: {error}</div>
        </div>
      </div>
    );
  }

  const values = data.map((d) => d.value);
  const maxValue = Math.max(...values, 1);
  const yDomainMax = Math.ceil(maxValue / 5) * 5;

  const chartHeight = isMobile ? 250 : 300;
  const truncateLength = isMobile ? 15 : 30;

  return (
    <div className="bg-white p-3 sm:p-4 md:p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900">
          Diagnosis Codes
        </h3>
        <span className="text-gray-500">•••</span>
      </div>
      <div className="w-full overflow-x-auto">
        <ResponsiveContainer width="100%" height={chartHeight} minWidth={300}>
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: isMobile ? 10 : 30,
              left: isMobile ? 0 : 20,
              bottom: isMobile ? 40 : 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="code"
              tick={{ fontSize: isMobile ? 10 : 12 }}
              angle={isMobile ? -45 : 0}
              textAnchor={isMobile ? "end" : "middle"}
              height={isMobile ? 60 : 30}
              tickFormatter={(value) => truncateText(value, truncateLength)}
            />
            <YAxis
              domain={[0, yDomainMax]}
              ticks={[
                0,
                ...Array.from(
                  { length: Math.floor(yDomainMax / 5) },
                  (_, i) => (i + 1) * 5
                ),
                yDomainMax,
              ]}
              tick={{ fontSize: isMobile ? 10 : 12 }}
              tickFormatter={(value) => Math.round(value).toString()}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #e5e7eb",
                borderRadius: "0.5rem",
                fontSize: isMobile ? "12px" : "14px",
              }}
              formatter={(value: number, name: string, props: any) => [
                Math.round(value),
                "Count",
              ]}
              labelFormatter={(label) => `Diagnosis: ${label}`}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#18a0fb"
              strokeWidth={isMobile ? 2 : 2.5}
              dot={{ fill: "#18a0fb", r: isMobile ? 3 : 4 }}
              activeDot={{ r: isMobile ? 5 : 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DiagnosisCodesChart;
