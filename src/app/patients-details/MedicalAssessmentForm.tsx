// src/app/patients-details/MedicalAssessmentForm.tsx
"use client";

import { useState } from "react";

interface MedicalAssessmentFormData {
  planAndCare: string;
  advicesAndGoals: string;
}

export default function MedicalAssessmentForm() {
  const [formData, setFormData] = useState<MedicalAssessmentFormData>({
    planAndCare: "",
    advicesAndGoals: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    // Handle save logic here, e.g., API call
    console.log("Saving medical assessment data:", formData);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center border-b border-gray-300">
        Medical Assessment
      </h2>

      {/* Row of Two Fields */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        {/* Plan & Care */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Plan & Care
          </label>
          <textarea
            name="planAndCare"
            value={formData.planAndCare}
            onChange={handleInputChange}
            rows={4}
            className="w-full p-3 border border-gray-300 rounded-md resize-none bg-gray-100 focus:outline-none text-black"
            
          />
        </div>

        {/* Advices & Goals */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Advices & Goals
          </label>
          <textarea
            name="advicesAndGoals"
            value={formData.advicesAndGoals}
            onChange={handleInputChange}
            rows={4}
            className="w-full p-3 border border-gray-300 rounded-md resize-none bg-gray-100 focus:outline-none text-black"          
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