// src/app/patients-details/NotesForm.tsx
"use client";

import { useState } from "react";

interface NotesFormData {
  template: string;
  notes: string;
}

export default function NotesForm() {
  const [formData, setFormData] = useState<NotesFormData>({
    template: "",
    notes: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    // Handle save logic here, e.g., API call
    console.log("Saving notes data:", formData);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center border-b border-gray-300">
        Notes
      </h2>

      {/* Template Select and Notes Textarea */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Template
        </label>
        <select
          name="template"
          value={formData.template}
          onChange={handleInputChange}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none bg-gray-100 mb-4 text-black"
        >
          <option value="">Select Template</option>
          {/* Options */}
        </select>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Notes
        </label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleInputChange}
          rows={6}
          className="w-full p-3 border border-gray-300 rounded-md resize-none bg-gray-100 focus:outline-none text-black"
        />
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
