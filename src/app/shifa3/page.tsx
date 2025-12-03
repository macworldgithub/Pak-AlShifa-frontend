"use client";

import { useState } from "react";

export default function Shifa3() {
  const [activeTab, setActiveTab] = useState("Nursing Assessments");
  const [activeSubTab, setActiveSubTab] = useState("Patients Details");
  const [formData, setFormData] = useState({
    visitDate: "",
    fileNo: "",
    patientName: "",
    dob: "",
    age: "",
    sex: "Male",
    emiratesId: "",
    mobileNo: "",
    email: "",
    nationality: "",
    corporateName: "",
    company: "",
    remark: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-6xl mx-auto bg-white p-4 rounded-md shadow-sm mt-4">
        {/* Navigation Tabs */}
        <div className="flex space-x-1 mb-2 overflow-x-auto pb-1">
          {["Nursing Assessments", "Doctor Assessments", "Invoiced"].map(
            (tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1 text-xs rounded-sm whitespace-nowrap ${
                  activeTab === tab
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {tab}
              </button>
            )
          )}
        </div>

        {/* Sub Navigation */}
        <div className="flex flex-wrap gap-1 mb-4">
          {[
            "Patients Details",
            "Nursing",
            "Complaint",
            "Vaccine",
            "Diagnosis",
            "Medical Assessment",
            "Treatment",
            "Medicine",
            "Notes",
            "Patient Files",
            "Discharge",
            "ECG",
          ].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveSubTab(tab)}
              className={`px-2 py-0.5 text-xs rounded-sm whitespace-nowrap ${
                activeSubTab === tab
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Main Content */}
        {activeSubTab === "Patients Details" ? (
          <div className="border border-gray-300 p-4 rounded-sm">
            <h2 className="text-base font-semibold mb-3 text-gray-700 border-b pb-2">
              Patient Details
            </h2>

            <form className="space-y-3">
              {/* Visit Date */}
              <div className="flex items-center mb-2">
                <label className="w-24 text-xs text-gray-600">Visit Date</label>
                <input
                  type="date"
                  name="visitDate"
                  value={formData.visitDate}
                  onChange={handleInputChange}
                  className="border border-gray-300 text-xs px-2 py-1 w-40"
                />
              </div>

              {/* File No and Patient Name */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
                <div className="flex items-center">
                  <label className="w-24 text-xs text-gray-600">File No.</label>
                  <input
                    type="text"
                    name="fileNo"
                    value={formData.fileNo}
                    onChange={handleInputChange}
                    className="border border-gray-300 text-xs px-2 py-1 flex-1"
                  />
                </div>
                <div className="flex items-center">
                  <label className="w-24 text-xs text-gray-600">
                    Patient Name
                  </label>
                  <input
                    type="text"
                    name="patientName"
                    value={formData.patientName}
                    onChange={handleInputChange}
                    className="border border-gray-300 text-xs px-2 py-1 flex-1"
                  />
                </div>
              </div>

              {/* DOB and Age */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
                <div className="flex items-center">
                  <label className="w-24 text-xs text-gray-600">DOB.</label>
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleInputChange}
                    className="border border-gray-300 text-xs px-2 py-1 w-40"
                  />
                </div>
                <div className="flex items-center">
                  <label className="w-24 text-xs text-gray-600">Age.</label>
                  <input
                    type="text"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    className="border border-gray-300 text-xs px-2 py-1 w-20"
                  />
                </div>
              </div>

              {/* Sex and Emirates ID */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
                <div className="flex items-center">
                  <label className="w-24 text-xs text-gray-600">Sex</label>
                  <select
                    name="sex"
                    value={formData.sex}
                    onChange={handleInputChange}
                    className="border border-gray-300 text-xs px-2 py-1 w-40"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="flex items-center">
                  <label className="w-24 text-xs text-gray-600">
                    Emirates ID
                  </label>
                  <input
                    type="text"
                    name="emiratesId"
                    value={formData.emiratesId}
                    onChange={handleInputChange}
                    className="border border-gray-300 text-xs px-2 py-1 flex-1"
                  />
                </div>
              </div>

              {/* Mobile No and Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
                <div className="flex items-center">
                  <label className="w-24 text-xs text-gray-600">
                    Mobile No.
                  </label>
                  <input
                    type="text"
                    name="mobileNo"
                    value={formData.mobileNo}
                    onChange={handleInputChange}
                    className="border border-gray-300 text-xs px-2 py-1 flex-1"
                  />
                </div>
                <div className="flex items-center">
                  <label className="w-24 text-xs text-gray-600">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="border border-gray-300 text-xs px-2 py-1 flex-1"
                  />
                </div>
              </div>

              {/* Nationality and Corporate Name */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
                <div className="flex items-center">
                  <label className="w-24 text-xs text-gray-600">
                    Nationality
                  </label>
                  <input
                    type="text"
                    name="nationality"
                    value={formData.nationality}
                    onChange={handleInputChange}
                    className="border border-gray-300 text-xs px-2 py-1 flex-1"
                  />
                </div>
                <div className="flex items-center">
                  <label className="w-24 text-xs text-gray-600">
                    Corporate Name
                  </label>
                  <input
                    type="text"
                    name="corporateName"
                    value={formData.corporateName}
                    onChange={handleInputChange}
                    className="border border-gray-300 text-xs px-2 py-1 flex-1"
                  />
                </div>
              </div>

              {/* Company and empty column for alignment */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
                <div className="flex items-center">
                  <label className="w-24 text-xs text-gray-600">Company</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="border border-gray-300 text-xs px-2 py-1 flex-1"
                  />
                </div>
                <div className="flex items-center">
                  {/* Empty div for alignment */}
                </div>
              </div>

              {/* Remark */}
              <div className="flex items-start mt-4">
                <label className="w-24 text-xs text-gray-600 pt-1">
                  Remark
                </label>
                <textarea
                  name="remark"
                  value={formData.remark}
                  onChange={handleInputChange}
                  className="border border-gray-300 text-xs px-2 py-1 flex-1 h-20"
                />
              </div>

              {/* Sex and Emirates ID */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
                <div className="flex items-center">
                  <label className="w-24 text-xs text-gray-600">Sex</label>
                  <select
                    name="sex"
                    value={formData.sex}
                    onChange={handleInputChange}
                    className="border border-gray-300 text-xs px-2 py-1 w-40"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
                <div className="flex items-center">
                  <label className="w-24 text-xs text-gray-600">
                    Emirates ID
                  </label>
                  <input
                    type="text"
                    name="emiratesId"
                    value={formData.emiratesId}
                    onChange={handleInputChange}
                    className="border border-gray-300 text-xs px-2 py-1 flex-1"
                  />
                </div>
              </div>

              {/* Mobile and Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
                <div className="flex items-center">
                  <label className="w-24 text-xs text-gray-600">
                    Mobile No.
                  </label>
                  <input
                    type="text"
                    name="mobileNo"
                    value={formData.mobileNo}
                    onChange={handleInputChange}
                    className="border border-gray-300 text-xs px-2 py-1 flex-1"
                  />
                </div>
                <div className="flex items-center">
                  <label className="w-24 text-xs text-gray-600">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="border border-gray-300 text-xs px-2 py-1 flex-1"
                  />
                </div>
              </div>

              {/* Nationality and Company */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
                <div className="flex items-center">
                  <label className="w-24 text-xs text-gray-600">
                    Nationality
                  </label>
                  <input
                    type="text"
                    name="nationality"
                    value={formData.nationality}
                    onChange={handleInputChange}
                    className="border border-gray-300 text-xs px-2 py-1 flex-1"
                  />
                </div>
                <div className="flex items-center">
                  <label className="w-24 text-xs text-gray-600">Company</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="border border-gray-300 text-xs px-2 py-1 flex-1"
                  />
                </div>
              </div>

              {/* Corporate Name */}
              <div className="mb-2">
                <div className="flex items-center">
                  <label className="w-24 text-xs text-gray-600">
                    Corporate
                  </label>
                  <input
                    type="text"
                    name="corporateName"
                    value={formData.corporateName}
                    onChange={handleInputChange}
                    className="border border-gray-300 text-xs px-2 py-1 flex-1"
                  />
                </div>
              </div>

              {/* Remark */}
              <div className="mb-2">
                <div className="flex items-start">
                  <label className="w-24 text-xs text-gray-600 pt-1">
                    Remark
                  </label>
                  <textarea
                    name="remark"
                    value={formData.remark}
                    onChange={handleInputChange}
                    className="border border-gray-300 text-xs px-2 py-1 flex-1 h-20"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-2 mt-4 pt-2 border-t">
                <button
                  type="button"
                  className="px-3 py-1 bg-gray-200 text-gray-700 text-xs rounded hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="border border-gray-300 p-4 rounded-sm text-center text-gray-500">
            {activeSubTab} content will be displayed here
          </div>
        )}
      </div>
    </div>
  );
}
