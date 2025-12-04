// src/app/patients-details/DischargeForm.tsx
"use client";

import { useState } from "react";

interface DischargeFormData {
  patientIn: string;
  patientOut: string;
}

export default function DischargeForm() {
  const [formData, setFormData] = useState<DischargeFormData>({
    patientIn: "",
    patientOut: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDischarge = () => {
    // Handle discharge logic
    console.log("Discharging patient with data:", formData);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center border-b border-gray-300">
        Discharge
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        {/* Patient In */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Patient In
          </label>
          <input
            type="datetime-local"
            name="patientIn"
            value={formData.patientIn}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none bg-gray-100 text-black"
          />
        </div>

        {/* Patient Out */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Patient Out
          </label>
          <input
            type="datetime-local"
            name="patientOut"
            value={formData.patientOut}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none bg-gray-100 text-black"
          />
        </div>
      </div>

      {/* Discharge Button */}
      <div className="flex justify-end">
        <button
          onClick={handleDischarge}
          className="px-6 py-2 border border-gray-300 text-black rounded-md cursor-pointer focus:outline-none"
        >
          Discharge
        </button>
      </div>
    </div>
  );
}
