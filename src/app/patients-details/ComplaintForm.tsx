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
  const [visits, setVisits] = useState<Visit[]>([]);
  const [visitId, setVisitId] = useState<string>("");
  const [complaintId, setComplaintId] = useState<string>("");
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
    setComplaintId("");
    setFormData({
      complaints: "",
      symptomsAndSigns: "",
      surgicalHistory: "",
      historyOfPastIllness: "",
      historyOfPresentIllness: "",
      progressNotes: "",
    });

    if (value) {
      const token = localStorage.getItem("access_token");
      if (!token) {
        setError("Please login first.");
        return;
      }

      try {
        const response = await fetch(
          `${BACKEND_URL}/complaints/visit/${value}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          try {
            const complaint = await response.json();
            if (complaint) {
              setFormData({
                complaints: complaint.complaints || "",
                symptomsAndSigns: complaint.symptomsAndSigns || "",
                surgicalHistory: complaint.surgicalHistory || "",
                historyOfPastIllness: complaint.historyOfPastIllness || "",
                historyOfPresentIllness:
                  complaint.historyOfPresentIllness || "",
                progressNotes: complaint.progressNotes || "",
              });
              setComplaintId(complaint._id);
            }
          } catch (jsonErr) {
            // No body, no complaint exists
            console.log("No existing complaint found.");
          }
        }
      } catch (err) {
        console.error(err);
        setError("Failed to fetch complaint.");
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  //reset
  const resetForm = () => {
    setFormData({
      complaints: "",
      symptomsAndSigns: "",
      surgicalHistory: "",
      historyOfPastIllness: "",
      historyOfPresentIllness: "",
      progressNotes: "",
    });
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

    try {
      let response;
      if (complaintId) {
        // Update
        response = await fetch(`${BACKEND_URL}/complaints/${complaintId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        });
      } else {
        // Create
        response = await fetch(`${BACKEND_URL}/complaints`, {
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
          complaintId
            ? "Failed to update complaint"
            : "Failed to create complaint"
        );
      }

      // setSuccess(complaintId ? "Complaint updated successfully." : "Complaint created successfully.");
      setSuccess(
        complaintId
          ? "Complaint updated successfully."
          : "Complaint created successfully."
      );
      resetForm();
    } catch (err) {
      console.error(err);
      setError("Failed to save complaint. Please try again.");
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center border-b border-gray-300">
        Complaint
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
