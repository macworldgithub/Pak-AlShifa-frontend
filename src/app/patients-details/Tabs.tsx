"use client";

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
  const subTabsMap: { [key: string]: string[] } = {
    Receptionalist: ["Patients Details"],
    "Nursing Assessments": ["Nursing", "Complaint"],
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

  return (
    <>
      {/* Main Navigation Tabs */}
      <div className="flex space-x-1 mb-2 overflow-x-auto pb-1">
        {["Receptionalist", "Nursing Assessments", "Doctor Assessments"].map(
          (tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1 text-xs rounded-sm whitespace-nowrap ${
                activeTab === tab
                  ? "bg-[#202858] text-white"
                  : "bg-white text-gray-700 hover:bg-gray-300"
              }`}
            >
              {tab}
            </button>
          )
        )}
      </div>

      {/* Sub Navigation */}
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
    </>
  );
}