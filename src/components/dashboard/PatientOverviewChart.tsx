import React, { useState, useEffect } from "react";
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
import { BACKEND_URL } from "@/config";

interface Patient {
  _id: string;
  createdAt: string;
}

interface ChartData {
  month: string;
  new: number;
  existing: number;
}

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const API_ENDPOINT = `${BACKEND_URL}/patients`;

const PatientOverviewChart: React.FC = () => {
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [totalPatients, setTotalPatients] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const token = localStorage.getItem("access_token");

        if (!token) {
          setError("Authentication token not found. Please log in again.");
          setLoading(false);
          return;
        }

        const response = await fetch(API_ENDPOINT, {
          method: "GET",
          headers: {
            accept: "*/*",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 401) {
          setError("Session expired. Please log in again.");
          localStorage.removeItem("access_token");
          setLoading(false);
          return;
        }

        if (!response.ok && response.status !== 304) {
          throw new Error(`Failed to fetch patients: ${response.status}`);
        }

        const patients: Patient[] = await response.json();

        setTotalPatients(patients.length);
        const monthlyNewCounts = new Array(12).fill(0);

        patients.forEach((patient) => {
          const createdDate = new Date(patient.createdAt);
          const year = createdDate.getUTCFullYear();
          const monthIndex = createdDate.getUTCMonth();

          if (year === 2025) {
            monthlyNewCounts[monthIndex]++;
          }
        });

        const data: ChartData[] = [];
        let cumulativeExisting = 0;

        for (let i = 0; i < 12; i++) {
          data.push({
            month: monthNames[i],
            new: monthlyNewCounts[i],
            existing: cumulativeExisting,
          });
          cumulativeExisting += monthlyNewCounts[i];
        }

        setChartData(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching patients:", err);
        setError(
          err instanceof Error ? err.message : "Failed to load patient data"
        );
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 mb-6">
        <p className="text-gray-600">Loading patient data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 mb-6">
        <div className="text-red-600 text-sm">{error}</div>
        {error.includes("log in") && (
          <button
            onClick={() => (window.location.href = "/login")}
            className="mt-4 px-4 py-2 bg-[#1F2858] text-white rounded-md hover:bg-[#162248]"
          >
            Go to Login
          </button>
        )}
      </div>
    );
  }

  const increase = "+14 Patients";

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 mb-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        Patient Overview
      </h3>

      <p className="text-gray-500 text-sm">Total Patients</p>

      <div className="flex items-center gap-3 mt-1 mb-4">
        <h2 className="text-4xl font-bold text-gray-900">{totalPatients}</h2>
        <div className="flex items-center text-green-600 text-sm font-medium">
          <FaArrowUp className="mr-1" />
          {increase}
        </div>
      </div>

      <div className="w-full h-[330px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} barGap={8}>
            <CartesianGrid stroke="#f0f0f0" vertical={false} />
            <XAxis dataKey="month" tick={{ fill: "#7B7B7B" }} />
            <YAxis tick={{ fill: "#7B7B7B" }} />
            <Tooltip />
            <Legend
              verticalAlign="top"
              align="right"
              wrapperStyle={{ marginTop: -10 }}
            />
            <Bar
              dataKey="new"
              name="New Patients"
              fill="#67A95F"
              radius={[6, 6, 0, 0]}
              barSize={28}
            />
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