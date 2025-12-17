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

interface DischargeFormData {
  patientIn: string;
  patientOut: string;
}

export default function DischargeForm() {
  const [formData, setFormData] = useState<DischargeFormData>({
    patientIn: "",
    patientOut: "",
  });
  const [visits, setVisits] = useState<Visit[]>([]);
  const [visitId, setVisitId] = useState<string>("");
  const [dischargeId, setDischargeId] = useState<string>("");
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
    setDischargeId("");
    setFormData({
      patientIn: "",
      patientOut: "",
    });

    if (value) {
      const token = localStorage.getItem("access_token");
      if (!token) {
        setError("Please login first.");
        return;
      }

      try {
        const response = await fetch(
          `${BACKEND_URL}/discharges/visit/${value}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          try {
            const discharge = await response.json();
            if (discharge) {
              setFormData({
                patientIn: discharge.patientIn || "",
                patientOut: discharge.patientOut || "",
              });
              setDischargeId(discharge._id);
            }
          } catch (jsonErr) {
            // No body, no discharge exists
            console.log("No existing discharge found.");
          }
        }
      } catch (err) {
        console.error(err);
        setError("Failed to fetch discharge.");
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDischarge = async () => {
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

    try {
      let response;
      if (dischargeId) {
        // Update
        response = await fetch(`${BACKEND_URL}/discharges/${dischargeId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        });
      } else {
        // Create
        response = await fetch(`${BACKEND_URL}/discharges`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ ...formData, visit: visitId }),
        });
      }

      if (!response.ok) {
        throw new Error(
          dischargeId
            ? "Failed to update discharge"
            : "Failed to create discharge"
        );
      }

      setSuccess(
        dischargeId
          ? "Discharge updated successfully."
          : "Discharge created successfully."
      );
    } catch (err) {
      console.error(err);
      setError("Failed to save discharge. Please try again.");
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center border-b border-gray-300">
        Discharge
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

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      {success && <p className="text-green-500 text-sm mb-4">{success}</p>}

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
