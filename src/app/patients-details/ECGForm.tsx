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

interface ECGFormData {
  position: string;
  pWave: string;
  standardization: string;
  prInterval: string;
  mechanism: string;
  qrsComplexes: string;
  voltage: string;
  qtDuration: string;
  electricalAxis: string;
  stSegment: string;
  auricularRate: string;
  tWave: string;
  ventricularRate: string;
  qWave: string;
  rhythm: string;
  additionalFindings: string;
}

export default function ECGForm() {
  const [formData, setFormData] = useState<ECGFormData>({
    position: "",
    pWave: "",
    standardization: "",
    prInterval: "",
    mechanism: "",
    qrsComplexes: "",
    voltage: "",
    qtDuration: "",
    electricalAxis: "",
    stSegment: "",
    auricularRate: "",
    tWave: "",
    ventricularRate: "",
    qWave: "",
    rhythm: "",
    additionalFindings: "",
  });
  const [visits, setVisits] = useState<Visit[]>([]);
  const [visitId, setVisitId] = useState<string>("");
  const [ecgId, setEcgId] = useState<string>("");
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
    setEcgId("");
    setFormData({
      position: "",
      pWave: "",
      standardization: "",
      prInterval: "",
      mechanism: "",
      qrsComplexes: "",
      voltage: "",
      qtDuration: "",
      electricalAxis: "",
      stSegment: "",
      auricularRate: "",
      tWave: "",
      ventricularRate: "",
      qWave: "",
      rhythm: "",
      additionalFindings: "",
    });

    if (value) {
      const token = localStorage.getItem("access_token");
      if (!token) {
        setError("Please login first.");
        return;
      }

      try {
        const response = await fetch(`${BACKEND_URL}/ecgs/visit/${value}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          try {
            const ecg = await response.json();
            if (ecg) {
              setFormData({
                position: ecg.position || "",
                pWave: ecg.pWave || "",
                standardization: ecg.standardization || "",
                prInterval: ecg.prInterval || "",
                mechanism: ecg.mechanism || "",
                qrsComplexes: ecg.qrsComplexes || "",
                voltage: ecg.voltage || "",
                qtDuration: ecg.qtDuration || "",
                electricalAxis: ecg.electricalAxis || "",
                stSegment: ecg.stSegment || "",
                auricularRate: ecg.auricularRate || "",
                tWave: ecg.tWave || "",
                ventricularRate: ecg.ventricularRate || "",
                qWave: ecg.qWave || "",
                rhythm: ecg.rhythm || "",
                additionalFindings: ecg.additionalFindings || "",
              });
              setEcgId(ecg._id);
            }
          } catch (jsonErr) {
            // No body, no ECG exists
            console.log("No existing ECG found.");
          }
        }
      } catch (err) {
        console.error(err);
        setError("Failed to fetch ECG.");
      }
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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

    try {
      let response;
      if (ecgId) {
        // Update
        response = await fetch(`${BACKEND_URL}/ecgs/${ecgId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        });
      } else {
        // Create
        response = await fetch(`${BACKEND_URL}/ecgs`, {
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
          ecgId ? "Failed to update ECG" : "Failed to create ECG"
        );
      }

      setSuccess(
        ecgId ? "ECG updated successfully." : "ECG created successfully."
      );
    } catch (err) {
      console.error(err);
      setError("Failed to save ECG. Please try again.");
    }
  };

  const fields = [
    { label: "Position", name: "position", type: "text" },
    { label: "P Wave", name: "pWave", type: "text" },
    { label: "Standardization", name: "standardization", type: "text" },
    { label: "PR Interval", name: "prInterval", type: "text" },
    { label: "Mechanism", name: "mechanism", type: "text" },
    { label: "QRS Complexes", name: "qrsComplexes", type: "text" },
    { label: "Voltage", name: "voltage", type: "text" },
    { label: "QT Duration", name: "qtDuration", type: "text" },
    { label: "Electrical Axis", name: "electricalAxis", type: "text" },
    { label: "ST Segment", name: "stSegment", type: "text" },
    { label: "Auricular Rate", name: "auricularRate", type: "text" },
    { label: "T-wave", name: "tWave", type: "text" },
    { label: "Ventricular Rate", name: "ventricularRate", type: "text" },
    { label: "Q-wave", name: "qWave", type: "text" },
    { label: "Rhythm", name: "rhythm", type: "text" },
    {
      label: "Additional Findings if any",
      name: "additionalFindings",
      type: "textarea",
      rows: 3,
    },
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center border-b border-gray-300">
        ECG
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {fields.map((field) => (
          <div key={field.name}>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {field.label}
            </label>
            {field.type === "textarea" ? (
              <textarea
                name={field.name}
                value={(formData as any)[field.name]}
                onChange={handleInputChange}
                rows={field.rows}
                className="w-full p-3 border border-gray-300 rounded-md resize-none bg-gray-100 focus:outline-none text-black"
              />
            ) : (
              <input
                type={field.type}
                name={field.name}
                value={(formData as any)[field.name]}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none bg-gray-100 text-black"
              />
            )}
          </div>
        ))}
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
