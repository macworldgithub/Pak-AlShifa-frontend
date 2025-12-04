"use client";

import { useState } from "react";

export default function NursingForm() {
  const [formData, setFormData] = useState({
    bpsBpd: "",
    pulse: "",
    resp: "",
    height: "",
    weight: "",
    bmi: "",
    temp: "",
    grbs: "",
    remarks: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
  };

  return (
    <div className="bg-white p-4 rounded">
      <h2 className="text-lg font-semibold mb-4">Nursing Assessment</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* First Row - 7 fields */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {/* BPS/BPD */}
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              BPS/BPD
            </label>
            <input
              type="text"
              name="bpsBpd"
              value={formData.bpsBpd}
              onChange={handleChange}
              className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
            />
          </div>

          {/* Pulse */}
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Pulse
            </label>
            <input
              type="text"
              name="pulse"
              value={formData.pulse}
              onChange={handleChange}
              className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
            />
          </div>

          {/* Resp. */}
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Resp.
            </label>
            <input
              type="text"
              name="resp"
              value={formData.resp}
              onChange={handleChange}
              className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
            />
          </div>

          {/* Ht(Cms) */}
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ht(Cms)
            </label>
            <input
              type="text"
              name="height"
              value={formData.height}
              onChange={handleChange}
              className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
            />
          </div>

          {/* Wt(Kg) */}
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Wt(Kg)
            </label>
            <input
              type="text"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
            />
          </div>

          {/* BMI */}
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              BMI
            </label>
            <input
              type="text"
              name="bmi"
              value={formData.bmi}
              onChange={handleChange}
              className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
            />
          </div>

          {/* Temp(C) */}
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Temp(C)
            </label>
            <input
              type="text"
              name="temp"
              value={formData.temp}
              onChange={handleChange}
              className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
            />
          </div>
        </div>

        {/* GRBS - Full width on mobile, then takes appropriate columns */}
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/7">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            GRBS
          </label>
          <input
            type="text"
            name="grbs"
            value={formData.grbs}
            onChange={handleChange}
            className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
          />
        </div>

        {/* Remarks - Always full width */}
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Remarks
          </label>
          <textarea
            name="remarks"
            value={formData.remarks}
            onChange={handleChange}
            rows={3}
            className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
          />
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
