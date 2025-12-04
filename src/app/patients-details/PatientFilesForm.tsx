// src/app/patients-details/PatientFilesForm.tsx
"use client";

import { useState } from "react";

interface PatientFilesFormData {
  uploadFile: string;
  fileDescription: string;
}

export default function PatientFilesForm() {
  const [formData, setFormData] = useState<PatientFilesFormData>({
    uploadFile: "",
    fileDescription: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Handle file upload
    console.log("File uploaded:", e.target.files?.[0]);
  };

  const handleSave = () => {
    // Handle save logic here, e.g., API call
    console.log("Saving patient files data:", formData);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center border-b border-gray-300">
        Patient Files
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        {/* Upload File */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload File
          </label>
          <input
            type="file"
            onChange={handleFileUpload}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none bg-gray-100 text-black"
          />
        </div>

        {/* File Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            File Description
          </label>
          <input
            type="text"
            name="fileDescription"
            value={formData.fileDescription}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none bg-gray-100 text-black"
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
