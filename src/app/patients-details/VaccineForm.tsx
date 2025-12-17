"use client";

import { useState, useEffect } from "react";
import { Select } from "antd";
import { BACKEND_URL } from "@/config"; // Adjust path if necessary

interface Visit {
  _id: string;
  visitDate: string;
  patient: { name: string };
  doctorAssigned: { fullName: string };
}

interface VaccineFormData {
  vaccinationName: string;
  dose: string;
  expiryDate: string;
  duration: string;
  quantity: string;
  unit: string;
  description: string;
  lotNumber: string;
}

export default function VaccineForm() {
  const [formData, setFormData] = useState<VaccineFormData>({
    vaccinationName: "",
    dose: "",
    expiryDate: "",
    duration: "",
    quantity: "",
    unit: "",
    description: "",
    lotNumber: "",
  });
  const [visits, setVisits] = useState<Visit[]>([]);
  const [visitId, setVisitId] = useState<string>("");
  const [vaccinationId, setVaccinationId] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    fetchVisits();
  }, []);

  const fetchVisits = async () => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      setError("Please login first.");
      return;
    }

    try {
      const response = await fetch(`${BACKEND_URL}/visits`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch visits");
      }

      const data: Visit[] = await response.json();
      setVisits(data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch visits. Please try again.");
    }
  };

  const handleVisitChange = async (value: string) => {
    setVisitId(value);
    setVaccinationId("");
    setFormData({
      vaccinationName: "",
      dose: "",
      expiryDate: "",
      duration: "",
      quantity: "",
      unit: "",
      description: "",
      lotNumber: "",
    });

    if (value) {
      const token = localStorage.getItem("access_token");
      if (!token) {
        setError("Please login first.");
        return;
      }

      try {
        const response = await fetch(
          `${BACKEND_URL}/vaccinations/visit/${value}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          try {
            const vaccinations = await response.json();
            if (vaccinations && vaccinations.length > 0) {
              const vaccination = vaccinations[0]; // Load the first one if multiple
              setFormData({
                vaccinationName: vaccination.vaccinationName || "",
                dose: vaccination.dose || "",
                expiryDate: vaccination.expiryDate
                  ? vaccination.expiryDate.slice(0, 10)
                  : "",
                duration: vaccination.duration || "",
                quantity: vaccination.quantity
                  ? vaccination.quantity.toString()
                  : "",
                unit: vaccination.unit || "",
                description: vaccination.description || "",
                lotNumber: vaccination.lotNumber || "",
              });
              setVaccinationId(vaccination._id);
            }
          } catch (jsonErr) {
            // No body, no vaccination exists
            console.log("No existing vaccination found.");
          }
        }
      } catch (err) {
        console.error(err);
        setError("Failed to fetch vaccination.");
      }
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    setError(null);
    setSuccess(null);

    const token = localStorage.getItem("access_token");
    if (!token) {
      setError("Please login first.");
      return;
    }

    if (!visitId) {
      setError("Please select a visit.");
      return;
    }

    const bodyData = {
      ...formData,
      quantity: formData.quantity ? Number(formData.quantity) : undefined,
    };

    try {
      let response;
      if (vaccinationId) {
        // Update
        response = await fetch(`${BACKEND_URL}/vaccinations/${vaccinationId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(bodyData),
        });
      } else {
        // Create
        response = await fetch(`${BACKEND_URL}/vaccinations`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ ...bodyData, visit: visitId }),
        });
      }

      if (!response.ok) {
        throw new Error(
          vaccinationId
            ? "Failed to update vaccination"
            : "Failed to create vaccination"
        );
      }

      setSuccess(
        vaccinationId
          ? "Vaccination updated successfully."
          : "Vaccination created successfully."
      );
    } catch (err) {
      console.error(err);
      setError("Failed to save vaccination. Please try again.");
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center border-b border-gray-300">
        Vaccine
      </h2>

      {/* Select Visit */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Visit
        </label>
        <Select
          value={visitId}
          onChange={handleVisitChange}
          className="w-full"
          placeholder="Select a visit"
        >
          {visits.map((visit) => (
            <Select.Option key={visit._id} value={visit._id}>
              {visit.patient.name}-{visit.doctorAssigned.fullName}-
              {visit.visitDate.slice(0, 10)}
            </Select.Option>
          ))}
        </Select>
      </div>

      {/* First Row */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-4">
        {/* Vaccination (spans full width on small, but adjust) */}
        <div className="lg:col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Vaccination
          </label>
          <input
            type="text"
            name="vaccinationName"
            value={formData.vaccinationName}
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
            name="expiryDate"
            value={formData.expiryDate}
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

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      {success && <p className="text-green-500 text-sm mb-4">{success}</p>}

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
