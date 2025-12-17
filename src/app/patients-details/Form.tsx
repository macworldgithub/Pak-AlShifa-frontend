"use client";

import { useState, useEffect } from "react";
import { BACKEND_URL } from "@/config"; // Adjust path if necessary based on project structure

interface FormData {
  visitDate: string;
  fileNo: string;
  name: string;
  dob: string;
  age: string;
  sex: string;
  emiratesId: string;
  mobileNo: string;
  email: string;
  nationality: string;
  corporateName: string;
  company: string;
  doctorAssigned: string;
  remark: string;
}

interface Doctor {
  _id: string;
  fullName: string;
}

export default function PatientForm() {
  const [formData, setFormData] = useState<FormData>({
    visitDate: "",
    fileNo: "",
    name: "",
    dob: "",
    age: "",
    sex: "",
    emiratesId: "",
    mobileNo: "",
    email: "",
    nationality: "",
    corporateName: "",
    company: "",
    doctorAssigned: "",
    remark: "",
  });
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      setError("Please login first to fetch doctors.");
      return;
    }

    fetch(`${BACKEND_URL}/users?role=Doctor`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch doctors");
        }
        return response.json();
      })
      .then((data) => setDoctors(data))
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch doctors. Please try again.");
      });
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const token = localStorage.getItem("access_token");
    if (!token) {
      setError("Please login first.");
      return;
    }

    const patientData = {
      fileNo: formData.fileNo,
      name: formData.name,
      dob: formData.dob,
      age: formData.age,
      sex: formData.sex,
      emiratesId: formData.emiratesId,
      mobileNo: formData.mobileNo,
      email: formData.email,
      nationality: formData.nationality,
      corporateName: formData.corporateName,
      company: formData.company,
      remark: formData.remark,
    };

    const visitData = {
      visitDate: formData.visitDate,
      patient: "", // Will be set after patient creation
      doctorAssigned: formData.doctorAssigned,
    };

    try {
      const patientResponse = await fetch(`${BACKEND_URL}/patients`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(patientData),
      });

      if (!patientResponse.ok) {
        const errorData = await patientResponse.json();
        throw new Error(errorData.message || "Failed to create patient");
      }

      const patient = await patientResponse.json();
      const patientId = patient._id;

      visitData.patient = patientId;

      const visitResponse = await fetch(`${BACKEND_URL}/visits`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(visitData),
      });

      if (!visitResponse.ok) {
        const errorData = await visitResponse.json();
        throw new Error(errorData.message || "Failed to create visit");
      }

      setSuccess("Patient and Visit created successfully.");
      // Optionally reset form
      setFormData({
        visitDate: "",
        fileNo: "",
        name: "",
        dob: "",
        age: "",
        sex: "",
        emiratesId: "",
        mobileNo: "",
        email: "",
        nationality: "",
        corporateName: "",
        company: "",
        doctorAssigned: "",
        remark: "",
      });
    } catch (err) {
      console.error(err);
      setError("Failed to create patient and visit. Please try again.");
    }
  };

  return (
    <div className="border border-gray-300 bg-white p-6 rounded-sm">
      <h2 className="text-base font-semibold mb-4 text-gray-700 border-b border-gray-200 pb-3">
        Patient Details
      </h2>

      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Visit Date */}
        <div>
          <label className="block text-xs text-gray-600 mb-1">Visit Date</label>
          <input
            type="date"
            name="visitDate"
            value={formData.visitDate}
            onChange={handleInputChange}
            className="w-48 px-3 py-2 border border-gray-300 rounded text-xs text-gray-900 focus:outline-none focus:border-gray-500"
          />
        </div>

        {/* Row 1: File No. | Patient Name | D.O.B. | Age | Sex */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 items-end">
          {/* File No. */}
          <div>
            <label className="block text-xs text-gray-600 mb-1">File No.</label>
            <input
              type="text"
              name="fileNo"
              value={formData.fileNo}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded text-xs text-gray-900"
            />
          </div>

          {/* Patient Name - Longer field */}
          <div className="md:col-span-2">
            <label className="block text-xs text-gray-600 mb-1">
              Patient Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded text-xs text-gray-900"
            />
          </div>

          {/* D.O.B. */}
          <div>
            <label className="block text-xs text-gray-600 mb-1">D.O.B.</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded text-xs text-gray-900"
            />
          </div>

          {/* Age */}
          <div>
            <label className="block text-xs text-gray-600 mb-1">Age.</label>
            <input
              type="text"
              name="age"
              value={formData.age}
              onChange={handleInputChange}
              placeholder="35"
              className="w-full px-3 py-2 border border-gray-300 rounded text-xs text-gray-900 placeholder-gray-500"
            />
          </div>

          {/* Sex */}
          <div>
            <label className="block text-xs text-gray-600 mb-1">Sex</label>
            <select
              name="sex"
              value={formData.sex}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded text-xs text-gray-900"
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        {/* Row 2: Emirates ID | Mobile No. | Email Address */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-xs text-gray-600 mb-1">
              Emirates ID
            </label>
            <input
              type="text"
              name="emiratesId"
              value={formData.emiratesId}
              onChange={handleInputChange}
              placeholder="784-XXXX-XXXXXXX-X"
              className="w-full px-3 py-2 border border-gray-300 rounded text-xs text-gray-900 placeholder-gray-500"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-600 mb-1">
              Mobile No.
            </label>
            <input
              type="text"
              name="mobileNo"
              value={formData.mobileNo}
              onChange={handleInputChange}
              placeholder="05X XXXXXXX"
              className="w-full px-3 py-2 border border-gray-300 rounded text-xs text-gray-900 placeholder-gray-500"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-600 mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded text-xs text-gray-900"
            />
          </div>
        </div>

        {/* Nationality & Corporate Name */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs text-gray-600 mb-1">
              Nationality
            </label>
            <input
              type="text"
              name="nationality"
              value={formData.nationality}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded text-xs text-gray-900"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-600 mb-1">
              Corporate Name
            </label>
            <input
              type="text"
              name="corporateName"
              value={formData.corporateName}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded text-xs text-gray-900"
            />
          </div>
        </div>

        {/* Company */}
        <div className="max-w-lg">
          <label className="block text-xs text-gray-600 mb-1">Company</label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded text-xs text-gray-900"
          />
        </div>

        {/* Doctor Assigned */}
        <div className="max-w-lg">
          <label className="block text-xs text-gray-600 mb-1">
            Doctor Assigned
          </label>
          <select
            name="doctorAssigned"
            value={formData.doctorAssigned}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded text-xs text-gray-900"
          >
            <option value="">Select Doctor</option>
            {doctors.map((doctor) => (
              <option key={doctor._id} value={doctor._id}>
                {doctor.fullName}
              </option>
            ))}
          </select>
        </div>

        {/* Remark */}
        <div>
          <label className="block text-xs text-gray-600 mb-1">Remark</label>
          <textarea
            name="remark"
            value={formData.remark}
            onChange={handleInputChange}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded text-xs text-gray-900 resize-none"
            placeholder="Enter any remarks..."
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}
        {success && <p className="text-green-500 text-sm">{success}</p>}

        {/* Save Button - Right Aligned */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white text-xs font-medium rounded hover:bg-blue-700 transition"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
