"use client";
import { useEffect, useState } from "react";
interface TabsProps {
  activeTab: string;
  activeSubTab: string;
  setActiveTab: (tab: string) => void;
  setActiveSubTab: (tab: string) => void;
}

export default function Tabs({
  activeTab,
  activeSubTab,
  setActiveTab,
  setActiveSubTab,
}: TabsProps) {
  const [userRole, setUserRole] = useState<string | null>(null);

  // Fetch role on mount
  useEffect(() => {
    const role = localStorage.getItem("user_role");
    setUserRole(role);
  }, []);

  const subTabsMap: { [key: string]: string[] } = {
    Receptionist: ["Patients Details","Payment"],
    "Nursing Assessments": [
      "Nursing",
      "Complaint",
      "Personal Allergic Details",
      "Social History",
      "Family History",
    ],
    "Doctor Assessments": [
      "Vaccine",
      "Diagnosis",
      "Medical Assessment",
      "Treatment",
      "Medicine",
      "Notes",
      "Patient Files",
      "Discharge",
      "ECG",
    ],
  };

  const currentSubTabs = subTabsMap[activeTab] || [];

  // Define which main tabs each role can access
  const allowedTabs: { [key: string]: string[] } = {
    Admin: ["Receptionist", "Nursing Assessments", "Doctor Assessments"],
    Receptionist: ["Receptionist"],
    Nurse: ["Nursing Assessments"],
    Doctor: ["Doctor Assessments"],
  };

  // Get allowed tabs for current user (fallback to empty if role not found)
  const userAllowedTabs = userRole ? allowedTabs[userRole] || [] : [];

  const mainTabs = [
    "Receptionist",
    "Nursing Assessments",
    "Doctor Assessments",
  ];

  const isTabAllowed = (tab: string) => userAllowedTabs.includes(tab);

  return (
    <>
      {/* Main Navigation Tabs */}
      <div className="flex space-x-1 mb-2 overflow-x-auto pb-1">
        {mainTabs.map((tab) => {
          const disabled = !isTabAllowed(tab);

          return (
            <button
              key={tab}
              onClick={() => {
                if (!disabled) setActiveTab(tab);
              }}
              disabled={disabled}
              className={`px-4 py-1 text-xs rounded-sm whitespace-nowrap transition-colors ${
                activeTab === tab
                  ? "bg-[#202858] text-white"
                  : disabled
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-white text-gray-700 hover:bg-gray-300"
              }`}
            >
              {tab}
              {disabled && <span className="ml-1 text-xs opacity-70"></span>}
            </button>
          );
        })}
      </div>

      {/* Sub Navigation - Only show if main tab is allowed and active */}
      {isTabAllowed(activeTab) && currentSubTabs.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-4">
          {currentSubTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveSubTab(tab)}
              className={`px-2 py-0.5 text-xs rounded-sm whitespace-nowrap ${
                activeSubTab === tab
                  ? "bg-[#202858] text-white"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-200"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      )}
    </>
  );
}
