// src/app/patients-details/VaccineForm.tsx
"use client";

import { useState } from "react";

interface VaccineFormData {
  vaccination: string;
  dose: string;
  vaccinationExpiryDate: string;
  duration: string;
  quantity: string;
  unit: string;
  description: string;
  lotNumber: string;
}

export default function VaccineForm() {
  const [formData, setFormData] = useState<VaccineFormData>({
    vaccination: "",
    dose: "",
    vaccinationExpiryDate: "",
    duration: "",
    quantity: "",
    unit: "",
    description: "",
    lotNumber: "",
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
    console.log("Saving vaccine data:", formData);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center border-b border-gray-300">
        Vaccine
      </h2>

      {/* First Row */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-4">
        {/* Vaccination (spans full width on small, but adjust) */}
        <div className="lg:col-span-1">
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

        {/* Dose */}
        <div className="lg:col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Dose
          </label>
          <select
            name="dose"
            value={formData.dose}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none bg-gray-100 text-black"
          >
            <option value="">Select Dose</option>
            <option value="1ml">1ml</option>
            <option value="2ml">2ml</option>
            {/* Add more options as needed */}
          </select>
        </div>

        {/* Vaccination Expiry Date */}
        <div className="lg:col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Vaccination Expiry Date
          </label>
          <input
            type="date"
            name="vaccinationExpiryDate"
            value={formData.vaccinationExpiryDate}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none bg-gray-100 text-black"
          />
        </div>

        {/* Duration */}
        <div className="lg:col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Duration
          </label>
          <input
            type="text"
            name="duration"
            value={formData.duration}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none bg-gray-100 text-black"
          />
        </div>
      </div>

      {/* Second Row */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
        {/* Quantity */}
        <div className="lg:col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Quantity
          </label>
          <select
            name="quantity"
            value={formData.quantity}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none bg-gray-100 text-black"
          >
            <option value="">Select Quantity</option>
            <option value="1">1</option>
            <option value="2">2</option>
            {/* Add more options as needed */}
          </select>
        </div>

        {/* Unit */}
        <div className="lg:col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Unit
          </label>
          <select
            name="unit"
            value={formData.unit}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none bg-gray-100 text-black"
          >
            <option value="">Select Unit</option>
            <option value="mg">mg</option>
            <option value="ml">ml</option>
            {/* Add more options as needed */}
          </select>
        </div>

        {/* Description */}
        <div className="lg:col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none bg-gray-100 text-black"
          />
        </div>

        {/* Lot Number */}
        <div className="lg:col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Lot Number
          </label>
          <input
            type="text"
            name="lotNumber"
            value={formData.lotNumber}
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
