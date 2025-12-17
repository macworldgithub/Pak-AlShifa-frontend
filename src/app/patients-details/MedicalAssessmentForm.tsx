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

interface MedicalAssessmentFormData {
  planAndCare: string;
  advicesAndGoals: string;
}

export default function MedicalAssessmentForm() {
  const [formData, setFormData] = useState<MedicalAssessmentFormData>({
    planAndCare: "",
    advicesAndGoals: "",
  });
  const [visits, setVisits] = useState<Visit[]>([]);
  const [visitId, setVisitId] = useState<string>("");
  const [assessmentId, setAssessmentId] = useState<string>("");
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
    setAssessmentId("");
    setFormData({
      planAndCare: "",
      advicesAndGoals: "",
    });

    if (value) {
      const token = localStorage.getItem("access_token");
      if (!token) {
        setError("Please login first.");
        return;
      }

      try {
        const response = await fetch(
          `${BACKEND_URL}/medical-assessments/visit/${value}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          try {
            const assessment = await response.json();
            if (assessment) {
              setFormData({
                planAndCare: assessment.planAndCare || "",
                advicesAndGoals: assessment.advicesAndGoals || "",
              });
              setAssessmentId(assessment._id);
            }
          } catch (jsonErr) {
            // No body, no assessment exists
            console.log("No existing assessment found.");
          }
        }
      } catch (err) {
        console.error(err);
        setError("Failed to fetch assessment.");
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
      if (assessmentId) {
        // Update
        response = await fetch(
          `${BACKEND_URL}/medical-assessments/${assessmentId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(formData),
          }
        );
      } else {
        // Create
        response = await fetch(`${BACKEND_URL}/medical-assessments`, {
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
          assessmentId
            ? "Failed to update assessment"
            : "Failed to create assessment"
        );
      }

      setSuccess(
        assessmentId
          ? "Assessment updated successfully."
          : "Assessment created successfully."
      );
    } catch (err) {
      console.error(err);
      setError("Failed to save assessment. Please try again.");
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center border-b border-gray-300">
        Medical Assessment
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

      {/* Row of Two Fields */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        {/* Plan & Care */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Plan & Care
          </label>
          <textarea
            name="planAndCare"
            value={formData.planAndCare}
            onChange={handleInputChange}
            rows={4}
            className="w-full p-3 border border-gray-300 rounded-md resize-none bg-gray-100 focus:outline-none text-black"
          />
        </div>

        {/* Advices & Goals */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Advices & Goals
          </label>
          <textarea
            name="advicesAndGoals"
            value={formData.advicesAndGoals}
            onChange={handleInputChange}
            rows={4}
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
