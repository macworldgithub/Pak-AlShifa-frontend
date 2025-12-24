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

interface Allergy {
  _id: string;
  allergyType: string;
  allergySeverity: string;
  allergenCode: string;
  allergenReaction: string;
  onsetDate: string;
}

export default function PersonalAllergic() {
  const [allergyType, setAllergyType] = useState("");
  const [allergySeverity, setAllergySeverity] = useState("");
  const [allergenCode, setAllergenCode] = useState("");
  const [allergenReaction, setAllergenReaction] = useState("");
  const [onsetDate, setOnsetDate] = useState("2025-11-15");
  const [visits, setVisits] = useState<Visit[]>([]);
  const [visitId, setVisitId] = useState<string>("");
  const [allergies, setAllergies] = useState<Allergy[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
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

  const fetchAllergies = async (visitId: string) => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      setError("Please login first.");
      return;
    }

    try {
      const response = await fetch(
        `${BACKEND_URL}/allergies/visit/${visitId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch allergies");
      }

      const data: Allergy[] = await response.json();
      setAllergies(data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch allergies.");
    }
  };

  const handleVisitChange = async (value: string) => {
    setVisitId(value);
    setEditingId(null);
    resetForm();
    setAllergies([]);

    if (value) {
      fetchAllergies(value);
    }
  };

  const resetForm = () => {
    setAllergyType("");
    setAllergySeverity("");
    setAllergenCode("");
    setAllergenReaction("");
    setOnsetDate("2025-11-15");
  };

  const handleSubmit = async () => {
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
      allergyType,
      allergySeverity,
      allergenCode,
      allergenReaction,
      onsetDate,
    };

    try {
      let response;
      if (editingId) {
        // Update
        response = await fetch(`${BACKEND_URL}/allergies/${editingId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(bodyData),
        });
      } else {
        // Create
        response = await fetch(`${BACKEND_URL}/allergies`, {
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
          editingId ? "Failed to update allergy" : "Failed to create allergy"
        );
      }

      setSuccess(
        editingId
          ? "Allergy updated successfully."
          : "Allergy created successfully."
      );
      resetForm();
      setEditingId(null);
      fetchAllergies(visitId);
    } catch (err) {
      console.error(err);
      setError("Failed to save allergy. Please try again.");
    }
  };

  const handleEdit = (allergy: Allergy) => {
    setAllergyType(allergy.allergyType);
    setAllergySeverity(allergy.allergySeverity);
    setAllergenCode(allergy.allergenCode);
    setAllergenReaction(allergy.allergenReaction);
    setOnsetDate(allergy.onsetDate);
    setEditingId(allergy._id);
  };

  const handleDelete = async (id: string) => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      setError("Please login first.");
      return;
    }

    if (confirm("Are you sure you want to delete this allergy?")) {
      try {
        const response = await fetch(`${BACKEND_URL}/allergies/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to delete allergy");
        }

        setSuccess("Allergy deleted successfully.");
        fetchAllergies(visitId);
      } catch (err) {
        console.error(err);
        setError("Failed to delete allergy.");
      }
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center border-b border-gray-300">
        Personal Allergic
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

      <div className="flex gap-6">
        {/* Left Box */}
        <div className="flex-1 border rounded-md bg-white p-4">
          <div className="mb-6">
            <label className="block text-sm font-medium mb-1 text-black">
              Allergy Type
            </label>
            <select
              className="w-full border border-red-400 rounded px-2 py-1 text-black"
              value={allergyType}
              onChange={(e) => setAllergyType(e.target.value)}
            >
              <option value="">Select Allergy Type</option>
              <option value="food">Food</option>
              <option value="drug">Drug</option>
              <option value="environmental">Environmental</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-black">
              Allergen Code
            </label>
            <input
              className="w-full border border-red-400 rounded px-2 py-1 text-black"
              type="text"
              placeholder="Search Allergen Code"
              value={allergenCode}
              onChange={(e) => setAllergenCode(e.target.value)}
            />
          </div>
        </div>
        {/* Right Box */}
        <div className="flex-1 border rounded-md bg-white p-4">
          <div className="mb-6">
            <label className="block text-sm font-medium mb-1 text-black">
              Allergy Severity
            </label>
            <select
              className="w-full border border-red-400 rounded px-2 py-1 text-black"
              value={allergySeverity}
              onChange={(e) => setAllergySeverity(e.target.value)}
            >
              <option value="">Select Severity</option>
              <option value="mild">Mild</option>
              <option value="moderate">Moderate</option>
              <option value="severe">Severe</option>
            </select>
          </div>
          <div className="flex gap-2 items-end">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1 text-black">
                Allergen Reaction
              </label>
              <select
                className="w-full border border-red-400 rounded px-2 py-1 text-black"
                value={allergenReaction}
                onChange={(e) => setAllergenReaction(e.target.value)}
              >
                <option value="">Select Reaction</option>
                <option value="rash">Rash</option>
                <option value="swelling">Swelling</option>
                <option value="anaphylaxis">Anaphylaxis</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-black">
                Onset Date
              </label>
              <input
                className="border border-gray-400 rounded px-2 py-1 bg-gray-200 text-black"
                type="date"
                value={onsetDate}
                onChange={(e) => setOnsetDate(e.target.value)}
                min="1900-01-01"
                max="2099-12-31"
              />
              <div className="text-xs text-gray-500 mt-1">
                {onsetDate
                  ? new Date(onsetDate).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })
                  : ""}
              </div>
            </div>
          </div>
        </div>
      </div>

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      {success && <p className="text-green-500 text-sm mb-4">{success}</p>}

      {/* Save Button */}
      <div className="flex justify-end mt-4">
        <button
          onClick={handleSubmit}
          className="px-6 py-2 border border-gray-300 text-black rounded-md cursor-pointer focus:outline-none"
        >
          Save
        </button>
      </div>

      {/* Existing Allergies */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-4">Existing Allergies</h3>
        {allergies.map((allergy) => (
          <div
            key={allergy._id}
            className="border border-gray-300 p-4 mb-4 rounded-md"
          >
            <p className="text-black">
              <strong>Allergy Type:</strong> {allergy.allergyType}
            </p>
            <p className="text-black">
              <strong>Severity:</strong> {allergy.allergySeverity}
            </p>
            <p className="text-black">
              <strong>Allergen Code:</strong> {allergy.allergenCode}
            </p>
            <p className="text-black">
              <strong>Reaction:</strong> {allergy.allergenReaction}
            </p>
            <p className="text-black">
              <strong>Onset Date:</strong> {allergy.onsetDate}
            </p>
            <button
              onClick={() => handleEdit(allergy)}
              className="mt-2 px-4 py-1 bg-blue-600 text-white rounded-md mr-2"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(allergy._id)}
              className="mt-2 px-4 py-1 bg-red-600 text-white rounded-md"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
