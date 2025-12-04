// src/app/patients-details/TreatmentForm.tsx
"use client";

import { useState } from "react";

interface TreatmentFormData {
  selectFavorite: string;
  someText: string;
  cashService: string;
  searchText: string;
  qty: string;
  description: string;
}

export default function TreatmentForm() {
  const [formData, setFormData] = useState<TreatmentFormData>({
    selectFavorite: "",
    someText: "",
    cashService: "",
    searchText: "",
    qty: "",
    description: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    // Handle save logic here, e.g., API call
    console.log("Saving treatment data:", formData);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center border-b border-gray-300">
        Treatment
      </h2>

      {/* Top Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        {/* Select Favorite */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Favorite
          </label>
          <select
            name="selectFavorite"
            value={formData.selectFavorite}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none bg-gray-100 text-black"
          >
            <option value="">Select Favorite</option>
            <option value="Option 1">Option 1</option>
            {/* Add more options */}
          </select>
        </div>

        {/* Some Text */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Some Text
          </label>
          <input
            type="text"
            name="someText"
            value={formData.someText}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none bg-gray-100 text-black"
          />
        </div>

        {/* Cash Service */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Cash Service
          </label>
          <select
            name="cashService"
            value={formData.cashService}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none bg-gray-100 text-black"
          >
            <option value="">Select Cash Service</option>
            <option value="Service 1">Service 1</option>
            {/* Add more options */}
          </select>
        </div>
      </div>

      {/* Investigation and Advice Section */}
      <div className="border border-gray-300 rounded-md p-4 mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-4">
          Investigation and Advice
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Search Text */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search Text
            </label>
            <input
              type="text"
              name="searchText"
              value={formData.searchText}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none bg-gray-100 text-black"
            />
          </div>

          {/* Qty */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Qty
            </label>
            <input
              type="text"
              name="qty"
              value={formData.qty}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none bg-gray-100 text-black"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={3}
              className="w-full p-3 border border-gray-300 rounded-md resize-none bg-gray-100 focus:outline-none text-black"
            />
          </div>
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
