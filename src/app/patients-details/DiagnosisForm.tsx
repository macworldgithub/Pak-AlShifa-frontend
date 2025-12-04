// src/app/patients-details/DiagnosisForm.tsx
"use client";

import { useState } from "react";

interface DiagnosisFormData {
  vaccination: string; // Assuming top field is Vaccination as per image
  finalDiagnosis: string;
  search: string;
}

export default function DiagnosisForm() {
  const [formData, setFormData] = useState<DiagnosisFormData>({
    vaccination: "",
    finalDiagnosis: "",
    search: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    // Handle save logic here, e.g., API call
    console.log("Saving diagnosis data:", formData);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center border-b border-gray-300">
        Diagnosis
      </h2>

      {/* Vaccination Field (top input as per image) */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Vaccination
        </label>
        <input
          type="text"
          name="vaccination"
          value={formData.vaccination}
          onChange={handleInputChange}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none bg-gray-100 text-black"
        />
      </div>

      {/* Final Diagnosis Section */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Final Diagnosis
        </label>
        <div className="flex space-x-2">
          {/* Select Favorite */}
          <select
            name="finalDiagnosis"
            value={formData.finalDiagnosis}
            onChange={handleInputChange}
            className="flex-1 p-3 border border-gray-300 rounded-md focus:outline-none bg-gray-100 text-black"
          >
            <option value="">Select Favorite</option>
            <option value="Diagnosis 1">Diagnosis 1</option>
            <option value="Diagnosis 2">Diagnosis 2</option>
            {/* Add more options as needed */}
          </select>

          {/* Search */}
          <input
            type="text"
            name="search"
            value={formData.search}
            onChange={handleInputChange}
            placeholder="Search"
            className="flex-1 p-3 border border-gray-300 rounded-md focus:outline-none bg-gray-100 text-black"
          />
        </div>
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
