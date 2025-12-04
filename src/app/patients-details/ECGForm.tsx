// src/app/patients-details/ECGForm.tsx
"use client";

import { useState } from "react";

interface ECGFormData {
  position: string;
  pWave: string;
  standardizationImv: string;
  prInterval: string;
  mechanism: string;
  qrsComplexes: string;
  voltage: string;
  qTduration: string;
  electricalAxis: string;
  sTsegment: string;
  auricularRate: string;
  tWave: string;
  ventricularRate: string;
  qWave: string;
  rhythm: string;
  additionalFindings: string;
}

export default function ECGForm() {
  const [formData, setFormData] = useState<ECGFormData>({
    position: "",
    pWave: "",
    standardizationImv: "",
    prInterval: "",
    mechanism: "",
    qrsComplexes: "",
    voltage: "",
    qTduration: "",
    electricalAxis: "",
    sTsegment: "",
    auricularRate: "",
    tWave: "",
    ventricularRate: "",
    qWave: "",
    rhythm: "",
    additionalFindings: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    // Handle save logic here, e.g., API call
    console.log("Saving ECG data:", formData);
  };

  const fields = [
    { label: "Position", name: "position", type: "text" },
    { label: "P Wave", name: "pWave", type: "text" },
    { label: "Standardization Imv", name: "standardizationImv", type: "text" },
    { label: "PR Interval", name: "prInterval", type: "text" },
    { label: "Mechanism", name: "mechanism", type: "text" },
    { label: "QRS Complexes", name: "qrsComplexes", type: "text" },
    { label: "Voltage", name: "voltage", type: "text" },
    { label: "Q-T Duration", name: "qTduration", type: "text" },
    { label: "Electrical Axis", name: "electricalAxis", type: "text" },
    { label: "S-T Segment", name: "sTsegment", type: "text" },
    { label: "Auricular Rate", name: "auricularRate", type: "text" },
    { label: "T-wave", name: "tWave", type: "text" },
    { label: "Ventricular Rate", name: "ventricularRate", type: "text" },
    { label: "Q-wave", name: "qWave", type: "text" },
    { label: "Rhythm", name: "rhythm", type: "text" },
    {
      label: "Additional Findings if any",
      name: "additionalFindings",
      type: "textarea",
      rows: 3,
    },
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center border-b border-gray-300">
        ECG
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {fields.map((field) => (
          <div key={field.name}>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {field.label}
            </label>
            {field.type === "textarea" ? (
              <textarea
                name={field.name}
                value={(formData as any)[field.name]}
                onChange={handleInputChange}
                rows={field.rows}
                className="w-full p-3 border border-gray-300 rounded-md resize-none bg-gray-100 focus:outline-none"
              />
            ) : (
              <input
                type={field.type}
                name={field.name}
                value={(formData as any)[field.name]}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none bg-gray-100 text-black"
              />
            )}
          </div>
        ))}
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="px-6 py-2 border border-gray-300 text-black rounded-md cursor-pointer focus:outline-none"
        >
          Save
        </button>
      </div>
    </div>
  );
}
