// pages/dashboard.tsx (or app/dashboard/page.tsx for App Router)
"use client";
import React from "react";
import TopCards from "../../components/dashboard/TopCards";
import PatientOverviewChart from "../../components/dashboard/PatientOverviewChart";
import StatusCards from "../../components/dashboard/StatusCards";
import {
  DepartmentsChart,
  DiagnosisChart,
  MedicinesChart,
} from "../../components/dashboard/DepartmentChart";
import DiagnosisCodesChart from "../../components/dashboard/DiagnosisCodesChart";
import MonthlyServiceStats from "../../components/dashboard/MonthlyServiceStats";

const Dashboard: React.FC = () => {
  // Dynamic data can be fetched here, e.g., useEffect with API calls
  // For now, using mock data in components

  return (
    // <div className="p-6 bg-gray-50 min-h-screen">
    <div className="">
      <TopCards />
      <PatientOverviewChart />
      <StatusCards />
      {/* <DepartmentsChart /> */}
      <DiagnosisChart />
      <MedicinesChart />
      {/* <MonthlyServiceStats /> */}
      <DiagnosisCodesChart />
    </div>
    // </div>
  );
};

export default Dashboard;
