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

    if (value) {
      const token = localStorage.getItem("access_token");
      if (!token) {
        setError("Please login first.");
        return;
      }

      try {
        const response = await fetch(
          `${BACKEND_URL}/nursing-assessments/visit/${value}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const assessment = await response.json();
          if (assessment) {
            setFormData({
              bpsBpd: assessment.bpsBpd || "",
              pulse: assessment.pulse || "",
              resp: assessment.resp || "",
              height: assessment.height || "",
              weight: assessment.weight || "",
              bmi: assessment.bmi || "",
              temp: assessment.temp || "",
              grbs: assessment.grbs || "",
              remarks: assessment.remarks || "",
            });
            setAssessmentId(assessment._id);
          }
        }
      } catch (err) {
        console.error(err);
        // setError("Failed to fetch assessment.");
      }
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormData({
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
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
          `${BACKEND_URL}/nursing-assessments/${assessmentId}`,
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
        response = await fetch(`${BACKEND_URL}/nursing-assessments`, {
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
      resetForm();
    } catch (err) {
      console.error(err);
      setError("Failed to save assessment. Please try again.");
    }
  };

  return (
    <div className="bg-white p-4 rounded">
      <h2 className="text-lg font-semibold mb-4 text-black">
        Nursing Assessment
      </h2>

      {/* Select Visit */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
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
              {visit.patient?.name}-{visit.doctorAssigned?.fullName}-
              {visit.visitDate ? visit.visitDate.slice(0, 10) : "N/A"}
            </Select.Option>
          ))}
        </Select>
      </div>

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
              className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm text-gray-900"
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
              className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm text-gray-900"
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
              className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm text-gray-900"
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
              className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm text-gray-900"
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
              className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm text-gray-900"
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
              className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm text-gray-900"
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
              className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm text-gray-900"
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
            className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm text-gray-900"
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
            className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm text-gray-900"
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}
        {success && <p className="text-green-500 text-sm">{success}</p>}

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 border border-gray-300 text-black rounded-md cursor-pointer focus:outline-none"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
