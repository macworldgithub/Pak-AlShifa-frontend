import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { FaArrowUp } from "react-icons/fa";

const data = [
  { month: "Jan", new: 120, existing: 250 },
  { month: "Feb", new: 750, existing: 380 },
  { month: "Mar", new: 330, existing: 540 },
  { month: "Apr", new: 520, existing: 420 },
  { month: "May", new: 340, existing: 500 },
  { month: "Jun", new: 510, existing: 650 },
  { month: "Jul", new: 320, existing: 450 },
  { month: "Aug", new: 600, existing: 580 },
  { month: "Sep", new: 310, existing: 200 },
  { month: "Oct", new: 380, existing: 430 },
  { month: "Nov", new: 580, existing: 350 },
  { month: "Dec", new: 470, existing: 330 },
];

const PatientOverviewChart: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 mb-6">
      {/* Title */}
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        Patient Overview
      </h3>

      {/* Total Patient Section */}
      <p className="text-gray-500 text-sm">Total Patient</p>

      <div className="flex items-center gap-3 mt-1 mb-4">
        <h2 className="text-4xl font-bold text-gray-900">803</h2>

        <div className="flex items-center text-green-600 text-sm font-medium">
          <FaArrowUp className="mr-1" />
          14 Patients
        </div>
      </div>

      {/* Chart */}
      <div className="w-full h-[330px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barGap={8}>
            <CartesianGrid stroke="#f0f0f0" vertical={false} />
            <XAxis dataKey="month" tick={{ fill: "#7B7B7B" }} />
            <YAxis tick={{ fill: "#7B7B7B" }} />
            <Tooltip />

            <Legend
              verticalAlign="top"
              align="right"
              wrapperStyle={{ marginTop: -10 }}
            />

            {/* Green Bars */}
            <Bar
              dataKey="new"
              name="New Patients"
              fill="#67A95F"
              radius={[6, 6, 0, 0]}
              barSize={28}
            />

            {/* Dark Blue Bars */}
            <Bar
              dataKey="existing"
              name="Existing Patients"
              fill="#202858"
              radius={[6, 6, 0, 0]}
              barSize={28}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PatientOverviewChart;
