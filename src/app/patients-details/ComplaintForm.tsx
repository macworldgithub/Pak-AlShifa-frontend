"use client";

import { useState } from "react";

interface ComplaintFormData {
  complaints: string;
  symptomsAndSigns: string;
  surgicalHistory: string;
  historyOfPastIllness: string;
  historyOfPresentIllness: string;
  progressNotes: string;
}

export default function ComplaintForm() {
  const [formData, setFormData] = useState<ComplaintFormData>({
    complaints: "",
    symptomsAndSigns: "",
    surgicalHistory: "",
    historyOfPastIllness: "",
    historyOfPresentIllness: "",
    progressNotes: "",
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
    console.log("Saving complaint data:", formData);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center border-b border-gray-300">
        Complaint
      </h2>

      {/* Complaints */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Complaints
        </label>
        <textarea
          name="complaints"
          value={formData.complaints}
          onChange={handleInputChange}
          rows={3}
          className="w-full p-3 border border-gray-300 rounded-md resize-none bg-gray-100 focus:outline-none text-black"
        />
      </div>

      {/* Symptoms & Signs */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Symptoms & Signs
        </label>
        <textarea
          name="symptomsAndSigns"
          value={formData.symptomsAndSigns}
          onChange={handleInputChange}
          rows={3}
          className="w-full p-3 border border-gray-300 rounded-md resize-none bg-gray-100 focus:outline-none text-black"
        />
      </div>

      {/* Row of Four Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Surgical History */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Surgical History
          </label>
          <textarea
            name="surgicalHistory"
            value={formData.surgicalHistory}
            onChange={handleInputChange}
            rows={3}
            className="w-full p-3 border border-gray-300 rounded-md resize-none bg-gray-100 focus:outline-none text-black"
          />
        </div>

        {/* History of Past Illness */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            History of Past Illness
          </label>
          <textarea
            name="historyOfPastIllness"
            value={formData.historyOfPastIllness}
            onChange={handleInputChange}
            rows={3}
            className="w-full p-3 border border-gray-300 rounded-md resize-none bg-gray-100 focus:outline-none text-black"
          />
        </div>

        {/* History of Present Illness */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            History of Present Illness
          </label>
          <textarea
            name="historyOfPresentIllness"
            value={formData.historyOfPresentIllness}
            onChange={handleInputChange}
            rows={3}
            className="w-full p-3 border border-gray-300 rounded-md resize-none bg-gray-100 focus:outline-none text-black"
          />
        </div>

        {/* Progress Notes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Progress Notes
          </label>
          <textarea
            name="progressNotes"
            value={formData.progressNotes}
            onChange={handleInputChange}
            rows={3}
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
