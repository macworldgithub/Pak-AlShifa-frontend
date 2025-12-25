"use client";
import { useState } from "react";
import Tabs from "../patients-details/Tabs";
import NursingForm from "./Nursing-form";

export default function NursingPage() {
  const [activeTab, setActiveTab] = useState("Nursing Assessments");
  const [activeSubTab, setActiveSubTab] = useState("Nursing Form");
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
    <div className="w-full p-4">
      <Tabs
        activeTab={activeTab}
        activeSubTab={activeSubTab}
        setActiveTab={setActiveTab}
        setActiveSubTab={setActiveSubTab}
      />

      {/* Main Content */}
      <div className="mt-6">
        {activeTab === "Nursing Assessments" && (
          <div className="bg-white rounded-lg shadow p-6">
            <NursingForm />
          </div>
        )}
        {activeTab !== "Nursing Assessments" && (
          <div className="border border-gray-300 p-8 rounded-sm text-center text-gray-500">
            {activeTab} content will be displayed here
          </div>
        )}
      </div>
    </div>
  );
}
